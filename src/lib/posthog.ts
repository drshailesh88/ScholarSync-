import { PostHog } from "posthog-node";

// ── PostHog server-side client ──────────────────────────────────────
// Lazy singleton for server-side event tracking (API routes, server actions).
// Client-side tracking is handled separately via PostHogProvider in layout.

let _posthog: PostHog | null = null;

export function getPostHog(): PostHog {
  if (!_posthog) {
    _posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      // Flush events in batches — don't block request responses
      flushAt: 10,
      flushInterval: 5000,
    });
  }
  return _posthog;
}

export function isPostHogConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_POSTHOG_KEY;
}
