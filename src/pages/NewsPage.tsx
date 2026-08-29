import { NewsPressItem } from '../components/NewsPressItem'
import { NewsletterSignup } from '../components/NewsletterSignup'
import { PageHero } from '../components/PageHero'
import { formatMarketDate } from '../lib/commodityNews'
import { NEWS } from '../data/news'
import { useCommodityNews } from '../hooks/useCommodityNews'
import { useHashScroll } from '../hooks/useHashScroll'
import { formatLocaleDate, localizeNews, usePageTitle, useT } from '../i18n'

export function NewsPage() {
  const { t, locale } = useT()
  const { items, live } = useCommodityNews(8)
  useHashScroll()
  usePageTitle(t.nav.news)

  return (
    <div className="africa-page">
      <PageHero
        image="/news/news-hero.jpg"
        imageAlt={t.news.heroAlt}
        imagePosition="center 42%"
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.common.company, to: '/company' },
        ]}
        eyebrow={t.news.eyebrow}
        title={t.news.title}
        bar={[
          { title: t.news.fromDesk, href: '#desk', cta: t.common.readMoreArrow },
          { title: t.news.markets, href: '#markets', cta: t.common.readMoreArrow },
          { title: t.nav.procedure, href: '/company/procedure', cta: t.common.openArrow },
          { title: t.nav.contact, href: '/contact', cta: t.common.writeArrow },
        ]}
      />

      <div className="news-doc news-doc--index news-doc--after-hero">
        <div className={`news-press news-press--page${live ? '' : ' news-press--desk-only'}`}>
          <div id="desk">
            <p className="news-press-col-label">{t.news.fromDesk}</p>
            {NEWS.map((article) => {
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
            <div id="markets">
              <p className="news-press-col-label">{t.news.markets}</p>
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
