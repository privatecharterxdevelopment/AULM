import type { ReactNode } from 'react'

export function CrmPageHead({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  actions?: ReactNode
}) {
  return (
    <header className="crm-page-head">
      <div>
        {eyebrow ? <p>{eyebrow}</p> : null}
        <h2>{title}</h2>
        {subtitle ? <span>{subtitle}</span> : null}
      </div>
      {actions ? <div className="crm-page-head__actions">{actions}</div> : null}
    </header>
  )
}

export function CrmStatus({ value }: { value: string }) {
  const normalized = value.toLowerCase().replace(/\s+/g, '_')
  return <span className={`crm-status crm-status--${normalized}`}>{value.replace(/_/g, ' ')}</span>
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(value: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function CrmEmpty({ title, body }: { title: string; body: string }) {
  return (
    <div className="crm-empty">
      <span aria-hidden>＋</span>
      <strong>{title}</strong>
      <p>{body}</p>
    </div>
  )
}
