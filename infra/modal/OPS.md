# MedCPT Dense Lane — Operations Runbook

Everything needed to stand up, operate, and rotate the self-hosted MedCPT dense
retrieval lane that replaced the throttled OpenAlex `search.semantic` lane.

- **Live query lane:** `src/lib/search/sources/medcpt-dense.ts` (fail-open;
  dormant until the env vars below are set — so none of this can break live
  search while it is being provisioned).
- **Modal app:** `infra/modal/medcpt_service.py` (encoder endpoint + the
  embedding/freshness/backfill/index-load jobs).
- **Decision record:** `.planning/decisions/2026-06-25-medcpt-self-hosted-index-stack.md`.

All commands run through **`op-run`** so secrets are injected from 1Password and
never touch the shell history, a file, or chat. Never hardcode a key.

---

## 0. Prerequisites (one-time)

```bash
# Modal CLI (local), authenticated via the Agent-Vault tokens.
op-run -- pipx install modal            # or: pip install modal
op-run -- modal token set --token-id "$MODAL_TOKEN_ID" --token-secret "$MODAL_TOKEN_SECRET"
op-run -- modal app list                # sanity check: authenticated
```

`MODAL_TOKEN_ID`, `MODAL_TOKEN_SECRET`, `TURBOPUFFER_API_KEY` are already in the
1Password `Agent Vault` and wired into `~/.config/op/dev.env`.

### `HF_TOKEN` — the one secret still needed

The embedding jobs pull the (free, ungated) `ncbi/MedCPT-*` models from Hugging
Face, which is far more reliable authenticated. If `HF_TOKEN` is **not** yet in
the `Agent Vault`, add it from your phone/1Password app (never via chat) and
append to `~/.config/op/dev.env`:

```
HF_TOKEN=op://Dev/HF_TOKEN/credential
```

Then create the **Modal Secret** the jobs read (holds both keys):

```bash
op-run -- modal secret create manan-medcpt-secrets \
    HF_TOKEN="$HF_TOKEN" \
    TURBOPUFFER_API_KEY="$TURBOPUFFER_API_KEY"
```

---

## 1. Deploy the encoder + schedule the recurring jobs

```bash
op-run -- modal deploy infra/modal/medcpt_service.py
```

This serves the `QueryEncoder` web endpoint and registers two crons. Modal prints
the endpoint URL, e.g. `https://<workspace>--manan-medcpt-queryencoder-encode.modal.run`.
Copy it.

- **`QueryEncoder`** — **CPU, always-warm** (`cpu=1.0`, `min_containers=1`).
  Serves two endpoints: **`encode`** (query → 768-d vector, the two-hop fallback)
  and **`search`** (query → ANN rows; encodes AND queries Turbopuffer server-side
  — the preferred one-round-trip path, see §4). The encoder is a single short BERT
  forward pass; on CPU it returns in well under a second with no cold start. A GPU
  here only added a ~20s scale-from-zero that blew the live search's 5s fan-out
  deadline (silently dropping the dense lane after any idle) and cost ~10× more to
  keep warm. Bulk *article* embedding still uses on-demand GPUs (`process_file`).
- **`CrossEncoder.rerank`** — self-hosted `ncbi/MedCPT-Cross-Encoder` reranker on
  **scale-to-zero A10G** (`$0` idle; `scaledown_window` holds it warm across a
  run). **RETIRED from the live critical path** — the live academic reranker is now
  OpenRouter `cohere/rerank-4-pro` (managed, always-warm, ~1.2s, ~$0.0025/search;
  see `docs/literature-search/RERANKER-DECISION.md`). This A10G reranker stays
  deployed but **scale-to-zero as an opt-in / break-glass fallback only**: it is
  reached via `MEDCPT_RERANK_URL` **only when `ACADEMIC_USE_MEDCPT_RERANK=1`**.
  **Do NOT add a `min_containers` / keep-warm to this reranker** — keeping it warm
  24/7 is exactly the ~$540–800/mo of idle A10G the OpenRouter switch eliminated.
  Cold start ~20s → if ever opted in it fails open (keeps pre-rerank order) on the
  first query after idle. Retiring the reranker does **not** touch retrieval — the
  MedCPT DENSE lane (`MEDCPT_SEARCH_URL`, below) is unchanged and stays live.
- **`freshness`** — **weekly** cron (`FRESHNESS_CRON`, default `"0 6 * * 1"` =
  Mon 06:00 UTC). Pulls new daily updatefiles past the stored watermark.
