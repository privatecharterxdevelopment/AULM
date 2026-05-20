import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import HeaderContactIcons from './HeaderContactIcons'
import { CONTACT_EMAIL, OFFICE_ADDRESS_LINES } from '../config/site'
import WhatsAppBusinessButton from './WhatsAppBusinessButton'

function HeaderBadge() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
    { code: 'zh', label: '中文' },
    { code: 'ja', label: '日本語' },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="header-badge-combined" ref={dropdownRef}>
      <button
        className="badge-lang"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        type="button"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{language.toUpperCase()}</span>
      </button>

      <HeaderContactIcons />

      <span className="badge-divider" />

      <Link to="/open-account" className="badge-phone">
        {t('header.openAccount')}
      </Link>

      {isOpen && (
        <div className="language-dropdown-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => {
                setLanguage(lang.code)
                setIsOpen(false)
              }}
            >
              <span className="lang-code">{lang.code.toUpperCase()}</span>
              <span className="lang-label">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const { t } = useLanguage()

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHidden(entry.isIntersecting)
        })
      },
      { threshold: 0.3 }
    )

    const footerSection = document.querySelector('.footer-section')
    if (footerSection) {
      observer.observe(footerSection)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header className={`header ${isHidden ? 'header--hidden' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            AULM
          </Link>

          <div className="header-actions">
            <HeaderBadge />

            <button
              type="button"
              className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <NavLink
            to="/about"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {t('nav.about')}
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {t('nav.services')}
          </NavLink>
          <NavLink
            to="/refinery-dubai"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {t('nav.refinery')}
          </NavLink>
          <NavLink
            to="/tokenization"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {t('nav.tokenization')}
          </NavLink>
          <NavLink
            to="/sustainability"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {t('nav.sustainability')}
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {t('nav.news')}
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            {t('nav.contact')}
          </NavLink>
        </nav>

        <div className="mobile-menu-footer">
          <address className="mobile-menu-address">
            {OFFICE_ADDRESS_LINES.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </address>
          <a href={`mailto:${CONTACT_EMAIL}`} className="mobile-email">
            {CONTACT_EMAIL}
          </a>
          <div className="mobile-whatsapp-wrap">
            <WhatsAppBusinessButton block />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
