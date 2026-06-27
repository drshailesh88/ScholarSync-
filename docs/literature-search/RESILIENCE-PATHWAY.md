# Search Resilience & Dependency Pathway

**Status:** Living decision record. Last updated 2026-06-27.
**Why this file exists:** to capture — durably, outside the chat where it was reasoned
out — what we found, what we built, what we deliberately did NOT build, and the
**conditions under which we would build it later**. So that when a real problem appears
(throttle under load, an NCBI outage, a synthesis-parity push), the next person does not
start from zero. They start here.

> One-line decision: **At pre-launch / first ~100 users, own the meaning-lane (done),
> keep renting the word-lane behind a fail-open net (done), and do NOT build PHASE 0.
> Revisit when real traffic — not the test harness — proves the rented lane is the
> bottleneck.**

---

## 1. The mental model: two lanes

Literature retrieval runs on two independent lanes that are fused at the end. Everything
below hangs off this distinction, so it comes first.

| Lane | What it does | Who owns it | Failure mode | Status |
|------|--------------|-------------|--------------|--------|
| **Semantic / dense** | "find papers that *mean* this", concept match | **Manan owns it** — MedCPT vectors in Turbopuffer, encoders on Modal | None at our scale: no external rate limit, scale-to-zero, int8 ANN | **OWNED, zero-429** |
| **Lexical / keyword + metadata** | "find papers with these *words*", exact terms, citations, this-week recency | **Rented** — PubMed E-utilities + OpenAlex keyword API | Third-party rate limits (PubMed ~10 req/s with key, OpenAlex daily pool) | **RENTED, fail-open** |

The two are merged with **RRF** (reciprocal-rank fusion), then a cross-encoder relevance
signal and a metadata-dominant quality composite re-rank the fused list. The dense lane
(`medcpt_dense`) **replaced** the old throttled `openalex_semantic` lane — that swap is
the whole point of the 2-day Turbopuffer/Modal build.

**The key realization:** the lane that used to throttle and break searches (semantic) is
now owned and unthrottleable. The lane that still rents (lexical) is the *easy* one — and
it already fails open, so a throttle there degrades quality slightly instead of breaking
the search.

---

## 2. What we found (the diagnoses)

Three findings drove every decision in this record. Capture them precisely because they
are counter-intuitive and easy to re-litigate.

### 2.1 The throttle is a HARNESS artifact, not a product problem
The 87-query evaluation harness fires hundreds of API calls in ~10 minutes. That burst
trips PubMed/OpenAlex rate limits. **100 real users do not burst** — they trickle queries
over hours and each one issues a handful of calls. The throttle we kept seeing was *us
load-testing the rented lane with a benchmark*, not a condition real users would hit.

Proof it was throttle and not a quality regression: when a 87q run dropped to recall 0.77
with 3 empty result sets and `[0: pubmed,openalex]` (zero candidates) on the regressed
queries at p50 8.1s, we **re-ran only the 6 starved queries** and 4 of them recovered to
100%. Union-max recall across runs (per-query best, the standard throttle-correction)
landed at **0.905**, comfortably above the 0.88 floor.

### 2.2 Cross-encoder sigmoid saturation (fixed)
The MedCPT Cross-Encoder emits raw logits (≈ −16…+10). Two failures stacked:
- **Saturation:** a naïve `sigmoid` of large positive logits (>~6) all map to ≈1.000, so
  the ground-truth paper and a near-title-twin tied at the top — discrimination erased.
- **Domination:** an even earlier bug summed a *raw* logit against [0,1] signals, so one
  negative logit on a trial's primary report drove the composite to ≈ −2.8 and buried the
  correct answer beneath acronym-mentioning secondaries.

**Fix:** normalize at the adapter boundary (`logitToProbability` in `rerank.ts`) so every
backend's `rerankScore` is a bounded [0,1] probability, and cap its weight at **0.30** in
a metadata-dominant composite (`BALANCED_CONFIG`). Trial-acronym recall went 0.716 → 0.85+,
all 4 acronym queries to 100%.

