import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/logo.png";

export const Footer = () => (
  <footer className="bg-foreground text-background mt-10 sm:mt-16">
    <div className="container py-10 sm:py-14 grid md:grid-cols-4 gap-8 sm:gap-10">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
          <img src={logoImg} alt="FarmaVida" className="h-10 w-10 sm:h-11 sm:w-11 object-contain bg-background rounded-lg p-1" />
          <span className="font-serif-display text-xl sm:text-2xl">FarmaVida</span>
        </div>
        <p className="text-background/70 max-w-md leading-relaxed text-sm sm:text-base">
          Farmácia especializada em medicamentos termolábeis e tratamentos GLP-1.
          Cadastrada na ANVISA. Farmacêutica responsável: Dra. Marina Silva Andrade — <strong className="text-background">CRF/RO 7.842</strong>.
        </p>
        <p className="text-background/60 text-xs sm:text-sm mt-3 sm:mt-4">
          CNPJ: 47.218.903/0001-66 · Autorização de Funcionamento ANVISA nº 1.04.821-3
        </p>
      </div>

      <div>
        <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base uppercase tracking-wider">Contato</h4>
        <ul className="space-y-2.5 sm:space-y-3 text-background/80 text-sm sm:text-base">
          <li>
            <a href="https://wa.me/5519984403849" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent">
              <MessageCircle className="h-4 w-4 text-success" /> WhatsApp (19) 98440-3849
            </a>
          </li>
          <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> (19) 98440-3849</li>
          <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> contato@farmavida.com.br</li>
          <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-accent mt-1" /> Av. Sete de Setembro, 1234<br/>Centro · Porto Velho · RO</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-3 sm:mb-4 text-sm sm:text-base uppercase tracking-wider">Loja</h4>
        <ul className="space-y-2.5 sm:space-y-3 text-background/80 text-sm sm:text-base">
          <li><Link to="/" className="hover:text-accent">Produtos</Link></li>
          <li><Link to="/como-comprar" className="hover:text-accent">Como comprar</Link></li>
          <li><Link to="/politica-de-entrega" className="hover:text-accent">Política de entrega</Link></li>
          <li><Link to="/auth" className="hover:text-accent">Minha conta</Link></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-background/10">
      <div className="container py-4 sm:py-5 text-xs sm:text-sm text-background/60 text-center px-4">
        © {new Date().getFullYear()} FarmaVida · Medicamento sob prescrição médica · Pode causar efeitos indesejáveis · Leia a bula
      </div>
    </div>
  </footer>
);
