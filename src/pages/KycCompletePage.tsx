import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { ConfettiBurst } from '../components/kyc/ConfettiBurst'
import { useAuth } from '../auth/AuthContext'
import { hasKycSubmission } from '../lib/kycSession'

export function KycCompletePage() {
  const { isLoggedIn } = useAuth()
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
            We&apos;ve successfully received your KYC/KYB application
          </h1>
          <p className="kyc-complete-lead">
            Our compliance desk at AULM Trading has your submission. Next step: create your login
            (password only — your business details are already on file).
          </p>

          <div className="kyc-complete-actions">
            {isLoggedIn ? (
              <Link to="/bank" className="metal-page-btn metal-page-btn--primary">
                Go to dashboard
                <BtnArrow />
              </Link>
            ) : (
              <>
                <Link to="/register" className="metal-page-btn metal-page-btn--primary">
                  Create login
                  <BtnArrow />
                </Link>
                <Link to="/login" className="metal-page-btn metal-page-btn--secondary">
                  Log in
                </Link>
              </>
            )}
          </div>

          <p className="kyc-complete-note">
            Returning later? Use <strong>Log in</strong> with the same business email. Status shows as{' '}
            <strong>Under review</strong> in your dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
