import { Phone, Truck, ShieldCheck } from "lucide-react";

export const Topbar = () => (
  <div className="bg-primary text-primary-foreground text-xs">
    <div className="container flex items-center justify-between py-2 gap-4">
      <div className="hidden md:flex items-center gap-6">
        <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Frete grátis para todo o Brasil</span>
        <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> 100% original Eli Lilly</span>
      </div>
      <a href="https://wa.me/5519984403849" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-medium hover:underline">
        <Phone className="h-3.5 w-3.5" /> (19) 98440-3849
      </a>
    </div>
  </div>
);
