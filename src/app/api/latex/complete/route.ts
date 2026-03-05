import { streamText } from "ai";
import { getLatexUtilModel } from "@/lib/ai/models";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { context, currentLine } = await req.json();

    if (!context || !currentLine) {
      return new Response("Missing required fields", { status: 400 });
    }

    const result = streamText({
      model: getLatexUtilModel(),
      system: `You are a LaTeX autocomplete. Complete the current line/expression. Output ONLY the completion text, nothing else. No markdown fences, no explanations.`,
      prompt: `Context:\n${context}\n\nCurrent line: ${currentLine}\n\nComplete:`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Completion error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
