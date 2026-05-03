import { useEffect } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

const EVENTS = [
  { name: "Mariana", city: "Belo Horizonte", product: "Mounjaro 5mg" },
  { name: "João", city: "Rio de Janeiro", product: "Combo 3x Mounjaro" },
  { name: "Patrícia", city: "São Paulo", product: "Mounjaro 7,5mg" },
  { name: "Carlos", city: "Curitiba", product: "Mounjaro 10mg" },
  { name: "Aline", city: "Porto Alegre", product: "Kit Iniciante" },
  { name: "Rodrigo", city: "Salvador", product: "Mounjaro 2,5mg" },
  { name: "Fernanda", city: "Recife", product: "Mounjaro 12,5mg" },
  { name: "Lucas", city: "Brasília", product: "Combo 3x Mounjaro" },
  { name: "Juliana", city: "Fortaleza", product: "Mounjaro 15mg" },
];

export const SocialProofToasts = () => {
  useEffect(() => {
    let i = 0;
    const show = () => {
      const e = EVENTS[i % EVENTS.length];
      const mins = Math.floor(Math.random() * 8) + 1;
      toast(
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0">
            <ShoppingBag className="h-4 w-4 text-success" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-foreground">{e.name} de {e.city}</p>
            <p className="text-muted-foreground">comprou {e.product} · há {mins} min</p>
          </div>
        </div>,
        { position: "bottom-left", duration: 5000 }
      );
      i++;
    };
    const first = setTimeout(show, 4000);
    const interval = setInterval(show, 14000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);
  return null;
};