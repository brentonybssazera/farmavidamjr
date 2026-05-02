import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { formatPrice } from "@/lib/shopify";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode || "BRL";

  useEffect(() => { if (isOpen) syncCart(); }, [isOpen, syncCart]);

  const handleCheckout = () => {
    const url = getCheckoutUrl();
    if (url) {
      window.open(url, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full border-border/80 hover:border-primary hover:bg-secondary">
          <ShoppingBag className="h-5 w-5 text-primary" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1.5 -right-1.5 h-5 min-w-5 rounded-full p-0 px-1.5 flex items-center justify-center text-[10px] font-bold bg-accent text-accent-foreground border-2 border-background">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="font-display text-2xl">Seu carrinho</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Nenhum item ainda" : `${totalItems} ${totalItems === 1 ? "item" : "itens"} no carrinho`}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col flex-1 pt-6 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                  <ShoppingBag className="h-7 w-7 text-primary" />
                </div>
                <p className="text-muted-foreground">Carrinho vazio</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex gap-4 p-3 rounded-xl bg-gradient-card border border-border/60">
                      <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.node.images?.edges?.[0]?.node && (
                          <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.node.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.selectedOptions.map((o) => o.value).join(" · ")}</p>
                        <p className="font-semibold text-primary mt-1">{formatPrice(item.price.amount, item.price.currencyCode)}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.variantId)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                        <div className="flex items-center gap-1 bg-background rounded-md border border-border">
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-4 pt-4 border-t bg-background">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-display text-2xl font-bold text-primary">{formatPrice(totalPrice, currency)}</span>
                </div>
                <Button onClick={handleCheckout} size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12" disabled={items.length === 0 || isLoading || isSyncing}>
                  {isLoading || isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : (<><ExternalLink className="w-4 h-4 mr-2" />Finalizar compra</>)}
                </Button>
                <p className="text-[11px] text-center text-muted-foreground leading-relaxed">
                  Venda mediante apresentação de receita médica válida.
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
