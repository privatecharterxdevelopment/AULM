import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { BtnArrow } from '../BtnArrow'
import {
  TRANSPORT_MODES,
  formatUsd,
  type TransportMode,
} from '../../data/dashboard'
import { getSupabase, tables, type LogisticsRequest } from '../../lib/supabase'
import { notifyOps } from '../../utils/notifyOps'

export function DashboardLogistics() {
  const { user, profile } = useAuth()
  const [routes, setRoutes] = useState<LogisticsRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [commodity, setCommodity] = useState('Gold doré')
  const [valueUsd, setValueUsd] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [mode, setMode] = useState<TransportMode>('air')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const loadRoutes = useCallback(async () => {
    if (!user) return
    const supabase = getSupabase()
    if (!supabase) return
    setLoading(true)
    const { data } = await supabase
      .from(tables.logisticsRequests)
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setRoutes((data ?? []) as LogisticsRequest[])
    setLoading(false)
  }, [user])

  useEffect(() => {
    void loadRoutes()
  }, [loadRoutes])

  const submitRoute = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    if (!from.trim() || !to.trim()) {
      setError('Origin and destination are required.')
      return
    }
    const value = Number.parseFloat(valueUsd.replace(/,/g, ''))
    const weight = Number.parseFloat(weightKg.replace(/,/g, ''))
    if (!value || value <= 0) {
      setError('Enter a valid shipment value in USD.')
      return
    }
    if (!weight || weight <= 0) {
      setError('Enter weight in kg.')
      return
    }

    const supabase = getSupabase()
    if (!supabase) {
      setError('Could not connect.')
      return
    }

    setSubmitting(true)
    setError(null)

    const { data, error: insertErr } = await supabase
      .from(tables.logisticsRequests)
      .insert({
        user_id: user.id,
        from_location: from.trim(),
        to_location: to.trim(),
        commodity: commodity.trim(),
        value_usd: value,
        weight_kg: weight,
        mode,
        notes: notes.trim(),
        status: 'submitted',
      })
      .select('*')
      .single()

    setSubmitting(false)

    if (insertErr || !data) {
      setError(insertErr?.message ?? 'Failed to submit route.')
      return
    }

    setRoutes((prev) => [data as LogisticsRequest, ...prev])
    notifyOps({
      type: 'logistics_submitted',
      routeId: data.id,
      customerEmail: profile?.email ?? user.email,
      company: profile?.company_name ?? undefined,
      from: from.trim(),
      destination: to.trim(),
      commodity: commodity.trim(),
      valueUsd: value,
    })

    setFrom('')
    setTo('')
    setValueUsd('')
    setWeightKg('')
    setNotes('')
  }

  return (
    <div className="dash-section">
      <section className="dash-card">
        <h2 className="dash-card-title">Create route</h2>
        <p className="dash-card-text">
          Submit a corridor mandate. For documents, see the{' '}
          <Link to="/company/procedure">procedure library</Link>.
        </p>

        <form className="dash-route-form" onSubmit={(e) => void submitRoute(e)}>
          <div className="dash-form-grid">
            <div className="dash-field">
              <label className="dash-field-label" htmlFor="routeFrom">
                From *
              </label>
              <input
                id="routeFrom"
                className="dash-input"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Accra, GH"
                required
              />
            </div>
            <div className="dash-field">
              <label className="dash-field-label" htmlFor="routeTo">
                To *
              </label>
              <input
                id="routeTo"
                className="dash-input"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. Dubai IFZA"
                required
              />
            </div>
            <div className="dash-field">
              <label className="dash-field-label" htmlFor="routeCommodity">
                Commodity
              </label>
              <input
                id="routeCommodity"
                className="dash-input"
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
              />
            </div>
            <div className="dash-field">
              <label className="dash-field-label" htmlFor="routeValue">
                Value (USD) *
              </label>
              <input
                id="routeValue"
                className="dash-input"
                value={valueUsd}
                onChange={(e) => setValueUsd(e.target.value)}
                placeholder="1,240,000"
                required
              />
            </div>
            <div className="dash-field">
              <label className="dash-field-label" htmlFor="routeWeight">
                Weight (kg) *
              </label>
              <input
                id="routeWeight"
                className="dash-input"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="12.4"
                required
              />
            </div>
          </div>

          <fieldset className="dash-mode-fieldset">
            <legend className="dash-field-label">Transportation mode</legend>
            <div className="dash-mode-grid">
              {TRANSPORT_MODES.map((m) => (
                <label
                  key={m.id}
                  className={`dash-mode-card${mode === m.id ? ' is-selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="transportMode"
                    checked={mode === m.id}
                    onChange={() => setMode(m.id)}
                  />
                  <span className="dash-mode-title">{m.label}</span>
                  <span className="dash-mode-hint">{m.hint}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="dash-field">
            <label className="dash-field-label" htmlFor="routeNotes">
              Notes
            </label>
            <textarea
              id="routeNotes"
              className="dash-input dash-input--area"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Insurance, assay, special handling…"
            />
          </div>

          {error ? <p className="kyc-error">{error}</p> : null}

          <button
            type="submit"
            className="metal-page-btn metal-page-btn--primary"
            disabled={submitting}
          >
            {submitting ? 'Submitting…' : 'Submit route'}
            <BtnArrow />
          </button>
        </form>
      </section>

      {loading ? (
        <p className="dash-card-text">Loading routes…</p>
      ) : routes.length > 0 ? (
        <section className="dash-card">
          <h2 className="dash-card-title">Your routes</h2>
          <ul className="dash-route-list">
            {routes.map((r) => (
              <li key={r.id} className="dash-route-item">
                <div>
                  <p className="dash-track-route">
                    {r.from_location} → {r.to_location}
                  </p>
                  <p className="dash-route-detail">
                    {r.commodity} · {formatUsd(Number(r.value_usd))} · {r.weight_kg} kg · {r.mode}
                  </p>
                </div>
                <span className={`dash-pill dash-pill--${r.status}`}>{r.status.replace('_', ' ')}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
