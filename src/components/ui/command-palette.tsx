"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import {
  House,
  PenNib,
  GlobeHemisphereWest,
  Notebook,
  Books,
  FolderOpen,
  ShieldCheck,
  ProjectorScreenChart,
  Gear,
  Moon,
  Sun,
  MagnifyingGlass,
  FileText,
  SpinnerGap,
  BookOpenText,
  Highlighter,
  FolderSimple,
  ArrowRight,
  Tray,
  Star,
  Eye,
  Archive,
} from "@phosphor-icons/react";
import { universalDocumentSearch } from "@/lib/actions/hashtags";
import type { DocumentSearchResult } from "@/lib/actions/hashtags";
import { searchLibrarySources, searchAnnotations } from "@/lib/library/search";
import { getLibraryProjects } from "@/lib/library/project-context";
import type { LibrarySearchResult, AnnotationSearchResult } from "@/lib/library/search";
import type { LibraryProject } from "@/lib/library/project-context";
import { useUIScale } from "@/hooks/use-ui-scale";
import { isHiddenInV1Path } from "@/lib/config/v1-features";

const navigationCommands = [
  { label: "Dashboard", href: "/dashboard", icon: House },
  { label: "Studio", href: "/studio", icon: PenNib },
  { label: "Literature Search", href: "/research", icon: GlobeHemisphereWest },
  { label: "Notebook", href: "/notebook", icon: Notebook },
  { label: "Library", href: "/library", icon: Books },
  { label: "Archive", href: "/projects", icon: FolderOpen },
  { label: "Compliance", href: "/compliance", icon: ShieldCheck },
  { label: "Presentation", href: "/presentation", icon: ProjectorScreenChart },
  { label: "Settings", href: "/settings", icon: Gear },
];

const libraryCommands = [
  { label: "Library Home", href: "/library", icon: House },
  { label: "Library Inbox", href: "/library/inbox", icon: Tray },
  { label: "Library Core", href: "/library/core", icon: Star },
  { label: "Library Background", href: "/library/background", icon: Eye },
  { label: "Library Archived", href: "/library/archived", icon: Archive },
  { label: "All Library Sources", href: "/library/all", icon: Books },
];

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

