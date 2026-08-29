import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CRM_CLIENTS } from '../../../crm/mockData'
import type { CrmClient } from '../../../crm/types'
import { CrmEmpty, CrmStatus, formatDate, formatUsd } from '../CrmUi'

const TABS = [
  ['overview', 'Overview'],
  ['kyc', 'KYC / KYB'],
  ['holdings', 'Holdings'],
  ['transactions', 'Transactions'],
  ['documents', 'Documents'],
  ['contacts', 'Contacts & UBOs'],
  ['activity', 'Activity'],
] as const

type Tab = (typeof TABS)[number][0]

function DetailField({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="crm-detail-field">
      <dt>{label}</dt>
      <dd>{value || '—'}</dd>
    </div>
  )
}

function Overview({ client }: { client: CrmClient }) {
  const totalHoldings = client.holdings.reduce((sum, holding) => sum + holding.valuationUsd, 0)
  const totalTransactions = client.transactions.reduce((sum, transaction) => sum + transaction.value, 0)

  return (
    <div className="crm-client-grid">
      <section className="crm-card">
        <header className="crm-card__head"><div><p>Company</p><h3>Corporate profile</h3></div></header>
        <dl className="crm-detail-list">
          <DetailField label="Legal name" value={client.legalName} />
          <DetailField label="Trading name" value={client.tradingName} />
          <DetailField label="Registration" value={client.registrationNumber} />
          <DetailField label="Country" value={client.country} />
          <DetailField label="Client type" value={client.kind} />
          <DetailField label="Base currency" value={client.currency} />
          <DetailField label="Email" value={client.email} />
          <DetailField label="Phone" value={client.phone} />
        </dl>
      </section>

      <section className="crm-card">
        <header className="crm-card__head"><div><p>Commercial</p><h3>Relationship summary</h3></div></header>
        <dl className="crm-detail-list">
          <DetailField label="Relationship owner" value={client.assignedTo} />
          <DetailField label="Expected annual volume" value={formatUsd(client.expectedAnnualVolume)} />
          <DetailField label="Annual revenue" value={formatUsd(client.annualRevenue)} />
          <DetailField label="Recorded transactions" value={formatUsd(totalTransactions)} />
          <DetailField label="Commodity holdings" value={formatUsd(totalHoldings)} />
          <DetailField label="Source of funds" value={client.sourceOfFunds} />
        </dl>
      </section>

      <section className="crm-card crm-card--wide">
        <header className="crm-card__head"><div><p>Internal</p><h3>Notes & tags</h3></div></header>
        <p className="crm-client-note">{client.notes || 'No internal notes.'}</p>
        <div className="crm-tags">
          {client.tags.map((tag) => <span key={tag}>{tag}</span>)}
          <button type="button">＋ Add tag</button>
        </div>
      </section>
    </div>
  )
}

function Kyc({ client }: { client: CrmClient }) {
  return (
    <div className="crm-client-grid">
      <section className="crm-card">
        <header className="crm-card__head"><div><p>Verification</p><h3>KYC / KYB status</h3></div></header>
        <div className="crm-kyc-summary">
          <CrmStatus value={client.kycStatus} />
          <CrmStatus value={`${client.riskRating} risk`} />
        </div>
        <ul className="crm-check-list">
          <li className="is-complete"><span>✓</span> Company identity</li>
          <li className="is-complete"><span>✓</span> Directors & authorised signatories</li>
          <li className={client.kycStatus === 'approved' ? 'is-complete' : ''}><span>✓</span> UBO verification</li>
          <li className={client.kycStatus === 'approved' ? 'is-complete' : ''}><span>✓</span> Source of funds / wealth</li>
          <li className={client.kycStatus === 'approved' ? 'is-complete' : ''}><span>✓</span> Sanctions & PEP screening</li>
          <li className={client.kycStatus === 'approved' ? 'is-complete' : ''}><span>✓</span> Compliance approval</li>
        </ul>
      </section>
      <section className="crm-card">
        <header className="crm-card__head"><div><p>Onboarding</p><h3>Client portal</h3></div></header>
        <p className="crm-card-copy">
          Send a secure expiring link so the client can complete company data, upload evidence and digitally sign.
        </p>
        <div className="crm-stack-actions">
          <Link to={`/crm/onboarding?client=${client.id}`} className="crm-primary-btn">Create onboarding link</Link>
          <button type="button" className="crm-secondary-btn">Open KYC payload</button>
          <button type="button" className="crm-secondary-btn">Run screening</button>
        </div>
      </section>
    </div>
  )
}

function Holdings({ client }: { client: CrmClient }) {
  if (!client.holdings.length) {
    return <CrmEmpty title="No commodity holdings" body="Add declared or verified gold, silver, copper, gas or oil positions." />
  }
  return (
    <div className="crm-holdings-grid">
      {client.holdings.map((holding) => (
        <article key={holding.id} className="crm-holding-card">
          <header>
            <span>{holding.commodityCode}</span>
            <CrmStatus value={holding.positionType} />
          </header>
          <h3>{holding.commodityName}</h3>
          <strong>{holding.quantity.toLocaleString()} {holding.unit}</strong>
          <dl>
            <DetailField label="Valuation" value={formatUsd(holding.valuationUsd)} />
            <DetailField label="Location" value={holding.location} />
            <DetailField label="Purity" value={holding.purity ? `${(holding.purity * 100).toFixed(2)}%` : '—'} />
            <DetailField label="As of" value={formatDate(holding.asOf)} />
          </dl>
        </article>
      ))}
      <button type="button" className="crm-add-card">＋ Add holding</button>
    </div>
  )
}

