import { Snowflake, FileCheck, MessageCircleHeart, Truck } from "lucide-react";

const steps = [
  { Icon: FileCheck, title: "Envie sua receita", desc: "Anexe sua receita médica válida durante o checkout. Conferência por farmacêutico responsável." },
  { Icon: Snowflake, title: "Armazenamento 2–8 °C", desc: "Câmara fria validada. Termorregistradores acompanham cada caixa do estoque até sua porta." },
  { Icon: Truck, title: "Entrega expressa", desc: "Embalagem isotérmica com gelo gel. Despacho em até 24h úteis para todo o Brasil." },
  { Icon: MessageCircleHeart, title: "Suporte clínico", desc: "Atendimento com farmacêutico para orientação sobre aplicação, conservação e efeitos." },
];

export const Features = () => {
  return (
    <section id="como-funciona" className="bg-primary text-primary-foreground py-24">
      <div className="container">
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">Como funciona</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
            Da prescrição<br />à sua geladeira.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ Icon, title, desc }, i) => (
            <div key={title} className="relative rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 p-6 backdrop-blur-sm">
              <div className="absolute top-6 right-6 font-display text-5xl font-bold text-accent/30">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="h-11 w-11 rounded-xl bg-accent/15 flex items-center justify-center mb-5">
                <Icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
