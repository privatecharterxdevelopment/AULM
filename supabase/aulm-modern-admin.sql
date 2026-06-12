-- Run after aulm-modern-tables.sql in Supabase SQL Editor.
-- Enables admin panel: read all applications, support, logistics; approve KYC.

-- Admin flag on profiles
alter table public.aulm_modern_profiles
  add column if not exists is_admin boolean not null default false;

-- Support: distinguish compliance replies
alter table public.aulm_modern_support_messages
  add column if not exists from_admin boolean not null default false;

-- Logistics mandates (persisted from dashboard)
create table if not exists public.aulm_modern_logistics_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  from_location text not null,
  to_location text not null,
  commodity text not null default '',
  value_usd numeric not null,
  weight_kg numeric not null,
  mode text not null default 'air' check (mode in ('air', 'sea', 'road')),
  notes text not null default '',
  status text not null default 'submitted'
    check (status in ('submitted', 'in_progress', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists aulm_modern_logistics_user_idx
  on public.aulm_modern_logistics_requests (user_id);
create index if not exists aulm_modern_logistics_status_idx
  on public.aulm_modern_logistics_requests (status);

alter table public.aulm_modern_logistics_requests enable row level security;

-- Admin check (security definer — reads profiles without RLS recursion issues)
create or replace function public.aulm_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(
      (
        select p.is_admin
        from public.aulm_modern_profiles p
        where p.id = auth.uid()
      ),
      false
    )
    or lower(coalesce(auth.jwt() ->> 'email', '')) = 'contact@aulmtrading.com';
$$;

-- KYC: admin read all + update status
drop policy if exists "aulm admin read all kyc" on public.aulm_modern_kyc_applications;
create policy "aulm admin read all kyc"
  on public.aulm_modern_kyc_applications for select
  to authenticated
  using (public.aulm_is_admin());

drop policy if exists "aulm admin update kyc" on public.aulm_modern_kyc_applications;
create policy "aulm admin update kyc"
  on public.aulm_modern_kyc_applications for update
  to authenticated
  using (public.aulm_is_admin())
  with check (public.aulm_is_admin());

-- Profiles: admin read all + update (for kyc_status sync)
drop policy if exists "aulm admin read all profiles" on public.aulm_modern_profiles;
create policy "aulm admin read all profiles"
  on public.aulm_modern_profiles for select
  to authenticated
  using (public.aulm_is_admin());

drop policy if exists "aulm admin update profiles" on public.aulm_modern_profiles;
create policy "aulm admin update profiles"
  on public.aulm_modern_profiles for update
  to authenticated
  using (public.aulm_is_admin())
  with check (public.aulm_is_admin());

-- Support: admin read all + reply
drop policy if exists "aulm admin read all support" on public.aulm_modern_support_messages;
create policy "aulm admin read all support"
  on public.aulm_modern_support_messages for select
  to authenticated
  using (public.aulm_is_admin());

drop policy if exists "aulm admin insert support reply" on public.aulm_modern_support_messages;
create policy "aulm admin insert support reply"
  on public.aulm_modern_support_messages for insert
  to authenticated
  with check (public.aulm_is_admin() and from_admin = true);

-- Logistics: users own + admin all
drop policy if exists "aulm users insert logistics" on public.aulm_modern_logistics_requests;
create policy "aulm users insert logistics"
  on public.aulm_modern_logistics_requests for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "aulm users read own logistics" on public.aulm_modern_logistics_requests;
create policy "aulm users read own logistics"
  on public.aulm_modern_logistics_requests for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "aulm admin read all logistics" on public.aulm_modern_logistics_requests;
create policy "aulm admin read all logistics"
  on public.aulm_modern_logistics_requests for select
  to authenticated
  using (public.aulm_is_admin());

drop policy if exists "aulm admin update logistics" on public.aulm_modern_logistics_requests;
create policy "aulm admin update logistics"
  on public.aulm_modern_logistics_requests for update
  to authenticated
  using (public.aulm_is_admin())
  with check (public.aulm_is_admin());

-- Grant first admin (adjust email if needed):
-- update public.aulm_modern_profiles set is_admin = true where lower(email) = 'contact@aulmtrading.com';
