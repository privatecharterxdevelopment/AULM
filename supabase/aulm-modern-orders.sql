-- Run after aulm-modern-admin.sql
-- Institutional orders: gold buy, sell, planned inbound delivery

create table if not exists public.aulm_modern_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  reference text not null,
  order_type text not null
    check (order_type in ('buy', 'sell', 'delivery_inbound')),
  metal text not null default 'gold'
    check (metal in ('gold', 'silver', 'copper')),
  quantity_oz numeric,
  weight_kg numeric,
  value_usd numeric,
  delivery_date date,
  origin text not null default '',
  notes text not null default '',
  status text not null default 'submitted'
    check (status in ('submitted', 'acknowledged', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists aulm_modern_orders_user_idx on public.aulm_modern_orders (user_id);
create index if not exists aulm_modern_orders_status_idx on public.aulm_modern_orders (status);
create unique index if not exists aulm_modern_orders_ref_idx on public.aulm_modern_orders (reference);

alter table public.aulm_modern_orders enable row level security;

drop policy if exists "aulm users insert orders" on public.aulm_modern_orders;
create policy "aulm users insert orders"
  on public.aulm_modern_orders for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "aulm users read own orders" on public.aulm_modern_orders;
create policy "aulm users read own orders"
  on public.aulm_modern_orders for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "aulm admin read all orders" on public.aulm_modern_orders;
create policy "aulm admin read all orders"
  on public.aulm_modern_orders for select
  to authenticated
  using (public.aulm_is_admin());

drop policy if exists "aulm admin update orders" on public.aulm_modern_orders;
create policy "aulm admin update orders"
  on public.aulm_modern_orders for update
  to authenticated
  using (public.aulm_is_admin())
  with check (public.aulm_is_admin());
