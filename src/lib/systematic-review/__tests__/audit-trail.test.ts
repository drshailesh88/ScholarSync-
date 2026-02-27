// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck — mock chain types are intentionally loose
/**
 * Unit tests for the audit-trail module.
 *
 * All database calls are mocked — these are pure unit tests that verify
 * the business logic, pagination, filtering, CSV export, and summary
 * aggregation in each exported function.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted mock variables — accessible inside vi.mock factory closures
// ---------------------------------------------------------------------------

const {
  mockOffset,
  mockLimit,
  _mockOrderBy,
  _mockGroupBy,
  mockWhere,
  mockFrom,
  mockSelect,
  mockInsert,
  mockValues,
} = vi.hoisted(() => {
  const mockOffset = vi.fn().mockResolvedValue([]);
  const mockLimit = vi.fn(() => ({ offset: mockOffset }));
  const mockOrderBy = vi.fn(() => ({ limit: mockLimit }));
  const mockGroupBy = vi.fn().mockResolvedValue([]);
  const mockWhere = vi.fn(() => ({
    orderBy: mockOrderBy,
    groupBy: mockGroupBy,
  }));
  const mockFrom = vi.fn(() => ({ where: mockWhere }));
  const mockSelect = vi.fn(() => ({ from: mockFrom }));
  const mockValues = vi.fn().mockResolvedValue(undefined);
  const mockInsert = vi.fn(() => ({ values: mockValues }));

  return {
    mockOffset,
    mockLimit,
    _mockOrderBy: mockOrderBy,
    _mockGroupBy: mockGroupBy,
    mockWhere,
    mockFrom,
    mockSelect,
    mockInsert,
    mockValues,
  };
});

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock("@/lib/db", () => ({
  db: {
    select: mockSelect,
    insert: mockInsert,
  },
}));

vi.mock("@/lib/db/schema", () => ({
  srAuditLog: {
    id: "id",
    projectId: "projectId",
    userId: "userId",
    action: "action",
    entityType: "entityType",
    entityId: "entityId",
    details: "details",
    aiInvolved: "aiInvolved",
    createdAt: "createdAt",
  },
}));

vi.mock("drizzle-orm", () => ({
  eq: vi.fn((col: unknown, val: unknown) => ({ col, val })),
  and: vi.fn((...args: unknown[]) => ({ and: args })),
  desc: vi.fn((col: unknown) => ({ desc: col })),
  sql: vi.fn((strings: TemplateStringsArray, ...values: unknown[]) => ({
    sql: strings,
    values,
  })),
}));

// ---------------------------------------------------------------------------
// Actual imports (after mocks)
// ---------------------------------------------------------------------------

import {
  logAuditEvent,
  getAuditLog,
  exportAuditLog,
  getAuditSummary,
  type AuditEvent,
} from "@/lib/systematic-review/audit-trail";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeAuditRow(overrides?: Record<string, unknown>) {
  return {
    id: 1,
    userId: "user_abc",
    action: "screen",
    entityType: "paper",
    entityId: 100,
    details: null,
    aiInvolved: false,
    createdAt: new Date("2026-01-15T10:30:00Z"),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Reset mocks between tests
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// logAuditEvent
// ---------------------------------------------------------------------------

describe("logAuditEvent", () => {
  it("inserts an event with all fields", async () => {
    const event: AuditEvent = {
      projectId: 42,
      userId: "user_abc",
      action: "screen",
      entityType: "paper",
      entityId: 100,
      details: { decision: "include" },
      aiInvolved: true,
    };

    await logAuditEvent(event);

    expect(mockInsert).toHaveBeenCalled();
    expect(mockValues).toHaveBeenCalledWith({
      projectId: 42,
      userId: "user_abc",
      action: "screen",
      entityType: "paper",
      entityId: 100,
      details: { decision: "include" },
      aiInvolved: true,
    });
  });

  it("defaults entityId to null and aiInvolved to false when omitted", async () => {
    const event: AuditEvent = {
      projectId: 42,
      userId: "user_abc",
      action: "config_change",
      entityType: "config",
    };

    await logAuditEvent(event);

    expect(mockValues).toHaveBeenCalledWith({
      projectId: 42,
      userId: "user_abc",
      action: "config_change",
      entityType: "config",
      entityId: null,
      details: null,
      aiInvolved: false,
    });
  });
});

// ---------------------------------------------------------------------------
// getAuditLog
// ---------------------------------------------------------------------------

describe("getAuditLog", () => {
  it("returns rows with default pagination (limit 100, offset 0)", async () => {
    const rows = [makeAuditRow(), makeAuditRow({ id: 2, action: "extract" })];
    mockOffset.mockResolvedValueOnce(rows);

    const result = await getAuditLog(42);

    expect(result).toHaveLength(2);
    expect(mockSelect).toHaveBeenCalled();
    // Default limit/offset should be applied
    expect(mockLimit).toHaveBeenCalledWith(100);
    expect(mockOffset).toHaveBeenCalledWith(0);
  });

  it("applies custom limit and offset for pagination", async () => {
    mockOffset.mockResolvedValueOnce([makeAuditRow()]);

    await getAuditLog(42, { limit: 10, offset: 20 });

    expect(mockLimit).toHaveBeenCalledWith(10);
    expect(mockOffset).toHaveBeenCalledWith(20);
  });

  it("filters by action when provided", async () => {
    mockOffset.mockResolvedValueOnce([makeAuditRow({ action: "screen" })]);

    const result = await getAuditLog(42, { action: "screen" });

    expect(result).toHaveLength(1);
    expect(result[0].action).toBe("screen");
  });

  it("filters by userId when provided", async () => {
    mockOffset.mockResolvedValueOnce([makeAuditRow({ userId: "user_xyz" })]);

    const result = await getAuditLog(42, { userId: "user_xyz" });

    expect(result).toHaveLength(1);
    expect(result[0].userId).toBe("user_xyz");
  });

  it("maps null aiInvolved to false", async () => {
    mockOffset.mockResolvedValueOnce([makeAuditRow({ aiInvolved: null })]);

    const result = await getAuditLog(42);

    expect(result[0].aiInvolved).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// exportAuditLog
// ---------------------------------------------------------------------------

describe("exportAuditLog", () => {
  it("returns a valid CSV with header and data rows", async () => {
    const rows = [
      makeAuditRow({
        id: 1,
        userId: "user_1",
        action: "screen",
        entityType: "paper",
        entityId: 100,
        details: null,
        aiInvolved: false,
        createdAt: new Date("2026-01-15T10:30:00.000Z"),
      }),
      makeAuditRow({
        id: 2,
        userId: "user_2",
        action: "extract",
        entityType: "extraction",
        entityId: 200,
        details: { key: "value" },
        aiInvolved: true,
        createdAt: new Date("2026-01-16T12:00:00.000Z"),
      }),
    ];

    // exportAuditLog uses a simpler chain: select -> from -> where -> orderBy
    mockWhere.mockReturnValueOnce({ orderBy: vi.fn().mockResolvedValueOnce(rows) });

    const csv = await exportAuditLog(42);
    const lines = csv.split("\n");

    // Header
    expect(lines[0]).toBe(
      "Timestamp,User,Action,Entity Type,Entity ID,AI Involved,Details"
    );

    // First data row
    expect(lines[1]).toContain("2026-01-15T10:30:00.000Z");
    expect(lines[1]).toContain("user_1");
    expect(lines[1]).toContain("screen");
    expect(lines[1]).toContain("paper");
    expect(lines[1]).toContain("100");
    expect(lines[1]).toContain("false");

    // Second data row — AI involved
    expect(lines[2]).toContain("true");
    expect(lines[2]).toContain("extract");

    // Total lines: header + 2 data rows
    expect(lines).toHaveLength(3);
  });

  it("handles empty details and null entityId gracefully", async () => {
    const rows = [
      makeAuditRow({
        entityId: null,
        details: null,
        createdAt: new Date("2026-02-01T00:00:00.000Z"),
      }),
    ];

    mockWhere.mockReturnValueOnce({ orderBy: vi.fn().mockResolvedValueOnce(rows) });

    const csv = await exportAuditLog(42);
    const lines = csv.split("\n");
    const dataLine = lines[1];

    // entityId should be empty string, details should be empty
    expect(dataLine).toContain("user_abc");
    // There should be consecutive commas where entityId is empty
    expect(dataLine).toMatch(/,,/);
  });

  it("handles null createdAt", async () => {
    const rows = [makeAuditRow({ createdAt: null })];

    mockWhere.mockReturnValueOnce({ orderBy: vi.fn().mockResolvedValueOnce(rows) });

    const csv = await exportAuditLog(42);
    const lines = csv.split("\n");

    // Timestamp field should be empty
    expect(lines[1]).toMatch(/^,/);
  });

  it("returns only the header when there are no events", async () => {
    mockWhere.mockReturnValueOnce({ orderBy: vi.fn().mockResolvedValueOnce([]) });

    const csv = await exportAuditLog(42);

    expect(csv).toBe(
      "Timestamp,User,Action,Entity Type,Entity ID,AI Involved,Details"
    );
  });
});

// ---------------------------------------------------------------------------
// getAuditSummary
// ---------------------------------------------------------------------------

describe("getAuditSummary", () => {
  it("returns correct counts for total, AI-assisted, and human-only events", async () => {
    // First select — aggregate counts
    mockWhere.mockReturnValueOnce({
      orderBy: vi.fn().mockResolvedValue([]),
      groupBy: vi.fn().mockResolvedValue([]),
    });
    // getAuditSummary does two selects:
    // 1) count(*) aggregate — returns via the from->where chain
    // We need the first call to where to resolve to counts
    mockFrom
      .mockReturnValueOnce({
        where: vi.fn().mockResolvedValueOnce([{ total: 15, aiCount: 7 }]),
      })
      // 2) per-action groupBy — returns action counts
      .mockReturnValueOnce({
        where: vi.fn(() => ({
          groupBy: vi.fn().mockResolvedValueOnce([
            { action: "screen", count: 10 },
            { action: "extract", count: 5 },
          ]),
        })),
      });

    const summary = await getAuditSummary(42);

    expect(summary.totalEvents).toBe(15);
    expect(summary.aiAssistedEvents).toBe(7);
    expect(summary.humanOnlyEvents).toBe(8);
    expect(summary.eventsByAction).toEqual({
      screen: 10,
      extract: 5,
    });
  });

  it("returns zeros when no events exist", async () => {
    mockFrom
      .mockReturnValueOnce({
        where: vi.fn().mockResolvedValueOnce([{ total: 0, aiCount: 0 }]),
      })
      .mockReturnValueOnce({
        where: vi.fn(() => ({
          groupBy: vi.fn().mockResolvedValueOnce([]),
        })),
      });

    const summary = await getAuditSummary(42);

    expect(summary.totalEvents).toBe(0);
    expect(summary.aiAssistedEvents).toBe(0);
    expect(summary.humanOnlyEvents).toBe(0);
    expect(summary.eventsByAction).toEqual({});
  });

  it("handles null counts gracefully (defaults to 0)", async () => {
    mockFrom
      .mockReturnValueOnce({
        where: vi.fn().mockResolvedValueOnce([undefined]),
      })
      .mockReturnValueOnce({
        where: vi.fn(() => ({
          groupBy: vi.fn().mockResolvedValueOnce([]),
        })),
      });

    const summary = await getAuditSummary(42);

    expect(summary.totalEvents).toBe(0);
    expect(summary.aiAssistedEvents).toBe(0);
    expect(summary.humanOnlyEvents).toBe(0);
  });
});
