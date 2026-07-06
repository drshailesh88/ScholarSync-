# Fable 5 — Systematic Review Module · Build Brief (goal prompt)

**You are building ScholarSync's Systematic Review (SR) module from scratch, TDD.** This brief is your spec. Read it fully, then read the linked files, then build. The prototype defines *what it does and how the workflow flows*; `design.md` defines *how every pixel looks*; Covidence/Elicit are your reference for anything unresolved. You are supervised — check in with the user mid-sprint on any hard blocker.

---

## 0. THE CORNERSTONE RULE — Stolen UX ≠ Stolen UI

> **Take the flow and the interaction pattern; render every pixel in `design.md`. The moment you reach for a competitor's colour, shadow, component look, or layout styling — STOP. You've crossed from stealing UX into cloning UI. Re-skin it into design.md instead.**

- **STEAL the UX (how it works):** Covidence's dual-reviewer screening, the conflict→consensus reconciliation, keyboard-driven include/maybe/exclude, the blinded-until-both-vote pattern, auto-updating PRISMA flow, per-study extraction with source quotes. That hard-won *workflow shape* is what you steal.
- **NEVER the UI (how it looks):** their green brand, card chrome, table styling, buttons, type. Every pixel is `design.md` — ink-first, hairline tables, JetBrains Mono numerals, Source Serif headings, and **our** decision cells: **Include = Jade · Maybe = Amber · Exclude = Tomato** (functional colour), never a copy of theirs.

This is the anti-frankenstein doctrine in one line: **patterns come in, foreign skins never do.** Read `docs/anti-frankenstein-doctrine.md` first.

---

## 1. Sources & authority (what is canonical for what)

| Concern | Authoritative source | Notes |
|---|---|---|
All references are **vendored into the repo** under `docs/systematic-review/reference/` (self-contained) — except the 51M Covidence raw screenshots, which stay at their local path (its distilled analysis is committed).

| **IA / flows / behaviour** | `docs/systematic-review/reference/prototype/systematic-review-funnel.html` (9-screen funnel) + `.../prototype/systematic-review-screens.js` (system states) | The `STAGES` array + `V.<stage>()` view fns are the screen list. |
| **Full scope (superset)** | `docs/systematic-review/reference/spec/systematic-review-module.md` (SR0–SR10) | Supersedes the JS prototype's 6-phase model (spec says so). |
| **Skin (the look)** | `docs/design/design.md` — **written tokens win** | + `docs/design/reference/systematic-review.html` as visual ground-truth for the 9 funnel screens. |
| **Component/interaction craft** | `docs/design/CRAFT-ADDENDUM.md` | Adopted patterns in our tokens — directly relevant to SR: **§A side-peek** (source/record detail), **§A table/data-grid craft** (screening queue + extraction grid: per-column menu, hover-reveal rows, sort/filter, Board group-by), **hover-reveal grammar**, **empty-state-teaches-the-move**, **§B act-on-selection**. Deeper UX reference: `docs/design/reference/SCREEN-CORPUS-INDEX.md` → the **Covidence** (`~/S_S_a_2/covidence-screens/`) + **Elicit** corpora for SR-workflow UX. |
| **Data shapes** | entity list in §4 + `docs/systematic-review/reference/spec/FEATURES-DATA.md` | Use its **field lists only** (OR/RR/SMD, GRADE domains, RoB variants). Its **15-tab navigation is the REJECTED Frankenstein — ignore its screen structure.** Trust its "Re-Audit"/"Behavior Corrections" sections, not its earlier tables. |
| **States** | `docs/design/STATE-INVENTORY.md` (state taxonomy) | Every screen gets empty/loading/error/offline/degraded — not just the happy path. |
| **UX for anything unresolved** | `docs/systematic-review/reference/ux-steal/covidence/covidence-workflow-analysis.md` (distilled patterns) + `docs/systematic-review/reference/ux-steal/elicit/` (screens) + **your Elicit MCP**. Covidence raw screens (per-stage, map 1:1 to our 9): local `~/S_S_a_2/covidence-screens/` | **Covidence** is the stronger steal for the SR *workflow* (screening/conflicts/extraction); its folders `00-dashboard … 07-prisma-export` line up with our screens. |

**Font-token caveat (important):** `design.md` §4 mandates **DM Sans + JetBrains Mono + Source Serif 4**. The reference HTML (`docs/design/reference/systematic-review.html`) loads *only* Source Serif and falls back to system fonts — it is **incomplete**. **Follow the written §4 tokens, not the reference's font-loading.**

---

## 2. The module — 9 screens (build in this order, each a vertical slice)

1. **Review Summary** — funnel home: collapsible stage cards, live counts, "you can still Resolve X / Screen Y" CTA. The spine that routes to every stage.
2. **Import references** — RIS/EndNote/PubMed/CSV import ledger + **dedup queue** (auto-merged vs review-uncertain pairwise). *Consumes* results; no search builder here.
3. **Title & Abstract screening** — queue + reference card + AI-assist rail. Votes: `no/maybe/yes`, AI `suggested` ring, `sel` chosen. **Blinded until both reviewers submit.**
4. **Resolve conflicts** — blinded adjudication queue; κ (kappa) readout.
5. **Full-text review** — Include/Exclude + **mandatory structured exclusion reason** (exclude blocked without one).
6. **Risk of bias** — RoB 2 domain accordions, per-study list, AI justification + provenance, dual-reconcile → traffic-light.
7. **Data extraction** — PDF pane + consensus grid (Final / Reviewer 1 / Reviewer 2), per-cell source quote, "Decision required" conflict pill, verify → reconcile → locked.
8. **PRISMA** — auto-generated flow diagram from live counts, with drill-downs.
9. **Report** — auto-drafted narrative with source chips; hands off to the Writing/editor surface.
   - **Export** (part of Report/final): CSV / RevMan / DOCX. **No in-app stats engine.**

