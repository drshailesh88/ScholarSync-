"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  FlowArrow,
  CircleNotch,
  MagnifyingGlass,
  ArrowRight,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { SRProject } from "@/stores/systematic-review-store";

// ---------------------------------------------------------------------------
// Stage labels for display
// ---------------------------------------------------------------------------

const STAGE_LABELS: Record<string, string> = {
  search_strategy: "Search Strategy",
  screening: "Screening",
  full_text_screening: "Full-Text Screening",
  data_extraction: "Data Extraction",
  risk_of_bias: "Risk of Bias",
  meta_analysis: "Meta-Analysis",
  reporting: "Reporting",
};

const STAGE_COLORS: Record<string, string> = {
  search_strategy: "bg-blue-500/10 text-blue-600",
  screening: "bg-amber-500/10 text-amber-600",
  full_text_screening: "bg-orange-500/10 text-orange-600",
  data_extraction: "bg-purple-500/10 text-purple-600",
  risk_of_bias: "bg-rose-500/10 text-rose-600",
  meta_analysis: "bg-emerald-500/10 text-emerald-600",
  reporting: "bg-sky-500/10 text-sky-600",
};

// ---------------------------------------------------------------------------
// Main Page — Project Hub
// ---------------------------------------------------------------------------

export default function SystematicReviewHubPage() {
  const [projects, setProjects] = useState<SRProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/systematic-review/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data.projects ?? []);
    } catch {
      // Error handled
    } finally {
      setIsLoading(false);
    }
  }

  async function createProject() {
    if (!newTitle.trim()) return;
    setIsCreating(true);
    try {
      const res = await fetch("/api/systematic-review/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim() }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      setNewTitle("");
      setShowCreate(false);
      await fetchProjects();
    } catch {
      // Error handled
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-ink flex items-center gap-2">
              <FlowArrow weight="duotone" className="text-brand" />
              Systematic Reviews
            </h1>
            <p className="text-sm text-ink-muted mt-1">
              PRISMA 2020-compliant systematic review pipeline with AI-powered
              screening, data extraction, and risk of bias assessment.
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand/90 flex items-center gap-2"
          >
            <Plus weight="bold" size={16} />
            New Review
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Create form */}
        {showCreate && (
          <GlassPanel className="p-6 mb-6 max-w-2xl">
            <h2 className="text-lg font-semibold text-ink mb-3">
              New Systematic Review
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., Metformin vs Sulfonylureas for T2DM: A Systematic Review"
                className="flex-1 px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
                onKeyDown={(e) => e.key === "Enter" && createProject()}
                autoFocus
              />
              <button
                onClick={createProject}
                disabled={isCreating || !newTitle.trim()}
                className="px-4 py-2 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 disabled:opacity-50 flex items-center gap-2"
              >
                {isCreating ? (
                  <CircleNotch
                    weight="bold"
                    className="animate-spin"
                    size={16}
                  />
                ) : (
                  <Plus weight="bold" size={16} />
                )}
                Create
              </button>
              <button
                onClick={() => {
                  setShowCreate(false);
                  setNewTitle("");
                }}
                className="px-3 py-2 text-sm text-ink-muted hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </GlassPanel>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <CircleNotch
              weight="bold"
              className="animate-spin text-brand"
              size={32}
            />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MagnifyingGlass
              weight="duotone"
              className="text-ink-muted mb-4"
              size={48}
            />
            <h2 className="text-lg font-semibold text-ink mb-2">
              No systematic reviews yet
            </h2>
            <p className="text-sm text-ink-muted max-w-md mb-6">
              Create your first PRISMA 2020-compliant systematic review. Our AI
              will help you through every step — from search strategy to
              meta-analysis.
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand/90 flex items-center gap-2"
            >
              <Plus weight="bold" size={16} />
              Create Your First Review
            </button>
          </div>
        )}

        {/* Project cards */}
        {!isLoading && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/systematic-review/${project.id}`}
                className="group"
              >
                <GlassPanel className="p-5 hover:border-brand/30 transition-colors h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-semibold text-ink group-hover:text-brand transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <ArrowRight
                      weight="bold"
                      size={16}
                      className="text-ink-muted group-hover:text-brand transition-colors shrink-0 mt-0.5"
                    />
                  </div>

                  {/* Stage badge */}
                  <div className="mb-3">
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-xs font-medium",
                        STAGE_COLORS[project.reviewStage] ||
                          "bg-surface-raised text-ink-muted"
                      )}
                    >
                      {STAGE_LABELS[project.reviewStage] || project.reviewStage}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-ink-muted">
                    <span>{project.paperCount} papers</span>
                    {project.screeningProgress > 0 && (
                      <span>{project.screeningProgress}% screened</span>
                    )}
                  </div>

                  {/* Progress bar */}
                  {project.paperCount > 0 && (
                    <div className="mt-3 h-1 bg-surface-raised rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand/60 rounded-full transition-all"
                        style={{
                          width: `${project.screeningProgress}%`,
                        }}
                      />
                    </div>
                  )}
                </GlassPanel>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
