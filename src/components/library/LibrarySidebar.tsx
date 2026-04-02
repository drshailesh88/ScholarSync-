"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tray,
  Star,
  Eye,
  Archive,
  ListBullets,
  FolderSimple,
  Trash,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { WorkflowState } from "@/lib/library";

export interface LibraryCounts {
  inbox: number;
  core: number;
  background: number;
  archived: number;
  all: number;
  trash: number;
}

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  count?: number;
  matchExact?: boolean;
}

export function LibrarySidebar({
  counts,
  activeProjectId,
}: {
  counts: LibraryCounts;
  activeProjectId?: number | null;
}) {
  const pathname = usePathname();

  // When a project is active, scope workflow state links to the project
  const prefix = activeProjectId
    ? `/library/project/${activeProjectId}`
    : "/library";

  const workflowItems: SidebarItem[] = [
    { label: "Inbox", href: `${prefix}/inbox`, icon: <Tray size={18} />, count: counts.inbox },
    { label: "Core", href: `${prefix}/core`, icon: <Star size={18} />, count: counts.core },
    { label: "Background", href: `${prefix}/background`, icon: <Eye size={18} />, count: counts.background },
    { label: "Archived", href: `${prefix}/archived`, icon: <Archive size={18} />, count: counts.archived },
  ];

  const otherItems: SidebarItem[] = [
    { label: "All Sources", href: "/library/all", icon: <ListBullets size={18} />, count: counts.all },
    { label: "Projects", href: "/library/projects", icon: <FolderSimple size={18} /> },
    { label: "Trash", href: "/library/trash", icon: <Trash size={18} />, count: counts.trash },
  ];

  const isActive = (item: SidebarItem) => {
    if (item.matchExact) return pathname === item.href;
    // Match both project-scoped and non-project-scoped paths
    if (pathname === item.href) return true;
    if (pathname.startsWith(item.href + "/")) return true;
    // Also match if the state part matches across project/non-project
    const stateMatch = item.href.match(/\/(inbox|core|background|archived)$/);
    if (stateMatch) {
      const state = stateMatch[1];
      return pathname.endsWith(`/${state}`);
    }
    return false;
  };

  const homeHref = activeProjectId
    ? `/library/project/${activeProjectId}`
    : "/library";
  const homeActive = pathname === "/library" || pathname === homeHref;

  return (
    <aside className="w-56 shrink-0 flex flex-col h-full border-r border-[var(--border-subtle)] py-4">
      {/* Home link */}
      <div className="px-3 mb-2">
        <Link
          href={homeHref}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
            homeActive
              ? "bg-[var(--library-accent-tint)] text-ink font-medium border-l-[3px] border-l-[var(--library-accent)] -ml-[3px]"
              : "text-ink-muted hover:text-ink hover:bg-[var(--surface-raised)]"
          )}
        >
          Home
        </Link>
      </div>

      {/* Workflow states */}
      <div className="px-3 mt-2">
        <p className="px-3 mb-1.5 text-[11px] font-medium text-ink-muted uppercase tracking-widest">
          Workflow
        </p>
        <nav className="space-y-0.5">
          {workflowItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                isActive(item)
                  ? "bg-[var(--library-accent-tint)] text-ink font-medium border-l-[3px] border-l-[var(--library-accent)] -ml-[3px]"
                  : "text-ink-muted hover:text-ink hover:bg-[var(--surface-raised)]"
              )}
            >
              <span className="flex items-center gap-2.5">
                {item.icon}
                {item.label}
              </span>
              {item.count != null && (
                <span className="text-xs text-ink-muted tabular-nums">{item.count}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="mx-6 my-3 border-t border-[var(--border-subtle)]" />

      {/* Other */}
      <div className="px-3">
        <nav className="space-y-0.5">
          {otherItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                isActive(item)
                  ? "bg-[var(--library-accent-tint)] text-ink font-medium border-l-[3px] border-l-[var(--library-accent)] -ml-[3px]"
                  : "text-ink-muted hover:text-ink hover:bg-[var(--surface-raised)]"
              )}
            >
              <span className="flex items-center gap-2.5">
                {item.icon}
                {item.label}
              </span>
              {item.count != null && (
                <span className="text-xs text-ink-muted tabular-nums">{item.count}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
