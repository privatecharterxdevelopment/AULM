import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CRM_CLIENTS } from '../../../crm/mockData'
import type { CrmClientKind } from '../../../crm/types'
import { CrmPageHead, CrmStatus, formatDate, formatUsd } from '../CrmUi'

type Filter = 'all' | CrmClientKind | 'kyc_attention'

export function CrmClients() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const clients = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return CRM_CLIENTS.filter((client) => {
      const matchesFilter =
        filter === 'all'
        || (filter === 'kyc_attention' && client.kycStatus !== 'approved')
        || client.kind === filter
      const matchesSearch =
        !normalized
        || client.legalName.toLowerCase().includes(normalized)
        || client.reference.toLowerCase().includes(normalized)
        || client.country.toLowerCase().includes(normalized)
      return matchesFilter && matchesSearch
    })
  }, [filter, query])

  return (
    <div className="crm-page">
      <CrmPageHead
        eyebrow="Master data"
        title="Clients"
        subtitle="Companies, buyers, suppliers, counterparties and their complete AULM history."
        actions={<Link to="/crm/clients/new" className="crm-primary-btn">New client</Link>}
      />

      <div className="crm-list-toolbar">
        <div className="crm-tabs" role="tablist" aria-label="Client filters">
          {([
            ['all', 'All'],
            ['buyer', 'Buyers'],
            ['supplier', 'Suppliers'],
            ['both', 'Both'],
            ['kyc_attention', 'KYC attention'],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={filter === id ? 'is-active' : ''}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="crm-inline-search">
          <span aria-hidden>⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search clients…"
          />
        </label>
      </div>

      <section className="crm-card crm-card--flush">
        <div className="crm-table-wrap">
          <table className="crm-table crm-table--clients">
            <thead>
              <tr>
                <th>Client</th>
                <th>Type</th>
                <th>KYC</th>
                <th>Risk</th>
                <th>Country</th>
                <th>Owner</th>
                <th className="is-number">Annual volume</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <Link to={`/crm/clients/${client.id}`} className="crm-client-cell">
                      <span className="crm-client-cell__avatar">{client.legalName.charAt(0)}</span>
                      <span>
                        <strong>{client.tradingName ?? client.legalName}</strong>
                        <small>{client.reference} · {client.email}</small>
                      </span>
                    </Link>
                  </td>
                  <td><CrmStatus value={client.kind} /></td>
                  <td><CrmStatus value={client.kycStatus} /></td>
                  <td><CrmStatus value={client.riskRating} /></td>
                  <td>{client.country}</td>
                  <td>{client.assignedTo}</td>
                  <td className="is-number">{formatUsd(client.expectedAnnualVolume)}</td>
                  <td>{formatDate(client.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <footer className="crm-table-footer">
          <span>{clients.length} of {CRM_CLIENTS.length} clients</span>
          <span>Live CRM schema ready · demo records shown until migration is deployed</span>
        </footer>
      </section>
    </div>
  )
}
