/**
 * Blinding-integrity guard for the web council. Both engines render in the same
 * format, but a SYSTEMATIC field-presence gap (Exa always has date+snippet,
 * SearXNG often doesn't) lets a judge fingerprint which list is ours. This checks
 * per-engine presence parity for domain/publishedDate/snippet and A/B balance.
 * A council run that fails is discarded, not trusted (design spec §6.3).
 */
import type { EnginePair } from "./build-blinded-packet";

type Field = "domain" | "publishedDate" | "snippet";
const FIELDS: Field[] = ["domain", "publishedDate", "snippet"];

export function presenceRate(pairs: EnginePair[], engine: "ours" | "exa", field: Field): number {
  const rows = pairs.flatMap((p) => p[engine]);
  if (rows.length === 0) return 0;
  const present = rows.filter((r) => r[field] != null && r[field] !== "").length;
  return present / rows.length;
}

export function checkBlinding(opts: {
  pairs: EnginePair[];
  key: Record<string, "ours" | "exa">;
  maxFieldGap?: number;
}): { ok: boolean; reasons: string[]; fieldGap: Record<Field, number>; aShareOurs: number } {
  const maxGap = opts.maxFieldGap ?? 0.4;
  const reasons: string[] = [];

  const fieldGap = {} as Record<Field, number>;
  for (const f of FIELDS) {
    const gap = Math.abs(presenceRate(opts.pairs, "ours", f) - presenceRate(opts.pairs, "exa", f));
    fieldGap[f] = Math.round(gap * 100) / 100;
    if (gap > maxGap) {
      reasons.push(
        `field-presence gap on "${f}" is ${fieldGap[f]} (> ${maxGap}): the two engines are distinguishable by ${f}.`,
      );
    }
  }

  const ids = opts.pairs.map((p) => p.id).filter((id) => opts.key[id]);
  const aShareOurs = ids.length ? ids.filter((id) => opts.key[id] === "ours").length / ids.length : 0;
  if (ids.length >= 3 && (aShareOurs < 0.2 || aShareOurs > 0.8)) {
    reasons.push(`A/B assignment is lopsided: ours is "A" in ${Math.round(aShareOurs * 100)}% of queries (expected ~50%).`);
  }

  return { ok: reasons.length === 0, reasons, fieldGap, aShareOurs: Math.round(aShareOurs * 100) / 100 };
}
