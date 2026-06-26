import { useEffect, useState } from 'react'
import { useCbos } from '../../../cbos/context/CbosContext'
import type { CbosWallet } from '../../../cbos/types'
import { CbosFlowAccountField } from '../flow/CbosFlowAccountField'
import { CbosFlowPage } from '../flow/CbosFlowPage'

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ''))
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <button type="button" className="cbos-flow-copy" onClick={() => void copy()}>
      {copied ? 'Copied' : `Copy ${label}`}
    </button>
  )
}

export function CbosReceive() {
  const { api } = useCbos()
  const [wallets, setWallets] = useState<CbosWallet[]>([])
  const [toId, setToId] = useState('')
  const [requestAmount, setRequestAmount] = useState('')

  useEffect(() => {
    void api.listWallets().then(({ items }) => {
      const usable = items.filter((w) => w.iban)
      setWallets(usable)
      setToId(usable[0]?.id ?? '')
    })
  }, [api])

  const account = wallets.find((w) => w.id === toId)
  const sym = account?.currency === 'EUR' ? '€' : account?.currency === 'GBP' ? '£' : '$'

  return (
    <CbosFlowPage title="Receive money">
      <div className="cbos-flow-receive">
        {account ? (
          <div className="cbos-flow-accounts-box cbos-flow-accounts-box--single">
            <CbosFlowAccountField label="To" wallets={wallets} value={toId} onChange={setToId} />
          </div>
        ) : null}

        <div className="cbos-flow-receive__details">
          <div className="cbos-flow-receive__row">
            <span className="cbos-flow-receive__key">Account</span>
            <span className="cbos-flow-receive__val">{account?.label ?? '—'}</span>
          </div>
          <div className="cbos-flow-receive__row">
            <span className="cbos-flow-receive__key">IBAN</span>
            <span className="cbos-flow-receive__val cbos-flow-receive__val--mono">{account?.iban ?? '—'}</span>
          </div>
          <div className="cbos-flow-receive__row">
            <span className="cbos-flow-receive__key">SWIFT / BIC</span>
            <span className="cbos-flow-receive__val cbos-flow-receive__val--mono">AULMAEAD</span>
          </div>
          <div className="cbos-flow-receive__row">
            <span className="cbos-flow-receive__key">Bank</span>
            <span className="cbos-flow-receive__val">AULM Bank Ltd · Dubai IFZA</span>
          </div>
        </div>

        {account?.iban ? (
          <div className="cbos-flow-receive__actions">
            <CopyButton value={account.iban} label="IBAN" />
            <CopyButton value="AULMAEAD" label="SWIFT" />
          </div>
        ) : null}

        <label className="cbos-flow-amount cbos-flow-amount--send">
          <span className="cbos-flow-receive__request-label">Request amount (optional)</span>
          <input
            type="text"
            inputMode="decimal"
            value={requestAmount}
            onChange={(e) => setRequestAmount(e.target.value.replace(/[^\d.,]/g, ''))}
            aria-label="Requested amount"
            placeholder="0"
          />
          <span className="cbos-flow-amount__display cbos-tabular">
            {sym}
            {requestAmount || '0'}
          </span>
        </label>

        <p className="cbos-flow-exchange__hint">
          Share these details with your counterparty. Incoming wires are credited to{' '}
          {account?.label ?? 'your account'} once cleared.
        </p>

        <button type="button" className="cbos-flow__continue cbos-flow__continue--secondary">
          Share payment details
        </button>
      </div>
    </CbosFlowPage>
  )
}
