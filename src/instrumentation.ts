// Next.js instrumentation hook — runs once at server startup
// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
//
// For Vinext/Cloudflare Workers builds, server-side Sentry is initialized in
// worker/index.ts via @sentry/cloudflare instead of here.

export async function register() {
  const { validateEnv } = await import("@/lib/env");
  validateEnv();

  // Only load @sentry/nextjs server config when running under Next.js (not Vinext)
  if (typeof process !== "undefined" && process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (typeof process !== "undefined" && process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// Re-export for Next.js builds; Vinext builds will tree-shake this away
export { captureRequestError as onRequestError } from "@sentry/nextjs";
