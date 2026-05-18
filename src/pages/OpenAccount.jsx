import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'
import SellerDocumentChecklist from '../components/SellerDocumentChecklist'
import { LICENSE_NUMBER } from '../config/site'

function OpenAccount() {
  return (
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Seller onboarding · IFZA {LICENSE_NUMBER}</span>
          <h1>Open account — sell to AULM</h1>
          <p>
            <strong>We buy raw gold</strong> (doré and scrap) at <strong>LBMA spot minus a negotiated discount</strong>{' '}
            (after assay). <strong>We sell LBMA-standard bullion only</strong> — not raw gold. Review seller documents
            below — no upload now. Settlement: bank-to-bank TT (MT103) only.
          </p>
        </div>
      </section>

      <section className="refinery-service-section">
        <div className="container">
          <div className="open-account-products">
            <article className="refinery-card">
              <h3>We buy — doré</h3>
              <p>
                Raw doré from Africa and other origins. Full export, assay, and mine-source documentation before
                Dubai intake.
              </p>
            </article>
            <article className="refinery-card">
              <h3>We buy — scrap</h3>
              <p>
                Industrial and jewellery scrap with assay and lawful origin proof — refined through our Dubai
                partners.
              </p>
            </article>
            <article className="refinery-card">
              <h3>We sell — LBMA bullion</h3>
              <p>
                Investment-grade bars to qualified buyers only — LBMA Good Delivery and DGD standards. We do not
                sell raw gold or doré.
              </p>
            </article>
          </div>

          <div className="open-account-pricing">
            <h2>Pricing: LBMA minus negotiated discount</h2>
            <p>
              Purchase pricing (doré / scrap) is <strong>negotiated vs LBMA spot</strong> after assay. Bullion sales
              are quoted at <strong>LBMA standards</strong> for qualified institutional buyers. Payments:{' '}
              <strong>bank-to-bank TT (SWIFT MT103) only</strong>.
            </p>
            <p className="open-account-buyer-note">
              <strong>AULM buys — you sell.</strong> We accept <strong>CIF, FOB, CFR, DAP, EXW</strong> and other
              agreed Incoterms. The checklist above is for your preparation only — document collection follows account
              approval. Refinery turnaround ~2–3 days; settlement via TT (MT103).
            </p>
          </div>
        </div>
      </section>

      <section className="section-gray">
        <div className="container">
          <h2 className="seller-docs-page-title">Documents required from sellers (doré import to Dubai)</h2>
          <SellerDocumentChecklist />
          <p className="seller-docs-footer">
            This list is informational only — nothing to upload here. After account approval, our desk will
            request documents per shipment and origin. Corporate KYC may follow via{' '}
            <Link to="/kyconboarding">KYC/KYB onboarding</Link>.
          </p>
        </div>
      </section>

      <section className="refinery-form-section">
        <div className="container">
          <AccountInquiryForm
            defaultService="sell-gold-institutional"
            heading="Open account — seller onboarding"
            subheading="No documents to upload now — only your contact details and product interest. Email opens to contact@aulmtrading.com."
          />
        </div>
      </section>
    </>
  )
}

export default OpenAccount
