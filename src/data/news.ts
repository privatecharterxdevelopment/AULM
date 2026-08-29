export type NewsArticle = {
  slug: string
  title: string
  category: string
  date: string
  image: string
  imageFit?: 'cover' | 'contain'
  excerpt: string
  paragraphs: string[]
}

export const NEWS: NewsArticle[] = [
  {
    slug: 'emirates-gold-vs-valcambi',
    title: 'Emirates Gold vs. Valcambi: Which Stamp Gives You More Liquidity?',
    category: 'Market Analysis',
    date: '2026-02-06',
    image: '/metals/gold.png',
    imageFit: 'contain',
    excerpt:
      'When trading large volumes of gold bars internationally, the refinery stamp on your bars can significantly impact liquidity and resale value.',
    paragraphs: [
      'For institutional desks, the stamp on a Good Delivery bar is not branding — it is a liquidity signal. Emirates Gold and Valcambi both sit on recognised lists, but counterparties, vaults and refiners still price familiarity, location and melt-risk differently.',
      'Bars with a widely recognised Swiss or UAE stamp typically clear faster in Dubai and loco London. Spreads compress when the receiving vault already holds that brand, and widen when a bar must be recast or re-assayed before it can enter an allocated account.',
      'AULM buys and sells on LBMA-linked terms. We advise clients on which stamps move cleanly through Dubai intake, which lots should be refined before onward sale, and when a recast is cheaper than sitting on a less liquid bar.',
    ],
  },
  {
    slug: 'dmcc-good-delivery-standard',
    title: 'Dubai Good Delivery: Why the DMCC Standard is Essential for Global Traders',
    category: 'Compliance',
    date: '2026-02-04',
    image: '/company/locations/uae.jpg',
    excerpt:
      'The Dubai Good Delivery (DGD) standard has become a critical benchmark for gold bars entering international trade through the UAE.',
    paragraphs: [
      'Dubai Good Delivery is the local quality benchmark for bars that move through the UAE. For desks that originate in Africa and settle in Dubai, DGD sits alongside LBMA — not instead of it — as the standard counterparties expect at intake.',
      'Bars that already meet DGD specifications clear customs, vault and refinery gates with fewer holds. Lots that do not are still tradable, but they typically require assay, recast or a documented exception before they can be allocated or re-exported.',
      'Our logistics and procedure pages cover the documents we expect on every import. If you are moving bars into Dubai for the first time, start with origin, assay and the DGD / LBMA status of the lot — then speak to the desk.',
    ],
  },
  {
    slug: 'spot-gold-discounts-dubai',
    title: 'Spot Gold Discounts in Dubai: How Institutional Traders Play the Premium Game',
    category: 'Trading Strategy',
    date: '2026-02-01',
    image: '/nuggets/gold.png',
    imageFit: 'contain',
    excerpt:
      "Dubai's position as a global gold trading hub creates unique arbitrage opportunities that savvy institutional traders exploit daily.",
    paragraphs: [
      'Dubai premiums and discounts versus loco London are a function of physical tightness, import flows and local fabrication demand — not a retail “spot price” on a website. Institutional desks trade the differential, not a headline number.',
      'When African origination is heavy and vaults are full, Dubai can trade at a discount to London. When jewellery demand or re-export tightens available bars, the premium returns. Timing, stamp, and form (doré versus bullion) all change the number.',
      'AULM does not publish a public price board. We quote on mandate: metal, form, volume, location and settlement. Contact the desk with the lot and we will price against the current Dubai / London differential.',
    ],
  },
  {
    slug: 'uganda-gold-supply-chain',
    title: 'From Uganda Gold to Global Player: How DMCC Import Licenses Enable Seamless Supply Chains',
    category: 'Supply Chain',
    date: '2026-01-29',
    image: '/sourcing/responsible-sourcing.jpg',
    excerpt:
      'East Africa has emerged as a significant gold-producing region, with Uganda serving as a key aggregation point.',
    paragraphs: [
      'Uganda and the wider East African corridor are now a regular origination path into Dubai. Aggregation, export permits and UAE import licences have to line up — a missing document stops the lot at the airport, not at the refinery.',
      'DMCC- and UAE-side import permissions are only half of the chain. Origin, OECD due diligence, assay and carrier insurance have to travel with the metal. We treat Uganda flows the same as West and Central African corridors: documented, screened, then moved.',
      'If you are originating in East Africa, read the supply-chain procedure and the import logistics page, then send the desk the lot details. We will tell you which documents are missing before the goods leave origin.',
    ],
  },
  {
    slug: 'switzerland-dubai-connection',
    title: 'Switzerland Meets Dubai: Why Global Jewelry Giants Need Both Trading Hubs',
    category: 'Industry Insights',
    date: '2026-01-25',
    image: '/company/locations/switzerland.jpg',
    excerpt:
      "The world's largest jewelry manufacturers and luxury brands increasingly rely on a dual-hub strategy.",
    paragraphs: [
      'Switzerland remains the refining and allocated-gold centre. Dubai is the physical intake and re-export hub for African and Asian flows. Jewellery groups and fabricators now run both: melt and Good Delivery in one, origination and logistics in the other.',
      'AULM is built on that split — Swiss–German roots, Liechtenstein backing, IFZA-licensed desk in Dubai. Counterparties can originate into Dubai and still settle, vault or refine toward Swiss and London standards.',
      'For family offices and manufacturers, the practical question is custody location and bar brand, not which city is “the” gold hub. We structure the mandate so metal can enter in Dubai and sit where the client’s bank or vault already operates.',
    ],
  },
  {
    slug: 'gold-price-forecast-2026',
    title: 'Gold Price Forecast 2026: What Institutional Investors Need to Know',
    category: 'Market Analysis',
    date: '2026-01-20',
    image: '/company/locations/liechtenstein.jpg',
    excerpt:
      'As we navigate through 2026, gold markets continue to be shaped by unprecedented central bank accumulation.',
    paragraphs: [
      'Physical desks do not trade forecasts. Central-bank buying, real rates and ETF flows set the tape; premiums in Dubai still depend on metal on the ground. A higher dollar price does not automatically mean a tighter physical market here.',
      'What matters for counterparties in 2026 is the same as last year: form, origin, stamp and settlement. Doré from CAHRA corridors still needs OECD due diligence. Bullion still needs a vault that will take the bar.',
      'We do not publish a house target. We quote physical gold, silver and copper against the market you can actually deliver into. If you need a view on a specific lot, write to the desk.',
    ],
  },
  {
    slug: 'lbma-certification-guide',
    title: 'LBMA Good Delivery: Complete Guide to Gold Bar Certification Standards',
    category: 'Compliance',
    date: '2026-01-15',
    image: '/metals/gold.png',
    imageFit: 'contain',
    excerpt:
      'The London Bullion Market Association (LBMA) Good Delivery List represents the gold standard for bar quality worldwide.',
    paragraphs: [
      'LBMA Good Delivery is the list of refiners whose 400 oz bars are accepted for loco London clearing. Weight, fineness, marks and appearance are specified. Bars off-list can still be physical gold — they are not automatically Good Delivery.',
      'AULM buys doré and scrap at LBMA-linked terms and sells LBMA bullion. That means intake lots are assayed and, where required, refined through listed partners before they are sold as allocated bars.',
      'If your mandate is “Good Delivery into a London account”, say so at onboarding. If it is “doré CIF Dubai”, the procedure is different. Both are documented in our procedure library.',
    ],
  },
  {
    slug: 'gold-refinery-process-explained',
    title: 'Gold Refinery Process: From Raw Material to 99.99% Pure Bars',
    category: 'Technical',
    date: '2026-01-10',
    image: '/nuggets/gold.png',
    imageFit: 'contain',
    excerpt:
      'Transforming raw gold material into investment-grade bars requires sophisticated metallurgical processes.',
    paragraphs: [
      'Doré, dust, nuggets and scrap do not become investment bars by being weighed. They are melted, sampled, assayed, then refined — typically to 99.99% for gold — and recast with a recognised stamp.',
    'AULM is not a refinery. We buy eligible material, run supply-chain checks, and place lots with LBMA-certified refining partners in Dubai and beyond. Clients see assay results and outturn, not a black box.',
      'The refinery page lists the forms we buy. Procedure covers intake documents. If you have a lot ready for melt, complete onboarding and send the desk the paperwork with the metal.',
    ],
  },
  {
    slug: 'responsible-gold-sourcing-africa',
    title: 'Responsible Gold Sourcing in Africa: OECD Due Diligence in Practice',
    category: 'Sustainability',
    date: '2026-01-05',
    image: '/sourcing/responsible-sourcing.jpg',
    excerpt:
      'Implementing OECD Due Diligence Guidance for Responsible Supply Chains is both a regulatory requirement and ethical imperative.',
    paragraphs: [
      'OECD due diligence on African gold is not a PDF on a website. It is KYC/KYB on the supplier, origin of the lot, CAHRA screening, and a contractual ban on conflict, child labour and illegal taxation along the route.',
      'AULM’s responsible-sourcing policy is applied on every mandate — West, Central, North and East Africa — with more than three decades on the ground. Grievances go to the compliance desk and are retained for five years.',
      'Read the supply-chain page and the procedure documents (conflict-free gold, due diligence policy). Then complete KYC. We will not move a lot that cannot be documented.',
    ],
  },
  {
    slug: 'gold-investment-family-offices',
    title: 'Physical Gold Allocation Strategies for Family Offices',
    category: 'Investment',
    date: '2025-12-28',
    image: '/vault/vault-hero.png',
    excerpt:
      'Family offices managing generational wealth increasingly recognize physical gold as a cornerstone asset.',
    paragraphs: [
      'Family offices that want physical gold usually care about three things: allocated bars they can identify, a vault they already trust, and a counterparty that will not retail-mark the metal.',
      'We work B2B only — family offices, funds and qualified counterparties. Custody is arranged worldwide to specification; interim storage in Dubai where the mandate needs it. Settlement is bank-to-bank.',
      'Allocation is a mandate, not a product page. Tell the desk metal, volume, stamp preference and custody city. Onboarding and procedure come first; then we quote.',
    ],
  },
  {
    slug: 'gold-logistics-security',
    title: 'Secure Gold Logistics: Insurance, Transport, and Vault Storage',
    category: 'Operations',
    date: '2025-12-20',
    image: '/vault/vault-hero.png',
    excerpt:
      'Moving physical gold across international borders requires specialized logistics providers and comprehensive insurance.',
    paragraphs: [
      'Physical gold does not travel on a standard airway bill and hope. It moves with specialised carriers, all-risk insurance, and a document pack that matches the import jurisdiction — Dubai included.',
      'AULM coordinates import into Dubai and export from origin. Partner network includes TransGuard, Brinks and Loomis for custody legs. Hand-carry corridors are written up in the procedure library, not improvised at the airport.',
      'Start on the logistics pages (import / export), then the procedure documents for shipping. The desk will not book a route until KYC is complete and the lot is cleared.',
    ],
  },
  {
    slug: 'gold-tokenization-blockchain',
    title: 'Gold tokenization: awaiting board resolution',
    category: 'Innovation',
    date: '2025-12-15',
    image: '/metals/gold.png',
    imageFit: 'contain',
    excerpt:
      'AULM does not issue gold tokens. Tokenization is awaiting board resolution and is not a live product on this site.',
    paragraphs: [
      'Tokenised gold is only as good as the bars, the vault and the audit. A token without allocated metal and a named custodian is a derivative, not a physical position.',
      'AULM does not currently issue tokens. Gold tokenization is awaiting board resolution. The public desk is physical: gold, silver and copper, documented chain of custody, bank-to-bank settlement.',
      'If you need bars in a vault, write to the desk. Tokenisation is not a live mandate on this site.',
    ],
  },
  {
    slug: 'import-gold-africa-dubai',
    title: 'How to Import Gold from Africa to Dubai: A Complete Compliance Guide',
    category: 'Import Guide',
    date: '2025-12-10',
    image: '/sourcing/responsible-sourcing.jpg',
    excerpt:
      'Importing gold from African mining regions to Dubai requires navigating complex regulatory landscapes.',
    paragraphs: [
      'Africa-to-Dubai gold import is a document chain: export permit at origin, OECD-aligned due diligence, assay, airway bill, UAE customs and — depending on form — refinery intake. Skip one and the lot sits.',
      'Doré, bullion and scrap are not the same filing. Our logistics import page and the procedure shipping instructions list what we expect. AULM is the desk and importer of record on mandates we accept — not a courier you hire after the goods have left.',
      'Write to the desk with origin country, form, approximate weight and current documents. We will tell you what is missing before you book the flight.',
    ],
  },
  {
    slug: 'gold-dore-bars-compliance',
    title: 'Gold Doré Bars Compliance: Regulatory Requirements in Dubai and Hong Kong',
    category: 'Compliance',
    date: '2025-12-05',
    image: '/company/locations/hong-kong.jpg',
    excerpt:
      'Gold doré bars require specific handling and documentation when entering major trading hubs.',
    paragraphs: [
      'Doré is unrefined mine output. Dubai and Hong Kong both treat it as a controlled mineral movement: origin, assay, supplier KYC and — in the UAE — alignment with Federal AML and customs rules. It is not a Good Delivery bar until it has been refined.',
      'AULM buys doré under documented intake procedures. Hong Kong appears in our network as a trading and logistics node; Dubai is the licensed desk. Each corridor has its own shipping instruction in the procedure library.',
      'If you hold doré destined for Dubai, start with origin documents and the doré buying procedure — then onboarding. We will not quote a clean bullion price on an undocumented melt.',
    ],
  },
  {
    slug: 'tokenizing-gold-trade',
    title: 'Gold tokenization and settlement: not a live product',
    category: 'Innovation',
    date: '2025-12-01',
    image: '/nuggets/gold.png',
    imageFit: 'contain',
    excerpt:
      'Settlement on the public desk remains bank-to-bank. Gold tokenization is awaiting board resolution.',
    paragraphs: [
      'Settlement in physical gold is still SWIFT, allocated accounts and vault receipts. Blockchain can record title; it does not replace assay, insurance or customs. Desks that confuse the two end up with a token and no metal.',
      'Our settlement standard remains bank-to-bank on accepted mandates. Gold tokenization is awaiting board resolution — it is not a product on this site.',
      'For current trades, use onboarding and the contact desk. The trade is bars, assay and custody.',
    ],
  },
]

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return NEWS.find((article) => article.slug === slug)
}

export const FEATURED_NEWS = NEWS.slice(0, 4)

export function formatNewsDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
