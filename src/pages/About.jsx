import { Link } from 'react-router-dom'

function About() {
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
            <span className="section-label">About Us</span>
            <h1 className="section-title">Who We Are</h1>
            <p className="section-description">
              A leading IFZA licensed gold trading company, headquartered in Dubai Freezone
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)', alignItems: 'center' }}>
            <div>
              <h2>Overview</h2>
              <p style={{ marginTop: 'var(--spacing-lg)' }}>
                AULM Trading is a premier gold trading company operating from Dubai's International Free Zone Authority (IFZA). We specialize in the import, export, refining, and distribution of high-quality gold products to businesses worldwide.
              </p>
              <p>
                Our strategic location in Dubai positions us at the heart of global gold trade, connecting markets across Africa, Asia, Europe, and beyond. We leverage Dubai's world-class infrastructure and regulatory framework to deliver exceptional service to our B2B clients.
              </p>
              <ul style={{ marginTop: 'var(--spacing-lg)', listStyle: 'none' }}>
                {['IFZA Licensed and Regulated', 'Strategic Dubai Freezone Location', 'Global Trading Network', '99.99% Purity Standards'].map((item, i) => (
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
              height: '400px'
            }} />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Foundation</span>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number" style={{ fontSize: '1.75rem' }}>Integrity</span>
              <span className="stat-label">Transparent and ethical business practices in every transaction</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ fontSize: '1.75rem' }}>Excellence</span>
              <span className="stat-label">Commitment to the highest quality standards in gold trading</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ fontSize: '1.75rem' }}>Partnership</span>
              <span className="stat-label">Building long-term relationships based on trust and mutual success</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ fontSize: '1.75rem' }}>Innovation</span>
              <span className="stat-label">Embracing technology and modern practices in commodity trading</span>
            </div>
          </div>
        </div>
      </section>

      {/* IFZA License Section */}
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
              <span className="section-label">Regulatory Compliance</span>
              <h2 style={{ marginTop: 'var(--spacing-md)' }}>IFZA License</h2>
              <p style={{ marginTop: 'var(--spacing-lg)' }}>
                AULM Trading operates under a valid license from the International Free Zone Authority (IFZA), Dubai's leading free zone for international businesses.
              </p>
              <p>
                This license enables us to conduct gold trading activities with full regulatory compliance, benefiting from Dubai's business-friendly environment and world-class infrastructure.
              </p>
              <ul style={{ marginTop: 'var(--spacing-lg)', listStyle: 'none' }}>
                {[
                  'Full regulatory compliance',
                  '100% foreign ownership permitted',
                  'Tax-efficient structure',
                  'Access to UAE banking system',
                  'Strategic location for global trade'
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

      {/* Leadership Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Leadership</h2>
            <p className="section-description">
              Our leadership team brings decades of combined experience in precious metals trading, international finance, and commodity markets.
            </p>
          </div>
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="service-card">
              <div className="service-icon">👔</div>
              <h3>Executive Leadership</h3>
              <p>Experienced executives with deep expertise in global commodity trading and financial markets.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">⚙️</div>
              <h3>Operations Team</h3>
              <p>Dedicated professionals ensuring seamless logistics, compliance, and quality control.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3>Advisory Board</h3>
              <p>Industry veterans providing strategic guidance and market insights.</p>
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
            <h2>Ready to Partner with Us?</h2>
            <p style={{ marginTop: 'var(--spacing-lg)', fontSize: '1.125rem' }}>
              Contact our team to discuss how AULM Trading can serve your gold trading needs.
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', marginTop: 'var(--spacing-xl)' }}>
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
              <Link to="/shop" className="btn btn-secondary">Buy Gold</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
