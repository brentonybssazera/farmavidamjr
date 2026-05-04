import { Phone, Truck, ShieldCheck } from "lucide-react";

export const Topbar = () => (
  <div className="bg-[hsl(0_84%_45%)] text-white text-[11px] sm:text-xs overflow-hidden">
    <div className="container flex items-center justify-between py-1.5 sm:py-2 gap-3">
      <div className="hidden sm:flex items-center gap-4 md:gap-6">
        <span className="flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5 animate-[truck-slide_2.4s_ease-in-out_infinite]" />
          <span className="font-medium">Frete grátis para todo o Brasil</span>
        </span>
        <span className="hidden md:flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 animate-[pulse_2s_ease-in-out_infinite]" />
          <span className="font-medium">100% original VitaPharma Laboratories</span>
        </span>
      </div>
      <span className="sm:hidden flex items-center gap-1.5 font-semibold mx-auto truncate">
        <Truck className="h-3.5 w-3.5 animate-[truck-slide_2.4s_ease-in-out_infinite]" />
        Frete grátis · 100% Original
      </span>
      <a href="https://wa.me/5519984403849" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-1.5 font-semibold hover:underline">
        <Phone className="h-3.5 w-3.5 animate-[pulse_2s_ease-in-out_infinite]" /> (19) 98440-3849
      </a>
    </div>
    <style>{`
      @keyframes truck-slide {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(3px); }
      }
    `}</style>
  </div>
);
