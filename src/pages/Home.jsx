import { useState, useEffect, useRef } from 'react'
import { useGoldPrice } from '../context/GoldPriceContext'

const sections = [
  {
    id: 'sourcing',
    label: 'Swiss-Arab Association',
    title: 'Zurich. Geneva. Zug. Emirates.',
    description: 'Licensed for import and export of refined gold bars. Connecting Switzerland and the Emirates through partnerships with internationally renowned transport companies. Your Swiss-Arab bridge for precious metals.',
    video: '/13778967-uhd_3840_2160_60fps.mp4',
    poster: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1920&q=80'
  },
  {
    id: 'connectivity',
    label: 'Global Connectivity',
    title: 'Worldwide. Verified. Transparent.',
    description: 'Seamless import and export across continents. Full assay reports, certificates of origin, and regulatory compliance at every step. Your trusted partner in international precious metals logistics.',
    video: '/14773199_1920_1080_60fps.mp4',
    poster: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80'
  },
  {
    id: 'import',
    label: 'Import & Customs',
    title: 'Gateway Dubai.',
    description: 'Complete customs clearance and import handling through Dubai. All documentation, regulatory compliance, and logistics managed by us. IFZA licensed for seamless cross-border transactions.',
    video: '/11292201-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80'
  },
  {
    id: 'refinery',
    label: 'Refinery & Melting',
    title: 'Melted. Refined. Certified.',
    description: 'LBMA-certified refining in Dubai to 99.99% purity. Complete assay certification and hallmarking to international standards. From raw material to investment-grade bars.',
    video: '/5121750-uhd_3840_2160_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1589787168422-e02de4f614e2?w=1920&q=80'
  },
  {
    id: 'trading',
    label: 'B2B Sales',
    title: 'Ready To Trade.',
    description: 'DMCC licensed global gold partner. Refined gold for B2B clients worldwide. Competitive pricing, minimum 500g. Secure delivery with full assay documentation.',
    video: '/5021964-hd_1920_1080_30fps.mp4',
    poster: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=1920&q=80'
  }
]

function Home() {
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

      {activeIndex === 0 && (
        <div className="scroll-indicator">
          Scroll
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
    </div>
  )
}

export default Home
