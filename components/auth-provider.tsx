"use client"

import type React from "react"

import { AuthProvider as AuthContextProvider } from "@/lib/auth"
import { CartProvider } from "@/lib/cart"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContextProvider>
      <CartProvider>{children}</CartProvider>
    </AuthContextProvider>
  )
}
