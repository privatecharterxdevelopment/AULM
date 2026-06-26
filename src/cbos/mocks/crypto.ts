import type { CryptoAsset } from '../types'
import { DEMO_CRYPTO } from './demoData'

const prices: Record<CryptoAsset, number> = {
  BTC: 68_420,
  ETH: 3_842,
  USDT: 1,
  USDC: 1,
  SOL: 142.5,
}

export const cryptoProvider = {
  listWallets() {
    return DEMO_CRYPTO
  },

  getPrice(asset: CryptoAsset): number {
    return prices[asset]
  },

  portfolioValueUsd(): number {
    return DEMO_CRYPTO.reduce((sum, w) => {
      const price = prices[w.asset]
      return sum + (w.available + w.pending + w.reserved) * price
    }, 0)
  },
}
