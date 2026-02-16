import { streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1, "Message content must not be empty"),
      })
    )
    .min(1, "At least one message is required")
    .max(100, "Too many messages"),
  mode: z.enum(["learn", "assist", "notebook"]).optional().default("assist"),
});

export async function POST(req: Request) {
  const { isAIConfigured, requiredKeyName, getModel } = await import("@/lib/ai/models");

  if (!isAIConfigured()) {
    return NextResponse.json(
      { error: `API key not configured. Add ${requiredKeyName()} to .env.local to enable AI chat.` },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const parsed = chatRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { messages, mode } = parsed.data;

    const systemPromptMap: Record<string, string> = {
      learn: "You are a Socratic research tutor. Never give direct answers. Ask probing questions to help the student think critically about their research. Challenge assumptions. Guide them to discover insights themselves.",
      notebook: "You are ScholarSync, an AI research assistant in Notebook mode. Help users analyze, compare, and synthesize information from their uploaded research papers. Be precise, maintain academic tone, and help with literature review tasks.",
      assist: "You are ScholarSync's AI research assistant for medical students. Help with academic writing, research questions, citations, and paper analysis. Be precise, cite sources when possible, maintain academic tone.",
    };
    const systemPrompt = systemPromptMap[mode] || systemPromptMap.assist;

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
