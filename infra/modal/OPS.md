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

## 1. Deploy the encoder + schedule the freshness job

```bash
op-run -- modal deploy infra/modal/medcpt_service.py
```

This serves the `QueryEncoder` web endpoint (scale-to-zero A10G) and registers
the **weekly** `freshness` cron. Modal prints the endpoint URL, e.g.
`https://<workspace>--manan-medcpt-queryencoder-encode.modal.run`. Copy it.

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
MEDCPT_QUERY_ENCODER_URL=<the modal deploy URL from step 1>
TURBOPUFFER_API_KEY=<from 1Password>          # op:// reference in dev.env
TURBOPUFFER_REGION=aws-us-east-1              # optional; this is the default
MEDCPT_TURBOPUFFER_NAMESPACE=medcpt-pubmed    # optional; this is the default
```

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

## Cost shape (steady state)

- Turbopuffer: object-storage-native, int8 (4× smaller); ~tens of $/mo at this scale.
- Modal encoder: scale-to-zero — **$0 when idle**, A10G-seconds only while serving.
- Freshness: a few GPU-minutes per week on the daily delta.
- One-time: index load (egress/compute only) + the 2024–2026 backfill (~$3–15 GPU).
