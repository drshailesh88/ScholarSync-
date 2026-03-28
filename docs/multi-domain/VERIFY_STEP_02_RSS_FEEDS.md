# Step 2: RSS Feed URL Verification

## AGENT: Local terminal
## BRANCH: `verify/step-02-fix-feed-urls`

## BRANCH INSTRUCTIONS (DO THIS FIRST)

```bash
git checkout main
git pull origin main
git checkout -b verify/step-02-fix-feed-urls
```

## PROMPT

We just added ~300 journal feed entries across 15 academic domains in `src/data/journal-feeds.ts`. Every RSS/Atom feed URL must be verified as returning a valid feed. Broken URLs mean empty feeds for users — unacceptable.

Read `src/data/journal-feeds.ts` and extract every `feedUrl` value. For each URL:

1. Make an HTTP GET request with a 10-second timeout
2. Check that the response:
   - Returns HTTP 200
   - Has a Content-Type containing `xml`, `rss`, `atom`, or `text/xml`
   - Contains at least one `<item>` or `<entry>` element
3. Log results as: `[OK] URL` or `[FAIL] URL — reason`

Write a Node.js script at `scripts/verify-feed-urls.ts` that does this automatically:

```typescript
// scripts/verify-feed-urls.ts
// Run with: npx tsx scripts/verify-feed-urls.ts

import { JOURNAL_FEEDS } from "../src/data/journal-feeds";

async function verifyFeed(url: string): Promise<{ ok: boolean; reason?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "ScholarSync Feed Verifier/1.0" },
    });
    clearTimeout(timeout);

    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };

    const text = await res.text();
    if (!text.includes("<item") && !text.includes("<entry")) {
      return { ok: false, reason: "No <item> or <entry> found in response" };
    }

    return { ok: true };
  } catch (e: any) {
    return { ok: false, reason: e.message || "Unknown error" };
  }
}

async function main() {
  const uniqueUrls = [...new Set(JOURNAL_FEEDS.map(f => f.feedUrl))];
  console.log(`Verifying ${uniqueUrls.length} feed URLs...\n`);

  let passed = 0, failed = 0;
  const failures: string[] = [];

  // Run in batches of 10 to avoid overwhelming
  for (let i = 0; i < uniqueUrls.length; i += 10) {
    const batch = uniqueUrls.slice(i, i + 10);
    const results = await Promise.all(batch.map(async (url) => {
      const result = await verifyFeed(url);
      if (result.ok) {
        console.log(`[OK] ${url}`);
        passed++;
      } else {
        console.log(`[FAIL] ${url} — ${result.reason}`);
        failed++;
        failures.push(`${url} — ${result.reason}`);
      }
      return result;
    }));
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  if (failures.length > 0) {
    console.log(`\nFailed URLs:`);
    failures.forEach(f => console.log(`  - ${f}`));
  }
}

main();
```

After running the script:

1. For each failed URL, search for a correct RSS feed URL for that journal
2. If no RSS feed exists for a journal, REMOVE the entry (a missing entry is better than a broken one)
3. Update `src/data/journal-feeds.ts` with fixed URLs
4. Re-run the verification script to confirm all remaining URLs work
5. Commit and push

## WHAT NOT TO DO
- DO NOT remove journals just because their RSS is temporarily down — retry 3 times first
- DO NOT add new journals — only fix or remove broken ones
- DO NOT modify anything outside `src/data/journal-feeds.ts` and the new script

## COMMIT AND PR

```bash
git add scripts/verify-feed-urls.ts src/data/journal-feeds.ts
git commit -m "fix: verify and fix RSS feed URLs — remove broken feeds, fix malformed URLs

- Added feed verification script
- Verified all ~300+ feed URLs
- Fixed X URLs, removed Y unreachable feeds
- All remaining feeds return valid XML"

git push -u origin verify/step-02-fix-feed-urls
gh pr create --base main --title "fix: Verify and fix RSS feed URLs" --body "Post-build verification Step 2. Closes feed URL issues."
```
