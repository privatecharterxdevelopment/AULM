import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useT } from '../i18n'

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

type Menu = 'company' | 'geography' | null

export function Dock() {
  const { t } = useT()
  const [open, setOpen] = useState<Menu>(null)
  const dockRef = useRef<HTMLElement>(null)

  const companyItems = [
    { label: t.nav.about, href: '/company' },
    { label: t.nav.procedure, href: '/company/procedure' },
    { label: t.nav.sourcing, href: '/responsible-sourcing' },
    { label: t.nav.news, href: '/news' },
    { label: t.nav.documents, href: '/pdf' },
    { label: t.nav.investors, href: '/investors' },
    { label: t.nav.tokenization, href: '/tokenization' },
  ]
  const geographyItems = [
    { label: t.nav.africa, href: '/africa#africa' },
    { label: t.nav.europe, href: '/africa#europe' },
    { label: t.nav.southAmerica, href: '/africa#south-america' },
  ]
  const dockLinks = [
    { label: t.nav.metals, href: '/gold' },
    { label: t.nav.refinery, href: '/refinery' },
    { label: t.nav.contact, href: '/contact' },
  ]

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
    <nav className="dock" aria-label={t.meta.mainNav} ref={dockRef}>
      <div className="dock-bar">
        <Link to="/" className="dock-home" aria-label={t.common.home}>
          <HomeIcon />
        </Link>

        <DockDrop
          label={t.nav.company}
          items={companyItems}
          isOpen={open === 'company'}
          onToggle={() => setOpen((m) => (m === 'company' ? null : 'company'))}
          onEnter={() => setOpen('company')}
          onLeave={() => setOpen(null)}
          onPick={() => setOpen(null)}
        />

        <DockDrop
          label={t.nav.geography}
          items={geographyItems}
          isOpen={open === 'geography'}
          onToggle={() => setOpen((m) => (m === 'geography' ? null : 'geography'))}
          onEnter={() => setOpen('geography')}
          onLeave={() => setOpen(null)}
          onPick={() => setOpen(null)}
        />

        {dockLinks.map((item) => (
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
