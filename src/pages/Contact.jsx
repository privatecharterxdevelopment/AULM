import { useState } from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiry: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="page-transition">
        <section style={{
          paddingTop: '140px',
          paddingBottom: 'var(--spacing-4xl)',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center'
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-xl)' }}>✅</div>
              <h2>Message Sent</h2>
              <p style={{ marginTop: 'var(--spacing-lg)', fontSize: '1.125rem' }}>
                Thank you for contacting AULM Trading. Our team will respond to your inquiry within 24 hours.
              </p>
              <button
                className="btn btn-primary"
                style={{ marginTop: 'var(--spacing-xl)' }}
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({ name: '', company: '', email: '', phone: '', inquiry: '', message: '' })
                }}
              >
                Send Another Message
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

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
            <span className="section-label">Get in Touch</span>
            <h1 className="section-title">Contact Us</h1>
            <p className="section-description">
              Get in touch with our team for gold trading inquiries and business partnerships
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'var(--spacing-3xl)' }}>
            {/* Contact Info */}
            <div>
              <h2>Get in Touch</h2>
              <p style={{ marginTop: 'var(--spacing-lg)' }}>
                Our team is ready to assist you with your gold trading requirements. Whether you're looking to buy, sell, or explore partnership opportunities, we're here to help.
              </p>

              <div style={{ marginTop: 'var(--spacing-2xl)' }}>
                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Dubai Headquarters</h3>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  <p style={{ marginBottom: 'var(--spacing-sm)' }}><strong style={{ color: 'var(--color-white)' }}>AULM Trading</strong></p>
                  <p style={{ marginBottom: 'var(--spacing-sm)' }}>IFZA Business Park</p>
                  <p style={{ marginBottom: 'var(--spacing-sm)' }}>Dubai Silicon Oasis</p>
                  <p style={{ marginBottom: 'var(--spacing-lg)' }}>Dubai, United Arab Emirates</p>

                  <p style={{ marginBottom: 'var(--spacing-sm)' }}><strong style={{ color: 'var(--color-white)' }}>Email:</strong> info@aulmtrading.com</p>
                  <p style={{ marginBottom: 'var(--spacing-sm)' }}><strong style={{ color: 'var(--color-white)' }}>Phone:</strong> +971 4 XXX XXXX</p>
                  <p><strong style={{ color: 'var(--color-white)' }}>Hours:</strong> Sunday - Thursday, 9:00 AM - 6:00 PM GST</p>
                </div>
              </div>

              <div style={{
                marginTop: 'var(--spacing-2xl)',
                padding: 'var(--spacing-lg)',
                background: 'rgba(201, 162, 39, 0.1)',
                border: '1px solid rgba(201, 162, 39, 0.3)',
                borderRadius: 'var(--radius-lg)'
              }}>
                <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>B2B Trading Only</h4>
                <p style={{ marginBottom: 0, fontSize: '0.9375rem' }}>
                  AULM Trading operates exclusively in the B2B market. Minimum orders start at 500 grams of refined gold.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{
              background: 'var(--color-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--spacing-2xl)'
            }}>
              <h3 style={{ marginBottom: 'var(--spacing-xl)' }}>Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company Name *</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="business@company.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="inquiry">Inquiry Type *</label>
                  <select
                    id="inquiry"
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="buying">Buying Gold</option>
                    <option value="selling">Selling Gold</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details about your inquiry, including approximate quantities if applicable."
                    rows="5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Department Contacts</h2>
          </div>
          <div className="services-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="service-card">
              <div className="service-icon">💰</div>
              <h3>Trading Desk</h3>
              <p>For gold buying and selling inquiries</p>
              <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-accent)' }}>trading@aulmtrading.com</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🤝</div>
              <h3>Business Development</h3>
              <p>For partnership and collaboration opportunities</p>
              <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-accent)' }}>partnerships@aulmtrading.com</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📰</div>
              <h3>Media Relations</h3>
              <p>For press and media inquiries</p>
              <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--color-accent)' }}>media@aulmtrading.com</p>
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
            <h2>Ready to Buy Gold?</h2>
            <p style={{ marginTop: 'var(--spacing-lg)', fontSize: '1.125rem' }}>
              Skip the inquiry and go straight to our gold reservation system.
            </p>
            <Link to="/shop" className="btn btn-primary" style={{ marginTop: 'var(--spacing-xl)' }}>
              Buy Gold at 10% Below Spot
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
