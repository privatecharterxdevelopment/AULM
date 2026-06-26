import { Link } from 'react-router-dom'
import { IconExchange, IconReceive, IconSend } from './icons'

type Props = {
  className?: string
  solidSend?: boolean
}

export function CbosHeaderActions({ className = '', solidSend = true }: Props) {
  return (
    <div className={`cbos-header-actions${className ? ` ${className}` : ''}`} aria-label="Quick payment actions">
      <Link to="/bank/exchange" className="cbos-header-actions__btn">
        <IconExchange width={14} height={14} strokeWidth={2} />
        <span>Exchange</span>
      </Link>
      <Link to="/bank/receive" className="cbos-header-actions__btn">
        <IconReceive width={14} height={14} strokeWidth={2} />
        <span>Receive</span>
      </Link>
      <Link
        to="/bank/send"
        className={`cbos-header-actions__btn${solidSend ? ' cbos-header-actions__btn--solid' : ''}`}
      >
        <IconSend width={14} height={14} strokeWidth={2} />
        <span>Send</span>
      </Link>
    </div>
  )
}
