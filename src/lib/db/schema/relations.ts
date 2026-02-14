import { relations } from "drizzle-orm";

// Core tables (1-16)
import {
  users,
  projects,
  papers,
  projectPapers,
  paperChunks,
  searchQueries,
  paperExtractions,
  synthesisDocuments,
  synthesisSections,
  synthesisCitations,
  synthesisVersions,
  conversations,
  messages,
  projectContextCache,
  citationGraph,
  snowballSessions,
} from "./core";

// Editor tables (17-36)
import {
  slideDecks,
  slides,
  presentationCoachEvaluations,
  slideTemplates,
  deepResearchSessions,
  deepResearchSteps,
  datasets,
  statisticalAnalyses,
  integrityChecks,
  writingActionLog,
  writingAnalysisSnapshots,
  documentChanges,
  templates,
  templateSections,
  userReferences,
  documentComments,
  documentShares,
  activityLog,
  disciplineProfiles,
  exportTemplates,
  learningModules,
  userLearningProgress,
} from "./editor";

// Billing tables (37-41, 52)
import {
  usageEvents,
  subscriptions,
  feedback,
  promptVersions,
  pdfAnnotations,
  usageQuotas,
} from "./billing";

// Systematic review tables (42-51)
import {
  screeningCriteria,
  screeningDecisions,
  prismaFlow,
  riskOfBias,
  metaAnalysisResults,
  comparisonMatrices,
  matrixColumns,
  matrixCells,
  projectMilestones,
  milestoneProgress,
} from "./systematic";

// Institutional tables (53-55)
import {
  institutions,
  institutionMemberships,
  supervisorAssignments,
} from "./institutional";

// Platform tables (56-71)
import {
  marketplaceItems,
  marketplaceReviews,
  journalProfiles,
  submissions,
  submissionChecks,
  reviewSimulations,
  simulatedComments,
  userProfilesPublic,
  publications,
  orcidLinks,
  audioSummaries,
  audioScripts,
  knowledgeNotes,
  knowledgeLinks,
  integrations,
  syncLog,
} from "./platform";

// ============================================================
// 1. users
// ============================================================
export const usersRelations = relations(users, ({ one, many }) => ({
  // Has-many relationships
  projects: many(projects),
  conversations: many(conversations),
  searchQueries: many(searchQueries),
  datasets: many(datasets),
  deepResearchSessions: many(deepResearchSessions),
  usageEvents: many(usageEvents),
  subscriptions: many(subscriptions),
  feedback: many(feedback),
  userReferences: many(userReferences),
  pdfAnnotations: many(pdfAnnotations),
  knowledgeNotes: many(knowledgeNotes),
  integrations: many(integrations),
  publications: many(publications),
  activityLog: many(activityLog),
  writingActionLog: many(writingActionLog),
  documentComments: many(documentComments),
  userLearningProgress: many(userLearningProgress),
  slideDecks: many(slideDecks),
  marketplaceItems: many(marketplaceItems),
  marketplaceReviews: many(marketplaceReviews),
  institutionMemberships: many(institutionMemberships),

  // One-to-one relationships
  userProfilePublic: one(userProfilesPublic),
  orcidLink: one(orcidLinks),

  // FK from users.institution_id -> institutions.id
  institution: one(institutions, {
    fields: [users.institution_id],
    references: [institutions.id],
  }),
}));

// ============================================================
// 2. projects
// ============================================================
export const projectsRelations = relations(projects, ({ one, many }) => ({
  // Many-to-one
  user: one(users, {
    fields: [projects.user_id],
    references: [users.id],
  }),

  // Has-many relationships
  projectPapers: many(projectPapers),
  synthesisDocuments: many(synthesisDocuments),
  conversations: many(conversations),
  searchQueries: many(searchQueries),
  paperExtractions: many(paperExtractions),
  integrityChecks: many(integrityChecks),
  deepResearchSessions: many(deepResearchSessions),
  slideDecks: many(slideDecks),
  datasets: many(datasets),
  statisticalAnalyses: many(statisticalAnalyses),
  screeningCriteria: many(screeningCriteria),
  screeningDecisions: many(screeningDecisions),
  prismaFlow: many(prismaFlow),
  riskOfBias: many(riskOfBias),
  metaAnalysisResults: many(metaAnalysisResults),
  comparisonMatrices: many(comparisonMatrices),
  projectMilestones: many(projectMilestones),
  projectContextCache: many(projectContextCache),
  snowballSessions: many(snowballSessions),
  usageEvents: many(usageEvents),
  activityLog: many(activityLog),
  knowledgeNotes: many(knowledgeNotes),
  audioSummaries: many(audioSummaries),
  supervisorAssignments: many(supervisorAssignments),
}));

