import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { landingImages } from '../assets/landing/images'
import { LICENSE_NUMBER, SITE_NAME } from '../config/site'

const STEPS = [
  {
    id: 'onboard',
    title: 'Open import file',
    text: 'Share corridor, origin, and volume — we open your B2B import mandate.',
    image: landingImages.openAccount,
    to: '/open-account',
  },
  {
    id: 'origin',
    title: 'Origin documentation',
    text: 'Export permits, COO, assay at origin, and OECD due diligence pack.',
    image: landingImages.assay,
  },
  {
    id: 'logistics',
    title: 'Logistics & customs',
    text: 'Air/secure courier, Dubai Customs, DMCC intake — CIF, FOB, CFR per mandate.',
    image: landingImages.import,
  },
  {
    id: 'refinery',
    title: 'Refinery or vault',
    text: 'Hand-off to refinery upgrade or allocated vault storage.',
    image: landingImages.refinery,
    to: '/refinery-dubai',
  },
]

function GoldImportDubai() {
  return (
    <LandingApp sticky={{ label: 'Open import file', to: '/open-account' }}>
      <LandingHero label={`Gold import Dubai · IFZA ${LICENSE_NUMBER}`} title="Gold Import Dubai" />

      <LandingSection
        lead={`${SITE_NAME} — documentation from origin export through UAE customs to refinery or vault.`}
      >
        <FeatureGrid items={STEPS} />
        <p className="landing-section__footer-links">
          <Link to="/sell-gold-dubai">Sell gold Dubai</Link>
        </p>
      </LandingSection>
    </LandingApp>
  )
}

export default GoldImportDubai
