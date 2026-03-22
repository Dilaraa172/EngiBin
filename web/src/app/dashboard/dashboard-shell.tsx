"use client"

import Link from "next/link"
import { handleSignOut } from "@/lib/auth-client"
import { useAuth } from "@/providers/auth-provider"
import { isFirebaseConfigured } from "@/lib/firebase"

const DashboardShell = () => {
  const { user } = useAuth()
  const firebaseReady = isFirebaseConfigured()

  const handleClickSignOut = async () => {
    await handleSignOut()
  }

  return (
    <header className="border-b border-border bg-panel/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-medium text-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          ← Ana sayfa
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <span className="hidden max-w-[200px] truncate text-xs text-muted sm:inline">
              {user.email}
            </span>
          ) : null}
          <span className="text-sm font-semibold">Pano</span>
          {firebaseReady && user ? (
            <button
              type="button"
              onClick={() => void handleClickSignOut()}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Çıkış yap"
            >
              Çıkış
            </button>
          ) : null}
        </div>
      </div>
    </header>
  )
}

export default DashboardShell
