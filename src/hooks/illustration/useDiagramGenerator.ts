/**
 * useDiagramGenerator.ts
 * React hook for using the DiagramGenerator service
 *
 * Provides a convenient React interface for diagram generation with
 * state management, error handling, and conversation tracking.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  DiagramGenerator,
  type GenerateOptions,
  type RefineOptions,
  type ExtendedGenerationResult,
} from '@/lib/illustration/ai/DiagramGenerator';
import type { ConversationContext } from '@/lib/illustration/ai/ConversationManager';
import type { ParsedPrompt, DiagramType, DiagramVersion } from '@/lib/illustration/ai/types';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Generation state
 */
export interface GenerationState {
  /** Whether generation is in progress */
  isGenerating: boolean;
  /** Whether refinement is in progress */
  isRefining: boolean;
  /** Current error message */
  error: string | null;
  /** Last generation result */
  result: ExtendedGenerationResult | null;
  /** Current SVG content */
  svg: string | null;
  /** Current DSL content (if applicable) */
  dsl: string | null;
  /** Conversation ID */
  conversationId: string | null;
  /** Current version number */
  version: number;
  /** Suggested follow-up actions */
  suggestions: string[];
}

/**
 * Generation history entry
 */
export interface HistoryEntry {
  /** Prompt used */
  prompt: string;
  /** Result SVG */
  svg: string;
  /** Version number */
  version: number;
  /** Timestamp */
  timestamp: Date;
  /** Backend used */
  backend: string;
}

/**
 * Hook options
 */
export interface UseDiagramGeneratorOptions {
  /** Auto-initialize the generator */
  autoInitialize?: boolean;
  /** Persist conversation across sessions */
  persistConversation?: boolean;
  /** Maximum history entries to keep */
  maxHistory?: number;
  /** Callback on successful generation */
  onSuccess?: (result: ExtendedGenerationResult) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
  /** Callback on generation start */
  onGenerationStart?: () => void;
}

/**
 * Hook return type
 */
export interface UseDiagramGeneratorReturn {
  // State
  state: GenerationState;
  isGenerating: boolean;
  isRefining: boolean;
  error: string | null;
  svg: string | null;
  dsl: string | null;

  // Actions
  generate: (prompt: string, options?: GenerateOptions) => Promise<ExtendedGenerationResult | null>;
  refine: (prompt: string, options?: RefineOptions) => Promise<ExtendedGenerationResult | null>;
  generateFromTemplate: (
    templateType: string,
    data?: Record<string, unknown>
  ) => Promise<ExtendedGenerationResult | null>;
  validate: (content: string, backend?: 'mermaid' | 'svg') => Promise<{
    valid: boolean;
    error?: string;
    suggestions?: string[];
  }>;
  clearError: () => void;
  reset: () => void;

  // History
  history: HistoryEntry[];
  canUndo: boolean;
  undo: () => void;
  revertToVersion: (version: number) => boolean;

  // Conversation
  conversationId: string | null;
  conversationContext: ConversationContext | null;
  clearConversation: () => void;

  // Utilities
  parsedPrompt: ParsedPrompt | null;
  suggestions: string[];
  availableBackends: string[];
}

// =============================================================================
// HOOK IMPLEMENTATION
// =============================================================================

/**
 * React hook for diagram generation
 *
 * @param options - Hook configuration options
 * @returns Diagram generation state and actions
 *
 * @example
 * ```tsx
 * function DiagramEditor() {
 *   const { generate, svg, isGenerating, error } = useDiagramGenerator();
 *
 *   const handleGenerate = async () => {
 *     await generate('Create a flowchart for user registration');
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleGenerate} disabled={isGenerating}>
 *         {isGenerating ? 'Generating...' : 'Generate'}
 *       </button>
 *       {error && <p className="error">{error}</p>}
 *       {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
 *     </div>
 *   );
 * }
 * ```
 */
