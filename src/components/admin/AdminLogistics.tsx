import { useState } from 'react'
import { formatUsd } from '../../data/dashboard'
import { getSupabase, tables, type LogisticsRequest, type Profile } from '../../lib/supabase'

type Props = {
  requests: LogisticsRequest[]
  profiles: Profile[]
  onUpdated: () => void
}

const STATUSES: LogisticsRequest['status'][] = [
  'submitted',
  'in_progress',
  'completed',
  'cancelled',
]

export function AdminLogistics({ requests, profiles, onUpdated }: Props) {
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const profileMap = new Map(profiles.map((p) => [p.id, p]))

  const updateStatus = async (id: string, status: LogisticsRequest['status']) => {
    const supabase = getSupabase()
    if (!supabase) return
    setBusy(id)
    setError(null)
    const { error: err } = await supabase
      .from(tables.logisticsRequests)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
    setBusy(null)
    if (err) {
      setError(err.message)
      return
    }
    onUpdated()
  }

  const open = requests.filter((r) => r.status === 'submitted' || r.status === 'in_progress')

  return (
    <div className="dash-section">
      <section className="dash-card">
        <h2 className="dash-card-title">Logistics mandates</h2>
        <p className="dash-card-text">
          {open.length} open · {requests.length} total
        </p>
        {error ? <p className="kyc-error">{error}</p> : null}

        {requests.length === 0 ? (
          <p className="dash-card-text">No logistics requests yet.</p>
        ) : (
          <ul className="admin-list">
            {requests.map((r) => {
              const profile = profileMap.get(r.user_id)
              return (
                <li key={r.id} className="admin-list-item admin-list-item--static">
                  <div className="admin-list-head">
                    <div>
                      <p className="admin-list-title">
                        {r.from_location} → {r.to_location}
                      </p>
                      <p className="admin-list-meta">
                        {profile?.company_name ?? profile?.email ?? r.user_id.slice(0, 8)} ·{' '}
                        {r.commodity} · {formatUsd(Number(r.value_usd))} · {r.weight_kg} kg ·{' '}
                        {r.mode} · {new Date(r.created_at).toLocaleString('en-GB')}
                      </p>
                      {r.notes ? <p className="admin-list-notes">{r.notes}</p> : null}
                    </div>
                    <select
                      className="dash-input admin-status-select"
                      value={r.status}
                      disabled={busy === r.id}
                      onChange={(e) =>
                        void updateStatus(r.id, e.target.value as LogisticsRequest['status'])
                      }
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
