import { useState } from "react";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Check, ShieldCheck, Snowflake, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Topbar } from "@/components/store/Topbar";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { CartSheet } from "@/components/store/CartSheet";
import { getProduct, formatBRL } from "@/lib/products";
import { useCart } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const [qty, setQty] = useState(1);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();
  const add = useCart((s) => s.add);

  if (!product) return <Navigate to="/" replace />;

  const handleAdd = () => {
    add(product, qty);
    toast.success("Adicionado ao carrinho!", { description: product.name, position: "top-center" });
    setCartOpen(true);
  };

  const handleBuy = () => {
    add(product, qty);
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="flex-1 container py-5 sm:py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-primary mb-4 sm:mb-6 font-semibold">
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" /> Voltar para a loja
        </Link>

        <div className="grid lg:grid-cols-2 gap-5 sm:gap-10">
          <div className="bg-gradient-soft rounded-2xl sm:rounded-3xl p-5 sm:p-10 flex items-center justify-center border border-border sm:border-2 shadow-card">
            <img src={product.image} alt={product.name} className="max-h-[280px] sm:max-h-[480px] w-auto object-contain" />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <p className="text-[11px] sm:text-sm font-bold uppercase tracking-wider text-primary">{product.dose}</p>
              <h1 className="font-serif-display text-2xl sm:text-4xl md:text-5xl text-foreground mt-1 leading-tight">{product.name}</h1>
            </div>

            <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed">{product.longDescription}</p>

            <div className="bg-success-soft border border-success/20 sm:border-2 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
              <Check className="h-5 w-5 sm:h-6 sm:w-6 text-success flex-shrink-0" strokeWidth={3} />
              <div>
                <p className="font-bold text-success text-sm sm:text-base">Em estoque · Envio em 24h</p>
                <p className="text-xs sm:text-sm text-foreground">Entrega refrigerada para todo o Brasil</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border sm:border-2 p-4 sm:p-6 shadow-card">
              {product.oldPrice && (
                <p className="text-sm sm:text-lg text-muted-foreground line-through">De {formatBRL(product.oldPrice)}</p>
              )}
              <p className="font-serif-display text-3xl sm:text-5xl text-foreground leading-none mt-1">{formatBRL(product.price)}</p>
              <p className="text-success font-bold mt-2 text-sm sm:text-base">ou 12x de {formatBRL(product.price / 12)} sem juros</p>
              <p className="text-xs sm:text-sm text-muted-foreground">PIX com 5% de desconto: <strong className="text-foreground">{formatBRL(product.price * 0.95)}</strong></p>

              <div className="flex items-center gap-2.5 sm:gap-4 mt-4 sm:mt-6">
                <div className="flex items-center bg-secondary rounded-2xl flex-shrink-0">
                  <Button variant="ghost" size="icon" className="h-11 w-11 sm:h-14 sm:w-14" onClick={() => setQty(Math.max(1, qty - 1))}>
                    <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <span className="w-9 sm:w-12 text-center font-bold text-base sm:text-xl">{qty}</span>
                  <Button variant="ghost" size="icon" className="h-11 w-11 sm:h-14 sm:w-14" onClick={() => setQty(qty + 1)}>
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
                <Button onClick={handleAdd} variant="outline" size="lg" className="flex-1 h-11 sm:h-14 rounded-2xl border-2 text-sm sm:text-base font-bold">
                  Adicionar
                </Button>
              </div>

              <Button
                onClick={handleBuy}
                size="lg"
                className="w-full mt-3 h-12 sm:h-14 rounded-2xl bg-gradient-promo text-success-foreground font-bold text-base sm:text-lg shadow-brand"
              >
                Comprar agora
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
              {[
                { Icon: ShieldCheck, t: "Original" },
                { Icon: Snowflake, t: "Refrigerado" },
                { Icon: Truck, t: "Frete fácil" },
              ].map(({ Icon, t }) => (
                <div key={t} className="flex flex-col items-center gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-secondary">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <span className="text-xs sm:text-sm font-semibold">{t}</span>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground bg-info-soft border border-info/20 rounded-xl p-3">
              ℹ️ Venda mediante apresentação de receita médica. A receita branca de controle especial será retida na entrega.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
