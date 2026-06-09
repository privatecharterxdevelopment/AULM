import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { Layout } from './components/Layout'
import { CompanyPage } from './pages/CompanyPage'
import { HomePage } from './pages/HomePage'
import { LogisticsPage } from './pages/LogisticsPage'
import { MetalPage } from './pages/MetalPage'
import { VaultPage } from './pages/VaultPage'
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="buy" element={<Navigate to="/gold" replace />} />
            <Route path="company" element={<CompanyPage />} />
            <Route path="vault" element={<VaultPage />} />
            <Route path="logistics/:mode" element={<LogisticsPage />} />
            <Route path=":metalId" element={<MetalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
