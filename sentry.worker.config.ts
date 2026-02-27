// Sentry configuration for Cloudflare Workers runtime.
// Replaces sentry.server.config.ts and sentry.edge.config.ts for Vinext builds.
// Import this in worker/index.ts when ready to enable server-side error tracking.

import * as Sentry from "@sentry/cloudflare";

export function initSentry(env: Record<string, unknown>) {
  Sentry.init({
    dsn: (env.SENTRY_DSN as string) || undefined,
    tracesSampleRate: 0.1,
    environment: (env.ENVIRONMENT as string) || "production",
  });
}

export { Sentry };
