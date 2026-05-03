import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/stores/cartStore";
import { formatBRL } from "@/lib/products";

interface Props { open: boolean; onOpenChange: (v: boolean) => void }

export const CartSheet = ({ open, onOpenChange }: Props) => {
  const { items, setQty, remove, total } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => onOpenChange(true);
    window.addEventListener("open-cart", handler);
    return () => window.removeEventListener("open-cart", handler);
  }, [onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-5 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b text-left">
          <SheetTitle className="font-display text-xl sm:text-2xl text-foreground">Seu carrinho</SheetTitle>
          <SheetDescription className="text-xs sm:text-sm text-muted-foreground">Frete grátis garantido — pague no PIX em segundos</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="h-20 w-20 rounded-3xl bg-primary-soft flex items-center justify-center">
              <ShoppingBag className="h-10 w-10 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-lg">Carrinho vazio</p>
              <p className="text-muted-foreground">Adicione produtos para continuar</p>
            </div>
            <Button onClick={() => onOpenChange(false)} size="lg" className="rounded-xl h-12 px-6">
              Ver produtos
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-2.5 sm:p-3 rounded-2xl border border-border bg-card">
                  <img src={item.product.image} alt={item.product.name} className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover bg-muted flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground line-clamp-2 leading-snug">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.product.dose}</p>
                    <p className="font-bold text-primary text-sm mt-1">{formatBRL(item.product.price)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <button onClick={() => remove(item.product.id)} className="text-muted-foreground hover:text-destructive p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center bg-secondary rounded-xl">
                      <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => setQty(item.product.id, item.quantity - 1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-7 sm:w-8 text-center font-bold text-sm">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => setQty(item.product.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-4 sm:p-6 space-y-3 sm:space-y-4 bg-secondary/30">
              <div className="flex items-center justify-between text-xs text-success font-semibold bg-success-soft rounded-lg px-3 py-2">
                <span>✓ Frete grátis aplicado</span>
                <span>Brasil inteiro</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="font-serif-display text-2xl sm:text-3xl text-foreground">{formatBRL(total())}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-muted-foreground">Em até 12x de {formatBRL(total() / 12)} sem juros</p>
              <Button
                onClick={() => { onOpenChange(false); navigate("/checkout"); }}
                size="lg"
                className="w-full rounded-2xl h-13 sm:h-14 text-base sm:text-lg font-bold bg-gradient-promo text-success-foreground shadow-brand hover:opacity-95"
              >
                Finalizar compra <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
