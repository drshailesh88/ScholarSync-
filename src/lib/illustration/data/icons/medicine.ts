/**
 * medicine.ts
 * Medical and clinical icon definitions for FINNISH Icon Library
 *
 * Contains icons related to medical practice, clinical research,
 * anatomy, and healthcare.
 */

import type { IconDefinition } from './index';

/**
 * Medicine domain icons collection
 */
export const medicineIcons: IconDefinition[] = [
  {
    id: 'med-heart',
    name: 'Heart',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['cardiac', 'cardiovascular', 'organ', 'blood', 'circulation'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
</svg>`,
  },
  {
    id: 'med-brain',
    name: 'Brain',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['neurology', 'nervous system', 'organ', 'cognitive', 'mental'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
  <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
  <path d="M12 5v13"/>
  <path d="M8 8.5c1.5 1 2.5 2 3 3.5"/>
  <path d="M16 8.5c-1.5 1-2.5 2-3 3.5"/>
</svg>`,
  },
  {
    id: 'med-lungs',
    name: 'Lungs',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['respiratory', 'pulmonary', 'organ', 'breathing', 'thorax'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2v8"/>
  <path d="M4.5 12C3 12 2 13.5 2 15c0 3.5 2 5 4.5 5 2 0 3.5-1 4.5-2.5"/>
  <path d="M19.5 12c1.5 0 2.5 1.5 2.5 3 0 3.5-2 5-4.5 5-2 0-3.5-1-4.5-2.5"/>
  <path d="M8 10c-1.5 0-3.5 1-3.5 4"/>
  <path d="M16 10c1.5 0 3.5 1 3.5 4"/>
  <path d="M12 10l-3 .5"/>
  <path d="M12 10l3 .5"/>
</svg>`,
  },
  {
    id: 'med-dna',
    name: 'DNA',
    domain: 'medicine',
    category: 'genetics',
    tags: ['genetics', 'helix', 'chromosome', 'gene', 'hereditary'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 15c6.667-6 13.333 0 20-6"/>
  <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/>
  <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/>
  <path d="M17 6l-2.5-2.5"/>
  <path d="M14 8l-1-1"/>
  <path d="M7 18l2.5 2.5"/>
  <path d="M10 16l1 1"/>
  <path d="M2 9c6.667 6 13.333 0 20 6"/>
</svg>`,
  },
  {
    id: 'med-cell',
    name: 'Cell',
    domain: 'medicine',
    category: 'cellular',
    tags: ['biology', 'nucleus', 'organelle', 'cytoplasm', 'membrane'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="9" ry="7"/>
  <circle cx="12" cy="12" r="3"/>
  <circle cx="12" cy="12" r="1" fill="currentColor"/>
  <circle cx="7" cy="9" r="0.5" fill="currentColor"/>
  <circle cx="17" cy="10" r="0.5" fill="currentColor"/>
  <circle cx="8" cy="14" r="0.5" fill="currentColor"/>
  <circle cx="16" cy="14" r="0.5" fill="currentColor"/>
  <circle cx="10" cy="7" r="0.5" fill="currentColor"/>
  <circle cx="14" cy="16" r="0.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'med-syringe',
    name: 'Syringe',
    domain: 'medicine',
    category: 'equipment',
    tags: ['injection', 'vaccine', 'needle', 'medication', 'treatment'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 2l4 4"/>
  <path d="M17 7l3-3"/>
  <path d="M19 9l-7-7-8.5 8.5c-1.5 1.5-1.5 4 0 5.5l2 2c1.5 1.5 4 1.5 5.5 0L19 9z"/>
  <path d="M5 14l5 5"/>
  <path d="M2 21l3-3"/>
  <path d="M7 11l2 2"/>
  <path d="M10 8l2 2"/>
  <path d="M13 5l2 2"/>
</svg>`,
  },
  {
    id: 'med-pill',
    name: 'Pill',
    domain: 'medicine',
    category: 'medication',
    tags: ['capsule', 'drug', 'pharmaceutical', 'tablet', 'medicine'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="8" width="18" height="8" rx="4" ry="4"/>
  <line x1="12" y1="8" x2="12" y2="16"/>
  <path d="M6 11h2"/>
  <path d="M6 13h2"/>
  <circle cx="17" cy="12" r="0.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'med-stethoscope',
    name: 'Stethoscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['doctor', 'examination', 'diagnosis', 'auscultation', 'clinical'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
  <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
  <circle cx="20" cy="10" r="2"/>
</svg>`,
  },
  {
    id: 'med-bacteria',
    name: 'Bacteria',
    domain: 'medicine',
    category: 'microbiology',
    tags: ['microorganism', 'infection', 'pathogen', 'germ', 'prokaryote'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="12" rx="6" ry="4"/>
  <path d="M6 12c-2 0-3-1-3-2"/>
  <path d="M18 12c2 0 3-1 3-2"/>
  <path d="M6 12c-2 0-3 1-3 2"/>
  <path d="M18 12c2 0 3 1 3 2"/>
  <path d="M9 8c-1-2-1-4 0-5"/>
  <path d="M15 8c1-2 1-4 0-5"/>
  <path d="M9 16c-1 2-1 4 0 5"/>
  <path d="M15 16c1 2 1 4 0 5"/>
  <circle cx="10" cy="11" r="0.5" fill="currentColor"/>
  <circle cx="14" cy="13" r="0.5" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'med-virus',
    name: 'Virus',
    domain: 'medicine',
    category: 'microbiology',
    tags: ['pathogen', 'infection', 'disease', 'contagion', 'virology'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="5"/>
  <path d="M12 2v4"/>
  <path d="M12 18v4"/>
  <path d="M2 12h4"/>
  <path d="M18 12h4"/>
  <path d="M4.93 4.93l2.83 2.83"/>
  <path d="M16.24 16.24l2.83 2.83"/>
  <path d="M4.93 19.07l2.83-2.83"/>
  <path d="M16.24 7.76l2.83-2.83"/>
  <circle cx="12" cy="12" r="2" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'med-ecg',
    name: 'ECG',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['electrocardiogram', 'heart rate', 'cardiac', 'monitor', 'pulse'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 12h4l2-6 4 12 2-6h4l2 3h2"/>
  <rect x="2" y="4" width="20" height="16" rx="2"/>
</svg>`,
  },
  {
    id: 'med-microscope',
    name: 'Microscope',
    domain: 'medicine',
    category: 'equipment',
    tags: ['laboratory', 'research', 'magnification', 'analysis', 'pathology'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 18h8"/>
  <path d="M3 22h18"/>
  <path d="M14 22a7 7 0 1 0 0-14h-1"/>
  <path d="M9 14h2"/>
  <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/>
  <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>
</svg>`,
  },
  {
    id: 'med-test-tube',
    name: 'Test Tube',
    domain: 'medicine',
    category: 'laboratory',
    tags: ['sample', 'analysis', 'blood test', 'specimen', 'lab'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 2v10l-5 8c-.5.8-.1 2 1 2h14c1.1 0 1.5-1.2 1-2l-5-8V2"/>
  <path d="M7 2h10"/>
  <path d="M6 16h12"/>
  <circle cx="12" cy="18" r="1"/>
</svg>`,
  },
  {
    id: 'med-bone',
    name: 'Bone',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['skeletal', 'orthopedic', 'skeleton', 'femur', 'calcium'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 4a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1 2-2z"/>
  <path d="M4 20a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2 2 2 0 0 0 2 2z"/>
  <path d="M20 4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z"/>
  <path d="M20 20a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2z"/>
  <path d="M6 6l12 12"/>
  <path d="M6 18L18 6"/>
</svg>`,
  },
  {
    id: 'med-eye',
    name: 'Eye',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['ophthalmology', 'vision', 'retina', 'optical', 'sight'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
  <circle cx="12" cy="12" r="3"/>
  <circle cx="12" cy="12" r="1" fill="currentColor"/>
</svg>`,
  },
  {
    id: 'med-blood-drop',
    name: 'Blood Drop',
    domain: 'medicine',
    category: 'cellular',
    tags: ['hematology', 'donation', 'transfusion', 'plasma', 'red cell'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2c-4 4-7 8-7 12a7 7 0 0 0 14 0c0-4-3-8-7-12z"/>
  <path d="M12 8v4"/>
  <path d="M10 10h4"/>
</svg>`,
  },
  {
    id: 'med-tooth',
    name: 'Tooth',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['dental', 'dentistry', 'oral', 'molar', 'orthodontic'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2c-4 0-6 3-6 6 0 2 1 4 1 6s-1 6 1 8c1 1 2 0 2-2s1-3 2-3 2 1 2 3 1 3 2 2c2-2 1-6 1-8s1-4 1-6c0-3-2-6-6-6z"/>
</svg>`,
  },
  {
    id: 'med-kidney',
    name: 'Kidney',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['renal', 'nephrology', 'organ', 'urinary', 'dialysis'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 3c-3 0-5 2-5 5 0 2 1 4 2 5s2 2 2 4c0 3 2 5 5 5s5-2 5-5c0-2-1-3-2-4s-2-3-2-5c0-3-2-5-5-5z"/>
  <path d="M12 10c1-1 3-1 4 0"/>
</svg>`,
  },
  {
    id: 'med-liver',
    name: 'Liver',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['hepatic', 'hepatology', 'organ', 'digestion', 'metabolism'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4 10c0-4 4-7 8-7 3 0 6 2 8 5 1 2 1 4 0 6-2 4-6 7-10 7-4 0-6-3-6-7v-4z"/>
  <path d="M12 6v4"/>
  <path d="M8 10c2-2 4-2 6 0"/>
</svg>`,
  },
  {
    id: 'med-muscle',
    name: 'Muscle',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['myology', 'bicep', 'strength', 'tissue', 'fiber'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M5 8c0-2 2-4 4-4 3 0 4 2 5 4s2 4 5 4c2 0 3-1 3-3"/>
  <path d="M5 16c0 2 2 4 4 4 3 0 4-2 5-4s2-4 5-4"/>
  <path d="M5 8v8"/>
  <path d="M9 6c1 2 1 4 0 6s-1 4 0 6"/>
</svg>`,
  },
];

export default medicineIcons;
