-- Run once in Supabase SQL Editor (AULM / oubecmstqtzdnevyqavu project).
-- Isolated tables for aulm-modern — does not alter existing kyc_applications.

create extension if not exists "pgcrypto";

create table if not exists public.aulm_modern_kyc_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  contact_email text not null,
  company_legal_name text not null,
  status text not null default 'under_review'
    check (status in ('under_review', 'approved', 'rejected', 'more_docs')),
  user_id uuid references auth.users (id) on delete set null,
  payload jsonb not null default '{}'::jsonb
);

create table if not exists public.aulm_modern_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  company_name text,
  kyc_status text not null default 'none'
    check (kyc_status in ('none', 'under_review', 'approved', 'rejected', 'more_docs')),
  kyc_application_id uuid references public.aulm_modern_kyc_applications (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.aulm_modern_support_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists aulm_modern_kyc_email_idx on public.aulm_modern_kyc_applications (contact_email);
create index if not exists aulm_modern_kyc_user_idx on public.aulm_modern_kyc_applications (user_id);

alter table public.aulm_modern_kyc_applications enable row level security;
alter table public.aulm_modern_profiles enable row level security;
alter table public.aulm_modern_support_messages enable row level security;

drop policy if exists "aulm anon insert kyc" on public.aulm_modern_kyc_applications;
create policy "aulm anon insert kyc"
  on public.aulm_modern_kyc_applications for insert
  to anon, authenticated
  with check (true);

drop policy if exists "aulm users read own kyc" on public.aulm_modern_kyc_applications;
create policy "aulm users read own kyc"
  on public.aulm_modern_kyc_applications for select
  to authenticated
  using (
    user_id = auth.uid()
    or lower(contact_email) = lower(auth.jwt() ->> 'email')
  );

drop policy if exists "aulm users link kyc" on public.aulm_modern_kyc_applications;
create policy "aulm users link kyc"
  on public.aulm_modern_kyc_applications for update
  to authenticated
  using (lower(contact_email) = lower(auth.jwt() ->> 'email'))
  with check (user_id = auth.uid());

drop policy if exists "aulm profiles read own" on public.aulm_modern_profiles;
create policy "aulm profiles read own"
  on public.aulm_modern_profiles for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "aulm profiles insert own" on public.aulm_modern_profiles;
create policy "aulm profiles insert own"
  on public.aulm_modern_profiles for insert
  to authenticated
  with check (id = auth.uid());

drop policy if exists "aulm profiles update own" on public.aulm_modern_profiles;
create policy "aulm profiles update own"
  on public.aulm_modern_profiles for update
  to authenticated
  using (id = auth.uid());

drop policy if exists "aulm users insert support" on public.aulm_modern_support_messages;
create policy "aulm users insert support"
  on public.aulm_modern_support_messages for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "aulm users read own support" on public.aulm_modern_support_messages;
create policy "aulm users read own support"
  on public.aulm_modern_support_messages for select
  to authenticated
  using (user_id = auth.uid());
