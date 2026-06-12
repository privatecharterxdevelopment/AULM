export type AdminTab = 'applications' | 'orders' | 'support' | 'logistics'

type Props = {
  active: AdminTab
  counts: { applications: number; orders: number; support: number; logistics: number }
  onChange: (tab: AdminTab) => void
}

export function AdminNav({ active, counts, onChange }: Props) {
  const tabs: { id: AdminTab; label: string; count: number }[] = [
    { id: 'applications', label: 'Applications', count: counts.applications },
    { id: 'orders', label: 'Orders', count: counts.orders },
    { id: 'support', label: 'Support', count: counts.support },
    { id: 'logistics', label: 'Logistics', count: counts.logistics },
  ]

  return (
    <nav className="dash-nav admin-nav" aria-label="Admin sections">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`dash-nav-btn${active === t.id ? ' is-active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
          {t.count > 0 ? <span className="admin-nav-count">{t.count}</span> : null}
        </button>
      ))}
    </nav>
  )
}
