import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { GoAmlBadge } from '../components/GoAmlBadge'
import { ProcedureLink } from '../components/ProcedureLink'
import { COMPLIANCE_EMAIL } from '../config/site'
import { DOCUMENT_CATEGORIES, getDocument } from '../data/documents'

export function ProcedureDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const doc = slug ? getDocument(slug) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!doc) return <Navigate to="/company/procedure" replace />

  const categoryLabel = DOCUMENT_CATEGORIES[doc.category].label
  const related = (doc.relatedSlugs ?? [])
    .map((s) => getDocument(s))
    .filter((d): d is NonNullable<ReturnType<typeof getDocument>> => d != null && d.slug !== doc.slug)

  return (
    <div className="expand-scroll-page procedure-detail-page">
      <section className="expand-scroll-body">
        <div className="vault-body procedure-detail-inner">
          <nav className="procedure-detail-nav" aria-label="Breadcrumb">
            <Link to="/company">Company</Link>
            <span aria-hidden> · </span>
            <Link to="/company/procedure">Procedure</Link>
            <span aria-hidden> · </span>
            <Link to={`/company/procedure#${doc.category}`}>{categoryLabel}</Link>
          </nav>

          <p className="refinery-section-eyebrow">{categoryLabel}</p>
          <h1 className="vault-body-title">{doc.title}</h1>
          <p className="vault-body-lead">{doc.summary}</p>

          {doc.category === 'compliance' ? <GoAmlBadge /> : null}

          <div className="procedure-detail-sections">
            {doc.sections.map((section, i) => (
              <section key={i} className="procedure-detail-block">
                {section.title ? (
                  <h2 className="procedure-detail-heading">{section.title}</h2>
                ) : null}
                {section.paragraphs?.map((p) => (
                  <p key={p.slice(0, 48)} className="vault-body-copy">
                    {p}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="procedure-detail-list">
                    {section.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <p className="vault-body-copy">
            Questions?{' '}
            <a href={`mailto:${COMPLIANCE_EMAIL}`} className="procedure-detail-email">
              {COMPLIANCE_EMAIL}
            </a>
          </p>

          {related.length > 0 ? (
            <div className="procedure-detail-related">
              <p className="refinery-section-eyebrow">Related</p>
              <div className="procedure-links procedure-links--inline">
                {related.map((r) => (
                  <ProcedureLink key={r.slug} to={`/company/procedure/${r.slug}`}>
                    {r.title}
                  </ProcedureLink>
                ))}
              </div>
            </div>
          ) : null}

          <div className="vault-body-actions">
            <Link to="/company/procedure" className="metal-page-btn metal-page-btn--primary">
              All procedures
              <BtnArrow />
            </Link>
            <Link to="/company" className="metal-page-btn metal-page-btn--secondary">
              Contact compliance
              <BtnArrow />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
