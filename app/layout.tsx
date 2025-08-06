import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/shared/header"
import Footer from "@/components/shared/footer"
import AdmissionBanner from "@/components/shared/admission-banner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Learning Platform",
  description: "Best online platform for education.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <AdmissionBanner />
          <Footer />
        </div>
      </body>
    </html>
  )
}
