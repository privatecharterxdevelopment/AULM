import type { Messages } from '../en'
import { zhCommon } from './common'
import { zhProcedureCategories, zhProcedureDocs } from './docs'
import { zhHome } from './home'
import { zhKyc } from './kyc'
import { zhNewsArticles } from './news'
import { zhPages } from './pages'

export const zh = {
  ...zhCommon,
  home: zhHome,
  ...zhPages,
  kyc: zhKyc,
  newsArticles: zhNewsArticles,
  procedureDocs: zhProcedureDocs,
  procedureCategories: zhProcedureCategories,
} satisfies Messages
