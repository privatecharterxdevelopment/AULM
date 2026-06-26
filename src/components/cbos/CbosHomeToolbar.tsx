import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { DEMO_CONTACTS } from '../../cbos/mocks/demoData'
import { CbosHeaderActions } from './CbosHeaderActions'
import { CbosStripQuickIcons } from './CbosStripQuickIcons'
import { IconMenu } from './icons'
import type { CbosContact } from '../../cbos/types'

type Props = {
  contacts?: CbosContact[]
  onMenuClick?: () => void
}

const VISIBLE = 5

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function contactPhoto(c: CbosContact): string {
  return c.photoUrl ?? `https://i.pravatar.cc/96?u=${encodeURIComponent(c.id)}`
}

export function CbosHomeToolbar({ contacts = DEMO_CONTACTS, onMenuClick }: Props) {
  const { profile } = useAuth()
  const firstName = profile?.full_name?.split(' ')[0] ?? 'there'
  const shown = contacts.slice(0, VISIBLE)
  const overflow = contacts.length - VISIBLE

  return (
    <header className="cbos-bank-strip">
      <div className="cbos-bank-strip__left">
        {onMenuClick ? (
          <button type="button" className="cbos-bank-strip__menu" onClick={onMenuClick} aria-label="Open menu">
            <IconMenu />
          </button>
        ) : null}
        <h1 className="cbos-bank-strip__greet">
          {greeting()}, <span>{firstName}</span>
        </h1>
      </div>

      <div className="cbos-bank-strip__right">
        <div className="cbos-bank-strip__faces" aria-label="Quick payees">
          {shown.map((c, i) => (
            <Link
              key={c.id}
              to={`/bank/send?to=${encodeURIComponent(c.name)}`}
              className="cbos-bank-strip__face"
              style={{ zIndex: VISIBLE - i }}
              title={c.name}
            >
              <img src={contactPhoto(c)} alt="" loading="lazy" draggable={false} />
            </Link>
          ))}
          {overflow > 0 ? (
            <Link to="/bank/send" className="cbos-bank-strip__face cbos-bank-strip__face--more" style={{ zIndex: 0 }}>
              +{overflow}
            </Link>
          ) : null}
          <Link
            to="/bank/send"
            className="cbos-bank-strip__face cbos-bank-strip__face--add"
            style={{ zIndex: 0 }}
            title="Add payee"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </Link>
        </div>

        <span className="cbos-bank-strip__divider" aria-hidden />

        <CbosStripQuickIcons />

        <span className="cbos-bank-strip__divider" aria-hidden />

        <CbosHeaderActions className="cbos-header-actions--strip" />
      </div>
    </header>
  )
}
