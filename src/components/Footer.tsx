import { Link } from 'react-router-dom'
import { COMPANY } from '../data/company'
import { CONTACT_EMAIL } from '../config/site'
import { useT } from '../i18n'

export function Footer() {
  const { t, interpolate } = useT()
  const year = new Date().getFullYear()
  const footerColumns = [
    {
      title: t.nav.company,
      links: [
        { label: t.nav.about, href: '/company' },
        { label: t.nav.contact, href: '/contact' },
        { label: t.nav.procedure, href: '/company/procedure' },
        { label: t.nav.news, href: '/news' },
        { label: t.nav.documents, href: '/pdf' },
        { label: t.nav.investors, href: '/investors' },
        { label: t.nav.responsibleSourcing, href: '/responsible-sourcing' },
        { label: t.nav.supplyChain, href: '/gold-supply-chain-dubai' },
        { label: t.nav.tokenization, href: '/tokenization' },
      ],
    },
    {
      title: t.nav.geography,
      links: [
        { label: t.nav.africa, href: '/africa#africa' },
        { label: t.nav.europe, href: '/africa#europe' },
        { label: t.nav.southAmerica, href: '/africa#south-america' },
      ],
    },
    {
      title: t.nav.trade,
      links: [
        { label: t.nav.gold, href: '/gold' },
        { label: t.nav.silver, href: '/silver' },
        { label: t.nav.copper, href: '/copper' },
        { label: t.nav.refinery, href: '/refinery' },
      ],
    },
  ]

  return (
    <footer className="site-footer" aria-label={t.meta.siteFooter}>
      <div className="site-footer-shell">
        <div className="site-footer-top">
          <div className="site-footer-brand">
            <Link to="/" className="site-footer-logo">
              <img src="/aulm-logo.png" alt="AULM" width={48} height={48} />
            </Link>
            <p className="site-footer-name">{COMPANY.name}</p>
            <p className="site-footer-license">
              {t.company.licenseLine} {COMPANY.licenseNumber}
            </p>
            <p className="site-footer-address">
              {COMPANY.address[0]}
              <br />
              {COMPANY.address[COMPANY.address.length - 1]}
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="site-footer-email">
              {CONTACT_EMAIL}
            </a>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} className="site-footer-col" aria-label={column.title}>
              <h2 className="site-footer-col-title">{column.title}</h2>
              <ul className="site-footer-links">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="site-footer-bottom">
          <p className="site-footer-copy">
            {interpolate(t.footer.copy, { year, name: COMPANY.name })}
          </p>
          <div className="site-footer-bottom-links">
            <Link to="/legal">{t.footer.legal}</Link>
            <Link to="/privacy">{t.footer.privacy}</Link>
            <Link to="/company/procedure#shipping-instructions">{t.footer.shipping}</Link>
            <Link to="/company/procedure#compliance">{t.footer.compliance}</Link>
            <Link to="/">{t.common.home}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
