# presentation — Spec 016

STATUS: DONE
TESTED: 35/35
PASS: 35
FAIL: 0
BLOCKED: 0
PAGE: http://localhost:3001/presentation
MODULE: presentation

---
### Reference Import Panel
#### Zotero Tab
- [x] PASS: **28.14** "API Key" label and input with placeholder "Your Zotero API key" (`reference-import-panel.tsx:385`, `:390`, `:391`)
- [x] PASS: **28.15** "User ID" label and input with placeholder "Numeric user ID" (`reference-import-panel.tsx:397`, `:401`, `:402`)
- [x] PASS: **28.16** "Connect & Import" button, disabled when loading or fields empty (`reference-import-panel.tsx:408-409`, `:412`)
- [x] PASS: **28.17** Button shows "Fetching..." with CircleNotch spinner while loading (`reference-import-panel.tsx:417-418`, `:422`)
- [x] PASS: **28.18** API: POST /api/references/zotero (`reference-import-panel.tsx:154`)
- [x] PASS: **28.19** Errors show "Zotero fetch failed" fallback (`reference-import-panel.tsx:181`)
#### DOI Tab
- [x] PASS: **28.20** Help text: "Look up a single reference by its DOI." (`reference-import-panel.tsx:430`, `:433`)
- [x] PASS: **28.21** DOI input with placeholder "e.g., 10.1038/nature12373" (`reference-import-panel.tsx:438`, `:442`)
- [x] PASS: **28.22** Enter key triggers lookup (`reference-import-panel.tsx:439`)
- [x] PASS: **28.23** "Lookup" button with MagnifyingGlass icon, disabled when loading or empty (`reference-import-panel.tsx:446-447`, `:450`, `:455-458`, `:460`)
- [x] PASS: **28.24** API: POST /api/references/parse for DOI (`reference-import-panel.tsx:200`)
- [x] PASS: **28.25** Errors show "DOI lookup failed" fallback (`reference-import-panel.tsx:222`)
#### Error & Loading
- [x] PASS: **28.26** Error banner with Warning icon and dismiss X button (`reference-import-panel.tsx:468`, `:470`, `:472-473`)
- [x] PASS: **28.27** Loading state shows "Processing..." with CircleNotch spinner (`reference-import-panel.tsx:479`, `:481`, `:482`)
#### Reference List
- [x] PASS: **28.28** Header shows "N references imported" with count (`reference-import-panel.tsx:487`, `:492`)
- [x] PASS: **28.29** Selected count badge shown when > 0: "(N selected)" (`reference-import-panel.tsx:493`, `:495`)
- [x] PASS: **28.30** "Select all" button (`reference-import-panel.tsx:508`, `:511`)
- [x] PASS: **28.31** "Clear" button (`reference-import-panel.tsx:514`, `:517`)
- [x] PASS: **28.32** Filter toggle button with Funnel icon and CaretUp/CaretDown (`reference-import-panel.tsx:501`, `:504-505`)
- [x] PASS: **28.33** Search input with placeholder "Search references..." (`reference-import-panel.tsx:532-533`)
- [x] PASS: **28.34** Type filter dropdown showing "All types" + unique types (`reference-import-panel.tsx:537`, `:540`, `:543-544`)
- [x] PASS: **28.35** Per-reference row: clickable, selected state with brand border (`reference-import-panel.tsx:559`, `:562`)
- [x] PASS: **28.36** Checkbox indicator: Check icon when selected, empty border otherwise (`reference-import-panel.tsx:571`, `:576-577`)
- [x] PASS: **28.37** Reference title displayed (`reference-import-panel.tsx:587`)
- [x] PASS: **28.38** Authors: first 3 joined, or "Unknown authors" fallback (`reference-import-panel.tsx:587`)
- [x] PASS: **28.39** Journal name shown when present (`reference-import-panel.tsx:593`)
- [x] PASS: **28.40** Remove button with X icon per reference (`reference-import-panel.tsx:602`, `:608`)
- [x] PASS: **28.41** "No references match your filter." empty filter state (`reference-import-panel.tsx:613`, `:615`)
- [x] PASS: **28.42** "Use N Selected Reference{plural}" button, disabled when 0 selected (`reference-import-panel.tsx:622-623`, `:626`, `:631-632`)
#### Detailed QA Coverage
- [x] PASS: `/presentation` initializes with `loading = true` and calls `getUserDecks()` from a client `useEffect`
- [x] PASS: `/presentation` header action label is `New Presentation` without a leading `+` character
- [x] PASS: List-page loading state renders exactly three pulsing aspect-video rectangles
- [x] PASS: Route-level `src/app/(app)/presentation/loading.tsx` separately renders a skeleton heading plus six `SkeletonCard` placeholders
- [x] PASS: Empty-state CTA button uses `Sparkle` icon and label `Create Presentation`
- [x] PASS: Empty-state helper text explicitly says users can create from papers, documents, or start from scratch
