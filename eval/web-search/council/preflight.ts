/**
 * Council-strength checklist (design spec §6.3). A council run that fails ANY of
 * these is discarded, not trusted. Run against a built packet + the present judges
 * BEFORE aggregating.
 */
import type { EnginePair } from "./build-blinded-packet";
import { checkBlinding } from "./blinding-check";
import type { WebBenchmarkQuery } from "../types";

export function councilStrengthCheck(opts: {
  pairs: EnginePair[];
  key: Record<string, "ours" | "exa">;
  queriesById: Map<string, WebBenchmarkQuery>;
  judgesPresent: string[];
}): { ok: boolean; failures: string[]; passes: string[] } {
  const failures: string[] = [];
  const passes: string[] = [];

  // 0. there must be something to compare
  if (opts.pairs.length === 0) failures.push("no comparable queries (need run output + Exa fixtures)");
  else passes.push(`${opts.pairs.length} comparable queries`);

  // 1. ground-truth mustHaves present for every compared query
  const missing = opts.pairs.filter((p) => !(opts.queriesById.get(p.id)?.mustHaves?.length));
  if (missing.length) failures.push(`ground-truth must-haves missing for: ${missing.map((p) => p.id).join(", ")}`);
  else passes.push("ground-truth must-haves present for all compared queries");

  // 2. ≥3 cross-family judges
  if (opts.judgesPresent.length < 3) failures.push(`only ${opts.judgesPresent.length} judges present (need ≥3 cross-family)`);
  else passes.push(`${opts.judgesPresent.length} judges present`);

  // 3. packet rows are rich (domain+date+snippet) AND 4. blinding integrity holds (one check covers both)
  const blind = checkBlinding({ pairs: opts.pairs, key: opts.key });
  if (!blind.ok) failures.push(...blind.reasons);
  else passes.push(`blinding integrity ok (field gaps: ${JSON.stringify(blind.fieldGap)}, ours-as-A ${Math.round(blind.aShareOurs * 100)}%)`);

  return { ok: failures.length === 0, failures, passes };
}
