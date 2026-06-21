/**
 * Manan OS v1 feature configuration.
 *
 * v1 is a focused, search-only literature product. The broader v2 surface
 * (editor, diagrams, posters, review generator, writing studio, NotebookLM /
 * source packs, collaboration, dashboards) still exists in the codebase but is
 * hidden from the user-facing UI behind this single switch.
 *
 * Nothing here deletes v2 — flipping NEXT_PUBLIC_ENABLE_V2_MODULES=true restores
 * the full navigation and unblocks every hidden route.
 */

/** The authenticated landing surface for v1: the literature search page. */
export const SEARCH_LANDING_PATH = "/research";

/**
 * Route prefixes that belong to hidden v2 capabilities. In v1 these are
 * redirected to the search landing instead of being rendered.
 */
const HIDDEN_PREFIXES = [
  "/dashboard",
  "/studio",
  "/latex",
  "/illustrate",
  "/poster",
  "/presentation",
  "/notebook",
  "/feeds",
  "/deep-research",
  "/library",
  "/systematic-review",
  "/compliance",
  "/analysis",
  "/editor",
  "/projects",
  "/slides",
] as const;

/**
 * Paths that share a prefix with a hidden route but are standalone public
 * viewers (e.g. an audience watching a presentation) and must stay reachable.
 */
const HIDDEN_EXCEPTIONS = ["/presentation/audience"] as const;

/**
 * Whether the app runs in search-only v1 mode. Defaults to true; set
 * NEXT_PUBLIC_ENABLE_V2_MODULES=true to bring the full v2 surface back.
 */
export function isV1SearchOnly(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_V2_MODULES !== "true";
}

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(prefix + "/");
}

/**
 * Whether a given path points at a hidden v2 capability under v1. Returns false
 * for every path when v2 modules are enabled.
 */
export function isHiddenInV1Path(pathname: string): boolean {
  if (!isV1SearchOnly()) return false;
  if (HIDDEN_EXCEPTIONS.some((p) => matchesPrefix(pathname, p))) return false;
  return HIDDEN_PREFIXES.some((p) => matchesPrefix(pathname, p));
}
