import { Link, useLocation } from 'react-router-dom'

type Props = {
  onMenuClick: () => void
}

const TITLES: Record<string, string> = {
  '/crm': 'Dashboard',
  '/crm/clients': 'Clients',
  '/crm/invoices': 'Invoices',
  '/crm/transactions': 'Payments',
  '/crm/documents': 'Documents',
  '/crm/onboarding': 'KYC & onboarding',
  '/crm/generators': 'Document generators',
  '/crm/tasks': 'Tasks',
  '/crm/team': 'Team & roles',
  '/crm/audit': 'Audit log',
  '/crm/evault': 'E-Vault',
  '/crm/approvals': 'Approvals',
}

export function CrmTopbar({ onMenuClick }: Props) {
  const { pathname } = useLocation()
  const title = pathname.startsWith('/crm/clients/')
    ? 'Client profile'
    : TITLES[pathname] ?? 'AULM Admin'

  return (
    <header className="crm-topbar">
      <div className="crm-topbar__title">
        <button type="button" className="crm-topbar__menu" onClick={onMenuClick} aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
        <div>
          <span>AULM Admin CRM</span>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="crm-topbar__actions">
        <label className="crm-search">
          <span aria-hidden>⌕</span>
          <input type="search" placeholder="Search clients, escrows, payments…" />
          <kbd>⌘ K</kbd>
        </label>
        <Link to="/crm/invoices" className="crm-secondary-btn">Invoices</Link>
        <Link to="/crm/clients/new" className="crm-primary-btn">
          <span aria-hidden>＋</span>
          New client
        </Link>
      </div>
    </header>
  )
}
