import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCbos } from '../../../cbos/context/CbosContext'
import { FX_RATES } from '../../../cbos/mocks/demoData'
import { formatMoney } from '../../../cbos/lib/format'
import type { CbosWallet } from '../../../cbos/types'
import { CbosFlowAccountField, walletAvailable } from '../flow/CbosFlowAccountField'
import { CbosFlowPage } from '../flow/CbosFlowPage'
import { CbosFxChart } from '../flow/CbosFxChart'

function fxRate(from: string, to: string): { rate: number; change: number } {
  if (from === to) return { rate: 1, change: 0 }
  const direct = FX_RATES.find((r) => r.pair === `${from}/${to}`)
  if (direct) return { rate: direct.rate, change: direct.change }
  const inverse = FX_RATES.find((r) => r.pair === `${to}/${from}`)
  if (inverse) return { rate: 1 / inverse.rate, change: -inverse.change }
  if (from === 'USD' || to === 'USD') {
    const via = FX_RATES.find((r) => r.pair.includes(from) || r.pair.includes(to))
    if (via) return { rate: via.rate, change: via.change }
  }
  return { rate: 1.0842, change: 0.0058 }
}

function currencySymbol(c: string): string {
  if (c === 'GBP') return '£'
  if (c === 'EUR') return '€'
  if (c === 'USD') return '$'
  if (c === 'CHF') return 'CHF '
  if (c === 'AED') return 'AED '
  return `${c} `
}

export function CbosExchange() {
  const navigate = useNavigate()
  const { api } = useCbos()
  const [wallets, setWallets] = useState<CbosWallet[]>([])
  const [fromId, setFromId] = useState('')
  const [toId, setToId] = useState('')
  const [amount, setAmount] = useState('200')

  useEffect(() => {
    void api.listWallets().then(({ items }) => {
      const usable = items.filter((w) => walletAvailable(w) > 0)
      setWallets(usable)
      setFromId(usable.find((w) => w.currency === 'EUR')?.id ?? usable[0]?.id ?? '')
      setToId(usable.find((w) => w.currency === 'USD')?.id ?? usable[1]?.id ?? usable[0]?.id ?? '')
    })
  }, [api])

  const from = wallets.find((w) => w.id === fromId)
  const to = wallets.find((w) => w.id === toId)

  const { rate, change } = useMemo(() => {
    if (!from || !to) return { rate: 1, change: 0 }
    return fxRate(from.currency, to.currency)
  }, [from, to])

  const numAmount = parseFloat(amount.replace(/,/g, '')) || 0
  const converted = numAmount * rate

  const swap = () => {
    setFromId(toId)
    setToId(fromId)
  }

  const continueFlow = () => {
    navigate('/bank/transfers')
  }

  if (!from || !to) {
    return (
      <CbosFlowPage title="Exchange money">
        <p className="cbos-flow__empty">Loading accounts…</p>
      </CbosFlowPage>
    )
  }

  return (
    <CbosFlowPage title="Exchange money">
      <div className="cbos-flow-exchange">
        <div className="cbos-flow-exchange__cols">
          <div className="cbos-flow-accounts-box">
            <CbosFlowAccountField label="From" wallets={wallets} value={fromId} onChange={setFromId} />
          </div>
          <button type="button" className="cbos-flow-exchange__swap" onClick={swap} aria-label="Swap currencies">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M7 16V4M7 4 3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4" />
            </svg>
          </button>
          <div className="cbos-flow-accounts-box">
            <CbosFlowAccountField label="To" wallets={wallets} value={toId} onChange={setToId} />
          </div>
        </div>

        <div className="cbos-flow-exchange__amounts">
          <label className="cbos-flow-amount">
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ''))}
              aria-label={`Amount in ${from.currency}`}
            />
            <span className="cbos-flow-amount__display cbos-tabular">
              {currencySymbol(from.currency)}
              {amount || '0'}
            </span>
          </label>
          <span className="cbos-flow-amount cbos-flow-amount--static cbos-tabular" aria-live="polite">
            {currencySymbol(to.currency)}
            {converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        <div className="cbos-flow-exchange__action">
          <button type="button" className="cbos-flow__continue" onClick={continueFlow}>
            Continue
          </button>
          <div className="cbos-flow-exchange__rate-inline">
            <span>Rate <strong className="cbos-tabular">{rate.toFixed(4)}</strong></span>
            <span className={change >= 0 ? 'is-up' : 'is-down'}>
              {change >= 0 ? '+' : ''}{change.toFixed(4)} today
            </span>
          </div>
        </div>

        <p className="cbos-flow-exchange__hint">
          You will receive {formatMoney(converted, to.currency)} into {to.label}.
        </p>

        <CbosFxChart rate={rate} change={change} />
      </div>
    </CbosFlowPage>
  )
}
