import heroPen from "@/assets/hero-pen.jpg";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, Stethoscope } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-soft">
      <div className="container py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-primary/10">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-primary">Estoque refrigerado · Entrega expressa</span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] text-primary">
            Monjaro<sup className="text-2xl font-normal text-accent">®</sup>
            <br />
            <span className="text-foreground/80 italic font-normal">com cuidado clínico</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Tirzepatida original Eli Lilly, dispensada por farmácia autorizada.
            Acompanhamento farmacêutico, cadeia de frio garantida e entrega discreta em todo o Brasil.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-xl h-12 px-7 text-base shadow-glow">
              <a href="#produtos">Ver dosagens disponíveis</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl h-12 px-7 text-base border-primary/20 hover:bg-secondary">
              <a href="#como-funciona">Como funciona</a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60">
            {[
              { Icon: ShieldCheck, label: "Original Lilly" },
              { Icon: Truck, label: "Entrega 2-7°C" },
              { Icon: Stethoscope, label: "Suporte clínico" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-start gap-2">
                <Icon className="h-5 w-5 text-primary" strokeWidth={2} />
                <span className="text-xs font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-hero rounded-[2rem] blur-3xl opacity-20 scale-90" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-glow border border-border/40">
            <img
              src={heroPen}
              alt="Caneta de tirzepatida Monjaro em pedestal médico minimalista"
              width={1536}
              height={1024}
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-background rounded-2xl shadow-card p-4 border border-border/60 hidden md:block">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-success/15 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">ANVISA</p>
                <p className="text-sm font-semibold text-foreground">Registro 1.0068.1239</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
