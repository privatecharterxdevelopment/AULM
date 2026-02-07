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
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Gold Sourcing</Link></li>
              <li><Link to="/services">Import & Export</Link></li>
              <li><Link to="/services">Refinery</Link></li>
              <li><Link to="/services">Logistics</Link></li>
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

        <div className="footer-bottom">
          <div className="footer-legal">
            <span>© 2026 AULM Global Trade Corporation. All rights reserved.</span>
          </div>
          <span>DMCC & IFZA Licensed · Dubai, UAE</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
