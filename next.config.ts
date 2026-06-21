import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for OpenNext/Cloudflare Workers deployment
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

  // Next 16 builds with Turbopack by default; an explicit (empty) turbopack
  // config silences the "webpack config without turbopack config" build error.
  // The webpack config below still applies to the OpenNext/Cloudflare build.
  turbopack: {},

  // Sentry integration via @sentry/nextjs withSentryConfig wrapper
  // (added below if SENTRY_AUTH_TOKEN is set)

  webpack: (config, { isServer }) => {
    // Ignore cloudflare:workers scheme in webpack (only resolved at Cloudflare Workers runtime)
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("cloudflare:workers");
    }
    return config;
  },
};

export default nextConfig;
