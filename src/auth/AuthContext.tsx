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
import { getSupabase, isSupabaseConfigured, tables, type Profile } from '../lib/supabase'
import { linkKycToUser } from '../utils/submitKyc'

type AuthContextValue = {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  isLoggedIn: boolean
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
  const [loading, setLoading] = useState(isSupabaseConfigured)

  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null)
      return
    }
    const p = await fetchProfile(user.id)
    setProfile(p)
  }, [user])

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user) {
      void fetchProfile(user.id).then(setProfile)
    } else {
      setProfile(null)
    }
  }, [user])

  const signIn = useCallback(async (email: string, password: string) => {
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
    const supabase = getSupabase()
    if (supabase) await supabase.auth.signOut()
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
      isLoggedIn: !!session,
      isAdmin,
      signIn,
      signUp,
      logout,
      refreshProfile,
    }),
    [user, session, profile, loading, isAdmin, signIn, signUp, logout, refreshProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
