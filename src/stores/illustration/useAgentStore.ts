/**
 * Agent Mode Store
 * Zustand store for managing AI chat interface state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  diagram?: string;
  timestamp: string;
  isError?: boolean;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  icon: string;
}

export type TemplateCategory = 'medicine' | 'biology' | 'chemistry' | 'general';

interface AgentState {
  // Messages
  messages: Message[];
  isLoading: boolean;
  currentDiagram: string | null;

  // Template state
  selectedCategory: TemplateCategory;
  templateSearchQuery: string;
  isSidebarCollapsed: boolean;

  // Preview state
  previewZoom: number;

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  clearMessages: () => void;
  setLoading: (loading: boolean) => void;
  setCurrentDiagram: (diagram: string | null) => void;
  setSelectedCategory: (category: TemplateCategory) => void;
  setTemplateSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  setPreviewZoom: (zoom: number) => void;
  generateId: () => string;
}

// Template definitions
export const TEMPLATES: Template[] = [
  // Medicine
  {
    id: 'consort',
    name: 'CONSORT',
    description: 'Clinical trial flow diagram',
    category: 'medicine',
    prompt: 'Create a CONSORT flow diagram for a randomized controlled trial with enrollment, allocation to two treatment arms, follow-up, and analysis phases.',
    icon: 'consort'
  },
  {
    id: 'prisma',
    name: 'PRISMA',
    description: 'Systematic review flow',
    category: 'medicine',
    prompt: 'Create a PRISMA flow diagram for a systematic review showing identification, screening, eligibility, and included studies.',
    icon: 'prisma'
  },
  {
    id: 'forest',
    name: 'Forest Plot',
    description: 'Meta-analysis visualization',
    category: 'medicine',
    prompt: 'Create a forest plot showing effect sizes and confidence intervals for 5 studies comparing treatment vs control.',
    icon: 'forest'
  },
  // Biology
  {
    id: 'pathway',
    name: 'Pathway',
    description: 'Biological pathway diagram',
    category: 'biology',
    prompt: 'Create a biological signaling pathway diagram showing the MAPK/ERK cascade.',
    icon: 'pathway'
  },
  {
    id: 'cell',
    name: 'Cell Diagram',
    description: 'Cellular structure',
    category: 'biology',
    prompt: 'Create a detailed cell diagram showing major organelles including nucleus, mitochondria, ER, and Golgi apparatus.',
    icon: 'cell'
  },
  {
    id: 'phylogeny',
    name: 'Phylogenetic Tree',
    description: 'Evolutionary relationships',
    category: 'biology',
    prompt: 'Create a phylogenetic tree showing evolutionary relationships between 6 species.',
    icon: 'phylogeny'
  },
  // Chemistry
  {
    id: 'reaction',
    name: 'Reaction Scheme',
    description: 'Chemical reaction pathway',
    category: 'chemistry',
    prompt: 'Create a multi-step organic synthesis reaction scheme showing reagents and conditions.',
    icon: 'reaction'
  },
  {
    id: 'structure',
    name: 'Molecular Structure',
    description: '2D chemical structure',
    category: 'chemistry',
    prompt: 'Create a 2D molecular structure diagram for caffeine with proper bond representations.',
    icon: 'structure'
  },
  // General
  {
    id: 'flowchart',
    name: 'Flowchart',
    description: 'Process flow diagram',
    category: 'general',
    prompt: 'Create a flowchart showing the steps of a research methodology.',
    icon: 'flowchart'
  },
  {
    id: 'table',
    name: 'Table',
    description: 'Data table layout',
    category: 'general',
    prompt: 'Create a formatted table layout for presenting demographic data with rows for Age, Sex, BMI, and columns for Treatment and Control groups.',
    icon: 'table'
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Chronological events',
    category: 'general',
    prompt: 'Create a horizontal timeline showing 5 key milestones in a research project.',
    icon: 'timeline'
  },
  {
    id: 'venn',
    name: 'Venn Diagram',
    description: 'Set relationships',
    category: 'general',
    prompt: 'Create a three-circle Venn diagram showing overlapping categories.',
    icon: 'venn'
  }
];

export const CATEGORY_LABELS: Record<TemplateCategory, string> = {
  medicine: 'Medicine',
  biology: 'Biology',
  chemistry: 'Chemistry',
  general: 'General'
};

export const useAgentStore = create<AgentState>()(
  persist(
    (set, get) => ({
      // Initial state
      messages: [],
      isLoading: false,
      currentDiagram: null,
      selectedCategory: 'medicine',
      templateSearchQuery: '',
      isSidebarCollapsed: false,
      previewZoom: 100,

      // Actions
      addMessage: (message) => {
        const newMessage: Message = {
          ...message,
          id: get().generateId(),
          timestamp: new Date().toISOString()
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
          currentDiagram: message.diagram || state.currentDiagram
        }));
      },

      updateMessage: (id, updates) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, ...updates } : msg
          )
        }));
      },

      clearMessages: () => {
        set({ messages: [], currentDiagram: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setCurrentDiagram: (diagram) => {
        set({ currentDiagram: diagram });
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },

      setTemplateSearchQuery: (query) => {
        set({ templateSearchQuery: query });
      },

      toggleSidebar: () => {
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed }));
      },

      setPreviewZoom: (zoom) => {
        set({ previewZoom: Math.max(25, Math.min(400, zoom)) });
      },

      generateId: () => {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
    }),
    {
      name: 'finnish-agent-storage',
      partialize: (state) => ({
        messages: state.messages.slice(-50), // Keep last 50 messages
        selectedCategory: state.selectedCategory
      })
    }
  )
);

// Selector hooks for better performance
export const useMessages = () => useAgentStore((state) => state.messages);
export const useIsLoading = () => useAgentStore((state) => state.isLoading);
export const useCurrentDiagram = () => useAgentStore((state) => state.currentDiagram);
export const usePreviewZoom = () => useAgentStore((state) => state.previewZoom);
