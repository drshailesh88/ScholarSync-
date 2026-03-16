"use client";
/**
 * AgentMode Component
 *
 * Main Agent Mode layout with:
 * - Left sidebar with template gallery
 * - Center chat area with messages
 * - Right preview pane showing generated diagram
 * - Bottom prompt input bar
 *
 * Uses Zustand stores for state management
 * Calls /api/illustration/generate for multi-backend diagram generation
 * Responsive layout
 */

import React, { startTransition, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorBoundary, IllustrationErrorFallback } from '@/components/illustration/ErrorBoundary';
import { useAgentStore } from '@/stores/illustration/useAgentStore';
import { TemplateGallery } from './TemplateGallery';
import { ChatHistory } from './ChatHistory';
import { PromptInput } from './PromptInput';
import { DiagramPreview } from './DiagramPreview';

const AGENT_IMPORT_SESSION_KEY = 'scholarsync-illustration-agent-import';

// ===========================================================================
// DOMAIN DETECTION
// ===========================================================================

/**
 * Detect domain from prompt for specialized illustration generation
 * Maps keywords to domain-specific prompt enhancement
 */
function detectDomainFromPrompt(prompt: string): string | undefined {
  const lower = prompt.toLowerCase();

  // Cardiology
  if (/heart|cardiac|coronary|ecg|ekg|arrhythmia|myocardial|ventricular|atrial|cardiovascular/.test(lower)) {
    return 'cardiology';
  }

  // Neuroscience/Neurology
  if (/brain|neural|neuron|synapse|cortex|dementia|alzheimer|parkinson|multiple sclerosis|stroke/.test(lower)) {
    return 'neurology';
  }

  // Pulmonology
  if (/lung|pulmonary|respiratory|breath|airway|alveol|pneumonia|copd|asthma/.test(lower)) {
    return 'pulmonology';
  }

  // Gastroenterology
  if (/stomach|intestine|bowel|liver|pancreas|digestive|gi |gastro|esophagus|colon/.test(lower)) {
    return 'gastroenterology';
  }

  // Endocrinology
  if (/hormone|thyroid|diabetes|insulin|glucose|endocrine|pituitary|adrenal|metabolic/.test(lower)) {
    return 'endocrinology';
  }

  // Nephrology
  if (/kidney|renal|nephron|dialysis|urine|bladder|urology|ureter/.test(lower)) {
    return 'nephrology';
  }

  // Hematology/Oncology
  if (/blood|leukemia|cancer|tumor|hemoglobin|anemia|clot|coagulation|lymphoma/.test(lower)) {
    return 'hematology-oncology';
  }

  // Infectious Disease
  if (/virus|bacteria|infection|antibiotic|viral|bacterial|sepsis|pathogen|microbe/.test(lower)) {
    return 'infectious-disease';
  }

  // Orthopedics
  if (/bone|fracture|skeletal|muscle|tendon|ligament|joint|spine|orthopedic/.test(lower)) {
    return 'orthopedics';
  }

  // Dermatology
  if (/skin|dermal|rash|lesion|epidermis|dermatitis/.test(lower)) {
    return 'dermatology';
  }

  // Ophthalmology
  if (/eye|vision|ocular|retina|cornea|glaucoma|cataract/.test(lower)) {
    return 'ophthalmology';
  }

  // Radiology
  if (/x-ray|ct|mri|ultrasound|imaging|radiologic/.test(lower)) {
    return 'radiology';
  }

  // Physiology
  if (/physiology|homeostasis|mechanism|feedback|regulation|physiologic/.test(lower)) {
    return 'physiology';
  }

  // Biochemistry
  if (/protein|enzyme|metabolism|amino acid|biochemical|pathway|reaction/.test(lower)) {
    return 'biochemistry';
  }

  // Pharmacology
  if (/drug|medication|pharmacokinetic|pharmacodynamic|dose|therapeutic/.test(lower)) {
    return 'pharmacology';
  }

  // Biology/Cell Biology
  if (/cell|mitochondria|nucleus|organelle|membrane|cytoplasm|cellular/.test(lower)) {
    return 'cell-biology';
  }

  // Molecular Biology
  if (/dna|rna|gene|protein|transcription|translation|mutation|genetic/.test(lower)) {
    return 'molecular-biology';
  }

  // Immunology
  if (/immune|antibody|antigen|lymphocyte|inflammation/.test(lower)) {
    return 'immunology';
  }

  // Emergency Medicine
  if (/emergency|trauma|critical|acute|resuscitation/.test(lower)) {
    return 'emergency-medicine';
  }

  // OB/GYN
  if (/pregnancy|obstetric|gynecologic|fetal|maternal|uterus/.test(lower)) {
    return 'obgyn';
  }

  // Pediatrics
  if (/pediatric|neonatal|infant|child|adolescent/.test(lower)) {
    return 'pediatrics';
  }

  // Psychiatry
  if (/psychiatric|mental|depression|anxiety|schizophrenia|psychological/.test(lower)) {
    return 'psychiatry';
  }

  // Surgery
  if (/surgery|surgical|incision|operation|procedure/.test(lower)) {
    return 'surgery';
  }

  // Anesthesiology
  if (/anesthesia|anesthetic|pain management/.test(lower)) {
    return 'anesthesiology';
  }

  // Rheumatology
  if (/arthritis|rheumatoid|lupus|autoimmune|joint pain/.test(lower)) {
    return 'rheumatology';
  }

  // ENT (Otolaryngology)
  if (/ear|nose|throat|sinus|tonsil|larynx|otolaryngolog/.test(lower)) {
    return 'ent';
  }

  // Physics
  if (/physics|force|energy|wave|quantum|mechanic|optics|electric|magnetic/.test(lower)) {
    return 'physics';
  }

  // Chemistry
  if (/chemical|molecule|bond|reaction|organic|inorganic|analytic/.test(lower)) {
    return 'chemistry';
  }

  // Computer Science
  if (/algorithm|data structure|software|programming|network|database|computing/.test(lower)) {
    return 'computer-science';
  }

  // Engineering
  if (/engineering|mechanical|electrical|civil|system|control|design/.test(lower)) {
    return 'engineering';
  }

  // Mathematics
  if (/mathematical|equation|calculus|algebra|geometry|statistics|probability/.test(lower)) {
    return 'mathematics';
  }

  // Ecology
  if (/ecosystem|environment|climate|habitat|species|population|ecological/.test(lower)) {
    return 'ecology';
  }

  // Zoology
  if (/animal|zoology|insect|entomology|vet|veterinary/.test(lower)) {
    return 'zoology';
  }

  // Botany
  if (/plant|botany|flora|photosynthesis|leaf|root|flower/.test(lower)) {
    return 'botany';
  }

  // Astronomy
  if (/star|planet|galaxy|solar|astronom|cosmic|space|universe/.test(lower)) {
    return 'astronomy';
  }

  // Geology
  if (/geolog|rock|mineral|earth|crust|volcan|earthquake|seismic/.test(lower)) {
    return 'geology';
  }

  // Meteorology
  if (/weather|climate|meteorolog|atmospheric|forecast|temperature|humidity/.test(lower)) {
    return 'meteorology';
  }

  // Oceanography
  if (/ocean|marine|sea|water|oceanograph|nautical|aquatic/.test(lower)) {
    return 'oceanography';
  }

  // Agriculture
  if (/agricultur|farm|crop|soil|harvest|livestock|agronom/.test(lower)) {
    return 'agriculture';
  }

  // Forensics
  if (/forensic|evidence|crime|legal|autopsy|pathology legal/.test(lower)) {
    return 'forensics';
  }

  // Aerospace
  if (/aerospace|aircraft|rocket|satellite|aviation|flight/.test(lower)) {
    return 'aerospace';
  }

  // Biomedical Engineering
  if (/biomedical|bioengineering|medical device|prosthet|implant|biomaterial/.test(lower)) {
    return 'biomedical-engineering';
  }

  return undefined;
}

