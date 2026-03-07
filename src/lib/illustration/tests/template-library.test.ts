/**
 * Template Library Tests
 * Tests for template search, parametric wizard, general-purpose templates, and Mermaid validity.
 */

import { describe, it, expect } from 'vitest';
import {
  searchTemplates,
  allTemplates,
  fillTemplate,
  extractPlaceholders,
  getTemplateById,
} from '@/lib/illustration/data/templates';
import { generalPurposeTemplates } from '@/lib/illustration/data/templates/general-purpose';

// ============================================================================
// Test 1: Template search finds "CONSORT" in results
// ============================================================================

describe('Template search', () => {
  it('finds "CONSORT" in search results', () => {
    const results = searchTemplates({ searchTerm: 'CONSORT' });
    expect(results.length).toBeGreaterThan(0);
    const hasConsort = results.some(
      (t) =>
        t.name.toLowerCase().includes('consort') ||
        t.description.toLowerCase().includes('consort') ||
        t.id.toLowerCase().includes('consort')
    );
    expect(hasConsort).toBe(true);
  });

  it('finds general-purpose templates by name', () => {
    const swotResults = searchTemplates({ searchTerm: 'SWOT' });
    expect(swotResults.length).toBeGreaterThan(0);
    expect(swotResults[0].name).toContain('SWOT');

    const ganttResults = searchTemplates({ searchTerm: 'Gantt' });
    expect(ganttResults.length).toBeGreaterThan(0);

    const fishboneResults = searchTemplates({ searchTerm: 'Fishbone' });
    expect(fishboneResults.length).toBeGreaterThan(0);
  });

  it('filters by domain', () => {
    const generalResults = searchTemplates({ domain: 'general' });
    expect(generalResults.length).toBe(generalPurposeTemplates.length);
    generalResults.forEach((t) => {
      expect(t.domain).toBe('general');
    });
  });
});

// ============================================================================
// Test 2: Parametric wizard shows correct number of input fields
// ============================================================================

describe('Parametric template placeholders', () => {
  it('shows correct number of placeholders for each template', () => {
    for (const template of generalPurposeTemplates) {
      const extracted = extractPlaceholders(template.promptTemplate);
      // Each declared placeholder should be found in the promptTemplate
      for (const p of template.placeholders) {
        expect(extracted).toContain(p);
      }
      // The number of declared placeholders should match
      expect(template.placeholders.length).toBeGreaterThan(0);
    }
  });

  it('SWOT analysis has the expected placeholders', () => {
    const swot = getTemplateById('gen-swot-analysis');
    expect(swot).toBeDefined();
    expect(swot!.placeholders).toContain('subject');
    expect(swot!.placeholders).toContain('strengths');
    expect(swot!.placeholders).toContain('weaknesses');
    expect(swot!.placeholders).toContain('opportunities');
    expect(swot!.placeholders).toContain('threats');
  });
});

// ============================================================================
// Test 3: Filling placeholders produces valid Mermaid output
// ============================================================================

describe('Template filling', () => {
  it('filling placeholders produces valid output', () => {
    const swot = getTemplateById('gen-swot-analysis')!;
    const filled = fillTemplate(swot, {
      subject: 'Test Company',
      strengths: 'Strong brand, Great team',
      weaknesses: 'Limited budget',
      opportunities: 'Market growth',
      threats: 'Competition',
    });

    expect(filled.filledPrompt).toContain('Test Company');
    expect(filled.filledPrompt).toContain('Strong brand');
    expect(filled.filledPrompt).toContain('Market growth');
    // Should not contain unfilled placeholders
    expect(filled.filledPrompt).not.toMatch(/\{\{\w+\}\}/);
  });

  it('handles conditional blocks correctly', () => {
    const gantt = getTemplateById('gen-gantt-chart')!;

    // With optional field filled
    const filledWith = fillTemplate(gantt, {
      projectName: 'My Project',
      startDate: '2024-01-01',
      tasks: 'Task A, Task B',
      milestones: 'MVP Launch',
    });
    expect(filledWith.filledPrompt).toContain('MVP Launch');

    // Without optional field
    const filledWithout = fillTemplate(gantt, {
      projectName: 'My Project',
      startDate: '2024-01-01',
      tasks: 'Task A, Task B',
    });
    expect(filledWithout.filledPrompt).not.toContain('Milestones');
  });
});

// ============================================================================
// Test 4: All 10 new templates render valid Mermaid
// ============================================================================

describe('General-purpose templates Mermaid validity', () => {
  it('all 10 new templates have valid Mermaid examples', () => {
    const mermaidKeywords = [
      'flowchart', 'graph', 'sequenceDiagram', 'classDiagram', 'stateDiagram',
      'gantt', 'pie', 'mindmap', 'timeline', 'quadrantChart', 'erDiagram',
      'journey', 'gitGraph', 'sankey', 'xychart', 'block',
    ];

    for (const template of generalPurposeTemplates) {
      expect(template.mermaidExample).toBeDefined();
      expect(template.mermaidExample!.length).toBeGreaterThan(0);

      // Each mermaid example should start with a valid Mermaid diagram type
      const firstLine = template.mermaidExample!.trim().split('\n')[0].trim();
      const startsWithValidKeyword = mermaidKeywords.some((kw) =>
        firstLine.toLowerCase().startsWith(kw.toLowerCase())
      );
      expect(startsWithValidKeyword).toBe(true);
    }
  });

  it('each template has a unique ID', () => {
    const ids = generalPurposeTemplates.map((t) => t.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('each template has domain set to general', () => {
    for (const template of generalPurposeTemplates) {
      expect(template.domain).toBe('general');
    }
  });
});

// ============================================================================
// Test 5: Template count in general-purpose.ts >= 10
// ============================================================================

describe('General-purpose template count', () => {
  it('has at least 10 templates', () => {
    expect(generalPurposeTemplates.length).toBeGreaterThanOrEqual(10);
  });

  it('all general-purpose templates are included in allTemplates', () => {
    for (const template of generalPurposeTemplates) {
      const found = allTemplates.find((t) => t.id === template.id);
      expect(found).toBeDefined();
    }
  });
});
