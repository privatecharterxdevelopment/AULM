import type { NewsArticle } from '../data/news'
import type { SiteDocument } from '../data/documents'
import { LOCALE_META, type Locale } from './locales'
import type { Messages } from './en'

export function localizeNews(article: NewsArticle, t: Messages): NewsArticle {
  const copy = t.newsArticles[article.slug]
  if (!copy) return article
  return {
    ...article,
    title: copy.title,
    category: copy.category,
    excerpt: copy.excerpt,
    paragraphs: copy.paragraphs.length ? copy.paragraphs : article.paragraphs,
  }
}

export function localizeDocument(doc: SiteDocument, t: Messages): SiteDocument {
  const copy = t.procedureDocs[doc.slug]
  if (!copy) return doc
  return {
    ...doc,
    title: copy.title,
    summary: copy.summary,
    sections: copy.sections.map((section, i) => ({
      title: section.title || doc.sections[i]?.title,
      paragraphs: section.paragraphs.length ? section.paragraphs : doc.sections[i]?.paragraphs,
      bullets: section.bullets.length ? section.bullets : doc.sections[i]?.bullets,
    })),
  }
}

export function formatLocaleDate(iso: string, locale: Locale) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(LOCALE_META[locale].dateLocale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
