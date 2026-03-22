"use client"

import Link from "next/link"
import { useAuth } from "@/providers/auth-provider"

const linkClass =
  "rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"

const primaryCtaClass =
  "inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"

export const HomeTopBarNav = () => {
  const { user, loading, firebaseReady } = useAuth()

  if (!firebaseReady) {
    return (
      <Link href="/login" className={linkClass} aria-label="Giriş sayfasına git">
        Giriş
      </Link>
    )
  }

  if (loading) {
    return (
      <span className="px-3 py-2 text-sm text-muted" aria-live="polite">
        …
      </span>
    )
  }

  if (user) {
    return (
      <Link href="/dashboard" className={linkClass} aria-label="Panele git">
        Panoya git
      </Link>
    )
  }

  return (
    <Link href="/login?next=/dashboard" className={linkClass}>
      Giriş yap
    </Link>
  )
}

export const HomeHeroActions = () => {
  const { user, loading, firebaseReady } = useAuth()

  const primaryHref =
    user && firebaseReady && !loading ? "/dashboard" : "/login?next=/dashboard"

  return (
    <div className="flex flex-wrap gap-3">
      <Link href={primaryHref} className={primaryCtaClass}>
        Başla
      </Link>
      <span className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm text-muted">
        Google ile güvenli giriş
      </span>
    </div>
  )
}
