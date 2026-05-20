import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid, FaqAccordion } from '../components/landing'
import { landingImages } from '../assets/landing/images'
import { LICENSE_NUMBER } from '../config/site'

const STEPS = [
  {
    id: 'account',
    title: 'Open account',
    text: 'Institutional onboarding — KYC/KYB before any bullion quote.',
    image: landingImages.openAccount,
    to: '/open-account',
  },
  {
    id: 'mandate',
    title: 'Mandate & quote',
    text: 'LBMA / DGD bullion quoted mandate-by-mandate for approved buyers.',
    image: landingImages.lbma,
  },
  {
    id: 'assay',
    title: 'Assay & allocation',
    text: 'Full weight, fineness, and settlement documentation on every lot.',
    image: landingImages.assay,
  },
  {
    id: 'delivery',
    title: 'Vault or export',
    text: 'Allocated delivery or export under agreed Incoterms and compliance file.',
    image: landingImages.import,
  },
  {
    id: 'payment',
    title: 'Bank-to-bank TT',
    text: 'Settlement via SWIFT MT103 between approved institutional accounts only.',
    image: landingImages.payment,
  },
]

const FAQ = [
  {
    id: 'dore',
    question: 'Can I buy doré or scrap from AULM?',
    answer: (
      <>
        No. We <strong>sell LBMA bullion only</strong>. Doré and scrap are purchase products — see{' '}
        <Link to="/sell-gold-dubai">sell gold Dubai</Link>.
      </>
    ),
  },
  {
    id: 'how',
    question: 'How do I buy gold bars as an institution?',
    answer: (
      <>
        Complete <Link to="/open-account">open account</Link>, pass KYC, and receive a mandate-specific quote.
      </>
    ),
  },
  {
    id: 'margin',
    question: 'Is this margin or paper gold?',
    answer: 'Physical, documented B2B flows — not retail leverage or anonymous cash deals.',
  },
]

function BuyGoldDubai() {
  return (
    <LandingApp sticky={{ label: 'Open account — buy bullion', to: '/open-account' }}>
      <LandingHero label="Buy gold Dubai · B2B only" title="Buy Gold in Dubai" />

      <LandingSection
        lead={
          <>
            We sell <strong>LBMA bullion only</strong> — not doré, scrap, or retail spot. IFZA License No.{' '}
            {LICENSE_NUMBER}.
          </>
        }
      >
        <FeatureGrid items={STEPS} />
      </LandingSection>

      <LandingSection variant="compact">
        <FaqAccordion title="FAQ" items={FAQ} />
      </LandingSection>
    </LandingApp>
  )
}

export default BuyGoldDubai
