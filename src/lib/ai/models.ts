import { createAnthropic } from "@ai-sdk/anthropic";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

/** Main workhorse model for standard AI tasks (drafting, chat, extraction). */
export function getModel() {
  return anthropic("claude-sonnet-4-20250514");
}

/** Cheap model for simple tasks (classification, formatting, summaries). */
export function getSmallModel() {
  return anthropic("claude-haiku-4-5-20251001");
}

/** High-quality model for complex reasoning (deep research, analysis). */
export function getBigModel() {
  return anthropic("claude-sonnet-4-20250514");
}
