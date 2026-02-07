import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { GoldPriceProvider } from './context/GoldPriceContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Tokenization from './pages/Tokenization'
import Sustainability from './pages/Sustainability'
import Contact from './pages/Contact'
import './styles/globals.css'

function AppContent() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <>
      <Header />
      <main className={isHomePage ? 'home-main' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tokenization" element={<Tokenization />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      {!isHomePage && <Footer />}
    </>
  )
}

function App() {
  return (
    <GoldPriceProvider>
      <Router>
        <AppContent />
      </Router>
    </GoldPriceProvider>
  )
}

export default App
