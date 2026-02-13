import {
  pgTable,
  serial,
  text,
  integer,
  real,
  timestamp,
  date,
  jsonb,
  index,
  unique,
} from "drizzle-orm/pg-core";

import {
  criterionTypeEnum,
  screeningStageEnum,
  screeningDecisionEnum,
  decidedByEnum,
  riskJudgmentEnum,
  assessedByEnum,
  effectModelEnum,
  columnTypeEnum,
  matrixSourceEnum,
  milestoneStatusEnum,
} from "./enums";

import { users, projects, papers } from "./core";

// ---------------------------------------------------------------------------
// 42. screening_criteria
// ---------------------------------------------------------------------------
export const screeningCriteria = pgTable(
  "screening_criteria",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    criterionType: criterionTypeEnum("criterion_type"),
    description: text("description").notNull(),
    category: text("category"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_screening_criteria_proj").on(table.projectId),
  ]
);

// ---------------------------------------------------------------------------
// 43. screening_decisions
// ---------------------------------------------------------------------------
export const screeningDecisions = pgTable(
  "screening_decisions",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    paperId: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    stage: screeningStageEnum("stage"),
    decision: screeningDecisionEnum("decision"),
    reason: text("reason"),
    decidedBy: decidedByEnum("decided_by"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("screening_decisions_project_paper_stage_unique").on(
      table.projectId,
      table.paperId,
      table.stage
    ),
    index("idx_screening_decisions_proj").on(table.projectId),
    index("idx_screening_decisions_paper").on(table.paperId),
  ]
);

// ---------------------------------------------------------------------------
// 44. prisma_flow
// ---------------------------------------------------------------------------
export const prismaFlow = pgTable(
  "prisma_flow",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    stage: text("stage").notNull(),
    source: text("source"),
    recordCount: integer("record_count").default(0),
    excludedCount: integer("excluded_count").default(0),
    exclusionReasons: jsonb("exclusion_reasons"),
    updatedAt: timestamp("updated_at").defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_prisma_flow_project").on(table.projectId),
  ]
);

// ---------------------------------------------------------------------------
// 45. risk_of_bias
// ---------------------------------------------------------------------------
export const riskOfBias = pgTable(
  "risk_of_bias",
  {
    id: serial("id").primaryKey(),
    paperId: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    domain: text("domain").notNull(),
    judgment: riskJudgmentEnum("judgment"),
    supportText: text("support_text"),
    assessedBy: assessedByEnum("assessed_by"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("risk_of_bias_paper_project_domain_unique").on(
      table.paperId,
      table.projectId,
      table.domain
    ),
    index("idx_risk_of_bias_paper").on(table.paperId),
    index("idx_risk_of_bias_project").on(table.projectId),
  ]
);

// ---------------------------------------------------------------------------
// 46. meta_analysis_results
// ---------------------------------------------------------------------------
export const metaAnalysisResults = pgTable(
  "meta_analysis_results",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    analysisName: text("analysis_name"),
    outcomeMeasure: text("outcome_measure"),
    effectModel: effectModelEnum("effect_model"),
    pooledEffect: real("pooled_effect"),
    pooledCiLower: real("pooled_ci_lower"),
    pooledCiUpper: real("pooled_ci_upper"),
    heterogeneityI2: real("heterogeneity_i2"),
    heterogeneityP: real("heterogeneity_p"),
    studyData: jsonb("study_data"),
    forestPlotPath: text("forest_plot_path"),
    funnelPlotPath: text("funnel_plot_path"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_meta_analysis_project").on(table.projectId),
  ]
);

// ---------------------------------------------------------------------------
// 47. comparison_matrices
// ---------------------------------------------------------------------------
export const comparisonMatrices = pgTable(
  "comparison_matrices",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  () => []
);

// ---------------------------------------------------------------------------
// 48. matrix_columns
// ---------------------------------------------------------------------------
export const matrixColumns = pgTable(
  "matrix_columns",
  {
    id: serial("id").primaryKey(),
    matrixId: integer("matrix_id")
      .notNull()
      .references(() => comparisonMatrices.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    sortOrder: integer("sort_order"),
    columnType: columnTypeEnum("column_type").default("text"),
    options: jsonb("options"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_matrix_columns_matrix").on(table.matrixId),
  ]
);

// ---------------------------------------------------------------------------
// 49. matrix_cells
// ---------------------------------------------------------------------------
export const matrixCells = pgTable(
  "matrix_cells",
  {
    id: serial("id").primaryKey(),
    matrixId: integer("matrix_id")
      .notNull()
      .references(() => comparisonMatrices.id, { onDelete: "cascade" }),
    columnId: integer("column_id")
      .notNull()
      .references(() => matrixColumns.id, { onDelete: "cascade" }),
    paperId: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    value: text("value"),
    source: matrixSourceEnum("source"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    unique("matrix_cells_matrix_column_paper_unique").on(
      table.matrixId,
      table.columnId,
      table.paperId
    ),
    index("idx_matrix_cells_matrix").on(table.matrixId),
    index("idx_matrix_cells_paper").on(table.paperId),
  ]
);

// ---------------------------------------------------------------------------
// 50. project_milestones
// ---------------------------------------------------------------------------
export const projectMilestones = pgTable(
  "project_milestones",
  {
    id: serial("id").primaryKey(),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),
    targetDate: date("target_date"),
    sortOrder: integer("sort_order"),
    status: milestoneStatusEnum("status").default("pending"),
    completedAt: timestamp("completed_at"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_milestones_project").on(table.projectId),
  ]
);

// ---------------------------------------------------------------------------
// 51. milestone_progress
// ---------------------------------------------------------------------------
export const milestoneProgress = pgTable("milestone_progress", {
  id: serial("id").primaryKey(),
  milestoneId: integer("milestone_id")
    .notNull()
    .references(() => projectMilestones.id, { onDelete: "cascade" }),
  progressPct: integer("progress_pct").default(0),
  notes: text("notes"),
  updatedBy: text("updated_by").references(() => users.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow(),
});
