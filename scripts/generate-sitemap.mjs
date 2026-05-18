/**
 * Regenerate public/sitemap.xml after adding news articles or pages.
 * Run: node scripts/generate-sitemap.mjs
 */

const SITE_URL = 'https://www.aulmtrading.com'
const LASTMOD = new Date().toISOString().slice(0, 10)

const paths = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/refinery-dubai', priority: '0.95', changefreq: 'weekly' },
  { path: '/gold-import-dubai', priority: '0.9', changefreq: 'weekly' },
  { path: '/sell-gold-institutional-dubai', priority: '0.9', changefreq: 'weekly' },
  { path: '/open-account', priority: '0.95', changefreq: 'weekly' },
  { path: '/tokenization', priority: '0.8', changefreq: 'monthly' },
  { path: '/sustainability', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/news', priority: '0.8', changefreq: 'weekly' },
  ...[
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
  ].map((id) => ({ path: `/news/${id}`, priority: '0.7', changefreq: 'monthly' })),
]

const urls = paths
  .map(
    ({ path, priority, changefreq }) =>
      `  <url><loc>${SITE_URL}${path}</loc><lastmod>${LASTMOD}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

await import('node:fs/promises').then((fs) =>
  fs.writeFile(new URL('../public/sitemap.xml', import.meta.url), xml)
)
console.log('Wrote public/sitemap.xml')
