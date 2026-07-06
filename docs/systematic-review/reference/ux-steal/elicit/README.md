# Elicit — Screen & Flow Corpus

Captured **2026-06-26**. **86 screenshots** (62 unique screens) across **8 desktop surfaces**, 2.3 MB.
Built to reverse-engineer ScholarSync's systematic-review and research surfaces.

## Source of record

Elicit's product is **paywalled** and login-gated, so its real in-product UI was harvested from the
**Mobbin** design library (app: "Elicit", platform: **web**) — the canonical public source. Every screen
discussed below carries a `mobbin.com/screens/<id>` link in `manifest.json`; every flow links to its
Mobbin flow page. Nothing here is mocked or imagined.

- **Mobbin web** — rich Elicit coverage (11 distinct flows + standalone hero screens). Used in full.
- **Mobbin iOS** — **no Elicit app exists** (search returned only ChatGPT/Gemini/Perplexity/Grok). See `mobile/`.
- **Lazyweb** — **unavailable this session**: the Lazyweb skill pack is deprecated and the backend
  refused every call (`skill_deprecated`, requires upgrade). No Lazyweb screens were harvested. The
  installer it suggested (`curl … | bash`) was **not** run — that is the user's call, not an unattended one.

## Contents

| Surface folder | Screens | What it covers |
|---|---:|---|
| `evidence-matrix/` | 29 | The papers×attribute-columns matrix; create-notebook, add-column (column-as-a-question), filter |
| `sr-workflow/` | 15 | The systematic-review / research-report **stepper**: Gather → Screen → Extract → Generate |
| `screening/` | 4 | Yes/Maybe/No criteria cells, inclusion-score threshold, per-criterion reasoning |
| `extraction/` | 12 | Detailed cell extractions; Extract-data-from-PDFs upload→matrix flow |
| `find-papers/` | 9 | Search-by-research-question home & states; List-of-concepts tool |
| `report-notebook/` | 6 | Notebook steps (summarize papers), final narrative report with citations |
| `chat-with-papers/` | 8 | Chat-with-papers (Beta): scoped Q&A over selected papers with numbered citations |
| `library/` | 3 | Saved-paper library, tags, Upload Papers, Connect Zotero |
| `mobile/` | 0 | Documented **absence** — Elicit has no mobile app (`NO-MOBILE-APP.md`) |

Filenames follow `<flow>-<NN>-<screenIdPrefix>.webp` so each flow reads in order within its folder.

## Index by surface

### evidence-matrix/ (the signature Elicit artifact)
- **create-notebook** (9) — home → research question → search → matrix builds; suggested-columns rail.
  Flow: https://mobbin.com/flows/970d4486-ecd9-4a63-a76e-316c03ef54c3
- **add-column** (10) — "Search or create a column" → describe-what-to-extract → Answer Structure
  (Any answer / Specified / Yes-No-Maybe) → values fill per row. **This is column-as-a-question.**
  Flow: https://mobbin.com/flows/21ab1d25-b23f-414c-b458-dfc35d855e2d
- **filter** (9) — Has-PDF, publication year, journal quality (Q1–Q4), Study Type (RCT/Review/Meta-analysis),
  abstract keyword include/exclude; sort.
  Flow: https://mobbin.com/flows/96f27939-f2c1-4571-ba8f-ade026a1eaec
- **matrix-with-summary** (1) — narrative "Summary of top N papers" sitting above the live matrix.
  Screen: https://mobbin.com/screens/1966eb67-a99c-47d1-a18f-4cc633d258ee

### sr-workflow/ (the stepper to reverse-engineer)
- **report-steps** (6) — the **4-stage status rail**: Gather papers → Screen papers → Extract data →
  Generate report, each with a count + "Details" link; ends at the narrative report.
  Flow: https://mobbin.com/flows/c0539b4f-6ace-46dc-9c22-4df7577ec787
