import type { PDFHighlight, HighlightColor, TargetSection } from "./types";

/**
 * Client-side highlight storage helpers.
 * These wrap the API calls for CRUD operations on highlights.
 */

/** Fetch all highlights for a paper in a project */
export async function fetchHighlights(
  paperId: string,
  projectId: string
): Promise<PDFHighlight[]> {
  const res = await fetch(
    `/api/research/highlights?paperId=${paperId}&projectId=${projectId}`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.highlights || [];
}

/** Create a new highlight */
export async function createHighlight(
  highlight: PDFHighlight
): Promise<boolean> {
  try {
    const res = await fetch("/api/research/highlights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(highlight),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Update a highlight's metadata */
export async function updateHighlight(
  id: string,
  updates: {
    note?: string;
    color?: HighlightColor;
    targetSection?: TargetSection;
  }
): Promise<boolean> {
  try {
    const res = await fetch("/api/research/highlights", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/** Delete a highlight */
export async function deleteHighlight(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/research/highlights?id=${id}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch {
    return false;
  }
}
