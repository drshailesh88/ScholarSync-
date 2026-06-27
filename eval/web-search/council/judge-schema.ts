import { DIMS, type WebDimScores } from "./rubric";

export interface PerQueryVerdict {
  id: string;
  A: WebDimScores;
  B: WebDimScores;
  winner: "A" | "B" | "tie";
  note?: string;
}
export interface Verdict {
  perQuery: PerQueryVerdict[];
  overall: { winner: string; summary: string };
}

/** Tolerant JSON extraction: bare JSON, or fenced/prefixed by taking the outermost {...}. */
export function extractJson(raw: string): unknown {
  const trimmed = raw.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("judge reply contains no JSON object");
    }
    try {
      return JSON.parse(trimmed.slice(start, end + 1));
    } catch {
      throw new Error("judge reply contains no valid JSON object (parse failed after brace extraction)");
    }
  }
}

function validateScores(s: unknown, where: string): WebDimScores {
  if (typeof s !== "object" || s === null) throw new Error(`${where}: scores must be an object`);
  const obj = s as Record<string, unknown>;
  const out = {} as WebDimScores;
  for (const d of DIMS) {
    const v = obj[d];
    if (typeof v !== "number") throw new Error(`${where}: missing dimension "${d}"`);
    if (v < 0 || v > 5) throw new Error(`${where}: dimension "${d}" out of range 0-5 (got ${v})`);
    out[d] = v;
  }
  return out;
}

export function parseVerdict(raw: string): Verdict {
  const parsed = extractJson(raw);
  if (typeof parsed !== "object" || parsed === null) {
    throw new Error(`verdict must be a JSON object, got ${parsed === null ? "null" : typeof parsed}`);
  }
  const data = parsed as Record<string, unknown>;
  if (!Array.isArray(data.perQuery)) throw new Error("verdict.perQuery must be an array");
  const perQuery: PerQueryVerdict[] = data.perQuery.map((q, i) => {
    const row = q as Record<string, unknown>;
    if (typeof row.id !== "string") throw new Error(`perQuery[${i}]: id must be a string`);
    if (row.winner !== "A" && row.winner !== "B" && row.winner !== "tie") {
      throw new Error(`perQuery[${i}] (${row.id}): winner must be "A"|"B"|"tie" (got ${String(row.winner)})`);
    }
    return {
      id: row.id,
      A: validateScores(row.A, `perQuery[${i}].A`),
      B: validateScores(row.B, `perQuery[${i}].B`),
      winner: row.winner,
      note: typeof row.note === "string" ? row.note : undefined,
    };
  });
  const overall = data.overall as Record<string, unknown> | undefined;
  return {
    perQuery,
    overall: {
      winner: typeof overall?.winner === "string" ? overall.winner : "tie",
      summary: typeof overall?.summary === "string" ? overall.summary : "",
    },
  };
}
