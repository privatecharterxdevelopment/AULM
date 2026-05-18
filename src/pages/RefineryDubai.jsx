import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LICENSE_NUMBER, SITE_URL } from '../config/site'

function RefineryDubai() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Refinery Services Dubai',
      provider: { '@type': 'Organization', name: 'AULM Global Trade Corporation', url: SITE_URL },
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
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Dubai · IFZA License {LICENSE_NUMBER}</span>
          <h1>Refinery Services Dubai</h1>
          <p>
            LBMA-aligned refining, gold import Dubai, and institutional gold sales — one B2B desk for
            qualified counterparties. Open your account in three steps.
          </p>
          <div className="refinery-hero-actions">
            <Link to="/open-account" className="btn btn-primary">
              Open account
            </Link>
            <Link to="/gold-import-dubai" className="btn btn-outline">
              Gold import Dubai
            </Link>
          </div>
        </div>
      </section>

      <section className="refinery-steps">
        <div className="container">
          <h2 className="sr-only">How to open an account</h2>
          <ol className="refinery-steps-list">
            <li>
              <span className="step-num">1</span>
              <strong>Open account</strong>
              <p>Start your institutional onboarding below.</p>
            </li>
            <li>
              <span className="step-num">2</span>
              <strong>Complete the form</strong>
              <p>Share mandate, volume, and compliance details.</p>
            </li>
            <li>
              <span className="step-num">3</span>
              <strong>Send to contact@aulmtrading.com</strong>
              <p>Your inquiry is delivered to our Dubai trading desk.</p>
            </li>
          </ol>
        </div>
      </section>

      <section id="refinery-dubai" className="refinery-service-section">
        <div className="container refinery-split">
          <div>
            <h2>Refinery Dubai — 99.99% LBMA-certified output</h2>
            <p>
              AULM coordinates <strong>refinery services in Dubai</strong> through DMCC-approved partners.
              We process doré and scrap to investment-grade bars with full assay certificates, weight
              verification, and chain-of-custody documentation suitable for international resale.
            </p>
            <ul className="refinery-bullets">
              <li>Miller chlorination and electrolytic refining to 99.99% purity</li>
              <li>Emirates Gold, Valcambi, and Dubai Good Delivery (DGD) standards</li>
              <li>Turnaround from intake to certified bar with insured vaulting</li>
            </ul>
          </div>
          <div className="refinery-card">
            <h3>Typical refinery mandate</h3>
            <p>Doré lots, scrap recovery, or bar recast for institutional inventory.</p>
            <Link to="/open-account" className="btn btn-primary">
              Open account
            </Link>
          </div>
        </div>
      </section>

      <section id="gold-import-dubai" className="refinery-service-section section-gray">
        <div className="container refinery-split">
          <div>
            <h2>Gold import Dubai — Africa, Switzerland & global routes</h2>
            <p>
              We structure <strong>gold import into Dubai</strong> for licensed traders and institutions:
              customs clearance, DMCC documentation, origin certification, and hand-off to refinery or
              allocated storage. Minimum institutional tickets from 500g refined gold equivalent.
            </p>
            <ul className="refinery-bullets">
              <li>Import permits, assay at origin, and UAE customs coordination</li>
              <li>Corridors from Uganda, West Africa, Switzerland, and other hubs</li>
              <li>Full OECD due diligence and KYC/AML on every counterparty</li>
            </ul>
            <Link to="/gold-import-dubai" className="refinery-inline-link">
              Dedicated gold import Dubai page →
            </Link>
          </div>
          <div className="refinery-card">
            <h3>Import desk</h3>
            <p>Air and secure courier intake to Dubai Digital Park / DMCC vault network.</p>
            <Link to="/open-account" className="btn btn-primary">
              Open account
            </Link>
          </div>
        </div>
      </section>

      <section id="sell-gold-institutional" className="refinery-service-section">
        <div className="container refinery-split">
          <div>
            <h2>Sell gold institutional Dubai — discreet B2B liquidity</h2>
            <p>
              Family offices, funds, and licensed dealers use AULM to <strong>sell gold in Dubai</strong>{' '}
              at institutional spreads. We buy allocated bars and qualified doré with same-day indicative
              pricing, escrow via approved client-deposit structures, and full settlement documentation.
            </p>
            <ul className="refinery-bullets">
              <li>Competitive bids on LBMA-listed and Dubai Good Delivery bars</li>
              <li>Confidential mandates — no retail counter service</li>
              <li>Settlement in USD, EUR, CHF, or AED per mandate</li>
            </ul>
            <Link to="/sell-gold-institutional-dubai" className="refinery-inline-link">
              Institutional sell page →
            </Link>
          </div>
          <div className="refinery-card">
            <h3>Institutional sales</h3>
            <p>Minimum 500g refined equivalent · invitation-only desk.</p>
            <Link to="/open-account" className="btn btn-primary">
              Open account
            </Link>
          </div>
        </div>
      </section>

      <section className="section-navy refinery-faq">
        <div className="container">
          <h2>Refinery & import FAQ</h2>
          <div className="refinery-faq-grid">
            <article>
              <h3>Who can open an account?</h3>
              <p>
                Licensed commodity traders, refineries, family offices, funds, and corporate treasuries
                with completed KYC/AML. Retail investors are not accepted.
              </p>
            </article>
            <article>
              <h3>How fast is refinery turnaround in Dubai?</h3>
              <p>
                Standard lots: 2–3 days from assay acceptance to certified bar delivery, subject to
                purity and lot size.
              </p>
            </article>
            <article>
              <h3>How are payments settled?</h3>
              <p>
                Bank-to-bank only via telegraphic transfer (TT / SWIFT MT103). No cash, crypto, or
                third-party payment agents.
              </p>
            </article>
            <article>
              <h3>Do you handle gold import from Africa?</h3>
              <p>
                Yes — with full origin documentation, export permits, and DMCC-compliant intake into
                Dubai refineries.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-navy">
        <div className="container text-section">
          <h2>Ready to onboard?</h2>
          <p>
            Open your B2B account on our dedicated page — form, document checklist, and seller onboarding
            in one place.
          </p>
          <Link to="/open-account" className="btn btn-primary">
            Open account
          </Link>
        </div>
      </section>
    </>
  )
}

export default RefineryDubai
