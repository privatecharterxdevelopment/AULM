import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { LICENSE_NUMBER } from '../config/site'

const PARTNERS = [
  { id: 'fo', title: 'Family offices', body: 'Private wealth and holding structures with full KYB.' },
  { id: 'ct', title: 'Commodity traders', body: 'Refineries and trading firms — doré, scrap, and bullion mandates.' },
  { id: 'funds', title: 'Funds & accredited', body: 'Qualified purchasers subject to compliance approval.' },
  { id: 'volume', title: 'Typical volume', body: '~500g to 250kg equivalent per month per client, post-assay.' },
]

function InstitutionalGoldTrading() {
  return (
    <LandingApp sticky={{ label: 'Institutional inquiry', to: '/open-account' }}>
      <LandingHero label={`Institutional · IFZA ${LICENSE_NUMBER}`} title="Institutional Gold Trading" />

      <LandingSection
        title="Who we serve"
        lead="Serious institutional gold trading — not retail walk-ins. Discretion with full documentation."
      >
        <FeatureGrid columns={2} items={PARTNERS} />
        <p className="landing-section__footer-links">
          <Link to="/sell-gold-dubai">Sell gold</Link>
          {' · '}
          <Link to="/buy-gold-dubai">Buy bullion</Link>
          {' · '}
          <Link to="/about">About AULM</Link>
        </p>
      </LandingSection>
    </LandingApp>
  )
}

export default InstitutionalGoldTrading
