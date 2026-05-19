import { useState } from 'react'
import SiteContactDetails from '../components/SiteContactDetails'
import { submitInquiry } from '../utils/submitInquiry'

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
  const [deliveryMethod, setDeliveryMethod] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const subject = `AULM Contact — ${formData.inquiry || 'General'}`
    const bodyLines = [
      `Name: ${formData.name}`,
      `Company: ${formData.company || '—'}`,
      `Email: ${formData.email}`,
      `Inquiry: ${formData.inquiry}`,
      '',
      formData.message,
    ]
    const result = await submitInquiry({
      formType: 'contact',
      subject,
      data: {
        Name: formData.name,
        Company: formData.company || '—',
        Email: formData.email,
        Inquiry: formData.inquiry,
        Message: formData.message,
      },
      bodyLines,
    })
    setDeliveryMethod(result.delivered)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="label" style={{ display: 'block', marginBottom: '16px' }}>Get in Touch</span>
            <h1 style={{ color: '#fff', marginBottom: '24px' }}>Contact</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', marginBottom: '40px' }}>
              For a confidential discussion about your requirements and our current capacities.
            </p>

            <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Headquarters</h4>
            <SiteContactDetails className="contact-page-details" />

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Hours</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>Mon – Fri, 8am – 5pm (GST)</p>
            </div>

            <div style={{ marginTop: '32px' }}>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Languages</h4>
              <p style={{ color: '#fff', fontSize: '1rem' }}>Deutsch · English · Français · Italiano · العربية</p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {isSubmitted ? (
              <div className="contact-success" style={{ textAlign: 'left' }}>
                <h3 style={{ color: '#fff', marginBottom: '12px' }}>
                  {deliveryMethod === 'server' ? 'Message sent' : 'Complete your email'}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
                  {deliveryMethod === 'server'
                    ? 'Thank you — your message was sent to contact@aulmtrading.com. We respond within 24 hours.'
                    : 'Your mail app should open — please press Send so we receive your message at contact@aulmtrading.com.'}
                </p>
                <button
                  className="btn btn-outline"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
                  onClick={() => {
                    setIsSubmitted(false)
                    setDeliveryMethod(null)
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
                      <option value="sell-gold">Sell raw gold (doré / scrap)</option>
                      <option value="buy-bullion">Buy LBMA bullion</option>
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
