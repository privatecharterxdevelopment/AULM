export type CountryRegion =
  | 'africa'
  | 'middle-east'
  | 'europe'
  | 'asia'
  | 'americas'
  | 'oceania'

export type Country = {
  code: string
  name: string
  region: CountryRegion
  summary: string
  exportNotes?: string
  importNotes?: string
}

/** OFAC / EU / UN comprehensive or sectoral — not available for desk routing */
export const SANCTIONED_COUNTRY_CODES = new Set([
  'AF', // Afghanistan
  'BY', // Belarus
  'CF', // Central African Republic
  'CU', // Cuba
  'ER', // Eritrea
  'HT', // Haiti (targeted)
  'IR', // Iran
  'IQ', // Iraq (comprehensive US restrictions on certain transactions)
  'KP', // North Korea
  'LB', // Lebanon (Hezbollah-related sectoral — excluded for bullion desk)
  'LY', // Libya
  'ML', // Mali
  'MM', // Myanmar
  'RU', // Russia
  'SD', // Sudan
  'SO', // Somalia
  'SS', // South Sudan
  'SY', // Syria
  'VE', // Venezuela
  'YE', // Yemen
  'ZW', // Zimbabwe (targeted sanctions)
])

export function isSanctioned(code: string) {
  return SANCTIONED_COUNTRY_CODES.has(code.toUpperCase())
}

const AFRICA: Country[] = [
  {
    code: 'GH',
    name: 'Ghana',
    region: 'africa',
    summary:
      'Major West African gold producer with licensed small-scale and industrial output. Export flows typically route through Accra with PMMC oversight and OECD-aligned due diligence.',
    exportNotes: 'Licensed exporter registration, assay at approved labs, and Ghana Revenue Authority export clearance required.',
  },
  {
    code: 'TZ',
    name: 'Tanzania',
    region: 'africa',
    summary:
      'East African hub for doré and concentrate exports. Mineral concentrates pass through approved refiners with Bank of Tanzania FX compliance on export proceeds.',
    exportNotes: 'Mining commission export permit and mineral royalty clearance mandatory before shipment.',
  },
  {
    code: 'CI',
    name: "Côte d'Ivoire",
    region: 'africa',
    summary:
      'Growing West African mining jurisdiction with structured export via Abidjan port and air freight for high-value bullion.',
    exportNotes: 'Mines ministry export authorization and anti-money laundering filing for shipments above statutory thresholds.',
  },
  {
    code: 'BF',
    name: 'Burkina Faso',
    region: 'africa',
    summary:
      'Landlocked producer — exports typically transit via Ghana or Côte d\'Ivoire corridors with enhanced due diligence on artisanal supply chains.',
    exportNotes: 'Dual origin/transit documentation and armed escort logistics certificates where applicable.',
  },
  {
    code: 'SN',
    name: 'Senegal',
    region: 'africa',
    summary: 'Regional trade gateway for West African concentrate and re-export through Dakar free port zones.',
    exportNotes: 'Customs transit declarations when re-exporting third-country origin metal.',
  },
  {
    code: 'MZ',
    name: 'Mozambique',
    region: 'africa',
    summary: 'Southern African corridor for concentrate and industrial metals with Maputo and Beira port options.',
    exportNotes: 'Mineral export licence and central bank repatriation documentation for FX proceeds.',
  },
  {
    code: 'ZM',
    name: 'Zambia',
    region: 'africa',
    summary: 'Copper belt origin for concentrate exports — structured flows via Dar es Salaam or Durban corridors.',
    exportNotes: 'ZEMA export permit and certificate of origin from Chamber of Mines.',
  },
  {
    code: 'CD',
    name: 'Democratic Republic of Congo',
    region: 'africa',
    summary:
      'High-volume cobalt and gold origin — OECD Annex II due diligence, ITSCI or equivalent traceability required on every shipment.',
    exportNotes: 'Validated mine-site documentation, tag-and-seal records, and provincial export approvals mandatory.',
  },
  {
    code: 'UG',
    name: 'Uganda',
    region: 'africa',
    summary: 'Regional consolidation point for East African doré — exports require alignment with UAE and Dubai import standards.',
    exportNotes: 'Assay from approved refinery and Uganda Revenue Authority export declaration.',
  },
  {
    code: 'KE',
    name: 'Kenya',
    region: 'africa',
    summary: 'Nairobi hub for air freight of high-value bullion to Dubai and European vaults.',
    exportNotes: 'Kenya Revenue Authority export entry and precious metals dealer licence verification.',
  },
  {
    code: 'RW',
    name: 'Rwanda',
    region: 'africa',
    summary: 'Structured tin, tungsten, and gold trading hub with ITSCI-aligned export controls.',
    exportNotes: 'RMB export certificate and OECD supply-chain audit trail.',
  },
  {
    code: 'NA',
    name: 'Namibia',
    region: 'africa',
    summary: 'Southern African producer with direct sea freight options via Walvis Bay.',
    exportNotes: 'Ministry of Mines export permit and marine cargo insurance certificate.',
  },
  {
    code: 'BW',
    name: 'Botswana',
    region: 'africa',
    summary: 'Stable jurisdiction for rough diamond and precious metal logistics through Gaborone.',
    exportNotes: 'Customs export permit and Kimberley Process certificate where applicable.',
  },
  {
    code: 'NG',
    name: 'Nigeria',
    region: 'africa',
    summary: 'Large market — gold export strictly through CBN-licensed channels with enhanced AML review.',
    exportNotes: 'Central Bank of Nigeria export approval and NAPIMS traceability for petroleum-linked logistics.',
  },
  {
    code: 'EG',
    name: 'Egypt',
    region: 'africa',
    summary: 'North African gateway with Suez corridor access for onward shipment to Europe and Gulf.',
    exportNotes: 'General Organisation for Export and Import Control (GOEIC) registration.',
  },
  {
    code: 'MA',
    name: 'Morocco',
    region: 'africa',
    summary: 'Atlantic port access for concentrate exports to EU refiners and Dubai.',
    exportNotes: 'Office des Changes export authorization and assay certificate.',
  },
  {
    code: 'ET',
    name: 'Ethiopia',
    region: 'africa',
    summary: 'Emerging mining exports via Addis Ababa air corridor — National Bank FX rules apply.',
    exportNotes: 'Ministry of Mines export permit and commercial invoice attestation.',
  },
  {
    code: 'GA',
    name: 'Gabon',
    region: 'africa',
    summary: 'Central African manganese and gold exports primarily via Libreville port.',
    exportNotes: 'Customs export declaration and mining code compliance certificate.',
  },
  {
    code: 'GN',
    name: 'Guinea',
    region: 'africa',
    summary: 'Major bauxite and gold origin — Conakry port exports with OECD Annex II diligence on artisanal gold.',
    exportNotes: 'Centre de Promotion de l\'Exportation (CPE) licence and assay documentation.',
  },
  {
    code: 'SL',
    name: 'Sierra Leone',
    region: 'africa',
    summary: 'West African gold and diamond exports with Kimberley Process and OECD traceability requirements.',
    exportNotes: 'National Minerals Agency export licence and chain-of-custody records.',
  },
]

