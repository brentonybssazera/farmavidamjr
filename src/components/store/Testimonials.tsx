import { Star, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const reviews = [
  { name: "Mariana S.", city: "São Paulo/SP", text: "Recebi em 2 dias, refrigerado e original. Já perdi 8kg em 2 meses. Recomendo demais!" },
  { name: "Carlos A.", city: "Rio de Janeiro/RJ", text: "Suporte por WhatsApp impecável. Tiraram todas as dúvidas antes da compra." },
  { name: "Patrícia L.", city: "Belo Horizonte/MG", text: "Preço justo e nota fiscal. Comprei outras vezes em farmácia e era muito mais caro." },
  { name: "Rafael T.", city: "Curitiba/PR", text: "Embalagem perfeita, gelo gel ainda gelado. Confiança total na FarmaVida." },
  { name: "Juliana M.", city: "Porto Alegre/RS", text: "Atendimento rápido e produto autêntico. Já indiquei para várias amigas." },
  { name: "Pedro H.", city: "Brasília/DF", text: "Chegou em 48h com toda segurança. Resultados incríveis no tratamento." },
  { name: "Fernanda R.", city: "Recife/PE", text: "Melhor preço da internet e produto 100% original. Voltarei a comprar." },
  { name: "Lucas O.", city: "Fortaleza/CE", text: "Super recomendo. Embalagem térmica perfeita e nota fiscal incluída." },
];

export const Testimonials = () => {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  return (
  <section className="container py-8 sm:py-12 md:py-20">
    <div className="text-center mb-6 sm:mb-10 max-w-2xl mx-auto">
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-primary mb-2">Depoimentos</p>
      <h2 className="font-serif-display text-2xl sm:text-3xl md:text-5xl text-foreground text-balance">
        Quem usou, aprovou
      </h2>
      <p className="text-sm md:text-base text-muted-foreground mt-2 sm:mt-3 px-2">
        Mais de 12 mil clientes confiam no nosso atendimento e na qualidade do produto.
      </p>
    </div>

    <Carousel
      opts={{ align: "start", loop: true }}
      plugins={[autoplay.current]}
      className="w-full"
    >
      <CarouselContent className="-ml-3 sm:-ml-4">
        {reviews.map((r) => (
          <CarouselItem key={r.name} className="pl-3 sm:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
            <article className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-card hover:shadow-card-hover transition-all h-full flex flex-col">
              <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-primary/30 mb-2 sm:mb-3" />
              <div className="flex gap-0.5 mb-2 sm:mb-3">
                {[0, 1, 2, 3, 4].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-[13px] sm:text-sm text-foreground leading-relaxed flex-1">"{r.text}"</p>
              <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border">
                <p className="font-semibold text-[13px] sm:text-sm text-foreground">{r.name}</p>
                <p className="text-[11px] sm:text-xs text-muted-foreground">{r.city}</p>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex -left-3" />
      <CarouselNext className="hidden sm:flex -right-3" />
    </Carousel>
  </section>
);
};
