import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { COMPANY } from '../data/company'
import { CONTACT_EMAIL, LICENSE_NUMBER, SITE_NAME } from '../config/site'

type Props = {
  kind: 'legal' | 'privacy'
}

export function LegalPage({ kind }: Props) {
  const title = kind === 'privacy' ? 'Privacy' : 'Legal notice'

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `AULM | ${title}`
    return () => {
      document.title = 'AULM | Precious metals desk'
    }
  }, [title])

  return (
    <div className="africa-page">
      <PageHero
        image="/company/locations/switzerland.jpg"
        imageAlt="Switzerland"
        imagePosition="center 35%"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company' },
        ]}
        eyebrow="Company"
        title={title}
        bar={[
          { title: 'Legal notice', href: '/legal', cta: 'Open →' },
          { title: 'Privacy', href: '/privacy', cta: 'Open →' },
          { title: 'Procedure', href: '/company/procedure', cta: 'Read more →' },
          { title: 'Contact us', href: '/contact', cta: 'Write →' },
        ]}
      />

      <section className="expand-scroll-body africa-body">
        <div className="africa-body-inner">
          {kind === 'legal' ? <LegalBody /> : <PrivacyBody />}
        </div>
      </section>
    </div>
  )
}

function LegalBody() {
  return (
    <>
      <p className="vault-body-lead">
        {SITE_NAME} is an IFZA-licensed B2B precious metals desk in Dubai. This site is not an
        offer to the public.
      </p>
      <p className="vault-body-copy">
        <strong>{COMPANY.name}</strong>
        <br />
        IFZA License No. {LICENSE_NUMBER}
        <br />
        {COMPANY.address.join(', ')}
        <br />
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <br />
        {COMPANY.hours}
      </p>
      <p className="vault-body-copy">
        The website is published in English for institutional counterparties. Nothing here is
        investment advice, a public offering, or a commitment to transact. Every mandate requires
        KYC/KYB, an e-meeting and written desk acceptance.
      </p>
      <p className="vault-body-copy">
        Settlement is bank-to-bank between approved accounts. We do not accept cash, crypto or
        third-party payment agents on the public desk.
      </p>
      <p className="vault-body-copy">
        <Link to="/privacy">Privacy</Link>
        {' · '}
        <Link to="/company/procedure">Procedure</Link>
        {' · '}
        <Link to="/contact">Contact us</Link>
      </p>
    </>
  )
}

function PrivacyBody() {
  return (
    <>
      <p className="vault-body-lead">
        We collect what the desk needs to reply and, if we take the conversation forward, to run
        KYC/KYB. We do not sell personal data.
      </p>
      <p className="vault-body-copy">
        Contact, request and newsletter forms store the work email you submit — plus name, company,
        phone and message where those fields exist. Onboarding collects identity and company
        documents required under UAE AML rules. Operator mail is {CONTACT_EMAIL}.
      </p>
      <p className="vault-body-copy">
        Data is used to answer inquiries, complete onboarding, settle accepted mandates and meet
        legal retention duties. It may be shared with banks, vaults, refiners and counsel only as
        required for a mandate, and with authorities where the law requires it.
      </p>
      <p className="vault-body-copy">
        Session storage on this site remembers whether the contact widget was closed. We do not run
        advertising trackers on the public pages.
      </p>
      <p className="vault-body-copy">
        To access, correct or delete inquiry data, write to {CONTACT_EMAIL}. KYC files follow
        statutory retention and cannot always be deleted on request.
      </p>
      <p className="vault-body-copy">
        Controller: {COMPANY.name}, IFZA License No. {LICENSE_NUMBER}, {COMPANY.address.join(', ')}.
      </p>
    </>
  )
}
