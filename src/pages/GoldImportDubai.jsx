import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { LICENSE_NUMBER, SITE_NAME } from '../config/site'

const FEATURES = [
  { id: 'dmcc', title: 'DMCC & IFZA', body: `Licensed counterparty — License No. ${LICENSE_NUMBER}.` },
  { id: 'origin', title: 'Origin & OECD', body: 'Export permits, origin assay, and due diligence on every corridor.' },
  { id: 'standards', title: 'DGD standards', body: 'Coordination with Emirates Gold and Dubai Good Delivery requirements.' },
  { id: 'refine', title: 'Optional refinery', body: 'Upgrade to 99.99% before export or allocation.', to: '/refinery-dubai' },
]

function GoldImportDubai() {
  return (
    <LandingApp sticky={{ label: 'Open import file', to: '/open-account' }}>
      <LandingHero label={`Gold import Dubai · IFZA ${LICENSE_NUMBER}`} title="Gold Import Dubai" />

      <LandingSection
        title="Structured import into Dubai"
        lead={`${SITE_NAME} manages documentation from origin export through UAE customs, DMCC registration, and refinery or vault hand-off.`}
      >
        <FeatureGrid columns={2} items={FEATURES} />
        <p className="landing-section__footer-links">
          <Link to="/refinery-dubai">Refinery Dubai</Link>
          {' · '}
          <Link to="/sell-gold-dubai">Sell gold Dubai</Link>
        </p>
      </LandingSection>
    </LandingApp>
  )
}

export default GoldImportDubai
