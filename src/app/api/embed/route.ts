import { NextResponse } from "next/server";
import { embedPaperChunks } from "@/lib/actions/embeddings";

export async function POST(req: Request) {
  try {
    const { paperId } = await req.json();

    if (!paperId || typeof paperId !== "number") {
      return NextResponse.json({ error: "paperId is required" }, { status: 400 });
    }

    const result = await embedPaperChunks(paperId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Embedding error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "Failed to embed paper", details: message }, { status: 500 });
  }
}
