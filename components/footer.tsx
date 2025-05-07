import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-white font-display">
              SmartFin
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              Financially empowering every student in America through accessible tools and education.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/rewards" className="text-gray-400 hover:text-white transition-colors">
                  Rewards
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
              <a
  href="https://www.linkedin.com/feed/update/urn:li:activity:7309646688321753089/"
  className="text-gray-400 hover:text-white transition-colors"
  target="_blank"          /* optional: opens link in new tab */
  rel="noopener noreferrer"
>
  Blog
</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
              <a
  href="https://venmo.com/legal/crypto-terms/"
  className="text-gray-400 hover:text-white transition-colors"
  target="_blank"          /* optional: opens link in new tab */
  rel="noopener noreferrer"
>
  Terms of Service
</a>
              </li>
              <li>
              <a
  href="https://venmo.com/legal/us-privacy-policy/"
  className="text-gray-400 hover:text-white transition-colors"
  target="_blank"          /* optional: opens link in new tab */
  rel="noopener noreferrer"
>
  Privacy Policy
</a>
              </li>
              <li>
              <a
  href="https://venmo.com/resources/cookies/"
  className="text-gray-400 hover:text-white transition-colors"
  target="_blank"          /* optional: opens link in new tab */
  rel="noopener noreferrer"
>
  Cookie Policy
</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
            <Link
  href="https://www.instagram.com/venmo/?hl=en"
  target="_blank"            // optional – remove if you want same‑tab
  rel="noopener noreferrer"  // security best‑practice when using _blank
  className="text-gray-400 hover:text-white transition-colors"
>
  <Instagram className="h-6 w-6" />
  <span className="sr-only">Instagram</span>
</Link>
<Link
  href="https://x.com/Venmo?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
  target="_blank"            // optional – remove if you want same‑tab
  rel="noopener noreferrer"  // security best‑practice when using _blank
  className="text-gray-400 hover:text-white transition-colors"
>
  <Twitter className="h-6 w-6" />
  <span className="sr-only">Twiiter</span>
</Link>
<Link
  href="https://www.facebook.com/venmo/"
  target="_blank"            // optional – remove if you want same‑tab
  rel="noopener noreferrer"  // security best‑practice when using _blank
  className="text-gray-400 hover:text-white transition-colors"
>
  <Facebook className="h-6 w-6" />
  <span className="sr-only">Facebook</span>
</Link>
<Link
  href="https://www.linkedin.com/company/venmo/"
  target="_blank"            // optional – remove if you want same‑tab
  rel="noopener noreferrer"  // security best‑practice when using _blank
  className="text-gray-400 hover:text-white transition-colors"
>
  <Linkedin className="h-6 w-6" />
  <span className="sr-only">Linkedin</span>
</Link>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">Subscribe to our newsletter</p>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-sm bg-gray-700 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500 w-full"
                />
                <button className="bg-primary-500 text-white px-3 py-2 rounded-r-md text-sm">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} SmartFin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
