import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LandingApp, LandingHero, LandingSection, FeatureGrid, FaqAccordion } from '../components/landing'
import { landingImages } from '../assets/landing/images'
import { LICENSE_NUMBER, SITE_NAME, SITE_URL } from '../config/site'

const STEPS = [
  {
    id: 'onboard',
    title: 'Open account',
    text: 'Share mandate, volume, and product form (doré, scrap, or bar recast).',
    image: landingImages.openAccount,
    to: '/open-account',
  },
  {
    id: 'assay',
    title: 'Assay & intake',
    text: 'Third-party fineness and weight before refining acceptance.',
    image: landingImages.assay,
  },
  {
    id: 'refine',
    title: 'Refining',
    text: 'Miller chlorination and electrolytic process to 99.99% purity.',
    image: landingImages.refinery,
  },
  {
    id: 'bars',
    title: 'LBMA-stamped bars',
    text: '~1,800 USD per bar (volume-dependent) — certified output after assay.',
    image: landingImages.lbma,
  },
  {
    id: 'deliver',
    title: 'Delivery',
    text: 'Insured vaulting or export — typically ~2–3 days after acceptance.',
    image: landingImages.payment,
  },
]

const FAQ = [
  {
    id: 'who',
    question: 'Who can open an account?',
    answer: 'Licensed traders, refineries, family offices, and corporate treasuries with completed KYC/AML.',
  },
  {
    id: 'turnaround',
    question: 'Refinery turnaround?',
    answer: 'Typically 2–3 days from assay acceptance to certified bar delivery.',
  },
  {
    id: 'payment',
    question: 'Settlement?',
    answer: 'Bank-to-bank only — TT / SWIFT MT103.',
  },
  {
    id: 'africa',
    question: 'African doré routes?',
    answer: (
      <>
        Yes — see <Link to="/gold-import-dubai">gold import Dubai</Link> for origin and export requirements.
      </>
    ),
  },
]

function RefineryDubai() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Refinery Services Dubai',
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      areaServed: { '@type': 'City', name: 'Dubai' },
      description:
        'LBMA-aligned gold refining, gold import Dubai, and institutional gold sales for qualified B2B clients.',
      serviceType: 'Precious metals refining and trading',
    }
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.dataset.aulmSchema = 'refinery'
    el.textContent = JSON.stringify(schema)
    document.head.appendChild(el)
    return () => el.remove()
  }, [])

  return (
    <LandingApp sticky={{ label: 'Open account', to: '/open-account' }}>
      <LandingHero label={`Refinery Dubai · IFZA ${LICENSE_NUMBER}`} title="Refinery Services Dubai" />

      <LandingSection
        lead="Doré and scrap to investment-grade bars — Emirates Gold, Valcambi, and DGD-aligned standards."
      >
        <FeatureGrid items={STEPS} />
      </LandingSection>

      <LandingSection variant="compact">
        <FaqAccordion title="FAQ" items={FAQ} />
      </LandingSection>
    </LandingApp>
  )
}

export default RefineryDubai
