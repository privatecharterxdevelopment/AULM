import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CbosCardStage } from '../CbosCardStage'
import { useCbos } from '../../../cbos/context/CbosContext'
import { cardsProvider } from '../../../cbos/mocks/cards'
import { formatMoney } from '../../../cbos/lib/format'
import type { CbosCard } from '../../../cbos/types'
import { CbosPage } from '../CbosPage'
import { CbosPageHeader } from '../CbosPageHeader'

export function CbosCards() {
  const { api } = useCbos()
  const [cards, setCards] = useState<CbosCard[]>([])

  const refresh = () => {
    void api.listCards().then(({ items }) => setCards(items))
  }

  useEffect(() => {
    refresh()
  }, [api])

  const toggleFreeze = (id: string) => {
    cardsProvider.toggleFreeze(id)
    refresh()
  }

  return (
    <CbosPage>
      <section className="cbos-bank-panel">
        <CbosPageHeader
          label="Banking"
          title="Cards"
          subtitle="Corporate and virtual spend"
          action={
            <button type="button" className="cbos-btn">
              Issue card
            </button>
          }
        />
      </section>

      <div className="cbos-bank-triple cbos-bank-triple--cards">
        <section className="cbos-bank-panel cbos-bank-panel--card">
          <div className="cbos-bank-panel__body cbos-bank-panel__body--card">
            <CbosCardStage cards={cards} fill />
          </div>
        </section>

        <section className="cbos-bank-panel" style={{ gridColumn: 'span 2' }}>
          <header className="cbos-bank-panel__head">
            <h2>Issued cards</h2>
          </header>
          <ul className="cbos-bank-accounts">
            {cards.map((c) => (
              <li key={c.id}>
                <div className="cbos-bank-account" style={{ cursor: 'default' }}>
                  <span className="cbos-bank-account__info">
                    <span className="cbos-bank-account__name cbos-tabular">•••• {c.lastFour}</span>
                    <span className="cbos-bank-account__type">
                      {c.holderName} · {c.cardType.replace('_', ' ')}
                      {c.spendLimit ? ` · ${formatMoney(c.spendLimit, c.currency)}` : ''}
                    </span>
                  </span>
                  <button type="button" className="cbos-text-btn" onClick={() => toggleFreeze(c.id)}>
                    {c.isFrozen ? 'Unfreeze' : 'Freeze'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cbos-bank-panel__body" style={{ paddingTop: 0 }}>
            <Link to="/bank/transfers" className="cbos-text-btn">View transactions →</Link>
          </div>
        </section>
      </div>
    </CbosPage>
  )
}
