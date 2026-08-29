import { NEWS } from '../data/news'

export type NewsCopy = {
  title: string
  category: string
  excerpt: string
  paragraphs: string[]
}

export type NewsArticlesCopy = Record<string, NewsCopy>

export function newsCopyFromData(): NewsArticlesCopy {
  return Object.fromEntries(
    NEWS.map((article) => [
      article.slug,
      {
        title: article.title,
        category: article.category,
        excerpt: article.excerpt,
        paragraphs: [...article.paragraphs],
      },
    ]),
  )
}
