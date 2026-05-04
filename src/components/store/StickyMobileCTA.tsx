import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

export const StickyMobileCTA = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 pb-[env(safe-area-inset-bottom)] ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="bg-card/95 backdrop-blur border-t border-border shadow-card-hover px-3 py-2.5 flex items-center gap-2.5">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground line-through leading-none truncate">De R$ 5.266,77</p>
          <p className="text-[13px] font-bold text-foreground leading-tight truncate">Combo 3x · <span className="text-primary">R$ 449,99</span></p>
        </div>
        <Button asChild size="sm" className="rounded-full h-11 px-5 font-bold flex-shrink-0 shadow-brand">
          <a href="#produtos"><Flame className="h-4 w-4 mr-1" /> Comprar</a>
        </Button>
      </div>
    </div>
  );
};