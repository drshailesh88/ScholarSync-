"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CaretDown, Check, FolderSimple, Books } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { setLastActiveProjectId } from "@/lib/library/project-context";
import type { LibraryProject } from "@/lib/library/project-context";

interface ProjectSwitcherProps {
  projects: LibraryProject[];
  activeProjectId: number | null;
}

export function ProjectSwitcher({ projects, activeProjectId }: ProjectSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const activeProject = activeProjectId
    ? projects.find((p) => p.id === activeProjectId)
    : null;

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open]);

  async function handleSelect(projectId: number | null) {
    setOpen(false);
    await setLastActiveProjectId(projectId);

    if (projectId === null) {
      // "All Library" — navigate to /library or current state view
      const stateMatch = pathname.match(/^\/library\/project\/\d+\/(\w+)/);
      if (stateMatch) {
        router.push(`/library/${stateMatch[1]}`);
      } else {
        router.push("/library");
      }
    } else {
      // Navigate to project-scoped library
      const stateMatch = pathname.match(/^\/library(?:\/project\/\d+)?\/(\w+)/);
      const currentState = stateMatch?.[1];
      if (currentState && ["inbox", "core", "background", "archived"].includes(currentState)) {
        router.push(`/library/project/${projectId}/${currentState}`);
      } else {
        router.push(`/library/project/${projectId}`);
      }
    }

    router.refresh();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => projects.length > 0 ? setOpen((prev) => !prev) : undefined}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors",
          "border border-[var(--border-subtle)]",
          projects.length > 0 && "hover:bg-[var(--surface-raised)] cursor-pointer",
          projects.length === 0 && "cursor-default",
          activeProject
            ? "text-ink font-medium"
            : "text-ink-muted"
        )}
      >
        {activeProject ? (
          <>
            <FolderSimple size={16} weight="fill" className="text-[var(--library-accent)]" />
            <span className="max-w-[180px] truncate">{activeProject.title}</span>
          </>
        ) : (
          <>
            <Books size={16} className="text-ink-muted" />
            <span>All Library</span>
          </>
        )}
        {projects.length > 0 && (
          <CaretDown
            size={14}
            className={cn(
              "text-ink-muted transition-transform",
              open && "rotate-180"
            )}
          />
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] shadow-lg z-50 overflow-hidden">
          {/* All Library option — always visible */}
          <button
            onClick={() => handleSelect(null)}
            className={cn(
              "flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-left transition-colors hover:bg-[var(--surface-raised)]",
              !activeProjectId && "bg-[var(--library-accent-tint)] font-medium"
            )}
          >
            <Books size={16} className="text-ink-muted shrink-0" />
            <span className="flex-1">All Library</span>
            {!activeProjectId && <Check size={14} className="text-[var(--library-accent)]" />}
          </button>

          <div className="border-t border-[var(--border-subtle)]" />

          {/* Project list */}
          <div className="max-h-56 overflow-y-auto py-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => handleSelect(project.id)}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3 py-2 text-sm text-left transition-colors hover:bg-[var(--surface-raised)]",
                  activeProjectId === project.id && "bg-[var(--library-accent-tint)] font-medium"
                )}
              >
                <FolderSimple size={16} className="text-ink-muted shrink-0" />
                <span className="flex-1 truncate">{project.title}</span>
                {activeProjectId === project.id && (
                  <Check size={14} className="text-[var(--library-accent)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
