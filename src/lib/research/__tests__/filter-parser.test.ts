import { describe, it, expect } from "vitest";
import { parseNaturalLanguageFilters } from "../filter-parser";

describe("parseNaturalLanguageFilters", () => {
  it("extracts RCT study type", () => {
    const result = parseNaturalLanguageFilters("RCTs on semaglutide");
    expect(result.filters.studyTypes).toContain("rct");
    expect(result.chips.some(c => c.type === "studyType")).toBe(true);
    expect(result.query).toContain("semaglutide");
    expect(result.query).not.toMatch(/\brcts?\b/i);
  });

  it("extracts systematic review", () => {
    const result = parseNaturalLanguageFilters("systematic reviews of SGLT2 inhibitors");
    expect(result.filters.studyTypes).toContain("systematic_review");
    expect(result.query).toContain("SGLT2 inhibitors");
  });

  it("extracts meta-analysis", () => {
    const result = parseNaturalLanguageFilters("meta-analysis of aspirin");
    expect(result.filters.studyTypes).toContain("meta_analysis");
  });

  it("extracts 'since YEAR' date filter", () => {
    const result = parseNaturalLanguageFilters("studies since 2020");
    expect(result.filters.dateFrom).toBe(2020);
    expect(result.chips.some(c => c.type === "dateRange")).toBe(true);
  });

  it("extracts 'after YEAR' date filter", () => {
    const result = parseNaturalLanguageFilters("papers after 2019");
    expect(result.filters.dateFrom).toBe(2020);
  });

  it("extracts 'before YEAR' date filter", () => {
    const result = parseNaturalLanguageFilters("research before 2015");
    expect(result.filters.dateTo).toBe(2014);
  });

  it("extracts year range", () => {
    const result = parseNaturalLanguageFilters("studies 2018-2023");
    expect(result.filters.dateFrom).toBe(2018);
    expect(result.filters.dateTo).toBe(2023);
  });

  it("extracts 'last N years' filter", () => {
    const result = parseNaturalLanguageFilters("last 5 years metformin");
    const expectedFrom = new Date().getFullYear() - 5;
    expect(result.filters.dateFrom).toBe(expectedFrom);
  });

  it("extracts population mention", () => {
    const result = parseNaturalLanguageFilters("diabetes in adults");
    expect(result.chips.some(c => c.type === "population" && c.value === "adults")).toBe(true);
  });

  it("extracts children population", () => {
    const result = parseNaturalLanguageFilters("asthma treatment in children");
    expect(result.chips.some(c => c.type === "population" && c.value === "children")).toBe(true);
  });

  it("combines study type, date, and population", () => {
    const result = parseNaturalLanguageFilters("RCTs on semaglutide since 2020 in adults");
    expect(result.filters.studyTypes).toContain("rct");
    expect(result.filters.dateFrom).toBe(2020);
    expect(result.chips.some(c => c.type === "population")).toBe(true);
    expect(result.query).toContain("semaglutide");
  });

  it("cleans leftover prepositions", () => {
    const result = parseNaturalLanguageFilters("RCTs on metformin");
    expect(result.query).not.toMatch(/\bon\b/);
    expect(result.query).toContain("metformin");
  });

  it("handles query with no filters", () => {
    const result = parseNaturalLanguageFilters("cardiovascular disease mechanisms");
    expect(result.filters.studyTypes).toBeUndefined();
    expect(result.filters.dateFrom).toBeUndefined();
    expect(result.chips).toHaveLength(0);
    expect(result.query).toBe("cardiovascular disease mechanisms");
  });

  it("extracts clinical trial study type", () => {
    const result = parseNaturalLanguageFilters("clinical trials of pembrolizumab");
    expect(result.filters.studyTypes).toContain("clinical_trial");
  });

  it("extracts guideline study type", () => {
    const result = parseNaturalLanguageFilters("practice guidelines for hypertension");
    expect(result.filters.studyTypes).toContain("guideline");
  });

  it("extracts cohort study type", () => {
    const result = parseNaturalLanguageFilters("cohort studies on statins");
    expect(result.filters.studyTypes).toContain("cohort");
  });

  it("handles elderly population", () => {
    const result = parseNaturalLanguageFilters("falls prevention in elderly");
    expect(result.chips.some(c => c.value === "elderly")).toBe(true);
  });
});
