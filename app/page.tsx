import { Button } from "@/components/ui/button"
import { TrendingUp, CreditCard, Users, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SignupForm from "@/components/signup-form"
import DemoSection from "@/components/demo-section"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#f8f7f4] py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-display">
                  Here to help <span className="text-primary-500">every</span> university student.
                </h1>
                <p className="text-lg text-gray-700">
                  SmartFin empowers college students to take control of their financial future. Build credit, track
                  spending, and earn rewards while learning essential financial skills.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/signup">
                    <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                      Create Account <span className="ml-2">→</span>
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="border-primary-500 text-primary-500">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative mt-10 md:mt-0 flex justify-center">
                <div className="relative w-[280px] h-[560px] bg-white rounded-[40px] shadow-xl overflow-hidden border-8 border-gray-100">
                  <Image
                    src="/placeholder.svg?height=560&width=280"
                    alt="SmartFin App"
                    width={280}
                    height={560}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full">Try Demo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
                Building Credit <span className="text-primary-500">Made Simple</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                SmartFin helps you build credit while you make purchases on the app, so by the time you graduate, you'll
                have a solid financial foundation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Credit Building */}
              <div className="feature-card">
                <div className="feature-icon">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Credit Building</h3>
                <p className="text-gray-600">
                  Establish a credit score with our secured card option. Learn how credit works and improve your score
                  over time.
                </p>
              </div>

              {/* Financial Tracking */}
              <div className="feature-card">
                <div className="feature-icon">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Financial Tracking</h3>
                <p className="text-gray-600">
                  Monitor your spending habits in real-time. Set budgets, receive alerts, and visualize where your money
                  goes.
                </p>
              </div>

              {/* Financial Education */}
              <div className="feature-card">
                <div className="feature-icon">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Financial Education</h3>
                <p className="text-gray-600">
                  Access bite-sized lessons on how to budget, understand credit, investing, and student loans.
                </p>
              </div>

              {/* Community Support */}
              <div className="feature-card">
                <div className="feature-icon">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Connect with peers and mentors to share experiences and learn from others on the same journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-secondary text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Our Impact</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Join thousands of students already building credit and financial literacy with SmartFin.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="stat-card">
                <div className="stat-value">50K+</div>
                <div className="stat-label">Students</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">200+</div>
                <div className="stat-label">Universities</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">85%</div>
                <div className="stat-label">Credit Improvement</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">$2M+</div>
                <div className="stat-label">Student Savings</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-[#f8f7f4]">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
              Ready to take control of your financial future?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of students already building credit and financial literacy with SmartFin.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-primary-500 hover:bg-primary-600 text-white">
                  Get Started
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-primary-500 text-primary-500">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-testimonial-pattern bg-cover bg-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">What Students Are Saying</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hear from students who are already using SmartFin to improve their financial future.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Alex Johnson</h4>
                    <p className="text-sm text-gray-500">UCLA, Class of 2023</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "SmartFin helped me understand credit scores for the first time. I've been able to build my credit
                  while in college, which has been invaluable."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Taylor Smith</h4>
                    <p className="text-sm text-gray-500">NYU, Class of 2024</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I love how SmartFin makes tracking my expenses so easy. The rewards system is a great incentive to
                  make smart financial decisions."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Jordan Lee</h4>
                    <p className="text-sm text-gray-500">University of Michigan, Class of 2025</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The community aspect of SmartFin is what sets it apart. Being able to learn from peers and mentors
                  has been incredibly helpful."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <DemoSection />

        {/* Signup Form Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Join SmartFin Today</h2>
              <p className="text-lg text-gray-700">
                Be among the first to experience SmartFin when we launch. Sign up for early access and exclusive
                rewards.
              </p>
            </div>
            <SignupForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
