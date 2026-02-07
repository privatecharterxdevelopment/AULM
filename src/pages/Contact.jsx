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
    <section className="fullscreen-section contact-section" style={{ height: 'auto', minHeight: '100vh', scrollSnapAlign: 'none' }}>
      <div className="fullscreen-overlay" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }} />

      <div className="fullscreen-content contact-content" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <span className="label">Get in Touch</span>
        <h2>Confidential Inquiry</h2>
        <p style={{ maxWidth: '600px', marginBottom: '2rem' }}>
          For a confidential discussion about your requirements and our current capacities, please contact us.
        </p>

        {isSubmitted ? (
          <div className="contact-success">
            <h3>Message Sent</h3>
            <p>Thank you for your inquiry. Our team will respond within 24 hours.</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setIsSubmitted(false)
                setFormData({ name: '', company: '', email: '', inquiry: '', message: '' })
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form-inline">
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

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message *"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </button>

            <p className="contact-email">
              Or email us directly: <a href="mailto:trading@aulmtrading.com">trading@aulmtrading.com</a>
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

export default Contact
