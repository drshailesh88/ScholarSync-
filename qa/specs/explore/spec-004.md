# explore — Spec 004

STATUS: PENDING
TESTED: 0/20
PASS: 0
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3000/explore
MODULE: explore

---
### Result Cards

#### Display
- [ ] **Title renders as link** — result with URL shows title as clickable link opening in new tab `[CODE]`
- [ ] **Title renders as text** — result without URL/DOI/PMID shows title as plain heading `[CODE]`
- [ ] **Trust tier left border** — each card has colored left border matching trust tier (green=gov, blue=journalism, amber=community, gray=other) `[CODE]`
- [ ] **Evidence level border (academic)** — academic results with evidence level show corresponding border color `[CODE]`
- [ ] **Breadcrumb display** — below title, shows domain > path breadcrumb in brand color `[CODE]`
- [ ] **Author metadata (academic)** — academic results show "Author1, Author2, et al." format `[CODE]`
- [ ] **News metadata** — news results show outlet name and relative time (e.g., "2h ago") `[EMERGENT: Intl.RelativeTimeFormat]`
- [ ] **Discussion metadata** — discussion results show platform, community, and engagement `[CODE]`
- [ ] **Date label** — results with date show formatted date; year-only results show just year `[EMERGENT: Intl.DateTimeFormat]`
- [ ] **Snippet with line clamp** — abstract/tldr truncates to 3 lines with overflow hidden `[CODE]`

#### Save Interaction
- [ ] **Save button (plus icon)** — click + icon, verify spinner appears then check icon replaces it `[CODE]`
- [ ] **Save disabled after saved** — after saving, button is disabled and shows check icon `[CODE]`
- [ ] **"Saved to Library" toast** — after saving, success toast appears at bottom `[CODE]`
- [ ] **"Already in Library" toast** — save a result that's already saved, verify info toast `[CODE]`

#### Source Info Panel
- [ ] **Toggle source info** — click shield icon, verify SourceInfoPanel expands inline below card `[CODE]`
- [ ] **Close source info** — click shield again or X button in panel, verify it closes `[CODE]`
- [ ] **Domain name in panel** — panel shows domain name with globe icon `[CODE]`
- [ ] **Trust tier in panel** — panel shows trust tier label (e.g., "Government / Institutional") with colored icon `[CODE]`
- [ ] **Domain preference control** — expand "Domain Preference" section, verify 5 levels: Prefer/Higher/Neutral/Lower/Mute `[CODE]`
- [ ] **Set domain preference** — click a preference level, verify it highlights as selected `[CODE]`
