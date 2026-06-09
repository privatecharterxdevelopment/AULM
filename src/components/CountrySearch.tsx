import { useEffect, useId, useRef, useState } from 'react'
import {
  filterCountries,
  findSanctionedMatch,
  isSanctioned,
  type Country,
} from '../data/countries'
import { CountryFlag } from './CountryFlag'

type Props = {
  label?: string
  hint?: string
  countries: Country[]
  value: Country | null
  onChange: (country: Country | null) => void
}

export function CountrySearch({ label, hint, countries, value, onChange }: Props) {
  const [query, setQuery] = useState(value?.name ?? '')
  const [open, setOpen] = useState(false)
  const [blocked, setBlocked] = useState<string | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const results = filterCountries(countries, query).slice(0, 8)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    if (value) setQuery(value.name)
  }, [value])

  const pick = (country: Country) => {
    if (isSanctioned(country.code)) {
      setBlocked(country.name)
      return
    }
    setBlocked(null)
    onChange(country)
    setQuery(country.name)
    setOpen(false)
  }

  const onInput = (next: string) => {
    setQuery(next)
    setOpen(true)
    setBlocked(findSanctionedMatch(next))
    if (value && next !== value.name) onChange(null)
  }

  return (
    <div className="country-search" ref={wrapRef}>
      {label ? (
        <label className="country-search-label" htmlFor={listId}>
          {label}
        </label>
      ) : null}
      {hint ? <p className="country-search-hint">{hint}</p> : null}

      <div className="country-search-field">
        {value ? <CountryFlag code={value.code} size="sm" /> : null}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
          <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
        <input
          id={listId}
          type="search"
          className="country-search-input"
          placeholder="Search country…"
          value={query}
          autoComplete="off"
          onChange={(e) => onInput(e.target.value)}
          onFocus={() => setOpen(true)}
        />
      </div>

      {blocked ? (
        <p className="country-search-blocked" role="alert">
          {blocked} is under international sanctions — routing not available.
        </p>
      ) : null}

      {open && query.trim() && results.length > 0 ? (
        <ul className="country-search-results" role="listbox">
          {results.map((c) => (
            <li key={c.code}>
              <button type="button" role="option" onClick={() => pick(c)}>
                <span className="country-search-option">
                  <CountryFlag code={c.code} size="sm" />
                  <span>{c.name}</span>
                </span>
                <span className="country-search-code">{c.code}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {open && query.trim() && results.length === 0 && !blocked ? (
        <p className="country-search-empty">No matching countries — try another name or code.</p>
      ) : null}
    </div>
  )
}
