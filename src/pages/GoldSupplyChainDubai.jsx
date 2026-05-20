import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'
import { landingImages } from '../assets/landing/images'
import { LICENSE_NUMBER } from '../config/site'

const STEPS = [
  {
    id: 'source',
    title: 'Sourcing',
    text: 'African and global corridors — OECD due diligence on origin.',
    image: landingImages.assay,
  },
  {
    id: 'import',
    title: 'Import Dubai',
    text: 'Customs, DMCC documentation, and secure intake.',
    image: landingImages.import,
    to: '/gold-import-dubai',
  },
  {
    id: 'refine',
    title: 'Refining',
    text: '99.99% output — LBMA-aligned standards, ~2–3 day turnaround.',
    image: landingImages.refinery,
    to: '/refinery-dubai',
  },
  {
    id: 'trade',
    title: 'Buy or sell',
    text: 'Purchase doré/scrap from sellers or supply LBMA bullion to qualified buyers.',
    image: landingImages.lbma,
    to: '/sell-gold-dubai',
  },
  {
    id: 'settle',
    title: 'Logistics & TT',
    text: 'Insured movement and bank-to-bank settlement (MT103).',
    image: landingImages.payment,
  },
]

function GoldSupplyChainDubai() {
  return (
    <LandingApp sticky={{ label: 'Supply chain inquiry', to: '/open-account' }}>
      <LandingHero label={`End-to-end · IFZA ${LICENSE_NUMBER}`} title="Gold Supply Chain Dubai" />

      <LandingSection lead="One partner from mine to vault — single audited paper trail.">
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

export default GoldSupplyChainDubai
