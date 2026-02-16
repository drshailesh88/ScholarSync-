/**
 * Script to download and process Scimago Journal Rankings (SJR) data
 * for the Medicine subject area (area code 2700).
 *
 * Usage: npx tsx scripts/fetch-scimago.ts
 *
 * Downloads the semicolon-delimited CSV from Scimago, extracts the columns
 * we need, normalizes journal titles, and saves as compact JSON.
 *
 * If the download fails (e.g. blocked by Cloudflare), the script will
 * exit with an error message. In that case, the bundled fallback at
 * src/data/scimago-medicine-2023.json should be used instead.
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { get } from "node:https";

interface ScimagoJournal {
  title: string; // normalized
  titleOriginal: string; // original case
  quartile: "Q1" | "Q2" | "Q3" | "Q4" | null;
  citesPerDoc2y: number; // impact factor proxy
  sjr: number;
  hIndex: number;
}

const SCIMAGO_URL =
  "https://www.scimagojr.com/journalrank.php?area=2700&out=xls";
const OUTPUT_PATH = join(
  __dirname,
  "..",
  "src",
  "data",
  "scimago-medicine-2023.json",
);

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/^the\s+/, "")
    .replace(/\s+/g, " ");
}

function parseQuartile(val: string): ScimagoJournal["quartile"] {
  const trimmed = val.trim().toUpperCase();
  if (trimmed === "Q1" || trimmed === "Q2" || trimmed === "Q3" || trimmed === "Q4") {
    return trimmed;
  }
  return null;
}

function parseNumber(val: string): number {
  const num = parseFloat(val.replace(",", ".").trim());
  return isNaN(num) ? 0 : num;
}

function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      // Follow redirects
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve, reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
      res.on("error", reject);
    }).on("error", reject);
  });
}

function parseSemicolonCsv(raw: string): ScimagoJournal[] {
  const lines = raw.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    throw new Error("CSV has fewer than 2 lines — likely not valid data");
  }

  // Parse header to find column indices
  const header = lines[0].split(";").map((h) => h.trim().toLowerCase());

  const titleIdx = header.findIndex((h) => h === "title");
  const quartileIdx = header.findIndex((h) => h.includes("best quartile"));
  const citesIdx = header.findIndex(
    (h) => h.includes("cites / doc") || h.includes("cites per doc"),
  );
  const sjrIdx = header.findIndex(
    (h) => h === "sjr" || h.startsWith("sjr"),
  );
  const hIdx = header.findIndex((h) => h === "h index" || h === "hindex");

  if (titleIdx === -1) {
    throw new Error(
      `Could not find 'Title' column. Headers: ${header.join(", ")}`,
    );
  }

  const journals: ScimagoJournal[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(";");
    const titleOriginal = (cols[titleIdx] || "").trim();
    if (!titleOriginal) continue;

    journals.push({
      title: normalizeTitle(titleOriginal),
      titleOriginal,
      quartile: quartileIdx !== -1 ? parseQuartile(cols[quartileIdx] || "") : null,
      citesPerDoc2y: citesIdx !== -1 ? parseNumber(cols[citesIdx] || "0") : 0,
      sjr: sjrIdx !== -1 ? parseNumber(cols[sjrIdx] || "0") : 0,
      hIndex: hIdx !== -1 ? parseNumber(cols[hIdx] || "0") : 0,
    });
  }

  return journals;
}

async function main() {
  console.log("Fetching Scimago data from:", SCIMAGO_URL);

  let raw: string;
  try {
    raw = await fetchUrl(SCIMAGO_URL);
  } catch (err) {
    console.error("Failed to download Scimago data:", err);
    console.error(
      "\nThe download is likely blocked by Cloudflare protection.",
    );
    console.error(
      "Use the bundled fallback at src/data/scimago-medicine-2023.json instead.",
    );
    process.exit(1);
  }

  // Check if we got HTML (Cloudflare challenge) instead of CSV
  if (raw.trim().startsWith("<!DOCTYPE") || raw.trim().startsWith("<html")) {
    console.error("Received HTML instead of CSV — Cloudflare is blocking the request.");
    console.error(
      "Use the bundled fallback at src/data/scimago-medicine-2023.json instead.",
    );
    process.exit(1);
  }

  const journals = parseSemicolonCsv(raw);
  console.log(`Parsed ${journals.length} journals`);

  writeFileSync(OUTPUT_PATH, JSON.stringify(journals, null, 2), "utf-8");
  console.log(`Saved to ${OUTPUT_PATH}`);
}

main();
