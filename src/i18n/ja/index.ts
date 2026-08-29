import type { Messages } from '../en'
import { jaCommon } from './common'
import { jaProcedureCategories, jaProcedureDocs } from './docs'
import { jaHome } from './home'
import { jaKyc } from './kyc'
import { jaNewsArticles } from './news'
import { jaPages } from './pages'

export const ja = {
  ...jaCommon,
  home: jaHome,
  ...jaPages,
  kyc: jaKyc,
  newsArticles: jaNewsArticles,
  procedureDocs: jaProcedureDocs,
  procedureCategories: jaProcedureCategories,
} satisfies Messages
