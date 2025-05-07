import { useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768        // < 768 px = “mobile”

export function useIsMobile(): boolean {
  // Default to false so there’s no hydration mismatch in Next.js
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Guard against SSR / Node
    if (typeof window === "undefined") return

    const query = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`
    const mediaQuery = window.matchMedia(query)

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches)

    // Set initial value
    handleChange(mediaQuery)

    // Add/remove listener (Safari <14 uses addListener/removeListener)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      // @ts-ignore — legacy fallback
      mediaQuery.addListener(handleChange)
      // @ts-ignore
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return isMobile
}
