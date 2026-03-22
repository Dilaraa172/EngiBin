"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import DashboardShell from "@/app/dashboard/dashboard-shell"
import { useAuth } from "@/providers/auth-provider"

type DashboardLayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, loading, firebaseReady } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!firebaseReady || loading) {
      return
    }
    if (!user) {
      router.replace("/login?next=/dashboard")
    }
  }, [firebaseReady, loading, user, router])

  if (!firebaseReady) {
    return (
      <div className="min-h-screen bg-background px-4 py-16 text-center">
        <p className="mx-auto max-w-md text-sm text-muted">
          Firebase ortam değişkenleri tanımlı değil. Canlı ortamda Vercel
          Environment Variables içine{" "}
          <code className="font-mono text-foreground">NEXT_PUBLIC_FIREBASE_*</code>{" "}
          ekleyin veya yerelde{" "}
          <code className="font-mono text-foreground">web/.env.local</code>{" "}
          oluşturun.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Ana sayfa
        </Link>
      </div>
    )
  }

  if (loading || !user) {
    return (
      <div
        className="flex min-h-screen flex-col bg-background"
        role="status"
        aria-label="Oturum doğrulanıyor"
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="text-sm text-muted">Yükleniyor…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardShell />
      {children}
    </div>
  )
}

export default DashboardLayout
