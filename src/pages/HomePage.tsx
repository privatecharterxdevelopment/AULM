import { PageScroller } from '../components/PageScroller'
import { usePageTitle } from '../i18n'

export function HomePage() {
  usePageTitle()
  return <PageScroller />
}
