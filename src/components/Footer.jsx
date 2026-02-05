import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">AULM TRADING</Link>
            <p>Responsibly sourced gold directly from fair mines. IFZA licensed, Dubai.</p>
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
              <li><Link to="/shop">Buy Gold</Link></li>
              <li><Link to="/services">Fair Mine Sourcing</Link></li>
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
            <span>© 2026 AULM Trading. All rights reserved.</span>
          </div>
          <span>IFZA Licensed · Dubai, UAE</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
