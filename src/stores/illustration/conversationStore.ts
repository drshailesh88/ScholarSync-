/**
 * FINNISH Conversation Store
 * Zustand store for managing AI conversation state and diagram generation
 *
 * @module store/conversationStore
 */

import { create } from 'zustand';
import { subscribeWithSelector, devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
  ConversationState,
  ConversationStore,
  Message,
  DiagramGeneration,
  MessageRole,
} from '@/lib/illustration/types/index';

// ============================================================================
// Constants
// ============================================================================

const MAX_DIAGRAM_HISTORY = 20;
const MAX_MESSAGES = 100;
const STORAGE_KEY = 'finnish-conversation';

// ============================================================================
// Initial State
// ============================================================================

const initialState: ConversationState = {
  messages: [],
  currentDiagram: null,
  diagramHistory: [],
  isGenerating: false,
  error: null,
};

// ============================================================================
// Store Implementation
// ============================================================================

/**
 * Conversation store for managing AI interactions and diagram generation
 *
 * @example
 * ```tsx
 * import { useConversationStore } from '@/store';
 *
 * function ChatPanel() {
 *   const messages = useConversationStore((state) => state.messages);
 *   const addMessage = useConversationStore((state) => state.addMessage);
 *   const isGenerating = useConversationStore((state) => state.isGenerating);
 *
 *   const handleSubmit = (text: string) => {
 *     addMessage({
 *       role: 'user',
 *       content: [{ type: 'text', text }],
 *     });
 *   };
 *
 *   return (
 *     <div>
 *       {messages.map((msg) => (
 *         <MessageBubble key={msg.id} message={msg} />
 *       ))}
 *       {isGenerating && <LoadingIndicator />}
 *     </div>
 *   );
 * }
 * ```
 */