// ============================================================
// 3. papers
// ============================================================
export const papersRelations = relations(papers, ({ many }) => ({
  paperChunks: many(paperChunks),
  projectPapers: many(projectPapers),
  paperExtractions: many(paperExtractions),
  synthesisCitations: many(synthesisCitations),
  pdfAnnotations: many(pdfAnnotations),
  userReferences: many(userReferences),
  screeningDecisions: many(screeningDecisions),
  riskOfBias: many(riskOfBias),
  matrixCells: many(matrixCells),
  publications: many(publications),
  knowledgeNotes: many(knowledgeNotes),
  snowballSessions: many(snowballSessions),

  // Citation graph: papers that this paper cites
  citingEdges: many(citationGraph, { relationName: "citingPaper" }),
  // Citation graph: papers that cite this paper
  citedEdges: many(citationGraph, { relationName: "citedPaper" }),
}));

// ============================================================
// 4. project_papers
// ============================================================
export const projectPapersRelations = relations(projectPapers, ({ one }) => ({
  project: one(projects, {
    fields: [projectPapers.project_id],
    references: [projects.id],
  }),
  paper: one(papers, {
    fields: [projectPapers.paper_id],
    references: [papers.id],
  }),
}));

// ============================================================
// 5. paper_chunks
// ============================================================
export const paperChunksRelations = relations(paperChunks, ({ one }) => ({
  paper: one(papers, {
    fields: [paperChunks.paper_id],
    references: [papers.id],
  }),
}));

// ============================================================
// 6. search_queries (self-referential via parent_query_id)
// ============================================================
export const searchQueriesRelations = relations(
  searchQueries,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [searchQueries.project_id],
      references: [projects.id],
    }),
    user: one(users, {
      fields: [searchQueries.user_id],
      references: [users.id],
    }),
    parentQuery: one(searchQueries, {
      fields: [searchQueries.parent_query_id],
      references: [searchQueries.id],
      relationName: "searchQueryParent",
    }),
    childQueries: many(searchQueries, {
      relationName: "searchQueryParent",
    }),
  })
);

// ============================================================
// 7. paper_extractions
// ============================================================
export const paperExtractionsRelations = relations(
  paperExtractions,
  ({ one }) => ({
    paper: one(papers, {
      fields: [paperExtractions.paper_id],
      references: [papers.id],
    }),
    project: one(projects, {
      fields: [paperExtractions.project_id],
      references: [projects.id],
    }),
  })
);

// ============================================================
// 8. synthesis_documents
// ============================================================
export const synthesisDocumentsRelations = relations(
  synthesisDocuments,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [synthesisDocuments.project_id],
      references: [projects.id],
    }),
    synthesisSections: many(synthesisSections),
    synthesisVersions: many(synthesisVersions),
    documentShares: many(documentShares),
    integrityChecks: many(integrityChecks),
    submissions: many(submissions),
    reviewSimulations: many(reviewSimulations),
    slideDecks: many(slideDecks),
    audioSummaries: many(audioSummaries),
  })
);

// ============================================================
// 9. synthesis_sections
// ============================================================
export const synthesisSectionsRelations = relations(
  synthesisSections,
  ({ one, many }) => ({
    document: one(synthesisDocuments, {
      fields: [synthesisSections.document_id],
      references: [synthesisDocuments.id],
    }),
    synthesisCitations: many(synthesisCitations),
    synthesisVersions: many(synthesisVersions),
    writingActionLog: many(writingActionLog),
    writingAnalysisSnapshots: many(writingAnalysisSnapshots),
    documentChanges: many(documentChanges),
    documentComments: many(documentComments),
    integrityChecks: many(integrityChecks),
    slides: many(slides),
  })
);

