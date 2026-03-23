"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { migrateLocalDocuments } from "@/lib/editor/migrate-local-documents";
import {
  collectLocalDocuments,
  hasCompletedLocalDocumentMigration,
  markLocalDocumentMigrationComplete,
} from "./dashboard-client-helpers";
import {
  Plus,
  MagnifyingGlass,
  List,
  SquaresFour,
  Tag,
  CaretDown,
  PenNib,
  Code,
  FlowArrow,
  Presentation,
  PaintBrush,
  Brain,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type {
  DashboardProject,
  DashboardStats,
  RecentSearch,
  RecentActivity,
} from "@/lib/actions/dashboard";

// ═══ TYPE COLORS ═══
const typeColors: Record<string, string> = {
  draft: "#6D28D9",        // Purple - Draft
  research: "#0891B2",     // Cyan - Research
  review: "#4D7C0F",       // Green - Systematic Review
  presentation: "#0E7490", // Teal - Presentation
  latex: "#475569",        // Slate - LaTeX
  canvas: "#7E22CE",       // Violet - Canvas
  deep_research: "#6D28D9", // Purple - Deep Research
  systematic_review: "#4D7C0F",
  default: "#78716C",      // Gray - Default
};

// ═══ STATUS FILTERS ═══
const statusFilters = ["All", "Active", "Completed"];

// ═══ TYPE FILTERS ═══
const typeFilters = ["Draft", "Research", "Review", "Presentation"];

// ═══ HELPERS ═══
function formatRelativeTime(date: Date | string | null): string {
  if (!date) return "";
  const now = new Date();
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
}

function getTypeColor(projectType: string | null): string {
  if (!projectType) return typeColors.default;
  const normalized = projectType.toLowerCase().replace(/\s+/g, "_");
  return typeColors[normalized] || typeColors.default;
}

function formatMeta(project: DashboardProject): string {
  const parts: string[] = [];
  
  // Add project type if available
  if (project.project_type) {
    const typeLabel = project.project_type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    parts.push(typeLabel);
  }
  
  // Add status
  if (project.status) {
    const statusLabel = project.status.charAt(0).toUpperCase() + project.status.slice(1);
    parts.push(statusLabel);
  }
  
  return parts.join(" · ") || "Project";
}

// ═══ COMPONENT PROPS ═══
interface DashboardClientProps {
  recentProjects: DashboardProject[];
  stats: DashboardStats;
  recentSearches: RecentSearch[];
  recentActivity: RecentActivity[];
}

// ═══ NEW DROPDOWN ITEMS ═══
const newDropdownItems = [
  { label: "Draft", href: "/studio", icon: PenNib, color: "#6D28D9" },
  { label: "LaTeX Document", href: "/latex", icon: Code, color: "#475569" },
  { label: "Systematic Review", href: "/systematic-review", icon: FlowArrow, color: "#4D7C0F" },
  { label: "Presentation", href: "/presentation", icon: Presentation, color: "#0E7490" },
  { label: "Canvas", href: "/illustrate", icon: PaintBrush, color: "#7E22CE" },
  { label: "Deep Research", href: "/deep-research", icon: Brain, color: "#6D28D9" },
];

// ═══ MAIN COMPONENT ═══
export default function DashboardClient({
  recentProjects,
  stats: _stats,
  recentSearches: _recentSearches,
  recentActivity: _recentActivity,
}: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");
  const [activeTypeFilter, setActiveTypeFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [newDropdownOpen, setNewDropdownOpen] = useState(false);
  const [importantFilter, setImportantFilter] = useState(false);
  const [notesFilter, setNotesFilter] = useState(false);

  // Local document migration (preserves existing wiring)
  useEffect(() => {
    const storage = window.localStorage;
    if (hasCompletedLocalDocumentMigration(storage)) return;
    const localDocs = collectLocalDocuments(storage);
    if (localDocs.length === 0) return;
    const migratableDocs = localDocs.filter((doc) => doc.documentId !== "new");
    let cancelled = false;
    migrateLocalDocuments(localDocs)
      .then((migratedCount) => {
        if (cancelled) return;
        if (migratableDocs.length === 0 || migratedCount >= migratableDocs.length) {
          markLocalDocumentMigrationComplete(storage);
        }
      })
      .catch(console.error);
    return () => { cancelled = true; };
  }, []);

  // Filter projects
  const filteredProjects = recentProjects.filter((project) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!project.title.toLowerCase().includes(query)) return false;
    }
    
    // Status filter
    if (activeStatusFilter !== "All") {
      const status = project.status?.toLowerCase();
      if (activeStatusFilter === "Active" && status === "completed") return false;
      if (activeStatusFilter === "Completed" && status !== "completed") return false;
    }
    
    // Type filter
    if (activeTypeFilter) {
      const type = project.project_type?.toLowerCase();
      if (!type?.includes(activeTypeFilter.toLowerCase())) return false;
    }
    
    return true;
  });

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="max-w-6xl mx-auto px-8 py-8 lg:px-12">
        
        {/* ═══ TOP BAR ═══ */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          
          {/* New Button */}
          <div className="relative">
            <button
              onClick={() => setNewDropdownOpen(!newDropdownOpen)}
              className="flex items-center gap-1.5 px-5 py-2 bg-white text-[#1C1917]
                         text-[13px] font-medium border border-black/10 rounded-md
                         hover:border-[#78716C] transition-colors"
            >
              <Plus size={16} weight="bold" />
              New
              <CaretDown size={12} className="ml-1 text-[#A8A29E]" />
            </button>
            
            {/* Dropdown */}
            {newDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setNewDropdownOpen(false)} 
                />
                <div className="absolute left-0 top-full mt-1 w-[220px] bg-white border border-black/10 
                                rounded-md shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-1 z-50">
                  {newDropdownItems.map((item) => {
                    const _Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setNewDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded text-[13px] font-medium
                                   text-[#1C1917] hover:bg-[#F7F5F3] transition-colors"
                      >
                        <div 
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 px-3.5 py-[7px] bg-[#F7F5F3] 
                          border border-black/[0.06] rounded-md flex-1 max-w-[360px]
                          focus-within:border-[#6D28D9] transition-colors">
            <MagnifyingGlass size={16} className="text-[#A8A29E] flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all projects..."
              className="flex-1 bg-transparent text-[13px] text-[#1C1917] outline-none
                         placeholder:text-[#A8A29E]"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-0.5 ml-auto">
            {/* Status Filters */}
            {statusFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveStatusFilter(filter)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  activeStatusFilter === filter
                    ? "bg-[#F7F5F3] text-[#1C1917] border border-black/[0.06]"
                    : "text-[#A8A29E] hover:text-[#78716C]"
                )}
              >
                {filter}
              </button>
            ))}
            
            {/* Divider */}
            <div className="w-px h-[18px] bg-black/[0.06] mx-2.5" />
            
            {/* Type Filters */}
            {typeFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveTypeFilter(activeTypeFilter === filter ? null : filter)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                  activeTypeFilter === filter
                    ? "bg-purple-50 text-[#6D28D9] border border-purple-200"
                    : "text-[#A8A29E] hover:text-[#78716C]"
                )}
              >
                {filter}
              </button>
            ))}
            
            {/* Divider */}
            <div className="w-px h-[18px] bg-black/[0.06] mx-2.5" />
            
            {/* Mark Filters */}
            <button
              onClick={() => setImportantFilter(!importantFilter)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all",
                importantFilter
                  ? "bg-[#F7F5F3] border border-black/[0.06]"
                  : "text-[#A8A29E] hover:text-[#78716C]"
              )}
            >
              <Tag size={12} weight="fill" className="text-amber-500" />
              Important
            </button>
            <button
              onClick={() => setNotesFilter(!notesFilter)}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all",
                notesFilter
                  ? "bg-[#F7F5F3] border border-black/[0.06]"
                  : "text-[#A8A29E] hover:text-[#78716C]"
              )}
            >
              <Tag size={12} weight="fill" className="text-blue-500" />
              Notes
            </button>
            
            {/* Divider */}
            <div className="w-px h-[18px] bg-black/[0.06] mx-2.5" />
            
            {/* View Toggle */}
            <div className="flex items-center gap-px bg-[#F7F5F3] rounded-md p-0.5 border border-black/[0.06]">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "w-7 h-[26px] flex items-center justify-center rounded",
                  viewMode === "list" 
                    ? "bg-white text-[#1C1917] shadow-[0_1px_3px_rgba(0,0,0,0.08)]" 
                    : "text-[#A8A29E] hover:text-[#78716C]"
                )}
              >
                <List size={14} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "w-7 h-[26px] flex items-center justify-center rounded",
                  viewMode === "grid" 
                    ? "bg-white text-[#1C1917] shadow-[0_1px_3px_rgba(0,0,0,0.08)]" 
                    : "text-[#A8A29E] hover:text-[#78716C]"
                )}
              >
                <SquaresFour size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* ═══ SECTION LABEL ═══ */}
        <div className="text-[11px] font-semibold text-[#A8A29E] uppercase tracking-wider mb-2">
          Recent
        </div>

        {/* ═══ PROJECT LIST ═══ */}
        {viewMode === "list" ? (
          <div className="flex flex-col">
            {filteredProjects.length === 0 ? (
              <div className="py-12 text-center text-[#A8A29E] text-sm">
                No projects found. Create your first project to get started.
              </div>
            ) : (
              filteredProjects.map((project, idx) => (
                <Link
                  key={project.id}
                  href={`/studio?projectId=${project.id}`}
                  className={cn(
                    "flex items-center gap-3.5 px-4 py-3 cursor-pointer",
                    "border-b border-black/[0.06]",
                    idx === 0 && "border-t",
                    "hover:bg-black/[0.02] transition-colors duration-75"
                  )}
                >
                  {/* Type dot */}
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getTypeColor(project.project_type) }}
                  />
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-medium text-[#1C1917] truncate">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#A8A29E] mt-0.5 truncate">
                      {formatMeta(project)}
                    </p>
                  </div>
                  
                  {/* Mark indicators (if any) */}
                  {/* These would be populated from project data */}
                  
                  {/* Timestamp */}
                  <span className="font-mono text-[11px] text-[#A8A29E] flex-shrink-0">
                    {formatRelativeTime(project.updated_at)}
                  </span>
                </Link>
              ))
            )}
          </div>
        ) : (
          /* ═══ GRID VIEW ═══ */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/studio?projectId=${project.id}`}
                className="bg-white border border-black/[0.06] rounded-md overflow-hidden
                           hover:border-black/10 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]
                           hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                {/* Preview area */}
                <div className="h-[140px] p-4 bg-[#F7F5F3] border-b border-black/[0.06] relative">
                  <div className="font-serif text-[10px] font-semibold text-[#1C1917] leading-tight mb-1.5 line-clamp-2">
                    {project.title}
                  </div>
                  <div className="space-y-1">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i} 
                        className="h-[3px] rounded-full bg-[#A8A29E]/25"
                        style={{ width: `${80 - i * 15}%` }}
                      />
                    ))}
                  </div>
                  {/* Fade overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#F7F5F3] to-transparent" />
                </div>
                
                {/* Info */}
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getTypeColor(project.project_type) }}
                    />
                    <span className="text-[13px] font-medium text-[#1C1917] truncate flex-1">
                      {project.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A8A29E] mt-1 truncate">
                    {formatRelativeTime(project.updated_at)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
