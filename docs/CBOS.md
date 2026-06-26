# CommodityBank OS — Architecture

Enterprise fintech + commodity escrow platform integrated into AULM Modern.

## Quick start

1. **Demo (no Supabase):** Log in → Dashboard → Banking → **Open banking dashboard**, or go to `/bank`
2. **Live DB:** Create Supabase project under Lorenzo's Projects, run SQL migrations, set env vars (see [README](./README.md))

## Folder structure

```
supabase/cbos/          SQL schema, RLS, seed
prisma/schema.prisma    Prisma mirror (optional)
src/cbos/
  api/                  DTOs + API contract
  rbac/                 Roles & permissions
  mocks/                Demo data + payment/crypto/card providers
  providers/            mockApi (implements CbosApiContract)
  context/              CbosProvider
src/components/cbos/    Shell, sidebar, pages
```

## Routes

| Path | Page |
|------|------|
| `/bank` | Dashboard (balances, escrows, FX, notifications) |
| `/bank/wallets` | Multi-currency accounts |
| `/bank/escrows` | Escrow list + flow illustration |
| `/bank/escrows/:id` | Escrow detail (conditions, fees, participants) |
| `/bank/transfers` | International & internal transfers |
| `/bank/cards` | Corporate / virtual cards |
| `/bank/crypto` | Crypto treasury |
| `/bank/savings` | Savings vaults |
| `/bank/approvals` | Multi-level approval queue |
| `/bank/documents` | Document engine |
| `/bank/kyc` | **Existing** KYC wizard (unchanged) |
| `/bank/settings` | Org & environment |

## RBAC

- **Platform roles:** SuperAdmin, OperationsAdmin, ComplianceAdmin, TreasuryAdmin, RiskAdmin
- **Org roles:** owner → viewer (see `src/cbos/rbac/roles.ts`)
- **Escrow roles:** buyer, seller, assayer, escrow_agent, etc.
- Permission checks: `can(orgRole, 'wallet.transfer')` in `permissions.ts`

## Escrow engine (data model)

Statuses: `draft` → `awaiting_funding` → `funded` → `under_review` → `released` → `completed`

Related tables: participants, milestones, fees, conditions, documents, approvals.

Settlement flows through `cbos_ledger_entries` (immutable).

## KYC integration

KYC/KYB stays on the legacy AULM flow (`KycWizard`, `DashboardApplication`). The banking shell embeds it at `/bank/kyc` and shows a banner until `profile.kyc_status === 'approved'`.

Link org KYC: set `cbos_organizations.kyc_status` when legacy application is approved.

## Mock providers

Until Supabase is wired, `mockCbosApi` serves all dashboard data. Swap to Supabase client in `CbosContext` when `VITE_CBOS_SUPABASE_*` is set.
