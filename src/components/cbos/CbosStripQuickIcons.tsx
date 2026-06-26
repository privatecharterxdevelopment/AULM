import { NavLink } from 'react-router-dom'
import { useCbosNotifications } from './hooks/useCbosNotifications'
import { IconBell, IconHeadset } from './icons'

type Props = {
  onNavigate?: () => void
}

export function CbosStripQuickIcons({ onNavigate }: Props) {
  const { unread } = useCbosNotifications()

  return (
    <div className="cbos-bank-strip__quick-icons" aria-label="Support and notifications">
      <NavLink
        to="/bank/support"
        className={({ isActive }) => `cbos-bank-strip__icon${isActive ? ' is-active' : ''}`}
        title="Support"
        aria-label="Support"
        onClick={onNavigate}
      >
        <IconHeadset width={16} height={16} strokeWidth={1.75} />
      </NavLink>

      <NavLink
        to="/bank/notifications"
        className={({ isActive }) => `cbos-bank-strip__icon${isActive ? ' is-active' : ''}`}
        title={`Notifications${unread ? ` (${unread} unread)` : ''}`}
        aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
        onClick={onNavigate}
      >
        <IconBell width={16} height={16} strokeWidth={1.75} />
        {unread > 0 ? <span className="cbos-bank-strip__icon-badge">{unread}</span> : null}
      </NavLink>
    </div>
  )
}
