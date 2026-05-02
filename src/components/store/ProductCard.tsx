import { Link } from "react-router-dom";
import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, formatBRL } from "@/lib/products";
import { useCart } from "@/stores/cartStore";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: Product }) => {
  const add = useCart((s) => s.add);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    add(product);
    toast.success("Adicionado ao carrinho!", {
      description: product.name,
      position: "top-center",
      duration: 2200,
    });
  };

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  return (
    <article className="group relative bg-card rounded-3xl border-2 border-border overflow-hidden shadow-card hover:shadow-card-hover hover:border-primary/40 transition-all duration-300">
      {product.badge && (
        <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wide shadow-pink">
          {product.badge}
        </span>
      )}
      {discount > 0 && (
        <span className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-success text-success-foreground text-sm font-extrabold shadow-card">
          -{discount}%
        </span>
      )}

      <Link to={`/produto/${product.id}`} className="block">
        <div className="aspect-square bg-gradient-soft p-6 flex items-center justify-center overflow-hidden">
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

      <div className="p-5 space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{product.dose}</p>
          <Link to={`/produto/${product.id}`}>
            <h3 className="font-serif-display text-2xl text-foreground leading-tight mt-0.5 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">{product.description}</p>

        <div className="flex items-center gap-2 text-sm">
          <Check className="h-4 w-4 text-success" strokeWidth={3} />
          <span className="text-muted-foreground">Em estoque · Envio em 24h</span>
        </div>

        <div className="pt-3 border-t border-border">
          {product.oldPrice && (
            <p className="text-sm text-muted-foreground line-through">{formatBRL(product.oldPrice)}</p>
          )}
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="font-serif-display text-3xl text-foreground leading-none">{formatBRL(product.price)}</p>
              <p className="text-xs text-success font-semibold mt-1">12x de {formatBRL(product.price / 12)}</p>
            </div>
          </div>

          <Button
            onClick={handleAdd}
            size="lg"
            className="w-full mt-4 rounded-2xl h-14 text-base font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand"
          >
            <Plus className="h-5 w-5 mr-2" strokeWidth={3} /> Adicionar ao carrinho
          </Button>
        </div>
      </div>
    </article>
  );
};
