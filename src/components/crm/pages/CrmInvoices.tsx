import { Link } from 'react-router-dom'
import { CRM_CLIENTS } from '../../../crm/mockData'
import { CrmPageHead, CrmStatus, formatDate, formatUsd } from '../CrmUi'

const INVOICES = [
  {
    id: 'inv-001',
    number: 'AULM-INV-2026-0042',
    clientId: 'client-001',
    title: 'Gold Lot 42.5 kg · SPA settlement',
    status: 'issued',
    amount: 3_410_000,
    currency: 'USD',
    issuedAt: '2026-07-12',
    dueAt: '2026-07-26',
  },
  {
    id: 'inv-002',
    number: 'AULM-INV-2026-0038',
    clientId: 'client-002',
    title: 'Bullion sale · 58 kg XAU',
    status: 'paid',
    amount: 4_612_000,
    currency: 'USD',
    issuedAt: '2026-06-21',
    dueAt: '2026-07-05',
  },
  {
    id: 'inv-003',
    number: 'AULM-INV-2026-0031',
    clientId: 'client-001',
    title: 'Logistics & clearing fee',
    status: 'overdue',
    amount: 48_600,
    currency: 'USD',
    issuedAt: '2026-06-01',
    dueAt: '2026-06-15',
  },
  {
    id: 'inv-004',
    number: 'AULM-INV-2026-0027',
    clientId: 'client-003',
    title: 'Copper consignment deposit',
    status: 'draft',
    amount: 980_000,
    currency: 'USD',
    issuedAt: '2026-07-18',
    dueAt: '2026-08-01',
  },
]

export function CrmInvoices() {
  const clientName = (id: string) => {
    const client = CRM_CLIENTS.find((item) => item.id === id)
    return client?.tradingName ?? client?.legalName ?? '—'
  }

  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Billing"
        title="Invoices"
        subtitle="Create, store and track commercial invoices linked to clients and trades."
        actions={
          <>
            <Link to="/crm/generators" className="crm-secondary-btn">Generate PDF</Link>
            <button type="button" className="crm-primary-btn">New invoice</button>
          </>
        }
      />

      <section className="crm-strip crm-strip--compact" aria-label="Invoice summary">
        <article>
          <span>Open</span>
          <strong>{INVOICES.filter((i) => i.status === 'issued' || i.status === 'overdue').length}</strong>
          <small>Awaiting payment</small>
        </article>
        <article>
          <span>Paid MTD</span>
          <strong>{formatUsd(INVOICES.filter((i) => i.status === 'paid').reduce((s, i) => s + i.amount, 0))}</strong>
          <small>Settled</small>
        </article>
        <article>
          <span>Drafts</span>
          <strong>{INVOICES.filter((i) => i.status === 'draft').length}</strong>
          <small>Not sent</small>
        </article>
      </section>

      <section className="crm-card crm-card--flush">
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Client</th>
                <th>Status</th>
                <th>Issued</th>
                <th>Due</th>
                <th className="is-number">Amount</th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <strong>{invoice.number}</strong>
                    <div className="crm-muted-line">{invoice.title}</div>
                  </td>
                  <td>
                    <Link to={`/crm/clients/${invoice.clientId}`}>{clientName(invoice.clientId)}</Link>
                  </td>
                  <td><CrmStatus value={invoice.status} /></td>
                  <td>{formatDate(invoice.issuedAt)}</td>
                  <td>{formatDate(invoice.dueAt)}</td>
                  <td className="is-number">{formatUsd(invoice.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