const GLOBAL_HUBS: Country[] = [
  {
    code: 'AE',
    name: 'United Arab Emirates',
    region: 'middle-east',
    summary:
      'Primary IFZA Dubai intake hub — LBMA-linked refining, DMCC registration, and UAE customs clearance for institutional bullion.',
    importNotes: 'DMCCA / IFZA entity verification, UAE customs import declaration, and Good Delivery assay required.',
  },
  {
    code: 'CH',
    name: 'Switzerland',
    region: 'europe',
    summary: 'Global refining and vaulting centre — FINMA-aligned AML and Swiss customs for precious metals.',
    importNotes: 'Swiss customs import declaration, refinery Good Delivery status, and cantonal AML filing.',
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    region: 'asia',
    summary: 'APAC distribution hub with free-port status for LBMA bullion and institutional custody.',
    importNotes: 'Hong Kong Customs & Excise import licence and dealer registration where applicable.',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    region: 'europe',
    summary: 'London market access — HMRC customs and FCA-aligned counterparty due diligence for bullion imports.',
    importNotes: 'HMRC C88 import entry, UK Sanctions List screening, and Good Delivery bar assay.',
  },
  {
    code: 'DE',
    name: 'Germany',
    region: 'europe',
    summary: 'EU entry point with Bundesbank reporting for large gold imports and BaFin AML oversight.',
    importNotes: 'EU customs declaration (SAD), VAT deferment authorisation, and OECD due diligence file.',
  },
  {
    code: 'SG',
    name: 'Singapore',
    region: 'asia',
    summary: 'Free-trade precious metals hub with GST relief on investment-grade bullion.',
    importNotes: 'Singapore Customs import permit and precious stones & metals dealer licence.',
  },
  {
    code: 'US',
    name: 'United States',
    region: 'americas',
    summary: 'CBP customs entry via approved ports — FinCEN reporting for transactions above USD 10,000.',
    importNotes: 'CBP Form 7501, OFAC screening certificate, and IRS FBAR considerations for foreign accounts.',
  },
  {
    code: 'LI',
    name: 'Liechtenstein',
    region: 'europe',
    summary: 'Corporate and compliance structuring hub with EEA market access via Switzerland corridor.',
    importNotes: 'Liechtenstein customs via Swiss border clearance and FMA AML documentation.',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    region: 'middle-east',
    summary: 'Gulf Cooperation Council entry with SAMA FX rules and Saudi customs for precious metals.',
    importNotes: 'Saber / SABER conformity and ZATCA customs import declaration.',
  },
  {
    code: 'IN',
    name: 'India',
    region: 'asia',
    summary: 'Restricted bullion import market — only nominated banks and star trading houses may import gold.',
    importNotes: 'DGFT import licence, BIS hallmarking where applicable, and RBI trade credit compliance.',
  },
  {
    code: 'CN',
    name: 'China',
    region: 'asia',
    summary: 'State-controlled bullion import through PBoC-approved banks only — strict quota regime.',
    importNotes: 'General Administration of Customs import licence and PBoC approval for financial institutions.',
  },
  {
    code: 'TR',
    name: 'Turkey',
    region: 'middle-east',
    summary: 'Borsa Istanbul linked market with Ministry of Trade import authorisation for bullion.',
    importNotes: 'Turkish customs import declaration and precious metals dealer licence.',
  },
  {
    code: 'AU',
    name: 'Australia',
    region: 'oceania',
    summary: ' Perth mint corridor — AUSTRAC AML/CTF reporting and Australian Border Force clearance.',
    importNotes: 'ABF import declaration and AUSTRAC threshold transaction report where applicable.',
  },
]

