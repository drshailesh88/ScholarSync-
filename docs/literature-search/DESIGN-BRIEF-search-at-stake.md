# What's At Stake — Briefing for the Design Agent (Academic Search)

You are designing the search/composer experience for **ScholarSync**, an AI academic-research
platform. This document exists so you understand the *backend reality* your UI sits on top of —
what's broken, what we fixed, what we can't fix in the backend, and therefore **what the UI must do
to make search feel good.** The punchline: several quality problems are *cheaper and more robust to
solve in the UI than in the ranking backend.* Design accordingly.

---

## 1. The product in one line
A federated academic search + research engine over: our **own vector corpus** (PubMed abstracts
embedded with MedCPT, in Turbopuffer), plus live APIs — **PubMed, Europe PMC, Springer,
Elsevier/Scopus, Google Scholar (SerpAPI)**. Results are reranked by a **free self-hosted MedCPT
cross-encoder**. On top of search sit workflows: Deep Research (agentic), Systematic Review, Screen,
Draft & Cite, Slides, Integrity Check.

## 2. The core problem we've been fighting
Output quality was "at best average" despite heavy engineering. Root causes, now diagnosed with a
live measurement harness (not guesses):

- **The old evaluation was lying.** It froze the candidate pool and only measured *re-ordering*, so
  first-stage recall failures were invisible. Headline "beats Elicit" was really 67% vs an 80% bar,
  judged on **titles with no abstracts** and with the answer key shown to the judges. Lesson for UI:
  *what the user can see determines what they trust* — abstracts, evidence, provenance matter.
- **Ranking, not retrieval, is the bottleneck.** Landmark papers are in the candidate pool ~90% of
  the time but reach the top-10 only ~75%. The right papers are *found* and then *buried*.
- **The reranker saturates.** For an on-topic query, the cross-encoder scores ~20 papers all at
  ≈1.00 — it cannot tell the landmark trial (PARTNER 3, 3,600 citations) apart from 19 recent
  lookalikes. The tie-break then decides everything, and the tie-break has **no citation/landmark
  signal** (citation counts were dropped from the pipeline). So foundational trials land at #12–16,
  just outside the top 10.
- **Phrasing changes the answer, legitimately.** "TAVR low-risk **six-year** outcomes" correctly
  surfaces 6-year papers and buries the 2019 original; "**PARTNER trials**" wants the landmark at
  #1. The backend often *cannot know which the user meant.* **This is the UI's job to resolve.**

## 3. What we tried in the backend (and the honest scorecard)
- **✅ Fixed — free reranker.** The paid reranker (OpenRouter) silently ran out of credits and
  degraded live search to keyword-only. Switched to the free self-hosted MedCPT cross-encoder
  ($0 idle, biomedical-SOTA). This fixed a live production outage *and* removed a per-search cost —
  critical pre-revenue.
- **✅ Kept — rerank the whole candidate pool** and sort reranked results strictly above the
  un-reranked tail (was only reranking the top 50, letting keyword scores out-rank the model).
- **❌ Reverted — demote RRF fusion weight.** Hypothesis that fusion math buried single-lane papers.
  Measured: no improvement, slightly worse. Wrong cause.
- **❌ Not pursued — kill the recency multiplier.** Measurement showed it doesn't even fire on the
  buried-landmark queries. Wrong cause.
- **▶ The real backend lever (scoped, not yet built): restore the citation/landmark signal** so a
  3,600-citation trial can float past 19 tied lookalikes into the top 10.

## 4. What the backend CANNOT fix — and the UI must
1. **Intent ambiguity.** landmark vs latest vs exhaustive is a *user* fact. A ranking heuristic can't
   infer it reliably (we proved this — two heuristics failed). The UI must capture it.
2. **Query quality.** Vague queries retrieve badly. The single cheapest quality win in the whole
   system is nudging the user toward a precise question *before* the search runs.
3. **Scope.** Whether to search our corpus, all of PubMed, or clinical trials changes precision
   massively. Only the user knows. Show it; let them set it; show the counts (trust).
4. **Trust in a slow/agentic run.** Deep Research runs for minutes and costs compute. Users forgive
   slowness only when they see *what it's doing* and *why*.

## 5. Lessons from Elicit's UI (what to steal, what we already beat)
Elicit's mobile home = one prompt box with **`Find papers ▾`** (mode selector inside the box:
TOOLS = Find papers / Chat with papers / Extract data; WORKFLOWS = Research agent / Report /
Systematic review), a **`Source: Research papers (138M) / Clinical trials (500K)`** scope selector
with counts, a live **"Please ask a precise research question"** coaching hint, **Resume + Suggested**
cards under the box, and a left rail whose history uses **distinct icons per run type**
(search / report / agent).

- **Steal:** source scope *with live counts*; the precise-question coaching hint; suggested
  reformulations; agent runs as persistent, resumable, icon-typed history objects; a saturation /
  "we've found ~everything" signal (Elicit under-shows this; it's what clinicians actually want).
- **We already beat them on intent:** their mode is a *pre-selected dropdown* (friction, and users
  guess wrong). Ours is a **correctable routing chip** — type naturally, we detect intent and show
  "Will run: X · from Y", tap to change, never a black box. Keep this; it's better.

## 6. Design implications — where the UI moves search quality
Ranked by leverage (UI work that substitutes for backend heuristics we can't make reliable):

1. **Intent facet on the routing chip for DISCOVER/search** — beyond output type (Slides, Report),
   capture the ranking-relevant intent: **Landmark trials · Latest evidence · Exhaustive review.**
   This flag is what flips citation-boost on/off in the backend. Highest leverage: it resolves the
   phrasing ambiguity the backend can't.
2. **Source/scope chip with counts** in the composer — "All sources ▾ (PubMed 37M · Trials 500K ·
   Your library 214)". Trust + precision. Directly supports our federation story.
3. **Quiet precision coaching** — a calm, non-nagging hint when a query is too vague ("Add a
   population or outcome for sharper results"). Fits the "one calm box" mood; don't make it loud.
4. **Deep Research (agentic) needs its own flow:** an up-front **clarifier** (landmark/latest/
   exhaustive, scope, date window) → **streamed steps** (searching → screening 180 → 24 relevant →
   following citations) → a **discovery/stopping signal** ("new-paper discovery flattened — likely
   complete") → a **resumable, cite-checked report.** This is the differentiator tier.
5. **Show evidence + provenance on results** — study type, citation count, and support/contradict
   signals (the design tokens already encode include/maybe/exclude/contradicting). This is what makes
   a medical engine trustworthy and is our moat vs generic search.

## 7. The mood to hold
Calm, editorial, authoritative — a "research desk," not a flashy consumer app. The existing home
("Good morning, Dr. Singh — your research desk") and the "one calm box" composer are right. Search-
quality affordances (scope, coaching, intent) must be **quiet and confident**, surfaced at the moment
of need, never cluttering the rest state. Restraint is the brand.
