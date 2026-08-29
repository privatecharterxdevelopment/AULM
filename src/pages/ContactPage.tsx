import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { isContactTopic, type ContactTopic } from '../data/contact'
import { COMPANY } from '../data/company'
import { CONTACT_EMAIL } from '../config/site'
import { usePageTitle, useT } from '../i18n'

export function ContactPage() {
  const { t } = useT()
  const [searchParams] = useSearchParams()
  const topicParam = searchParams.get('topic')
  const initialTopic: ContactTopic = isContactTopic(topicParam) ? topicParam : 'consulting'
  const isInvestment = initialTopic === 'investment'
  const [entered, setEntered] = useState(false)

  usePageTitle(t.nav.contact)

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={`contact-page${entered ? ' is-entered' : ''}`}>
      <div className="contact-page-inner">
        <aside className="contact-page-intro">
          <p className="contact-page-eyebrow">{t.contact.eyebrow}</p>
          <h1 className="contact-page-title">
            {isInvestment ? t.contact.investTitle : t.contact.title}
          </h1>
          <p className="contact-page-lead">
            {isInvestment ? t.contact.investLead : t.contact.lead}
          </p>

          <figure className="contact-page-photo">
            <img src={COMPANY.photo.src} alt={t.company.photoAlt} />
          </figure>

          <dl className="contact-page-desk">
            <div>
              <dt>{t.contact.email}</dt>
              <dd>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </dd>
            </div>
            <div>
              <dt>{t.contact.office}</dt>
              <dd>
                {COMPANY.address.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>{t.contact.hours}</dt>
              <dd>{t.company.hours}</dd>
            </div>
            <div>
              <dt>{t.contact.license}</dt>
              <dd>
                {t.company.licenseLine} {COMPANY.licenseNumber}
              </dd>
            </div>
          </dl>

          <p className="contact-page-note">{t.company.meetingNote}</p>
        </aside>

        <div className="contact-page-form-wrap">
          <ContactForm initialTopic={initialTopic} />
        </div>
      </div>
    </div>
  )
}
