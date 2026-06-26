-- CommodityBank OS — core schema
-- Run in NEW Supabase project (Lorenzo's Projects)

create extension if not exists "pgcrypto";

-- ── Enums ─────────────────────────────────────────────────────────────

create type cbos_org_type as enum (
  'individual', 'corporate', 'commodity_trader', 'broker', 'refinery',
  'mining_company', 'consultant', 'bank'
);

create type cbos_org_role as enum (
  'owner', 'admin', 'finance_manager', 'treasury_manager', 'escrow_admin',
  'escrow_manager', 'commodity_manager', 'consultant', 'employee', 'viewer'
);

create type cbos_escrow_role as enum (
  'escrow_creator', 'buyer', 'seller', 'consultant', 'assayer', 'inspector',
  'escrow_agent', 'commodity_bank_manager', 'compliance_officer', 'auditor'
);

create type cbos_escrow_status as enum (
  'draft', 'awaiting_participants', 'awaiting_documents', 'awaiting_funding',
  'funded', 'under_review', 'approved', 'released', 'completed', 'refunded', 'disputed'
);

create type cbos_currency as enum (
  'EUR', 'USD', 'AED', 'CHF', 'GBP', 'SGD', 'HKD'
);

create type cbos_balance_kind as enum (
  'available', 'pending', 'reserved', 'escrowed', 'savings'
);

create type cbos_account_type as enum (
  'personal', 'business', 'savings', 'escrow', 'treasury', 'reserve'
);

create type cbos_transfer_status as enum (
  'pending', 'processing', 'completed', 'failed'
);

create type cbos_doc_status as enum (
  'draft', 'uploaded', 'under_review', 'approved', 'rejected'
);

create type cbos_card_type as enum (
  'virtual', 'single_use', 'corporate', 'employee'
);

-- ── Tenancy ───────────────────────────────────────────────────────────

create table public.cbos_organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  org_type cbos_org_type not null default 'commodity_trader',
  slug text unique not null,
  kyc_status text not null default 'none'
    check (kyc_status in ('none', 'under_review', 'approved', 'rejected')),
  bank_license_ref text,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cbos_workspaces (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  name text not null,
  slug text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table public.cbos_organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  org_role cbos_org_role not null default 'employee',
  invited_email text,
  joined_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

-- ── Wallets & ledger ──────────────────────────────────────────────────

create table public.cbos_wallets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  workspace_id uuid references public.cbos_workspaces (id) on delete set null,
  account_type cbos_account_type not null default 'business',
  currency cbos_currency not null,
  label text not null,
  iban text,
  is_frozen boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.cbos_wallet_balances (
  wallet_id uuid not null references public.cbos_wallets (id) on delete cascade,
  kind cbos_balance_kind not null,
  amount numeric(20, 8) not null default 0 check (amount >= 0),
  updated_at timestamptz not null default now(),
  primary key (wallet_id, kind)
);

create table public.cbos_ledger_entries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  wallet_id uuid references public.cbos_wallets (id) on delete set null,
  escrow_id uuid,
  entry_type text not null,
  currency cbos_currency not null,
  amount numeric(20, 8) not null,
  balance_after numeric(20, 8),
  reference text,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index cbos_ledger_org_idx on public.cbos_ledger_entries (organization_id, created_at desc);

-- ── Escrows ───────────────────────────────────────────────────────────

create table public.cbos_escrows (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  workspace_id uuid references public.cbos_workspaces (id) on delete set null,
  reference text not null,
  title text not null,
  status cbos_escrow_status not null default 'draft',
  currency cbos_currency not null,
  transaction_value numeric(20, 8) not null,
  commodity_code text,
  commodity_amount numeric(20, 8),
  commodity_unit text,
  funded_amount numeric(20, 8) not null default 0,
  wallet_id uuid references public.cbos_wallets (id) on delete set null,
  funds_released boolean not null default false,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cbos_escrow_participants (
  id uuid primary key default gen_random_uuid(),
  escrow_id uuid not null references public.cbos_escrows (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  email text,
  escrow_role cbos_escrow_role not null,
  payout_percent numeric(5, 2),
  payout_fixed numeric(20, 8),
  accepted_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.cbos_escrow_milestones (
  id uuid primary key default gen_random_uuid(),
  escrow_id uuid not null references public.cbos_escrows (id) on delete cascade,
  title text not null,
  sort_order int not null default 0,
  completed_at timestamptz
);

create table public.cbos_escrow_fees (
  id uuid primary key default gen_random_uuid(),
  escrow_id uuid not null references public.cbos_escrows (id) on delete cascade,
  label text not null,
  fee_type text not null check (fee_type in ('percent', 'fixed')),
  value numeric(20, 8) not null,
  recipient_role cbos_escrow_role
);

create table public.cbos_escrow_conditions (
  id uuid primary key default gen_random_uuid(),
  escrow_id uuid not null references public.cbos_escrows (id) on delete cascade,
  condition_key text not null,
  required boolean not null default true,
  satisfied boolean not null default false,
  satisfied_at timestamptz
);

create table public.cbos_escrow_documents (
  id uuid primary key default gen_random_uuid(),
  escrow_id uuid not null references public.cbos_escrows (id) on delete cascade,
  doc_type text not null,
  label text not null,
  required boolean not null default true,
  status cbos_doc_status not null default 'draft',
  storage_path text,
  version int not null default 1,
  uploaded_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.cbos_escrow_approvals (
  id uuid primary key default gen_random_uuid(),
  escrow_id uuid not null references public.cbos_escrows (id) on delete cascade,
  document_id uuid references public.cbos_escrow_documents (id) on delete cascade,
  step_order int not null,
  approver_role cbos_escrow_role not null,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  comment text,
  decided_by uuid references auth.users (id) on delete set null,
  decided_at timestamptz
);

-- ── Banking ───────────────────────────────────────────────────────────

create table public.cbos_beneficiaries (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  kind text not null check (kind in ('individual', 'company')),
  name text not null,
  iban text,
  swift_bic text,
  bank_name text,
  country text,
  address text,
  reference text,
  created_at timestamptz not null default now()
);

create table public.cbos_transfers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  from_wallet_id uuid references public.cbos_wallets (id) on delete set null,
  beneficiary_id uuid references public.cbos_beneficiaries (id) on delete set null,
  transfer_type text not null check (transfer_type in ('internal', 'international', 'scheduled', 'bulk')),
  currency cbos_currency not null,
  amount numeric(20, 8) not null,
  status cbos_transfer_status not null default 'pending',
  reference text,
  scheduled_for timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.cbos_cards (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  wallet_id uuid references public.cbos_wallets (id) on delete set null,
  card_type cbos_card_type not null default 'virtual',
  last_four text not null,
  holder_name text not null,
  spend_limit numeric(20, 8),
  is_frozen boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.cbos_crypto_wallets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  asset text not null check (asset in ('BTC', 'ETH', 'USDT', 'USDC', 'SOL')),
  address text,
  available numeric(20, 8) not null default 0,
  pending numeric(20, 8) not null default 0,
  reserved numeric(20, 8) not null default 0
);

create table public.cbos_savings_vaults (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  name text not null,
  goal_type text not null,
  target_amount numeric(20, 8),
  balance numeric(20, 8) not null default 0,
  currency cbos_currency not null default 'USD'
);

-- ── Notifications & audit ─────────────────────────────────────────────

create table public.cbos_notifications (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.cbos_organizations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null,
  title text not null,
  body text,
  read_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.cbos_audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.cbos_organizations (id) on delete set null,
  actor_id uuid references auth.users (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  previous_value jsonb,
  new_value jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create index cbos_audit_org_idx on public.cbos_audit_logs (organization_id, created_at desc);

-- FK escrow on ledger
alter table public.cbos_ledger_entries
  add constraint cbos_ledger_escrow_fk
  foreign key (escrow_id) references public.cbos_escrows (id) on delete set null;
