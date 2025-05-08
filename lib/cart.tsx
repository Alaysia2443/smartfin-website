"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export type CartItem = {
  id: string
  name: string
  points: number
  image: string
  quantity: number
}


type CartContextType = {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  updateQuantity: (itemId: string, quantity: number) => void
  getTotalPoints: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const storedCart = localStorage.getItem("smartfin_cart")
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("smartfin_cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id)

      if (existingItemIndex !== -1) {
        // Update quantity of existing item
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
        // Add new item with quantity 1
        toast({
          title: "Item added to cart",
          description: `${item.name} added to your cart`,
          duration: 3000,
        })

        return [...prevItems, { ...item, quantity: 1 }]
      }
    })
  }

  // Remove item from cart
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
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
      duration: 3000,
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
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

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
