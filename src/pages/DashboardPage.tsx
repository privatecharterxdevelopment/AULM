import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { DashboardApplication } from '../components/dashboard/DashboardApplication'
import { DashboardApprovalBanner } from '../components/dashboard/DashboardApprovalBanner'
import { DashboardLocked } from '../components/dashboard/DashboardLocked'
import { DashboardLogistics } from '../components/dashboard/DashboardLogistics'
import { DashboardNav, type DashboardTab } from '../components/dashboard/DashboardNav'
import { DashboardOverview } from '../components/dashboard/DashboardOverview'
import { DashboardBanking } from '../components/dashboard/DashboardBanking'
import { DashboardOrders } from '../components/dashboard/DashboardOrders'
import { DashboardSupport } from '../components/dashboard/DashboardSupport'
import { ConfettiBurst } from '../components/kyc/ConfettiBurst'
import { useAuth } from '../auth/AuthContext'
import { getSupabase, tables, type SupportMessage } from '../lib/supabase'
import { notifyOps } from '../utils/notifyOps'
import { useLiveMetalPrices } from '../hooks/useLiveMetalPrices'

const LOCKED_TABS: DashboardTab[] = ['orders', 'banking', 'logistics']

export function DashboardPage() {
  const { user, profile, loading, isLoggedIn, isDemoMode, refreshProfile } = useAuth()
  const { gold } = useLiveMetalPrices()
  const [tab, setTab] = useState<DashboardTab>('overview')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [sending, setSending] = useState(false)
  const [entered, setEntered] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem('aulm_dashboard_welcome') === '1') {
      sessionStorage.removeItem('aulm_dashboard_welcome')
      setShowWelcome(true)
    }
  }, [])

  useEffect(() => {
    if (!user) return
    const supabase = getSupabase()
    if (!supabase) return
    void supabase
      .from(tables.supportMessages)
      .select('id, body, from_admin, created_at, user_id')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => setMessages(data ?? []))
  }, [user])

  if (!loading && !isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  const kycStatus = profile?.kyc_status ?? 'none'
  const kycApproved = kycStatus === 'approved'
  const showLocked = !kycApproved && LOCKED_TABS.includes(tab)

  const sendSupport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !user) return
    const supabase = getSupabase()
    if (!supabase) return
    setSending(true)
    const body = message.trim()
    const { data, error } = await supabase
      .from(tables.supportMessages)
      .insert({ user_id: user.id, body, from_admin: false })
      .select('id, body, from_admin, created_at, user_id')
      .single()
    setSending(false)
    if (!error && data) {
      setMessages((prev) => [data as SupportMessage, ...prev])
      setMessage('')
      notifyOps({
        type: 'support_message',
        customerEmail: profile?.email ?? user.email,
        company: profile?.company_name ?? undefined,
        message: body,
      })
    }
  }

  return (
    <div className={`kyc-page dash-page${entered ? ' is-entered' : ''}`}>
      {showWelcome ? <ConfettiBurst /> : null}
      <div className="kyc-page-overlay" aria-hidden />
      <div className="kyc-page-shell kyc-page-shell--wide">
        <header className="dash-header">
          <div>
            <p className="kyc-page-eyebrow">Institutional dashboard</p>
            <h1 className="kyc-page-title">
              Hello{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}
            </h1>
            {profile?.company_name ? (
              <p className="dash-company">{profile.company_name}</p>
            ) : null}
          </div>
        </header>

        <DashboardApprovalBanner status={kycStatus} />

        {isDemoMode ? (
          <p className="dash-demo-banner" role="status">
            Demo mode — sample data only. Orders and messages are not saved to the live desk.
          </p>
        ) : null}

        <DashboardNav active={tab} kycApproved={kycApproved} onChange={setTab} />

        {tab === 'overview' ? (
          <DashboardOverview
            gold={gold}
            kycApproved={kycApproved}
            onGoToOrders={kycApproved ? () => setTab('orders') : undefined}
          />
        ) : null}
        {tab === 'application' ? <DashboardApplication /> : null}
        {showLocked ? <DashboardLocked title={tab.charAt(0).toUpperCase() + tab.slice(1)} /> : null}
        {!showLocked && tab === 'orders' ? <DashboardOrders /> : null}
        {!showLocked && tab === 'banking' ? <DashboardBanking /> : null}
        {!showLocked && tab === 'logistics' ? <DashboardLogistics /> : null}
        {tab === 'support' ? (
          <DashboardSupport
            kycStatus={kycStatus}
            message={message}
            messages={messages}
            sending={sending}
            onMessageChange={setMessage}
            onSubmit={sendSupport}
            onRefresh={() => void refreshProfile()}
          />
        ) : null}
      </div>
    </div>
  )
}
