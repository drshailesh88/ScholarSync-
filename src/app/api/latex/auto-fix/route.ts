import { streamText } from "ai";
import { getLatexUtilModel } from "@/lib/ai/models";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { errorMessage, errorLine, context } = await req.json();

    if (!errorMessage || !errorLine || !context) {
      return new Response("Missing required fields", { status: 400 });
    }

    const result = streamText({
      model: getLatexUtilModel(),
      system: `You are a LaTeX error fixer. Given a compilation error and surrounding context, output ONLY the corrected LaTeX lines. No explanations, no markdown fences. Output the exact lines that should replace the error context.`,
      prompt: `Error: ${errorMessage}\nLine ${errorLine}:\n\n${context}\n\nOutput the corrected version:`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Auto-fix error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
