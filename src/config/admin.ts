import { CONTACT_EMAIL } from './site'

const raw = import.meta.env.VITE_ADMIN_EMAILS ?? CONTACT_EMAIL

export const ADMIN_EMAILS = raw
  .split(',')
  .map((e: string) => e.trim().toLowerCase())
  .filter(Boolean)

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) return false
  return ADMIN_EMAILS.includes(email.trim().toLowerCase())
}
