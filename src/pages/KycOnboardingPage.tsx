import { useEffect, useState } from 'react'
import { KycWizard } from '../components/kyc/KycWizard'

export function KycOnboardingPage() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={`kyc-page${entered ? ' is-entered' : ''}`}>
      <div className="kyc-page-overlay" aria-hidden />
      <div className="kyc-page-shell">
        <header className="kyc-page-header">
          <p className="kyc-page-eyebrow">Sell gold</p>
          <h1 className="kyc-page-title">Complete KYC</h1>
          <p className="kyc-page-lead">
            Verify your company once. After approval, you can sell gold to AULM. No dashboard —
            our desk contacts you.
          </p>
        </header>
        <KycWizard />
      </div>
    </div>
  )
}
