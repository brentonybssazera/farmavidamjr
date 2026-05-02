import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Mariana S.", city: "São Paulo/SP", text: "Recebi em 2 dias, refrigerado e original. Já perdi 8kg em 2 meses. Recomendo demais!" },
  { name: "Carlos A.", city: "Rio de Janeiro/RJ", text: "Suporte por WhatsApp impecável. Tiraram todas as dúvidas antes da compra." },
  { name: "Patrícia L.", city: "Belo Horizonte/MG", text: "Preço justo e nota fiscal. Comprei outras vezes em farmácia e era muito mais caro." },
  { name: "Rafael T.", city: "Curitiba/PR", text: "Embalagem perfeita, gelo gel ainda gelado. Confiança total na FarmaVida." },
];

export const Testimonials = () => (
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

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {reviews.map((r, i) => (
        <motion.article
          key={r.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-card rounded-2xl border border-border p-4 sm:p-5 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all"
        >
          <Quote className="h-5 w-5 sm:h-6 sm:w-6 text-primary/30 mb-2 sm:mb-3" />
          <div className="flex gap-0.5 mb-2 sm:mb-3">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star key={s} className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-[13px] sm:text-sm text-foreground leading-relaxed">"{r.text}"</p>
          <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-border">
            <p className="font-semibold text-[13px] sm:text-sm text-foreground">{r.name}</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground">{r.city}</p>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);