- **`keep_warm`** — cron (`KEEP_WARM_CRON`, default `*/5 * * * *`) that probes the
  Turbopuffer namespace so its ANN cache never cools (warm ≈0.3s vs cold ≈3.5s ANN).
  **Scoped to the DENSE lane only — it does NOT warm the CrossEncoder reranker**
  (that GPU is retired to scale-to-zero; see above). Object-storage reads only; the
  lane still fails open if the namespace is ever cold, so this is a latency
  optimization, not a correctness dependency.

---

## 2. Build the historical index (one-time, ~24M vectors, through ~2023)

Loads NCBI's free precomputed MedCPT embeddings straight into an int8 Turbopuffer
namespace (no GPU — vectors already exist). Runs on Modal, near Turbopuffer.

```bash
op-run -- modal run infra/modal/medcpt_service.py::load_index
```

> Large download (tens of GB across ~37 chunks). Re-runnable / idempotent
> (upsert by PMID). If the precomputed `pubmed_chunk_*.json` field names differ in
> a future NCBI release, `load_chunk` falls back gracefully (title/abstract may be
> empty) — confirm against one chunk and adjust `_meta_field` if needed.

## 3. Backfill the 2024–2026 gap (one-time, ~8–9M papers, ~$3–15 GPU)

The precomputed set stops at ~2023; recency (2024–2026 retrievable) is a **hard
exit gate**. This embeds the gap with the Article-Encoder on on-demand GPUs.

```bash
op-run -- modal run infra/modal/medcpt_service.py::backfill --year-start 2024 --year-end 2026
```

After this the weekly `freshness` cron keeps everything current automatically.

---

## 4. Go live (flip the lane on)

Set these where the app runs — Vercel project env (production) **and**
`.env.local` for local/eval (injected by `op-run`). The lane activates with **no
code change** the moment they are present:

```
# PREFERRED — one server-side round-trip (encode + Turbopuffer ANN on Modal).
MEDCPT_SEARCH_URL=<the QueryEncoder.search URL from step 1>

# OPTIONAL self-hosted reranker (MedCPT Cross-Encoder), RETIRED from the live path.
# The live academic reranker is OpenRouter cohere/rerank-4-pro (OPENROUTER_API_KEY) —
# see docs/literature-search/RERANKER-DECISION.md. Leave MEDCPT_RERANK_URL UNSET for
# the normal config. Only set it AND ACADEMIC_USE_MEDCPT_RERANK=1 to opt the scale-to-
# zero A10G cross-encoder back onto the critical path (break-glass; accepts ~20s cold).
# MEDCPT_RERANK_URL=<the CrossEncoder.rerank URL from step 1>
# ACADEMIC_USE_MEDCPT_RERANK=1

# Fallback two-hop (encode on Modal, ANN from the app). Used only when
# MEDCPT_SEARCH_URL is unset. Both paths fail open.
MEDCPT_QUERY_ENCODER_URL=<the QueryEncoder.encode URL from step 1>
TURBOPUFFER_API_KEY=<from 1Password>          # op:// reference in dev.env
TURBOPUFFER_REGION=aws-us-east-1              # optional; this is the default
MEDCPT_TURBOPUFFER_NAMESPACE=medcpt-pubmed    # optional; this is the default
```

**Prefer `MEDCPT_SEARCH_URL`.** The two-hop lane (encode here, then ANN from the
app) makes two sequential fetches whose promise continuations get starved by the
app's single-threaded event loop while it parses the concurrent PubMed/OpenAlex
responses — which inflated the dense lane to 5–6s and dropped it past the 5s
fan-out deadline on ~85% of queries. The combined `search` endpoint does encode +
ANN server-side (next to Turbopuffer), so the app makes ONE fetch (~3s in-pipeline)
and the lane participates on essentially every query. Set the app's
`MEDCPT_TIMING=1` to log `[MedCPT timing] combined=…ms` per query when diagnosing.

