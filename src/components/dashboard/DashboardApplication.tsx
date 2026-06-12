import { useEffect, useState } from 'react'
import { ACCOUNT_USE_OPTIONS } from '../../types/kyc'
import { getSupabase, tables } from '../../lib/supabase'
import { useAuth } from '../../auth/AuthContext'

type ApplicationRow = {
  id: string
  created_at: string
  company_legal_name: string
  contact_email: string
  status: string
  payload: Record<string, unknown>
}

export function DashboardApplication() {
  const { profile } = useAuth()
  const [app, setApp] = useState<ApplicationRow | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase || !profile?.kyc_application_id) {
      setLoading(false)
      return
    }
    void supabase
      .from(tables.kycApplications)
      .select('id, created_at, company_legal_name, contact_email, status, payload')
      .eq('id', profile.kyc_application_id)
      .maybeSingle()
      .then(({ data }) => {
        setApp(data as ApplicationRow | null)
        setLoading(false)
      })
  }, [profile?.kyc_application_id])

  if (loading) {
    return (
      <div className="dash-section">
        <section className="dash-card">
          <p className="dash-card-text">Loading your application…</p>
        </section>
      </div>
    )
  }

  if (!app) {
    return (
      <div className="dash-section">
        <section className="dash-card">
          <h2 className="dash-card-title">Application</h2>
          <p className="dash-card-text">No application on file yet.</p>
        </section>
      </div>
    )
  }

  const approved = profile?.kyc_status === 'approved'
  const payload = app.payload ?? {}
  const useCases = Array.isArray(payload.accountUseCases)
    ? (payload.accountUseCases as string[])
        .map((id) => ACCOUNT_USE_OPTIONS.find((o) => o.id === id)?.label ?? id)
        .join(' · ')
    : '—'

  return (
    <div className="dash-section">
      <section className="dash-card">
        <h2 className="dash-card-title">Your application</h2>
        <p className="dash-card-text">
          Submitted {new Date(app.created_at).toLocaleDateString('en-GB')} · Status:{' '}
          <strong>{app.status === 'under_review' ? 'Under approval' : app.status}</strong>
        </p>
        {!approved ? (
          <p className="dash-card-text">
            Full application details unlock once compliance approves your account (typically within
            48 hours).
          </p>
        ) : null}
        <dl className="kyc-review dash-app-review">
          <dt>Company</dt>
          <dd>{app.company_legal_name}</dd>
          <dt>Login email</dt>
          <dd>{app.contact_email}</dd>
          {approved ? (
            <>
              <dt>Representative</dt>
              <dd>{String(payload.contactName ?? profile?.full_name ?? '—')}</dd>
              <dt>Phone</dt>
              <dd>{String(payload.contactPhone ?? '—')}</dd>
              <dt>Address</dt>
              <dd>{String(payload.registeredAddress ?? '—')}</dd>
              <dt>License</dt>
              <dd>{String(payload.registrationNumber ?? '—')}</dd>
              <dt>Country</dt>
              <dd>{String(payload.incorporationCountry ?? '—')}</dd>
              <dt>Account use</dt>
              <dd>{useCases}</dd>
              <dt>Expected turnover</dt>
              <dd>{String(payload.expectedTurnover ?? '—')} USD / year</dd>
              <dt>Role</dt>
              <dd>{String(payload.counterpartyRole ?? '—')}</dd>
              <dt>Bank</dt>
              <dd>
                {String(payload.bankName ?? '—')} · {String(payload.bankCountry ?? '—')}
              </dd>
              <dt>AUCB interest</dt>
              <dd>
                {payload.aucbOpenAccount === true ? 'Yes' : payload.aucbOpenAccount === false ? 'No' : '—'}
              </dd>
            </>
          ) : null}
        </dl>
      </section>
    </div>
  )
}
