import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { BtnArrow } from '../components/BtnArrow'
import { NewsPressItem } from '../components/NewsPressItem'
import { PageHero } from '../components/PageHero'
import { formatNewsDate, getNewsArticle, NEWS } from '../data/news'

export function NewsArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getNewsArticle(slug) : undefined

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!article) return <Navigate to="/news" replace />

  const related = NEWS.filter((item) => item.slug !== article.slug).slice(0, 3)

  const heroImage = article.image.endsWith('.jpg') ? article.image : '/company/locations/uae.jpg'

  return (
    <div className="africa-page">
      <PageHero
        image={heroImage}
        imageAlt={article.title}
        imagePosition="center 35%"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'News', to: '/news' },
        ]}
        eyebrow={article.category}
        title={article.title}
        bar={[
          { title: 'All news', href: '/news', cta: 'Read more →' },
          { title: 'Contact us', href: '/contact', cta: 'Write →' },
          { title: 'Procedure', href: '/company/procedure', cta: 'Open →' },
          { title: 'The desk', href: '/company', cta: 'About →' },
        ]}
      />

      <div className="news-doc news-doc--after-hero">
      <article className="news-doc-article">
        <p className="news-doc-kicker">
          <time dateTime={article.date}>{formatNewsDate(article.date)}</time>
        </p>
        <p className="news-doc-lead">{article.excerpt}</p>

        {article.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="news-doc-copy">
            {paragraph}
          </p>
        ))}

        <div className="news-doc-actions">
          <Link to="/contact" className="metal-page-btn metal-page-btn--primary">
            Contact us
            <BtnArrow />
          </Link>
          <Link to="/news" className="metal-page-btn metal-page-btn--secondary">
            All news
            <BtnArrow />
          </Link>
        </div>
      </article>

      {related.length > 0 ? (
        <aside className="news-doc-more">
          <p className="news-press-col-label">More from the desk</p>
          {related.map((item) => (
            <NewsPressItem
              key={item.slug}
              href={`/news/${item.slug}`}
              date={formatNewsDate(item.date)}
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
