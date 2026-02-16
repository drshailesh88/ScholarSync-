"use client";

import { create } from "zustand";
import type {
  PDFTextSelection,
  PDFHighlight,
  PDFViewerLayout,
  NavigationTarget,
  PaperMetadata,
  PDFChatMessage,
  HighlightColor,
} from "@/lib/pdf/types";

interface PDFStore {
  // Viewer state
  currentPaperId: string | null;
  pdfUrl: string | null;
  paperMetadata: PaperMetadata | null;
  currentPage: number;
  totalPages: number;
  zoom: number;
  isOpen: boolean;
  layout: PDFViewerLayout;

  // Selection state
  currentSelection: PDFTextSelection | null;
  isSelectionMenuOpen: boolean;

  // Highlights state
  highlights: PDFHighlight[];
  activeHighlightColor: HighlightColor;

  // Chat state
  chatMessages: PDFChatMessage[];
  isChatLoading: boolean;

  // Navigation target (set when user clicks a citation)
  navigationTarget: NavigationTarget | null;

  // Temporary flash highlight (for "Show in PDF" navigation)
  flashHighlight: {
    pageNumber: number;
    rects: PDFHighlight["rects"];
  } | null;

  // Actions: Viewer
  openPDF: (
    paperId: string,
    pdfUrl: string,
    metadata?: PaperMetadata
  ) => void;
  closePDF: () => void;
  setPage: (page: number) => void;
  setTotalPages: (total: number) => void;
  setZoom: (zoom: number) => void;
  setLayout: (layout: PDFViewerLayout) => void;

  // Actions: Selection
  setSelection: (selection: PDFTextSelection | null) => void;
  setSelectionMenuOpen: (open: boolean) => void;

  // Actions: Highlights
  setHighlights: (highlights: PDFHighlight[]) => void;
  addHighlight: (highlight: PDFHighlight) => void;
  updateHighlight: (id: string, updates: Partial<PDFHighlight>) => void;
  removeHighlight: (id: string) => void;
  setActiveHighlightColor: (color: HighlightColor) => void;

  // Actions: Chat
  addChatMessage: (message: PDFChatMessage) => void;
  setChatMessages: (messages: PDFChatMessage[]) => void;
  setChatLoading: (loading: boolean) => void;
  clearChat: () => void;

  // Actions: Navigation
  navigateTo: (target: NavigationTarget) => void;
  clearNavigationTarget: () => void;
  setFlashHighlight: (
    flash: { pageNumber: number; rects: PDFHighlight["rects"] } | null
  ) => void;
}

export const usePDFStore = create<PDFStore>((set) => ({
  // Initial viewer state
  currentPaperId: null,
  pdfUrl: null,
  paperMetadata: null,
  currentPage: 1,
  totalPages: 0,
  zoom: 1.0,
  isOpen: false,
  layout: "pdf-chat",

  // Initial selection state
  currentSelection: null,
  isSelectionMenuOpen: false,

  // Initial highlights state
  highlights: [],
  activeHighlightColor: "yellow",

  // Initial chat state
  chatMessages: [],
  isChatLoading: false,

  // Initial navigation state
  navigationTarget: null,
  flashHighlight: null,

  // Viewer actions
  openPDF: (paperId, pdfUrl, metadata) =>
    set({
      currentPaperId: paperId,
      pdfUrl,
      paperMetadata: metadata ?? null,
      isOpen: true,
      currentPage: 1,
      currentSelection: null,
      isSelectionMenuOpen: false,
      chatMessages: [],
    }),

  closePDF: () =>
    set({
      isOpen: false,
      currentPaperId: null,
      pdfUrl: null,
      paperMetadata: null,
      currentPage: 1,
      totalPages: 0,
      currentSelection: null,
      isSelectionMenuOpen: false,
      highlights: [],
      chatMessages: [],
      navigationTarget: null,
      flashHighlight: null,
    }),

  setPage: (page) => set({ currentPage: page }),
  setTotalPages: (total) => set({ totalPages: total }),
  setZoom: (zoom) => set({ zoom: Math.max(0.5, Math.min(3.0, zoom)) }),
  setLayout: (layout) => set({ layout }),

  // Selection actions
  setSelection: (selection) =>
    set({
      currentSelection: selection,
      isSelectionMenuOpen: selection !== null,
    }),
  setSelectionMenuOpen: (open) => set({ isSelectionMenuOpen: open }),

  // Highlight actions
  setHighlights: (highlights) => set({ highlights }),
  addHighlight: (highlight) =>
    set((state) => ({ highlights: [...state.highlights, highlight] })),
  updateHighlight: (id, updates) =>
    set((state) => ({
      highlights: state.highlights.map((h) =>
        h.id === id ? { ...h, ...updates, updatedAt: new Date() } : h
      ),
    })),
  removeHighlight: (id) =>
    set((state) => ({
      highlights: state.highlights.filter((h) => h.id !== id),
    })),
  setActiveHighlightColor: (color) => set({ activeHighlightColor: color }),

  // Chat actions
  addChatMessage: (message) =>
    set((state) => ({ chatMessages: [...state.chatMessages, message] })),
  setChatMessages: (messages) => set({ chatMessages: messages }),
  setChatLoading: (loading) => set({ isChatLoading: loading }),
  clearChat: () => set({ chatMessages: [] }),

  // Navigation actions
  navigateTo: (target) => set({ navigationTarget: target, currentPage: target.pageNumber }),
  clearNavigationTarget: () => set({ navigationTarget: null }),
  setFlashHighlight: (flash) => set({ flashHighlight: flash }),
}));
