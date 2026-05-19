import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_OG_IMAGE, LICENSE_NUMBER, SITE_NAME, SITE_URL } from '../config/site'
import { getCanonicalUrl, getSeoForPath } from '../data/seo'

function upsertMeta(selector, createAttrs, content) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(createAttrs).forEach(([key, value]) => el.setAttribute(key, value))
    document.head.appendChild(el)
  }
  if (content != null) el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = getSeoForPath(pathname)
    const canonical = getCanonicalUrl(pathname)
    const robots = seo.index ? 'index, follow' : 'noindex, nofollow'

    document.title = seo.title

    upsertMeta('meta[name="description"]', { name: 'description' }, seo.description)
    upsertMeta('meta[name="robots"]', { name: 'robots' }, robots)
    if (seo.keywords) {
      upsertMeta('meta[name="keywords"]', { name: 'keywords' }, seo.keywords)
    }
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, seo.title)
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, seo.description)
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonical)
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, DEFAULT_OG_IMAGE)
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, SITE_NAME)
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, seo.title)
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, seo.description)
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, DEFAULT_OG_IMAGE)

    upsertLink('canonical', canonical)
  }, [pathname])

  return null
}

export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/gold-icon.svg`,
    email: 'contact@aulmtrading.com',
    description:
      'DMCC & IFZA licensed B2B gold trading company in Dubai specializing in precious metals import, export, and refining.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Building A1, Dubai Digital Park, IFZA Business Park, DDP',
      addressLocality: 'Dubai Silicon Oasis',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    telephone: '+41779409443',
    identifier: {
      '@type': 'PropertyValue',
      name: 'IFZA License Number',
      value: LICENSE_NUMBER,
    },
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
