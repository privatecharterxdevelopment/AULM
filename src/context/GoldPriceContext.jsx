import { createContext, useContext, useState, useEffect } from 'react'

const GoldPriceContext = createContext()

// Simulated gold price - in production, fetch from a real API
const BASE_SPOT_PRICE = 2045.30 // USD per troy ounce
const DISCOUNT_PERCENTAGE = 10

export function GoldPriceProvider({ children }) {
  const [spotPrice, setSpotPrice] = useState(BASE_SPOT_PRICE)
  const [priceChange, setPriceChange] = useState(0.45)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Calculate discounted price (10% below spot)
  const discountedPrice = spotPrice * (1 - DISCOUNT_PERCENTAGE / 100)

  // Convert to price per gram (1 troy oz = 31.1035 grams)
  const TROY_OZ_TO_GRAMS = 31.1035
  const pricePerGram = spotPrice / TROY_OZ_TO_GRAMS
  const discountedPricePerGram = discountedPrice / TROY_OZ_TO_GRAMS

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 5
      setSpotPrice(prev => {
        const newPrice = prev + change
        return Math.max(1800, Math.min(2200, newPrice)) // Keep in realistic range
      })
      setPriceChange((Math.random() - 0.3) * 1.5)
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const value = {
    spotPrice,
    discountedPrice,
    pricePerGram,
    discountedPricePerGram,
    priceChange,
    discountPercentage: DISCOUNT_PERCENTAGE,
    lastUpdated,
    // Helper function to calculate order total
    calculateOrderTotal: (weightInGrams) => {
      return weightInGrams * discountedPricePerGram
    },
    // Helper function to calculate savings
    calculateSavings: (weightInGrams) => {
      return weightInGrams * (pricePerGram - discountedPricePerGram)
    }
  }

  return (
    <GoldPriceContext.Provider value={value}>
      {children}
    </GoldPriceContext.Provider>
  )
}

export function useGoldPrice() {
  const context = useContext(GoldPriceContext)
  if (!context) {
    throw new Error('useGoldPrice must be used within a GoldPriceProvider')
  }
  return context
}

export default GoldPriceContext
