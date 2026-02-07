import { useState, useEffect, useRef } from 'react'
import { useGoldPrice } from '../context/GoldPriceContext'
import Footer from '../components/Footer'

const VIDEO_BASE = 'https://raw.githubusercontent.com/privatecharterxdevelopment/AULM/main/public'

const sections = [
  {
    id: 'hero',
    label: 'Swiss-Arab Association',
    title: 'Global Trade Corporation.',
    description: 'Licensed for import and export of refined gold bars with 99.99% purity certification. Connecting Switzerland and the Emirates through strategic partnerships with internationally renowned transport and logistics companies. End-to-end supply chain security.',
    video: `${VIDEO_BASE}/13778967-uhd_3840_2160_60fps.mp4`,
    showLocations: true
  },
  {
    id: 'compliance',
    label: 'Compliance First',
    title: 'Full Transparency. International Standards.',
    description: 'Complete adherence to OECD due diligence guidelines and LBMA responsible sourcing standards. Every transaction fully documented, auditable, and traceable from mine to vault. Conflict-free gold with verified chain of custody.',
    video: `${VIDEO_BASE}/14773199_1920_1080_60fps.mp4`,
    darkOverlay: true
  },
  {
    id: 'endtoend',
    label: 'End-to-End Solution',
    title: 'Sourcing to Delivery. One Partner.',
    description: 'From procurement to refined bars delivered to your vault. Complete supply chain management under one roof including sourcing, assay, certification of origin, refining, and secure logistics. No intermediaries, no complications, full transparency.',
    video: `${VIDEO_BASE}/11292201-hd_1920_1080_30fps.mp4`
  },
  {
    id: 'dubai',
    label: 'Strategic Location',
    title: 'Dubai Gold Import. To The World.',
    description: 'Import. Melting. Refinery. Full vertical integration in the world\'s premier precious metals trading hub. DMCC and IFZA licensed operations with direct access to LBMA-accredited refineries.',
    video: `${VIDEO_BASE}/5121750-uhd_3840_2160_25fps.mp4`
  },
  {
    id: 'clients',
    label: 'Institutional Partners',
    title: 'For Serious Investors.',
    description: 'We serve Family Offices, commodity traders, investment funds, central banks, and institutional investors seeking direct access to physical gold flows. Minimum 500g, maximum 250kg per month per client. Discretion and confidentiality guaranteed.',
    video: `${VIDEO_BASE}/5021964-hd_1920_1080_30fps.mp4`
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

  const totalSections = sections.length + 2 // +1 for contact section, +1 for footer

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
            autoPlay
          >
            <source src={section.video} type="video/mp4" />
          </video>

          <div className={`fullscreen-overlay ${section.darkOverlay ? 'fullscreen-overlay--dark' : ''}`} />

          <div className="fullscreen-content" key={activeIndex === index ? 'active' : 'inactive'}>
            <span className="label">{section.label}</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            {section.showLocations && (
              <a href="mailto:trading@aulmtrading.com" className="location-badges">
                <span>Zurich</span>
                <span>Geneva</span>
                <span>Zug</span>
                <span>Dubai</span>
                <span>London</span>
                <span>Hong Kong</span>
              </a>
            )}
          </div>
        </section>
      ))}

      {/* Contact Section */}
      <section className="fullscreen-section contact-section">
        <div className="fullscreen-overlay" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }} />

        <div className="home-contact-grid">
          <div className="home-contact-info">
            <span className="label">Get in Touch</span>
            <h2>Confidential Inquiry</h2>
            <p>
              For a confidential discussion about your requirements and our current capacities, please contact us.
            </p>
            <div className="home-contact-details">
              <a href="mailto:trading@aulmtrading.com">trading@aulmtrading.com</a>
              <a href="tel:+41442345678">+41 44 234 56 78</a>
              <span>Mo – Fr. 8am – 5pm</span>
            </div>
          </div>

          <div className="home-contact-form">
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
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="footer-section">
        <Footer />
      </section>
    </div>
  )
}

export default Home