// ============================================================
// 10. synthesis_citations
// ============================================================
export const synthesisCitationsRelations = relations(
  synthesisCitations,
  ({ one }) => ({
    section: one(synthesisSections, {
      fields: [synthesisCitations.section_id],
      references: [synthesisSections.id],
    }),
    paper: one(papers, {
      fields: [synthesisCitations.paper_id],
      references: [papers.id],
    }),
  })
);

// ============================================================
// 11. synthesis_versions
// ============================================================
export const synthesisVersionsRelations = relations(
  synthesisVersions,
  ({ one }) => ({
    document: one(synthesisDocuments, {
      fields: [synthesisVersions.document_id],
      references: [synthesisDocuments.id],
    }),
    section: one(synthesisSections, {
      fields: [synthesisVersions.section_id],
      references: [synthesisSections.id],
    }),
  })
);

// ============================================================
// 12. conversations
// ============================================================
export const conversationsRelations = relations(
  conversations,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [conversations.project_id],
      references: [projects.id],
    }),
    user: one(users, {
      fields: [conversations.user_id],
      references: [users.id],
    }),
    messages: many(messages),
  })
);

// ============================================================
// 13. messages
// ============================================================
export const messagesRelations = relations(messages, ({ one, many }) => ({
  conversation: one(conversations, {
    fields: [messages.conversation_id],
    references: [conversations.id],
  }),
  feedback: many(feedback),
}));

// ============================================================
// 14. project_context_cache
// ============================================================
export const projectContextCacheRelations = relations(
  projectContextCache,
  ({ one }) => ({
    project: one(projects, {
      fields: [projectContextCache.project_id],
      references: [projects.id],
    }),
  })
);

// ============================================================
// 15. citation_graph (two FK references to papers)
// ============================================================
export const citationGraphRelations = relations(citationGraph, ({ one }) => ({
  citingPaper: one(papers, {
    fields: [citationGraph.citing_paper_id],
    references: [papers.id],
    relationName: "citingPaper",
  }),
  citedPaper: one(papers, {
    fields: [citationGraph.cited_paper_id],
    references: [papers.id],
    relationName: "citedPaper",
  }),
}));

// ============================================================
// 16. snowball_sessions
// ============================================================
export const snowballSessionsRelations = relations(
  snowballSessions,
  ({ one }) => ({
    project: one(projects, {
      fields: [snowballSessions.project_id],
      references: [projects.id],
    }),
    seedPaper: one(papers, {
      fields: [snowballSessions.seed_paper_id],
      references: [papers.id],
    }),
  })
);

// ============================================================
// 17. slide_decks
// ============================================================
export const slideDecksRelations = relations(
  slideDecks,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [slideDecks.projectId],
      references: [projects.id],
    }),
    user: one(users, {
      fields: [slideDecks.userId],
      references: [users.id],
    }),
    document: one(synthesisDocuments, {
      fields: [slideDecks.documentId],
      references: [synthesisDocuments.id],
    }),
    slides: many(slides),
    coachEvaluations: many(presentationCoachEvaluations),
  })
);

// ============================================================
// 18. slides
// ============================================================
export const slidesRelations = relations(slides, ({ one }) => ({
  deck: one(slideDecks, {
    fields: [slides.deckId],
    references: [slideDecks.id],
  }),
  sourceSection: one(synthesisSections, {
    fields: [slides.sourceSectionId],
    references: [synthesisSections.id],
  }),
}));

// ============================================================
// 18a. presentation_coach_evaluations
// ============================================================
export const presentationCoachEvaluationsRelations = relations(
  presentationCoachEvaluations,
  ({ one }) => ({
    deck: one(slideDecks, {
      fields: [presentationCoachEvaluations.deckId],
      references: [slideDecks.id],
    }),
  })
);

// ============================================================
// 18b. slide_templates (no FK references)
// ============================================================
// Standalone lookup table - no relations needed

// ============================================================
// 19. deep_research_sessions
// ============================================================
export const deepResearchSessionsRelations = relations(
  deepResearchSessions,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [deepResearchSessions.projectId],
      references: [projects.id],
    }),
    user: one(users, {
      fields: [deepResearchSessions.userId],
      references: [users.id],
    }),
    steps: many(deepResearchSteps),
  })
);

