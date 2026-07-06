# Slate — Systematic Review Module: Master Blueprint

**What this is:** the flow spine of the whole SR module — every stage, the *borrowed* flow, **where to find its reference on disk**, the AI moment, key states, and the skin rule. Nothing here is invented; every flow is adopted from a shipping SR tool and re-skinned in `design.md`.

**North star:** *Rayyan's calm, Elicit's grounded AI, Covidence's completeness — one design.md skin over all of it.* Complete, but quiet. (Anti-Frankenstein: we just deleted a 15-tab legacy SR — this is the opposite; adopt the full pipeline, keep it silent.)

**Authorities & references (paths):**
- Skin: `docs/design/design.md` (frozen) · craft: `docs/design/CRAFT-ADDENDUM.md`
- Science gate: `docs/systematic-review/EXTRACTION-AND-TEAM-spec.md` (the 10 non-negotiables + two-phase firewall)
- **Reference screen corpora** (on disk):
  - Elicit — `~/S_S_a_2/elicit-screens/` (find-papers, screening, extraction, report-notebook, sr-workflow)
  - Covidence — `~/S_S_a_2/covidence-screens/` (title-abstract, conflicts-consensus, extraction, dashboard)
  - Reconciliation UX — `~/S_S_a_2/reconciliation-ux-screens/` (Salesforce/Front per-field pickers)
  - Team + blinding UX — `~/S_S_a_2/team-blinding-ux-screens/` (invite-roles, blinded-until-reveal, assignment)
  - Rayyan — public docs (help.rayyan.ai) + the create-review/roles screens the owner shared; no local corpus.

**The build order Fable follows:** ① app shell & roles → ② create-review + team → ③ import → ④ protocol → ⑤ screening (the heart) → ⑥ conflicts → ⑦ extraction → ⑧ risk of bias → ⑨ PRISMA + report → ⑩ export.

---

## The two invariants every screen obeys
1. **The skin:** design.md tokens only — ink-on-paper, hairline, Source Serif titles, JetBrains-mono numerals, one slate-blue accent. Rayyan-calm. If a screen feels busy, it's wrong.
2. **The science:** the 10 non-negotiables + the two-phase firewall (independent → reconcile) from the extraction-and-team spec. Blinding, no anchoring, AI grounded/verified, provenance, audit trail.

---

