import { useEffect } from 'react'
import { setMetaName, setMetaProperty } from './documentMeta'
import { useT } from './I18nProvider'

export function usePageTitle(title?: string, description?: string) {
  const { t } = useT()
  useEffect(() => {
    const full = title ? `AULM | ${title}` : t.meta.defaultTitle
    const desc = description || t.meta.description
    document.title = full
    setMetaProperty('og:title', full)
    setMetaName('twitter:title', full)
    setMetaName('description', desc)
    setMetaProperty('og:description', desc)
    setMetaName('twitter:description', desc)
    return () => {
      document.title = t.meta.defaultTitle
      setMetaProperty('og:title', t.meta.defaultTitle)
      setMetaName('twitter:title', t.meta.defaultTitle)
      setMetaName('description', t.meta.description)
      setMetaProperty('og:description', t.meta.description)
      setMetaName('twitter:description', t.meta.description)
    }
  }, [title, description, t.meta.defaultTitle, t.meta.description])
}
