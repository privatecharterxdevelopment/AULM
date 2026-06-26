import { useEffect, useState } from 'react'
import { useCbos } from '../../../cbos/context/CbosContext'
import { formatMoney } from '../../../cbos/lib/format'
import { accountDotColor, accountTypeLabel } from '../../../cbos/mocks/demoData'
import type { CbosWallet } from '../../../cbos/types'
import { CbosPage } from '../CbosPage'
import { CbosPageHeader } from '../CbosPageHeader'

export function CbosWallets() {
  const { api } = useCbos()
  const [wallets, setWallets] = useState<CbosWallet[]>([])

  useEffect(() => {
    void api.listWallets().then(({ items }) => setWallets(items))
  }, [api])

  return (
    <CbosPage>
      <section className="cbos-bank-panel">
        <CbosPageHeader
          label="Banking"
          title="Accounts"
          subtitle="Multi-currency wallets"
          action={
            <button type="button" className="cbos-btn">
              Open account
            </button>
          }
        />
      </section>

      <div className="cbos-metrics-row">
        {wallets.slice(0, 3).map((w) => {
          const total = Object.values(w.balances).reduce((s, v) => s + (v ?? 0), 0)
          return (
            <article key={w.id} className="cbos-metric-tile">
              <span className="cbos-account-dot" style={{ background: accountDotColor(w.id) }} aria-hidden />
              <p className="cbos-metric-tile-label">{w.label}</p>
              <p className="cbos-metric-tile-value cbos-tabular">{formatMoney(total, w.currency)}</p>
              <p className="cbos-metric-tile-hint">{accountTypeLabel(w.accountType)}</p>
            </article>
          )
        })}
      </div>

      <section className="cbos-bank-panel cbos-bank-panel--table">
        <header className="cbos-bank-panel__head">
          <h2>All accounts</h2>
        </header>
        <table className="cbos-bank-ledger">
          <thead>
            <tr>
              <th>Account</th>
              <th>Available</th>
              <th>Escrowed</th>
              <th>IBAN</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((w) => (
              <tr key={w.id}>
                <td>
                  <span className="cbos-account-name">
                    <span className="cbos-account-dot" style={{ background: accountDotColor(w.id) }} aria-hidden />
                    {w.label}
                    <span className="cbos-account-currency">{w.currency}</span>
                  </span>
                </td>
                <td className="cbos-bank-ledger__amount cbos-tabular">{formatMoney(w.balances.available ?? 0, w.currency)}</td>
                <td className="cbos-tabular">{formatMoney(w.balances.escrowed ?? 0, w.currency)}</td>
                <td className="cbos-table-mono">{w.iban ?? '—'}</td>
                <td>
                  <span className={`cbos-bank-status cbos-bank-status--${w.isFrozen ? 'pending' : 'ok'}`}>
                    {w.isFrozen ? 'Frozen' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </CbosPage>
  )
}
