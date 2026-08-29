import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PageHero } from '../components/PageHero'
import { AFRICA } from '../data/africa'
import { useHashScroll } from '../hooks/useHashScroll'

export function AfricaPage() {
  useHashScroll()

  useEffect(() => {
    document.title = 'AULM | On the ground'
    return () => {
      document.title = 'AULM | Precious metals desk'
    }
  }, [])

  return (
    <div className="africa-page">
      <PageHero
        image="/africa/africa-hero.jpg"
        imageAlt="AULM on site — operator in front of the excavator"
        imagePosition="center 22%"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company' },
        ]}
        eyebrow={AFRICA.eyebrow}
        title={AFRICA.title}
        bar={AFRICA.regions.map((region) => ({
          title: region.status ? `${region.name} — ${region.status}` : region.name,
          href: `#${region.id}`,
          cta: region.status ? 'Note →' : 'Read more →',
        }))}
      />

      <section className="expand-scroll-body africa-body" id="projects">
        <div className="africa-body-inner">
          <p className="africa-body-lead">{AFRICA.lead}</p>

          <div className="africa-region-grid">
            {AFRICA.regions.map((region) => (
              <article
                key={region.id}
                id={region.id}
                className={`africa-region${region.status ? ' is-soon' : ''}`}
              >
                <p className="africa-region-kicker">
                  {region.status ?? 'Active'}
                </p>
                <h2>{region.name}</h2>
                <p>{region.body}</p>
              </article>
            ))}
          </div>

          <figure className="africa-body-photo">
            <img src={AFRICA.photo} alt={AFRICA.photoAlt} />
          </figure>

          {AFRICA.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="africa-body-copy">
              {paragraph}
            </p>
          ))}

          <div className="africa-detail-grid">
            {AFRICA.sections.map((section) => (
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
              How we source
              <BtnArrow />
            </Link>
            <Link to="/contact" className="metal-page-btn metal-page-btn--secondary">
              Contact us
              <BtnArrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
