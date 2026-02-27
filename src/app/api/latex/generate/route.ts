import { streamText } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserId } from "@/lib/auth";
import { getLatexWriteModel, getLatexUtilModel } from "@/lib/ai/models";

const generateSchema = z.object({
  command: z.enum(["table", "figure", "equation", "tikz", "fix", "template"]),
  description: z.string().max(2000),
  context: z.string().max(5000).optional(),
  errorMessage: z.string().max(2000).optional(),
});

// Command -> model routing per design doc
const COMMAND_MODELS: Record<string, "write" | "util"> = {
  table: "write",     // Domain knowledge needed
  figure: "write",    // Needs understanding of content
  equation: "util",   // Pattern-based, any model works
  tikz: "write",      // Complex spatial reasoning
  fix: "util",        // Mechanical error fix
  template: "util",   // Structured output
};

const COMMAND_PROMPTS: Record<string, string> = {
  table: `Generate a LaTeX table based on the user's description. Use \\begin{table}[htbp] with \\centering, \\caption{}, and \\label{tab:}. Use booktabs (\\toprule, \\midrule, \\bottomrule) for professional styling. Return only LaTeX code.`,

  figure: `Generate a LaTeX figure environment based on the user's description. Use \\begin{figure}[htbp] with \\centering, \\caption{}, and \\label{fig:}. Use \\includegraphics with appropriate width. Return only LaTeX code.`,

  equation: `Generate a LaTeX equation based on the user's description. Use \\begin{equation} with \\label{eq:} for numbered equations, or \\begin{equation*} for unnumbered. Use proper mathematical notation. Return only LaTeX code.`,

  tikz: `Generate a TikZ diagram based on the user's description. Use \\begin{tikzpicture} with appropriate libraries. Make it clean and publication-ready. Include \\usepackage{tikz} comment if special libraries are needed. Return only LaTeX code.`,

  fix: `The user has a LaTeX compilation error. Analyze the error message and the surrounding code, then return the FIXED version of the code. Return only the corrected LaTeX code, no explanations.`,

  template: `Generate a LaTeX template section based on the user's description. Follow standard academic conventions. Return only LaTeX code.`,
};

export async function POST(req: Request) {
  try {
    await getCurrentUserId();
    const body = await req.json();
    const parsed = generateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const { command, description, context, errorMessage } = parsed.data;

    const modelType = COMMAND_MODELS[command] ?? "util";
    const model = modelType === "write" ? getLatexWriteModel() : getLatexUtilModel();

    const systemPrompt = `You are an expert LaTeX author and typesetter. ${COMMAND_PROMPTS[command]}

Rules:
- Return ONLY valid LaTeX code
- No markdown code fences, no explanations
- Use standard packages only
- Follow academic typesetting conventions`;

    let userPrompt = description;
    if (context) {
      userPrompt = `Current document context:\n${context}\n\nRequest: ${description}`;
    }
    if (errorMessage && command === "fix") {
      userPrompt = `Error message: ${errorMessage}\n\nCode with error:\n${description}`;
    }

    const result = streamText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
    });

    return result.toTextStreamResponse();
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
