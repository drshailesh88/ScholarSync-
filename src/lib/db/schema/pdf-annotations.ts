import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
  index,
  real,
} from "drizzle-orm/pg-core";
import { papers } from "./core";
import { annotationColorEnum } from "./enums";

// ============================================================
// PDF Highlights & Annotations
// ============================================================
export const pdfHighlights = pgTable(
  "pdf_highlights",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id").notNull(),
    paper_id: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    user_id: text("user_id").notNull(),
    page_number: integer("page_number").notNull(),
    rects: jsonb("rects")
      .notNull()
      .$type<
        Array<{ x: number; y: number; width: number; height: number }>
      >(),
    selected_text: text("selected_text").notNull(),
    start_offset: integer("start_offset").notNull(),
    end_offset: integer("end_offset").notNull(),
    color: annotationColorEnum("color").default("yellow"),
    note: text("note"),
    target_section: text("target_section"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_pdf_highlights_paper").on(table.paper_id),
    index("idx_pdf_highlights_project").on(table.project_id),
    index("idx_pdf_highlights_user").on(table.user_id),
    index("idx_pdf_highlights_page").on(table.paper_id, table.page_number),
  ]
);

// ============================================================
// Evidence Notes (from PDF reading)
// ============================================================
export const evidenceNotes = pgTable(
  "evidence_notes",
  {
    id: serial("id").primaryKey(),
    project_id: integer("project_id").notNull(),
    paper_id: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    user_id: text("user_id").notNull(),
    page_number: integer("page_number").notNull(),
    start_offset: integer("start_offset").notNull(),
    end_offset: integer("end_offset").notNull(),
    quoted_text: text("quoted_text").notNull(),
    user_note: text("user_note").default(""),
    target_section: text("target_section").notNull(),
    color: annotationColorEnum("color").default("yellow"),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_evidence_notes_paper").on(table.paper_id),
    index("idx_evidence_notes_project").on(table.project_id),
    index("idx_evidence_notes_section").on(table.target_section),
  ]
);

// ============================================================
// Source Quotes (backing AI claims)
// ============================================================
export const sourceQuotes = pgTable(
  "source_quotes",
  {
    id: serial("id").primaryKey(),
    paper_id: integer("paper_id")
      .notNull()
      .references(() => papers.id, { onDelete: "cascade" }),
    page_number: integer("page_number").notNull(),
    section_name: text("section_name"),
    start_offset: integer("start_offset").notNull(),
    end_offset: integer("end_offset").notNull(),
    quoted_text: text("quoted_text").notNull(),
    confidence: real("confidence"),
    used_in: jsonb("used_in")
      .default([])
      .$type<
        Array<{
          type: "ai_summary" | "ai_chat" | "extraction" | "user_note";
          referenceId?: string;
        }>
      >(),
    created_at: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_source_quotes_paper").on(table.paper_id),
    index("idx_source_quotes_page").on(table.paper_id, table.page_number),
  ]
);
