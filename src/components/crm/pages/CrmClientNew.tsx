import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CRM_STAFF } from '../../../crm/mockData'
import { CrmPageHead } from '../CrmUi'

export function CrmClientNew() {
  const [saved, setSaved] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaved(true)
  }

  return (
    <div className="crm-page crm-page--form">
      <CrmPageHead
        eyebrow="Master data"
        title="Create client profile"
        subtitle="Add a B2B buyer, supplier, counterparty or partner. KYC can follow via a secure link."
        actions={<Link to="/crm/clients" className="crm-secondary-btn">Cancel</Link>}
      />

      <form className="crm-form" onSubmit={submit}>
        <section className="crm-card">
          <header className="crm-card__head"><div><p>Identity</p><h3>Company information</h3></div></header>
          <div className="crm-form-grid">
            <label><span>Legal company name *</span><input name="legalName" required /></label>
            <label><span>Trading name</span><input name="tradingName" /></label>
            <label>
              <span>Relationship *</span>
              <select name="kind" required defaultValue="buyer">
                <option value="buyer">Buyer</option>
                <option value="supplier">Supplier</option>
                <option value="both">Buyer & supplier</option>
                <option value="partner">Partner</option>
              </select>
            </label>
            <label><span>Registration number</span><input name="registrationNumber" /></label>
            <label><span>Incorporation country *</span><input name="country" required /></label>
            <label><span>Tax number</span><input name="taxNumber" /></label>
          </div>
        </section>

        <section className="crm-card">
          <header className="crm-card__head"><div><p>Relationship</p><h3>Commercial profile</h3></div></header>
          <div className="crm-form-grid">
            <label><span>Business email *</span><input name="email" type="email" required /></label>
            <label><span>Phone</span><input name="phone" type="tel" /></label>
            <label>
              <span>Relationship owner *</span>
              <select name="assignedTo" required defaultValue={CRM_STAFF[0].name}>
                {CRM_STAFF.map((staff) => <option key={staff.id}>{staff.name}</option>)}
              </select>
            </label>
            <label><span>Expected annual volume (USD)</span><input name="volume" type="number" min="0" /></label>
            <label><span>Annual revenue (USD)</span><input name="revenue" type="number" min="0" /></label>
            <label>
              <span>Risk rating</span>
              <select name="risk" defaultValue="unrated">
                <option value="unrated">Unrated</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label className="crm-form-grid__wide">
              <span>Source of funds / business activity</span>
              <textarea name="sourceOfFunds" rows={3} />
            </label>
            <label className="crm-form-grid__wide">
              <span>Internal notes</span>
              <textarea name="notes" rows={3} />
            </label>
          </div>
        </section>

        <section className="crm-card">
          <header className="crm-card__head"><div><p>Next step</p><h3>Onboarding</h3></div></header>
          <label className="crm-checkbox">
            <input type="checkbox" name="sendInvite" defaultChecked />
            <span>
              <strong>Send digital onboarding link after creation</strong>
              <small>Client completes KYC/KYB, uploads documents and signs digitally.</small>
            </span>
          </label>
        </section>

        <footer className="crm-form__foot">
          {saved ? <p role="status">Demo profile captured. Deploy the CRM migration to persist new clients.</p> : null}
          <button type="submit" className="crm-primary-btn">Create client</button>
        </footer>
      </form>
    </div>
  )
}