export const ALL_COUNTRIES: Country[] = [...AFRICA, ...GLOBAL_HUBS].sort((a, b) =>
  a.name.localeCompare(b.name),
)

export const AFRICAN_COUNTRIES = AFRICA.filter((c) => !isSanctioned(c.code)).sort((a, b) =>
  a.name.localeCompare(b.name),
)

export const IMPORT_DESTINATIONS = GLOBAL_HUBS.filter((c) => !isSanctioned(c.code)).sort(
  (a, b) => a.name.localeCompare(b.name),
)

export const EXPORT_DESTINATIONS = [...GLOBAL_HUBS, ...AFRICA]
  .filter((c) => !isSanctioned(c.code))
  .sort((a, b) => a.name.localeCompare(b.name))

export function getCountryByCode(code: string): Country | undefined {
  return ALL_COUNTRIES.find((c) => c.code === code.toUpperCase())
}

export function filterCountries(list: Country[], query: string): Country[] {
  const q = query.trim().toLowerCase()
  if (!q) return list
  return list.filter(
    (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q),
  )
}

const BASE_EXPORT_DOCS = [
  'Commercial invoice & packing list (legalised where required)',
  'Assay certificate from approved / LBMA-accredited laboratory',
  'Certificate of origin & chain-of-custody documentation',
  'Export licence or mining ministry permit',
  'OECD Annex II due diligence file & KYC/KYB counterparty records',
  'Bill of lading / air waybill & insured cargo certificate',
  'Customs export declaration & FX repatriation proof (if applicable)',
]

const BASE_IMPORT_DOCS = [
  'Commercial invoice, packing list & pro-forma purchase contract',
  'Assay report & Good Delivery bar list (LBMA where applicable)',
  'Certificate of origin & OECD due diligence documentation',
  'Import customs declaration & HS code classification (7108 / 7106 etc.)',
  'Insurance certificate & secure logistics mandate (TransGuard / Brinks / Loomis)',
  'Bank SWIFT MT103 settlement instruction between approved accounts',
  'Sanctions & PEP screening certificate for all parties',
]

const REGION_EXPORT_EXTRA: Partial<Record<CountryRegion, string[]>> = {
  africa: [
    'ITSCI / RMI or equivalent mine-site traceability (conflict-sensitive zones)',
    'Armed escort or government convoy certificate (high-risk corridors)',
    'Transit country re-export permits when landlocked',
  ],
}

const REGION_IMPORT_EXTRA: Partial<Record<CountryRegion, string[]>> = {
  'middle-east': ['IFZA / DMCC trade licence copy & UAE customs broker instruction'],
  europe: ['EU Single Administrative Document (SAD) & VAT / deferment authorisation'],
  asia: ['Local dealer licence & central bank FX approval (where mandated)'],
  americas: ['FinCEN CTR / BSA filing for transactions above USD 10,000 equivalent'],
}

export function getRequiredDocuments(
  country: Country,
  mode: 'import' | 'export',
): string[] {
  const base = mode === 'export' ? BASE_EXPORT_DOCS : BASE_IMPORT_DOCS
  const extra =
    mode === 'export'
      ? REGION_EXPORT_EXTRA[country.region] ?? []
      : REGION_IMPORT_EXTRA[country.region] ?? []
  return [...base, ...extra]
}

export function findSanctionedMatch(query: string): string | null {
  const q = query.trim().toLowerCase()
  if (!q) return null
  for (const code of SANCTIONED_COUNTRY_CODES) {
    const c = getCountryByCode(code)
    if (c && (c.name.toLowerCase().includes(q) || c.code.toLowerCase() === q)) {
      return c.name
    }
  }
  const sanctionedNames: Record<string, string> = {
    iran: 'Iran',
    russia: 'Russia',
    sudan: 'Sudan',
    somalia: 'Somalia',
    syria: 'Syria',
    'north korea': 'North Korea',
    libya: 'Libya',
    yemen: 'Yemen',
    venezuela: 'Venezuela',
    myanmar: 'Myanmar',
    belarus: 'Belarus',
    mali: 'Mali',
    afghanistan: 'Afghanistan',
    cuba: 'Cuba',
    zimbabwe: 'Zimbabwe',
    eritrea: 'Eritrea',
    haiti: 'Haiti',
    lebanon: 'Lebanon',
    iraq: 'Iraq',
  }
  for (const [key, name] of Object.entries(sanctionedNames)) {
    if (key.includes(q) || q.includes(key)) return name
  }
  return null
}
