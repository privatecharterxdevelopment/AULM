import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'
import { LICENSE_NUMBER } from '../config/site'

function GoldImportDubai() {
  return (
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Gold import Dubai · IFZA {LICENSE_NUMBER}</span>
          <h1>Gold Import Dubai</h1>
          <p>
            Institutional gold import into the UAE — customs, DMCC compliance, assay, and refinery
            hand-off. Open your import file with AULM.
          </p>
          <Link to="/open-account" className="btn btn-primary">
            Open account
          </Link>
        </div>
      </section>

      <section>
        <div className="container text-section">
          <h2>Structured gold import into Dubai</h2>
          <p>
            AULM Global Trade Corporation facilitates <strong>gold import Dubai</strong> for qualified
            B2B clients. We manage documentation from origin country export through UAE customs,
            DMCC registration, and delivery to LBMA-aligned refineries or insured vault storage.
          </p>
          <p>
            Whether you are importing doré from Africa, Swiss-refined bars for re-export, or
            consolidating inventory into Dubai for Asian distribution, our desk provides a single
            counterparty for compliance and logistics.
          </p>
          <ul className="refinery-bullets">
            <li>DMCC & IFZA licensed counterparty (License No. {LICENSE_NUMBER})</li>
            <li>Origin assay, export permits, and OECD due diligence</li>
            <li>Coordination with Emirates Gold and Dubai Good Delivery standards</li>
            <li>Optional refinery upgrade to 99.99% before export or allocation</li>
          </ul>
          <p>
            Related: <Link to="/refinery-dubai">refinery services Dubai</Link> ·{' '}
            <Link to="/sell-gold-institutional-dubai">sell gold institutional Dubai</Link>
          </p>
        </div>
      </section>

      <section className="refinery-form-section section-gray">
        <div className="container">
          <AccountInquiryForm
            defaultService="gold-import-dubai"
            heading="Gold import Dubai — open account"
            subheading="Submit your import mandate. Form opens email to contact@aulmtrading.com."
          />
        </div>
      </section>
    </>
  )
}

export default GoldImportDubai
