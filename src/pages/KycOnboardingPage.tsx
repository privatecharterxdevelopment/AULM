import { useEffect, useState } from 'react'
import { KycWizard } from '../components/kyc/KycWizard'
import { usePageTitle, useT } from '../i18n'

export function KycOnboardingPage() {
  const { t } = useT()
  const [entered, setEntered] = useState(false)
  usePageTitle(t.kycPage.title)

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
          <p className="kyc-page-eyebrow">{t.kycPage.eyebrow}</p>
          <h1 className="kyc-page-title">{t.kycPage.title}</h1>
          <p className="kyc-page-lead">{t.kycPage.lead}</p>
        </header>
        <KycWizard />
      </div>
    </div>
  )
}
