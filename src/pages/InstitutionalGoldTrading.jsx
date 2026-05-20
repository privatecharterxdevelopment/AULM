import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { landingImages } from '../assets/landing/images'
import { LICENSE_NUMBER } from '../config/site'

const STEPS = [
  {
    id: 'fo',
    title: 'Family offices',
    text: 'Private wealth structures — discretion, full documentation, KYB.',
    image: landingImages.openAccount,
  },
  {
    id: 'traders',
    title: 'Commodity traders',
    text: 'Refineries and trading firms — doré, scrap, and bullion mandates.',
    image: landingImages.import,
  },
  {
    id: 'funds',
    title: 'Funds & accredited',
    text: 'Qualified purchasers — minimum ~500g, maximum ~250kg eq. / month post-assay.',
    image: landingImages.lbma,
  },
  {
    id: 'settle',
    title: 'Settlement',
    text: 'Bank-to-bank TT only — USD, EUR, CHF, or AED per approved mandate.',
    image: landingImages.payment,
  },
]

function InstitutionalGoldTrading() {
  return (
    <LandingApp sticky={{ label: 'Institutional inquiry', to: '/open-account' }}>
      <LandingHero label={`Institutional · IFZA ${LICENSE_NUMBER}`} title="Institutional Gold Trading" />

      <LandingSection lead="B2B only — not retail walk-ins. Full assay and settlement documentation.">
        <FeatureGrid items={STEPS} />
        <p className="landing-section__footer-links">
          <Link to="/sell-gold-dubai">Sell gold</Link>
          {' · '}
          <Link to="/buy-gold-dubai">Buy bullion</Link>
        </p>
      </LandingSection>
    </LandingApp>
  )
}

export default InstitutionalGoldTrading
