import { useCallback, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { AdminApplications } from '../components/admin/AdminApplications'
import { AdminLogistics } from '../components/admin/AdminLogistics'
import { AdminOrders } from '../components/admin/AdminOrders'
import { AdminNav, type AdminTab } from '../components/admin/AdminNav'
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

export function AdminPage() {
  const { loading, isLoggedIn, isAdmin } = useAuth()
  const [tab, setTab] = useState<AdminTab>('applications')
  const [entered, setEntered] = useState(false)
  const [applications, setApplications] = useState<KycApplication[]>([])
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [logistics, setLogistics] = useState<LogisticsRequest[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loadError, setLoadError] = useState<string | null>(null)

  const loadAll = useCallback(async () => {
    const supabase = getSupabase()
    if (!supabase) return

    const [kycRes, msgRes, logRes, ordRes, profRes] = await Promise.all([
      supabase
        .from(tables.kycApplications)
        .select('*')
        .order('created_at', { ascending: false }),
      supabase
        .from(tables.supportMessages)
        .select('*')
        .order('created_at', { ascending: true }),
      supabase
        .from(tables.logisticsRequests)
        .select('*')
        .order('created_at', { ascending: false }),
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
    setApplications((kycRes.data ?? []) as KycApplication[])
    setMessages((msgRes.data ?? []) as SupportMessage[])
    setLogistics((logRes.data ?? []) as LogisticsRequest[])
    setOrders((ordRes.data ?? []) as Order[])
    setProfiles((profRes.data ?? []) as Profile[])
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (isAdmin) void loadAll()
  }, [isAdmin, loadAll])

  if (!loading && !isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (!loading && isLoggedIn && !isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  const pendingApps = applications.filter((a) => a.status === 'under_review').length
  const openLogistics = logistics.filter(
    (r) => r.status === 'submitted' || r.status === 'in_progress',
  ).length
  const openOrders = orders.filter(
    (o) => o.status === 'submitted' || o.status === 'in_progress',
  ).length

  return (
    <div className={`kyc-page dash-page admin-page${entered ? ' is-entered' : ''}`}>
      <div className="kyc-page-overlay" aria-hidden />
      <div className="kyc-page-shell kyc-page-shell--wide">
        <header className="dash-header">
          <div>
            <p className="kyc-page-eyebrow">Operations</p>
            <h1 className="kyc-page-title">Admin</h1>
            <p className="dash-card-text">
              Applications, support, and logistics — notifications to contact@aulmtrading.com
            </p>
          </div>
        </header>

        {loadError ? (
          <div className="dash-approval-banner dash-approval-banner--rejected" role="alert">
            {loadError}
          </div>
        ) : null}

        <AdminNav
          active={tab}
          counts={{
            applications: pendingApps,
            orders: openOrders,
            support: messages.filter((m) => !m.from_admin).length,
            logistics: openLogistics,
          }}
          onChange={setTab}
        />

        {tab === 'applications' ? (
          <AdminApplications applications={applications} onUpdated={() => void loadAll()} />
        ) : null}
        {tab === 'orders' ? (
          <AdminOrders orders={orders} profiles={profiles} onUpdated={() => void loadAll()} />
        ) : null}
        {tab === 'support' ? (
          <AdminSupport
            messages={messages}
            profiles={profiles}
            onRefresh={() => void loadAll()}
          />
        ) : null}
        {tab === 'logistics' ? (
          <AdminLogistics
            requests={logistics}
            profiles={profiles}
            onUpdated={() => void loadAll()}
          />
        ) : null}
      </div>
    </div>
  )
}
