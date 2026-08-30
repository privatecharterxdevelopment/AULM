import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LanguageDropdown } from './LanguageDropdown'
import { useT } from '../i18n'
import {
  isManagedDarkHeroRoute,
  setHeaderOnDark,
  useHeaderOnDark,
  usePrefersNarrowChrome,
} from '../lib/headerOnDark'

function PdfIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 3.5h7l5 5V20a1.5 1.5 0 0 1-1.5 1.5h-10.5A1.5 1.5 0 0 1 5.5 20V5A1.5 1.5 0 0 1 7 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M14 3.5V9h5.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8.5 13.5h7M8.5 17h4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function Header() {
  const { pathname } = useLocation()
  const { t } = useT()
  const [scrolled, setScrolled] = useState(false)
  const slideDark = useHeaderOnDark()
  const narrow = usePrefersNarrowChrome()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    if (isManagedDarkHeroRoute(pathname)) return
    setHeaderOnDark(false)
  }, [pathname])

  const onDark = slideDark && !narrow
  const frost = scrolled && !onDark

  return (
    <header className={`header-wrap${frost ? ' is-scrolled' : ''}${onDark ? ' is-dark' : ''}`}>
      <div className="header-pill">
        <Link to="/" className="header-logo" aria-label={t.header.homeAria}>
          <img
            src={onDark ? '/aulm-logo-white.png' : '/aulm-logo.png'}
            alt="AULM"
            width={76}
            height={76}
          />
        </Link>

        <div className="header-actions">
          <Link to="/pdf" className="header-chip header-pdf" aria-label={t.header.docsAria} title={t.header.docsAria}>
            <PdfIcon />
            <span>{t.header.docs}</span>
          </Link>
          <LanguageDropdown />
          <Link to="/onboarding" className="header-cta">
            {t.header.openAccount}
          </Link>
        </div>
      </div>
    </header>
  )
}
