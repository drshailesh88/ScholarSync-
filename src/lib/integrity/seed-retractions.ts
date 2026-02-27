// ---------------------------------------------------------------------------
// Seed Script — Retraction Watch Data
// ---------------------------------------------------------------------------
//
// Retraction Watch maintains a comprehensive CSV of ~63,000+ retracted papers
// updated daily via Crossref. To seed the local database:
//
// 1. Clone the Retraction Watch dataset (~10 MB CSV):
//      git clone https://gitlab.com/crossref/retraction-watch-data /tmp/retraction-watch-data
//
// 2. Ensure the DB is migrated (retracted_papers table must exist):
//      npm run db:push
//
// 3. Run the seed:
//      npm run db:seed-retractions -- /tmp/retraction-watch-data/retraction_watch.csv
//
// 4. Verify (optional):
//      psql $DATABASE_URL -c "SELECT count(*) FROM retracted_papers;"
//
// CSV columns used: OriginalPaperDOI, RetractionDOI, RetractionDate,
//   RetractionNature, Reason, OriginalPaperDate, Journal, Title
//
// Re-running is safe — existing rows are upserted (updated on conflict).
// ---------------------------------------------------------------------------

import fs from "fs";
import Papa from "papaparse";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { retractedPapers } from "@/lib/db/schema/editor";

interface RetractionRow {
  OriginalPaperDOI?: string;
  RetractionDOI?: string;
  RetractionDate?: string;
  RetractionNature?: string;
  Reason?: string;
  OriginalPaperDate?: string;
  Journal?: string;
  Title?: string;
}

function parseDate(dateStr: string | undefined): Date | null {
  if (!dateStr || dateStr.trim() === "") return null;
  const d = new Date(dateStr.trim());
  return isNaN(d.getTime()) ? null : d;
}

async function seed(csvPath: string) {
  console.log(`Reading CSV from: ${csvPath}`);

  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const { data, errors } = Papa.parse<RetractionRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length > 0) {
    console.warn(`CSV parse warnings: ${errors.length} errors`);
  }

  console.log(`Parsed ${data.length} rows from CSV`);

  // Filter rows that have a DOI
  const validRows = data.filter(
    (row) => row.OriginalPaperDOI && row.OriginalPaperDOI.trim().length > 0
  );

  console.log(`${validRows.length} rows have valid DOIs`);

  // Insert in batches of 500
  const batchSize = 500;
  let inserted = 0;

  for (let i = 0; i < validRows.length; i += batchSize) {
    const batch = validRows.slice(i, i + batchSize);
    const values = batch.map((row) => ({
      doi: row.OriginalPaperDOI!.toLowerCase().trim(),
      retractionDate: parseDate(row.RetractionDate),
      retractionNature: row.RetractionNature?.trim() ?? null,
      reason: row.Reason?.trim() ?? null,
      originalPaperDate: parseDate(row.OriginalPaperDate),
      journal: row.Journal?.trim() ?? null,
      title: row.Title?.trim() ?? null,
    }));

    try {
      await db
        .insert(retractedPapers)
        .values(values)
        .onConflictDoUpdate({
          target: retractedPapers.doi,
          set: {
            retractionDate: sql`excluded.retraction_date`,
            retractionNature: sql`excluded.retraction_nature`,
            reason: sql`excluded.reason`,
            originalPaperDate: sql`excluded.original_paper_date`,
            journal: sql`excluded.journal`,
            title: sql`excluded.title`,
          },
        });
      inserted += batch.length;
      if (inserted % 5000 === 0) {
        console.log(`  Inserted ${inserted}/${validRows.length}...`);
      }
    } catch (err) {
      console.error(`Batch insert failed at offset ${i}:`, err);
    }
  }

  console.log(`Seeding complete. ${inserted} retracted papers inserted.`);
  process.exit(0);
}

// Run from CLI
const csvPath = process.argv[2];
if (!csvPath) {
  console.error(
    "Usage: npx tsx src/lib/integrity/seed-retractions.ts <path-to-csv>"
  );
  process.exit(1);
}

seed(csvPath).catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
