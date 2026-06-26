-- Demo seed — run after creating a test user in Supabase Auth
-- 1. Sign up / create user in Auth → copy user UUID
-- 2. Replace :USER_ID below and run

/*
WITH org AS (
  INSERT INTO public.cbos_organizations (name, legal_name, org_type, slug, kyc_status, bank_license_ref)
  VALUES (
    'AULM Demo Trading',
    'AULM Precious Metal Trader LLC',
    'commodity_trader',
    'aulm-demo',
    'approved',
    'IFZA-85927'
  )
  RETURNING id
),
ws AS (
  INSERT INTO public.cbos_workspaces (organization_id, name, slug, is_default)
  SELECT id, 'Default', 'default', true FROM org
  RETURNING id, organization_id
)
INSERT INTO public.cbos_organization_members (organization_id, user_id, org_role)
SELECT organization_id, '00000000-0000-0000-0000-000000000000'::uuid, 'owner' FROM ws;

INSERT INTO public.cbos_wallets (organization_id, account_type, currency, label, iban)
SELECT o.id, 'business', 'USD', 'Operating USD', 'AE07 0331 2345 6789 0123 456'
FROM public.cbos_organizations o WHERE slug = 'aulm-demo';

INSERT INTO public.cbos_wallet_balances (wallet_id, kind, amount)
SELECT w.id, 'available', 1245800
FROM public.cbos_wallets w
JOIN public.cbos_organizations o ON o.id = w.organization_id
WHERE o.slug = 'aulm-demo' AND w.label = 'Operating USD';
*/
