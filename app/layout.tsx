import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import NextAuthProvider from "@/components/session-provider"
import { getServerSession } from "next-auth"

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

// Load Playfair Display font
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "SmartFin - Financial App for College Students",
  description: "SmartFin helps college students build credit, track spending, and earn rewards.",
  generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession();
  
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <NextAuthProvider session={session}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
