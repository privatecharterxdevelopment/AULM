import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export function CbosSwiftForm() {
  const navigate = useNavigate()
  const [iban, setIban] = useState('')
  const [beneficiary, setBeneficiary] = useState('')
  const [amount, setAmount] = useState('')
  const [reference, setReference] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (beneficiary) params.set('to', beneficiary)
    if (iban) params.set('iban', iban)
    if (amount) params.set('amount', amount)
    if (reference) params.set('ref', reference)
    navigate(`/bank/transfers?${params.toString()}`)
  }

  return (
    <form className="cbos-swift-form" onSubmit={submit}>
      <label className="cbos-field">
        <span>Beneficiary</span>
        <input
          type="text"
          name="beneficiary"
          placeholder="Company or account name"
          value={beneficiary}
          onChange={(e) => setBeneficiary(e.target.value)}
          autoComplete="organization"
        />
      </label>
      <label className="cbos-field">
        <span>IBAN / SWIFT</span>
        <input
          type="text"
          name="iban"
          placeholder="CH93 0076 2011 6238 5295 7"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          autoComplete="off"
        />
      </label>
      <div className="cbos-swift-form__row">
        <label className="cbos-field">
          <span>Amount</span>
          <input
            type="text"
            name="amount"
            placeholder="0.00"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="cbos-field">
          <span>Reference</span>
          <input
            type="text"
            name="reference"
            placeholder="INV-2026-001"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </label>
      </div>
      <button type="submit" className="cbos-btn cbos-btn--full">
        Send SWIFT transfer
      </button>
    </form>
  )
}
