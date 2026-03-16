"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { List, X, BookOpen } from "lucide-react";
import { ParsedCitationText } from "./CitationReference";
import { CitationsPanel } from "./CitationsPanel";
import type { DeepResearchSource } from "./types";
import type { Components } from "react-markdown";

/**
 * Recursively walk React children and replace text nodes containing
 * citation markers (e.g. [5], [5,12]) with interactive ParsedCitationText.
 * This handles the case where ReactMarkdown passes mixed element arrays
 * (e.g. ["text ", <strong>bold [5]</strong>, " more"]) instead of a flat string.
 */
function parseCitationsInChildren(
  children: React.ReactNode,
  sources: DeepResearchSource[],
  onScrollToRef?: (index: number) => void,
  keyPrefix = "c",
): React.ReactNode {
  // Quick check: does this tree even contain a citation marker?
  const hasMarker = /\[\d/.test(reactNodeToText(children));
  if (!hasMarker) return children;

  return React.Children.map(children, (child, idx) => {
    // String node → parse citations directly
    if (typeof child === "string") {
      if (/\[\d/.test(child)) {
        return (
          <ParsedCitationText
            key={`${keyPrefix}-${idx}`}
            text={child}
            sources={sources}
            onScrollToRef={onScrollToRef}
          />
        );
      }
      return child;
    }

    // React element → clone and recursively process its children
    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<{ children?: React.ReactNode }>;
      if (element.props.children != null) {
        return React.cloneElement(element, {
          ...element.props,
          children: parseCitationsInChildren(
            element.props.children,
            sources,
            onScrollToRef,
            `${keyPrefix}-${idx}`,
          ),
        } as React.Attributes & { children: React.ReactNode });
      }
      return child;
    }

    return child;
  });
}

/** Extract raw text from a React node tree (for quick regex testing). */
function reactNodeToText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(reactNodeToText).join("");
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return reactNodeToText(el.props.children);
  }
  return "";
}

// ── Table of Contents ───────────────────────────────────────────────
interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function extractTOC(markdown: string): TOCItem[] {
  const items: TOCItem[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("## ") || trimmed.startsWith("### ")) {
      const level = trimmed.startsWith("### ") ? 3 : 2;
      const text = trimmed.replace(/^#{2,3}\s+/, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      items.push({ id, text, level });
    }
  }
  return items;
}

interface TableOfContentsProps {
  items: TOCItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

function TableOfContents({ items, activeId, onNavigate, isOpen, onClose }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden lg:block w-56 shrink-0 print:hidden">
        <div className="sticky top-24">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 px-2">
            Contents
          </h4>
          <ul className="space-y-0.5">
            {/* empty state: no data, no results, nothing here */}
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`block w-full text-left text-xs py-1.5 rounded-md transition-colors truncate ${
                    item.level === 3 ? "pl-6 pr-2" : "pl-2 pr-2"
                  } ${
                    activeId === item.id
                      ? "text-blue-400 bg-blue-500/10 font-medium"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden print:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <nav className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Contents</h4>
              <button onClick={onClose} className="p-1 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                <X size={16} />
              </button>
            </div>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      onClose();
                    }}
                    className={`block w-full text-left text-sm py-2 rounded-md transition-colors ${
                      item.level === 3 ? "pl-6 pr-2" : "pl-2 pr-2"
                    } ${
                      activeId === item.id
                        ? "text-blue-400 bg-blue-500/10 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

// ── Main Document Renderer ──────────────────────────────────────────
interface ResearchDocumentProps {
  markdownReport: string;
  sources: DeepResearchSource[];
  className?: string;
}

export function ResearchDocument({
  markdownReport,
  sources,
  className = "",
}: ResearchDocumentProps) {
  const [activeHeading, setActiveHeading] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [citationsPanelOpen, setCitationsPanelOpen] = useState(true);
  const [highlightedCitation, setHighlightedCitation] = useState<number | null>(null);
  const documentRef = useRef<HTMLDivElement>(null);

  const tocItems = useMemo(() => extractTOC(markdownReport), [markdownReport]);

  // Track active heading via intersection observer
  useEffect(() => {
    if (!documentRef.current || tocItems.length === 0) return;

    const headingElements = tocItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tocItems, markdownReport]);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveHeading(id);
    }
  }, []);

