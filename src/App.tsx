import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { Layout } from './components/Layout'
import { CbosShell } from './components/cbos/CbosShell'
import { CbosHome } from './components/cbos/pages/CbosHome'
import { CbosWallets } from './components/cbos/pages/CbosWallets'
import { CbosEscrows } from './components/cbos/pages/CbosEscrows'
import { CbosEscrowCreate } from './components/cbos/pages/CbosEscrowCreate'
import { CbosEscrowDetail } from './components/cbos/pages/CbosEscrowDetail'
import { CbosTransfers } from './components/cbos/pages/CbosTransfers'
import { CbosSend } from './components/cbos/pages/CbosSend'
import { CbosReceive } from './components/cbos/pages/CbosReceive'
import { CbosExchange } from './components/cbos/pages/CbosExchange'
import { CbosCards } from './components/cbos/pages/CbosCards'
import { CbosCrypto } from './components/cbos/pages/CbosCrypto'
import { CbosApprovals } from './components/cbos/pages/CbosApprovals'
import { CbosDocuments } from './components/cbos/pages/CbosDocuments'
import { CbosKyc } from './components/cbos/pages/CbosKyc'
import { CbosSettings } from './components/cbos/pages/CbosSettings'
import { CbosOrders } from './components/cbos/pages/CbosOrders'
import { CbosLogistics } from './components/cbos/pages/CbosLogistics'
import { CbosVault } from './components/cbos/pages/CbosVault'
import { CbosSupport } from './components/cbos/pages/CbosSupport'
import { CbosNotifications } from './components/cbos/pages/CbosNotifications'
import { CbosTrading } from './components/cbos/pages/CbosTrading'
import { CompanyPage } from './pages/CompanyPage'
import { HomePage } from './pages/HomePage'
import { LogisticsPage } from './pages/LogisticsPage'
import { MetalPage } from './pages/MetalPage'
import { BankingPage } from './pages/BankingPage'
import { BankingPreApplyPage } from './pages/BankingPreApplyPage'
import { AuthPage } from './pages/AuthPage'
import { AdminPage } from './pages/AdminPage'
import { KycOnboardingPage } from './pages/KycOnboardingPage'
import { ProcedureDetailPage } from './pages/DocumentPage'
import { ProcedurePage } from './pages/DocumentsPage'
import { EscrowPage } from './pages/EscrowPage'
import { RefineryPage } from './pages/RefineryPage'
import { ContactPage } from './pages/ContactPage'
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
            <Route path="vault" element={<Navigate to="/bank/vault" replace />} />
            <Route path="escrow" element={<EscrowPage />} />
            <Route path="banking" element={<BankingPage />} />
            <Route path="banking/pre-apply" element={<BankingPreApplyPage />} />
            <Route path="refinery" element={<RefineryPage />} />
            <Route path="logistics/:mode" element={<LogisticsPage />} />
            <Route path="onboarding" element={<KycOnboardingPage />} />
            <Route path="onboarding/complete" element={<Navigate to="/bank" replace />} />
            <Route path="kyconboarding" element={<KycOnboardingPage />} />
            <Route path="login" element={<AuthPage mode="login" />} />
            <Route path="register" element={<Navigate to="/onboarding" replace />} />
            <Route path="dashboard" element={<Navigate to="/bank" replace />} />
            <Route path="bank" element={<CbosShell />}>
              <Route index element={<CbosHome />} />
              <Route path="trading" element={<CbosTrading />} />
              <Route path="orders" element={<CbosOrders />} />
              <Route path="vault" element={<CbosVault />} />
              <Route path="logistics" element={<CbosLogistics />} />
              <Route path="support" element={<CbosSupport />} />
              <Route path="notifications" element={<CbosNotifications />} />
              <Route path="wallets" element={<CbosWallets />} />
              <Route path="escrows" element={<CbosEscrows />} />
              <Route path="escrows/new" element={<CbosEscrowCreate />} />
              <Route path="escrows/:id" element={<CbosEscrowDetail />} />
              <Route path="transfers" element={<CbosTransfers />} />
              <Route path="send" element={<CbosSend />} />
              <Route path="receive" element={<CbosReceive />} />
              <Route path="exchange" element={<CbosExchange />} />
              <Route path="cards" element={<CbosCards />} />
              <Route path="crypto" element={<CbosCrypto />} />
              <Route path="savings" element={<Navigate to="/bank/vault" replace />} />
              <Route path="approvals" element={<CbosApprovals />} />
              <Route path="documents" element={<CbosDocuments />} />
              <Route path="kyc" element={<CbosKyc />} />
              <Route path="settings" element={<CbosSettings />} />
            </Route>
            <Route path="admin" element={<AdminPage />} />
            <Route path=":metalId" element={<MetalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
