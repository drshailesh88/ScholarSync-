# notebook — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/notebook
MODULE: notebook

---
### Message Actions (Copy & Feedback)
#### Copy Button
- [x] PASS: **2-second confirmation** — shows green check for 2 seconds after copy
- [x] PASS: **Tooltip** — "Copy response"
- [x] PASS: **Aria label** — "Copy response to clipboard"
#### Thumbs Up Button
- [x] PASS: **Toggle behavior** — click to activate, click again to deactivate
- [x] PASS: **Active state** — green-500 text, green-500/10 background, filled icon
- [x] PASS: **Inactive state** — ink-muted text, hover shows ink color + surface-raised background
- [x] PASS: **Persists to DB** — calls `submitMessageFeedback()` with rating `1`
- [x] PASS: **Tooltip** — "Helpful response"
#### Thumbs Down Button
- [x] PASS: **Toggle behavior** — click to activate, click again to deactivate
- [x] PASS: **Active state** — red-400 text, red-500/10 background, filled icon
- [x] PASS: **Inactive state** — ink-muted text, hover shows ink color + surface-raised background
- [x] PASS: **Persists to DB** — calls `submitMessageFeedback()` with rating `-1`
- [x] PASS: **Tooltip** — "Unhelpful response"
#### Mutual Exclusion
- [x] PASS: Selecting thumbs up while thumbs down is active → clears thumbs down
- [x] PASS: Selecting thumbs down while thumbs up is active → clears thumbs up
- [x] PASS: Clicking the same thumb again → clears the rating (sends `null`)

### PICO / Fact Extraction
#### Extract Facts Button
- [x] PASS: **Visibility** — only on files with `paperId`, `status === "ready"`, not yet extracted
- [x] PASS: **Icon** — Table icon, visible on file entry hover (opacity-0 → opacity-100)
- [x] PASS: **Tooltip** — "Extract PICO data"
- [x] PASS: **Loading state** — CircleNotch spinning icon while extracting
#### Extracted State
- [x] PASS: **Green checkmark** — CheckCircle icon replaces extract button
- [x] PASS: **Click to expand** — toggles inline extraction card below file entry
- [x] PASS: **Toggle behavior** — click again to collapse
#### Extraction Card
- [x] PASS: **Header** — Table icon (brand) + "Structured Extraction" title
- [x] PASS: **Verification badge** — "Verified" (green, ShieldCheck) or "Verify" button
- [x] PASS: **Grid layout** — 2-column grid: label (brand text) + value
- [x] PASS: **PICO fields displayed** (if non-null):
- [x] PASS: **Key Findings** — separate section with border-t (from `custom_extractions.key_findings`)
- [x] PASS: **Limitations** — separate section with border-t (from `custom_extractions.limitations`)
- [x] PASS: **Empty state** — "No structured data could be extracted." if no fields have values
#### Verify Extraction
- [x] PASS: **Verify button** — CheckCircle icon + "Verify" text
- [x] PASS: Calls `verifyExtraction()` server action
- [x] PASS: On success: updates extraction to show "Verified" badge (ShieldCheck, green)
- [x] PASS: Updates local state immediately (optimistic)

### Source Notes Panel
#### Opening
- [x] PASS: **"View Source Notes" button** — Notebook icon + text, in chat header toolbar
