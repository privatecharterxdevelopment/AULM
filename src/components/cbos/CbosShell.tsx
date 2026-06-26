import { useEffect, useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import '../../cbos/cbos-desk.css'
import { CbosProvider } from '../../cbos/context/CbosContext'
import { CbosBankHeader } from './CbosBankHeader'
import { CbosSidebar } from './CbosSidebar'

function CbosShellInner() {
  const { loading, isLoggedIn } = useAuth()
  const { pathname } = useLocation()
  const [entered, setEntered] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const isBankHome = pathname === '/bank' || pathname === '/bank/'
  const isFlowPage =
    pathname.startsWith('/bank/send') ||
    pathname.startsWith('/bank/receive') ||
    pathname.startsWith('/bank/exchange') ||
    pathname.startsWith('/bank/settings') ||
    pathname.startsWith('/bank/support') ||
    pathname.startsWith('/bank/notifications')
  const hideBankHeader = isBankHome || isFlowPage
  const openMobileNav = () => setMobileNav(true)
  const [railCollapsed, setRailCollapsed] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem('aulm-rail-collapsed') === '1',
  )

  const toggleRail = () => {
    setRailCollapsed((c) => {
      const next = !c
      localStorage.setItem('aulm-rail-collapsed', next ? '1' : '0')
      return next
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  if (loading) {
    return (
      <div className="cbos-bank-app">
        <div className="cbos-bank-shell">
          <main className="cbos-bank-app__main">
            <div className="cbos-bank cbos-bank--loading" aria-busy="true" />
          </main>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className={`cbos-bank-app${entered ? ' is-entered' : ''}`}>
      <div className={`cbos-bank-shell${railCollapsed ? ' is-rail-collapsed' : ''}`}>
        <CbosSidebar
          collapsed={railCollapsed}
          onToggleCollapse={toggleRail}
          mobileOpen={mobileNav}
          onMobileClose={() => setMobileNav(false)}
        />

        <div className="cbos-bank-shell__body">
          {!hideBankHeader ? <CbosBankHeader onMenuClick={openMobileNav} /> : null}
          <main className="cbos-bank-app__main">
            <Outlet context={{ onMenuClick: openMobileNav }} />
          </main>
        </div>
      </div>
    </div>
  )
}

export function CbosShell() {
  return (
    <CbosProvider>
      <CbosShellInner />
    </CbosProvider>
  )
}
