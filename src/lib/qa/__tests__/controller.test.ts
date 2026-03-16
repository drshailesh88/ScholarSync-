import { describe, expect, it } from "vitest";
import { selectRunnableQueueItems } from "../../../../qa/controller";

const baseItem = {
  module: "dashboard",
  spec_file: "e2e/specs/dashboard/spec-001.md",
  priority: 1,
  checkpoints: 35,
  page_url: "/dashboard",
  pass1_agent: "claude",
  pass1_result: { pass: 35, fail: 0, blocked: 0 },
  pass2_agent: null,
  pass2_result: null,
  attempts: 1,
  max_attempts: 3,
  blocked_reason: null,
};

describe("selectRunnableQueueItems", () => {
  it("selects pass1_done specs for pass2 module runs", () => {
    const queue = [
      { ...baseItem, id: "dashboard.spec-001", status: "pass1_done" },
      { ...baseItem, id: "dashboard.spec-002", status: "pending" },
    ];

    expect(
      selectRunnableQueueItems(queue, {
        moduleFilter: "dashboard",
        agentName: "codex",
      }).map((item) => item.id)
    ).toEqual(["dashboard.spec-001"]);
  });

  it("selects pending specs for pass1 runs", () => {
    const queue = [
      { ...baseItem, id: "dashboard.spec-001", status: "pass1_done" },
      { ...baseItem, id: "dashboard.spec-002", status: "pending" },
    ];

    expect(
      selectRunnableQueueItems(queue, {
        moduleFilter: "dashboard",
        agentName: "claude",
      }).map((item) => item.id)
    ).toEqual(["dashboard.spec-002"]);
  });

  it("allows pass2 reruns for an explicit spec filter", () => {
    const queue = [
      { ...baseItem, id: "dashboard.spec-001", status: "pass2_done" },
      { ...baseItem, id: "dashboard.spec-002", status: "blocked" },
    ];

    expect(
      selectRunnableQueueItems(queue, {
        specFilter: "dashboard.spec-002",
        agentName: "codex",
      }).map((item) => item.id)
    ).toEqual(["dashboard.spec-002"]);
  });
});
