import { Link } from 'react-router-dom'
import StickyCtaBar from '../components/StickyCtaBar'
import { LICENSE_NUMBER } from '../config/site'

const STEPS = [
  {
    id: 'account',
    title: 'Open account',
    text: 'Share company details and product (doré or scrap). No upload at signup.',
    image: '/pexels-james-lee-932763-35497189.jpg',
    to: '/seller-onboarding',
  },
  {
    id: 'import',
    title: 'Import',
    text: 'DMCC-compliant intake into Dubai — customs, routing, and refinery hand-off.',
    image: '/pexels-ulises-castillo-3027973-6692312.jpg',
    to: '/gold-import-dubai',
  },
  {
    id: 'lbma',
    title: 'LBMA-linked pricing',
    text: 'Purchase at LBMA spot minus a negotiated discount after fineness and weight are confirmed.',
    image: '/pexels-m-safiei-omar-397714541-14815440.jpg',
  },
  {
    id: 'assay',
    title: 'Independent assay report',
    text: 'Third-party laboratory assay before pricing — full fineness and weight documentation.',
    image: '/pexels-bertellifotografia-34522438.jpg',
  },
  {
    id: 'payment',
    title: 'Bank-to-bank TT',
    text: 'Settlement by telegraphic transfer (SWIFT MT103) between approved institutional accounts only.',
    image: '/pexels-james-lee-932763-35497189.jpg',
  },
]

function SellGoldDubai() {
  return (
    <div className="landing-with-sticky-cta">
      <section className="page-header refinery-hero page-header--minimal">
        <div className="container">
          <span className="label">Sell gold Dubai · B2B only</span>
          <h1>Sell Gold in Dubai</h1>
        </div>
      </section>

      <section className="process-steps-section">
        <div className="container">
          <p className="process-steps-lead">
            Institutional buyer for <strong>doré &amp; scrap</strong> — not retail cash-for-gold. IFZA License No.{' '}
            {LICENSE_NUMBER}.
          </p>
          <div className="process-steps-grid">
            {STEPS.map((step, index) => (
              <article key={step.id} className="process-step-card">
                <div
                  className="process-step-card__visual"
                  style={{ backgroundImage: `url(${step.image})` }}
                  role="img"
                  aria-label=""
                />
                <span className="process-step-card__num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {step.to && (
                  <Link to={step.to} className="process-step-card__link">
                    Learn more →
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-gray refinery-highlight-section">
        <div className="container refinery-highlight">
          <div
            className="refinery-highlight__visual"
            style={{ backgroundImage: 'url(/pexels-bertellifotografia-34522438.jpg)' }}
            role="img"
            aria-label=""
          />
          <div className="refinery-highlight__copy">
            <h2>Refinery process</h2>
            <p className="refinery-highlight__price">
              <strong>~1,800 USD per gold bar</strong> — depending on volume and lot structure.
            </p>
            <p>
              Output <strong>stamped as LBMA-certified gold bars</strong> after assay. Typical turnaround ~2–3 days
              once material is accepted.
            </p>
            <Link to="/refinery-dubai" className="refinery-inline-link">
              Refinery services Dubai →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <details className="landing-faq-accordion">
            <summary>Quick answers (optional)</summary>
            <div className="refinery-faq-grid">
              <article>
                <h3>Who can sell to AULM?</h3>
                <p>Miners, exporters, refineries, and commodity traders with full documentation — minimum ~500g equivalent per mandate.</p>
              </article>
              <article>
                <h3>Cash over the counter?</h3>
                <p>No retail counter. B2B only with KYC/AML and OECD due diligence.</p>
              </article>
              <article>
                <h3>Sell from Africa?</h3>
                <p>
                  See <Link to="/gold-import-dubai">gold import Dubai</Link> for export and intake requirements.
                </p>
              </article>
            </div>
          </details>
        </div>
      </section>

      <StickyCtaBar label="Ready to sell gold?" to="/seller-onboarding" />
    </div>
  )
}

export default SellGoldDubai
