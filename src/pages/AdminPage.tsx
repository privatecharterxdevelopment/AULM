import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { AdminApplications } from '../components/admin/AdminApplications'
import { AdminLogistics } from '../components/admin/AdminLogistics'
import { AdminOrders } from '../components/admin/AdminOrders'
import { AdminShell } from '../components/admin/AdminShell'
import { AdminSupport } from '../components/admin/AdminSupport'
import {
  getSupabase,
  tables,
  type KycApplication,
  type LogisticsRequest,
  type Order,
  type Profile,
  type SupportMessage,
} from '../lib/supabase'

type AdminData = {
  applications: KycApplication[]
  messages: SupportMessage[]
  logistics: LogisticsRequest[]
  orders: Order[]
  profiles: Profile[]
  loadError: string | null
  demoNotice: string | null
  reload: () => void
}

const AdminDataContext = createContext<AdminData | null>(null)

function useAdminData() {
  const ctx = useContext(AdminDataContext)
  if (!ctx) throw new Error('Admin data missing')
  return ctx
}

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function AdminDashboard() {
  const { profile } = useAuth()
  const { applications, orders, logistics, messages, profiles } = useAdminData()
  const firstName = (profile?.full_name ?? 'Admin').split(' ')[0]
  const pendingApps = applications.filter((a) => a.status === 'under_review')
  const openOrders = orders.filter((o) => o.status === 'submitted' || o.status === 'in_progress')
  const openLogistics = logistics.filter((r) => r.status === 'submitted' || r.status === 'in_progress')
  const customerMessages = messages.filter((m) => !m.from_admin)

  return (
    <div className="cbos-bank">
      <header className="admin-desk-card" style={{ marginBottom: 16 }}>
        <p className="dash-card-text" style={{ margin: 0 }}>Admin desk</p>
        <h2 className="dash-card-title" style={{ fontSize: 28, marginTop: 6 }}>
          {greeting()}, {firstName}
        </h2>
        <p className="dash-card-text">
          Live queue for KYC applications, customer accounts, orders, support and logistics.
        </p>
      </header>

      <section className="admin-desk-hero" aria-label="Ops summary">
        <div className="admin-desk-hero__lead">
          <span>Open work items</span>
          <strong>{pendingApps.length + openOrders.length + openLogistics.length + customerMessages.length}</strong>
          <small>
            {profiles.length} customers · {applications.length} applications · {orders.length} orders
          </small>
        </div>
        <article>
          <span>KYC review</span>
          <strong>{pendingApps.length}</strong>
          <small>Under review</small>
        </article>
        <article>
          <span>Orders</span>
          <strong>{openOrders.length}</strong>
          <small>In progress</small>
        </article>
        <article>
          <span>Support</span>
          <strong>{customerMessages.length}</strong>
          <small>Customer messages</small>
        </article>
        <article>
          <span>Logistics</span>
          <strong>{openLogistics.length}</strong>
          <small>Open mandates</small>
        </article>
      </section>

      <div className="admin-desk-grid">
        <section className="admin-desk-card">
          <header className="admin-desk-card__head">
            <h2>Pending applications</h2>
            <Link to="/admin/applications">Open inbox</Link>
          </header>
          {pendingApps.length === 0 ? (
            <p className="dash-card-text">No KYC applications waiting for review.</p>
          ) : (
            <ul className="admin-desk-queue">
              {pendingApps.slice(0, 6).map((app) => (
                <li key={app.id}>
                  <div>
                    <strong>{app.company_legal_name}</strong>
                    <span>{app.contact_email} · {app.status.replace(/_/g, ' ')}</span>
                  </div>
                  <em>Review</em>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="admin-desk-card">
          <header className="admin-desk-card__head">
            <h2>Latest customers</h2>
            <Link to="/admin/customers">View all</Link>
          </header>
          {profiles.length === 0 ? (
            <p className="dash-card-text">No customer profiles loaded yet.</p>
          ) : (
            <ul className="admin-desk-queue">
              {profiles.slice(0, 6).map((p) => (
                <li key={p.id}>
                  <div>
                    <strong>{p.full_name || p.company_name || p.email}</strong>
                    <span>{p.email} · KYC {p.kyc_status?.replace(/_/g, ' ') ?? 'unknown'}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

function AdminCustomers() {
  const { profiles } = useAdminData()
  return (
    <div className="dash-section">
      <section className="dash-card">
        <h2 className="dash-card-title">Customers</h2>
        <p className="dash-card-text">{profiles.length} profiles from CommodityBank onboarding</p>
        {profiles.length === 0 ? (
          <p className="dash-card-text">No customers yet.</p>
        ) : (
          <ul className="admin-list">
            {profiles.map((p) => (
              <li key={p.id} className="admin-list-item admin-list-item--static">
                <div className="admin-list-head">
                  <div>
                    <p className="admin-list-title">{p.full_name || p.company_name || 'Unnamed'}</p>
                    <p className="admin-list-meta">
                      {p.email}
                      {p.company_name ? ` · ${p.company_name}` : ''}
                    </p>
                  </div>
                  <span className={`dash-pill dash-pill--${p.kyc_status === 'approved' ? 'approved' : p.kyc_status === 'rejected' ? 'rejected' : 'submitted'}`}>
                    {p.kyc_status?.replace(/_/g, ' ') ?? 'unknown'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function AdminProvider({ children }: { children: ReactNode }) {
  const { isAdmin, isDemoMode } = useAuth()
  const [applications, setApplications] = useState<KycApplication[]>([])
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [logistics, setLogistics] = useState<LogisticsRequest[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)
  const [demoNotice, setDemoNotice] = useState<string | null>(null)

  const loadAll = useCallback(async () => {
    const supabase = getSupabase()
    if (!supabase) {
      setDemoNotice('Supabase is not configured in this environment. Admin actions need a live project connection.')
      return
    }

    const [kycRes, msgRes, logRes, ordRes, profRes] = await Promise.all([
      supabase.from(tables.kycApplications).select('*').order('created_at', { ascending: false }),
      supabase.from(tables.supportMessages).select('*').order('created_at', { ascending: true }),
      supabase.from(tables.logisticsRequests).select('*').order('created_at', { ascending: false }),
      supabase.from(tables.orders).select('*').order('created_at', { ascending: false }),
      supabase.from(tables.profiles).select('*').order('created_at', { ascending: false }),
    ])

    if (kycRes.error || msgRes.error || logRes.error || ordRes.error || profRes.error) {
      setLoadError(
        kycRes.error?.message ??
          msgRes.error?.message ??
          logRes.error?.message ??
          ordRes.error?.message ??
          profRes.error?.message ??
          'Failed to load admin data. Run supabase migrations and set is_admin on your profile.',
      )
      return
    }

    setLoadError(null)
    setDemoNotice(null)
    setApplications((kycRes.data ?? []) as KycApplication[])
    setMessages((msgRes.data ?? []) as SupportMessage[])
    setLogistics((logRes.data ?? []) as LogisticsRequest[])
    setOrders((ordRes.data ?? []) as Order[])
    setProfiles((profRes.data ?? []) as Profile[])
  }, [])

  useEffect(() => {
    if (isAdmin || isDemoMode) void loadAll()
  }, [isAdmin, isDemoMode, loadAll])

  const value = useMemo(
    () => ({
      applications,
      messages,
      logistics,
      orders,
      profiles,
      loadError,
      demoNotice,
      reload: () => void loadAll(),
    }),
    [applications, messages, logistics, orders, profiles, loadError, demoNotice, loadAll],
  )

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
}

function AdminRoutes() {
  const data = useAdminData()
  const pendingApps = data.applications.filter((a) => a.status === 'under_review').length
  const openLogistics = data.logistics.filter((r) => r.status === 'submitted' || r.status === 'in_progress').length
  const openOrders = data.orders.filter((o) => o.status === 'submitted' || o.status === 'in_progress').length

  return (
    <AdminShell
      counts={{
        applications: pendingApps,
        orders: openOrders,
        support: data.messages.filter((m) => !m.from_admin).length,
        logistics: openLogistics,
        customers: data.profiles.length,
      }}
    >
      {data.loadError ? <div className="admin-desk-banner" role="alert">{data.loadError}</div> : null}
      {data.demoNotice ? <div className="admin-desk-banner admin-desk-banner--info" role="status">{data.demoNotice}</div> : null}

      <Routes>
        <Route index element={<AdminDashboard />} />
        <Route
          path="applications"
          element={<AdminApplications applications={data.applications} onUpdated={data.reload} />}
        />
        <Route path="customers" element={<AdminCustomers />} />
        <Route
          path="orders"
          element={<AdminOrders orders={data.orders} profiles={data.profiles} onUpdated={data.reload} />}
        />
        <Route
          path="support"
          element={
            <AdminSupport
              messages={data.messages}
              profiles={data.profiles}
              onRefresh={data.reload}
            />
          }
        />
        <Route
          path="logistics"
          element={
            <AdminLogistics
              requests={data.logistics}
              profiles={data.profiles}
              onUpdated={data.reload}
            />
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminShell>
  )
}

export function AdminPage() {
  return (
    <AdminProvider>
      <AdminRoutes />
    </AdminProvider>
  )
}
