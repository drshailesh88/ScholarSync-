"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  FlowArrow,
  CircleNotch,
  MagnifyingGlass,
  ArrowRight,
} from "@phosphor-icons/react";
import { EmptyState } from "@/components/systematic-review/EmptyState";
import { cn } from "@/lib/utils";
import { GlassPanel } from "@/components/ui/glass-panel";
import { ReviewTypeSelector } from "@/components/systematic-review/ReviewTypeSelector";
import type { ReviewType, SRProject } from "@/stores/systematic-review-store";

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
  const router = useRouter();
  const [projects, setProjects] = useState<SRProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [creationStep, setCreationStep] = useState<"title" | "type">("title");
  const [selectedType, setSelectedType] =
    useState<ReviewType>("intervention_rct");
  const [error, setError] = useState<string | null>(null);

  // Fetch projects
  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/systematic-review/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data.projects ?? []);
    } catch {
      setError("Failed to load projects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function openCreateFlow() {
    setError(null);
    setCreationStep("title");
    setSelectedType("intervention_rct");
    setNewTitle("");
    setShowCreate(true);
  }

  function resetCreateFlow() {
    setShowCreate(false);
    setCreationStep("title");
    setSelectedType("intervention_rct");
    setNewTitle("");
  }

  async function createProject(reviewType: ReviewType) {
    if (!newTitle.trim()) return;
    setIsCreating(true);
    try {
      const res = await fetch("/api/systematic-review/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle.trim(),
          reviewType,
        }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      const data = await res.json();
      resetCreateFlow();
      router.push(`/systematic-review/${data.project.id}`);
    } catch {
      setError("Failed to create project. Please try again.");
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
            onClick={openCreateFlow}
            className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand/90 flex items-center gap-2"
          >
            <Plus weight="bold" size={16} />
            New Review
          </button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-6 mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">&#x2715;</button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Create form */}
        {showCreate && (
          <>
            {creationStep === "title" && (
              <GlassPanel className="p-6 mb-6 max-w-2xl">
                <h2 className="text-lg font-semibold text-ink mb-3">
                  New Systematic Review
                </h2>
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-ink">
                      Review Title
                    </label>
                    <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand">
                      Required
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">
                    Enter a working title first, then choose the review type
                    before the project is created.
                  </p>
                </div>
                <div className="flex gap-3">
                  <input
                    aria-label="Text input"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Metformin vs Sulfonylureas for T2DM: A Systematic Review"
                    className="flex-1 px-3 py-2 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newTitle.trim()) {
                        setCreationStep("type");
                      }
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => setCreationStep("type")}
                    disabled={isCreating || !newTitle.trim()}
                    className="px-4 py-2 bg-brand text-white rounded text-sm font-medium hover:bg-brand/90 disabled:opacity-50 flex items-center gap-2"
                  >
                    Next
                    <ArrowRight weight="bold" size={16} />
                  </button>
                  <button
                    onClick={resetCreateFlow}
                    className="px-3 py-2 text-sm text-ink-muted hover:text-ink"
                  >
                    Cancel
                  </button>
                </div>
              </GlassPanel>
            )}

            {creationStep === "type" && (
              <div className="mb-6 max-w-5xl space-y-4">
                <ReviewTypeSelector
                  projectId={0}
                  currentType={selectedType}
                  onTypeSelected={(type) => {
                    setSelectedType(type);
                    void createProject(type);
                  }}
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCreationStep("title")}
                    disabled={isCreating}
                    className="px-3 py-2 text-sm text-ink-muted hover:text-ink disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={resetCreateFlow}
                    disabled={isCreating}
                    className="px-3 py-2 text-sm text-ink-muted hover:text-ink disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  {isCreating && (
                    <span className="inline-flex items-center gap-2 text-sm text-ink-muted">
                      <CircleNotch
                        weight="bold"
                        className="animate-spin"
                        size={16}
                      />
                      Creating review...
                    </span>
                  )}
                </div>
              </div>
            )}
          </>
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
          <EmptyState
            icon={MagnifyingGlass}
            title="No systematic reviews yet"
            description="Create your first PRISMA 2020-compliant systematic review. Our AI will help you through every step — from search strategy to meta-analysis."
            actionLabel="Create Your First Review"
            onAction={openCreateFlow}
            tip="Tip: Each review follows the PRISMA 2020 checklist automatically."
          />
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
