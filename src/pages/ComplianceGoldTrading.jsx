import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { LICENSE_NUMBER } from '../config/site'

const PILLARS = [
  { id: 'oecd', title: 'OECD due diligence', body: 'Responsible supply chain guidance on every doré and scrap purchase.' },
  { id: 'lbma', title: 'LBMA alignment', body: 'Good Delivery and responsible sourcing standards for bullion flows.' },
  { id: 'uae', title: 'UAE AML/CFT', body: 'Federal Decree-Law No. 20 of 2018 — full KYC/KYB and UBO disclosure.' },
  { id: 'settle', title: 'Bank-to-bank only', body: 'SWIFT MT103 between approved accounts — no cash, no crypto.' },
]

function ComplianceGoldTrading() {
  return (
    <LandingApp sticky={{ label: 'Open account', to: '/open-account' }}>
      <LandingHero
        label={`Compliance · IFZA ${LICENSE_NUMBER}`}
        title="Gold Trading Compliance"
      />

      <LandingSection
        title="Compliance-first desk"
        lead="Transparent institutional trading — OECD supply chain, LBMA sourcing, UAE AML, and auditable documentation on every mandate."
      >
        <FeatureGrid columns={2} items={PILLARS} />
        <p className="landing-section__footer-links">
          <Link to="/kyconboarding">KYC/KYB onboarding</Link>
          {' · '}
          <Link to="/open-account">Open account</Link>
        </p>
      </LandingSection>
    </LandingApp>
  )
}

export default ComplianceGoldTrading
