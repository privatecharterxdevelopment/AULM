import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'
import { LICENSE_NUMBER } from '../config/site'

function ComplianceGoldTrading() {
  return (
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Compliance · IFZA {LICENSE_NUMBER}</span>
          <h1>Gold Trading Compliance — LBMA &amp; OECD Due Diligence</h1>
          <p>
            Full transparency for institutional gold trading: OECD supply chain guidelines, LBMA
            responsible sourcing, UAE AML/KYC, and auditable documentation on every mandate.
          </p>
          <Link to="/open-account" className="btn btn-primary">
            Open account
          </Link>
        </div>
      </section>

      <section>
        <div className="container text-section">
          <h2>Compliance-first gold trading in Dubai</h2>
          <p>
            AULM operates as a <strong>compliant gold trading desk</strong> — not anonymous cash deals.
            Every counterparty completes KYC/KYB. Doré and scrap purchases require mine-source and export
            documentation. Bullion sales are allocated with assay and settlement records.
          </p>
          <ul className="refinery-bullets">
            <li>OECD Due Diligence Guidance for responsible supply chains</li>
            <li>LBMA Good Delivery and responsible sourcing alignment</li>
            <li>UAE Federal Decree-Law No. 20 of 2018 (AML/CFT)</li>
            <li>UBO disclosure and corporate KYB via our <Link to="/kyconboarding">KYC onboarding</Link></li>
            <li>Bank-to-bank settlement (SWIFT MT103) — no cash, no crypto</li>
          </ul>
        </div>
      </section>

      <section className="refinery-form-section section-gray">
        <div className="container">
          <AccountInquiryForm
            defaultService="sell-gold-institutional"
            heading="Compliance inquiry"
            subheading="Institutional mandates only. We respond within one business day."
          />
        </div>
      </section>
    </>
  )
}

export default ComplianceGoldTrading
