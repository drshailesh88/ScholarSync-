# library — Spec 004: Reader & Extraction States

STATUS: PENDING
TESTED: 0/16
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/library/item/web_1
MODULE: library

---
### Web Source Reader
- [ ] **Web content renders** — navigate to a web source with extraction_state=ready, extracted HTML displays `[CONFIRMED]`
- [ ] **Sanitized HTML** — extracted content renders without script tags or unsafe elements `[EMERGENT: isomorphic-dompurify]`
- [ ] **Reader typography** — content renders in Source Serif 4 at 17px within 720px max-width column `[CONFIRMED]`

### Paper Reader
- [ ] **Abstract view renders** — navigate to a paper source, abstract and metadata display `[CONFIRMED]`
- [ ] **PDF view toggle** — click "Full Text" tab, switches from abstract to PDF/full-text view `[CONFIRMED]`
- [ ] **Back to abstract** — click "Abstract" tab, switches back to abstract view `[CONFIRMED]`

### Extraction States
- [ ] **Pending shows skeleton** — source with extraction_state=pending shows loading skeleton `[CONFIRMED]`
- [ ] **Ready shows content** — source with extraction_state=ready shows extracted HTML `[CONFIRMED]`
- [ ] **Partial shows warning** — source with extraction_state=partial shows content + warning banner `[CONFIRMED]`
- [ ] **Failed shows retry** — source with extraction_state=failed shows "Open original" + retry button `[CONFIRMED]`
- [ ] **Retry extraction** — click retry on failed source, extraction re-triggers `[CONFIRMED]`

### Reader Controls
- [ ] **Reading progress bar** — scroll through content, progress bar at top updates proportionally `[CONFIRMED]`
- [ ] **Workbench panel toggle** — click "Workbench" button, right panel opens/closes `[CONFIRMED]`
- [ ] **Escape closes panel** — with panel open, press Escape, panel closes `[CONFIRMED]`
- [ ] **Open original link** — click "Open original", original URL opens in new tab `[CONFIRMED]`
- [ ] **Send to editor** — click send-to-editor button, creates editor handoff `[CONFIRMED]`
