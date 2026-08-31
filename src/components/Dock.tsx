import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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

function hoverMenus() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function useNarrowDock() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 900px)').matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)')
    const sync = () => setNarrow(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return narrow
}

export function Dock() {
  const { t } = useT()
  const [open, setOpen] = useState<Menu>(null)
  const dockRef = useRef<HTMLElement>(null)
  const narrow = useNarrowDock()
  const allowHover = !narrow && typeof window !== 'undefined' && hoverMenus()

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
    const close = (e: PointerEvent) => {
      const node = e.target as Node | null
      if (dockRef.current?.contains(node)) return
      if (node instanceof Element && node.closest('.dock-drop')) return
      setOpen(null)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
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
          narrow={narrow}
          onToggle={() => setOpen((m) => (m === 'company' ? null : 'company'))}
          onEnter={() => {
            if (allowHover) setOpen('company')
          }}
          onLeave={() => {
            if (allowHover) setOpen(null)
          }}
          onPick={() => setOpen(null)}
        />

        <DockDrop
          label={t.nav.geography}
          items={geographyItems}
          isOpen={open === 'geography'}
          narrow={narrow}
          onToggle={() => setOpen((m) => (m === 'geography' ? null : 'geography'))}
          onEnter={() => {
            if (allowHover) setOpen('geography')
          }}
          onLeave={() => {
            if (allowHover) setOpen(null)
          }}
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
  narrow,
  onToggle,
  onEnter,
  onLeave,
  onPick,
}: {
  label: string
  items: readonly { label: string; href: string }[]
  isOpen: boolean
  narrow: boolean
  onToggle: () => void
  onEnter: () => void
  onLeave: () => void
  onPick: () => void
}) {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [anchor, setAnchor] = useState<{ left: number; bottom: number; maxHeight: number } | null>(null)

  useLayoutEffect(() => {
    if (!isOpen || !narrow) {
      setAnchor(null)
      return
    }
    const place = () => {
      const btn = btnRef.current
      if (!btn) return
      const r = btn.getBoundingClientRect()
      const width = Math.min(220, window.innerWidth - 24)
      const left = Math.min(Math.max(12, r.left), window.innerWidth - width - 12)
      const space = Math.max(140, r.top - 12)
      setAnchor({
        left,
        bottom: Math.max(8, window.innerHeight - r.top + 8),
        maxHeight: space,
      })
    }
    place()
    window.addEventListener('resize', place)
    window.addEventListener('scroll', place, true)
    window.visualViewport?.addEventListener('resize', place)
    window.visualViewport?.addEventListener('scroll', place)
    return () => {
      window.removeEventListener('resize', place)
      window.removeEventListener('scroll', place, true)
      window.visualViewport?.removeEventListener('resize', place)
      window.visualViewport?.removeEventListener('scroll', place)
    }
  }, [isOpen, narrow])

  const menu = (
    <div
      className={`dock-drop${isOpen ? ' is-open' : ''}${narrow ? ' dock-drop--portal' : ''}`}
      role="menu"
      style={
        narrow && isOpen && anchor
          ? {
              position: 'fixed',
              left: anchor.left,
              bottom: anchor.bottom,
              top: 'auto',
              transform: 'none',
              zIndex: 500,
              maxHeight: anchor.maxHeight,
            }
          : undefined
      }
    >
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
  )

  return (
    <div
      className={`dock-group${isOpen ? ' is-open' : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <button
        ref={btnRef}
        type="button"
        className="dock-item"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation()
          onToggle()
        }}
      >
        {label}
        <ChevronIcon open={isOpen} />
      </button>
      {narrow
        ? isOpen && anchor && typeof document !== 'undefined'
          ? createPortal(menu, document.body)
          : null
        : menu}
    </div>
  )
}
