// Empty state: renders nothing when data.length === 0
"use client";

import { cn } from "@/lib/utils";
import { ACADEMIC_TEMPLATES, type AudienceType, type AcademicTemplate } from "@/types/presentation";
import {
  GraduationCap,
  Microphone,
  BookOpen,
  CurrencyDollar,
  MagnifyingGlass,
  Stethoscope,
  Hospital,
  Presentation,
  SquaresFour,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

const ICON_MAP: Record<string, Icon> = {
  GraduationCap,
  Microphone,
  BookOpen,
  CurrencyDollar,
  MagnifyingGlass,
  Stethoscope,
  Hospital,
  Presentation,
};

interface TemplateSelectorProps {
  selectedId: string | null;
  onSelect: (templateId: string | null) => void;
  onAudienceChange: (audience: AudienceType) => void;
}

export function TemplateSelector({
  selectedId,
  onSelect,
  onAudienceChange,
}: TemplateSelectorProps) {
  const templates = Object.values(ACADEMIC_TEMPLATES);

  function handleSelect(template: AcademicTemplate) {
    onSelect(template.id);
    onAudienceChange(template.audienceType);
  }

  function handleDeselect() {
    onSelect(null);
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* No Template (Custom) card */}
      <button
        onClick={handleDeselect}
        className={cn(
          "flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all",
          selectedId === null
            ? "border-brand ring-1 ring-brand/30 bg-brand/5"
            : "border-border bg-surface-raised hover:border-brand/40"
        )}
      >
        <div
          className={cn(
            "w-9 h-9 rounded-lg flex items-center justify-center",
            selectedId === null
              ? "bg-brand/10 text-brand"
              : "bg-surface-raised text-ink-muted"
          )}
        >
          <SquaresFour size={20} />
        </div>
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              selectedId === null ? "text-brand" : "text-ink"
            )}
          >
            No Template (Custom)
          </p>
          <p className="text-xs text-ink-muted mt-0.5">
            Build freely without a predefined structure
          </p>
        </div>
      </button>

      {/* Template cards */}
      {templates.map((template) => {
        const IconComponent = ICON_MAP[template.icon] || Presentation;
        const isSelected = selectedId === template.id;

        return (
          <button
            key={template.id}
            onClick={() => handleSelect(template)}
            className={cn(
              "flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all",
              isSelected
                ? "border-brand ring-1 ring-brand/30 bg-brand/5"
                : "border-border bg-surface-raised hover:border-brand/40"
            )}
          >
            <div className="flex items-start justify-between w-full">
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center",
                  isSelected
                    ? "bg-brand/10 text-brand"
                    : "bg-surface-raised text-ink-muted"
                )}
              >
                <IconComponent size={20} />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-ink-muted">
                <span>{template.defaultSlideCount} slides</span>
                {template.estimatedDuration && (
                  <>
                    <span className="text-border">|</span>
                    <span>{template.estimatedDuration}</span>
                  </>
                )}
              </div>
            </div>
            <div>
              <p
                className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-brand" : "text-ink"
                )}
              >
                {template.name}
              </p>
              <p className="text-xs text-ink-muted mt-0.5 line-clamp-2">
                {template.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
