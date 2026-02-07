import { useState, useRef, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function HeaderBadge() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
    { code: 'zh', label: '中文' },
    { code: 'ja', label: '日本語' }
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
          <circle cx="12" cy="12" r="10"/>
          <path d="M2 12h20"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span>{language.toUpperCase()}</span>
      </button>

      <span className="badge-divider" />

      <a href="tel:+41442345678" className="badge-phone">
        +41 44 234 56 78
      </a>

      {isOpen && (
        <div className="language-dropdown-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
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
  const { t, language, setLanguage } = useLanguage()

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  // Hide header when footer is visible
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

  const languages = ['EN', 'DE', 'FR', 'AR', 'ZH', 'JA']

  return (
    <header className={`header ${isHidden ? 'header--hidden' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            AULM
          </Link>

          <div className="header-right">
            <ul className="nav-list nav-desktop">
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  {t('nav.about')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  {t('nav.services')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/tokenization" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  {t('nav.tokenization')}
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  {t('nav.contact')}
                </NavLink>
              </li>
            </ul>

            <HeaderBadge />
          </div>

          <button
            className={`mobile-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <NavLink to="/about" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
            {t('nav.about')}
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
            {t('nav.services')}
          </NavLink>
          <NavLink to="/tokenization" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
            {t('nav.tokenization')}
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
            {t('nav.contact')}
          </NavLink>
        </nav>

        <div className="mobile-language-selector">
          {languages.map((lang) => (
            <button
              key={lang}
              className={language === lang.toLowerCase() ? 'active' : ''}
              onClick={() => setLanguage(lang.toLowerCase())}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="mobile-menu-footer">
          <a href="tel:+41442345678" className="mobile-phone">+41 44 234 56 78</a>
          <a href="mailto:trading@aulmtrading.com" className="mobile-email">trading@aulmtrading.com</a>
        </div>
      </div>
    </header>
  )
}

export default Header
