# Systematic Review Module — Deep UX Spec (Mobbin-first)
**Status:** in progress. **RE-DERIVED FROM FIRST PRINCIPLES** — the repo's old 19-tab UX was bad; the "6-phase" rail was
provisional/repo-anchored. PRISMA 2020 defines the canonical *stages*; the open UX question is how to *present* them so
an overwhelmed PGY-3 can do a Cochrane-grade review without drowning.

**Canonical stages (PRISMA 2020):** Protocol/PICO + eligibility → Search + import (multi-DB) → Deduplicate →
Title/abstract screening (dual + conflicts, κ) → Full-text screening (+ exclusion reasons) → Data extraction (forms,
dual) → Risk of bias / appraisal → Synthesis / meta-analysis (forest/funnel/heterogeneity) → Certainty (GRADE/CERQual) →
Report (PRISMA flow + tables + export).

**Anti-cheating stance carries in:** AI does drudgery (dedupe, suggest screening decisions WITH reasons, pre-fill
extraction WITH source quotes, draft RoB WITH justification) — the human adjudicates every call. Provenance contract +
integrity badges apply throughout.

**Collaboration & blinding (A1 resolved):** screening (SR4/5), extraction (SR6), and RoB (SR7) are **blind by default** —
per-reviewer-private, **no real-time presence/cursors**, revealed only at reconciliation; a banner states the blind
state. Real-time co-editing/presence applies to **co-authoring** surfaces (protocol, draft, report prose). **The PI can
toggle blind ↔ non-blind/consensus** per project. Mobbin: Charma (private peer reviews), Telegram/Deputy (anonymous).

**Monitor (A2 resolved):** the per-project Monitor is **disabled in SR projects** — the search stays frozen/reproducible;
updating it is a manual, explicit, **versioned search amendment** (SR2), never a living feed.

**Credits / pricing (A3 resolved):** SR is a **premium tier** with a **bundled AI allowance**; every large AI batch
(screen N, extract N×fields, RoB, GRADE) **shows estimated cost before running**; **manual is always free** (a whole SR
can be done at 0 credits). No per-tiny-action metering during the multi-week task. Mobbin: Zapier (batch cost preview),
Clay, AWS, Twist.

**Anti-anchoring (B1 resolved):** **AI-blind-first** mode for screening (SR4/5) + extraction (SR6) — the reviewer commits
their own call/value **FIRST**, then the AI suggestion + reason/quote is revealed and any mismatch flagged. Configurable
per project (default blind-first in rigorous dual mode); **human-override rate tracked**. Mobbin: Brilliant, Unity, Codecademy.

**Rigor & provisionality (E2 resolved):** a quiet **rigor/completeness panel** flags gaps (single-DB · solo-screening ·
high heterogeneity · abstract-only · few studies) + honest "unknown" states (**signals, not blocks**); **abstract-only
synthesis = limitations visually dominant + "provisional" badge**; **regenerating synthesis shows a diff**. Mobbin:
Databricks, HubSpot, Apollo. (Clinical over-trust guard = app-wide, see app-screens E1.)

## SR0 — Overall structure & navigation  ✅ LOCKED: pipeline overview = live PRISMA funnel + stage rail; stage = focus mode
- **SR home = live PRISMA funnel:** stages as a flow with **live counts** (found → after dedupe → screened → full-text →
  included) — the overview **doubles as the PRISMA flow diagram** (navigation = deliverable). Click a stage → enter it.
- **Persistent stage rail:** status (done/active/locked) + progress + jump; **guided but NON-LINEAR** (revisit/iterate;
  gentle "do X first" nudges).
- **Enter a stage → focus mode** (breadcrumb + autosave + Exit). Fits the app's 3-level nav.
**States:** overview (funnel) · stage-focus · iterating (counts update) · blocked-nudge · complete.
**Failure/edge:** skip-ahead → warn (counts incomplete) · re-run upstream → downstream flagged **stale** · empty (new
review → guided start).
**Refs:** Employment Hero (stepper + lifecycle), Squarespace/Mixpanel/Amplitude (funnels), Profound (progress),
Covidence/Elicit.

## SR1 — Protocol / PICO + eligibility  ✅ LOCKED: structured builder, AI-drafts-from-question, human adjudicates
- Plain research question → **AI drafts** PICO/PICOS fields (P/I/C/O/study-design) + **include/exclude eligibility** as
  editable **structured fields** ("Uses AI — verify" framing) → **human reviews/edits/approves every field**.
