import { Phone, Truck, ShieldCheck } from "lucide-react";

export const Topbar = () => (
  <div className="bg-foreground text-background text-sm">
    <div className="container flex items-center justify-between py-2.5 gap-4">
      <div className="hidden md:flex items-center gap-6">
        <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-success" /> Entrega refrigerada para todo o Brasil</span>
        <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> 100% original Eli Lilly</span>
      </div>
      <a href="tel:08000000000" className="flex items-center gap-2 font-semibold">
        <Phone className="h-4 w-4" /> Atendimento: 0800 000 0000
      </a>
    </div>
  </div>
);
