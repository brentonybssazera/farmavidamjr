import { Link } from "react-router-dom";
import { Plus, Check, Flame, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, formatBRL } from "@/lib/products";
import { useCart } from "@/stores/cartStore";
import { toast } from "sonner";
import { openCart } from "@/lib/cartUi";

const fakeStock = (id: string) => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return (h % 6) + 2; // 2..7
};
const fakeViewers = (id: string) => {
  let h = 7;
  for (let i = 0; i < id.length; i++) h = (h * 17 + id.charCodeAt(i)) >>> 0;
  return (h % 18) + 6; // 6..23
};

export const ProductCard = ({ product }: { product: Product }) => {
  const add = useCart((s) => s.add);
  const stock = fakeStock(product.id);
  const viewers = fakeViewers(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add(product);
    toast.success("Adicionado ao carrinho!", {
      description: product.name,
      position: "top-center",
      duration: 3500,
      action: { label: "Ver carrinho", onClick: () => openCart() },
    });
  };

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <article className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 flex flex-col">
      {product.badge && (
        <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/95 backdrop-blur text-accent-foreground text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
          <Flame className="h-3 w-3" /> {product.badge}
        </span>
      )}
      {discount > 0 && (
        <span className="absolute top-2.5 right-2.5 z-10 px-2 py-1 rounded-full bg-success/95 backdrop-blur text-success-foreground text-[11px] sm:text-xs font-bold">
          -{discount}%
        </span>
      )}

      <Link to={`/produto/${product.id}`} className="block">
        <div className="aspect-square bg-gradient-soft p-4 sm:p-8 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={512}
            height={512}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="p-3 sm:p-5 space-y-2 sm:space-y-3 flex-1 flex flex-col">
        <div>
          <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-primary">{product.dose}</p>
          <Link to={`/produto/${product.id}`}>
            <h3 className="font-serif-display text-[15px] sm:text-xl text-foreground leading-snug mt-0.5 hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] sm:text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Check className="h-3 w-3 text-success" strokeWidth={3} /> Frete grátis
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Check className="h-3 w-3 text-success" strokeWidth={3} /> Original
          </span>
        </div>

        <div className="pt-2 sm:pt-3 border-t border-border mt-auto">
          {product.oldPrice && (
            <p className="text-[11px] sm:text-xs text-muted-foreground line-through">{formatBRL(product.oldPrice)}</p>
          )}
          <p className="font-serif-display text-[22px] sm:text-3xl text-foreground leading-none">{formatBRL(product.price)}</p>
          <p className="text-[10px] sm:text-xs text-success font-semibold mt-1">12x de {formatBRL(product.price / 12)} sem juros</p>

          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px]">
              <span className="font-bold text-destructive">Restam {stock} un.</span>
              <span className="text-muted-foreground flex items-center gap-1"><Eye className="h-3 w-3" /> {viewers} olhando</span>
            </div>
            <div className="h-1 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-to-r from-destructive to-[hsl(0_84%_55%)] animate-pulse" style={{ width: `${100 - stock * 12}%` }} />
            </div>
          </div>

          <Button
            onClick={handleAdd}
            className="w-full mt-2.5 sm:mt-4 rounded-full h-10 sm:h-12 text-xs sm:text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand/40"
          >
            <Plus className="h-4 w-4 mr-1" strokeWidth={3} /> Comprar
          </Button>
        </div>
      </div>
    </article>
  );
};
