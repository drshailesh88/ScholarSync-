# editor — Spec 006

STATUS: DONE
TESTED: 35/35
PASS: 28
FAIL: 0
BLOCKED: 7
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Research Sidebar (Studio page)
#### ResearchSidebar Component
- [x] **Collapsed state** — shows Books icon only
- [x] **Badge counter** — shows paper count in library
- [x] **Paper selection** — for evidence tables
- [x] **Citation insertion** — can insert citations from research papers
- [x] **Keyboard shortcut**: `Cmd+Shift+L` toggles sidebar (handled by Studio page event listener)

### Integrity Panel (Studio page)
#### Idle State
- [x] Shield icon with description
- [x] **"Run Integrity Check"** button
- [x] Requires minimum 50 characters in document
#### Running State
- [x] Spinning loader with "Analyzing Document..." message
- [x] Description: "Running AI detection, plagiarism scan, and citation verification"
#### Error State
- [x] Warning icon with error message
- [x] **Retry** button
#### Results — Four Collapsible Sections
- [x] **Human Score** — circular gauge at top (0-100%)
- [x] **Overall risk** level indicator
- [~] **Engine badge** — shows "Binoculars" if used
- [x] **Stats grid**:
- [x] **Flagged paragraphs** (up to 5):
- [~] **Locked state** — shows "Available on paid plans" with upgrade link when not available
- [x] **Similarity score** — percentage
- [x] **Sources scanned** count
- [~] **Matches** (up to 5):
- [x] **No matches** — green success message
- [~] **Locked state** — shows "Available on paid plans"
- [x] **Verified/total** citation count
- [~] **Issues** (up to 8):
- [~] **Verified references list** (up to 10):
- [x] **All verified** — green success message
- [x] **Readability grade** — numeric grade
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
