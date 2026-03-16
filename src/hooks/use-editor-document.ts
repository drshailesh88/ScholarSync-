import { useState, useEffect, useCallback, useRef } from "react";
import type { JSONContent } from "@tiptap/core";
import {
  loadStudioDocument,
  saveDocumentContent,
  updateDocumentTitle,
  autoSaveVersion,
  getDocument,
} from "@/lib/actions/documents";
import { useEditorStore } from "@/stores/editor-store";
import { enqueueSave, processQueue } from "@/lib/editor/offline-queue";
import { withRetry } from "@/lib/editor/save-retry";


export interface UseEditorDocumentReturn {
  // Content state
  content: JSONContent | null;
  isLoading: boolean;
  error: string | null;
  dbDocumentId: number | null;
  sectionId: number | null;
  projectId: number | null;

  // Save state
  saveStatus: "saved" | "saving" | "unsaved" | "error" | "offline" | "local";
  lastSavedAt: Date | null;

  // Actions
  handleEditorUpdate: (data: {
    editor_content: JSONContent;
    plain_text_content: string;
    word_count: number;
  }) => Promise<void>;
  setTitle: (title: string) => Promise<void>;
  retrySave: () => Promise<void>;
}

/**
 * Hook to manage document persistence with DB storage and localStorage fallback.
 *
 * - Loads document from DB on mount
 * - Falls back to localStorage if DB fails
 * - Auto-saves to DB with localStorage backup
 * - Creates auto-save versions every 10 minutes
 * - Handles both "new" and numeric document IDs from URL
 */
