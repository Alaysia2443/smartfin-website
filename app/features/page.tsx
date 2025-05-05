import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { TrendingUp, Award, CreditCard, Users, BookOpen, BarChartIcon as ChartBar } from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display">Features</h1>
            <p className="text-lg max-w-3xl mx-auto">
              Discover how SmartFin helps students build credit and financial literacy.
            </p>
          </div>
        </section>

        {/* Main Features Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
                This is <span className="text-primary-500">SmartFin</span>.
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                SmartFin helps you build credit while you make purchases on the app, so by the time you graduate, you'll
                have a solid financial foundation for success.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Earn Points */}
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Earn Points</h3>
                <p className="text-gray-600">
                  SmartFin offers rewards for each purchase you make. Complete financial education modules to earn
                  additional points that can be redeemed for gift cards and merchandise.
                </p>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="w-full h-32 bg-gray-200 rounded-md"></div>
                  <div className="mt-2 flex justify-between">
                    <div className="text-sm text-primary-500 font-bold">500 Points</div>
                    <div className="text-sm text-gray-500">Earned</div>
                  </div>
                </div>
              </div>

              {/* Financial Insights */}
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  <ChartBar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Financial Insights</h3>
                <p className="text-gray-600">
                  Track spending, set up automatic savings for your financial goals, and get personalized insights on
                  your spending patterns and financial health.
                </p>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="w-full h-32 bg-gray-200 rounded-md"></div>
                  <div className="mt-2 flex justify-between">
                    <div className="text-sm text-primary-500 font-bold">$500</div>
                    <div className="text-sm text-gray-500">Saved</div>
                  </div>
                </div>
              </div>

              {/* Smart Support */}
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Smart Support</h3>
                <p className="text-gray-600">
                  Connect with peers and mentors to create a real community around financial literacy. Get advice and
                  support through the app.
                </p>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="w-full h-32 bg-gray-200 rounded-md"></div>
                  <div className="mt-2 flex justify-between">
                    <div className="text-sm text-primary-500 font-bold">24/7</div>
                    <div className="text-sm text-gray-500">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Details */}
        <section className="py-16 md:py-24 bg-[#f8f7f4]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Powerful Features</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Explore the tools that make SmartFin the ultimate financial companion for college students.
              </p>
            </div>

            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white mb-6">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Credit Building Made Simple</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Start building your credit history with our secured card option. We report to all major credit bureaus
                  and provide guidance on how to improve your score.
                </p>
                <ul className="space-y-2">
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
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Credit Building Feature"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div className="order-2 md:order-1 bg-white p-6 rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Financial Tracking Feature"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white mb-6">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Financial Tracking</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Monitor your spending in real-time with automatic categorization. Set budgets and receive alerts when
                  you're approaching your limits.
                </p>
                <ul className="space-y-2">
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
              </div>
            </div>

            {/* Feature 3 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white mb-6">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Learn Together</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Access bite-sized financial education modules and connect with peers to share experiences and learn
                  together.
                </p>
                <ul className="space-y-2">
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
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Learning Feature"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="py-16 md:py-24 bg-secondary text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to get started?</h2>
                <p className="text-lg mb-8">
                  Download the SmartFin app today and start building your financial future. Available on iOS and
                  Android.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-white text-secondary hover:bg-gray-100">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="Apple"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    Download for iOS
                  </Button>
                  <Button className="bg-white text-secondary hover:bg-gray-100">
                    <Image
                      src="/placeholder.svg?height=24&width=24"
                      alt="Android"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    Download for Android
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-[280px] h-[560px] bg-white rounded-[40px] shadow-xl overflow-hidden border-8 border-gray-800">
                  <Image
                    src="/placeholder.svg?height=560&width=280"
                    alt="SmartFin App"
                    width={280}
                    height={560}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
