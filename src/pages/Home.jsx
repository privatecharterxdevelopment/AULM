import { useState, useEffect, useRef } from 'react'
import { useGoldPrice } from '../context/GoldPriceContext'

const VIDEO_BASE = 'https://raw.githubusercontent.com/privatecharterxdevelopment/AULM/main/public'

const sections = [
  {
    id: 'hero',
    label: 'Swiss-Arab Association',
    title: 'Zurich. Geneva. Zug. Emirates.',
    description: 'Licensed for import and export of refined gold bars. Connecting Switzerland and the Emirates through partnerships with internationally renowned transport companies.',
    video: `${VIDEO_BASE}/13778967-uhd_3840_2160_60fps.mp4`,
    poster: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1920&q=80'
  },
  {
    id: 'compliance',
    label: 'Compliance First',
    title: 'Full Transparency. International Standards.',
    description: 'Complete adherence to OECD due diligence guidelines and LBMA responsible sourcing standards. Every transaction fully documented and auditable.',
    video: `${VIDEO_BASE}/14773199_1920_1080_60fps.mp4`,
    poster: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80'
  },
  {
    id: 'endtoend',
    label: 'End-to-End Solution',
    title: 'Sourcing to Delivery. One Partner.',
    description: 'From procurement to refined bars delivered to your vault. Complete supply chain management under one roof. No intermediaries, no complications.',
    video: `${VIDEO_BASE}/11292201-hd_1920_1080_30fps.mp4`,
    poster: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80'
  },
  {
    id: 'dubai',
    label: 'Strategic Location',
    title: 'Dubai. Global Trading Hub.',
    description: 'Security and efficiency through our presence in the world\'s premier precious metals trading center. DMCC and IFZA licensed operations.',
    video: `${VIDEO_BASE}/5121750-uhd_3840_2160_25fps.mp4`,
    poster: 'https://images.unsplash.com/photo-1589787168422-e02de4f614e2?w=1920&q=80'
  },
  {
    id: 'clients',
    label: 'Institutional Partners',
    title: 'For Serious Investors.',
    description: 'We serve Family Offices, commodity traders, investment funds, and institutional investors seeking direct access to physical gold flows.',
    video: `${VIDEO_BASE}/5021964-hd_1920_1080_30fps.mp4`,
    poster: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=1920&q=80'
  }
]

function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const videoRefs = useRef([])
  const { goldPrice } = useGoldPrice()

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    inquiry: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSections = sections.length + 1 // +1 for contact section

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPos = container.scrollTop
      const windowHeight = window.innerHeight
      const newIndex = Math.round(scrollPos / windowHeight)
      setActiveIndex(Math.min(newIndex, totalSections - 1))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [totalSections])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      }
    })
  }, [activeIndex])

  const scrollToSection = (index) => {
    const container = containerRef.current
    if (!container) return
    container.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    })
  }

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
    <div className="home-scroll" ref={containerRef}>
      <nav className="section-dots">
        {[...Array(totalSections)].map((_, index) => (
          <button
            key={index}
            className={`section-dot ${activeIndex === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            aria-label={index < sections.length ? sections[index].title : 'Contact'}
          />
        ))}
      </nav>

      {activeIndex === 0 && (
        <div className="scroll-indicator">
          Scroll
        </div>
      )}

      {/* Gold Price Ticker */}
      {goldPrice && (
        <div className="gold-ticker">
          <span>GOLD SPOT</span>
          <span className="price">${goldPrice.toLocaleString()}/oz</span>
        </div>
      )}

      {sections.map((section, index) => (
        <section
          key={section.id}
          className="fullscreen-section"
        >
          <video
            ref={el => videoRefs.current[index] = el}
            className="fullscreen-video"
            muted
            loop
            playsInline
            poster={section.poster}
          >
            <source src={section.video} type="video/mp4" />
          </video>

          <div className="fullscreen-overlay" />

          <div className="fullscreen-content" key={activeIndex === index ? 'active' : 'inactive'}>
            <span className="label">{section.label}</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
        </section>
      ))}

      {/* Contact Section */}
      <section className="fullscreen-section contact-section">
        <div className="fullscreen-overlay" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }} />

        <div className="fullscreen-content contact-content">
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
    </div>
  )
}

export default Home
