-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create extension if not exists "pgcrypto";

create table if not exists public.kyc_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  contact_email text not null,
  company_legal_name text not null,
  status text not null default 'under_review'
    check (status in ('under_review', 'approved', 'rejected')),
  user_id uuid references auth.users (id) on delete set null,
  payload jsonb not null default '{}'::jsonb
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  company_name text,
  kyc_status text not null default 'none'
    check (kyc_status in ('none', 'under_review', 'approved', 'rejected')),
  kyc_application_id uuid references public.kyc_applications (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists kyc_applications_email_idx on public.kyc_applications (contact_email);
create index if not exists kyc_applications_user_idx on public.kyc_applications (user_id);

alter table public.kyc_applications enable row level security;
alter table public.profiles enable row level security;
alter table public.support_messages enable row level security;

drop policy if exists "anon insert kyc" on public.kyc_applications;
create policy "anon insert kyc"
  on public.kyc_applications for insert
  to anon, authenticated
  with check (true);

drop policy if exists "users read own kyc" on public.kyc_applications;
create policy "users read own kyc"
  on public.kyc_applications for select
  to authenticated
  using (
    user_id = auth.uid()
    or lower(contact_email) = lower(auth.jwt() ->> 'email')
  );

drop policy if exists "users link kyc" on public.kyc_applications;
create policy "users link kyc"
  on public.kyc_applications for update
  to authenticated
  using (lower(contact_email) = lower(auth.jwt() ->> 'email'))
  with check (user_id = auth.uid());

drop policy if exists "profiles read own" on public.profiles;
create policy "profiles read own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "profiles insert own" on public.profiles;
create policy "profiles insert own"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

drop policy if exists "profiles update own" on public.profiles;
create policy "profiles update own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid());

drop policy if exists "users insert support" on public.support_messages;
create policy "users insert support"
  on public.support_messages for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "users read own support" on public.support_messages;
create policy "users read own support"
  on public.support_messages for select
  to authenticated
  using (user_id = auth.uid());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, company_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'company_name', '')
  )
  on conflict (id) do update set
    email = excluded.email,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
