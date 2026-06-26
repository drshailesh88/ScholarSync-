# Web/News/Discussions Council — Run Procedure

All judge calls run with secrets injected via 1Password (`op-run --`). Never paste keys.
Run exactly ONE council per genuine change (never re-roll). A run that fails the
council-strength checklist is **discarded, not trusted**.

## Prereqs
- Plan-1 baseline done: a scored run exists at `eval/web-search/runs/<run>/queries/*.json`
  and the Exa opponent at `eval/web-search/exa/fixtures.json`.
- `OPENROUTER_API_KEY` (+ `EXA_API_KEY`, `COHERE_API_KEY`) in the `Dev` vault.

## 1. Build the blinded packet
```bash
npx tsx eval/web-search/council/build-blinded-packet.ts --run <run-label> --out <cycle> --salt <cycle>
```
→ writes `council/<cycle>/PACKET.md` (judges see this) + `council/<cycle>/key.json` (judges NEVER see this).

## 2. Run ≥3 cross-family judges, isolated, temp 0 — each writes `<judge>.json`
- **Opus** — dispatch a FRESH Claude Code subagent (no shared context). Give it ONLY `PACKET.md`
  and the judge instruction (score A/B 0-5 on the six dims per the packet's tab rubric, strict JSON).
  Save its JSON to `council/<cycle>/opus.json`.
- **Codex** — run the Codex CLI on `PACKET.md` with the same instruction; save JSON to
  `council/<cycle>/codex.json`.
- **Third (Grok or DeepSeek) via OpenRouter:**
  ```bash
  op-run -- node eval/web-search/council/openrouter-judge.mjs \
    --model x-ai/grok-4 --packet eval/web-search/council/<cycle>/PACKET.md \
    --out eval/web-search/council/<cycle>/grok.json
  ```
  (Use `--list` to see current grok/deepseek/gemini ids; DeepSeek v4 is a valid third seat.)

Each judge must run at `temperature: 0`, fresh context, and must NOT see `key.json` or another
judge's output.

## 3. Aggregate + de-anonymize
```bash
npx tsx eval/web-search/council/aggregate-blinded.ts --dir <cycle>
```
→ writes `council/<cycle>/COUNCIL-REPORT.md` + `council-summary.json`. Refuses to run with <3 valid
judges. Reports per-tab and overall **beat-or-tie %** vs the ≥80% stop gate.

## 4. Council-strength checklist (§6.3) — the run only counts if ALL hold
- ground-truth `mustHaves` present & ratified for every compared query
- per-tab objective rubric loaded (the packet shows a `Tab = …` rubric per query)
- packet rows show domain + date + snippet (blinding-integrity field-parity passes)
- ≥3 cross-family judges at temp 0
- blinding-integrity check passes (judges can't fingerprint ours by field presence)
- opponent captured with strong tab-matched Exa params
- exactly one council per change
`build-blinded-packet.ts` enforces the rubric/rows; `blinding-check.ts` + `preflight.ts` enforce the
integrity gates; `aggregate-blinded.ts` enforces the ≥3-judge gate. A run failing any is discarded.

## Keep/revert gate (design spec §9)
KEEP a change iff deterministic metrics hold-or-improve AND the council holds-or-improves
(beat-or-tie %) AND no mainstream-class regression AND all quality gates pass — else REVERT.
