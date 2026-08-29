import { Link } from 'react-router-dom'
import { FEATURED_NEWS } from '../data/news'
import { formatMarketDate } from '../lib/commodityNews'
import { useCommodityNews } from '../hooks/useCommodityNews'
import { NewsPressItem } from './NewsPressItem'
import { formatLocaleDate, localizeNews, useT } from '../i18n'

type Props = {
  reveal: number
}

export function NewsSection({ reveal }: Props) {
  const { t, locale } = useT()
  const { items, live } = useCommodityNews(4)
  const headIn = Math.min(1, reveal / 0.45)
  const listIn = Math.min(1, Math.max(0, (reveal - 0.15) / 0.6))

  return (
    <section className="news-home" aria-label={t.home.newsHome.aria} id="news">
      <div className="news-home-inner">
        <header
          className="faq-section-head"
          style={{
            opacity: headIn,
            transform: `translateY(${(1 - headIn) * 20}px)`,
          }}
        >
          <p className="faq-section-label">{t.home.newsHome.label}</p>
          <h2 className="faq-section-title">{t.home.newsHome.title}</h2>
        </header>

        <div
          className={`news-press${live ? '' : ' news-press--desk-only'}`}
          style={{
            opacity: listIn,
            transform: `translateY(${(1 - listIn) * 16}px)`,
          }}
        >
          <div>
            <p className="news-press-col-label">{t.common.fromTheDesk}</p>
            {FEATURED_NEWS.map((article) => {
              const loc = localizeNews(article, t)
              return (
                <NewsPressItem
                  key={article.slug}
                  href={`/news/${article.slug}`}
                  date={formatLocaleDate(article.date, locale)}
                  kicker={loc.category}
                  title={loc.title}
                />
              )
            })}
          </div>

          {live ? (
            <div>
              <p className="news-press-col-label">{t.common.markets}</p>
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

        <p className="procedure-home-all" style={{ opacity: listIn }}>
          <Link to="/news" className="procedure-home-more">
            {t.common.moreNews}
          </Link>
        </p>
      </div>
    </section>
  )
}
