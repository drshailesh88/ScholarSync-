// Next.js instrumentation hook — runs once at server startup
// https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation

export async function register() {
  const { validateEnv } = await import("@/lib/env");
  validateEnv();

  if (typeof process !== "undefined" && process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }

  if (typeof process !== "undefined" && process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

export { captureRequestError as onRequestError } from "@sentry/nextjs";
