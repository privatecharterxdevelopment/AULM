import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from '../config/site'

export const NEWS_ARTICLE_IDS = [
  'emirates-gold-vs-valcambi',
  'dmcc-good-delivery-standard',
  'spot-gold-discounts-dubai',
  'uganda-gold-supply-chain',
  'switzerland-dubai-connection',
  'gold-price-forecast-2026',
  'lbma-certification-guide',
  'gold-refinery-process-explained',
  'responsible-gold-sourcing-africa',
  'gold-investment-family-offices',
  'gold-logistics-security',
  'gold-tokenization-blockchain',
  'import-gold-africa-dubai',
  'gold-dore-bars-compliance',
  'tokenizing-gold-trade',
]

const PAGE_SEO = {
  '/': {
    title: `Sell Gold Dubai | Buy LBMA Gold Dubai | Refinery & Import | ${SITE_NAME}`,
    description:
      'Sell gold Dubai (doré, scrap) to AULM at LBMA-linked terms. Buy LBMA bullion only. Gold import, refinery, IFZA-licensed B2B desk.',
    keywords:
      'sell gold dubai, buy gold dubai, sell gold dubai institutional, buy gold bars dubai, refinery dubai, gold import dubai, sell dore gold dubai',
    index: true,
  },
  '/sell-gold-dubai': {
    title: `Sell Gold Dubai | Sell Doré & Scrap | Institutional Buyer | ${SITE_NAME}`,
    description:
      'Sell gold in Dubai to AULM — institutional buyer for doré and scrap. LBMA spot minus negotiated discount after assay. B2B only, TT (MT103), IFZA licensed.',
    keywords:
      'sell gold dubai, sell gold in dubai, sell dore gold dubai, sell scrap gold dubai, cash for gold dubai institutional, gold buyer dubai',
    index: true,
  },
  '/buy-gold-dubai': {
    title: `Buy Gold Dubai | LBMA Bullion Bars | Institutional | ${SITE_NAME}`,
    description:
      'Buy gold in Dubai — LBMA Good Delivery bullion for qualified institutions. AULM sells bullion only, not doré or scrap. B2B mandates, full documentation.',
    keywords:
      'buy gold dubai, buy gold bars dubai, buy physical gold dubai, LBMA gold dubai, institutional gold dubai',
    index: true,
  },
  '/refinery-dubai': {
    title: `Refinery Services Dubai | LBMA Gold Refining | ${SITE_NAME}`,
    description:
      'Refinery Dubai: LBMA-aligned 99.99% gold refining, assay certification, and vault delivery. Open a B2B account — contact@aulmtrading.com.',
    keywords: 'refinery dubai, refinery services dubai, gold refinery dubai, LBMA refining UAE',
    index: true,
  },
  '/compliance-gold-trading': {
    title: `Gold Trading Compliance Dubai | LBMA & OECD | ${SITE_NAME}`,
    description:
      'LBMA responsible sourcing, OECD due diligence, and UAE AML/KYC for institutional gold trading in Dubai.',
    keywords: 'gold compliance dubai, LBMA compliance, OECD gold due diligence, AML gold trading UAE',
    index: true,
  },
  '/gold-supply-chain-dubai': {
    title: `Gold Supply Chain Dubai | End-to-End Trading | ${SITE_NAME}`,
    description:
      'End-to-end gold supply chain in Dubai — sourcing, import, refinery, logistics, and institutional settlement.',
    keywords: 'gold supply chain dubai, end to end gold trading, gold logistics dubai',
    index: true,
  },
  '/institutional-gold-trading': {
    title: `Institutional Gold Trading Dubai | B2B Desk | ${SITE_NAME}`,
    description:
      'Institutional gold trading Dubai for family offices, funds, and commodity traders. IFZA licensed, discreet mandates.',
    keywords: 'institutional gold trading dubai, institutional gold buyer, family office gold dubai',
    index: true,
  },
  '/gold-import-dubai': {
    title: `Gold Import Dubai | DMCC Compliant Import | ${SITE_NAME}`,
    description:
      'Gold import Dubai for institutions: customs, DMCC permits, origin assay, and refinery intake. Open your import file with AULM.',
    keywords: 'gold import dubai, import gold dubai, DMCC gold import, gold import UAE',
    index: true,
  },
  '/seller-onboarding': {
    title: `Seller Onboarding — Sell Gold Dubai | ${SITE_NAME}`,
    description:
      'Open your B2B seller file with AULM — doré and scrap onboarding form only. No document upload at signup.',
    keywords: 'sell gold dubai onboarding, open gold seller account dubai',
    index: true,
  },
  '/open-account': {
    title: `Open Account — Sell Doré, Scrap & Bullion | LBMA Discount | ${SITE_NAME}`,
    description:
      'Onboard as a seller to AULM Dubai. We buy raw gold (doré, scrap); we sell LBMA bullion only. View doré import document checklist — no upload at signup.',
    keywords:
      'sell gold dubai, sell dore gold, LBMA discount gold, gold seller onboarding dubai, dore import documents dubai',
    index: true,
  },
  '/sell-gold-institutional-dubai': {
    title: `Sell Gold Institutional Dubai | B2B Buyer | ${SITE_NAME}`,
    description:
      'Sell gold institutional Dubai — AULM buys doré and scrap at LBMA-linked terms. Bank-to-bank settlement, OECD/LBMA compliance, IFZA licensed.',
    keywords: 'sell gold institutional dubai, institutional gold buyer dubai, sell gold dubai b2b',
    index: true,
  },
  '/about': {
    title: `About Us | ${SITE_NAME}`,
    description:
      `Learn about ${SITE_NAME} — IFZA-licensed precious metals trading in Dubai with decades of institutional experience.`,
    index: true,
  },
  '/services': {
    title: `Gold Trading Services Dubai | Refinery & Import | ${SITE_NAME}`,
    description:
      'B2B gold sourcing, gold import Dubai, refinery services, and institutional sales for qualified precious metals clients.',
    keywords: 'refinery dubai, gold import dubai, gold trading services dubai',
    index: true,
  },
  '/tokenization': {
    title: `Gold Tokenization | ${SITE_NAME}`,
    description:
      'Regulated tokenized precious metals exposure for institutional investors within Swiss and UAE regulatory frameworks.',
    index: true,
  },
  '/sustainability': {
    title: `Responsible Gold Sourcing | ${SITE_NAME}`,
    description:
      `Ethical and compliant gold sourcing, community support, and sustainability standards at ${SITE_NAME}.`,
    index: true,
  },
  '/contact': {
    title: `Contact | ${SITE_NAME}`,
    description:
      'Contact AULM for B2B gold trading inquiries. Dubai-based DMCC & IFZA licensed precious metals trading desk.',
    index: true,
  },
  '/news': {
    title: `News & Insights | ${SITE_NAME}`,
    description:
      'Expert analysis on gold markets, DMCC compliance, LBMA standards, and institutional precious metals trading.',
    index: true,
  },
  '/terms': {
    title: `Terms of Service | ${SITE_NAME}`,
    description: `Terms of service for ${SITE_NAME} wholesale precious metals trading.`,
    index: false,
  },
  '/privacy': {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `Privacy policy for ${SITE_NAME}.`,
    index: false,
  },
  '/kyconboarding': {
    title: `KYC / KYB Onboarding | ${SITE_NAME}`,
    description: 'Corporate KYB and UBO declaration for approved AULM institutional mandates.',
    index: false,
  },
}

