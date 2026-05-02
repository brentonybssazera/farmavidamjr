import { motion } from "framer-motion";
import { Users, Package, Star, Clock } from "lucide-react";

const stats = [
  { Icon: Users, value: "12.000+", label: "Clientes atendidos" },
  { Icon: Package, value: "98%", label: "Entregas no prazo" },
  { Icon: Star, value: "4.9/5", label: "Avaliação média" },
  { Icon: Clock, value: "24h", label: "Suporte rápido" },
];

export const Stats = () => (
  <section className="container py-10 md:py-14">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
      {stats.map(({ Icon, value, label }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-card border border-border rounded-2xl p-5 text-center hover:shadow-card-hover hover:border-primary/30 transition-all"
        >
          <Icon className="h-6 w-6 text-primary mx-auto mb-2" strokeWidth={2} />
          <p className="font-serif-display text-2xl md:text-3xl text-foreground">{value}</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">{label}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
