# Covidence — Faithful Systematic-Review Workflow Analysis

**Purpose.** Reverse-engineer Covidence's end-to-end systematic-review (SR) pipeline so ScholarSync can rebuild an SR module with **zero invention**. Every claim below is tied to a captured screen and a cited source URL. Where evidence is thin, it is marked **GAP** — not filled with imagination.

**Sourcing & honesty note.**
- **Primary (richest):** the official Covidence Knowledge Base — `support.covidence.org/help/<slug>` — crawled headless with Playwright at 1440px, full-page. These pages embed the real product screenshots (extracted and saved separately under each stage's `img/`).
- **Secondary (official):** Covidence blog posts — `covidence.org/blog/...` — used to fill stages whose KB article was a video-only page (full-text, conflicts).
- **Tertiary (third-party, flagged):** university **LibGuides** (e.g., UNC) that embed real, current Covidence screenshots — used only to fill two visual gaps (the conflict-resolution screen and the full-text exclusion-reason modal). Flagged `THIRD-PARTY` everywhere.
- **No login.** Covidence reviews sit behind auth; nothing here came from an authenticated session. All captures are from public help/marketing/guide pages.
- **Mobbin:** checked — Covidence is **not on Mobbin** (a Covidence query returned only Elicit screens). Expected; Covidence is a niche academic tool.

**The canonical Covidence SR pipeline (one paragraph).** Covidence is a multi-reviewer, standards-compliant SR machine. A reviewer creates a review and lands on the **Review Summary** dashboard, a four-stage funnel: **Import → Title & abstract screening → Full-text review → Extraction (incl. quality assessment)**. References are **imported** (RIS/EndNote/PubMed/CSV) into a chosen stage and **auto-deduplicated** on title/year/volume/authors. Two reviewers then screen **titles & abstracts independently and blinded**, voting **Yes / Maybe / No** (Yes and Maybe both advance a study); agreements auto-route, disagreements drop into **Resolve conflicts**. Surviving studies enter **full-text review**, where reviewers vote **Include / Exclude** and every exclusion **requires a reason**; conflicts again route to resolution. Included studies are **risk-of-bias assessed** (Cochrane RoB templates) and **data-extracted** — both done as **dual, independent passes reconciled in a consensus grid**. Throughout, Covidence auto-builds a **PRISMA 2020 flow diagram** from live counts, and exports data to **CSV / RevMan / Word (DOCX)**. The whole UX is organized around **two independent humans + blinded voting + explicit conflict resolution + an audit trail** — the part Elicit has no concept of.

---

## Cross-cutting mechanics (true across stages)

- **Dual-reviewer is the default model.** Every included study needs **two positive votes** to advance; reviewer count is configurable to **1 or 2 per stage, independently** for screening vs full-text. Source: [Switch dual↔single reviewer mode](https://support.covidence.org/help/switching-from-dual-to-single-reviewer-mode). Screen: `08-settings-team/img/switch-dual-to-single-reviewer__*`.
- **Blinded voting.** Reviewers cannot see a colleague's vote until they have cast their own — and votes stay blinded **even during conflict resolution** (the resolver sees *who* voted, not *what* they voted). Source: [What does a 'Maybe' vote do?](https://support.covidence.org/help/voting-maybe); [Reference Screening LibGuide, UNC — THIRD-PARTY](https://guides.lib.unc.edu/Covidence/screen). Screen: `04-conflicts-consensus/img/conflict-resolution-screen-final-decision__SOURCE-libguide-unc.png`.
- **Yes/Maybe both = "advance."** Maybe is a positive vote, not a third bucket. Source: [voting-maybe](https://support.covidence.org/help/voting-maybe).

---

## 00 — Dashboard (Review Summary)
**Screens:** `00-dashboard/img/review-dashboard-overview__00__image.png` (the funnel) · full-page `00-dashboard/review-dashboard-overview.png`, `00-dashboard/getting-started.png`
**Source:** [How to get an overview of progress in your review](https://support.covidence.org/help/review-dashboard-updated)

**What Covidence does / how the UI works.** The **Review Summary** is the review home, reached by clicking the review title next to the home icon. It is a vertical **four-stage funnel**: *Import references → Title and abstract screening → Full text review → Extraction* (extraction includes quality assessment). Each stage row is expandable and shows live counts:
- **Import references:** "_N total duplicates removed_" (link) + **Import** button.
- **Title and abstract screening (expanded in capture):** a **TEAM PROGRESS** bar and four counters — **DONE / CONFLICTS / ONE VOTE / NO VOTES** (capture shows 1339 done, 74 conflicts, 0 one-vote, 191 no-votes); a personal call-to-action ("LAURA, YOU CAN STILL **RESOLVE 74** / **SCREEN 191**") with **Resolve conflicts** and **Continue** buttons; "_N irrelevant_" and "_N studies to screen_" links; "You've screened N studies so far"; a **Team settings** link.
- **Full text review:** "_N excluded_" / "_N studies to screen_".
- **Extraction:** "_N extracted_" / "_N studies to extract_".
- **Global toolbar:** **Settings**, **PRISMA**, **Export** buttons; a "Search studies" field.

**ADOPT-for-ScholarSync.** Make the SR home a **stage funnel with live counts and per-stage CTAs**, surfacing *conflicts* and *your remaining work* as first-class numbers. The "you personally can still resolve X / screen Y" framing is a strong activation pattern. Keep Settings / PRISMA / Export globally reachable from the review home.

**Covidence-vs-Elicit.** Covidence's home is a **team progress funnel** (counts, conflicts, who-needs-to-do-what). Elicit's equivalent is a **research report/notebook** with an AI status checklist (Gather papers → Screen papers → Extract data → Generate report) — single-user, automation-centric, no conflict/team counters. *Covidence is the authority on the multi-reviewer progress model.*

---

## 01 — Import
**Screens:** `01-import/img/how-to-import-references__03__image.png` (import-history cards), `manage-duplicates__00__image.png` (duplicates surfaced in PRISMA + history), `how-to-import-references__*` (10 shots) · full-page `01-import/*.png`
**Sources:** [How to import references](https://support.covidence.org/help/study-imports) · [How Covidence detects duplicates](https://support.covidence.org/help/how-does-covidence-detect-duplicates) · [How to manage duplicates](https://support.covidence.org/help/manage-duplicates) · [Viewing duplicates and errors](https://support.covidence.org/help/viewing-duplicates)

**What Covidence does / how the UI works.**
- Open the **Import** tool from Review Summary, choose a **file** and a **category** (which stage the references enter — e.g. *Title and abstract screening* or *Full text review*). Accepts RIS/EndNote/PubMed exports and other reference-manager formats.
- **Automatic de-duplication on import:** Covidence checks the imported file against itself **and** against everything previously imported to the review. Matching uses **title, year, volume, and authors**. Duplicates are removed automatically.
- **Import history:** each import renders a row of cards — **Added to [stage] N · References N · Duplicates N · Merged N · Source** (e.g. "Google Scholar, +2") — with **Undo import** and **Manage sources**. The Review Summary shows the **5 most recent imports** and a "_N total duplicates removed_" link; "View details" opens full Import History.
- **False-positive recovery:** a **"Not a duplicate"** button returns a wrongly-flagged reference to the review.

**ADOPT-for-ScholarSync.** Replicate **import-into-a-named-stage** + **automatic dedupe with a transparent, reversible ledger** (counts per import, source attribution, Undo, and a per-record "Not a duplicate" escape hatch). The (title, year, volume, authors) match key is a concrete, copyable heuristic — pair it with a manual-merge review queue.

**Covidence-vs-Elicit.** Covidence **ingests your own search results** and de-dupes them; it does not search databases for you. Elicit's front door is the **opposite**: you ask a research question and Elicit **finds** papers (AI discovery) — dedupe/import hygiene is not its focus. ScholarSync should **fuse both**: Elicit-style AI discovery *feeding into* Covidence-style import + dedupe + provenance.

---

## 02 — Title & abstract screening
**Screens:** `02-title-abstract/img/maybe-vote-faq__00__image.png` (No/Maybe/Yes card), `02-title-abstract/img/blog-quickly-complete-full-text__01__screening-1536x690.png` (highlights + criteria), LibGuide shots `02-title-abstract/img/libguide-unc-*` · full-page `02-title-abstract/*.png`
**Sources:** [Screening studies](https://support.covidence.org/help/screening) · [How to screen by title and abstract](https://support.covidence.org/help/screening-by-title-and-abstract) · [What does a 'Maybe' vote do?](https://support.covidence.org/help/voting-maybe)

**What Covidence does / how the UI works.**
- A **reference card** shows: `#ID`, title, authors, journal/citation, **DOI** (external link), **Ref ID**, a **View abstract** expander, and footer actions **Duplicate / History / Note** plus **tags**.
- **Vote buttons (stacked, right side): No / Maybe / Yes.** Both **Yes** and **Maybe** are **positive** (advance to full text). **Keyboard voting** is supported for speed.
- **Routing under the dual model:** both reviewers Yes/Maybe → **Full-text review**; both No → **Irrelevant** (removed); one positive + one No → **Resolve conflicts**.
- **Blinded:** you can't see a colleague's vote until you vote.
- **Keyword highlighting:** inclusion terms highlight **green**, exclusion terms **red**; toolbar toggles **Show/Hide highlights**, **Show criteria**, **Hide abstracts**, **Filter**, **Tags**, **Display N**, and sort ("Most recent / Most relevant"). The criteria box (Inclusion vs Exclusion) is viewable inline.

**ADOPT-for-ScholarSync.** Copy the **three-way vote (No/Maybe/Yes with Maybe-as-positive)**, **blinded independent voting**, **keyboard-first voting**, and **inclusion/exclusion keyword highlighting (green/red)** with a toggleable criteria panel. This is the canonical screening mechanic.

**Covidence-vs-Elicit.** Covidence = **two humans vote blindly**. Elicit = **AI screens** each paper against natural-language criteria and returns an **inclusion score** (e.g. 4.9/5) plus per-criterion yes/maybe/no automatically (visible in the Elicit "Screen papers" screens). Elicit is far faster and needs no second human; Covidence is **PRISMA-defensible** and bias-controlled. *Fusion: let AI pre-vote/triage, but keep the blinded human dual-vote + conflict path as the system of record.*

---

## 03 — Full-text review
**Screens:** `03-fulltext/img/blog-quickly-complete-full-text__04__screencapture-full-text-screening-1536x1134.png` (Include/Exclude screen + criteria + tabs), `03-fulltext/img/fulltext-include-exclude-and-exclusion-reason-modal__SOURCE-libguide-unc.png` (exclusion-reason modal, THIRD-PARTY) · full-page `03-fulltext/*.png`
**Sources:** [How to screen by full text](https://support.covidence.org/help/performing-full-text-review) · [How to quickly complete full-text screening (blog)](https://www.covidence.org/blog/how-to-quickly-complete-full-text-screening-in-a-systematic-review/)

**What Covidence does / how the UI works.**
- Header tabs: **Screen references N · Resolve conflicts N · Awaiting other reviewer N · Excluded references N**.
- **Bulk upload PDFs** (and **Add full text** per study) — reviewers read the actual PDF.
- **Vote buttons: Include / Exclude** (binary — *not* Yes/Maybe/No).
- **Exclusion requires a reason.** Clicking **Exclude** opens a modal: **"What is the reason for excluding this study?"** → **Select a reason** dropdown → **Confirm / Cancel**. Reasons are configured in **Settings → Criteria & exclusion reasons → Manage exclusion reasons**; teams are advised to agree the list up front and **order reasons into a hierarchy** (some studies have >1 valid reason).
- Same inline **Inclusion/Exclusion criteria box** and **keyword highlighting** as T&A; per-study **View history / Add a note / Move study to Screen**.

**ADOPT-for-ScholarSync.** Copy: **binary Include/Exclude at full text**, **mandatory structured exclusion reason from a managed, hierarchical list**, **PDF attach (bulk + per study)**, and the **tabbed work queues** (to-screen / conflicts / awaiting-other / excluded). Mandatory reasons are what make the PRISMA "excluded with reasons" box real.

**Covidence-vs-Elicit.** Covidence = **human reads the PDF, includes/excludes, records a reason** (auditable). Elicit = **AI reads full text** to populate answer columns with citations to source spans; there is no formal exclusion-reason ledger or "awaiting other reviewer" state. *Covidence is the authority on the reasoned, auditable exclusion record.*

---

## 04 — Conflicts & consensus (screening)
**Screens:** `04-conflicts-consensus/img/conflict-resolution-screen-final-decision__SOURCE-libguide-unc.png` (blinded "who voted" + Final decision Yes/Maybe/No, THIRD-PARTY), `exclusion-reason-modal__SOURCE-libguide-unc.png` · full-page `04-conflicts-consensus/*.png`
**Sources:** [How to resolve screening conflicts](https://support.covidence.org/help/resolving-conflicts-at-screening-stage) · [How to resolve conflicts during screening (blog)](https://www.covidence.org/blog/how-to-resolve-conflicts-during-screening/)

**What Covidence does / how the UI works.**
- A reference reaches **Resolve conflicts** when reviewers disagree. **Two conflict types:** (1) one **Include/Yes** vs one **Exclude/No**; (2) **both Exclude** but on **different reasons**.
- The **resolution screen stays blinded:** it shows **who voted** (e.g. "Emma voted / Katherine voted") but **not what** — then asks **"What was the agreed final decision?"** with **Yes / Maybe / No** (at T&A) or **Include/Exclude + correct exclusion reason** (at full text).
- **Who resolves:** the **"CONFLICTS CAN BE RESOLVED BY"** group setting governs permission; normally the **two original reviewers** reconcile; a **third reviewer** is brought in only for genuine deadlock.

**ADOPT-for-ScholarSync.** Copy the **dedicated conflict queue**, **blinded-at-resolution** design (show who, hide votes to reduce anchoring bias), the **tiebreaker Final-decision control**, the **two distinct conflict types** (decision conflict vs reason conflict), and a **configurable "who can resolve" permission**. This is the integrity layer that distinguishes a real SR tool.

**Covidence-vs-Elicit.** Elicit has **no conflict concept** — a single AI pass produces one answer the user edits. Covidence's blinded, permissioned, two-type conflict resolution is **uniquely its domain**. *Covidence is the authority here; ScholarSync must copy it wholesale.*

**GAP (minor).** The dedicated screening conflict screen was captured from a **third-party LibGuide** (the KB article is video-only). It corroborates the official text exactly (blinded; Final decision Yes/Maybe/No), but it is not an official Covidence-hosted screenshot — flagged accordingly.

---

## 05 — Quality assessment / Risk of Bias (RoB)
**Screens:** `05-quality-rob/img/create-quality-assessment-template__01__image.png` (3-pane RoB template editor; RoB domains High/Low/Unsure), other `create-quality-assessment-template__*` · full-page `05-quality-rob/*.png`
**Sources:** [Which risk-of-bias tool does Covidence use?](https://support.covidence.org/help/faq-which-risk-of-bias-tool-does-covidence-use) · [Create & publish a quality-assessment template in Extraction 2](https://support.covidence.org/help/create-and-publish-a-quality-assessment-template)

**What Covidence does / how the UI works.**
- Quality assessment is a **separate template inside Extraction 2** (distinct from the data-extraction template), built in the **same 3-pane editor**: **Item settings** (left, "Instructions to extractors") · **Editor** (center) · **Preview** (right).
- The **default template is the Cochrane Risk of Bias (v1) tool**: pre-loaded domains such as **Random sequence generation, Allocation concealment**, each offering **High / Low / Unsure**, and "**Extractors will also be able to add comments to justify their judgements**."
- Fully customizable: **"I want to start from scratch"** clears the RoB domains for a custom instrument.
- **Important fidelity point:** Covidence's built-in tool is **RoB v1, not RoB 2** natively — to use RoB 2 you **edit the template** to mirror RoB 2 (or extract via RevMan's CSV). Assessments are **dual + consensus**, like extraction; exportable to **CSV or RevMan**.

**ADOPT-for-ScholarSync.** Ship a **structured RoB/QA template** with **per-domain High/Low/Unsure (+ justification comment)**, a **Cochrane RoB default**, full editability, and **dual assessment → consensus**. Be explicit about **which RoB version** ships and how to switch to RoB 2 — a place where ScholarSync can *out-do* Covidence by shipping **RoB 2 / ROBINS-I** as first-class defaults.

**Covidence-vs-Elicit.** Covidence has a **dedicated, standards-based RoB instrument with human judgement and justification**; Elicit has **no RoB tool** (you could approximate domains as extraction columns, but it isn't a validated instrument). *Covidence is the authority; this is a hard requirement Elicit cannot satisfy.*

---

## 06 — Data extraction
**Screens:** `06-extraction/img/overview-of-extraction-2__02__layout-of-extraction-2.png` (3-pane template builder), `create-data-extraction-template__*` (17 builder shots: add item, drag-reorder, single-choice, "add other", extractor instructions, publish/edit/revert), `de2-study-list.png` (extraction queue tabs), `save-and-send-for-consensus.png`, `consensus-de2.png` (consensus grid), `export-extracted-data-excel__*`, `extraction-1-vs-2__00__choose-your-template.png` · full-page `06-extraction/*.png`
**Sources:** [Overview of Extraction 2](https://support.covidence.org/help/overview-of-extraction-2) · [Create/publish/update a DE2 template](https://support.covidence.org/help/create-and-publish-a-data-extraction-template) · [Extract data using Extraction 2](https://support.covidence.org/help/data-extraction-and-quality-assessment) · [Comparison & consensus in Extraction 2](https://support.covidence.org/help/consensus-9831e0af) · [Export to Excel](https://support.covidence.org/help/export) · [Extraction 1 vs 2](https://support.covidence.org/help/which-version-of-data-extraction-should-i-use)

**What Covidence does / how the UI works.**
- **Two engines:** **Extraction 1** (legacy; fixed 1st/2nd-reviewer roles, simpler) and **Extraction 2** (fully customizable). A **"Choose your template"** step offers a default Cochrane-style template or a custom build.
- **Template builder (3-pane):** **Item settings** · **Template editor** · **Preview (live form)**. Items have **typed icons** — heading (`Hi`), text (`Aa`), **single choice** (◉), multi-choice, etc. You **Add new item**, **drag to reorder**, set options (with **"add other"**), write **extractor instructions**, then **Save draft → Publish template**; plus **Re-use template**, **Delete all / Reset**, **Edit** and **Revert to published version**. (Same editor builds both data-extraction and QA templates.)
- **Extraction queue (study list):** tabs **Total included · Not started · In progress · Consensus required · Complete**; **Begin extraction** per study; top buttons **Data extraction template / Quality assessment template**; **Export**; **Filter by tags**; **Merge as study**.
- **Dual extraction → consensus:** two reviewers extract independently, then **Save and send for consensus**. The **consensus screen** is a split view — **PDF reader on the left**, a **comparison grid on the right** with columns **Final Decision · Reviewer 1 · Reviewer 2**; conflicting fields show a magenta **"Decision required"**; the resolver **selects the accurate value or types a final decision**; a **"N conflicts left to resolve"** counter and **Complete** button drive closure.
- **Single↔dual mode** is switchable. **Export** of final consensus data (study IDs as rows, fields as columns) to **Excel/CSV** at any stage.

**ADOPT-for-ScholarSync.** Copy the **3-pane visual template builder** (typed items, drag-reorder, live preview, draft→publish→revert), the **extraction queue with explicit states** (incl. **Consensus required**), and the **side-by-side PDF + reviewer-comparison consensus grid** with per-field "Decision required." This is the most reusable, highest-craft surface in Covidence.

**Covidence-vs-Elicit.** This is the sharpest contrast. Covidence = **manual dual extraction into a custom template, reconciled field-by-field** (rigorous, auditable, slow). Elicit = **AI auto-extracts** into columns from a **natural-language prompt**, each cell **cited to source text**, generated in one pass and then edited (fast, single-user, no consensus). *Fusion opportunity: AI pre-fills the extraction form (Elicit-style, with citations), and the dual-reviewer consensus grid (Covidence-style) becomes the human verification/audit layer.*

---

## 07 — PRISMA & export
**Screens:** `07-prisma-export/img/export-and-interpret-prisma__01__image.png` (in-app interactive PRISMA bands), `export-and-interpret-prisma__05__image.png` (downloadable PRISMA 2020 DOCX diagram), `export-and-interpret-prisma__*` (Show sources / Show reasons), `01-import/img/manage-duplicates__00__image.png` (duplicates feeding PRISMA) · full-page `07-prisma-export/*.png`
**Sources:** [How to export and interpret PRISMA](https://support.covidence.org/help/export-prisma) · [Exporting data](https://support.covidence.org/help/exporting-data)

**What Covidence does / how the UI works.**
- **Auto-generated PRISMA flow** from **live review counts**, in two forms:
  - **In-app interactive PRISMA:** bands **Identification → Screening → Included** — "N references imported for screening (as M studies)" → "K duplicates removed"; "studies screened" → "irrelevant"; "full-text studies assessed for eligibility" → "excluded ▸ **Show reasons**"; "studies ongoing / awaiting classification"; "studies included." Source counts expand via **▸ Show sources**.
  - **Downloadable DOCX** (the formal **PRISMA 2020** figure) via **Download DOCX**; the download deliberately includes items not shown in-app (databases/registers vs other sources, "removed before screening," automation-tool exclusions) to align with PRISMA 2020. Opens in Word/Google Docs.
- **Data export:** extracted data and quality assessments export to **CSV**, **RevMan/Cochrane (RevMan 5)**, and **Word/DOCX**; **Export** lives on the Review Summary and per stage.

**ADOPT-for-ScholarSync.** Copy the **auto-PRISMA-from-live-counts** (with the **Show reasons / Show sources** drill-downs) **and** a **PRISMA-2020-compliant DOCX export**, plus **CSV + RevMan** interop. Auto-PRISMA is a marquee SR feature and a major trust signal.

**Covidence-vs-Elicit.** Covidence **auto-builds the PRISMA flow diagram** (the SR field's required artifact) and exports to **RevMan/Cochrane**. Elicit produces a **synthesis report / auto-prose summary and a results table** (CSV/report) but **no PRISMA flow** and no RevMan path. *Covidence is the authority on PRISMA + Cochrane interop; Elicit is stronger at the narrative synthesis ScholarSync can layer on top.*

---

## 08 — Settings & team
**Screens:** `08-settings-team/img/team-settings-who-does-what__02__image.png` (Rules: 1st reviewer / consensus resolver / template editor), `invite-a-team-member__00__image.png`, `switch-dual-to-single-reviewer__*` · full-page `08-settings-team/*.png`
**Sources:** [How to oversee a review and set up who does what](https://support.covidence.org/help/team-settings) · [Invite a team member](https://support.covidence.org/help/inviting-reviewers-to-a-review) · [Switch dual↔single reviewer mode](https://support.covidence.org/help/switching-from-dual-to-single-reviewer-mode)

**What Covidence does / how the UI works.**
- **Invite reviewers** from **Settings → Reviewers → Invite another reviewer** (name + email); invitees may be **inside or outside** your institution.
- **Roles & permission rules (Team settings):** a toggle **"Everyone can do anything" vs "Manage rules."** Under Manage rules:
  - **"1st reviewer for each study must be either …"** (named people) — pins who does the first pass; "1st and 2nd reviewer have different permissions."
  - **"All studies must be screened by …"** — force an experienced reviewer onto every study.
  - **"Conflicts can be resolved by …"** and **"Consensus can be resolved by …"** — limit resolution to specific reviewers ("Only 1st or 2nd Reviewer can complete consensus").
  - **"Templates can be edited by …"** — defaults to **Anyone**, restrictable.
- **Reviewer count per stage:** set **1 or 2**, **independently** for screening vs full-text (caution: dropping to 1 permanently advances one-vote studies).
- **Study tags:** pre-seeded **Ongoing Study** & **Awaiting Classification**; add custom tags to label and **filter** studies. **Criteria & exclusion reasons** and **highlights** are also managed in Settings.

**ADOPT-for-ScholarSync.** Copy the **rules engine** (assignable 1st-reviewer, mandatory screener, scoped conflict/consensus resolvers, template-edit permission), **per-stage reviewer count**, **external-collaborator invites**, and **custom study tags + filtering**. The "Everyone can do anything ↔ Manage rules" progressive-disclosure pattern keeps small reviews simple and large ones governable.

**Covidence-vs-Elicit.** Covidence is **multi-tenant team software** with granular reviewer roles/permissions. Elicit is **single-user** (share / view-only), with **no reviewer roles or governance**. *Covidence is the authority on team roles & permissions.*

---

## Bottom line for ScholarSync

**Single biggest UX difference from Elicit.** Covidence's *entire* UX is built around **two independent human reviewers, blinded voting, explicit conflict resolution, and an audit trail** (screening, full-text, RoB, and extraction are all dual-pass + consensus). **Elicit has no concept of a second reviewer or a conflict** — it replaces the reviewer with **AI** that auto-screens, auto-extracts (with source citations), and auto-writes the synthesis. Covidence optimizes for **rigor/reproducibility**; Elicit for **speed/automation**. ScholarSync's opportunity is to **fuse them**: AI pre-screens and pre-extracts (Elicit), while the blinded dual-reviewer + consensus + PRISMA machinery (Covidence) remains the human system of record.

**Top 3 stages where Covidence is the authority ScholarSync must copy:**
1. **Title/abstract dual screening** — No/Maybe/Yes, blinded, keyboard-fast, auto-routing, with green/red criteria highlighting. (Stage 02)
2. **Conflicts & consensus** — blinded-at-resolution, two conflict types, tiebreaker Final-decision, scoped resolver permissions; and the **extraction consensus grid** (PDF + Reviewer-1/Reviewer-2/Final, per-field "Decision required"). (Stages 04 & 06)
3. **Risk of Bias / Quality assessment + auto-PRISMA** — structured Cochrane RoB templates with High/Low/Unsure + justification, and the auto-generated PRISMA 2020 flow with RevMan/CSV/DOCX export — the standards-compliance layer Elicit lacks entirely. (Stages 05 & 07)
