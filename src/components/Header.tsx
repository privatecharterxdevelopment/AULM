import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { LanguageDropdown } from './LanguageDropdown'

export function Header() {
  const { isLoggedIn, login, logout } = useAuth()

  return (
    <header className="header-wrap">
      <div className="header-pill">
        <Link to="/" className="header-logo" aria-label="AULM home">
          <img src="/aulm-logo.png" alt="AULM" width={76} height={76} />
        </Link>

        <div className="header-actions">
          <LanguageDropdown />
          {isLoggedIn ? (
            <button type="button" className="header-login" onClick={logout}>
              Log out
            </button>
          ) : (
            <button type="button" className="header-login" onClick={login}>
              Login
            </button>
          )}
          <a href="#open-account" className="header-cta">
            Open account
          </a>
        </div>
      </div>
    </header>
  )
}
