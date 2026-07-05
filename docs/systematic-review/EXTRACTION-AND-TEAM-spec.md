# Extraction & Team — Systematic Review Module Design Spec

**Status:** DRAFT for review. Science-locked spine complete; three UX sections (invite/roles,
blinded-work gate, assignment) are stubbed as *requirements* pending the `team-blinding-ux-screens`
Mobbin harvest.
**Authorities:** Cochrane Handbook ch.5 (Collecting data) & MECIR C45–C49 · PRISMA 2020 Items 9, 10a/b ·
JBI Manual ch.2.6.3 · `design.md` (skin) · `CRAFT-ADDENDUM.md` (craft) · reconciliation harvest
`~/S_S_a_2/reconciliation-ux-screens/`.
**Adversarial sign-off required before build:** fresh-Opus + Codex methodology audits (both returned
**SOUND-WITH-FIXES**, conditional on the independence firewall). Re-review this spec before code.

---

## §0 — The frame: extraction is a two-phase experiment, and bias is the enemy

Data extraction in a systematic review is a **reproducible measurement**, performed in **duplicate,
independently**, to catch errors that peer review cannot (Cochrane: errors found in >50% of reviews;
single-extraction is measurably worse than independent-duplicate). The module therefore has **two
walled phases** with a hard gate between them:

```
PHASE 1  Independent extraction        PHASE 2  Reconciliation
────────────────────────────────      ─────────────────────────────────
each reviewer, ALONE, extracts    ──▶  both locked entries compared
· blind to the other reviewer          · symmetric per-field picker
· AI NOT shown (would anchor)          · discussion → 3rd-reviewer → author-contact
· own provenance per field             · consensus assembled by hand
· LOCK when done                       · resolution method recorded
        │                                       │
        └────────── FIREWALL ───────────────────┘
        no cross-visibility until BOTH lock
```

**The firewall is the whole ballgame.** Both methodologists: the reconciliation screen is *sound only
if it appears after two locked independent extractions*. If a reviewer can see the other's values — or
the same AI suggestion — before lock, the duplicate is theatre and the review is **UNSOUND** (correlated
errors). Every decision below serves this.

---

## §1 — The 10 non-negotiables (design spec = review criteria)

Every screen is audited against these; Codex/Opus re-review targets this list.

1. **Equal reviewers** — both extractions shown at equal visual weight; no default "primary" column.
2. **Conflicts unmissable** — never auto-collapsed or hidden.
3. **No auto-resolve** — nothing resolves without an explicit human action.
4. **Consensus starts empty** — never pre-filled with any reviewer's or the AI's value.
5. **Human = system of record; AI is a labeled *third* input** — never pre-selected, and (per Codex)
   **hidden by default at reconciliation until the human has opened the source passage**.
6. **Provenance per field** — source report + page/table/figure kept with every value.
7. **Reversible + audit-trailed** — every change attributable (who/what/when), nothing destroyed.
8. **"Not reported" ≠ "N/A" ≠ "Unclear" ≠ 0** — four distinct, explicit states; a blank is never a zero
   ("no mention of events" is treated as *not reported*, not 0).
9. **Unresolved can stay unresolved** — but only *after* the escalation pathway (see §5.3), recorded.
10. **Reported vs derived** — a value the reviewer *calculated/imputed* (e.g. SD from CI) is tagged
    **derived**, with the transformation/formula retained separate from as-reported data (MECIR C47).

**Two framing rules** (from the audits):
- **Goal is "every field verified," NOT "drive conflicts to 0."** No completion counter that rewards
  arbitrary picks to reach zero — that manufactures automation-bias-adjacent closure pressure.
- **Keep "as-extracted" data forever, separate from consensus** — both reviewers' original entries stay
  queryable/exportable after reconciliation (reliability-of-coding audit).

---

## §2 — Roles & team model (Cochrane standard) — *UX pending Mobbin `invite-roles-permissions/`*

A valid review needs ≥2 independent extractors + a distinct arbitrator. Roles:

| Role | Can | Blinding rule |
|---|---|---|
| **Lead / owner** | protocol, invite, assign, arbitrate, export | sees all *after* locks |
| **Reviewer (extractor)** | extract in own blinded workspace; reconcile | sees only *own* Phase-1 data until both lock |
| **Third reviewer / arbitrator** | resolve escalated conflicts | *should not be one of the two extractors* for that study |
| **Methodologist / statistician** | consulted for conversions/derived values | field-scoped |
| **Guest (read-only)** | view finished consensus | no edit |

**Methodological error to avoid:** the arbitrator being auto-set to one of the two extractors, or one
reviewer being cast as "the decider." Adjudication is a *role*, assigned, and the UI must not anoint a
reviewer implicitly.

**Requirements (to satisfy with harvested UX):** invite by email → assign role → land in a task-scoped,
blinded workspace; member list with roles; pending invites; change/revoke role. *Actually sending an
invite is a permission-gated side effect — the app never sends silently.*
**Open Q (§9).**

---

## §3 — Phase 1: Independent extraction (blinded) — *gate UX pending Mobbin `blinded-until-reveal/`*

Each reviewer, alone:
- A **field-by-field form** per included study (sections: General info · Characteristics · Outcomes).
- **No other reviewer's values visible. No AI value visible** (AI extraction may run, but its output is
  withheld until Phase 2, and only as a source-gated suggestion — it must never seed the reviewer's entry).
- Per field: value + **provenance** (source report, page/table/figure) + **state** (reported / not-reported
  / N/A / unclear) + **derived?** flag (with formula) per §1.10.
