import { Link } from 'react-router-dom'

function Sustainability() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Sustainability</h1>
          <p>Responsible gold trading and ethical practices at the core of everything we do</p>
        </div>
      </section>

      {/* Overview */}
      <section>
        <div className="container">
          <div className="two-col">
            <div className="two-col-content">
              <h2>Ethical Gold Trading</h2>
              <p>
                At AULM Global Precious Metal Trades, sustainability is integrated into every aspect of our operations. We are committed to responsible gold sourcing and supporting the communities from which we source.
              </p>
              <p>
                We believe the precious metals industry has a responsibility to operate transparently and ethically.
              </p>
            </div>
            <div
              className="two-col-image"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=800)' }}
            />
          </div>
        </div>
      </section>

      {/* Responsible Sourcing */}
      <section className="section-gray">
        <div className="container">
          <div className="section-intro">
            <h2>Responsible Sourcing</h2>
            <p>Our commitment to ethical supply chain management</p>
          </div>
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="feature-card">
              <h3>Supply Chain Transparency</h3>
              <p>Full visibility into our supply chain, ensuring gold is sourced from legitimate suppliers.</p>
            </div>
            <div className="feature-card">
              <h3>Due Diligence</h3>
              <p>Rigorous processes verify the origin and legitimacy of all gold entering our supply chain.</p>
            </div>
            <div className="feature-card">
              <h3>Conflict-Free Gold</h3>
              <p>Committed to sourcing only conflict-free gold, adhering to international standards.</p>
            </div>
            <div className="feature-card">
              <h3>Verified Partners</h3>
              <p>All partners undergo thorough vetting to ensure compliance with our standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Mining */}
      <section>
        <div className="container">
          <div className="two-col">
            <div
              className="two-col-image"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=800)' }}
            />
            <div className="two-col-content">
              <h2>Fair Mine Partnerships</h2>
              <p>
                We partner exclusively with certified fair trade mines across Africa and South America. Our direct relationships ensure miners receive fair compensation.
              </p>
              <p>
                Every purchase supports mining communities through fair wages and safe working conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="section-gray">
        <div className="container">
          <div className="two-col">
            <div className="two-col-content">
              <h2>Compliance & Standards</h2>
              <p>
                AULM Global Precious Metal Trades operates in full compliance with UAE regulations and international standards for precious metals trading.
              </p>
              <p>
                We adhere to LBMA Responsible Gold Guidance, OECD Due Diligence Guidance, and UAE AML/CFT requirements.
              </p>
            </div>
            <div
              className="two-col-image"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800)' }}
            />
          </div>
        </div>
      </section>

      {/* Environmental */}
      <section className="section-navy">
        <div className="container">
          <div className="section-intro">
            <h2>Environmental Responsibility</h2>
            <p>
              We are committed to minimizing our environmental footprint through responsible practices.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Sustainable Refining</h3>
              <p>Our refinery partners employ environmentally responsible practices, minimizing waste and emissions.</p>
            </div>
            <div className="feature-card">
              <h3>Efficient Logistics</h3>
              <p>Optimized shipping routes and consolidated shipments reduce our carbon footprint.</p>
            </div>
            <div className="feature-card">
              <h3>Partner Standards</h3>
              <p>We work only with suppliers who meet strict environmental and social standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container">
          <div className="text-section">
            <h2>Ethical gold, premium quality</h2>
            <p>
              Choose AULM Global Precious Metal Trades for responsibly sourced gold that meets the highest standards.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <Link to="/shop" className="btn btn-primary">Buy Gold</Link>
              <Link to="/contact" className="btn btn-light">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Sustainability
