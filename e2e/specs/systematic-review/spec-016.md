# systematic-review — Spec 016

STATUS: DONE
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/systematic-review
MODULE: systematic-review

---
### Quick Test Workflows
#### PRISMA Flow and PRISMA Checklist — Combined Tab Details
- [ ] PRISMA Flow error text is `Failed to generate PRISMA flow diagram. Please try again.`
- [ ] PRISMA checklist default variant is `PRISMA 2020`
- [ ] PRISMA checklist variant buttons are `PRISMA 2020`, `PRISMA-S (Search)`, and `PRISMA-NMA (Network MA)`
- [ ] Switching checklist variant resets the status filter to `all`
- [ ] Switching checklist variant collapses all expanded items
- [ ] Manuscript textarea placeholder is `Paste your manuscript text here (minimum 100 characters)...`
- [ ] Character counter uses localized formatting and remains visible before verification
- [ ] Verify button is disabled until manuscript text reaches 100 characters
- [ ] Verify button label includes the active variant short label, e.g. `Verify PRISMA 2020 Compliance`
- [ ] In-flight verify label uses variant-specific copy such as `Verifying 27 items...`
- [ ] Summary stat cards are clickable filters that toggle each status on/off
- [ ] Expanding all checklist items uses the item numbers from the current filtered result set
- [ ] Checklist export filename changes by variant (`prisma-2020-checklist.csv`, `prisma-s-checklist.csv`, `prisma-nma-checklist.csv`)
- [ ] `Found:` and `Suggestion:` rows render only when those values are non-empty
#### Protocol and PROSPERO Panels — Detailed Behavior
- [ ] Protocol panel preloads the saved PROSPERO registration id from `reviewConfig.protocolRegistration`
- [ ] PROSPERO ID placeholder is `e.g. CRD42024XXXXXX`
- [ ] Save PROSPERO ID button is disabled when the trimmed field is empty
- [ ] Save PROSPERO ID success changes the button label to `Saved` temporarily
- [ ] Generate Protocol button label changes to `Generating protocol (16 sections)...` while running
- [ ] Successful protocol generation expands all returned sections by default
- [ ] `Regenerate` in the controls bar clears the generated protocol from view instead of calling the API immediately
- [ ] Protocol copy action concatenates every section title and content into one clipboard payload
- [ ] Protocol TXT export filename is `protocol.txt`
- [ ] Protocol HTML export filename is `protocol.html`
- [ ] Protocol HTML export button title mentions printing to PDF via the browser
- [ ] Section edit mode is per-section and stores edits only in local component state until export/copy
- [ ] PROSPERO helper loads fields on mount from `/api/systematic-review/prospero?projectId={projectId}`
- [ ] PROSPERO progress text shows `{filledCount}/{totalCount} fields completed`
- [ ] PROSPERO progress bar color changes by completion percentage threshold
- [ ] `Copy All` button text changes to `Copied!` temporarily after successful copy
- [ ] `Download as TXT` button text changes to `Downloading…` while POST export is running
- [ ] `Refresh from project` reloads the 22 PROSPERO fields from the server
- [ ] Each PROSPERO field header shows a green filled indicator or red required-empty indicator
- [ ] Each PROSPERO field shows an `Auto` or `Manual` source badge
- [ ] Empty manual field placeholder is `Enter {field name}…`
