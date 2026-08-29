import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_NAME, SITE_URL } from '../config/site'
import { setCanonical, setMetaName, setMetaProperty } from '../i18n/documentMeta'

const PRIVATE = /^\/(crm|bank|admin|login)(\/|$)/
const OG_IMAGE = `${SITE_URL}/company/office.jpg`

export function DocumentSeo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
    const url = `${SITE_URL}${path}`
    const noindex = PRIVATE.test(path)

    setCanonical(url)
    setMetaProperty('og:url', url)
    setMetaProperty('og:type', 'website')
    setMetaProperty('og:site_name', SITE_NAME)
    setMetaProperty('og:image', OG_IMAGE)
    setMetaName('twitter:card', 'summary_large_image')
    setMetaName('twitter:image', OG_IMAGE)
    setMetaName('robots', noindex ? 'noindex, nofollow' : 'index, follow')
  }, [pathname])

  return null
}
