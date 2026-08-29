-- AULM CRM / Superadmin — core domain, security and private document storage
-- Run in the primary AULM Supabase project after aulm-modern-admin.sql.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.crm_staff_role as enum (
    'superadmin', 'operations', 'compliance', 'sales', 'finance', 'readonly'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.crm_client_kind as enum ('buyer', 'supplier', 'both', 'partner');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.crm_kyc_status as enum (
    'not_started', 'invited', 'in_progress', 'under_review',
    'approved', 'rejected', 'expired'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.crm_document_status as enum (
    'draft', 'requested', 'uploaded', 'under_review', 'approved',
    'rejected', 'signed', 'expired', 'archived'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.crm_document_type as enum (
    'kyc', 'kyb', 'passport', 'license', 'bank_statement',
    'spa', 'contract', 'invoice', 'receipt', 'card_payment',
    'delivery_note', 'airway_bill', 'acceptance_note',
    'certificate', 'assay', 'customs', 'other'
  );
exception when duplicate_object then null; end $$;

create table if not exists public.crm_staff_members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role public.crm_staff_role not null default 'readonly',
  full_name text not null,
  email text not null,
  department text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.crm_has_role(required_roles public.crm_staff_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.crm_staff_members staff
    where staff.user_id = auth.uid()
      and staff.is_active
      and staff.role = any(required_roles)
  );
$$;

create or replace function public.crm_is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.crm_staff_members
    where user_id = auth.uid() and is_active
  );
$$;

create table if not exists public.crm_clients (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  legal_name text not null,
  trading_name text,
  kind public.crm_client_kind not null,
  entity_type text not null default 'company',
  status text not null default 'lead'
    check (status in ('lead', 'onboarding', 'active', 'inactive', 'blocked')),
  kyc_status public.crm_kyc_status not null default 'not_started',
  risk_rating text not null default 'unrated'
    check (risk_rating in ('unrated', 'low', 'medium', 'high', 'prohibited')),
  registration_number text,
  tax_number text,
  incorporation_country text,
  incorporation_date date,
  website text,
  email text,
  phone text,
  registered_address jsonb not null default '{}'::jsonb,
  operating_address jsonb not null default '{}'::jsonb,
  source_of_funds text,
  source_of_wealth text,
  expected_annual_volume numeric(20, 2),
  annual_revenue numeric(20, 2),
  base_currency text not null default 'USD',
  payment_terms text,
  incoterms text[],
  tags text[] not null default '{}',
  notes text,
  assigned_to uuid references public.crm_staff_members (user_id) on delete set null,
  kyc_application_id uuid references public.aulm_modern_kyc_applications (id) on delete set null,
  portal_user_id uuid references auth.users (id) on delete set null,
  created_by uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists crm_clients_name_idx on public.crm_clients (legal_name);
create index if not exists crm_clients_status_idx on public.crm_clients (status, kyc_status);
create index if not exists crm_clients_assigned_idx on public.crm_clients (assigned_to);

create table if not exists public.crm_contacts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.crm_clients (id) on delete cascade,
  full_name text not null,
  title text,
  department text,
  email text,
  phone text,
  nationality text,
  date_of_birth date,
  contact_role text not null default 'contact',
  is_primary boolean not null default false,
  is_authorised_signatory boolean not null default false,
  ownership_percent numeric(5, 2),
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists crm_contacts_client_idx on public.crm_contacts (client_id);

create table if not exists public.crm_bank_accounts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.crm_clients (id) on delete cascade,
  account_holder text not null,
  bank_name text not null,
  iban text,
  swift_bic text,
  account_number_masked text,
  currency text not null default 'USD',
  country text,
  is_primary boolean not null default false,
  is_verified boolean not null default false,
  verified_by uuid references public.crm_staff_members (user_id) on delete set null,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.crm_commodities (
  code text primary key,
  name text not null,
  category text not null check (category in ('metal', 'energy', 'other')),
  default_unit text not null,
  active boolean not null default true
);

insert into public.crm_commodities (code, name, category, default_unit) values
  ('XAU', 'Gold', 'metal', 'kg'),
  ('XAG', 'Silver', 'metal', 'kg'),
  ('CU', 'Copper', 'metal', 'mt'),
  ('NG', 'Natural Gas', 'energy', 'mmbtu'),
  ('OIL', 'Crude Oil', 'energy', 'bbl')
on conflict (code) do nothing;

create table if not exists public.crm_commodity_holdings (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.crm_clients (id) on delete cascade,
  commodity_code text not null references public.crm_commodities (code),
  quantity numeric(24, 8) not null check (quantity >= 0),
  unit text not null,
  purity numeric(8, 5),
  position_type text not null default 'declared'
    check (position_type in ('declared', 'verified', 'in_transit', 'allocated', 'sold')),
  location text,
  assay_reference text,
  valuation_usd numeric(20, 2),
  as_of date not null default current_date,
  source_document_id uuid,
  notes text,
  created_by uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists crm_holdings_client_idx
  on public.crm_commodity_holdings (client_id, commodity_code);

create table if not exists public.crm_transactions (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  client_id uuid not null references public.crm_clients (id) on delete restrict,
  counterparty_client_id uuid references public.crm_clients (id) on delete set null,
  transaction_type text not null
    check (transaction_type in ('purchase', 'sale', 'delivery', 'payment', 'refund', 'fee')),
  status text not null default 'draft'
    check (status in ('draft', 'pending', 'approved', 'in_progress', 'completed', 'cancelled', 'disputed')),
  commodity_code text references public.crm_commodities (code),
  quantity numeric(24, 8),
  unit text,
  unit_price numeric(20, 8),
  currency text not null default 'USD',
  gross_value numeric(20, 2) not null default 0,
  settlement_value numeric(20, 2),
  transaction_date date not null default current_date,
  settlement_date date,
  incoterm text,
  origin text,
  destination text,
  external_reference text,
  metadata jsonb not null default '{}'::jsonb,
  assigned_to uuid references public.crm_staff_members (user_id) on delete set null,
  created_by uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists crm_transactions_client_idx
  on public.crm_transactions (client_id, transaction_date desc);

create table if not exists public.crm_documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.crm_clients (id) on delete cascade,
  transaction_id uuid references public.crm_transactions (id) on delete set null,
  document_type public.crm_document_type not null,
  status public.crm_document_status not null default 'draft',
  title text not null,
  reference text,
  storage_path text,
  file_name text,
  mime_type text,
  file_size bigint,
  sha256 text,
  version integer not null default 1,
  issued_at timestamptz,
  expires_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  uploaded_by uuid references public.crm_staff_members (user_id) on delete set null,
  created_by uuid references auth.users (id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.crm_commodity_holdings
  drop constraint if exists crm_holdings_document_fk;
alter table public.crm_commodity_holdings
  add constraint crm_holdings_document_fk
  foreign key (source_document_id) references public.crm_documents (id) on delete set null;

create index if not exists crm_documents_client_idx
  on public.crm_documents (client_id, created_at desc);
create index if not exists crm_documents_expiry_idx
  on public.crm_documents (expires_at) where expires_at is not null;

create table if not exists public.crm_document_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.crm_documents (id) on delete cascade,
  version integer not null,
  storage_path text not null,
  file_name text not null,
  mime_type text,
  file_size bigint,
  sha256 text not null,
  uploaded_by uuid references public.crm_staff_members (user_id) on delete set null,
  created_at timestamptz not null default now(),
  unique (document_id, version)
);

create table if not exists public.crm_onboarding_invites (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.crm_clients (id) on delete cascade,
  email text not null,
  token_hash text unique not null,
  status text not null default 'pending'
    check (status in ('pending', 'opened', 'submitted', 'expired', 'revoked')),
  requested_sections text[] not null default array['company', 'contacts', 'kyc', 'documents', 'signature'],
  expires_at timestamptz not null,
  opened_at timestamptz,
  submitted_at timestamptz,
  created_by uuid not null references public.crm_staff_members (user_id) on delete restrict,
  created_at timestamptz not null default now()
);

create table if not exists public.crm_signatures (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.crm_documents (id) on delete cascade,
  invite_id uuid references public.crm_onboarding_invites (id) on delete set null,
  signer_name text not null,
  signer_email text not null,
  signer_title text,
  signature_storage_path text not null,
  signed_document_sha256 text not null,
  consent_text text not null,
  consent_version text not null,
  ip_address inet,
  user_agent text,
  signed_at timestamptz not null default now()
);

create table if not exists public.crm_generated_records (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.crm_clients (id) on delete cascade,
  transaction_id uuid references public.crm_transactions (id) on delete set null,
  record_type text not null
    check (record_type in ('spa', 'invoice', 'delivery_note', 'airway_bill', 'receipt', 'acceptance_note')),
  reference text unique not null,
  status text not null default 'draft'
    check (status in ('draft', 'issued', 'sent', 'signed', 'cancelled')),
  payload jsonb not null default '{}'::jsonb,
  document_id uuid references public.crm_documents (id) on delete set null,
  created_by uuid references public.crm_staff_members (user_id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_notes (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.crm_clients (id) on delete cascade,
  body text not null,
  visibility text not null default 'internal' check (visibility in ('internal', 'compliance', 'finance')),
  pinned boolean not null default false,
  created_by uuid not null references public.crm_staff_members (user_id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_tasks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.crm_clients (id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'open' check (status in ('open', 'in_progress', 'done', 'cancelled')),
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  due_at timestamptz,
  assigned_to uuid references public.crm_staff_members (user_id) on delete set null,
  created_by uuid not null references public.crm_staff_members (user_id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  client_id uuid references public.crm_clients (id) on delete set null,
  previous_value jsonb,
  new_value jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists crm_audit_client_idx
  on public.crm_audit_logs (client_id, created_at desc);

-- Private bucket. Files must always be accessed through signed URLs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'crm-private',
  'crm-private',
  false,
  52428800,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
)
on conflict (id) do update set public = false;

-- Staff-only table access. Public onboarding writes must go through audited Edge Functions.
alter table public.crm_staff_members enable row level security;
alter table public.crm_clients enable row level security;
alter table public.crm_contacts enable row level security;
alter table public.crm_bank_accounts enable row level security;
alter table public.crm_commodities enable row level security;
alter table public.crm_commodity_holdings enable row level security;
alter table public.crm_transactions enable row level security;
alter table public.crm_documents enable row level security;
alter table public.crm_document_versions enable row level security;
alter table public.crm_onboarding_invites enable row level security;
alter table public.crm_signatures enable row level security;
alter table public.crm_generated_records enable row level security;
alter table public.crm_notes enable row level security;
alter table public.crm_tasks enable row level security;
alter table public.crm_audit_logs enable row level security;

do $$ declare table_name text;
begin
  foreach table_name in array array[
    'crm_staff_members', 'crm_clients', 'crm_contacts', 'crm_bank_accounts',
    'crm_commodities', 'crm_commodity_holdings', 'crm_transactions',
    'crm_documents', 'crm_document_versions', 'crm_onboarding_invites',
    'crm_signatures', 'crm_generated_records', 'crm_notes', 'crm_tasks',
    'crm_audit_logs'
  ] loop
    execute format('drop policy if exists "crm staff read" on public.%I', table_name);
    execute format(
      'create policy "crm staff read" on public.%I for select to authenticated using (public.crm_is_staff())',
      table_name
    );
  end loop;
end $$;

do $$ declare table_name text;
begin
  foreach table_name in array array[
    'crm_clients', 'crm_contacts', 'crm_bank_accounts', 'crm_commodity_holdings',
    'crm_transactions', 'crm_documents', 'crm_document_versions',
    'crm_onboarding_invites', 'crm_signatures', 'crm_generated_records',
    'crm_notes', 'crm_tasks'
  ] loop
    execute format('drop policy if exists "crm staff insert" on public.%I', table_name);
    execute format(
      'create policy "crm staff insert" on public.%I for insert to authenticated with check
       (public.crm_has_role(array[''superadmin'', ''operations'', ''compliance'', ''sales'', ''finance'']::public.crm_staff_role[]))',
      table_name
    );
    execute format('drop policy if exists "crm staff update" on public.%I', table_name);
    execute format(
      'create policy "crm staff update" on public.%I for update to authenticated using
       (public.crm_has_role(array[''superadmin'', ''operations'', ''compliance'', ''sales'', ''finance'']::public.crm_staff_role[]))
       with check
       (public.crm_has_role(array[''superadmin'', ''operations'', ''compliance'', ''sales'', ''finance'']::public.crm_staff_role[]))',
      table_name
    );
  end loop;
end $$;

drop policy if exists "crm superadmin manage staff" on public.crm_staff_members;
create policy "crm superadmin manage staff"
  on public.crm_staff_members for all to authenticated
  using (public.crm_has_role(array['superadmin']::public.crm_staff_role[]))
  with check (public.crm_has_role(array['superadmin']::public.crm_staff_role[]));

drop policy if exists "crm staff read private files" on storage.objects;
create policy "crm staff read private files"
  on storage.objects for select to authenticated
  using (bucket_id = 'crm-private' and public.crm_is_staff());

drop policy if exists "crm staff upload private files" on storage.objects;
create policy "crm staff upload private files"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'crm-private'
    and public.crm_has_role(array[
      'superadmin', 'operations', 'compliance', 'sales', 'finance'
    ]::public.crm_staff_role[])
  );

drop policy if exists "crm staff update private files" on storage.objects;
create policy "crm staff update private files"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'crm-private'
    and public.crm_has_role(array[
      'superadmin', 'operations', 'compliance', 'sales', 'finance'
    ]::public.crm_staff_role[])
  );

-- Bootstrap the first superadmin manually, after that use CRM Team Management:
-- insert into public.crm_staff_members (user_id, role, full_name, email)
-- select id, 'superadmin', coalesce(raw_user_meta_data->>'full_name', email), email
-- from auth.users where lower(email) = 'contact@aulmtrading.com';
