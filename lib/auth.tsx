
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
      console.log(`Attempting login with API URL: ${getApiUrl('/api/auth/login')}`);
      
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      console.log('Login response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login response error:', response.status, errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { error: errorText || 'Unknown error' };
        }
        
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const userData = await response.json();
      console.log('Login successful, user data received');
      
      // Transform the data to match frontend structure
      const transformedUser = {
        id: userData.id.toString(),
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        points: userData.points
      };
      
      setUser(transformedUser);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem("smartfin_user", JSON.stringify(transformedUser));
      }
    } catch (error) {
      console.error("Login error details:", error);
      throw error;
    }
  };


  // Signup function
  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    console.log('flag')
    try {
      console.log(`Attempting signup with API URL: ${getApiUrl('/api/users')}`);
      
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
      
      console.log('Signup response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Signup response error:', response.status, errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { error: errorText || 'Unknown error' };
        }
        
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const userData = await response.json();
      console.log('Signup successful, user data received');
      
      // Transform the data to match frontend structure
      const transformedUser = {
        id: userData.id.toString(),
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        points: userData.points
      };
      
      setUser(transformedUser);
      
      // Only set in localStorage if in browser
      if (typeof window !== 'undefined') {
        localStorage.setItem("smartfin_user", JSON.stringify(transformedUser));
      }
    } catch (error) {
      console.error("Signup error details:", error);
      throw error;
    }
  };


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

// "use client"

// import type React from "react"

// import { createContext, useContext, useState, useEffect } from "react"

// // User type
// type User = {
//   id: string
//   email: string
//   firstName: string
//   lastName: string
//   points: number
// }

// // Auth context type
// type AuthContextType = {
//   user: User | null
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<void>
//   signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
//   logout: () => void
//   updateUserPoints: (newPoints: number) => void
// }

// // Create context
// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// // Mock user database (in a real app, this would be a database)
// const mockUserDB = [
//   {
//     id: "1",
//     email: "test@example.com",
//     password: "password",
//     firstName: "Test",
//     lastName: "User",
//     points: 1000,
//   },
// ]

// // Auth provider component
// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   // Check for existing session on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("smartfin_user")
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//     setIsLoading(false)
//   }, [])

//   // Login function
//   const login = async (email: string, password: string) => {
//     // Find user in our mock database
//     const foundUser = mockUserDB.find((u) => u.email === email && u.password === password)

//     if (!foundUser) {
//       throw new Error("Invalid credentials")
//     }

//     // Get user without password
//     const { password: _, ...userWithoutPassword } = foundUser

//     // Update the mock database with any changes that might have happened
//     // This ensures points persistence between sessions
//     const updatedUser = { ...userWithoutPassword }

//     setUser(updatedUser)
//     localStorage.setItem("smartfin_user", JSON.stringify(updatedUser))
//   }

//   // Signup function
//   const signup = async (email: string, password: string, firstName: string, lastName: string) => {
//     // Check if user already exists
//     if (mockUserDB.some((u) => u.email === email)) {
//       throw new Error("User already exists")
//     }

//     // Create new user
//     const newUser = {
//       id: Date.now().toString(),
//       email,
//       password,
//       firstName,
//       lastName,
//       points: 1000, // Start with 1000 points
//     }

//     // Add to mock database
//     mockUserDB.push(newUser)

//     // Set user without password
//     const { password: _, ...userWithoutPassword } = newUser
//     setUser(userWithoutPassword)
//     localStorage.setItem("smartfin_user", JSON.stringify(userWithoutPassword))
//   }

//   // Logout function
//   const logout = () => {
//     // Before logging out, make sure to update the user's data in the mock database
//     if (user) {
//       const userIndex = mockUserDB.findIndex((u) => u.id === user.id)
//       if (userIndex !== -1) {
//         // Update points in the mock database
//         mockUserDB[userIndex] = {
//           ...mockUserDB[userIndex],
//           points: user.points,
//         }
//       }
//     }
  

//     setUser(null)
//     localStorage.removeItem("smartfin_user")
//   }

//   // Update user points
//   const updateUserPoints = (newPoints: number) => {
//     if (user) {
//       const updatedUser = { ...user, points: newPoints }

//       // Update in state and localStorage
//       setUser(updatedUser)
//       localStorage.setItem("smartfin_user", JSON.stringify(updatedUser))

//       // Also update in our mock database for persistence
//       const userIndex = mockUserDB.findIndex((u) => u.id === user.id)
//       if (userIndex !== -1) {
//         mockUserDB[userIndex] = {
//           ...mockUserDB[userIndex],
//           points: newPoints,
//         }
//       }
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUserPoints }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// // Custom hook to use auth context
// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// }