import { DEMO_APPROVALS } from '../../../cbos/mocks/demoData'
import { CbosGlass } from '../CbosGlass'
import { CbosPage } from '../CbosPage'
import { CbosPageHeader } from '../CbosPageHeader'

export function CbosApprovals() {
  return (
    <CbosPage>
      <CbosPageHeader
        label="Workflow"
        title="Approvals"
        subtitle="Multi-level sign-off before funds release"
      />

      <ul className="cbos-approval-cards">
        {DEMO_APPROVALS.map((a, i) => (
          <li key={a.id}>
            <CbosGlass stagger={100 + i * 80} className="cbos-approval-card">
              <div>
                <p className="cbos-activity-title">{a.title}</p>
                <p className="cbos-activity-meta">
                  {a.escrowRef} · {a.step}
                </p>
              </div>
              <div className="cbos-approval-actions">
                <button type="button" className="cbos-text-btn">
                  Reject
                </button>
                <button type="button" className="cbos-btn">
                  Approve
                </button>
              </div>
            </CbosGlass>
          </li>
        ))}
      </ul>
    </CbosPage>
  )
}
