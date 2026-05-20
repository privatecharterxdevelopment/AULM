import AccountInquiryForm from '../components/AccountInquiryForm'
import { LandingApp, LandingHero, LandingSection } from '../components/landing'

function SellerOnboarding() {
  return (
    <LandingApp>
      <LandingHero label="B2B seller onboarding" title="Open your seller file" />

      <LandingSection className="seller-onboarding-form">
        <div className="landing-form-panel">
          <AccountInquiryForm
            defaultService="sell-gold-institutional"
            defaultProduct="dore"
            heading="Start onboarding"
            subheading="No documents to upload — we reply by email within one business day."
          />
        </div>
      </LandingSection>
    </LandingApp>
  )
}

export default SellerOnboarding
