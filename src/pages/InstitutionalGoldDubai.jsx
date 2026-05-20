import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { LICENSE_NUMBER } from '../config/site'

const TERMS = [
  {
    id: 'buy',
    title: 'We buy',
    body: 'Doré and scrap at LBMA spot minus negotiated discount after assay.',
  },
  {
    id: 'sell',
    title: 'We sell',
    body: 'LBMA bullion only to qualified buyers — never raw gold.',
  },
  { id: 'min', title: 'Minimum', body: '500g refined gold equivalent per mandate.' },
  { id: 'settle', title: 'Settlement', body: 'TT / SWIFT MT103 between approved institutional accounts only.' },
]

function InstitutionalGoldDubai() {
  return (
    <LandingApp sticky={{ label: 'Open account', to: '/seller-onboarding' }}>
      <LandingHero label="Institutional desk · Dubai" title="Sell Gold Institutional" />

      <LandingSection
        title="B2B liquidity"
        lead="Discreet bids on allocated bars and qualified doré. Full assay, weight, and settlement documentation."
      >
        <FeatureGrid columns={2} items={TERMS} />
        <p className="landing-section__footer-links">
          <Link to="/open-account">Open account</Link>
          {' · '}
          <Link to="/refinery-dubai">Refinery Dubai</Link>
        </p>
      </LandingSection>
    </LandingApp>
  )
}

export default InstitutionalGoldDubai
