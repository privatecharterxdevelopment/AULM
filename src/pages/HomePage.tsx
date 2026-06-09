import { Hero } from '../components/Hero'
import { PageScroller } from '../components/PageScroller'

export function HomePage() {
  return <PageScroller hero={<Hero />} />
}
