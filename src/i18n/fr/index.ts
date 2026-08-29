import type { Messages } from '../en'
import { frCommon } from './common'
import { frProcedureCategories, frProcedureDocs } from './docs'
import { frHome } from './home'
import { frKyc } from './kyc'
import { frNewsArticles } from './news'
import { frPages } from './pages'

export const fr = {
  ...frCommon,
  home: frHome,
  ...frPages,
  kyc: frKyc,
  newsArticles: frNewsArticles,
  procedureDocs: frProcedureDocs,
  procedureCategories: frProcedureCategories,
} satisfies Messages