// ============================================================
// 20. deep_research_steps
// ============================================================
export const deepResearchStepsRelations = relations(
  deepResearchSteps,
  ({ one }) => ({
    session: one(deepResearchSessions, {
      fields: [deepResearchSteps.sessionId],
      references: [deepResearchSessions.id],
    }),
  })
);

// ============================================================
// 21. datasets
// ============================================================
export const datasetsRelations = relations(datasets, ({ one, many }) => ({
  project: one(projects, {
    fields: [datasets.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [datasets.userId],
    references: [users.id],
  }),
  statisticalAnalyses: many(statisticalAnalyses),
}));

// ============================================================
// 22. statistical_analyses
// ============================================================
export const statisticalAnalysesRelations = relations(
  statisticalAnalyses,
  ({ one }) => ({
    dataset: one(datasets, {
      fields: [statisticalAnalyses.datasetId],
      references: [datasets.id],
    }),
    project: one(projects, {
      fields: [statisticalAnalyses.projectId],
      references: [projects.id],
    }),
  })
);

// ============================================================
// 23. integrity_checks
// ============================================================
export const integrityChecksRelations = relations(
  integrityChecks,
  ({ one }) => ({
    project: one(projects, {
      fields: [integrityChecks.projectId],
      references: [projects.id],
    }),
    document: one(synthesisDocuments, {
      fields: [integrityChecks.documentId],
      references: [synthesisDocuments.id],
    }),
    section: one(synthesisSections, {
      fields: [integrityChecks.sectionId],
      references: [synthesisSections.id],
    }),
  })
);

// ============================================================
// 24. writing_action_log
// ============================================================
export const writingActionLogRelations = relations(
  writingActionLog,
  ({ one }) => ({
    section: one(synthesisSections, {
      fields: [writingActionLog.sectionId],
      references: [synthesisSections.id],
    }),
    user: one(users, {
      fields: [writingActionLog.userId],
      references: [users.id],
    }),
  })
);

// ============================================================
// 25. writing_analysis_snapshots
// ============================================================
export const writingAnalysisSnapshotsRelations = relations(
  writingAnalysisSnapshots,
  ({ one }) => ({
    section: one(synthesisSections, {
      fields: [writingAnalysisSnapshots.sectionId],
      references: [synthesisSections.id],
    }),
  })
);

// ============================================================
// 26. document_changes
// ============================================================
export const documentChangesRelations = relations(
  documentChanges,
  ({ one }) => ({
    section: one(synthesisSections, {
      fields: [documentChanges.sectionId],
      references: [synthesisSections.id],
    }),
  })
);

// ============================================================
// 27. templates
// ============================================================
export const templatesRelations = relations(templates, ({ one, many }) => ({
  createdByUser: one(users, {
    fields: [templates.createdBy],
    references: [users.id],
  }),
  templateSections: many(templateSections),
}));

// ============================================================
// 28. template_sections
// ============================================================
export const templateSectionsRelations = relations(
  templateSections,
  ({ one }) => ({
    template: one(templates, {
      fields: [templateSections.templateId],
      references: [templates.id],
    }),
  })
);

// ============================================================
// 29. user_references
// ============================================================
export const userReferencesRelations = relations(
  userReferences,
  ({ one }) => ({
    user: one(users, {
      fields: [userReferences.userId],
      references: [users.id],
    }),
    paper: one(papers, {
      fields: [userReferences.paperId],
      references: [papers.id],
    }),
  })
);

// ============================================================
// 30. document_comments (self-referential via parentCommentId)
// ============================================================
export const documentCommentsRelations = relations(
  documentComments,
  ({ one, many }) => ({
    section: one(synthesisSections, {
      fields: [documentComments.sectionId],
      references: [synthesisSections.id],
    }),
    user: one(users, {
      fields: [documentComments.userId],
      references: [users.id],
    }),
    parentComment: one(documentComments, {
      fields: [documentComments.parentCommentId],
      references: [documentComments.id],
      relationName: "commentParent",
    }),
    childComments: many(documentComments, {
      relationName: "commentParent",
    }),
  })
);

// ============================================================
// 31. document_shares
// ============================================================
export const documentSharesRelations = relations(
  documentShares,
  ({ one }) => ({
    document: one(synthesisDocuments, {
      fields: [documentShares.documentId],
      references: [synthesisDocuments.id],
    }),
    sharedWithUser: one(users, {
      fields: [documentShares.sharedWithUserId],
      references: [users.id],
    }),
  })
);

// ============================================================
// 32. activity_log
// ============================================================
export const activityLogRelations = relations(activityLog, ({ one }) => ({
  user: one(users, {
    fields: [activityLog.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [activityLog.projectId],
    references: [projects.id],
  }),
}));

// ============================================================
// 33. discipline_profiles (no FK references)
// ============================================================
// No relations needed - standalone lookup table

// ============================================================
// 34. export_templates (no FK references)
// ============================================================
// No relations needed - standalone lookup table

// ============================================================
// 35. learning_modules (no FK references)
// ============================================================
export const learningModulesRelations = relations(
  learningModules,
  ({ many }) => ({
    userLearningProgress: many(userLearningProgress),
  })
);

// ============================================================
// 36. user_learning_progress
// ============================================================
export const userLearningProgressRelations = relations(
  userLearningProgress,
  ({ one }) => ({
    user: one(users, {
      fields: [userLearningProgress.userId],
      references: [users.id],
    }),
    module: one(learningModules, {
      fields: [userLearningProgress.moduleId],
      references: [learningModules.id],
    }),
  })
);

// ============================================================
// 37. usage_events
// ============================================================
export const usageEventsRelations = relations(usageEvents, ({ one }) => ({
  user: one(users, {
    fields: [usageEvents.userId],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [usageEvents.projectId],
    references: [projects.id],
  }),
}));

// ============================================================
// 38. subscriptions
// ============================================================
export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));

