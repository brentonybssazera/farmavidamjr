import { ShieldCheck, Snowflake, Headphones, Truck } from "lucide-react";

const items = [
  { Icon: ShieldCheck, title: "100% Original", desc: "Eli Lilly com nota fiscal" },
  { Icon: Snowflake, title: "Cadeia de frio", desc: "Refrigerado 2-8°C" },
  { Icon: Truck, title: "Frete grátis", desc: "Para todo o Brasil" },
  { Icon: Headphones, title: "Farmacêutico", desc: "Suporte humano" },
];

export const InfoBanner = () => (
  <section className="container py-5 sm:py-8">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
      {items.map(({ Icon, title, desc }) => (
        <div key={title} className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-4 rounded-xl bg-secondary/60 border border-border/40">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary-soft flex items-center justify-center flex-shrink-0">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-[13px] sm:text-sm text-foreground leading-tight">{title}</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground leading-tight mt-0.5">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);
