"use client";

import { useState } from "react";
import { Table, Plus, Trash } from "@phosphor-icons/react";
import { GlassPanel } from "@/components/ui/glass-panel";

interface DataExtractionPanelProps {
  projectId: number;
}

export function DataExtractionPanel({
  projectId: _projectId,
}: DataExtractionPanelProps) {
  const [schema, setSchema] = useState<
    Array<{ field: string; description: string; type: string }>
  >([
    {
      field: "sample_size",
      description: "Total number of participants",
      type: "number",
    },
    {
      field: "intervention",
      description: "Intervention used",
      type: "text",
    },
    {
      field: "primary_outcome",
      description: "Primary outcome measured",
      type: "text",
    },
    {
      field: "effect_size",
      description: "Main effect size reported",
      type: "text",
    },
    { field: "follow_up", description: "Follow-up duration", type: "text" },
  ]);

  const addField = () => {
    setSchema((prev) => [...prev, { field: "", description: "", type: "text" }]);
  };

  const removeField = (index: number) => {
    setSchema((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: string, value: string) => {
    setSchema((prev) =>
      prev.map((f, i) => (i === index ? { ...f, [key]: value } : f))
    );
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <GlassPanel className="p-6">
        <h2 className="text-lg font-semibold text-ink mb-4 flex items-center gap-2">
          <Table weight="duotone" className="text-brand" />
          Data Extraction Schema
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Define your extraction schema once. The AI will extract structured
          data from all included papers, linking every value to its source text.
        </p>

        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-ink-muted px-1">
            <div className="col-span-3">Field Name</div>
            <div className="col-span-5">Description / Prompt</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-2"></div>
          </div>

          {schema.map((field, i) => (
            <div key={i} className="grid grid-cols-12 gap-2">
              <input
                type="text"
                value={field.field}
                onChange={(e) => updateField(i, "field", e.target.value)}
                placeholder="field_name"
                className="col-span-3 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              <input
                type="text"
                value={field.description}
                onChange={(e) =>
                  updateField(i, "description", e.target.value)
                }
                placeholder="What the AI should look for"
                className="col-span-5 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink placeholder:text-ink-muted focus:ring-2 focus:ring-brand/40 outline-none"
              />
              <select
                value={field.type}
                onChange={(e) => updateField(i, "type", e.target.value)}
                className="col-span-2 px-2 py-1.5 bg-surface-raised border border-border rounded text-sm text-ink"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="select">Category</option>
              </select>
              <div className="col-span-2 flex items-center">
                {schema.length > 1 && (
                  <button
                    onClick={() => removeField(i)}
                    className="p-1 text-ink-muted hover:text-red-500"
                  >
                    <Trash size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addField}
          className="mt-3 px-3 py-1.5 text-sm text-brand hover:bg-brand/10 rounded flex items-center gap-1"
        >
          <Plus size={14} /> Add Field
        </button>
      </GlassPanel>

      {/* Schema Preview */}
      <GlassPanel className="p-6 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
        <h3 className="text-sm font-semibold text-ink mb-3">
          How AI Extraction Works
        </h3>
        <div className="space-y-2 text-sm text-ink-muted">
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <span>
              You define the extraction schema (columns + descriptions)
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <span>
              AI reads each paper and extracts matching data points
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <span>
              Every extraction links to the source quote for verification
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center shrink-0 mt-0.5">
              4
            </span>
            <span>Results populate a structured comparison table</span>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
