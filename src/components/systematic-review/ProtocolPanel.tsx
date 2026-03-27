"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Scroll,
  CircleNotch,
  CheckCircle,
  WarningCircle,
  FloppyDisk,
  CloudCheck,
  CaretDown,
  CaretRight,
  Info,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useSystematicReviewStore } from "@/stores/systematic-review-store";

// ---------------------------------------------------------------------------
// PROSPERO field definitions (all 22 mandatory fields)
// ---------------------------------------------------------------------------

interface FieldDef {
  id: string;
  fieldNumber: number;
  label: string;
  placeholder: string;
  guidance: string;
  required: boolean;
  type: "text" | "textarea" | "select";
  options?: string[];
  section: string;
}

const SECTIONS = [
  "Review Information",
  "Team & Timeline",
  "Review Design",
  "Search & Selection",
  "Data & Analysis",
  "Other",
] as const;

const PROSPERO_FIELDS: FieldDef[] = [
  // --- Review Information ---
  {
    id: "review_title",
    fieldNumber: 1,
    label: "Review title",
    placeholder: "Descriptive title including population, intervention, and outcome",
    guidance: "Provide the title of the review. It should clearly identify the topic and include the key elements (e.g., population, intervention, comparison, outcome).",
    required: true,
    type: "textarea",
    section: "Review Information",
  },
  {
    id: "original_language",
    fieldNumber: 2,
    label: "Original language title",
    placeholder: "Title in original language (if not English)",
    guidance: "If the review title is not in English, provide the title in the original language.",
    required: false,
    type: "text",
    section: "Review Information",
  },
  {
    id: "anticipated_date",
    fieldNumber: 3,
    label: "Anticipated or actual start date",
    placeholder: "e.g. 2026-01-15",
    guidance: "The date when the systematic review commenced or is expected to commence.",
    required: true,
    type: "text",
    section: "Review Information",
  },
  {
    id: "anticipated_completion",
    fieldNumber: 4,
    label: "Anticipated completion date",
    placeholder: "e.g. 2026-12-31",
    guidance: "The anticipated date of completion of the review.",
    required: true,
    type: "text",
    section: "Review Information",
  },
  {
    id: "stage_of_review",
    fieldNumber: 5,
    label: "Stage of review at registration",
    placeholder: "Select current stage",
    guidance: "Indicate the stage of the review at the time of registration.",
    required: true,
    type: "select",
    options: [
      "Preliminary searches",
      "Piloting of the study selection process",
      "Formal screening against eligibility criteria",
      "Data extraction",
      "Risk of bias assessment",
      "Data analysis",
    ],
    section: "Review Information",
  },
  // --- Team & Timeline ---
  {
    id: "named_contact",
    fieldNumber: 6,
    label: "Named contact",
    placeholder: "Full name of the named contact",
    guidance: "The named contact acts as the guarantor for the accuracy of the information provided.",
    required: true,
    type: "text",
    section: "Team & Timeline",
  },
  {
    id: "named_contact_email",
    fieldNumber: 7,
    label: "Named contact email",
    placeholder: "email@institution.edu",
    guidance: "Email address of the named contact.",
    required: true,
    type: "text",
    section: "Team & Timeline",
  },
  {
    id: "named_contact_address",
    fieldNumber: 8,
    label: "Named contact address",
    placeholder: "Institutional address",
    guidance: "Full institutional/organisational postal address of the named contact.",
    required: true,
    type: "textarea",
    section: "Team & Timeline",
  },
  {
    id: "named_contact_affiliation",
    fieldNumber: 9,
    label: "Named contact affiliation",
    placeholder: "Department, Institution, City, Country",
    guidance: "Full organisational affiliation of the named contact.",
    required: true,
    type: "text",
    section: "Team & Timeline",
  },
  {
    id: "review_team",
    fieldNumber: 10,
    label: "Review team members and affiliations",
    placeholder: "List all team members with their affiliations, one per line",
    guidance: "Give the title, first name and last name of all members of the review team with their organisational affiliations.",
    required: true,
    type: "textarea",
    section: "Team & Timeline",
  },
  {
    id: "funding",
    fieldNumber: 11,
    label: "Funding sources/sponsors",
    placeholder: "Funding body, grant number, or 'None'",
    guidance: "Details of the funding sources for the review, including grant numbers where applicable. State 'None' if the review is not funded.",
    required: true,
    type: "textarea",
    section: "Team & Timeline",
  },
  {
    id: "conflicts_of_interest",
    fieldNumber: 12,
    label: "Conflicts of interest",
    placeholder: "Describe any conflicts of interest or state 'None known'",
    guidance: "List any conditions that could lead to actual or perceived undue influence on judgements concerning the main topic investigated.",
    required: true,
    type: "textarea",
    section: "Team & Timeline",
  },
  // --- Review Design ---
  {
    id: "review_question",
    fieldNumber: 13,
    label: "Review question",
    placeholder: "State the review question clearly, including PICO elements",
    guidance: "State the question(s) to be addressed by the review. Use the PICO format where appropriate.",
    required: true,
    type: "textarea",
    section: "Review Design",
  },
  {
    id: "url_protocol",
    fieldNumber: 14,
    label: "URL to published protocol",
    placeholder: "https://doi.org/...",
    guidance: "If the protocol has been published, provide the URL. Otherwise leave blank.",
    required: false,
    type: "text",
    section: "Review Design",
  },
  {
    id: "condition_or_domain",
    fieldNumber: 15,
    label: "Condition or domain being studied",
    placeholder: "e.g. Type 2 Diabetes Mellitus",
    guidance: "Provide a short description of the disease, condition, or healthcare domain being studied.",
    required: true,
    type: "text",
    section: "Review Design",
  },
  // --- Search & Selection ---
  {
    id: "participants",
    fieldNumber: 16,
    label: "Participants/population",
    placeholder: "Describe the participants or populations being studied",
    guidance: "Specify the participants or populations being studied. Include inclusion and exclusion criteria.",
    required: true,
    type: "textarea",
    section: "Search & Selection",
  },
  {
    id: "intervention",
    fieldNumber: 17,
    label: "Intervention(s), exposure(s)",
    placeholder: "Describe the interventions or exposures of interest",
    guidance: "Give full details of the intervention(s) or exposure(s) to be considered.",
    required: true,
    type: "textarea",
    section: "Search & Selection",
  },
  {
    id: "comparator",
    fieldNumber: 18,
    label: "Comparator(s)/control",
    placeholder: "Describe comparator groups (e.g. placebo, standard care, no treatment)",
    guidance: "Details of the comparison, comparator, or control group(s).",
    required: false,
    type: "textarea",
    section: "Search & Selection",
  },
  {
    id: "outcome",
    fieldNumber: 19,
    label: "Main outcome(s)",
    placeholder: "List primary outcomes with measurement methods and time points",
    guidance: "Give the pre-specified main (most important) outcomes of the review, including how and when they will be measured.",
    required: true,
    type: "textarea",
    section: "Search & Selection",
  },
  // --- Data & Analysis ---
  {
    id: "data_extraction",
    fieldNumber: 20,
    label: "Data extraction (selection and coding)",
    placeholder: "Describe data extraction methods (who, how, piloting, disagreements)",
    guidance: "Describe the method of data extraction (e.g. piloting forms, extraction independently, number of extractors, how disagreements will be resolved).",
    required: true,
    type: "textarea",
    section: "Data & Analysis",
  },
  {
    id: "risk_of_bias",
    fieldNumber: 21,
    label: "Risk of bias (quality) assessment",
    placeholder: "Describe the tool(s) used for risk of bias assessment (e.g. RoB 2, ROBINS-I)",
    guidance: "State whether and how risk of bias will be assessed, what tool(s) will be used, and how this information will be used.",
    required: true,
    type: "textarea",
    section: "Data & Analysis",
  },
  {
    id: "strategy_for_synthesis",
    fieldNumber: 22,
    label: "Strategy for data synthesis",
    placeholder: "Describe planned analysis methods (narrative, meta-analysis, software, handling heterogeneity)",
    guidance: "Provide a description of how the data will be synthesised. If meta-analysis is planned, describe the approach and software to be used.",
    required: true,
    type: "textarea",
    section: "Data & Analysis",
  },
];

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

