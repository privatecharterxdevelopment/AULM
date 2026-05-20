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
            heading="Open your file"
            subheading="5-step onboarding — company, trade mandate, license, declarations, then submit. No document upload in this step."
          />
        </div>
      </LandingSection>
    </LandingApp>
  )
}

export default SellerOnboarding
