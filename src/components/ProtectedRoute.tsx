import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, loading } = useAuth()
  if (loading) {
    return (
      <div className="kyc-page">
        <div className="kyc-page-shell">
          <p className="kyc-wizard-lead">Loading…</p>
        </div>
      </div>
    )
  }
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return children
}
