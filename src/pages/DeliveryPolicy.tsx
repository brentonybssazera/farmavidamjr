import { Link } from "react-router-dom";
import { ArrowLeft, Snowflake, Clock, Truck, MapPin, ShieldCheck, AlertTriangle, Package } from "lucide-react";
import { Topbar } from "@/components/store/Topbar";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { CartSheet } from "@/components/store/CartSheet";
import { useState } from "react";

const DeliveryPolicy = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="flex-1 bg-gradient-soft py-10">
        <div className="container max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary font-semibold mb-6">
            <ArrowLeft className="h-5 w-5" /> Voltar para a loja
          </Link>

          <div className="bg-card rounded-3xl border-2 border-border shadow-card p-8 md:p-12">
            <p className="inline-block px-4 py-1.5 rounded-full bg-primary-soft text-primary text-sm font-bold uppercase tracking-wide mb-3">
              Transparência total
            </p>
            <h1 className="font-display-bold text-4xl md:text-5xl text-foreground mb-3">
              Política de Entrega
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Tudo o que você precisa saber para receber seu Mounjaro com segurança.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-12">
              <Card icon={Snowflake} color="bg-info-soft text-info" title="Cadeia de frio 2-8°C"
                desc="Caixa térmica com gelo gel reciclável, mantendo a temperatura ideal por até 72h." />
              <Card icon={Clock} color="bg-success-soft text-success" title="Prazo de envio"
                desc="Despacho em até 24h úteis após confirmação do pagamento e da receita médica." />
              <Card icon={Truck} color="bg-accent-soft text-accent" title="Entrega refrigerada"
                desc="Transportadora especializada em produtos termolábeis. Rastreamento em tempo real." />
              <Card icon={MapPin} color="bg-primary-soft text-primary" title="Cobertura nacional"
                desc="Enviamos para todos os estados brasileiros a partir de Porto Velho/RO." />
            </div>

            <Section title="Prazos de entrega por região">
              <ul className="space-y-2">
                <Row region="Rondônia, Acre, Amazonas" time="1 a 2 dias úteis" />
                <Row region="Norte e Centro-Oeste" time="2 a 4 dias úteis" />
                <Row region="Sudeste e Nordeste" time="3 a 5 dias úteis" />
                <Row region="Sul" time="4 a 6 dias úteis" />
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Prazos contados após o despacho. Frete fixo de R$ 49,90 para todo o Brasil.
              </p>
            </Section>

            <Section title="Como garantimos a integridade do medicamento">
              <ul className="space-y-3 text-base">
                <Item icon={Package} text="Embalagem isotérmica certificada com selo de violação." />
                <Item icon={Snowflake} text="Indicador de temperatura dentro de cada caixa — você confere no recebimento." />
                <Item icon={ShieldCheck} text="Conferência fotográfica antes do despacho (anexada ao pedido)." />
                <Item icon={Truck} text="Transporte exclusivamente diurno e em veículos refrigerados." />
              </ul>
            </Section>

            <Section title="Condições para o envio">
              <ul className="list-disc pl-6 space-y-2 text-base text-foreground/90">
                <li>Receita médica válida (até 30 dias) anexada no checkout ou enviada por WhatsApp.</li>
                <li>Endereço completo com CEP e ponto de referência.</li>
                <li>Recebimento pelo titular ou maior de 18 anos no local.</li>
                <li>Pagamento confirmado (PIX, cartão ou boleto compensado).</li>
              </ul>
            </Section>

            <Section title="Recebimento e troca">
              <p className="text-base text-foreground/90 mb-3">
                No ato da entrega, confira a embalagem, o lacre e o indicador de temperatura.
                Caso identifique qualquer irregularidade — caixa violada, gelo descongelado ou
                temperatura fora do padrão —, <strong>recuse o recebimento</strong> e nos avise
                imediatamente pelo WhatsApp <a href="https://wa.me/5519984403849" target="_blank" rel="noreferrer" className="text-primary font-semibold underline">(19) 98440-3849</a>.
                Faremos a substituição sem custo em até 48h.
              </p>
              <div className="flex gap-3 p-4 rounded-2xl bg-accent-soft border-2 border-accent/20">
                <AlertTriangle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  Por se tratar de medicamento sob prescrição, não realizamos trocas ou
                  devoluções após o recebimento conforme. RDC ANVISA nº 44/2009.
                </p>
              </div>
            </Section>

            <Section title="Dúvidas?">
              <p className="text-base">
                Fale direto com nossa farmacêutica responsável <strong>Dra. Marina Silva Andrade — CRF/RO 7.842</strong> pelo
                WhatsApp <a href="https://wa.me/5519984403849" target="_blank" rel="noreferrer" className="text-primary font-semibold underline">(19) 98440-3849</a>.
              </p>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Card = ({ icon: Icon, color, title, desc }: any) => (
  <div className="flex gap-4 p-5 rounded-2xl bg-secondary border border-border">
    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon className="h-6 w-6" strokeWidth={2.5} />
    </div>
    <div>
      <p className="font-bold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground leading-snug mt-0.5">{desc}</p>
    </div>
  </div>
);

const Section = ({ title, children }: any) => (
  <section className="mb-10">
    <h2 className="font-serif-display text-2xl text-foreground mb-4">{title}</h2>
    {children}
  </section>
);

const Row = ({ region, time }: { region: string; time: string }) => (
  <li className="flex items-center justify-between py-3 px-4 rounded-xl bg-secondary border border-border">
    <span className="font-semibold text-foreground">{region}</span>
    <span className="text-primary font-bold">{time}</span>
  </li>
);

const Item = ({ icon: Icon, text }: any) => (
  <li className="flex items-start gap-3">
    <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
    <span>{text}</span>
  </li>
);

export default DeliveryPolicy;
