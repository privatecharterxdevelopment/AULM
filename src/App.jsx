import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GoldPriceProvider } from './context/GoldPriceContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Shop from './pages/Shop'
import Sustainability from './pages/Sustainability'
import Contact from './pages/Contact'
import './styles/globals.css'

function App() {
  return (
    <GoldPriceProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </GoldPriceProvider>
  )
}

export default App
