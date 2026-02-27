import type { NextConfig } from "next";

// CSP headers → src/middleware.ts (works with both Next.js and Vinext)
// Sentry source maps → @sentry/vite-plugin in vite.config.ts
// Server-side Sentry → @sentry/cloudflare in worker/index.ts
// output: "standalone" removed (not needed for Workers, Next.js fallback still works)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
