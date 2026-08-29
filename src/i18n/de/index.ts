import type { Messages } from '../en'
import { deCommon } from './common'
import { deHome } from './home'
import { dePages } from './pages'
import { deKyc } from './kyc'
import { deNewsArticles } from './news'
import { deProcedureCategories, deProcedureDocs } from './docs'

export const de = {
  ...deCommon,
  home: deHome,
  ...dePages,
  kyc: deKyc,
  newsArticles: deNewsArticles,
  procedureDocs: deProcedureDocs,
  procedureCategories: deProcedureCategories,
} satisfies Messages
