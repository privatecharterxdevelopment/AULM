export const LOCALES = ['en', 'de', 'fr', 'ar', 'zh', 'ja', 'ko', 'ru'] as const

export type Locale = (typeof LOCALES)[number]

export type LocaleDir = 'ltr' | 'rtl'

export type LocaleMeta = {
  code: Locale
  nativeName: string
  htmlLang: string
  dir: LocaleDir
  dateLocale: string
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { code: 'en', nativeName: 'English', htmlLang: 'en', dir: 'ltr', dateLocale: 'en-GB' },
  de: { code: 'de', nativeName: 'Deutsch', htmlLang: 'de', dir: 'ltr', dateLocale: 'de-DE' },
  fr: { code: 'fr', nativeName: 'Français', htmlLang: 'fr', dir: 'ltr', dateLocale: 'fr-FR' },
  ar: { code: 'ar', nativeName: 'العربية', htmlLang: 'ar', dir: 'rtl', dateLocale: 'ar-AE' },
  zh: { code: 'zh', nativeName: '中文', htmlLang: 'zh-CN', dir: 'ltr', dateLocale: 'zh-CN' },
  ja: { code: 'ja', nativeName: '日本語', htmlLang: 'ja', dir: 'ltr', dateLocale: 'ja-JP' },
  ko: { code: 'ko', nativeName: '한국어', htmlLang: 'ko', dir: 'ltr', dateLocale: 'ko-KR' },
  ru: { code: 'ru', nativeName: 'Русский', htmlLang: 'ru', dir: 'ltr', dateLocale: 'ru-RU' },
}

export const DEFAULT_LOCALE: Locale = 'en'
export const STORAGE_KEY = 'aulm-locale'

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value)
}
