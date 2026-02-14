"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GlobeHemisphereWest,
  PenNib,
  GraduationCap,
  ShieldCheck,
  FileText,
  ArrowRight,
  MagnifyingGlass,
  Books,
  ChartBar,
  ChatCircleDots,
  ClockCounterClockwise,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type {
  DashboardProject,
  DashboardStats,
  RecentSearch,
  RecentActivity,
} from "@/lib/actions/dashboard";

// ── Action Cards (static config) ────────────────────────────────

const actionCards = [
  {
    title: "Deep Research",
    description: "Query 200M+ academic papers. Extract consensus.",
    icon: GlobeHemisphereWest,
    href: "/research",
    accent: "sky",
  },
  {
    title: "Write & Draft",
    description: "Open the luminous studio. Start writing with focus.",
    icon: PenNib,
    href: "/studio",
    accent: "indigo",
  },
  {
    title: "Learn Mode",
    description: "Socratic AI tutor. Think critically, learn deeply.",
    icon: GraduationCap,
    href: "/studio?mode=learn",
    accent: "emerald",
  },
  {
    title: "Final Checks",
    description: "Run plagiarism and AI-detection compliance audits.",
    icon: ShieldCheck,
    href: "/compliance",
    accent: "amber",
  },
];

const accentColors: Record<
  string,
  { bg: string; text: string; glow: string }
> = {
  sky: {
    bg: "bg-sky-500/10",
    text: "text-sky-400",
    glow: "hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] hover:border-sky-500/30",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    glow: "hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] hover:border-indigo-500/30",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] hover:border-emerald-500/30",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] hover:border-amber-500/30",
  },
};

// ── Helpers ──────────────────────────────────────────────────────

type DbStatus = "planning" | "drafting" | "reviewing" | "completed" | "archived";

const statusMap: Record<
  DbStatus,
  { variant: "drafting" | "completed" | "issues" | "active" | "popular"; label: string }
> = {
  planning: { variant: "active", label: "Planning" },
  drafting: { variant: "drafting", label: "Drafting" },
  reviewing: { variant: "active", label: "Reviewing" },
  completed: { variant: "completed", label: "Completed" },
  archived: { variant: "completed", label: "Archived" },
};

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

function formatActivityAction(action: string): string {
  return action
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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
  stats,
  recentSearches,
  recentActivity,
}: DashboardClientProps) {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Action Cards */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-ink-muted uppercase tracking-widest mb-6">
          What do you want to do today?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actionCards.map((card) => {
            const colors = accentColors[card.accent];
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className={cn(
                  "group glass-panel rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 border border-border",
                  colors.glow
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                    colors.bg,
                    colors.text
                  )}
                >
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-ink mb-1">{card.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {card.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Overview */}
      <section className="mb-12">
        <h2 className="text-sm font-medium text-ink-muted uppercase tracking-widest mb-6">
          Your Research at a Glance
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-panel rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <FileText size={18} />
              </div>
              <span className="text-2xl font-bold text-ink">{stats.projectCount}</span>
            </div>
            <p className="text-xs text-ink-muted">Projects</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
                <Books size={18} />
              </div>
              <span className="text-2xl font-bold text-ink">{stats.paperCount}</span>
            </div>
            <p className="text-xs text-ink-muted">Papers Saved</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <MagnifyingGlass size={18} />
              </div>
              <span className="text-2xl font-bold text-ink">{stats.searchCount}</span>
            </div>
            <p className="text-xs text-ink-muted">Searches</p>
          </div>
          <div className="glass-panel rounded-2xl p-5 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <ChatCircleDots size={18} />
              </div>
              <span className="text-2xl font-bold text-ink">{stats.conversationCount}</span>
            </div>
            <p className="text-xs text-ink-muted">Conversations</p>
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-medium text-ink-muted uppercase tracking-widest">
            Active Manuscripts
          </h2>
          <Link
            href="/projects"
            className="text-sm text-brand hover:text-brand-hover transition-colors"
          >
            View Archive →
          </Link>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden border border-border">
          {recentProjects.length === 0 ? (
            <div className="p-8 text-center text-ink-muted text-sm">
              No projects yet. Create your first manuscript to get started.
            </div>
          ) : (
            recentProjects.map((project, idx) => {
              const status =
                statusMap[(project.status as DbStatus) || "drafting"];
              return (
                <div
                  key={project.id}
                  onClick={() => router.push(`/studio/${project.id}`)}
                  className={cn(
                    "group flex items-center justify-between p-5 hover:bg-surface-raised/50 transition-colors cursor-pointer",
                    idx < recentProjects.length - 1 &&
                      "border-b border-border-subtle"
                  )}
                >
                  <div className="flex items-center gap-5 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-surface-raised flex items-center justify-center text-ink-muted group-hover:text-ink transition-colors shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif text-ink group-hover:text-brand transition-colors truncate">
                        {project.title}
                      </h4>
                      <p className="text-xs text-ink-muted mt-0.5">
                        {formatRelativeTime(project.updated_at)} ·{" "}
                        {formatProjectType(project.project_type)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-ink-muted group-hover:text-ink group-hover:border-border transition-all">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* Bottom Grid: Recent Searches + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Searches */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-ink-muted uppercase tracking-widest">
              Recent Searches
            </h2>
            <Link
              href="/research"
              className="text-sm text-brand hover:text-brand-hover transition-colors"
            >
              Search →
            </Link>
          </div>
          <div className="glass-panel rounded-2xl overflow-hidden border border-border">
            {recentSearches.length === 0 ? (
              <div className="p-6 text-center text-ink-muted text-sm">
                No searches yet. Start exploring academic papers.
              </div>
            ) : (
              recentSearches.map((search, idx) => (
                <div
                  key={search.id}
                  className={cn(
                    "flex items-center gap-3 p-4 hover:bg-surface-raised/50 transition-colors",
                    idx < recentSearches.length - 1 &&
                      "border-b border-border-subtle"
                  )}
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-raised flex items-center justify-center text-ink-muted shrink-0">
                    <MagnifyingGlass size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-ink truncate">
                      {search.original_query}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {search.result_count != null
                        ? `${search.result_count} results`
                        : "No results"}{" "}
                      · {formatRelativeTime(search.created_at)}
                      {search.source && search.source !== "all"
                        ? ` · ${search.source}`
                        : ""}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-ink-muted uppercase tracking-widest">
              Recent Activity
            </h2>
          </div>
          <div className="glass-panel rounded-2xl overflow-hidden border border-border">
            {recentActivity.length === 0 ? (
              <div className="p-6 text-center text-ink-muted text-sm">
                No activity yet. Your research actions will appear here.
              </div>
            ) : (
              recentActivity.map((activity, idx) => (
                <div
                  key={activity.id}
                  className={cn(
                    "flex items-center gap-3 p-4 hover:bg-surface-raised/50 transition-colors",
                    idx < recentActivity.length - 1 &&
                      "border-b border-border-subtle"
                  )}
                >
                  <div className="w-8 h-8 rounded-lg bg-surface-raised flex items-center justify-center text-ink-muted shrink-0">
                    <ClockCounterClockwise size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-ink truncate">
                      {formatActivityAction(activity.action)}
                    </p>
                    <p className="text-xs text-ink-muted mt-0.5">
                      {activity.entity_type
                        ? `${formatActivityAction(activity.entity_type)}`
                        : ""}
                      {activity.entity_type ? " · " : ""}
                      {formatRelativeTime(activity.created_at)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
