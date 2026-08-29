export type ContactTopic =
  | 'general'
  | 'trading'
  | 'refinery'
  | 'compliance'
  | 'account'
  | 'consulting'
  | 'investment'
  | 'reservation'
  | 'other'

export type ContactTopicOption = {
  value: ContactTopic
  label: string
}

export const CONTACT_TOPICS: ContactTopicOption[] = [
  { value: 'general', label: 'General inquiry' },
  { value: 'trading', label: 'Trading & metals' },
  { value: 'refinery', label: 'Refinery partnership' },
  { value: 'compliance', label: 'Compliance & documentation' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'investment', label: 'Investment in AULM' },
  { value: 'reservation', label: 'Gold reservation 2026' },
  { value: 'account', label: 'Account opening' },
  { value: 'other', label: 'Other' },
]

export type ContactFormValues = {
  topic: ContactTopic
  fullName: string
  email: string
  company: string
  phone: string
  message: string
}

export function isContactTopic(value: string | null): value is ContactTopic {
  return !!value && CONTACT_TOPICS.some((t) => t.value === value)
}

export function topicLabel(topic: ContactTopic): string {
  return CONTACT_TOPICS.find((t) => t.value === topic)?.label ?? topic
}
