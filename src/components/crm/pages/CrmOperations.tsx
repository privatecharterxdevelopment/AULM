import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  CRM_APPROVALS,
  CRM_CLIENTS,
  CRM_ESCROWS,
  CRM_EVAULT,
  CRM_STAFF,
} from '../../../crm/mockData'
import { CrmEmpty, CrmPageHead, CrmStatus, formatDate, formatUsd } from '../CrmUi'

function productLabel(product: string) {
  if (product === 'flexible') return 'Flexible · 3.4%'
  if (product === 'locked_6m') return 'Locked 6m · 5.5%'
  return 'Locked 12m · 5.5%'
}

export function CrmTransactions() {
  const transactions = useMemo(
    () => CRM_CLIENTS.flatMap((client) => client.transactions.map((transaction) => ({ client, transaction }))),
    [],
  )

  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Ledger"
        title="Payments"
        subtitle="Client payments, purchases, sales and fees across the CommodityBank book."
        actions={<button type="button" className="crm-primary-btn">New payment</button>}
      />
      <section className="crm-card crm-card--flush">
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Client</th>
                <th>Type</th>
                <th>Commodity</th>
                <th>Status</th>
                <th>Date</th>
                <th className="is-number">Value</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(({ client, transaction }) => (
                <tr key={transaction.id}>
                  <td><strong>{transaction.reference}</strong></td>
                  <td><Link to={`/crm/clients/${client.id}`}>{client.tradingName ?? client.legalName}</Link></td>
                  <td>{transaction.type}</td>
                  <td>{transaction.commodityCode ?? '—'}</td>
                  <td><CrmStatus value={transaction.status} /></td>
                  <td>{formatDate(transaction.date)}</td>
                  <td className="is-number">{formatUsd(transaction.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export function CrmDocuments() {
  const documents = useMemo(
    () => CRM_CLIENTS.flatMap((client) => client.documents.map((document) => ({ client, document }))),
    [],
  )

  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Private storage"
        title="Documents"
        subtitle="Versioned client files with employee attribution, review status and expiry tracking."
        actions={<button type="button" className="crm-primary-btn">Upload document</button>}
      />

      <section className="crm-upload-zone">
        <span aria-hidden>⇧</span>
        <div>
          <strong>Upload PDF, scan, invoice, receipt or contract</strong>
          <p>Files are stored privately and linked to a client, transaction and responsible employee.</p>
        </div>
        <button type="button" className="crm-secondary-btn">Choose files</button>
      </section>

      <section className="crm-card crm-card--flush">
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Client</th>
                <th>Type</th>
                <th>Status</th>
                <th>Version</th>
                <th>Employee</th>
                <th>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(({ client, document }) => (
                <tr key={document.id}>
                  <td><strong>{document.title}</strong></td>
                  <td><Link to={`/crm/clients/${client.id}`}>{client.tradingName ?? client.legalName}</Link></td>
                  <td>{document.type}</td>
                  <td><CrmStatus value={document.status} /></td>
                  <td>v{document.version}</td>
                  <td>{document.uploadedBy}</td>
                  <td>{formatDate(document.uploadedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export function CrmOnboarding() {
  const [searchParams] = useSearchParams()
  const selectedClient = searchParams.get('client') ?? ''
  const [created, setCreated] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCreated(true)
  }

  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Compliance"
        title="KYC & onboarding"
        subtitle="Invite clients, track reviews and collect signed KYB packs through secure links."
      />

      <div className="crm-two-column">
        <form className="crm-card crm-invite-form" onSubmit={submit}>
          <header className="crm-card__head">
            <div>
              <p>New invite</p>
              <h3>Create onboarding link</h3>
            </div>
          </header>
          <label>
            <span>Client *</span>
            <select required defaultValue={selectedClient}>
              <option value="" disabled>Select client</option>
              {CRM_CLIENTS.map((client) => (
                <option key={client.id} value={client.id}>{client.legalName}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Recipient email *</span>
            <input type="email" required placeholder="authorised.signatory@company.com" />
          </label>
          <label>
            <span>Link expires after</span>
            <select defaultValue="7">
              <option value="3">3 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
            </select>
          </label>
          <fieldset>
            <legend>Requested sections</legend>
            {['Company profile', 'Directors & UBOs', 'Bank details', 'KYC documents', 'Policy acceptance', 'Digital signature'].map((item) => (
              <label key={item} className="crm-checkbox crm-checkbox--compact">
                <input type="checkbox" defaultChecked />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
          <button type="submit" className="crm-primary-btn">Create secure link</button>
          {created ? (
            <div className="crm-invite-result" role="status">
              <strong>Link created</strong>
              <code>https://aulm.com/onboarding/i/••••••••</code>
              <button type="button">Copy link</button>
            </div>
          ) : null}
        </form>

        <section className="crm-card">
          <header className="crm-card__head">
            <div>
              <p>Queue</p>
              <h3>Clients in KYC</h3>
            </div>
          </header>
          <ul className="crm-attention-list">
            {CRM_CLIENTS.filter((client) => client.kycStatus !== 'approved').map((client) => (
              <li key={client.id}>
                <span className={`crm-attention-list__dot is-${client.riskRating}`} />
                <div>
                  <Link to={`/crm/clients/${client.id}`}>{client.legalName}</Link>
                  <span>{client.kycStatus.replace(/_/g, ' ')} · {client.assignedTo}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

const GENERATORS = [
  { id: 'spa', title: 'Sales & Purchase Agreement', description: 'Buyer, seller, commodity, quantity, pricing, Incoterm and signatures.' },
  { id: 'invoice', title: 'Commercial invoice', description: 'Line items, taxes, settlement account, due date and payment terms.' },
  { id: 'delivery_note', title: 'Delivery note', description: 'Commodity lots, weights, origin, destination and recipient acceptance.' },
  { id: 'airway_bill', title: 'Air Waybill', description: 'Consignor, consignee, carrier, route, pieces, cargo value and handling.' },
  { id: 'receipt', title: 'Receipt', description: 'Payment confirmation with client, transaction and card or bank reference.' },
  { id: 'acceptance_note', title: 'Acceptance note', description: 'Goods acceptance, discrepancies, certificates and receiving signature.' },
]

export function CrmGenerators() {
  const [searchParams] = useSearchParams()
  const selectedClient = searchParams.get('client')
  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Templates"
        title="Document generators"
        subtitle="Generate consistent PDFs directly from the verified client and transaction profile."
      />
      {selectedClient ? <p className="crm-context-banner">Client preselected from profile.</p> : null}
      <div className="crm-generator-grid">
        {GENERATORS.map((generator) => (
          <article key={generator.id} className="crm-generator-card">
            <span className="crm-generator-card__icon">PDF</span>
            <h3>{generator.title}</h3>
            <p>{generator.description}</p>
            <button type="button" className="crm-secondary-btn">Create document</button>
          </article>
        ))}
      </div>
    </div>
  )
}

export function CrmTasks() {
  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Operations"
        title="Tasks"
        subtitle="Assigned follow-ups, compliance reviews and document deadlines."
        actions={<button type="button" className="crm-primary-btn">New task</button>}
      />
      <section className="crm-card">
        <CrmEmpty title="Task workspace ready" body="Tasks will be linked to clients, assigned employees, priorities and due dates." />
      </section>
    </div>
  )
}

export function CrmTeam() {
  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Access control"
        title="Team & roles"
        subtitle="Manage AULM employees and least-privilege admin access."
        actions={<button type="button" className="crm-primary-btn">Invite employee</button>}
      />
      <section className="crm-card crm-card--flush">
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {CRM_STAFF.map((staff) => (
                <tr key={staff.id}>
                  <td><strong>{staff.name}</strong></td>
                  <td>{staff.department}</td>
                  <td>{staff.role}</td>
                  <td><CrmStatus value="active" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export function CrmAudit() {
  const activity = CRM_CLIENTS.flatMap((client) =>
    client.activity.map((event) => ({ client, event })),
  )
  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Security"
        title="Audit log"
        subtitle="Immutable history of data changes, uploads, approvals, signatures and exports."
      />
      <section className="crm-card crm-card--flush">
        {activity.length ? (
          <div className="crm-table-wrap">
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Employee</th>
                  <th>Action</th>
                  <th>Client</th>
                </tr>
              </thead>
              <tbody>
                {activity.map(({ client, event }) => (
                  <tr key={event.id}>
                    <td>{formatDate(event.timestamp)}</td>
                    <td>{event.actor}</td>
                    <td>{event.action}</td>
                    <td><Link to={`/crm/clients/${client.id}`}>{client.legalName}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <CrmEmpty title="No audit events" body="Events appear after the CRM migration is deployed." />
        )}
      </section>
    </div>
  )
}

export function CrmApprovals() {
  const pending = CRM_APPROVALS.filter((item) => item.status === 'pending')

  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Control"
        title="Approvals"
        subtitle="Dual-control queue for payments, KYC decisions and E-Vault withdrawals."
      />
      <section className="crm-card crm-card--flush">
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Request</th>
                <th>Client</th>
                <th>Type</th>
                <th>Priority</th>
                <th>Requested by</th>
                <th className="is-number">Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((item) => (
                <tr key={item.id}>
                  <td><strong>{item.title}</strong></td>
                  <td>{item.clientName}</td>
                  <td>{item.kind.replace(/_/g, ' ')}</td>
                  <td><CrmStatus value={item.priority} /></td>
                  <td>
                    {item.requestedBy}
                    <div className="crm-muted-line">{formatDate(item.requestedAt)}</div>
                  </td>
                  <td className="is-number">{item.amountUsd != null ? formatUsd(item.amountUsd) : '—'}</td>
                  <td>
                    <div className="crm-row-actions">
                      <button type="button" className="crm-secondary-btn">Reject</button>
                      <button type="button" className="crm-primary-btn">Approve</button>
                    </div>
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

export function CrmEscrows() {
  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Settlement"
        title="Escrow"
        subtitle="Monitor funded deals, clearing certificates, buyer arrival confirmations and releases."
        actions={<button type="button" className="crm-primary-btn">Open escrow</button>}
      />
      <section className="crm-card crm-card--flush">
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Client</th>
                <th>Commodity</th>
                <th>Clearing agent</th>
                <th>Status</th>
                <th>Updated</th>
                <th className="is-number">Amount</th>
              </tr>
            </thead>
            <tbody>
              {CRM_ESCROWS.map((escrow) => (
                <tr key={escrow.id}>
                  <td><strong>{escrow.reference}</strong></td>
                  <td>
                    <Link to={`/crm/clients/${escrow.clientId}`}>{escrow.clientName}</Link>
                  </td>
                  <td>{escrow.commodity}</td>
                  <td>{escrow.clearingAgent}</td>
                  <td><CrmStatus value={escrow.status} /></td>
                  <td>{formatDate(escrow.updatedAt)}</td>
                  <td className="is-number">{formatUsd(escrow.amountUsd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export function CrmEvault() {
  const aum = CRM_EVAULT.reduce((sum, item) => sum + item.principalUsd + item.accruedUsd, 0)

  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Anlagegeschäft"
        title="E-Vault"
        subtitle="Flexible 3.4% and locked 5.5% positions across client books."
      />
      <section className="crm-strip crm-strip--compact" aria-label="E-Vault summary">
        <article>
          <span>Total AUM</span>
          <strong>{formatUsd(aum)}</strong>
          <small>{CRM_EVAULT.length} positions</small>
        </article>
        <article>
          <span>Flexible</span>
          <strong>3.4% APY</strong>
          <small>At-call</small>
        </article>
        <article>
          <span>Locked</span>
          <strong>5.5% APY</strong>
          <small>6 or 12 months</small>
        </article>
      </section>
      <section className="crm-card crm-card--flush">
        <div className="crm-table-wrap">
          <table className="crm-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Product</th>
                <th>Status</th>
                <th>Opened</th>
                <th>Matures</th>
                <th className="is-number">Principal</th>
                <th className="is-number">Accrued</th>
              </tr>
            </thead>
            <tbody>
              {CRM_EVAULT.map((position) => (
                <tr key={position.id}>
                  <td>
                    <Link to={`/crm/clients/${position.clientId}`}>{position.clientName}</Link>
                  </td>
                  <td>{productLabel(position.product)}</td>
                  <td><CrmStatus value={position.status} /></td>
                  <td>{formatDate(position.openedAt)}</td>
                  <td>{position.maturesAt ? formatDate(position.maturesAt) : '—'}</td>
                  <td className="is-number">{formatUsd(position.principalUsd)}</td>
                  <td className="is-number">{formatUsd(position.accruedUsd)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