export const useConversationStore = create<ConversationStore>()(
  devtools(
    persist(
      subscribeWithSelector((set, _get) => ({
        ...initialState,

        // ========================================================================
        // Message Management
        // ========================================================================

        /**
         * Add a new message to the conversation
         * @param message - Message data without id and timestamp
         */
        addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => {
          const newMessage: Message = {
            ...message,
            id: uuidv4(),
            timestamp: Date.now(),
          };

          set(
            (state) => {
              let messages = [...state.messages, newMessage];

              // Trim messages if exceeding max
              if (messages.length > MAX_MESSAGES) {
                messages = messages.slice(-MAX_MESSAGES);
              }

              return { messages, error: null };
            },
            false,
            'addMessage'
          );
        },

        /**
         * Update an existing message
         * @param id - Message ID to update
         * @param updates - Partial message updates
         */
        updateMessage: (id: string, updates: Partial<Message>) => {
          set(
            (state) => ({
              messages: state.messages.map((msg) =>
                msg.id === id ? { ...msg, ...updates } : msg
              ),
            }),
            false,
            'updateMessage'
          );
        },

        /**
         * Remove a message from the conversation
         * @param id - Message ID to remove
         */
        removeMessage: (id: string) => {
          set(
            (state) => ({
              messages: state.messages.filter((msg) => msg.id !== id),
            }),
            false,
            'removeMessage'
          );
        },

        /**
         * Clear all messages from the conversation
         */
        clearMessages: () => {
          set({ messages: [] }, false, 'clearMessages');
        },

        // ========================================================================
        // Diagram Management
        // ========================================================================

        /**
         * Set the current diagram being generated/edited
         * @param diagram - DiagramGeneration object or null
         */
        setCurrentDiagram: (diagram: DiagramGeneration | null) => {
          set({ currentDiagram: diagram }, false, 'setCurrentDiagram');
        },

        /**
         * Update the current diagram with partial changes
         * @param updates - Partial DiagramGeneration updates
         */
        updateCurrentDiagram: (updates: Partial<DiagramGeneration>) => {
          set(
            (state) => {
              if (!state.currentDiagram) return state;

              return {
                currentDiagram: {
                  ...state.currentDiagram,
                  ...updates,
                  updatedAt: Date.now(),
                },
              };
            },
            false,
            'updateCurrentDiagram'
          );
        },

        /**
         * Add a completed diagram to history
         * @param diagram - DiagramGeneration to add to history
         */
        addToHistory: (diagram: DiagramGeneration) => {
          set(
            (state) => {
              let history = [diagram, ...state.diagramHistory];

              // Remove duplicates by ID
              history = history.filter(
                (d, index, self) =>
                  index === self.findIndex((t) => t.id === d.id)
              );

              // Trim history if exceeding max
              if (history.length > MAX_DIAGRAM_HISTORY) {
                history = history.slice(0, MAX_DIAGRAM_HISTORY);
              }

              return { diagramHistory: history };
            },
            false,
            'addToHistory'
          );
        },

        /**
         * Clear all diagram history
         */
        clearDiagramHistory: () => {
          set({ diagramHistory: [] }, false, 'clearDiagramHistory');
        },

        // ========================================================================
        // Status Management
        // ========================================================================

        /**
         * Set the generating status
         * @param generating - Whether generation is in progress
         */
        setGenerating: (generating: boolean) => {
          set({ isGenerating: generating }, false, 'setGenerating');
        },

        /**
         * Set an error message
         * @param error - Error message or null to clear
         */
        setError: (error: string | null) => {
          set({ error }, false, 'setError');
        },
      })),
      {
        name: STORAGE_KEY,
        partialize: (state) => ({
          // Only persist messages and diagram history, not transient state
          messages: state.messages.slice(-20), // Only persist last 20 messages
          diagramHistory: state.diagramHistory,
        }),
      }
    ),
    {
      name: 'finnish-conversation-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Create a user message
 * @param text - Message text
 * @returns Message object ready to add
 */
export const createUserMessage = (
  text: string
): Omit<Message, 'id' | 'timestamp'> => ({
  role: 'user' as MessageRole,
  content: [{ type: 'text', text }],
});

/**
 * Create an assistant message
 * @param text - Message text
 * @param metadata - Optional metadata
 * @returns Message object ready to add
 */
export const createAssistantMessage = (
  text: string,
  metadata?: Message['metadata']
): Omit<Message, 'id' | 'timestamp'> => ({
  role: 'assistant' as MessageRole,
  content: [{ type: 'text', text }],
  metadata,
});

/**
 * Create a system message
 * @param text - Message text
 * @returns Message object ready to add
 */
export const createSystemMessage = (
  text: string
): Omit<Message, 'id' | 'timestamp'> => ({
  role: 'system' as MessageRole,
  content: [{ type: 'text', text }],
});

/**
 * Create a new diagram generation object
 * @param prompt - User's diagram prompt
 * @param type - Type of diagram
 * @returns DiagramGeneration object
 */
export const createDiagram = (
  prompt: string,
  type: DiagramGeneration['type'] = 'custom'
): DiagramGeneration => ({
  id: uuidv4(),
  prompt,
  type,
  status: 'pending',
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

// ============================================================================
// Selector Hooks
// ============================================================================

/**
 * Hook to get all messages
 */
export const useMessages = () =>
  useConversationStore((state) => state.messages);

/**
 * Hook to get the current diagram
 */
export const useCurrentDiagram = () =>
  useConversationStore((state) => state.currentDiagram);

/**
 * Hook to get diagram history
 */
export const useDiagramHistory = () =>
  useConversationStore((state) => state.diagramHistory);

/**
 * Hook to get generation status
 */
export const useGenerationStatus = () =>
  useConversationStore((state) => ({
    isGenerating: state.isGenerating,
    error: state.error,
    hasError: state.error !== null,
  }));

/**
 * Hook to get latest message
 */
export const useLatestMessage = () =>
  useConversationStore((state) =>
    state.messages.length > 0
      ? state.messages[state.messages.length - 1]
      : null
  );

/**
 * Hook to get message count
 */
export const useMessageCount = () =>
  useConversationStore((state) => state.messages.length);

/**
 * Hook to check if conversation has messages
 */
export const useHasMessages = () =>
  useConversationStore((state) => state.messages.length > 0);

// ============================================================================
// Store Utilities
// ============================================================================

/**
 * Reset the conversation store to initial state
 */
export const resetConversationStore = () => {
  useConversationStore.setState(initialState);
};

/**
 * Get the current store state (for debugging)
 */
export const getConversationState = () => useConversationStore.getState();

/**
 * Subscribe to store changes
 * @param selector - State selector function
 * @param callback - Callback when selected state changes
 * @returns Unsubscribe function
 */
export const subscribeToConversation = <T>(
  selector: (state: ConversationStore) => T,
  callback: (value: T, prevValue: T) => void
) => {
  return useConversationStore.subscribe(selector, callback);
};

/**
 * Clear persisted conversation data from storage
 */
export const clearPersistedConversation = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};
