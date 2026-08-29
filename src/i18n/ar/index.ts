import type { Messages } from '../en'
import { arCommon } from './common'
import { arDocCategories, arDocs } from './docs'
import { arHome } from './home'
import { arKyc } from './kyc'
import { arNews } from './news'
import { arPages } from './pages'

export const ar = {
  ...arCommon,
  home: arHome,
  ...arPages,
  kyc: arKyc,
  newsArticles: arNews,
  procedureDocs: arDocs,
  procedureCategories: arDocCategories,
} satisfies Messages
