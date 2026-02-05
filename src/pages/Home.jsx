import { Link } from 'react-router-dom'
import { useGoldPrice } from '../context/GoldPriceContext'

function Home() {
  const { spotPrice, discountedPricePerGram, discountPercentage, priceChange } = useGoldPrice()

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>IFZA Licensed</span>
              <span>•</span>
              <span>Dubai Freezone</span>
            </div>
            <h1>
              Responsibly sourcing <span>gold</span> that advances everyday life
            </h1>
            <p className="hero-subtitle">
              Premium gold trading at {discountPercentage}% below spot price. B2B specialists in import, export, refinery, and secure transportation of refined gold.
            </p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn btn-primary btn-large">
                Buy Gold at {discountPercentage}% Below Spot
              </Link>
              <Link to="/about" className="btn btn-secondary btn-large">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">IFZA</span>
              <span className="stat-label">Licensed & Regulated</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.99%</span>
              <span className="stat-label">Gold Purity</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500g+</span>
              <span className="stat-label">Minimum Order</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">-{discountPercentage}%</span>
              <span className="stat-label">Below Spot Price</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Price Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Live Pricing</span>
            <h2 className="section-title">Today's Gold Price</h2>
            <p className="section-description">
              Real-time gold prices with our exclusive {discountPercentage}% discount for B2B clients
            </p>
          </div>

          <div className="price-display">
            <div className="price-header">
              <h3>Gold Spot Price</h3>
              <div className="live-indicator">
                <span className="live-dot"></span>
                <span>Live</span>
              </div>
            </div>
            <div className="price-cards">
              <div className="price-card">
                <div className="price-card-label">Spot Price (USD/oz)</div>
                <div className="price-card-value">${spotPrice.toFixed(2)}</div>
                <div className={`price-card-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                </div>
              </div>
              <div className="price-card featured">
                <div className="price-card-label">Your Price (USD/g)</div>
                <div className="price-card-value">${discountedPricePerGram.toFixed(2)}</div>
                <div className="discount-badge">{discountPercentage}% OFF</div>
              </div>
              <div className="price-card">
                <div className="price-card-label">Min. Order Value</div>
                <div className="price-card-value">${(discountedPricePerGram * 500).toFixed(0)}</div>
                <div className="price-card-change">500g minimum</div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <Link to="/shop" className="btn btn-primary btn-large">
              Reserve Your Gold Now
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Services</span>
            <h2 className="section-title">What We Do</h2>
            <p className="section-description">
              Comprehensive gold trading services from import to delivery
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌍</div>
              <h3>Gold Import & Export</h3>
              <p>International gold trading with established networks across major markets worldwide.</p>
              <Link to="/services" className="link-arrow">Learn more →</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">⚗️</div>
              <h3>Refinery Services</h3>
              <p>State-of-the-art refining capabilities in Dubai producing 99.99% pure gold.</p>
              <Link to="/services" className="link-arrow">Learn more →</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">🔒</div>
              <h3>Secure Transport</h3>
              <p>Fully insured, secure logistics solutions for precious metals globally.</p>
              <Link to="/services" className="link-arrow">Learn more →</Link>
            </div>
            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3>B2B Exchanges</h3>
              <p>Professional business-to-business gold trading and exchange services.</p>
              <Link to="/services" className="link-arrow">Learn more →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why AULM Trading</span>
            <h2 className="section-title">Your Trusted Gold Partner</h2>
            <p className="section-description">
              We combine competitive pricing with uncompromising quality and service
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📉</div>
              <h3>{discountPercentage}% Below Spot</h3>
              <p>Exclusive B2B pricing significantly below market spot prices, maximizing your investment value.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>IFZA Licensed</h3>
              <p>Fully licensed and regulated by Dubai's International Free Zone Authority for your peace of mind.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>99.99% Purity</h3>
              <p>All gold refined in Dubai to the highest LBMA standards with full certification and assay.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: 'var(--spacing-4xl) 0',
        background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.1) 0%, rgba(201, 162, 39, 0.05) 100%)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h2>Ready to Trade?</h2>
            <p style={{ fontSize: '1.125rem', marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
              Start your gold trading journey today. Minimum order 500g at {discountPercentage}% below spot price.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn btn-primary btn-large">
                Buy Gold Now
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-large">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
