"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
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
} from "@phosphor-icons/react";
import { universalDocumentSearch } from "@/lib/actions/hashtags";
import type { DocumentSearchResult } from "@/lib/actions/hashtags";

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
  const [searchResults, setSearchResults] = useState<DocumentSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      setIsSearching(false);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    }
  }, [open]);

  // Debounced document search
  useEffect(() => {
    if (!inputValue.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await universalDocumentSearch(inputValue);
        setSearchResults(results);
      } catch (err) {
        console.error("Document search failed:", err);
        setSearchResults([]);
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
          shouldFilter={!inputValue.trim()}
        >
          <div className="flex items-center gap-2 px-4 border-b border-border-subtle">
            <MagnifyingGlass size={18} className="text-ink-muted shrink-0" />
            <Command.Input
              placeholder="Type a command or search docs..."
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

            {/* Documents group — shown when user is searching */}
            {inputValue.trim() && (
              <Command.Group heading="Documents" className={groupHeadingClass}>
                {isSearching && searchResults.length === 0 && (
                  <div className="px-3 py-4 text-center text-xs text-ink-muted">
                    Searching...
                  </div>
                )}
                {!isSearching &&
                  inputValue.trim() &&
                  searchResults.length === 0 && (
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

            <Command.Group heading="Navigation" className={groupHeadingClass}>
              {navigationCommands.map((cmd) => {
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
