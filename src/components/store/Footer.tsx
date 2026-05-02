import { Pill } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground/80 py-14 mt-10">
      <div className="container grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center">
              <Pill className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold text-primary-foreground">Vital Pharma</span>
          </div>
          <p className="text-sm leading-relaxed max-w-md">
            Farmácia especializada em medicamentos termolábeis. CRF-SP 00.000 · Farmacêutica responsável: Dra. Marina Silva.
          </p>
        </div>
        <div>
          <h4 className="text-primary-foreground font-semibold mb-3 text-sm">Loja</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#produtos" className="hover:text-accent transition-colors">Produtos</a></li>
            <li><a href="#como-funciona" className="hover:text-accent transition-colors">Como funciona</a></li>
            <li><a href="#faq" className="hover:text-accent transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-primary-foreground font-semibold mb-3 text-sm">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li>0800 000 0000</li>
            <li>contato@vitalpharma.com.br</li>
            <li>Seg–Sex · 8h–20h</li>
          </ul>
        </div>
      </div>
      <div className="container mt-10 pt-6 border-t border-primary-foreground/10 text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} Vital Pharma. Medicamento sob prescrição médica. Pode causar efeitos indesejáveis. Leia a bula.
      </div>
    </footer>
  );
};
