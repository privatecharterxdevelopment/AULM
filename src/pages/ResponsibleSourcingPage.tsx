import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PageHero } from '../components/PageHero'
import { useHashScroll } from '../hooks/useHashScroll'
import { usePageTitle, useT } from '../i18n'

const HIGHLIGHT_IDS = ['supply-chain', 'aml-cft', 'grievance'] as const

const HERO_HREFS = ['#oecd', '#assay', '#custody', '#grievance'] as const

const MEASURE_IDS = ['oecd', 'assay', 'custody', 'bank', 'grievance-measure'] as const

export function ResponsibleSourcingPage() {
  const { t } = useT()
  const s = t.sourcingPage
  useHashScroll()
  usePageTitle(s.title)

  return (
    <div className="africa-page">
      <PageHero
        image="/sourcing/responsible-sourcing.jpg"
        imageAlt={s.heroAlt}
        imagePosition="center 35%"
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.common.company, to: '/company' },
        ]}
        eyebrow={s.eyebrow}
        title={s.title}
        bar={s.heroBar.map((item, i) => ({
          title: item.title,
          href: HERO_HREFS[i],
          cta: item.cta,
        }))}
      />

      <section className="expand-scroll-body africa-body">
        <div className="africa-body-inner">
          <p className="africa-body-lead">{s.lead}</p>
          <p className="africa-body-copy">{s.intro}</p>

          <div className="editorial-grid">
            {s.measures.map((item, i) => (
              <section key={item.title} id={MEASURE_IDS[i]} className="sourcing-page-block">
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </section>
            ))}
            {HIGHLIGHT_IDS.map((id) => {
              const section = s.policy[id]
              return (
                <section key={id} id={id} className="sourcing-page-block">
                  <h2>{section.title}</h2>
                  {section.paragraphs.slice(0, 1).map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </section>
              )
            })}
          </div>

          <div className="vault-body-actions africa-body-actions">
            <Link to="/africa" className="metal-page-btn metal-page-btn--primary">
              {t.common.onTheGround}
              <BtnArrow />
            </Link>
            <Link
              to="/company/procedure/supply-chain-due-diligence-policy"
              className="metal-page-btn metal-page-btn--secondary"
            >
              {t.common.dueDiligencePolicy}
              <BtnArrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
