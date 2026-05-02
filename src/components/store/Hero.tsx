import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Snowflake, Truck, Star, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-product.jpg";

export const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-soft">
    <div className="absolute inset-0 -z-10">
      <div className="absolute top-10 -left-20 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute bottom-10 -right-20 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
    </div>

    <div className="container py-10 md:py-20 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-semibold uppercase tracking-wider"
        >
          <Sparkles className="h-3.5 w-3.5" /> Original Eli Lilly · Promoção
        </motion.span>

        <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-foreground leading-[1.05] mt-4 text-balance">
          Mounjaro <span className="text-primary">Tirzepatida</span> com frete grátis
        </h1>

        <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-xl mx-auto md:mx-0">
          Todas as doses por <strong className="text-foreground">R$ 210,99</strong>. Entrega refrigerada em todo o Brasil, com nota fiscal e suporte de farmacêutico.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-7 justify-center md:justify-start">
          <Button asChild size="lg" className="rounded-full h-14 px-7 text-base font-semibold bg-primary hover:bg-primary/90 shadow-brand">
            <a href="#produtos">
              Ver catálogo <ArrowRight className="h-5 w-5 ml-1.5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-7 text-base font-semibold border-2">
            <Link to="/como-comprar">Como comprar</Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" /> 100% Original</span>
          <span className="flex items-center gap-1.5"><Snowflake className="h-4 w-4 text-info" /> Cadeia de frio</span>
          <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" /> Frete grátis</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-3xl overflow-hidden shadow-card-hover bg-gradient-brand"
        >
          <img src={heroImg} alt="Mounjaro Tirzepatida" width={1280} height={1280}
            className="w-full h-auto object-cover mix-blend-luminosity opacity-95" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-4 -left-2 sm:-left-6 bg-card rounded-2xl shadow-card-hover border border-border p-3 sm:p-4 flex items-center gap-3"
        >
          <div className="flex -space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 fill-accent text-accent" />
            ))}
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-foreground leading-none">+12.000 clientes</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">avaliam como excelente</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="absolute -top-3 -right-2 sm:-right-4 bg-success text-success-foreground rounded-full px-4 py-2 shadow-brand text-xs font-bold uppercase tracking-wider"
        >
          Frete Grátis
        </motion.div>
      </motion.div>
    </div>
  </section>
);
