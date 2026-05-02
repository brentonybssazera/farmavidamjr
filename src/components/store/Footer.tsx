import { HeartPulse, Phone, Mail, MapPin } from "lucide-react";

export const Footer = () => (
  <footer className="bg-foreground text-background mt-16">
    <div className="container py-14 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-brand flex items-center justify-center">
            <HeartPulse className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-serif-display text-2xl">FarmaVida</span>
        </div>
        <p className="text-background/70 max-w-md leading-relaxed">
          Farmácia especializada em medicamentos termolábeis. Cadastrada na ANVISA.
          Farmacêutica responsável: Dra. Marina Silva — CRF/SP 00.000.
        </p>
      </div>

      <div>
        <h4 className="font-bold mb-4 text-base">Contato</h4>
        <ul className="space-y-3 text-background/80 text-base">
          <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> 0800 000 0000</li>
          <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> contato@farmavida.com.br</li>
          <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-accent mt-1" /> São Paulo · SP</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-4 text-base">Loja</h4>
        <ul className="space-y-3 text-background/80 text-base">
          <li><a href="#produtos" className="hover:text-accent">Produtos</a></li>
          <li><a href="/auth" className="hover:text-accent">Minha conta</a></li>
          <li><a href="#produtos" className="hover:text-accent">Política de entrega</a></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-background/10">
      <div className="container py-5 text-sm text-background/60 text-center">
        © {new Date().getFullYear()} FarmaVida · Medicamento sob prescrição médica · Pode causar efeitos indesejáveis · Leia a bula
      </div>
    </div>
  </footer>
);
