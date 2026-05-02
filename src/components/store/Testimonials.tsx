import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Mariana S.", city: "São Paulo/SP", text: "Recebi em 2 dias, refrigerado e original. Já perdi 8kg em 2 meses. Recomendo demais!" },
  { name: "Carlos A.", city: "Rio de Janeiro/RJ", text: "Suporte por WhatsApp impecável. Tiraram todas as dúvidas antes da compra." },
  { name: "Patrícia L.", city: "Belo Horizonte/MG", text: "Preço justo e nota fiscal. Comprei outras vezes em farmácia e era muito mais caro." },
  { name: "Rafael T.", city: "Curitiba/PR", text: "Embalagem perfeita, gelo gel ainda gelado. Confiança total na FarmaVida." },
];

export const Testimonials = () => (
  <section className="container py-12 md:py-20">
    <div className="text-center mb-10 max-w-2xl mx-auto">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Depoimentos</p>
      <h2 className="font-serif-display text-3xl md:text-5xl text-foreground text-balance">
        Quem usou, aprovou
      </h2>
      <p className="text-sm md:text-base text-muted-foreground mt-3">
        Mais de 12 mil clientes confiam no nosso atendimento e na qualidade do produto.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {reviews.map((r, i) => (
        <motion.article
          key={r.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-card rounded-2xl border border-border p-5 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all"
        >
          <Quote className="h-6 w-6 text-primary/30 mb-3" />
          <div className="flex gap-0.5 mb-3">
            {[0, 1, 2, 3, 4].map((s) => (
              <Star key={s} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-sm text-foreground leading-relaxed">"{r.text}"</p>
          <div className="mt-4 pt-3 border-t border-border">
            <p className="font-semibold text-sm text-foreground">{r.name}</p>
            <p className="text-xs text-muted-foreground">{r.city}</p>
          </div>
        </motion.article>
      ))}
    </div>
  </section>
);
