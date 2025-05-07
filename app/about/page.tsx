import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display">About</h1>
            <p className="text-lg max-w-3xl mx-auto">Learn about our mission to empower students financially.</p>
          </div>
        </section>

        {/* Mission Section */}
        <section
  className="relative py-16 md:py-24 bg-center bg-cover"
  style={{ backgroundImage: "url('/students.png')" }}   // adjust path if needed
>
  {/* dark overlay for contrast */}
  <div className="absolute inset-0 bg-black/25 pointer-events-none" />

  {/* text content */}
  <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display text-white">
      Financially empowering <span className="text-primary-500">every</span> student in America
    </h2>

    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-6">
      We help students from all financial, ethnic, and social backgrounds get the opportunity to build their
      credit and financial future well before they enter the workforce.
    </p>

    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-6">
      Underserved students are struggling to manage their financial lives without a financial safety net or
      the resources to set up their credits for the future.
    </p>

    <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
      SmartFin is a student‑centered mobile application providing students access to credit‑management plans,
      encouraging healthy spending habits, and building community around financial literacy.
    </p>
  </div>
</section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-[#f8f7f4]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Our Impact</h2>
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

        {/* What We're Doing Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">What We're Doing</h2>
            </div>

            <div className="bg-primary-500 text-white rounded-lg p-8 mb-12">
              <p className="text-lg mb-6">
                SmartFin aims to improve student financial health by teaching students how comprehensive credit
                management plans provide healthy spending habits, and how to build community around financial literacy.
              </p>
              <Button className="bg-white text-primary-500 hover:bg-gray-100">Join Our Mission</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold">For Students</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Build credit responsibly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Track financial management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Connect with financial mentors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Get rewards for good habits</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h3 className="text-xl font-bold">For Universities</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Improve student financial success</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Reduce financial stress on campus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Provide valuable financial resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-500 font-bold">•</span>
                    <span>Support inclusive financial education</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-[#f8f7f4]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Our Team</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Meet the passionate individuals behind SmartFin who are dedicated to improving financial literacy for
                college students.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square bg-gray-200">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Alaysia Reape"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Alaysia Reape</h3>
                  <p className="text-gray-500 text-sm">Frontend Developer</p>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square bg-gray-200">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Noor EL-Hawwat"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Noor EL-Hawwat</h3>
                  <p className="text-gray-500 text-sm">Frontend Developer</p>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square bg-gray-200">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Aimalohi Alakhume"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Michael Meng</h3>
                  <p className="text-gray-500 text-sm">Backend Developer</p>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="aspect-square bg-gray-200">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Michael Meng"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">Aimalohi Alakhume</h3>
                  <p className="text-gray-500 text-sm">Backend Developer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-secondary text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to join our mission?</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Be part of the movement to improve financial literacy and empower the next generation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-secondary hover:bg-gray-100">
                  Get Started
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
