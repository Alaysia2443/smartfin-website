"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart"
import { Badge } from "@/components/ui/badge"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setCartCount(cartItems.length)
  }, [cartItems])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary-500 font-display">
              SmartFin
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/features"
              className="text-base font-medium text-gray-700 hover:text-primary-500 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-gray-700 hover:text-primary-500 transition-colors"
            >
              About
            </Link>
            <Link href="/demo" className="text-base font-medium text-gray-700 hover:text-primary-500 transition-colors">
              Demo
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium text-gray-700 hover:text-primary-500 transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/cart" className="relative">
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary-500">
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                </Link>
                <Link href="/rewards">
                  <Button variant="outline" className="border-primary-500 text-primary-500 hover:bg-primary-50">
                    Rewards Shop
                  </Button>
                </Link>
                <Button variant="destructive" onClick={logout} className="bg-red-500 hover:bg-red-600">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="border-primary-500 text-primary-500 hover:bg-primary-50">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-primary-500 hover:bg-primary-600 text-white">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-gray-700 hover:text-primary-500">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-3 border-t bg-white">
          <Link
            href="/features"
            className="block py-2 text-base font-medium text-gray-700 hover:text-primary-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/about"
            className="block py-2 text-base font-medium text-gray-700 hover:text-primary-500"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/demo"
            className="block py-2 text-base font-medium text-gray-700 hover:text-primary-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Demo
          </Link>
          <Link
            href="/contact"
            className="block py-2 text-base font-medium text-gray-700 hover:text-primary-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="pt-4 space-y-3">
            {user ? (
              <>
                <Link href="/rewards" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-primary-500 text-primary-500">
                    Rewards Shop
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-red-500"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-primary-500 text-primary-500">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary-500 text-white">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