---

## 3. Resolved contradictions — DO NOT re-litigate (rulings, per the prototype-wins directive)

- **Search-strategy builder → NONE.** SR consumes results from the research/deep-research engine (built separately by other agents). It **captures/documents** the search strategy (databases, Boolean string, dates, versions) for PRISMA reproducibility — but does not run searches.
- **In-app stats / meta-analysis (forest/funnel/heterogeneity) → NONE for v1.** Synthesis = narrative + PRISMA counts; export to RevMan/CSV/DOCX for stats. Do not build a stats engine.
- **SR1 Protocol/PICO + SR9 GRADE/Certainty → no mockup exists.** Build **minimal** versions: steal the PICO/protocol flow from Covidence, GRADE from standard convention (4 domains up / 3 down, per-outcome certainty), skinned in design.md. If genuinely blocked, **flag to the user** — do not invent complex machinery.
- **Legacy-only features** (snowballing, living-review alerts, NMA, PROSPERO sync, AMSTAR-2, evidence-gap map) → **OUT of v1** unless the prototype shows them.

---

## 4. Data model (mock these shapes for TDD)

`Review {stage, PICO, reviewers[]}` · `SearchRun {database, booleanString, version, dateRun}` · `Candidate {refId, doi, source, dupeGroup}` · `ScreeningDecision {reviewerId, vote: no|maybe|yes, aiSuggestion, blindedUntil}` · `Conflict {stage, reviewerA, reviewerB, resolverRole}` · `ExclusionReason {code, label, hierarchy}` · `Extraction {field, value, sourceQuote, reviewer1, reviewer2, conflict}` · `RoBAssessment {domain, signallingAnswers[], judgment, justification, aiProvenance}` · `PrismaCounts {identified, dedupeRemoved, screened, excluded, fullTextAssessed, excludedWithReasons, included}` · `Report {section, aiDraft, citationIndex[]}`.

---

## 5. Skin gaps you MUST fill from design.md directly (the reference doesn't cover these)

- **State screens** — loading/empty/error/offline have **zero skin** in the reference. Copy the rhythm from the finished Home states (`docs/design/STATE-INVENTORY.md` + the Paper artboards): skeletons (not spinners), Tomato error + Retry, Amber "cached view" offline, first-run empties with guidance.
- **Icons** — both reference files use raw glyphs (`▤ ◆ ▦ ☁ ✎`). **Replace ALL with Lucide** (design.md §7). No raw glyphs anywhere.
- **Dark theme** — apply design.md §3 tokens (the reference never does).
- **Motion** — design.md §8 tokens + `prefers-reduced-motion` (the reference is static).
- **Decision cells** — Include=Jade / Maybe=Amber / Exclude=Tomato; all numerals JetBrains Mono, right-aligned in tables.

---

## 6. Rules (non-negotiable)

1. **TDD** — RED → GREEN → refactor. **One vertical slice at a time** (all layers per screen), never horizontal slabs. One failing test at a time.
2. **Anti-frankenstein doctrine** (`docs/anti-frankenstein-doctrine.md`) — read first; it governs.
3. **Quality gates** — annealing score stays **FROZEN > 95**; the **139 E2E tests pass**; **medicine-default behaviour unchanged**. Never weaken a test to pass.
4. **Gating** — SR ships behind `NEXT_PUBLIC_ENABLE_V2_MODULES`; feature branch (`feat/systematic-review`); do not touch the default medical flow.
5. **Skin** — `design.md` is the sole skin authority; **written §4 font tokens win** over the reference.
6. **Shell** — use the **locked app shell** (labeled sidebar + ⌘K, per design.md) — do NOT rebuild navigation. The sidebar decision is final.
7. **Supervised** — SR is a core module. Check in with the user mid-sprint on any hard blocker or scope ambiguity the ladder can't resolve. **Not unattended/overnight.**
8. **Follow the project methodology** in `CLAUDE.md` (grill-me → ubiquitous language → PRD/issue → vertical slices → TDD → QA issues → self-anneal → E2E).

---

## 7. UX resolution ladder (for anything the prototype doesn't answer)

1. **HTML prototype** (IA) → 2. **design.md reference** (skin) → 3. **Covidence frozen screens + Elicit frozen screens + your Elicit MCP** (UX pattern) → 4. **the user** (only if 1–3 fail). Always: steal the *pattern*, skin it in design.md.

---

## 8. Success criteria

- All **9 funnel screens** built, each with its **states** (empty/loading/error/offline/interaction), wired to **mock data of the right shapes**, **TDD-covered**.
- **Every pixel design.md** — zero imported competitor chrome, **Lucide icons only**, decision cells in functional colour.
- **Gates green:** annealing > 95, 139 E2E pass, medicine default intact, SR behind the v2 flag.
- **PRISMA counts flow correctly** across screens; **dual-reviewer blinding + conflict/consensus** works; exclusion reasons enforced; extraction shows source quotes.

## 9. Start here

First slice: **Review Summary** (the funnel spine — counts + routing). Then Import → T&A Screening → Conflicts → Full-text → RoB → Extraction → PRISMA → Report/Export. Ship each slice green before the next.
