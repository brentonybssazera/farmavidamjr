import { FileText, CreditCard, Truck, HeartPulse } from "lucide-react";

const steps = [
  { Icon: FileText, t: "Envie sua receita", d: "Anexe a foto da receita médica no checkout" },
  { Icon: CreditCard, t: "Pague com segurança", d: "PIX, boleto ou cartão em até 12x" },
  { Icon: Truck, t: "Receba em casa", d: "Entrega refrigerada em todo o Brasil" },
  { Icon: HeartPulse, t: "Cuide da sua saúde", d: "Suporte de farmacêutico durante o tratamento" },
];

export const HowItWorks = () => (
  <section className="bg-gradient-soft py-16">
    <div className="container">
      <div className="text-center mb-12">
        <p className="inline-block px-4 py-1.5 rounded-full bg-accent-soft text-accent text-sm font-bold uppercase tracking-wide mb-3">
          Simples e seguro
        </p>
        <h2 className="font-serif-display text-4xl md:text-5xl text-foreground">Como comprar em 4 passos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map(({ Icon, t, d }, i) => (
          <div key={t} className="bg-card rounded-3xl p-6 border-2 border-border shadow-card relative">
            <div className="absolute -top-4 -left-2 h-12 w-12 rounded-2xl bg-gradient-brand text-primary-foreground font-serif-display text-2xl flex items-center justify-center shadow-brand">
              {i + 1}
            </div>
            <Icon className="h-10 w-10 text-primary mt-4 mb-3" strokeWidth={2} />
            <h3 className="font-bold text-xl text-foreground mb-1">{t}</h3>
            <p className="text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
