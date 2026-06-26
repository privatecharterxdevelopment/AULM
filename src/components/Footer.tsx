import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { COMPANY } from '../data/company'
import { FOOTER_COLUMNS } from '../config/footer'
import { CONTACT_EMAIL } from '../config/site'

export function Footer() {
  const { isLoggedIn, isAdmin } = useAuth()

  return (
    <footer className="site-footer" aria-label="Site footer">
      <div className="site-footer-shell">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <Link to="/" className="site-footer-logo">
              <img src="/aulm-logo.png" alt="AULM" width={48} height={48} />
            </Link>
            <p className="site-footer-name">{COMPANY.name}</p>
            <p className="site-footer-license">
              {COMPANY.licenseLine} {COMPANY.licenseNumber}
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="site-footer-email">
              {CONTACT_EMAIL}
            </a>
          </div>

          {FOOTER_COLUMNS.map((column) => {
            let links = column.links.filter((link) => {
              if (link.href === '/login' && isLoggedIn) return false
              if (link.href === '/bank' && !isLoggedIn) return false
              if (link.href === '/onboarding' && isLoggedIn) return false
              return true
            })

            if (column.title === 'Account' && isLoggedIn && isAdmin) {
              links = [...links, { label: 'Admin', href: '/admin' }]
            }

            return (
              <nav key={column.title} className="site-footer-col" aria-label={column.title}>
                <h2 className="site-footer-col-title">{column.title}</h2>
                <ul className="site-footer-links">
                  {links.map((link) => (
                    <li key={link.href + link.label}>
                      {link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href}>{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            )
          })}
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-copy">
            © {new Date().getFullYear()} {COMPANY.name}. B2B institutional desk only.
          </p>
          <div className="site-footer-bottom-links">
            <Link to="/company/procedure#shipping-instructions">Shipping</Link>
            <Link to="/company/procedure#compliance">Compliance</Link>
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
