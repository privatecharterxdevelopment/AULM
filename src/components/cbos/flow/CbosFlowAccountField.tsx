import { useEffect, useRef, useState } from 'react'
import { formatMoney } from '../../../cbos/lib/format'
import type { CbosWallet } from '../../../cbos/types'

function walletAvailable(w: CbosWallet): number {
  return w.balances.available ?? w.balances.escrowed ?? 0
}

type Props = {
  label: string
  wallets: CbosWallet[]
  value: string
  onChange: (id: string) => void
}

export function CbosFlowAccountField({ label, wallets, value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selected = wallets.find((w) => w.id === value) ?? wallets[0]

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  if (!selected) return null

  return (
    <div className="cbos-flow-account" ref={rootRef}>
      <span className="cbos-flow-account__label">{label}</span>
      <button
        type="button"
        className="cbos-flow-account__trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="cbos-flow-account__name">
          {selected.currency} — {selected.label}
        </span>
        <span className="cbos-flow-account__balance cbos-tabular">
          {formatMoney(walletAvailable(selected), selected.currency)}
        </span>
        <svg className="cbos-flow-account__chev" width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open ? (
        <ul className="cbos-flow-account__menu" role="listbox">
          {wallets.map((w) => (
            <li key={w.id}>
              <button
                type="button"
                role="option"
                aria-selected={w.id === selected.id}
                className={w.id === selected.id ? 'is-active' : ''}
                onClick={() => {
                  onChange(w.id)
                  setOpen(false)
                }}
              >
                <span>{w.currency} — {w.label}</span>
                <span className="cbos-tabular">{formatMoney(walletAvailable(w), w.currency)}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export { walletAvailable }
