import { generateText } from "ai";
import { NextResponse } from "next/server";
import { getPrecisionEditPrompt } from "@/lib/ai/prompts/draft";
import type { PrecisionEditRequest, PrecisionEditResponse } from "@/types/draft";

export async function POST(req: Request) {
  const { isAIConfigured, requiredKeyName, getModel } = await import("@/lib/ai/models");

  if (!isAIConfigured()) {
    return NextResponse.json(
      { error: `API key not configured. Add ${requiredKeyName()} to .env.local to enable AI.` },
      { status: 503 }
    );
  }

  try {
    const body = (await req.json()) as PrecisionEditRequest;

    if (!body.action || !body.selectedText) {
      return NextResponse.json(
        { error: "Missing required fields: action, selectedText" },
        { status: 400 }
      );
    }

    const { system, user } = getPrecisionEditPrompt(body);

    const result = await generateText({
      model: getModel(),
      system,
      messages: [{ role: "user", content: user }],
    });

    // Parse the JSON response from the model
    const text = result.text.trim();

    // Extract JSON from the response (handle markdown code blocks)
    let jsonStr = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonStr = jsonMatch[1].trim();
    }

    let parsed: { suggestedText: string; explanation: string };
    try {
      parsed = JSON.parse(jsonStr);
    } catch {
      // If JSON parsing fails, treat the whole response as the suggestion
      parsed = {
        suggestedText: text,
        explanation: "Edit applied.",
      };
    }

    const response: PrecisionEditResponse = {
      originalText: body.selectedText,
      suggestedText: parsed.suggestedText,
      explanation: parsed.explanation,
      action: body.action,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Precision edit API error:", error);
    return NextResponse.json(
      { error: "Precision edit failed. Please try again." },
      { status: 500 }
    );
  }
}
