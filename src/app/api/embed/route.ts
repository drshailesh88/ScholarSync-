import { NextResponse } from "next/server";
import { embedPaperChunks } from "@/lib/actions/embeddings";
import { z } from "zod";

const embedRequestSchema = z.object({
  paperId: z.number({ error: "paperId is required" }).int().positive("paperId must be a positive integer"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = embedRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { paperId } = parsed.data;

    const result = await embedPaperChunks(paperId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Embedding error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to embed paper", details: message }, { status: 500 });
  }
}
