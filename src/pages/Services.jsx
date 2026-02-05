import { Link } from 'react-router-dom'
import { useGoldPrice } from '../context/GoldPriceContext'

function Services() {
  const { discountPercentage } = useGoldPrice()

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: 'var(--spacing-4xl)',
        background: 'linear-gradient(180deg, var(--color-secondary) 0%, var(--color-primary) 100%)'
      }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Services</span>
            <h1 className="section-title">What We Do</h1>
            <p className="section-description">
              Comprehensive gold trading services from import to delivery
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🌍</div>
              <h3>Gold Import & Export</h3>
              <p>International gold trading with established networks across major markets worldwide.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚗️</div>
              <h3>Refinery Services</h3>
              <p>State-of-the-art refining capabilities in Dubai producing 99.99% pure gold.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🔒</div>
              <h3>Secure Transportation</h3>
              <p>Fully insured, secure logistics solutions for precious metals globally.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3>B2B Exchanges</h3>
              <p>Professional business-to-business gold trading and exchange services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Import Export Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)', alignItems: 'center' }}>
            <div>
              <span className="section-label">Trading</span>
              <h2 style={{ marginTop: 'var(--spacing-md)' }}>Gold Import & Export</h2>
              <p style={{ marginTop: 'var(--spacing-lg)' }}>
                AULM Trading facilitates international gold trade across multiple continents. Our established networks and expertise in global markets enable seamless transactions for our B2B clients.
              </p>
              <p>
                We handle all aspects of cross-border gold trading, including documentation, customs clearance, and regulatory compliance in both origin and destination countries.
              </p>
              <ul style={{ marginTop: 'var(--spacing-lg)', listStyle: 'none' }}>
                {[
                  'Global sourcing from verified suppliers',
                  'Complete documentation and customs handling',
                  'Compliance with international trade regulations',
                  'Competitive pricing and transparent terms'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-accent)' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-gold) 100%)',
              borderRadius: 'var(--radius-xl)',
              height: '350px'
            }} />
          </div>
        </div>
      </section>

      {/* Refinery Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)', alignItems: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.2) 0%, rgba(201, 162, 39, 0.1) 100%)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              height: '350px'
            }} />
            <div>
              <span className="section-label">Refinery</span>
              <h2 style={{ marginTop: 'var(--spacing-md)' }}>Refinery Services</h2>
              <p style={{ marginTop: 'var(--spacing-lg)' }}>
                Our partnership with leading Dubai-based refineries ensures the highest quality gold products. We deliver 99.99% pure gold that meets international standards and specifications.
              </p>
              <p>
                Dubai has established itself as a global hub for gold refining, and AULM Trading leverages this expertise to provide clients with premium refined gold products.
              </p>
              <ul style={{ marginTop: 'var(--spacing-lg)', listStyle: 'none' }}>
                {[
                  '99.99% (24 karat) purity standard',
                  'LBMA-compliant refining processes',
                  'Full assay and certification',
                  'Custom bar sizes available'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-accent)' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Transportation Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)', alignItems: 'center' }}>
            <div>
              <span className="section-label">Logistics</span>
              <h2 style={{ marginTop: 'var(--spacing-md)' }}>Secure Transportation</h2>
              <p style={{ marginTop: 'var(--spacing-lg)' }}>
                We provide fully insured, secure logistics solutions for precious metals. Our transportation network ensures safe delivery from source to destination, anywhere in the world.
              </p>
              <p>
                Working with specialized precious metals logistics providers, we guarantee the security and integrity of your gold shipments throughout the supply chain.
              </p>
              <ul style={{ marginTop: 'var(--spacing-lg)', listStyle: 'none' }}>
                {[
                  'Full insurance coverage',
                  'Secure vaulting facilities',
                  'Real-time tracking',
                  'Specialized precious metals handling',
                  'Global delivery network'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-accent)' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-gold) 100%)',
              borderRadius: 'var(--radius-xl)',
              height: '350px'
            }} />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Products</span>
            <h2 className="section-title">Our Gold Products</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card" style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-xl)' }}>
              <div className="feature-icon">🥇</div>
              <h3>Gold Bars</h3>
              <p>LBMA-standard gold bars in various sizes, refined to 99.99% purity</p>
            </div>
            <div className="feature-card" style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-xl)' }}>
              <div className="feature-icon">✨</div>
              <h3>Refined Gold</h3>
              <p>24 karat refined gold, minimum orders 500g</p>
            </div>
            <div className="feature-card" style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-xl)' }}>
              <div className="feature-icon">📦</div>
              <h3>Wholesale Supply</h3>
              <p>Large volume gold supply for commercial buyers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="stats" style={{ backgroundColor: 'var(--color-secondary)' }}>
        <div className="container">
          <h2 className="section-title text-center" style={{ marginBottom: 'var(--spacing-2xl)' }}>Specifications</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">99.99%</span>
              <span className="stat-label">Purity (24 Karat)</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500g</span>
              <span className="stat-label">Minimum Order</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">LBMA</span>
              <span className="stat-label">Compliant Standards</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">-{discountPercentage}%</span>
              <span className="stat-label">Below Spot Price</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: 'var(--spacing-4xl) 0',
        background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.1) 0%, rgba(201, 162, 39, 0.05) 100%)',
        borderTop: '1px solid var(--color-border)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Ready to Trade?</h2>
            <p style={{ marginTop: 'var(--spacing-lg)', fontSize: '1.125rem' }}>
              Contact our team to discuss your gold trading requirements. We offer competitive pricing, reliable supply, and professional service.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', marginTop: 'var(--spacing-xl)' }}>
              <Link to="/shop" className="btn btn-primary">Buy Gold Now</Link>
              <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
