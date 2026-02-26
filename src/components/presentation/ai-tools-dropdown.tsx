"use client";

import { useState } from "react";
import {
  TextAlignLeft,
  ArrowsOutSimple,
  Shuffle,
  Image,
  Quotes,
  ListBullets,
  ArrowCounterClockwise,
  CircleNotch,
  MathOperations,
  TreeStructure,
  ChartBar,
  ShieldCheck,
  TextAa,
  SpeakerHigh,
  Translate,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { SlideEditAction, ContentBlock } from "@/types/presentation";

const AI_ACTIONS: {
  action: SlideEditAction;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    action: "shorten",
    label: "Shorten Text",
    description: "Reduce content by 30-50%",
    icon: <TextAlignLeft size={14} />,
  },
  {
    action: "expand",
    label: "Expand Content",
    description: "Add more detail and examples",
    icon: <ArrowsOutSimple size={14} />,
  },
  {
    action: "rephrase",
    label: "Rephrase",
    description: "Improve clarity and impact",
    icon: <Shuffle size={14} />,
  },
  {
    action: "suggest_image",
    label: "Suggest Image",
    description: "Get image recommendations",
    icon: <Image size={14} alt="" />,
  },
  {
    action: "add_citations",
    label: "Add Citations",
    description: "Add academic references",
    icon: <Quotes size={14} />,
  },
  {
    action: "improve_bullets",
    label: "Improve Bullets",
    description: "Make points parallel and concise",
    icon: <ListBullets size={14} />,
  },
  {
    action: "regenerate",
    label: "Regenerate Slide",
    description: "Completely rewrite this slide",
    icon: <ArrowCounterClockwise size={14} />,
  },
  {
    action: "add_math",
    label: "Add Math",
    description: "Generate LaTeX equations and formulas",
    icon: <MathOperations size={14} />,
  },
  {
    action: "add_diagram",
    label: "Add Diagram",
    description: "Generate Mermaid flowcharts and diagrams",
    icon: <TreeStructure size={14} />,
  },
  {
    action: "add_chart",
    label: "Add Chart",
    description: "Convert data to visual charts",
    icon: <ChartBar size={14} />,
  },
  {
    action: "strengthen_evidence",
    label: "Strengthen Evidence",
    description: "Add stats, citations, and callouts",
    icon: <ShieldCheck size={14} />,
  },
  {
    action: "simplify_language",
    label: "Simplify Language",
    description: "Make accessible to non-specialists",
    icon: <TextAa size={14} />,
  },
  {
    action: "add_speaker_notes",
    label: "Add Speaker Notes",
    description: "Generate comprehensive speaker notes",
    icon: <SpeakerHigh size={14} />,
  },
  {
    action: "translate",
    label: "Translate",
    description: "Translate slide content to another language",
    icon: <Translate size={14} />,
  },
];

interface AiToolsDropdownProps {
  title?: string | null;
  subtitle?: string | null;
  contentBlocks: ContentBlock[];
  speakerNotes?: string | null;
  onApply: (blocks: ContentBlock[], speakerNotes?: string) => void;
}

export function AiToolsDropdown({
  title,
  subtitle,
  contentBlocks,
  speakerNotes,
  onApply,
}: AiToolsDropdownProps) {
  const [loading, setLoading] = useState<SlideEditAction | null>(null);
  const [error, setError] = useState("");

  async function handleAction(action: SlideEditAction) {
    setLoading(action);
    setError("");
    try {
      const res = await fetch("/api/presentations/edit-slide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          title,
          subtitle,
          contentBlocks,
          speakerNotes,
        }),
      });

      if (!res.ok) throw new Error("AI edit failed");

      const result = await res.json();
      if (result.contentBlocks) {
        onApply(result.contentBlocks, result.speakerNotes);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-1.5">
      {AI_ACTIONS.map(({ action, label, description, icon }) => (
        <button
          key={action}
          onClick={() => handleAction(action)}
          disabled={loading !== null}
          className={cn(
            "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors",
            loading === action
              ? "bg-brand/10 text-brand"
              : loading !== null
                ? "opacity-50 cursor-not-allowed text-ink-muted"
                : "text-ink-muted hover:text-ink hover:bg-surface-raised border border-transparent hover:border-border"
          )}
        >
          {loading === action ? (
            <CircleNotch size={14} className="animate-spin text-brand" />
          ) : (
            icon
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium">{label}</p>
            <p className="text-[10px] opacity-60 truncate">{description}</p>
          </div>
        </button>
      ))}

      {error && (
        <p className="text-[10px] text-red-500 px-3">{error}</p>
      )}
    </div>
  );
}
