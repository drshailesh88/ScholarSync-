# editor — Spec 006

STATUS: PENDING
TESTED: 0/35
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/editor
MODULE: editor

---
### Research Sidebar (Studio page)
#### ResearchSidebar Component
- [ ] **Collapsed state** — shows Books icon only
- [ ] **Badge counter** — shows paper count in library
- [ ] **Paper selection** — for evidence tables
- [ ] **Citation insertion** — can insert citations from research papers
- [ ] **Keyboard shortcut**: `Cmd+Shift+L` toggles sidebar (handled by Studio page event listener)

### Integrity Panel (Studio page)
#### Idle State
- [ ] Shield icon with description
- [ ] **"Run Integrity Check"** button
- [ ] Requires minimum 50 characters in document
#### Running State
- [ ] Spinning loader with "Analyzing Document..." message
- [ ] Description: "Running AI detection, plagiarism scan, and citation verification"
#### Error State
- [ ] Warning icon with error message
- [ ] **Retry** button
#### Results — Four Collapsible Sections
- [ ] **Human Score** — circular gauge at top (0-100%)
- [ ] **Overall risk** level indicator
- [ ] **Engine badge** — shows "Binoculars" if used
- [ ] **Stats grid**:
- [ ] **Flagged paragraphs** (up to 5):
- [ ] **Locked state** — shows "Available on paid plans" with upgrade link when not available
- [ ] **Similarity score** — percentage
- [ ] **Sources scanned** count
- [ ] **Matches** (up to 5):
- [ ] **No matches** — green success message
- [ ] **Locked state** — shows "Available on paid plans"
- [ ] **Verified/total** citation count
- [ ] **Issues** (up to 8):
- [ ] **Verified references list** (up to 10):
- [ ] **All verified** — green success message
- [ ] **Readability grade** — numeric grade
- [ ] **Average sentence length** — in words
- [ ] **Passive voice count** — number of instances
- [ ] **Suggestions** — bulleted improvement suggestions
#### Additional
- [ ] **Re-run** button — in results header to run check again
- [ ] **Free tier notice** — amber banner when on free plan: "Free tier — AI detection only"
- [ ] All sections are **collapsible/expandable** (default: all expanded)

### Left Sidebar (Studio page)
- [ ] **Document title** — editable text input at top