// ============================================================
// 39. feedback
// ============================================================
export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(users, {
    fields: [feedback.userId],
    references: [users.id],
  }),
  message: one(messages, {
    fields: [feedback.messageId],
    references: [messages.id],
  }),
}));

// ============================================================
// 40. prompt_versions (no FK references)
// ============================================================
// No relations needed - standalone lookup table

// ============================================================
// 41. pdf_annotations
// ============================================================
export const pdfAnnotationsRelations = relations(
  pdfAnnotations,
  ({ one }) => ({
    paper: one(papers, {
      fields: [pdfAnnotations.paperId],
      references: [papers.id],
    }),
    user: one(users, {
      fields: [pdfAnnotations.userId],
      references: [users.id],
    }),
  })
);

// ============================================================
// 42. screening_criteria
// ============================================================
export const screeningCriteriaRelations = relations(
  screeningCriteria,
  ({ one }) => ({
    project: one(projects, {
      fields: [screeningCriteria.projectId],
      references: [projects.id],
    }),
  })
);

// ============================================================
// 43. screening_decisions
// ============================================================
export const screeningDecisionsRelations = relations(
  screeningDecisions,
  ({ one }) => ({
    project: one(projects, {
      fields: [screeningDecisions.projectId],
      references: [projects.id],
    }),
    paper: one(papers, {
      fields: [screeningDecisions.paperId],
      references: [papers.id],
    }),
  })
);

// ============================================================
// 44. prisma_flow
// ============================================================
export const prismaFlowRelations = relations(prismaFlow, ({ one }) => ({
  project: one(projects, {
    fields: [prismaFlow.projectId],
    references: [projects.id],
  }),
}));

// ============================================================
// 45. risk_of_bias
// ============================================================
export const riskOfBiasRelations = relations(riskOfBias, ({ one }) => ({
  paper: one(papers, {
    fields: [riskOfBias.paperId],
    references: [papers.id],
  }),
  project: one(projects, {
    fields: [riskOfBias.projectId],
    references: [projects.id],
  }),
}));

// ============================================================
// 46. meta_analysis_results
// ============================================================
export const metaAnalysisResultsRelations = relations(
  metaAnalysisResults,
  ({ one }) => ({
    project: one(projects, {
      fields: [metaAnalysisResults.projectId],
      references: [projects.id],
    }),
  })
);

