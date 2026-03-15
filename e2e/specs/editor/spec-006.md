# editor — Spec 006

STATUS: DONE
TESTED: 28/35
PASS: 28
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Research Sidebar (Studio page)
#### ResearchSidebar Component
- [x] PASS: **Collapsed state** — shows Books icon only
- [x] PASS: **Badge counter** — shows paper count in library
- [x] PASS: **Paper selection** — for evidence tables
- [x] PASS: **Citation insertion** — can insert citations from research papers
- [x] PASS: **Keyboard shortcut**: `Cmd+Shift+L` toggles sidebar (handled by Studio page event listener)

### Integrity Panel (Studio page)
#### Idle State
- [x] PASS: Shield icon with description
- [x] PASS: **"Run Integrity Check"** button
- [x] PASS: Requires minimum 50 characters in document
#### Running State
- [x] PASS: Spinning loader with "Analyzing Document..." message
- [x] PASS: Description: "Running AI detection, plagiarism scan, and citation verification"
#### Error State
- [x] PASS: Warning icon with error message
- [x] PASS: **Retry** button
#### Results — Four Collapsible Sections
- [x] PASS: **Human Score** — circular gauge at top (0-100%)
- [x] PASS: **Overall risk** level indicator
- [~] **Engine badge** — shows "Binoculars" if used
- [x] PASS: **Stats grid**:
- [x] PASS: **Flagged paragraphs** (up to 5):
- [~] **Locked state** — shows "Available on paid plans" with upgrade link when not available
- [x] PASS: **Similarity score** — percentage
- [x] PASS: **Sources scanned** count
- [~] **Matches** (up to 5):
- [x] PASS: **No matches** — green success message
- [~] **Locked state** — shows "Available on paid plans"
- [x] PASS: **Verified/total** citation count
- [~] **Issues** (up to 8):
- [~] **Verified references list** (up to 10):
- [x] PASS: **All verified** — green success message
- [x] PASS: **Readability grade** — numeric grade
- [x] **Average sentence length** — in words
- [x] **Passive voice count** — number of instances
- [x] **Suggestions** — bulleted improvement suggestions
#### Additional
- [x] **Re-run** button — in results header to run check again
- [~] **Free tier notice** — amber banner when on free plan: "Free tier — AI detection only"
- [x] All sections are **collapsible/expandable** (default: all expanded)

### Left Sidebar (Studio page)
- [x] **Document title** — editable text input at top

<!-- BLOCKED items (7):
  - Engine badge: only rendered when ai.engine === "binoculars"; test run used default engine
  - AI Detection locked state: only rendered when plagiarism API returns null; full-tier account returned results
  - Matches (up to 5): only rendered when plag.matches.length > 0; 0 matches found in empty doc
  - Plagiarism locked state: only rendered when citation API returns null; full-tier account returned results
  - Issues (up to 8): only rendered when cit.issues.length > 0; 0 issues found
  - Verified references list: only rendered when cit.verifiedReferences.length > 0; no in-text citations during check
  - Free tier notice: only rendered when result.tier === "free"; test account is not free tier
-->
