export function DashboardBanking() {
  return (
    <div className="dash-section">
      <section className="dash-card dash-card--locked dash-card--coming-soon">
        <p className="dash-coming-soon-eyebrow">Banking</p>
        <h2 className="dash-card-title">Coming soon</h2>
        <p className="dash-card-text">
          SWIFT settlements, internal transfers, and multi-currency accounts between approved
          institutional counterparties will be available here.
        </p>
        <p className="dash-card-text">
          For urgent settlement instructions, use <strong>Orders</strong> or contact{' '}
          <a href="mailto:contact@aulmtrading.com">contact@aulmtrading.com</a>.
        </p>
      </section>
    </div>
  )
}
