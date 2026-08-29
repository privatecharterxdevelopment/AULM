import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { COMPANY } from '../data/company'
import { CONTACT_EMAIL, LICENSE_NUMBER, SITE_NAME } from '../config/site'
import { usePageTitle, useT } from '../i18n'

type Props = {
  kind: 'legal' | 'privacy'
}

export function LegalPage({ kind }: Props) {
  const { t } = useT()
  const title = kind === 'privacy' ? t.legal.privacyTitle : t.legal.legalTitle
  usePageTitle(title)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [kind])

  return (
    <div className="africa-page">
      <PageHero
        image="/company/locations/switzerland.jpg"
        imageAlt={t.legal.heroAlt}
        imagePosition="center 35%"
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.common.company, to: '/company' },
        ]}
        eyebrow={t.legal.eyebrow}
        title={title}
        bar={[
          { title: t.legal.legalTitle, href: '/legal', cta: t.common.openArrow },
          { title: t.legal.privacyTitle, href: '/privacy', cta: t.common.openArrow },
          { title: t.nav.procedure, href: '/company/procedure', cta: t.common.readMoreArrow },
          { title: t.nav.contact, href: '/contact', cta: t.common.writeArrow },
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
  const { t, interpolate } = useT()

  return (
    <>
      <p className="vault-body-lead">{interpolate(t.legal.legalLead, { site: SITE_NAME })}</p>
      <p className="vault-body-copy">
        <strong>{COMPANY.name}</strong>
        <br />
        {t.company.licenseLine} {LICENSE_NUMBER}
        <br />
        {COMPANY.address.join(', ')}
        <br />
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        <br />
        {t.company.hours}
      </p>
      <p className="vault-body-copy">{t.legal.legalBody1}</p>
      <p className="vault-body-copy">{t.legal.legalBody2}</p>
      <p className="vault-body-copy">
        <Link to="/privacy">{t.legal.privacyTitle}</Link>
        {' · '}
        <Link to="/company/procedure">{t.nav.procedure}</Link>
        {' · '}
        <Link to="/contact">{t.nav.contact}</Link>
      </p>
    </>
  )
}

function PrivacyBody() {
  const { t, interpolate } = useT()
  const vars = {
    email: CONTACT_EMAIL,
    name: COMPANY.name,
    license: LICENSE_NUMBER,
    address: COMPANY.address.join(', '),
  }

  return (
    <>
      <p className="vault-body-lead">{t.legal.privacyLead}</p>
      <p className="vault-body-copy">{interpolate(t.legal.privacy1, vars)}</p>
      <p className="vault-body-copy">{t.legal.privacy2}</p>
      <p className="vault-body-copy">{t.legal.privacy3}</p>
      <p className="vault-body-copy">{interpolate(t.legal.privacy4, vars)}</p>
      <p className="vault-body-copy">{interpolate(t.legal.privacy5, vars)}</p>
    </>
  )
}
