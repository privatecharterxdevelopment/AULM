import { useEffect, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { useAuth } from '../../../auth/AuthContext'
import { useLiveMetalPrices } from '../../../hooks/useLiveMetalPrices'
import { CbosBalanceHero } from '../CbosBalanceHero'
import { CbosHomeToolbar } from '../CbosHomeToolbar'
import { useCbos } from '../../../cbos/context/CbosContext'
import { formatActivityDate, formatMoney } from '../../../cbos/lib/format'
import type { CbosDashboardSummary, CbosTransfer, CbosWallet } from '../../../cbos/types'

function HomeSkeleton() {
  return <div className="cbos-bank cbos-bank--loading" aria-hidden />
}

export function CbosHome() {
  const { profile } = useAuth()
  const { onMenuClick } = useOutletContext<{ onMenuClick?: () => void }>()
  const { api } = useCbos()
  const { gold, metals } = useLiveMetalPrices()
  const silver = metals.find((m) => m.id === 'silver')
  const [summary, setSummary] = useState<CbosDashboardSummary | null>(null)
  const [wallets, setWallets] = useState<CbosWallet[]>([])
  const [transfers, setTransfers] = useState<CbosTransfer[]>([])
  const [hideBalance, setHideBalance] = useState(false)

  const kycApproved = profile?.kyc_status === 'approved'

  useEffect(() => {
    void Promise.all([
      api.getDashboardSummary(),
      api.listWallets(),
      api.listTransfers(),
    ]).then(([s, w, t]) => {
      setSummary(s)
      setWallets(w.items)
      setTransfers(t.items)
    })
  }, [api])

  if (!summary) return <HomeSkeleton />

  return (
    <div className="cbos-bank cbos-bank--dense">
      <CbosHomeToolbar onMenuClick={onMenuClick} />

      <CbosBalanceHero
        summary={summary}
        gold={gold}
        silver={silver}
        wallets={wallets}
        hideBalance={hideBalance}
        onToggleHide={() => setHideBalance((h) => !h)}
      />

      {!kycApproved ? (
        <div className="cbos-bank-alert">
          <p>Complete verification to send payments and order cards.</p>
          <Link to="/bank/kyc">Verify now</Link>
        </div>
      ) : null}

      <section className="cbos-widget cbos-widget--glass cbos-widget--home-tx" aria-label="Recent transactions">
          <header className="cbos-widget__head">
            <div>
              <p className="cbos-widget__eyebrow">History</p>
              <h2>Recent transactions</h2>
            </div>
            <Link to="/bank/transfers" className="cbos-widget__link">
              View all transactions
            </Link>
          </header>

          <ul className="cbos-widget__tx-list">
            {transfers.slice(0, 3).map((t) => {
              const outgoing = t.transferType !== 'internal'
              return (
                <li key={t.id}>
                  <Link to="/bank/transfers" className="cbos-widget__tx">
                    <span
                      className={`cbos-widget__tx-icon${outgoing ? ' is-out' : ' is-in'}`}
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
                    <span className="cbos-widget__tx-body">
                      <span className="cbos-widget__tx-name">{t.beneficiaryName}</span>
                      <span className="cbos-widget__tx-meta">
                        {outgoing ? 'Sent' : 'Received'} · {formatActivityDate(t.createdAt)}
                      </span>
                    </span>
                    <span className={`cbos-widget__tx-amount cbos-tabular${outgoing ? ' is-out' : ' is-in'}`}>
                      {hideBalance
                        ? '••••'
                        : outgoing
                          ? `−${formatMoney(t.amount, t.currency)}`
                          : `+${formatMoney(t.amount, t.currency)}`}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <Link to="/bank/send" className="cbos-widget__cta">
            Send money
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M7 17L17 7M17 7H9M17 7v8" />
            </svg>
          </Link>
        </section>
    </div>
  )
}
