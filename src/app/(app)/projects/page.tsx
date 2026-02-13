"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  List,
  SquaresFour,
  PencilSimple,
  Trash,
  FileText,
  GraduationCap,
  BookOpen,
  Microscope,
  Newspaper,
  SpinnerGap,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { SearchInput } from "@/components/ui/search-input";
import { DataTable } from "@/components/ui/data-table";
import type { DataTableColumn } from "@/components/ui/data-table";
import { Modal } from "@/components/ui/modal";
import { formatRelativeTime } from "@/lib/mock-data";
import { getProjects, createProject, deleteProject } from "@/lib/actions/projects";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ProjectType =
  | "thesis"
  | "review_article"
  | "original_article"
  | "case_report"
  | "case_series"
  | "meta_analysis"
  | "systematic_review"
  | "literature_review"
  | "book_chapter"
  | "dissertation"
  | "letter"
  | "editorial"
  | "short_communication";

type ProjectStatus = "planning" | "drafting" | "reviewing" | "completed" | "archived";

interface Project {
  id: number;
  title: string;
  project_type: ProjectType | null;
  status: ProjectStatus | null;
  description: string | null;
  research_question: string | null;
  updated_at: Date | null;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Mappings
// ---------------------------------------------------------------------------

const typeIcon: Record<string, typeof FileText> = {
  thesis: BookOpen,
  dissertation: BookOpen,
  review_article: FileText,
  original_article: Newspaper,
  case_report: FileText,
  case_series: FileText,
  meta_analysis: Microscope,
  systematic_review: Microscope,
  literature_review: GraduationCap,
  book_chapter: BookOpen,
  letter: FileText,
  editorial: Newspaper,
  short_communication: FileText,
};

const typeLabel: Record<string, string> = {
  thesis: "Thesis",
  dissertation: "Dissertation",
  review_article: "Review Article",
  original_article: "Original Article",
  case_report: "Case Report",
  case_series: "Case Series",
  meta_analysis: "Meta-Analysis",
  systematic_review: "Systematic Review",
  literature_review: "Literature Review",
  book_chapter: "Book Chapter",
  letter: "Letter",
  editorial: "Editorial",
  short_communication: "Short Communication",
};

const statusMap: Record<
  ProjectStatus,
  { variant: "drafting" | "completed" | "issues" | "active" | "popular"; label: string }
> = {
  planning: { variant: "active", label: "Planning" },
  drafting: { variant: "drafting", label: "Drafting" },
  reviewing: { variant: "active", label: "Reviewing" },
  completed: { variant: "completed", label: "Completed" },
  archived: { variant: "completed", label: "Archived" },
};

// Tab filter: group project_types into broader categories for filtering
const typeTabGroups: Record<string, ProjectType[]> = {
  articles: ["original_article", "review_article", "case_report", "case_series", "letter", "editorial", "short_communication"],
  reviews: ["systematic_review", "meta_analysis", "literature_review"],
  thesis: ["thesis", "dissertation", "book_chapter"],
};

const tabs = [
  { key: "all", label: "All Projects" },
  { key: "articles", label: "Articles" },
  { key: "reviews", label: "Reviews & Meta" },
  { key: "thesis", label: "Thesis & Books" },
];

// Options offered in the create-project dropdown
const createTypeOptions: { value: ProjectType; label: string }[] = [
  { value: "original_article", label: "Original Article" },
  { value: "review_article", label: "Review Article" },
  { value: "systematic_review", label: "Systematic Review" },
  { value: "meta_analysis", label: "Meta-Analysis" },
  { value: "literature_review", label: "Literature Review" },
  { value: "case_report", label: "Case Report" },
  { value: "thesis", label: "Thesis" },
  { value: "dissertation", label: "Dissertation" },
  { value: "book_chapter", label: "Book Chapter" },
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<ProjectType>("review_article");
  const [creating, setCreating] = useState(false);

  // -----------------------------------------------------------------------
  // Fetch projects from the database via server action
  // -----------------------------------------------------------------------
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data as Project[]);
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // -----------------------------------------------------------------------
  // Filtered list
  // -----------------------------------------------------------------------
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesTab =
        activeTab === "all" ||
        (typeTabGroups[activeTab]?.includes(p.project_type as ProjectType) ?? false);
      const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [projects, activeTab, search]);

  // -----------------------------------------------------------------------
  // Handlers
  // -----------------------------------------------------------------------
  const handleDelete = async (id: number) => {
    // Optimistic removal
    setProjects((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteProject(id);
    } catch (err) {
      console.error("Failed to delete project:", err);
      // Re-fetch on error to restore truth
      fetchProjects();
    }
  };

  const handleCreate = async () => {
    if (!newName.trim() || creating) return;
    setCreating(true);
    try {
      const created = await createProject({
        title: newName.trim(),
        project_type: newType,
      });
      setShowNewModal(false);
      setNewName("");
      if (created) {
        router.push(`/studio/${created.id}`);
      }
    } catch (err) {
      console.error("Failed to create project:", err);
    } finally {
      setCreating(false);
    }
  };

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------
  const getIcon = (projectType: string | null) => {
    return typeIcon[projectType ?? ""] ?? FileText;
  };

  const getTypeLabel = (projectType: string | null) => {
    return typeLabel[projectType ?? ""] ?? "Project";
  };

  const getStatus = (status: string | null): { variant: "drafting" | "completed" | "issues" | "active" | "popular"; label: string } => {
    return statusMap[(status as ProjectStatus) ?? "planning"] ?? statusMap.planning;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "—";
    return formatRelativeTime(date instanceof Date ? date.toISOString() : String(date));
  };

  // -----------------------------------------------------------------------
  // Table columns
  // -----------------------------------------------------------------------
  const columns: DataTableColumn<Project>[] = [
    {
      key: "title",
      label: "Name",
      render: (p) => {
        const Icon = getIcon(p.project_type);
        return (
          <div className="flex items-center gap-3">
            <Icon size={18} className="text-ink-muted shrink-0" />
            <span className="truncate">{p.title}</span>
          </div>
        );
      },
    },
    {
      key: "project_type",
      label: "Type",
      render: (p) => <span className="text-ink-muted text-xs">{getTypeLabel(p.project_type)}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (p) => {
        const s = getStatus(p.status);
        return <Badge variant={s.variant}>{s.label}</Badge>;
      },
    },
    {
      key: "wordCount",
      label: "Words",
      render: () => <span className="text-ink-muted">&mdash;</span>,
    },
    {
      key: "updated_at",
      label: "Last Edited",
      render: (p) => <span className="text-ink-muted">{formatDate(p.updated_at)}</span>,
    },
    {
      key: "actions",
      label: "",
      render: (p) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/studio/${p.id}`);
            }}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised transition-colors"
          >
            <PencilSimple size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(p.id);
            }}
            className="p-1.5 rounded-lg text-ink-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ];

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <SpinnerGap size={32} className="animate-spin text-ink-muted" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-ink">My Projects</h1>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-raised text-ink-muted text-xs font-medium">
            {projects.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "list" ? "bg-surface-raised text-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 transition-colors",
                viewMode === "grid" ? "bg-surface-raised text-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              <SquaresFour size={18} />
            </button>
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors"
          >
            <Plus size={16} />
            New Project
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} className="mb-4" />

      {/* Search */}
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search projects..."
        className="mb-6 max-w-md"
      />

      {/* List View */}
      {viewMode === "list" && (
        <DataTable
          columns={columns}
          data={filtered}
          onRowClick={(item) => router.push(`/studio/${item.id}`)}
        />
      )}

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => {
            const s = getStatus(p.status);
            const Icon = getIcon(p.project_type);
            return (
              <div
                key={p.id}
                onClick={() => router.push(`/studio/${p.id}`)}
                className="glass-panel rounded-2xl overflow-hidden cursor-pointer hover:bg-surface-raised/30 transition-all group"
              >
                <div className="h-1.5 bg-brand" />
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon size={18} className="text-ink-muted" />
                      <Badge variant={s.variant}>{s.label}</Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/studio/${p.id}`);
                        }}
                        className="p-1 rounded text-ink-muted hover:text-ink"
                      >
                        <PencilSimple size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(p.id);
                        }}
                        className="p-1 rounded text-ink-muted hover:text-red-500"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-ink group-hover:text-brand transition-colors truncate mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {getTypeLabel(p.project_type)} · {formatDate(p.updated_at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Project Modal */}
      <Modal open={showNewModal} onClose={() => setShowNewModal(false)} title="New Project">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-ink-muted mb-1.5">Project Name</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. CRISPR Literature Review"
              className="w-full px-4 py-2.5 rounded-xl bg-surface-raised border border-border text-ink placeholder:text-ink-muted text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm text-ink-muted mb-1.5">Type</label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value as ProjectType)}
              className="w-full px-4 py-2.5 rounded-xl bg-surface-raised border border-border text-ink text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              {createTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="w-full py-2.5 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? "Creating..." : "Create Project"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
