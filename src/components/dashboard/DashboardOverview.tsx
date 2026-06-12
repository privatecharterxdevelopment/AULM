import { Link } from 'react-router-dom'
import { formatUsd } from '../../data/dashboard'
import { useOrders } from '../../hooks/useOrders'
import type { LiveMetalPrice } from '../../hooks/useLiveMetalPrices'
import { MetalPriceChart } from './MetalPriceChart'

type Props = {
  gold: LiveMetalPrice
  kycApproved: boolean
  onGoToOrders?: () => void
}

export function DashboardOverview({ gold, kycApproved, onGoToOrders }: Props) {
  const { orders } = useOrders()
  const openOrders = orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled')
  const buyOrders = orders.filter((o) => o.order_type === 'buy').length
  const deliveryOrders = orders.filter((o) => o.order_type === 'delivery_inbound').length

  return (
    <div className="dash-section">
      <div className="dash-stat-row">
        <article className="dash-stat">
          <p className="dash-stat-label">Open orders</p>
          <p className="dash-stat-value">{kycApproved ? openOrders.length : '—'}</p>
          <p className="dash-stat-hint">Buy · sell · deliveries</p>
        </article>
        <article className="dash-stat">
          <p className="dash-stat-label">Buy instructions</p>
          <p className="dash-stat-value">{kycApproved ? buyOrders : '—'}</p>
          <p className="dash-stat-hint">Submitted to desk</p>
        </article>
        <article className="dash-stat">
          <p className="dash-stat-label">Planned deliveries</p>
          <p className="dash-stat-value">{kycApproved ? deliveryOrders : '—'}</p>
          <p className="dash-stat-hint">Inbound to AULM</p>
        </article>
        <article className="dash-stat">
          <p className="dash-stat-label">Gold spot</p>
          <p className="dash-stat-value">{formatUsd(gold.price)}</p>
          <p className="dash-stat-hint">Per troy oz · live</p>
        </article>
      </div>

      <div className="dash-split">
        <section className="dash-card">
          <h2 className="dash-card-title">Live gold</h2>
          <MetalPriceChart metal={gold} />
          {!kycApproved ? (
            <p className="dash-card-text dash-card-text--tight">
              Complete onboarding to submit orders and vault instructions.
            </p>
          ) : null}
        </section>

        <section className="dash-card">
          <h2 className="dash-card-title">Recent orders</h2>
          {!kycApproved ? (
            <p className="dash-card-text">Orders unlock once your account is approved.</p>
          ) : orders.length === 0 ? (
            <p className="dash-card-text">No orders yet — use the Orders tab to get started.</p>
          ) : (
            <ul className="dash-track-list">
              {orders.slice(0, 4).map((o) => (
                <li key={o.id} className="dash-track-item">
                  <div>
                    <p className="dash-track-id">{o.reference}</p>
                    <p className="dash-track-route">
                      {o.order_type.replace('_', ' ')} · {o.metal}
                    </p>
                  </div>
                  <span className={`dash-pill dash-pill--${o.status}`}>
                    {o.status.replace('_', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="dash-card">
        <h2 className="dash-card-title">Quick actions</h2>
        <div className="dash-actions">
          {kycApproved && onGoToOrders ? (
            <button type="button" className="dash-action-link" onClick={onGoToOrders}>
              New order
            </button>
          ) : null}
          <Link to="/logistics/export" className="dash-action-link">
            Create export route
          </Link>
          <Link to="/logistics/import" className="dash-action-link">
            Create import route
          </Link>
          <Link to="/gold" className="dash-action-link">
            Market overview
          </Link>
        </div>
      </section>
    </div>
  )
}
