import { FileText, CreditCard, Truck, HeartPulse } from "lucide-react";

const steps = [
  { Icon: FileText, t: "Envie sua receita", d: "Anexe a foto da receita médica no checkout" },
  { Icon: CreditCard, t: "Pague com segurança", d: "PIX, boleto ou cartão em até 12x" },
  { Icon: Truck, t: "Receba em casa", d: "Entrega refrigerada em todo o Brasil" },
  { Icon: HeartPulse, t: "Cuide da sua saúde", d: "Suporte de farmacêutico durante o tratamento" },
];

export const HowItWorks = () => (
  <section id="como-funciona" className="bg-secondary/40 py-10 sm:py-16 mt-4 sm:mt-8">
    <div className="container">
      <div className="text-center mb-7 sm:mb-12 max-w-2xl mx-auto">
        <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-primary mb-2">Como funciona</p>
        <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-foreground text-balance">Compre em 4 passos simples</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {steps.map(({ Icon, t, d }, i) => (
          <div key={t} className="bg-card rounded-2xl p-4 sm:p-6 border border-border">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary text-primary-foreground font-bold text-xs sm:text-sm flex items-center justify-center">
                {i + 1}
              </div>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" strokeWidth={2} />
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 leading-tight">{t}</h3>
            <p className="text-[12px] sm:text-sm text-muted-foreground leading-snug">{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
