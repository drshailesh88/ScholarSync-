// ---------------------------------------------------------------------------
// Beall's List Scraper — Predatory Publishers & Standalone Journals
// ---------------------------------------------------------------------------
//
// Fetches the full Beall's List from beallslist.net and writes the results
// to the JSON data files used at runtime by the integrity checker.
//
// Usage:
//   npm run data:update-bealls
//   # or directly:
//   npx tsx src/lib/integrity/scrape-bealls-list.ts
//
// This is a dev-time script. The JSON files it produces are committed to the
// repo and used at runtime — no scraping happens at runtime.
// ---------------------------------------------------------------------------

import fs from "fs";
import path from "path";

const PUBLISHERS_URL = "https://beallslist.net/";
const JOURNALS_URL = "https://beallslist.net/standalone-journals/";

const DATA_DIR = path.join(__dirname, "data");
const PUBLISHERS_FILE = path.join(DATA_DIR, "predatory-publishers.json");
const JOURNALS_FILE = path.join(DATA_DIR, "predatory-journals.json");

/**
 * Extract list items from the Beall's List HTML pages.
 *
 * The pages use WordPress markup with entries as `<li>` elements containing
 * `<a>` tags. We extract the text content of each list item, stripping HTML
 * tags and normalising whitespace.
 */
function extractNames(html: string): string[] {
  const names = new Set<string>();

  // Match <li> elements that contain links (the actual list entries)
  // Beall's list entries are <li><a href="...">Publisher Name</a></li>
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match: RegExpExecArray | null;

  while ((match = liRegex.exec(html)) !== null) {
    const inner = match[1];

    // Skip navigation / menu items (they usually have class attributes)
    if (match[0].includes('class="menu') || match[0].includes('class="page')) {
      continue;
    }

    // Must contain at least one <a> tag (list entries are hyperlinked)
    if (!/<a\s/i.test(inner)) continue;

    // Strip all HTML tags and decode common entities
    let text = inner
      .replace(/<[^>]+>/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "–")
      .replace(/&#8212;/g, "—")
      .replace(/&#038;/g, "&")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    // Skip empty or very short entries
    if (text.length < 2) continue;

    // Remove trailing notes in parentheses like "(DOAJ indexed)" or "(see also...)"
    text = text.replace(/\s*\((?:see also|formerly|now|also|DOAJ|updated|added)[^)]*\)\s*$/i, "").trim();

    if (text.length >= 2) {
      names.add(text);
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
}

async function fetchPage(url: string): Promise<string> {
  console.log(`Fetching ${url} ...`);
  const res = await fetch(url, {
    headers: {
      "User-Agent": "ScholarSync-IntegrityChecker/1.0 (academic-tool; +https://github.com/ScholarSync)",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  return res.text();
}

function mergeWithExisting(filePath: string, scraped: string[]): string[] {
  const merged = new Set(scraped);

  // Merge existing entries so we never lose manually-added data
  if (fs.existsSync(filePath)) {
    try {
      const existing: string[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      for (const name of existing) {
        merged.add(name);
      }
    } catch {
      // Ignore parse errors — we'll overwrite
    }
  }

  return [...merged].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }));
}

async function main() {
  // Ensure data directory exists
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Fetch both pages in parallel
  const [publishersHtml, journalsHtml] = await Promise.all([
    fetchPage(PUBLISHERS_URL),
    fetchPage(JOURNALS_URL),
  ]);

  // Extract names
  const scrapedPublishers = extractNames(publishersHtml);
  const scrapedJournals = extractNames(journalsHtml);

  console.log(`Scraped ${scrapedPublishers.length} publishers`);
  console.log(`Scraped ${scrapedJournals.length} standalone journals`);

  // Merge with existing to preserve manually-curated entries
  const publishers = mergeWithExisting(PUBLISHERS_FILE, scrapedPublishers);
  const journals = mergeWithExisting(JOURNALS_FILE, scrapedJournals);

  console.log(`After merge: ${publishers.length} publishers, ${journals.length} journals`);

  // Write output
  fs.writeFileSync(PUBLISHERS_FILE, JSON.stringify(publishers, null, 2) + "\n");
  fs.writeFileSync(JOURNALS_FILE, JSON.stringify(journals, null, 2) + "\n");

  console.log(`Written to:`);
  console.log(`  ${PUBLISHERS_FILE}`);
  console.log(`  ${JOURNALS_FILE}`);
}

main().catch((err) => {
  console.error("Scrape failed:", err);
  process.exit(1);
});
