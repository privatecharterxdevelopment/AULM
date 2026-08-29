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

const COMPANY_ITEMS = [
  { label: 'About', href: '/company' },
  { label: 'Procedure', href: '/company/procedure' },
  { label: 'Sourcing', href: '/responsible-sourcing' },
  { label: 'News', href: '/news' },
  { label: 'Documents', href: '/pdf' },
  { label: 'Investors', href: '/investors' },
] as const

const GEOGRAPHY_ITEMS = [
  { label: 'Africa', href: '/africa#africa' },
  { label: 'Europe', href: '/africa#europe' },
  { label: 'South America', href: '/africa#south-america' },
] as const

const DOCK_LINKS = [
  { label: 'Metals', href: '/gold' },
  { label: 'Refinery', href: '/refinery' },
  { label: 'Contact us', href: '/contact' },
] as const

type Menu = 'company' | 'geography' | null

export function Dock() {
  const [open, setOpen] = useState<Menu>(null)
  const dockRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setOpen(null)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <nav className="dock" aria-label="Main" ref={dockRef}>
      <div className="dock-bar">
        <Link to="/" className="dock-home" aria-label="Home">
          <HomeIcon />
        </Link>

        <DockDrop
          label="Company"
          items={COMPANY_ITEMS}
          isOpen={open === 'company'}
          onToggle={() => setOpen((m) => (m === 'company' ? null : 'company'))}
          onEnter={() => setOpen('company')}
          onLeave={() => setOpen(null)}
          onPick={() => setOpen(null)}
        />

        <DockDrop
          label="Geography"
          items={GEOGRAPHY_ITEMS}
          isOpen={open === 'geography'}
          onToggle={() => setOpen((m) => (m === 'geography' ? null : 'geography'))}
          onEnter={() => setOpen('geography')}
          onLeave={() => setOpen(null)}
          onPick={() => setOpen(null)}
        />

        {DOCK_LINKS.map((item) => (
          <Link key={item.href} to={item.href} className="dock-item dock-item--link">
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

function DockDrop({
  label,
  items,
  isOpen,
  onToggle,
  onEnter,
  onLeave,
  onPick,
}: {
  label: string
  items: readonly { label: string; href: string }[]
  isOpen: boolean
  onToggle: () => void
  onEnter: () => void
  onLeave: () => void
  onPick: () => void
}) {
  return (
    <div
      className={`dock-group${isOpen ? ' is-open' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        type="button"
        className="dock-item"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
      >
        {label}
        <ChevronIcon open={isOpen} />
      </button>
      <div className="dock-drop" role="menu">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            role="menuitem"
            className="dock-drop-item"
            onClick={onPick}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
