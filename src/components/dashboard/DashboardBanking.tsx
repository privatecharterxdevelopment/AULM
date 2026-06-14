import { Link } from 'react-router-dom'
import { BANKING_PRE_APPLY_PATH } from '../../data/bankingFlow'

export function DashboardBanking() {
  return (
    <div className="dash-section">
      <section className="dash-card">
        <p className="dash-coming-soon-eyebrow">Banking</p>
        <h2 className="dash-card-title">Pre-apply for institutional banking</h2>
        <p className="dash-card-text">
          SWIFT settlements, internal transfers, and multi-currency accounts between approved
          counterparties are rolling out with partner banks. Submit your pre-application now — we
          will prioritise approved KYC/KYB desks.
        </p>
        <Link to={BANKING_PRE_APPLY_PATH} className="metal-page-btn metal-page-btn--primary dash-banking-cta">
          Open pre-application form
        </Link>
        <p className="dash-card-text dash-card-text--muted">
          For urgent settlement instructions, use <strong>Orders</strong> or contact{' '}
          <a href="mailto:contact@aulmtrading.com">contact@aulmtrading.com</a>.
        </p>
      </section>
    </div>
  )
}
