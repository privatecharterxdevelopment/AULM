import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PageHero } from '../components/PageHero'
import { AFRICA } from '../data/africa'
import { useHashScroll } from '../hooks/useHashScroll'
import { usePageTitle, useT } from '../i18n'

export function AfricaPage() {
  const { t } = useT()
  const a = t.africa
  useHashScroll()
  usePageTitle(a.title)

  return (
    <div className="africa-page">
      <PageHero
        image="/africa/africa-hero.jpg"
        imageAlt={a.heroAlt}
        imagePosition="center 22%"
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.common.company, to: '/company' },
        ]}
        eyebrow={a.eyebrow}
        title={a.title}
        bar={AFRICA.regions.map((region) => {
          const copy = a.regions[region.id]
          const status = 'status' in copy ? copy.status : undefined
          return {
            title: status ? `${copy.name} — ${status}` : copy.name,
            href: `#${region.id}`,
            cta: status ? t.common.noteArrow : t.common.readMoreArrow,
          }
        })}
      />

      <section className="expand-scroll-body africa-body" id="projects">
        <div className="africa-body-inner">
          <p className="africa-body-lead">{a.lead}</p>

          <div className="africa-region-grid">
            {AFRICA.regions.map((region) => {
              const copy = a.regions[region.id]
              const status = 'status' in copy ? copy.status : undefined
              return (
                <article
                  key={region.id}
                  id={region.id}
                  className={`africa-region${status ? ' is-soon' : ''}`}
                >
                  <p className="africa-region-kicker">{status ?? a.active}</p>
                  <h2>{copy.name}</h2>
                  <p>{copy.body}</p>
                </article>
              )
            })}
          </div>

          <figure className="africa-body-photo">
            <img src={AFRICA.photo} alt={a.photoAlt} />
          </figure>

          {a.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="africa-body-copy">
              {paragraph}
            </p>
          ))}

          <div className="africa-detail-grid">
            {a.sections.map((section) => (
              <section key={section.title} className="africa-detail">
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          <div className="vault-body-actions africa-body-actions">
            <Link to="/responsible-sourcing" className="metal-page-btn metal-page-btn--primary">
              {t.common.howWeSource}
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
