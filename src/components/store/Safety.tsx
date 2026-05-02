import { ShieldCheck, AlertTriangle, BadgeCheck } from "lucide-react";

export const Safety = () => {
  return (
    <section id="seguranca" className="container py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Segurança & responsabilidade</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-primary leading-tight mb-6">
            Medicamento sob prescrição.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Monjaro (tirzepatida) é uso restrito à orientação médica. A Vital Pharma opera como farmácia
            autorizada pela ANVISA e jamais dispensa o medicamento sem receita válida.
          </p>
          <div className="space-y-4">
            {[
              { Icon: BadgeCheck, t: "Farmácia licenciada", d: "CRF ativo · Inspeção sanitária vigente" },
              { Icon: ShieldCheck, t: "Cadeia de frio rastreável", d: "Termômetros validados em todas as etapas" },
              { Icon: AlertTriangle, t: "Receita obrigatória", d: "Receita branca em duas vias retida no ato da entrega" },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="flex gap-4 items-start">
                <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t}</h4>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-soft border border-border/60 p-8 md:p-10 shadow-card" id="faq">
          <h3 className="font-display text-2xl font-semibold text-primary mb-6">Perguntas frequentes</h3>
          <div className="space-y-5">
            {[
              { q: "Preciso de receita?", a: "Sim. A receita branca de controle especial é obrigatória e será retida no ato da entrega." },
              { q: "Como é feita a entrega?", a: "Em embalagem isotérmica com gelo gel, mantendo 2–8°C por até 72h. Despacho em até 24h úteis." },
              { q: "Posso parcelar?", a: "Sim, parcelamos no cartão em até 6x sem juros. Pix com 5% de desconto." },
              { q: "E se a caneta chegar fora da temperatura?", a: "Trocamos imediatamente sem custo. Cada caixa contém termorregistrador para conferência." },
            ].map(({ q, a }) => (
              <details key={q} className="group border-b border-border/60 pb-4 last:border-0">
                <summary className="font-medium text-foreground cursor-pointer flex justify-between items-center list-none">
                  {q}
                  <span className="text-accent text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
