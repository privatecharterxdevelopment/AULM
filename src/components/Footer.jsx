import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">AULM</Link>
            <p>Swiss-Arab gold trading. DMCC & IFZA licensed, Dubai.</p>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">Who we are</Link></li>
              <li><Link to="/services">What we do</Link></li>
              <li><Link to="/sustainability">Sustainability</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>News</h4>
            <ul>
              <li><Link to="/news">Industry Insights</Link></li>
              <li><Link to="/news">Market Analysis</Link></li>
              <li><Link to="/news">Compliance Updates</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Gold Sourcing</Link></li>
              <li><Link to="/services">Import & Export</Link></li>
              <li><Link to="/services">Refinery</Link></li>
              <li><Link to="/tokenization">Tokenization</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of use</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            <strong>B2B Only.</strong> AULM Global Trade Corporation services are exclusively available to qualified institutional clients, licensed traders, and accredited investors. All transactions are subject to full KYC/AML verification and comply with OECD due diligence guidelines for responsible supply chains.
          </p>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© 2026 AULM Global Trade Corporation. All rights reserved.</span>
          </div>
          <span>IFZA License No. 33847 · Dubai, UAE</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
