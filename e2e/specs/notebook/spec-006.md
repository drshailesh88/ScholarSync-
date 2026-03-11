# notebook — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Message Actions (Copy & Feedback)
#### Copy Button
- [ ] **2-second confirmation** — shows green check for 2 seconds after copy
- [ ] **Tooltip** — "Copy response"
- [ ] **Aria label** — "Copy response to clipboard"
#### Thumbs Up Button
- [ ] **Toggle behavior** — click to activate, click again to deactivate
- [ ] **Active state** — green-500 text, green-500/10 background, filled icon
- [ ] **Inactive state** — ink-muted text, hover shows ink color + surface-raised background
- [ ] **Persists to DB** — calls `submitMessageFeedback()` with rating `1`
- [ ] **Tooltip** — "Helpful response"
#### Thumbs Down Button
- [ ] **Toggle behavior** — click to activate, click again to deactivate
- [ ] **Active state** — red-400 text, red-500/10 background, filled icon
- [ ] **Inactive state** — ink-muted text, hover shows ink color + surface-raised background
- [ ] **Persists to DB** — calls `submitMessageFeedback()` with rating `-1`
- [ ] **Tooltip** — "Unhelpful response"
#### Mutual Exclusion
- [ ] Selecting thumbs up while thumbs down is active → clears thumbs down
- [ ] Selecting thumbs down while thumbs up is active → clears thumbs up
- [ ] Clicking the same thumb again → clears the rating (sends `null`)

### PICO / Fact Extraction
#### Extract Facts Button
- [ ] **Visibility** — only on files with `paperId`, `status === "ready"`, not yet extracted
- [ ] **Icon** — Table icon, visible on file entry hover (opacity-0 → opacity-100)
- [ ] **Tooltip** — "Extract PICO data"
- [ ] **Loading state** — CircleNotch spinning icon while extracting
#### Extracted State
- [ ] **Green checkmark** — CheckCircle icon replaces extract button
- [ ] **Click to expand** — toggles inline extraction card below file entry
- [ ] **Toggle behavior** — click again to collapse
#### Extraction Card
- [ ] **Header** — Table icon (brand) + "Structured Extraction" title
- [ ] **Verification badge** — "Verified" (green, ShieldCheck) or "Verify" button
- [ ] **Grid layout** — 2-column grid: label (brand text) + value
- [ ] **PICO fields displayed** (if non-null):
- [ ] **Key Findings** — separate section with border-t (from `custom_extractions.key_findings`)
- [ ] **Limitations** — separate section with border-t (from `custom_extractions.limitations`)
- [ ] **Empty state** — "No structured data could be extracted." if no fields have values
#### Verify Extraction
- [ ] **Verify button** — CheckCircle icon + "Verify" text
- [ ] Calls `verifyExtraction()` server action
- [ ] On success: updates extraction to show "Verified" badge (ShieldCheck, green)
- [ ] Updates local state immediately (optimistic)

### Source Notes Panel
#### Opening
- [ ] **"View Source Notes" button** — Notebook icon + text, in chat header toolbar
