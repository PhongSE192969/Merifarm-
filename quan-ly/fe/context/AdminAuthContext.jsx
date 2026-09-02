import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../../../src/lib/supabaseClient'
import { getMyProfile } from '../../../src/services/profilesService'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(undefined) // undefined = chưa xác định, null = chưa đăng nhập
  const [profile, setProfile] = useState(undefined) // undefined = chưa tải, null = không có hồ sơ

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session?.user) { setProfile(session === null ? null : undefined); return }
    let cancelled = false
    getMyProfile().then((p) => { if (!cancelled) setProfile(p) }).catch(() => { if (!cancelled) setProfile(null) })
    return () => { cancelled = true }
  }, [session?.user?.id])

  async function refreshProfile() {
    const p = await getMyProfile()
    setProfile(p)
    return p
  }

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function signOut() {
    await supabase.auth.signOut()
  }

  async function updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) throw error
  }

  // Trong lúc session đã có nhưng hồ sơ vai trò chưa tải xong, coi như đang loading —
  // tránh UI nhấp nháy hiện rồi ẩn ngay các phần chỉ-admin trước khi biết chắc vai trò.
  const profileLoading = !!session?.user && profile === undefined

  const value = {
    user: session?.user ?? null,
    role: profile?.role ?? null,
    isAdmin: profile?.role === 'admin',
    profile: profile ?? null,
    loading: session === undefined || profileLoading,
    signIn,
    signOut,
    updatePassword,
    refreshProfile,
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth phải dùng bên trong AdminAuthProvider')
  return ctx
}
