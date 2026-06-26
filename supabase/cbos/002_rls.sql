-- CBOS Row Level Security

alter table public.cbos_organizations enable row level security;
alter table public.cbos_workspaces enable row level security;
alter table public.cbos_organization_members enable row level security;
alter table public.cbos_wallets enable row level security;
alter table public.cbos_wallet_balances enable row level security;
alter table public.cbos_ledger_entries enable row level security;
alter table public.cbos_escrows enable row level security;
alter table public.cbos_escrow_participants enable row level security;
alter table public.cbos_escrow_milestones enable row level security;
alter table public.cbos_escrow_fees enable row level security;
alter table public.cbos_escrow_conditions enable row level security;
alter table public.cbos_escrow_documents enable row level security;
alter table public.cbos_escrow_approvals enable row level security;
alter table public.cbos_beneficiaries enable row level security;
alter table public.cbos_transfers enable row level security;
alter table public.cbos_cards enable row level security;
alter table public.cbos_crypto_wallets enable row level security;
alter table public.cbos_savings_vaults enable row level security;
alter table public.cbos_notifications enable row level security;
alter table public.cbos_audit_logs enable row level security;

create or replace function public.cbos_user_org_ids()
returns setof uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id from public.cbos_organization_members where user_id = auth.uid();
$$;

create policy "cbos org members read org"
  on public.cbos_organizations for select to authenticated
  using (id in (select public.cbos_user_org_ids()));

create policy "cbos members read own org members"
  on public.cbos_organization_members for select to authenticated
  using (organization_id in (select public.cbos_user_org_ids()));

create policy "cbos wallets org read"
  on public.cbos_wallets for select to authenticated
  using (organization_id in (select public.cbos_user_org_ids()));

create policy "cbos wallet balances read"
  on public.cbos_wallet_balances for select to authenticated
  using (
    wallet_id in (
      select id from public.cbos_wallets
      where organization_id in (select public.cbos_user_org_ids())
    )
  );

create policy "cbos escrows org read"
  on public.cbos_escrows for select to authenticated
  using (organization_id in (select public.cbos_user_org_ids()));

create policy "cbos escrows org insert"
  on public.cbos_escrows for insert to authenticated
  with check (organization_id in (select public.cbos_user_org_ids()));

create policy "cbos notifications own"
  on public.cbos_notifications for select to authenticated
  using (user_id = auth.uid());

create policy "cbos notifications update own"
  on public.cbos_notifications for update to authenticated
  using (user_id = auth.uid());

create policy "cbos audit org read"
  on public.cbos_audit_logs for select to authenticated
  using (organization_id in (select public.cbos_user_org_ids()));

create policy "cbos transfers read" on public.cbos_transfers for select to authenticated
  using (organization_id in (select public.cbos_user_org_ids()));

create policy "cbos cards read" on public.cbos_cards for select to authenticated
  using (organization_id in (select public.cbos_user_org_ids()));

create policy "cbos beneficiaries read" on public.cbos_beneficiaries for select to authenticated
  using (organization_id in (select public.cbos_user_org_ids()));

create policy "cbos crypto read" on public.cbos_crypto_wallets for select to authenticated
  using (organization_id in (select public.cbos_user_org_ids()));

create policy "cbos savings read" on public.cbos_savings_vaults for select to authenticated
  using (organization_id in (select public.cbos_user_org_ids()));

create policy "cbos escrow participants read" on public.cbos_escrow_participants for select to authenticated
  using (
    escrow_id in (
      select id from public.cbos_escrows
      where organization_id in (select public.cbos_user_org_ids())
    )
  );

create policy "cbos escrow docs read" on public.cbos_escrow_documents for select to authenticated
  using (
    escrow_id in (
      select id from public.cbos_escrows
      where organization_id in (select public.cbos_user_org_ids())
    )
  );
