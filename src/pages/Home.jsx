import { useState, useEffect, useRef } from 'react'
import { useGoldPrice } from '../context/GoldPriceContext'

const sections = [
  {
    id: 'sourcing',
    label: 'Sourcing',
    title: 'Where It Begins.',
    description: 'We purchase gold directly from certified fair trade mines across Africa. Our established partnerships ensure consistent supply, fair pricing, and complete transparency. Every gram is traceable from mine to market.',
    video: 'https://cdn.coverr.co/videos/coverr-gold-bars-1584/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1920&q=80'
  },
  {
    id: 'import',
    label: 'Import & Customs',
    title: 'Gateway Dubai.',
    description: 'Full customs clearance and import handling through Dubai. We manage all documentation, regulatory compliance, and logistics. Our IFZA license enables seamless cross-border transactions with complete legal transparency.',
    video: 'https://cdn.coverr.co/videos/coverr-cargo-ship-at-sea-3129/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80'
  },
  {
    id: 'refinery',
    label: 'Refinery & Melting',
    title: 'Melted. Refined. Certified.',
    description: 'All gold is melted and refined at LBMA-certified facilities in Dubai to 99.99% purity. Complete assay certification and hallmarking to international standards. From raw material to investment-grade bars.',
    video: 'https://cdn.coverr.co/videos/coverr-molten-metal-pouring-4637/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1589787168422-e02de4f614e2?w=1920&q=80'
  },
  {
    id: 'trading',
    label: 'B2B Sales',
    title: 'Ready For You.',
    description: 'Refined gold available for B2B clients worldwide. Competitive pricing, minimum order 500 grams. Secure delivery to your vault or designated location. Transparent transactions with no hidden fees.',
    video: 'https://cdn.coverr.co/videos/coverr-sun-shining-through-the-leaves-2447/1080p.mp4',
    poster: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=1920&q=80'
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