Verify: `sourceStatuses.medcpt_dense` flips from `missing_config` → `ok` and the
lane contributes candidates (visible in each result's `sources: ["medcpt_dense", …]`).

---

## 5. Measure (before / after on the 87q frozen-pool harness)

```bash
# BEFORE (floor): current main / lane dormant — recall via lexical lanes only.
op-run -- npm run eval:search -- --label before-medcpt

# AFTER: with the env vars from step 4 set (lane live).
op-run -- npm run eval:search -- --label after-medcpt
npx tsx eval/literature-search/rescore.ts before-medcpt after-medcpt
```

Exit gate: nDCG@10 / recall@10 ≥ the throttled-OpenAlex floor
(`BASELINE-87Q-FLOOR.md`) **including** recency (2024–2026) queries, with zero
429s and deterministic latency.

---

## 6. Prove freshness on a real delta (deleted removed, new searchable)

A green index isn't enough — the recurring updater must be shown to both add
new/changed PMIDs **and** honor DeleteCitation removals. The `freshness_delta_proof`
helper sets this up against a real NCBI updatefile; the proof then runs the real
scheduled `freshness()` and checks the index before/after:

1. Scan the trailing updatefiles for one carrying real DeleteCitation entries
   (the newest file often has none): `freshness_delta_proof(url, plant=False)`.
2. Plant a removable marker row for one of that file's delete PMIDs
   (`plant=True`) — so removal is provable, not merely "already absent".
3. Set the watermark to the file just before it, run `freshness()`, and assert:
   the delete PMID is now **absent**, the file's kept PMID is **present**, and the
   watermark advanced to the newest file.

The repeatable orchestration lives in `scratchpad/freshness_proof.py` (run via
`op-run -- python freshness_proof.py`). `process_file` is the exact per-file
worker `freshness()` fans out over (`process_file.map(pending)`), so proving the
delta through `freshness()` proves the whole pipeline.

## Routine operations

| Task | How |
|------|-----|
| **Change cadence** | Edit `FRESHNESS_CRON` in `medcpt_service.py` (default `"0 6 * * 1"` = weekly Mon 06:00 UTC) and `modal deploy` again. |
| **Re-run the gap backfill** | `op-run -- modal run …::backfill --year-start <Y> --year-end <Y>` — idempotent (upsert by PMID). |
| **Force a freshness run now** | `op-run -- modal run infra/modal/medcpt_service.py::freshness` |
| **Rotate `TURBOPUFFER_API_KEY` / `HF_TOKEN`** | Update the value in 1Password, then re-create the Modal Secret: `op-run -- modal secret create manan-medcpt-secrets HF_TOKEN=… TURBOPUFFER_API_KEY=…` (create overwrites), and update the app env (`MEDCPT_QUERY_ENCODER_URL` is unchanged). No code change. |
| **Switch Turbopuffer region** | Set `TURBOPUFFER_REGION` (live app) and re-run the index build/backfill against the new region; it is a constructor arg only — `aws-us-east-1` colocates with Vercel `iad1` + Modal us-east. |
| **Take the lane offline** | Unset `MEDCPT_QUERY_ENCODER_URL` (or `TURBOPUFFER_API_KEY`) — the lane returns `missing_config` and search falls back to the lexical lanes. |
| **Tear down** | `op-run -- modal app stop manan-medcpt` (stops the encoder + cron; the Turbopuffer namespace persists until deleted separately). |

## int8, precisely

Turbopuffer's input vector types are `f32`/`f16` only — you do NOT write int8
integers (that 400s: "invalid i8 value"). We write `[768]f32` vectors and
Turbopuffer applies **int8 quantization to the ANN index automatically** (its
"native i8", ±0.001 quality, ~4× smaller hot index). So: full vectors live as f32
on cheap object storage; the performance-critical ANN index is int8 — satisfying
"int8, not binary" while the live lane keeps querying with float vectors. Only the
`year` attribute is filterable (Turbopuffer caps filterable values at 4096 bytes,
which abstracts exceed).

## Cost shape (steady state)

- Turbopuffer: object-storage-native; f32 vectors on cheap object storage + an
  automatic int8 ANN index (4× smaller hot set); ~tens of $/mo at this scale.
- Modal encoder: one always-warm **CPU** replica (`min_containers=1`) — a few
  $/mo, not GPU. Deterministic sub-second encode latency is the live lane's exit
  gate, which scale-to-zero could not meet (~20s cold start dropped the lane).
- `keep_warm`: object-storage reads only — negligible. (Dense lane only; it does
  not warm the reranker.)
- **Cross-Encoder reranker: $0 idle.** Retired from the live path (OpenRouter
  cohere/rerank-4-pro is now the live academic reranker) and left **scale-to-zero**,
  it avoids the ~$540–800/mo of idle A10G a 24/7 keep-warm would cost. The live
  reranker cost moves to OpenRouter at ~$0.0025/search.
- Freshness: a few GPU-minutes per week on the daily delta.
- One-time: index load (egress/compute only) + the 2024–2026 backfill (~$3–15 GPU).
