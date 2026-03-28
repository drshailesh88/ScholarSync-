#!/usr/bin/env npx tsx
// scripts/verify-feed-urls.ts
// Run with: npx tsx scripts/verify-feed-urls.ts
//
// Verifies every feedUrl in JOURNAL_FEEDS returns valid RSS/Atom XML.
// Retries each URL up to 3 times before marking it as failed.

// Use relative import to avoid needing tsconfig-paths
import { JOURNAL_FEEDS } from "../src/data/journal-feeds";

const MAX_RETRIES = 3;
const TIMEOUT_MS = 10_000;
const BATCH_SIZE = 10;

async function verifyFeed(
  url: string,
  attempt = 1
): Promise<{ ok: boolean; reason?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "ScholarSync Feed Verifier/1.0" },
      redirect: "follow",
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return { ok: false, reason: `HTTP ${res.status}` };
    }

    const text = await res.text();
    const hasItems = text.includes("<item") || text.includes("<entry");
    const isValidFeedStructure =
      text.includes("<rss") ||
      text.includes("<feed") ||
      text.includes("<rdf:RDF");
    const isHtml =
      text.includes("<!DOCTYPE html") || text.includes("<html");

    if (isHtml) {
      return { ok: false, reason: "Returns HTML instead of feed XML" };
    }

    if (hasItems) {
      return { ok: true };
    }

    if (isValidFeedStructure) {
      // Valid feed structure but empty (e.g., arXiv on weekends)
      return { ok: true, reason: "valid-but-empty" };
    }

    return {
      ok: false,
      reason: "No <item> or <entry> found and not valid feed XML",
    };
  } catch (e: unknown) {
    const err = e instanceof Error ? e : new Error("Unknown error");
    const reason =
      err.name === "AbortError" ? "Timeout (10s)" : err.message;
    if (attempt < MAX_RETRIES) {
      // Wait 2s before retry
      await new Promise((r) => setTimeout(r, 2000));
      return verifyFeed(url, attempt + 1);
    }
    return { ok: false, reason: `${reason} (after ${MAX_RETRIES} attempts)` };
  }
}

async function main() {
  const allUrls = JOURNAL_FEEDS.map((f) => f.feedUrl);
  const uniqueUrls = [...new Set(allUrls)];
  console.log(
    `Total feeds: ${JOURNAL_FEEDS.length}, Unique URLs: ${uniqueUrls.length}\n`
  );

  let passed = 0;
  let failed = 0;
  const failures: { url: string; reason: string }[] = [];

  for (let i = 0; i < uniqueUrls.length; i += BATCH_SIZE) {
    const batch = uniqueUrls.slice(i, i + BATCH_SIZE);
    await Promise.all(
      batch.map(async (url) => {
        const result = await verifyFeed(url);
        if (result.ok) {
          if (result.reason === "valid-but-empty") {
            console.log(`[EMPTY] ${url}`);
          } else {
            console.log(`[OK]   ${url}`);
          }
          passed++;
        } else {
          console.log(`[FAIL] ${url} — ${result.reason}`);
          failed++;
          failures.push({ url, reason: result.reason! });
        }
      })
    );
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(
    `RESULTS: ${passed} passed, ${failed} failed out of ${uniqueUrls.length}`
  );
  if (failures.length > 0) {
    console.log(`\nFailed URLs:`);
    failures.forEach((f) =>
      console.log(`  - ${f.url}\n    Reason: ${f.reason}`)
    );
  }
  console.log(`${"=".repeat(60)}`);

  process.exit(failures.length > 0 ? 1 : 0);
}

main();
