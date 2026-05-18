import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { GoldPriceProvider } from './context/GoldPriceContext'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Tokenization from './pages/Tokenization'
import Sustainability from './pages/Sustainability'
import Contact from './pages/Contact'
import News from './pages/News'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import KYCOnboarding from './pages/KYCOnboarding'
import RefineryDubai from './pages/RefineryDubai'
import GoldImportDubai from './pages/GoldImportDubai'
import InstitutionalGoldDubai from './pages/InstitutionalGoldDubai'
import OpenAccount from './pages/OpenAccount'
import Seo from './components/Seo'
import './styles/globals.css'

function AppContent() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <>
      <Seo />
      <Header />
      <main className={isHomePage ? 'home-main' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/refinery-dubai" element={<RefineryDubai />} />
          <Route path="/gold-import-dubai" element={<GoldImportDubai />} />
          <Route path="/sell-gold-institutional-dubai" element={<InstitutionalGoldDubai />} />
          <Route path="/open-account" element={<OpenAccount />} />
          <Route path="/tokenization" element={<Tokenization />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/kyconboarding" element={<KYCOnboarding />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<News />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>
      {!isHomePage && <Footer />}
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <GoldPriceProvider>
        <Router>
          <AppContent />
        </Router>
      </GoldPriceProvider>
    </LanguageProvider>
  )
}

export default App
