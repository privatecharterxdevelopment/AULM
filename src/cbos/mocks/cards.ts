import { DEMO_CARDS } from './demoData'

let cards = DEMO_CARDS.map((c) => ({ ...c }))

export const cardsProvider = {
  list() {
    return cards
  },

  toggleFreeze(id: string): void {
    cards = cards.map((c) => (c.id === id ? { ...c, isFrozen: !c.isFrozen } : c))
  },
}
