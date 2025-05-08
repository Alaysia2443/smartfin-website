"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useCart } from "@/lib/cart"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"

export default function CartPage() {
  const router = useRouter()
  const { user, isLoading, updateUserPoints } = useAuth()
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPoints } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleCheckout = () => {
    if (!user) return

    const totalPoints = getTotalPoints()

    if (user.points >= totalPoints) {
      const newPointsBalance = user.points - totalPoints
      updateUserPoints(newPointsBalance)

      clearCart()

      toast({
        title: "Order Placed!",
        description: `Your order has been successfully placed. You spent ${totalPoints} points. Your new balance is ${newPointsBalance} points.`,
        duration: 5000,
      })

      // redirect to rewards page
      router.push("/rewards")
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${totalPoints - user.points} more points to complete this purchase.`,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8 font-display">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/rewards">
                <Button className="bg-primary-500 hover:bg-primary-600 text-white">Browse Rewards</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-1/4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold">{item.name}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                        <div className="text-primary-500 font-bold mt-1">{item.points} points</div>
                        <div className="flex items-center mt-4">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="mx-3 font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <div className="ml-auto font-bold">{item.points * item.quantity} points</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Your Balance</span>
                        <span className="font-bold">{user.points} points</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Items</span>
                        <span className="font-bold">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                      </div>
                      <div className="border-t pt-4 flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-primary-500">{getTotalPoints()} points</span>
                      </div>
                      {user.points >= getTotalPoints() && (
                        <div className="text-sm text-gray-500">
                          After this purchase, your balance will be {user.points - getTotalPoints()} points
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-primary-500 hover:bg-primary-600 text-white"
                      disabled={getTotalPoints() > user.points}
                    >
                      {getTotalPoints() <= user.points ? "Complete Order" : "Insufficient Points"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
