import type { Messages } from '../en'
import { koCommon } from './common'
import { koCategories, koDocs } from './docs'
import { koHome } from './home'
import { koKyc } from './kyc'
import { koNews } from './news'
import { koPages } from './pages'

export const ko = {
  ...koCommon,
  home: koHome,
  ...koPages,
  kyc: koKyc,
  newsArticles: koNews,
  procedureDocs: koDocs,
  procedureCategories: koCategories,
} satisfies Messages
