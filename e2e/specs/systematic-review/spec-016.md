# systematic-review — Spec 016

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### PRISMA Flow and PRISMA Checklist — Combined Tab Details
- [x] PASS: PRISMA Flow error text is `Failed to generate PRISMA flow diagram. Please try again.`
- [x] PASS: PRISMA checklist default variant is `PRISMA 2020`
- [x] PASS: PRISMA checklist variant buttons are `PRISMA 2020`, `PRISMA-S (Search)`, and `PRISMA-NMA (Network MA)`
- [x] PASS: Switching checklist variant resets the status filter to `all`
- [x] PASS: Switching checklist variant collapses all expanded items
- [x] PASS: Manuscript textarea placeholder is `Paste your manuscript text here (minimum 100 characters)...`
- [x] PASS: Character counter uses localized formatting and remains visible before verification
- [x] PASS: Verify button is disabled until manuscript text reaches 100 characters
- [x] PASS: Verify button label includes the active variant short label, e.g. `Verify PRISMA 2020 Compliance`
- [x] PASS: In-flight verify label uses variant-specific copy such as `Verifying 27 items...`
- [x] PASS: Summary stat cards are clickable filters that toggle each status on/off
- [x] PASS: Expanding all checklist items uses the item numbers from the current filtered result set
- [x] PASS: Checklist export filename changes by variant (`prisma-2020-checklist.csv`, `prisma-s-checklist.csv`, `prisma-nma-checklist.csv`)
- [x] PASS: `Found:` and `Suggestion:` rows render only when those values are non-empty
#### Protocol and PROSPERO Panels — Detailed Behavior
- [x] PASS: Protocol panel preloads the saved PROSPERO registration id from `reviewConfig.protocolRegistration`
- [x] PASS: PROSPERO ID placeholder is `e.g. CRD42024XXXXXX`
- [x] PASS: Save PROSPERO ID button is disabled when the trimmed field is empty
- [x] PASS: Save PROSPERO ID success changes the button label to `Saved` temporarily
- [x] PASS: Generate Protocol button label changes to `Generating protocol (16 sections)...` while running
- [x] PASS: Successful protocol generation expands all returned sections by default
- [x] PASS: `Regenerate` in the controls bar clears the generated protocol from view instead of calling the API immediately
- [x] PASS: Protocol copy action concatenates every section title and content into one clipboard payload
- [x] PASS: Protocol TXT export filename is `protocol.txt`
- [x] PASS: Protocol HTML export filename is `protocol.html`
- [x] PASS: Protocol HTML export button title mentions printing to PDF via the browser
- [x] PASS: Section edit mode is per-section and stores edits only in local component state until export/copy
- [x] PASS: PROSPERO helper loads fields on mount from `/api/systematic-review/prospero?projectId={projectId}`
- [x] PASS: PROSPERO progress text shows `{filledCount}/{totalCount} fields completed`
- [x] PASS: PROSPERO progress bar color changes by completion percentage threshold
- [x] PASS: `Copy All` button text changes to `Copied!` temporarily after successful copy
- [x] PASS: `Download as TXT` button text changes to `Downloading…` while POST export is running
- [x] PASS: `Refresh from project` reloads the 22 PROSPERO fields from the server
- [x] PASS: Each PROSPERO field header shows a green filled indicator or red required-empty indicator
- [x] PASS: Each PROSPERO field shows an `Auto` or `Manual` source badge
- [x] PASS: Empty manual field placeholder is `Enter {field name}…`
