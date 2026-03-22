"use client"

import { AuthProvider } from "@/providers/auth-provider"
import type { ReactNode } from "react"

type AppProvidersProps = {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return <AuthProvider>{children}</AuthProvider>
}
