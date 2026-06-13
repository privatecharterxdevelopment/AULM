export type ContactTopic =
  | 'general'
  | 'trading'
  | 'banking'
  | 'vault'
  | 'logistics'
  | 'refinery'
  | 'compliance'
  | 'account'
  | 'other'

export type ContactTopicOption = {
  value: ContactTopic
  label: string
}

export const CONTACT_TOPICS: ContactTopicOption[] = [
  { value: 'general', label: 'General inquiry' },
  { value: 'trading', label: 'Trading & metals' },
  { value: 'banking', label: 'Commodity banking' },
  { value: 'vault', label: 'Vault & custody' },
  { value: 'logistics', label: 'Logistics & routing' },
  { value: 'refinery', label: 'Refinery partnership' },
  { value: 'compliance', label: 'Compliance & documentation' },
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

export function topicLabel(topic: ContactTopic): string {
  return CONTACT_TOPICS.find((t) => t.value === topic)?.label ?? topic
}
