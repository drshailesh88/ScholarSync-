/**
 * Tests for systematic review Zustand store
 *
 * Tests systematic review workflow state including PICO, screening, and projects
 */

import { describe, it, expect, beforeEach } from "vitest";
import { useSystematicReviewStore, type Criterion, type ScreeningResult } from "../systematic-review-store";

describe("useSystematicReviewStore", () => {
  beforeEach(() => {
    useSystematicReviewStore.getState().clearProject();
  });

  describe("initial state", () => {
    it("has no active project", () => {
      const state = useSystematicReviewStore.getState();
      expect(state.projectId).toBeNull();
      expect(state.projectTitle).toBe("");
      expect(state.reviewConfig).toBeNull();
    });

    it("starts on strategy tab", () => {
      const state = useSystematicReviewStore.getState();
      expect(state.activeTab).toBe("strategy");
    });

    it("is in search_strategy stage", () => {
      const state = useSystematicReviewStore.getState();
      expect(state.reviewStage).toBe("search_strategy");
    });

    it("has default PICO with empty strings", () => {
      const state = useSystematicReviewStore.getState();
      expect(state.pico.population).toBe("");
      expect(state.pico.intervention).toBe("");
      expect(state.pico.comparison).toBe("");
      expect(state.pico.outcome).toBe("");
    });

    it("has no generated strategy", () => {
      const state = useSystematicReviewStore.getState();
      expect(state.generatedStrategy).toBeNull();
    });

    it("has one default inclusion criterion", () => {
      const state = useSystematicReviewStore.getState();
      expect(state.criteria).toHaveLength(1);
      expect(state.criteria[0].type).toBe("inclusion");
    });

    it("has no screening results", () => {
      const state = useSystematicReviewStore.getState();
      expect(state.screeningResults).toEqual([]);
    });

    it("has no screening summary", () => {
      const state = useSystematicReviewStore.getState();
      expect(state.screeningSummary).toBeNull();
    });

    it("has no projects", () => {
      const state = useSystematicReviewStore.getState();
      expect(state.projects).toEqual([]);
    });

    it("not loading projects", () => {
      const state = useSystematicReviewStore.getState();
      expect(state.isLoadingProjects).toBe(false);
    });
  });

  describe("setProject", () => {
    it("sets project context", () => {
      const store = useSystematicReviewStore.getState();
      const config = {
        id: 1,
        projectId: 100,
        pico: { population: "Adults", intervention: "Drug", comparison: "Placebo", outcome: "Mortality" },
        searchStrategy: null,
        searchDatabases: [],
        protocolRegistration: null,
        reviewStage: "screening" as const,
        settings: {},
      };

      store.setProject(1, "Test Review", config);

      const state = useSystematicReviewStore.getState();
      expect(state.projectId).toBe(1);
      expect(state.projectTitle).toBe("Test Review");
      expect(state.reviewConfig).toEqual(config);
      expect(state.reviewStage).toBe("screening");
    });

    it("loads PICO from config", () => {
      const store = useSystematicReviewStore.getState();
      const config = {
        id: 1,
        projectId: 100,
        pico: { population: "Patients", intervention: "Treatment", comparison: "Control", outcome: "Recovery" },
        searchStrategy: null,
        searchDatabases: [],
        protocolRegistration: null,
        reviewStage: "search_strategy" as const,
        settings: {},
      };

      store.setProject(1, "Test", config);

      expect(useSystematicReviewStore.getState().pico).toEqual(config.pico);
    });

    it("loads searchStrategy from config", () => {
      const store = useSystematicReviewStore.getState();
      const strategy = {
        fullSearchString: "test search",
        blocks: [],
        suggestedFilters: [],
      };
      const config = {
        id: 1,
        projectId: 100,
        pico: null,
        searchStrategy: strategy,
        searchDatabases: [],
        protocolRegistration: null,
        reviewStage: "search_strategy" as const,
        settings: {},
      };

      store.setProject(1, "Test", config);

      expect(useSystematicReviewStore.getState().generatedStrategy).toEqual(strategy);
    });

    it("sets reviewStage from config", () => {
      const store = useSystematicReviewStore.getState();
      const config = {
        id: 1,
        projectId: 100,
        pico: null,
        searchStrategy: null,
        searchDatabases: [],
        protocolRegistration: null,
        reviewStage: "data_extraction" as const,
        settings: {},
      };

      store.setProject(1, "Test", config);

      expect(useSystematicReviewStore.getState().reviewStage).toBe("data_extraction");
    });
  });

  describe("clearProject", () => {
    it("clears all project state", () => {
      const store = useSystematicReviewStore.getState();
      store.setProject(1, "Test", {
        id: 1,
        projectId: 100,
        pico: { population: "P", intervention: "I", comparison: "C", outcome: "O" },
        searchStrategy: null,
        searchDatabases: [],
        protocolRegistration: null,
        reviewStage: "search_strategy" as const,
        settings: {},
      });
      store.setPICO({ population: "Modified", intervention: "I", comparison: "C", outcome: "O" });

      store.clearProject();

      const state = useSystematicReviewStore.getState();
      expect(state.projectId).toBeNull();
      expect(state.projectTitle).toBe("");
      expect(state.reviewConfig).toBeNull();
      expect(state.activeTab).toBe("strategy");
      expect(state.reviewStage).toBe("search_strategy");
      expect(state.pico.population).toBe("");
    });

    it("resets to default criterion", () => {
      const store = useSystematicReviewStore.getState();
      store.setCriteria([{ type: "exclusion", description: "Test" }]);

      store.clearProject();

      expect(useSystematicReviewStore.getState().criteria).toEqual([
        { type: "inclusion", description: "" },
      ]);
    });
  });

  describe("setActiveTab", () => {
    it("changes active tab", () => {
      const store = useSystematicReviewStore.getState();
      store.setActiveTab("screening");
      expect(useSystematicReviewStore.getState().activeTab).toBe("screening");
    });

    it("accepts all workflow tabs", () => {
      const store = useSystematicReviewStore.getState();
      const tabs: Array<
        "strategy" | "import" | "screening" | "prisma" | "rob2" | "rob" | "extraction" | "meta_analysis" | "nma" | "snowball" | "export" | "living" | "protocol" | "prospero" | "grade" | "manuscript"
      > = ["strategy", "screening", "extraction", "export"];

      tabs.forEach((tab) => {
        store.setActiveTab(tab);
        expect(useSystematicReviewStore.getState().activeTab).toBe(tab);
      });
    });
  });

  describe("setReviewStage", () => {
    it("changes review stage", () => {
      const store = useSystematicReviewStore.getState();
      store.setReviewStage("screening");
      expect(useSystematicReviewStore.getState().reviewStage).toBe("screening");
    });

    it("accepts all stage values", () => {
      const store = useSystematicReviewStore.getState();
      const stages: Array<
        "search_strategy" | "screening" | "full_text_screening" | "data_extraction" | "risk_of_bias" | "meta_analysis" | "reporting"
      > = ["search_strategy", "screening", "data_extraction"];

      stages.forEach((stage) => {
        store.setReviewStage(stage);
        expect(useSystematicReviewStore.getState().reviewStage).toBe(stage);
      });
    });
  });

  describe("PICO", () => {
    it("setPICO updates all PICO elements", () => {
      const store = useSystematicReviewStore.getState();
      const pico = {
        population: "Adults with diabetes",
        intervention: "SGLT2 inhibitors",
        comparison: "Placebo",
        outcome: "HbA1c reduction",
      };

      store.setPICO(pico);

      expect(useSystematicReviewStore.getState().pico).toEqual(pico);
    });

    it("can update individual elements", () => {
      const store = useSystematicReviewStore.getState();
      store.setPICO({ ...useSystematicReviewStore.getState().pico, population: "New population" });
      expect(useSystematicReviewStore.getState().pico.population).toBe("New population");
    });
  });

  describe("search strategy", () => {
    it("setGeneratedStrategy sets strategy", () => {
      const store = useSystematicReviewStore.getState();
      const strategy = {
        fullSearchString: "diabetes AND sglt2",
        blocks: [],
        suggestedFilters: [],
      };

      store.setGeneratedStrategy(strategy);

      expect(useSystematicReviewStore.getState().generatedStrategy).toEqual(strategy);
    });

    it("can clear strategy with null", () => {
      const store = useSystematicReviewStore.getState();
      store.setGeneratedStrategy({
        fullSearchString: "test",
        blocks: [],
        suggestedFilters: [],
      });
      expect(useSystematicReviewStore.getState().generatedStrategy).toBeDefined();

      store.setGeneratedStrategy(null);
      expect(useSystematicReviewStore.getState().generatedStrategy).toBeNull();
    });
  });

  describe("screening", () => {
    it("setCriteria replaces all criteria", () => {
      const store = useSystematicReviewStore.getState();
      const criteria: Criterion[] = [
        { id: 1, type: "inclusion", description: "RCTs only" },
        { id: 2, type: "exclusion", description: "Non-English" },
      ];

      store.setCriteria(criteria);

      expect(useSystematicReviewStore.getState().criteria).toEqual(criteria);
    });

    it("setScreeningResults sets results", () => {
      const store = useSystematicReviewStore.getState();
      const results: ScreeningResult[] = [
        {
          paperId: 1,
          title: "Paper 1",
          decision: "include",
          confidence: 0.9,
          requiresHumanReview: false,
          reason: "Meets criteria",
        },
      ];

      store.setScreeningResults(results);

      expect(useSystematicReviewStore.getState().screeningResults).toEqual(results);
    });

    it("setScreeningSummary sets summary", () => {
      const store = useSystematicReviewStore.getState();
      const summary = {
        total: 100,
        included: 50,
        excluded: 40,
        conflicts: 10,
      };

      store.setScreeningSummary(summary);

      expect(useSystematicReviewStore.getState().screeningSummary).toEqual(summary);
    });

    it("can clear summary with null", () => {
      const store = useSystematicReviewStore.getState();
      store.setScreeningSummary({
        total: 10,
        included: 5,
        excluded: 5,
        conflicts: 0,
      });
      expect(useSystematicReviewStore.getState().screeningSummary).toBeDefined();

      store.setScreeningSummary(null);
      expect(useSystematicReviewStore.getState().screeningSummary).toBeNull();
    });
  });

  describe("project list", () => {
    it("setProjects sets project list", () => {
      const store = useSystematicReviewStore.getState();
      const projects = [
        {
          id: 1,
          title: "Review 1",
          description: "Test review",
          researchQuestion: "Question?",
          status: "active",
          reviewStage: "search_strategy" as const,
          paperCount: 100,
          screeningProgress: 25,
          createdAt: "2023-01-01",
        },
      ];

      store.setProjects(projects);

      expect(useSystematicReviewStore.getState().projects).toEqual(projects);
    });

    it("setIsLoadingProjects changes loading state", () => {
      const store = useSystematicReviewStore.getState();
      store.setIsLoadingProjects(true);
      expect(useSystematicReviewStore.getState().isLoadingProjects).toBe(true);

      store.setIsLoadingProjects(false);
      expect(useSystematicReviewStore.getState().isLoadingProjects).toBe(false);
    });
  });
});
