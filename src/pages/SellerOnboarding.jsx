import AccountInquiryForm from '../components/AccountInquiryForm'

function SellerOnboarding() {
  return (
    <div className="seller-onboarding-page">
      <section className="page-header refinery-hero page-header--minimal">
        <div className="container">
          <span className="label">B2B seller onboarding</span>
          <h1>Open your seller file</h1>
        </div>
      </section>

      <section className="refinery-form-section seller-onboarding-form">
        <div className="container">
          <AccountInquiryForm
            defaultService="sell-gold-institutional"
            defaultProduct="dore"
            heading="Start onboarding"
            subheading="No documents to upload — we reply by email within one business day."
          />
        </div>
      </section>
    </div>
  )
}

export default SellerOnboarding
