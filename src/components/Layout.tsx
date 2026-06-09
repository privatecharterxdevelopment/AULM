import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Dock } from './Dock'

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Dock />
    </>
  )
}
