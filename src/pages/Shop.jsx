import { useState } from 'react'
import { useGoldPrice } from '../context/GoldPriceContext'

function Shop() {
  const {
    spotPrice,
    discountedPrice,
    pricePerGram,
    discountedPricePerGram,
    priceChange,
    discountPercentage,
    calculateOrderTotal,
    calculateSavings,
    lastUpdated
  } = useGoldPrice()

  const [weight, setWeight] = useState(500)
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const weightPresets = [500, 1000, 2500, 5000, 10000]

  const handleWeightChange = (e) => {
    const value = parseInt(e.target.value) || 0
    setWeight(Math.max(500, value)) // Minimum 500g
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const orderTotal = calculateOrderTotal(weight)
  const savings = calculateSavings(weight)
  const spotTotal = weight * pricePerGram

  if (isSubmitted) {
    return (
      <div className="page-transition">
        <section className="shop-hero">
          <div className="container">
            <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: 'var(--spacing-4xl) 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-xl)' }}>✅</div>
              <h1>Reservation Confirmed</h1>
              <p style={{ fontSize: '1.125rem', marginTop: 'var(--spacing-lg)' }}>
                Thank you for your gold reservation. Our team will contact you within 24 hours to confirm your order and arrange payment details.
              </p>
              <div style={{
                background: 'var(--color-secondary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-xl)',
                marginTop: 'var(--spacing-2xl)',
                textAlign: 'left'
              }}>
                <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Order Summary</h3>
                <div className="summary-row">
                  <span>Weight</span>
                  <span>{weight.toLocaleString()}g</span>
                </div>
                <div className="summary-row">
                  <span>Price per gram</span>
                  <span>${discountedPricePerGram.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Reserved Total</span>
                  <span>${orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: 'var(--spacing-xl)' }}
                onClick={() => {
                  setIsSubmitted(false)
                  setWeight(500)
                  setFormData({ companyName: '', contactName: '', email: '', phone: '', notes: '' })
                }}
              >
                Make Another Reservation
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="page-transition">
      {/* Shop Hero */}
      <section className="shop-hero">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <span className="section-label">Gold Shop</span>
            <h1 className="section-title">Buy Gold at {discountPercentage}% Below Spot</h1>
            <p className="section-description">
              Reserve your gold today. Minimum order 500 grams. All gold refined in Dubai to 99.99% purity.
            </p>
          </div>

          {/* Live Price Display */}
          <div className="price-display">
            <div className="price-header">
              <h3>Current Gold Price</h3>
              <div className="live-indicator">
                <span className="live-dot"></span>
                <span>Live • Updated {lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="price-cards">
              <div className="price-card">
                <div className="price-card-label">Spot Price (USD/oz)</div>
                <div className="price-card-value">${spotPrice.toFixed(2)}</div>
                <div className={`price-card-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                </div>
              </div>
              <div className="price-card">
                <div className="price-card-label">Market Price (USD/g)</div>
                <div className="price-card-value">${pricePerGram.toFixed(2)}</div>
                <div className="price-card-change" style={{ color: 'var(--color-text-muted)' }}>
                  Standard rate
                </div>
              </div>
              <div className="price-card featured">
                <div className="price-card-label">Your Price (USD/g)</div>
                <div className="price-card-value">${discountedPricePerGram.toFixed(2)}</div>
                <div className="discount-badge">{discountPercentage}% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section style={{ padding: 'var(--spacing-4xl) 0' }}>
        <div className="container">
          <div className="order-section">
            {/* Form */}
            <div>
              <form className="order-form" onSubmit={handleSubmit}>
                <h3 style={{ marginBottom: 'var(--spacing-xl)' }}>Configure Your Order</h3>

                {/* Weight Selection */}
                <div className="form-group">
                  <label htmlFor="weight">Gold Weight (grams) *</label>
                  <div className="weight-input-wrapper">
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      value={weight}
                      onChange={handleWeightChange}
                      min="500"
                      step="100"
                      required
                    />
                    <span className="weight-unit">grams</span>
                  </div>
                  <div className="weight-presets">
                    {weightPresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        className={`weight-preset ${weight === preset ? 'active' : ''}`}
                        onClick={() => setWeight(preset)}
                      >
                        {preset >= 1000 ? `${preset / 1000}kg` : `${preset}g`}
                      </button>
                    ))}
                  </div>
                </div>

                <h4 style={{ marginTop: 'var(--spacing-2xl)', marginBottom: 'var(--spacing-lg)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--color-border)' }}>
                  Contact Information
                </h4>

                <div className="form-group">
                  <label htmlFor="companyName">Company Name *</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contactName">Contact Name *</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="business@company.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+971 XX XXX XXXX"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Additional Notes</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requirements or questions..."
                    rows="4"
                  />
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Gold Weight</span>
                <span>{weight.toLocaleString()} grams</span>
              </div>

              <div className="summary-row">
                <span>Price per gram</span>
                <span>${discountedPricePerGram.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal (spot price)</span>
                <span>${spotTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-row discount">
                <span>{discountPercentage}% Discount</span>
                <span>-${savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>${orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary reserve-btn"
                disabled={isSubmitting || weight < 500}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Processing...' : 'Reserve Gold Now'}
              </button>

              <div className="summary-note">
                <strong>Note:</strong> This is a reservation request. Our team will contact you within 24 hours to confirm pricing, arrange payment, and coordinate delivery details.
              </div>

              <div className="summary-note" style={{ marginTop: 'var(--spacing-md)', background: 'rgba(34, 197, 94, 0.1)' }}>
                <strong>Your Savings:</strong> ${savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} compared to spot price
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section style={{ padding: 'var(--spacing-4xl) 0', backgroundColor: 'var(--color-secondary)' }}>
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Transaction</h3>
              <p>All transactions are handled through secure banking channels with full documentation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📜</div>
              <h3>Full Certification</h3>
              <p>Every order includes complete assay certification and documentation for your records.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Insured Delivery</h3>
              <p>Fully insured, secure logistics to your specified location worldwide.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Shop
