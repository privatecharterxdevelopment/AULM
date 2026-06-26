import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useAuth } from '../../auth/AuthContext'
import type { CbosApiContract } from '../api/contracts'
import { getCbosSupabase, getCbosSupabaseKey } from '../lib/cbosSupabase'
import { DEMO_ORG } from '../mocks/demoData'
import { mockCbosApi } from '../providers/mockApi'
import { createSupabaseCbosApi } from '../providers/supabaseApi'
import type { OrgRole } from '../rbac/roles'

type CbosContextValue = {
  api: CbosApiContract
  orgName: string
  orgRole: OrgRole
  bankLicenseRef?: string
  isLiveDb: boolean
}

const CbosContext = createContext<CbosContextValue | null>(null)

export function CbosProvider({ children }: { children: ReactNode }) {
  const { profile, isDemoMode } = useAuth()

  const value = useMemo<CbosContextValue>(() => {
    const hasCbosEnv = Boolean(import.meta.env.VITE_CBOS_SUPABASE_URL && getCbosSupabaseKey())
    const useLive = hasCbosEnv && Boolean(getCbosSupabase())
    return {
      api: useLive ? createSupabaseCbosApi() : mockCbosApi,
      orgName: profile?.company_name ?? DEMO_ORG.name,
      orgRole: DEMO_ORG.orgRole,
      bankLicenseRef: DEMO_ORG.bankLicenseRef,
      isLiveDb: useLive && !isDemoMode,
    }
  }, [profile?.company_name, isDemoMode])

  return <CbosContext.Provider value={value}>{children}</CbosContext.Provider>
}

export function useCbos() {
  const ctx = useContext(CbosContext)
  if (!ctx) throw new Error('useCbos must be used within CbosProvider')
  return ctx
}
