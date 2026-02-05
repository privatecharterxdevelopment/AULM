import { useState, useEffect, useRef } from 'react'
import { useGoldPrice } from '../context/GoldPriceContext'

const sections = [
  {
    id: 'trading',
    label: 'Gold Trading',
    title: 'Source Matters.',
    description: 'We source exclusively from certified fair trade mines across Africa and South America. Every gram of gold is ethically mined, ensuring fair wages for workers and sustainable practices. Our direct partnerships with mining communities guarantee complete transparency from extraction to delivery.',
    video: 'https://cdn.coverr.co/videos/coverr-gold-bars-1584/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1920&q=80'
  },
  {
    id: 'trade',
    label: 'Global Trade',
    title: 'Dubai to the World.',
    description: 'Strategic positioning in Dubai connects us to markets worldwide. We facilitate seamless cross-border gold transactions with full regulatory compliance, handling documentation, customs clearance, and logistics. Our network spans Europe, Asia, Africa, and the Americas.',
    video: 'https://cdn.coverr.co/videos/coverr-cargo-ship-at-sea-3129/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80'
  },
  {
    id: 'sustainability',
    label: 'Sustainability',
    title: 'Beyond Profit.',
    description: 'Environmental responsibility is at our core. We work only with mines that meet strict environmental standards, minimizing ecological impact. Our supply chain is fully traceable, adhering to LBMA Responsible Gold Guidance and OECD Due Diligence requirements.',
    video: 'https://cdn.coverr.co/videos/coverr-sun-shining-through-the-leaves-2447/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1920&q=80'
  },
  {
    id: 'refinery',
    label: 'Refinery & Melting',
    title: '99.99% Pure.',
    description: 'All gold is processed at LBMA-certified facilities in Dubai, refined to 99.99% purity. Our refinery partners employ state-of-the-art technology with rigorous quality control. Each bar receives complete assay certification and hallmarking to international standards.',
    video: 'https://cdn.coverr.co/videos/coverr-molten-metal-pouring-4637/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1589787168422-e02de4f614e2?w=1920&q=80'
  }
]

function Home() {
  const { discountPercentage } = useGoldPrice()
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef(null)
  const videoRefs = useRef([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollPos = container.scrollTop
      const windowHeight = window.innerHeight
      const newIndex = Math.round(scrollPos / windowHeight)
      setActiveIndex(Math.min(newIndex, sections.length - 1))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Play/pause videos based on active section
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

  return (
    <div className="home-scroll" ref={containerRef}>
      {/* Section Dots Navigation */}
      <nav className="section-dots">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`section-dot ${activeIndex === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            aria-label={`Go to ${section.title}`}
          />
        ))}
      </nav>

      {/* Scroll Indicator - only on first section */}
      {activeIndex === 0 && (
        <div className="scroll-indicator">
          Scroll
        </div>
      )}

      {/* Full-screen Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          className="fullscreen-section"
        >
          {/* Background Video */}
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
    </div>
  )
}

export default Home
