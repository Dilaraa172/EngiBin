"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase"
import { syncUserToFirestore } from "@/lib/sync-user-profile"

type AuthContextValue = {
  user: User | null
  loading: boolean
  firebaseReady: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const firebaseReady = isFirebaseConfigured()

  useEffect(() => {
    if (!firebaseReady) {
      setLoading(false)
      return
    }

    const auth = getFirebaseAuth()
    if (!auth) {
      setLoading(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser)
      if (nextUser) {
        try {
          await syncUserToFirestore(nextUser)
        } catch (err) {
          console.error("Firestore kullanıcı senkronu başarısız:", err)
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [firebaseReady])

  return (
    <AuthContext.Provider value={{ user, loading, firebaseReady }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth yalnızca AuthProvider içinde kullanılmalıdır")
  }
  return ctx
}
