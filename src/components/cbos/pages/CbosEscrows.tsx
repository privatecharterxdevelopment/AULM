import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCbos } from '../../../cbos/context/CbosContext'
import { formatActivityDate, escrowStatusLabel, formatMoney } from '../../../cbos/lib/format'
import type { CbosEscrow } from '../../../cbos/types'
import { CbosEscrowBanner } from '../CbosEscrowBanner'

export function CbosEscrows() {
  const { api } = useCbos()
  const [escrows, setEscrows] = useState<CbosEscrow[]>([])

  useEffect(() => {
    void api.listEscrows().then(({ items }) => setEscrows(items))
  }, [api])

  const funded = escrows.filter((e) => e.status === 'funded' || e.status === 'approved').length
  const open = escrows.filter((e) => e.status !== 'completed' && e.status !== 'refunded').length
  const totalValue = escrows.reduce((s, e) => s + e.transactionValue, 0)

  return (
    <div className="cbos-transfers-page cbos-escrow-page">
      <article className="cbos-transfers-card">
        <CbosEscrowBanner />

        <div className="cbos-transfers-card__body">
          <div className="cbos-transfers-actions">
            <Link to="/bank/escrows/new" className="cbos-transfers-actions__btn cbos-transfers-actions__btn--solid">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 5v14M5 12h14" />
              </svg>
              Open escrow
            </Link>
            <Link to="/bank/escrows/new" className="cbos-transfers-actions__btn">
              Invite participants
            </Link>
          </div>

          <div className="cbos-transfers-stats">
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Open</span>
              <span className="cbos-transfers-stat__value cbos-tabular">{open}</span>
            </article>
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Funded</span>
              <span className="cbos-transfers-stat__value cbos-tabular">{funded}</span>
            </article>
            <article className="cbos-transfers-stat">
              <span className="cbos-transfers-stat__label">Pipeline</span>
              <span className="cbos-transfers-stat__value cbos-tabular">
                {formatMoney(totalValue, 'USD').replace(/\.00$/, '')}
              </span>
            </article>
          </div>

          <header className="cbos-transfers-list__head">
            <div>
              <p className="cbos-transfers-list__eyebrow">Active</p>
              <h2 className="cbos-transfers-list__title">All escrows</h2>
            </div>
            <span className="cbos-transfers-list__count">{escrows.length} total</span>
          </header>

          <ul className="cbos-transfers-list">
            {escrows.map((e) => {
              const fundedPct = Math.min(100, (e.fundedAmount / e.transactionValue) * 100)
              return (
                <li key={e.id}>
                  <Link to={`/bank/escrows/${e.id}`} className="cbos-transfers-row">
                    <span className="cbos-transfers-row__icon is-escrow" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
                      </svg>
                    </span>
                    <span className="cbos-transfers-row__main">
                      <span className="cbos-transfers-row__top">
                        <span className="cbos-transfers-row__name">{e.title}</span>
                        <span className="cbos-transfers-row__amount cbos-tabular">
                          {formatMoney(e.transactionValue, e.currency)}
                        </span>
                      </span>
                      <span className="cbos-transfers-row__meta">
                        <span>
                          {e.reference}
                          {e.commodityCode ? ` · ${e.commodityCode}` : ''}
                        </span>
                        <span className="cbos-transfers-row__ref">
                          {Math.round(fundedPct)}% funded
                        </span>
                      </span>
                      <span className="cbos-transfers-row__foot">
                        <span className="cbos-transfers-row__date">{formatActivityDate(e.updatedAt)}</span>
                        <span
                          className={`cbos-transfers-row__status is-${
                            e.status === 'funded' ||
                            e.status === 'completed' ||
                            e.status === 'in_progress'
                              ? 'completed'
                              : 'processing'
                          }`}
                        >
                          {escrowStatusLabel(e.status)}
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </article>
    </div>
  )
}
