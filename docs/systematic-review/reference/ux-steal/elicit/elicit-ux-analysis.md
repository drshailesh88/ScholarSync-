# Elicit — Deep UX Analysis for ScholarSync's Systematic-Review & Research Surfaces

What to **reverse-engineer** from Elicit (the gold standard for AI-assisted literature work) and what to
**leave behind**. Every pattern below was observed in the captured corpus; key claims link to the source
Mobbin screen. The recommendation grammar is **ADOPT / ADAPT / AVOID**.

> **Brand reframe up front.** ScholarSync's new identity is near-monochrome — *ink is the brand*, Radix
> **Slate** tokens, **functional color only**, **serif headlines**, on shadcn/Tailwind, with **mobile
> co-equal to desktop**. Elicit's signature **teal** (its buttons, brand mark, accent chips) is precisely
> what we will **not** copy. We steal Elicit's *information architecture and interaction model*, then
> render it in graphite ink with color reserved for one job: encoding a screening/extraction *decision*.

---

## 0. The core insight: Elicit turns "a literature review" into "a spreadsheet you can ask questions"

Elicit's whole product is one idea executed relentlessly: **a table where rows are papers and columns are
questions you pose to every paper at once.** Find-papers, screening, and extraction are not three apps —
they are the *same matrix* with different column *types*. The systematic-review workflow is just that
matrix wrapped in a four-step **stepper** that produces a narrative report at the end.

That is the thing to reverse-engineer. Not the teal. The **matrix-as-a-question-engine** and the
**stepper-as-a-method-guarantee.**

---

## 1. The evidence matrix (papers × AI-extracted attribute columns)

**Observed** (`evidence-matrix/`, e.g. https://mobbin.com/screens/1966eb67-a99c-47d1-a18f-4cc633d258ee):
- Left frozen column = the **paper** (title, authors +N, venue, year, citation count, source/DOI chips,
  "Elicit Search" provenance tag).
- Each subsequent column = an **AI-extracted attribute** (Abstract summary, Data collection, Methodology,
  Intervention, Outcome measured, Limitations…).
- A right-hand **"Manage Columns" rail** lists the current columns and a menu of **suggested columns** plus
  "Search or create a column."
- Cells carry tiny **source chips / superscripts** that point back to the passage the value came from.
- Above the grid: a one-paragraph **narrative summary** of the top-N papers with inline citations, and a
  toolbar (Sort, Filters, Export as, selection count, density/expand toggles).

**ADOPT**
- Rows = papers with a sticky identity column; columns = questions. This is the spine of the SR module.
- **Provenance on every cell.** The source chip is the trust mechanism for an AI table — never show an
  extracted value without a one-tap path to "where did this come from." This is non-negotiable for an
  academic audience.
- The **right rail as the column-management surface** (current columns + suggestions + create).
- **Narrative summary co-located above the structured matrix** — give the reader the prose *and* the grid.

**ADAPT**
- Recolor entirely to ink. Cell text = graphite; source chips = a subtle underline/footnote-marker in
  Slate, not a colored pill. Reserve saturated color strictly for decision cells (§3).
- Replace Elicit's icon-typed column headers with **serif/label-cased headers + a type glyph** (text,
  list, Yes/No/Maybe, number) so column semantics read at a glance in monochrome.
- Density is a first-class control: ship **Comfortable / Compact** row heights (Elicit's rows are tall;
  reviewers screening 200 papers want compact).

**AVOID**
- Elicit's teal selection highlight and teal "Add" affordances.
- Letting suggested columns feel infinite/cluttered — curate a tight, discipline-aware default set
  (medicine vs. other sciences) rather than a generic dump.

---

## 2. Column-as-a-question ("describe what data you want to extract")

