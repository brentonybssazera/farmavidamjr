import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/lib/products";
import { trackEvent } from "@/lib/tracking";

export type CartLine = { product: Product; quantity: number };

interface CartState {
  items: CartLine[];
  add: (product: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product, qty = 1) =>
        set((s) => {
          trackEvent("add_to_cart", {
            product_id: product.id,
            product_name: product.name,
            quantity: qty,
            price: product.price,
          });
          const existing = s.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
              ),
            };
          }
          return { items: [...s.items, { product, quantity: qty }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.product.id !== id)
              : s.items.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i)),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((a, i) => a + i.quantity, 0),
      total: () => get().items.reduce((a, i) => a + i.product.price * i.quantity, 0),
    }),
    { name: "farmavida-cart", storage: createJSONStorage(() => localStorage) }
  )
);
