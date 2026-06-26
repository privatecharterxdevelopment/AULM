import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { AULM_LOGO_PNG } from '../../cbos/brand'
import { DEMO_APPROVALS } from '../../cbos/mocks/demoData'
import { useCbosNotifications } from './hooks/useCbosNotifications'
import { IconBell, IconHeadset } from './icons'

const WORKSPACES = [
  { id: 'trading', label: 'AULM Trading FZCO', meta: 'IFZA · Active' },
  { id: 'bank', label: 'AULM Bank Ltd', meta: 'Soon', disabled: true },
] as const

type Workspace = (typeof WORKSPACES)[number]

type Props = {
  collapsed?: boolean
  onToggleCollapse?: () => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`cbos-rail-chevron${open ? ' is-open' : ''}`}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
    >
      <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function FoldIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      {collapsed ? (
        <path d="M9 6l6 6-6 6M3 6v12" />
      ) : (
        <path d="M15 18l-6-6 6-6M21 6v12" />
      )}
    </svg>
  )
}

export function CbosSidebar({
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onMobileClose,
}: Props) {
  const { profile, logout } = useAuth()
  const [wsOpen, setWsOpen] = useState(false)
  const wsRef = useRef<HTMLDivElement>(null)
  const [workspace, setWorkspace] = useState<Workspace>(WORKSPACES[0])

  const userName = profile?.full_name ?? 'User'
  const { unread } = useCbosNotifications()

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (wsRef.current && !wsRef.current.contains(e.target as Node)) setWsOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const closeMobile = () => onMobileClose?.()

  const linkClass = (isActive: boolean) =>
    `cbos-rail__item${isActive ? ' is-active' : ''}`

  return (
    <>
      {mobileOpen ? (
        <button type="button" className="cbos-rail-backdrop" onClick={closeMobile} aria-label="Close menu" />
      ) : null}

      <aside
        className={`cbos-rail${collapsed ? ' is-collapsed' : ''}${mobileOpen ? ' is-mobile-open' : ''}`}
        aria-label="Banking navigation"
      >
        <div className="cbos-rail__head">
          <NavLink to="/bank" className="cbos-rail__mark" onClick={closeMobile} aria-label="AULM home">
            <img src={AULM_LOGO_PNG} alt="" width={28} height={28} draggable={false} />
          </NavLink>
          {onToggleCollapse ? (
            <button
              type="button"
              className="cbos-rail__fold"
              onClick={onToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              title={collapsed ? 'Expand' : 'Collapse'}
            >
              <FoldIcon collapsed={collapsed} />
            </button>
          ) : null}
        </div>

        <nav className="cbos-rail__nav" aria-label="Primary">
          <div className="cbos-rail__nav-main">
          <NavLink
            to="/bank"
            end
            title="Dashboard"
            onClick={closeMobile}
            className={({ isActive }) => linkClass(isActive)}
          >
            <span className="cbos-rail__abbr" aria-hidden>D</span>
            <span className="cbos-rail__label">Dashboard</span>
          </NavLink>

          <NavLink
            to="/bank/wallets"
            title="Cash"
            onClick={closeMobile}
            className={({ isActive }) => linkClass(isActive)}
          >
            <span className="cbos-rail__abbr" aria-hidden>$</span>
            <span className="cbos-rail__label">Cash</span>
          </NavLink>

          <NavLink to="/bank/cards" title="Cards" onClick={closeMobile} className={({ isActive }) => linkClass(isActive)}>
            <span className="cbos-rail__abbr" aria-hidden>C</span>
            <span className="cbos-rail__label">Cards</span>
          </NavLink>

          <NavLink
            to="/bank/transfers"
            title="Payments"
            onClick={closeMobile}
            className={({ isActive }) => linkClass(isActive)}
          >
            <span className="cbos-rail__abbr" aria-hidden>P</span>
            <span className="cbos-rail__label">Payments</span>
          </NavLink>

          <NavLink
            to="/bank/vault"
            title="E-Vault"
            onClick={closeMobile}
            className={({ isActive }) => linkClass(isActive)}
          >
            <span className="cbos-rail__abbr" aria-hidden>V</span>
            <span className="cbos-rail__label">E-Vault</span>
          </NavLink>

          <NavLink
            to="/bank/support"
            title="Support"
            onClick={closeMobile}
            className={({ isActive }) => linkClass(isActive)}
          >
            <span className="cbos-rail__abbr cbos-rail__abbr--icon" aria-hidden>
              <IconHeadset width={14} height={14} strokeWidth={1.75} />
            </span>
            <span className="cbos-rail__label">Support</span>
          </NavLink>

          <NavLink
            to="/bank/notifications"
            title="Notifications"
            onClick={closeMobile}
            className={({ isActive }) => linkClass(isActive)}
          >
            <span className="cbos-rail__abbr cbos-rail__abbr--icon" aria-hidden>
              <IconBell width={14} height={14} strokeWidth={1.75} />
            </span>
            <span className="cbos-rail__label">Notifications</span>
            {!collapsed && unread > 0 ? <span className="cbos-rail__count">{unread}</span> : null}
          </NavLink>

          <NavLink
            to="/bank/escrows"
            title="Escrow"
            onClick={closeMobile}
            className={({ isActive }) => linkClass(isActive)}
          >
            <span className="cbos-rail__abbr" aria-hidden>E</span>
            <span className="cbos-rail__label">Escrow</span>
          </NavLink>

          <NavLink
            to="/bank/documents"
            title="Statements"
            onClick={closeMobile}
            className={({ isActive }) => linkClass(isActive)}
          >
            <span className="cbos-rail__abbr" aria-hidden>R</span>
            <span className="cbos-rail__label">Statements</span>
          </NavLink>

          {DEMO_APPROVALS.length > 0 ? (
            <NavLink
              to="/bank/approvals"
              title="Approvals"
              onClick={closeMobile}
              className={({ isActive }) => linkClass(isActive)}
            >
              <span className="cbos-rail__abbr" aria-hidden>✓</span>
              <span className="cbos-rail__label">Approvals</span>
              {!collapsed ? <span className="cbos-rail__count">{DEMO_APPROVALS.length}</span> : null}
            </NavLink>
          ) : null}
          </div>

          <div className="cbos-rail__nav-end">
          <NavLink
            to="/bank/settings"
            title="Settings"
            onClick={closeMobile}
            className={({ isActive }) => linkClass(isActive)}
          >
            <span className="cbos-rail__abbr" aria-hidden>G</span>
            <span className="cbos-rail__label">Settings</span>
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

        <div className="cbos-rail__foot" ref={wsRef}>
          <div className="cbos-rail__foot-row">
            <div className="cbos-rail__profile">
              <button
                type="button"
                className="cbos-rail__avatar-btn"
                aria-expanded={wsOpen}
                aria-label={`${userName} — switch workspace`}
                title={userName}
                onClick={() => setWsOpen((v) => !v)}
              >
                <span className="cbos-rail__avatar" aria-hidden>
                  {userName.charAt(0).toUpperCase()}
                </span>
              </button>
              {!collapsed ? (
                <button
                  type="button"
                  className="cbos-rail__identity"
                  aria-expanded={wsOpen}
                  onClick={() => setWsOpen((v) => !v)}
                >
                  <span className="cbos-rail__identity-name">{userName}</span>
                  <span className="cbos-rail__identity-org">
                    {workspace.label}
                    <Chevron open={wsOpen} />
                  </span>
                </button>
              ) : null}
            </div>
          </div>

          {wsOpen ? (
            <ul className="cbos-rail__workspace-menu" role="listbox">
              {WORKSPACES.map((w) => (
                <li key={w.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={workspace.id === w.id}
                    disabled={'disabled' in w && w.disabled}
                    className={workspace.id === w.id ? 'is-active' : ''}
                    onClick={() => {
                      if (!('disabled' in w && w.disabled)) {
                        setWorkspace(w)
                        setWsOpen(false)
                      }
                    }}
                  >
                    <span>{w.label}</span>
                    <span>{w.meta}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

        </div>
      </aside>
    </>
  )
}
