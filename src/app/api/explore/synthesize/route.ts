/**
 * POST /api/explore/synthesize
 *
 * Synthesize top search results from the Explore module.
 * Streams a domain-agnostic synthesis with [N] citation markers.
 */

import { NextRequest } from "next/server";
import { streamText } from "ai";
import { getModel, isAIConfigured } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";

const SYSTEM_PROMPT = `You are a research synthesis assistant. Given a set of search results, produce a concise synthesis of the key information across these sources.

Rules:
- Every factual claim must cite the source with [N] markers
- Organize by theme, not by source
- Start with the most authoritative sources (government, major journalism) then community
- Report specific facts, data points, and conclusions from each source
- Note contradictions or conflicting information between sources
- Use clear, accessible English appropriate for an educated reader
- Do NOT introduce information not present in the provided sources
- Do NOT make recommendations — only report what the sources show
- Keep the synthesis to 2-3 paragraphs (~200-300 words)
- End with a brief synthesis statement`;

interface SourceInput {
  title: string;
  url?: string;
  domain?: string;
  authors?: string[];
  snippet?: string;
  abstract?: string;
  journal?: string;
  year?: number;
  publishedAt?: string;
  trustTier?: string;
  sourceLabel?: string;
  platform?: string;
}

function buildSourceContext(sources: SourceInput[]): string {
  return sources
    .map((s, idx) => {
      const num = idx + 1;
      const author =
        s.authors?.slice(0, 3).join(", ") || s.sourceLabel || s.domain || "Unknown";
      const date = s.year ? String(s.year) : s.publishedAt ?? "Unknown date";
      const content = s.abstract || s.snippet || "No content available";
      return `[${num}] ${s.title}
Source: ${author}
Date: ${date}
Domain: ${s.domain || "Unknown"} (${s.trustTier || "other"})
Content: ${content}
---`;
    })
    .join("\n\n");
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getCurrentUserId();
    const rateLimitResponse = await checkRateLimit(userId, "research", RATE_LIMITS.ai);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await req.json();
    const { sources, query } = body;

    if (!sources || !Array.isArray(sources) || sources.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing required field: sources" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing required field: query" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!isAIConfigured()) {
      return new Response(
        JSON.stringify({ error: "AI not configured" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const sourceContext = buildSourceContext(sources.slice(0, 8));

    const result = streamText({
      model: getModel(),
      system: SYSTEM_PROMPT,
      prompt: `User searched for: "${query}"

Synthesize the following ${Math.min(sources.length, 8)} sources:

${sourceContext}`,
      temperature: 0.4,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Explore synthesis error:", error);
    return new Response(
      JSON.stringify({ error: "Synthesis failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
