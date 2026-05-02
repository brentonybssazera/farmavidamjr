import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export const Catalog = () => (
  <section id="produtos" className="container py-8 md:py-14">
    <div className="text-center mb-7 md:mb-10 max-w-2xl mx-auto">
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-primary mb-2">Catálogo Mounjaro</p>
      <h2 className="font-serif-display text-2xl sm:text-3xl md:text-5xl text-foreground text-balance">
        Escolha sua dose
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 px-2">
        Todas as concentrações de Tirzepatida — original Eli Lilly, frete grátis e entrega refrigerada.
      </p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
      {PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  </section>
);
