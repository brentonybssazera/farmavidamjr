import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, Check, ShieldCheck, Truck, Clock } from "lucide-react";
import { toast } from "sonner";

const KEY = "welcome_popup_shown";
const CODE = "BEMVINDO5";

export const WelcomePopup = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(KEY, "1");
    }, 6000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const i = setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(i);
  }, [open]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      toast.success("Cupom copiado!", { description: "Cole no checkout para aplicar 5% OFF no PIX." });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Não foi possível copiar. Anote: " + CODE);
    }
  };

  const useNow = async () => {
    await copy();
    setOpen(false);
    document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100vw-1.5rem)] max-w-md rounded-3xl p-0 overflow-hidden border-0 shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground px-6 pt-7 pb-6 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Oferta de boas-vindas
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl leading-tight">
              Ganhe <span className="underline decoration-2 underline-offset-4">5% OFF</span> no seu 1º pedido
            </h3>
            <p className="text-xs sm:text-sm opacity-95 mt-2">
              Pagando no <strong>PIX</strong>, você economiza ainda mais.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4 bg-background">
          {/* Coupon */}
          <div className="relative">
            <div className="border-2 border-dashed border-primary/40 rounded-2xl bg-primary/5 p-4 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-[11px] text-muted-foreground uppercase font-semibold tracking-wider">Seu cupom</p>
                <p className="font-mono text-2xl sm:text-3xl font-bold text-primary tracking-[0.2em] truncate">{CODE}</p>
              </div>
              <Button
                onClick={copy}
                size="sm"
                variant={copied ? "secondary" : "default"}
                className="rounded-full h-10 px-4 shrink-0 font-semibold"
              >
                {copied ? <><Check className="h-4 w-4" /> Copiado</> : <><Copy className="h-4 w-4" /> Copiar</>}
              </Button>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>Válido por <strong className="text-foreground tabular-nums">{mm}:{ss}</strong></span>
          </div>

          {/* Benefits */}
          <ul className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs">
            <li className="flex items-center gap-1.5 text-muted-foreground">
              <Truck className="h-3.5 w-3.5 text-primary" /> Frete grátis
            </li>
            <li className="flex items-center gap-1.5 text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Compra segura
            </li>
          </ul>

          {/* CTA */}
          <Button onClick={useNow} className="w-full h-12 rounded-full font-bold text-sm sm:text-base">
            Usar cupom e ver produtos
          </Button>

          <p className="text-[10px] sm:text-[11px] text-center text-muted-foreground">
            Aplique o código <strong>{CODE}</strong> no checkout. Válido apenas no PIX.
          </p>

          <button onClick={() => setOpen(false)} className="w-full text-[11px] text-muted-foreground hover:underline">
            Não quero meu desconto
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};