- A visible, honest **"you're extracting independently — your partner's entries and any AI suggestion stay
  hidden until you both lock"** affordance (the blinding is *explained*, not a mysterious empty state).
- **Lock** action = "I'm done; reveal for reconciliation." Reversible only before the partner locks.

**The gate:** the conflict count, the partner's data, and the reconciliation screen are **inaccessible
until both reviewers have locked**. Before that, the reviewer sees only their own progress + a "waiting
for {partner} to finish" state. *(Simultaneous-reveal, like planning poker / sealed PR review — pattern
to detail from the harvest.)*

---

## §4 — Phase 2: Reconciliation (the symmetric picker) — *research-backed (`reconciliation-ux-screens/`)*

Appears **only** post-firewall. Adapts Salesforce *Compare leads* / Front *Review your merge* (the
strongest anti-anchoring pattern in the harvest) into a dual-reviewer + arbitration model.

- **Header:** "{n} fields to verify" (not "conflicts to 0"). Progress = *verified*, not *closed*.
- **Agreed fields**: shown as a compact ✓ row **but** — per both audits, agreement ≠ accuracy (shared
  misreads) — with **persistent provenance**, one-click raw values + source quote, and **QC sampling**:
  critical outcome/effect fields require a source-verified spot-check; any "both agreed but AI disagrees"
  row is **flagged for a look**, never silently collapsed.
- **Conflicting field → focused card:**
  - **Two equal columns** `Reviewer 1 · {name}` | `Reviewer 2 · {name}` — each pickable, **neither
    pre-selected**.
  - **Source passage visible.** The **AI suggestion is hidden behind a reveal that only unlocks after the
    human opens the source** (Codex fix #2) — labeled "✦ AI · derived from {source}", pickable, never
    pre-selected, visually distinct from human values.
  - **Consensus value starts empty**; fills only on human pick (R1 / R2 / AI / typed). A typed value that
    is a calculation is tagged **derived** (§1.10).
  - **Four explicit states** (reported / not-reported / N/A / unclear) selectable, distinct from 0.
- **Resolution ladder (Cochrane §5.5.3 / MECIR C49) — recorded per field:**
  1. **Discussion** between the two extractors (default; most conflicts are simple slips).
  2. **Third-reviewer arbitration** (assigned role) if unresolved.
  3. **Contact study authors** for missing/unclear key data (prompted *before* parking).
  4. **Leave unresolved** — allowed only after step 3 is recorded (author contacted? y/n + rationale).
  - The card **records which path resolved each field** (for reporting), not just the value.

---

## §5 — Reporting-metadata capture (PRISMA 2020 Items 9, 10a/b)

The tool must **collect, as it goes**, the facts a published review is required to disclose — otherwise
the review can't be honestly reported:
- number of reviewers per study; whether extraction was independent;
- the disagreement-resolution process actually used (from §4's recorded paths);
- whether study authors were contacted (and outcome);
- **how any automation/AI was used and validated** (Item 9 explicitly);
- assumptions made for missing/unclear data.

Surface as an auto-assembled "Methods · data collection" block feeding the Report screen.

---

## §6 — Data-model & code changes (implementation notes)

- `resolveFinal` (src/lib/sr/extraction.ts): **remove the `kind:"ai"` branch that returns `aiFinal.value`
  as Final.** New `FinalCell`: `{kind:"agreed"}` (both reviewers matched) · `{kind:"resolved"}` (human
  adjudicated) · `{kind:"conflict", value:null}` (empty until human). AI is *never* the Final source.
- `ExtractionField` gains: per-reviewer `{value, state, provenance, derived?}`; a `lockedBy`/phase marker;
  `resolutionMethod` + `authorContacted?` on resolved conflicts.
- New phase state on the review: `extraction: {phase: "independent" | "reconcile", locks: Record<reviewerId, boolean>}`.
- Store: gate reconciliation selectors on `both locked`; keep as-extracted entries immutable post-lock.
- Tests (TDD, logic first): Final-starts-empty for conflicts; agreed≠ai; firewall (no partner/AI data
  before both lock); not-reported≠0; derived tagging; resolution-method recorded.

---

## §7 — States, motion, copy (brief)
- **States:** independent-empty (first field), extracting, waiting-for-partner, both-locked→reconcile,
  reconciling, all-verified, unresolved-recorded. Loading = skeleton (Status). Error/offline per global.
- **Motion (design.md §8):** phase reveal = Orient; lock = Feedback; AI reveal = Feedback; no celebratory
  "0 conflicts" moment (framing rule).
- **Copy:** honest, ink-first. Blinding explained ("independent by design — this protects the review").

---

## §8 — Open questions (need your call)
1. **Arbitrator sourcing:** must the third reviewer be someone who did *not* extract that study (Cochrane
   ideal), enforced by the tool? (Recommend: yes, warn if violated.)
2. **QC sampling rate** for agreed critical fields — spot-check what fraction? (Methodologist default?)
3. **AI in Phase 1:** run AI extraction silently and hold output for Phase 2, or don't run it until
   Phase 2 at all? (Both are science-safe; the first saves time.)
4. **Author-contact tracking:** in-app log only, or generate the contact email as a draft (never auto-send)?

## §9 — Mobbin-pending (completed from `team-blinding-ux-screens/` harvest)
- §2 invite/roles/permissions UX · §3 the blinded-work + simultaneous-reveal gate · assignment/per-reviewer
  progress. The blinded-until-reveal pattern (planning-poker / sealed-review analogues) is the priority.
