import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AccountInquiryForm from '../components/AccountInquiryForm'
import SellerDocumentChecklist from '../components/SellerDocumentChecklist'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { LICENSE_NUMBER } from '../config/site'

const PRODUCTS = [
  { id: 'buy', title: 'We buy', body: 'Doré & scrap — documentation per shipment after approval.' },
  { id: 'sell', title: 'We sell', body: 'LBMA / DGD bullion — qualified buyers only.' },
  { id: 'terms', title: 'Terms', body: 'LBMA spot minus negotiated discount. Incoterms per mandate.', wide: true },
]

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
    <LandingApp sticky={{ label: 'Open account now', to: '#open-account', className: 'open-account-sticky-cta' }}>
      <LandingHero
        label={`Seller onboarding · IFZA ${LICENSE_NUMBER}`}
        title="Open account"
        minimal={false}
        lead={
          <>
            We buy <strong>doré &amp; scrap</strong> at LBMA-linked terms after assay. We sell <strong>LBMA bullion
            only</strong>. No document upload here — start with the form below. Settlement: <strong>TT (MT103)</strong>.
          </>
        }
      />

      <LandingSection className="open-account-form-first">
        <div className="landing-form-panel">
          <AccountInquiryForm
            defaultService="sell-gold-institutional"
            heading="Open your file"
            subheading="5-step onboarding — company, trade, license, declarations, then submit."
          />
        </div>
      </LandingSection>

      <LandingSection title="At a glance" variant="gray">
        <FeatureGrid columns={2} items={PRODUCTS} />
        <ul className="open-account-mini-rules landing-mini-rules">
          <li>Bank-to-bank only — SWIFT MT103 between approved accounts</li>
          <li>Refinery coordination — typically ~2–3 days after assay acceptance</li>
        </ul>
      </LandingSection>

      <LandingSection variant="compact">
        <details className="landing-faq__item landing-faq__item--solo">
          <summary>Seller document checklist (reference)</summary>
          <div className="landing-faq__answer">
            <SellerDocumentChecklist />
          </div>
        </details>
        <p className="landing-section__footer-links">
          Nothing to upload until we ask per shipment. Corporate KYC via{' '}
          <Link to="/kyconboarding">KYC/KYB onboarding</Link>.
        </p>
      </LandingSection>
    </LandingApp>
  )
}

export default OpenAccount
