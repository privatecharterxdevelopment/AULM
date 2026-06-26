import { CbosExpandSearch } from './CbosExpandSearch'
import { CbosHeaderActions } from './CbosHeaderActions'
import { CbosStripQuickIcons } from './CbosStripQuickIcons'
import { IconMenu } from './icons'

type Props = {
  onMenuClick?: () => void
}

export function CbosBankHeader({ onMenuClick }: Props) {
  return (
    <header className="cbos-bank-header">
      {onMenuClick ? (
        <button type="button" className="cbos-bank-header__menu" onClick={onMenuClick} aria-label="Open menu">
          <IconMenu />
        </button>
      ) : null}

      <CbosExpandSearch variant="header" showKbd />
      <CbosStripQuickIcons />
      <CbosHeaderActions />
    </header>
  )
}
