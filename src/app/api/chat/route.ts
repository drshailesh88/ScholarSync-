import { streamText } from "ai";
import { NextResponse } from "next/server";
import { getGuideSystemPrompt, getDefaultGuidePrompt } from "@/lib/ai/prompts/guide";
import type { GuideContext } from "@/types/guide";

export async function POST(req: Request) {
  const { isAIConfigured, requiredKeyName, getModel } = await import("@/lib/ai/models");

  if (!isAIConfigured()) {
    return NextResponse.json(
      { error: `API key not configured. Add ${requiredKeyName()} to .env.local to enable AI chat.` },
      { status: 503 }
    );
  }

  try {
    const { messages, mode, guideContext } = await req.json();

    let systemPrompt: string;

    if (mode === "learn") {
      // Guided Mode — Socratic academic writing tutor
      if (guideContext?.documentType && guideContext?.stage) {
        // Full guide context available: document type + stage
        const ctx: GuideContext = {
          documentType: guideContext.documentType,
          stage: guideContext.stage,
          targetJournal: guideContext.targetJournal,
          studyType: guideContext.studyType,
          projectTitle: guideContext.projectTitle,
          completedChecklist: guideContext.completedChecklist,
        };
        systemPrompt = getGuideSystemPrompt(ctx);
      } else {
        // No context yet — use onboarding prompt
        systemPrompt = getDefaultGuidePrompt();
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
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Chat failed. Please try again." },
      { status: 500 }
    );
  }
}
