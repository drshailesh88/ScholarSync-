"use client";

import { useState } from "react";
import {
  Article,
  Stethoscope,
  BookOpen,
  EnvelopeSimple,
  ChartBar,
  Check,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { journalTemplates, type JournalTemplate } from "@/lib/templates/journal-templates";
import { Modal } from "@/components/ui/modal";

interface TemplatePickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (template: JournalTemplate) => void;
}

const categoryIcons = {
  research: Article,
  review: BookOpen,
  case_report: Stethoscope,
  letter: EnvelopeSimple,
  meta_analysis: ChartBar,
};

const categoryLabels = {
  research: "Research Article",
  review: "Review",
  case_report: "Case Report",
  letter: "Letter",
  meta_analysis: "Meta-Analysis",
};

export function TemplatePicker({ open, onClose, onSelect }: TemplatePickerProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<JournalTemplate | null>(null);

  const handleUseTemplate = () => {
    const template = journalTemplates.find((t) => t.id === selectedId);
    if (template) {
      onSelect(template);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Choose a Template">
      <div className="flex gap-4 max-h-[60vh]">
        {/* Template List */}
        <div className="flex-1 space-y-2 overflow-y-auto pr-2">
          {journalTemplates.map((template) => {
            const Icon = categoryIcons[template.category];
            const isSelected = selectedId === template.id;
            return (
              <div
                key={template.id}
                className={cn(
                  "p-4 rounded-xl cursor-pointer transition-all border",
                  isSelected
                    ? "border-brand bg-brand/5"
                    : "border-border hover:border-border hover:bg-surface-raised/50"
                )}
                onClick={() => {
                  setSelectedId(template.id);
                  setPreviewTemplate(template);
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      isSelected ? "bg-brand/10 text-brand" : "bg-surface-raised text-ink-muted"
                    )}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-medium text-ink">{template.name}</h4>
                    <p className="text-xs text-ink-muted">
                      {categoryLabels[template.category]}
                      {template.wordLimit && ` · ~${template.wordLimit.toLocaleString()} words`}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="ml-auto shrink-0">
                      <Check size={18} className="text-brand" weight="bold" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Preview Panel */}
        {previewTemplate && (
          <div className="w-64 shrink-0 bg-surface-raised rounded-xl p-4 overflow-y-auto">
            <h4 className="text-sm font-semibold text-ink mb-2">{previewTemplate.name}</h4>
            <p className="text-xs text-ink-muted mb-4">{previewTemplate.description}</p>
            <h5 className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-2">
              Sections
            </h5>
            <div className="space-y-1.5">
              {previewTemplate.sections.map((section, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-surface flex items-center justify-center text-[10px] text-ink-muted shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-xs text-ink">{section.heading}</span>
                  {section.wordCountGuide && (
                    <span className="text-[10px] text-ink-muted ml-auto shrink-0">
                      {section.wordCountGuide}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border-subtle">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-ink hover:bg-surface-raised transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleUseTemplate}
          disabled={!selectedId}
          className="px-4 py-2 rounded-xl bg-brand text-white text-sm font-medium hover:bg-brand-hover transition-colors disabled:opacity-50"
        >
          Use Template
        </button>
      </div>
    </Modal>
  );
}
