"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"

// User type
type User = {
  id: string
  email: string
  firstName: string
  lastName: string
  points: number
  image?: string
}

// Auth context type
type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void
  updateUserPoints: (newPoints: number) => void
  loginWithGithub: () => Promise<void>
  loginWithGoogle: () => Promise<void>
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database (in a real app, this would be a database)
const mockUserDB = [
  {
    id: "1",
    email: "test@example.com",
    password: "password",
    firstName: "Test",
    lastName: "User",
    points: 1000,
  },
]

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()

  // Check for existing session on mount
  useEffect(() => {
    if (status === "loading") return
    
    if (session?.user) {
      // Create user from OAuth session
      const oauthUser: User = {
        id: session.user.id || session.user.email || Date.now().toString(),
        email: session.user.email || "",
        firstName: session.user.name?.split(" ")[0] || "",
        lastName: session.user.name?.split(" ").slice(1).join(" ") || "",
        points: 1000, // Default points for new OAuth users
        image: session.user.image || undefined
      }
      setUser(oauthUser)
    } else {
      // Check for local storage user if no OAuth session
      const storedUser = localStorage.getItem("smartfin_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
    setIsLoading(false)
  }, [session, status])

  // Login with GitHub
  const loginWithGithub = async () => {
    await signIn("github", { callbackUrl: "/rewards" })
  }

  // Login with Google
  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/rewards" })
  }

  // Regular login function (keep your existing implementation)
  const login = async (email: string, password: string) => {
    // Your existing code
    const foundUser = mockUserDB.find((u) => u.email === email && u.password === password)
    if (!foundUser) {
      throw new Error("Invalid credentials")
    }
    const { password: _, ...userWithoutPassword } = foundUser
    const updatedUser = { ...userWithoutPassword }
    setUser(updatedUser)
    localStorage.setItem("smartfin_user", JSON.stringify(updatedUser))
  }

  // Keep your existing signup function
  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    // Your existing code
    if (mockUserDB.some((u) => u.email === email)) {
      throw new Error("User already exists")
    }
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      firstName,
      lastName,
      points: 1000,
    }
    mockUserDB.push(newUser)
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("smartfin_user", JSON.stringify(userWithoutPassword))
  }

  // Update logout to handle both NextAuth and local sessions
  const logout = () => {
    if (session) {
      signOut({ callbackUrl: "/" })
    } else {
      // Your existing local logout logic
      if (user) {
        const userIndex = mockUserDB.findIndex((u) => u.id === user.id)
        if (userIndex !== -1) {
          mockUserDB[userIndex] = {
            ...mockUserDB[userIndex],
            points: user.points,
          }
        }
      }
      setUser(null)
      localStorage.removeItem("smartfin_user")
    }
  }

  // Keep your existing updateUserPoints function
  const updateUserPoints = (newPoints: number) => {
    if (user) {
      const updatedUser = { ...user, points: newPoints }
      setUser(updatedUser)
      
      // Only update localStorage for non-OAuth users
      if (!session) {
        localStorage.setItem("smartfin_user", JSON.stringify(updatedUser))
        const userIndex = mockUserDB.findIndex((u) => u.id === user.id)
        if (userIndex !== -1) {
          mockUserDB[userIndex] = {
            ...mockUserDB[userIndex],
            points: newPoints,
          }
        }
      }
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        signup, 
        logout, 
        updateUserPoints,
        loginWithGithub,
        loginWithGoogle
      }}
    >
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