**Observed** (`evidence-matrix/add-column-*`, flow https://mobbin.com/flows/21ab1d25-b23f-414c-b458-dfc35d855e2d):
- "Search or **create a column**" → a popover with **Column name** + **Instructions** ("Explain how data
  was gathered e.g., surveys, interviews, experiments…").
- An **Answer Structure** switch: **Any answer / Specified / Yes-No-Maybe.**
  - *Specified* lets you enumerate allowed values (e.g., Dataset, Observation) → constrains the model to a
    controlled vocabulary.
  - *Yes-No-Maybe* turns the column into a screening/eligibility question.
- On save, Elicit runs the question across **every row** and fills cells, each with a source chip.

**ADOPT**
- **The column *is* the prompt.** A natural-language instruction + an output-shape selector is the single
  most reusable primitive in the product. ScholarSync should make "add a column" = "ask all my papers a
  question, in a shape I choose."
- The three answer shapes (free text / controlled list / categorical decision) map *exactly* onto the
  three jobs of a review: extraction (text), data-coding (controlled list), eligibility (categorical).
- **Reusable column presets** (Elicit shows "Save as preset" / column presets) — reviewers re-run the same
  extraction schema across projects. Ship a preset/library concept.

**ADAPT**
- Add a **"why" field surfaced as a tooltip on the header** so a second reviewer understands the intent of
  a column months later (durable, audit-friendly — fits ScholarSync's review-rigor positioning).
- Offer a **PICO / discipline template** when creating columns in medicine mode; generic-science templates
  otherwise. (Multi-domain mandate: column suggestions are domain-routed.)
- Make output-shape choice drive the **cell renderer**: list → chips, Yes/No/Maybe → decision token,
  number → right-aligned monospace.

**AVOID**
- Hiding the instruction after creation. Keep it editable and visible — extraction reproducibility depends
  on it.
- Free-text-only columns as the default for coding tasks; nudge toward *Specified* to keep data tidy.

---

## 3. Screening (Yes / Maybe / No, criteria columns, evaluate screening)

**Observed** (`screening/`, https://mobbin.com/screens/aa94388b-4fbb-4136-9377-bd24e2925840 and flow
https://mobbin.com/flows/61d8afe3-9a36-498c-aca6-8e0bc3c2ef82):
- Screening criteria are **columns**; each cell is a **Yes / Maybe / No** token (color-coded).
- "Add screening columns" rail with suggested criteria; "Evaluate screening" CTA; "Return to report."
- Expanding a paper shows an **inclusion score (e.g. 4.9 / 5)**, an **Include** badge, a **score-threshold
  slider** ("papers at/above this value are included; below are excluded"), and a live tally
  **"50 evaluated · 10 included · 40 excluded."**
- A detail panel lists **per-criterion reasoning** ("Real-Time Processing — the abstract explicitly
  mentions… ") next to the paper's abstract.

**ADOPT**
- **Criteria-as-columns + categorical decision cells** is the cleanest screening UI in the category. Keep it.
- **Inclusion score + adjustable threshold** is brilliant: it turns subjective triage into a tunable knob
  and makes the include/exclude boundary *visible and movable*. Adopt the slider + live counts.
- **Per-criterion reasoning beside the abstract** = the human-in-the-loop override surface. Adopt it; this
  is where a reviewer agrees/overrides the AI, which is the heart of PRISMA-defensible screening.
- The running **evaluated/included/excluded tally** — it's the seed of the PRISMA flow diagram.

**ADAPT**
- **This is the one place saturated color earns its keep.** In our monochrome system, encode the decision
  semantically: Include / Maybe / Exclude get three deliberate functional hues (e.g. a restrained
  green/amber/red or, more on-brand, a single ink-to-positive ramp) — used *only* here and in extraction
  confidence. Everything around them stays graphite so the decisions pop.
- Make every AI decision an explicit **two-state**: the model's suggestion **and** the reviewer's
  confirmation/override, both stored. Elicit shows reasoning; ScholarSync should *capture the human verdict*
  as first-class data (dual-reviewer ready).
- Generate a **PRISMA flow diagram** from the tally for free — a credibility artifact Elicit doesn't
  foreground and a natural ScholarSync differentiator.

**AVOID**
- Auto-applying include/exclude without a visible human-confirm step. For a systematic review, "the AI
  decided" is not citable; "the reviewer decided, AI-assisted" is.
- Color as the *only* channel for the decision (accessibility + monochrome brand): always pair the hue with
  a label/glyph (✓ Include / ~ Maybe / ✕ Exclude).

---

## 4. Extraction (detailed cell extractions)

**Observed** (`extraction/`, https://mobbin.com/screens/b0a2439c-e5a4-4a07-a176-6222138fe763 and the
upload flow https://mobbin.com/flows/8adfa568-bea4-4f12-a90f-549fa45ac6dd):
- Extraction columns hold **structured bullet lists per paper** ("Type of neural network: … / Architecture
  details: … / Number of participants: Not mentioned"), each bullet with a **source chip**.
- Honest **"Not mentioned / Not specified"** values when the paper is silent — the model doesn't hallucinate
  a value.
- "Extract data from PDFs" lets you **upload your own PDFs**, processes them, prompts to **Add tags**, then
  builds the same matrix over your corpus.

**ADOPT**
- **Structured multi-field cells** (a column can return a labeled bullet list, not just a scalar) — perfect
  for "Data collection & dataset characteristics" style extractions.
- **"Not mentioned" as an explicit, designed state.** Surfacing absence honestly is a trust feature; bake
  it into the cell renderer and into exports.
- **Upload-your-own-PDFs → same matrix.** The extraction engine must work over both discovered papers and
  the reviewer's own corpus, with identical UI.

**ADAPT**
- Add a **per-cell confidence + "verify" affordance**: tap a cell → side panel shows the exact source
  passage highlighted in the PDF, plus accept/edit. (Elicit shows source chips; ScholarSync should close
  the loop to the highlighted span — a stronger trust artifact and a better mobile target, §9.)
- Make extracted tables **export-clean** (CSV/RIS already in Elicit; add a tidy "one row per paper, one
  column per field" CSV and a citationful DOCX for the methods appendix).

**AVOID**
- Dense bullet cells with no expand on small screens — they must collapse to a count + tap-to-expand on
  mobile (§9).

---

## 5. The systematic-review workflow stepper (the method guarantee)

**The exact Elicit SR/report steps observed** (status rail in `sr-workflow/report-steps-*`,
https://mobbin.com/flows/c0539b4f-6ace-46dc-9c22-4df7577ec787):

1. **Gather papers** — "50 papers found" (search across the literature for the research question).
2. **Screen papers** — "10 papers included" ("Filtering studies based on inclusion criteria").
3. **Extract data** — "50 data points extracted" ("Capturing key metrics and findings from every paper").
4. **Generate report** — "Summarizing findings" → the narrative report.

Supporting details: each step shows a **live count** and a **"Details" link** that opens that step's matrix;
a persistent **Chat** panel sits beside the rail ("Ask anything about the report or its underlying data");
the report header states the method in prose — *"We analyzed 10 papers from an initial pool of 50, using 6
screening criteria. Each paper was reviewed for 5 key aspects…"*. Entry point is the home tile **"Start a
systematic review (PRO)"** alongside "Get a research report."

**ADOPT**
- The **four-stage linear stepper** (Gather → Screen → Extract → Generate) is the product's backbone and a
  near-perfect mental model for a review. Adopt the stages, the **per-stage live counts**, and the
  **"Details" drill-in to the underlying matrix** at each stage.
- **Method-as-prose**: auto-writing the "we analyzed N of M using K criteria" sentence is a credibility
  multiplier. Adopt and extend toward a full **auto-drafted Methods section**.
- A **report-scoped Chat** anchored to the underlying data, not a generic chatbot.

**ADAPT**
- Render the stepper as a **persistent vertical rail on desktop** and a **horizontal progress stepper +
  bottom sheet on mobile** (§9). Each stage is a *destination*, not just a status light.
- Make the stages **revisitable and non-destructive**: changing screening criteria re-flows extraction with
  a clear "X papers changed" diff — reviews are iterative, not one-shot.
- Bake in **the review protocol** as a pre-stage (research question, eligibility criteria, search strategy)
  so the stepper outputs a PRISMA-ready trail. This is where ScholarSync can out-rigor Elicit.

**AVOID**
- Gating SR behind a teal "PRO" lock in the primary flow's face. (Monetize, but don't let the lock be the
  loudest thing on the canvas — Elicit's upgrade chrome is persistently present.)
- Treating "Generate report" as a black box: every sentence in the report must trace to a row/cell.

---

## 6. The report / notebook (narrative + citations)

**Observed** (`report-notebook/`, `sr-workflow/generate-report-09`): a titled report with a **serif headline
already** (Elicit uses a serif for report titles — validation for our serif-headline direction), Abstract,
Methods, **"Characteristics of Included Studies"** table, inline numbered citations, a **References** list
with **Download BIB / RIS / TXT**, and **Save PDF / Share**. The notebook model lets you **"Add a new step"**
(summarize papers, chat, extract) so a report is a stack of composable blocks.

**ADOPT**
- **Notebook = composable steps.** A research output is an ordered list of blocks (search, summarize,
  extract-table, screen, chat), each re-runnable. Adopt this block model — it's more flexible than a fixed
  report template.
- **Citations everywhere, exportable** (BIB/RIS/TXT + PDF). Table-of-included-studies as a first-class block.
- Serif report headlines (we were going there anyway; Elicit confirms it reads as "scholarly").

**ADAPT**
- Push citation management harder (Zotero is already in the Library, §7): one-click "send all included
  studies to Zotero/BibTeX," and a live **bibliography block**.
- Offer **discipline-aware report templates** (PRISMA SR vs. scoping review vs. narrative review) under the
  multi-domain router.

**AVOID** — the teal "Share/Save PDF" buttons and teal stepper checks; render in ink with a single
functional-positive accent for "complete."

---

## 7. Library + Chat-with-papers (supporting surfaces)

**Library** (https://mobbin.com/screens/4f6ccc2c-f5ff-4451-b66f-7c42b1d051d4): paper list with checkboxes,
**Sort / Filter / Tag / Delete** toolbar, **Upload Papers**, **Connect Zotero**, tags shown per paper.
**Chat-with-papers** (`chat-with-papers/`, flow https://mobbin.com/flows/0cdea57f-0bc3-46fe-8360-882c5a0515b4):
"Add a new step → Chat with papers (Beta)", an **N-papers scope chip**, a **"Use full text" toggle**,
answers with **numbered citations** back to the scoped set.

- **ADOPT**: a real **Library** (tags, upload, Zotero) as the persistent home for a reviewer's corpus;
  **scoped** chat (you always see *which* papers the answer is grounded in) with a full-text vs.
  abstract-only toggle and numbered citations.
- **ADAPT**: make the scope chip and citations *louder* than Elicit's faint treatment — grounding is the
  selling point; surface "answered from 3 papers, 7 passages" prominently.
- **AVOID**: an ungrounded, whole-internet chatbot vibe. Chat must always be tethered to the corpus.

---

## 8. Cross-cutting interaction & visual notes

- **Right-rail-as-control-surface** is Elicit's consistent pattern (Manage Columns, Screening results,
  Report status all live in a right rail). ADOPT the pattern; on mobile it becomes a **bottom sheet** (§9).
- **Optimistic, progressive fill**: columns/steps populate cell-by-cell with visible progress and honest
  "in progress" states. ADOPT — for long AI tasks, show the matrix filling, never a blank spinner.
- **Provenance chips / superscripts** are everywhere and tiny. ADAPT them into our footnote-marker idiom
  (Slate underline + number) so they survive a monochrome palette.
- **Typographic hierarchy**: Elicit leans on weight + size in a sans body with serif report titles. Our
  system: **serif display/headlines**, sans (or mono for data) body, label-cased column headers, generous
  whitespace, hairline Slate dividers instead of heavy grid lines.
- **Color budget**: Elicit spends color on brand (teal) + decisions (Yes/Maybe/No). We spend **zero** on
  brand and **all** of it on decisions + confidence. That single reallocation *is* the visual differentiation.

---

## 9. How Elicit's dense desktop matrix must be reimagined for mobile (our wedge)

Elicit has **no mobile app and no real responsive story** (see `mobile/NO-MOBILE-APP.md`): a 4–8-column AI
data-grid with a right-hand control rail simply does not fit 390px. That vacuum is ScholarSync's primary
competitive opening. The rule: **on mobile, never render the matrix as a horizontally-scrolling grid.**
Transform the *data model* (papers × columns) into mobile-native shapes:

1. **Paper-as-card, columns-as-fields (the row pivots 90°).** Each paper becomes a vertical card: identity
   header (title/authors/year/venue), then its column values as a stacked label→value list. The "matrix"
   becomes a **scrollable feed of cards** — the unit a phone is built for. A sticky **column-focus chip bar**
   at top lets the reader pick which 1–2 attributes are emphasized on each card; the rest collapse behind
   "+4 more fields."

2. **Screening as a swipe/triage deck.** The single best mobile reframe: screening is **Tinder-for-papers**.
   One paper per card (title + abstract + the AI's per-criterion reasoning), swipe/segmented-control to
   **Include / Maybe / Exclude**; the inclusion-score threshold becomes a slider in a bottom sheet; the
   running "evaluated/included/excluded" tally pins to the top. This is a *better* screening experience than
   Elicit's desktop table for the "clear my 40 maybes on the train" job — and it's impossible to copy
   because Elicit didn't build it.

3. **Column-as-a-question via bottom sheet.** "Add a column" (the §2 primitive) opens a **full-height bottom
   sheet**: instruction field, the Any/Specified/Yes-No-Maybe shape selector as big tap targets, presets.
   No cramped popover. Creating a question to ask all your papers must be a *first-class mobile action*,
   because that's the product's core verb.

4. **The right rail → a bottom sheet / segmented control.** Manage-Columns, Screening-results, Report-status
   are sheets summoned by a toolbar button, not a permanent rail. The **SR stepper** becomes a top
   **horizontal progress stepper** (Gather·Screen·Extract·Generate with counts) where tapping a stage opens
   that stage's mobile view.

5. **Cells: collapse, then drill.** A bullet-list extraction cell shows a **count + first line** on the card;
   tap → bottom sheet with the full extraction, the **highlighted source passage**, and accept/edit. Tap a
   citation → the passage in context. Provenance becomes *more* accessible on mobile (one tap to the source),
   not less.

6. **Report reading is where mobile already wins.** The narrative report (serif headline, prose, inline
   citations, included-studies table) is essentially an article — it reflows beautifully. Treat **report
   reading + screening triage** as the two flagship mobile experiences; matrix *authoring* can stay
   desktop-leaning, but matrix *consumption and decisions* must be exquisite on a phone.

7. **One-thing-per-screen pacing.** Desktop Elicit shows everything at once (grid + rail + summary). Mobile
   ScholarSync uses **progressive disclosure**: question → results feed → pick a paper → decide → next.
   Borrow the Superhuman "make the next action obvious" conveyor-belt logic for the screening loop
   specifically (decide → next paper appears, with undo), turning review triage into flow.

If desktop ScholarSync matches Elicit's matrix and the report is rendered in scholarly ink, and **mobile**
delivers swipe-screening + card-feed + sheet-based column-questions + tap-to-source — we are not a worse
Elicit on the phone, we are the **only** Elicit on the phone.

---

## 10. Top patterns to steal (ranked)

1. **The matrix-as-question-engine**: rows = papers, columns = questions, with a source chip on every cell.
2. **Column-as-a-question** with the **Any / Specified / Yes-No-Maybe** output-shape switch — the one
   primitive that unifies extraction, coding, and screening.
3. **Screening = criteria columns + categorical decision cells + inclusion-score threshold slider + live
   evaluated/included/excluded tally + per-criterion reasoning** (the human-override surface).
4. **The four-stage SR stepper (Gather → Screen → Extract → Generate)** with per-stage live counts,
   drill-in to the underlying matrix, and **method-written-as-prose**.
5. **Grounding everywhere**: provenance chips, "Not mentioned" honesty, scoped chat with numbered citations
   and a full-text toggle, exportable BIB/RIS/PDF.

…all rendered in **graphite ink on Radix Slate, serif headlines, functional color reserved for decisions**,
with the **dense desktop matrix reborn on mobile as a swipe-to-screen card feed** — exactly the surface
Elicit never built.
