import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { Dock } from './Dock'
import { isPhotoHeroRoute } from '../lib/headerOnDark'
import { ContactWidget } from './ContactWidget'

export function Layout() {
  const { pathname } = useLocation()
  const isBankApp = pathname.startsWith('/bank')
  const isTradeRequest = /^\/(gold|silver|copper)\/(buy|sell)$/.test(pathname)
  const isDeskRequest = pathname === '/request'
  const isContact = pathname === '/contact'
  const hideWidget = isTradeRequest || isDeskRequest || isContact || isPhotoHeroRoute(pathname)
  const showFooter = pathname !== '/' && !pathname.startsWith('/bank') && !isTradeRequest && !isDeskRequest

  if (isBankApp) {
    return (
      <main className="cbos-root">
        <Outlet />
      </main>
    )
  }

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {showFooter ? <Footer /> : null}
      <Dock />
      {!hideWidget ? <ContactWidget /> : null}
    </>
  )
}
