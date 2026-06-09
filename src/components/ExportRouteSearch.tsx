import { useEffect, useId, useRef, useState } from 'react'
import {
  filterCountries,
  findSanctionedMatch,
  isSanctioned,
  type Country,
} from '../data/countries'
import { CountryFlag } from './CountryFlag'

type Side = 'from' | 'to'

type Props = {
  fromCountries: Country[]
  toCountries: Country[]
  from: Country | null
  to: Country | null
  onFromChange: (country: Country | null) => void
  onToChange: (country: Country | null) => void
}

export function ExportRouteSearch({
  fromCountries,
  toCountries,
  from,
  to,
  onFromChange,
  onToChange,
}: Props) {
  const [activeSide, setActiveSide] = useState<Side>('from')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [blocked, setBlocked] = useState<string | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const fromInputId = useId()
  const toInputId = useId()

  const complete = !!from && !!to
  const countries = activeSide === 'from' ? fromCountries : toCountries
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

  const activate = (side: Side) => {
    setActiveSide(side)
    setOpen(true)
    setBlocked(null)
    setQuery(side === 'from' ? (from?.name ?? '') : (to?.name ?? ''))
  }

  const pick = (country: Country) => {
    if (isSanctioned(country.code)) {
      setBlocked(country.name)
      return
    }
    setBlocked(null)
    if (activeSide === 'from') {
      onFromChange(country)
      setQuery('')
      setActiveSide('to')
      setOpen(true)
    } else {
      onToChange(country)
      setQuery(country.name)
      setOpen(false)
    }
  }

  const onInput = (next: string) => {
    setQuery(next)
    setOpen(true)
    setBlocked(findSanctionedMatch(next))
    if (activeSide === 'from' && from && next !== from.name) onFromChange(null)
    if (activeSide === 'to' && to && next !== to.name) onToChange(null)
  }

  const reset = () => {
    onFromChange(null)
    onToChange(null)
    setActiveSide('from')
    setQuery('')
    setOpen(false)
    setBlocked(null)
  }

  if (complete && from && to) {
    return (
      <div className="route-search route-search--complete">
        <div className="route-search-conclusion">
          <div className="route-search-conclusion-route">
            <span className="route-search-conclusion-item">
              <CountryFlag code={from.code} size="sm" />
              <span>{from.name}</span>
            </span>
            <span className="route-search-conclusion-arrow" aria-hidden>
              →
            </span>
            <span className="route-search-conclusion-item">
              <CountryFlag code={to.code} size="sm" />
              <span>{to.name}</span>
            </span>
          </div>
          <button type="button" className="route-search-change" onClick={reset}>
            Change route
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="route-search" ref={wrapRef}>
      <div className="route-search-bar">
        <div
          className={`route-search-side${activeSide === 'from' ? ' is-active' : ''}${from ? ' is-filled' : ''}`}
          onClick={() => activate('from')}
        >
          <span className="route-search-side-label">From</span>
          {activeSide === 'from' ? (
            <input
              id={fromInputId}
              type="search"
              className="route-search-input"
              placeholder="Search country…"
              value={query}
              autoComplete="off"
              onChange={(e) => onInput(e.target.value)}
              onFocus={() => activate('from')}
            />
          ) : (
            <span className="route-search-value">
              {from ? (
                <>
                  <CountryFlag code={from.code} size="sm" />
                  {from.name}
                </>
              ) : (
                <span className="route-search-placeholder">Search country…</span>
              )}
            </span>
          )}
        </div>

        <div className="route-search-divider" aria-hidden />

        <div
          className={`route-search-side${activeSide === 'to' ? ' is-active' : ''}${to ? ' is-filled' : ''}`}
          onClick={() => activate('to')}
        >
          <span className="route-search-side-label">To</span>
          {activeSide === 'to' ? (
            <input
              id={toInputId}
              type="search"
              className="route-search-input"
              placeholder="Search country…"
              value={query}
              autoComplete="off"
              onChange={(e) => onInput(e.target.value)}
              onFocus={() => activate('to')}
            />
          ) : (
            <span className="route-search-value">
              {to ? (
                <>
                  <CountryFlag code={to.code} size="sm" />
                  {to.name}
                </>
              ) : (
                <span className="route-search-placeholder">Search country…</span>
              )}
            </span>
          )}
        </div>
      </div>

      {blocked ? (
        <p className="country-search-blocked" role="alert">
          {blocked} is under international sanctions — routing not available.
        </p>
      ) : null}

      {open && query.trim() && results.length > 0 ? (
        <ul className="country-search-results route-search-results" role="listbox">
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
