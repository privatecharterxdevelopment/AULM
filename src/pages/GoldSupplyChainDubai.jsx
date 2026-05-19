import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'
import { LICENSE_NUMBER } from '../config/site'

function GoldSupplyChainDubai() {
  return (
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">End-to-end · IFZA {LICENSE_NUMBER}</span>
          <h1>Gold Supply Chain Dubai — Sourcing to Delivery</h1>
          <p>
            One partner from <strong>procurement</strong> through assay, refining, certification, and
            secure logistics. Institutional gold supply chain management without unnecessary intermediaries.
          </p>
          <Link to="/open-account" className="btn btn-primary">
            Open account
          </Link>
        </div>
      </section>

      <section>
        <div className="container text-section">
          <h2>End-to-end gold trading solution</h2>
          <p>
            AULM manages the full <strong>gold supply chain Dubai</strong> corridor: African and global
            sourcing, <Link to="/gold-import-dubai">gold import</Link>,{' '}
            <Link to="/refinery-dubai">refinery services</Link>, and delivery to vault or export. You get
            a single audited paper trail — assay, origin, customs, and settlement.
          </p>
          <ul className="refinery-bullets">
            <li>Sourcing &amp; OECD due diligence on origin</li>
            <li>Import, customs, and DMCC-aligned documentation</li>
            <li>Refining to 99.99% with LBMA-aligned standards</li>
            <li>
              <Link to="/sell-gold-dubai">Sell gold</Link> to us (doré/scrap) or{' '}
              <Link to="/buy-gold-dubai">buy LBMA bullion</Link> as a qualified buyer
            </li>
            <li>Insured logistics and institutional settlement (TT / MT103)</li>
          </ul>
        </div>
      </section>

      <section className="refinery-form-section section-gray">
        <div className="container">
          <AccountInquiryForm
            defaultService="gold-import-dubai"
            heading="Supply chain inquiry"
            subheading="Describe your corridor (origin → Dubai → destination). B2B only."
          />
        </div>
      </section>
    </>
  )
}

export default GoldSupplyChainDubai
