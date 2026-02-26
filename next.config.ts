import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://api.razorpay.com https://cdn.clerk.io https://*.clerk.accounts.dev",
  "style-src 'self' 'unsafe-inline' https://cdn.clerk.io https://*.clerk.accounts.dev",
  "img-src 'self' data: blob: https://img.clerk.com https://*.clerk.accounts.dev https://*.googleusercontent.com",
  "font-src 'self' data: https://*.clerk.accounts.dev",
  "connect-src 'self' https://api.clerk.io https://*.clerk.accounts.dev https://api.anthropic.com https://api.openai.com https://eutils.ncbi.nlm.nih.gov https://api.semanticscholar.org https://api.openalex.org https://api.copyleaks.com https://checkout.razorpay.com https://lumberjack.razorpay.com https://*.upstash.io https://*.sentry.io https://*.ingest.sentry.io",
  "frame-src https://checkout.razorpay.com https://accounts.clerk.dev https://*.clerk.accounts.dev",
  "worker-src 'self' blob:",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: csp },
  ...(process.env.NODE_ENV === "production"
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  output: "standalone",
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // Upload source maps for better stack traces in Sentry
  silent: !process.env.CI,

  // Automatically tree-shake Sentry logger in production
  disableLogger: true,

  // Hide source maps from the client (security best practice)
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },

  // Tunnel Sentry events through your Next.js server to avoid ad blockers
  tunnelRoute: "/monitoring",
});
