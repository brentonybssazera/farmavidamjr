import { Link } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShopifyProduct, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

export const ProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Adicionado ao carrinho", {
      description: product.node.title,
      position: "top-center",
    });
  };

  return (
    <Link
      to={`/product/${product.node.handle}`}
      className="group relative flex flex-col rounded-2xl bg-gradient-card border border-border/60 overflow-hidden shadow-card hover:shadow-glow hover:border-primary/30 transition-all duration-500"
    >
      <div className="aspect-[4/5] overflow-hidden bg-secondary">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.node.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sem imagem</div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold text-primary leading-tight">{product.node.title}</h3>
          <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{product.node.description}</p>
        </div>
        <div className="flex items-end justify-between pt-3 border-t border-border/60">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">A partir de</p>
            <p className="font-display text-2xl font-bold text-foreground">{formatPrice(price.amount, price.currencyCode)}</p>
          </div>
          <Button
            onClick={handleAdd}
            size="icon"
            className="h-11 w-11 rounded-full bg-primary hover:bg-accent shadow-soft"
            disabled={isLoading || !variant}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-5 w-5" strokeWidth={2.5} />}
          </Button>
        </div>
      </div>
    </Link>
  );
};
