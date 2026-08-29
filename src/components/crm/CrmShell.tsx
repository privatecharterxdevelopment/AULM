import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { CrmSidebar } from './CrmSidebar'
import { CrmTopbar } from './CrmTopbar'
import '../../crm/crm.css'

export function CrmShell() {
  const { loading, isLoggedIn, isAdmin, isDemoMode } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (loading) return <div className="crm-loading" aria-busy="true" />
  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (!isAdmin && !isDemoMode) return <Navigate to="/bank" replace />

  return (
    <div className="crm-app">
      <CrmSidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="crm-shell">
        <CrmTopbar onMenuClick={() => setMobileOpen(true)} />
        <main className="crm-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
