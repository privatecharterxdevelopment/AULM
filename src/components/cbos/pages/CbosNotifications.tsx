import { Link } from 'react-router-dom'
import { formatActivityDate } from '../../../cbos/lib/format'
import type { CbosNotification } from '../../../cbos/types'
import { useCbosNotifications } from '../hooks/useCbosNotifications'
import { CbosFlowPage } from '../flow/CbosFlowPage'

function notificationHref(n: CbosNotification): string {
  if (n.kind.includes('escrow') || n.kind.includes('document')) return '/bank/escrows'
  if (n.kind.includes('money') || n.kind.includes('transfer')) return '/bank/transfers'
  if (n.kind.includes('card')) return '/bank/cards'
  return '/bank'
}

export function CbosNotifications() {
  const { items, unread, markRead, markAllRead } = useCbosNotifications()

  return (
    <CbosFlowPage title="Notifications">
      <div className="cbos-notifications-flow">
        <header className="cbos-notifications-head">
          <p>
            {unread > 0 ? `${unread} unread` : 'All caught up'}
          </p>
          {unread > 0 ? (
            <button type="button" className="cbos-flow__link-btn" onClick={() => markAllRead()}>
              Mark all read
            </button>
          ) : null}
        </header>

        <ul className="cbos-notifications-list">
          {items.map((n) => (
            <li key={n.id} className={n.read ? '' : 'is-unread'}>
              <Link
                to={notificationHref(n)}
                className="cbos-notifications-item"
                onClick={() => {
                  if (!n.read) markRead(n.id)
                }}
              >
                <span className="cbos-notifications-item__title">{n.title}</span>
                {n.body ? <span className="cbos-notifications-item__body">{n.body}</span> : null}
                <span className="cbos-notifications-item__time">{formatActivityDate(n.createdAt)}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="cbos-notifications-hint">
          Manage delivery preferences in{' '}
          <Link to="/bank/settings">Settings → Notifications</Link>.
        </p>
      </div>
    </CbosFlowPage>
  )
}
