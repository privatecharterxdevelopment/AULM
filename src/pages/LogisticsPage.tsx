import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { BtnArrow } from '../components/BtnArrow'
import { CountryFlag } from '../components/CountryFlag'
import { CountrySearch } from '../components/CountrySearch'
import { ExportRouteSearch } from '../components/ExportRouteSearch'
import { PartnerLinks } from '../components/PartnerLinks'
import { LOGISTICS_HERO_VIDEO } from '../config/media'
import {
  AFRICAN_COUNTRIES,
  EXPORT_DESTINATIONS,
  IMPORT_DESTINATIONS,
  getRequiredDocuments,
  type Country,
} from '../data/countries'
import type { LogisticsMode } from '../data/logistics'

function playLogisticsVideo(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  void video.play().catch(() => {})
}

function isLogisticsMode(id: string | undefined): id is LogisticsMode {
  return id === 'import' || id === 'export'
}

export function LogisticsPage() {
  const { mode } = useParams<{ mode: string }>()
  const { isLoggedIn } = useAuth()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [entered, setEntered] = useState(false)
  const [importTo, setImportTo] = useState<Country | null>(null)
  const [exportFrom, setExportFrom] = useState<Country | null>(null)
  const [exportTo, setExportTo] = useState<Country | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [mode])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    playLogisticsVideo(video)
    const resume = () => playLogisticsVideo(video)
    document.addEventListener('visibilitychange', resume)
    window.addEventListener('focus', resume)
    return () => {
      document.removeEventListener('visibilitychange', resume)
      window.removeEventListener('focus', resume)
    }
  }, [])

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
        <div className="logistics-hero-split">
          <div className="logistics-hero-copy">
            <header className="logistics-tool-header">
              <p className="logistics-hero-eyebrow">
                {isImport ? 'Import' : 'Export'}
              </p>
              <h1 className="logistics-tool-title">
                {isImport ? 'Import into Dubai' : 'Export from origin'}
              </h1>
              <p className="logistics-hero-lead">
                {isImport
                  ? 'Doré, bullion and samples — customs, insured transfer and corridor documents, A to Z.'
                  : 'Routing, export permits and complex corridors from origin to destination.'}
              </p>
              <PartnerLinks className="logistics-partners" />
              <div className="metal-page-actions">
                <Link to="/contact" className="metal-page-btn metal-page-btn--primary">
                  Contact logistics desk
                  <BtnArrow />
                </Link>
              </div>
            </header>

            <div className="logistics-tool-form">
              {isImport ? (
                <CountrySearch
                  label="Destination"
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
                  ? 'Select a destination to see the corridor.'
                  : 'Select origin and destination to see the corridor.'}
              </p>
            ) : null}
          </div>

          <div className="logistics-hero-media">
            <video
              ref={videoRef}
              className="logistics-hero-video"
              src={`${LOGISTICS_HERO_VIDEO}?v=5`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={(e) => playLogisticsVideo(e.currentTarget)}
            />
          </div>
        </div>

        {isImport && showImportPanel && importTo ? (
          <LogisticsCountryPanel
            isLoggedIn={isLoggedIn}
            corridorDocs={corridorDocs}
            summary={importTo.summary}
            notes={importTo.importNotes}
            country={importTo}
          />
        ) : null}

        {!isImport && showExportPanel && exportFrom && exportTo ? (
          <LogisticsCountryPanel
            isLoggedIn={isLoggedIn}
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
  corridorDocs: string[]
  summary: string
  notes?: string
  country: Country
  origin?: Country
}

function LogisticsCountryPanel({
  isLoggedIn,
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
            Your corridor is confirmed. Complete KYC so you can sell gold to AULM — then we share
            the required documents with you.
          </p>
          <div className="logistics-register-actions">
            <Link to="/onboarding" className="metal-page-btn metal-page-btn--primary">
              Complete KYC
              <BtnArrow />
            </Link>
            <Link to="/contact" className="metal-page-btn metal-page-btn--secondary">
              Contact
            </Link>
          </div>
        </div>
      )}

      <div className="logistics-tool-actions">
        <Link to="/contact" className="metal-page-btn metal-page-btn--secondary">
          Contact logistics desk
          <BtnArrow />
        </Link>
      </div>
    </section>
  )
}
