import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FaqAccordion, ProcessStepsGrid } from '../components/landing'
import { landingImages } from '../assets/landing/images'
import { LICENSE_NUMBER } from '../config/site'

const STEPS = [
  {
    id: 'account',
    title: 'Open account',
    text: 'Share company details and product (doré or scrap). No upload at signup.',
    image: landingImages.openAccount,
    to: '/seller-onboarding',
  },
  {
    id: 'import',
    title: 'Import',
    text: 'DMCC-compliant intake into Dubai — customs, routing, and refinery hand-off.',
    image: landingImages.import,
    to: '/gold-import-dubai',
  },
  {
    id: 'lbma',
    title: 'LBMA-linked pricing',
    text: 'Purchase at LBMA spot minus a negotiated discount after fineness and weight are confirmed.',
    image: landingImages.lbma,
  },
  {
    id: 'assay',
    title: 'Independent assay report',
    text: 'Third-party laboratory assay before pricing — full fineness and weight documentation.',
    image: landingImages.assay,
  },
  {
    id: 'payment',
    title: 'Bank-to-bank TT',
    text: 'Settlement by telegraphic transfer (SWIFT MT103) between approved institutional accounts only.',
    image: landingImages.payment,
  },
]

const FAQ = [
  {
    id: 'who',
    question: 'Who can sell to AULM?',
    answer:
      'Miners, exporters, refineries, and commodity traders with full documentation — minimum ~500g equivalent per mandate.',
  },
  {
    id: 'cash',
    question: 'Cash over the counter?',
    answer: 'No retail counter. B2B only with KYC/AML and OECD due diligence.',
  },
  {
    id: 'africa',
    question: 'Sell from Africa?',
    answer: (
      <>
        See <Link to="/gold-import-dubai">gold import Dubai</Link> for export and intake requirements.
      </>
    ),
  },
]

function SellGoldDubai() {
  return (
    <LandingApp sticky={{ label: 'Ready to sell gold?', to: '/seller-onboarding' }}>
      <LandingHero label="Sell gold Dubai · B2B only" title="Sell Gold in Dubai" />

      <LandingSection>
        <ProcessStepsGrid
          lead={
            <>
              Institutional buyer for <strong>doré &amp; scrap</strong> — not retail cash-for-gold. IFZA License No.{' '}
              {LICENSE_NUMBER}.
            </>
          }
          steps={STEPS}
        />
      </LandingSection>

      <LandingSection variant="compact">
        <FaqAccordion title="Quick answers" items={FAQ} />
      </LandingSection>
    </LandingApp>
  )
}

export default SellGoldDubai