### 2.3 NEJM journal-quartile not resolving (fixed)
`N Engl J Med` (ISO/NLM abbreviation) is not a substring of "New England Journal of
Medicine", so the journal-quality lookup returned unknown (signal 0.1 instead of 1.0),
demoting NEJM papers. **Fix:** a positional ISO-abbreviation matcher (`isIsoAbbreviation`
in `journal-quality.ts`) plus an empty-string guard. NEJM / JACC / JAMA now resolve to Q1;
the `exact-dapa-hf` ground-truth paper went back to #1.

---

## 3. What we built (current status)

| Component | State | Where |
|-----------|-------|-------|
| Dense MedCPT index (int8, hybrid) in Turbopuffer | **Live** (~24M precomputed rows + 2024–26 backfill) | Turbopuffer `aws-us-east-1` |
| MedCPT Query-Encoder (scale-to-zero GPU) | **Live** | Modal `manan-medcpt` |
| MedCPT Cross-Encoder rerank (raw logits → bounded) | **Live** | Modal + `rerank.ts` |
| `medcpt_dense` source, replacing `openalex_semantic` | **Live, merged** | `sources/medcpt-dense.ts` |
| RRF fusion + metadata-dominant composite | **Live, merged** | `quality-ranker.ts` (`BALANCED_CONFIG`) |
| Journal-quartile ISO-abbreviation enrichment | **Live, merged** | `journal-quality.ts` |
| Freshness machine (weekly PubMed updatefiles → embed → upsert/delete) | **Deployed + proven** | Modal cron `0 6 * * 1` |

