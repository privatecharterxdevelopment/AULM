import { DEMO_PAYMENTS, PAYMENT_STATUS_LABEL, formatUsdPrecise } from '../../data/dashboard'

export function DashboardPayments() {
  return (
    <div className="dash-section">
      <section className="dash-card">
        <h2 className="dash-card-title">Payments</h2>
        <p className="dash-card-text">
          SWIFT and internal settlements between approved institutional accounts.
        </p>
        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Counterparty</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_PAYMENTS.map((p) => (
                <tr key={p.id}>
                  <td className="dash-table-mono">{p.reference}</td>
                  <td>{p.counterparty}</td>
                  <td className="dash-table-num">{formatUsdPrecise(p.amountUsd)}</td>
                  <td>{p.method}</td>
                  <td>{p.date}</td>
                  <td>
                    <span className={`dash-pill dash-pill--pay-${p.status}`}>
                      {PAYMENT_STATUS_LABEL[p.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
