// ---------------------------------------------------------------------------
// Retraction Watch Integration
// Checks DOIs against the retracted_papers table in PostgreSQL,
// populated from the Retraction Watch dataset via seed-retractions.ts.
// ---------------------------------------------------------------------------

import { db } from "@/lib/db";
import { retractedPapers } from "@/lib/db/schema/editor";
import { eq } from "drizzle-orm";
import type { RetractionInfo } from "./types";

/**
 * Check if a DOI corresponds to a retracted paper.
 * Queries the local `retracted_papers` table (seeded from Retraction Watch CSV).
 * Returns null if not retracted.
 */
export async function checkRetraction(
  doi: string
): Promise<RetractionInfo | null> {
  try {
    const normalizedDoi = doi.toLowerCase().trim();

    const rows = await db
      .select()
      .from(retractedPapers)
      .where(eq(retractedPapers.doi, normalizedDoi))
      .limit(1);

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      doi: row.doi,
      retractionDate: row.retractionDate
        ? row.retractionDate.toISOString().split("T")[0]
        : "Unknown",
      retractionNature: row.retractionNature ?? "Retraction",
      reason: row.reason ?? "No reason provided.",
      title: row.title ?? undefined,
    };
  } catch {
    // If table doesn't exist or query fails, skip silently
    return null;
  }
}
