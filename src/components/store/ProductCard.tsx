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
    <article className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300">
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-accent/95 backdrop-blur text-accent-foreground text-[10px] font-semibold uppercase tracking-wider">
          {product.badge}
        </span>
      )}
      {discount > 0 && (
        <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-success/95 backdrop-blur text-success-foreground text-xs font-bold">
          -{discount}%
        </span>
      )}

      <Link to={`/produto/${product.id}`} className="block">
        <div className="aspect-square bg-gradient-soft p-8 flex items-center justify-center overflow-hidden">
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
          <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{product.dose}</p>
          <Link to={`/produto/${product.id}`}>
            <h3 className="font-serif-display text-xl text-foreground leading-snug mt-1 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <Check className="h-3.5 w-3.5 text-success" strokeWidth={3} />
          <span className="text-muted-foreground">Em estoque · Frete grátis</span>
        </div>

        <div className="pt-3 border-t border-border">
          {product.oldPrice && (
            <p className="text-xs text-muted-foreground line-through">{formatBRL(product.oldPrice)}</p>
          )}
          <p className="font-serif-display text-3xl text-foreground leading-none">{formatBRL(product.price)}</p>
          <p className="text-xs text-success font-medium mt-1">ou 12x de {formatBRL(product.price / 12)}</p>

          <Button
            onClick={handleAdd}
            className="w-full mt-4 rounded-full h-12 text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="h-4 w-4 mr-1.5" strokeWidth={3} /> Adicionar
          </Button>
        </div>
      </div>
    </article>
  );
};