function Transactions({ client }: { client: CrmClient }) {
  if (!client.transactions.length) {
    return <CrmEmpty title="No transactions" body="Create the first purchase, sale, delivery or payment record." />
  }
  return (
    <section className="crm-card crm-card--flush">
      <div className="crm-table-wrap">
        <table className="crm-table">
          <thead><tr><th>Reference</th><th>Type</th><th>Commodity</th><th>Quantity</th><th>Status</th><th>Date</th><th className="is-number">Value</th></tr></thead>
          <tbody>
            {client.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td><strong>{transaction.reference}</strong></td>
                <td>{transaction.type}</td>
                <td>{transaction.commodityCode ?? '—'}</td>
                <td>{transaction.quantity ? `${transaction.quantity} ${transaction.unit}` : '—'}</td>
                <td><CrmStatus value={transaction.status} /></td>
                <td>{formatDate(transaction.date)}</td>
                <td className="is-number">{formatUsd(transaction.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Documents({ client }: { client: CrmClient }) {
  if (!client.documents.length) {
    return <CrmEmpty title="No documents" body="Upload KYC, SPA, invoice, receipt, AWB or delivery documents." />
  }
  return (
    <section className="crm-card crm-card--flush">
      <div className="crm-table-wrap">
        <table className="crm-table">
          <thead><tr><th>Document</th><th>Type</th><th>Status</th><th>Version</th><th>Uploaded by</th><th>Date</th></tr></thead>
          <tbody>
            {client.documents.map((document) => (
              <tr key={document.id}>
                <td><strong>{document.title}</strong></td>
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
  )
}

function Contacts({ client }: { client: CrmClient }) {
  if (!client.contacts.length) {
    return <CrmEmpty title="No contacts or UBOs" body="Add directors, authorised signatories, operations contacts and beneficial owners." />
  }
  return (
    <div className="crm-contact-grid">
      {client.contacts.map((contact) => (
        <article key={contact.id} className="crm-card crm-contact-card">
          <span className="crm-contact-card__avatar">{contact.fullName.charAt(0)}</span>
          <div>
            <h3>{contact.fullName}</h3>
            <p>{contact.title}</p>
            <span>{contact.role}</span>
          </div>
          <dl>
            <DetailField label="Email" value={contact.email} />
            <DetailField label="Phone" value={contact.phone} />
            <DetailField label="Nationality" value={contact.nationality} />
            <DetailField label="Ownership" value={contact.ownershipPercent ? `${contact.ownershipPercent}%` : '—'} />
          </dl>
        </article>
      ))}
    </div>
  )
}

function Activity({ client }: { client: CrmClient }) {
  if (!client.activity.length) return <CrmEmpty title="No activity yet" body="All uploads, edits, approvals and generated documents will appear here." />
  return (
    <section className="crm-card">
      <ul className="crm-activity">
        {client.activity.map((activity) => (
          <li key={activity.id}>
            <span className="crm-activity__dot" />
            <div><strong>{activity.actor}</strong> {activity.action}<time>{formatDate(activity.timestamp)}</time></div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function CrmClientDetail() {
  const { id } = useParams<{ id: string }>()
  const [tab, setTab] = useState<Tab>('overview')
  const client = CRM_CLIENTS.find((item) => item.id === id)

  if (!client) {
    return (
      <div className="crm-page">
        <CrmEmpty title="Client not found" body="The record may have been removed or you may not have access." />
      </div>
    )
  }

  return (
    <div className="crm-page">
      <Link to="/crm/clients" className="crm-back-link">← All clients</Link>
      <header className="crm-client-head">
        <span className="crm-client-head__avatar">{client.legalName.charAt(0)}</span>
        <div className="crm-client-head__main">
          <div>
            <span>{client.reference}</span>
            <h2>{client.legalName}</h2>
            <p>{client.kind} · {client.country} · Managed by {client.assignedTo}</p>
          </div>
          <div className="crm-client-head__statuses">
            <CrmStatus value={client.status} />
            <CrmStatus value={client.kycStatus} />
            <CrmStatus value={`${client.riskRating} risk`} />
          </div>
        </div>
        <div className="crm-client-head__actions">
          <button type="button" className="crm-secondary-btn">Upload</button>
          <Link to={`/crm/generators?client=${client.id}`} className="crm-secondary-btn">Generate</Link>
          <button type="button" className="crm-primary-btn">Edit profile</button>
        </div>
      </header>

      <nav className="crm-profile-tabs" aria-label="Client profile sections">
        {TABS.map(([id, label]) => (
          <button key={id} type="button" className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </nav>

      <div className="crm-profile-content">
        {tab === 'overview' ? <Overview client={client} /> : null}
        {tab === 'kyc' ? <Kyc client={client} /> : null}
        {tab === 'holdings' ? <Holdings client={client} /> : null}
        {tab === 'transactions' ? <Transactions client={client} /> : null}
        {tab === 'documents' ? <Documents client={client} /> : null}
        {tab === 'contacts' ? <Contacts client={client} /> : null}
        {tab === 'activity' ? <Activity client={client} /> : null}
      </div>
    </div>
  )
}
