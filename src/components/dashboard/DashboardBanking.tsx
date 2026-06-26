import { Link } from 'react-router-dom'
import { DEMO_SUMMARY } from '../../cbos/mocks/demoData'
import { formatMoney } from '../../cbos/lib/format'
import { BANKING_PRE_APPLY_PATH } from '../../data/bankingFlow'

export function DashboardBanking() {
  return (
    <div className="dash-section">
      <section className="dash-card cbos-glass">
        <p className="dash-coming-soon-eyebrow">CommodityBank OS</p>
        <h2 className="dash-card-title">Banking &amp; trading — one desk</h2>
        <p className="dash-card-text">
          Treasury, payroll and escrows are unified under <Link to="/bank">/bank</Link>.
        </p>

        <div className="dash-stat-row" style={{ marginTop: '1rem' }}>
          <article className="dash-stat">
            <p className="dash-stat-label">Total holding</p>
            <p className="dash-stat-value">{formatMoney(DEMO_SUMMARY.totalBalance, 'USD')}</p>
          </article>
          <article className="dash-stat">
            <p className="dash-stat-label">Cash</p>
            <p className="dash-stat-value">{formatMoney(DEMO_SUMMARY.cashBalance, 'USD')}</p>
          </article>
          <article className="dash-stat">
            <p className="dash-stat-label">Escrow</p>
            <p className="dash-stat-value">{formatMoney(DEMO_SUMMARY.escrowBalance, 'USD')}</p>
          </article>
        </div>

        <Link to="/bank" className="metal-page-btn metal-page-btn--primary dash-banking-cta">
          Open unified banking dashboard
        </Link>
        <Link to={BANKING_PRE_APPLY_PATH} className="dash-action-link" style={{ display: 'inline-block', marginTop: '0.75rem' }}>
          Pre-apply for additional accounts
        </Link>
      </section>
    </div>
  )
}
