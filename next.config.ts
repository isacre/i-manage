import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
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
};

const withNextIntl = createNextIntlPlugin();


export default withNextIntl(nextConfig);
