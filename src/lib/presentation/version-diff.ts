import type { VersionSnapshot } from "@/lib/actions/versions";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FieldChange {
  field: string;
  oldValue: unknown;
  newValue: unknown;
}

export interface ContentBlockChange {
  blockIndex: number;
  status: "added" | "removed" | "modified" | "unchanged";
  fieldChanges?: FieldChange[];
}

export interface SlideDiff {
  slideId: number | null; // null for added/removed slides without matching ID
  slideIndex: number; // position in the version
  status: "added" | "removed" | "modified" | "unchanged";
  titleChanged: boolean;
  subtitleChanged: boolean;
  layoutChanged: boolean;
  speakerNotesChanged: boolean;
  oldTitle?: string | null;
  newTitle?: string | null;
  contentBlockChanges: ContentBlockChange[];
}

export interface DeckDiff {
  deckMetadataChanged: boolean;
  deckFieldChanges: FieldChange[];
  slideDiffs: SlideDiff[];
  stats: {
    added: number;
    removed: number;
    modified: number;
    unchanged: number;
  };
}

// ---------------------------------------------------------------------------
// Deep equality check (recursive JSON comparison)
// ---------------------------------------------------------------------------

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (a === undefined || b === undefined) return a === b;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (typeof a === "object") {
    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj).sort();
    const bKeys = Object.keys(bObj).sort();
    if (aKeys.length !== bKeys.length) return false;
    for (let i = 0; i < aKeys.length; i++) {
      if (aKeys[i] !== bKeys[i]) return false;
      if (!deepEqual(aObj[aKeys[i]], bObj[bKeys[i]])) return false;
    }
    return true;
  }

  return false;
}

// ---------------------------------------------------------------------------
// Compare content blocks between two slides
// ---------------------------------------------------------------------------

function compareContentBlocks(
  oldBlocks: unknown,
  newBlocks: unknown
): ContentBlockChange[] {
  const oldArr = (Array.isArray(oldBlocks) ? oldBlocks : []) as Record<string, unknown>[];
  const newArr = (Array.isArray(newBlocks) ? newBlocks : []) as Record<string, unknown>[];

  const changes: ContentBlockChange[] = [];
  const maxLen = Math.max(oldArr.length, newArr.length);

  for (let i = 0; i < maxLen; i++) {
    const oldBlock = i < oldArr.length ? oldArr[i] : undefined;
    const newBlock = i < newArr.length ? newArr[i] : undefined;

    if (!oldBlock && newBlock) {
      changes.push({ blockIndex: i, status: "added" });
    } else if (oldBlock && !newBlock) {
      changes.push({ blockIndex: i, status: "removed" });
    } else if (oldBlock && newBlock) {
      if (deepEqual(oldBlock, newBlock)) {
        changes.push({ blockIndex: i, status: "unchanged" });
      } else {
        const fieldChanges: FieldChange[] = [];
        const allKeys = new Set([
          ...Object.keys(oldBlock),
          ...Object.keys(newBlock),
        ]);
        for (const key of allKeys) {
          if (!deepEqual(oldBlock[key], newBlock[key])) {
            fieldChanges.push({
              field: key,
              oldValue: oldBlock[key],
              newValue: newBlock[key],
            });
          }
        }
        changes.push({ blockIndex: i, status: "modified", fieldChanges });
      }
    }
  }

  return changes;
}

// ---------------------------------------------------------------------------
// computeDeckDiff — compare two version snapshots
// ---------------------------------------------------------------------------