// ===========================================================================
// API INTERFACE
// ===========================================================================

interface IllustrationGenerateRequest {
  prompt: string;
  backend: 'mermaid' | 'svg' | 'gemini' | 'auto';
  domain?: string;
  style?: 'flat' | 'detailed' | 'schematic' | 'photorealistic';
  geminiModel?: 'pro' | 'flash';
  slideContext?: string | null;
  existingDiagram?: string;
}

interface IllustrationGenerateResponse {
  illustration?: {
    content: string;
    backend: string;
    format: string;
    caption?: string;
    domain?: string;
    pathCount?: number;
    colorPalette?: string[];
    rasterPreview?: string;
    vectorized?: boolean;
  };
  error?: string;
  details?: string;
}

interface AgentModeProps {
  onSendToEditor?: (svg: string) => void;
}

function AgentModeSkeleton(): JSX.Element {
  const blockStyle: React.CSSProperties = {
    borderRadius: '12px',
    backgroundColor: 'var(--bg-secondary)',
    opacity: 0.8,
  };

  return (
    <div style={styles.container} aria-label="Agent mode loading">
      <aside style={{ ...styles.sidebarSkeleton, ...blockStyle }} />
      <main style={styles.main}>
        <div style={{ ...styles.chatContainer, gap: '12px' }}>
          <div style={{ ...styles.headerSkeleton, ...blockStyle }} />
          {/* empty state: renders nothing when no data */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`agent-skeleton-${index}`}
              style={{
                ...styles.messageSkeleton,
                ...blockStyle,
                width: index % 2 === 0 ? '72%' : '58%',
                alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
              }}
            />
          ))}
          <div style={{ ...styles.promptSkeleton, ...blockStyle }} />
        </div>
      </main>
      <aside style={{ ...styles.previewPane, ...blockStyle }} />
    </div>
  );
}

