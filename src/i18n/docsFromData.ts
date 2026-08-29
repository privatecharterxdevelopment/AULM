import { DOCUMENT_CATEGORIES, SITE_DOCUMENTS, type DocumentCategory } from '../data/documents'

export type DocSectionCopy = {
  title: string
  paragraphs: string[]
  bullets: string[]
}

export type DocCopy = {
  title: string
  summary: string
  sections: DocSectionCopy[]
}

export type DocsCopy = Record<string, DocCopy>

export type DocCategoryCopy = {
  label: string
  description: string
}

export function docsCopyFromData(): DocsCopy {
  return Object.fromEntries(
    SITE_DOCUMENTS.map((doc) => [
      doc.slug,
      {
        title: doc.title,
        summary: doc.summary,
        sections: doc.sections.map((section) => ({
          title: section.title ?? '',
          paragraphs: section.paragraphs ? [...section.paragraphs] : [],
          bullets: section.bullets ? [...section.bullets] : [],
        })),
      },
    ]),
  )
}

export function docCategoriesFromData(): Record<DocumentCategory, DocCategoryCopy> {
  return {
    'shipping-instructions': { ...DOCUMENT_CATEGORIES['shipping-instructions'] },
    compliance: { ...DOCUMENT_CATEGORIES.compliance },
  }
}
