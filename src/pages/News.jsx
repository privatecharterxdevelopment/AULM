import { Link } from 'react-router-dom'

const articles = [
  {
    id: 'emirates-gold-vs-valcambi',
    date: 'February 6, 2026',
    category: 'Market Analysis',
    title: 'Emirates Gold vs. Valcambi: Which Stamp Gives You More Liquidity?',
    excerpt: 'When trading large volumes of gold bars internationally, the refinery stamp on your bars can significantly impact liquidity and resale value. Emirates Gold, headquartered in Dubai, offers competitive pricing and strong recognition across Middle Eastern and Asian markets. Valcambi, the Swiss refinery giant, commands premium pricing in European and American markets due to its long-established reputation. Understanding the trade-offs between these two LBMA-accredited refineries is essential for institutional traders seeking optimal market access. We analyze bid-ask spreads, regional preferences, and why diversifying your inventory across multiple stamps can maximize trading flexibility.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80',
    readTime: '10 min read'
  },
  {
    id: 'dmcc-good-delivery-standard',
    date: 'February 4, 2026',
    category: 'Compliance',
    title: 'Dubai Good Delivery: Why the DMCC Standard is Essential for Global Traders',
    excerpt: 'The Dubai Good Delivery (DGD) standard has become a critical benchmark for gold bars entering international trade through the UAE. Established by the Dubai Multi Commodities Centre (DMCC), this certification ensures bars meet stringent purity, weight, and documentation requirements. For traders operating between African mining regions, Middle Eastern processing hubs, and global consumption markets, DGD certification is your passport to seamless cross-border transactions. This guide covers the certification process, audit requirements, and how DGD-compliant bars command better pricing and faster settlement times in wholesale markets from Mumbai to Zurich.',
    image: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=800&q=80',
    readTime: '12 min read'
  },
  {
    id: 'spot-gold-discounts-dubai',
    date: 'February 1, 2026',
    category: 'Trading Strategy',
    title: 'Spot Gold Discounts in Dubai: How Institutional Traders Play the Premium Game',
    excerpt: 'Dubai\'s position as a global gold trading hub creates unique arbitrage opportunities that savvy institutional traders exploit daily. Understanding the mechanics of spot gold premiums and discounts relative to London fix prices is essential for maximizing margins. During periods of high Indian demand, Dubai premiums can spike to $3-5 per ounce above London spot. Conversely, when recycled gold floods the market, discounts can reach $1-2 below spot. This article reveals how professional traders time their purchases, utilize forward contracts, and leverage vault storage to capitalize on these price differentials. We examine seasonal patterns, festival demand cycles, and macroeconomic factors that drive premium fluctuations.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    readTime: '14 min read'
  },
  {
    id: 'uganda-gold-supply-chain',
    date: 'January 29, 2026',
    category: 'Supply Chain',
    title: 'From Uganda Gold to Global Player: How DMCC Import Licenses Enable Seamless Supply Chains',
    excerpt: 'East Africa has emerged as a significant gold-producing region, with Uganda serving as a key aggregation point for artisanal and small-scale mining output from the broader Great Lakes region. Establishing a compliant supply chain from these origins to international markets requires navigating complex regulatory landscapes, implementing rigorous due diligence protocols, and maintaining full chain-of-custody documentation. Our DMCC import license enables us to legally receive, process, and re-export gold through Dubai\'s world-class refining infrastructure. This article details the end-to-end journey from mine site verification, through assay and refining, to final delivery of LBMA-certified bars to institutional vaults in Zurich, London, or Singapore.',
    image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&q=80',
    readTime: '15 min read'
  },
  {
    id: 'switzerland-dubai-connection',
    date: 'January 25, 2026',
    category: 'Industry Insights',
    title: 'Switzerland Meets Dubai: Why Global Jewelry Giants Need Both Trading Hubs',
    excerpt: 'The world\'s largest jewelry manufacturers and luxury brands increasingly rely on a dual-hub strategy, maintaining strong relationships with both Swiss and Dubai-based gold suppliers. Switzerland offers unmatched precision refining, long-established banking relationships, and proximity to European luxury markets. Dubai provides tax-efficient trading, faster access to Asian manufacturing centers, and competitive pricing on large-volume orders. Understanding how to leverage both ecosystems can reduce procurement costs by 2-4% while improving supply chain resilience. We explore how major Italian jewelry houses, Indian manufacturers, and American retailers structure their sourcing relationships across these complementary hubs, and how AULM facilitates seamless transfers between both jurisdictions.',
    image: 'https://images.unsplash.com/photo-1607292803062-5b4f9a4b5d4a?w=800&q=80',
    readTime: '11 min read'
  },
  {
    id: 'gold-price-forecast-2026',
    date: 'January 20, 2026',
    category: 'Market Analysis',
    title: 'Gold Price Forecast 2026: What Institutional Investors Need to Know',
    excerpt: 'As we navigate through 2026, gold markets continue to be shaped by unprecedented central bank accumulation, persistent inflation concerns, and evolving geopolitical tensions. Our analysis examines key price drivers including Federal Reserve policy trajectories, Chinese and Indian physical demand patterns, and the growing role of gold in de-dollarization strategies. With central banks adding over 1,000 tonnes annually to reserves, institutional allocation to physical gold is reaching historic highs. We provide quarterly price targets, key support and resistance levels, and strategic recommendations for family offices and institutional investors looking to optimize their precious metals exposure.',
    image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80',
    readTime: '8 min read'
  },
  {
    id: 'lbma-certification-guide',
    date: 'January 15, 2026',
    category: 'Compliance',
    title: 'LBMA Good Delivery: Complete Guide to Gold Bar Certification Standards',
    excerpt: 'The London Bullion Market Association (LBMA) Good Delivery List represents the gold standard for bar quality worldwide. Bars from accredited refiners trade at tighter spreads and are accepted without assay at major vaults and exchanges globally. This comprehensive guide covers the accreditation process, annual audit requirements, and the specific technical standards bars must meet including fineness tolerances, weight specifications, and marking requirements. We also examine recent LBMA responsible sourcing mandates and how they impact supply chain documentation. Understanding these standards is essential for any institution trading physical gold at wholesale volumes.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    readTime: '12 min read'
  },
  {
    id: 'gold-refinery-process-explained',
    date: 'January 10, 2026',
    category: 'Technical',
    title: 'Gold Refinery Process: From Raw Material to 99.99% Pure Bars',
    excerpt: 'Transforming raw gold material into investment-grade bars requires sophisticated metallurgical processes and rigorous quality control. This technical deep-dive explains the two primary refining methods: the Miller chlorination process for achieving 99.5% purity, and the Wohlwill electrolytic process for attaining 99.99% four-nines fineness required for LBMA Good Delivery. We cover sampling and assaying procedures, impurity removal techniques, and the final casting and stamping processes. Understanding refinery operations helps traders evaluate processing fees, estimate turnaround times, and appreciate why certain refineries command premium pricing for their output.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
    readTime: '11 min read'
  },
  {
    id: 'responsible-gold-sourcing-africa',
    date: 'January 5, 2026',
    category: 'Sustainability',
    title: 'Responsible Gold Sourcing in Africa: OECD Due Diligence in Practice',
    excerpt: 'Implementing OECD Due Diligence Guidance for Responsible Supply Chains of Minerals from Conflict-Affected and High-Risk Areas is both a regulatory requirement and an ethical imperative. This article provides practical guidance on establishing compliant sourcing programs in African gold-producing regions. We cover risk assessment frameworks, on-the-ground verification procedures, and documentation requirements that satisfy LBMA Responsible Gold Guidance. Case studies from our operations in East Africa demonstrate how proper due diligence can transform artisanal mining communities while ensuring complete supply chain transparency for downstream buyers.',
    image: 'https://images.unsplash.com/photo-1542789828-6a799caa1d6b?w=800&q=80',
    readTime: '15 min read'
  },
  {
    id: 'gold-investment-family-offices',
    date: 'December 28, 2025',
    category: 'Investment',
    title: 'Physical Gold Allocation Strategies for Family Offices',
    excerpt: 'Family offices managing generational wealth increasingly recognize physical gold as a cornerstone asset for portfolio diversification and wealth preservation. Unlike paper gold products, physical bars held in allocated storage provide true counterparty-free exposure to precious metals. This guide examines optimal allocation percentages based on portfolio size and risk tolerance, compares storage jurisdictions including Switzerland, Singapore, and Dubai, and analyzes the total cost of ownership including storage fees, insurance, and transaction costs. We also discuss inheritance planning considerations and the role of gold in multi-generational wealth transfer strategies.',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&q=80',
    readTime: '9 min read'
  },
  {
    id: 'gold-logistics-security',
    date: 'December 20, 2025',
    category: 'Operations',
    title: 'Secure Gold Logistics: Insurance, Transport, and Vault Storage',
    excerpt: 'Moving physical gold across international borders requires specialized logistics providers, comprehensive insurance coverage, and secure vault facilities at origin and destination. This operational guide covers carrier selection criteria, including Brinks, Loomis, and Malca-Amit capabilities across different routes. We examine Lloyd\'s of London insurance requirements, typical coverage limits, and claim procedures. Vault selection criteria including audit standards, segregated vs. allocated storage, and geographic diversification strategies are analyzed in detail. Understanding these operational fundamentals is essential for any institution building physical gold trading capabilities.',
    image: 'https://images.unsplash.com/photo-1624365168968-f283d506c6b6?w=800&q=80',
    readTime: '7 min read'
  },
  {
    id: 'gold-tokenization-blockchain',
    date: 'December 15, 2025',
    category: 'Innovation',
    title: 'Gold Tokenization: Bridging Physical Assets with Blockchain Technology',
    excerpt: 'Digital gold tokens backed 1:1 by physical reserves are transforming how investors access precious metals exposure. Blockchain technology enables fractional ownership, instant peer-to-peer transfers, and complete transparency through on-chain proof of reserves. This analysis examines leading tokenization platforms, regulatory frameworks in Switzerland and the UAE, and the technical standards ensuring token holders have genuine claims on underlying physical gold. We discuss custody arrangements, redemption mechanisms, and how tokenized gold fits within existing precious metals trading infrastructure. For institutional investors, tokenization offers new possibilities for portfolio construction and liquidity management.',
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
