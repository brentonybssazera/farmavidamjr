
create table public.pix_orders (
  id uuid primary key default gen_random_uuid(),
  identifier text unique not null,
  transaction_id text,
  amount numeric not null,
  status text not null default 'PENDING',
  customer_name text,
  customer_phone text,
  customer_document text,
  shipping_address text,
  shipping_city text,
  shipping_state text,
  items jsonb,
  session_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pix_orders enable row level security;

create index idx_pix_orders_created_at on public.pix_orders (created_at desc);
create index idx_pix_orders_status on public.pix_orders (status);

create trigger trg_pix_orders_updated_at
before update on public.pix_orders
for each row execute function public.update_updated_at();

create table public.session_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  event_type text not null,
  page_path text,
  metadata jsonb,
  user_agent text,
  referrer text,
  created_at timestamptz not null default now()
);

alter table public.session_events enable row level security;

create index idx_session_events_session on public.session_events (session_id, created_at);
create index idx_session_events_type_created on public.session_events (event_type, created_at desc);

create policy "Anyone can insert session events"
on public.session_events
for insert
to anon, authenticated
with check (true);
