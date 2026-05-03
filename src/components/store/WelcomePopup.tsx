import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gift, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const KEY = "welcome_popup_shown";

export const WelcomePopup = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(KEY, "1");
    }, 6000);
    return () => clearTimeout(t);
  }, []);

  const copy = () => {
    navigator.clipboard.writeText("BEMVINDO5");
    setCopied(true);
    toast.success("Cupom copiado!");
    setTimeout(() => setOpen(false), 800);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm rounded-3xl p-0 overflow-hidden border-0">
        <div className="bg-gradient-to-br from-[hsl(0_84%_45%)] to-[hsl(0_84%_55%)] text-white p-6 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-white/20 flex items-center justify-center mb-3">
            <Gift className="h-7 w-7" />
          </div>
          <h3 className="font-serif-display text-2xl">Espera! 🎁</h3>
          <p className="text-sm opacity-95 mt-1">Você ganhou <strong>5% OFF extra</strong> no PIX</p>
        </div>
        <div className="p-5 space-y-3">
          <div className="border-2 border-dashed border-primary rounded-xl p-3 text-center">
            <p className="text-[11px] text-muted-foreground uppercase font-semibold tracking-wider">Cupom exclusivo</p>
            <p className="font-mono text-2xl font-bold text-primary tracking-widest">BEMVINDO5</p>
          </div>
          <Button onClick={copy} className="w-full h-12 rounded-full font-bold">
            {copied ? <><Check className="h-4 w-4 mr-1" /> Copiado</> : <><Copy className="h-4 w-4 mr-1" /> Copiar e usar agora</>}
          </Button>
          <button onClick={() => setOpen(false)} className="w-full text-xs text-muted-foreground hover:underline">
            Não, prefiro pagar o preço cheio
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};