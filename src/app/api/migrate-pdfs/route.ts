import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { papers } from "@/lib/db/schema";
import { isNotNull, or } from "drizzle-orm";
import { queuePdfProcessing } from "@/lib/actions/pdf-pipeline";

/**
 * POST /api/migrate-pdfs
 * Triggers PDF fetch + processing for all existing papers that have
 * a DOI or open_access_url but no full_text_plain.
 *
 * This is a one-time migration endpoint. Protect it or remove after use.
 */
export async function POST(req: Request) {
  // Simple auth check — replace with proper admin auth
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.MIGRATION_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const eligiblePapers = await db
    .select({ id: papers.id, doi: papers.doi })
    .from(papers)
    .where(or(isNotNull(papers.doi), isNotNull(papers.open_access_url)))
    .limit(100); // Process in batches of 100

  let queued = 0;
  for (const paper of eligiblePapers) {
    queuePdfProcessing(paper.id);
    queued++;
    // Stagger to avoid rate limits on external APIs
    await new Promise((r) => setTimeout(r, 2000));
  }

  return NextResponse.json({
    message: `Queued ${queued} papers for PDF processing`,
    total: eligiblePapers.length,
  });
}
