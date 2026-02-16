import { streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().max(50000),
      })
    )
    .max(50),
  mode: z.string().optional(),
});

export async function POST(req: Request) {
  const log = logger.withRequestId();

  try {
    // 1. Authentication
    let userId: string;
    try {
      userId = await getCurrentUserId();
    } catch (authError) {
      logger.error("Chat auth failed", authError);
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 }
      );
    }

    // 2. Rate limiting
    const rateLimitResponse = await checkRateLimit(userId, "chat", RATE_LIMITS.ai);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // 3. Input validation
    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      log.warn("Chat input validation failed", {
        userId,
        errors: parsed.error.flatten(),
      });
      return NextResponse.json(
        { error: "Invalid request. Please check your input and try again." },
        { status: 400 }
      );
    }

    const { messages, mode } = parsed.data;

    // 4. AI configuration check
    const { isAIConfigured, getModel } = await import("@/lib/ai/models");

    if (!isAIConfigured()) {
      log.warn("AI service not configured");
      return NextResponse.json(
        { error: "AI service is not configured. Please contact an administrator." },
        { status: 503 }
      );
    }

    const systemPrompt =
      mode === "learn"
        ? "You are a Socratic research tutor. Never give direct answers. Ask probing questions to help the student think critically about their research. Challenge assumptions. Guide them to discover insights themselves."
        : "You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone.";

    const result = streamText({
      model: getModel(),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    log.error("Chat API error", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
