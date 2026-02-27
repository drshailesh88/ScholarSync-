/**
 * AI Cost Tracker
 *
 * Maps model IDs to per-token USD pricing and writes cost events
 * to the `usage_events` table for spend analytics.
 */

import { db } from "@/lib/db";
import { usageEvents } from "@/lib/db/schema/billing";

interface ModelPricing {
  provider: string;
  inputPer1M: number;
  outputPer1M: number;
}

const MODEL_PRICING: Record<string, ModelPricing> = {
  // Anthropic
  "claude-sonnet-4-20250514": {
    provider: "anthropic",
    inputPer1M: 3.0,
    outputPer1M: 15.0,
  },
  "claude-haiku-4-5-20251001": {
    provider: "anthropic",
    inputPer1M: 0.8,
    outputPer1M: 4.0,
  },
  // OpenAI
  "gpt-5.2": {
    provider: "openai",
    inputPer1M: 2.0,
    outputPer1M: 8.0,
  },
  "text-embedding-3-small": {
    provider: "openai",
    inputPer1M: 0.02,
    outputPer1M: 0,
  },
  // Zhipu
  "glm-5": {
    provider: "zhipu",
    inputPer1M: 1.0,
    outputPer1M: 1.0,
  },
  "glm-4-flash": {
    provider: "zhipu",
    inputPer1M: 0.1,
    outputPer1M: 0.1,
  },
};

export function calculateCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number
): number {
  const pricing = MODEL_PRICING[modelId];
  if (!pricing) return 0;
  return (
    (inputTokens / 1_000_000) * pricing.inputPer1M +
    (outputTokens / 1_000_000) * pricing.outputPer1M
  );
}

export function getProvider(modelId: string): string {
  return MODEL_PRICING[modelId]?.provider ?? "unknown";
}

/**
 * Fire-and-forget: writes a usage event row.
 * Never throws — errors are silently logged.
 */
export async function trackAIUsage(params: {
  userId: string;
  modelId: string;
  feature: string;
  inputTokens: number;
  outputTokens: number;
  projectId?: number;
}): Promise<void> {
  try {
    const cost = calculateCost(
      params.modelId,
      params.inputTokens,
      params.outputTokens
    );
    const totalTokens = params.inputTokens + params.outputTokens;

    await db.insert(usageEvents).values({
      userId: params.userId,
      eventType: params.feature,
      tokensUsed: totalTokens,
      costUsd: cost,
      model: params.modelId,
      projectId: params.projectId ?? null,
      metadata: {
        inputTokens: params.inputTokens,
        outputTokens: params.outputTokens,
        provider: getProvider(params.modelId),
      },
    });
  } catch (err) {
    console.error("[cost-tracker] Failed to write usage event:", err);
  }
}
