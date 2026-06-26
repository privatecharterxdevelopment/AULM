import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { KycWizard } from '../components/kyc/KycWizard'
import { useAuth } from '../auth/AuthContext'

export function KycOnboardingPage() {
  const { isLoggedIn, loading } = useAuth()
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  if (!loading && isLoggedIn) {
    return <Navigate to="/bank" replace />
  }

  return (
    <div className={`kyc-page${entered ? ' is-entered' : ''}`}>
      <div className="kyc-page-overlay" aria-hidden />
      <div className="kyc-page-shell">
        <header className="kyc-page-header">
          <p className="kyc-page-eyebrow">Open account</p>
          <h1 className="kyc-page-title">Get started</h1>
          <p className="kyc-page-lead">
            Create your login, complete onboarding, and access your dashboard immediately.
          </p>
        </header>
        <KycWizard />
      </div>
    </div>
  )
}
