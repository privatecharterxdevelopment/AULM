import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { PasswordInput } from '../components/PasswordInput'
import { useAuth } from '../auth/AuthContext'
import { DEMO_EMAIL, DEMO_PASSWORD, isDemoLoginEnabled } from '../auth/demoAuth'

type Mode = 'login' | 'register'

export function AuthPage({ mode }: { mode: Mode }) {
  const { isLoggedIn, signIn, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  if (!loading && isLoggedIn) {
    return <Navigate to="/bank" replace />
  }

  if (mode === 'register') {
    return <Navigate to="/onboarding" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const result = await signIn(email, password)

    setSubmitting(false)
    if (result.error) {
      setError(result.error)
      return
    }
    navigate('/bank', { replace: true })
  }

  const handleDemoLogin = async () => {
    setError(null)
    setSubmitting(true)
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
    const result = await signIn(DEMO_EMAIL, DEMO_PASSWORD)
    setSubmitting(false)
    if (result.error) {
      setError(result.error)
      return
    }
    navigate('/bank', { replace: true })
  }

  const showDemoLogin = isDemoLoginEnabled()

  return (
    <div className={`kyc-page${entered ? ' is-entered' : ''}`}>
      <div className="kyc-page-overlay" aria-hidden />
      <div className="kyc-page-shell">
        <div className="kyc-wizard kyc-auth-card">
          <h1 className="kyc-wizard-title">Welcome back</h1>
          <p className="kyc-wizard-lead">Sign in with your business email and password.</p>

          <form className="kyc-auth-form" onSubmit={handleSubmit}>
            <div className="kyc-field">
              <label className="kyc-label" htmlFor="email">
                Business email *
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="kyc-field">
              <label className="kyc-label" htmlFor="password">
                Password *
              </label>
              <PasswordInput
                id="password"
                value={password}
                onChange={setPassword}
                required
                minLength={8}
                autoComplete="current-password"
              />
            </div>

            {error ? <p className="kyc-error">{error}</p> : null}

            <button
              type="submit"
              className="metal-page-btn metal-page-btn--primary kyc-auth-submit"
              disabled={submitting}
            >
              {submitting ? 'Please wait…' : 'Log in'}
              <BtnArrow />
            </button>
          </form>

          {showDemoLogin ? (
            <div className="kyc-auth-demo">
              <button
                type="button"
                className="metal-page-btn metal-page-btn--secondary kyc-auth-demo-btn"
                disabled={submitting}
                onClick={() => void handleDemoLogin()}
              >
                Enter demo dashboard
              </button>
              <p className="kyc-auth-demo-hint">
                Test login: <strong>{DEMO_EMAIL}</strong> · <strong>{DEMO_PASSWORD}</strong>
              </p>
            </div>
          ) : null}

          <p className="kyc-auth-switch">
            New to AULM? <Link to="/onboarding">Open account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
