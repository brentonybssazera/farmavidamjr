import { FileText, CreditCard, Truck, HeartPulse } from "lucide-react";

const steps = [
  { Icon: FileText, t: "Envie sua receita", d: "Anexe a foto da receita médica no checkout" },
  { Icon: CreditCard, t: "Pague com segurança", d: "PIX, boleto ou cartão em até 12x" },
  { Icon: Truck, t: "Receba em casa", d: "Entrega refrigerada em todo o Brasil" },
  { Icon: HeartPulse, t: "Cuide da sua saúde", d: "Suporte de farmacêutico durante o tratamento" },
];

export const HowItWorks = () => (
  <section id="como-funciona" className="bg-secondary/40 py-16 mt-8">
    <div className="container">
      <div className="text-center mb-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Como funciona</p>
        <h2 className="font-serif-display text-3xl md:text-4xl text-foreground">Compre em 4 passos simples</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map(({ Icon, t, d }, i) => (
          <div key={t} className="bg-card rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
                {i + 1}
              </div>
              <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-base text-foreground mb-1">{t}</h3>
            <p className="text-sm text-muted-foreground leading-snug">{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
