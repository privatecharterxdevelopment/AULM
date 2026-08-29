import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { Layout } from './components/Layout'
import { CbosShell } from './components/cbos/CbosShell'
import { CbosHome } from './components/cbos/pages/CbosHome'
import { CbosWallets } from './components/cbos/pages/CbosWallets'
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
import { MetalPage } from './pages/MetalPage'
import { MetalRequestPage } from './pages/MetalRequestPage'
import { AuthPage } from './pages/AuthPage'
import { KycOnboardingPage } from './pages/KycOnboardingPage'
import { KycCompletePage } from './pages/KycCompletePage'
import { ProcedureDetailPage } from './pages/DocumentPage'
import { ProcedurePage } from './pages/DocumentsPage'
import { RefineryPage } from './pages/RefineryPage'
import { ContactPage } from './pages/ContactPage'
import { NewsPage } from './pages/NewsPage'
import { DeskFilesPage } from './pages/DeskFilesPage'
import { NewsArticlePage } from './pages/NewsArticlePage'
import { SupplyChainPage } from './pages/SupplyChainPage'
import { InvestorsPage } from './pages/InvestorsPage'
import { RequestPage } from './pages/RequestPage'
import { TokenizationPage } from './pages/TokenizationPage'
import { AfricaPage } from './pages/AfricaPage'
import { ResponsibleSourcingPage } from './pages/ResponsibleSourcingPage'
import { LegalPage } from './pages/LegalPage'
import { CrmShell } from './components/crm/CrmShell'
import { CrmDashboard } from './components/crm/pages/CrmDashboard'
import { CrmClients } from './components/crm/pages/CrmClients'
import { CrmClientDetail } from './components/crm/pages/CrmClientDetail'
import { CrmClientNew } from './components/crm/pages/CrmClientNew'
import { CrmInvoices } from './components/crm/pages/CrmInvoices'
import {
  CrmApprovals,
  CrmAudit,
  CrmDocuments,
  CrmEvault,
  CrmGenerators,
  CrmOnboarding,
  CrmTasks,
  CrmTeam,
  CrmTransactions,
} from './components/crm/pages/CrmOperations'
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
            <Route path="about" element={<Navigate to="/company" replace />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="company/procedure" element={<ProcedurePage />} />
            <Route path="company/procedure/:slug" element={<ProcedureDetailPage />} />
            <Route path="documents" element={<Navigate to="/company/procedure" replace />} />
            <Route path="documents/:slug" element={<LegacyDocumentRedirect />} />
            <Route path="gold-supply-chain-dubai" element={<SupplyChainPage />} />
            <Route path="supply-chain" element={<Navigate to="/gold-supply-chain-dubai" replace />} />
            <Route path="pdf" element={<DeskFilesPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="news/:slug" element={<NewsArticlePage />} />
            <Route path="investors" element={<InvestorsPage />} />
            <Route path="investor" element={<Navigate to="/investors" replace />} />
            <Route path="tokenization" element={<TokenizationPage />} />
            <Route path="responsible-sourcing" element={<ResponsibleSourcingPage />} />
            <Route path="africa" element={<AfricaPage />} />
            <Route path="local-projects" element={<Navigate to="/africa" replace />} />
            <Route path="on-the-ground" element={<Navigate to="/africa" replace />} />
            <Route path="sustainability" element={<Navigate to="/responsible-sourcing" replace />} />
            <Route path="legal" element={<LegalPage kind="legal" />} />
            <Route path="impressum" element={<Navigate to="/legal" replace />} />
            <Route path="terms" element={<Navigate to="/legal" replace />} />
            <Route path="privacy" element={<LegalPage kind="privacy" />} />
            <Route path="request" element={<RequestPage />} />
            <Route path="vault" element={<Navigate to="/onboarding" replace />} />
            <Route path="escrow" element={<Navigate to="/contact" replace />} />
            <Route path="banking" element={<Navigate to="/onboarding" replace />} />
            <Route path="banking/pre-apply" element={<Navigate to="/onboarding" replace />} />
            <Route path="open-account" element={<Navigate to="/onboarding" replace />} />
            <Route path="seller-onboarding" element={<Navigate to="/onboarding" replace />} />
            <Route path="refinery" element={<RefineryPage />} />
            <Route path="refinery-dubai" element={<Navigate to="/refinery" replace />} />
            <Route path="gold-import-dubai" element={<Navigate to="/" replace />} />
            <Route path="buy-gold-dubai" element={<Navigate to="/gold/buy" replace />} />
            <Route path="sell-gold-dubai" element={<Navigate to="/gold/sell" replace />} />
            <Route path="sell-gold-institutional-dubai" element={<Navigate to="/gold/sell" replace />} />
            <Route path="institutional-gold-trading" element={<Navigate to="/gold" replace />} />
            <Route path="compliance-gold-trading" element={<Navigate to="/company/procedure" replace />} />
            <Route path="logistics" element={<Navigate to="/" replace />} />
            <Route path="logistics/:mode" element={<Navigate to="/" replace />} />
            <Route path="onboarding" element={<KycOnboardingPage />} />
            <Route path="onboarding/complete" element={<KycCompletePage />} />
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
              <Route path="escrows" element={<Navigate to="/bank" replace />} />
              <Route path="escrows/new" element={<Navigate to="/bank" replace />} />
              <Route path="escrows/:id" element={<Navigate to="/bank" replace />} />
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
            <Route path=":metalId/:action" element={<MetalRequestPage />} />
            <Route path=":metalId" element={<MetalPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="admin" element={<Navigate to="/crm" replace />} />
          <Route path="admin/*" element={<Navigate to="/crm" replace />} />
          <Route path="crm" element={<CrmShell />}>
            <Route index element={<CrmDashboard />} />
            <Route path="clients" element={<CrmClients />} />
            <Route path="clients/new" element={<CrmClientNew />} />
            <Route path="clients/:id" element={<CrmClientDetail />} />
            <Route path="invoices" element={<CrmInvoices />} />
            <Route path="transactions" element={<CrmTransactions />} />
            <Route path="documents" element={<CrmDocuments />} />
            <Route path="onboarding" element={<CrmOnboarding />} />
            <Route path="approvals" element={<CrmApprovals />} />
            <Route path="escrows" element={<Navigate to="/crm" replace />} />
            <Route path="evault" element={<CrmEvault />} />
            <Route path="generators" element={<CrmGenerators />} />
            <Route path="tasks" element={<CrmTasks />} />
            <Route path="team" element={<CrmTeam />} />
            <Route path="audit" element={<CrmAudit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
