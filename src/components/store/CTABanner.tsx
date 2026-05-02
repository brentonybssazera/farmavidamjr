import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const CTABanner = () => (
  <section className="container py-10 md:py-16">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-14 text-center text-primary-foreground shadow-brand"
    >
      <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="h-3.5 w-3.5" /> Compra protegida
        </span>
        <h2 className="font-serif-display text-3xl md:text-5xl mt-4 text-balance">
          Comece seu tratamento hoje
        </h2>
        <p className="text-base md:text-lg opacity-95 mt-3 max-w-xl mx-auto">
          Frete grátis, entrega refrigerada e suporte de farmacêutico de verdade. Pagamento via PIX em segundos.
        </p>
        <Button asChild size="lg" className="mt-7 rounded-full h-14 px-8 text-base font-bold bg-white text-primary hover:bg-white/95 shadow-card-hover">
          <a href="#produtos">
            Ver doses disponíveis <ArrowRight className="h-5 w-5 ml-2" />
          </a>
        </Button>
      </div>
    </motion.div>
  </section>
);