export function useDiagramGenerator(
  options: UseDiagramGeneratorOptions = {}
): UseDiagramGeneratorReturn {
  const {
    autoInitialize = true,
    persistConversation = false,
    maxHistory = 20,
    onSuccess,
    onError,
    onGenerationStart,
  } = options;

  // Generator instance (persisted across renders)
  const generatorRef = useRef<DiagramGenerator | null>(null);

  // State - use lazy initializer to load persisted conversation from localStorage
  const [state, setState] = useState<GenerationState>(() => {
    let savedConversationId: string | null = null;
    if (persistConversation && typeof window !== 'undefined') {
      savedConversationId = localStorage.getItem('diagramGenerator_conversationId');
    }
    return {
      isGenerating: false,
      isRefining: false,
      error: null,
      result: null,
      svg: null,
      dsl: null,
      conversationId: savedConversationId,
      version: 0,
      suggestions: [],
    };
  });

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [parsedPrompt, setParsedPrompt] = useState<ParsedPrompt | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext | null>(null);
  const [availableBackends, setAvailableBackends] = useState<string[]>([]);

  // Initialize generator
  useEffect(() => {
    if (!generatorRef.current) {
      generatorRef.current = new DiagramGenerator();
    }

    if (autoInitialize && !initialized) {
      const generator = generatorRef.current;
      generator.initialize().then(() => {
        setInitialized(true);
        setAvailableBackends(generator.getAvailableBackends());
      });
    }

    return () => {
      // Cleanup if needed
    };
  }, [autoInitialize, initialized]);

  // Save conversation ID
  useEffect(() => {
    if (persistConversation && state.conversationId && typeof window !== 'undefined') {
      localStorage.setItem('diagramGenerator_conversationId', state.conversationId);
    }
  }, [persistConversation, state.conversationId]);

  /**
   * Sync conversation context from generator ref into state.
   * Called from callbacks after operations that change conversation state.
   */
  const syncConversationContext = useCallback((conversationId: string | null) => {
    const generator = generatorRef.current;
    if (!generator || !conversationId) {
      setConversationContext(null);
      return;
    }
    setConversationContext(generator.getConversationHistory(conversationId));
  }, []);

  /**
   * Generate a diagram from a prompt
   */
  const generate = useCallback(
    async (
      prompt: string,
      genOptions: GenerateOptions = {}
    ): Promise<ExtendedGenerationResult | null> => {
      if (!generatorRef.current) {
        setState((prev) => ({
          ...prev,
          error: 'Generator not initialized',
        }));
        return null;
      }

      onGenerationStart?.();

      setState((prev) => ({
        ...prev,
        isGenerating: true,
        error: null,
      }));

      try {
        const result = await generatorRef.current.generate(prompt, {
          ...genOptions,
          conversationId: state.conversationId ?? undefined,
          useConversationContext: true,
        });

        // Add to history
        const historyEntry: HistoryEntry = {
          prompt,
          svg: result.svg,
          version: result.metadata.version ?? state.version + 1,
          timestamp: new Date(),
          backend: result.backend,
        };

        setHistory((prev) => {
          const newHistory = [...prev, historyEntry];
          return newHistory.slice(-maxHistory);
        });

        setParsedPrompt(result.parsedPrompt ?? null);

        const newConversationId = result.conversationId ?? state.conversationId;

        setState((prev) => ({
          ...prev,
          isGenerating: false,
          result,
          svg: result.svg,
          dsl: result.dsl ?? null,
          conversationId: newConversationId,
          version: result.metadata.version ?? prev.version + 1,
          suggestions: result.suggestions ?? [],
        }));

        syncConversationContext(newConversationId);
        onSuccess?.(result);
        return result;
      } catch (e) {
        const error = e as Error;
        setState((prev) => ({
          ...prev,
          isGenerating: false,
          error: error.message,
        }));
        onError?.(error);
        return null;
      }
    },
    [state.conversationId, state.version, maxHistory, onSuccess, onError, onGenerationStart, syncConversationContext]
  );

  /**
   * Refine an existing diagram
   */
  const refine = useCallback(
    async (
      prompt: string,
      refineOptions: RefineOptions = {}
    ): Promise<ExtendedGenerationResult | null> => {
      if (!generatorRef.current) {
        setState((prev) => ({
          ...prev,
          error: 'Generator not initialized',
        }));
        return null;
      }

      if (!state.svg) {
        setState((prev) => ({
          ...prev,
          error: 'No diagram to refine. Generate a diagram first.',
        }));
        return null;
      }

      onGenerationStart?.();

      setState((prev) => ({
        ...prev,
        isRefining: true,
        error: null,
      }));

      try {
        const result = await generatorRef.current.refine(state.svg, prompt, {
          ...refineOptions,
          conversationId: state.conversationId ?? undefined,
        });

        // Add to history
        const historyEntry: HistoryEntry = {
          prompt: `Refine: ${prompt}`,
          svg: result.svg,
          version: result.metadata.version ?? state.version + 1,
          timestamp: new Date(),
          backend: result.backend,
        };

        setHistory((prev) => {
          const newHistory = [...prev, historyEntry];
          return newHistory.slice(-maxHistory);
        });

        setParsedPrompt(result.parsedPrompt ?? null);

        setState((prev) => ({
          ...prev,
          isRefining: false,
          result,
          svg: result.svg,
          dsl: result.dsl ?? prev.dsl,
          version: result.metadata.version ?? prev.version + 1,
          suggestions: result.suggestions ?? [],
        }));

        syncConversationContext(state.conversationId);
        onSuccess?.(result);
        return result;
      } catch (e) {
        const error = e as Error;
        setState((prev) => ({
          ...prev,
          isRefining: false,
          error: error.message,
        }));
        onError?.(error);
        return null;
      }
    },
    [state.svg, state.conversationId, state.version, maxHistory, onSuccess, onError, onGenerationStart, syncConversationContext]
  );

  /**
   * Generate from a template
   */
  const generateFromTemplate = useCallback(
    async (
      templateType: string,
      data?: Record<string, unknown>
    ): Promise<ExtendedGenerationResult | null> => {
      if (!generatorRef.current) {
        setState((prev) => ({
          ...prev,
          error: 'Generator not initialized',
        }));
        return null;
      }

      onGenerationStart?.();

      setState((prev) => ({
        ...prev,
        isGenerating: true,
        error: null,
      }));

      try {
        const result = await generatorRef.current.generateFromTemplate(
          templateType as DiagramType,
          data
        );

        // Add to history
        const historyEntry: HistoryEntry = {
          prompt: `Template: ${templateType}`,
          svg: result.svg,
          version: result.metadata.version ?? state.version + 1,
          timestamp: new Date(),
          backend: result.backend,
        };

        setHistory((prev) => {
          const newHistory = [...prev, historyEntry];
          return newHistory.slice(-maxHistory);
        });

        const newConversationId = result.conversationId ?? state.conversationId;

        setState((prev) => ({
          ...prev,
          isGenerating: false,
          result,
          svg: result.svg,
          dsl: result.dsl ?? null,
          conversationId: newConversationId,
          version: result.metadata.version ?? prev.version + 1,
          suggestions: result.suggestions ?? [],
        }));

        syncConversationContext(newConversationId);
        onSuccess?.(result);
        return result;
      } catch (e) {
        const error = e as Error;
        setState((prev) => ({
          ...prev,
          isGenerating: false,
          error: error.message,
        }));
        onError?.(error);
        return null;
      }
    },
    [state.conversationId, state.version, maxHistory, onSuccess, onError, onGenerationStart, syncConversationContext]
  );

  /**
   * Validate diagram content
   */
  const validate = useCallback(
    async (
      content: string,
      backend: 'mermaid' | 'svg' = 'mermaid'
    ): Promise<{ valid: boolean; error?: string; suggestions?: string[] }> => {
      if (!generatorRef.current) {
        return { valid: false, error: 'Generator not initialized' };
      }

      return generatorRef.current.validate(content, backend);
    },
    []
  );

  /**
   * Clear current error
   */
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  /**
   * Reset all state
   */
  const reset = useCallback(() => {
    setState({
      isGenerating: false,
      isRefining: false,
      error: null,
      result: null,
      svg: null,
      dsl: null,
      conversationId: null,
      version: 0,
      suggestions: [],
    });
    setHistory([]);
    setParsedPrompt(null);
    setConversationContext(null);

    if (generatorRef.current) {
      generatorRef.current.clearConversation();
    }

    if (persistConversation && typeof window !== 'undefined') {
      localStorage.removeItem('diagramGenerator_conversationId');
    }
  }, [persistConversation]);

  /**
   * Undo last change
   */
  const undo = useCallback(() => {
    if (history.length < 2) {
      return;
    }

    const previousEntry = history[history.length - 2];
    setState((prev) => ({
      ...prev,
      svg: previousEntry.svg,
      version: previousEntry.version,
    }));

    setHistory((prev) => prev.slice(0, -1));
  }, [history]);

  /**
   * Revert to specific version
   */
  const revertToVersion = useCallback(
    (version: number): boolean => {
      if (!generatorRef.current || !state.conversationId) {
        return false;
      }

      const success = generatorRef.current
        .getConversationHistory(state.conversationId)
        ?.diagramHistory.find((v: DiagramVersion) => v.version === version);

      if (success) {
        setState((prev) => ({
          ...prev,
          svg: success.svg,
          dsl: success.dsl ?? prev.dsl,
          version: success.version,
        }));
        return true;
      }

      return false;
    },
    [state.conversationId]
  );

  /**
   * Clear conversation history
   */
  const clearConversation = useCallback(() => {
    if (generatorRef.current && state.conversationId) {
      generatorRef.current.clearConversation(state.conversationId);
    }

    setState((prev) => ({
      ...prev,
      conversationId: null,
      version: 0,
    }));

    setHistory([]);
    setConversationContext(null);

    if (persistConversation && typeof window !== 'undefined') {
      localStorage.removeItem('diagramGenerator_conversationId');
    }
  }, [state.conversationId, persistConversation]);

  return {
    // State
    state,
    isGenerating: state.isGenerating,
    isRefining: state.isRefining,
    error: state.error,
    svg: state.svg,
    dsl: state.dsl,

    // Actions
    generate,
    refine,
    generateFromTemplate,
    validate,
    clearError,
    reset,

    // History
    history,
    canUndo: history.length > 1,
    undo,
    revertToVersion,

    // Conversation
    conversationId: state.conversationId,
    conversationContext,
    clearConversation,

    // Utilities
    parsedPrompt,
    suggestions: state.suggestions,
    availableBackends,
  };
}

// Default export
export default useDiagramGenerator;
