import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowLeft, Check, Loader2, Copy, QrCode, Truck } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="flex-1 container py-5 sm:py-8 max-w-2xl px-4">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-3 sm:mb-4 font-medium">
          <ArrowLeft className="h-4 w-4" /> Continuar comprando
        </Link>

        {pix ? (
          <div className="bg-card rounded-2xl border border-border shadow-card p-4 sm:p-8 text-center space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-success-soft text-success text-xs font-semibold">
              <QrCode className="h-3.5 w-3.5" /> PIX gerado
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl text-foreground">Pague com PIX</h1>

            <div className="bg-primary-soft/60 rounded-xl py-3 px-5 inline-flex flex-col items-center mx-auto">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Valor a pagar</span>
              <span className="font-serif-display text-2xl sm:text-4xl text-primary leading-tight mt-1">{formatBRL(pixAmount)}</span>
            </div>

            <p className="text-muted-foreground text-xs sm:text-sm px-1">Escaneie o QR Code ou copie o código abaixo. Confirmação em segundos.</p>

            {pix.qrCodeImage && (
              <div className="flex justify-center">
                <img src={pix.qrCodeImage.startsWith("data:") ? pix.qrCodeImage : `data:image/png;base64,${pix.qrCodeImage}`}
                  alt="QR Code PIX" className="h-52 w-52 sm:h-64 sm:w-64 border border-border rounded-xl bg-white p-2" />
              </div>
            )}

            {pix.qrCode && (
              <div className="bg-secondary/60 rounded-xl p-3 sm:p-4 text-left">
                <p className="text-xs font-semibold text-muted-foreground mb-2">PIX copia e cola</p>
                <p className="text-[11px] sm:text-xs font-mono break-all text-foreground max-h-24 overflow-y-auto">{pix.qrCode}</p>
                <Button onClick={() => copy(pix.qrCode!)} className="w-full mt-3 rounded-full h-11" variant="outline">
                  <Copy className="h-4 w-4 mr-2" /> Copiar código PIX
                </Button>
              </div>
            )}

            <p className="text-[11px] sm:text-xs text-muted-foreground px-2">Após o pagamento, enviaremos atualização por e-mail e WhatsApp.</p>
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
