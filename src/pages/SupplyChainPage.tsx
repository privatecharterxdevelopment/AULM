import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PageHero } from '../components/PageHero'
import { useHashScroll } from '../hooks/useHashScroll'
import { usePageTitle, useT } from '../i18n'

export function SupplyChainPage() {
  const { t } = useT()
  const s = t.supplyPage
  useHashScroll()
  usePageTitle(s.title)

  return (
    <div className="africa-page">
      <PageHero
        image="/logistics/supply-sea.jpg"
        imageAlt={s.heroAlt}
        imagePosition="center 40%"
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.common.company, to: '/company' },
        ]}
        eyebrow={s.eyebrow}
        title={s.title}
        bar={s.steps.map((step) => ({
          title: step.title,
          href: `#${step.n}`,
          cta: t.common.readMoreArrow,
        }))}
      />

      <section className="expand-scroll-body africa-body">
        <div className="africa-body-inner">
          <p className="africa-body-lead">{s.pageLead}</p>

          <div className="supply-steps">
            {s.steps.map((step) => (
              <article key={step.n} id={step.n} className="supply-step">
                <p className="supply-step-n">{step.n}</p>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </article>
            ))}
          </div>

          {s.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="africa-body-copy">
              {paragraph}
            </p>
          ))}

          <div className="vault-body-actions africa-body-actions">
            <Link
              to="/company/procedure/supply-chain-due-diligence-policy"
              className="metal-page-btn metal-page-btn--primary"
            >
              {t.common.dueDiligencePolicy}
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
