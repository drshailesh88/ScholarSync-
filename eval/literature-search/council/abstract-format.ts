/**
 * Pure helpers for rendering result abstracts inside the BLINDED council packet.
 *
 * Blinding rule: an abstract is a property of the PAPER, not of the engine that
 * returned it. Both engines' abstracts are therefore sourced from ONE neutral
 * provider (Europe PMC — see `build-abstract-cache.ts`) and passed through the
 * SAME normalization here, so a judge cannot infer engine identity from abstract
 * length, structured-heading style, or whitespace. Where no abstract is available
 * the caller renders an identical placeholder for either engine.
 */

/** Max characters of abstract text shown per result in the packet. Long enough to
 * judge clinical relevance/trust, short enough that structured vs plain abstracts
 * converge in appearance and the packet stays readable. */
export const ABSTRACT_MAX_CHARS = 500;

/** Structured-abstract section headings some sources prepend (e.g. "Background:",
 * "Methods:"). Stripped so a source that keeps headings can't be told apart from
 * one that doesn't. */
const SECTION_HEADING =
  /^(background|introduction|objectives?|aims?|methods?|materials and methods|results?|conclusions?|findings|interpretation|importance|design|setting|participants|purpose|summary)\s*[:.—-]\s*/i;

/** Decode the handful of HTML entities Europe PMC abstracts actually contain. */
function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

/**
 * Normalize an abstract to a single blinding-safe line: strip HTML markup (Europe
 * PMC wraps structured-abstract headings in `<h4>` tags), collapse all whitespace,
 * strip a leading structured-section heading, and truncate to {@link ABSTRACT_MAX_CHARS}
 * on a word boundary with an ellipsis. Returns "" for empty/whitespace input.
 */
export function normalizeAbstract(
  raw: string | undefined | null,
  maxChars = ABSTRACT_MAX_CHARS
): string {
  if (!raw) return "";
  // Turn heading/paragraph tags into separators so words don't run together, then
  // drop every remaining tag. Uniform for both engines (single abstract provider).
  let text = decodeEntities(
    String(raw)
      .replace(/<\/(h[1-6]|p|div|sec|title)>/gi, ": ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s*:\s*:\s*/g, ": ")
    .replace(/\s+/g, " ")
    .trim();
  if (text === "") return "";
  text = text.replace(SECTION_HEADING, "").trim();
  if (text.length <= maxChars) return text;
  const clipped = text.slice(0, maxChars);
  const lastSpace = clipped.lastIndexOf(" ");
  const body = lastSpace > maxChars * 0.6 ? clipped.slice(0, lastSpace) : clipped;
  return `${body.trim()}…`;
}

/** The single, engine-independent line shown when a paper has no abstract available. */
export const ABSTRACT_UNAVAILABLE = "_(abstract unavailable)_";
