import { useState } from 'react'

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

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <>
        <section className="page-header" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
          <div className="container">
            <div style={{ maxWidth: '500px' }}>
              <h2 style={{ color: '#fff' }}>Message sent</h2>
              <p style={{ marginTop: '1rem' }}>
                Thank you for contacting AULM Global Trades. Our team will respond within 24 hours.
              </p>
              <button
                className="btn btn-primary"
                style={{ marginTop: '2rem' }}
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({ name: '', company: '', email: '', phone: '', inquiry: '', message: '' })
                }}
              >
                Send another message
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch with our team for gold trading inquiries</p>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem' }}>
            {/* Contact Info */}
            <div>
              <h2>Get in touch</h2>
              <p style={{ marginTop: '1.5rem' }}>
                Our team is ready to assist you with your gold trading requirements.
              </p>

              <div style={{ marginTop: '3rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Dubai Headquarters</h3>
                <p style={{ marginBottom: '0.25rem' }}>AULM Global Trades FZCO</p>
                <p style={{ marginBottom: '0.25rem' }}>IFZA Business Park</p>
                <p>Dubai, United Arab Emirates</p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Contact</h3>
                <p style={{ marginBottom: '0.25rem' }}>info@aulmtrading.com</p>
                <p>+971 4 XXX XXXX</p>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Hours</h3>
                <p style={{ marginBottom: '0.25rem' }}>Sunday - Thursday</p>
                <p>9:00 AM - 6:00 PM (GST)</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="order-form">
              <h3>Send us a message</h3>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Inquiry Type</label>
                  <select
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                  >
                    <option value="">Select an option</option>
                    <option value="buying">Buying Gold</option>
                    <option value="selling">Selling Gold</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
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
                  {isSubmitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
