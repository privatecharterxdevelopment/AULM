import { Link } from 'react-router-dom'
import KycOnboardingForm from '../components/KycOnboardingForm'
import { LICENSE_NUMBER } from '../config/site'

export default function KYCOnboarding() {
  return (
    <>
      <section className="page-header refinery-hero">
        <div className="container">
          <span className="label">Compliance · IFZA {LICENSE_NUMBER}</span>
          <h1>KYC / KYB onboarding</h1>
          <p>
            Corporate due diligence for approved B2B mandates — ultimate beneficial owners (UBO), business
            activity, and AML controls. Complete after your{' '}
            <Link to="/open-account">open account</Link> inquiry is accepted.
          </p>
        </div>
      </section>

      <section className="refinery-form-section kyc-page-section">
        <div className="container">
          <KycOnboardingForm />
        </div>
      </section>
    </>
  )
}
