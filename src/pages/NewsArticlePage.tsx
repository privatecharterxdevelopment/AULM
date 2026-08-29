import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { NewsPressItem } from '../components/NewsPressItem'
import { PageHero } from '../components/PageHero'
import { getNewsArticle, NEWS } from '../data/news'
import { formatLocaleDate, localizeNews, usePageTitle, useT } from '../i18n'

export function NewsArticlePage() {
  const { t, locale } = useT()
  const { slug } = useParams<{ slug: string }>()
  const raw = slug ? getNewsArticle(slug) : undefined
  const article = raw ? localizeNews(raw, t) : undefined

  usePageTitle(article?.title, article?.excerpt)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!article) return <Navigate to="/news" replace />

  const related = NEWS.filter((item) => item.slug !== article.slug)
    .slice(0, 3)
    .map((item) => localizeNews(item, t))

  const heroImage = article.image.endsWith('.jpg') ? article.image : '/news/news-hero.jpg'

  return (
    <div className="africa-page">
      <PageHero
        image={heroImage}
        imageAlt={article.title}
        imagePosition="center 35%"
        crumbs={[
          { label: t.common.home, to: '/' },
          { label: t.common.news, to: '/news' },
        ]}
        eyebrow={article.category}
        title={article.title}
        bar={[
          { title: t.common.allNews, href: '/news', cta: t.common.readMoreArrow },
          { title: t.nav.contact, href: '/contact', cta: t.common.writeArrow },
          { title: t.nav.procedure, href: '/company/procedure', cta: t.common.openArrow },
          { title: t.common.theDesk, href: '/company', cta: t.common.aboutArrow },
        ]}
      />

      <div className="news-doc news-doc--after-hero">
      <article className="news-doc-article">
        <p className="news-doc-kicker">
          <time dateTime={article.date}>{formatLocaleDate(article.date, locale)}</time>
        </p>
        <p className="news-doc-lead">{article.excerpt}</p>

        {article.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="news-doc-copy">
            {paragraph}
          </p>
        ))}

        <div className="news-doc-actions">
          <Link to="/contact" className="metal-page-btn metal-page-btn--primary">
            {t.nav.contact}
            <BtnArrow />
          </Link>
          <Link to="/news" className="metal-page-btn metal-page-btn--secondary">
            {t.common.allNews}
            <BtnArrow />
          </Link>
        </div>
      </article>

      {related.length > 0 ? (
        <aside className="news-doc-more">
          <p className="news-press-col-label">{t.news.moreFromDesk}</p>
          {related.map((item) => (
            <NewsPressItem
              key={item.slug}
              href={`/news/${item.slug}`}
              date={formatLocaleDate(item.date, locale)}
              kicker={item.category}
              title={item.title}
            />
          ))}
        </aside>
      ) : null}
      </div>
    </div>
  )
}