function formatDocumentType(type: string): string {
  return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { scale, cycleScale } = useUIScale();
  const [searchResults, setSearchResults] = useState<DocumentSearchResult[]>([]);
  const [libraryResults, setLibraryResults] = useState<LibrarySearchResult[]>([]);
  const [annotationResults, setAnnotationResults] = useState<AnnotationSearchResult[]>([]);
  const [projectResults, setProjectResults] = useState<LibraryProject[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const { theme, setTheme } = useTheme();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isInLibrary = pathname.startsWith("/library");

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }, []);

  // Listen for custom open event (from sidebar button)
  useEffect(() => {
    function handleCustomOpen() {
      setOpen(true);
    }
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener(
      "scholarsync:open-command-palette",
      handleCustomOpen
    );
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(
        "scholarsync:open-command-palette",
        handleCustomOpen
      );
    };
  }, [handleKeyDown]);

  // Reset state when palette closes
  useEffect(() => {
    if (!open) {
      setInputValue("");
      setSearchResults([]);
      setLibraryResults([]);
      setAnnotationResults([]);
      setProjectResults([]);
      setIsSearching(false);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    }
  }, [open]);

  // Debounced search across all sources
  useEffect(() => {
    if (!inputValue.trim()) {
      setSearchResults([]);
      setLibraryResults([]);
      setAnnotationResults([]);
      setProjectResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        // Use allSettled so one failing search doesn't kill the others
        const [docResult, libResult, annotResult, projResult] = await Promise.allSettled([
          universalDocumentSearch(inputValue),
          searchLibrarySources(inputValue, 6),
          searchAnnotations(inputValue, 4),
          getLibraryProjects().then((projects) =>
            projects.filter((p) =>
              p.title.toLowerCase().includes(inputValue.toLowerCase())
            )
          ),
        ]);
        setSearchResults(docResult.status === "fulfilled" ? docResult.value : []);
        setLibraryResults(libResult.status === "fulfilled" ? libResult.value : []);
        setAnnotationResults(annotResult.status === "fulfilled" ? annotResult.value : []);
        setProjectResults(
          (projResult.status === "fulfilled" ? projResult.value : []).slice(0, 5)
        );
      } catch (err) {
        console.error("Command palette search failed:", err);
        setSearchResults([]);
        setLibraryResults([]);
        setAnnotationResults([]);
        setProjectResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [inputValue]);

  const runCommand = useCallback((fn: () => void) => {
    setOpen(false);
    fn();
  }, []);

  if (!open) return null;

  const groupHeadingClass =
    "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-ink-muted";
  const itemClass =
    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink cursor-pointer data-[selected=true]:bg-surface-raised transition-colors";

  const hasQuery = inputValue.trim().length > 0;
  const hasLibraryResults = libraryResults.length > 0;
  const hasAnnotationResults = annotationResults.length > 0;
  const hasProjectResults = projectResults.length > 0;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg">
        <Command
          className="glass-panel rounded-2xl border border-border shadow-2xl overflow-hidden"
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
          }}
          shouldFilter={!hasQuery}
        >
          <div className="flex items-center gap-2 px-4 border-b border-border-subtle">
            <MagnifyingGlass size={18} className="text-ink-muted shrink-0" />
            <Command.Input
              placeholder={
                isInLibrary
                  ? "Search sources, highlights, projects..."
                  : "Type a command or search docs..."
              }
              className="w-full py-3 bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              autoFocus
              value={inputValue}
              onValueChange={setInputValue}
            />
            {isSearching && (
              <SpinnerGap
                size={16}
                className="text-ink-muted shrink-0 animate-spin"
              />
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-raised border border-border text-[10px] text-ink-muted font-mono">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-ink-muted">
              No results found.
            </Command.Empty>

            {/* ── Library Sources group (when searching) ─────────── */}
            {hasQuery && hasLibraryResults && (
              <Command.Group heading="Sources" className={groupHeadingClass}>
                {libraryResults.map((source) => (
                  <Command.Item
                    key={source.libraryId}
                    value={`source-${source.libraryId}-${source.title}`}
                    onSelect={() =>
                      runCommand(() =>
                        router.push(`/library/item/${source.libraryId}`)
                      )
                    }
                    className={itemClass}
                  >
                    <BookOpenText size={18} className="text-ink-muted shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium truncate block">
                        {source.title}
                      </span>
                      <p className="text-[11px] text-ink-muted truncate">
                        {source.sourceType === "paper" ? "Paper" : "Web"} &middot;{" "}
                        {source.snippet ?? source.workflowState}
                      </p>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* ── Highlights & Notes group (when searching) ──────── */}
            {hasQuery && hasAnnotationResults && (
              <Command.Group heading="Highlights & Notes" className={groupHeadingClass}>
                {annotationResults.map((ann) => (
                  <Command.Item
                    key={`ann-${ann.id}`}
                    value={`annotation-${ann.id}-${ann.text}`}
                    onSelect={() =>
                      runCommand(() =>
                        router.push(`/library/item/${ann.libraryId}`)
                      )
                    }
                    className={itemClass}
                  >
                    <Highlighter size={18} className="text-ink-muted shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm truncate block">
                        {ann.text.length > 60
                          ? ann.text.slice(0, 60) + "..."
                          : ann.text}
                      </span>
                      <p className="text-[11px] text-ink-muted truncate">
                        {ann.note ? `Note: ${ann.note.slice(0, 40)}... · ` : ""}
                        {ann.sourceTitle}
                      </p>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* ── Projects group (when searching) ────────────────── */}
            {hasQuery && hasProjectResults && (
              <Command.Group heading="Projects" className={groupHeadingClass}>
                {projectResults.map((project) => (
                  <Command.Item
                    key={`project-${project.id}`}
                    value={`project-${project.id}-${project.title}`}
                    onSelect={() =>
                      runCommand(() =>
                        router.push(`/library/project/${project.id}`)
                      )
                    }
                    className={itemClass}
                  >
                    <FolderSimple size={18} className="text-ink-muted shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium truncate block">
                        {project.title}
                      </span>
                      <p className="text-[11px] text-ink-muted">
                        {project.status}
                      </p>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* ── Documents group (when searching) ───────────────── */}
            {hasQuery && (
              <Command.Group heading="Documents" className={groupHeadingClass}>
                {isSearching && searchResults.length === 0 && !hasLibraryResults && (
                  <div className="px-3 py-4 text-center text-xs text-ink-muted">
                    Searching...
                  </div>
                )}
                {!isSearching &&
                  hasQuery &&
                  searchResults.length === 0 &&
                  !hasLibraryResults &&
                  !hasAnnotationResults &&
                  !hasProjectResults && (
                    <div className="px-3 py-4 text-center text-xs text-ink-muted">
                      No documents found
                    </div>
                  )}
                {searchResults.map((doc) => (
                  <Command.Item
                    key={doc.documentId}
                    value={`doc-${doc.documentId}-${doc.title}`}
                    onSelect={() =>
                      runCommand(() =>
                        router.push(`/studio?projectId=${doc.projectId}`)
                      )
                    }
                    className={itemClass}
                  >
                    <FileText size={18} className="text-ink-muted shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">
                          {doc.title}
                        </span>
                        {doc.matchingTags.length > 0 && (
                          <div className="flex gap-1 shrink-0">
                            {doc.matchingTags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-brand/10 text-brand"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-ink-muted truncate">
                        {formatDocumentType(doc.documentType)} &middot;{" "}
                        {formatRelativeTime(new Date(doc.updatedAt))}
                      </p>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* ── Search in Explore fallback ─────────────────────── */}
            {hasQuery && (
              <Command.Group heading="Search" className={groupHeadingClass}>
                <Command.Item
                  value={`explore-search-${inputValue}`}
                  onSelect={() =>
                    runCommand(() =>
                      router.push(`/explore?q=${encodeURIComponent(inputValue)}`)
                    )
                  }
                  className={itemClass}
                >
                  <ArrowRight size={18} className="text-ink-muted shrink-0" />
                  <span className="text-sm">
                    Search &ldquo;{inputValue}&rdquo; in Explore
                  </span>
                </Command.Item>
              </Command.Group>
            )}

            {/* ── Library navigation (when in Library, no search) ── */}
            {!hasQuery && isInLibrary && (
              <Command.Group heading="Library" className={groupHeadingClass}>
                {libraryCommands.map((cmd) => {
                  const Icon = cmd.icon;
                  return (
                    <Command.Item
                      key={cmd.href}
                      value={cmd.label}
                      onSelect={() => runCommand(() => router.push(cmd.href))}
                      className={itemClass}
                    >
                      <Icon size={18} className="text-ink-muted" />
                      {cmd.label}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            )}

            <Command.Group heading="Navigation" className={groupHeadingClass}>
              {navigationCommands
                .filter((cmd) => !isHiddenInV1Path(cmd.href))
                .map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <Command.Item
                    key={cmd.href}
                    value={cmd.label}
                    onSelect={() => runCommand(() => router.push(cmd.href))}
                    className={itemClass}
                  >
                    <Icon size={18} className="text-ink-muted" />
                    {cmd.label}
                  </Command.Item>
                );
              })}
            </Command.Group>

            <Command.Group
              heading="Actions"
              className={`mt-2 ${groupHeadingClass}`}
            >
              <Command.Item
                value="Toggle Theme"
                onSelect={() =>
                  runCommand(() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  )
                }
                className={itemClass}
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-ink-muted" />
                ) : (
                  <Moon size={18} className="text-ink-muted" />
                )}
                Toggle Theme
              </Command.Item>
              <Command.Item
                value="UI Scale Zoom"
                onSelect={() => runCommand(() => cycleScale())}
                className={itemClass}
              >
                <MagnifyingGlass size={18} className="text-ink-muted" />
                UI Scale ({scale === "default" ? "100%" : scale === "large" ? "110%" : "120%"})
              </Command.Item>
              <Command.Item
                value="New Project"
                onSelect={() => runCommand(() => router.push("/projects"))}
                className={itemClass}
              >
                <PenNib size={18} className="text-ink-muted" />
                New Project
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
