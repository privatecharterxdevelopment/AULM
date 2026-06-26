import type { Profile } from '../lib/supabase'

const DEMO_STORAGE_KEY = 'aulm_demo_session'

export const DEMO_EMAIL = (import.meta.env.VITE_DEMO_LOGIN_EMAIL as string | undefined) ?? 'demo@aulm.com'
export const DEMO_PASSWORD =
  (import.meta.env.VITE_DEMO_LOGIN_PASSWORD as string | undefined) ?? 'DemoAULM2026!'

export type DemoSession = {
  id: string
  email: string
  full_name: string
  company_name: string
}

export const DEMO_PROFILE: DemoSession = {
  id: '00000000-0000-4000-8000-000000000001',
  email: DEMO_EMAIL.trim().toLowerCase(),
  full_name: 'Demo Desk',
  company_name: 'AULM Demo Trading LLC',
}

export function isDemoLoginEnabled(): boolean {
  return import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_LOGIN === 'true'
}

export function isDemoCredentials(email: string, password: string): boolean {
  if (!isDemoLoginEnabled()) return false
  return (
    email.trim().toLowerCase() === DEMO_EMAIL.trim().toLowerCase() && password === DEMO_PASSWORD
  )
}

export function loadDemoSession(): DemoSession | null {
  if (!isDemoLoginEnabled()) return null
  try {
    const raw = sessionStorage.getItem(DEMO_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as DemoSession
  } catch {
    return null
  }
}

export function saveDemoSession(): DemoSession {
  const session: DemoSession = {
    ...DEMO_PROFILE,
    email: DEMO_EMAIL.trim().toLowerCase(),
  }
  sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(session))
  return session
}

export function clearDemoSession(): void {
  sessionStorage.removeItem(DEMO_STORAGE_KEY)
}

export function demoProfileFromSession(demo: DemoSession): Profile {
  return {
    id: demo.id,
    email: demo.email,
    full_name: demo.full_name,
    company_name: demo.company_name,
    kyc_status: 'approved',
    kyc_application_id: null,
    is_admin: false,
  }
}
