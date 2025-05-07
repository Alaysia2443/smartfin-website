import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DemoSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      
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
