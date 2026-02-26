import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createZhipu } from "zhipu-ai-provider";
import { getLangfuse, isLangfuseConfigured } from "@/lib/langfuse";

// ── Provider selection ─────────────────────────────────────────────
// Set AI_PROVIDER="zhipu" to use GLM-5, otherwise defaults to "anthropic" (Claude).
// Each provider reads its own env key:
//   anthropic → ANTHROPIC_API_KEY
//   zhipu     → ZHIPU_API_KEY

type Provider = "zhipu" | "anthropic";

export const AI_PROVIDER: Provider =
  (process.env.AI_PROVIDER as Provider) === "zhipu" ? "zhipu" : "anthropic";

// ── Lazy-initialised clients (created once, reused) ────────────────
let _zhipu: ReturnType<typeof createZhipu> | null = null;
let _anthropic: ReturnType<typeof createAnthropic> | null = null;
let _openai: ReturnType<typeof createOpenAI> | null = null;

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

function getOpenAI() {
  if (!_openai) {
    _openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  }
  return _openai;
}

// ── LangFuse tracing helper ────────────────────────────────────────
// Creates a LangFuse trace for each model invocation.
// Call traceGeneration() before your LLM call, end it after.
// When LangFuse is not configured, returns no-ops.

export function traceGeneration(meta: { tier: string; modelId: string; feature?: string }) {
  if (!isLangfuseConfigured()) {
    return { end: () => {}, error: () => {} };
  }

  const trace = getLangfuse().trace({
    name: `llm-${meta.tier}`,
    metadata: { tier: meta.tier, provider: AI_PROVIDER, feature: meta.feature },
  });
  const generation = trace.generation({
    name: meta.modelId,
    model: meta.modelId,
  });

  return {
    end(usage?: { promptTokens?: number; completionTokens?: number }) {
      generation.end({
        usage: usage ? { input: usage.promptTokens, output: usage.completionTokens } : undefined,
      });
    },
    error(err: unknown) {
      generation.end({ level: "ERROR", statusMessage: String(err) });
    },
  };
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

/** GPT-5.2 for deep research synthesis — best reasoning per dollar. */
export function getDeepResearchModel() {
  return getOpenAI()("gpt-5.2");
}
