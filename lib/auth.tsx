
"use client"

import type React from "react"
import { getApiUrl } from "@/app/lib/api-config"
import { createContext, useContext, useState, useEffect } from "react"

// User type
type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  points: number
}

// Auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void
  updateUserPoints: (newPoints: number) => void
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount - SSR safe
  useEffect(() => {
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("smartfin_user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (e) {
          // Handle potential JSON parse error
          console.error("Failed to parse stored user data", e)
          localStorage.removeItem("smartfin_user")
        }
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Invalid credentials')
      }

      const userData = await response.json()
      // Transform the data to match frontend structure
      const transformedUser = {
        id: userData.id.toString(),
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        points: userData.points
      }
      setUser(transformedUser)
      
      // Only set in localStorage if in browser
      if (typeof window !== 'undefined') {
        localStorage.setItem("smartfin_user", JSON.stringify(transformedUser))
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  // Signup function
  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const response = await fetch(getApiUrl('/api/users'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create account')
      }

      const userData = await response.json()
      // Transform the data to match frontend structure
      const transformedUser = {
        id: userData.id.toString(),
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        points: userData.points
      }
      setUser(transformedUser)
      
      // Only set in localStorage if in browser
      if (typeof window !== 'undefined') {
        localStorage.setItem("smartfin_user", JSON.stringify(transformedUser))
      }
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem("smartfin_user")
    }
  }

  // Update user points
  const updateUserPoints = async (newPoints: number) => {
    if (!user) return

    try {
      const response = await fetch(getApiUrl(`/api/users?id=${user.id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points: newPoints }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update points')
      }

      const userData = await response.json()
      // Transform the data to match frontend structure
      const transformedUser = {
        id: userData.id.toString(),
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        points: userData.points
      }
      setUser(transformedUser)
      
      // Only set in localStorage if in browser
      if (typeof window !== 'undefined') {
        localStorage.setItem("smartfin_user", JSON.stringify(transformedUser))
      }
    } catch (error) {
      console.error('Error updating points:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUserPoints }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}