export function useEditorDocument(
  urlDocumentId: string,
  documentType: string,
  projectId?: number | null
): UseEditorDocumentReturn {
  const [content, setContent] = useState<JSONContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dbDocumentId, setDbDocumentId] = useState<number | null>(null);
  const [sectionId, setSectionId] = useState<number | null>(null);
  const [resolvedProjectId, setResolvedProjectId] = useState<number | null>(null);
  const [saveStatus, setSaveStatus] = useState<
    "saved" | "saving" | "unsaved" | "error" | "offline" | "local"
  >("saved");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [loadedFromLocalStorage, setLoadedFromLocalStorage] = useState(false);

  const { setDocumentTitle } = useEditorStore();

  // Refs for tracking
  const pendingSaveRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastVersionSaveRef = useRef<Date>(new Date());
  const currentSectionIdRef = useRef<number | null>(null);

  // Load document on mount
  useEffect(() => {
    let isMounted = true;

    async function loadDocument() {
      try {
        setIsLoading(true);
        setError(null);

        if (urlDocumentId === "new") {
          // Create new document via loadStudioDocument
          // Use projectId if provided, otherwise null (creates default project)
          const result = await loadStudioDocument(projectId ?? null);

          if (!isMounted) return;

          setDbDocumentId(result.id);
          setResolvedProjectId((result as { project_id?: number }).project_id ?? null);
          setDocumentTitle(result.title);

          // Extract content from first section if available
          if (result.sections && result.sections.length > 0) {
            const firstSection = result.sections[0];
            currentSectionIdRef.current = firstSection.id;
            setSectionId(firstSection.id);
            if (firstSection.editor_content) {
              setContent(firstSection.editor_content as JSONContent);
            } else {
              setContent(null); // Will use template
            }
          } else {
            currentSectionIdRef.current = null;
            setSectionId(null);
            setContent(null); // Will use template
          }

          setLoadedFromLocalStorage(false);
        } else {
          // Parse numeric ID
          const numericId = parseInt(urlDocumentId, 10);
          if (isNaN(numericId)) {
            throw new Error("Invalid document ID");
          }

          // Try loading from DB
          const result = await getDocument(numericId);

          if (!isMounted) return;

          if (!result) {
            throw new Error("Document not found");
          }

          setDbDocumentId(result.id);
          setResolvedProjectId((result as { project_id?: number }).project_id ?? null);
          setDocumentTitle(result.title);

          // Extract content from first section if available
          if (result.sections && result.sections.length > 0) {
            const firstSection = result.sections[0];
            currentSectionIdRef.current = firstSection.id;
            setSectionId(firstSection.id);
            if (firstSection.editor_content) {
              setContent(firstSection.editor_content as JSONContent);
            } else {
              setContent(null); // Will use template
            }
          } else {
            currentSectionIdRef.current = null;
            setSectionId(null);
            setContent(null); // Will use template
          }

          setLoadedFromLocalStorage(false);
        }
      } catch (dbError) {
        console.error("Failed to load from DB, falling back to localStorage:", dbError);

        if (!isMounted) return;

        // Fallback to localStorage
        try {
          const localKey = `scholarsync_doc_${urlDocumentId}`;
          const saved = localStorage.getItem(localKey);

          if (saved) {
            const parsed = JSON.parse(saved);
            setContent(parsed.content as JSONContent);
            if (parsed.title) {
              setDocumentTitle(parsed.title);
            }
            setLoadedFromLocalStorage(true);
            setResolvedProjectId(null);
            currentSectionIdRef.current = null;
            setSectionId(null);
            setError(
              "Loaded from local storage. Database unavailable. Changes will be saved locally."
            );
          } else {
            // No local data either - start fresh
            setContent(null);
            setLoadedFromLocalStorage(false);
            setResolvedProjectId(null);
            currentSectionIdRef.current = null;
            setSectionId(null);
          }
        } catch (localError) {
          console.error("Failed to load from localStorage:", localError);
          setError("Failed to load document. Please refresh the page.");
          setContent(null);
          setLoadedFromLocalStorage(false);
          setResolvedProjectId(null);
          currentSectionIdRef.current = null;
          setSectionId(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDocument();

    return () => {
      isMounted = false;
      if (pendingSaveRef.current) {
        clearTimeout(pendingSaveRef.current);
      }
    };
  }, [urlDocumentId, setDocumentTitle, projectId]);

  // Auto-save version every 10 minutes
  useEffect(() => {
    if (!dbDocumentId || !currentSectionIdRef.current || !content) {
      return;
    }

    const interval = setInterval(async () => {
      if (!currentSectionIdRef.current) return;
      try {
        await autoSaveVersion(dbDocumentId, currentSectionIdRef.current, content);
        lastVersionSaveRef.current = new Date();
        console.log("Auto-saved version at", new Date().toISOString());
      } catch (error) {
        console.error("Failed to auto-save version:", error);
      }
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [dbDocumentId, content]);

  // Process queued saves when connection is restored and reflect browser offline status.
  useEffect(() => {
    function handleOnline() {
      processQueue(async (data) => {
        await saveDocumentContent({
          documentId: data.documentId,
          title: data.title,
          editor_content: data.editor_content as Record<string, unknown>,
          plain_text_content: data.plain_text_content,
          word_count: data.word_count,
          sectionId: data.sectionId,
        });
      }).then(({ processed }) => {
        if (processed > 0) {
          setSaveStatus("saved");
          setLastSavedAt(new Date());
          setError(null);
        } else if (lastSavedAt) {
          setSaveStatus("saved");
        }
      });
    }

    function handleOffline() {
      setSaveStatus((current) => {
        if (current === "saving" || current === "unsaved" || current === "local") {
          return current;
        }
        return "offline";
      });
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [lastSavedAt]);

  // Debounced save function
  const handleEditorUpdate = useCallback(
    async (data: {
      editor_content: JSONContent;
      plain_text_content: string;
      word_count: number;
    }) => {
      // Update local state immediately
      setContent(data.editor_content);
      setSaveStatus("unsaved");

      // Clear any pending save
      if (pendingSaveRef.current) {
        clearTimeout(pendingSaveRef.current);
      }

      // Debounce save (2 seconds)
      pendingSaveRef.current = setTimeout(async () => {
        if (!dbDocumentId) {
          // No DB document - save to localStorage only
          try {
            const localKey = `scholarsync_doc_${urlDocumentId}`;
            localStorage.setItem(
              localKey,
              JSON.stringify({
                content: data.editor_content,
                plainText: data.plain_text_content,
                wordCount: data.word_count,
                title: useEditorStore.getState().documentTitle,
                documentType,
                timestamp: Date.now(),
              })
            );
            setSaveStatus("saved");
            setLastSavedAt(new Date());
          } catch (error) {
            console.error("Failed to save to localStorage:", error);
            setSaveStatus("error");
          }
          return;
        }

        // Try to save to DB
        try {
          setSaveStatus("saving");

          await withRetry(
            async () => {
              await saveDocumentContent({
                documentId: dbDocumentId,
                title: useEditorStore.getState().documentTitle,
                editor_content: data.editor_content,
                plain_text_content: data.plain_text_content,
                word_count: data.word_count,
                sectionId: currentSectionIdRef.current ?? undefined,
              });
            },
            {
              maxRetries: 3,
              initialDelay: 1000,
              maxDelay: 10000,
              onRetry: (attempt) => {
                setSaveStatus("saving");
                console.log(`Save retry attempt ${attempt}`);
              },
            }
          );

          // Success - backup to localStorage
          try {
            const localKey = `scholarsync_doc_${urlDocumentId}`;
            localStorage.setItem(
              localKey,
              JSON.stringify({
                content: data.editor_content,
                plainText: data.plain_text_content,
                wordCount: data.word_count,
                title: useEditorStore.getState().documentTitle,
                documentType,
                timestamp: Date.now(),
              })
            );
          } catch {
            // localStorage may be full - not critical
          }

          setSaveStatus("saved");
          setLastSavedAt(new Date());
          setError(null);

          // Clear error if we were in offline mode
          if (loadedFromLocalStorage && error) {
            setError(null);
          }
        } catch (saveError) {
          console.error("Failed to save to DB:", saveError);

          // Check if offline
          if (!navigator.onLine) {
            // Offline: queue the save
            enqueueSave({
              documentId: dbDocumentId,
              title: useEditorStore.getState().documentTitle,
              editor_content: data.editor_content,
              plain_text_content: data.plain_text_content,
              word_count: data.word_count,
              sectionId: currentSectionIdRef.current!,
            });
            try {
              const localKey = `scholarsync_doc_${urlDocumentId}`;
              localStorage.setItem(
                localKey,
                JSON.stringify({
                  content: data.editor_content,
                  plainText: data.plain_text_content,
                  wordCount: data.word_count,
                  title: useEditorStore.getState().documentTitle,
                  documentType,
                  timestamp: Date.now(),
                })
              );
              setSaveStatus("local");
              setError("Saved locally. Changes will sync when you're back online.");
            } catch (localError) {
              console.error("Failed to save to localStorage:", localError);
              setSaveStatus("error");
              setError("Failed to save. Please check your connection.");
            }
            return;
          }

          setSaveStatus("error");
          setError("Failed to save. Please check your connection.");
        }
      }, 2000);
    },
    [dbDocumentId, urlDocumentId, documentType, loadedFromLocalStorage, error]
  );

  // Update title
  const setTitle = useCallback(
    async (title: string) => {
      setDocumentTitle(title);

      if (dbDocumentId) {
        try {
          await updateDocumentTitle(dbDocumentId, title);
        } catch (error) {
          console.error("Failed to update title in DB:", error);
          // Don't show error for title updates - will sync on next content save
        }
      }

      // Also update localStorage
      try {
        const localKey = `scholarsync_doc_${urlDocumentId}`;
        const existing = JSON.parse(localStorage.getItem(localKey) || "{}");
        localStorage.setItem(
          localKey,
          JSON.stringify({ ...existing, title, timestamp: Date.now() })
        );
      } catch {
        // Ignore localStorage errors
      }
    },
    [dbDocumentId, urlDocumentId, setDocumentTitle]
  );

  // Manual retry for failed saves
  const retrySave = useCallback(async () => {
    if (!content) return;

    setSaveStatus("saving");
    setError(null);

    if (dbDocumentId) {
      try {
        await withRetry(
          async () => {
            await saveDocumentContent({
              documentId: dbDocumentId,
              title: useEditorStore.getState().documentTitle,
              editor_content: content,
              plain_text_content: "",
              word_count: 0,
            });
          },
          {
            maxRetries: 3,
            initialDelay: 1000,
            maxDelay: 10000,
            onRetry: (attempt) => {
              setSaveStatus("saving");
              console.log(`Manual save retry attempt ${attempt}`);
            },
          }
        );

        setSaveStatus("saved");
        setLastSavedAt(new Date());

        if (loadedFromLocalStorage) {
          setLoadedFromLocalStorage(false);
        }
      } catch (error) {
        console.error("Retry failed:", error);
        setSaveStatus("error");
        setError("Failed to save. Please check your connection.");
      }
    }
  }, [content, dbDocumentId, loadedFromLocalStorage]);

  return {
    content,
    isLoading,
    error,
    dbDocumentId,
    sectionId,
    projectId: resolvedProjectId,
    saveStatus,
    lastSavedAt,
    handleEditorUpdate,
    setTitle,
    retrySave,
  };
}
