import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const languages = ['EN', 'DE', 'FR', 'AR']

  return (
    <div className="language-selector">
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
  )
}

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">AULM</Link>
            <p>{t('footer.tagline')}</p>
          </div>

          <div className="footer-column">
            <h4>{t('footer.company')}</h4>
            <ul>
              <li><Link to="/about">{t('footer.whoWeAre')}</Link></li>
              <li><Link to="/services">{t('footer.whatWeDo')}</Link></li>
              <li><Link to="/sustainability">{t('footer.sustainability')}</Link></li>
              <li><Link to="/contact">{t('footer.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t('footer.news')}</h4>
            <ul>
              <li><Link to="/news">{t('footer.insights')}</Link></li>
              <li><Link to="/news">{t('footer.analysis')}</Link></li>
              <li><Link to="/news">{t('footer.compliance')}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t('footer.services')}</h4>
            <ul>
              <li><Link to="/services">{t('footer.sourcing')}</Link></li>
              <li><Link to="/services">{t('footer.importExport')}</Link></li>
              <li><Link to="/services">{t('footer.refinery')}</Link></li>
              <li><Link to="/tokenization">{t('footer.tokenization')}</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t('footer.legal')}</h4>
            <ul>
              <li><Link to="/terms">{t('footer.terms')}</Link></li>
              <li><Link to="/privacy">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-languages">
          <span>{t('footer.languages')}</span>
          <LanguageSelector />
        </div>

        <div className="footer-banking">
          <div className="ubs-logo">
            <svg viewBox="0 0 140 40" fill="currentColor" width="140" height="40">
              {/* Three Keys Symbol */}
              <g transform="translate(5, 2) scale(0.7)">
                {/* Key 1 - Top */}
                <path d="M25 5 L25 22 M22 5 L28 5 M22 8 L28 8 M20 22 C20 26 22 28 25 28 C28 28 30 26 30 22" strokeWidth="2.5" stroke="currentColor" fill="none"/>
                {/* Key 2 - Bottom Left */}
                <path d="M8 42 L20 26 M6 40 L11 44 M8 37 L13 41 M20 26 C16 24 14 26 14 29 C14 32 17 34 20 32" strokeWidth="2.5" stroke="currentColor" fill="none" transform="rotate(-30, 25, 25)"/>
                {/* Key 3 - Bottom Right */}
                <path d="M42 42 L30 26 M39 44 L44 40 M37 41 L42 37 M30 26 C34 24 36 26 36 29 C36 32 33 34 30 32" strokeWidth="2.5" stroke="currentColor" fill="none" transform="rotate(30, 25, 25)"/>
              </g>
              {/* UBS Text */}
              <text x="60" y="28" fontSize="22" fontWeight="400" fontFamily="'Times New Roman', serif" letterSpacing="3" fill="currentColor">UBS</text>
            </svg>
          </div>
          <p>
            We guarantee that all payments received from our clients, less fees, are held in a Client Deposit Account with UBS Switzerland AG.
          </p>
        </div>

        <div className="footer-disclaimer">
          <p>
            <strong>{t('footer.b2bOnly')}</strong> {t('footer.disclaimer')}
          </p>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>{t('footer.rights')}</span>
          </div>
          <span>IFZA License No. 33847 · Dubai, UAE</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
