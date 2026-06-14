import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { Layout } from './components/Layout'
import { CompanyPage } from './pages/CompanyPage'
import { HomePage } from './pages/HomePage'
import { LogisticsPage } from './pages/LogisticsPage'
import { MetalPage } from './pages/MetalPage'
import { BankingPage } from './pages/BankingPage'
import { BankingPreApplyPage } from './pages/BankingPreApplyPage'
import { AuthPage } from './pages/AuthPage'
import { AdminPage } from './pages/AdminPage'
import { DashboardPage } from './pages/DashboardPage'
import { KycOnboardingPage } from './pages/KycOnboardingPage'
import { ProcedureDetailPage } from './pages/DocumentPage'
import { ProcedurePage } from './pages/DocumentsPage'
import { EscrowPage } from './pages/EscrowPage'
import { RefineryPage } from './pages/RefineryPage'
import { ContactPage } from './pages/ContactPage'
import { VaultPage } from './pages/VaultPage'
import './App.css'

function LegacyDocumentRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return <Navigate to={slug ? `/company/procedure/${slug}` : '/company/procedure'} replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="buy" element={<Navigate to="/gold" replace />} />
            <Route path="company" element={<CompanyPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="company/procedure" element={<ProcedurePage />} />
            <Route path="company/procedure/:slug" element={<ProcedureDetailPage />} />
            <Route path="documents" element={<Navigate to="/company/procedure" replace />} />
            <Route path="documents/:slug" element={<LegacyDocumentRedirect />} />
            <Route path="vault" element={<VaultPage />} />
            <Route path="escrow" element={<EscrowPage />} />
            <Route path="banking" element={<BankingPage />} />
            <Route path="banking/pre-apply" element={<BankingPreApplyPage />} />
            <Route path="refinery" element={<RefineryPage />} />
            <Route path="logistics/:mode" element={<LogisticsPage />} />
            <Route path="onboarding" element={<KycOnboardingPage />} />
            <Route path="onboarding/complete" element={<Navigate to="/dashboard" replace />} />
            <Route path="kyconboarding" element={<KycOnboardingPage />} />
            <Route path="login" element={<AuthPage mode="login" />} />
            <Route path="register" element={<Navigate to="/onboarding" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path=":metalId" element={<MetalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
