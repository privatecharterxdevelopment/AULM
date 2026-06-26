# CommodityBank OS — Supabase (Lorenzo's Projects)

Create a **new Supabase project** in the Lorenzo's Projects org (separate from the marketing site DB).

## Setup

1. Supabase Dashboard → New project → e.g. `commoditybank-os`
2. Copy **Project URL** and **anon key** into `.env`:

```env
VITE_CBOS_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_CBOS_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
# or legacy anon key:
# VITE_CBOS_SUPABASE_ANON_KEY=your-anon-key
```

3. SQL Editor → run in order:
   - `001_schema.sql`
   - `002_rls.sql`
   - `003_seed.sql` (optional demo org)

4. Enable **Auth** → Email provider. Existing AULM KYC tables can stay on the legacy project; CBOS uses `cbos_*` tables only.

## Architecture

- **Multi-tenant:** Platform → Organization → Workspace → Members
- **RBAC:** Platform roles + org roles + escrow roles (see `src/cbos/rbac/roles.ts`)
- **Ledger:** Immutable `cbos_ledger_entries` for settlements
- **KYC:** Link `cbos_organization_members.user_id` to `auth.users`; keep `aulm_modern_kyc_applications` flow on legacy DB or migrate profile into `cbos_organizations.kyc_status`
