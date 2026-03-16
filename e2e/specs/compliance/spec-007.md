# compliance — Spec 007

STATUS: PARTIAL
TESTED: 35/35
PASS: 33
FAIL: 2
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Engine Internals
#### Plagiarism Engine
- [x] PASS: **Algorithm** — k-shingling (k=5) + MinHash (128 hashes)
- [x] PASS: **Sources** — Crossref + Semantic Scholar scholarly databases
- [x] PASS: **Severity** — based on Jaccard similarity score
#### Citation Audit Engine
- [ ] FAIL: **DOI verification** — via Crossref API
- [x] PASS: **PMID verification** — via PubMed API
- [x] PASS: **Uncited claim detection** — 14+ regex patterns for factual assertions
- [x] PASS: Issue types: `unverified_doi`, `invalid_doi`, `missing_citation`, `hallucinated_ref`, `broken_pmid`
#### Self-Plagiarism Engine
- [ ] FAIL: **Algorithm** — MinHash against user's previous 20 checks
- [x] PASS: **Threshold** — similarity >= 0.2 to flag as a match
#### Writing Quality (derived from AI stats)
- [x] PASS: Avg sentence length > 28 words
- [x] PASS: Sentence length std dev < 3 (too uniform)
- [x] PASS: Passive voice > 30%
- [x] PASS: Type-token ratio < 0.35
- [x] PASS: Hedging phrases > 5
- [x] PASS: Readability grade > 16

### Error Handling & Edge Cases
#### Input Validation
- [x] PASS: Text under 50 chars — error message, button disabled
- [x] PASS: Text over 50,000 chars — API returns validation error
- [x] PASS: Empty document in document mode — shows empty state with FileText icon
#### API Errors
- [x] PASS: 401 — not authenticated
- [x] PASS: 400 — validation errors returned with field details
- [x] PASS: 429 — rate limit exceeded (20 checks/hour)
- [x] PASS: 503 — AI service not configured
- [x] PASS: 500 — generic server error
#### Network Errors
- [x] PASS: 30-second abort timeout on main check
- [x] PASS: AbortError shown as timeout message
- [x] PASS: Non-abort errors shown as generic connection failure
- [x] PASS: Humanize/paraphrase failures silently ignored (no error displayed)
#### Copyleaks Edge Cases
- [x] PASS: Missing API keys — returns 503, sets `copyleaksAvailable = false`
- [x] PASS: Polling cleanup on unmount
- [x] PASS: Polling stops on completion or error status
#### State Reset
- [x] PASS: "Check New Text" link resets: result, paragraphs, copyleaksResult, copyleaksScanId, copyleaksAvailable, humanizeResults, paraphraseResults
- [x] PASS: Switching source mode resets document loading state

### Quick Test Workflows
#### Detailed QA Coverage
- [x] PASS: Initial page state sets `sourceMode = "document"`, `pageTab = "check"`, `viewMode = "inline"`, `realtimeEnabled = false`, and both result/history payloads empty
- [x] PASS: Source-mode toggle and realtime toggle are hidden once a full `result` exists
- [x] PASS: Project-list request runs on mount and again whenever `selectedProjectId` changes because the loader effect depends on that state
