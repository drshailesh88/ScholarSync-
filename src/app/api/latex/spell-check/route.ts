import { NextResponse } from "next/server";
import { checkLatexSpelling } from "@/lib/latex/spell-check";

/**
 * POST /api/latex/spell-check
 * Spell check LaTeX content and return errors with suggestions.
 */
export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid content field" },
        { status: 400 }
      );
    }

    // Check spelling (server-side with nspell + medical dictionary)
    const errors = await checkLatexSpelling(content);

    return NextResponse.json({ errors });
  } catch (error) {
    console.error("Spell check error:", error);
    return NextResponse.json(
      { error: "Spell check failed" },
      { status: 500 }
    );
  }
}
