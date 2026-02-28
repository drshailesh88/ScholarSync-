"use client";

import { NodeViewWrapper } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";
import { useReferenceStore } from "@/stores/reference-store";

// Safe HTML tags allowed in bibliography rendering
const SAFE_TAGS = new Set(["i", "b", "em", "strong", "a", "span", "sup", "sub"]);

/**
 * Sanitize HTML to prevent XSS attacks.
 * Only allows safe formatting tags and strips all event handlers.
 */
function sanitizeHtml(html: string): string {
  // Remove all event handler attributes (onclick, onerror, onload, etc.)
  let sanitized = html.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "");

  // Process all HTML tags — keep only safe ones with safe attributes
  sanitized = sanitized.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g, (match, tag, attrs) => {
    const tagLower = tag.toLowerCase();
    const isClosing = match.startsWith("</");

    if (!SAFE_TAGS.has(tagLower)) {
      return ""; // Strip unsafe tags entirely
    }

    if (isClosing) {
      return `</${tagLower}>`;
    }

    // For <a> tags, only keep href with safe protocols
    if (tagLower === "a") {
      const hrefMatch = attrs.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
      if (hrefMatch) {
        const href = hrefMatch[1] ?? hrefMatch[2] ?? "";
        if (href.startsWith("http://") || href.startsWith("https://")) {
          return `<a href="${href}" rel="noopener noreferrer">`;
        }
      }
      return "<a>"; // Strip href if not safe
    }

    // For all other safe tags, strip all attributes
    return `<${tagLower}>`;
  });

  // Remove <script> and <style> content (in case they slipped through with weird casing)
  sanitized = sanitized.replace(/<script[\s\S]*?<\/script>/gi, "");
  sanitized = sanitized.replace(/<style[\s\S]*?<\/style>/gi, "");

  return sanitized;
}

/**
 * React NodeView for the auto-bibliography block.
 *
 * Renders a formatted, non-editable reference list that updates
 * reactively when bibliography entries change in the store.
 */
export function BibliographyView(_props: NodeViewProps) {
  const bibliographyEntries = useReferenceStore(
    (s) => s.bibliographyEntries
  );
  const referenceNumberMap = useReferenceStore((s) => s.referenceNumberMap);
  const _citationStyle = useReferenceStore((s) => s.citationStyle);
  const references = useReferenceStore((s) => s.references);

  // Only show bibliography if there are cited references
  const hasCitedRefs = referenceNumberMap.size > 0;

  if (!hasCitedRefs) {
    return (
      <NodeViewWrapper>
        <div
          className="my-8 py-6 text-center text-sm text-gray-400 dark:text-gray-600 italic border-t border-gray-200 dark:border-gray-700"
          contentEditable={false}
        >
          References will appear here when you add citations to your text.
        </div>
      </NodeViewWrapper>
    );
  }

  // Use pre-formatted bibliography entries if available
  if (bibliographyEntries.length > 0) {
    return (
      <NodeViewWrapper>
        <div
          className="my-8 pt-6 border-t-2 border-gray-300 dark:border-gray-600"
          contentEditable={false}
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">
            References
          </h2>
          <ol className="space-y-2 list-none pl-0">
            {bibliographyEntries.map((entry, _idx) => (
              <li
                key={entry.id}
                className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed pl-8 -indent-8 font-serif"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(entry.html || entry.text),
                }}
              />
            ))}
          </ol>
        </div>
      </NodeViewWrapper>
    );
  }

  // Fallback: render from reference store directly (Vancouver style)
  const sortedRefs = Array.from(referenceNumberMap.entries())
    .sort(([, a], [, b]) => a - b)
    .map(([refId, num]) => ({
      num,
      ref: references.get(refId),
    }))
    .filter((entry) => entry.ref);

  return (
    <NodeViewWrapper>
      <div
        className="my-8 pt-6 border-t-2 border-gray-300 dark:border-gray-600"
        contentEditable={false}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 font-serif">
          References
        </h2>
        <ol className="space-y-2 list-none pl-0">
          {sortedRefs.map(({ num, ref }) => (
            <li
              key={ref!.id}
              className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed pl-8 -indent-8 font-serif"
            >
              {num}. {formatReferenceVancouver(ref!)}
            </li>
          ))}
        </ol>
      </div>
    </NodeViewWrapper>
  );
}

/**
 * Simple Vancouver-style reference formatting fallback.
 */
function formatReferenceVancouver(ref: {
  authors: { given: string; family: string }[];
  title: string;
  journal?: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
}): string {
  const parts: string[] = [];

  // Authors
  if (ref.authors.length > 0) {
    const authorStr = ref.authors
      .slice(0, 6)
      .map((a) => {
        const initials = a.given
          ? a.given
              .split(/\s+/)
              .map((n) => n[0]?.toUpperCase())
              .join("")
          : "";
        return `${a.family} ${initials}`;
      })
      .join(", ");
    parts.push(
      ref.authors.length > 6 ? `${authorStr}, et al.` : `${authorStr}.`
    );
  }

  // Title
  if (ref.title) {
    parts.push(
      ref.title.endsWith(".") ? ref.title : `${ref.title}.`
    );
  }

  // Journal
  if (ref.journal) {
    let journalPart = ref.journal;
    if (ref.year) journalPart += `. ${ref.year}`;
    if (ref.volume) {
      journalPart += `;${ref.volume}`;
      if (ref.issue) journalPart += `(${ref.issue})`;
    }
    if (ref.pages) journalPart += `:${ref.pages}`;
    parts.push(`${journalPart}.`);
  } else if (ref.year) {
    parts.push(`${ref.year}.`);
  }

  // DOI
  if (ref.doi) {
    parts.push(`doi:${ref.doi}`);
  }

  return parts.join(" ");
}
