export type DashboardTab =
  | 'overview'
  | 'application'
  | 'orders'
  | 'banking'
  | 'vault'
  | 'logistics'
  | 'support'

const TABS: { id: DashboardTab; label: string; requiresApproval?: boolean; comingSoon?: boolean }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'application', label: 'Application' },
  { id: 'orders', label: 'Orders', requiresApproval: true },
  { id: 'banking', label: 'Banking', requiresApproval: true, comingSoon: true },
  { id: 'vault', label: 'Vault', requiresApproval: true },
  { id: 'logistics', label: 'Logistics', requiresApproval: true },
  { id: 'support', label: 'Support' },
]

type Props = {
  active: DashboardTab
  kycApproved: boolean
  onChange: (tab: DashboardTab) => void
}

export function DashboardNav({ active, kycApproved, onChange }: Props) {
  return (
    <nav className="dash-nav" aria-label="Dashboard sections">
      {TABS.map((tab) => {
        const locked = tab.requiresApproval && !kycApproved
        return (
          <button
            key={tab.id}
            type="button"
            className={`dash-nav-item${active === tab.id ? ' is-active' : ''}${locked ? ' is-locked' : ''}`}
            onClick={() => onChange(tab.id)}
            aria-current={active === tab.id ? 'page' : undefined}
            title={
              locked
                ? 'Unlocks after account approval'
                : tab.comingSoon
                  ? 'Coming soon'
                  : undefined
            }
          >
            {tab.label}
            {tab.comingSoon ? <span className="dash-nav-soon"> soon</span> : null}
            {locked ? <span className="dash-nav-lock" aria-hidden> ·</span> : null}
          </button>
        )
      })}
    </nav>
  )
}
