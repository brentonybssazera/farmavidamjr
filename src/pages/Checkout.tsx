import { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Check, Loader2, Copy, QrCode, Truck, ShieldCheck, Clock, Smartphone, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { Topbar } from "@/components/store/Topbar";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { CartSheet } from "@/components/store/CartSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/stores/cartStore";
import { formatBRL } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const isRepeatedDigits = (value: string) => /^(\d)\1+$/.test(value);

const isValidCPF = (value: string) => {
  const digits = onlyDigits(value);
  if (digits.length !== 11 || isRepeatedDigits(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i += 1) sum += Number(digits[i]) * (10 - i);
  const firstCheck = (sum * 10) % 11 % 10;
  if (firstCheck !== Number(digits[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i += 1) sum += Number(digits[i]) * (11 - i);
  const secondCheck = (sum * 10) % 11 % 10;
  return secondCheck === Number(digits[10]);
};

const isValidCNPJ = (value: string) => {
  const digits = onlyDigits(value);
  if (digits.length !== 14 || isRepeatedDigits(digits)) return false;

  const calculateCheckDigit = (base: string) => {
    const weights = base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const total = base.split("").reduce((sum, digit, index) => sum + Number(digit) * weights[index], 0);
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstCheck = calculateCheckDigit(digits.slice(0, 12));
  const secondCheck = calculateCheckDigit(digits.slice(0, 12) + firstCheck);
  return firstCheck === Number(digits[12]) && secondCheck === Number(digits[13]);
};

const isValidBrazilianDocument = (value: string) => {
  const digits = onlyDigits(value);
  return (digits.length === 11 && isValidCPF(digits)) || (digits.length === 14 && isValidCNPJ(digits));
};

const normalizePixPayload = (payload: any) => {
  const qrCode = payload?.qrCode ?? payload?.pix?.code ?? payload?.pixCode ?? payload?.copyPaste;
  const qrCodeImage = payload?.qrCodeImage ?? payload?.pix?.base64 ?? payload?.pix?.image ?? payload?.qrCodeBase64;

  if (!qrCode && !qrCodeImage) return null;

  return {
    id: payload?.id ?? payload?.transactionId,
    qrCode,
    qrCodeImage,
  };
};

const Checkout = () => {
  const { items, total, clear } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [shipName, setShipName] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [shipCity, setShipCity] = useState("");
  const [shipState, setShipState] = useState("");
  const [shipComplement, setShipComplement] = useState("");
  const [pix, setPix] = useState<{ qrCode?: string; qrCodeImage?: string; id?: string } | null>(null);
  const [pixAmount, setPixAmount] = useState<number>(0);
  const [pixIdentifier, setPixIdentifier] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"PENDING" | "COMPLETED" | "FAILED" | "REFUNDED" | "CHARGED_BACK">("PENDING");
  const [checkingStatus, setCheckingStatus] = useState(false);
  const pixRequestedRef = useRef(false);

  if (items.length === 0 && !pix && !pixRequestedRef.current) return <Navigate to="/" replace />;

  const handlePlace = async () => {
    const cleanDocument = onlyDigits(document);
    const cleanPhone = onlyDigits(phone);

    if (!name || !email || !document) {
      toast.error("Preencha nome, e-mail e CPF/CNPJ");
      return;
    }
    if (!isValidBrazilianDocument(cleanDocument)) {
      toast.error("Digite um CPF ou CNPJ válido");
      return;
    }
    if (!shipAddress || !shipCity || !shipState) {
      toast.error("Preencha o endereço de entrega");
      return;
    }
    setPlacing(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-pix-payment", {
        body: {
          amount: total(),
          customer: { name: name.trim(), email: email.trim(), document: cleanDocument, phone: cleanPhone },
          items: items.map((i) => ({ title: i.product.name, quantity: i.quantity, unitPrice: i.product.price })),
          shipping: {
            name: (shipName || name).trim(),
            address: shipAddress.trim(),
            city: shipCity.trim(),
            state: shipState.trim(),
            complement: shipComplement.trim(),
          },
        },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const normalizedPix = normalizePixPayload(data);
      if (!normalizedPix) throw new Error("PIX não retornado pelo gateway");

      pixRequestedRef.current = true;
      setPixAmount(total());
      setPix(normalizedPix);
      setPixIdentifier((data as any)?.identifier ?? null);
      setPaymentStatus("PENDING");
      clear();
      toast.success("PIX gerado! Escaneie ou copie o código");
    } catch (err: any) {
      console.error(err);
      toast.error("Erro ao gerar pagamento", { description: err?.message ?? "Tente novamente" });
    } finally {
      setPlacing(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Código copiado!");
  };

  const checkStatus = async (silent = false) => {
    if (!pix?.id && !pixIdentifier) return;
    if (!silent) setCheckingStatus(true);
    try {
      const params = new URLSearchParams();
      if (pix?.id) params.set("id", String(pix.id));
      if (pixIdentifier) params.set("identifier", pixIdentifier);
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/check-pix-status?${params.toString()}`;
      const res = await fetch(url, {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });
      // SigiloPay bloqueia polling muito frequente (403). Ignoramos silenciosamente.
      if (res.status === 403) {
        return;
      }
      const data = await res.json().catch(() => ({}));
      const status = data?.status;
      if (status && status !== paymentStatus) {
        setPaymentStatus(status);
        if (status === "COMPLETED") toast.success("Pagamento confirmado! 🎉");
        else if (status === "FAILED" || status === "REFUNDED" || status === "CHARGED_BACK") toast.error("Pagamento não aprovado");
      }
    } catch (err) {
      console.error("status check", err);
    } finally {
      if (!silent) setCheckingStatus(false);
    }
  };

  useEffect(() => {
    if (!pix || paymentStatus !== "PENDING") return;
    const interval = setInterval(() => checkStatus(true), 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pix, paymentStatus, pixIdentifier]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="flex-1 container py-5 sm:py-8 max-w-2xl px-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-3 sm:mb-4 font-medium">
          <ArrowLeft className="h-4 w-4" /> Continuar comprando
        </Link>

        {pix && paymentStatus === "COMPLETED" ? (
          <div className="space-y-4 text-center py-6">
            <div className="bg-success/10 rounded-3xl border-2 border-success/30 p-6 sm:p-10">
              <div className="inline-flex h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-success items-center justify-center mb-4 animate-in zoom-in duration-500">
                <CheckCircle2 className="h-12 w-12 sm:h-14 sm:w-14 text-success-foreground" strokeWidth={2.5} />
              </div>
              <h1 className="font-serif-display text-2xl sm:text-4xl text-foreground">Pagamento aprovado!</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">Recebemos {formatBRL(pixAmount)}. Já estamos preparando seu pedido.</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 max-w-md mx-auto">
                <div className="bg-card rounded-xl border border-border p-3"><ShieldCheck className="h-5 w-5 text-success mx-auto mb-1" /><p className="text-[10px] sm:text-xs font-semibold">Pago</p></div>
                <div className="bg-card rounded-xl border border-border p-3"><Clock className="h-5 w-5 text-primary mx-auto mb-1" /><p className="text-[10px] sm:text-xs font-semibold">Em separação</p></div>
                <div className="bg-card rounded-xl border border-border p-3"><Truck className="h-5 w-5 text-muted-foreground mx-auto mb-1" /><p className="text-[10px] sm:text-xs font-semibold">A caminho</p></div>
              </div>
              <Button asChild className="rounded-full h-12 px-8 mt-6 bg-primary hover:bg-primary/90">
                <Link to="/">Voltar para a loja</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Enviamos a confirmação por e-mail e WhatsApp.</p>
          </div>
        ) : pix && (paymentStatus === "FAILED" || paymentStatus === "REFUNDED" || paymentStatus === "CHARGED_BACK") ? (
          <div className="space-y-4 text-center py-6">
            <div className="bg-destructive/10 rounded-3xl border-2 border-destructive/30 p-6 sm:p-10">
              <div className="inline-flex h-20 w-20 rounded-full bg-destructive items-center justify-center mb-4">
                <XCircle className="h-12 w-12 text-destructive-foreground" strokeWidth={2.5} />
              </div>
              <h1 className="font-serif-display text-2xl sm:text-3xl text-foreground">Pagamento não aprovado</h1>
              <p className="text-sm text-muted-foreground mt-2">Houve um problema ao processar seu PIX. Tente novamente.</p>
              <Button onClick={() => { setPix(null); setPaymentStatus("PENDING"); pixRequestedRef.current = false; }} className="rounded-full h-12 px-8 mt-6">
                Tentar novamente
              </Button>
            </div>
          </div>
        ) : pix ? (
          <div className="space-y-3 sm:space-y-4">
            {/* Hero do valor — destaque máximo no mobile */}
            <div className="bg-gradient-brand rounded-2xl shadow-brand p-5 sm:p-7 text-center text-primary-foreground relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur text-[11px] font-semibold mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-success-foreground bg-green-400 animate-pulse" />
                Aguardando pagamento
              </div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-primary-foreground/80 font-semibold">Valor total</p>
              <p className="font-serif-display text-4xl sm:text-5xl leading-none mt-1.5 mb-2">{formatBRL(pixAmount)}</p>
              <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-primary-foreground/85">
                <Clock className="h-3.5 w-3.5" /> Confirmação em segundos após o pagamento
              </div>
            </div>

            <button
              onClick={() => checkStatus(false)}
              disabled={checkingStatus}
              className="w-full bg-card border border-border rounded-2xl p-3 sm:p-4 flex items-center justify-between hover:border-primary/40 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">Aguardando confirmação</p>
                  <p className="text-[11px] text-muted-foreground truncate">Verificamos automaticamente a cada 5s</p>
                </div>
              </div>
              <RefreshCw className={`h-4 w-4 text-primary flex-shrink-0 ${checkingStatus ? "animate-spin" : ""}`} />
            </button>

            {/* Passo a passo */}
            <div className="bg-card rounded-2xl border border-border shadow-card p-4 sm:p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Como pagar</p>
              <ol className="space-y-2.5 text-sm">
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">1</span>
                  <span className="text-foreground pt-0.5">Abra o app do seu banco</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">2</span>
                  <span className="text-foreground pt-0.5">Escolha pagar via PIX e escaneie o QR Code <span className="text-muted-foreground">(ou cole o código)</span></span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">3</span>
                  <span className="text-foreground pt-0.5">Confirme o pagamento — enviamos atualização por e-mail e WhatsApp</span>
                </li>
              </ol>
            </div>

            {/* QR Code */}
            {pix.qrCodeImage && (
              <div className="bg-card rounded-2xl border border-border shadow-card p-4 sm:p-6 text-center">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Escaneie o QR Code</p>
                <div className="flex justify-center">
                  <div className="relative inline-block">
                    <div className="absolute -inset-1 bg-gradient-brand rounded-2xl opacity-20 blur" />
                    <img
                      src={pix.qrCodeImage.startsWith("data:") ? pix.qrCodeImage : `data:image/png;base64,${pix.qrCodeImage}`}
                      alt="QR Code PIX"
                      className="relative h-56 w-56 sm:h-64 sm:w-64 border-2 border-border rounded-2xl bg-white p-3"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Copia e cola — botão grande primeiro no mobile */}
            {pix.qrCode && (
              <div className="bg-card rounded-2xl border border-border shadow-card p-4 sm:p-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Smartphone className="h-3.5 w-3.5" /> Pagando pelo celular?
                </p>
                <Button
                  onClick={() => copy(pix.qrCode!)}
                  className="w-full h-14 rounded-full text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand"
                >
                  <Copy className="h-5 w-5 mr-2" /> Copiar código PIX
                </Button>
                <details className="mt-3">
                  <summary className="text-xs text-muted-foreground cursor-pointer hover:text-primary font-medium">Ver código completo</summary>
                  <p className="text-[11px] font-mono break-all text-foreground bg-secondary/60 rounded-lg p-3 mt-2 max-h-28 overflow-y-auto">
                    {pix.qrCode}
                  </p>
                </details>
              </div>
            )}

            {/* Garantias */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-card rounded-xl border border-border p-2.5 sm:p-3 text-center">
                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-success mx-auto mb-1" />
                <p className="text-[10px] sm:text-xs font-semibold text-foreground leading-tight">Pagamento<br/>seguro</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-2.5 sm:p-3 text-center">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary mx-auto mb-1" />
                <p className="text-[10px] sm:text-xs font-semibold text-foreground leading-tight">Aprovação<br/>em segundos</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-2.5 sm:p-3 text-center">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-accent mx-auto mb-1" />
                <p className="text-[10px] sm:text-xs font-semibold text-foreground leading-tight">Frete<br/>grátis</p>
              </div>
            </div>

            <p className="text-[11px] sm:text-xs text-muted-foreground text-center px-2 pt-1">
              Após o pagamento, enviaremos a confirmação por e-mail e WhatsApp.
            </p>
          </div>
        ) : (
          <>
            <h1 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-5">Finalizar pedido</h1>

            <div className="bg-card rounded-2xl border border-border shadow-card p-4 sm:p-6 mb-4 sm:mb-5">
              <h2 className="font-semibold text-base mb-4 text-foreground">Resumo</h2>
              <div className="space-y-3">
                {items.map((it) => (
                  <div key={it.product.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={it.product.image} alt="" className="h-12 w-12 rounded-lg object-cover bg-muted flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{it.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qtd: {it.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-sm flex-shrink-0 ml-2">{formatBRL(it.product.price * it.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border text-sm text-success">
                <Truck className="h-4 w-4" /> Frete grátis
              </div>
              <div className="flex justify-between items-baseline mt-2">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-serif-display text-2xl sm:text-3xl text-foreground">{formatBRL(total())}</span>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-card p-4 sm:p-6 mb-4 sm:mb-5 space-y-4">
              <h2 className="font-semibold text-base text-foreground">Seus dados</h2>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name" className="text-xs">Nome completo</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="rounded-lg h-11 mt-1" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="email" className="text-xs">E-mail</Label>
                    <Input id="email" type="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg h-11 mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs">Telefone</Label>
                    <Input id="phone" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-lg h-11 mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="doc" className="text-xs">CPF ou CNPJ</Label>
                  <Input id="doc" inputMode="numeric" value={document} onChange={(e) => setDocument(e.target.value)} placeholder="Somente números" className="rounded-lg h-11 mt-1" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border shadow-card p-4 sm:p-6 mb-4 sm:mb-5 space-y-4">
              <h2 className="font-semibold text-base text-foreground">Endereço de entrega</h2>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="shipName" className="text-xs">Destinatário (opcional)</Label>
                  <Input id="shipName" value={shipName} onChange={(e) => setShipName(e.target.value)} placeholder="Mesmo nome do comprador" className="rounded-lg h-11 mt-1" />
                </div>
                <div>
                  <Label htmlFor="addr" className="text-xs">Endereço completo (rua, número, bairro)</Label>
                  <Input id="addr" value={shipAddress} onChange={(e) => setShipAddress(e.target.value)} className="rounded-lg h-11 mt-1" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <Label htmlFor="city" className="text-xs">Cidade</Label>
                    <Input id="city" value={shipCity} onChange={(e) => setShipCity(e.target.value)} className="rounded-lg h-11 mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-xs">UF</Label>
                    <Input id="state" maxLength={2} value={shipState} onChange={(e) => setShipState(e.target.value.toUpperCase())} className="rounded-lg h-11 mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="comp" className="text-xs">Complemento / referência (opcional)</Label>
                  <Input id="comp" value={shipComplement} onChange={(e) => setShipComplement(e.target.value)} className="rounded-lg h-11 mt-1" />
                </div>
                <p className="text-xs text-muted-foreground">📦 Frete grátis · entrega refrigerada para todo o Brasil</p>
              </div>
            </div>

            <Button onClick={handlePlace} disabled={placing}
              className="w-full h-14 rounded-full text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand">
              {placing ? <Loader2 className="h-5 w-5 animate-spin" /> : (<><QrCode className="h-5 w-5 mr-2 flex-shrink-0" /> <span className="truncate">Gerar PIX · {formatBRL(total())}</span></>)}
            </Button>
            <p className="text-[11px] sm:text-xs text-muted-foreground text-center mt-3 px-2">
              Ao confirmar, você concorda em enviar a receita médica via WhatsApp após o pagamento.
            </p>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
