import { Link } from "react-router-dom";
import { Pill } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-soft">
            <Pill className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold text-primary">Vital Pharma</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Tirzepatida · Cuidado clínico</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#produtos" className="hover:text-primary transition-colors">Produtos</a>
          <a href="#como-funciona" className="hover:text-primary transition-colors">Como funciona</a>
          <a href="#seguranca" className="hover:text-primary transition-colors">Segurança</a>
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
        </nav>

        <CartDrawer />
      </div>
    </header>
  );
};
