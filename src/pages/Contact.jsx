import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
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
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-info">
            <span className="label" style={{ display: 'block', marginBottom: '16px' }}>Get in Touch</span>
            <h1 style={{ color: '#fff', marginBottom: '24px' }}>Contact</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', marginBottom: '40px' }}>
              For a confidential discussion about your requirements and our current capacities.
            </p>

            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Email</h4>
              <a href="mailto:trading@aulmtrading.com" style={{ color: '#fff', fontSize: '1.125rem' }}>trading@aulmtrading.com</a>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Phone</h4>
              <a href="tel:+41442345678" style={{ color: '#fff', fontSize: '1.125rem' }}>+41 44 234 56 78</a>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '4px' }}>Mo – Fr. 8am – 5pm</p>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Languages</h4>
              <p style={{ color: '#fff', fontSize: '1rem' }}>Deutsch · English · Français · Italiano · العربية</p>
            </div>

            <div>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Headquarters</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>
                AULM Global Trade Corporation<br />
                DMCC & IFZA Licensed<br />
                Dubai, UAE
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-form-wrapper">
            {isSubmitted ? (
              <div className="contact-success" style={{ textAlign: 'left' }}>
                <h3 style={{ color: '#fff', marginBottom: '12px' }}>Message Sent</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>Thank you for your inquiry. Our team will respond within 24 hours.</p>
                <button
                  className="btn btn-outline"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: '', company: '', email: '', inquiry: '', message: '' })
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-inline" style={{ textAlign: 'left' }}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="company"
                      placeholder="Company / Institution"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <select
                      name="inquiry"
                      value={formData.inquiry}
                      onChange={handleChange}
                    >
                      <option value="">Inquiry Type</option>
                      <option value="buying">Gold Acquisition</option>
                      <option value="partnership">Strategic Partnership</option>
                      <option value="institutional">Institutional Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ width: '100%' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
