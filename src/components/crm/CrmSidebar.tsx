import { NavLink } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { AULM_LOGO_PNG } from '../../cbos/brand'
import { CRM_APPROVALS } from '../../crm/mockData'

type Props = {
  mobileOpen: boolean
  onMobileClose: () => void
}

const MAIN_NAV = [
  { to: '/crm', end: true, label: 'Dashboard', icon: 'D' },
  { to: '/crm/clients', label: 'Clients', icon: 'C' },
  { to: '/crm/invoices', label: 'Invoices', icon: 'I' },
  { to: '/crm/documents', label: 'Documents', icon: 'F' },
  { to: '/crm/generators', label: 'Generators', icon: 'G' },
  { to: '/crm/onboarding', label: 'KYC', icon: 'K' },
  { to: '/crm/approvals', label: 'Approvals', icon: 'A', badgeKey: 'approvals' as const },
  { to: '/crm/evault', label: 'E-Vault', icon: 'V' },
  { to: '/crm/transactions', label: 'Payments', icon: 'P' },
  { to: '/crm/tasks', label: 'Tasks', icon: 'T' },
] as const

const ADMIN_NAV = [
  { to: '/crm/team', label: 'Team', icon: 'M' },
  { to: '/crm/audit', label: 'Audit', icon: 'L' },
] as const

export function CrmSidebar({ mobileOpen, onMobileClose }: Props) {
  const { profile, logout } = useAuth()
  const name = profile?.full_name ?? 'AULM Admin'
  const pendingApprovals = CRM_APPROVALS.filter((item) => item.status === 'pending').length

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `crm-nav__link${isActive ? ' is-active' : ''}`

  return (
    <>
      {mobileOpen ? (
        <button type="button" className="crm-sidebar-backdrop" onClick={onMobileClose} aria-label="Close menu" />
      ) : null}
      <aside className={`crm-sidebar${mobileOpen ? ' is-open' : ''}`}>
        <div className="crm-sidebar__brand">
          <NavLink to="/crm" onClick={onMobileClose} aria-label="AULM Admin CRM home">
            <img src={AULM_LOGO_PNG} alt="" width={30} height={30} />
          </NavLink>
          <span>Admin CRM</span>
        </div>

        <nav className="crm-nav" aria-label="Admin CRM navigation">
          <p className="crm-nav__section">Workspace</p>
          {MAIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : undefined}
              className={navClass}
              onClick={onMobileClose}
            >
              <span className="crm-nav__icon" aria-hidden>{item.icon}</span>
              <span className="crm-nav__label">{item.label}</span>
              {'badgeKey' in item && pendingApprovals > 0 ? (
                <span className="crm-nav__badge">{pendingApprovals}</span>
              ) : null}
            </NavLink>
          ))}

          <p className="crm-nav__section">Administration</p>
          {ADMIN_NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass} onClick={onMobileClose}>
              <span className="crm-nav__icon" aria-hidden>{item.icon}</span>
              <span className="crm-nav__label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="crm-sidebar__foot">
          <NavLink to="/bank" className="crm-sidebar__bank-link" onClick={onMobileClose}>
            ← Client bank
          </NavLink>
          <div className="crm-sidebar__user">
            <span className="crm-sidebar__avatar">{name.charAt(0).toUpperCase()}</span>
            <span>
              <strong>{name}</strong>
              <small>Admin CRM</small>
            </span>
          </div>
          <button type="button" onClick={() => void logout()}>Log out</button>
        </div>
      </aside>
    </>
  )
}
