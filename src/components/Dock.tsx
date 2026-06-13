import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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

function HomeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

type SimpleMenu = {
  id: string
  label: string
  items: { label: string; href: string }[]
}

const METAL_ACTIONS = ['Buy', 'Sell', 'Liquidate'] as const

const METALS = [
  { id: 'gold', label: 'Gold' },
  { id: 'silver', label: 'Silver' },
  { id: 'copper', label: 'Copper' },
] as const

const COMPANY_MENU: SimpleMenu = {
  id: 'company',
  label: 'Company',
  items: [
    { label: 'About', href: '/company' },
    { label: 'Procedure', href: '/company/procedure' },
  ],
}

const SIMPLE_MENUS: SimpleMenu[] = [
  {
    id: 'logistics',
    label: 'Logistics',
    items: [
      { label: 'Import', href: '/logistics/import' },
      { label: 'Export', href: '/logistics/export' },
    ],
  },
  {
    id: 'banking',
    label: 'Banking',
    items: [
      { label: 'KYC onboarding', href: '/onboarding' },
      { label: 'Banking', href: '#banking' },
      { label: 'Escrow', href: '/escrow' },
    ],
  },
  {
    id: 'refinery',
    label: 'Refinery',
    items: [{ label: 'Refinery process', href: '/refinery' }],
  },
]

function metalHref(metal: string, action: string) {
  const a = action.toLowerCase()
  if (a === 'buy') return metal === 'gold' ? '/buy' : `/${metal}`
  return `/${metal}?action=${a}`
}

export function Dock() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [openMetal, setOpenMetal] = useState<string | null>(null)
  const dockRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setOpenId(null)
        setOpenMetal(null)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const metalsOpen = openId === 'metals'

  return (
    <nav className="dock" aria-label="Main" ref={dockRef}>
      <div className="dock-bar">
        <Link to="/" className="dock-home" aria-label="Home">
          <HomeIcon />
        </Link>

        <div
          className={`dock-group${openId === COMPANY_MENU.id ? ' is-open' : ''}`}
          onMouseEnter={() => setOpenId(COMPANY_MENU.id)}
          onMouseLeave={() => setOpenId(null)}
        >
          <button
            type="button"
            className="dock-item"
            aria-expanded={openId === COMPANY_MENU.id}
            aria-haspopup="menu"
            onClick={(e) => {
              e.stopPropagation()
              setOpenId(openId === COMPANY_MENU.id ? null : COMPANY_MENU.id)
            }}
          >
            {COMPANY_MENU.label}
            <ChevronIcon open={openId === COMPANY_MENU.id} />
          </button>

          <div className="dock-drop" role="menu">
            {COMPANY_MENU.items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                role="menuitem"
                className="dock-drop-item"
                onClick={() => setOpenId(null)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/vault" className="dock-item dock-item--link">
          Vault+
        </Link>

        <div
          className={`dock-group${metalsOpen ? ' is-open' : ''}`}
          onMouseEnter={() => setOpenId('metals')}
          onMouseLeave={() => {
            setOpenId(null)
            setOpenMetal(null)
          }}
        >
          <button
            type="button"
            className="dock-item"
            aria-expanded={metalsOpen}
            aria-haspopup="menu"
            onClick={(e) => {
              e.stopPropagation()
              setOpenId(metalsOpen ? null : 'metals')
            }}
          >
            Metals
            <ChevronIcon open={metalsOpen} />
          </button>

          <div className="dock-drop dock-drop--metals" role="menu">
            {METALS.map((metal) => {
              const subOpen = openMetal === metal.id
              return (
                <div
                  key={metal.id}
                  className={`dock-metal-row${subOpen ? ' is-open' : ''}`}
                  onMouseEnter={() => setOpenMetal(metal.id)}
                >
                  <span className="dock-drop-item dock-drop-item--metal">
                    {metal.label}
                    <ChevronIcon open={subOpen} />
                  </span>
                  <div className="dock-subdrop" role="menu">
                    {METAL_ACTIONS.map((action) => (
                      <Link
                        key={action}
                        to={metalHref(metal.id, action)}
                        role="menuitem"
                        className="dock-drop-item"
                        onClick={() => {
                          setOpenId(null)
                          setOpenMetal(null)
                        }}
                      >
                        {action}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {SIMPLE_MENUS.map((menu) => {
          const open = openId === menu.id
          return (
            <div
              key={menu.id}
              className={`dock-group${open ? ' is-open' : ''}`}
              onMouseEnter={() => setOpenId(menu.id)}
              onMouseLeave={() => setOpenId(null)}
            >
              <button
                type="button"
                className="dock-item"
                aria-expanded={open}
                aria-haspopup="menu"
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenId(open ? null : menu.id)
                }}
              >
                {menu.label}
                <ChevronIcon open={open} />
              </button>

              <div className="dock-drop" role="menu">
                {menu.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    role="menuitem"
                    className="dock-drop-item"
                    onClick={() => setOpenId(null)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
