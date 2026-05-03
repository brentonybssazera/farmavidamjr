import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, CreditCard, Truck, MessageCircle, ShieldCheck, Snowflake } from "lucide-react";
import { Topbar } from "@/components/store/Topbar";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { CartSheet } from "@/components/store/CartSheet";
import { Button } from "@/components/ui/button";

const steps = [
  { Icon: FileText, t: "1. Escolha sua dose", d: "Selecione a concentração de Mounjaro recomendada pelo seu médico (2,5 mg a 15 mg) e adicione ao carrinho." },
  { Icon: MessageCircle, t: "2. Envie a receita", d: "No checkout, preencha seus dados e envie a foto da receita branca de controle especial pelo WhatsApp (19) 98440-3849." },
  { Icon: CreditCard, t: "3. Pague com PIX", d: "Gere o QR Code PIX em segundos. Pagamento confirmado na hora — sem espera de boleto." },
  { Icon: Truck, t: "4. Receba refrigerado", d: "Despacho em até 24h após confirmação. Caixa térmica certificada 2-8°C com rastreio em tempo real." },
];

const faqs = [
  { q: "Preciso de receita médica?", a: "Sim. O Mounjaro é vendido sob prescrição. Aceitamos receita branca de controle especial com até 30 dias." },
  { q: "O frete é mesmo grátis?", a: "Sim, frete grátis para todo o Brasil em qualquer dose, sem valor mínimo." },
  { q: "Em quanto tempo recebo?", a: "Capitais: 1 a 4 dias úteis após o despacho. Interior: 3 a 6 dias úteis. Despachamos em até 24h após confirmação do pagamento e da receita." },
  { q: "Como o medicamento é transportado?", a: "Em embalagem isotérmica certificada com gelo gel reciclável e indicador de temperatura. Mantém 2-8°C por até 72h." },
  { q: "Posso parcelar?", a: "Sim. Em breve adicionaremos cartão em até 12x. Hoje aceitamos PIX (confirmação imediata)." },
  { q: "E se eu não estiver em casa?", a: "A transportadora faz até 3 tentativas. Você também pode coordenar entrega no trabalho ou endereço alternativo pelo WhatsApp." },
];

const HowToBuy = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="flex-1">
        <section className="container max-w-4xl py-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary font-medium mb-6">
            <ArrowLeft className="h-4 w-4" /> Voltar para a loja
          </Link>

          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Guia completo</p>
          <h1 className="font-display-bold text-3xl md:text-5xl text-foreground mb-3">Como comprar Mounjaro</h1>
          <p className="text-base text-muted-foreground mb-10 max-w-2xl">
            Em 4 passos simples você recebe seu Mounjaro original VitaPharma Laboratories em casa, com toda segurança e rapidez de uma farmácia especializada.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {steps.map(({ Icon, t, d }) => (
              <div key={t} className="bg-card border border-border rounded-2xl p-6">
                <div className="h-10 w-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5" strokeWidth={2.2} />
                </div>
                <h3 className="font-display text-lg text-foreground mb-1">{t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-3 mb-12">
            <Badge Icon={ShieldCheck} t="100% Original" d="VitaPharma Laboratories · NF" />
            <Badge Icon={Snowflake} t="Cadeia de frio" d="2-8°C garantido" />
            <Badge Icon={Truck} t="Frete grátis" d="Todo o Brasil" />
          </div>

          <h2 className="font-display-bold text-2xl md:text-3xl text-foreground mb-5">Perguntas frequentes</h2>
          <div className="space-y-3 mb-10">
            {faqs.map((f) => (
              <details key={f.q} className="group bg-card border border-border rounded-xl p-5 [&[open]]:bg-secondary/40">
                <summary className="font-semibold text-foreground cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-8 text-center">
            <h3 className="font-display-bold text-2xl mb-2">Pronto para começar?</h3>
            <p className="opacity-90 mb-5">Escolha sua dose e receba em casa com frete grátis.</p>
            <Button asChild size="lg" className="rounded-full h-12 px-8 bg-white text-primary hover:bg-white/95 font-semibold">
              <Link to="/#produtos">Ver produtos</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const Badge = ({ Icon, t, d }: { Icon: any; t: string; d: string }) => (
  <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
    <div className="h-10 w-10 rounded-full bg-primary-soft text-primary flex items-center justify-center flex-shrink-0">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="font-semibold text-sm">{t}</p>
      <p className="text-xs text-muted-foreground">{d}</p>
    </div>
  </div>
);

export default HowToBuy;