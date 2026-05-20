import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid } from '../components/landing'

const FEATURES = [
  {
    id: 'backing',
    title: '1:1 physical backing',
    body: 'Tokens backed by LBMA-certified gold in DMCC-approved vaults — segregated reserves, audit trail.',
  },
  {
    id: 'institutional',
    title: 'Institutional focus',
    body: 'For qualified buyers and funds under Swiss and UAE digital-asset frameworks — not retail.',
  },
  {
    id: 'status',
    title: 'In development',
    body: 'Infrastructure is being built with AULM’s existing import, refinery, and custody desk.',
  },
  {
    id: 'redemption',
    title: 'Redemption path',
    body: 'On-chain positions with a defined route to physical bars when thresholds are met.',
  },
]

function Tokenization() {
  return (
    <LandingApp sticky={{ label: 'Get more information', to: '/contact?topic=tokenization' }}>
      <LandingHero
        label="Digital assets · In development"
        title="Gold Tokenization"
        minimal={false}
        lead="Bridging physical LBMA gold with regulated digital representation — fractional ownership, on-chain transparency, vault-backed reserves."
      />

      <LandingSection title="What we are building">
        <FeatureGrid columns={2} items={FEATURES} />
        <div className="landing-cta-row">
          <Link to="/contact?topic=tokenization" className="btn btn-primary">
            Get more information
          </Link>
          <Link to="/news/gold-tokenization-blockchain" className="landing-feature-card__link">
            Read insight →
          </Link>
        </div>
      </LandingSection>
    </LandingApp>
  )
}

export default Tokenization
