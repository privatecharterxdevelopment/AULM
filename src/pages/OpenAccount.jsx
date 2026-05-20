import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'
import SellerDocumentChecklist from '../components/SellerDocumentChecklist'
import { LICENSE_NUMBER } from '../config/site'

function OpenAccount() {
  useEffect(() => {
    const { hash } = window.location
    if (hash === '#open-account') {
      requestAnimationFrame(() => {
        document.getElementById('open-account')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [])

  return (
    <div className="open-account-page">
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Seller onboarding · IFZA {LICENSE_NUMBER}</span>
          <h1>Open account</h1>
          <p className="open-account-hero-lead">
            We buy <strong>doré &amp; scrap</strong> at LBMA-linked terms after assay. We sell{' '}
            <strong>LBMA bullion only</strong>. <strong>No document upload here</strong> — start with the form below.
            Settlement: <strong>TT (MT103)</strong> only.
          </p>
        </div>
      </section>

      <section className="refinery-form-section open-account-form-first">
        <div className="container">
          <AccountInquiryForm
            defaultService="sell-gold-institutional"
            heading="Open your file"
            subheading="Name, company, email, product — our desk replies by email."
          />
        </div>
      </section>

      <section className="refinery-service-section open-account-brief">
        <div className="container">
          <div className="open-account-products open-account-products--tight">
            <article className="refinery-card">
              <h3>We buy</h3>
              <p>Doré &amp; scrap — export and assay documentation per shipment after approval.</p>
            </article>
            <article className="refinery-card">
              <h3>We sell</h3>
              <p>LBMA / DGD bullion — qualified buyers only. No raw gold sales.</p>
            </article>
            <article className="refinery-card">
              <h3>Terms</h3>
              <p>LBMA spot minus negotiated discount (purchases). Incoterms agreed per mandate.</p>
            </article>
          </div>
          <ul className="open-account-mini-rules">
            <li>Bank-to-bank only — SWIFT MT103 between approved accounts</li>
            <li>Refinery coordination — typically ~2–3 days after assay acceptance</li>
          </ul>
        </div>
      </section>

      <section className="section-gray">
        <div className="container">
          <details className="seller-docs-accordion">
            <summary>Seller document checklist (reference — optional detail)</summary>
            <SellerDocumentChecklist />
          </details>
          <p className="seller-docs-footer">
            Nothing to upload until we ask per shipment. Corporate KYC may follow via{' '}
            <Link to="/kyconboarding">KYC/KYB onboarding</Link>.
          </p>
        </div>
      </section>

      <div className="open-account-sticky-cta">
        <a href="#open-account" className="btn btn-primary open-account-sticky-cta__btn">
          Open account now
        </a>
      </div>
    </div>
  )
}

export default OpenAccount
