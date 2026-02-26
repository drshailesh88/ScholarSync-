"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MagnifyingGlass,
  Funnel,
  FlowArrow,
  ShieldCheck,
  Table,
  ChartBar,
  CircleNotch,
  ArrowLeft,
  DownloadSimple,
  Graph,
  Export,
  Bell,
  Scroll,
  Certificate,
} from "@phosphor-icons/react";
import { Tabs } from "@/components/ui/tabs";
import {
  useSystematicReviewStore,
  type WorkflowTab,
  type ReviewConfig,
} from "@/stores/systematic-review-store";
import { ProjectHeader } from "@/components/systematic-review/ProjectHeader";
import { SearchStrategyPanel } from "@/components/systematic-review/SearchStrategyPanel";
import { ScreeningPanel } from "@/components/systematic-review/ScreeningPanel";
import { PRISMAFlowPanel } from "@/components/systematic-review/PRISMAFlowPanel";
import { RoB2Panel } from "@/components/systematic-review/RoB2Panel";
import { DataExtractionPanel } from "@/components/systematic-review/DataExtractionPanel";
import { PaperImportPanel } from "@/components/systematic-review/PaperImportPanel";
import { MetaAnalysisPanel } from "@/components/systematic-review/MetaAnalysisPanel";
import { SnowballingPanel } from "@/components/systematic-review/SnowballingPanel";
import { PRISMAChecklistPanel } from "@/components/systematic-review/PRISMAChecklistPanel";
import { ImportExportPanel } from "@/components/systematic-review/ImportExportPanel";
import { LivingReviewPanel } from "@/components/systematic-review/LivingReviewPanel";
import { ProtocolPanel } from "@/components/systematic-review/ProtocolPanel";
import { GRADEPanel } from "@/components/systematic-review/GRADEPanel";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Workflow tab definitions
// ---------------------------------------------------------------------------

const WORKFLOW_TABS = [
  { key: "strategy", label: "Search Strategy", icon: MagnifyingGlass },
  { key: "import", label: "Import Papers", icon: DownloadSimple },
  { key: "screening", label: "AI Screening", icon: Funnel },
  { key: "prisma", label: "PRISMA Flow", icon: FlowArrow },
  { key: "rob2", label: "Risk of Bias", icon: ShieldCheck },
  { key: "extraction", label: "Data Extraction", icon: Table },
  { key: "meta_analysis", label: "Meta-Analysis", icon: ChartBar },
  { key: "grade", label: "GRADE", icon: Certificate },
  { key: "snowball", label: "Snowballing", icon: Graph },
  { key: "export", label: "Export", icon: Export },
  { key: "living", label: "Living Review", icon: Bell },
  { key: "protocol", label: "Protocol", icon: Scroll },
];

// ---------------------------------------------------------------------------
// Main Workflow Page
// ---------------------------------------------------------------------------

export default function SystematicReviewWorkflowPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = parseInt(params.projectId as string, 10);

  const {
    projectId: storeProjectId,
    projectTitle,
    reviewStage,
    activeTab,
    setProject,
    setActiveTab,
  } = useSystematicReviewStore();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paperCount, setPaperCount] = useState(0);

  // Load project config on mount or when projectId changes
  useEffect(() => {
    if (isNaN(projectId)) {
      router.push("/systematic-review");
      return;
    }

    loadProject();
  }, [projectId]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadProject() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/systematic-review/config?projectId=${projectId}`
      );
      if (!res.ok) {
        if (res.status === 404) {
          setError("Project not found");
          return;
        }
        throw new Error("Failed to load project");
      }

      const data = await res.json();
      const config: ReviewConfig = data.config
        ? {
            id: data.config.id,
            projectId: data.config.projectId,
            pico: data.config.pico,
            searchStrategy: data.config.searchStrategy,
            searchDatabases: data.config.searchDatabases ?? ["pubmed"],
            protocolRegistration: data.config.protocolRegistration,
            reviewStage: data.config.reviewStage ?? "search_strategy",
            settings: data.config.settings ?? {},
          }
        : {
            id: 0,
            projectId,
            pico: null,
            searchStrategy: null,
            searchDatabases: ["pubmed"],
            protocolRegistration: null,
            reviewStage: "search_strategy",
            settings: {},
          };

      setProject(projectId, data.project.title, config);

      // Get paper count
      try {
        const projRes = await fetch("/api/systematic-review/projects");
        if (projRes.ok) {
          const projData = await projRes.json();
          const thisProject = projData.projects?.find(
            (p: { id: number }) => p.id === projectId
          );
          if (thisProject) setPaperCount(thisProject.paperCount ?? 0);
        }
      } catch {
        // Non-critical
      }
    } catch {
      setError("Failed to load project");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <CircleNotch
          weight="bold"
          className="animate-spin text-brand"
          size={32}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <p className="text-sm text-red-500 mb-4">{error}</p>
        <Link
          href="/systematic-review"
          className="text-sm text-brand hover:underline flex items-center gap-1"
        >
          <ArrowLeft size={14} />
          Back to Reviews
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Back link */}
      <div className="px-6 pt-3">
        <Link
          href="/systematic-review"
          className="text-xs text-ink-muted hover:text-brand flex items-center gap-1"
        >
          <ArrowLeft size={12} />
          All Reviews
        </Link>
      </div>

      {/* Project Header with progress stepper */}
      <ProjectHeader
        title={projectTitle}
        currentStage={reviewStage}
        paperCount={paperCount}
      />

      {/* Workflow Tabs */}
      <div className="px-6 pt-4 border-b border-border">
        <Tabs
          tabs={WORKFLOW_TABS.map((t) => ({
            key: t.key,
            label: t.label,
          }))}
          activeTab={activeTab}
          onChange={(key) => setActiveTab(key as WorkflowTab)}
        />
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "strategy" && (
          <SearchStrategyPanel projectId={projectId} />
        )}
        {activeTab === "import" && (
          <PaperImportPanel projectId={projectId} />
        )}
        {activeTab === "screening" && (
          <ScreeningPanel projectId={projectId} />
        )}
        {activeTab === "prisma" && (
          <div className="space-y-8">
            <PRISMAFlowPanel projectId={projectId} />
            <PRISMAChecklistPanel projectId={projectId} />
          </div>
        )}
        {activeTab === "rob2" && <RoB2Panel projectId={projectId} />}
        {activeTab === "extraction" && (
          <DataExtractionPanel projectId={projectId} />
        )}
        {activeTab === "meta_analysis" && (
          <MetaAnalysisPanel projectId={projectId} />
        )}
        {activeTab === "grade" && <GRADEPanel projectId={projectId} />}
        {activeTab === "snowball" && (
          <SnowballingPanel projectId={projectId} />
        )}
        {activeTab === "export" && (
          <ImportExportPanel projectId={projectId} />
        )}
        {activeTab === "living" && (
          <LivingReviewPanel projectId={projectId} />
        )}
        {activeTab === "protocol" && (
          <ProtocolPanel projectId={projectId} />
        )}
      </div>
    </div>
  );
}
