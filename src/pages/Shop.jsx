import { useState } from 'react'
import { useGoldPrice } from '../context/GoldPriceContext'

function Shop() {
  const {
    spotPrice,
    pricePerGram,
    discountedPricePerGram,
    priceChange,
    discountPercentage,
    calculateOrderTotal,
    calculateSavings
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
    setWeight(Math.max(500, value))
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
      <>
        <section className="page-header">
          <div className="container">
            <h1>Reservation confirmed</h1>
            <p>Thank you for your gold reservation. Our team will contact you within 24 hours.</p>
          </div>
        </section>
        <section>
          <div className="container">
            <div style={{ maxWidth: '500px' }}>
              <h3>Order summary</h3>
              <div className="summary-row" style={{ marginTop: '1.5rem' }}>
                <span>Weight</span>
                <span>{weight.toLocaleString()}g</span>
              </div>
              <div className="summary-row">
                <span>Price per gram</span>
                <span>${discountedPricePerGram.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: '2rem' }}
                onClick={() => {
                  setIsSubmitted(false)
                  setWeight(500)
                  setFormData({ companyName: '', contactName: '', email: '', phone: '', notes: '' })
                }}
              >
                Make another reservation
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="shop-hero">
        <div className="container">
          <h1>Buy gold at {discountPercentage}% below spot</h1>
          <p>
            Ethically sourced gold directly from fair mines, refined to 99.99% purity in Dubai. Minimum order 500 grams.
          </p>

          <div className="price-display">
            <div className="price-row">
              <div className="price-item">
                <label>Spot price (USD/oz)</label>
                <div className="value">${spotPrice.toFixed(2)}</div>
                <div className={`sub ${priceChange >= 0 ? 'positive' : 'negative'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                </div>
              </div>
              <div className="price-item">
                <label>Market price (USD/g)</label>
                <div className="value">${pricePerGram.toFixed(2)}</div>
                <div className="sub">Standard rate</div>
              </div>
              <div className="price-item">
                <label>Your price (USD/g)</label>
                <div className="value">${discountedPricePerGram.toFixed(2)}</div>
                <div className="sub positive">{discountPercentage}% discount</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="order-grid">
            <div className="order-form">
              <h3>Order details</h3>

              <div className="form-group">
                <label>Gold weight (grams)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={handleWeightChange}
                  min="500"
                  step="100"
                />
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

              <h3 style={{ marginTop: '2rem' }}>Contact information</h3>

              <div className="form-group">
                <label>Company name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Contact name</label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>
            </div>

            <div className="order-summary">
              <h3>Order summary</h3>

              <div className="summary-row">
                <span>Weight</span>
                <span>{weight.toLocaleString()} grams</span>
              </div>

              <div className="summary-row">
                <span>Price per gram</span>
                <span>${discountedPricePerGram.toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Subtotal (spot)</span>
                <span>${spotTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-row discount">
                <span>{discountPercentage}% discount</span>
                <span>-${savings.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>${orderTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1.5rem' }}
                disabled={isSubmitting || weight < 500}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Processing...' : 'Reserve gold'}
              </button>

              <div className="summary-note">
                This is a reservation request. Our team will contact you within 24 hours to confirm and arrange payment.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Shop