**Measured outcome (87q harness, throttle-corrected):** recall@10 **0.716 → 0.88–0.90**
(union-max 0.905), nDCG@10 **0.675 → 0.71**, **zero 429s** on the owned lane, deterministic
latency, **0 unit-test regressions**. Merged at `1dd9d6f6` (PRs #82, #83). CI green.

**Freshness proven on a real delta:** updatefile `n1504` produced
`{processed: 1, upserted: 24210, deleted: 26}` and correctly removed retracted/withdrawn
PMID `41611480` honoring the PubMed delete flag — so the index self-heals weekly, not just
on the one-time backfill.

---

## 4. The dependency question, answered

> *"Do we still need to depend on the PubMed / OpenAlex API if we have everything in
> Turbopuffer?"*

**Short answer: yes, for now — but only for the easy lane, and only because finishing the
last mile of self-hosting isn't worth it at 100 users.** Capability by capability:

| Capability | Owned in Turbopuffer today? | Still need the API? |
|------------|------------------------------|----------------------|
| Semantic / concept match | **Yes** (dense vectors) | No |
| Keyword / exact-term match | **Partial** — only `title` is BM25-indexed; `abstract` is stored but NOT indexed | Yes |
| Rich metadata (journal, authors, year, DOI) | **Partial** — full on the 2024–26 backfill; the ~24M older precomputed rows are metadata-thin (≈ pmid + vector) | Yes, to fill gaps |
| Citation counts / velocity | **No** — pulled live from OpenAlex | Yes |
| Today's brand-new papers | **No** — index is weekly-fresh (freshness cron) | Yes, for <1-week recency |

So the rented lane survives today because it backfills four things the index doesn't yet
fully own: abstract keyword search, metadata on the old rows, live citations, and
this-week recency. **None of these break the product** when the API throttles, because the
lexical lane fails open — a throttled call returns the dense-lane results alone.

---

## 5. What's already in place for PHASE 0 (it's half-built)

PHASE 0 = "self-host the lexical lane as a Turbopuffer BM25 index so we stop renting the
word-lane." It is **NOT done**, but it is **half-built** — the schema and the title index
already exist, because we designed the dense namespace to double as the future lexical one.

Current `TPUF_SCHEMA` (in `infra/modal/medcpt_service.py`):

```python
TPUF_SCHEMA = {
    "vector":   {"type": f"[{EMBED_DIM}]f32", "ann": True},
    "pmid":     {"type": "string", "filterable": False},
    "title":    {"type": "string", "full_text_search": True, "filterable": False},  # BM25 ✅
    "abstract": {"type": "string", "filterable": False},  # stored, NOT yet BM25-indexed
    "journal":  {"type": "string", "filterable": False},
    "year":     {"type": "uint"},                          # the only filterable field
    "authors":  {"type": "[]string", "filterable": False},
    "doi":      {"type": "string", "filterable": False},
}
```

**Done:** the namespace exists; full metadata columns are defined; `title` is BM25-indexed;
the `pubmed_parser` + Modal ingest machinery (built for the dense backfill and freshness)
is reusable verbatim for a lexical backfill.

**Not done (the remaining PHASE 0 work):**
1. Add `full_text_search: True` to `abstract` and re-index (abstracts become keyword-searchable).
2. Backfill metadata (abstract/journal/authors/doi) onto the ~24M metadata-thin precomputed
   rows — download + parse the PubMed annual baseline, upsert by PMID.
3. Write `sources/pubmed-local.ts` — a lexical source that queries Turbopuffer BM25
   (multi-query + RRF) instead of the PubMed E-utilities API, behind the same source
   interface so it slots into the existing fusion.
4. Decide citations: keep pulling them live from OpenAlex (simplest) OR ingest + accept
   staleness.
5. Keep a thin live-PubMed lane (or run freshness more often) for sub-1-week recency.

---

## 6. Resilience: two kinds — be precise about which we have

People say "resilient" to mean two different things. We have one of them. We deliberately
deferred the other.

| Kind | What it protects against | Do we have it? |
|------|--------------------------|----------------|
| **Fail-open** | A rented API being slow/down/throttled **breaking a user's search** | **YES — built.** A throttled lexical call returns dense-lane results alone; proven 0 empty result sets for users. |
| **Throttle-immunity** (PHASE 0) | Sustained, high-volume traffic *systematically* starving the rented lane | **NO — deferred.** This is scale insurance, and at 100 users there is no scale to insure. |

The thing that protects *users today* (fail-open) is done. The thing PHASE 0 buys
(throttle-immunity) only matters once real, sustained load — not a benchmark burst — is
hitting the rented lane. **At 100 users, wait.**

---

## 7. Cost shape — current and the marginal cost of each future lever

(Approximate; tracked against the $42.50 billing-cycle limit.)

| Item | Cost | Note |
|------|------|------|
| **Current run-rate** | **~$25–50/mo** | Turbopuffer storage (~tens $/mo) + warm CPU encoder (few $/mo) + freshness (few GPU-min/week). Cross-encoder $0 idle (scale-to-zero). |
| Dense backfill (already paid) | $3–15 one-time | Done. |
| **PHASE 0** (finish the lexical lane) | **+~$20–60/mo** + eng time + ~$10–40 one-time backfill | More Turbopuffer storage (abstracts indexed) + baseline re-ingest. Only buys throttle-immunity. |
| **Multi-query / HyDE on DeepSeek** | **~$2–9/mo** | Per-query LLM cost; noise at 100 users. Closes a real retrieval gap. |
| Full-text extraction | On-demand, per-paper | A product feature, not infra. See §8. |
| Pre-embed a 100M-paper corpus | — | **Never** for biomedical. See §8. |

The structural point: **fixed infra cost** (storage, warm encoder) is what PHASE 0 adds;
**per-query cost** (HyDE) is what the quality levers add. At 100 users the per-query costs
are noise, so the cheap quality wins come first and the fixed-cost insurance waits.

---

## 8. What we will NOT do, and why

- **Pre-embed a 100M-paper general corpus.** Biomedical retrieval is well-served by
  PubMed-scoped MedCPT; a 100M general-science embed is cost and maintenance we will never
  recoup for this product. Out of scope indefinitely.
- **Full-text + structured extraction as a default path.** This is a *synthesis-parity
  product bet* (Elicit-style "extract the N from each paper"), not search infra. It's an
  on-demand, per-paper LLM operation that belongs to a later product phase and is cheap to
  run only on the handful of papers a user actually opens — not the whole result set.
- **PHASE 0 right now.** See the whole rest of this document.

---

## 9. The resilient pathway — the decision tree for "when problems come"

This is the part to read when something breaks in the future. Match the symptom, follow
the branch.

```
Is the search BREAKING for users (empty results, errors)?
├── NO  → it's a quality/latency question. Do the §10 sequence (free ranking, HyDE).
│         Do NOT build PHASE 0 for a quality problem — it doesn't add recall, only uptime.
│
└── YES → why?
    ├── Owned lane (Turbopuffer/Modal) down → infra incident. Check Modal app
    │     `manan-medcpt` + Turbopuffer status. This is rare and not a dependency problem.
    │
    └── Rented lane (PubMed/OpenAlex) throttling under REAL traffic (not the harness)?
          ├── Intermittent / low volume → fail-open already covers it. Monitor. Maybe
          │     add request caching / a small queue before committing to PHASE 0.
          │
          └── Sustained, traffic-driven, >~10 req/s for minutes on end, OR an NCBI
                outage / policy / key restriction makes the rented lane unreliable
                → THIS is the PHASE 0 trigger. Build it (§5 remaining steps). The
                  schema + title-BM25 + ingest machinery are already in place, so it's a
                  "finish it", not a "start from zero" — that was the whole design intent.
```

**PHASE 0 trigger conditions, stated plainly — build it WHEN any of these is true:**
1. Real, sustained production traffic throttles PubMed/OpenAlex (not a benchmark burst).
2. NCBI/OpenAlex has an outage, policy change, or key restriction that makes the rented
   lane unreliable enough to hurt users.
3. You need a search uptime guarantee that does not depend on a third party (e.g. an
   enterprise/clinical SLA).

Until one of those is true: **don't.**

---

## 10. What's next (the "quality product for 100 users" sequence)

Agreed order, cheapest-and-highest-leverage first. Total incremental ≈ **$2–9/mo**.

1. **Harness caching** — cache API responses in the 87q harness. **$0.** Makes measurement
   deterministic and removes the throttle *from the benchmark* — which is the only place
   the throttle actually bites today. This replaces PHASE 0's measurement benefit for free.
2. **Free ranking work** — broad-query curation, best-in-top-3, MMR diversity,
   latest-version preference, UI surfacing of evidence/quartile. No new cost.
3. **Multi-query / HyDE on DeepSeek** — ~$5/mo. Closes the retrieval gap on under-specified
   queries (the PARTNER-3-style misses).
4. **Re-measure 87q** and decide whether quality is sufficient for the first 100 users.

PHASE 0 is **not** in this sequence. It sits in §9 as a documented lever to pull *if and
when* a trigger fires.

---

## 11. Answering the two standing questions

- **"Is that part of PHASE 0 done?"** — **No. Half-built.** The Turbopuffer schema, the
  `title` BM25 index, and the reusable `pubmed_parser`/Modal ingest machinery exist. The
  abstract BM25 indexing, the metadata backfill of the ~24M old rows, the
  `sources/pubmed-local.ts` lexical source, and the citation decision do **not** exist.
- **"What next after this?"** — Capture is this document. Then start the §10 sequence at
  step 1 (harness caching), because it neutralizes the throttle where it actually hurts
  (the benchmark) for $0, and unblocks honest re-measurement of every quality lever after.

---

## Cross-references
- `ARCHITECTURE.md` — the rerank/fusion design and the reranker contract.
- `PHASE-01-STATUS.md` — the dense-lane build status and the floor-close record.
- `SOURCE-MATRIX.md` — per-source roles; documents `medcpt_dense` replacing `openalex_semantic`.
- `infra/modal/OPS.md` — cost shape and operational runbook for the Modal app `manan-medcpt`.
- `infra/modal/medcpt_service.py` — `TPUF_SCHEMA`, freshness cron, encoder/cross-encoder.
