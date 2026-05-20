import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { LICENSE_NUMBER } from '../config/site'

const CHAIN = [
  { id: 'source', title: 'Sourcing', body: 'African and global corridors with OECD due diligence.' },
  { id: 'import', title: 'Import', body: 'Customs, DMCC docs, and Dubai intake.', to: '/gold-import-dubai' },
  { id: 'refine', title: 'Refining', body: '99.99% output with LBMA-aligned standards.', to: '/refinery-dubai' },
  { id: 'trade', title: 'Trade', body: 'Buy doré/scrap from sellers or sell LBMA bullion to qualified buyers.' },
  { id: 'logistics', title: 'Logistics', body: 'Insured movement and institutional settlement (TT / MT103).', wide: true },
]

function GoldSupplyChainDubai() {
  return (
    <LandingApp sticky={{ label: 'Supply chain inquiry', to: '/open-account' }}>
      <LandingHero label={`End-to-end · IFZA ${LICENSE_NUMBER}`} title="Gold Supply Chain Dubai" />

      <LandingSection
        title="One partner, full corridor"
        lead="Procurement through assay, refining, certification, and delivery — single audited paper trail."
      >
        <FeatureGrid columns={2} items={CHAIN} />
        <p className="landing-section__footer-links">
          <Link to="/sell-gold-dubai">Sell gold</Link>
          {' · '}
          <Link to="/buy-gold-dubai">Buy bullion</Link>
        </p>
      </LandingSection>
    </LandingApp>
  )
}

export default GoldSupplyChainDubai
