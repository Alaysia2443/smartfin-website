import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DemoSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">See SmartFin in Action</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Watch how SmartFin helps students build credit, track spending, and earn rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <p className="text-gray-500">Click to watch demo video</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-display">How SmartFin Works</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold">Sign Up</h4>
                  <p className="text-gray-600">Create your account in minutes and get started with 500 bonus points.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold">Connect Your Accounts</h4>
                  <p className="text-gray-600">
                    Link your bank accounts to track spending and build your credit profile.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold">Earn Rewards</h4>
                  <p className="text-gray-600">
                    Complete financial education modules and make smart financial decisions to earn points.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-bold">Redeem Points</h4>
                  <p className="text-gray-600">Use your points to get gift cards, merchandise, and other rewards.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/signup">
                <Button className="bg-primary-500 hover:bg-primary-600 text-white">Try It Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
