import { Link } from 'react-router-dom'
import { useGoldPrice } from '../context/GoldPriceContext'

function Services() {
  const { discountPercentage } = useGoldPrice()

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>What We Do</h1>
          <p>Comprehensive gold trading services from source to delivery</p>
        </div>
      </section>

      {/* Services Overview */}
      <section>
        <div className="container">
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="feature-card">
              <h3>Gold Import & Export</h3>
              <p>International gold trading with established networks across major markets worldwide.</p>
            </div>
            <div className="feature-card">
              <h3>Refinery Services</h3>
              <p>State-of-the-art refining in Dubai producing 99.99% pure gold.</p>
            </div>
            <div className="feature-card">
              <h3>Secure Transport</h3>
              <p>Fully insured, secure logistics solutions for precious metals globally.</p>
            </div>
            <div className="feature-card">
              <h3>B2B Exchanges</h3>
              <p>Professional business-to-business gold trading and exchange services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Import Export */}
      <section className="section-gray">
        <div className="container">
          <div className="text-section">
              <h2>Gold Import & Export</h2>
              <p>
                AULM Global Precious Metal Trades facilitates international gold trade across multiple continents. Our established networks and expertise in global markets enable seamless transactions for our B2B clients.
              </p>
              <p>
                We handle all aspects of cross-border gold trading, including documentation, customs clearance, and regulatory compliance.
              </p>
          </div>
        </div>
      </section>

      {/* Refinery */}
      <section>
        <div className="container">
          <div className="text-section">
              <h2>Refinery Services</h2>
              <p>
                Our gold refining operations are conducted at LBMA-certified facilities in Dubai. We process raw gold to achieve 99.99% purity levels.
              </p>
              <p>
                Every bar and product undergoes rigorous quality control, with full assay certification and documentation.
              </p>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="section-gray">
        <div className="container">
          <div className="text-section">
              <h2>Secure Transportation</h2>
              <p>
                We provide comprehensive logistics solutions for precious metals, ensuring safe and secure transportation from source to destination.
              </p>
              <p>
                All shipments are fully insured and handled through established, vetted logistics partners.
              </p>
          </div>
        </div>
      </section>

      {/* B2B Trading */}
      <section>
        <div className="container">
          <div className="text-section">
              <h2>B2B Gold Trading</h2>
              <p>
                Our B2B trading services cater to jewelry manufacturers, investment funds, central banks, and other institutional clients.
              </p>
              <p>
                With a minimum order of 500 grams, we offer refined gold at {discountPercentage}% below spot price.
              </p>
              <Link to="/shop" className="btn btn-primary">Buy Gold</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-navy">
        <div className="container">
          <div className="text-section">
            <h2>Ready to trade?</h2>
            <p>
              Contact our team to discuss your gold trading requirements.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
