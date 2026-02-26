import { Langfuse } from "langfuse";

// ── LangFuse client (server-side only) ──────────────────────────────
// Lazy singleton — created once, reused across requests.
// Used for manual tracing of LLM calls, embedding calls, and custom events.

let _langfuse: Langfuse | null = null;

export function getLangfuse(): Langfuse {
  if (!_langfuse) {
    _langfuse = new Langfuse({
      publicKey: process.env.LANGFUSE_PUBLIC_KEY!,
      secretKey: process.env.LANGFUSE_SECRET_KEY!,
      baseUrl: process.env.LANGFUSE_BASE_URL ?? "https://cloud.langfuse.com",
    });
  }
  return _langfuse;
}

/**
 * Check if LangFuse is configured (both keys present).
 * When false, tracing calls are silently skipped — zero overhead.
 */
export function isLangfuseConfigured(): boolean {
  return !!process.env.LANGFUSE_PUBLIC_KEY && !!process.env.LANGFUSE_SECRET_KEY;
}
