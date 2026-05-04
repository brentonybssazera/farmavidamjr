import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Snowflake, Truck, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-product.jpg";

export const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-soft">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-10 -left-20 h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-10 -right-20 h-80 w-80 sm:h-96 sm:w-96 rounded-full bg-accent/15 blur-3xl" />
    </div>

    <div className="container py-6 md:py-20 grid md:grid-cols-2 gap-5 md:gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wider"
        >
          <Sparkles className="h-3.5 w-3.5" /> Original VitaPharma Laboratories · Estoque limitado
        </motion.span>

        <h1 className="font-serif-display text-[1.75rem] xs:text-[2rem] sm:text-5xl md:text-6xl text-foreground leading-[1.1] mt-3 sm:mt-4 text-balance">
          Mounjaro <span className="text-primary">Tirzepatida</span> direto da farmácia
        </h1>

        <p className="text-[13px] sm:text-base md:text-lg text-muted-foreground mt-2.5 sm:mt-4 max-w-xl mx-auto md:mx-0">
          Todas as doses por <strong className="text-foreground">R$ 199,98</strong>, com frete grátis e entrega refrigerada para todo o Brasil.
        </p>

        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-foreground/80 text-[10px] sm:text-xs font-medium">
          ⏰ Condições promocionais válidas até hoje
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-4 sm:mt-7 justify-center md:justify-start">
          <Button asChild size="lg" className="rounded-full h-12 sm:h-14 px-6 sm:px-7 text-sm sm:text-base font-semibold bg-primary hover:bg-primary/90 shadow-brand">
            <a href="#produtos">
              Ver catálogo <ArrowRight className="h-5 w-5 ml-1.5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full h-12 sm:h-14 px-6 sm:px-7 text-sm sm:text-base font-semibold border-2">
            <Link to="/como-comprar">Como comprar</Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-5 sm:mt-7 justify-center md:justify-start text-[11px] sm:text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" /> 100% Original</span>
          <span className="flex items-center gap-1.5"><Snowflake className="h-4 w-4 text-info" /> Cadeia de frio 2-8°C</span>
          <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" /> Frete grátis Brasil</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative max-w-sm mx-auto md:max-w-none w-full"
      >
        <div className="relative rounded-3xl overflow-hidden bg-secondary/40 border border-border shadow-card">
          <img
            src={heroImg}
            alt="Mounjaro Tirzepatida — caixa e caneta aplicadora"
            width={1280}
            height={1280}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-muted-foreground">
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
            ))}
          </div>
          <span><strong className="text-foreground">4,9/5</strong> · +12.000 clientes atendidos</span>
        </div>
      </motion.div>
    </div>
  </section>
);
