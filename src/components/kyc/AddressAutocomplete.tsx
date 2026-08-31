import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import {
  confirmAddress,
  suggestAddresses,
  type AddressSuggestion,
} from '../../lib/googlePlaces'
import { LOCALE_META, useT } from '../../i18n'

type Props = {
  id?: string
  value: string
  placeId: string
  onChange: (next: { formatted: string; placeId: string }) => void
}

export function AddressAutocomplete({ id, value, placeId, onChange }: Props) {
  const { t, locale } = useT()
  const copy = t.kyc.addressLookup
  const language = LOCALE_META[locale].htmlLang
  const listId = useId()
  const wrapRef = useRef<HTMLDivElement>(null)
  const sessionRef = useRef(crypto.randomUUID())
  const [query, setQuery] = useState(value)
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [active, setActive] = useState(0)
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [lookupError, setLookupError] = useState<string | null>(null)
  const verified = Boolean(placeId) && query === value && value.length > 0

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    const q = query.trim()
    if (verified || q.length < 3) {
      setSuggestions([])
      return
    }

    const ac = new AbortController()
    const timer = window.setTimeout(() => {
      setBusy(true)
      void suggestAddresses(q, language, sessionRef.current)
        .then((result) => {
          if (ac.signal.aborted) return
          if (!result.ok) {
            setSuggestions([])
            setLookupError(
              result.error === 'unconfigured' ? copy.unavailable : copy.empty,
            )
            setOpen(true)
            return
          }
          setLookupError(result.suggestions.length ? null : copy.empty)
          setSuggestions(result.suggestions)
          setActive(0)
          setOpen(true)
        })
        .finally(() => {
          if (!ac.signal.aborted) setBusy(false)
        })
    }, 280)

    return () => {
      ac.abort()
      window.clearTimeout(timer)
    }
  }, [copy.empty, copy.unavailable, language, query, verified])

  const pick = async (suggestion: AddressSuggestion) => {
    setBusy(true)
    setLookupError(null)
    try {
      const result = await confirmAddress(suggestion.placeId, language, sessionRef.current)
      if (!result.ok) {
        setLookupError(result.error === 'vague' ? copy.vague : copy.unavailable)
        return
      }
      sessionRef.current = crypto.randomUUID()
      setQuery(result.address.formatted)
      setSuggestions([])
      setOpen(false)
      onChange(result.address)
    } finally {
      setBusy(false)
    }
  }

  const onInput = (next: string) => {
    setQuery(next)
    setLookupError(null)
    if (placeId) onChange({ formatted: next, placeId: '' })
    else if (next !== value) onChange({ formatted: next, placeId: '' })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) {
      if (e.key === 'Escape') setOpen(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const choice = suggestions[active]
      if (choice) void pick(choice)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div className={`kyc-address${verified ? ' is-verified' : ''}`} ref={wrapRef}>
      <div className="kyc-address-field">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-required={true}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder={copy.placeholder}
          value={query}
          onChange={(e) => onInput(e.target.value)}
          onFocus={() => {
            if (suggestions.length || lookupError) setOpen(true)
          }}
          onKeyDown={onKeyDown}
        />
        {open ? (
          <div className="kyc-address-panel" id={listId} role="listbox">
            {suggestions.map((row, index) => (
              <button
                key={row.placeId}
                type="button"
                role="option"
                aria-selected={index === active}
                className={index === active ? 'is-active' : undefined}
                onMouseEnter={() => setActive(index)}
                onClick={() => void pick(row)}
              >
                <span className="kyc-address-main">{row.mainText}</span>
                {row.secondaryText ? <span className="kyc-address-sec">{row.secondaryText}</span> : null}
              </button>
            ))}
            {lookupError ? <p className="kyc-address-empty">{lookupError}</p> : null}
            <p className="kyc-address-powered">{copy.powered}</p>
          </div>
        ) : null}
      </div>
      <p className={`kyc-address-hint${verified ? ' is-ok' : lookupError ? ' is-warn' : ''}`}>
        {busy ? copy.searching : verified ? copy.verified : lookupError ?? copy.hint}
      </p>
    </div>
  )
}
