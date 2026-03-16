/**
 * TemplateWizard Component
 * Parametric template wizard that shows input fields for template placeholders,
 * provides live preview, and generates the final diagram.
 *
 * @module components/NewFromTemplate/TemplateWizard
 */

import React, { useState, useMemo, useCallback } from 'react';
import type { DiagramTemplate, FilledTemplate } from '@/lib/illustration/data/templates';
import { fillTemplate } from '@/lib/illustration/data/templates';

// ============================================================================
// Types
// ============================================================================

export interface TemplateWizardProps {
  /** The template to fill */
  template: DiagramTemplate;
  /** Callback when wizard is cancelled (go back to browser) */
  onBack: () => void;
  /** Callback when template is filled and created */
  onCreate: (filled: FilledTemplate) => void;
}

// ============================================================================
// Helpers
// ============================================================================

/** Convert camelCase or snake_case placeholder names to human-readable labels */
function placeholderToLabel(placeholder: string): string {
  return placeholder
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}

/** Check if a placeholder is used in a conditional block (optional) */
function isOptionalPlaceholder(template: DiagramTemplate, placeholder: string): boolean {
  const conditionalPattern = new RegExp(`\\{\\{#${placeholder}\\}\\}`);
  return conditionalPattern.test(template.promptTemplate);
}

// ============================================================================
// Styles
// ============================================================================

const wizardStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    borderBottom: '1px solid var(--border-color, #333)',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    padding: 0,
    background: 'transparent',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    cursor: 'pointer',
    color: 'var(--text-secondary, #9d9d9d)',
    transition: 'all 150ms ease',
  },
  headerInfo: {
    flex: 1,
  },
  templateTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--text-primary, #ffffff)',
    margin: 0,
  },
  templateDesc: {
    fontSize: '12px',
    color: 'var(--text-muted, #666)',
    margin: '2px 0 0',
  },
  body: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  formPanel: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto' as const,
    borderRight: '1px solid var(--border-color, #333)',
  },
  previewPanel: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto' as const,
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
  },
  sectionTitle: {
    fontSize: '11px',
    fontWeight: 600,
    color: 'var(--text-muted, #666)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: '16px',
  },
  fieldGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--text-primary, #ffffff)',
    marginBottom: '6px',
  },
  optionalBadge: {
    fontSize: '10px',
    color: 'var(--text-muted, #666)',
    fontWeight: 400,
    fontStyle: 'italic' as const,
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 150ms ease',
    boxSizing: 'border-box' as const,
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    border: '1px solid var(--border-color, #333)',
    borderRadius: '6px',
    color: 'var(--text-primary, #ffffff)',
    fontSize: '13px',
    outline: 'none',
    transition: 'border-color 150ms ease',
    resize: 'vertical' as const,
    minHeight: '60px',
    fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
  },
  previewContent: {
    fontFamily: 'monospace',
    fontSize: '12px',
    lineHeight: 1.6,
    color: 'var(--text-secondary, #9d9d9d)',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-word' as const,
  },
  mermaidPreview: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: 'var(--bg-secondary, #1e1e1e)',
    borderRadius: '8px',
    border: '1px solid var(--border-color, #333)',
  },
  mermaidCode: {
    fontFamily: 'monospace',
    fontSize: '11px',
    lineHeight: 1.5,
    color: 'var(--text-primary, #ffffff)',
    whiteSpace: 'pre-wrap' as const,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderTop: '1px solid var(--border-color, #333)',
    backgroundColor: 'var(--bg-tertiary, #2a2a2a)',
  },
  fieldCount: {
    fontSize: '13px',
    color: 'var(--text-muted, #666)',
  },
  footerButtons: {
    display: 'flex',
    gap: '12px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    border: 'none',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    color: 'var(--text-secondary, #9d9d9d)',
    border: '1px solid var(--border-color, #333)',
  },
  createButton: {
    backgroundColor: 'var(--accent-primary, #3b82f6)',
    color: '#ffffff',
  },
};

// ============================================================================
// Placeholder fields that warrant a textarea instead of input
// ============================================================================

const MULTILINE_KEYWORDS = ['tasks', 'steps', 'events', 'causes', 'values', 'structure', 'contents'];

function shouldUseTextarea(placeholder: string): boolean {
  const lower = placeholder.toLowerCase();
  return MULTILINE_KEYWORDS.some((kw) => lower.includes(kw));
}

