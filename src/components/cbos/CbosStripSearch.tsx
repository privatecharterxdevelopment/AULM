import { CbosExpandSearch } from './CbosExpandSearch'

export function CbosStripSearch() {
  return (
    <div className="cbos-bank-strip__tools" aria-label="Search">
      <CbosExpandSearch variant="strip" placeholder="Search…" />
    </div>
  )
}
