## Objetivo

1. Salvar no banco (Lovable Cloud) cada PIX gerado, com status, valor e dados do cliente — para acompanhar quantos PIX foram criados por dia.
2. Rastrear abandono: registrar em qual etapa o usuário saiu do site (visitou produto, adicionou ao carrinho, abriu checkout, gerou PIX, pagou, ou desistiu).
3. Deixar o site mais rápido (mobile e desktop).

---

## Parte 1 — Tabelas no Cloud

Criar duas tabelas novas:

**`pix_orders`** — um registro por PIX gerado
- `id` (uuid, PK)
- `identifier` (text, único — mesmo identifier enviado ao SigiloPay)
- `transaction_id` (text, do gateway)
- `amount` (numeric)
- `status` (text: PENDING / COMPLETED / FAILED / REFUNDED / CHARGED_BACK)
- `customer_name`, `customer_phone`, `customer_document` (text)
- `shipping_address`, `shipping_city`, `shipping_state` (text)
- `items` (jsonb — array de produtos)
- `session_id` (text — vincula ao tracking de sessão)
- `created_at`, `updated_at` (timestamptz)

**`session_events`** — um registro por evento/etapa
- `id` (uuid, PK)
- `session_id` (text — gerado no client e guardado em localStorage)
- `event_type` (text: `page_view`, `product_view`, `add_to_cart`, `checkout_start`, `pix_generated`, `pix_paid`, `exit`)
- `page_path` (text — onde estava quando o evento ocorreu)
- `metadata` (jsonb — produto, valor etc.)
- `user_agent`, `referrer` (text)
- `created_at` (timestamptz)

**RLS:** ambas com `INSERT` público (anon pode inserir), sem `SELECT` público (só admin via SQL no Cloud). Isso protege dados de clientes e permite que o site não-autenticado registre eventos.

---

## Parte 2 — Edge function `create-pix-payment`

Após gerar o PIX com sucesso no SigiloPay, inserir uma linha em `pix_orders` (usando `SUPABASE_SERVICE_ROLE_KEY`). Aceitar `session_id` opcional vindo do client e gravá-lo.

## Parte 3 — Edge function `check-pix-status`

Quando o status mudar (ex: virar `COMPLETED`), atualizar a linha em `pix_orders` via `identifier`.

## Parte 4 — Tracking no client

Criar `src/lib/tracking.ts`:
- `getSessionId()` — gera um UUID na primeira visita e guarda em `localStorage`.
- `trackEvent(type, metadata?)` — faz `INSERT` direto em `session_events` via supabase client (anon).
- Detecta saída da página via `visibilitychange` + `pagehide` para registrar evento `exit` com `page_path`.

Chamar `trackEvent` em pontos-chave:
- `Index.tsx` → `page_view`
- `ProductPage.tsx` → `product_view`
- `cartStore` `add` → `add_to_cart`
- `Checkout.tsx` ao montar → `checkout_start`
- após PIX gerado → `pix_generated`
- após detectar `COMPLETED` → `pix_paid`

Para não atrapalhar performance: usar `navigator.sendBeacon` quando possível no evento de saída, e `requestIdleCallback` para os demais.

---

## Parte 5 — Performance

Mudanças que dão ganho real sem reescrever nada:

1. **Code-splitting do Index** — hoje `Index` é importado direto (não-lazy) e carrega 13 componentes pesados na primeira renderização. Tornar lazy os componentes "below the fold": `Testimonials`, `FAQSection`, `CTABanner`, `Stats`, `HowItWorks`, `SocialProofToasts`, `WelcomePopup`. Mantém `Hero`, `Header`, `Catalog` no bundle inicial.
2. **Imagens** — adicionar `loading="lazy"` e `decoding="async"` em todas as imagens fora do hero; no hero usar `fetchpriority="high"`. Servir `hero-product.jpg` redimensionada (hoje pode estar grande demais).
3. **Fontes** — adicionar `font-display: swap` se ainda não estiver; remover pesos não utilizados.
4. **WelcomePopup / SocialProofToasts** — atrasar a montagem para depois do `load` (ex: `setTimeout` 2s ou `requestIdleCallback`) para não bloquear LCP.
5. **React Query** — já tem `staleTime` configurado, ok.
6. **Bundle** — verificar se há ícones do `lucide-react` importados em massa; manter import individual (já parece ok).

Não vamos fazer trabalho de servidor (cache CDN, SSR) — o app é Vite SPA hospedado pelo Lovable, então o foco é bundle + lazy loading.

---

## Detalhes técnicos (referência)

**Migrações SQL** (resumo):
```sql
create table public.pix_orders (...);
create table public.session_events (...);
alter table public.pix_orders enable row level security;
alter table public.session_events enable row level security;
create policy "anon insert" on public.session_events for insert to anon with check (true);
-- pix_orders só recebe insert via service role (edge function), não precisa policy para anon
create index on public.pix_orders (created_at desc);
create index on public.session_events (session_id, created_at);
```

**Como consultar quantos PIX por dia** (você roda no Cloud → SQL Editor):
```sql
select date(created_at) as dia, count(*) as gerados,
       count(*) filter (where status='COMPLETED') as pagos
from pix_orders
group by 1 order by 1 desc;
```

**Como ver onde as pessoas saem:**
```sql
select page_path, count(*) 
from session_events 
where event_type='exit' 
group by 1 order by 2 desc;
```

---

## Arquivos a criar/editar

- **migração SQL** — criar tabelas + RLS + índices
- **`supabase/functions/create-pix-payment/index.ts`** — gravar em `pix_orders` após sucesso
- **`supabase/functions/check-pix-status/index.ts`** — atualizar status
- **`src/lib/tracking.ts`** (novo) — sessão + trackEvent
- **`src/App.tsx`** — inicializar tracking de saída global
- **`src/pages/Index.tsx`** — lazy nos componentes below-the-fold + page_view
- **`src/pages/ProductPage.tsx`** — product_view
- **`src/pages/Checkout.tsx`** — checkout_start, pix_generated, pix_paid + enviar session_id
- **`src/stores/cartStore.ts`** — add_to_cart
- **`src/components/store/Hero.tsx`** — fetchpriority na imagem principal
- **`src/components/store/WelcomePopup.tsx`** + **`SocialProofToasts.tsx`** — atraso na montagem

Posso prosseguir?