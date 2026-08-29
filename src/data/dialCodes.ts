export type DialCode = {
  iso: string
  name: string
  dial: string
}

/** Common desk corridors first, then the rest of the usual set. */
export const DIAL_CODES: DialCode[] = [
  { iso: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { iso: 'CH', name: 'Switzerland', dial: '+41' },
  { iso: 'DE', name: 'Germany', dial: '+49' },
  { iso: 'GH', name: 'Ghana', dial: '+233' },
  { iso: 'TZ', name: 'Tanzania', dial: '+255' },
  { iso: 'UG', name: 'Uganda', dial: '+256' },
  { iso: 'KE', name: 'Kenya', dial: '+254' },
  { iso: 'ZA', name: 'South Africa', dial: '+27' },
  { iso: 'NG', name: 'Nigeria', dial: '+234' },
  { iso: 'CI', name: "Côte d'Ivoire", dial: '+225' },
  { iso: 'ML', name: 'Mali', dial: '+223' },
  { iso: 'BF', name: 'Burkina Faso', dial: '+226' },
  { iso: 'SN', name: 'Senegal', dial: '+221' },
  { iso: 'CD', name: 'DR Congo', dial: '+243' },
  { iso: 'ZM', name: 'Zambia', dial: '+260' },
  { iso: 'ZW', name: 'Zimbabwe', dial: '+263' },
  { iso: 'RW', name: 'Rwanda', dial: '+250' },
  { iso: 'ET', name: 'Ethiopia', dial: '+251' },
  { iso: 'EG', name: 'Egypt', dial: '+20' },
  { iso: 'MA', name: 'Morocco', dial: '+212' },
  { iso: 'TR', name: 'Türkiye', dial: '+90' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { iso: 'QA', name: 'Qatar', dial: '+974' },
  { iso: 'KW', name: 'Kuwait', dial: '+965' },
  { iso: 'BH', name: 'Bahrain', dial: '+973' },
  { iso: 'OM', name: 'Oman', dial: '+968' },
  { iso: 'IN', name: 'India', dial: '+91' },
  { iso: 'CN', name: 'China', dial: '+86' },
  { iso: 'HK', name: 'Hong Kong', dial: '+852' },
  { iso: 'SG', name: 'Singapore', dial: '+65' },
  { iso: 'GB', name: 'United Kingdom', dial: '+44' },
  { iso: 'FR', name: 'France', dial: '+33' },
  { iso: 'IT', name: 'Italy', dial: '+39' },
  { iso: 'ES', name: 'Spain', dial: '+34' },
  { iso: 'NL', name: 'Netherlands', dial: '+31' },
  { iso: 'BE', name: 'Belgium', dial: '+32' },
  { iso: 'AT', name: 'Austria', dial: '+43' },
  { iso: 'US', name: 'United States', dial: '+1' },
  { iso: 'CA', name: 'Canada', dial: '+1' },
  { iso: 'AU', name: 'Australia', dial: '+61' },
  { iso: 'BR', name: 'Brazil', dial: '+55' },
  { iso: 'PE', name: 'Peru', dial: '+51' },
  { iso: 'CL', name: 'Chile', dial: '+56' },
  { iso: 'CO', name: 'Colombia', dial: '+57' },
  { iso: 'RU', name: 'Russia', dial: '+7' },
  { iso: 'UA', name: 'Ukraine', dial: '+380' },
  { iso: 'PL', name: 'Poland', dial: '+48' },
  { iso: 'SE', name: 'Sweden', dial: '+46' },
  { iso: 'NO', name: 'Norway', dial: '+47' },
  { iso: 'DK', name: 'Denmark', dial: '+45' },
  { iso: 'FI', name: 'Finland', dial: '+358' },
  { iso: 'IE', name: 'Ireland', dial: '+353' },
  { iso: 'PT', name: 'Portugal', dial: '+351' },
  { iso: 'GR', name: 'Greece', dial: '+30' },
  { iso: 'CZ', name: 'Czechia', dial: '+420' },
  { iso: 'HU', name: 'Hungary', dial: '+36' },
  { iso: 'RO', name: 'Romania', dial: '+40' },
  { iso: 'JP', name: 'Japan', dial: '+81' },
  { iso: 'KR', name: 'South Korea', dial: '+82' },
  { iso: 'ID', name: 'Indonesia', dial: '+62' },
  { iso: 'MY', name: 'Malaysia', dial: '+60' },
  { iso: 'TH', name: 'Thailand', dial: '+66' },
  { iso: 'VN', name: 'Vietnam', dial: '+84' },
  { iso: 'PH', name: 'Philippines', dial: '+63' },
  { iso: 'PK', name: 'Pakistan', dial: '+92' },
  { iso: 'BD', name: 'Bangladesh', dial: '+880' },
  { iso: 'LK', name: 'Sri Lanka', dial: '+94' },
  { iso: 'NZ', name: 'New Zealand', dial: '+64' },
  { iso: 'MX', name: 'Mexico', dial: '+52' },
  { iso: 'AR', name: 'Argentina', dial: '+54' },
  { iso: 'IL', name: 'Israel', dial: '+972' },
  { iso: 'JO', name: 'Jordan', dial: '+962' },
  { iso: 'LB', name: 'Lebanon', dial: '+961' },
]

export function findDial(dial: string) {
  return DIAL_CODES.find((item) => item.dial === dial) ?? DIAL_CODES[0]
}

/** Soft check: country selected + 6–15 national digits. Does not enforce per-country length. */
export function softPhoneStatus(national: string): 'empty' | 'short' | 'ok' | 'long' {
  const digits = national.replace(/\D/g, '')
  if (!digits) return 'empty'
  if (digits.length < 6) return 'short'
  if (digits.length > 15) return 'long'
  return 'ok'
}

export function formatE164(dial: string, national: string) {
  const digits = national.replace(/\D/g, '')
  return `${dial}${digits}`
}