- **Locked criteria drive** later AI **screening reasons** + PRISMA counts (the rigor through-line). Optional
  **PROSPERO/protocol export**.
**States:** question-entry · AI-drafting · review/edit (per field) · approved/locked · export · amend (versioned).
**Failure/edge:** vague question → AI asks clarifying Qs · criteria edited after screening → flag downstream **stale** ·
"verify" never auto-final · amendment log (audit).
**Refs:** ClickUp, Confluence, Vapi, Gorgias, Canva (AI-draft→human-edit).

## SR2 — Search + import (multi-database)  ✅ LOCKED: AI-built Boolean per DB + native run + file import, reproducible
- **AI drafts the Boolean string per database** (PubMed/Embase/Cochrane syntax, MeSH/Emtree/field tags) **from the locked
  PICO** → human edits/owns. **Run natively** where the app has access (PubMed/bioRxiv/…); **import .ris/.nbib/.bib** for
  the rest. **Every string saved + reproducible** (it IS the published method). Import counts → PRISMA "records identified".
**States:** build-string (AI draft→edit) · run (native) · import (file→summary) · saved-strategy · re-run (versioned).
**Failure/edge:** zero results → suggest broaden · syntax error → AI fix · file parse error → map fields · re-run later →
flag new records + downstream stale.
**Refs:** Sprout Social, Exa, Vercel (query builders) · HubSpot, Customer.io, Neon (import).

## SR3 — Deduplicate  ✅ LOCKED (follows AI-drudgery + human-adjudicate principle)
- **Auto-dedupe:** high-confidence duplicates **auto-merged** (records kept, merge trail); **uncertain pairs queued** for
  quick human review (side-by-side, merge / keep-both). Counts → PRISMA "duplicates removed".
**States:** detecting · auto-merged (summary) · review-uncertain (pairwise) · done.
**Failure/edge:** false merge → undo/split · cross-database variants → fuzzy match · over-merge risk → conservative default.
**Refs:** Customer.io (import/merge) + dedupe-cluster patterns.

## SR4 — Title/abstract screening (dual + conflicts, κ)  ✅ LOCKED: AI assists, two humans decide independently
- **Rapid keyboard triage:** Include / Exclude / Maybe + reason. **AI pre-suggests** a decision **with reason +
  provenance** (abstract phrase ↔ the specific eligibility criterion) → reviewer **accepts/overrides**; **AI never
  auto-decides**.
- **Dual independent (blind) screening** → **conflict-resolution queue** (A≠B → adjudicate) + **live Cohen's κ**. Counts
  → PRISMA "screened / excluded".
**States:** queue · screening (record + AI suggestion) · my-progress · conflicts (adjudicate) · κ-readout · done.
**Failure/edge:** AI suggestion off → override logged · solo mode → flag lower rigor · huge queue → prioritized order ·
blind broken → warn.
**Refs:** Matter, Linear (triage) · Peec AI (suggest+reason) · GitHub, GitBook, Hex (dual review/conflict).

## SR5 — Full-text screening (+ exclusion reasons → PRISMA)  ✅ LOCKED (follows SR4 + structured exclusion reasons)
- Same **dual + AI-assist** model on **full-text PDFs** (in-app reader + criteria side-by-side). Every **exclusion needs
  a structured reason** (configurable list) — **AI suggests reason + provenance**; conflicts adjudicated.
- Counts + reasons → **PRISMA "full-text assessed / excluded with reasons"**.
**States:** retrieve-PDF · reading + criteria · decide (+reason) · conflicts · done.
**Failure/edge:** PDF not found → request/upload/mark not-retrieved (PRISMA) · paywalled → ILL note · reason missing →
block exclude.
**Refs:** SR4 pattern + reader (NotebookLM/Readwise) + provenance contract.

## SR6 — Data extraction (forms, dual)  ✅ LOCKED: Elicit-style table, AI pre-fills + per-cell source quote, human verifies, dual
- **Extraction table:** rows = included studies, columns = fields (**AI-suggested presets**: outcome / sample size /
  effect size / study design / population… OR **"describe a column"** custom). **AI pre-fills each cell + a source
  quote**; **click cell → quote modal** showing the exact text in the PDF (provenance contract).
- **Human verifies/edits every cell**; **dual extraction (2 reviewers) + reconciliation**; verified table feeds
  synthesis/meta-analysis.
