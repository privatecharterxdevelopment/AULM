import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const languages = ['EN', 'DE', 'FR', 'AR', 'ZH', 'JA']

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
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/UBS_Logo_SVG.svg/320px-UBS_Logo_SVG.svg.png"
            alt="UBS"
            className="ubs-logo-img"
          />
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
