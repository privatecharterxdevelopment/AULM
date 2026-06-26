import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { formatMoney } from '../../cbos/lib/format'
import type { CbosTransfer } from '../../cbos/types'

const STATUS_LABEL: Record<string, string> = {
  completed: 'Completed',
  processing: 'Processing',
  pending: 'Pending',
  failed: 'Failed',
}

const CATEGORY_LABEL: Record<string, string> = {
  payroll: 'Payroll',
  employee: 'Employee',
  vendor: 'Vendor',
  treasury: 'Treasury',
  internal: 'Internal',
  escrow: 'Escrow',
}

function formatDetailTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

type Props = {
  transfer: CbosTransfer | null
  onClose: () => void
}

export function CbosTransferDetailModal({ transfer, onClose }: Props) {
  useEffect(() => {
    if (!transfer) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [transfer, onClose])

  if (!transfer) return null

  const outgoing = transfer.transferType !== 'internal'
  const initials = transfer.avatarInitials ?? transfer.beneficiaryName?.slice(0, 2).toUpperCase() ?? '?'
  const category = CATEGORY_LABEL[transfer.category ?? ''] ?? transfer.transferType

  const modal = (
    <div className="cbos-tx-modal" role="presentation">
      <button type="button" className="cbos-tx-modal__backdrop" aria-label="Close" onClick={onClose} />
      <div className="cbos-tx-modal__dialog" role="dialog" aria-modal="true" aria-label="Transaction details">
        <button type="button" className="cbos-tx-modal__close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <header className="cbos-tx-modal__meta">
          <span className="cbos-tx-modal__time">{formatDetailTime(transfer.createdAt)}</span>
          <span className={`cbos-tx-modal__status is-${transfer.status}`}>
            {STATUS_LABEL[transfer.status] ?? transfer.status}
          </span>
        </header>

        <div className="cbos-tx-modal__hero">
          <span className="cbos-tx-modal__avatar" aria-hidden>
            {initials}
          </span>
          <p className="cbos-tx-modal__direction">
            {outgoing ? 'To' : 'From'} {transfer.beneficiaryName ?? '—'}
          </p>
          <p className={`cbos-tx-modal__amount cbos-tabular${outgoing ? ' is-out' : ' is-in'}`}>
            {outgoing ? '−' : '+'}
            {formatMoney(transfer.amount, transfer.currency)}
          </p>
          <p className="cbos-tx-modal__category">{category}</p>
        </div>

        <dl className="cbos-tx-modal__details">
          <div>
            <dt>Recipient</dt>
            <dd>{transfer.beneficiaryName ?? '—'}</dd>
          </div>
          <div>
            <dt>Account</dt>
            <dd>
              {transfer.currency} · {transfer.personRole ?? transfer.transferType}
            </dd>
          </div>
          <div>
            <dt>{outgoing ? 'Money sent' : 'Money received'}</dt>
            <dd className="cbos-tabular">{formatMoney(transfer.amount, transfer.currency)}</dd>
          </div>
          <div>
            <dt>Reference</dt>
            <dd className="cbos-tx-modal__mono">{transfer.reference}</dd>
          </div>
          <div>
            <dt>Fee</dt>
            <dd className="cbos-tabular">0</dd>
          </div>
        </dl>

        <Link to="/bank/documents" className="cbos-tx-modal__cta" onClick={onClose}>
          Get statement
        </Link>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
