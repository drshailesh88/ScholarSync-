"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { migrateLocalDocuments } from "@/lib/editor/migrate-local-documents";
import {
  collectLocalDocuments,
  hasCompletedLocalDocumentMigration,
  markLocalDocumentMigrationComplete,
} from "./dashboard-client-helpers";
import type {
  DashboardProject,
  DashboardStats,
  RecentSearch,
  RecentActivity,
} from "@/lib/actions/dashboard";

// ── Helpers ──────────────────────────────────────────────────────

function formatRelativeTime(date: Date | string | null): string {
  if (!date) return "Never";
  const now = new Date();
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
}

function formatProjectType(projectType: string | null): string {
  if (!projectType) return "Project";
  return projectType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ── Color Dot Mapping ────────────────────────────────────────────

function getProjectDotColor(projectType: string | null): string {
  if (!projectType) return "#2C3E6B";
  const t = projectType.toLowerCase();
  if (t === "systematic_review" || t === "review") return "#4D7C0F";
  if (t === "research_paper" || t === "deep_research" || t === "research") return "#6D28D9";
  if (t === "presentation") return "#0E7490";
  if (t === "illustration") return "#7E22CE";
  if (t === "latex") return "#475569";
  return "#2C3E6B";
}

// Map project_type to a filter category for type filters
function getTypeCategory(projectType: string | null): string | null {
  if (!projectType) return "draft";
  const t = projectType.toLowerCase();
  if (t === "systematic_review" || t === "review") return "review";
  if (t === "research_paper" || t === "deep_research" || t === "research") return "research";
  if (t === "presentation") return "presentation";
  return "draft";
}

// ── New Dropdown Options ─────────────────────────────────────────

const newDropdownOptions = [
  { label: "New Draft", color: "#2C3E6B", href: "/studio" },
  { label: "New LaTeX Project", color: "#475569", href: "/studio?mode=latex" },
  { label: "New Deep Research", color: "#6D28D9", href: "/research" },
  { label: "New Systematic Review", color: "#4D7C0F", href: "/studio?mode=review" },
  { label: "New Presentation", color: "#0E7490", href: "/studio?mode=presentation" },
  { label: "New Illustration", color: "#7E22CE", href: "/studio?mode=illustration" },
];

// ── Component Props ─────────────────────────────────────────────

interface DashboardClientProps {
  recentProjects: DashboardProject[];
  stats: DashboardStats;
  recentSearches: RecentSearch[];
  recentActivity: RecentActivity[];
}

// ── Main Client Component ───────────────────────────────────────

export default function DashboardClient({
  recentProjects,
  stats: _stats,
  recentSearches: _recentSearches,
  recentActivity: _recentActivity,
}: DashboardClientProps) {
  const [activeStatus, setActiveStatus] = useState<"all" | "active" | "completed">("all");
  const [activeType, setActiveType] = useState<string | null>(null);
  const [layout, setLayout] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [newDropdownOpen, setNewDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setNewDropdownOpen(false);
      }
    }
    if (newDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [newDropdownOpen]);

  // Local document migration
  useEffect(() => {
    const storage = window.localStorage;
    if (hasCompletedLocalDocumentMigration(storage)) {
      return;
    }

    const localDocs = collectLocalDocuments(storage);
    if (localDocs.length === 0) {
      return;
    }

    const migratableDocs = localDocs.filter((doc) => doc.documentId !== "new");
    let cancelled = false;

    migrateLocalDocuments(localDocs)
      .then((migratedCount) => {
        if (cancelled) {
          return;
        }

        if (
          migratableDocs.length === 0 ||
          migratedCount >= migratableDocs.length
        ) {
          markLocalDocumentMigrationComplete(storage);
        }
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return recentProjects.filter((p) => {
      // Status filter
      if (activeStatus === "active" && p.status === "completed") return false;
      if (activeStatus === "completed" && p.status !== "completed") return false;

      // Type filter
      if (activeType) {
        const category = getTypeCategory(p.project_type);
        if (category !== activeType) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!p.title.toLowerCase().includes(q)) return false;
      }

      return true;
    });
  }, [recentProjects, activeStatus, activeType, searchQuery]);

  const statusFilters = [
    { key: "all" as const, label: "All" },
    { key: "active" as const, label: "Active" },
    { key: "completed" as const, label: "Completed" },
  ];

  const typeFilters = [
    { key: "draft", label: "Draft" },
    { key: "research", label: "Research" },
    { key: "review", label: "Review" },
    { key: "presentation", label: "Presentation" },
  ];

  // Grid view: fake preview lines per project (deterministic based on index)
  const previewLineWidths = [
    [100, 95, 88, 100, 72, 100, 90, 60],
    [100, 80, 100, 65, 100, 92, 45],
    [100, 90, 75, 100, 85, 100, 55],
    [85, 100, 70, 100, 90, 40],
    [100, 88, 100, 78, 95, 50],
    [100, 92, 68, 100, 80],
    [100, 85, 100, 95, 72, 100, 48],
    [60, 100, 45, 80],
    [100, 90, 100, 82, 100, 65],
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ padding: "32px 48px" }}>
      {/* Top bar */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* New button + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setNewDropdownOpen(!newDropdownOpen)}
            className="flex items-center gap-1.5 border border-black/10 rounded-md px-5 py-2 text-sm font-medium bg-white hover:bg-black/[0.02] transition-colors"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 16 16">
              <path d="M8 2v12M2 8h12" />
            </svg>
            New
          </button>

          {newDropdownOpen && (
            <div className="absolute top-full left-0 mt-1.5 bg-white border border-black/10 rounded-md shadow-lg py-1.5 z-50 min-w-[200px]">
              {newDropdownOptions.map((opt) => (
                <Link
                  key={opt.label}
                  href={opt.href}
                  onClick={() => setNewDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-[#1a1a1a] hover:bg-black/[0.04] transition-colors"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: opt.color }}
                  />
                  {opt.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-[#F7F5F3] border border-black/[0.06] rounded-md px-3 py-2 flex-1 max-w-[360px]">
          <svg width="14" height="14" fill="none" stroke="#999" strokeWidth="1.5" viewBox="0 0 16 16">
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3 3" />
          </svg>
          <input
            type="text"
            placeholder="Search all projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm flex-1 text-[#1a1a1a] placeholder:text-[#999]"
          />
        </div>

        {/* Filters + Layout toggle */}
        <div className="flex items-center gap-1 ml-auto flex-wrap">
          {/* Status filters */}
          {statusFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveStatus(f.key)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                activeStatus === f.key
                  ? "bg-[#F7F5F3] border-black/[0.06] text-[#1a1a1a] font-medium"
                  : "border-transparent text-[#999] hover:text-[#666]"
              }`}
            >
              {f.label}
            </button>
          ))}

          {/* Separator */}
          <div className="w-px h-[18px] bg-black/[0.06] mx-2.5" />

          {/* Type filters */}
          {typeFilters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveType(activeType === f.key ? null : f.key)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                activeType === f.key
                  ? "bg-[rgba(109,40,217,0.08)] text-[#6D28D9] border-[rgba(109,40,217,0.2)] font-medium"
                  : "border-transparent text-[#999] hover:text-[#666]"
              }`}
            >
              {f.label}
            </button>
          ))}

          {/* Separator */}
          <div className="w-px h-[18px] bg-black/[0.06] mx-2.5" />

          {/* Layout toggle */}
          <div className="flex items-center border border-black/[0.06] rounded-md overflow-hidden">
            <button
              onClick={() => setLayout("list")}
              className={`p-1.5 transition-colors ${
                layout === "list" ? "bg-[#F7F5F3] text-[#1a1a1a]" : "text-[#999] hover:text-[#666]"
              }`}
              title="List view"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16">
                <path d="M2 4h12M2 8h12M2 12h12" />
              </svg>
            </button>
            <button
              onClick={() => setLayout("grid")}
              className={`p-1.5 transition-colors ${
                layout === "grid" ? "bg-[#F7F5F3] text-[#1a1a1a]" : "text-[#999] hover:text-[#666]"
              }`}
              title="Grid view"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 16 16">
                <rect x="1.5" y="1.5" width="5" height="5" rx="1" />
                <rect x="9.5" y="1.5" width="5" height="5" rx="1" />
                <rect x="1.5" y="9.5" width="5" height="5" rx="1" />
                <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Section label */}
      <div
        className="mt-6 mb-2 font-semibold uppercase"
        style={{ fontSize: "11px", color: "#999", letterSpacing: "0.06em" }}
      >
        Recent
      </div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <div className="py-12 text-center text-sm" style={{ color: "#999" }}>
          {recentProjects.length === 0
            ? "No projects yet. Click \"New\" to create your first project."
            : "No projects match the current filters."}
        </div>
      )}

      {/* List view */}
      {layout === "list" && filteredProjects.length > 0 && (
        <div>
          {filteredProjects.map((project, idx) => (
            <Link
              key={project.id}
              href={`/studio?projectId=${project.id}`}
              className="flex items-center px-4 py-3 border-b border-black/[0.06] hover:bg-black/[0.03] transition-colors group"
              style={idx === 0 ? { borderTop: "1px solid rgba(0,0,0,0.06)" } : undefined}
            >
              {/* Color dot */}
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 mr-3"
                style={{ background: getProjectDotColor(project.project_type) }}
              />

              {/* Body */}
              <div className="flex-1 min-w-0">
                <div
                  className="truncate font-medium"
                  style={{ fontSize: "14px", color: "#1a1a1a" }}
                >
                  {project.title}
                </div>
                <div
                  className="mt-0.5 truncate"
                  style={{ fontSize: "12px", color: "#999" }}
                >
                  {formatProjectType(project.project_type)}
                  {project.status ? ` \u00b7 ${project.status.charAt(0).toUpperCase() + project.status.slice(1)}` : ""}
                </div>
              </div>

              {/* Timestamp */}
              <div
                className="flex-shrink-0 ml-4 font-mono"
                style={{ fontSize: "11px", color: "#999" }}
              >
                {formatRelativeTime(project.updated_at)}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Grid view */}
      {layout === "grid" && filteredProjects.length > 0 && (
        <div
          className="mt-1"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          {filteredProjects.map((project, idx) => {
            const lines = previewLineWidths[idx % previewLineWidths.length];
            return (
              <Link
                key={project.id}
                href={`/studio?projectId=${project.id}`}
                className="border border-black/[0.06] rounded-md overflow-hidden hover:border-black/10 hover:shadow transition-all group"
                style={{ transform: "translateY(0)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Preview area */}
                <div className="p-4 bg-[#F7F5F3]" style={{ height: "140px" }}>
                  <div
                    className="font-medium mb-2 line-clamp-2"
                    style={{ fontSize: "10px", color: "#666", lineHeight: "1.4" }}
                  >
                    {project.title}
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    {lines.map((w, i) => (
                      <div
                        key={i}
                        className="rounded-full bg-black/[0.08]"
                        style={{ height: "3px", width: `${w}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Info area */}
                <div style={{ padding: "10px 14px" }}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: getProjectDotColor(project.project_type) }}
                    />
                    <div
                      className="truncate font-medium"
                      style={{ fontSize: "13px", color: "#1a1a1a" }}
                    >
                      {project.title}
                    </div>
                  </div>
                  <div
                    className="mt-1 truncate"
                    style={{ fontSize: "11px", color: "#999" }}
                  >
                    {formatProjectType(project.project_type)} &middot; {formatRelativeTime(project.updated_at)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
