import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { formatDeskDate } from '../../cbos/lib/format'
import { IconBell } from './icons'

type Props = {
  unread?: number
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export function CbosTopbar({ unread = 0 }: Props) {
  const { profile } = useAuth()
  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'

  return (
    <header className="cbos-topbar">
      <div className="cbos-topbar-left">
        <h1 className="cbos-topbar-greeting">
          {greeting()}, {firstName}
        </h1>
        <p className="cbos-topbar-date">{formatDeskDate()}</p>
      </div>

      <div className="cbos-topbar-actions">
        <Link to="/bank/cards" className="cbos-topbar-btn cbos-topbar-btn--solid">
          + Add card
        </Link>
        <Link to="/bank/cards" className="cbos-topbar-btn cbos-topbar-btn--ghost">
          Order a card
        </Link>
        <button type="button" className="cbos-topbar-icon" aria-label="Messages">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
        <button type="button" className="cbos-topbar-icon" aria-label="Notifications">
          <IconBell />
          {unread > 0 ? <span className="cbos-topbar-badge">{unread}</span> : null}
        </button>
        <span className="cbos-topbar-avatar" aria-hidden>
          {firstName.charAt(0).toUpperCase()}
        </span>
      </div>
    </header>
  )
}
