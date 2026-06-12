import { useState } from 'react'
import { formatUsd } from '../../data/dashboard'
import { getSupabase, tables, type Order, type OrderType, type Profile } from '../../lib/supabase'

const TYPE_LABEL: Record<OrderType, string> = {
  buy: 'Buy',
  sell: 'Sell',
  delivery_inbound: 'Planned delivery',
}

const STATUSES: Order['status'][] = [
  'submitted',
  'acknowledged',
  'in_progress',
  'completed',
  'cancelled',
]

type Props = {
  orders: Order[]
  profiles: Profile[]
  onUpdated: () => void
}

export function AdminOrders({ orders, profiles, onUpdated }: Props) {
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const profileMap = new Map(profiles.map((p) => [p.id, p]))

  const updateStatus = async (id: string, status: Order['status']) => {
    const supabase = getSupabase()
    if (!supabase) return
    setBusy(id)
    setError(null)
    const { error: err } = await supabase
      .from(tables.orders)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
    setBusy(null)
    if (err) {
      setError(err.message)
      return
    }
    onUpdated()
  }

  const open = orders.filter((o) => o.status === 'submitted' || o.status === 'in_progress')

  return (
    <div className="dash-section">
      <section className="dash-card">
        <h2 className="dash-card-title">Trading & delivery orders</h2>
        <p className="dash-card-text">
          {open.length} open · {orders.length} total — buy, sell, planned inbound deliveries
        </p>
        {error ? <p className="kyc-error">{error}</p> : null}

        {orders.length === 0 ? (
          <p className="dash-card-text">No orders yet.</p>
        ) : (
          <ul className="admin-list">
            {orders.map((o) => {
              const profile = profileMap.get(o.user_id)
              const size =
                o.order_type === 'delivery_inbound'
                  ? o.weight_kg
                    ? `${o.weight_kg} kg`
                    : '—'
                  : o.quantity_oz
                    ? `${o.quantity_oz} oz`
                    : o.value_usd
                      ? formatUsd(Number(o.value_usd))
                      : '—'

              return (
                <li key={o.id} className="admin-list-item admin-list-item--static">
                  <div className="admin-list-head">
                    <div>
                      <p className="admin-list-title">
                        {o.reference} · {TYPE_LABEL[o.order_type]} {o.metal}
                      </p>
                      <p className="admin-list-meta">
                        {profile?.company_name ?? profile?.email ?? o.user_id.slice(0, 8)} · {size}{' '}
                        · {new Date(o.created_at).toLocaleString('en-GB')}
                        {o.delivery_date ? ` · ETA ${o.delivery_date}` : ''}
                        {o.origin ? ` · from ${o.origin}` : ''}
                      </p>
                      {o.notes ? <p className="admin-list-notes">{o.notes}</p> : null}
                    </div>
                    <select
                      className="dash-input admin-status-select"
                      value={o.status}
                      disabled={busy === o.id}
                      onChange={(e) =>
                        void updateStatus(o.id, e.target.value as Order['status'])
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
