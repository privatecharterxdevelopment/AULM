-- Allow compliance to request more documents on a KYC file.
do $$
declare
  r record;
begin
  for r in
    select c.conname
    from pg_constraint c
    where c.conrelid = 'public.aulm_modern_kyc_applications'::regclass
      and c.contype = 'c'
      and pg_get_constraintdef(c.oid) ilike '%status%'
  loop
    execute format('alter table public.aulm_modern_kyc_applications drop constraint %I', r.conname);
  end loop;
end $$;

alter table public.aulm_modern_kyc_applications
  add constraint aulm_modern_kyc_applications_status_check
  check (status in ('under_review', 'approved', 'rejected', 'more_docs'));

do $$
declare
  r record;
begin
  for r in
    select c.conname
    from pg_constraint c
    where c.conrelid = 'public.aulm_modern_profiles'::regclass
      and c.contype = 'c'
      and pg_get_constraintdef(c.oid) ilike '%kyc_status%'
  loop
    execute format('alter table public.aulm_modern_profiles drop constraint %I', r.conname);
  end loop;
end $$;

alter table public.aulm_modern_profiles
  add constraint aulm_modern_profiles_kyc_status_check
  check (kyc_status in ('none', 'under_review', 'approved', 'rejected', 'more_docs'));
