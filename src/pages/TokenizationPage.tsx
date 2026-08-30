import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PageHero } from '../components/PageHero'
import { usePageTitle, useT } from '../i18n'

export function TokenizationPage() {
  const { t } = useT()
  const tok = t.tokenization
  usePageTitle(tok.pageTitle, tok.lead)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="africa-page">
      <PageHero
        image="/tokenization/gold-tokenization.jpg"
        imageAlt={tok.heroAlt}
        imagePosition="center center"
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.common.company, to: '/company' },
        ]}
        eyebrow={tok.eyebrow}
        title={tok.title}
        bar={[
          { title: t.common.physicalGold, href: '/gold', cta: t.common.tradeArrow },
          { title: t.common.theDesk, href: '/company', cta: t.common.aboutArrow },
          { title: t.nav.procedure, href: '/company/procedure', cta: t.common.readMoreArrow },
          { title: t.nav.contact, href: '/contact', cta: t.common.writeArrow },
        ]}
      />

      <section className="expand-scroll-body africa-body">
        <div className="africa-body-inner">
          <p className="africa-body-lead">{tok.lead}</p>
          <p className="africa-body-copy">{tok.body}</p>

          <div className="vault-body-actions investors-contact-actions africa-body-actions">
            <Link to="/gold" className="metal-page-btn metal-page-btn--primary">
              {t.common.physicalGold}
              <BtnArrow />
            </Link>
            <Link to="/contact" className="metal-page-btn metal-page-btn--secondary">
              {t.nav.contact}
              <BtnArrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
