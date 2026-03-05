/**
 * Hematology/Oncology Icon Library
 * Comprehensive SVG icons for blood diseases and cancer medicine
 *
 * Categories:
 * - Blood Cells (normal and abnormal morphologies)
 * - Bone Marrow (aspirate, biopsy, pathology)
 * - Lymphatic System (nodes, spleen, lymphoma)
 * - Coagulation (cascade, clots, bleeding disorders)
 * - Cancer Types (solid tumors, liquid tumors, metastasis)
 * - Treatment (chemotherapy, radiation, immunotherapy, transplant)
 *
 * Ralph Loop Checkpoints:
 * - FOUNDATION_25: Core blood cells + basic anatomy
 * - PATHOLOGY_50: Disease states (leukemias, lymphomas, anemias)
 * - CLINICAL_75: Treatment equipment, procedures
 * - COMPLETE: Full coverage (90%+)
 */

import type { IconDefinition } from './index';

export const hematologyOncologyIcons: IconDefinition[] = [
  // ===========================================================================
  // BLOOD CELLS - ERYTHROCYTES (Red Blood Cells)
  // ===========================================================================
  {
    id: 'hemeonc-rbc-normal',
    name: 'Normal Red Blood Cell',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['RBC', 'erythrocyte', 'red blood cell', 'biconcave', 'normal', 'hemoglobin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="12" ry="6" fill="currentColor" opacity="0.2"/>
      <path d="M14 32c0 4 8 6 18 6s18-2 18-6" stroke-dasharray="2 2"/>
      <path d="M14 32c0-4 8-6 18-6s18 2 18 6" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'hemeonc-rbc-sickle',
    name: 'Sickle Cell',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['sickle', 'drepanocyte', 'HbS', 'sickle cell disease', 'crescent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 40c8-24 32-24 40 0" fill="currentColor" opacity="0.2"/>
      <path d="M12 40c8-24 32-24 40 0"/>
      <path d="M12 40c4 8 16 8 20 0"/>
      <path d="M32 40c4 8 16 8 20 0"/>
      <path d="M22 28l4 4-4 4"/>
    </svg>`
  },
  {
    id: 'hemeonc-rbc-spherocyte',
    name: 'Spherocyte',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['spherocyte', 'hereditary spherocytosis', 'spherical', 'MCHC elevated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="6"/>
    </svg>`
  },
  {
    id: 'hemeonc-rbc-target',
    name: 'Target Cell (Codocyte)',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['target cell', 'codocyte', 'bulls eye', 'thalassemia', 'liver disease'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="8" ry="5" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'hemeonc-rbc-schistocyte',
    name: 'Schistocyte',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['schistocyte', 'fragmented', 'helmet cell', 'MAHA', 'TTP', 'HUS', 'DIC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 24l20-8 16 16-8 20-20 4z" fill="currentColor" opacity="0.2"/>
      <path d="M16 24l20-8 16 16-8 20-20 4z"/>
      <path d="M24 32l8-4 8 8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'hemeonc-rbc-teardrop',
    name: 'Teardrop Cell (Dacrocyte)',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['teardrop', 'dacrocyte', 'myelofibrosis', 'myelophthisis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c-16 20-16 32 0 40 16-8 16-20 0-40z" fill="currentColor" opacity="0.2"/>
      <path d="M32 12c-16 20-16 32 0 40 16-8 16-20 0-40z"/>
      <circle cx="32" cy="36" r="6"/>
    </svg>`
  },
  {
    id: 'hemeonc-rbc-burr',
    name: 'Burr Cell (Echinocyte)',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['burr cell', 'echinocyte', 'spiculated', 'uremia', 'kidney disease'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14" fill="currentColor" opacity="0.2"/>
      <path d="M32 12l2 6-2 6"/>
      <path d="M32 52l-2-6 2-6"/>
      <path d="M12 32l6-2 6 2"/>
      <path d="M52 32l-6 2-6-2"/>
      <path d="M18 18l4 4 2-2"/>
      <path d="M46 46l-4-4-2 2"/>
      <path d="M46 18l-4 4-2-2"/>
      <path d="M18 46l4-4 2 2"/>
      <circle cx="32" cy="32" r="14"/>
    </svg>`
  },
  {
    id: 'hemeonc-rbc-acanthocyte',
    name: 'Acanthocyte',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['acanthocyte', 'spur cell', 'abetalipoproteinemia', 'liver disease'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.2"/>
      <path d="M32 10l-3 10 3 4"/>
      <path d="M32 54l3-10-3-4"/>
      <path d="M10 32l10 3 4-3"/>
      <path d="M54 32l-10-3-4 3"/>
      <path d="M16 16l8 6 2-4"/>
      <path d="M48 48l-8-6-2 4"/>
      <path d="M48 16l-8 6-2-4"/>
      <path d="M16 48l8-6 2 4"/>
    </svg>`
  },
  {
    id: 'hemeonc-rbc-reticulocyte',
    name: 'Reticulocyte',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['reticulocyte', 'immature RBC', 'polychromasia', 'reticulocyte count'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="14"/>
      <path d="M18 28c4-2 8 0 12 2s8 4 12 2" stroke-dasharray="3 2"/>
      <path d="M20 32c4 2 8 0 12-2s8-4 12-2" stroke-dasharray="3 2"/>
      <path d="M18 36c4-2 8 2 12 2s8-2 12-2" stroke-dasharray="3 2"/>
      <circle cx="40" cy="26" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-rbc-rouleaux',
    name: 'Rouleaux Formation',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['rouleaux', 'stacked coins', 'multiple myeloma', 'hypergammaglobulinemia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="18" ry="6"/>
      <ellipse cx="32" cy="26" rx="18" ry="6" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="36" rx="18" ry="6"/>
      <ellipse cx="32" cy="46" rx="18" ry="6" fill="currentColor" opacity="0.1"/>
      <path d="M14 16v30"/>
      <path d="M50 16v30"/>
    </svg>`
  },

  // ===========================================================================
  // BLOOD CELLS - LEUKOCYTES (White Blood Cells)
  // ===========================================================================
  {
    id: 'hemeonc-wbc-neutrophil',
    name: 'Neutrophil',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['neutrophil', 'PMN', 'polymorphonuclear', 'granulocyte', 'segmented'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M20 28c4-4 8 0 8 4s-4 8 0 12" fill="currentColor" opacity="0.4"/>
      <path d="M28 24c4 4 8 4 12 0" fill="currentColor" opacity="0.4"/>
      <path d="M36 36c4 0 8 4 8 0" fill="currentColor" opacity="0.4"/>
      <circle cx="22" cy="30" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="34" cy="26" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="36" r="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-wbc-band',
    name: 'Band Neutrophil',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['band', 'stab', 'immature neutrophil', 'left shift', 'bandemia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M20 26c0 8 4 12 8 12s8-4 8-12 4-8 8-8" fill="currentColor" opacity="0.4"/>
      <ellipse cx="28" cy="32" rx="8" ry="10" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-wbc-eosinophil',
    name: 'Eosinophil',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['eosinophil', 'granulocyte', 'bilobed', 'allergy', 'parasites'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <ellipse cx="24" cy="32" rx="8" ry="10" fill="currentColor" opacity="0.4"/>
      <ellipse cx="40" cy="32" rx="8" ry="10" fill="currentColor" opacity="0.4"/>
      <path d="M28 32h8"/>
      <circle cx="20" cy="28" r="2" fill="currentColor"/>
      <circle cx="24" cy="36" r="2" fill="currentColor"/>
      <circle cx="40" cy="28" r="2" fill="currentColor"/>
      <circle cx="44" cy="36" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-wbc-basophil',
    name: 'Basophil',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['basophil', 'granulocyte', 'histamine', 'IgE', 'allergy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="24" cy="28" r="6" fill="currentColor" opacity="0.6"/>
      <circle cx="38" cy="28" r="5" fill="currentColor" opacity="0.6"/>
      <circle cx="30" cy="38" r="6" fill="currentColor" opacity="0.6"/>
      <circle cx="42" cy="38" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="20" cy="38" r="4" fill="currentColor" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'hemeonc-wbc-lymphocyte',
    name: 'Lymphocyte',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['lymphocyte', 'T cell', 'B cell', 'NK cell', 'mononuclear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="30" cy="30" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-wbc-monocyte',
    name: 'Monocyte',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['monocyte', 'mononuclear', 'macrophage precursor', 'kidney-shaped'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M18 32c0-10 14-14 28-8-4 16-18 18-28 8z" fill="currentColor" opacity="0.4"/>
      <path d="M24 28c4-2 8 0 12 4"/>
      <circle cx="36" cy="36" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-wbc-atypical-lymph',
    name: 'Atypical Lymphocyte',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['atypical lymphocyte', 'reactive', 'viral', 'EBV', 'mononucleosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c14 0 24 10 20 24-4 14-20 18-28 12-8-6-8-20 0-28 4-4 8-8 8-8z"/>
      <ellipse cx="28" cy="30" rx="10" ry="12" fill="currentColor" opacity="0.4"/>
      <path d="M44 24c-4 4-8 12-8 20"/>
    </svg>`
  },

  // ===========================================================================
  // BLOOD CELLS - PLATELETS & MEGAKARYOCYTES
  // ===========================================================================
  {
    id: 'hemeonc-platelet',
    name: 'Platelet',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['platelet', 'thrombocyte', 'clotting', 'hemostasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="12" ry="8"/>
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="currentColor" opacity="0.4"/>
      <circle cx="28" cy="30" r="1" fill="currentColor"/>
      <circle cx="36" cy="34" r="1" fill="currentColor"/>
      <circle cx="32" cy="32" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-giant-platelet',
    name: 'Giant Platelet',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['giant platelet', 'macrothromobocyte', 'ITP', 'Bernard-Soulier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="currentColor" opacity="0.3"/>
      <circle cx="26" cy="28" r="2" fill="currentColor"/>
      <circle cx="38" cy="36" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="28" cy="36" r="1" fill="currentColor"/>
      <circle cx="36" cy="28" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-megakaryocyte',
    name: 'Megakaryocyte',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['megakaryocyte', 'platelet precursor', 'bone marrow', 'polyploid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="26" cy="26" r="6" fill="currentColor" opacity="0.4"/>
      <circle cx="38" cy="26" r="5" fill="currentColor" opacity="0.4"/>
      <circle cx="26" cy="38" r="5" fill="currentColor" opacity="0.4"/>
      <circle cx="38" cy="38" r="6" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.4"/>
      <ellipse cx="32" cy="56" rx="8" ry="3" stroke-dasharray="2 1"/>
      <path d="M24 52l-4 4"/>
      <path d="M40 52l4 4"/>
    </svg>`
  },

  // ===========================================================================
  // BONE MARROW
  // ===========================================================================
  {
    id: 'hemeonc-bone-marrow-normal',
    name: 'Normal Bone Marrow',
    domain: 'medicine',
    category: 'bone-marrow',
    tags: ['bone marrow', 'hematopoiesis', 'normal', 'aspirate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <rect x="12" y="16" width="40" height="32" rx="2" fill="currentColor" opacity="0.1"/>
      <circle cx="20" cy="24" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="22" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="26" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="24" cy="34" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="38" cy="36" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="28" cy="44" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="44" cy="42" r="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-bone-marrow-hypercellular',
    name: 'Hypercellular Bone Marrow',
    domain: 'medicine',
    category: 'bone-marrow',
    tags: ['hypercellular', 'leukemia', 'MPN', 'packed marrow'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <rect x="12" y="16" width="40" height="32" rx="2" fill="currentColor" opacity="0.3"/>
      <circle cx="18" cy="22" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="28" cy="20" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="38" cy="22" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="48" cy="24" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="16" cy="32" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="26" cy="30" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="36" cy="32" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="46" cy="34" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="22" cy="42" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="40" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="42" cy="42" r="3" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'hemeonc-bone-marrow-hypocellular',
    name: 'Hypocellular/Aplastic Marrow',
    domain: 'medicine',
    category: 'bone-marrow',
    tags: ['hypocellular', 'aplastic', 'aplastic anemia', 'marrow failure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <rect x="12" y="16" width="40" height="32" rx="2" fill="currentColor" opacity="0.05"/>
      <circle cx="24" cy="28" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="42" cy="36" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M16 24l8-4" stroke-dasharray="2 2" opacity="0.3"/>
      <path d="M36 40l8 4" stroke-dasharray="2 2" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-bone-marrow-fibrosis',
    name: 'Bone Marrow Fibrosis',
    domain: 'medicine',
    category: 'bone-marrow',
    tags: ['fibrosis', 'myelofibrosis', 'reticulin', 'collagen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="4"/>
      <path d="M12 20c8 4 16-4 24 0s12 8 16 4" stroke-dasharray="3 2"/>
      <path d="M12 30c8-4 16 4 24 0s12-8 16-4" stroke-dasharray="3 2"/>
      <path d="M12 40c8 4 16-4 24 0s12 8 16 4" stroke-dasharray="3 2"/>
      <circle cx="20" cy="26" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="34" r="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-bm-aspirate',
    name: 'Bone Marrow Aspirate',
    domain: 'medicine',
    category: 'bone-marrow',
    tags: ['aspirate', 'BMA', 'procedure', 'smear'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="40" width="56" height="16" rx="2"/>
      <path d="M32 8v24"/>
      <path d="M28 8h8"/>
      <path d="M30 12h4"/>
      <path d="M30 32l-4 8h12l-4-8"/>
      <ellipse cx="32" cy="48" rx="20" ry="4" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="48" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="46" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="48" r="2" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'hemeonc-bm-biopsy',
    name: 'Bone Marrow Biopsy',
    domain: 'medicine',
    category: 'bone-marrow',
    tags: ['biopsy', 'trephine', 'core', 'procedure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 4h8v12l4 4v28l-4 4v8h-8v-8l-4-4V20l4-4V4z"/>
      <rect x="24" y="24" width="16" height="24" fill="currentColor" opacity="0.2"/>
      <circle cx="30" cy="30" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="36" cy="36" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="30" cy="42" r="2" fill="currentColor" opacity="0.4"/>
      <path d="M28 16h8"/>
      <path d="M28 52h8"/>
    </svg>`
  },

  // ===========================================================================
  // LYMPHATIC SYSTEM
  // ===========================================================================
  {
    id: 'hemeonc-lymph-node',
    name: 'Lymph Node',
    domain: 'medicine',
    category: 'lymphatic',
    tags: ['lymph node', 'lymphadenopathy', 'germinal center', 'immune'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="32" cy="32" rx="14" ry="18" fill="currentColor" opacity="0.1"/>
      <circle cx="26" cy="24" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="38" cy="26" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="38" r="5" fill="currentColor" opacity="0.3"/>
      <circle cx="38" cy="40" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M32 8v-4"/>
      <path d="M24 10l-4-6"/>
      <path d="M40 10l4-6"/>
      <path d="M32 56v4"/>
    </svg>`
  },
  {
    id: 'hemeonc-spleen',
    name: 'Spleen',
    domain: 'medicine',
    category: 'lymphatic',
    tags: ['spleen', 'splenomegaly', 'red pulp', 'white pulp'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-16 12-24 24-24s20 12 20 24-8 24-20 24-24-8-24-24z" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0-16 12-24 24-24s20 12 20 24-8 24-20 24-24-8-24-24z"/>
      <path d="M8 28l8 4"/>
      <path d="M8 36l8-4"/>
      <circle cx="28" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="30" cy="40" r="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-thymus',
    name: 'Thymus',
    domain: 'medicine',
    category: 'lymphatic',
    tags: ['thymus', 'T cell maturation', 'thymoma', 'mediastinum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 12c-8 4-12 16-12 24s4 16 12 20"/>
      <path d="M40 12c8 4 12 16 12 24s-4 16-12 20"/>
      <path d="M24 12c4-4 12-4 16 0"/>
      <path d="M24 56c4 4 12 4 16 0"/>
      <line x1="32" y1="12" x2="32" y2="56"/>
      <ellipse cx="24" cy="32" rx="8" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="40" cy="32" rx="8" ry="16" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'hemeonc-lymphatic-vessel',
    name: 'Lymphatic Vessel',
    domain: 'medicine',
    category: 'lymphatic',
    tags: ['lymphatic', 'vessel', 'lymph', 'drainage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v48"/>
      <path d="M28 8c0 16 8 16 8 32s-8 16-8 16"/>
      <path d="M36 8c0 16-8 16-8 32s8 16 8 16"/>
      <path d="M28 20h8"/>
      <path d="M28 36h8"/>
      <circle cx="32" cy="28" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="44" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-reed-sternberg',
    name: 'Reed-Sternberg Cell',
    domain: 'medicine',
    category: 'lymphatic',
    tags: ['Reed-Sternberg', 'Hodgkin lymphoma', 'owl eye', 'binucleated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <circle cx="24" cy="28" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="28" r="8" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="28" r="4"/>
      <circle cx="40" cy="28" r="4"/>
      <circle cx="24" cy="28" r="2" fill="currentColor"/>
      <circle cx="40" cy="28" r="2" fill="currentColor"/>
      <path d="M24 44c4-4 12-4 16 0"/>
    </svg>`
  },

  // ===========================================================================
  // COAGULATION CASCADE
  // ===========================================================================
  {
    id: 'hemeonc-coag-cascade',
    name: 'Coagulation Cascade',
    domain: 'medicine',
    category: 'coagulation',
    tags: ['coagulation', 'cascade', 'clotting factors', 'intrinsic', 'extrinsic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="12" r="6"/>
      <circle cx="48" cy="12" r="6"/>
      <circle cx="32" cy="28" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="46" r="8" fill="currentColor" opacity="0.3"/>
      <path d="M16 18l16 10"/>
      <path d="M48 18l-16 10"/>
      <path d="M32 34v6"/>
      <text x="12" y="14" font-size="6" fill="currentColor" stroke="none">I</text>
      <text x="44" y="14" font-size="6" fill="currentColor" stroke="none">E</text>
      <text x="28" y="30" font-size="6" fill="currentColor" stroke="none">X</text>
      <text x="26" y="50" font-size="8" fill="currentColor" stroke="none">Fb</text>
    </svg>`
  },
  {
    id: 'hemeonc-thrombus',
    name: 'Thrombus/Blood Clot',
    domain: 'medicine',
    category: 'coagulation',
    tags: ['thrombus', 'clot', 'thrombosis', 'DVT', 'PE'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24c0-8 8-16 20-16s20 8 20 16v16c0 8-8 16-20 16s-20-8-20-16V24z"/>
      <path d="M16 24c4-4 12-8 16-4s12 8 16 4" fill="currentColor" opacity="0.4"/>
      <path d="M16 34c4-4 12-4 16 0s12 4 16 0" fill="currentColor" opacity="0.5"/>
      <path d="M16 44c4-4 12-8 16-4s12 8 16 4" fill="currentColor" opacity="0.4"/>
      <circle cx="24" cy="30" r="3"/>
      <circle cx="40" cy="38" r="3"/>
    </svg>`
  },
  {
    id: 'hemeonc-fibrin-mesh',
    name: 'Fibrin Mesh',
    domain: 'medicine',
    category: 'coagulation',
    tags: ['fibrin', 'mesh', 'network', 'polymerization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16l48 32"/>
      <path d="M56 16l-48 32"/>
      <path d="M8 32h48"/>
      <path d="M32 8v48"/>
      <path d="M16 8l16 24-16 24"/>
      <path d="M48 8l-16 24 16 24"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-platelet-plug',
    name: 'Platelet Plug',
    domain: 'medicine',
    category: 'coagulation',
    tags: ['platelet plug', 'primary hemostasis', 'aggregation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="4"/>
      <ellipse cx="24" cy="32" rx="6" ry="4" fill="currentColor" opacity="0.4"/>
      <ellipse cx="36" cy="30" rx="6" ry="4" fill="currentColor" opacity="0.4"/>
      <ellipse cx="30" cy="36" rx="6" ry="4" fill="currentColor" opacity="0.4"/>
      <ellipse cx="42" cy="34" rx="5" ry="3" fill="currentColor" opacity="0.4"/>
      <ellipse cx="18" cy="30" rx="4" ry="3" fill="currentColor" opacity="0.4"/>
      <path d="M8 24l48 0" stroke-dasharray="4 2"/>
      <path d="M8 40l48 0" stroke-dasharray="4 2"/>
    </svg>`
  },
  {
    id: 'hemeonc-bleeding',
    name: 'Bleeding/Hemorrhage',
    domain: 'medicine',
    category: 'coagulation',
    tags: ['bleeding', 'hemorrhage', 'hemophilia', 'coagulopathy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 16-16 28-8 36s24 4 24-12c0-8-8-16-16-24z" fill="currentColor" opacity="0.3"/>
      <path d="M32 8c-12 16-16 28-8 36s24 4 24-12c0-8-8-16-16-24z"/>
      <path d="M28 24c-4 8-4 16 0 20"/>
      <path d="M36 20c4 8 4 16 0 24"/>
      <ellipse cx="40" cy="50" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="24" cy="54" rx="3" ry="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-ddimer',
    name: 'D-Dimer',
    domain: 'medicine',
    category: 'coagulation',
    tags: ['D-dimer', 'fibrin degradation', 'FDP', 'DVT', 'PE'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="16" height="32" rx="2"/>
      <rect x="32" y="16" width="16" height="32" rx="2"/>
      <path d="M24 16v-8"/>
      <path d="M40 16v-8"/>
      <path d="M24 48v8"/>
      <path d="M40 48v8"/>
      <path d="M16 28h16"/>
      <path d="M32 36h16"/>
      <text x="20" y="42" font-size="10" fill="currentColor" stroke="none">D</text>
      <text x="36" y="30" font-size="10" fill="currentColor" stroke="none">D</text>
    </svg>`
  },

  // ===========================================================================
  // LEUKEMIA & LYMPHOMA
  // ===========================================================================
  {
    id: 'hemeonc-blast-cell',
    name: 'Blast Cell',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['blast', 'leukemia', 'ALL', 'AML', 'immature'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="14" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="32" r="10"/>
      <circle cx="28" cy="28" r="3" fill="currentColor"/>
      <circle cx="36" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-auer-rod',
    name: 'Auer Rod',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['Auer rod', 'AML', 'myeloblast', 'pathognomonic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="28" r="10" fill="currentColor" opacity="0.3"/>
      <path d="M24 36l16 8" stroke-width="3"/>
      <path d="M20 40l12 6" stroke-width="2"/>
      <circle cx="30" cy="26" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-plasma-cell',
    name: 'Plasma Cell',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['plasma cell', 'myeloma', 'immunoglobulin', 'clock face'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="18" ry="20"/>
      <circle cx="40" cy="28" r="10" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="28" r="6"/>
      <path d="M37 22l6 0"/>
      <path d="M37 34l6 0"/>
      <path d="M34 25l0 6"/>
      <path d="M46 25l0 6"/>
      <circle cx="20" cy="36" r="4" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'hemeonc-smudge-cell',
    name: 'Smudge Cell',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['smudge cell', 'CLL', 'basket cell', 'fragile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32c0-12 8-20 16-20s16 8 16 20-8 20-16 20-16-8-16-20z" fill="currentColor" opacity="0.2"/>
      <path d="M12 28c4-8 12-12 20-8s16 12 20 8" stroke-dasharray="3 2"/>
      <path d="M12 36c4 8 12 12 20 8s16-12 20-8" stroke-dasharray="3 2"/>
      <circle cx="28" cy="28" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="38" cy="34" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-lymphoma-cell',
    name: 'Lymphoma Cell',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['lymphoma', 'NHL', 'large cell', 'follicular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="28" r="14" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="28" r="8"/>
      <circle cx="28" cy="26" r="3" fill="currentColor"/>
      <circle cx="36" cy="30" r="2" fill="currentColor"/>
      <path d="M20 44c8-4 16-4 24 0" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'hemeonc-hairy-cell',
    name: 'Hairy Cell',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['hairy cell', 'HCL', 'leukemia', 'cytoplasmic projections'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14"/>
      <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.3"/>
      <path d="M32 18l0-6"/>
      <path d="M32 46l0 6"/>
      <path d="M18 32l-6 0"/>
      <path d="M46 32l6 0"/>
      <path d="M22 22l-4-4"/>
      <path d="M42 42l4 4"/>
      <path d="M42 22l4-4"/>
      <path d="M22 42l-4 4"/>
      <path d="M26 20l-2-6"/>
      <path d="M38 44l2 6"/>
      <circle cx="30" cy="30" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // SOLID TUMORS & METASTASIS
  // ===========================================================================
  {
    id: 'hemeonc-tumor-mass',
    name: 'Tumor Mass',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['tumor', 'mass', 'neoplasm', 'malignant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16c-8 8-8 24 0 32 8 8 24 8 32 0 8-8 8-24 0-32-8-8-24-8-32 0z" fill="currentColor" opacity="0.3"/>
      <path d="M20 16c-8 8-8 24 0 32 8 8 24 8 32 0 8-8 8-24 0-32-8-8-24-8-32 0z"/>
      <circle cx="28" cy="28" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="40" cy="32" r="5" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="42" r="4" fill="currentColor" opacity="0.4"/>
      <path d="M24 36c4-4 8 0 12 4"/>
    </svg>`
  },
  {
    id: 'hemeonc-metastasis',
    name: 'Metastasis',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['metastasis', 'mets', 'spread', 'secondary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="32" r="12"/>
      <circle cx="12" cy="16" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="16" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="12" cy="48" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="48" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M24 24l-8-8"/>
      <path d="M40 24l8-8"/>
      <path d="M24 40l-8 8"/>
      <path d="M40 40l8 8"/>
      <path d="M26 26l-6-6" stroke-dasharray="2 2"/>
      <path d="M38 26l6-6" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'hemeonc-cancer-staging',
    name: 'Cancer Staging (TNM)',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['staging', 'TNM', 'tumor', 'node', 'metastasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="10" fill="currentColor" opacity="0.3"/>
      <text x="16" y="24" font-size="10" fill="currentColor" stroke="none">T</text>
      <circle cx="44" cy="20" r="8" fill="currentColor" opacity="0.3"/>
      <text x="40" y="24" font-size="10" fill="currentColor" stroke="none">N</text>
      <circle cx="32" cy="46" r="8" fill="currentColor" opacity="0.3"/>
      <text x="28" y="50" font-size="10" fill="currentColor" stroke="none">M</text>
      <path d="M28 24l8-4"/>
      <path d="M24 28l4 12"/>
      <path d="M40 28l-4 12"/>
    </svg>`
  },

  // ===========================================================================
  // TREATMENT - CHEMOTHERAPY
  // ===========================================================================
  {
    id: 'hemeonc-chemo-infusion',
    name: 'Chemotherapy Infusion',
    domain: 'medicine',
    category: 'treatment',
    tags: ['chemotherapy', 'infusion', 'IV', 'cytotoxic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4h16v8l-4 4v32l4 4v8h-16v-8l4-4V16l-4-4V4z"/>
      <rect x="24" y="20" width="16" height="24" fill="currentColor" opacity="0.3"/>
      <path d="M28 8h8"/>
      <path d="M28 56h8"/>
      <circle cx="32" cy="28" r="2" fill="currentColor"/>
      <circle cx="28" cy="34" r="2" fill="currentColor"/>
      <circle cx="36" cy="38" r="2" fill="currentColor"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
    </svg>`
  },
  {
    id: 'hemeonc-chemo-port',
    name: 'Chemotherapy Port',
    domain: 'medicine',
    category: 'treatment',
    tags: ['port', 'port-a-cath', 'central line', 'venous access'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="16"/>
      <circle cx="32" cy="36" r="10" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="36" r="4"/>
      <path d="M32 20v-12"/>
      <path d="M32 8c8 0 16 4 20 12"/>
      <path d="M28 4h8"/>
      <path d="M52 20l4 4"/>
    </svg>`
  },
  {
    id: 'hemeonc-picc-line',
    name: 'PICC Line',
    domain: 'medicine',
    category: 'treatment',
    tags: ['PICC', 'peripherally inserted', 'central catheter', 'chemotherapy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-12 8-20 24-20"/>
      <path d="M32 12c8 0 16 4 20 12"/>
      <path d="M52 24c4 8 4 16 0 24"/>
      <ellipse cx="32" cy="32" rx="4" ry="6"/>
      <path d="M36 32h20"/>
      <circle cx="58" cy="32" r="4"/>
      <path d="M8 28v8"/>
      <path d="M4 30h8"/>
    </svg>`
  },

  // ===========================================================================
  // TREATMENT - RADIATION
  // ===========================================================================
  {
    id: 'hemeonc-radiation-symbol',
    name: 'Radiation Symbol',
    domain: 'medicine',
    category: 'treatment',
    tags: ['radiation', 'radiotherapy', 'ionizing', 'oncology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="6"/>
      <path d="M32 26c-6-12-18-16-18-4 0 6 6 10 12 10" fill="currentColor" opacity="0.4"/>
      <path d="M38 32c12-6 16-18 4-18-6 0-10 6-10 12" fill="currentColor" opacity="0.4"/>
      <path d="M26 38c6 12 18 16 18 4 0-6-6-10-12-10" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="32" r="22"/>
    </svg>`
  },
  {
    id: 'hemeonc-linear-accelerator',
    name: 'Linear Accelerator',
    domain: 'medicine',
    category: 'treatment',
    tags: ['LINAC', 'radiotherapy', 'external beam', 'radiation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="8" width="16" height="24" rx="2"/>
      <path d="M28 32l-4 8h16l-4-8"/>
      <rect x="20" y="40" width="24" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="48" width="32" height="8" rx="2"/>
      <path d="M32 32v8" stroke-dasharray="2 2"/>
      <circle cx="32" cy="20" r="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-brachytherapy',
    name: 'Brachytherapy',
    domain: 'medicine',
    category: 'treatment',
    tags: ['brachytherapy', 'internal radiation', 'seed implant', 'HDR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <circle cx="24" cy="28" r="3" fill="currentColor"/>
      <circle cx="40" cy="28" r="3" fill="currentColor"/>
      <circle cx="32" cy="36" r="3" fill="currentColor"/>
      <circle cx="24" cy="36" r="3" fill="currentColor"/>
      <circle cx="40" cy="36" r="3" fill="currentColor"/>
      <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.5"/>
      <path d="M24 28l16 0" stroke-dasharray="2 2"/>
      <path d="M32 28v8" stroke-dasharray="2 2"/>
    </svg>`
  },

  // ===========================================================================
  // TREATMENT - IMMUNOTHERAPY & TARGETED THERAPY
  // ===========================================================================
  {
    id: 'hemeonc-immunotherapy',
    name: 'Immunotherapy',
    domain: 'medicine',
    category: 'treatment',
    tags: ['immunotherapy', 'checkpoint inhibitor', 'PD-1', 'CAR-T'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="24" r="12"/>
      <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M36 24h8"/>
      <path d="M40 20v8"/>
      <circle cx="48" cy="24" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M44 24l8 0"/>
      <path d="M48 20v8"/>
      <path d="M36 40c-8 8-16 8-24 0" stroke-dasharray="2 2"/>
      <text x="20" y="50" font-size="6" fill="currentColor" stroke="none">T</text>
      <text x="42" y="28" font-size="6" fill="currentColor" stroke="none">Ab</text>
    </svg>`
  },
  {
    id: 'hemeonc-car-t-cell',
    name: 'CAR-T Cell',
    domain: 'medicine',
    category: 'treatment',
    tags: ['CAR-T', 'chimeric antigen receptor', 'cell therapy', 'immunotherapy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.3"/>
      <path d="M32 14l0-6"/>
      <path d="M28 10h8"/>
      <path d="M26 8v4"/>
      <path d="M38 8v4"/>
      <path d="M26 14l-4-4"/>
      <path d="M38 14l4-4"/>
      <text x="26" y="36" font-size="8" fill="currentColor" stroke="none">T</text>
      <circle cx="32" cy="28" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-monoclonal-antibody',
    name: 'Monoclonal Antibody',
    domain: 'medicine',
    category: 'treatment',
    tags: ['monoclonal antibody', 'mAb', 'targeted therapy', 'rituximab'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l-12 20h8v20h8V28h8L32 8z"/>
      <path d="M20 28l-8 8v12"/>
      <path d="M44 28l8 8v12"/>
      <circle cx="12" cy="52" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="52" r="4" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="48" width="8" height="8" rx="2" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'hemeonc-targeted-therapy',
    name: 'Targeted Therapy',
    domain: 'medicine',
    category: 'treatment',
    tags: ['targeted therapy', 'TKI', 'small molecule', 'precision medicine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="14" stroke-dasharray="4 2"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <path d="M8 32h8"/>
      <path d="M48 32h8"/>
    </svg>`
  },

  // ===========================================================================
  // TREATMENT - TRANSPLANT & TRANSFUSION
  // ===========================================================================
  {
    id: 'hemeonc-stem-cell-transplant',
    name: 'Stem Cell Transplant',
    domain: 'medicine',
    category: 'treatment',
    tags: ['stem cell', 'transplant', 'BMT', 'HSCT', 'autologous', 'allogeneic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <circle cx="32" cy="20" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M32 32v8"/>
      <path d="M24 40l8 8 8-8"/>
      <rect x="20" y="48" width="24" height="12" rx="2"/>
      <circle cx="28" cy="54" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="36" cy="54" r="2" fill="currentColor" opacity="0.4"/>
      <path d="M20 16l-8-8"/>
      <path d="M44 16l8-8"/>
    </svg>`
  },
  {
    id: 'hemeonc-blood-transfusion',
    name: 'Blood Transfusion',
    domain: 'medicine',
    category: 'treatment',
    tags: ['transfusion', 'blood', 'PRBC', 'packed red cells'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24v8l-4 4v28l4 4v8h-24v-8l4-4V20l-4-4V8z"/>
      <rect x="24" y="24" width="16" height="24" fill="currentColor" opacity="0.4"/>
      <path d="M24 12h16"/>
      <path d="M24 52h16"/>
      <path d="M32 24v-8"/>
      <path d="M28 20h8"/>
      <text x="26" y="40" font-size="8" fill="currentColor" stroke="none">A+</text>
    </svg>`
  },
  {
    id: 'hemeonc-platelet-transfusion',
    name: 'Platelet Transfusion',
    domain: 'medicine',
    category: 'treatment',
    tags: ['platelet', 'transfusion', 'thrombocytopenia', 'PLT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24v8l-4 4v28l4 4v8h-24v-8l4-4V20l-4-4V8z"/>
      <rect x="24" y="24" width="16" height="24" fill="currentColor" opacity="0.2"/>
      <ellipse cx="28" cy="30" rx="4" ry="3" fill="currentColor" opacity="0.4"/>
      <ellipse cx="36" cy="34" rx="4" ry="3" fill="currentColor" opacity="0.4"/>
      <ellipse cx="30" cy="40" rx="4" ry="3" fill="currentColor" opacity="0.4"/>
      <path d="M24 12h16"/>
      <path d="M24 52h16"/>
    </svg>`
  },
  {
    id: 'hemeonc-plasma-transfusion',
    name: 'Fresh Frozen Plasma',
    domain: 'medicine',
    category: 'treatment',
    tags: ['FFP', 'plasma', 'transfusion', 'coagulopathy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8h24v8l-4 4v28l4 4v8h-24v-8l4-4V20l-4-4V8z"/>
      <rect x="24" y="24" width="16" height="24" fill="currentColor" opacity="0.15"/>
      <path d="M24 12h16"/>
      <path d="M24 52h16"/>
      <text x="22" y="40" font-size="7" fill="currentColor" stroke="none">FFP</text>
    </svg>`
  },

  // ===========================================================================
  // DIAGNOSTIC EQUIPMENT & TESTS
  // ===========================================================================
  {
    id: 'hemeonc-flow-cytometry',
    name: 'Flow Cytometry',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['flow cytometry', 'immunophenotyping', 'CD markers', 'FACS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="24" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="24" cy="40" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="40" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M8 32h48"/>
      <path d="M32 8v48"/>
      <text x="12" y="20" font-size="5" fill="currentColor" stroke="none">CD</text>
    </svg>`
  },
  {
    id: 'hemeonc-blood-smear',
    name: 'Blood Smear',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['blood smear', 'peripheral smear', 'PBS', 'morphology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="56" height="24" rx="2"/>
      <ellipse cx="20" cy="32" rx="8" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="36" cy="32" rx="6" ry="4"/>
      <ellipse cx="46" cy="30" rx="4" ry="3"/>
      <ellipse cx="48" cy="36" rx="3" ry="2"/>
      <circle cx="28" cy="32" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M8 28l8-4" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'hemeonc-cbc',
    name: 'Complete Blood Count',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['CBC', 'complete blood count', 'hemogram', 'blood test'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M16 20h32"/>
      <path d="M16 32h32"/>
      <path d="M16 44h32"/>
      <text x="12" y="18" font-size="5" fill="currentColor" stroke="none">WBC</text>
      <text x="12" y="30" font-size="5" fill="currentColor" stroke="none">RBC</text>
      <text x="12" y="42" font-size="5" fill="currentColor" stroke="none">PLT</text>
      <text x="40" y="18" font-size="5" fill="currentColor" stroke="none">7.2</text>
      <text x="40" y="30" font-size="5" fill="currentColor" stroke="none">4.5</text>
      <text x="40" y="42" font-size="5" fill="currentColor" stroke="none">250</text>
    </svg>`
  },
  {
    id: 'hemeonc-coag-panel',
    name: 'Coagulation Panel',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['coagulation', 'PT', 'PTT', 'INR', 'clotting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M16 20h32"/>
      <path d="M16 32h32"/>
      <path d="M16 44h32"/>
      <text x="12" y="18" font-size="5" fill="currentColor" stroke="none">PT</text>
      <text x="12" y="30" font-size="5" fill="currentColor" stroke="none">PTT</text>
      <text x="12" y="42" font-size="5" fill="currentColor" stroke="none">INR</text>
      <text x="36" y="18" font-size="5" fill="currentColor" stroke="none">12.5</text>
      <text x="36" y="30" font-size="5" fill="currentColor" stroke="none">28</text>
      <text x="36" y="42" font-size="5" fill="currentColor" stroke="none">1.0</text>
    </svg>`
  },
  {
    id: 'hemeonc-bone-scan',
    name: 'Bone Scan',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['bone scan', 'nuclear medicine', 'metastases', 'staging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="12" rx="8" ry="6"/>
      <path d="M32 18v8"/>
      <path d="M24 26h16"/>
      <rect x="28" y="26" width="8" height="20" rx="1"/>
      <path d="M28 46l-4 12"/>
      <path d="M36 46l4 12"/>
      <circle cx="30" cy="32" r="2" fill="currentColor"/>
      <circle cx="40" cy="14" r="2" fill="currentColor"/>
      <circle cx="34" cy="54" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-pet-scan',
    name: 'PET Scan',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['PET', 'positron emission', 'FDG', 'lymphoma staging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28"/>
      <ellipse cx="32" cy="32" rx="16" ry="20" stroke-dasharray="4 2"/>
      <circle cx="24" cy="20" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="40" cy="24" r="3" fill="currentColor" opacity="0.6"/>
      <circle cx="28" cy="40" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="38" cy="44" r="3" fill="currentColor" opacity="0.4"/>
      <text x="26" y="36" font-size="6" fill="currentColor" stroke="none">FDG</text>
    </svg>`
  },

  // ===========================================================================
  // CLINICAL FINDINGS & SYMPTOMS
  // ===========================================================================
  {
    id: 'hemeonc-petechiae',
    name: 'Petechiae',
    domain: 'medicine',
    category: 'clinical-findings',
    tags: ['petechiae', 'thrombocytopenia', 'bleeding', 'purpura'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <circle cx="16" cy="16" r="2" fill="currentColor"/>
      <circle cx="28" cy="20" r="1.5" fill="currentColor"/>
      <circle cx="40" cy="14" r="2" fill="currentColor"/>
      <circle cx="48" cy="24" r="1.5" fill="currentColor"/>
      <circle cx="20" cy="32" r="2" fill="currentColor"/>
      <circle cx="36" cy="30" r="1.5" fill="currentColor"/>
      <circle cx="52" cy="36" r="1" fill="currentColor"/>
      <circle cx="24" cy="44" r="2" fill="currentColor"/>
      <circle cx="44" cy="48" r="1.5" fill="currentColor"/>
      <circle cx="12" cy="52" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-ecchymosis',
    name: 'Ecchymosis/Bruising',
    domain: 'medicine',
    category: 'clinical-findings',
    tags: ['ecchymosis', 'bruise', 'contusion', 'bleeding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 24c-4 8 0 20 16 24 16-4 20-16 16-24-8-4-24-4-32 0z" fill="currentColor" opacity="0.4"/>
      <path d="M16 24c-4 8 0 20 16 24 16-4 20-16 16-24-8-4-24-4-32 0z"/>
      <path d="M24 28c4-2 12-2 16 0" fill="currentColor" opacity="0.3"/>
      <path d="M20 36c6 4 18 4 24 0" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'hemeonc-lymphadenopathy',
    name: 'Lymphadenopathy',
    domain: 'medicine',
    category: 'clinical-findings',
    tags: ['lymphadenopathy', 'swollen lymph nodes', 'lymphoma', 'infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="20" rx="10" ry="12" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="20" rx="10" ry="12" fill="currentColor" opacity="0.3"/>
      <ellipse cx="20" cy="44" rx="10" ry="12" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="44" rx="10" ry="12" fill="currentColor" opacity="0.3"/>
      <path d="M20 32v-4"/>
      <path d="M44 32v-4"/>
      <path d="M28 20h8"/>
      <path d="M28 44h8"/>
    </svg>`
  },
  {
    id: 'hemeonc-splenomegaly',
    name: 'Splenomegaly',
    domain: 'medicine',
    category: 'clinical-findings',
    tags: ['splenomegaly', 'enlarged spleen', 'CML', 'myelofibrosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-20 16-28 28-28s24 16 24 28-12 28-24 28-28-8-28-28z" fill="currentColor" opacity="0.2"/>
      <path d="M8 32c0-20 16-28 28-28s24 16 24 28-12 28-24 28-28-8-28-28z"/>
      <path d="M4 24l8 8"/>
      <path d="M4 40l8-8"/>
      <path d="M20 20c8-4 20 0 24 12"/>
      <path d="M20 44c8 4 20 0 24-12"/>
    </svg>`
  },
  {
    id: 'hemeonc-pallor',
    name: 'Pallor/Anemia',
    domain: 'medicine',
    category: 'clinical-findings',
    tags: ['pallor', 'anemia', 'pale', 'conjunctival'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <ellipse cx="22" cy="28" rx="6" ry="4" fill="currentColor" opacity="0.1"/>
      <ellipse cx="42" cy="28" rx="6" ry="4" fill="currentColor" opacity="0.1"/>
      <circle cx="22" cy="28" r="2"/>
      <circle cx="42" cy="28" r="2"/>
      <path d="M24 40c4 4 12 4 16 0"/>
      <path d="M16 24c0-4 4-8 8-8"/>
      <path d="M48 24c0-4-4-8-8-8"/>
    </svg>`
  },
  {
    id: 'hemeonc-fatigue',
    name: 'Fatigue/Weakness',
    domain: 'medicine',
    category: 'clinical-findings',
    tags: ['fatigue', 'weakness', 'anemia', 'cancer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <path d="M32 32v8"/>
      <path d="M24 40l8 8 8-8"/>
      <path d="M20 48l-8 8"/>
      <path d="M44 48l8 8"/>
      <path d="M26 56v4"/>
      <path d="M38 56v4"/>
      <path d="M26 18c2 2 4 2 6 0"/>
      <path d="M32 18c2 2 4 2 6 0"/>
      <path d="M28 24h8"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL SPECIALTY ICONS
  // ===========================================================================
  {
    id: 'hemeonc-gvhd',
    name: 'Graft vs Host Disease',
    domain: 'medicine',
    category: 'complications',
    tags: ['GVHD', 'graft versus host', 'transplant', 'complication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="12"/>
      <circle cx="44" cy="32" r="12"/>
      <path d="M32 24v16"/>
      <path d="M28 28l8 8"/>
      <path d="M36 28l-8 8"/>
      <path d="M12 32l-4 0"/>
      <path d="M56 32l4 0"/>
      <text x="15" y="36" font-size="6" fill="currentColor" stroke="none">G</text>
      <text x="39" y="36" font-size="6" fill="currentColor" stroke="none">H</text>
    </svg>`
  },
  {
    id: 'hemeonc-tumor-lysis',
    name: 'Tumor Lysis Syndrome',
    domain: 'medicine',
    category: 'complications',
    tags: ['TLS', 'tumor lysis', 'hyperuricemia', 'hyperkalemia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="24" r="12"/>
      <path d="M24 36l-8 20"/>
      <path d="M32 36v20"/>
      <path d="M40 36l8 20"/>
      <circle cx="16" cy="56" r="4"/>
      <circle cx="32" cy="56" r="4"/>
      <circle cx="48" cy="56" r="4"/>
      <path d="M28 20l8 8"/>
      <path d="M36 20l-8 8"/>
    </svg>`
  },
  {
    id: 'hemeonc-febrile-neutropenia',
    name: 'Febrile Neutropenia',
    domain: 'medicine',
    category: 'complications',
    tags: ['febrile neutropenia', 'fever', 'neutropenic', 'infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="24" width="8" height="36" rx="4"/>
      <circle cx="32" cy="56" r="6" fill="currentColor" opacity="0.4"/>
      <rect x="30" y="32" width="4" height="16" fill="currentColor" opacity="0.6"/>
      <path d="M32 8c-4 4 0 8 0 12"/>
      <path d="M24 12c0 4 4 8 8 8"/>
      <path d="M40 12c0 4-4 8-8 8"/>
      <text x="10" y="48" font-size="6" fill="currentColor" stroke="none">ANC</text>
      <text x="8" y="56" font-size="5" fill="currentColor" stroke="none">&lt;500</text>
    </svg>`
  },
  {
    id: 'hemeonc-hemolysis',
    name: 'Hemolysis',
    domain: 'medicine',
    category: 'pathology',
    tags: ['hemolysis', 'hemolytic anemia', 'RBC destruction', 'LDH'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="14"/>
      <path d="M16 28c4-4 8 0 12 4s8 4 12-4" stroke-dasharray="3 2"/>
      <path d="M12 32l4 0"/>
      <path d="M48 32l4 0"/>
      <path d="M20 40l-8 8"/>
      <path d="M32 42l0 10"/>
      <path d="M44 40l8 8"/>
      <circle cx="12" cy="48" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="52" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="48" r="3" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'hemeonc-dic',
    name: 'DIC (Disseminated Intravascular Coagulation)',
    domain: 'medicine',
    category: 'pathology',
    tags: ['DIC', 'disseminated intravascular coagulation', 'consumptive', 'coagulopathy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="4"/>
      <path d="M16 28c8 0 8 8 16 8s8-8 16-8" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="32" r="2"/>
      <circle cx="32" cy="36" r="2"/>
      <circle cx="44" cy="32" r="2"/>
      <path d="M20 44l-4 8"/>
      <path d="M32 44v8"/>
      <path d="M44 44l4 8"/>
      <circle cx="16" cy="52" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="52" r="2" fill="currentColor" opacity="0.4"/>
      <circle cx="48" cy="52" r="2" fill="currentColor" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'hemeonc-heparin-induced',
    name: 'HIT (Heparin-Induced Thrombocytopenia)',
    domain: 'medicine',
    category: 'pathology',
    tags: ['HIT', 'heparin induced thrombocytopenia', 'PF4', 'antibody'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="24" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="24" rx="12" ry="8"/>
      <path d="M36 24l8 0"/>
      <path d="M48 20v8"/>
      <path d="M44 24h8"/>
      <circle cx="48" cy="24" r="8"/>
      <path d="M24 32v8l-8 16"/>
      <path d="M24 40l8 16"/>
      <path d="M48 32v8"/>
      <circle cx="48" cy="44" r="4" fill="currentColor" opacity="0.3"/>
      <text x="19" y="28" font-size="6" fill="currentColor" stroke="none">PLT</text>
    </svg>`
  },
  {
    id: 'hemeonc-ttp',
    name: 'TTP (Thrombotic Thrombocytopenic Purpura)',
    domain: 'medicine',
    category: 'pathology',
    tags: ['TTP', 'thrombotic thrombocytopenic purpura', 'ADAMTS13', 'pentad'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="20" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="44" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="44" cy="44" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M20 26l12 6"/>
      <path d="M44 26l-12 6"/>
      <path d="M20 38l12-6"/>
      <path d="M44 38l-12-6"/>
    </svg>`
  },
  {
    id: 'hemeonc-apheresis',
    name: 'Apheresis',
    domain: 'medicine',
    category: 'treatment',
    tags: ['apheresis', 'plasmapheresis', 'leukapheresis', 'stem cell collection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 12c-11 0-20 9-20 20"/>
      <path d="M32 52c11 0 20-9 20-20"/>
      <path d="M12 32l8 0"/>
      <path d="M44 32l8 0"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M24 32h16" stroke-dasharray="2 2"/>
      <path d="M32 24v16" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'hemeonc-iron-overload',
    name: 'Iron Overload',
    domain: 'medicine',
    category: 'pathology',
    tags: ['iron overload', 'hemochromatosis', 'transfusion', 'ferritin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="16" width="24" height="32" rx="4"/>
      <rect x="24" y="24" width="16" height="20" fill="currentColor" opacity="0.5"/>
      <path d="M28 20h8"/>
      <path d="M32 8v8"/>
      <path d="M28 8h8"/>
      <text x="26" y="38" font-size="8" fill="currentColor" stroke="none">Fe</text>
      <path d="M20 52l-4 4"/>
      <path d="M44 52l4 4"/>
    </svg>`
  },
  {
    id: 'hemeonc-chelation',
    name: 'Iron Chelation',
    domain: 'medicine',
    category: 'treatment',
    tags: ['chelation', 'deferoxamine', 'deferasirox', 'iron removal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.4"/>
      <text x="26" y="36" font-size="8" fill="currentColor" stroke="none">Fe</text>
      <path d="M24 24l-8-8"/>
      <path d="M40 24l8-8"/>
      <path d="M24 40l-8 8"/>
      <path d="M40 40l8 8"/>
      <circle cx="16" cy="16" r="4"/>
      <circle cx="48" cy="16" r="4"/>
      <circle cx="16" cy="48" r="4"/>
      <circle cx="48" cy="48" r="4"/>
      <path d="M12 16h-4"/>
      <path d="M56 16h-4"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL ICONS - EXPANSION TO 100+
  // ===========================================================================
  {
    id: 'hemeonc-stem-cell',
    name: 'Hematopoietic Stem Cell',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['stem cell', 'HSC', 'CD34', 'progenitor', 'pluripotent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="10" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="4"/>
      <path d="M32 16v-8"/>
      <path d="M32 56v-8"/>
      <path d="M16 32h-8"/>
      <path d="M56 32h-8"/>
      <path d="M20 20l-4-4"/>
      <path d="M44 20l4-4"/>
      <path d="M20 44l-4 4"/>
      <path d="M44 44l4 4"/>
    </svg>`
  },
  {
    id: 'hemeonc-myeloblast',
    name: 'Myeloblast',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['myeloblast', 'AML', 'myeloid progenitor', 'granulocyte precursor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="30" r="12" fill="currentColor" opacity="0.4"/>
      <circle cx="32" cy="30" r="8"/>
      <circle cx="28" cy="28" r="2" fill="currentColor"/>
      <circle cx="36" cy="32" r="2" fill="currentColor"/>
      <path d="M24 44c4-2 12-2 16 0"/>
    </svg>`
  },
  {
    id: 'hemeonc-promyelocyte',
    name: 'Promyelocyte',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['promyelocyte', 'APL', 'M3', 'azurophilic granules'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18"/>
      <ellipse cx="32" cy="28" rx="10" ry="8" fill="currentColor" opacity="0.4"/>
      <circle cx="20" cy="36" r="2" fill="currentColor"/>
      <circle cx="26" cy="40" r="2" fill="currentColor"/>
      <circle cx="38" cy="38" r="2" fill="currentColor"/>
      <circle cx="44" cy="34" r="2" fill="currentColor"/>
      <circle cx="32" cy="44" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-polychromasia',
    name: 'Polychromasia',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['polychromasia', 'reticulocyte', 'bluish RBC', 'hemolysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="24" rx="12" ry="8"/>
      <ellipse cx="44" cy="24" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="44" rx="12" ry="8" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="44" rx="12" ry="8" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'hemeonc-howell-jolly',
    name: 'Howell-Jolly Body',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['Howell-Jolly', 'nuclear remnant', 'asplenia', 'functional asplenia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="14"/>
      <circle cx="40" cy="30" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-basophilic-stippling',
    name: 'Basophilic Stippling',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['basophilic stippling', 'lead poisoning', 'thalassemia', 'ribosome aggregates'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="14"/>
      <circle cx="24" cy="28" r="1" fill="currentColor"/>
      <circle cx="30" cy="32" r="1" fill="currentColor"/>
      <circle cx="36" cy="28" r="1" fill="currentColor"/>
      <circle cx="28" cy="36" r="1" fill="currentColor"/>
      <circle cx="40" cy="34" r="1" fill="currentColor"/>
      <circle cx="34" cy="30" r="1" fill="currentColor"/>
      <circle cx="38" cy="36" r="1" fill="currentColor"/>
      <circle cx="26" cy="32" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-heinz-body',
    name: 'Heinz Body',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['Heinz body', 'G6PD deficiency', 'oxidative stress', 'denatured hemoglobin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="14"/>
      <circle cx="44" cy="30" r="5" fill="currentColor" opacity="0.5"/>
      <circle cx="42" cy="34" r="3" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'hemeonc-myeloma-protein',
    name: 'M-Protein/Paraprotein',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['M-protein', 'paraprotein', 'monoclonal', 'SPEP', 'myeloma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="32" rx="2"/>
      <path d="M12 48c4-8 8-4 12-12s8-4 12-8 8 4 12 8 4-4 8-8"/>
      <path d="M36 28v16" stroke-width="3" fill="currentColor" opacity="0.4"/>
      <text x="12" y="18" font-size="6" fill="currentColor" stroke="none">SPEP</text>
    </svg>`
  },
  {
    id: 'hemeonc-cryoglobulin',
    name: 'Cryoglobulin',
    domain: 'medicine',
    category: 'pathology',
    tags: ['cryoglobulin', 'cold', 'precipitate', 'vasculitis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v12l4 4v24l-4 4v8h-16v-8l4-4V24l-4-4V8z"/>
      <rect x="28" y="32" width="8" height="16" fill="currentColor" opacity="0.3"/>
      <path d="M28 12h8"/>
      <path d="M20 16l-4 4"/>
      <path d="M44 16l4 4"/>
      <path d="M18 22l-4 0"/>
      <path d="M50 22l4 0"/>
    </svg>`
  },
  {
    id: 'hemeonc-bone-lesion',
    name: 'Lytic Bone Lesion',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['lytic lesion', 'bone', 'myeloma', 'metastasis', 'punched out'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <rect x="16" y="12" width="32" height="40" fill="currentColor" opacity="0.1"/>
      <circle cx="24" cy="24" r="6"/>
      <circle cx="40" cy="32" r="5"/>
      <circle cx="28" cy="42" r="4"/>
      <circle cx="38" cy="20" r="3"/>
    </svg>`
  },
  {
    id: 'hemeonc-bence-jones',
    name: 'Bence Jones Protein',
    domain: 'medicine',
    category: 'malignancy',
    tags: ['Bence Jones', 'light chain', 'urine', 'myeloma', 'UPEP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16v8l4 8v24c0 4-4 8-12 8s-12-4-12-8V24l4-8V8z"/>
      <rect x="24" y="32" width="16" height="16" fill="currentColor" opacity="0.2"/>
      <path d="M28 12h8"/>
      <text x="25" y="44" font-size="6" fill="currentColor" stroke="none">BJP</text>
    </svg>`
  },
  {
    id: 'hemeonc-fish-analysis',
    name: 'FISH Analysis',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['FISH', 'fluorescence', 'cytogenetics', 'translocation', 'chromosomes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <ellipse cx="32" cy="32" rx="14" ry="8" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="28" r="4" fill="currentColor" opacity="0.6"/>
      <circle cx="40" cy="28" r="4" fill="currentColor" opacity="0.4"/>
      <circle cx="28" cy="36" r="3" fill="currentColor" opacity="0.6"/>
      <circle cx="38" cy="38" r="3" fill="currentColor" opacity="0.4"/>
      <path d="M24 28l4 8"/>
      <path d="M40 28l-2 10"/>
    </svg>`
  },
  {
    id: 'hemeonc-karyotype',
    name: 'Karyotype',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['karyotype', 'cytogenetics', 'chromosomes', 'translocation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <path d="M16 20v12c0 2 2 4 4 4h0c2 0 4-2 4-4V20c0-2-2-4-4-4h0c-2 0-4 2-4 4z"/>
      <path d="M28 20v12c0 2 2 4 4 4h0c2 0 4-2 4-4V20c0-2-2-4-4-4h0c-2 0-4 2-4 4z"/>
      <path d="M40 20v12c0 2 2 4 4 4h0c2 0 4-2 4-4V20c0-2-2-4-4-4h0c-2 0-4 2-4 4z"/>
      <path d="M16 44v8"/>
      <path d="M28 44v8"/>
      <path d="M40 44v8"/>
    </svg>`
  },
  {
    id: 'hemeonc-molecular-testing',
    name: 'Molecular Testing',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['molecular', 'PCR', 'NGS', 'mutation', 'genetics'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8v48"/>
      <path d="M44 8v48"/>
      <path d="M20 16c8 4 16-4 24 0"/>
      <path d="M20 28c8-4 16 4 24 0"/>
      <path d="M20 40c8 4 16-4 24 0"/>
      <path d="M20 52c8-4 16 4 24 0"/>
      <circle cx="32" cy="22" r="2" fill="currentColor"/>
      <circle cx="32" cy="34" r="2" fill="currentColor"/>
      <circle cx="32" cy="46" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'hemeonc-nk-cell',
    name: 'NK Cell',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['NK cell', 'natural killer', 'CD56', 'innate immunity', 'cytotoxic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18"/>
      <circle cx="32" cy="32" r="12" fill="currentColor" opacity="0.3"/>
      <circle cx="28" cy="28" r="3" fill="currentColor"/>
      <circle cx="36" cy="36" r="2" fill="currentColor"/>
      <path d="M24 44l-8 8"/>
      <path d="M40 44l8 8"/>
      <path d="M16 52l-4 0"/>
      <path d="M48 52l4 0"/>
    </svg>`
  },
  {
    id: 'hemeonc-dendritic-cell',
    name: 'Dendritic Cell',
    domain: 'medicine',
    category: 'blood-cells',
    tags: ['dendritic cell', 'APC', 'antigen presenting', 'immunology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M32 20v-12"/>
      <path d="M32 44v12"/>
      <path d="M20 32h-12"/>
      <path d="M44 32h12"/>
      <path d="M23 23l-8-8"/>
      <path d="M41 23l8-8"/>
      <path d="M23 41l-8 8"/>
      <path d="M41 41l8 8"/>
      <path d="M26 20l-4-8"/>
      <path d="M38 20l4-8"/>
    </svg>`
  },
  {
    id: 'hemeonc-erythropoietin',
    name: 'Erythropoietin (EPO)',
    domain: 'medicine',
    category: 'treatment',
    tags: ['EPO', 'erythropoietin', 'ESA', 'anemia', 'kidney'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="12" ry="16"/>
      <ellipse cx="24" cy="32" rx="8" ry="12" fill="currentColor" opacity="0.2"/>
      <path d="M36 32h12"/>
      <path d="M44 28l4 4-4 4"/>
      <ellipse cx="56" cy="32" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <text x="18" y="36" font-size="6" fill="currentColor" stroke="none">EPO</text>
    </svg>`
  },
  {
    id: 'hemeonc-gcsf',
    name: 'G-CSF',
    domain: 'medicine',
    category: 'treatment',
    tags: ['G-CSF', 'filgrastim', 'neutropenia', 'growth factor', 'mobilization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="12"/>
      <circle cx="24" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M36 32h8"/>
      <path d="M40 28l4 4-4 4"/>
      <circle cx="52" cy="28" r="6"/>
      <circle cx="52" cy="40" r="5"/>
      <circle cx="56" cy="34" r="4"/>
    </svg>`
  },
  {
    id: 'hemeonc-warfarin',
    name: 'Warfarin/Vitamin K Antagonist',
    domain: 'medicine',
    category: 'treatment',
    tags: ['warfarin', 'coumadin', 'VKA', 'anticoagulant', 'INR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="14" stroke-dasharray="4 2"/>
      <path d="M32 18v14l10 6"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <text x="12" y="56" font-size="6" fill="currentColor" stroke="none">INR</text>
    </svg>`
  },
  {
    id: 'hemeonc-doac',
    name: 'DOAC',
    domain: 'medicine',
    category: 'treatment',
    tags: ['DOAC', 'direct oral anticoagulant', 'rivaroxaban', 'apixaban', 'factor Xa'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="4"/>
      <rect x="20" y="24" width="24" height="16" fill="currentColor" opacity="0.2"/>
      <path d="M24 32h16"/>
      <path d="M32 28v8"/>
      <text x="24" y="18" font-size="6" fill="currentColor" stroke="none">Xa</text>
      <path d="M20 44l-4 8"/>
      <path d="M44 44l4 8"/>
    </svg>`
  },
];

export default hematologyOncologyIcons;
