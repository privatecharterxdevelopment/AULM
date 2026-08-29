import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PageHero } from '../components/PageHero'
import { useHashScroll } from '../hooks/useHashScroll'
import { POLICY_SECTIONS, RESPONSIBLE_SOURCING_INTRO, SOURCING_PAGE } from '../data/responsibleSourcing'

const HIGHLIGHT_IDS = ['supply-chain', 'aml-cft', 'grievance'] as const

const HERO_BAR = [
  { title: 'OECD due diligence', href: '#oecd', cta: 'Read more →' },
  { title: 'Assay before purchase', href: '#assay', cta: 'Read more →' },
  { title: 'Chain of custody', href: '#custody', cta: 'Read more →' },
  { title: 'Grievance desk', href: '#grievance', cta: 'Read more →' },
] as const

const MEASURE_IDS = ['oecd', 'assay', 'custody', 'bank', 'grievance-measure'] as const

export function ResponsibleSourcingPage() {
  useHashScroll()

  useEffect(() => {
    document.title = 'AULM | Responsible sourcing'
    return () => {
      document.title = 'AULM | Precious metals desk'
    }
  }, [])

  const highlights = POLICY_SECTIONS.filter((section) =>
    HIGHLIGHT_IDS.includes(section.id as (typeof HIGHLIGHT_IDS)[number]),
  )

  return (
    <div className="africa-page">
      <PageHero
        image="/sourcing/responsible-sourcing.jpg"
        imageAlt="Inspected mine — origin before a price"
        imagePosition="center 35%"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company' },
        ]}
        eyebrow={SOURCING_PAGE.eyebrow}
        title={SOURCING_PAGE.title}
        bar={[...HERO_BAR]}
      />

      <section className="expand-scroll-body africa-body">
        <div className="africa-body-inner">
          <p className="africa-body-lead">{SOURCING_PAGE.lead}</p>
          <p className="africa-body-copy">{RESPONSIBLE_SOURCING_INTRO}</p>

          <div className="editorial-grid">
            {SOURCING_PAGE.measures.map((item, i) => (
              <section key={item.title} id={MEASURE_IDS[i]} className="sourcing-page-block">
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </section>
            ))}
            {highlights.map((section) => (
              <section key={section.id} id={section.id} className="sourcing-page-block">
                <h2>{section.title}</h2>
                {section.paragraphs.slice(0, 1).map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          <div className="vault-body-actions africa-body-actions">
            <Link to="/africa" className="metal-page-btn metal-page-btn--primary">
              On the ground
              <BtnArrow />
            </Link>
            <Link
              to="/company/procedure/supply-chain-due-diligence-policy"
              className="metal-page-btn metal-page-btn--secondary"
            >
              Due diligence policy
              <BtnArrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
