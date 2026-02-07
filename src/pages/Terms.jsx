import { useEffect } from 'react'

function Terms() {
  useEffect(() => {
    // Prevent indexing
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => document.head.removeChild(meta)
  }, [])

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <section className="legal-page">
        <div className="container">
          <span className="label">Legal</span>
          <h1>Terms & Conditions</h1>

          <div className="legal-content">
            <p className="legal-intro">
              These General Terms and Conditions govern all business relationships between AULM Global Trade Corporation
              and its clients. By engaging our services, you agree to these terms.
            </p>

            <div className="legal-section">
              <h2>1. Scope of Services</h2>
              <p>
                AULM Global Trade Corporation provides wholesale precious metals trading services exclusively to qualified
                institutional clients, licensed commodity traders, family offices, and accredited investors. Our services
                include gold sourcing, import/export facilitation, refinery coordination, and secure logistics management.
              </p>
            </div>

            <div className="legal-section">
              <h2>2. Eligibility & Client Qualification</h2>
              <p>
                All clients must complete our Know Your Customer (KYC) and Anti-Money Laundering (AML) verification process
                prior to any transaction. We reserve the right to decline service to any party that does not meet our
                compliance standards or whose business activities raise regulatory concerns.
              </p>
            </div>

            <div className="legal-section">
              <h2>3. Order Minimums & Limits</h2>
              <p>
                Minimum order quantity: 500 grams of refined gold.<br />
                Maximum monthly allocation: 250 kilograms per client.<br />
                Allocations exceeding standard limits require prior written approval and enhanced due diligence.
              </p>
            </div>

            <div className="legal-section">
              <h2>4. Pricing & Payment</h2>
              <p>
                All prices are quoted based on current London Bullion Market Association (LBMA) spot rates plus applicable
                premiums. Payment terms are established individually per client agreement. Full payment must be received
                before physical delivery or title transfer.
              </p>
            </div>

            <div className="legal-section">
              <h2>5. Delivery & Transfer of Title</h2>
              <p>
                Title to precious metals transfers upon full payment and confirmed allocation in approved vault facilities.
                Physical delivery is coordinated through our licensed logistics partners with full insurance coverage.
                Risk of loss transfers to the buyer upon delivery to the designated vault or carrier.
              </p>
            </div>

            <div className="legal-section">
              <h2>6. Compliance & Regulatory Standards</h2>
              <p>
                All transactions comply with OECD Due Diligence Guidance for Responsible Supply Chains, LBMA Responsible
                Gold Guidance, UAE Federal AML/CFT regulations, and applicable Swiss financial regulations. Clients must
                maintain their own regulatory compliance and provide documentation upon request.
              </p>
            </div>

            <div className="legal-section">
              <h2>7. Confidentiality</h2>
              <p>
                All client information and transaction details are treated as strictly confidential in accordance with
                Swiss banking secrecy standards and UAE data protection regulations. Information is disclosed only as
                required by law or with explicit client consent.
              </p>
            </div>

            <div className="legal-section">
              <h2>8. Limitation of Liability</h2>
              <p>
                AULM Global Trade Corporation's liability is limited to the direct value of the transaction in question.
                We are not liable for indirect, consequential, or speculative damages, market fluctuations, or delays
                caused by third-party service providers or regulatory authorities.
              </p>
            </div>

            <div className="legal-section">
              <h2>9. Governing Law & Jurisdiction</h2>
              <p>
                These terms are governed by the laws of the United Arab Emirates with respect to Dubai-based operations,
                and Swiss law for European operations. Any disputes shall be resolved through arbitration in the
                jurisdiction of the primary transaction location.
              </p>
            </div>

            <div className="legal-section">
              <h2>10. Complete Terms</h2>
              <p>
                These General Terms provide an overview of our standard business practices. Complete, legally binding
                Terms and Conditions specific to your transaction will be provided in writing with each order confirmation
                and must be signed prior to execution.
              </p>
              <p>
                For detailed terms, specific agreements, or any questions regarding these conditions, please contact us directly.
              </p>
            </div>

            <div className="legal-contact">
              <p>
                <strong>Contact for Terms & Agreements:</strong><br />
                <a href="mailto:legal@aulmtrading.com">legal@aulmtrading.com</a><br />
                <a href="mailto:trading@aulmtrading.com">trading@aulmtrading.com</a>
              </p>
              <p className="legal-note">
                Last updated: February 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Terms
