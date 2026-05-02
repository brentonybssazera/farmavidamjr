import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Loader2, Upload } from "lucide-react";
import { Topbar } from "@/components/store/Topbar";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { CartSheet } from "@/components/store/CartSheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cartStore";
import { formatBRL } from "@/lib/products";
import { toast } from "sonner";

const Checkout = () => {
  const { items, total, clear } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  if (items.length === 0) return <Navigate to="/" replace />;

  const handlePlace = () => {
    setPlacing(true);
    setTimeout(() => {
      toast.success("Pedido recebido!", { description: "Em breve nossa equipe entrará em contato.", position: "top-center" });
      clear();
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="flex-1 container py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary mb-6 font-semibold">
          <ArrowLeft className="h-5 w-5" /> Continuar comprando
        </Link>

        <h1 className="font-serif-display text-4xl text-foreground mb-6">Finalizar pedido</h1>

        <div className="bg-card rounded-3xl border-2 border-border shadow-card p-6 mb-6">
          <h2 className="font-bold text-xl mb-4">Resumo do pedido</h2>
          <div className="space-y-3">
            {items.map((it) => (
              <div key={it.product.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <img src={it.product.image} alt="" className="h-14 w-14 rounded-xl object-cover bg-muted" />
                  <div>
                    <p className="font-semibold">{it.product.name}</p>
                    <p className="text-sm text-muted-foreground">Qtd: {it.quantity}</p>
                  </div>
                </div>
                <p className="font-bold">{formatBRL(it.product.price * it.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-baseline mt-5 pt-4 border-t-2 border-border">
            <span className="text-lg">Total</span>
            <span className="font-serif-display text-3xl text-foreground">{formatBRL(total())}</span>
          </div>
        </div>

        <div className="bg-info-soft border-2 border-info/20 rounded-3xl p-6 mb-6 flex gap-4">
          <Upload className="h-8 w-8 text-info flex-shrink-0 mt-1" />
          <div>
            <p className="font-bold text-lg">Envio da receita médica</p>
            <p className="text-muted-foreground">Após confirmar o pedido, nossa equipe entrará em contato pelo WhatsApp para coletar a foto da receita branca de controle especial.</p>
          </div>
        </div>

        <Button onClick={handlePlace} disabled={placing} size="lg"
          className="w-full h-16 rounded-2xl text-lg font-bold bg-gradient-promo text-success-foreground shadow-brand">
          {placing ? <Loader2 className="h-6 w-6 animate-spin" /> : (<><Check className="h-6 w-6 mr-2" strokeWidth={3} /> Confirmar pedido</>)}
        </Button>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
