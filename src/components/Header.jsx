import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            AULM
          </Link>

          <div className="header-right">
            <ul className="nav-list nav-desktop">
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/tokenization" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Tokenization
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Contact
                </NavLink>
              </li>
            </ul>

            <a href="tel:+41442345678" className="header-badge">
              <span>+41 44 234 56 78</span>
              <span className="hours">Mo – Fr. 8am – 5pm</span>
            </a>
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
            About
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
            Services
          </NavLink>
          <NavLink to="/tokenization" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
            Tokenization
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMobileMenu}>
            Contact
          </NavLink>
        </nav>

        <div className="mobile-menu-footer">
          <a href="tel:+41442345678" className="mobile-phone">+41 44 234 56 78</a>
          <span className="mobile-hours">Mo – Fr. 8am – 5pm</span>
          <a href="mailto:trading@aulmtrading.com" className="mobile-email">trading@aulmtrading.com</a>
        </div>
      </div>
    </header>
  )
}

export default Header
