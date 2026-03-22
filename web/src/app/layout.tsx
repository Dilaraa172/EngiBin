import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AppProviders } from "@/app/providers"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "EngiBin — Akıllı Mühendislik Envanteri",
  description:
    "QR ile fiziksel kutuları dijital envantere bağlayın; pinout ve datasheet’e hızlı erişim.",
}

type RootLayoutProps = {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="tr" className="antialiased">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}

export default RootLayout
