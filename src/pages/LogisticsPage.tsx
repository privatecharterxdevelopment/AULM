import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { BtnArrow } from '../components/BtnArrow'
import { CountryFlag } from '../components/CountryFlag'
import { CountrySearch } from '../components/CountrySearch'
import { ExportRouteSearch } from '../components/ExportRouteSearch'
import {
  AFRICAN_COUNTRIES,
  EXPORT_DESTINATIONS,
  IMPORT_DESTINATIONS,
  getRequiredDocuments,
  type Country,
} from '../data/countries'
import type { LogisticsMode } from '../data/logistics'

function isLogisticsMode(id: string | undefined): id is LogisticsMode {
  return id === 'import' || id === 'export'
}

export function LogisticsPage() {
  const { mode } = useParams<{ mode: string }>()
  const { isLoggedIn, login } = useAuth()
  const [entered, setEntered] = useState(false)
  const [importTo, setImportTo] = useState<Country | null>(null)
  const [exportFrom, setExportFrom] = useState<Country | null>(null)
  const [exportTo, setExportTo] = useState<Country | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [mode])

  if (!isLogisticsMode(mode)) {
    return <Navigate to="/" replace />
  }

  const isImport = mode === 'import'
  const showImportPanel = !!importTo
  const showExportPanel = !!exportFrom && !!exportTo

  const corridorDocs = (() => {
    if (isImport && importTo) return getRequiredDocuments(importTo, 'import')
    if (!isImport && exportTo && exportFrom) {
      const destDocs = getRequiredDocuments(exportTo, 'import')
      const originDocs = getRequiredDocuments(exportFrom, 'export')
      return [...new Set([...originDocs.slice(0, 4), ...destDocs])]
    }
    return []
  })()

  const showPanel = isImport ? showImportPanel : showExportPanel

  return (
    <div className={`logistics-tool-page${entered ? ' is-entered' : ''}`}>
      <div className="logistics-page-overlay" aria-hidden />

      <div className={`logistics-tool-shell${showPanel ? ' has-panel' : ''}`}>
        <div className="logistics-tool-intro">
          <header className="logistics-tool-header">
            <h1 className="logistics-tool-title">
              {isImport ? 'Import routing' : 'Export routing'}
            </h1>
          </header>

          <div className="logistics-tool-form">
            {isImport ? (
              <CountrySearch
                countries={IMPORT_DESTINATIONS}
                value={importTo}
                onChange={setImportTo}
              />
            ) : (
              <ExportRouteSearch
                fromCountries={AFRICAN_COUNTRIES}
                toCountries={EXPORT_DESTINATIONS}
                from={exportFrom}
                to={exportTo}
                onFromChange={setExportFrom}
                onToChange={setExportTo}
              />
            )}
          </div>

          {!showPanel ? (
            <p className="logistics-tool-placeholder">
              {isImport
                ? 'Search and select a destination country.'
                : 'Select origin and destination in the route bar above.'}
            </p>
          ) : null}
        </div>

        {isImport && showImportPanel && importTo ? (
          <LogisticsCountryPanel
            isLoggedIn={isLoggedIn}
            login={login}
            corridorDocs={corridorDocs}
            summary={importTo.summary}
            notes={importTo.importNotes}
            country={importTo}
          />
        ) : null}

        {!isImport && showExportPanel && exportFrom && exportTo ? (
          <LogisticsCountryPanel
            isLoggedIn={isLoggedIn}
            login={login}
            corridorDocs={corridorDocs}
            summary={`${exportFrom.summary} Export corridor to ${exportTo.name} with OECD-aligned documentation and insured logistics.`}
            notes={exportFrom.exportNotes}
            country={exportTo}
            origin={exportFrom}
          />
        ) : null}

      </div>
    </div>
  )
}

type PanelProps = {
  isLoggedIn: boolean
  login: () => void
  corridorDocs: string[]
  summary: string
  notes?: string
  country: Country
  origin?: Country
}

function LogisticsCountryPanel({
  isLoggedIn,
  login,
  corridorDocs,
  summary,
  notes,
  country,
  origin,
}: PanelProps) {
  return (
    <section className="logistics-country-panel">
      {origin ? (
        <p className="logistics-country-route">
          <span className="logistics-country-route-item">
            <CountryFlag code={origin.code} size="sm" />
            {origin.name}
          </span>
          <span aria-hidden>→</span>
          <span className="logistics-country-route-item">
            <CountryFlag code={country.code} size="sm" />
            {country.name}
          </span>
        </p>
      ) : null}

      <div className="logistics-country-head">
        <CountryFlag code={country.code} size="lg" />
        <h2 className="logistics-country-name">{country.name}</h2>
      </div>

      <p className="logistics-country-summary">{summary}</p>
      {notes ? <p className="logistics-country-notes">{notes}</p> : null}

      {isLoggedIn ? (
        <>
          <h3 className="logistics-docs-title">Required documents</h3>
          <ul className="logistics-docs-list">
            {corridorDocs.map((doc) => (
              <li key={doc}>{doc}</li>
            ))}
          </ul>
        </>
      ) : (
        <div className="logistics-docs-locked">
          <p className="logistics-docs-locked-text">
            Your corridor is confirmed. Register an institutional account to view required
            documents and proceed with onboarding.
          </p>
          <div className="logistics-register-actions">
            <a href="#open-account" className="metal-page-btn metal-page-btn--primary">
              Register
              <BtnArrow />
            </a>
            <button type="button" className="metal-page-btn metal-page-btn--secondary" onClick={login}>
              Log in
            </button>
          </div>
        </div>
      )}

      <div className="logistics-tool-actions">
        <Link to="/company" className="metal-page-btn metal-page-btn--secondary">
          Contact logistics desk
          <BtnArrow />
        </Link>
      </div>
    </section>
  )
}
