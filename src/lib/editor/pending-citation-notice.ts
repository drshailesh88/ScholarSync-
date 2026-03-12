const PENDING_CITATION_KEY = "scholarsync_pending_citation";

let strictModePendingNoticeCache: string | null = null;
let strictModeCacheClearTimer: ReturnType<typeof setTimeout> | null = null;

function formatPendingCitationNotice(rawValue: string): string {
  try {
    const parsed = JSON.parse(rawValue) as { title?: string };
    const title = parsed.title?.trim();
    return title
      ? `Saved "${title}" to your library. Open Citation Dialog to cite it.`
      : "Paper saved to your library. Open Citation Dialog to cite it.";
  } catch {
    return "Paper saved to your library. Open Citation Dialog to cite it.";
  }
}

export function consumePendingCitationNotice(
  storage: Pick<Storage, "getItem" | "removeItem"> = sessionStorage
): string | null {
  if (strictModePendingNoticeCache) {
    const cachedNotice = strictModePendingNoticeCache;
    strictModePendingNoticeCache = null;
    if (strictModeCacheClearTimer) {
      clearTimeout(strictModeCacheClearTimer);
      strictModeCacheClearTimer = null;
    }
    return cachedNotice;
  }

  const pending = storage.getItem(PENDING_CITATION_KEY);
  if (!pending) return null;

  storage.removeItem(PENDING_CITATION_KEY);

  const notice = formatPendingCitationNotice(pending);
  strictModePendingNoticeCache = notice;
  strictModeCacheClearTimer = setTimeout(() => {
    strictModePendingNoticeCache = null;
    strictModeCacheClearTimer = null;
  }, 0);

  return notice;
}

export function resetPendingCitationNoticeCache() {
  strictModePendingNoticeCache = null;
  if (strictModeCacheClearTimer) {
    clearTimeout(strictModeCacheClearTimer);
    strictModeCacheClearTimer = null;
  }
}
