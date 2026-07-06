import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createZhipu } from "zhipu-ai-provider";
import { getLangfuse, isLangfuseConfigured } from "@/lib/langfuse";

// ── Provider selection ─────────────────────────────────────────────
// Set AI_PROVIDER="zhipu" to use GLM-5, otherwise defaults to "anthropic" (Claude).
// Each provider reads its own env key:
//   anthropic → ANTHROPIC_API_KEY
//   zhipu     → ZHIPU_API_KEY

type Provider = "zhipu" | "anthropic" | "openai";

export const AI_PROVIDER: Provider =
  (process.env.AI_PROVIDER as Provider) === "zhipu"
    ? "zhipu"
    : (process.env.AI_PROVIDER as Provider) === "openai"
      ? "openai"
      : "anthropic";

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

// DeepSeek is OpenAI-compatible — used only as the small-model FALLBACK (below).
let _deepseek: ReturnType<typeof createOpenAI> | null = null;
function getDeepSeek() {
  if (!_deepseek) {
    _deepseek = createOpenAI({
      baseURL: "https://api.deepseek.com",
      apiKey: process.env.DEEPSEEK_API_KEY!,
    });
  }
  return _deepseek;
}

// ── LangFuse tracing helper ────────────────────────────────────────
// Creates a LangFuse trace for each model invocation.
// Call traceGeneration() before your LLM call, end it after.
// When LangFuse is not configured, returns no-ops.

export function traceGeneration(meta: {
  tier: string;
  modelId: string;
  feature?: string;
  userId?: string;
  projectId?: number;
}) {
  const trace = isLangfuseConfigured()
    ? getLangfuse().trace({
        name: `llm-${meta.tier}`,
        metadata: { tier: meta.tier, provider: AI_PROVIDER, feature: meta.feature },
      })
    : null;
  const generation = trace?.generation({
    name: meta.modelId,
    model: meta.modelId,
  });

  function writeCost(inputTokens: number, outputTokens: number) {
    if (meta.userId && (inputTokens || outputTokens)) {
      import("@/lib/ai/cost-tracker").then(({ trackAIUsage }) => {
        trackAIUsage({
          userId: meta.userId!,
          modelId: meta.modelId,
          feature: meta.feature ?? `llm-${meta.tier}`,
          inputTokens,
          outputTokens,
          projectId: meta.projectId,
        });
      });
    }
  }

  return {
    end(usage?: Record<string, unknown>) {
      const input = (usage?.promptTokens ?? usage?.inputTokens ?? 0) as number;
      const output = (usage?.completionTokens ?? usage?.outputTokens ?? 0) as number;
      generation?.end({
        usage: usage ? { input, output } : undefined,
      });
      writeCost(input, output);
    },
    error(err: unknown) {
      generation?.end({ level: "ERROR", statusMessage: String(err) });
    },
  };
}

// ── Public helpers ─────────────────────────────────────────────────

/** Returns true when the active provider's API key is set. */
export function isAIConfigured(): boolean {
  if (AI_PROVIDER === "anthropic") return !!process.env.ANTHROPIC_API_KEY;
  if (AI_PROVIDER === "openai") return !!process.env.OPENAI_API_KEY;
  return !!process.env.ZHIPU_API_KEY;
}

/** Human-readable name of the env var needed for the active provider. */
export function requiredKeyName(): string {
  if (AI_PROVIDER === "anthropic") return "ANTHROPIC_API_KEY";
  if (AI_PROVIDER === "openai") return "OPENAI_API_KEY";
  return "ZHIPU_API_KEY";
}

// ── Model factories ────────────────────────────────────────────────

/** Main workhorse model for standard AI tasks (drafting, chat, extraction). */
export function getModel() {
  if (AI_PROVIDER === "anthropic") {
    return getAnthropic()("claude-sonnet-4-20250514");
  }
  if (AI_PROVIDER === "openai") {
    return getOpenAI()("gpt-4o");
  }
  return getZhipu()("glm-5");
}

/** Cheap model for simple tasks (classification, formatting, summaries). */
export function getSmallModel() {
  if (AI_PROVIDER === "anthropic") {
    return getAnthropic()("claude-haiku-4-5-20251001");
  }
  if (AI_PROVIDER === "openai") {
    return getOpenAI()("gpt-4o-mini");
  }
  // GLM-4-Flash retired; use GLM-5
  return getZhipu()("glm-5");
}

/**
 * Fast, high-quality model for LATENCY-SENSITIVE structured tasks (video notes). The
 * provider default can be slow (GLM-5 measured ~110s on a lecture transcript), which is
 * unusable for an interactive reading room. Prefer Anthropic Haiku (fast + strong on
 * structured JSON), then DeepSeek V4 Flash, then the provider small model — independent of
 * AI_PROVIDER so a slow default never gates the UI.
 */
export function getFastNotesModel() {
  if (process.env.ANTHROPIC_API_KEY) return getAnthropic()("claude-haiku-4-5-20251001");
  const fallback = getSmallModelFallback();
  if (fallback) return fallback;
  return getSmallModel();
}

/**
 * Funded fallback for the small-model tasks (deep-research extraction/perspectives)
 * when the {@link getSmallModel} provider errors — e.g. a dead or throttled key that
 * would otherwise SILENTLY zero the evidence tables. DeepSeek V4 Flash (cheap, fast)
 * via its OpenAI-compatible /chat/completions endpoint (`.chat()`); overridable with
 * DEEPSEEK_MODEL. Returns null when DEEPSEEK_API_KEY is unset (no fallback available).
 */
export function getSmallModelFallback() {
  if (!process.env.DEEPSEEK_API_KEY) return null;
  return getDeepSeek().chat(process.env.DEEPSEEK_MODEL || "deepseek-v4-flash");
}

/** High-quality model for complex reasoning (deep research, analysis). */
export function getBigModel() {
  if (AI_PROVIDER === "anthropic") {
    return getAnthropic()("claude-sonnet-4-20250514");
  }
  if (AI_PROVIDER === "openai") {
    return getOpenAI()("gpt-4o");
  }
  return getZhipu()("glm-5");
}

/** GPT-5.2 for deep research synthesis — best reasoning per dollar. */
export function getDeepResearchModel() {
  return getOpenAI()("gpt-5.2");
}

/** Claude Sonnet for LaTeX writing tasks — Draft mode, complex edits, TikZ.
 *  This is where users feel the quality difference vs Prism (GPT-5.2). */
export function getLatexWriteModel() {
  if (AI_PROVIDER === "anthropic") {
    return getAnthropic()("claude-sonnet-4-20250514");
  }
  if (AI_PROVIDER === "openai") {
    return getOpenAI()("gpt-4o");
  }
  return getZhipu()("glm-5");
}

/** GPT-5 Nano for mechanical LaTeX tasks — grammar fixes, equation gen, error fixes.
 *  20x cheaper than Haiku ($0.05 vs $1.00 input). Same quality for structured output. */
export function getLatexUtilModel() {
  return getOpenAI()("gpt-5-nano");
}