// ============================================================================
// Component
// ============================================================================

export function TemplateWizard({ template, onBack, onCreate }: TemplateWizardProps): JSX.Element {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const p of template.placeholders) {
      initial[p] = '';
    }
    return initial;
  });

  const handleChange = useCallback((placeholder: string, value: string) => {
    setValues((prev) => ({ ...prev, [placeholder]: value }));
  }, []);

  const filledResult = useMemo(() => fillTemplate(template, values), [template, values]);

  const filledCount = useMemo(
    () => Object.values(values).filter((v) => v.trim().length > 0).length,
    [values]
  );

  const requiredPlaceholders = useMemo(
    () => template.placeholders.filter((p) => !isOptionalPlaceholder(template, p)),
    [template]
  );

  const requiredFilled = useMemo(
    () => requiredPlaceholders.filter((p) => values[p]?.trim().length > 0).length,
    [requiredPlaceholders, values]
  );

  const canCreate = requiredFilled === requiredPlaceholders.length;

  const handleCreate = useCallback(() => {
    if (canCreate) {
      onCreate(filledResult);
    }
  }, [canCreate, filledResult, onCreate]);

  return (
    <div style={wizardStyles.container}>
      {/* Header */}
      <div style={wizardStyles.header}>
        <button style={wizardStyles.backButton} onClick={onBack} aria-label="Back to templates">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div style={wizardStyles.headerInfo}>
          <h3 style={wizardStyles.templateTitle}>{template.name}</h3>
          <p style={wizardStyles.templateDesc}>{template.description}</p>
        </div>
      </div>

      {/* Body: Form + Preview */}
      <div style={wizardStyles.body}>
        {/* Form Panel */}
        <div style={wizardStyles.formPanel}>
          <div style={wizardStyles.sectionTitle}>
            Fill in template fields ({filledCount}/{template.placeholders.length})
          </div>

          {/* empty state: renders nothing when no data */}
          {template.placeholders.map((placeholder) => {
            const optional = isOptionalPlaceholder(template, placeholder);
            const useTextarea = shouldUseTextarea(placeholder);

            return (
              <div key={placeholder} style={wizardStyles.fieldGroup}>
                <label style={wizardStyles.label}>
                  {placeholderToLabel(placeholder)}
                  {optional && <span style={wizardStyles.optionalBadge}>(optional)</span>}
                </label>
                {useTextarea ? (
                  <textarea aria-label="Text area"
                    style={wizardStyles.textarea}
                    value={values[placeholder]}
                    onChange={(e) => handleChange(placeholder, e.target.value)}
                    placeholder={`Enter ${placeholderToLabel(placeholder).toLowerCase()}...`}
                    rows={3}
                  />
                ) : (
                  <input aria-label="Text input"
                    type="text"
                    style={wizardStyles.input}
                    value={values[placeholder]}
                    onChange={(e) => handleChange(placeholder, e.target.value)}
                    placeholder={`Enter ${placeholderToLabel(placeholder).toLowerCase()}...`}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Preview Panel */}
        <div style={wizardStyles.previewPanel}>
          <div style={wizardStyles.sectionTitle}>Live Preview</div>
          <div style={wizardStyles.previewContent}>{filledResult.filledPrompt}</div>

          {template.mermaidExample && (
            <div style={wizardStyles.mermaidPreview}>
              <div style={{ ...wizardStyles.sectionTitle, marginBottom: '8px' }}>
                Mermaid Example
              </div>
              <pre style={wizardStyles.mermaidCode}>{template.mermaidExample}</pre>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={wizardStyles.footer}>
        <div style={wizardStyles.fieldCount}>
          {requiredFilled}/{requiredPlaceholders.length} required fields filled
        </div>
        <div style={wizardStyles.footerButtons}>
          <button style={{ ...wizardStyles.button, ...wizardStyles.cancelButton }} onClick={onBack}>
            Back
          </button>
          <button
            style={{
              ...wizardStyles.button,
              ...wizardStyles.createButton,
              ...(canCreate ? {} : { opacity: 0.5, cursor: 'not-allowed' }),
            }}
            onClick={handleCreate}
            disabled={!canCreate}
          >
            Create Diagram
          </button>
        </div>
      </div>
    </div>
  );
}

export default TemplateWizard;