interface ValidationError {
  fieldId: string;
  message: string;
}

function validateFields(values: Record<string, string>): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of PROSPERO_FIELDS) {
    const val = (values[field.id] || "").trim();

    if (field.required && !val) {
      errors.push({ fieldId: field.id, message: `${field.label} is required` });
      continue;
    }

    if (!val) continue;

    // Email validation
    if (field.id === "named_contact_email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      errors.push({ fieldId: field.id, message: "Please enter a valid email address" });
    }

    // URL validation
    if (field.id === "url_protocol" && val && !/^https?:\/\/.+/.test(val)) {
      errors.push({ fieldId: field.id, message: "Please enter a valid URL starting with http:// or https://" });
    }

    // Date validation
    if ((field.id === "anticipated_date" || field.id === "anticipated_completion") && !/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      errors.push({ fieldId: field.id, message: "Please use YYYY-MM-DD format" });
    }
  }

  return errors;
}

// ---------------------------------------------------------------------------
// Auto-save status
// ---------------------------------------------------------------------------

type SaveStatus = "idle" | "saving" | "saved" | "error";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface ProtocolPanelProps {
  projectId: number;
}

export function ProtocolPanel({ projectId }: ProtocolPanelProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showGuidance, setShowGuidance] = useState<string | null>(null);

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedValues = useRef<string>("");

  const { reviewConfig } = useSystematicReviewStore();

  // Pre-fill from PICO / project config
  const prefillFromConfig = useCallback(() => {
    const pico = reviewConfig?.pico;
    const prefilled: Record<string, string> = {};

    if (pico) {
      if (pico.population) prefilled.participants = pico.population;
      if (pico.intervention) prefilled.intervention = pico.intervention;
      if (pico.comparison) prefilled.comparator = pico.comparison;
      if (pico.outcome) prefilled.outcome = pico.outcome;
    }

    if (reviewConfig?.protocolRegistration) {
      prefilled.url_protocol = reviewConfig.protocolRegistration;
    }

    setValues(prefilled);
    setIsLoading(false);
  }, [reviewConfig]);

  // Load existing protocol data
  const loadProtocol = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const res = await fetch(
        `/api/systematic-review/protocol?projectId=${projectId}&format=json`
      );
      if (!res.ok) {
        if (res.status === 404) {
          // No saved protocol yet — pre-fill from project config
          prefillFromConfig();
          return;
        }
        throw new Error("Failed to load protocol data");
      }
      const data = await res.json();
      if (data.fields && typeof data.fields === "object") {
        setValues(data.fields);
        lastSavedValues.current = JSON.stringify(data.fields);
      } else {
        prefillFromConfig();
      }
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load");
      prefillFromConfig();
    } finally {
      setIsLoading(false);
    }
  }, [prefillFromConfig, projectId]);

  useEffect(() => {
    loadProtocol();
  }, [loadProtocol]);

  // Auto-save with debounce
  const triggerAutoSave = useCallback(
    (newValues: Record<string, string>) => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);

      const serialized = JSON.stringify(newValues);
      if (serialized === lastSavedValues.current) return;

      autoSaveTimer.current = setTimeout(async () => {
        setSaveStatus("saving");
        try {
          const res = await fetch("/api/systematic-review/protocol", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ projectId, fields: newValues }),
          });
          if (!res.ok) throw new Error("Save failed");
          lastSavedValues.current = serialized;
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 2500);
        } catch {
          setSaveStatus("error");
        }
      }, 1500);
    },
    [projectId]
  );

  // Update field value
  const updateField = (fieldId: string, value: string) => {
    const newValues = { ...values, [fieldId]: value };
    setValues(newValues);
    setTouchedFields((prev) => new Set(prev).add(fieldId));
    triggerAutoSave(newValues);
  };

  // Blur handler — validate the field
  const handleBlur = (fieldId: string) => {
    setTouchedFields((prev) => new Set(prev).add(fieldId));
    setErrors(validateFields(values));
  };

  // Full validation
  const validateAll = () => {
    const allTouched = new Set(PROSPERO_FIELDS.map((f) => f.id));
    setTouchedFields(allTouched);
    const errs = validateFields(values);
    setErrors(errs);
    return errs;
  };

  // Toggle section
  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  // Get error for a field (only if touched)
  const getFieldError = (fieldId: string): string | undefined => {
    if (!touchedFields.has(fieldId)) return undefined;
    return errors.find((e) => e.fieldId === fieldId)?.message;
  };

  // Progress
  const requiredFields = PROSPERO_FIELDS.filter((f) => f.required);
  const filledRequired = requiredFields.filter(
    (f) => (values[f.id] || "").trim() !== ""
  ).length;
  const progressPct =
    requiredFields.length > 0
      ? Math.round((filledRequired / requiredFields.length) * 100)
      : 0;

  // Group fields by section
  const fieldsBySection = SECTIONS.map((section) => ({
    section,
    fields: PROSPERO_FIELDS.filter((f) => f.section === section),
  }));

  // Section completion
  const sectionProgress = (section: string) => {
    const sectionFields = PROSPERO_FIELDS.filter(
      (f) => f.section === section && f.required
    );
    if (sectionFields.length === 0) return 100;
    const filled = sectionFields.filter(
      (f) => (values[f.id] || "").trim() !== ""
    ).length;
    return Math.round((filled / sectionFields.length) * 100);
  };

  return (
    <div className="sr-content space-y-6">
      {/* Header */}
      <div>
        <h2 className="sr-panel-title flex items-center gap-2">
          <Scroll weight="duotone" className="text-brand" size={24} />
          Protocol Registration
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Complete all PROSPERO fields below. Required fields are validated in
          real-time and your progress is auto-saved.
        </p>
      </div>

      {/* Progress + Auto-save indicator */}
      <div className="sr-panel">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-ink font-medium">
            {filledRequired}/{requiredFields.length} required fields completed
          </span>
          <div className="flex items-center gap-2">
            {/* Auto-save indicator */}
            <span className="flex items-center gap-1 text-xs text-ink-muted">
              {saveStatus === "saving" && (
                <>
                  <CircleNotch
                    weight="bold"
                    size={12}
                    className="animate-spin text-brand"
                  />
                  Saving...
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <CloudCheck weight="bold" size={12} className="text-green-500" />
                  Saved
                </>
              )}
              {saveStatus === "error" && (
                <>
                  <WarningCircle weight="bold" size={12} className="text-red-500" />
                  Save failed
                </>
              )}
              {saveStatus === "idle" && (
                <>
                  <FloppyDisk weight="bold" size={12} />
                  Auto-save on
                </>
              )}
            </span>

            <span
              className={cn(
                "text-xs font-semibold",
                progressPct === 100
                  ? "text-green-600 dark:text-green-400"
                  : "text-amber-600 dark:text-amber-400"
              )}
            >
              {progressPct}%
            </span>
          </div>
        </div>
        <div className="h-2 bg-surface-raised rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              progressPct === 100
                ? "bg-green-500"
                : progressPct >= 50
                ? "bg-amber-500"
                : "bg-red-500"
            )}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Validate all button */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => validateAll()}
            className="text-xs text-brand hover:underline"
          >
            Validate all fields
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-ink-muted py-8 justify-center">
          <CircleNotch weight="bold" className="animate-spin" size={18} />
          Loading protocol data...
        </div>
      )}

      {/* Load error */}
      {loadError && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400 flex items-center justify-between">
          <span>{loadError}</span>
          <button
            onClick={() => setLoadError(null)}
            className="text-red-400 hover:text-red-300"
          >
            &#x2715;
          </button>
        </div>
      )}

      {/* Sections */}
      {!isLoading && (
        <div className="space-y-4">
          {fieldsBySection.map(({ section, fields }) => {
            const isCollapsed = collapsedSections.has(section);
            const pct = sectionProgress(section);

            return (
              <div key={section} className="sr-panel">
                {/* Section header */}
                <button
                  onClick={() => toggleSection(section)}
                  className="w-full flex items-center gap-3 text-left"
                >
                  {isCollapsed ? (
                    <CaretRight
                      size={16}
                      weight="bold"
                      className="text-ink-muted flex-shrink-0"
                    />
                  ) : (
                    <CaretDown
                      size={16}
                      weight="bold"
                      className="text-ink-muted flex-shrink-0"
                    />
                  )}
                  <span className="sr-panel-title text-base flex-1">
                    {section}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      pct === 100
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    )}
                  >
                    {pct}%
                  </span>
                </button>

                {/* Section fields */}
                {!isCollapsed && (
                  <div className="mt-4 space-y-5">
                    {fields.map((field) => {
                      const fieldError = getFieldError(field.id);
                      const val = values[field.id] || "";
                      const isFilled = val.trim() !== "";

                      return (
                        <div key={field.id}>
                          {/* Label row */}
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs text-ink-muted font-mono">
                              {field.fieldNumber}.
                            </span>
                            <label className="text-sm text-ink font-medium">
                              {field.label}
                            </label>
                            {field.required && (
                              <span className="text-red-500 text-xs">*</span>
                            )}
                            {/* Status icon */}
                            {isFilled ? (
                              <CheckCircle
                                weight="fill"
                                size={14}
                                className="text-green-500"
                              />
                            ) : field.required ? (
                              <WarningCircle
                                weight="fill"
                                size={14}
                                className="text-red-500/50"
                              />
                            ) : null}
                            {/* Guidance toggle */}
                            <button
                              onClick={() =>
                                setShowGuidance(
                                  showGuidance === field.id ? null : field.id
                                )
                              }
                              className="ml-auto text-ink-muted hover:text-brand transition-colors"
                              title="Show PROSPERO guidance"
                            >
                              <Info size={14} />
                            </button>
                          </div>

                          {/* Guidance text */}
                          {showGuidance === field.id && (
                            <p className="text-xs text-ink-muted italic mb-2 pl-6 border-l-2 border-brand/20">
                              {field.guidance}
                            </p>
                          )}

                          {/* Input */}
                          {field.type === "select" ? (
                            <select
                              value={val}
                              onChange={(e) =>
                                updateField(field.id, e.target.value)
                              }
                              onBlur={() => handleBlur(field.id)}
                              className={cn(
                                "w-full px-3 py-2 bg-surface-raised border rounded text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors",
                                fieldError
                                  ? "border-red-500/60 focus:ring-red-500/20"
                                  : "border-border"
                              )}
                            >
                              <option value="">{field.placeholder}</option>
                              {field.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : field.type === "textarea" ? (
                            <textarea
                              aria-label={field.label}
                              value={val}
                              onChange={(e) =>
                                updateField(field.id, e.target.value)
                              }
                              onBlur={() => handleBlur(field.id)}
                              placeholder={field.placeholder}
                              rows={val.length > 120 ? 4 : 2}
                              className={cn(
                                "w-full px-3 py-2 bg-surface-raised border rounded text-sm text-ink placeholder:text-ink-muted resize-y focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors",
                                fieldError
                                  ? "border-red-500/60 focus:ring-red-500/20"
                                  : "border-border"
                              )}
                            />
                          ) : (
                            <input
                              aria-label={field.label}
                              type="text"
                              value={val}
                              onChange={(e) =>
                                updateField(field.id, e.target.value)
                              }
                              onBlur={() => handleBlur(field.id)}
                              placeholder={field.placeholder}
                              className={cn(
                                "w-full px-3 py-2 bg-surface-raised border rounded text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand/30 transition-colors",
                                fieldError
                                  ? "border-red-500/60 focus:ring-red-500/20"
                                  : "border-border"
                              )}
                            />
                          )}

                          {/* Validation error */}
                          {fieldError && (
                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                              <WarningCircle weight="bold" size={12} />
                              {fieldError}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer hint */}
      {!isLoading && (
        <div className="text-xs text-ink-muted p-3 bg-surface-raised rounded-lg border border-border">
          <strong>Next steps:</strong> Once all required fields are complete, go
          to the PROSPERO Export tab to generate a submission-ready document.
          Register your protocol at{" "}
          <a
            href="https://www.crd.york.ac.uk/prospero/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand hover:underline"
          >
            PROSPERO
          </a>
          .
        </div>
      )}
    </div>
  );
}
