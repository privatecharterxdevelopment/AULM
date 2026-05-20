import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid, FaqAccordion } from '../components/landing'
import { LICENSE_NUMBER } from '../config/site'

const OFFER = [
  { id: 'lbma', title: 'LBMA / DGD bullion', body: 'Investment-grade bars with full assay and settlement documentation.' },
  { id: 'mandate', title: 'Mandate-by-mandate', body: 'Quotes at LBMA market standards for approved institutional buyers.' },
  { id: 'refinery', title: 'Refinery pairing', body: 'Optional recast or upgrade via our Dubai refinery desk.', to: '/refinery-dubai' },
  { id: 'license', title: `IFZA ${LICENSE_NUMBER}`, body: 'We buy raw gold from sellers — we only sell refined bullion to qualified buyers.' },
]

const FAQ = [
  {
    id: 'dore',
    question: 'Can I buy doré or scrap from AULM?',
    answer: (
      <>
        No. We <strong>sell LBMA bullion only</strong>. Doré and scrap are purchase products — we buy those from
        sellers, not sell them.
      </>
    ),
  },
  {
    id: 'how',
    question: 'How do I buy gold bars as an institution?',
    answer: (
      <>
        Complete <Link to="/open-account">open account</Link>, pass KYC, and receive a mandate-specific quote.
        Payment by TT (MT103) between approved accounts.
      </>
    ),
  },
  {
    id: 'margin',
    question: 'Is this margin or paper gold?',
    answer: 'Physical, documented B2B flows — not retail leverage or anonymous cash deals.',
  },
  {
    id: 'import',
    question: 'Import and refinery',
    answer: (
      <>
        See <Link to="/gold-import-dubai">gold import Dubai</Link>. Sellers of raw gold should use our{' '}
        <Link to="/sell-gold-dubai">sell gold</Link> desk.
      </>
    ),
  },
]

function BuyGoldDubai() {
  return (
    <LandingApp sticky={{ label: 'Open account — buy bullion', to: '/open-account' }}>
      <LandingHero label="Buy gold Dubai · B2B only" title="Buy Gold in Dubai" />

      <LandingSection
        title="LBMA bullion for institutions"
        lead="We sell investment-grade bullion only — not doré, scrap, or retail spot. Settlement via bank transfer (SWIFT MT103)."
      >
        <FeatureGrid columns={2} items={OFFER} />
      </LandingSection>

      <LandingSection variant="gray" title="Buy vs sell">
        <FeatureGrid
          columns={2}
          items={[
            {
              id: 'sell',
              title: 'Sell to us',
              body: 'Doré and scrap from producers and traders.',
              to: '/sell-gold-dubai',
              linkLabel: 'Sell gold Dubai →',
            },
            {
              id: 'buy',
              title: 'Buy from us',
              body: 'LBMA bullion only — this page. Mandate-by-mandate with full KYC.',
            },
          ]}
        />
      </LandingSection>

      <LandingSection variant="compact">
        <FaqAccordion title="FAQ" items={FAQ} />
      </LandingSection>
    </LandingApp>
  )
}

export default BuyGoldDubai
