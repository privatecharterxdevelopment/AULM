import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'
import { LICENSE_NUMBER } from '../config/site'

function InstitutionalGoldTrading() {
  return (
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Institutional · IFZA {LICENSE_NUMBER}</span>
          <h1>Institutional Gold Trading Dubai</h1>
          <p>
            For family offices, commodity traders, investment funds, and qualified institutions —
            direct access to physical gold flows with discretion and full documentation.
          </p>
          <Link to="/open-account" className="btn btn-primary">
            Open account
          </Link>
        </div>
      </section>

      <section>
        <div className="container text-section">
          <h2>Institutional partners we serve</h2>
          <p>
            AULM is built for <strong>serious institutional gold trading</strong> — not retail
            walk-ins. Typical mandates range from ~500g to 250kg equivalent per month per client,
            subject to compliance approval and assay.
          </p>
          <ul className="refinery-bullets">
            <li>Family offices &amp; private wealth structures</li>
            <li>Commodity trading firms &amp; refineries</li>
            <li>Funds and accredited investors (qualified purchasers)</li>
            <li>Producers selling doré — see <Link to="/sell-gold-dubai">sell gold Dubai</Link></li>
            <li>Buyers of LBMA bullion — see <Link to="/buy-gold-dubai">buy gold Dubai</Link></li>
          </ul>
          <p>
            Learn more about our company on <Link to="/about">about AULM</Link> or browse{' '}
            <Link to="/services">all services</Link>.
          </p>
        </div>
      </section>

      <section className="refinery-form-section section-gray">
        <div className="container">
          <AccountInquiryForm
            defaultService="sell-gold-institutional"
            heading="Institutional inquiry"
            subheading="Confidential B2B only. Response within one business day."
          />
        </div>
      </section>
    </>
  )
}

export default InstitutionalGoldTrading
