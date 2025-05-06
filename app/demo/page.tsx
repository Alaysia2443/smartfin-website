import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Play, CreditCard, TrendingUp, Award, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display">SmartFin Demo</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Experience how SmartFin helps college students build credit, track spending, and earn rewards.
            </p>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">See SmartFin in Action</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Watch our demo video to see how SmartFin works and how it can help you build your financial future.
              </p>
            </div>

            <div className="max-w-4xl mx-auto flex justify-center">
            <div className="relative w-[280px] h-[560px] rounded-[40px] overflow-hidden shadow-xl border-8 border-gray-100">
        <img
                src="/SmartFinDemo.gif"       
                alt="SmartFin Demo"
                className="w-[280px] h-[550px]"
              />
        </div>
            </div>
          </div>
        </section>

        {/* Feature Demo Section */}
        <section className="pt-4 pb-8 md:pt-8 md:pb-24 bg-[#f8f7f4]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Explore Key Features</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Try out interactive demos of our core features to see how SmartFin can help you manage your finances.
              </p>
            </div>

            <Tabs defaultValue="credit" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <TabsTrigger value="credit" className="flex items-center gap-2 justify-center">
                    <CreditCard className="h-4 w-4" />
                    <span>Credit Building</span>
                  </TabsTrigger>
                  <TabsTrigger value="tracking" className="flex items-center gap-2 justify-center">
                    <TrendingUp className="h-4 w-4" />
                    <span>Expense Tracking</span>
                  </TabsTrigger>
                  <TabsTrigger value="rewards" className="flex items-center gap-2 justify-center">
                    <Award className="h-4 w-4" />
                    <span>Rewards</span>
                  </TabsTrigger>
                  <TabsTrigger value="education" className="flex items-center gap-2 justify-center">
                    <BookOpen className="h-4 w-4" />
                    <span>Education</span>
                  </TabsTrigger>
                </TabsList>


              <TabsContent value="credit">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Build Your Credit Score</h3>
                        <p className="text-gray-600 mb-4">
                          SmartFin helps you establish and build your credit history with our secured card option. We
                          report to all major credit bureaus and provide guidance on how to improve your score.
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>No credit history required to start</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Monthly credit score updates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Personalized tips to improve your score</span>
                          </li>
                        </ul>
                        <div className="flex gap-4">
                          <div className="bg-gray-100 rounded-lg p-3 text-center flex-1">
                            <div className="text-2xl font-bold text-primary-500">650</div>
                            <div className="text-sm text-gray-500">Starting Score</div>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-3 text-center flex-1">
                            <div className="text-2xl font-bold text-primary-500">720</div>
                            <div className="text-sm text-gray-500">After 6 Months</div>
                          </div>
                          <div className="bg-gray-100 rounded-lg p-3 text-center flex-1">
                            <div className="text-2xl font-bold text-primary-500">750+</div>
                            <div className="text-sm text-gray-500">After 1 Year</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <Image
                          src="/creditscore.webp?height=400&width=400"
                          alt="Credit Building Feature"
                          width={400}
                          height={400}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tracking">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Track Your Spending</h3>
                        <p className="text-gray-600 mb-4">
                          Monitor your spending in real-time with automatic categorization. Set budgets and receive
                          alerts when you're approaching your limits.
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Automatic expense categorization</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Customizable budget templates</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Real-time spending alerts</span>
                          </li>
                        </ul>
                        <div className="bg-white rounded-lg border p-4 mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Monthly Budget</span>
                            <span className="font-medium">$1,200 / $1,500</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <Image
                          src="/status.png?height=400&width=400"
                          alt="Expense Tracking Feature"
                          width={400}
                          height={400}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rewards">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Earn Rewards</h3>
                        <p className="text-gray-600 mb-4">
                          Earn points for every purchase you make and for completing financial education modules. Redeem
                          your points for gift cards, merchandise, and more.
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Earn 1 point for every $1 spent</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Bonus points for on-time payments</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Redeem points for valuable rewards</span>
                          </li>
                        </ul>
                        <div className="bg-white rounded-lg border p-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Your Points</span>
                            <span className="font-medium text-primary-500">1,000 points</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            You're 500 points away from a $25 Amazon gift card!
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <Image
                          src="/win.png?height=400&width=400"
                          alt="Rewards Feature"
                          width={400}
                          height={400}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Financial Education</h3>
                        <p className="text-gray-600 mb-4">
                          Access bite-sized financial education modules and connect with peers to share experiences and
                          learn together.
                        </p>
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Interactive financial literacy courses</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Community forums and discussion groups</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary-500 font-bold">•</span>
                            <span>Expert-led webinars and workshops</span>
                          </li>
                        </ul>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg border p-4 text-center">
                            <div className="text-lg font-bold mb-1">Budgeting 101</div>
                            <div className="text-sm text-gray-500 mb-2">15 min course</div>
                            <div className="text-xs bg-green-100 text-green-800 rounded-full px-2 py-1 inline-block">
                              Completed
                            </div>
                          </div>
                          <div className="bg-white rounded-lg border p-4 text-center">
                            <div className="text-lg font-bold mb-1">Credit Basics</div>
                            <div className="text-sm text-gray-500 mb-2">20 min course</div>
                            <div className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1 inline-block">
                              In Progress
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <Image
                          src="/campusconnect.png?height=400&width=400"
                          alt="Education Feature"
                          width={400}
                          height={400}
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* App Preview Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">App Preview</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything a college student needs to hone their financial skills well before graduation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex justify-center">
                <div className="relative w-[240px] h-[480px] bg-white rounded-[36px] shadow-xl overflow-hidden border-8 border-gray-800">
                  <Image
                    src="/dashboard.png?height=480&width=240"
                    alt="SmartFin App Dashboard"
                    width={240}
                    height={480}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs font-medium">Dashboard</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative w-[240px] h-[480px] bg-white rounded-[36px] shadow-xl overflow-hidden border-8 border-gray-800">
                  <Image
                    src="/transactions.png?height=480&width=240"
                    alt="SmartFin App Transactions"
                    width={240}
                    height={480}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs font-medium">Transactions</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="relative w-[240px] h-[480px] bg-white rounded-[36px] shadow-xl overflow-hidden border-8 border-gray-800">
                  <Image
                    src="/rewards.png?height=480&width=240"
                    alt="SmartFin App Rewards"
                    width={240}
                    height={480}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="text-xs font-medium">Rewards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-secondary text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to get started?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Join thousands of students already building credit and financial literacy with SmartFin.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-secondary hover:bg-black-100">
                  Create Account
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
