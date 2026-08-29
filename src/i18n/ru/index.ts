import type { Messages } from '../en'
import { ruCommon } from './common'
import { ruDocs, ruDocCategories } from './docs'
import { ruHome } from './home'
import { ruKyc } from './kyc'
import { ruNews } from './news'
import { ruPages } from './pages'

export const ru = {
  ...ruCommon,
  home: ruHome,
  ...ruPages,
  kyc: ruKyc,
  newsArticles: ruNews,
  procedureDocs: ruDocs,
  procedureCategories: ruDocCategories,
} satisfies Messages
