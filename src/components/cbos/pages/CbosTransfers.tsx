import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCbos } from '../../../cbos/context/CbosContext'
import { formatActivityDate, formatMoney } from '../../../cbos/lib/format'
import type { CbosTransfer } from '../../../cbos/types'
import { CbosTransferDetailModal } from '../CbosTransferDetailModal'
import { CbosTransfersBanner } from '../CbosTransfersBanner'

const CATEGORY_LABEL: Record<string, string> = {
  payroll: 'Payroll',
  employee: 'Employee',
  vendor: 'Vendor',
  treasury: 'Treasury',
  internal: 'Internal',
  escrow: 'Escrow',
}

const STATUS_LABEL: Record<string, string> = {
  completed: 'Completed',
  processing: 'Processing',
  pending: 'Pending',
  failed: 'Failed',
}

function isOutgoing(t: CbosTransfer): boolean {
  return t.transferType !== 'internal'
}

export function CbosTransfers() {
  const { api } = useCbos()
  const [searchParams] = useSearchParams()
  const payee = searchParams.get('to')
  const iban = searchParams.get('iban')
  const amount = searchParams.get('amount')
  const [transfers, setTransfers] = useState<CbosTransfer[]>([])
  const [selected, setSelected] = useState<CbosTransfer | null>(null)

  useEffect(() => {
    void api.listTransfers().then(({ items }) => setTransfers(items))
  }, [api])

  const processing = transfers.filter((t) => t.status === 'processing').length
  const pending = transfers.filter((t) => t.status === 'pending').length
  const completed = transfers.filter((t) => t.status === 'completed').length

  return (
    <div className="cbos-transfers-page">
      <article className="cbos-transfers-card">
        <CbosTransfersBanner />

        <div className="cbos-transfers-card__body">
          {payee || iban || amount ? (
            <div className="cbos-transfers-prefill">
              <p className="cbos-transfers-prefill__label">Draft transfer</p>
              <p className="cbos-transfers-prefill__copy">
                {payee ? (
                  <>
                    To <strong>{payee}</strong>
                  </>
                ) : null}
                {iban ? (
                  <>
                    {payee ? ' · ' : null}
                    IBAN <strong>{iban}</strong>
                  </>
                ) : null}
                {amount ? (
                  <>
                    {(payee || iban) ? ' · ' : null}
                    Amount <strong>{amount}</strong>
                  </>
                ) : null}
              </p>
              <Link to="/bank/send" className="cbos-transfers-prefill__link">
                Continue in Send →
              </Link>
            </div>
          ) : null}

          <div className="cbos-transfers-stats">
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Processing</span>
              <span className="cbos-transfers-stat__value cbos-tabular">{processing}</span>
            </article>
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Pending</span>
              <span className="cbos-transfers-stat__value cbos-tabular">{pending}</span>
            </article>
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Completed</span>
              <span className="cbos-transfers-stat__value cbos-tabular">{completed}</span>
            </article>
          </div>

          <header className="cbos-transfers-list__head">
            <div>
              <p className="cbos-transfers-list__eyebrow">History</p>
              <h2 className="cbos-transfers-list__title">All payments</h2>
            </div>
            <span className="cbos-transfers-list__count">{transfers.length} total</span>
          </header>

          <ul className="cbos-transfers-list">
            {transfers.map((t) => {
              const outgoing = isOutgoing(t)
              return (
                <li key={t.id}>
                  <button type="button" className="cbos-transfers-row" onClick={() => setSelected(t)}>
                    <span
                      className={`cbos-transfers-row__icon${outgoing ? ' is-out' : ' is-in'}`}
                      aria-hidden
                    >
                      {outgoing ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 5v14M5 12l7 7 7-7" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 19V5M5 12l7-7 7 7" />
                        </svg>
                      )}
                    </span>

                    <div className="cbos-transfers-row__main">
                      <div className="cbos-transfers-row__top">
                        <span className="cbos-transfers-row__name">{t.beneficiaryName ?? '—'}</span>
                        <span
                          className={`cbos-transfers-row__amount cbos-tabular${outgoing ? ' is-out' : ' is-in'}`}
                        >
                          {outgoing ? '−' : '+'}
                          {formatMoney(t.amount, t.currency)}
                        </span>
                      </div>
                      <div className="cbos-transfers-row__meta">
                        <span>
                          {CATEGORY_LABEL[t.category ?? ''] ?? t.transferType}
                          {t.personRole ? ` · ${t.personRole}` : ''}
                        </span>
                        <span className="cbos-transfers-row__ref">{t.reference}</span>
                      </div>
                      <div className="cbos-transfers-row__foot">
                        <span className="cbos-transfers-row__date">{formatActivityDate(t.createdAt)}</span>
                        <span className={`cbos-transfers-row__status is-${t.status}`}>
                          {STATUS_LABEL[t.status] ?? t.status}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </article>

      <CbosTransferDetailModal transfer={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
