import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { ConfettiBurst } from '../components/kyc/ConfettiBurst'
import { getKycPrefill, hasKycSubmission } from '../lib/kycSession'
import { usePageTitle, useT } from '../i18n'

export function KycCompletePage() {
  const { t, interpolate } = useT()
  const [entered, setEntered] = useState(false)
  const kycSubmitted = hasKycSubmission()
  const email = getKycPrefill()?.email
  usePageTitle(t.kycPage.completeTitle)

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  if (!kycSubmitted) {
    return <Navigate to="/onboarding" replace />
  }

  return (
    <div className={`kyc-page kyc-page--complete${entered ? ' is-entered' : ''}`}>
      <ConfettiBurst />
      <div className="kyc-page-overlay" aria-hidden />

      <div className="kyc-page-shell kyc-page-shell--complete">
        <div className="kyc-complete">
          <div className="kyc-complete-icon" aria-hidden>
            ✓
          </div>
          <h1 className="kyc-complete-title">{t.kycPage.completeTitle}</h1>
          <p className="kyc-complete-lead">
            {t.kycPage.completeLead}
            {email ? ` ${interpolate(t.kycPage.completeCopy, { email })}` : ''}
          </p>

          <div className="kyc-complete-actions">
            <Link to="/contact" className="metal-page-btn metal-page-btn--primary">
              {t.common.contactTheDesk}
              <BtnArrow />
            </Link>
            <Link to="/" className="metal-page-btn metal-page-btn--secondary">
              {t.common.backHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
