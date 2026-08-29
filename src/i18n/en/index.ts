import { docCategoriesFromData, docsCopyFromData } from '../docsFromData'
import { newsCopyFromData } from '../newsFromData'
import { enCommon } from './common'
import { enHome } from './home'
import { enKyc } from './kyc'
import { enPages } from './pages'

export const en = {
  ...enCommon,
  home: enHome,
  ...enPages,
  kyc: enKyc,
  newsArticles: newsCopyFromData(),
  procedureDocs: docsCopyFromData(),
  procedureCategories: docCategoriesFromData(),
}

export type Messages = typeof en
