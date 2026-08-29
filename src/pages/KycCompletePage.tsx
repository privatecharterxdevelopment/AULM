import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { ConfettiBurst } from '../components/kyc/ConfettiBurst'
import { hasKycSubmission } from '../lib/kycSession'

export function KycCompletePage() {
  const [entered, setEntered] = useState(false)
  const kycSubmitted = hasKycSubmission()

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
          <h1 className="kyc-complete-title">
            We&apos;ve received your KYC/KYB application
          </h1>
          <p className="kyc-complete-lead">
            Our compliance desk is reviewing your file. Once approved, you can sell gold to AULM.
            We will contact you — there is no login or dashboard.
          </p>

          <div className="kyc-complete-actions">
            <Link to="/contact" className="metal-page-btn metal-page-btn--primary">
              Contact the desk
              <BtnArrow />
            </Link>
            <Link to="/" className="metal-page-btn metal-page-btn--secondary">
              Back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
