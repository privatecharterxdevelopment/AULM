import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { LanguageDropdown } from './LanguageDropdown'

export function Header() {
  const { isLoggedIn, isAdmin, logout } = useAuth()

  return (
    <header className="header-wrap">
      <div className="header-pill">
        <Link to="/" className="header-logo" aria-label="AULM home">
          <img src="/aulm-logo.png" alt="AULM" width={76} height={76} />
        </Link>

        <div className="header-actions">
          <LanguageDropdown />
          {isLoggedIn ? (
            <>
              {isAdmin ? (
                <Link to="/admin" className="header-login">
                  Admin
                </Link>
              ) : null}
              <Link to="/bank" className="header-login">
                Dashboard
              </Link>
              <button type="button" className="header-login" onClick={() => void logout()}>
                Log out
              </button>
            </>
          ) : (
            <Link to="/login" className="header-login">
              Login
            </Link>
          )}
          <Link to={isLoggedIn ? '/bank' : '/onboarding'} className="header-cta">
            {isLoggedIn ? 'Dashboard' : 'Open account'}
          </Link>
        </div>
      </div>
    </header>
  )
}
