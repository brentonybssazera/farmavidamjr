import { Phone, Truck, ShieldCheck, MapPin } from "lucide-react";

export const Topbar = () => (
  <div className="bg-foreground text-background text-sm">
    <div className="container flex items-center justify-between py-2.5 gap-4">
      <div className="hidden md:flex items-center gap-6">
        <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-success" /> Entrega refrigerada para todo o Brasil</span>
        <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> 100% original Eli Lilly</span>
        <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-info" /> Porto Velho · RO</span>
      </div>
      <a href="https://wa.me/5519984403849" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold hover:text-accent transition-colors">
        <Phone className="h-4 w-4" /> Atendimento: (19) 98440-3849
      </a>
    </div>
  </div>
);
