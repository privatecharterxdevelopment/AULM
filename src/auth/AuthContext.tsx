import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { isAdminEmail } from '../config/admin'
import {
  clearDemoSession,
  demoProfileFromSession,
  isDemoCredentials,
  isDemoLoginEnabled,
  loadDemoSession,
  saveDemoSession,
  type DemoSession,
} from './demoAuth'
import { getSupabase, isSupabaseConfigured, tables, type Profile } from '../lib/supabase'
import { linkKycToUser } from '../utils/submitKyc'

type AuthContextValue = {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  isLoggedIn: boolean
  isDemoMode: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (
    email: string,
    password: string,
    meta: { fullName: string; companyName: string },
  ) => Promise<{ error?: string }>
  logout: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function demoUserFromSession(demo: DemoSession): User {
  return {
    id: demo.id,
    email: demo.email,
    aud: 'authenticated',
    app_metadata: {},
    user_metadata: {
      full_name: demo.full_name,
      company_name: demo.company_name,
    },
    created_at: new Date().toISOString(),
  } as User
}

function applyDemoSession(
  demo: DemoSession,
  setDemoSession: (v: DemoSession) => void,
  setUser: (u: User) => void,
  setProfile: (p: Profile) => void,
  setSession: (s: Session | null) => void,
) {
  setDemoSession(demo)
  setUser(demoUserFromSession(demo))
  setProfile(demoProfileFromSession(demo))
  setSession(null)
}

async function fetchProfile(userId: string): Promise<Profile | null> {
  const supabase = getSupabase()
  if (!supabase) return null
  const { data } = await supabase.from(tables.profiles).select('*').eq('id', userId).maybeSingle()
  return data
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [demoSession, setDemoSession] = useState<DemoSession | null>(() =>
    isDemoLoginEnabled() ? loadDemoSession() : null,
  )
  const [loading, setLoading] = useState(isSupabaseConfigured)

  const refreshProfile = useCallback(async () => {
    if (demoSession) {
      setProfile(demoProfileFromSession(demoSession))
      return
    }
    if (!user) {
      setProfile(null)
      return
    }
    const p = await fetchProfile(user.id)
    setProfile(p)
  }, [user, demoSession])

  useEffect(() => {
    if (demoSession) {
      setUser(demoUserFromSession(demoSession))
      setProfile(demoProfileFromSession(demoSession))
    }
  }, [demoSession])

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setDemoSession(null)
        clearDemoSession()
      }
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (nextSession) {
        setDemoSession(null)
        clearDemoSession()
      }
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (demoSession || !user) return
    void fetchProfile(user.id).then(setProfile)
  }, [user, demoSession])

  const signIn = useCallback(async (email: string, password: string) => {
    if (isDemoCredentials(email, password)) {
      const demo = saveDemoSession()
      applyDemoSession(demo, setDemoSession, setUser, setProfile, setSession)
      return {}
    }

    const supabase = getSupabase()
    if (!supabase) return { error: 'Supabase not configured' }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })
    if (error) return { error: error.message }
    if (data.user) await linkKycToUser(data.user.id, email)
    return {}
  }, [])

  const signUp = useCallback(
    async (email: string, password: string, meta: { fullName: string; companyName: string }) => {
      const supabase = getSupabase()
      if (!supabase) return { error: 'Supabase not configured' }
      const normalized = email.trim().toLowerCase()
      const { data, error } = await supabase.auth.signUp({
        email: normalized,
        password,
        options: {
          data: {
            full_name: meta.fullName,
            company_name: meta.companyName,
          },
        },
      })
      if (error) return { error: error.message }
      if (data.session) {
        setSession(data.session)
        setUser(data.session.user)
      }
      if (data.user) {
        await linkKycToUser(data.user.id, normalized)
        await supabase.from(tables.profiles).upsert({
          id: data.user.id,
          email: normalized,
          full_name: meta.fullName,
          company_name: meta.companyName,
        })
      }
      return {}
    },
    [],
  )

  const logout = useCallback(async () => {
    clearDemoSession()
    setDemoSession(null)
    const supabase = getSupabase()
    if (supabase) await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    setProfile(null)
  }, [])

  const isAdmin = useMemo(() => {
    if (profile?.is_admin) return true
    return isAdminEmail(user?.email)
  }, [profile?.is_admin, user?.email])

  const value = useMemo(
    () => ({
      user,
      session,
      profile,
      loading,
      isLoggedIn: !!session || !!demoSession,
      isDemoMode: !!demoSession,
      isAdmin,
      signIn,
      signUp,
      logout,
      refreshProfile,
    }),
    [user, session, profile, loading, demoSession, isAdmin, signIn, signUp, logout, refreshProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
