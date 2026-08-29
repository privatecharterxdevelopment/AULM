import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NewsPressItem } from '../components/NewsPressItem'
import { NewsletterSignup } from '../components/NewsletterSignup'
import { PageHero } from '../components/PageHero'
import { formatMarketDate } from '../lib/commodityNews'
import { NEWS, formatNewsDate } from '../data/news'
import { useCommodityNews } from '../hooks/useCommodityNews'
import { useHashScroll } from '../hooks/useHashScroll'

export function NewsPage() {
  const { items, live } = useCommodityNews(8)
  useHashScroll()

  useEffect(() => {
    document.title = 'AULM | News'
    return () => {
      document.title = 'AULM | Precious metals desk'
    }
  }, [])

  return (
    <div className="africa-page">
      <PageHero
        image="/company/locations/uae.jpg"
        imageAlt="Dubai desk"
        imagePosition="center 35%"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Company', to: '/company' },
        ]}
        eyebrow="Desk"
        title="News & latest information"
        bar={[
          { title: 'From the desk', href: '#desk', cta: 'Read more →' },
          { title: 'Markets', href: '#markets', cta: 'Read more →' },
          { title: 'Procedure', href: '/company/procedure', cta: 'Open →' },
          { title: 'Contact us', href: '/contact', cta: 'Write →' },
        ]}
      />

      <div className="news-doc news-doc--index news-doc--after-hero">
        <div className={`news-press news-press--page${live ? '' : ' news-press--desk-only'}`}>
          <div id="desk">
            <p className="news-press-col-label">From the desk</p>
            {NEWS.map((article) => (
              <NewsPressItem
                key={article.slug}
                href={`/news/${article.slug}`}
                date={formatNewsDate(article.date)}
                kicker={article.category}
                title={article.title}
              />
            ))}
          </div>

          {live ? (
            <div id="markets">
              <p className="news-press-col-label">Markets</p>
              {items.map((item) => (
                <NewsPressItem
                  key={item.href}
                  href={item.href}
                  date={formatMarketDate(item.date)}
                  kicker={item.source}
                  title={item.title}
                  external
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="news-doc-article">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  )
}
