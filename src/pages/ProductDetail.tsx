import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, ShieldCheck, Snowflake, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/store/Navbar";
import { Footer } from "@/components/store/Footer";
import { PRODUCT_BY_HANDLE_QUERY, formatPrice, storefrontApiRequest } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface Variant {
  id: string;
  title: string;
  price: { amount: string; currencyCode: string };
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: { edges: Array<{ node: Variant }> };
  options: Array<{ name: string; values: string[] }>;
}

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [qty, setQty] = useState(1);

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    if (!handle) return;
    (async () => {
      try {
        const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
        const p = data?.data?.productByHandle;
        setProduct(p);
        if (p?.variants?.edges?.[0]) setSelectedVariantId(p.variants.edges[0].node.id);
      } finally {
        setLoading(false);
      }
    })();
  }, [handle]);

  const variant = product?.variants.edges.find((v) => v.node.id === selectedVariantId)?.node;
  const image = product?.images.edges[0]?.node;

  const handleAdd = async () => {
    if (!variant || !product) return;
    await addItem({
      product: { node: product as Product & { description: string } } as never,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: qty,
      selectedOptions: variant.selectedOptions,
    });
    toast.success("Adicionado ao carrinho", { description: product.title, position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
          <ArrowLeft className="h-4 w-4" /> Voltar à loja
        </Link>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !product ? (
          <div className="text-center py-32">
            <h2 className="font-display text-3xl text-primary">Produto não encontrado</h2>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="rounded-3xl overflow-hidden bg-gradient-soft border border-border/60 aspect-square">
              {image && <img src={image.url} alt={image.altText || product.title} className="w-full h-full object-cover" />}
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">Tirzepatida</p>
                <h1 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight">{product.title}</h1>
                <p className="font-display text-3xl font-bold text-foreground mt-4">
                  {variant ? formatPrice(variant.price.amount, variant.price.currencyCode) : formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {product.options.map((opt) => (
                <div key={opt.name}>
                  <p className="text-sm font-semibold text-foreground mb-2">{opt.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((v) => {
                      const optVal = v.node.selectedOptions.find((o) => o.name === opt.name)?.value;
                      const isSelected = v.node.id === selectedVariantId;
                      return (
                        <button
                          key={v.node.id}
                          onClick={() => setSelectedVariantId(v.node.id)}
                          className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                            isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary"
                          }`}
                        >
                          {optVal}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center bg-background rounded-xl border border-border">
                  <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => setQty(Math.max(1, qty - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <Button variant="ghost" size="icon" className="h-12 w-12" onClick={() => setQty(qty + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleAdd} size="lg" className="flex-1 h-12 bg-primary hover:bg-primary/90 rounded-xl shadow-glow" disabled={isLoading || !variant?.availableForSale}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Adicionar ao carrinho"}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <Snowflake className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Refrigerado 2-8°C</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Original Eli Lilly</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground pt-4 border-t border-border">
                Venda mediante prescrição médica. A receita branca de controle especial será retida no ato da entrega.
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
