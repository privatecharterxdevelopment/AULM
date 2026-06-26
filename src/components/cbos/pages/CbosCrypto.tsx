import { cryptoProvider } from '../../../cbos/mocks/crypto'
import { formatMoney } from '../../../cbos/lib/format'
import { CbosGlass } from '../CbosGlass'
import { CbosPage } from '../CbosPage'
import { CbosPageHeader } from '../CbosPageHeader'

export function CbosCrypto() {
  const wallets = cryptoProvider.listWallets()
  const total = cryptoProvider.portfolioValueUsd()

  return (
    <CbosPage>
      <CbosPageHeader
        label="Digital assets"
        title="Crypto treasury"
        subtitle={`Portfolio value ${formatMoney(total, 'USD')}`}
        action={
          <div className="cbos-page-action-row">
            <button type="button" className="cbos-btn">
              Buy
            </button>
            <button type="button" className="cbos-text-btn">
              Swap
            </button>
          </div>
        }
      />

      <div className="cbos-crypto-grid">
        {wallets.map((w, i) => {
          const price = cryptoProvider.getPrice(w.asset)
          const value = (w.available + w.pending + w.reserved) * price
          return (
            <CbosGlass key={w.id} stagger={100 + i * 80} className="cbos-crypto-card">
              <div className="cbos-crypto-symbol">{w.asset}</div>
              <p className="cbos-metric-tile-value cbos-tabular">
                {w.available.toLocaleString()} {w.asset}
              </p>
              <p className="cbos-metric-tile-hint">≈ {formatMoney(value, 'USD')}</p>
              <dl className="cbos-wallet-meta">
                <div>
                  <dt>Pending</dt>
                  <dd>{w.pending}</dd>
                </div>
                <div>
                  <dt>Reserved</dt>
                  <dd>{w.reserved}</dd>
                </div>
              </dl>
            </CbosGlass>
          )
        })}
      </div>
    </CbosPage>
  )
}
