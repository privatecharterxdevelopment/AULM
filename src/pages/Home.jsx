import { useState, useEffect, useRef } from 'react'
import { useGoldPrice } from '../context/GoldPriceContext'
import { useLanguage } from '../context/LanguageContext'
import Footer from '../components/Footer'

const VIDEO_BASE = 'https://raw.githubusercontent.com/privatecharterxdevelopment/AULM/main/public'

function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const languages = ['EN', 'DE', 'FR', 'AR', 'ZH', 'JA']

  return (
    <div className="language-selector">
      {languages.map((lang) => (
        <button
          key={lang}
          className={language === lang.toLowerCase() ? 'active' : ''}
          onClick={() => setLanguage(lang.toLowerCase())}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}

function Home() {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const videoRefs = useRef([])
  const { goldPrice } = useGoldPrice()
  const { t } = useLanguage()

  const sections = [
    {
      id: 'hero',
      label: t('home.heroLabel'),
      title: t('home.heroTitle'),
      description: t('home.heroDesc'),
      video: `${VIDEO_BASE}/13778967-uhd_3840_2160_60fps.mp4`,
      showLocations: true
    },
    {
      id: 'compliance',
      label: t('home.complianceLabel'),
      title: t('home.complianceTitle'),
      description: t('home.complianceDesc'),
      video: `${VIDEO_BASE}/14773199_1920_1080_60fps.mp4`,
      darkOverlay: true
    },
    {
      id: 'endtoend',
      label: t('home.endToEndLabel'),
      title: t('home.endToEndTitle'),
      description: t('home.endToEndDesc'),
      video: `${VIDEO_BASE}/11292201-hd_1920_1080_30fps.mp4`
    },
    {
      id: 'dubai',
      label: t('home.dubaiLabel'),
      title: t('home.dubaiTitle'),
      description: t('home.dubaiDesc'),
      video: `${VIDEO_BASE}/5121750-uhd_3840_2160_25fps.mp4`
    },
    {
      id: 'clients',
      label: t('home.clientsLabel'),
      title: t('home.clientsTitle'),
      description: t('home.clientsDesc'),
      video: `${VIDEO_BASE}/5021964-hd_1920_1080_30fps.mp4`
    }
  ]

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    country: '',
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
            <span className="label">{t('contact.label')}</span>
            <h2>{t('contact.title')}</h2>
            <p>{t('contact.desc')}</p>
            <div className="home-contact-details">
              <a href="mailto:contact@aulmtrading.com">contact@aulmtrading.com</a>
              <span>{t('contact.hours')}</span>
            </div>
            <div className="contact-languages">
              <span>{t('contact.languages')}</span>
              <LanguageSelector />
            </div>
          </div>

          <div className="home-contact-form">
            {isSubmitted ? (
              <div className="contact-success">
                <h3>{t('contact.sent')}</h3>
                <p>{t('contact.thankYou')}</p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setIsSubmitted(false)
                    setFormData({ name: '', company: '', email: '', country: '', inquiry: '', message: '' })
                  }}
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-inline">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder={t('contact.fullName')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="company"
                      placeholder={t('contact.company')}
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder={t('contact.email')}
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="country"
                      placeholder={t('contact.country')}
                      value={formData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <select
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('contact.inquiryType')}</option>
                    <option value="physical">{t('contact.physicalGold')}</option>
                    <option value="structured">{t('contact.structuredProcurement')}</option>
                    <option value="general">{t('contact.generalInquiry')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder={t('contact.messagePlaceholder')}
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
                  {isSubmitting ? t('contact.sending') : t('contact.send')}
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
