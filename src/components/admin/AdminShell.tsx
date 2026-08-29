import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, Navigate } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { AULM_LOGO_PNG } from '../../cbos/brand'
import '../../cbos/cbos-desk.css'
import './admin-desk.css'

type Props = {
  children: ReactNode
  counts: {
    applications: number
    orders: number
    support: number
    logistics: number
    customers: number
  }
}

const NAV = [
  { to: '/admin', end: true, label: 'Dashboard', icon: 'D', countKey: null },
  { to: '/admin/applications', label: 'Applications', icon: 'K', countKey: 'applications' as const },
  { to: '/admin/customers', label: 'Customers', icon: 'C', countKey: 'customers' as const },
  { to: '/admin/orders', label: 'Orders', icon: 'O', countKey: 'orders' as const },
  { to: '/admin/support', label: 'Support', icon: 'S', countKey: 'support' as const },
  { to: '/admin/logistics', label: 'Logistics', icon: 'L', countKey: 'logistics' as const },
] as const

export function AdminShell({ children, counts }: Props) {
  const { loading, isLoggedIn, isAdmin, isDemoMode, profile, logout } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [entered, setEntered] = useState(false)
  const name = profile?.full_name ?? 'Admin'

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  if (loading) {
    return (
      <div className="cbos-bank-app">
        <div className="cbos-bank-shell">
          <main className="cbos-bank-app__main">
            <div className="cbos-bank cbos-bank--loading" aria-busy="true" />
          </main>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (!isAdmin && !isDemoMode) return <Navigate to="/bank" replace />

  return (
    <div className={`cbos-bank-app admin-desk${entered ? ' is-entered' : ''}`}>
      <div className="cbos-bank-shell">
        {mobileOpen ? (
          <button
            type="button"
            className="cbos-rail-backdrop"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
        ) : null}

        <aside className={`cbos-rail${mobileOpen ? ' is-mobile-open' : ''}`} aria-label="Admin navigation">
          <div className="cbos-rail__head">
            <NavLink to="/admin" className="cbos-rail__mark" onClick={() => setMobileOpen(false)} aria-label="Admin home">
              <img src={AULM_LOGO_PNG} alt="" width={28} height={28} draggable={false} />
            </NavLink>
            <span className="admin-desk__badge">Admin</span>
          </div>

          <nav className="cbos-rail__nav" aria-label="Primary">
            <div className="cbos-rail__nav-main">
              {NAV.map((item) => {
                const count = item.countKey ? counts[item.countKey] : 0
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={'end' in item ? item.end : undefined}
                    title={item.label}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) => `cbos-rail__item${isActive ? ' is-active' : ''}`}
                  >
                    <span className="cbos-rail__abbr" aria-hidden>{item.icon}</span>
                    <span className="cbos-rail__label">{item.label}</span>
                    {count > 0 ? <span className="cbos-rail__count">{count}</span> : null}
                  </NavLink>
                )
              })}
            </div>

            <div className="cbos-rail__nav-end">
              <NavLink
                to="/bank"
                title="Client bank"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `cbos-rail__item${isActive ? ' is-active' : ''}`}
              >
                <span className="cbos-rail__abbr" aria-hidden>B</span>
                <span className="cbos-rail__label">Client bank</span>
              </NavLink>
              <NavLink
                to="/crm"
                title="CRM"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) => `cbos-rail__item${isActive ? ' is-active' : ''}`}
              >
                <span className="cbos-rail__abbr" aria-hidden>R</span>
                <span className="cbos-rail__label">CRM</span>
              </NavLink>
              <button
                type="button"
                className="cbos-rail__item cbos-rail__item--logout"
                title="Log out"
                onClick={() => void logout()}
              >
                <span className="cbos-rail__abbr" aria-hidden>L</span>
                <span className="cbos-rail__label">Log out</span>
              </button>
            </div>
          </nav>

          <div className="cbos-rail__foot">
            <div className="cbos-rail__foot-row">
              <div className="cbos-rail__profile">
                <span className="cbos-rail__avatar" aria-hidden>{name.charAt(0).toUpperCase()}</span>
                <div className="cbos-rail__identity">
                  <span className="cbos-rail__identity-name">{name}</span>
                  <span className="cbos-rail__identity-org">Operations · Superadmin</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <div className="cbos-bank-shell__body">
          <header className="admin-desk__top">
            <button
              type="button"
              className="admin-desk__menu"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
            <div>
              <p>AULM Operations</p>
              <h1>Admin panel</h1>
            </div>
            <Link to="/bank" className="admin-desk__ghost">Open client bank</Link>
          </header>
          <main className="cbos-bank-app__main admin-desk__main">{children}</main>
        </div>
      </div>
    </div>
  )
}
