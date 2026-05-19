import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'
import { LICENSE_NUMBER } from '../config/site'

function SellGoldDubai() {
  return (
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Sell gold Dubai · B2B only</span>
          <h1>Sell Gold in Dubai — Institutional Buyer for Doré &amp; Scrap</h1>
          <p>
            <strong>Sell gold to AULM</strong> — we buy raw gold (doré and scrap) at{' '}
            <strong>LBMA spot minus a negotiated discount</strong> after assay. IFZA-licensed desk. Settlement bank-to-bank
            (SWIFT MT103) only — no cash counter, no retail walk-ins.
          </p>
          <Link to="/open-account" className="btn btn-primary">
            Open account — sell gold
          </Link>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="text-section">
            <h2>Sell gold Dubai — who we work with</h2>
            <p>
              Unlike retail <strong>cash-for-gold</strong> shops in Dubai, AULM is an <strong>institutional gold buyer</strong>{' '}
              for miners, exporters, refineries, and commodity traders. If you need to <strong>sell doré gold</strong>,{' '}
              <strong>sell scrap gold</strong>, or route African production through Dubai, we purchase at transparent LBMA-linked
              terms after full assay and OECD due diligence.
            </p>
            <ul className="refinery-bullets">
              <li>
                <strong>Sell doré gold Dubai</strong> — export documentation, mine-source chain, refinery intake
              </li>
              <li>
                <strong>Sell scrap gold Dubai</strong> — industrial and jewellery scrap with lawful origin proof
              </li>
              <li>CIF, FOB, CFR, DAP, EXW and agreed Incoterms</li>
              <li>Minimum ~500g refined gold equivalent per mandate</li>
              <li>IFZA License No. {LICENSE_NUMBER} · full KYC/AML</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-gray">
        <div className="container">
          <div className="text-section">
            <h2>How selling gold to AULM works</h2>
            <ol className="refinery-steps-list">
              <li>
                <strong>Open account</strong> — share company details and product (doré / scrap). No document upload at
                signup.
              </li>
              <li>
                <strong>Assay &amp; pricing</strong> — LBMA-linked price minus negotiated discount after fineness and weight
                confirmation.
              </li>
              <li>
                <strong>Compliance</strong> — KYC/KYB, UBO, and origin checks per UAE AML and OECD guidelines.
              </li>
              <li>
                <strong>Settlement</strong> — telegraphic transfer (TT / MT103) between approved institutional accounts only.
              </li>
              <li>
                <strong>Refinery option</strong> — pair with our{' '}
                <Link to="/refinery-dubai">refinery Dubai</Link> desk for bar recast (~2–3 days turnaround).
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="text-section refinery-faq">
            <h2>Sell gold Dubai — FAQ</h2>
          </div>
          <div className="refinery-faq-grid">
            <article>
              <h3>Do you buy gold jewellery over the counter?</h3>
              <p>
                No. We do not operate a retail <strong>sell gold for cash</strong> counter. AULM buys doré and scrap from
                institutional sellers with full documentation.
              </p>
            </article>
            <article>
              <h3>What price do you pay when I sell gold?</h3>
              <p>
                Purchase pricing is <strong>LBMA spot minus a negotiated discount</strong> after assay — not a fixed
                percentage on the website. Terms are agreed per mandate.
              </p>
            </article>
            <article>
              <h3>Can I sell gold bars (LBMA) to you?</h3>
              <p>
                We primarily <strong>buy raw gold</strong>. For allocated LBMA bars, contact us — we may bid on qualified
                institutional lots. We <strong>sell LBMA bullion only</strong> to buyers; we do not sell raw gold.
              </p>
            </article>
            <article>
              <h3>How do I sell gold from Africa to Dubai?</h3>
              <p>
                See our <Link to="/gold-import-dubai">gold import Dubai</Link> page and seller checklist on{' '}
                <Link to="/open-account">open account</Link> for doré export and Dubai intake requirements.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="refinery-form-section">
        <div className="container">
          <AccountInquiryForm
            defaultService="sell-gold-institutional"
            defaultProduct="dore"
            heading="Sell gold Dubai — request a mandate"
            subheading="Institutional sellers only. We buy doré and scrap; pricing negotiated vs LBMA after assay."
          />
        </div>
      </section>
    </>
  )
}

export default SellGoldDubai