export function computeDeckDiff(
  versionA: VersionSnapshot,
  versionB: VersionSnapshot
): DeckDiff {
  // Compare deck-level metadata
  const deckFieldChanges: FieldChange[] = [];
  const deckFields = ["title", "theme", "audienceType", "templateId", "citationStyle"] as const;
  for (const field of deckFields) {
    const aVal = versionA.deck[field];
    const bVal = versionB.deck[field];
    if (!deepEqual(aVal, bVal)) {
      deckFieldChanges.push({ field, oldValue: aVal, newValue: bVal });
    }
  }
  // Compare complex deck fields
  if (!deepEqual(versionA.deck.themeConfig, versionB.deck.themeConfig)) {
    deckFieldChanges.push({
      field: "themeConfig",
      oldValue: versionA.deck.themeConfig,
      newValue: versionB.deck.themeConfig,
    });
  }
  if (!deepEqual(versionA.deck.institutionKit, versionB.deck.institutionKit)) {
    deckFieldChanges.push({
      field: "institutionKit",
      oldValue: versionA.deck.institutionKit,
      newValue: versionB.deck.institutionKit,
    });
  }

  // Build slide maps keyed by slide ID for matching
  const aSlidesById = new Map(
    versionA.slides.map((s) => [s.id, s])
  );
  const bSlidesById = new Map(
    versionB.slides.map((s) => [s.id, s])
  );

  const slideDiffs: SlideDiff[] = [];
  const processedBIds = new Set<number>();

  // Process slides in version A
  for (let i = 0; i < versionA.slides.length; i++) {
    const aSlide = versionA.slides[i];
    const bSlide = bSlidesById.get(aSlide.id);

    if (!bSlide) {
      // Slide was removed in version B
      slideDiffs.push({
        slideId: aSlide.id,
        slideIndex: i,
        status: "removed",
        titleChanged: false,
        subtitleChanged: false,
        layoutChanged: false,
        speakerNotesChanged: false,
        oldTitle: aSlide.title,
        contentBlockChanges: [],
      });
    } else {
      processedBIds.add(aSlide.id);

      const titleChanged = aSlide.title !== bSlide.title;
      const subtitleChanged = aSlide.subtitle !== bSlide.subtitle;
      const layoutChanged = aSlide.layout !== bSlide.layout;
      const speakerNotesChanged = aSlide.speakerNotes !== bSlide.speakerNotes;
      const contentBlockChanges = compareContentBlocks(
        aSlide.contentBlocks,
        bSlide.contentBlocks
      );

      const hasContentChanges = contentBlockChanges.some(
        (c) => c.status !== "unchanged"
      );
      const isModified =
        titleChanged ||
        subtitleChanged ||
        layoutChanged ||
        speakerNotesChanged ||
        hasContentChanges;

      slideDiffs.push({
        slideId: aSlide.id,
        slideIndex: i,
        status: isModified ? "modified" : "unchanged",
        titleChanged,
        subtitleChanged,
        layoutChanged,
        speakerNotesChanged,
        oldTitle: aSlide.title,
        newTitle: bSlide.title,
        contentBlockChanges,
      });
    }
  }

  // Process slides only in version B (added)
  for (let i = 0; i < versionB.slides.length; i++) {
    const bSlide = versionB.slides[i];
    if (!processedBIds.has(bSlide.id)) {
      slideDiffs.push({
        slideId: bSlide.id,
        slideIndex: i,
        status: "added",
        titleChanged: false,
        subtitleChanged: false,
        layoutChanged: false,
        speakerNotesChanged: false,
        newTitle: bSlide.title,
        contentBlockChanges: [],
      });
    }
  }

  // Sort: removed first, then modified, then unchanged, then added
  const statusOrder = { removed: 0, modified: 1, unchanged: 2, added: 3 };
  slideDiffs.sort((a, b) => {
    const orderDiff = statusOrder[a.status] - statusOrder[b.status];
    if (orderDiff !== 0) return orderDiff;
    return a.slideIndex - b.slideIndex;
  });

  const stats = {
    added: slideDiffs.filter((d) => d.status === "added").length,
    removed: slideDiffs.filter((d) => d.status === "removed").length,
    modified: slideDiffs.filter((d) => d.status === "modified").length,
    unchanged: slideDiffs.filter((d) => d.status === "unchanged").length,
  };

  return {
    deckMetadataChanged: deckFieldChanges.length > 0,
    deckFieldChanges,
    slideDiffs,
    stats,
  };
}

// ---------------------------------------------------------------------------
// extractTextFromBlocks — helper to get plain text from content blocks
// ---------------------------------------------------------------------------

export function extractTextFromBlocks(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block: Record<string, unknown>) => {
      const data = block.data as Record<string, unknown> | undefined;
      if (!data) return "";
      if (typeof data.text === "string") return data.text;
      if (Array.isArray(data.items)) {
        return (data.items as string[]).join("\n");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

// ---------------------------------------------------------------------------
// computeTextDiff — simple word-level diff for inline display
// ---------------------------------------------------------------------------

export interface TextDiffSegment {
  type: "same" | "added" | "removed";
  text: string;
}

export function computeTextDiff(
  oldText: string,
  newText: string
): TextDiffSegment[] {
  const oldWords = oldText.split(/(\s+)/);
  const newWords = newText.split(/(\s+)/);

  // Simple LCS-based diff
  const m = oldWords.length;
  const n = newWords.length;

  // For performance, if texts are identical, short-circuit
  if (oldText === newText) {
    return [{ type: "same", text: oldText }];
  }

  // Build LCS table
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldWords[i - 1] === newWords[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build diff segments
  const segments: TextDiffSegment[] = [];
  let i = m;
  let j = n;
  const rawSegments: TextDiffSegment[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldWords[i - 1] === newWords[j - 1]) {
      rawSegments.unshift({ type: "same", text: oldWords[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      rawSegments.unshift({ type: "added", text: newWords[j - 1] });
      j--;
    } else {
      rawSegments.unshift({ type: "removed", text: oldWords[i - 1] });
      i--;
    }
  }

  // Merge consecutive segments of the same type
  for (const seg of rawSegments) {
    if (segments.length > 0 && segments[segments.length - 1].type === seg.type) {
      segments[segments.length - 1].text += seg.text;
    } else {
      segments.push({ ...seg });
    }
  }

  return segments;
}
