import { Phone, Truck, ShieldCheck } from "lucide-react";

export const Topbar = () => (
  <div className="bg-primary text-primary-foreground text-xs">
    <div className="container flex items-center justify-between py-1.5 sm:py-2 gap-3">
      <div className="hidden sm:flex items-center gap-4 md:gap-6">
        <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5" /> Frete grátis para todo o Brasil</span>
        <span className="hidden md:flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> 100% original Eli Lilly</span>
      </div>
      <span className="sm:hidden flex items-center gap-1.5 font-medium">
        <Truck className="h-3.5 w-3.5" /> Frete grátis · Original Eli Lilly
      </span>
      <a href="https://wa.me/5519984403849" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-1.5 font-medium hover:underline">
        <Phone className="h-3.5 w-3.5" /> (19) 98440-3849
      </a>
    </div>
  </div>
);
