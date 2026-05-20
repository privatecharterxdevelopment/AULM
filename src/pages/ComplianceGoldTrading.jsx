import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { landingImages } from '../assets/landing/images'
import { LICENSE_NUMBER } from '../config/site'

const STEPS = [
  {
    id: 'oecd',
    title: 'OECD due diligence',
    text: 'Responsible supply chain on every doré and scrap purchase — not a separate product.',
    image: landingImages.assay,
  },
  {
    id: 'lbma',
    title: 'LBMA standards',
    text: 'Good Delivery and responsible sourcing alignment for bullion flows.',
    image: landingImages.lbma,
  },
  {
    id: 'uae',
    title: 'UAE AML / KYC',
    text: 'Federal AML/CFT, full KYB, and UBO disclosure on every counterparty.',
    image: landingImages.openAccount,
    to: '/kyconboarding',
    linkLabel: 'KYC/KYB onboarding →',
  },
  {
    id: 'settle',
    title: 'Bank-to-bank only',
    text: 'SWIFT MT103 between approved accounts — no cash, crypto, or third-party payers.',
    image: landingImages.payment,
  },
]

function ComplianceGoldTrading() {
  return (
    <LandingApp sticky={{ label: 'KYC/KYB onboarding', to: '/kyconboarding' }}>
      <LandingHero label={`Trading standards · IFZA ${LICENSE_NUMBER}`} title="How AULM trades" />

      <LandingSection lead="How every mandate runs — not a sales desk. To trade gold, open a seller or buyer file separately.">
        <FeatureGrid items={STEPS} />
        <p className="landing-section__footer-links">
          <Link to="/open-account">Open trading account</Link>
          {' · '}
          <Link to="/sell-gold-dubai">Sell gold</Link>
        </p>
      </LandingSection>
    </LandingApp>
  )
}

export default ComplianceGoldTrading