**States:** define-columns · AI-filling · verify (per cell, quote) · reconcile (A vs B) · locked-dataset.
**Failure/edge:** AI cell unsupported → flagged unverified (can't enter analysis) · unit mismatch → convert/flag ·
missing data → "not reported" · reconcile disagreement → adjudicate.
**Refs:** Elicit, Clay, Relevance AI (AI tables) · Contractbook, Revolut (doc↔form) · provenance contract.

## SR7 — Risk of bias / quality appraisal  ✅ LOCKED (follows AI-assist + provenance + dual pattern + traffic-light viz)
- **Per-study, per-domain assessment** with the right instrument (RoB2 / ROBINS-I / QUADAS-2 / NOS / AMSTAR-2 / PROBAST —
  auto-suggested by study design; user can change). **AI suggests each domain judgment** (low / some-concerns / high) +
  **justification + provenance quote** → **human adjudicates**; **dual** + reconcile.
- Output = **traffic-light / scorecard grid** (RAG per domain) + summary plot → feeds synthesis + GRADE.
**States:** pick-tool · assess (per domain + AI suggestion + quote) · adjudicate · dual-reconcile · traffic-light view.
**Failure/edge:** wrong tool for design → warn/switch · AI judgment off → override logged · missing info → "no information".
**Refs:** Deel, Grain, Coda (colored rating matrix) + SR4/SR6 review pattern + provenance contract.

## SR8 — Synthesis / meta-analysis  ✅ LOCKED: guided analysis workbench, AI suggests + computes transparently, human owns
- Pick outcome → **AI recommends** whether meta-analysis is appropriate + model (fixed/random) + why → **computes forest
  plot · funnel plot · heterogeneity (I²/τ²)** **from the verified extraction table** (every number traceable to a cell)
  → **human chooses** model / subgroups / sensitivity + **writes interpretation**.
- **Non-poolable → AI-assisted structured narrative synthesis (SWiM).** AI guides + computes transparently; **never
  fabricates a pooled estimate or its meaning.**
**States:** pick-outcome · model-recommend · compute (forest/funnel/I²) · adjust (subgroups/sensitivity) · interpret · narrative.
**Failure/edge:** too few studies → block pooling + narrative · high heterogeneity → flag + explore · numbers not traceable
→ flag · funnel asymmetry → publication-bias note (→ GRADE).
**Refs:** Amplitude, Mixpanel, Hex (analysis/charts/formulas) + grounded charts (S4) + provenance.

## SR9 — Certainty (GRADE / CERQual)  ✅ LOCKED (follows AI-assist + human-adjudicate pattern)
- **Per-outcome GRADE:** AI suggests the rating + the **downgrade factors** (risk of bias · inconsistency · indirectness ·
  imprecision · publication bias) + upgrade factors, **each with justification** (drawing on RoB + heterogeneity + funnel)
  → **human adjudicates**. Output = **Summary of Findings (SoF) table**. CERQual for qualitative.
**States:** per-outcome · AI-suggested factors · adjudicate · SoF table.
**Failure/edge:** factor conflicts → show evidence · override logged · qualitative → CERQual path.
**Refs:** SR7 pattern + SoF-table conventions + provenance.

## SR10 — Report (PRISMA flow + tables + export)  ✅ LOCKED: auto-assemble traceable PRISMA draft → human authors prose in Writing
- **Auto-assembled factual scaffold from the pipeline:** Methods (protocol + saved search strategy + screening) ·
  Results numbers (synthesis) · tables (study **characteristics** from extraction · **RoB traffic-light** · **GRADE SoF**) ·
  **PRISMA flow diagram (= the live funnel)** · **PRISMA checklist** completion tracker. **Every figure traceable** to source.
- **Opens in the Writing module** (continuity + provenance) for the **human to author the interpretation/discussion**.
  Export **Word / PDF / LaTeX + data**. (Facts assembled; interpretation human-authored — the anti-cheat line.)
**States:** assembling · draft (scaffold + tables + diagram) · checklist (gaps) · authoring (Writing module) · export.
**Failure/edge:** missing prerequisite stage → checklist flags gap · number not traceable → flag (can't claim) ·
checklist incomplete → warn before export · amendments → re-assemble + version.
**Refs:** Elicit (report + characteristics table), Vanta/Remote (checklist completion), Zendesk (report builder), Writing handoff.

> **SYSTEMATIC-REVIEW MODULE COMPLETE** — SR0–SR10, Mobbin-first, re-derived from first principles, states + failure
> paths. **ALL THREE creative module deep-dives done (Slides · Diagrams · SR).**
