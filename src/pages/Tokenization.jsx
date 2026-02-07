function Tokenization() {
  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Gold Tokenization</h1>
          <p>Bridging physical gold with digital asset infrastructure</p>
        </div>
      </section>

      {/* Intro Section */}
      <section>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <h2>The Future of Gold Ownership</h2>
            <p style={{ marginTop: '1.5rem', lineHeight: '1.8' }}>
              Gold tokenization represents the convergence of traditional precious metals trading with blockchain technology. By creating digital tokens backed 1:1 by physical gold stored in secure vaults, we enable fractional ownership, instant transferability, and unprecedented transparency in gold trading.
            </p>
            <p style={{ marginTop: '1rem', lineHeight: '1.8' }}>
              AULM is developing infrastructure to bridge our LBMA-certified physical gold operations with compliant digital asset frameworks, creating new possibilities for institutional investors and qualified buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section style={{ background: 'var(--color-light)' }}>
        <div className="container">
          <h2 style={{ marginBottom: '3rem' }}>Advantages of Tokenized Gold</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>Fractional Ownership</h3>
              <p>
                Access gold investment starting from small denominations. Tokenization removes traditional barriers to entry, enabling precise portfolio allocation without minimum bar requirements.
              </p>
            </div>
            <div className="service-card">
              <h3>24/7 Transferability</h3>
              <p>
                Transfer gold ownership instantly, globally, at any time. No waiting for vault operations or bank transfers. Blockchain-based settlement in minutes, not days.
              </p>
            </div>
            <div className="service-card">
              <h3>Full Transparency</h3>
              <p>
                Every token is traceable to specific gold bars with documented provenance. Real-time proof of reserves through on-chain attestations and independent audits.
              </p>
            </div>
            <div className="service-card">
              <h3>Reduced Costs</h3>
              <p>
                Eliminate traditional custody and transfer fees. Smart contract automation reduces administrative overhead, passing savings to token holders.
              </p>
            </div>
            <div className="service-card">
              <h3>Physical Redemption</h3>
              <p>
                Token holders retain the right to redeem for physical gold. Convert your digital holdings to LBMA-certified bars delivered to your vault or designated location.
              </p>
            </div>
            <div className="service-card">
              <h3>Regulatory Compliance</h3>
              <p>
                Built within Swiss and UAE regulatory frameworks. Full KYC/AML compliance, designed for institutional adoption and qualified investor requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <h2>How AULM Tokenization Works</h2>

            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>1. Physical Gold Custody</h3>
              <p style={{ lineHeight: '1.8' }}>
                LBMA-certified gold bars are stored in DMCC-approved vaults in Dubai and partner facilities in Switzerland. Each bar is individually serialized, weighed, and assayed with full chain of custody documentation.
              </p>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>2. Token Issuance</h3>
              <p style={{ lineHeight: '1.8' }}>
                Digital tokens are minted on a secure blockchain, each representing a specific quantity of vaulted gold. Smart contracts enforce 1:1 backing and prevent over-issuance.
              </p>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>3. Proof of Reserves</h3>
              <p style={{ lineHeight: '1.8' }}>
                Independent auditors verify physical holdings against token supply. On-chain attestations provide real-time transparency, accessible to all token holders.
              </p>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>4. Trade & Transfer</h3>
              <p style={{ lineHeight: '1.8' }}>
                Tokens can be held, transferred, or traded on compliant platforms. Settlement is instant and final, with complete transaction history recorded on-chain.
              </p>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>5. Redemption</h3>
              <p style={{ lineHeight: '1.8' }}>
                Qualified holders may redeem tokens for physical gold. Minimum redemption quantities apply. Delivery arranged through our secure logistics network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Institutions */}
      <section style={{ background: 'var(--color-dark)', color: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px' }}>
            <h2 style={{ color: 'var(--color-white)' }}>For Institutional Partners</h2>
            <p style={{ marginTop: '1.5rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)' }}>
              AULM tokenization infrastructure is designed for institutional adoption. We work with Family Offices, asset managers, and financial institutions seeking regulated exposure to tokenized precious metals.
            </p>
            <ul style={{ marginTop: '2rem', lineHeight: '2', color: 'rgba(255,255,255,0.7)' }}>
              <li>White-label tokenization solutions for qualified issuers</li>
              <li>API integration for portfolio management systems</li>
              <li>Customized custody and redemption arrangements</li>
              <li>Regulatory guidance for Swiss and UAE jurisdictions</li>
              <li>Dedicated institutional relationship management</li>
            </ul>
            <p style={{ marginTop: '2rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.7)' }}>
              Contact us to discuss how tokenized gold can enhance your portfolio infrastructure.
            </p>
            <a href="mailto:trading@aulmtrading.com" className="btn btn-outline" style={{ marginTop: '2rem', borderColor: 'rgba(255,255,255,0.3)', color: 'var(--color-white)' }}>
              Institutional Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section>
        <div className="container">
          <div style={{ maxWidth: '800px', fontSize: '0.875rem', color: 'rgba(0,0,0,0.5)', lineHeight: '1.8' }}>
            <p>
              <strong>Important Notice:</strong> AULM gold tokenization services are available only to qualified investors and institutional clients in permitted jurisdictions. Token offerings may be subject to regulatory restrictions. This page is for informational purposes only and does not constitute an offer to sell or solicitation to buy any securities or tokens. Please contact us for detailed information regarding eligibility, regulatory status, and availability in your jurisdiction.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Tokenization
