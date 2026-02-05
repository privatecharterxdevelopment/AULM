import { Link } from 'react-router-dom'

function Sustainability() {
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
            <span className="section-label">Sustainability</span>
            <h1 className="section-title">Our Commitment</h1>
            <p className="section-description">
              Responsible gold trading and ethical business practices at the core of everything we do
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)', alignItems: 'center' }}>
            <div>
              <h2>Our Approach</h2>
              <p style={{ marginTop: 'var(--spacing-lg)' }}>
                At AULM Trading, sustainability is at the core of everything we do. We are committed to responsible gold sourcing, ethical business practices, and minimizing our environmental impact.
              </p>
              <p>
                We believe that the gold industry has a responsibility to operate transparently and ethically. Our sustainability framework ensures that every transaction meets the highest standards of integrity.
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: 'var(--radius-xl)',
              height: '350px'
            }} />
          </div>
        </div>
      </section>

      {/* Responsible Sourcing */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Sourcing</span>
            <h2 className="section-title">Responsible Sourcing</h2>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3>Supply Chain Transparency</h3>
              <p>We maintain full visibility into our supply chain, ensuring gold is sourced from legitimate and verified suppliers.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3>Due Diligence</h3>
              <p>Rigorous due diligence processes verify the origin and legitimacy of all gold entering our supply chain.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🕊️</div>
              <h3>Conflict-Free Gold</h3>
              <p>We are committed to sourcing only conflict-free gold, adhering to international guidelines and standards.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">✅</div>
              <h3>Verified Partners</h3>
              <p>All our refinery and logistics partners undergo thorough vetting to ensure compliance with our standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-3xl)', alignItems: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-gold) 100%)',
              borderRadius: 'var(--radius-xl)',
              height: '350px'
            }} />
            <div>
              <span className="section-label">Environment</span>
              <h2 style={{ marginTop: 'var(--spacing-md)' }}>Environmental Responsibility</h2>
              <p style={{ marginTop: 'var(--spacing-lg)' }}>
                We recognize the environmental challenges facing the gold industry and are committed to minimizing our ecological footprint.
              </p>
              <p>
                Through partnerships with environmentally responsible refineries and logistics providers, we work to reduce the environmental impact of gold trading operations.
              </p>
              <ul style={{ marginTop: 'var(--spacing-lg)', listStyle: 'none' }}>
                {[
                  'Partner with certified refineries using sustainable practices',
                  'Optimize logistics to reduce carbon emissions',
                  'Support initiatives for responsible mining practices',
                  'Promote recycled gold in the supply chain'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-success)' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ethics Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Values</span>
            <h2 className="section-title">Ethics & Integrity</h2>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number" style={{ fontSize: '1.75rem' }}>Transparency</span>
              <span className="stat-label">Open and honest communication with all stakeholders</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ fontSize: '1.75rem' }}>Accountability</span>
              <span className="stat-label">Taking responsibility for our actions and their impact</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ fontSize: '1.75rem' }}>Fairness</span>
              <span className="stat-label">Treating all partners and stakeholders equitably</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" style={{ fontSize: '1.75rem' }}>Respect</span>
              <span className="stat-label">Upholding human rights throughout our operations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Standards</span>
            <h2 className="section-title">Certifications & Compliance</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card" style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-xl)' }}>
              <div className="feature-icon">🏛️</div>
              <h3>IFZA Licensed</h3>
              <p>Fully licensed by Dubai's International Free Zone Authority</p>
            </div>
            <div className="feature-card" style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-xl)' }}>
              <div className="feature-icon">📊</div>
              <h3>LBMA Aligned</h3>
              <p>Practices aligned with London Bullion Market Association standards</p>
            </div>
            <div className="feature-card" style={{ background: 'var(--color-secondary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--spacing-xl)' }}>
              <div className="feature-icon">🛡️</div>
              <h3>AML Compliant</h3>
              <p>Full anti-money laundering compliance and reporting</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: 'var(--spacing-4xl) 0',
        background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.1) 0%, rgba(201, 162, 39, 0.05) 100%)',
        borderTop: '1px solid var(--color-border)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Learn More About Our Practices</h2>
            <p style={{ marginTop: 'var(--spacing-lg)', fontSize: '1.125rem' }}>
              Contact us to learn more about our sustainability initiatives and responsible sourcing practices.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: 'var(--spacing-xl)' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sustainability