export const AgentMode: React.FC<AgentModeProps> = ({ onSendToEditor }) => {
  const router = useRouter();
  const [showPreviewPane, setShowPreviewPane] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    addMessage,
    setLoading,
    currentDiagram,
    messages
  } = useAgentStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  /**
   * Handle sending a prompt to the illustration generation API
   * Uses multi-backend auto-routing for optimal generation method
   */
  const handleSendPrompt = useCallback(async (prompt: string, options?: {
    style?: 'flat' | 'detailed' | 'schematic' | 'photorealistic';
    model?: 'pro' | 'flash';
  }) => {
    // Add user message
    addMessage({
      role: 'user',
      content: prompt
    });

    // Set loading state
    setLoading(true);
    abortControllerRef.current = new AbortController();

    try {
      // Detect domain from prompt for specialized generation
      const domain = detectDomainFromPrompt(prompt);

      // Determine style based on prompt keywords
      let style: 'flat' | 'detailed' | 'schematic' | 'photorealistic' = options?.style || 'flat';
      const lowerPrompt = prompt.toLowerCase();

      if (lowerPrompt.includes('detailed') || lowerPrompt.includes('intricate') || lowerPrompt.includes('complex')) {
        style = 'detailed';
      } else if (lowerPrompt.includes('schematic') || lowerPrompt.includes('technical') || lowerPrompt.includes('diagram')) {
        style = 'schematic';
      } else if (lowerPrompt.includes('realistic') || lowerPrompt.includes('photorealistic') || lowerPrompt.includes('lifelike')) {
        style = 'photorealistic';
      }

      // Prepare request to API
      const requestBody: IllustrationGenerateRequest = {
        prompt,
        backend: 'auto', // Let API auto-route to best backend
        domain,
        style,
        geminiModel: options?.model || 'flash', // Default to flash for speed
      };

      // Call the illustration generation API
      const response = await fetch('/api/illustration/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.details || errorData.error || `HTTP ${response.status}`);
      }

      const data: IllustrationGenerateResponse = await response.json();

      if (!data.illustration) {
        throw new Error(data.details || data.error || 'No illustration generated');
      }

      // Build response text based on backend used
      let responseText = data.illustration.caption || `I've generated a ${data.illustration.format} illustration using the ${data.illustration.backend} backend.`;

      if (data.illustration.vectorized) {
        responseText += ' The image has been vectorized for easy editing.';
      }

      if (data.illustration.pathCount !== undefined) {
        responseText += ` This illustration contains ${data.illustration.pathCount} editable paths.`;
      }

      // Add backend-specific hints
      if (data.illustration.backend === 'mermaid') {
        responseText += ' You can edit the diagram structure in the Editor mode.';
      } else if (data.illustration.backend === 'gemini') {
        responseText += ' The raster preview is available for reference.';
      }

      // Add assistant message with diagram
      addMessage({
        role: 'assistant',
        content: responseText,
        diagram: data.illustration.content,
      });
    } catch (error) {
      if ((error as Error).message !== 'Generation cancelled' && (error as Error).name !== 'AbortError') {
        addMessage({
          role: 'assistant',
          content: `Sorry, I encountered an error: ${(error as Error).message}. Please try again.`,
          isError: true
        });
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [addMessage, setLoading]);

  // Handle stop generation
  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Handle template selection
  const handleSelectTemplate = useCallback((prompt: string) => {
    handleSendPrompt(prompt);
  }, [handleSendPrompt]);

  // Handle send to editor
  const handleSendToEditor = useCallback((svg: string) => {
    if (onSendToEditor) {
      onSendToEditor(svg);
      return;
    }

    sessionStorage.setItem(AGENT_IMPORT_SESSION_KEY, svg);
    startTransition(() => {
      router.push('/illustrate/editor?import=agent');
    });
  }, [onSendToEditor, router]);

  // Handle regenerate
  const handleRegenerate = useCallback((messageId: string) => {
    const msgIndex = messages.findIndex((m) => m.id === messageId);
    if (msgIndex > 0) {
      const userMessage = messages[msgIndex - 1];
      if (userMessage.role === 'user') {
        handleSendPrompt(userMessage.content);
      }
    }
  }, [messages, handleSendPrompt]);

  // Handle prompt suggestion from welcome screen
  const handlePromptSuggestion = useCallback((prompt: string) => {
    handleSendPrompt(prompt);
  }, [handleSendPrompt]);

  if (!isHydrated) {
    return <AgentModeSkeleton />;
  }

  return (
    <ErrorBoundary
      scope="Agent mode"
      fullScreen
      fallback={({ error, reset, scope }) => (
        <IllustrationErrorFallback
          error={error}
          reset={reset}
          scope={scope}
          fullScreen
          description="The illustration agent failed while rendering this workspace."
        />
      )}
    >
      <div style={styles.container}>
        <TemplateGallery onSelectTemplate={handleSelectTemplate} />

        <main style={styles.main}>
          <div style={styles.chatContainer}>
            <ChatHistory
              onSendToEditor={handleSendToEditor}
              onRegenerate={handleRegenerate}
              onPromptSuggestion={handlePromptSuggestion}
            />
            <PromptInput onSend={handleSendPrompt} onStop={handleStop} />
          </div>
        </main>

        {showPreviewPane && currentDiagram && (
          <aside style={styles.previewPane}>
            <div style={styles.previewHeader}>
              <h3 style={styles.previewTitle}>Preview</h3>
              <button
                type="button"
                onClick={() => setShowPreviewPane(false)}
                style={styles.closeBtn}
                title="Close preview"
                aria-label="Close preview"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div style={styles.previewContent}>
              <DiagramPreview svg={currentDiagram} />
            </div>
          </aside>
        )}
      </div>
    </ErrorBoundary>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
    background: 'var(--bg-primary)'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-primary)',
    overflow: 'hidden'
  },
  chatContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    margin: '0 auto',
    width: '100%',
    padding: 'var(--spacing-lg)',
    overflow: 'hidden'
  },
  sidebarSkeleton: {
    width: '320px',
    margin: '16px',
  },
  headerSkeleton: {
    height: '56px',
  },
  messageSkeleton: {
    height: '96px',
  },
  promptSkeleton: {
    marginTop: 'auto',
    height: '72px',
  },
  previewPane: {
    width: '350px',
    background: 'var(--bg-secondary)',
    borderLeft: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  previewHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-md)',
    borderBottom: '1px solid var(--border-color)'
  },
  previewTitle: {
    fontSize: 'var(--font-size-lg)',
    fontWeight: 500,
    color: 'var(--text-primary)',
    margin: 0
  },
  closeBtn: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all var(--transition-fast)'
  },
  previewContent: {
    flex: 1,
    padding: 'var(--spacing-md)',
    overflow: 'auto'
  }
};

// Add responsive styles (SSR-safe - only in browser)
if (typeof window !== 'undefined') {
  const responsiveStyles = document.createElement('style');
  responsiveStyles.textContent = `
    @media (max-width: 1200px) {
      .agent-preview-pane {
        width: 300px;
      }
    }
    @media (max-width: 992px) {
      .agent-sidebar {
        display: none;
      }
      .agent-preview-pane {
        display: none;
      }
    }
    @media (max-width: 768px) {
      .agent-chat-container {
        padding: var(--spacing-md);
      }
    }
  `;
  document.head.appendChild(responsiveStyles);
}

export default AgentMode;