  // When a [N] citation marker is clicked in the report text → highlight in panel
  const scrollToReference = useCallback((citationNumber: number) => {
    setHighlightedCitation(citationNumber);
    if (!citationsPanelOpen) setCitationsPanelOpen(true);
    // Also scroll to the reference in the references list
    const refEl = document.getElementById(`ref-${citationNumber}`);
    if (refEl) {
      refEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [citationsPanelOpen]);

  // When a panel entry is clicked → scroll report to that reference
  const handlePanelCitationClick = useCallback((citationNumber: number) => {
    setHighlightedCitation(citationNumber);
    const refEl = document.getElementById(`ref-${citationNumber}`);
    if (refEl) {
      refEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  // Custom renderers for react-markdown with citations
  const markdownComponents: Components = useMemo(
    () => ({
      h2: ({ children, ...props }) => {
        const text = String(children);
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
        return (
          <h2
            id={id}
            className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700/50 scroll-mt-24"
            {...props}
          >
            {children}
          </h2>
        );
      },
      h3: ({ children, ...props }) => {
        const text = String(children);
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
        return (
          <h3
            id={id}
            className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-8 mb-3 scroll-mt-24"
            {...props}
          >
            {children}
          </h3>
        );
      },
      h1: ({ children, ...props }) => (
        <h1
          className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-6 pb-3 border-b border-gray-300 dark:border-gray-600/50"
          {...props}
        >
          {children}
        </h1>
      ),
      h4: ({ children, ...props }) => (
        <h4
          className="text-base font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-2 italic"
          {...props}
        >
          {children}
        </h4>
      ),
      h5: ({ children, ...props }) => (
        <h5
          className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-4 mb-2"
          {...props}
        >
          {children}
        </h5>
      ),
      p: ({ children }) => (
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-[15px]">
          {parseCitationsInChildren(children, sources, scrollToReference, "p")}
        </p>
      ),
      table: ({ children }) => (
        <div className="overflow-x-auto my-6 rounded-lg border border-gray-200 dark:border-gray-700/50">
          <table className="w-full text-sm">{children}</table>
        </div>
      ),
      thead: ({ children }) => (
        <thead className="bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 text-left">{children}</thead>
      ),
      tbody: ({ children }) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700/30">{children}</tbody>,
      tr: ({ children }) => (
        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors even:bg-gray-100/50 dark:even:bg-gray-800/15">
          {children}
        </tr>
      ),
      th: ({ children }) => (
        <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700/50">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-sm">
          {parseCitationsInChildren(children, sources, scrollToReference, "td")}
        </td>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500/50 pl-4 my-4 text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-800/20 py-2 rounded-r-lg">
          {children}
        </blockquote>
      ),
      ul: ({ children }) => (
        <ul className="list-disc list-outside ml-6 mb-4 space-y-1.5 text-gray-600 dark:text-gray-300 text-[15px]">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="list-decimal list-outside ml-6 mb-4 space-y-1.5 text-gray-600 dark:text-gray-300 text-[15px]">
          {children}
        </ol>
      ),
      li: ({ children }) => (
        <li className="leading-relaxed pl-1">
          {parseCitationsInChildren(children, sources, scrollToReference, "li")}
        </li>
      ),
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
      ),
      em: ({ children }) => <em className="italic text-gray-700 dark:text-gray-200">{children}</em>,
      a: ({ href, children }) => (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
        >
          {children}
        </a>
      ),
      code: ({ className: codeClassName, children, ...props }) => {
        const isInline = !codeClassName;
        if (isInline) {
          return (
            <code className="bg-gray-100 dark:bg-gray-800 text-emerald-400 text-sm px-1.5 py-0.5 rounded font-mono">
              {children}
            </code>
          );
        }
        return (
          <code
            className={`block bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700/50 rounded-lg p-4 overflow-x-auto text-sm font-mono text-gray-600 dark:text-gray-300 my-4 ${codeClassName || ""}`}
            {...props}
          >
            {children}
          </code>
        );
      },
      pre: ({ children }) => <pre className="my-4">{children}</pre>,
      hr: () => <hr className="my-8 border-gray-200 dark:border-gray-700/50" />,
    }),
    [sources, scrollToReference]
  );

  return (
    <div className={`flex gap-6 ${className}`}>
      {/* Mobile floating buttons */}
      <div className="fixed bottom-6 right-6 z-30 lg:hidden print:hidden flex flex-col gap-3">
        {sources.length > 0 && (
          <button
            onClick={() => setCitationsPanelOpen(true)}
            className="w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Citations"
          >
            <BookOpen size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        )}
        <button
          onClick={() => setTocOpen(true)}
          className="w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title="Table of Contents"
        >
          <List size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Table of contents */}
      <TableOfContents
        items={tocItems}
        activeId={activeHeading}
        onNavigate={handleNavigate}
        isOpen={tocOpen}
        onClose={() => setTocOpen(false)}
      />

      {/* Main document body */}
      <div
        ref={documentRef}
        className="flex-1 min-w-0 max-w-4xl mx-auto research-document"
      >
        <article className="prose-custom">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {markdownReport}
          </ReactMarkdown>
        </article>

        {/* References section */}
        {sources.length > 0 && (
          <section id="references" className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/50 scroll-mt-24">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">References</h2>
            <ol className="space-y-4 list-none p-0">
              {sources.slice(0, 50).map((source, idx) => {
                const authorsText =
                  source.authors.length > 3
                    ? `${source.authors.slice(0, 3).join(", ")} et al.`
                    : source.authors.join(", ");

                return (
                  <li
                    key={source.id || idx}
                    id={`ref-${idx + 1}`}
                    className={`flex gap-3 text-sm group rounded-lg px-2 py-1 -mx-2 transition-colors duration-700 ${
                      highlightedCitation === idx + 1
                        ? "bg-blue-500/10"
                        : ""
                    }`}
                  >
                    <span className="flex-shrink-0 text-gray-500 font-mono text-xs mt-0.5 w-8 text-right">
                      [{idx + 1}]
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 dark:text-gray-200 font-medium leading-snug">
                        {source.title}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                        {authorsText}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {source.journal}
                        {source.year && ` (${source.year})`}
                        {source.citationCount > 0 && (
                          <span className="ml-2">
                            {source.citationCount.toLocaleString()} citations
                          </span>
                        )}
                        {source.isOpenAccess && (
                          <span className="ml-2 text-emerald-500 font-medium">OA</span>
                        )}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {source.doi && (
                          <a
                            href={`https://doi.org/${source.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-xs underline"
                          >
                            DOI
                          </a>
                        )}
                        {source.pmid && (
                          <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${source.pmid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 text-xs underline"
                          >
                            PubMed
                          </a>
                        )}
                        {(source.openAccessPdfUrl || source.fullTextUrl) && (
                          <a
                            href={source.openAccessPdfUrl || source.fullTextUrl || undefined}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-emerald-300 text-xs underline"
                          >
                            PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        )}
      </div>

      {/* Citations panel (right sidebar) */}
      {sources.length > 0 && (
        <>
          {/* Desktop toggle when panel is closed */}
          {!citationsPanelOpen && (
            <div className="hidden lg:block shrink-0 print:hidden">
              <div className="sticky top-24">
                <button
                  onClick={() => setCitationsPanelOpen(true)}
                  className="p-2 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                  title="Open Citations Panel"
                >
                  <BookOpen size={18} />
                </button>
              </div>
            </div>
          )}
          <CitationsPanel
            sources={sources}
            isOpen={citationsPanelOpen}
            onClose={() => setCitationsPanelOpen(false)}
            highlightedCitation={highlightedCitation}
            onClickCitation={handlePanelCitationClick}
          />
        </>
      )}

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .research-document {
            max-width: 100% !important;
          }
          .research-document h1,
          .research-document h2,
          .research-document h3 {
            color: black !important;
            border-color: #ccc !important;
          }
          .research-document p,
          .research-document li,
          .research-document td {
            color: #333 !important;
          }
          .research-document a {
            color: #1a56db !important;
          }
          .research-document table {
            border-color: #ccc !important;
          }
          .research-document thead {
            background: #f3f4f6 !important;
          }
          .research-document th,
          .research-document td {
            border-color: #ccc !important;
            color: #333 !important;
          }
          .research-document tr:nth-child(even) {
            background: #f9fafb !important;
          }
          .research-document blockquote {
            border-color: #666 !important;
            color: #555 !important;
            background: transparent !important;
          }
          .research-document code {
            background: #f3f4f6 !important;
            color: #333 !important;
          }
        }
      `}</style>
    </div>
  );
}
