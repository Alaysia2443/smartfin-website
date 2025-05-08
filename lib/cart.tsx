"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"  // ✅ import your auth hook

// Cart item type
export type CartItem = {
  id: string
  name: string
  points: number
  image: string
  quantity: number
}

// Cart context type
type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  updateQuantity: (itemId: string, quantity: number) => void
  getTotalPoints: () => number
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart provider
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { toast } = useToast()
  const { user } = useAuth() // ✅ get current user

  // Load cart when user changes
  useEffect(() => {
    if (user) {
      const storedCart = localStorage.getItem(`cart_${user.id}`)
      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
      } else {
        setCartItems([]) // initialize empty if no saved cart
      }
    } else {
      // User logged out → clear cart from memory
      setCartItems([])
    }
  }, [user])

  // Save cart when cartItems or user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems))
    }
  }, [cartItems, user])

  // Add item to cart
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id)

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        }

        toast({
          title: "Item added to cart",
          description: `${item.name} quantity increased to ${updatedItems[existingItemIndex].quantity}`,
          duration: 3000,
        })

        return updatedItems
      } else {
        toast({
          title: "Item added to cart",
          description: `${item.name} added to your cart`,
          duration: 3000,
        })

        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((i) => i.id === itemId)
      if (item) {
        toast({
          title: "Item removed",
          description: `${item.name} removed from your cart`,
          duration: 3000,
        })
      }
      return prevItems.filter((item) => item.id !== itemId)
    })
  }

  const clearCart = () => {
    setCartItems([])
    if (user) {
      localStorage.removeItem(`cart_${user.id}`)  // ✅ clear stored cart too
    }
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      duration: 3000,
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    )
  }

  const getTotalPoints = () => {
    return cartItems.reduce((total, item) => total + item.points * item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getTotalPoints,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
