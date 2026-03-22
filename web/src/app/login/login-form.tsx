"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { handleGoogleSignIn } from "@/lib/auth-client"
import { useAuth } from "@/providers/auth-provider"

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { firebaseReady, user, loading } = useAuth()
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const nextParam = searchParams.get("next")
  const safeNext = useMemo(() => {
    const path = nextParam ?? "/dashboard"
    if (path.startsWith("/") && !path.startsWith("//")) {
      return path
    }
    return "/dashboard"
  }, [nextParam])

  useEffect(() => {
    if (loading || !user) {
      return
    }
    router.replace(safeNext)
  }, [loading, user, router, safeNext])

  const handleSubmitGoogle = async () => {
    setErrorMessage(null)
    setSubmitting(true)
    try {
      await handleGoogleSignIn()
      router.replace(safeNext)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Giriş başarısız oldu"
      setErrorMessage(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleKeyDownForm = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") {
      return
    }
    e.preventDefault()
    if (!submitting && firebaseReady) {
      void handleSubmitGoogle()
    }
  }

  if (!firebaseReady) {
    return (
      <div
        className="rounded-xl border border-border bg-panel p-8"
        role="alert"
      >
        <p className="text-sm text-muted">
          Firebase ortam değişkenleri eksik.{" "}
          <code className="rounded bg-background px-1 font-mono text-foreground">
            web/.env.local
          </code>{" "}
          dosyasını{" "}
          <code className="rounded bg-background px-1 font-mono text-foreground">
            .env.example
          </code>{" "}
          ile doldurun ve yeniden başlatın.
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl border border-border bg-panel p-8 shadow-xl ring-1 ring-white/5"
      onKeyDown={handleKeyDownForm}
      role="region"
      aria-labelledby="login-title"
    >
      <h1
        id="login-title"
        className="mb-2 text-xl font-semibold tracking-tight"
      >
        Giriş yap
      </h1>
      <p className="mb-6 text-sm text-muted">
        Google hesabınızla devam edin. Verileriniz yalnızca sizin Firestore
        alanınızda tutulur.
      </p>

      {errorMessage ? (
        <p
          className="mb-4 rounded-lg border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="button"
        onClick={() => void handleSubmitGoogle()}
        disabled={submitting || loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Google ile giriş yap"
      >
        <GoogleGlyph />
        {submitting ? "Yönlendiriliyor…" : "Google ile devam et"}
      </button>

      <p className="mt-6 text-center text-xs text-muted">
        <Link
          href="/"
          className="text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Ana sayfaya dön
        </Link>
      </p>
    </div>
  )
}

const GoogleGlyph = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    aria-hidden
    focusable="false"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
)

export default LoginForm
