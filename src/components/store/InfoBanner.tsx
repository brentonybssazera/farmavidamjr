import { ShieldCheck, Snowflake, Headphones, CreditCard } from "lucide-react";

const items = [
  { Icon: ShieldCheck, title: "100% Original", desc: "Eli Lilly · com nota fiscal", color: "text-primary bg-primary-soft" },
  { Icon: Snowflake, title: "Cadeia de Frio", desc: "Embalagem refrigerada 2-8°C", color: "text-info bg-info-soft" },
  { Icon: CreditCard, title: "12x sem juros", desc: "PIX com 5% de desconto", color: "text-success bg-success-soft" },
  { Icon: Headphones, title: "Atendimento humano", desc: "Farmacêutico disponível", color: "text-accent bg-accent-soft" },
];

export const InfoBanner = () => (
  <section className="container py-10">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(({ Icon, title, desc, color }) => (
        <div key={title} className="flex items-center gap-4 p-5 rounded-2xl bg-card border-2 border-border shadow-card">
          <div className={`h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
            <Icon className="h-7 w-7" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-base text-foreground leading-tight">{title}</p>
            <p className="text-sm text-muted-foreground leading-tight mt-0.5">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
