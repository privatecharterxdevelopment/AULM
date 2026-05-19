import { Link } from 'react-router-dom'
import { HOME_SERVICES } from '../data/homeServices'

function Services() {

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
          <div className="open-account-products">
            {HOME_SERVICES.map((service) => (
              <article key={service.id} className="refinery-card">
                <span className="home-service-card__keyword" style={{ display: 'block', marginBottom: 8 }}>
                  {service.keyword}
                </span>
                <h3>{service.title}</h3>
                <p>{service.teaser}</p>
                <Link to={service.path} className="refinery-inline-link">
                  Learn more →
                </Link>
              </article>
            ))}
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
              <h2>Refinery Services Dubai</h2>
              <p>
                Our gold refining operations are conducted at LBMA-certified facilities in Dubai. We process raw gold to achieve 99.99% purity levels.
              </p>
              <p>
                Every bar and product undergoes rigorous quality control, with full assay certification and documentation.
              </p>
              <Link to="/open-account" className="btn btn-primary">
                Open account
              </Link>
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
                We buy doré and scrap at LBMA spot minus a negotiated discount (after assay). We sell LBMA bullion only
                to qualified buyers.
              </p>
              <Link to="/sell-gold-dubai" className="btn btn-primary">
                Sell gold — institutional
              </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-navy">
        <div className="container">
          <div className="text-section text-section--center">
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
