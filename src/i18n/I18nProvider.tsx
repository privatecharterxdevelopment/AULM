import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ar } from './ar'
import { de } from './de'
import { en, type Messages } from './en'
import { fr } from './fr'
import { interpolate } from './interpolate'
import { ja } from './ja'
import { ko } from './ko'
import { ru } from './ru'
import { zh } from './zh'
import {
  DEFAULT_LOCALE,
  LOCALE_META,
  STORAGE_KEY,
  isLocale,
  type Locale,
  type LocaleDir,
} from './locales'

export type I18nValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Messages
  dir: LocaleDir
  interpolate: typeof interpolate
}

const I18nContext = createContext<I18nValue | null>(null)

const catalog: Record<Locale, Messages> = {
  en,
  de,
  fr,
  ar,
  zh,
  ja,
  ko,
  ru,
}

function readStored(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    /* ignore */
  }
  return DEFAULT_LOCALE
}

export function registerMessages(locale: Locale, messages: Messages) {
  catalog[locale] = messages
}

type Props = {
  children: ReactNode
}

export function I18nProvider({ children }: Props) {
  const [locale, setLocaleState] = useState<Locale>(readStored)
  const meta = LOCALE_META[locale]
  const messages = catalog[locale] ?? en

  useEffect(() => {
    document.documentElement.lang = meta.htmlLang
    document.documentElement.dir = meta.dir
    document.documentElement.dataset.locale = locale
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch {
      /* ignore */
    }
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', messages.meta.description)
  }, [locale, messages, meta])

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: messages,
      dir: meta.dir,
      interpolate,
    }),
    [locale, messages, meta],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

export function useT() {
  return useI18n()
}
