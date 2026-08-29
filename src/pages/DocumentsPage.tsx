import {
  getDocumentsByCategory,
  type DocumentCategory,
} from '../data/documents'
import { ProcedureBoxLink, ProcedureScrollDown } from '../components/ProcedureBoxLink'
import { GoAmlBadge } from '../components/GoAmlBadge'
import { ProcedurePdfDownload } from '../components/ProcedurePdfDownload'
import { ProcedureLink } from '../components/ProcedureLink'
import { ScrollReveal } from '../components/ScrollReveal'
import { useHashScroll } from '../hooks/useHashScroll'
import { localizeDocument, usePageTitle, useT } from '../i18n'

const CATEGORIES: DocumentCategory[] = ['shipping-instructions', 'compliance']

export function ProcedurePage() {
  const { t } = useT()
  useHashScroll()
  usePageTitle(t.procedurePage.title)

  return (
    <div className="procedure-page">
      <section className="refinery-section refinery-section--intro procedure-intro">
        <div className="refinery-section-inner vault-body procedure-intro-inner">
          <p className="refinery-section-eyebrow">{t.procedurePage.eyebrow}</p>
          <h1 className="vault-body-title">{t.procedurePage.title}</h1>
          <p className="vault-body-lead">{t.procedurePage.lead}</p>
          <ProcedurePdfDownload />
          <ProcedureScrollDown />
        </div>
      </section>

      {CATEGORIES.map((category, index) => {
        const meta = t.procedureCategories[category]
        const docs = getDocumentsByCategory(category).map((doc) => localizeDocument(doc, t))
        const alt = index % 2 === 1
        const isShipping = category === 'shipping-instructions'

        return (
          <section
            key={category}
            id={category}
            className={`refinery-section${alt ? ' refinery-section--materials' : ' refinery-section--procedure'}${isShipping ? ' procedure-shipping-section' : ''}`}
          >
            <ScrollReveal className="refinery-section-inner company-services-wrap">
              <header className="vault-body refinery-section-head">
                <p className="refinery-section-eyebrow">{meta.label}</p>
                <h2 className="refinery-section-title">{meta.label}</h2>
                <p className="refinery-section-sub">{meta.description}</p>
              </header>

              {isShipping ? (
                <ul className="company-services-grid procedure-services-grid">
                  {docs.map((doc, i) => (
                    <ProcedureBoxLink
                      key={doc.slug}
                      to={`/company/procedure/${doc.slug}`}
                      index={i}
                    >
                      {doc.title}
                    </ProcedureBoxLink>
                  ))}
                </ul>
              ) : (
                <>
                  <GoAmlBadge />
                  <div className="procedure-links" role="list">
                    {docs.map((doc) => (
                      <ProcedureLink key={doc.slug} to={`/company/procedure/${doc.slug}`}>
                        {doc.title}
                      </ProcedureLink>
                    ))}
                  </div>
                </>
              )}
            </ScrollReveal>
          </section>
        )
      })}
    </div>
  )
}
