import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import LoginForm from "./login-form"

export const metadata: Metadata = {
  title: "Giriş — EngiBin",
  description: "Google ile EngiBin hesabınıza giriş yapın.",
}

const LoginFallback = () => (
  <div
    className="h-48 animate-pulse rounded-xl border border-border bg-panel"
    role="status"
    aria-label="Yükleniyor"
  />
)

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-panel/80 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-medium text-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          ← EngiBin
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Suspense fallback={<LoginFallback />}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default LoginPage
