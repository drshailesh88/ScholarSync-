# Journal Feed -- Final Parity Audit v2

## Audit Date: 2026-03-06
## Sprints Covered: 1-16 (all)

## Parity Checklist

| # | Feature | Sprint | Status | Evidence |
|---|---|---|---|---|
| 1 | Subscribe RSS by URL | 1,2,7 | PASS | P01 |
| 2 | Subscribe Atom by URL | 2,7 | PASS | P02 |
| 3 | Auto-discover feed from URL | 3 | PASS | P03 |
| 4 | Unread/read status per user | 1,7,8 | PASS | P04-05 |
| 5 | Mark single article read | 7,8 | PASS | P04-05 |
| 6 | Mark all read (global) | 7 | PASS | P06-07 |
| 7 | Mark all read (per feed) | 7 | PASS | P06-07 |
| 8 | Star articles | 1,7,8 | PASS | P08-09 |
| 9 | Unstar articles | 7,8 | PASS | P08-09 |
| 10 | Folder organization | 1,7,8 | PASS | P10 |
| 11 | View filters (All/Unread/Starred) | 8,9 | PASS | P11 |
| 12 | Browse by category | 4,7 | PASS | P12 |
| 13 | Unread count per feed | 7,8 | PASS | P13-14 |
| 14 | Total unread count | 7,8 | PASS | P13-14 |
| 15 | Article snippet preview | 2,6 | PASS | P15 |
| 16 | Open in original site | 9 | PASS | P16 |
| 17 | Feed health monitoring | 1,6 | PASS | P17 |
| 18 | Keyboard shortcuts (j/k/o/s/c/a//) | 9,13,15,16 | PASS | P18 |
| 19 | Mobile responsive | 9 | PASS | P19 |
| 20 | Background cron refresh | 6 | PASS | P20 |
| 21 | PubMed search as feed [unique] | 5 | PASS | P21 |
| 22 | Save to Library [unique] | 10 | PASS | P22-23 |
| 23 | DOI dedup on save [unique] | 10 | PASS | P22-23 |
| 24 | Curated journal directory [unique] | 4 | PASS | P24 |
| 25 | One-click citation (6 styles) | 13 | PASS | P25 |
| 26 | AI summary (one-click) | 14,15 | PASS | P26 |
| 27 | AI chat / explain | 14,15 | PASS | P27 |
| 28 | 3-tier source transparency | 14,15 | PASS | P28 |
| 29 | AI suggested questions | 14,15 | PASS | P29 |
| 30 | Article search (ILIKE) | 16 | PASS | P30 |
| 31 | OPML export (.opml download) | 16 | PASS | P31 |
| 32 | OPML import (subscribe from file) | 16 | PASS | P32 |
| 33 | Sidebar navigation entry | 9 | PASS | P33 |
| 34 | Loading + error pages | 9 | PASS | P34 |
| 35 | Rate limiting | 7 | PASS | P35 |
| 36 | Schema barrel exports | 1 | PASS | P36 |
| 37 | All source files present (42) | 1-16 | PASS | P37 |
| 38 | All test files present (17) | 1-16 | PASS | P38 |
| 39 | Power search with boolean ops | -- | Deferred | Phase 3 |
| 40 | Smart recommendations (SPECTER2) | -- | Deferred | Phase 3 |
| 41 | Email digest | -- | Deferred | Phase 3 |
| 42 | Browser extension | -- | Out of scope | Separate project |

## Summary

| Category | Count |
|---|---|
| Covered (must pass) | 38 / 38 |
| Missing (blocker) | 0 / 38 |
| Deferred (Phase 3) | 3 |
| Out of scope | 1 |
| Total features audited | 42 |

## Bugs Found & Fixed During Audit

| Bug | File | Fix |
|---|---|---|
| Client bundle importing server-only `postgres` via `save-to-library.ts` | `article-to-citation.ts` | Inlined `parseAuthors` helper to break import chain to `@/lib/db` |
| Citation test checked old import name | `citation.test.ts` | Updated assertion to match inlined function name |

## ScholarSync vs Feedly Comparison

| Capability | Feedly Free | Feedly Pro | ScholarSync |
|---|---|---|---|
| RSS/Atom subscription | Yes | Yes | Yes |
| Feed auto-discovery | Yes | Yes | Yes |
| Read/unread/star | Yes | Yes | Yes |
| Folders | Yes | Yes | Yes |
| OPML import/export | Yes | Yes | Yes |
| Article search | No | Yes | Yes |
| AI summaries | No | Yes ($12/mo) | Yes (built-in) |
| PubMed search as feed | No | No | Yes (unique) |
| Save to academic library | No | No | Yes (unique) |
| DOI-based dedup | No | No | Yes (unique) |
| One-click citation (6 styles) | No | No | Yes (unique) |
| Source transparency (3 tiers) | No | No | Yes (unique) |
| AI paper discussion | No | No | Yes (unique) |
| Curated medical journal dir | No | No | Yes (unique) |
| Keyboard shortcuts | Yes | Yes | Yes (7 shortcuts) |

## Final Metrics

- **Test files**: 18 (17 feed + 1 store)
- **Test cases**: 482
- **Source files**: 10 lib + 10 components + 16 API routes + 1 data + 1 store + 2 types/schema = 40
- **All-green runs**: 3 consecutive
- **TSC errors (feed-related)**: 0
- **Next.js build**: PASS
- **Unique features vs Feedly**: 8
