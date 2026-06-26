import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Props = {
  label: string
  title: string
  subtitle?: string
  action?: ReactNode
}

export function CbosPageHeader({ label, title, subtitle, action }: Props) {
  return (
    <header className="cbos-bank-panel__head cbos-bank-panel__head--page">
      <div className="cbos-bank-subhead__text">
        <Link to="/bank" className="cbos-bank-subhead-back">← Overview</Link>
        <p className="cbos-bank-subhead-label">{label}</p>
        <h1 className="cbos-bank-subhead-title">{title}</h1>
        {subtitle ? <p className="cbos-bank-subhead-desc">{subtitle}</p> : null}
      </div>
      {action ? <div className="cbos-bank-subhead-action">{action}</div> : null}
    </header>
  )
}
