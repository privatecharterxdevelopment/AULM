import { DEMO_SAVINGS } from '../../../cbos/providers/mockApi'
import { formatMoney } from '../../../cbos/lib/format'
import { CbosGlass } from '../CbosGlass'
import { CbosPage } from '../CbosPage'
import { CbosPageHeader } from '../CbosPageHeader'

export function CbosSavings() {
  return (
    <CbosPage>
      <CbosPageHeader
        label="Savings spaces"
        title="Savings & goals"
        subtitle="Ring-fenced balances for settlement and reserves"
        action={
          <button type="button" className="cbos-btn">
            New goal
          </button>
        }
      />

      <div className="cbos-savings-grid">
        {DEMO_SAVINGS.map((v, i) => {
          const pct = v.targetAmount ? Math.min(100, (v.balance / v.targetAmount) * 100) : 0
          return (
            <CbosGlass key={v.id} stagger={100 + i * 80} className="cbos-savings-card">
              <h2 className="kyc-wizard-subtitle">{v.name}</h2>
              <p className="cbos-metric-tile-value cbos-tabular">{formatMoney(v.balance, v.currency)}</p>
              {v.targetAmount ? (
                <>
                  <p className="cbos-metric-tile-hint">Goal {formatMoney(v.targetAmount, v.currency)}</p>
                  <div className="cbos-progress">
                    <div className="cbos-progress-bar" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="cbos-metric-tile-hint">{pct.toFixed(0)}% funded</p>
                </>
              ) : null}
            </CbosGlass>
          )
        })}
      </div>
    </CbosPage>
  )
}
