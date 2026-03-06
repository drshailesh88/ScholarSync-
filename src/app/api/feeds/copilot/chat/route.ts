/**
 * POST /api/feeds/copilot/chat
 *
 * Streaming AI chat about a feed article.
 * Sends the article context + conversation history, returns a streamed response.
 */
import { NextRequest } from "next/server";
import { streamText } from "ai";
import { getModel, isAIConfigured, traceGeneration } from "@/lib/ai/models";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import {
  resolveArticleSource,
  type ArticleInput,
} from "@/lib/feeds/copilot-source-resolver";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const inputSchema = z.object({
  article: z.object({
    title: z.string().min(1),
    authors: z.string().nullable(),
    abstractSnippet: z.string().nullable(),
    doi: z.string().nullable(),
    pubmedId: z.string().nullable(),
    journal: z.string().nullable(),
    volume: z.string().nullable(),
    issue: z.string().nullable(),
    publishedAt: z.string().nullable(),
    link: z.string().nullable(),
  }),
  messages: z.array(messageSchema),
  question: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch {
      return new Response(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const rateLimitResponse = await checkRateLimit(
      userId,
      "research",
      RATE_LIMITS.ai
    );
    if (rateLimitResponse) return rateLimitResponse;

    if (!isAIConfigured()) {
      return new Response(
        JSON.stringify({ error: "AI not configured" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const parsed = inputSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid input",
          details: parsed.error.flatten(),
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { article, messages, question } = parsed.data;

    // Resolve source material (cached on client — only first call is slow)
    const source = await resolveArticleSource(article as ArticleInput);

    // Build conversation with context
    const conversationMessages = [
      ...messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      {
        role: "user" as const,
        content: question,
      },
    ];

    const trace = traceGeneration({
      tier: "standard",
      modelId: "claude-sonnet-4-20250514",
      feature: "feed-copilot-chat",
      userId,
    });

    const result = streamText({
      model: getModel(),
      system: `${source.systemPrompt}\n\nARTICLE CONTEXT:\n${source.context}`,
      messages: conversationMessages,
      temperature: 0.3,
      onFinish: ({ usage }) => {
        trace.end(usage);
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Feed copilot chat error:", error);
    return new Response(JSON.stringify({ error: "Chat failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
