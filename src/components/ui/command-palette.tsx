"use client";

import { useEffect, useState, useCallback } from "react";
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
} from "@phosphor-icons/react";

const navigationCommands = [
  { label: "Dashboard", href: "/dashboard", icon: House },
  { label: "Studio", href: "/studio", icon: PenNib },
  { label: "Deep Research", href: "/research", icon: GlobeHemisphereWest },
  { label: "Notebook", href: "/notebook", icon: Notebook },
  { label: "Library", href: "/library", icon: Books },
  { label: "Archive", href: "/projects", icon: FolderOpen },
  { label: "Compliance", href: "/compliance", icon: ShieldCheck },
  { label: "Presentation", href: "/presentation", icon: ProjectorScreenChart },
  { label: "Settings", href: "/settings", icon: Gear },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const runCommand = useCallback(
    (fn: () => void) => {
      setOpen(false);
      fn();
    },
    []
  );

  if (!open) return null;

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
        >
          <div className="flex items-center gap-2 px-4 border-b border-border-subtle">
            <MagnifyingGlass size={18} className="text-ink-muted shrink-0" />
            <Command.Input
              placeholder="Type a command or search..."
              className="w-full py-3 bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-raised border border-border text-[10px] text-ink-muted font-mono">
              ESC
            </kbd>
          </div>

          <Command.List className="max-h-72 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-ink-muted">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-ink-muted">
              {navigationCommands.map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <Command.Item
                    key={cmd.href}
                    value={cmd.label}
                    onSelect={() => runCommand(() => router.push(cmd.href))}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink cursor-pointer data-[selected=true]:bg-surface-raised transition-colors"
                  >
                    <Icon size={18} className="text-ink-muted" />
                    {cmd.label}
                  </Command.Item>
                );
              })}
            </Command.Group>

            <Command.Group heading="Actions" className="mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-ink-muted">
              <Command.Item
                value="Toggle Theme"
                onSelect={() =>
                  runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))
                }
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink cursor-pointer data-[selected=true]:bg-surface-raised transition-colors"
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
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-ink cursor-pointer data-[selected=true]:bg-surface-raised transition-colors"
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