- **generate-report** (9) — full journey from home through gathering (50 found) to references with
  Download BIB/RIS/TXT.
  Flow: https://mobbin.com/flows/dbc21bf1-ad49-474f-9930-c78cd192b4e3

### screening/
- **screening-criteria-table** (1) — criteria as columns, **Yes / Maybe / No** chips per cell; "Add
  screening columns" / "Evaluate screening" rail.
  Screen: https://mobbin.com/screens/aa94388b-4fbb-4136-9377-bd24e2925840
- **expand-criteria** (3) — Include chip + **inclusion score (e.g. 4.9/5)**, score-threshold slider,
  "50 evaluated / 10 included / 40 excluded", per-criterion reasoning panel beside the abstract.
  Flow: https://mobbin.com/flows/61d8afe3-9a36-498c-aca6-8e0bc3c2ef82

### extraction/
- **extraction-definition-table** (1) — each column holds an AI-extracted **bullet list per paper**
  with source chips; "Add extraction columns" rail.
  Screen: https://mobbin.com/screens/b0a2439c-e5a4-4a07-a176-6222138fe763
- **extract-from-pdfs** (11) — upload PDFs → processing → Add tags → extracted matrix over your own papers.
  Flow: https://mobbin.com/flows/8adfa568-bea4-4f12-a90f-549fa45ac6dd

### find-papers/
- **home** (4) — "Find papers / Ask a research question" with example prompts, Get-a-research-report,
  Start-a-systematic-review (PRO), Quick tools; "Great question!" inline validation; results list.
- **list-of-concepts** (5) — Quick tool that returns a **Concept × Source** table with supporting quotes.
  Flow: https://mobbin.com/flows/a07ab4be-69a0-4448-9b47-39405626095a

### report-notebook/
- **summarize-papers** (5) — "Add a new step" → summarize → narrative paragraph with inline citations.
  Flow: https://mobbin.com/flows/1b71ea68-5c65-4955-a149-3af86bb3d05d
- **final-report** (1) — Characteristics-of-Included-Studies table + status rail + Chat.
  Screen: https://mobbin.com/screens/f4e4a1d3-091f-4342-a64b-41db712535ec

### chat-with-papers/
- **chat** (8) — "Add a new step → Chat with papers (Beta)", N-papers scope chip, **Use full text**
  toggle, answers with numbered citations.
  Flow: https://mobbin.com/flows/0cdea57f-0bc3-46fe-8360-882c5a0515b4

### library/
- **library-list** (1) — paper rows with checkboxes, Sort/Filter/Tag/Delete toolbar, **Upload Papers**
  + **Connect Zotero**. https://mobbin.com/screens/4f6ccc2c-f5ff-4451-b66f-7c42b1d051d4
- **upload-add-tags** (1) + **upload-papers-modal** (1) — the upload/tag path.

## Coverage gaps (reported honestly)

- **No mobile/responsive evidence.** Elicit has no native app and Mobbin holds no narrow-width Elicit
  captures. The mobile reimagining in the analysis is therefore *prescriptive*, not copied.
- **No Lazyweb corpus** this session (backend deprecated — see above). All evidence is Mobbin-web.
- **Settings, auth, billing, sharing/permissions, team** surfaces were out of scope (not research-core)
  and not harvested.
- **Cell-level extraction "expand"** (clicking a single cell to see the model's quote+reasoning) is
  represented via the screening `expand-criteria` detail panel and extraction bullet+source chips, but a
  dedicated single-cell drill-down modal was not separately catalogued on Mobbin.
- A few **near-empty progress/loading frames** are included where they show real interaction states
  (searching, uploading, generating) rather than being deduped away.

See `manifest.json` for the machine-readable index (every screen: surface, flow, position, screen_id,
mobbin_url, image_url, file, notes) and `elicit-ux-analysis.md` for the ADOPT/ADAPT/AVOID teardown.
