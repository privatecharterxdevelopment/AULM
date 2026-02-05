import { Link } from 'react-router-dom'

function About() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Who We Are</h1>
          <p>A leading IFZA licensed gold trading company, headquartered in Dubai</p>
        </div>
      </section>

      {/* Overview */}
      <section>
        <div className="container">
          <div className="two-col">
            <div className="two-col-content">
              <h2>Overview</h2>
              <p>
                AULM Trading is a premier gold trading company operating from Dubai's International Free Zone Authority (IFZA). We specialize in the import, export, refining, and distribution of high-quality gold products to businesses worldwide.
              </p>
              <p>
                Our strategic location in Dubai positions us at the heart of global gold trade, connecting markets across Africa, Asia, Europe, and beyond.
              </p>
            </div>
            <div
              className="two-col-image"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800)' }}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-gray">
        <div className="container">
          <div className="section-intro">
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">Integrity</div>
              <div className="stat-label">Transparent and ethical business practices</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Excellence</div>
              <div className="stat-label">Highest quality standards in gold trading</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Partnership</div>
              <div className="stat-label">Long-term relationships built on trust</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">Innovation</div>
              <div className="stat-label">Modern practices in commodity trading</div>
            </div>
          </div>
        </div>
      </section>

      {/* IFZA License */}
      <section>
        <div className="container">
          <div className="two-col">
            <div
              className="two-col-image"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800)' }}
            />
            <div className="two-col-content">
              <h2>IFZA License</h2>
              <p>
                AULM Trading operates under a valid license from the International Free Zone Authority (IFZA), Dubai's leading free zone for international businesses.
              </p>
              <p>
                This license enables us to conduct gold trading activities with full regulatory compliance, benefiting from Dubai's business-friendly environment and world-class infrastructure.
              </p>
              <Link to="/contact" className="btn btn-light">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-navy">
        <div className="container">
          <div className="section-intro">
            <h2>Leadership</h2>
            <p>
              Our team brings decades of combined experience in precious metals trading, international finance, and commodity markets.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Executive Leadership</h3>
              <p>Experienced executives with deep expertise in global commodity trading and financial markets.</p>
            </div>
            <div className="feature-card">
              <h3>Operations Team</h3>
              <p>Dedicated professionals ensuring seamless logistics, compliance, and quality control.</p>
            </div>
            <div className="feature-card">
              <h3>Advisory Board</h3>
              <p>Industry veterans providing strategic guidance and market insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container">
          <div className="text-section">
            <h2>Ready to partner with us?</h2>
            <p>
              Contact our team to discuss how AULM Trading can serve your gold trading needs.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <Link to="/contact" className="btn btn-primary">Contact Us</Link>
              <Link to="/shop" className="btn btn-light">Buy Gold</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
