"use client"

import type React from "react"

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

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("smartfin_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    // Find user in our mock database
    const foundUser = mockUserDB.find((u) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error("Invalid credentials")
    }

    // Get user without password
    const { password: _, ...userWithoutPassword } = foundUser

    // Update the mock database with any changes that might have happened
    // This ensures points persistence between sessions
    const updatedUser = { ...userWithoutPassword }

    setUser(updatedUser)
    localStorage.setItem("smartfin_user", JSON.stringify(updatedUser))
  }

  // Signup function
  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    // Check if user already exists
    if (mockUserDB.some((u) => u.email === email)) {
      throw new Error("User already exists")
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      firstName,
      lastName,
      points: 1000, // Start with 1000 points
    }

    // Add to mock database
    mockUserDB.push(newUser)

    // Set user without password
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("smartfin_user", JSON.stringify(userWithoutPassword))
  }

  // Logout function
  const logout = () => {
    // Before logging out, make sure to update the user's data in the mock database
    if (user) {
      const userIndex = mockUserDB.findIndex((u) => u.id === user.id)
      if (userIndex !== -1) {
        // Update points in the mock database
        mockUserDB[userIndex] = {
          ...mockUserDB[userIndex],
          points: user.points,
        }
      }
    }

    setUser(null)
    localStorage.removeItem("smartfin_user")
  }

  // Update user points
  const updateUserPoints = (newPoints: number) => {
    if (user) {
      const updatedUser = { ...user, points: newPoints }

      // Update in state and localStorage
      setUser(updatedUser)
      localStorage.setItem("smartfin_user", JSON.stringify(updatedUser))

      // Also update in our mock database for persistence
      const userIndex = mockUserDB.findIndex((u) => u.id === user.id)
      if (userIndex !== -1) {
        mockUserDB[userIndex] = {
          ...mockUserDB[userIndex],
          points: newPoints,
        }
      }
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
