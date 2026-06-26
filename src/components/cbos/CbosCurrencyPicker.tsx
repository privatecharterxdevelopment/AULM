import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { formatMoney } from '../../cbos/lib/format'
import type { CbosWallet } from '../../cbos/types'

type CurrencyItem = {
  code: string
  label: string
  balance: number
  walletId?: string
}

const EXTRA: { code: string; label: string; balance: number }[] = [
  { code: 'GBP', label: 'British pound', balance: 842_500 },
  { code: 'CHF', label: 'Swiss franc', balance: 1_120_400 },
]

const ORDER = ['USD', 'EUR', 'GBP', 'CHF', 'AED']

function walletTotal(w: CbosWallet): number {
  return Object.values(w.balances).reduce((s, v) => s + (v ?? 0), 0)
}

export function buildCurrencyItems(wallets: CbosWallet[]): CurrencyItem[] {
  const byCurrency = new Map<string, CurrencyItem>()

  for (const w of wallets) {
    const existing = byCurrency.get(w.currency)
    const total = walletTotal(w)
    if (existing) {
      existing.balance += total
    } else {
      byCurrency.set(w.currency, {
        code: w.currency,
        label: w.label,
        balance: total,
        walletId: w.id,
      })
    }
  }

  for (const e of EXTRA) {
    if (!byCurrency.has(e.code)) {
      byCurrency.set(e.code, { code: e.code, label: e.label, balance: e.balance })
    }
  }

  return ORDER.map((code) => byCurrency.get(code)).filter(Boolean) as CurrencyItem[]
}

type Props = {
  wallets: CbosWallet[]
  currency: string
  hideBalance?: boolean
  onDark?: boolean
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`cbos-currency-picker__chevron${open ? ' is-open' : ''}`}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
    >
      <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CbosCurrencyPicker({ wallets, currency, hideBalance = false, onDark = false }: Props) {
  const [open, setOpen] = useState(false)
  const items = buildCurrencyItems(wallets)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const popup = open ? (
    <div className="cbos-currency-picker__portal">
      <button
        type="button"
        className="cbos-currency-picker__backdrop"
        aria-label="Close currency picker"
        onClick={() => setOpen(false)}
      />
      <div className="cbos-currency-picker__popup" role="dialog" aria-modal="true" aria-label="Choose currency">
        <header className="cbos-currency-picker__popup-head">
          <div>
            <p className="cbos-currency-picker__popup-eyebrow">Display currency</p>
            <h2 className="cbos-currency-picker__popup-title">E-wallets</h2>
          </div>
          <button type="button" className="cbos-currency-picker__popup-close" onClick={() => setOpen(false)} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <ul className="cbos-currency-picker__list">
          {items.map((item) => (
            <li key={item.code}>
              <Link
                to="/bank/wallets"
                className={`cbos-currency-picker__item${item.code === currency ? ' is-active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <span className="cbos-currency-picker__item-main">
                  <span className="cbos-currency-picker__item-code">{item.code}</span>
                  <span className="cbos-currency-picker__item-name">{item.label}</span>
                </span>
                <span className="cbos-currency-picker__item-balance cbos-tabular">
                  {hideBalance ? '••••••' : formatMoney(item.balance, item.code)}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/bank/wallets?new=1" className="cbos-currency-picker__add" onClick={() => setOpen(false)}>
          <span aria-hidden>+</span>
          Add new wallet
        </Link>
      </div>
    </div>
  ) : null

  return (
    <>
      <div
        className={`cbos-currency-picker${onDark ? ' cbos-currency-picker--on-dark' : ''}${open ? ' is-open' : ''}`}
      >
        <button
          type="button"
          className="cbos-currency-picker__trigger"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={`Currency: ${currency}. Choose currency`}
          onClick={() => setOpen(true)}
        >
          <span className="cbos-currency-picker__code">{currency}</span>
          <Chevron open={open} />
        </button>
      </div>
      {popup ? createPortal(popup, document.body) : null}
    </>
  )
}
