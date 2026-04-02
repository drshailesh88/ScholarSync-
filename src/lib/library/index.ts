export { toLibraryId, parseLibraryId } from "./types";
export type {
  SourceType,
  ParsedLibraryId,
  WorkflowState,
  ReadStatus,
  ExtractionState,
  LibrarySource,
  LibrarySourceFilters,
} from "./types";

export { adaptPaper, adaptWebSource } from "./adapter";
export type { PaperRow, WebSourceRow } from "./adapter";

export { getLibraryHome, getLibraryCounts, getLibrarySourceCount } from "./home";
export type { LibraryHomeData } from "./home";

export {
  getTrashSources,
  softDeleteLibrarySource,
  restoreLibrarySource,
  permanentlyDeleteLibrarySource,
} from "./service";

export { searchLibrarySources, searchAnnotations } from "./search";
export type { LibrarySearchResult, AnnotationSearchResult } from "./search";

export {
  getLastActiveProjectId,
  setLastActiveProjectId,
  getLibraryProjects,
} from "./project-context";
export type { LibraryProject } from "./project-context";

export {
  createEditorHandoff,
  createEditorHandoffFromIds,
  getEditorHandoff,
  getPendingHandoff,
  consumeEditorHandoff,
  cancelEditorHandoff,
  getCitedLibraryIds,
} from "./editor-handoff";
export type { HandoffSourcePayload, EditorHandoff } from "./editor-handoff";
