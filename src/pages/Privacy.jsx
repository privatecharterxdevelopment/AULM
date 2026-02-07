import { useEffect } from 'react'

function Privacy() {
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
          <h1>Privacy Policy</h1>

          <div className="legal-content">
            <p className="legal-intro">
              At AULM Global Trade Corporation, confidentiality is not merely a policy—it is the foundation of our
              business relationships. We are committed to protecting your personal and business information with the
              highest standards of discretion.
            </p>

            <div className="legal-section legal-highlight">
              <h2>Swiss Banking Secrecy Standards</h2>
              <p>
                Our data protection practices are modeled on the principles of Swiss banking secrecy (Schweizerisches
                Bankgeheimnis), governed by Article 47 of the Swiss Federal Act on Banks and Savings Banks (Bankengesetz).
                While we operate primarily from Dubai, we apply these rigorous Swiss standards to all client data:
              </p>
              <ul>
                <li>Absolute discretion regarding all client relationships and transactions</li>
                <li>Information shared only on a strict need-to-know basis within our organization</li>
                <li>No disclosure to third parties without explicit written consent or legal obligation</li>
                <li>Secure storage with encryption meeting Swiss financial industry standards</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>1. Information We Collect</h2>
              <p>
                To comply with international KYC/AML regulations and provide our services, we collect:
              </p>
              <ul>
                <li>Identity verification documents (passport, corporate registration)</li>
                <li>Proof of address and business documentation</li>
                <li>Source of funds and wealth documentation</li>
                <li>Transaction records and communication history</li>
                <li>Banking and payment information for settlement</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>2. How We Use Your Information</h2>
              <p>
                Your information is used exclusively for:
              </p>
              <ul>
                <li>Regulatory compliance (KYC, AML, OECD due diligence)</li>
                <li>Transaction processing and settlement</li>
                <li>Communication regarding your orders and account</li>
                <li>Fraud prevention and security measures</li>
                <li>Legal and regulatory reporting where mandated by law</li>
              </ul>
              <p>
                We do not sell, trade, or share your information for marketing purposes. Ever.
              </p>
            </div>

            <div className="legal-section">
              <h2>3. Data Protection & Security</h2>
              <p>
                We implement comprehensive security measures including:
              </p>
              <ul>
                <li>AES-256 encryption for all stored data</li>
                <li>Secure, access-controlled physical document storage</li>
                <li>Multi-factor authentication for system access</li>
                <li>Regular security audits by independent third parties</li>
                <li>Staff confidentiality agreements with legal penalties for breach</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>4. Disclosure Limitations</h2>
              <p>
                We will only disclose your information when:
              </p>
              <ul>
                <li>Required by court order or valid legal process</li>
                <li>Mandated by UAE Central Bank or financial regulators</li>
                <li>Necessary to prevent fraud or criminal activity</li>
                <li>You provide explicit written authorization</li>
              </ul>
              <p>
                Where legally permitted, we will notify you of any disclosure request before complying.
              </p>
            </div>

            <div className="legal-section">
              <h2>5. Data Retention</h2>
              <p>
                Client records are retained for the minimum period required by applicable regulations (typically 5-10 years
                post-relationship). Upon expiration of mandatory retention periods, data is securely destroyed using
                certified data destruction methods.
              </p>
            </div>

            <div className="legal-section">
              <h2>6. Your Rights</h2>
              <p>
                Subject to legal and regulatory requirements, you have the right to:
              </p>
              <ul>
                <li>Access your personal data held by us</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion where legally permissible</li>
                <li>Receive a copy of your data in portable format</li>
                <li>Lodge complaints with relevant data protection authorities</li>
              </ul>
            </div>

            <div className="legal-section">
              <h2>7. International Transfers</h2>
              <p>
                Where data is transferred between jurisdictions (UAE, Switzerland, and partner locations), we ensure
                equivalent protection through contractual safeguards and selection of partners who meet our confidentiality
                standards. All cross-border transfers comply with applicable data protection regulations.
              </p>
            </div>

            <div className="legal-section">
              <h2>8. Cookies & Website Analytics</h2>
              <p>
                This website uses essential cookies only for basic functionality. We do not use tracking cookies,
                advertising pixels, or third-party analytics that could compromise your privacy. Your browsing activity
                on our site is not monitored or shared.
              </p>
            </div>

            <div className="legal-contact">
              <p>
                <strong>Privacy & Data Protection Inquiries:</strong><br />
                <a href="mailto:privacy@aulmtrading.com">privacy@aulmtrading.com</a><br />
                <a href="mailto:legal@aulmtrading.com">legal@aulmtrading.com</a>
              </p>
              <p className="legal-note">
                This policy reflects our commitment to Swiss-standard confidentiality. For specific questions about
                how your data is handled, please contact us directly for a confidential discussion.<br /><br />
                Last updated: February 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Privacy
