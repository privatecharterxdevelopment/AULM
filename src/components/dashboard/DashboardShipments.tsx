import { DEMO_SHIPMENTS, SHIPMENT_STATUS_LABEL, formatUsd } from '../../data/dashboard'

const TRACK_STEPS: { key: string; label: string }[] = [
  { key: 'booked', label: 'Booked' },
  { key: 'in_transit', label: 'In transit' },
  { key: 'customs', label: 'Customs' },
  { key: 'delivered', label: 'Delivered' },
]

function stepIndex(status: string) {
  return TRACK_STEPS.findIndex((s) => s.key === status)
}

export function DashboardShipments() {
  return (
    <div className="dash-section">
      {DEMO_SHIPMENTS.map((s) => {
        const current = stepIndex(s.status)
        return (
          <article key={s.id} className="dash-card dash-card--shipment">
            <div className="dash-shipment-head">
              <div>
                <p className="dash-track-id">{s.trackingId}</p>
                <h2 className="dash-card-title dash-card-title--inline">{s.commodity}</h2>
              </div>
              <span className={`dash-pill dash-pill--${s.status}`}>
                {SHIPMENT_STATUS_LABEL[s.status]}
              </span>
            </div>

            <dl className="dash-shipment-meta">
              <div>
                <dt>Route</dt>
                <dd>
                  {s.origin} → {s.destination}
                </dd>
              </div>
              <div>
                <dt>Value</dt>
                <dd>{formatUsd(s.valueUsd)}</dd>
              </div>
              <div>
                <dt>Weight</dt>
                <dd>{s.weight}</dd>
              </div>
              <div>
                <dt>Mode</dt>
                <dd className="dash-capitalize">{s.mode}</dd>
              </div>
              <div>
                <dt>ETA</dt>
                <dd>{s.eta}</dd>
              </div>
            </dl>

            <div className="dash-timeline" aria-label="Shipment progress">
              {TRACK_STEPS.map((step, i) => (
                <div
                  key={step.key}
                  className={`dash-timeline-step${i <= current ? ' is-done' : ''}${i === current ? ' is-current' : ''}`}
                >
                  <span className="dash-timeline-dot" />
                  <span className="dash-timeline-label">{step.label}</span>
                </div>
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )
}
