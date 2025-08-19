import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
    dangerouslyAllowSVG: true, // If you also want to allow SVGs
    unoptimized: true, // Allows images to load without Next.js optimization
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
}

const withNextIntl = createNextIntlPlugin()
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

export default withBundleAnalyzer(withNextIntl(nextConfig))