// ============================================================
// 47. comparison_matrices
// ============================================================
export const comparisonMatricesRelations = relations(
  comparisonMatrices,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [comparisonMatrices.projectId],
      references: [projects.id],
    }),
    matrixColumns: many(matrixColumns),
    matrixCells: many(matrixCells),
  })
);

// ============================================================
// 48. matrix_columns
// ============================================================
export const matrixColumnsRelations = relations(
  matrixColumns,
  ({ one, many }) => ({
    matrix: one(comparisonMatrices, {
      fields: [matrixColumns.matrixId],
      references: [comparisonMatrices.id],
    }),
    matrixCells: many(matrixCells),
  })
);

// ============================================================
// 49. matrix_cells
// ============================================================
export const matrixCellsRelations = relations(matrixCells, ({ one }) => ({
  matrix: one(comparisonMatrices, {
    fields: [matrixCells.matrixId],
    references: [comparisonMatrices.id],
  }),
  column: one(matrixColumns, {
    fields: [matrixCells.columnId],
    references: [matrixColumns.id],
  }),
  paper: one(papers, {
    fields: [matrixCells.paperId],
    references: [papers.id],
  }),
}));

// ============================================================
// 50. project_milestones
// ============================================================
export const projectMilestonesRelations = relations(
  projectMilestones,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [projectMilestones.projectId],
      references: [projects.id],
    }),
    milestoneProgress: many(milestoneProgress),
  })
);

// ============================================================
// 51. milestone_progress
// ============================================================
export const milestoneProgressRelations = relations(
  milestoneProgress,
  ({ one }) => ({
    milestone: one(projectMilestones, {
      fields: [milestoneProgress.milestoneId],
      references: [projectMilestones.id],
    }),
    updatedByUser: one(users, {
      fields: [milestoneProgress.updatedBy],
      references: [users.id],
    }),
  })
);

// ============================================================
// 52. usage_quotas (no FK references)
// ============================================================
// No relations needed - standalone lookup table

// ============================================================
// 53. institutions
// ============================================================
export const institutionsRelations = relations(
  institutions,
  ({ many }) => ({
    institutionMemberships: many(institutionMemberships),
  })
);

// ============================================================
// 54. institution_memberships
// ============================================================
export const institutionMembershipsRelations = relations(
  institutionMemberships,
  ({ one }) => ({
    user: one(users, {
      fields: [institutionMemberships.userId],
      references: [users.id],
    }),
    institution: one(institutions, {
      fields: [institutionMemberships.institutionId],
      references: [institutions.id],
    }),
  })
);

// ============================================================
// 55. supervisor_assignments (two FK refs to users)
// ============================================================
export const supervisorAssignmentsRelations = relations(
  supervisorAssignments,
  ({ one }) => ({
    supervisor: one(users, {
      fields: [supervisorAssignments.supervisorId],
      references: [users.id],
      relationName: "supervisorUser",
    }),
    student: one(users, {
      fields: [supervisorAssignments.studentId],
      references: [users.id],
      relationName: "studentUser",
    }),
    project: one(projects, {
      fields: [supervisorAssignments.projectId],
      references: [projects.id],
    }),
  })
);

// ============================================================
// 56. marketplace_items
// ============================================================
export const marketplaceItemsRelations = relations(
  marketplaceItems,
  ({ one, many }) => ({
    creator: one(users, {
      fields: [marketplaceItems.creatorId],
      references: [users.id],
    }),
    marketplaceReviews: many(marketplaceReviews),
  })
);

// ============================================================
// 57. marketplace_reviews
// ============================================================
export const marketplaceReviewsRelations = relations(
  marketplaceReviews,
  ({ one }) => ({
    item: one(marketplaceItems, {
      fields: [marketplaceReviews.itemId],
      references: [marketplaceItems.id],
    }),
    user: one(users, {
      fields: [marketplaceReviews.userId],
      references: [users.id],
    }),
  })
);

// ============================================================
// 58. journal_profiles (no FK references)
// ============================================================
export const journalProfilesRelations = relations(
  journalProfiles,
  ({ many }) => ({
    submissions: many(submissions),
  })
);

