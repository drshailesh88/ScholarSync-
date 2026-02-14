import { streamText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { isAIConfigured, requiredKeyName, getModel } = await import("@/lib/ai/models");

  if (!isAIConfigured()) {
    return NextResponse.json(
      { error: `API key not configured. Add ${requiredKeyName()} to .env.local to enable AI chat.` },
      { status: 503 }
    );
  }

  try {
    const { messages, mode } = await req.json();

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
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Chat failed. Please try again." },
      { status: 500 }
    );
  }
}
