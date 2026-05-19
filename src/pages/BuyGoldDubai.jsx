import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'
import { LICENSE_NUMBER } from '../config/site'

function BuyGoldDubai() {
  return (
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Buy gold Dubai · B2B only</span>
          <h1>Buy Gold in Dubai — LBMA Bullion for Institutional Buyers</h1>
          <p>
            <strong>Buy LBMA-standard gold</strong> from AULM — investment-grade bullion only. We do{' '}
            <strong>not</strong> sell raw gold, doré, or scrap. Qualified family offices, funds, and traders. Settlement
            via bank transfer (SWIFT MT103).
          </p>
          <Link to="/open-account" className="btn btn-primary">
            Open account — buy bullion
          </Link>
        </div>
      </section>

      <section>
        <div className="container text-section">
          <h2>Buy physical gold Dubai — what we offer</h2>
          <p>
            AULM supplies <strong>LBMA Good Delivery</strong> and Dubai Good Delivery (DGD) aligned bullion to institutional
            buyers. If you want to <strong>buy gold bars in Dubai</strong> for allocation, vault delivery, or export under
            compliant documentation, our desk quotes at <strong>LBMA market standards</strong> for approved mandates.
          </p>
          <ul className="refinery-bullets">
            <li>Buy gold bars — LBMA / major refinery stamps</li>
            <li>Full assay, weight, and settlement documentation</li>
            <li>Pair with <Link to="/refinery-dubai">refinery Dubai</Link> for recast or upgrade</li>
            <li>We buy raw gold from sellers — we only sell refined bullion</li>
            <li>IFZA License No. {LICENSE_NUMBER}</li>
          </ul>
        </div>
      </section>

      <section className="section-gray">
        <div className="container text-section">
          <h2>Buy gold vs sell gold — AULM model</h2>
          <p>
            <strong>Sell gold to us:</strong> doré and scrap from producers and traders (
            <Link to="/sell-gold-dubai">sell gold Dubai</Link>).{' '}
            <strong>Buy gold from us:</strong> LBMA bullion only — this page. We are not a retail bullion shop with live
            spot ticks on the homepage; we work mandate-by-mandate with full KYC.
          </p>
        </div>
      </section>

      <section>
        <div className="container text-section">
          <h2>Buy gold Dubai — FAQ</h2>
          <div className="refinery-faq-grid">
            <article>
              <h3>Can I buy doré or scrap gold from AULM?</h3>
              <p>
                No. We <strong>sell LBMA bullion only</strong>. Doré and scrap are purchase products — we buy those from
                sellers, not sell them.
              </p>
            </article>
            <article>
              <h3>How do I buy gold bars as an institution?</h3>
              <p>
                Complete <Link to="/open-account">open account</Link>, pass KYC, and receive a mandate-specific quote.
                Payment by TT (MT103) between approved accounts.
              </p>
            </article>
            <article>
              <h3>Is this margin or paper gold?</h3>
              <p>
                We focus on physical, documented flows for B2B clients — not retail leverage or anonymous cash deals.
              </p>
            </article>
            <article>
              <h3>Import and refinery</h3>
              <p>
                For import coordination see <Link to="/gold-import-dubai">gold import Dubai</Link>. Sellers of raw gold
                should use our sell-gold desk.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="refinery-form-section">
        <div className="container">
          <AccountInquiryForm
            defaultService="buy-bullion"
            defaultProduct="bullion"
            heading="Buy gold Dubai — institutional inquiry"
            subheading="LBMA bullion only. Qualified buyers. Email to contact@aulmtrading.com after submit."
          />
        </div>
      </section>
    </>
  )
}

export default BuyGoldDubai
