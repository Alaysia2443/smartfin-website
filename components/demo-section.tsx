import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DemoSection() {
  return (
    <section
      className="relative py-16 md:py-24 bg-center bg-cover"
      style={{ backgroundImage: "url('/phone.png')" }}  // adjust path if needed
    >
      {/* overlay improves text contrast */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/60" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">{/* optional header content */}</div>

        <div className="space-y-6 max-w-xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl lg:text-4xl font-bold font-display mb-8">How SmartFin Works</h3>

          {/* Steps */}
          <div className="space-y-8">
            {/* 1 */}
            <Step n={1} title="Sign Up">
              Create your account in minutes and get started with 500 bonus points.
            </Step>

            {/* 2 */}
            <Step n={2} title="Connect Your Accounts">
              Link your bank accounts to track spending and build your credit profile.
            </Step>

            {/* 3 */}
            <Step n={3} title="Earn Rewards">
              Complete financial education modules and make smart financial decisions to earn points.
            </Step>

            {/* 4 */}
            <Step n={4} title="Redeem Points">
              Use your points to get gift cards, merchandise, and other rewards.
            </Step>
          </div>

          {/* CTA */}
          <div className="pt-6">
            <Link href="/signup">
              <Button className="bg-primary-500 hover:bg-primary-600 text-white">Try It Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── tiny helper component to keep markup tidy ── */
function Step({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-lg font-bold">
        {n}
      </div>
      <div className="text-center">
        <h4 className="font-bold">{title}</h4>
        <p className="text-gray-700 dark:text-gray-200">{children}</p>
      </div>
    </div>
  )
}
