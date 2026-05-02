import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "O Mounjaro é original?", a: "Sim, 100% original Eli Lilly, com nota fiscal e lote rastreável. Comercializado conforme legislação ANVISA." },
  { q: "Como é feita a entrega refrigerada?", a: "Enviamos em embalagem térmica com gelo gel, mantendo a temperatura entre 2°C e 8°C durante todo o trajeto. Entregamos para todo o Brasil em até 5 dias úteis." },
  { q: "Preciso enviar receita médica?", a: "Sim. Após a confirmação do pagamento, você envia a foto da receita pelo WhatsApp. Sem receita não despachamos." },
  { q: "Quais formas de pagamento vocês aceitam?", a: "PIX (com QR Code instantâneo), boleto e cartão em até 12x sem juros." },
  { q: "Frete é realmente grátis?", a: "Sim, frete grátis em todas as doses para qualquer cidade do Brasil." },
  { q: "Posso comprar mais de uma caixa?", a: "Pode! Adicione a quantidade desejada ao carrinho. Você economiza ainda mais no tratamento." },
];

export const FAQSection = () => (
  <section className="bg-secondary/40 py-14 md:py-20">
    <div className="container max-w-3xl">
      <div className="text-center mb-8 md:mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Perguntas frequentes</p>
        <h2 className="font-serif-display text-3xl md:text-5xl text-foreground text-balance">
          Tire suas dúvidas
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-2xl border border-border px-5 shadow-card">
              <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);
