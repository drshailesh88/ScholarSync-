# compliance — Spec 007

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/compliance
MODULE: compliance

---
### Engine Internals
#### Plagiarism Engine
- [ ] **Algorithm** — k-shingling (k=5) + MinHash (128 hashes)
- [ ] **Sources** — Crossref + Semantic Scholar scholarly databases
- [ ] **Severity** — based on Jaccard similarity score
#### Citation Audit Engine
- [ ] **DOI verification** — via Crossref API
- [ ] **PMID verification** — via PubMed API
- [ ] **Uncited claim detection** — 14+ regex patterns for factual assertions
- [ ] Issue types: `unverified_doi`, `invalid_doi`, `missing_citation`, `hallucinated_ref`, `broken_pmid`
#### Self-Plagiarism Engine
- [ ] **Algorithm** — MinHash against user's previous 20 checks
- [ ] **Threshold** — similarity >= 0.2 to flag as a match
#### Writing Quality (derived from AI stats)
- [ ] Avg sentence length > 28 words
- [ ] Sentence length std dev < 3 (too uniform)
- [ ] Passive voice > 30%
- [ ] Type-token ratio < 0.35
- [ ] Hedging phrases > 5
- [ ] Readability grade > 16

### Error Handling & Edge Cases
#### Input Validation
- [ ] Text under 50 chars — error message, button disabled
- [ ] Text over 50,000 chars — API returns validation error
- [ ] Empty document in document mode — shows empty state with FileText icon
#### API Errors
- [ ] 401 — not authenticated
- [ ] 400 — validation errors returned with field details
- [ ] 429 — rate limit exceeded (20 checks/hour)
- [ ] 503 — AI service not configured
- [ ] 500 — generic server error
#### Network Errors
- [ ] 30-second abort timeout on main check
- [ ] AbortError shown as timeout message
- [ ] Non-abort errors shown as generic connection failure
- [ ] Humanize/paraphrase failures silently ignored (no error displayed)
#### Copyleaks Edge Cases
- [ ] Missing API keys — returns 503, sets `copyleaksAvailable = false`
- [ ] Polling cleanup on unmount
- [ ] Polling stops on completion or error status
#### State Reset
- [ ] "Check New Text" link resets: result, paragraphs, copyleaksResult, copyleaksScanId, copyleaksAvailable, humanizeResults, paraphraseResults
- [ ] Switching source mode resets document loading state

### Quick Test Workflows
#### Detailed QA Coverage
- [ ] Initial page state sets `sourceMode = "document"`, `pageTab = "check"`, `viewMode = "inline"`, `realtimeEnabled = false`, and both result/history payloads empty
- [ ] Source-mode toggle and realtime toggle are hidden once a full `result` exists
- [ ] Project-list request runs on mount and again whenever `selectedProjectId` changes because the loader effect depends on that state
