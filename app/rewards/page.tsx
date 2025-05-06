"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, TrendingUp, ShirtIcon, Smartphone, CreditCard } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useCart } from "@/lib/cart"
import { useToast } from "@/components/ui/use-toast"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Reward item type
type RewardItem = {
  id: string
  name: string
  description: string
  points: number
  image: string
  category: "trending" | "clothing" | "tech" | "giftcards"
}

// Sample reward items
const rewardItems: RewardItem[] = [
  {
    id: "hoodie",
    name: "SmartFin Branded Hoodie",
    description: "Cozy and stylish hoodie with the SmartFin logo. Perfect for late night study sessions.",
    points: 500,
    image: "https://img.freepik.com/premium-photo/blank-white-hoodie-front-back-view-mockup-isolated-white-background_986042-1023.jpg?w=2000",
    category: "clothing",
  },
  {
    id: "amazon",
    name: "$25 Amazon Gift Card",
    description: "Get anything you need with this $25 Amazon gift card. Digital delivery within 24 hours.",
    points: 2500,
    image: "https://www.lifewire.com/thmb/Tjb_XivCgAR7VFNpSvl3-lESBMI=/7200x0/filters:no_upscale():max_bytes(150000):strip_icc()/Amazon-Gift-Card-56a86f6d3df78cf7729e155d.jpg",
    category: "giftcards",
  },
  {
    id: "earbuds",
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds for music, calls, and online classes. Includes charging case.",
    points: 3000,
    image: "https://images-na.ssl-images-amazon.com/images/I/71apwE6HGaL._AC_SL1500_.jpg",
    category: "tech",
  },
  {
    id: "tshirt",
    name: "SmartFin T-Shirt",
    description: "Comfortable cotton t-shirt with the SmartFin logo.",
    points: 300,
    image: "https://static.vecteezy.com/system/resources/previews/020/067/692/original/3d-white-t-shirt-mockup-free-vector.jpg",
    category: "clothing",
  },
  {
    id: "starbucks",
    name: "$10 Starbucks Gift Card",
    description: "Fuel your study sessions with coffee. Digital delivery within 24 hours.",
    points: 1000,
    image: "https://tse2.mm.bing.net/th?id=OIP.eLaKtcnjjgq2gyZIZ7_5EgHaEc&pid=Api&P=0&h=220",
    category: "giftcards",
  },
  {
    id: "powerbank",
    name: "Portable Power Bank",
    description: "10,000mAh power bank to keep your devices charged on the go.",
    points: 1500,
    image: "https://wonderfulengineering.com/wp-content/uploads/2020/11/10-best-power-banks-2.jpg",
    category: "tech",
  },
]

export default function RewardsPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("trending")
  const [filteredItems, setFilteredItems] = useState<RewardItem[]>([])

  useEffect(() => {
    // Redirect if not logged in
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (activeTab === "trending") {
      // For trending, just show all items
      setFilteredItems(rewardItems)
    } else {
      setFilteredItems(rewardItems.filter((item) => item.category === activeTab))
    }
  }, [activeTab])

  const handleAddToCart = (item: RewardItem) => {
    if (!user) return

    if (user.points >= item.points) {
      // Add to cart
      addToCart({
        id: item.id,
        name: item.name,
        points: item.points,
        image: item.image,
      })
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${item.points - user.points} more points to add this item to your cart.`,
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
      <main className="flex-grow">
        {/* Rewards Header */}
        <section className="bg-primary-500 text-white py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 font-display">SmartFin Rewards Shop</h1>
                <p className="text-lg">Use your points to redeem exclusive products and gift cards</p>
              </div>

              <div className="mt-6 md:mt-0 flex items-center gap-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <h2 className="text-primary-800 font-bold mb-1">YOUR BALANCE</h2>
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary-500" />
                    <span className="text-3xl font-bold text-primary-500">{user.points}</span>
                    <span className="text-primary-700">points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rewards Categories */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="trending" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-4 gap-4">
                  <TabsTrigger value="trending" className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Trending</span>
                  </TabsTrigger>
                  <TabsTrigger value="clothing" className="flex items-center gap-2">
                    <ShirtIcon className="h-4 w-4" />
                    <span>Clothing</span>
                  </TabsTrigger>
                  <TabsTrigger value="tech" className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <span>Tech</span>
                  </TabsTrigger>
                  <TabsTrigger value="giftcards" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Gift Cards</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                      <div className="relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={400}
                          height={225}
                          className="w-full h-[225px] object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full font-medium">
                          {item.points} points
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="font-display">{item.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-primary-500 hover:bg-primary-600 text-white"
                          disabled={user.points < item.points}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {user.points >= item.points ? "Add to Cart" : "Not Enough Points"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
