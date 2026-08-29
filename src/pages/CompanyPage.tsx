import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedLicenseNumber } from '../components/AnimatedLicenseNumber'
import { BtnArrow } from '../components/BtnArrow'
import { CompanyStoryBlock, ScrollReveal, revealIndex } from '../components/ScrollReveal'
import { COMPANY } from '../data/company'
import { useFrameExpand } from '../hooks/useFrameExpand'
import { useSyncHeaderOnDark } from '../lib/headerOnDark'
import { getCompanyPinPadding, getFrameStyle } from '../lib/frameExpand'

const LICENSE_AFTER = 1

export function CompanyPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const expand = useFrameExpand(heroRef)
  useSyncHeaderOnDark(heroRef, expand)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const beforeLicense = COMPANY.sections.slice(0, LICENSE_AFTER)
  const afterLicense = COMPANY.sections.slice(LICENSE_AFTER)

  return (
    <div className="expand-scroll-page editorial-page">
      <div ref={heroRef} className="expand-scroll-hero expand-scroll-hero--company">
        <div
          className={`expand-scroll-pin${expand >= 0.985 ? ' is-full' : ''}`}
          style={getCompanyPinPadding(expand)}
        >
          <div className="vault-frame company-frame" style={getFrameStyle(expand)}>
            <video
              className="vault-frame-image company-frame-video"
              src="/company/logo-video.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </div>

      <section className="expand-scroll-body company-story">
        <ScrollReveal variant="scale" className="company-story-panel">
          <div className="vault-body company-story-block editorial-inner">
            <h1 className="vault-body-title company-reveal-child" style={revealIndex(0)}>
              {COMPANY.name}
            </h1>
            <p className="vault-body-lead company-reveal-child" style={revealIndex(1)}>
              {COMPANY.lead}
            </p>
            {COMPANY.description.map((paragraph, i) => (
              <p
                key={i}
                className="vault-body-copy company-reveal-child"
                style={revealIndex(i + 2)}
              >
                {paragraph}
              </p>
            ))}
            <ul
              className="home-story-facts company-facts company-reveal-child"
              style={revealIndex(COMPANY.description.length + 2)}
            >
              {COMPANY.facts.map((fact) => (
                <li key={fact.label}>
                  <span>{fact.label}</span>
                  <strong>{fact.value}</strong>
                </li>
              ))}
            </ul>
            <figure
              className="company-story-photo company-reveal-child"
              style={revealIndex(COMPANY.description.length + 3)}
            >
              <img src={COMPANY.photo.src} alt={COMPANY.photo.alt} />
            </figure>
            <div
              className="vault-body-actions company-reveal-child"
              style={revealIndex(COMPANY.description.length + 4)}
            >
              <Link to="/onboarding" className="metal-page-btn metal-page-btn--primary">
                Complete KYC
                <BtnArrow />
              </Link>
              <Link to="/company/procedure" className="metal-page-btn metal-page-btn--secondary">
                See procedure
                <BtnArrow />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="up" className="company-story-panel company-services-panel">
          <div className="vault-body company-services-wrap editorial-inner">
            <h2 className="vault-body-title company-reveal-child" style={revealIndex(0)}>
              Services
            </h2>
            <p className="vault-body-lead company-reveal-child" style={revealIndex(1)}>
              {COMPANY.servicesLead}
            </p>
            <ul className="company-services-grid">
              {COMPANY.services.map((label, i) => (
                <li key={label} className="company-service-box" style={revealIndex(i + 2)}>
                  <span className="company-service-box-inner">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {beforeLicense.map((s, i) => (
          <CompanyStoryBlock
            key={s.title}
            title={s.title}
            body={s.body}
            badge={s.badge}
            locationsTitle={s.locationsTitle}
            locationMap={s.locationMap}
            index={i + 1}
          />
        ))}

        <ScrollReveal variant="blur" className="company-story-panel company-license-panel">
          <div className="vault-body company-license-inner company-story-block editorial-inner">
            <p className="company-license-label company-reveal-child" style={revealIndex(0)}>
              {COMPANY.licenseLabel}
            </p>
            <p className="company-license-line company-reveal-child" style={revealIndex(1)}>
              {COMPANY.licenseLine}
            </p>
            <div className="company-reveal-child" style={revealIndex(2)}>
              <AnimatedLicenseNumber value={COMPANY.licenseNumber} />
            </div>
            <p className="company-license-sub company-reveal-child" style={revealIndex(3)}>
              {COMPANY.licenseSub}
            </p>
          </div>
        </ScrollReveal>

        {afterLicense.map((s, i) => (
          <CompanyStoryBlock
            key={s.title}
            title={s.title}
            body={s.body}
            badge={s.badge}
            locationsTitle={s.locationsTitle}
            locationMap={s.locationMap}
            index={i + beforeLicense.length + 2}
          />
        ))}

      </section>

      <section className="expand-scroll-body company-appointment-section">
        <ScrollReveal variant="scale" className="company-appointment-wrap">
          <div className="company-appointment-inner company-story-block">
            <h2 className="company-appointment-title company-reveal-child" style={revealIndex(0)}>
              Get your appointment
            </h2>
            <p className="company-appointment-note company-reveal-child" style={revealIndex(1)}>
              {COMPANY.meetingNote}
            </p>

            <address className="company-address company-reveal-child" style={revealIndex(2)}>
              {COMPANY.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>

            <p className="company-contact-line company-reveal-child" style={revealIndex(3)}>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </p>
            <p className="company-hours company-reveal-child" style={revealIndex(4)}>
              {COMPANY.hours}
            </p>

            <div className="company-appointment-actions company-reveal-child" style={revealIndex(5)}>
              <a
                href="mailto:contact@aulmtrading.com?subject=AULM%20E-Meeting%20Request"
                className="metal-page-btn metal-page-btn--secondary"
              >
                Book e-meeting
                <BtnArrow />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
