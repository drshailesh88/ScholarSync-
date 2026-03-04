import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

import { users, projects } from "./core";

// ---------------------------------------------------------------------------
// illustrations table
// Stores scientific illustrations from FINNISH integration
// ---------------------------------------------------------------------------

export const illustrations = pgTable(
  "illustrations",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    projectId: integer("project_id").references(() => projects.id, {
      onDelete: "set null",
    }),
    title: text("title").notNull().default("Untitled Illustration"),
    description: text("description"),

    // The actual content
    svgContent: text("svg_content"), // Final SVG string
    canvasJson: jsonb("canvas_json"), // Fabric.js canvas state (for re-editing)
    mermaidSyntax: text("mermaid_syntax"), // If generated via Mermaid backend

    // Metadata
    domain: text("domain"), // "cardiology", "biology", etc.
    sourceBackend: text("source_backend"), // "mermaid", "svg", "ai-image", "manual"
    sourcePrompt: text("source_prompt"), // The prompt that generated it
    width: integer("width"),
    height: integer("height"),

    // Exports
    pngR2Key: text("png_r2_key"), // R2 path for PNG export cache
    pdfR2Key: text("pdf_r2_key"), // R2 path for PDF export cache

    // Timestamps
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("idx_illustrations_user").on(table.userId),
    index("idx_illustrations_project").on(table.projectId),
    index("idx_illustrations_domain").on(table.domain),
    index("idx_illustrations_deleted").on(table.deletedAt),
  ]
);
