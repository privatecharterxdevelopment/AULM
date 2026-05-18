import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'

function TransactionalBanking() {
  return (
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Fully compliant · Multi-jurisdiction</span>
          <h1>Transactional Banking Consulting</h1>
          <p>
            We help companies design the right cross-border structure — entity placement, compliant payment
            architecture, and paymaster arrangements across key jurisdictions.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Book a consultation
          </Link>
        </div>
      </section>

      <section>
        <div className="container text-section">
          <h2>Structure, banking & paymaster — one advisory desk</h2>
          <p>
            AULM&apos;s transactional banking consulting supports commodity traders, family offices, and
            corporate groups that need <strong>fully compliant</strong> payment and custody architecture —
            not ad-hoc accounts.
          </p>
          <ul className="refinery-bullets">
            <li>
              <strong>Corporate structure</strong> — optimal company locations for trading, holding, and
              treasury (UAE, Switzerland, UK, and other hubs)
            </li>
            <li>
              <strong>Payment & escrow structuring</strong> — compliant client-deposit and escrow frameworks,
              onboarding support with licensed financial institutions (institution names provided confidentially off-site)
            </li>
            <li>
              <strong>Paymaster solutions</strong> — compliant paymaster mandates for B2B gold and
              precious metals flows
            </li>
            <li>
              <strong>Multi-jurisdiction coverage</strong> — coordination across diverse regulatory
              environments with documented AML/KYC
            </li>
            <li>
              <strong>Trade logistics alignment</strong> — structures that support CIF, FOB, CFR and
              other Incoterms used in gold and doré shipments
            </li>
          </ul>
        </div>
      </section>

      <section className="section-gray">
        <div className="container">
          <div className="refinery-faq-grid">
            <article className="refinery-card">
              <h3>Who is this for?</h3>
              <p>
                Licensed traders, refineries, mining exporters, and institutional groups setting up or
                restructuring international gold and commodities operations.
              </p>
            </article>
            <article className="refinery-card">
              <h3>What we do not do</h3>
              <p>
                No anonymous accounts, no crypto settlement, no circumvention of sanctions or AML rules.
                Every structure is documented and audit-ready.
              </p>
            </article>
            <article className="refinery-card">
              <h3>How to start</h3>
              <p>
                Confidential discovery call → scope memo → payment / paymaster roadmap with timelines and
                document checklist.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="refinery-form-section">
        <div className="container">
          <AccountInquiryForm
            defaultService="banking-consulting"
            heading="Transactional banking inquiry"
            subheading="Describe your jurisdictions and banking goals. We reply within one business day."
          />
        </div>
      </section>
    </>
  )
}

export default TransactionalBanking
