import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DemoSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f8f7f4]">
      <div className="container mx-auto px-4 md:px-6">

        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold font-display mb-8">How SmartFin Works</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-lg font-bold">
                1
              </div>
              <div className="text-center">
                <h4 className="font-bold">Sign Up</h4>
                <p className="text-gray-600">Create your account in minutes and get started with 500 bonus points.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-lg font-bold">
                2
              </div>
              <div className="text-center">
                <h4 className="font-bold">Connect Your Accounts</h4>
                <p className="text-gray-600">
                  Link your bank accounts to track spending and build your credit profile.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-lg font-bold">
                3
              </div>
              <div className="text-center">
                <h4 className="font-bold">Earn Rewards</h4>
                <p className="text-gray-600">
                  Complete financial education modules and make smart financial decisions to earn points.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-lg font-bold">
                4
              </div>
              <div className="text-center">
                <h4 className="font-bold">Redeem Points</h4>
                <p className="text-gray-600">
                  Use your points to get gift cards, merchandise, and other rewards.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <Link href="/signup">
              <Button className="bg-primary-500 hover:bg-primary-600 text-white">Try It Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
