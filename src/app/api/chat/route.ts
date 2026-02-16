import { streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { getGuideSystemPrompt, getDefaultGuidePrompt } from "@/lib/ai/prompts/guide";
import { getDraftSystemPrompt, getDefaultDraftPrompt } from "@/lib/ai/prompts/draft";
import type { GuideContext } from "@/types/guide";
import type { DraftContext } from "@/types/draft";

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
  guideContext: z.record(z.string(), z.unknown()).optional(),
  draftContext: z.record(z.string(), z.unknown()).optional(),
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

    const { messages, mode, guideContext, draftContext } = parsed.data;

    // 4. AI configuration check
    const { isAIConfigured, getModel } = await import("@/lib/ai/models");

    if (!isAIConfigured()) {
      log.warn("AI service not configured");
      return NextResponse.json(
        { error: "AI service is not configured. Please contact an administrator." },
        { status: 503 }
      );
    }

    let systemPrompt: string;

    if (mode === "learn") {
      // Guided Mode — Socratic academic writing tutor
      if (guideContext?.documentType && guideContext?.stage) {
        const ctx: GuideContext = {
          documentType: guideContext.documentType as GuideContext["documentType"],
          stage: guideContext.stage as GuideContext["stage"],
          targetJournal: guideContext.targetJournal as string | undefined,
          studyType: guideContext.studyType as string | undefined,
          projectTitle: guideContext.projectTitle as string | undefined,
          completedChecklist: guideContext.completedChecklist as string[] | undefined,
        };
        systemPrompt = getGuideSystemPrompt(ctx);
      } else {
        systemPrompt = getDefaultGuidePrompt();
      }
    } else if (mode === "draft") {
      // Draft Mode — intensity-based writing co-pilot
      if (draftContext?.intensity) {
        const ctx: DraftContext = {
          intensity: draftContext.intensity as DraftContext["intensity"],
          documentType: draftContext.documentType as string | undefined,
          currentSection: draftContext.currentSection as string | undefined,
          targetJournal: draftContext.targetJournal as string | undefined,
          projectTitle: draftContext.projectTitle as string | undefined,
          scholarRules: draftContext.scholarRules as DraftContext["scholarRules"],
          surroundingText: draftContext.surroundingText as string | undefined,
        };
        systemPrompt = getDraftSystemPrompt(ctx);
      } else {
        systemPrompt = getDefaultDraftPrompt();
      }
    } else {
      // Standard assistant mode
      systemPrompt =
        "You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone.";
    }

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
