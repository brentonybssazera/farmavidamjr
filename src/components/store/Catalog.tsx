import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export const Catalog = () => (
  <section id="produtos" className="container py-8 md:py-12">
    <div className="text-center mb-10">
      <p className="inline-block px-4 py-1.5 rounded-full bg-primary-soft text-primary text-sm font-bold uppercase tracking-wide mb-3">
        Nossos produtos
      </p>
      <h2 className="font-serif-display text-4xl md:text-5xl text-foreground">
        Escolha sua dose de Mounjaro
      </h2>
      <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
        Todas as concentrações de Tirzepatida disponíveis. Original Eli Lilly, com nota fiscal e entrega refrigerada para todo o Brasil.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  </section>
);
