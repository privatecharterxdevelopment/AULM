import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { DEMO_CONTACTS } from '../../cbos/mocks/demoData'
import type { CbosContact } from '../../cbos/types'

type Props = {
  contacts?: CbosContact[]
}

export function CbosFastActions({ contacts = DEMO_CONTACTS }: Props) {
  return (
    <section className="cbos-bank-panel" aria-label="Send to contact">
      <header className="cbos-bank-panel__head">
        <h2>Send to</h2>
        <Link to="/bank/transfers">New payment</Link>
      </header>
      <div className="cbos-bank-contacts">
        {contacts.map((c) => (
          <Link
            key={c.id}
            to={`/bank/transfers?to=${encodeURIComponent(c.name)}`}
            className="cbos-bank-contact"
            title={`Send to ${c.name}`}
          >
            <span
              className="cbos-bank-contact__avatar"
              style={{ '--accent': c.accent ?? '#3d3d3d' } as CSSProperties}
              aria-hidden
            >
              {c.initials}
            </span>
            <span className="cbos-bank-contact__name">{c.name.split(' ')[0]}</span>
          </Link>
        ))}
        <Link to="/bank/transfers" className="cbos-bank-contact" title="Add beneficiary">
          <span className="cbos-bank-contact__avatar cbos-bank-contact__avatar--add" aria-hidden>+</span>
          <span className="cbos-bank-contact__name">Add</span>
        </Link>
      </div>
    </section>
  )
}
