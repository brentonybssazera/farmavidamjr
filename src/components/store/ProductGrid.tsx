import { useEffect, useState } from "react";
import { Loader2, PackageSearch } from "lucide-react";
import { ShopifyProduct, STOREFRONT_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";

export const ProductGrid = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20, query: null });
        setProducts(data?.data?.products?.edges || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section id="produtos" className="container py-20 md:py-28">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Catálogo</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight">Dosagens disponíveis</h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Cada caneta Monjaro contém quatro doses semanais. Escolha a concentração prescrita pelo seu médico.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-border bg-gradient-card p-16 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-5">
            <PackageSearch className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-display text-2xl font-semibold text-primary">Nenhum produto cadastrado</h3>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Diga no chat o nome da dosagem (ex: "Monjaro 5mg") e o preço para que eu cadastre os produtos automaticamente na sua loja.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
        </div>
      )}
    </section>
  );
};
