import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'
import { LICENSE_NUMBER } from '../config/site'

function InstitutionalGoldDubai() {
  return (
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Institutional desk · Dubai</span>
          <h1>Sell Gold Institutional Dubai</h1>
          <p>
            Discreet B2B liquidity for allocated gold bars and qualified doré. Competitive institutional
            bids, escrow settlement, full documentation.
          </p>
          <Link to="/open-account" className="btn btn-primary">
            Open account
          </Link>
        </div>
      </section>

      <section>
        <div className="container text-section">
          <h2>Institutional gold sales in Dubai</h2>
          <p>
            AULM <strong>buys raw gold</strong> (doré and scrap) at <strong>LBMA spot minus a negotiated discount</strong>{' '}
            (after assay). We <strong>sell LBMA bullion only</strong> to qualified buyers — never raw gold. View
            seller documents on our <Link to="/open-account">open account</Link> page (no upload at signup).
          </p>
          <p>
            Settlement is bank-to-bank only via telegraphic transfer (TT / SWIFT MT103) between approved
            institutional accounts. No cash, cryptocurrency, or third-party payment agents. Every transaction
            includes assay verification, weight confirmation, and settlement documentation.
          </p>
          <ul className="refinery-bullets">
            <li>Minimum 500g refined gold equivalent per mandate</li>
            <li>LBMA, DGD, and major refinery stamps accepted</li>
            <li>IFZA License No. {LICENSE_NUMBER} · full KYC/AML</li>
            <li>Pair with our <Link to="/refinery-dubai">refinery Dubai</Link> desk for bar recast</li>
          </ul>
        </div>
      </section>

      <section className="refinery-form-section section-gray">
        <div className="container">
          <AccountInquiryForm
            defaultService="sell-gold-institutional"
            heading="Sell gold — institutional inquiry"
            subheading="Open account via form → email to contact@aulmtrading.com. Response within one business day."
          />
        </div>
      </section>
    </>
  )
}

export default InstitutionalGoldDubai
