export const REFINERY = {
  tagline: ['Assayed.', 'Weighed.', 'Settled.'],
  title: 'Refining at best market rates',
  lead:
    'AULM coordinates institutional refining and offtake for doré gold, alluvial dust, nuggets and non-LBMA bullion bars — documented supply chain, 48-hour fire assay and bank-only settlement on institutional rails.',
  tradeTerms:
    'Initial trades on CIF only. FOB is available as an option once the institutional relationship is established.',
  materials: [
    {
      id: 'dore',
      title: 'Doré gold',
      text: 'Unrefined gold bars and ingots from licensed producers. Documented origin, assay pairing and chain-of-custody required before partner refinery intake and MT103 settlement.',
      image: '/refinery/dore.svg',
    },
    {
      id: 'dust',
      title: 'Dust',
      text: 'Fine alluvial and concentrate dust — weighed, sealed and fire-assayed within 48 hours. Total weight and fineness confirmed before payment instruction.',
      image: '/refinery/dust.svg',
    },
    {
      id: 'nuggets',
      title: 'Nuggets',
      text: 'Raw nugget lots from verified sources. Each shipment subject to supply-chain verification, enhanced due diligence and institutional onboarding before purchase.',
      image: '/refinery/nuggets.svg',
    },
    {
      id: 'bullion',
      title: 'Bullion bars (non-LBMA)',
      text: 'Non-LBMA bullion bars for re-melting, institutional offtake or structured exit — assay, provenance and compliance clearance required before intake.',
      image: '/refinery/bullion.svg',
    },
  ],
  sell: {
    eyebrow: 'Institutional offtake',
    title: 'Sell to AULM',
    lead: 'We buy doré, dust, nuggets and non-LBMA bullion when compliance clears — at best market price value, less a small institutional discount on verified lots.',
    benefits: [
      'Best market price on assay-confirmed weight and fineness',
      'Small institutional discount on cleared lots',
      '48-hour fire assay · MT103 settlement T+1',
      'LBMA or non-LBMA exit — re-melting or tax-free transport',
      'Bank-to-bank only — no crypto, no anonymous flows',
    ],
  },
  faq: [
    {
      q: 'Will AULM purchase my material?',
      a: 'Yes — when supply chain documentation, enhanced due diligence, fire assay and full KYC/KYB onboarding are complete. We buy verified doré gold, dust, nuggets and non-LBMA bullion bars; we do not purchase anonymous or non-compliant flows.',
    },
    {
      q: 'LBMA or non-LBMA output?',
      a: 'Mandates can be structured for LBMA-good delivery or non-LBMA product for re-melting or tax-free transportation, depending on your exit route, refinery partner and jurisdictional requirements.',
    },
    {
      q: 'How is pricing determined?',
      a: 'Pricing references prevailing market value on assay-confirmed weight and fineness. Sellers to AULM receive best market price value, less a small institutional discount on cleared lots.',
    },
    {
      q: 'What must be in place before you buy?',
      a: 'Traceable provenance, chain-of-custody records, AML clearance, partner refinery acceptance and bank-to-bank settlement rails. Every mandate requires prior written approval from compliance.',
    },
    {
      q: 'Can material move tax-free after refining?',
      a: 'Where jurisdiction and documentation allow, we coordinate non-LBMA or structured flows for re-melting or tax-free transportation through licensed logistics and counsel — subject to mandate terms.',
    },
  ],
  disclaimer:
    'Refining is performed by independent licensed partner refineries. AULM coordinates intake, compliance routing and settlement instructions only. Assay timelines, pricing and acceptance are subject to partner terms, material condition and jurisdictional requirements. Nothing on this page constitutes an offer, legal advice or guarantee of acceptance. All flows require prior written mandate and compliance approval.',
} as const
