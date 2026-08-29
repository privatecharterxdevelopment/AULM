import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'
import {
  CRM_APPROVALS,
  CRM_CLIENTS,
  CRM_EVAULT,
} from '../../../crm/mockData'
import { CrmPageHead, CrmStatus, formatDate, formatUsd } from '../CrmUi'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function CrmDashboard() {
  const { profile } = useAuth()
  const firstName = (profile?.full_name ?? 'Admin').split(' ')[0]

  const activeClients = CRM_CLIENTS.filter((client) => client.status === 'active').length
  const pendingKyc = CRM_CLIENTS.filter((client) =>
    ['invited', 'in_progress', 'under_review'].includes(client.kycStatus),
  ).length
  const pendingApprovals = CRM_APPROVALS.filter((item) => item.status === 'pending')
  const evaultAum = CRM_EVAULT.reduce((sum, item) => sum + item.principalUsd + item.accruedUsd, 0)
  const cashProxy = CRM_CLIENTS.reduce((sum, client) => sum + client.expectedAnnualVolume * 0.04, 0)
  const platformTotal = evaultAum + cashProxy

  const recentTransactions = CRM_CLIENTS
    .flatMap((client) =>
      client.transactions.map((transaction) => ({ client, transaction })),
    )
    .sort((a, b) => b.transaction.date.localeCompare(a.transaction.date))
    .slice(0, 5)

  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Admin CRM"
        title={`${greeting()}, ${firstName}`}
        subtitle="Haupt-Admin: Kunden, Rechnungen, Dokumente, KYC und E-Vault."
        actions={
          <>
            <Link to="/crm/invoices" className="crm-secondary-btn">Invoices</Link>
            <Link to="/crm/clients/new" className="crm-primary-btn">Add client</Link>
          </>
        }
      />

      <section className="crm-hero-balance" aria-label="Platform balances">
        <div className="crm-hero-balance__copy">
          <span>Platform AUM · live book</span>
          <strong>{formatUsd(platformTotal)}</strong>
          <small>
            {activeClients} active clients · {pendingKyc} KYC in queue
          </small>
        </div>
        <div className="crm-hero-balance__chart" aria-hidden>
          <svg viewBox="0 0 320 84" preserveAspectRatio="none">
            <path
              d="M0 62 C40 58 55 40 90 44 C130 48 150 22 190 28 C230 34 250 16 290 20 L320 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      </section>

      <section className="crm-strip" aria-label="Book snapshot">
        <article>
          <span>Clients</span>
          <strong>{CRM_CLIENTS.length}</strong>
          <small>{activeClients} active</small>
        </article>
        <article>
          <span>Cash (book)</span>
          <strong>{formatUsd(cashProxy)}</strong>
          <small>Operational float</small>
        </article>
        <article>
          <span>E-Vault AUM</span>
          <strong>{formatUsd(evaultAum)}</strong>
          <small>+3.4% / 5.5% APY</small>
        </article>
        <article>
          <span>Approvals</span>
          <strong>{pendingApprovals.length}</strong>
          <small>Need action</small>
        </article>
        <article>
          <span>KYC queue</span>
          <strong>{pendingKyc}</strong>
          <small>Invited / review</small>
        </article>
      </section>

      <div className="crm-dashboard-grid">
        <section className="crm-card">
          <header className="crm-card__head">
            <div>
              <p>Queue</p>
              <h3>Pending approvals</h3>
            </div>
            <Link to="/crm/approvals">View all</Link>
          </header>
          <ul className="crm-queue-list">
            {pendingApprovals.slice(0, 5).map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <span>
                    {item.clientName} · {item.requestedBy} · {formatDate(item.requestedAt)}
                  </span>
                </div>
                <div className="crm-queue-list__meta">
                  {item.amountUsd != null ? <em>{formatUsd(item.amountUsd)}</em> : null}
                  <CrmStatus value={item.priority} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="crm-card">
          <header className="crm-card__head">
            <div>
              <p>Compliance</p>
              <h3>KYC attention</h3>
            </div>
            <Link to="/crm/onboarding">Open</Link>
          </header>
          <ul className="crm-attention-list">
            {CRM_CLIENTS.filter((client) => client.kycStatus !== 'approved').map((client) => (
              <li key={client.id}>
                <span className={`crm-attention-list__dot is-${client.riskRating}`} />
                <div>
                  <Link to={`/crm/clients/${client.id}`}>{client.legalName}</Link>
                  <span>KYC {client.kycStatus.replace(/_/g, ' ')} · {client.riskRating} risk</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="crm-dashboard-grid">
        <section className="crm-card">
          <header className="crm-card__head">
            <div>
              <p>Trading</p>
              <h3>Recent payments</h3>
            </div>
            <Link to="/crm/transactions">View all</Link>
          </header>
          <div className="crm-table-wrap">
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th className="is-number">Value</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map(({ client, transaction }) => (
                  <tr key={transaction.id}>
                    <td>
                      <Link to={`/crm/clients/${client.id}`}>{transaction.reference}</Link>
                    </td>
                    <td>{client.tradingName ?? client.legalName}</td>
                    <td><CrmStatus value={transaction.status} /></td>
                    <td className="is-number">{formatUsd(transaction.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
