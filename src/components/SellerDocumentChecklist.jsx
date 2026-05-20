export default function SellerDocumentChecklist() {
  return (
    <div className="seller-docs">
      <p className="seller-docs-intro">
        <strong>Reference only — no upload here.</strong> After approval, we request documents per shipment; requirements depend on origin and routing.
      </p>

      <div className="seller-docs-grid">
        <section>
          <h3>1. Corporate & import eligibility (UAE side)</h3>
          <ul>
            <li>UAE trade license with gold / precious metals activity</li>
            <li>Importer code / customs registration (Dubai Customs or relevant Free Zone)</li>
            <li>DMCC or Free Zone registration and compliance file, if applicable</li>
          </ul>
        </section>

        <section>
          <h3>2. Shipment documents (required per consignment)</h3>
          <ul>
            <li>
              <strong>Commercial invoice</strong> — seller, buyer, weight, purity, price, origin
            </li>
            <li>
              <strong>Packing list</strong> — units, net/gross weight, packaging
            </li>
            <li>
              <strong>AWB or bill of lading</strong> — carrier freight document
            </li>
            <li>
              <strong>Certificate of origin (COO)</strong> — often chamber-certified
            </li>
            <li>
              <strong>Assay / purity certificate</strong> — critical for doré
            </li>
            <li>
              <strong>Export permit / license</strong> from country of origin (e.g. Ghana, Uganda, Tanzania)
            </li>
            <li>
              <strong>Incoterms & insurance</strong> — CIF, FOB, CFR, DAP or agreed terms; marine/cargo insurance
              certificate where applicable (especially CIF)
            </li>
          </ul>
        </section>

        <section>
          <h3>3. AML/KYC & responsible sourcing</h3>
          <p>Doré is reviewed more strictly than finished bars. Sellers typically must supply:</p>
          <ul>
            <li>KYC for buyer and seller · UBO (ultimate beneficial owner) disclosure</li>
            <li>Source of funds / source of wealth</li>
            <li>Legal origin proof — mine or concession documentation</li>
            <li>Responsible sourcing / due diligence pack (AML & conflict-gold controls)</li>
          </ul>
        </section>

        <section>
          <h3>4. Dubai customs declaration</h3>
          <p>
            Import declaration via Dubai Customs (e.g. Mirsal / Dubai Trade). Incomplete files risk hold,
            delay, or seizure — especially for African doré routes.
          </p>
        </section>
      </div>

      <div className="seller-docs-critical">
        <h3>Critical for doré from Africa</h3>
        <ul>
          <li>Assay report (purity)</li>
          <li>Certificate of origin</li>
          <li>Origin-country export permit</li>
          <li>Mine / source evidence</li>
          <li>CIF / FOB / CFR shipping terms documented on invoice</li>
          <li>Marine cargo insurance (CIF) and chain-of-custody records</li>
        </ul>
      </div>
    </div>
  )
}