// ============================================================
// 59. submissions
// ============================================================
export const submissionsRelations = relations(
  submissions,
  ({ one, many }) => ({
    document: one(synthesisDocuments, {
      fields: [submissions.documentId],
      references: [synthesisDocuments.id],
    }),
    journal: one(journalProfiles, {
      fields: [submissions.journalId],
      references: [journalProfiles.id],
    }),
    submissionChecks: many(submissionChecks),
  })
);

// ============================================================
// 60. submission_checks
// ============================================================
export const submissionChecksRelations = relations(
  submissionChecks,
  ({ one }) => ({
    submission: one(submissions, {
      fields: [submissionChecks.submissionId],
      references: [submissions.id],
    }),
  })
);

// ============================================================
// 61. review_simulations
// ============================================================
export const reviewSimulationsRelations = relations(
  reviewSimulations,
  ({ one, many }) => ({
    document: one(synthesisDocuments, {
      fields: [reviewSimulations.documentId],
      references: [synthesisDocuments.id],
    }),
    simulatedComments: many(simulatedComments),
  })
);

// ============================================================
// 62. simulated_comments
// ============================================================
export const simulatedCommentsRelations = relations(
  simulatedComments,
  ({ one }) => ({
    simulation: one(reviewSimulations, {
      fields: [simulatedComments.simulationId],
      references: [reviewSimulations.id],
    }),
  })
);

// ============================================================
// 63. user_profiles_public
// ============================================================
export const userProfilesPublicRelations = relations(
  userProfilesPublic,
  ({ one }) => ({
    user: one(users, {
      fields: [userProfilesPublic.userId],
      references: [users.id],
    }),
  })
);

// ============================================================
// 64. publications
// ============================================================
export const publicationsRelations = relations(publications, ({ one }) => ({
  user: one(users, {
    fields: [publications.userId],
    references: [users.id],
  }),
  paper: one(papers, {
    fields: [publications.paperId],
    references: [papers.id],
  }),
}));

// ============================================================
// 65. orcid_links
// ============================================================
export const orcidLinksRelations = relations(orcidLinks, ({ one }) => ({
  user: one(users, {
    fields: [orcidLinks.userId],
    references: [users.id],
  }),
}));

// ============================================================
// 66. audio_summaries
// ============================================================
export const audioSummariesRelations = relations(
  audioSummaries,
  ({ one, many }) => ({
    project: one(projects, {
      fields: [audioSummaries.projectId],
      references: [projects.id],
    }),
    document: one(synthesisDocuments, {
      fields: [audioSummaries.documentId],
      references: [synthesisDocuments.id],
    }),
    audioScripts: many(audioScripts),
  })
);

// ============================================================
// 67. audio_scripts
// ============================================================
export const audioScriptsRelations = relations(audioScripts, ({ one }) => ({
  summary: one(audioSummaries, {
    fields: [audioScripts.summaryId],
    references: [audioSummaries.id],
  }),
}));

// ============================================================
// 68. knowledge_notes
// ============================================================
export const knowledgeNotesRelations = relations(
  knowledgeNotes,
  ({ one }) => ({
    user: one(users, {
      fields: [knowledgeNotes.userId],
      references: [users.id],
    }),
    paper: one(papers, {
      fields: [knowledgeNotes.paperId],
      references: [papers.id],
    }),
    project: one(projects, {
      fields: [knowledgeNotes.projectId],
      references: [projects.id],
    }),
  })
);

// ============================================================
// 69. knowledge_links (no FK references - uses polymorphic IDs)
// ============================================================
// No foreign key relations - uses polymorphic source_type/source_id
// and target_type/target_id pattern

// ============================================================
// 70. integrations
// ============================================================
export const integrationsRelations = relations(
  integrations,
  ({ one, many }) => ({
    user: one(users, {
      fields: [integrations.userId],
      references: [users.id],
    }),
    syncLogs: many(syncLog),
  })
);

// ============================================================
// 71. sync_log
// ============================================================
export const syncLogRelations = relations(syncLog, ({ one }) => ({
  integration: one(integrations, {
    fields: [syncLog.integrationId],
    references: [integrations.id],
  }),
}));
