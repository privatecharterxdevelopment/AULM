import { useState } from 'react'
import { getSupabase, tables, type KycApplication } from '../../lib/supabase'
import { notifyOps } from '../../utils/notifyOps'

type Props = {
  applications: KycApplication[]
  onUpdated: () => void
}

function statusPill(status: string) {
  const cls =
    status === 'approved'
      ? 'dash-pill--approved'
      : status === 'rejected'
        ? 'dash-pill--rejected'
        : 'dash-pill--submitted'
  return <span className={`dash-pill ${cls}`}>{status.replace('_', ' ')}</span>
}

export function AdminApplications({ applications, onUpdated }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const setStatus = async (app: KycApplication, status: 'approved' | 'rejected') => {
    const supabase = getSupabase()
    if (!supabase) return
    setBusy(app.id)
    setError(null)

    const { error: kycErr } = await supabase
      .from(tables.kycApplications)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', app.id)

    if (kycErr) {
      setError(kycErr.message)
      setBusy(null)
      return
    }

    if (app.user_id) {
      await supabase
        .from(tables.profiles)
        .update({ kyc_status: status, updated_at: new Date().toISOString() })
        .eq('id', app.user_id)
    }

    notifyOps({
      type: 'kyc_status_changed',
      applicationId: app.id,
      company: app.company_legal_name,
      customerEmail: app.contact_email,
      status,
    })

    setBusy(null)
    onUpdated()
  }

  const pending = applications.filter((a) => a.status === 'under_review')

  return (
    <div className="dash-section">
      <section className="dash-card">
        <h2 className="dash-card-title">KYC / KYB applications</h2>
        <p className="dash-card-text">
          {pending.length} pending review · {applications.length} total
        </p>
        {error ? <p className="kyc-error">{error}</p> : null}

        {applications.length === 0 ? (
          <p className="dash-card-text">No applications yet.</p>
        ) : (
          <ul className="admin-list">
            {applications.map((app) => {
              const open = expanded === app.id
              const payload = app.payload ?? {}
              return (
                <li key={app.id} className="admin-list-item">
                  <button
                    type="button"
                    className="admin-list-head"
                    onClick={() => setExpanded(open ? null : app.id)}
                  >
                    <div>
                      <p className="admin-list-title">{app.company_legal_name}</p>
                      <p className="admin-list-meta">
                        {app.contact_email} · {new Date(app.created_at).toLocaleString('en-GB')}
                      </p>
                    </div>
                    {statusPill(app.status)}
                  </button>

                  {open ? (
                    <div className="admin-list-body">
                      <dl className="kyc-review dash-app-review">
                        <dt>Application ID</dt>
                        <dd>{app.id}</dd>
                        <dt>Representative</dt>
                        <dd>{String(payload.contactName ?? '—')}</dd>
                        <dt>Phone</dt>
                        <dd>{String(payload.contactPhone ?? '—')}</dd>
                        <dt>Country</dt>
                        <dd>{String(payload.incorporationCountry ?? '—')}</dd>
                        <dt>Expected turnover</dt>
                        <dd>{String(payload.expectedTurnover ?? '—')} USD / year</dd>
                        <dt>Role</dt>
                        <dd>{String(payload.counterpartyRole ?? '—')}</dd>
                      </dl>

                      {app.status === 'under_review' ? (
                        <div className="admin-actions">
                          <button
                            type="button"
                            className="metal-page-btn metal-page-btn--primary"
                            disabled={busy === app.id}
                            onClick={() => void setStatus(app, 'approved')}
                          >
                            {busy === app.id ? 'Saving…' : 'Approve'}
                          </button>
                          <button
                            type="button"
                            className="metal-page-btn"
                            disabled={busy === app.id}
                            onClick={() => void setStatus(app, 'rejected')}
                          >
                            Reject
                          </button>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
