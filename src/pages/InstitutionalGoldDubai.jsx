import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { landingImages } from '../assets/landing/images'
import { LICENSE_NUMBER } from '../config/site'

const STEPS = [
  {
    id: 'onboard',
    title: 'Open file',
    text: 'Institutional seller onboarding — doré, scrap, or allocated bars.',
    image: landingImages.openAccount,
    to: '/seller-onboarding',
  },
  {
    id: 'assay',
    title: 'Assay & pricing',
    text: 'LBMA spot minus negotiated discount after fineness and weight confirmation.',
    image: landingImages.assay,
  },
  {
    id: 'lbma',
    title: 'LBMA / DGD bars',
    text: 'Bids on major refinery stamps — confidential B2B desk only.',
    image: landingImages.lbma,
  },
  {
    id: 'settle',
    title: 'Settlement',
    text: 'TT / SWIFT MT103 — minimum 500g refined equivalent per mandate.',
    image: landingImages.payment,
  },
]

function InstitutionalGoldDubai() {
  return (
    <LandingApp sticky={{ label: 'Start onboarding', to: '/seller-onboarding' }}>
      <LandingHero label="Institutional desk · Dubai" title="Sell Gold Institutional" />

      <LandingSection
        lead={
          <>
            Discreet B2B liquidity. IFZA License No. {LICENSE_NUMBER}. We buy raw gold; we sell bullion only.
          </>
        }
      >
        <FeatureGrid items={STEPS} />
        <p className="landing-section__footer-links">
          <Link to="/refinery-dubai">Refinery Dubai</Link>
        </p>
      </LandingSection>
    </LandingApp>
  )
}

export default InstitutionalGoldDubai
