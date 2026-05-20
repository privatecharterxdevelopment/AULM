import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid, FaqAccordion } from '../components/landing'
import { LICENSE_NUMBER, SITE_NAME, SITE_URL } from '../config/site'

const ONBOARD_STEPS = [
  { id: '1', step: '01', title: 'Open account', body: 'Start institutional onboarding.' },
  { id: '2', step: '02', title: 'Complete the form', body: 'Share mandate, volume, and compliance details.' },
  { id: '3', step: '03', title: 'Email to desk', body: 'Inquiry delivered to contact@aulmtrading.com.' },
]

const FAQ = [
  {
    id: 'who',
    question: 'Who can open an account?',
    answer: 'Licensed traders, refineries, family offices, and corporate treasuries with completed KYC/AML. No retail.',
  },
  {
    id: 'turnaround',
    question: 'Refinery turnaround in Dubai?',
    answer: 'Typically 2–3 days from assay acceptance to certified bar delivery, subject to lot size.',
  },
  {
    id: 'payment',
    question: 'How are payments settled?',
    answer: 'Bank-to-bank only — TT / SWIFT MT103. No cash, crypto, or third-party agents.',
  },
  {
    id: 'africa',
    question: 'Gold import from Africa?',
    answer: 'Yes — with full origin documentation, export permits, and DMCC-compliant Dubai intake.',
  },
]

function RefineryDubai() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Refinery Services Dubai',
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      areaServed: { '@type': 'City', name: 'Dubai' },
      description:
        'LBMA-aligned gold refining, gold import Dubai, and institutional gold sales for qualified B2B clients.',
      serviceType: 'Precious metals refining and trading',
    }
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.aulmSchema = 'refinery'
    el.textContent = JSON.stringify(schema)
    document.head.appendChild(el)
    return () => el.remove()
  }, [])

  return (
    <LandingApp sticky={{ label: 'Open account', to: '/open-account' }}>
      <LandingHero
        label={`Dubai · IFZA ${LICENSE_NUMBER}`}
        title="Refinery Services Dubai"
        minimal={false}
        lead="LBMA-aligned refining, gold import, and institutional sales — one B2B desk."
        actions={
          <>
            <Link to="/open-account" className="btn btn-primary">
              Open account
            </Link>
            <Link to="/gold-import-dubai" className="btn btn-outline">
              Gold import
            </Link>
          </>
        }
      />

      <LandingSection title="How to onboard" variant="compact">
        <FeatureGrid columns={3} items={ONBOARD_STEPS} />
      </LandingSection>

      <LandingSection id="refinery-process" title="Refinery process" variant="gray">
        <div className="refinery-highlight">
          <div
            className="refinery-highlight__visual"
            style={{ backgroundImage: 'url(/step-refinery.jpg)' }}
            role="img"
            aria-hidden="true"
          />
          <div className="refinery-highlight__copy">
            <p className="refinery-highlight__price">
              <strong>~1,800 USD per gold bar</strong> — depending on volume and lot structure.
            </p>
            <p>
              Output <strong>stamped as LBMA-certified gold bars</strong> after assay. Typical turnaround ~2–3 days
              once material is accepted.
            </p>
            <ul className="refinery-bullets landing-bullets">
              <li>Miller chlorination &amp; electrolytic refining to 99.99%</li>
              <li>Emirates Gold, Valcambi, DGD standards</li>
            </ul>
          </div>
        </div>
      </LandingSection>

      <LandingSection id="refinery-dubai" title="Refinery — 99.99% output">
        <div className="landing-split">
          <article className="landing-feature-card">
            <p>
              Doré and scrap to investment-grade bars — assay certificates, weight verification, and
              chain-of-custody for international resale.
            </p>
            <ul className="refinery-bullets landing-bullets">
              <li>Full assay and weight documentation on every lot</li>
              <li>Insured vaulting and export-ready certification</li>
            </ul>
          </article>
          <article className="landing-feature-card landing-feature-card--cta">
            <h3>Refinery mandate</h3>
            <p>Doré lots, scrap recovery, or bar recast.</p>
            <Link to="/open-account" className="btn btn-primary">
              Open account
            </Link>
          </article>
        </div>
      </LandingSection>

      <LandingSection id="gold-import-dubai" title="Gold import Dubai" variant="gray">
        <div className="landing-split">
          <article className="landing-feature-card">
            <p>
              Customs clearance, DMCC documentation, and hand-off to refinery or vault. Minimum ~500g refined
              equivalent.
            </p>
            <ul className="refinery-bullets landing-bullets">
              <li>Origin assay and UAE customs coordination</li>
              <li>Corridors from Africa, Switzerland, and global hubs</li>
              <li>Full OECD due diligence on every counterparty</li>
            </ul>
            <Link to="/gold-import-dubai" className="landing-feature-card__link">
              Gold import page →
            </Link>
          </article>
          <article className="landing-feature-card landing-feature-card--cta">
            <h3>Import desk</h3>
            <p>Secure courier intake to Dubai Digital Park / DMCC network.</p>
            <Link to="/open-account" className="btn btn-primary">
              Open account
            </Link>
          </article>
        </div>
      </LandingSection>

      <LandingSection id="sell-gold-institutional" title="Institutional sell desk">
        <div className="landing-split">
          <article className="landing-feature-card">
            <p>
              Family offices, funds, and dealers sell allocated bars and qualified doré at institutional spreads.
            </p>
            <ul className="refinery-bullets landing-bullets">
              <li>Bids on LBMA-listed and DGD bars</li>
              <li>Confidential mandates — no retail counter</li>
              <li>USD, EUR, CHF, or AED per mandate</li>
            </ul>
            <Link to="/sell-gold-dubai" className="landing-feature-card__link">
              Sell gold Dubai →
            </Link>
          </article>
          <article className="landing-feature-card landing-feature-card--cta">
            <h3>Institutional sales</h3>
            <p>Minimum 500g refined equivalent.</p>
            <Link to="/seller-onboarding" className="btn btn-primary">
              Start onboarding
            </Link>
          </article>
        </div>
      </LandingSection>

      <LandingSection variant="compact">
        <FaqAccordion title="FAQ" items={FAQ} />
      </LandingSection>
    </LandingApp>
  )
}

export default RefineryDubai