## Stage ① — App shell & roles
- **Flow:** role-aware SR workspace; a reviewer sees only what their role + the current phase permit. Roles: **Owner · Collaborator · Reviewer · Third-reviewer/Arbitrator · Viewer** (Rayyan's 4 + our explicit arbitrator).
- **Borrowed from / reference:** Rayyan Roles & Permissions (help.rayyan.ai) for the role model; `team-blinding-ux-screens/invite-roles-permissions/` (Vercel/Sketch/Turo capability matrix) for the members UI.
- **Skin:** the ink-on-paper sidebar we just shipped; SR is one nav item.

## Stage ② — Create review + team
- **Flow:** 3-step wizard — **Review info** (title, type, domain) → **Upload references** → **Invite members** (email + role). Blind Mode defaults ON (Owner-only toggle).
- **Borrowed from / reference:** **Rayyan** create-review wizard (owner's shared screens: info → upload → invite; roles Collaborator/Reviewer/Viewer) + `team-blinding-ux-screens/invite-roles-permissions/` for the invite dialog (email, role-at-invite, pending-first-class, capability matrix).
- **AI moment:** none (setup).
- **States:** empty (first review) · wizard steps 1–3 · invite pending.
- **System design:** see the Invite-Members note (separate discussion) — Clerk-powered.

## Stage ③ — Import + dedup
- **Flow:** import RIS/EndNote/CSV/BibTeX/PubMed(.nbib)/WoS; auto-dedup with a **reversible ledger**; "no search-strategy builder — you arrive with your results."
- **Borrowed from / reference:** **Rayyan** import (formats, side-by-side dedup keep-left/right/both) + our current Import screen (already on-brand). Optional AI source: **Elicit** "find papers with AI" — `elicit-screens/find-papers/`.
- **AI moment:** *optional* — Elicit-style AI candidate-finder that flows into the same dedup queue (labeled, never auto-included).
- **States:** empty · importing · dedup-review · import-history ledger.

## Stage ④ — Protocol / criteria
- **Flow:** define PICO + inclusion/exclusion criteria **before** screening; criteria are **locked & versioned** (amendments are dated, with reason — no silent goalpost-moving).
- **Borrowed from / reference:** **Covidence/Rayyan** criteria setup; PROSPERO fields. `covidence-screens/` review-settings.
- **AI moment:** AI may *draft* candidate criteria from the question (Elicit pattern) — human edits & locks; never auto-applied.
- **States:** empty · drafting · locked · amended (v2, reason shown).

## Stage ⑤ — Screening (the heart) — Blind Mode + AI second reviewer
- **Flow:** two reviewers independently label **Include / Exclude(+reason) / Maybe**, **blind** to each other; conflicts hidden until Owner unblinds; **no auto-resolve/majority-vote — reviewers must align**. AI can (a) **rank** unscreened refs and (b) act as a **validated second reviewer**.
- **Borrowed from / reference:**
  - Blind screening loop + Include/Exclude/Maybe + keyboard flow → **Rayyan** Blind Mode (help.rayyan.ai "How to Screen / Blind Mode") + our current Screening screen.
  - Blinded-until-reveal mechanics (banner, pending, simultaneous reveal, counts-not-content) → `team-blinding-ux-screens/blinded-until-reveal/` (Miro private mode, GitHub `Pending`, planning poker).
  - AI **ranking** → Rayyan 5-star predictions.
  - AI **screening-with-a-quote** (Yes/No/Maybe + supporting quote per criterion) → **Elicit** `elicit-screens/screening/` (+ `expand-criteria`).
  - AI **as second reviewer** (concordance-validate → joins as blinded member → disagreement = normal conflict) → **Rayyan** AI Reviewer/ResearchPilot (help.rayyan.ai), *plus our upgrade:* publish the concordance number + explicit human override.
- **AI moment:** the AI reviewer is a **labeled team member**, blinded like a human; its calls + reasoning reveal only on unblind. Ranking is prioritization only.
- **States:** independent-screening (blind) · waiting-for-partner (counts, not verdicts) · AI-reviewer inactive/validating/active · unblinded/reconcile · all-aligned.

## Stage ⑥ — Conflicts
- **Flow:** post-unblind, opposing decisions surface; resolve by **discussion → third-reviewer arbitration**; record *how* each was resolved. No auto-vote.
- **Borrowed from / reference:** **Covidence** conflicts/consensus → `covidence-screens/` (title-abstract, conflicts-consensus) + our current Conflicts screen; arbitrator role from Stage ①.
- **AI moment:** none (human adjudication).
- **States:** conflicts list · single-conflict resolve · resolved (method logged) · none.

## Stage ⑦ — Extraction (two-phase firewall)
- **Flow:** **Phase 1** each reviewer extracts alone, blind, **no AI values shown**; lock. **Phase 2** reconcile — symmetric per-field picker, consensus starts empty, AI is a **source-gated labeled third suggestion**. Full detail in `EXTRACTION-AND-TEAM-spec.md`.
- **Borrowed from / reference:**
  - Reconciliation picker → `reconciliation-ux-screens/data-reconciliation/` (Salesforce Compare leads, Front Review-your-merge).
  - Grounded per-cell **source quote** → **Elicit** `elicit-screens/extraction/` (every value shows its source).
  - Consensus-grid framing + phases → **Covidence** `covidence-screens/extraction/` + **Rayyan** Manual→AI-assist→AI-auto.
- **AI moment:** AI runs from the start but **holds values until Phase 2**, then shows them source-gated (Codex fix).
- **States:** Phase-1 extracting/waiting-for-partner/locked · Phase-2 reconcile (agreed visible + conflicts expanded) · all verified.

## Stage ⑧ — Risk of bias
- **Flow:** per-study, per-domain appraisal (RoB 2 / ROBINS-I), dual + independent, with a **support-for-judgement quote** per domain.
- **Borrowed from / reference:** **Covidence/Cochrane** RoB template → `covidence-screens/` + our current RoB screen; AI-suggest/human-confirm from **RobotReviewer** (never autonomous).
- **AI moment:** AI *suggests* a domain judgement + quote; human confirms. Labeled, overridable.
- **States:** per-study grid · per-domain judge · AI-suggested (unconfirmed) · confirmed.

## Stage ⑨ — PRISMA + Report
- **Flow:** auto PRISMA flow diagram (every record accounted for); a **grounded report** with sentence-level citations + auto-drafted methods (capturing the PRISMA reporting metadata: # reviewers, independence, resolution method, AI use/validation).
- **Borrowed from / reference:** PRISMA auto-diagram → **Covidence** `covidence-screens/` + our current PRISMA screen; grounded report + auto-methods → **Elicit** `elicit-screens/report-notebook/`.
- **AI moment:** report drafting with **every claim source-linked** (Elicit), human-edited; never autonomous synthesis/GRADE.
- **States:** PRISMA auto · report draft · edited · reporting-metadata block.

## Stage ⑩ — Export
- **Flow:** export references + data + PRISMA to **RevMan / RIS / CSV / PDF**; "as-extracted" data preserved separately from consensus.
- **Borrowed from / reference:** **Rayyan/Covidence** export → our current Export screen.
- **AI moment:** none.
- **States:** format picker · exporting · done.

---

## What we deliberately DON'T build (scope guard)
- No search-strategy builder (arrive with results — Rayyan/our stance).
- No autonomous AI decisions anywhere a false call is unrecoverable (auto-exclude beyond validated obvious-non-RCT, unverified extraction, autonomous RoB, autonomous synthesis/GRADE) — RAISE line.
- No in-app statistical meta-analysis engine (out of scope; export to RevMan). No author-contact heavy workflow (market-absent — a light note/flag only).

## Open threads for the owner
1. **Invite-members system design** — separate discussion (Clerk orgs vs custom; pending/seats/roles; how the blinding binds to role). ← next.
2. AI-second-reviewer **tier**: free for everyone, or gated (Rayyan gates it to Institutional)?
3. Which 2–3 screens get visual mockups before Fable (recommend: blind-screening + AI-reviewer, extraction reconciliation).
