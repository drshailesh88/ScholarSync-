"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  loadStudioDocument,
  saveDocumentContent,
  updateDocumentTitle,
  listUserProjects,
} from "@/lib/actions/documents";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type SaveStatus = "idle" | "unsaved" | "saving" | "saved" | "error";

interface SectionData {
  id: number;
  document_id: number;
  section_type: string | null;
  title: string | null;
  sort_order: number | null;
  editor_content: unknown;
  plain_text_content: string | null;
  word_count: number | null;
}

interface StudioDocument {
  id: number;
  project_id: number;
  title: string;
  sections: SectionData[];
}

interface UseStudioDocumentReturn {
  /** The loaded document (null while loading) */
  document: StudioDocument | null;
  /** Which section we're persisting into */
  activeSectionId: number | null;
  /** Initial editor content to pass to TipTap */
  initialContent: Record<string, unknown> | null;
  /** Document title (local state, synced to DB on save) */
  docTitle: string;
  setDocTitle: (title: string) => void;
  /** Current save status for the indicator */
  saveStatus: SaveStatus;
  /** Timestamp of last successful save */
  lastSavedAt: Date | null;
  /** Whether the document is loading */
  isLoading: boolean;
  /** Error message if something went wrong */
  error: string | null;
  /** Called by the editor's onUpdate (debounce is handled in the editor) */
  handleEditorUpdate: (data: {
    editor_content: Record<string, unknown>;
    plain_text_content: string;
    word_count: number;
  }) => void;
  /** Available projects for the project selector */
  projects: { id: number; title: string }[];
  /** Currently selected project ID */
  selectedProjectId: number | null;
  /** Switch to a different project */
  selectProject: (projectId: number) => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------
export function useStudioDocument(
  initialProjectId?: number | null
): UseStudioDocumentReturn {
  // Document state
  const [document, setDocument] = useState<StudioDocument | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [initialContent, setInitialContent] = useState<Record<string, unknown> | null>(null);
  const [docTitle, setDocTitleState] = useState("Untitled Document");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Save state
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Project state
  const [projects, setProjects] = useState<{ id: number; title: string }[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    initialProjectId ?? null
  );

  // Refs for debounced title save
  const titleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const documentRef = useRef<StudioDocument | null>(null);
  documentRef.current = document;

  // Track whether this is the first load to avoid re-setting editor content
  const hasLoadedRef = useRef(false);

  // -----------------------------------------------------------------------
  // Load projects list
  // -----------------------------------------------------------------------
  useEffect(() => {
    listUserProjects()
      .then((p) => setProjects(p))
      .catch(() => {});
  }, []);

  // -----------------------------------------------------------------------
  // Load document from DB
  // -----------------------------------------------------------------------
  const loadDocument = useCallback(async (projectId?: number | null) => {
    setIsLoading(true);
    setError(null);
    try {
      const doc = await loadStudioDocument(projectId);
      if (!doc) {
        setError("Failed to load or create document.");
        setIsLoading(false);
        return;
      }

      const studioDoc: StudioDocument = {
        id: doc.id,
        project_id: doc.project_id,
        title: doc.title,
        sections: doc.sections,
      };

      setDocument(studioDoc);
      setDocTitleState(doc.title);
      setSelectedProjectId(doc.project_id);

      // Determine initial content from the first section with editor_content,
      // or fall back to the first section
      const contentSection =
        doc.sections.find((s) => s.editor_content) || doc.sections[0];

      if (contentSection) {
        setActiveSectionId(contentSection.id);
        if (contentSection.editor_content) {
          setInitialContent(contentSection.editor_content as Record<string, unknown>);
        } else {
          setInitialContent(null);
        }
      }

      // If this is the very first load, also refresh the projects list
      // (in case the load created a new project)
      if (!hasLoadedRef.current) {
        hasLoadedRef.current = true;
        listUserProjects()
          .then((p) => setProjects(p))
          .catch(() => {});
      }

      setSaveStatus("idle");
    } catch (err) {
      console.error("Failed to load document:", err);
      setError("Failed to load document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadDocument(initialProjectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -----------------------------------------------------------------------
  // Save document content to DB (called after editor debounce fires)
  // -----------------------------------------------------------------------
  const handleEditorUpdate = useCallback(
    (data: {
      editor_content: Record<string, unknown>;
      plain_text_content: string;
      word_count: number;
    }) => {
      const doc = documentRef.current;
      if (!doc) return;

      setSaveStatus("saving");

      saveDocumentContent({
        documentId: doc.id,
        title: docTitle,
        editor_content: data.editor_content,
        plain_text_content: data.plain_text_content,
        word_count: data.word_count,
        sectionId: activeSectionId ?? undefined,
      })
        .then((result) => {
          setSaveStatus("saved");
          setLastSavedAt(result.updatedAt);
          // Update activeSectionId if it was auto-determined
          if (!activeSectionId && result.sectionId) {
            setActiveSectionId(result.sectionId);
          }
        })
        .catch((err) => {
          console.error("Auto-save failed:", err);
          setSaveStatus("error");
        });
    },
    // docTitle is intentionally read from the closure at call time
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeSectionId]
  );

  // -----------------------------------------------------------------------
  // Debounced title save -- triggers 1s after user stops typing the title
  // -----------------------------------------------------------------------
  const setDocTitle = useCallback(
    (title: string) => {
      setDocTitleState(title);
      setSaveStatus("unsaved");

      if (titleTimerRef.current) clearTimeout(titleTimerRef.current);

      titleTimerRef.current = setTimeout(() => {
        const doc = documentRef.current;
        if (!doc) return;
        setSaveStatus("saving");
        updateDocumentTitle(doc.id, title)
          .then(() => {
            setSaveStatus("saved");
            setLastSavedAt(new Date());
          })
          .catch(() => {
            setSaveStatus("error");
          });
      }, 1000);
    },
    []
  );

  // Cleanup title timer on unmount
  useEffect(() => {
    return () => {
      if (titleTimerRef.current) clearTimeout(titleTimerRef.current);
    };
  }, []);

  // -----------------------------------------------------------------------
  // Switch projects
  // -----------------------------------------------------------------------
  const selectProject = useCallback(
    (projectId: number) => {
      if (projectId === selectedProjectId) return;
      setSelectedProjectId(projectId);
      setInitialContent(null);
      setDocument(null);
      setSaveStatus("idle");
      loadDocument(projectId);
    },
    [selectedProjectId, loadDocument]
  );

  return {
    document,
    activeSectionId,
    initialContent,
    docTitle,
    setDocTitle,
    saveStatus,
    lastSavedAt,
    isLoading,
    error,
    handleEditorUpdate,
    projects,
    selectedProjectId,
    selectProject,
  };
}
