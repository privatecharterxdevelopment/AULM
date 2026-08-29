# AULM CRM schema

Private Superadmin / operations CRM for AULM staff.

## Deploy order

1. Ensure `aulm_modern_*` tables and admin SQL are already applied.
2. Run `001_crm_core.sql` in the primary Supabase SQL editor.
3. Bootstrap the first staff member:

```sql
insert into public.crm_staff_members (user_id, role, full_name, email)
select id, 'superadmin', coalesce(raw_user_meta_data->>'full_name', email), email
from auth.users
where lower(email) = 'contact@aulmtrading.com';
```

## Security model

- Staff access only via `crm_staff_members`
- Roles: `superadmin`, `operations`, `compliance`, `sales`, `finance`, `readonly`
- Private Storage bucket: `crm-private`
- Client onboarding links must use Edge Functions + hashed tokens, never public table writes
- Audit every create/update/upload/sign event into `crm_audit_logs`

## UI

Frontend lives under `/crm` and currently uses rich demo data so the product can be used immediately while the migration is deployed.
