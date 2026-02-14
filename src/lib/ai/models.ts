import { createAnthropic } from "@ai-sdk/anthropic";
import { createZhipu } from "zhipu-ai-provider";

// ── Provider selection ─────────────────────────────────────────────
// Set AI_PROVIDER="anthropic" to use Claude, otherwise defaults to "zhipu" (GLM-5).
// Each provider reads its own env key:
//   zhipu     → ZHIPU_API_KEY
//   anthropic → ANTHROPIC_API_KEY

type Provider = "zhipu" | "anthropic";

export const AI_PROVIDER: Provider =
  (process.env.AI_PROVIDER as Provider) === "anthropic" ? "anthropic" : "zhipu";

// ── Lazy-initialised clients (created once, reused) ────────────────
let _zhipu: ReturnType<typeof createZhipu> | null = null;
let _anthropic: ReturnType<typeof createAnthropic> | null = null;

function getZhipu() {
  if (!_zhipu) {
    _zhipu = createZhipu({ apiKey: process.env.ZHIPU_API_KEY! });
  }
  return _zhipu;
}

function getAnthropic() {
  if (!_anthropic) {
    _anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  }
  return _anthropic;
}

// ── Public helpers ─────────────────────────────────────────────────

/** Returns true when the active provider's API key is set. */
export function isAIConfigured(): boolean {
  if (AI_PROVIDER === "anthropic") return !!process.env.ANTHROPIC_API_KEY;
  return !!process.env.ZHIPU_API_KEY;
}

/** Human-readable name of the env var needed for the active provider. */
export function requiredKeyName(): string {
  return AI_PROVIDER === "anthropic" ? "ANTHROPIC_API_KEY" : "ZHIPU_API_KEY";
}

// ── Model factories ────────────────────────────────────────────────

/** Main workhorse model for standard AI tasks (drafting, chat, extraction). */
export function getModel() {
  if (AI_PROVIDER === "anthropic") {
    return getAnthropic()("claude-sonnet-4-20250514");
  }
  return getZhipu()("glm-5");
}

/** Cheap model for simple tasks (classification, formatting, summaries). */
export function getSmallModel() {
  if (AI_PROVIDER === "anthropic") {
    return getAnthropic()("claude-haiku-4-5-20251001");
  }
  // GLM-4-flash is Z.AI's cost-efficient model
  return getZhipu()("glm-4-flash");
}

/** High-quality model for complex reasoning (deep research, analysis). */
export function getBigModel() {
  if (AI_PROVIDER === "anthropic") {
    return getAnthropic()("claude-sonnet-4-20250514");
  }
  return getZhipu()("glm-5");
}