const NEWS_TITLES = {
  'emirates-gold-vs-valcambi': 'Emirates Gold vs. Valcambi: Which Stamp Gives You More Liquidity?',
  'dmcc-good-delivery-standard': 'Dubai Good Delivery: Why the DMCC Standard is Essential',
  'spot-gold-discounts-dubai': 'Spot Gold Discounts in Dubai: Reading the Premium',
  'uganda-gold-supply-chain': 'Uganda Gold Supply Chain: Sourcing for Dubai Refineries',
  'switzerland-dubai-connection': 'The Switzerland–Dubai Gold Corridor Explained',
  'gold-price-forecast-2026': 'Gold Price Forecast 2026: Institutional Outlook',
  'lbma-certification-guide': 'LBMA Certification Guide for Gold Traders',
  'gold-refinery-process-explained': 'Gold Refinery Process Explained',
  'responsible-gold-sourcing-africa': 'Responsible Gold Sourcing from Africa',
  'gold-investment-family-offices': 'Gold Investment for Family Offices',
  'gold-logistics-security': 'Gold Logistics & Security Best Practices',
  'gold-tokenization-blockchain': 'Gold Tokenization & Blockchain',
  'import-gold-africa-dubai': 'Importing Gold from Africa to Dubai',
  'gold-dore-bars-compliance': 'Gold Dore Bars & Compliance',
  'tokenizing-gold-trade': 'Tokenizing Gold Trade: The Future of Settlement',
}

export function getSeoForPath(pathname) {
  if (pathname === '/news' || pathname === '/news/') {
    return PAGE_SEO['/news']
  }

  const newsMatch = pathname.match(/^\/news\/([^/]+)$/)
  if (newsMatch) {
    const id = newsMatch[1]
    const headline = NEWS_TITLES[id]
    if (headline) {
      return {
        title: `${headline} | ${SITE_NAME}`,
        description: `Read ${headline} — market insights from ${SITE_NAME}.`,
        index: true,
        path: pathname,
      }
    }
  }

  return PAGE_SEO[pathname] || {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    index: true,
    path: pathname,
  }
}

export function getCanonicalUrl(pathname) {
  const path = pathname === '/' ? '' : pathname.replace(/\/$/, '')
  return `${SITE_URL}${path}`
}

export function getSitemapPaths() {
  const staticPaths = Object.entries(PAGE_SEO)
    .filter(([, seo]) => seo.index)
    .map(([path]) => path)

  const articlePaths = NEWS_ARTICLE_IDS.map((id) => `/news/${id}`)

  return [...staticPaths, ...articlePaths]
}
