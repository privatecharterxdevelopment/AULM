import { Link } from 'react-router-dom'

const articles = [
  {
    id: 'gold-price-forecast-2026',
    date: 'February 5, 2026',
    category: 'Market Analysis',
    title: 'Gold Price Forecast 2026: What Institutional Investors Need to Know',
    excerpt: 'Expert analysis on gold price projections for 2026. Central bank buying, inflation hedging, and geopolitical factors driving precious metals markets.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80',
    readTime: '8 min read'
  },
  {
    id: 'lbma-certification-guide',
    date: 'January 28, 2026',
    category: 'Compliance',
    title: 'LBMA Good Delivery: Complete Guide to Gold Bar Certification Standards',
    excerpt: 'Understanding LBMA certification requirements for gold bars. Purity standards, assay processes, and why Good Delivery status matters for institutional trading.',
    image: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=800&q=80',
    readTime: '12 min read'
  },
  {
    id: 'dubai-gold-trading-hub',
    date: 'January 15, 2026',
    category: 'Industry Insights',
    title: 'Why Dubai Became the World\'s Leading Gold Trading Hub',
    excerpt: 'Dubai\'s strategic position in global gold trade. DMCC regulations, tax advantages, and infrastructure making UAE the preferred destination for precious metals.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    readTime: '10 min read'
  },
  {
    id: 'responsible-gold-sourcing-africa',
    date: 'January 8, 2026',
    category: 'Sustainability',
    title: 'Responsible Gold Sourcing in Africa: OECD Due Diligence in Practice',
    excerpt: 'Implementing OECD guidelines for conflict-free gold supply chains. Traceability, artisanal mining partnerships, and ethical sourcing from African producers.',
    image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&q=80',
    readTime: '15 min read'
  },
  {
    id: 'gold-refinery-process-explained',
    date: 'December 20, 2025',
    category: 'Technical',
    title: 'Gold Refinery Process: From Raw Material to 99.99% Pure Bars',
    excerpt: 'Step-by-step breakdown of gold refining. Miller process, Wohlwill electrolysis, and quality control measures ensuring four-nines purity certification.',
    image: 'https://images.unsplash.com/photo-1607292803062-5b4f9a4b5d4a?w=800&q=80',
    readTime: '11 min read'
  },
  {
    id: 'gold-investment-family-offices',
    date: 'December 12, 2025',
    category: 'Investment',
    title: 'Physical Gold Allocation Strategies for Family Offices',
    excerpt: 'Portfolio diversification with physical gold. Storage options, custody arrangements, and optimal allocation percentages for wealth preservation.',
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80',
    readTime: '9 min read'
  },
  {
    id: 'gold-logistics-security',
    date: 'December 1, 2025',
    category: 'Operations',
    title: 'Secure Gold Logistics: Insurance, Transport, and Vault Storage',
    excerpt: 'Best practices for precious metals transportation. Lloyds-insured shipments, armored carriers, and DMCC-approved vault facilities for institutional clients.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    readTime: '7 min read'
  },
  {
    id: 'gold-tokenization-blockchain',
    date: 'November 18, 2025',
    category: 'Innovation',
    title: 'Gold Tokenization: Bridging Physical Assets with Blockchain Technology',
    excerpt: 'Digital gold tokens backed by physical reserves. Fractional ownership, instant settlement, and regulatory frameworks for tokenized precious metals.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    readTime: '13 min read'
  }
]

function News() {
  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="news-hero">
        <div className="container">
          <span className="label">Industry Insights</span>
          <h1>News & Analysis</h1>
          <p className="news-hero-text">
            Expert perspectives on gold markets, regulatory developments, and precious metals trading.
            Insights for institutional investors and industry professionals.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="news-featured">
        <div className="container">
          <Link to={`/news/${articles[0].id}`} className="featured-article">
            <div className="featured-image">
              <img src={articles[0].image} alt={articles[0].title} />
            </div>
            <div className="featured-content">
              <div className="article-meta">
                <span className="article-category">{articles[0].category}</span>
                <span className="article-date">{articles[0].date}</span>
              </div>
              <h2>{articles[0].title}</h2>
              <p>{articles[0].excerpt}</p>
              <span className="read-more">Read Article</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Article Grid */}
      <section className="news-grid-section">
        <div className="container">
          <div className="news-articles-grid">
            {articles.slice(1).map((article) => (
              <Link to={`/news/${article.id}`} key={article.id} className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
                <div className="article-body">
                  <div className="article-meta">
                    <span className="article-category">{article.category}</span>
                    <span className="article-date">{article.date}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="article-footer">
                    <span className="read-time">{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="news-cta">
        <div className="container">
          <div className="news-cta-content">
            <h3>Stay Informed</h3>
            <p>Receive market insights and industry updates directly to your inbox.</p>
            <a href="mailto:trading@aulmtrading.com?subject=Newsletter Subscription" className="btn btn-outline">
              Subscribe to Updates
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default News
