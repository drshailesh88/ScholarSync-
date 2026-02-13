import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
  index,
  unique,
} from "drizzle-orm/pg-core";

import {
  institutionTypeEnum,
  membershipRoleEnum,
} from "./enums";

import { users, projects } from "./core";

// ---------------------------------------------------------------------------
// 53. institutions
// ---------------------------------------------------------------------------
export const institutions = pgTable("institutions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  domain: text("domain"),
  country: text("country"),
  institutionType: institutionTypeEnum("institution_type"),
  logoUrl: text("logo_url"),
  settings: jsonb("settings").default({}),
  createdAt: timestamp("created_at").defaultNow(),
});

// ---------------------------------------------------------------------------
// 54. institution_memberships
// ---------------------------------------------------------------------------
export const institutionMemberships = pgTable(
  "institution_memberships",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    institutionId: integer("institution_id")
      .notNull()
      .references(() => institutions.id, { onDelete: "cascade" }),
    role: membershipRoleEnum("role"),
    department: text("department"),
    joinedAt: timestamp("joined_at").defaultNow(),
  },
  (table) => [
    unique("institution_memberships_user_institution_unique").on(
      table.userId,
      table.institutionId
    ),
    index("idx_inst_memberships_user").on(table.userId),
    index("idx_inst_memberships_inst").on(table.institutionId),
  ]
);

// ---------------------------------------------------------------------------
// 55. supervisor_assignments
// ---------------------------------------------------------------------------
export const supervisorAssignments = pgTable(
  "supervisor_assignments",
  {
    id: serial("id").primaryKey(),
    supervisorId: text("supervisor_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    studentId: text("student_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    projectId: integer("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    assignedAt: timestamp("assigned_at").defaultNow(),
  },
  (table) => [
    unique("supervisor_assignments_student_project_unique").on(
      table.studentId,
      table.projectId
    ),
    index("idx_supervisor_assign_super").on(table.supervisorId),
    index("idx_supervisor_assign_student").on(table.studentId),
  ]
);
