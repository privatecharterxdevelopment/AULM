import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { Dock } from './Dock'

export function Layout() {
  const { pathname } = useLocation()
  const showFooter = pathname !== '/'

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {showFooter ? <Footer /> : null}
      <Dock />
    </>
  )
}
