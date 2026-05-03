## Objetivo

Adicionar um botão "Ver carrinho" dentro do toast "Adicionado ao carrinho!" para abrir o carrinho lateral imediatamente.

## Como funciona hoje

- O toast é disparado em `src/components/store/ProductCard.tsx` e `src/pages/ProductPage.tsx` usando `sonner`.
- O `CartSheet` é controlado por um estado local `cartOpen` em cada página (`Index`, `ProductPage`, `HowToBuy`, `Account`, `DeliveryPolicy`, `Checkout`).
- Não existe um estado global para abrir o carrinho.

## Plano

1. Criar um pequeno hook/util `src/lib/cartUi.ts` que expõe:
  - `openCart()` — dispara `window.dispatchEvent(new CustomEvent('open-cart'))`.
  - `useCartUi()` — hook que retorna `[open, setOpen]` e escuta o evento para abrir o sheet automaticamente.
2. Atualizar cada página que renderiza `<CartSheet />` para usar `useCartUi()` no lugar do `useState` local (mudança mínima, mesma API).
3. Atualizar o toast em `ProductCard.tsx` e `ProductPage.tsx` para incluir uma ação:
  ```ts
   toast.success("Adicionado ao carrinho!", {
     description: product.name,
     position: "top-center",
     action: { label: "Ver carrinho", onClick: () => openCart() },
   });
  ```
4. Garantir que o botão de ação tenha bom contraste/tamanho no mobile (usar classe via `actionButtonStyle` do sonner se necessário).

## Resultado

Ao adicionar um produto, o toast mostra um botão "Ver carrinho" que abre o `CartSheet` em qualquer página, sem precisar refatorar para um store global do Zustand.

&nbsp;

QUERO QUE 