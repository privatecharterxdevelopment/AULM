import { useState } from 'react'
import { BtnArrow } from '../BtnArrow'
import { useAuth } from '../../auth/AuthContext'
import { formatUsd } from '../../data/dashboard'
import { makeOrderReference, useOrders } from '../../hooks/useOrders'
import { getSupabase, tables, type Order, type OrderType } from '../../lib/supabase'
import { notifyOps } from '../../utils/notifyOps'

const ORDER_TYPES: { id: OrderType; label: string; hint: string }[] = [
  { id: 'buy', label: 'Buy', hint: 'Purchase gold or metals from AULM' },
  { id: 'sell', label: 'Sell', hint: 'Sell metal into AULM settlement' },
  {
    id: 'delivery_inbound',
    label: 'Planned delivery',
    hint: 'Announce a shipment you will deliver to us',
  },
]

const METALS = ['gold', 'silver', 'copper'] as const

const TYPE_LABEL: Record<OrderType, string> = {
  buy: 'Buy',
  sell: 'Sell',
  delivery_inbound: 'Planned delivery',
}

export function DashboardOrders() {
  const { user, profile } = useAuth()
  const { orders, loading, refresh } = useOrders()
  const [orderType, setOrderType] = useState<OrderType>('buy')
  const [metal, setMetal] = useState<(typeof METALS)[number]>('gold')
  const [quantityOz, setQuantityOz] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [valueUsd, setValueUsd] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [origin, setOrigin] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const oz = quantityOz ? Number.parseFloat(quantityOz.replace(/,/g, '')) : null
    const kg = weightKg ? Number.parseFloat(weightKg.replace(/,/g, '')) : null
    const usd = valueUsd ? Number.parseFloat(valueUsd.replace(/,/g, '')) : null

    if (orderType === 'delivery_inbound') {
      if (!kg || kg <= 0) {
        setError('Enter planned weight in kg.')
        return
      }
      if (!deliveryDate) {
        setError('Enter expected delivery date.')
        return
      }
      if (!origin.trim()) {
        setError('Enter origin / dispatch location.')
        return
      }
    } else if (!oz || oz <= 0) {
      if (!usd || usd <= 0) {
        setError('Enter quantity (oz) or notional value (USD).')
        return
      }
    }

    const supabase = getSupabase()
    if (!supabase) {
      setError('Could not connect.')
      return
    }

    setSubmitting(true)
    setError(null)
    const reference = makeOrderReference()

    const { data, error: insertErr } = await supabase
      .from(tables.orders)
      .insert({
        user_id: user.id,
        reference,
        order_type: orderType,
        metal,
        quantity_oz: oz,
        weight_kg: kg,
        value_usd: usd,
        delivery_date: orderType === 'delivery_inbound' ? deliveryDate : null,
        origin: origin.trim(),
        notes: notes.trim(),
        status: 'submitted',
      })
      .select('*')
      .single()

    setSubmitting(false)

    if (insertErr || !data) {
      setError(insertErr?.message ?? 'Failed to submit order.')
      return
    }

    notifyOps({
      type: 'order_submitted',
      orderId: data.id,
      reference,
      orderType,
      customerEmail: profile?.email ?? user.email,
      company: profile?.company_name ?? undefined,
      metal,
      quantityOz: oz ?? undefined,
      valueUsd: usd ?? undefined,
      deliveryDate: orderType === 'delivery_inbound' ? deliveryDate : undefined,
      origin: origin.trim() || undefined,
      notes: notes.trim() || undefined,
    })

    setQuantityOz('')
    setWeightKg('')
    setValueUsd('')
    setDeliveryDate('')
    setOrigin('')
    setNotes('')
    void refresh()
  }

  return (
    <div className="dash-section">
      <section className="dash-card">
        <h2 className="dash-card-title">New order</h2>
        <p className="dash-card-text">
          Submit buy, sell, or planned delivery instructions. Our desk acknowledges within one
          business day.
        </p>

        <div className="dash-order-types">
          {ORDER_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`dash-order-type${orderType === t.id ? ' is-active' : ''}`}
              onClick={() => setOrderType(t.id)}
            >
              <span className="dash-order-type-label">{t.label}</span>
              <span className="dash-order-type-hint">{t.hint}</span>
            </button>
          ))}
        </div>

        <form className="dash-route-form" onSubmit={(e) => void submitOrder(e)}>
          <div className="dash-form-grid">
            <div className="dash-field">
              <label className="dash-field-label" htmlFor="orderMetal">
                Metal
              </label>
              <select
                id="orderMetal"
                className="dash-input"
                value={metal}
                onChange={(e) => setMetal(e.target.value as (typeof METALS)[number])}
              >
                {METALS.map((m) => (
                  <option key={m} value={m}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {orderType !== 'delivery_inbound' ? (
              <>
                <div className="dash-field">
                  <label className="dash-field-label" htmlFor="orderOz">
                    Quantity (troy oz)
                  </label>
                  <input
                    id="orderOz"
                    className="dash-input"
                    value={quantityOz}
                    onChange={(e) => setQuantityOz(e.target.value)}
                    placeholder="e.g. 50"
                  />
                </div>
                <div className="dash-field">
                  <label className="dash-field-label" htmlFor="orderValue">
                    Or notional (USD)
                  </label>
                  <input
                    id="orderValue"
                    className="dash-input"
                    value={valueUsd}
                    onChange={(e) => setValueUsd(e.target.value)}
                    placeholder="e.g. 125,000"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="dash-field">
                  <label className="dash-field-label" htmlFor="orderWeight">
                    Weight (kg) *
                  </label>
                  <input
                    id="orderWeight"
                    className="dash-input"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="e.g. 12.4"
                    required
                  />
                </div>
                <div className="dash-field">
                  <label className="dash-field-label" htmlFor="orderDelivery">
                    Expected delivery *
                  </label>
                  <input
                    id="orderDelivery"
                    type="date"
                    className="dash-input"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    required
                  />
                </div>
                <div className="dash-field">
                  <label className="dash-field-label" htmlFor="orderOrigin">
                    Origin / dispatch *
                  </label>
                  <input
                    id="orderOrigin"
                    className="dash-input"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Accra refinery"
                    required
                  />
                </div>
                <div className="dash-field">
                  <label className="dash-field-label" htmlFor="orderValueDel">
                    Est. value (USD)
                  </label>
                  <input
                    id="orderValueDel"
                    className="dash-input"
                    value={valueUsd}
                    onChange={(e) => setValueUsd(e.target.value)}
                    placeholder="Optional"
                  />
                </div>
              </>
            )}
          </div>

          <div className="dash-field">
            <label className="dash-field-label" htmlFor="orderNotes">
              Instructions
            </label>
            <textarea
              id="orderNotes"
              className="dash-input dash-input--area"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Settlement, assay, vault destination, contact on arrival…"
            />
          </div>

          {error ? <p className="kyc-error">{error}</p> : null}

          <button
            type="submit"
            className="metal-page-btn metal-page-btn--primary"
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : `Submit ${TYPE_LABEL[orderType].toLowerCase()} order`}
            <BtnArrow />
          </button>
        </form>
      </section>

      <section className="dash-card">
        <h2 className="dash-card-title">Your orders</h2>
        {loading ? (
          <p className="dash-card-text">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="dash-card-text">No orders yet.</p>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Type</th>
                  <th>Metal</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <OrderRow key={o.id} order={o} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

function OrderRow({ order }: { order: Order }) {
  const size =
    order.order_type === 'delivery_inbound'
      ? order.weight_kg
        ? `${order.weight_kg} kg`
        : '—'
      : order.quantity_oz
        ? `${order.quantity_oz} oz`
        : order.value_usd
          ? formatUsd(Number(order.value_usd))
          : '—'

  return (
    <tr>
      <td className="dash-table-mono">{order.reference}</td>
      <td>{TYPE_LABEL[order.order_type]}</td>
      <td className="dash-capitalize">{order.metal}</td>
      <td>{size}</td>
      <td>
        <span className={`dash-pill dash-pill--${order.status}`}>
          {order.status.replace('_', ' ')}
        </span>
      </td>
      <td>{new Date(order.created_at).toLocaleDateString('en-GB')}</td>
    </tr>
  )
}
