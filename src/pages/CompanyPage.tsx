import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AnimatedLicenseNumber } from '../components/AnimatedLicenseNumber'
import { BtnArrow } from '../components/BtnArrow'
import { CompanyStoryBlock, ScrollReveal, revealIndex } from '../components/ScrollReveal'
import { COMPANY } from '../data/company'
import { useFrameExpand } from '../hooks/useFrameExpand'
import { getCompanyPinPadding, getFrameStyle } from '../lib/frameExpand'

const LICENSE_AFTER = 2

export function CompanyPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const expand = useFrameExpand(heroRef)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const beforeLicense = COMPANY.sections.slice(0, LICENSE_AFTER)
  const afterLicense = COMPANY.sections.slice(LICENSE_AFTER)

  return (
    <div className="expand-scroll-page">
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
          <div className="vault-body company-story-block">
            <h1 className="vault-body-title company-reveal-child" style={revealIndex(0)}>
              {COMPANY.name}
            </h1>
            <p className="vault-body-lead company-reveal-child" style={revealIndex(1)}>
              Sell gold Dubai — we buy doré and scrap at LBMA-linked terms. Buy gold Dubai — LBMA
              bullion for institutions only.
            </p>
            <p className="vault-body-copy company-reveal-child" style={revealIndex(2)}>
              B2B precious metals and commodities with full OECD, LBMA and UAE compliance — from
              origination in Africa to LBMA-certified refining and global delivery.
            </p>
          </div>
        </ScrollReveal>

        {beforeLicense.map((s, i) => (
          <CompanyStoryBlock key={s.title} title={s.title} body={s.body} index={i + 1} />
        ))}

        <ScrollReveal variant="blur" className="company-story-panel company-license-panel">
          <div className="vault-body company-license-inner company-story-block">
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
            index={i + beforeLicense.length + 2}
          />
        ))}

        <ScrollReveal variant="up" className="company-story-panel company-services-panel">
          <div className="vault-body company-services-wrap">
            <h2 className="vault-body-title company-reveal-child" style={revealIndex(0)}>
              Services
            </h2>
            <p className="vault-body-lead company-reveal-child" style={revealIndex(1)}>
              End-to-end desk capabilities for institutional precious metals and commodities.
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

            <p className="vault-body-copy company-reveal-child" style={revealIndex(5)}>
              <Link to="/company/procedure" className="company-procedure-link">
                Shipping &amp; compliance procedures →
              </Link>
            </p>
            <div className="company-appointment-actions company-reveal-child" style={revealIndex(6)}>
              <a
                href="mailto:contact@aulmtrading.com?subject=AULM%20E-Meeting%20Request"
                className="metal-page-btn metal-page-btn--primary"
              >
                Book e-meeting
                <BtnArrow />
              </a>
              <Link to="/gold" className="metal-page-btn metal-page-btn--secondary">
                Start verification
                <BtnArrow />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
