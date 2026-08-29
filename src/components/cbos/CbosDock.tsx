import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AULM_LOGO_PNG } from '../../cbos/brand'
import {
  IconCard,
  IconCheck,
  IconHome,
  IconSavings,
  IconSettings,
  IconTransfer,
  IconWallet,
} from './icons'

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`dock-chevron${open ? ' is-open' : ''}`}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
    >
      <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const PRIMARY = [
  { to: '/bank', end: true, label: 'Home', Icon: IconHome },
  { to: '/bank/orders', label: 'Orders', Icon: IconCheck },
  { to: '/bank/cards', label: 'Cards', Icon: IconCard },
  { to: '/bank/transfers', label: 'Transfers', Icon: IconTransfer },
  { to: '/bank/vault', label: 'E-Vault', Icon: IconSavings },
  { to: '/bank/wallets', label: 'Cash', Icon: IconWallet },
] as const

const MORE_ITEMS = [
  { to: '/bank/trading', label: 'Trading desk' },
  { to: '/bank/vault', label: 'E-Vault' },
  { to: '/bank/crypto', label: 'Digital assets' },
  { to: '/bank/logistics', label: 'Logistics' },
  { to: '/bank/documents', label: 'Documents' },
  { to: '/bank/approvals', label: 'Approvals' },
  { to: '/bank/kyc', label: 'KYC' },
  { to: '/bank/support', label: 'Support' },
  { to: '/gold', label: 'Markets' },
] as const

export function CbosDock() {
  const [moreOpen, setMoreOpen] = useState(false)
  const dockRef = useRef<HTMLElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const moreActive = MORE_ITEMS.some((i) => pathname === i.to || pathname.startsWith(`${i.to}/`))

  return (
    <nav className="dock cbos-dock" aria-label="Banking" ref={dockRef}>
      <div className="dock-bar cbos-dock-bar">
        <NavLink to="/bank" end className="dock-home cbos-dock-logo" aria-label="AULM Banking home">
          <img src={AULM_LOGO_PNG} alt="" width={20} height={20} draggable={false} />
        </NavLink>

        {PRIMARY.map((item) => {
          const { to, label, Icon } = item
          const end = 'end' in item ? item.end : undefined
          return (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `cbos-dock-icon${isActive ? ' is-active' : ''}`}
            aria-label={label}
            title={label}
          >
            <Icon aria-hidden />
          </NavLink>
          )
        })}

        <div
          className={`dock-group cbos-dock-more${moreOpen ? ' is-open' : ''}${moreActive ? ' has-active' : ''}`}
          onMouseEnter={() => setMoreOpen(true)}
          onMouseLeave={() => setMoreOpen(false)}
        >
          <button
            type="button"
            className="dock-item cbos-dock-more-btn"
            aria-expanded={moreOpen}
            aria-haspopup="menu"
            onClick={(e) => {
              e.stopPropagation()
              setMoreOpen((o) => !o)
            }}
          >
            More
            <ChevronIcon open={moreOpen} />
          </button>
          <div className="dock-drop cbos-dock-drop" role="menu">
            {MORE_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                role="menuitem"
                className="dock-drop-item"
                onClick={() => setMoreOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <NavLink
          to="/bank/settings"
          className={({ isActive }) => `cbos-dock-icon${isActive ? ' is-active' : ''}`}
          aria-label="Settings"
          title="Settings"
        >
          <IconSettings aria-hidden />
        </NavLink>
      </div>
    </nav>
  )
}
