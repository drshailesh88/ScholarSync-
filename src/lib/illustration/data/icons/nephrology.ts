/**
 * Nephrology Icon Library
 * Comprehensive SVG icons for renal medicine
 *
 * Categories:
 * - Kidney Anatomy (nephron, glomerulus, tubules, collecting system)
 * - Glomerular Structures (podocytes, basement membrane, filtration)
 * - Pathology - AKI (prerenal, intrinsic, postrenal causes)
 * - Pathology - CKD (stages, diabetic nephropathy, glomerulonephritis)
 * - Electrolytes & Acid-Base (sodium, potassium, calcium disorders)
 * - Dialysis & Transplant (hemodialysis, peritoneal dialysis, transplant)
 * - Equipment & Procedures (urinalysis, biopsy, imaging, access)
 */

import type { IconDefinition } from './index';

export const nephrologyIcons: IconDefinition[] = [
  // ===========================================================================
  // KIDNEY ANATOMY
  // ===========================================================================
  {
    id: 'nephro-kidney-cross-section',
    name: 'Kidney Cross Section',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['kidney', 'cross section', 'cortex', 'medulla', 'pelvis', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c-16 0-24 12-24 28s8 28 24 28c8 0 12-8 12-28S40 4 32 4z" fill="currentColor" opacity="0.1"/>
      <path d="M32 4c-16 0-24 12-24 28s8 28 24 28c8 0 12-8 12-28S40 4 32 4z"/>
      <path d="M20 32c0-12 4-20 12-20" stroke-dasharray="3 2"/>
      <ellipse cx="36" cy="32" rx="6" ry="10" fill="currentColor" opacity="0.2"/>
      <path d="M42 32h14"/>
      <text x="8" y="20" font-size="4" fill="currentColor" stroke="none">Cortex</text>
      <text x="22" y="36" font-size="4" fill="currentColor" stroke="none">Medulla</text>
      <text x="34" y="36" font-size="3" fill="currentColor" stroke="none">Pelvis</text>
      <text x="48" y="30" font-size="4" fill="currentColor" stroke="none">Ureter</text>
    </svg>`
  },
  {
    id: 'nephro-nephron',
    name: 'Nephron Complete',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['nephron', 'functional unit', 'glomerulus', 'tubule', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="12" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="16" cy="12" r="8"/>
      <path d="M24 12h8c4 0 6 4 6 8v8c0 4-4 6-8 6h-8c-4 0-6 4-6 6v8c0 4 4 6 8 6h16"/>
      <path d="M38 20v24"/>
      <path d="M32 54h12"/>
      <circle cx="16" cy="12" r="4" fill="currentColor" opacity="0.4"/>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">PCT</text>
      <text x="40" y="36" font-size="3" fill="currentColor" stroke="none">Loop</text>
      <text x="18" y="50" font-size="3" fill="currentColor" stroke="none">DCT</text>
      <text x="44" y="58" font-size="3" fill="currentColor" stroke="none">CD</text>
    </svg>`
  },
  {
    id: 'nephro-glomerulus',
    name: 'Glomerulus',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['glomerulus', 'capillary tuft', 'Bowman capsule', 'filtration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="18" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="18"/>
      <path d="M20 28c4-4 8-4 12 0s8 4 12 0" fill="none"/>
      <path d="M20 32c4-4 8-4 12 0s8 4 12 0" fill="none"/>
      <path d="M20 36c4-4 8-4 12 0s8 4 12 0" fill="none"/>
      <path d="M16 20l-8-12"/>
      <path d="M48 20l8-12"/>
      <path d="M32 50v10"/>
      <circle cx="32" cy="32" r="10" fill="#DC143C" opacity="0.2"/>
      <text x="4" y="10" font-size="4" fill="currentColor" stroke="none">AA</text>
      <text x="52" y="10" font-size="4" fill="currentColor" stroke="none">EA</text>
    </svg>`
  },
  {
    id: 'nephro-proximal-tubule',
    name: 'Proximal Convoluted Tubule',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['PCT', 'proximal tubule', 'reabsorption', 'brush border', 'S1 S2 S3'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 16c8 8 16-8 24 0s16-8 24 8"/>
      <path d="M8 32c8 8 16-8 24 0s16-8 24 8"/>
      <path d="M8 48c8 8 16-8 24 0s16-8 24 8"/>
      <path d="M12 16v4M16 16v4M20 16v4M24 16v4M28 16v4M32 16v4M36 16v4M40 16v4M44 16v4M48 16v4M52 16v4" stroke-width="1"/>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">Brush border - 65% reabsorption</text>
    </svg>`
  },
  {
    id: 'nephro-loop-henle',
    name: 'Loop of Henle',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['loop of Henle', 'thin limb', 'thick limb', 'countercurrent', 'concentration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8v24c0 8 8 16 16 16s16-8 16-16V8" stroke-width="2"/>
      <path d="M16 8v24c0 8 8 16 16 16" stroke-width="1" stroke-dasharray="2 2"/>
      <path d="M32 48c8 0 16-8 16-16V8" stroke-width="3"/>
      <text x="4" y="20" font-size="4" fill="currentColor" stroke="none">Thin</text>
      <text x="48" y="20" font-size="4" fill="currentColor" stroke="none">Thick</text>
      <text x="22" y="60" font-size="4" fill="currentColor" stroke="none">Hairpin</text>
      <path d="M24 32l-4-4M24 32l-4 4" fill="none"/>
      <path d="M40 32l4-4M40 32l4 4" fill="none"/>
    </svg>`
  },
  {
    id: 'nephro-distal-tubule',
    name: 'Distal Convoluted Tubule',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['DCT', 'distal tubule', 'thiazide sensitive', 'NCC', 'aldosterone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c6-8 12 8 18 0s12 8 18 0s12 8 12 0" stroke-width="2"/>
      <ellipse cx="32" cy="32" rx="24" ry="8" fill="currentColor" opacity="0.1"/>
      <circle cx="12" cy="20" r="3" fill="#4169E1"/>
      <text x="18" y="22" font-size="3" fill="currentColor" stroke="none">Na+</text>
      <circle cx="52" cy="20" r="3" fill="#FFD700"/>
      <text x="40" y="22" font-size="3" fill="currentColor" stroke="none">K+</text>
      <text x="4" y="50" font-size="4" fill="currentColor" stroke="none">DCT - Fine-tuning</text>
    </svg>`
  },
  {
    id: 'nephro-collecting-duct',
    name: 'Collecting Duct',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['collecting duct', 'CD', 'principal cells', 'intercalated cells', 'ADH'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8v48" stroke-width="4"/>
      <path d="M40 8v48" stroke-width="4"/>
      <path d="M16 8h32"/>
      <path d="M20 56h24"/>
      <circle cx="32" cy="20" r="4" fill="#4169E1" opacity="0.5"/>
      <circle cx="32" cy="36" r="4" fill="#22C55E" opacity="0.5"/>
      <circle cx="32" cy="52" r="4" fill="#4169E1" opacity="0.5"/>
      <text x="42" y="22" font-size="3" fill="currentColor" stroke="none">Principal</text>
      <text x="42" y="38" font-size="3" fill="currentColor" stroke="none">Intercalated</text>
      <text x="4" y="34" font-size="3" fill="currentColor" stroke="none">ADH</text>
    </svg>`
  },
  {
    id: 'nephro-renal-pelvis',
    name: 'Renal Pelvis',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['renal pelvis', 'calyces', 'collecting system', 'urine drainage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l-12 12c-4 4-4 8 0 12l12 12 12-12c4-4 4-8 0-12L32 8z" fill="currentColor" opacity="0.2"/>
      <path d="M32 8l-12 12c-4 4-4 8 0 12l12 12 12-12c4-4 4-8 0-12L32 8z"/>
      <path d="M16 16l-8-4"/>
      <path d="M12 28l-8 0"/>
      <path d="M48 16l8-4"/>
      <path d="M52 28l8 0"/>
      <path d="M32 44v16" stroke-width="2"/>
      <text x="4" y="10" font-size="4" fill="currentColor" stroke="none">Calyces</text>
      <text x="26" y="30" font-size="4" fill="currentColor" stroke="none">Pelvis</text>
    </svg>`
  },
  {
    id: 'nephro-ureter',
    name: 'Ureter',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['ureter', 'ureteral', 'peristalsis', 'UPJ', 'UVJ'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="8" rx="12" ry="4"/>
      <path d="M20 8v8c0 8 4 16 4 24s-4 12-4 16"/>
      <path d="M44 8v8c0 8-4 16-4 24s4 12 4 16"/>
      <path d="M20 56c4 4 20 4 24 0"/>
      <path d="M28 20l4-4 4 4"/>
      <path d="M28 36l4-4 4 4"/>
      <path d="M28 48l4-4 4 4"/>
      <text x="46" y="12" font-size="4" fill="currentColor" stroke="none">UPJ</text>
      <text x="46" y="56" font-size="4" fill="currentColor" stroke="none">UVJ</text>
    </svg>`
  },
  {
    id: 'nephro-bladder',
    name: 'Urinary Bladder',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['bladder', 'detrusor', 'trigone', 'urothelium', 'voiding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M20 12l-4-8"/>
      <path d="M44 12l4-8"/>
      <path d="M32 52v8"/>
      <path d="M20 20l24 0" stroke-dasharray="2 2"/>
      <circle cx="20" cy="20" r="2" fill="currentColor"/>
      <circle cx="44" cy="20" r="2" fill="currentColor"/>
      <circle cx="32" cy="52" r="2" fill="currentColor"/>
      <text x="24" y="36" font-size="4" fill="currentColor" stroke="none">Trigone</text>
    </svg>`
  },
  {
    id: 'nephro-juxtaglomerular',
    name: 'Juxtaglomerular Apparatus',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['JGA', 'juxtaglomerular', 'macula densa', 'renin', 'RAAS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="24" r="12" fill="currentColor" opacity="0.2"/>
      <circle cx="24" cy="24" r="12"/>
      <path d="M12 12l-4-4"/>
      <path d="M36 12l4-4"/>
      <path d="M36 24c8 0 12 4 12 8v24"/>
      <path d="M36 28c4 2 4 6 0 8" fill="currentColor" opacity="0.4"/>
      <circle cx="18" cy="20" r="2" fill="#DC143C"/>
      <circle cx="22" cy="26" r="2" fill="#DC143C"/>
      <circle cx="28" cy="22" r="2" fill="#DC143C"/>
      <text x="40" y="36" font-size="3" fill="currentColor" stroke="none">Macula</text>
      <text x="40" y="42" font-size="3" fill="currentColor" stroke="none">Densa</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">JG cells</text>
    </svg>`
  },
  {
    id: 'nephro-renal-vasculature',
    name: 'Renal Vasculature',
    domain: 'medicine',
    category: 'kidney-anatomy',
    tags: ['renal artery', 'renal vein', 'arcuate', 'interlobar', 'blood supply'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h12" stroke="#DC143C" stroke-width="3"/>
      <path d="M20 32c4-8 8-16 16-16s12 8 16 16-4 16-16 16-16-8-16-16z" fill="currentColor" opacity="0.1"/>
      <path d="M20 24c4 4 8 4 12 4"/>
      <path d="M20 40c4-4 8-4 12-4"/>
      <path d="M44 32h12" stroke="#4169E1" stroke-width="3"/>
      <text x="4" y="28" font-size="4" fill="#DC143C" stroke="none">RA</text>
      <text x="52" y="28" font-size="4" fill="#4169E1" stroke="none">RV</text>
      <circle cx="36" cy="24" r="3"/>
      <circle cx="36" cy="40" r="3"/>
    </svg>`
  },

  // ===========================================================================
  // GLOMERULAR STRUCTURES
  // ===========================================================================
  {
    id: 'nephro-glomerular-filtration',
    name: 'Glomerular Filtration',
    domain: 'medicine',
    category: 'glomerular',
    tags: ['GFR', 'filtration', 'ultrafiltration', 'Starling forces', 'sieving'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16" fill="#DC143C" opacity="0.2"/>
      <circle cx="32" cy="24" r="16"/>
      <path d="M32 40v20"/>
      <path d="M24 48l8-8 8 8"/>
      <path d="M24 56l8-8 8 8"/>
      <circle cx="28" cy="20" r="2" fill="#FFD700"/>
      <circle cx="36" cy="20" r="2" fill="#FFD700"/>
      <circle cx="32" cy="28" r="2" fill="#FFD700"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">GFR ~120 mL/min</text>
    </svg>`
  },
  {
    id: 'nephro-podocyte',
    name: 'Podocyte',
    domain: 'medicine',
    category: 'glomerular',
    tags: ['podocyte', 'foot processes', 'slit diaphragm', 'nephrin', 'visceral epithelium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="12" ry="8" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="24" rx="12" ry="8"/>
      <path d="M20 32l-4 8"/>
      <path d="M24 32l-2 10"/>
      <path d="M28 32l0 12"/>
      <path d="M32 32l0 14"/>
      <path d="M36 32l0 12"/>
      <path d="M40 32l2 10"/>
      <path d="M44 32l4 8"/>
      <path d="M16 44h32" stroke-dasharray="2 1"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Foot processes</text>
    </svg>`
  },
  {
    id: 'nephro-basement-membrane',
    name: 'Glomerular Basement Membrane',
    domain: 'medicine',
    category: 'glomerular',
    tags: ['GBM', 'basement membrane', 'collagen IV', 'laminin', 'filtration barrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" fill="currentColor" opacity="0.1"/>
      <line x1="8" y1="20" x2="56" y2="20" stroke-width="2"/>
      <line x1="8" y1="44" x2="56" y2="44" stroke-width="2"/>
      <path d="M8 28h48" stroke-dasharray="4 2"/>
      <path d="M8 36h48" stroke-dasharray="4 2"/>
      <text x="4" y="16" font-size="3" fill="currentColor" stroke="none">Lamina rara externa</text>
      <text x="4" y="34" font-size="3" fill="currentColor" stroke="none">Lamina densa</text>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">Lamina rara interna</text>
    </svg>`
  },
  {
    id: 'nephro-mesangium',
    name: 'Mesangium',
    domain: 'medicine',
    category: 'glomerular',
    tags: ['mesangium', 'mesangial cells', 'matrix', 'support', 'phagocytosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M20 24c4-4 8-4 12 0s8 4 12 0"/>
      <path d="M20 32c4-4 8-4 12 0s8 4 12 0"/>
      <path d="M20 40c4-4 8-4 12 0s8 4 12 0"/>
      <ellipse cx="32" cy="32" rx="8" ry="12" fill="#FFA500" opacity="0.4"/>
      <circle cx="32" cy="28" r="3" fill="currentColor"/>
      <circle cx="32" cy="36" r="3" fill="currentColor"/>
      <text x="40" y="32" font-size="4" fill="currentColor" stroke="none">Mesangial</text>
      <text x="40" y="38" font-size="4" fill="currentColor" stroke="none">cells</text>
    </svg>`
  },
  {
    id: 'nephro-bowman-capsule',
    name: "Bowman's Capsule",
    domain: 'medicine',
    category: 'glomerular',
    tags: ['Bowman capsule', 'parietal epithelium', 'urinary space', 'filtrate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="24" ry="20"/>
      <ellipse cx="32" cy="28" rx="14" ry="12" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="32" cy="28" rx="14" ry="12"/>
      <path d="M32 48v12"/>
      <path d="M16 8l-4-4"/>
      <path d="M48 8l4-4"/>
      <text x="4" y="8" font-size="4" fill="currentColor" stroke="none">AA</text>
      <text x="52" y="8" font-size="4" fill="currentColor" stroke="none">EA</text>
      <text x="20" y="56" font-size="4" fill="currentColor" stroke="none">Urinary pole</text>
    </svg>`
  },
  {
    id: 'nephro-filtration-barrier',
    name: 'Filtration Barrier',
    domain: 'medicine',
    category: 'glomerular',
    tags: ['filtration barrier', 'three layers', 'size selectivity', 'charge barrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" fill="currentColor" opacity="0.05"/>
      <path d="M8 16h48" stroke-width="2"/>
      <text x="4" y="14" font-size="3" fill="currentColor" stroke="none">Endothelium</text>
      <circle cx="16" cy="24" r="3"/>
      <circle cx="28" cy="24" r="3"/>
      <circle cx="40" cy="24" r="3"/>
      <circle cx="52" cy="24" r="3"/>
      <rect x="8" y="30" width="48" height="8" fill="#FFD700" opacity="0.3"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">GBM</text>
      <path d="M12 44v8M20 44v8M28 44v8M36 44v8M44 44v8M52 44v8" stroke-width="2"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Podocytes</text>
    </svg>`
  },
  {
    id: 'nephro-fenestrated-endothelium',
    name: 'Fenestrated Endothelium',
    domain: 'medicine',
    category: 'glomerular',
    tags: ['fenestration', 'endothelium', 'pores', 'glycocalyx', 'permeability'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="24" width="48" height="16"/>
      <circle cx="16" cy="32" r="4" fill="white"/>
      <circle cx="28" cy="32" r="4" fill="white"/>
      <circle cx="40" cy="32" r="4" fill="white"/>
      <circle cx="52" cy="32" r="4" fill="white"/>
      <path d="M16 32v-12M28 32v-12M40 32v-12M52 32v-12" stroke-dasharray="2 1"/>
      <text x="4" y="52" font-size="4" fill="currentColor" stroke="none">70-100nm fenestrations</text>
    </svg>`
  },
  {
    id: 'nephro-slit-diaphragm',
    name: 'Slit Diaphragm',
    domain: 'medicine',
    category: 'glomerular',
    tags: ['slit diaphragm', 'nephrin', 'podocin', 'filtration slit', 'protein barrier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 16v32" stroke-width="4"/>
      <path d="M24 16v32" stroke-width="4"/>
      <path d="M36 16v32" stroke-width="4"/>
      <path d="M48 16v32" stroke-width="4"/>
      <path d="M12 28h12" stroke="#DC143C" stroke-width="2"/>
      <path d="M24 36h12" stroke="#DC143C" stroke-width="2"/>
      <path d="M36 28h12" stroke="#DC143C" stroke-width="2"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Nephrin bridges</text>
      <text x="4" y="12" font-size="3" fill="currentColor" stroke="none">Foot processes</text>
    </svg>`
  },
  {
    id: 'nephro-parietal-epithelium',
    name: 'Parietal Epithelial Cell',
    domain: 'medicine',
    category: 'glomerular',
    tags: ['parietal', 'epithelium', 'Bowman capsule', 'flat cells', 'outer layer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-16 16-16 24 0s16 16 24 0" stroke-width="2"/>
      <ellipse cx="20" cy="24" rx="6" ry="3" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="24" rx="6" ry="3" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="24" r="2" fill="currentColor"/>
      <circle cx="44" cy="24" r="2" fill="currentColor"/>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">Flat squamous cells</text>
      <path d="M8 56h48" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    id: 'nephro-afferent-arteriole',
    name: 'Afferent Arteriole',
    domain: 'medicine',
    category: 'glomerular',
    tags: ['afferent', 'arteriole', 'AA', 'blood supply', 'autoregulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h20" stroke="#DC143C" stroke-width="4"/>
      <circle cx="44" cy="32" r="12" fill="#DC143C" opacity="0.2"/>
      <circle cx="44" cy="32" r="12"/>
      <path d="M24 28l8 4-8 4" fill="currentColor"/>
      <text x="4" y="24" font-size="4" fill="currentColor" stroke="none">AA</text>
      <text x="38" y="36" font-size="4" fill="currentColor" stroke="none">Glom</text>
      <text x="4" y="50" font-size="3" fill="currentColor" stroke="none">Pressure ~60mmHg</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - AKI
  // ===========================================================================
  {
    id: 'nephro-prerenal-aki',
    name: 'Prerenal AKI',
    domain: 'medicine',
    category: 'pathology-aki',
    tags: ['prerenal', 'AKI', 'hypoperfusion', 'volume depletion', 'decreased GFR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z" fill="currentColor" opacity="0.1"/>
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z"/>
      <path d="M8 28h10" stroke="#DC143C" stroke-width="2" stroke-dasharray="4 2"/>
      <path d="M8 36h10" stroke="#DC143C" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="4" y="24" font-size="4" fill="#DC143C" stroke="none">Low</text>
      <text x="4" y="46" font-size="4" fill="#DC143C" stroke="none">flow</text>
      <text x="44" y="32" font-size="3" fill="currentColor" stroke="none">FeNa &lt;1%</text>
      <text x="44" y="40" font-size="3" fill="currentColor" stroke="none">BUN/Cr &gt;20</text>
    </svg>`
  },
  {
    id: 'nephro-intrinsic-aki',
    name: 'Intrinsic AKI',
    domain: 'medicine',
    category: 'pathology-aki',
    tags: ['intrinsic', 'AKI', 'renal', 'parenchymal', 'tubular damage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z" fill="#FFA500" opacity="0.3"/>
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z"/>
      <circle cx="24" cy="24" r="4" fill="#DC143C" opacity="0.5"/>
      <circle cx="32" cy="36" r="4" fill="#DC143C" opacity="0.5"/>
      <circle cx="20" cy="40" r="4" fill="#DC143C" opacity="0.5"/>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">FeNa &gt;2%</text>
      <text x="44" y="36" font-size="3" fill="currentColor" stroke="none">Muddy</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">casts</text>
    </svg>`
  },
  {
    id: 'nephro-postrenal-aki',
    name: 'Postrenal AKI (Obstruction)',
    domain: 'medicine',
    category: 'pathology-aki',
    tags: ['postrenal', 'AKI', 'obstruction', 'hydronephrosis', 'blocked'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z" fill="#4169E1" opacity="0.2"/>
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z"/>
      <ellipse cx="32" cy="32" rx="10" ry="14" fill="#4169E1" opacity="0.3"/>
      <path d="M42 32h14" stroke-width="2"/>
      <line x1="50" y1="28" x2="54" y2="36" stroke="#DC143C" stroke-width="3"/>
      <line x1="54" y1="28" x2="50" y2="36" stroke="#DC143C" stroke-width="3"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Hydronephrosis</text>
    </svg>`
  },
  {
    id: 'nephro-atn',
    name: 'Acute Tubular Necrosis',
    domain: 'medicine',
    category: 'pathology-aki',
    tags: ['ATN', 'tubular necrosis', 'ischemic', 'nephrotoxic', 'muddy casts'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c8 0 12 8 16 8s8-8 16-8 12 8 16 8"/>
      <path d="M8 40c8 0 12 8 16 8s8-8 16-8 12 8 16 8"/>
      <circle cx="20" cy="24" r="4" fill="#8B0000" opacity="0.6"/>
      <circle cx="36" cy="40" r="4" fill="#8B0000" opacity="0.6"/>
      <circle cx="52" cy="24" r="4" fill="#8B0000" opacity="0.6"/>
      <path d="M16 32h8" stroke="#8B4513" stroke-width="3"/>
      <path d="M40 32h8" stroke="#8B4513" stroke-width="3"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Necrotic epithelium</text>
    </svg>`
  },
  {
    id: 'nephro-ain',
    name: 'Acute Interstitial Nephritis',
    domain: 'medicine',
    category: 'pathology-aki',
    tags: ['AIN', 'interstitial nephritis', 'drug-induced', 'eosinophils', 'allergic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z"/>
      <circle cx="20" cy="24" r="3" fill="#FF69B4"/>
      <circle cx="28" cy="32" r="3" fill="#FF69B4"/>
      <circle cx="24" cy="42" r="3" fill="#FF69B4"/>
      <circle cx="34" cy="28" r="3" fill="#FF69B4"/>
      <circle cx="32" cy="40" r="3" fill="#FF69B4"/>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">WBC</text>
      <text x="44" y="36" font-size="3" fill="currentColor" stroke="none">casts</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">Eos</text>
    </svg>`
  },
  {
    id: 'nephro-contrast-nephropathy',
    name: 'Contrast-Induced Nephropathy',
    domain: 'medicine',
    category: 'pathology-aki',
    tags: ['CIN', 'contrast', 'nephropathy', 'iodinated', 'prevention'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z"/>
      <path d="M8 20l8 8-8 8" stroke="#8B4513" stroke-width="2"/>
      <circle cx="20" cy="28" r="6" fill="#8B4513" opacity="0.4"/>
      <circle cx="28" cy="40" r="6" fill="#8B4513" opacity="0.4"/>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">24-72h</text>
      <text x="44" y="36" font-size="3" fill="currentColor" stroke="none">post</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">contrast</text>
    </svg>`
  },
  {
    id: 'nephro-rhabdomyolysis',
    name: 'Rhabdomyolysis-Induced AKI',
    domain: 'medicine',
    category: 'pathology-aki',
    tags: ['rhabdomyolysis', 'myoglobin', 'CK', 'crush injury', 'pigment nephropathy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="48" rx="4" fill="#8B4513" opacity="0.3"/>
      <rect x="8" y="8" width="20" height="48" rx="4"/>
      <path d="M28 32h8"/>
      <path d="M32 28l4 4-4 4"/>
      <path d="M44 12c-6 0-8 8-8 20s2 20 8 20c4 0 6-4 6-20s-2-20-6-20z"/>
      <path d="M44 24v16" stroke="#8B4513" stroke-width="3"/>
      <text x="8" y="60" font-size="4" fill="currentColor" stroke="none">Muscle</text>
      <text x="36" y="60" font-size="3" fill="currentColor" stroke="none">Myoglobin</text>
    </svg>`
  },
  {
    id: 'nephro-ureteral-obstruction',
    name: 'Ureteral Obstruction',
    domain: 'medicine',
    category: 'pathology-aki',
    tags: ['obstruction', 'stone', 'ureteral', 'hydronephrosis', 'colicky'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="16" rx="12" ry="8"/>
      <path d="M24 24v24" stroke-width="3"/>
      <ellipse cx="24" cy="56" rx="8" ry="4"/>
      <polygon points="24,36 20,40 28,40" fill="#8B4513"/>
      <path d="M36 36h20"/>
      <text x="40" y="32" font-size="4" fill="currentColor" stroke="none">Stone</text>
      <path d="M12 32c-4 4-4 8 0 12" stroke-dasharray="2 2"/>
      <text x="40" y="48" font-size="3" fill="currentColor" stroke="none">Dilated</text>
      <text x="40" y="56" font-size="3" fill="currentColor" stroke="none">proximal</text>
    </svg>`
  },
  {
    id: 'nephro-hus-ttp',
    name: 'HUS/TTP',
    domain: 'medicine',
    category: 'pathology-aki',
    tags: ['HUS', 'TTP', 'TMA', 'thrombotic microangiopathy', 'schistocytes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M20 28c4-4 8-4 12 0s8 4 12 0"/>
      <path d="M20 36c4-4 8-4 12 0s8 4 12 0"/>
      <circle cx="24" cy="32" r="4" fill="#DC143C" opacity="0.6"/>
      <circle cx="40" cy="32" r="4" fill="#DC143C" opacity="0.6"/>
      <path d="M26 28l4-4"/>
      <path d="M34 28l4 4"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Microthrombi + schistocytes</text>
    </svg>`
  },
  {
    id: 'nephro-hepatorenal',
    name: 'Hepatorenal Syndrome',
    domain: 'medicine',
    category: 'pathology-aki',
    tags: ['hepatorenal', 'HRS', 'cirrhosis', 'portal hypertension', 'vasoconstriction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-8 8-8 24 0 32s16 8 16 0-8-24-16-32z" fill="#FFA500" opacity="0.3"/>
      <path d="M16 16c-8 8-8 24 0 32s16 8 16 0-8-24-16-32z"/>
      <path d="M36 32h8"/>
      <path d="M48 20c-6 0-8 6-8 12s2 12 8 12c4 0 6-4 6-12s-2-12-6-12z" fill="#DC143C" opacity="0.2"/>
      <path d="M48 20c-6 0-8 6-8 12s2 12 8 12c4 0 6-4 6-12s-2-12-6-12z"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Liver</text>
      <text x="44" y="56" font-size="4" fill="currentColor" stroke="none">Kidney</text>
      <path d="M48 28l-4 4 4 4" stroke="#DC143C" stroke-width="2"/>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY - CKD
  // ===========================================================================
  {
    id: 'nephro-ckd-stages',
    name: 'CKD Stages',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['CKD', 'stages', 'GFR', 'chronic kidney disease', 'classification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="10" height="48" fill="#22C55E"/>
      <rect x="16" y="18" width="10" height="38" fill="#84CC16"/>
      <rect x="28" y="28" width="10" height="28" fill="#FACC15"/>
      <rect x="40" y="38" width="10" height="18" fill="#F97316"/>
      <rect x="52" y="48" width="8" height="8" fill="#DC2626"/>
      <text x="6" y="62" font-size="4" fill="white" stroke="none">1</text>
      <text x="18" y="62" font-size="4" fill="white" stroke="none">2</text>
      <text x="30" y="62" font-size="4" fill="white" stroke="none">3</text>
      <text x="42" y="62" font-size="4" fill="white" stroke="none">4</text>
      <text x="54" y="62" font-size="4" fill="white" stroke="none">5</text>
      <text x="4" y="6" font-size="3" fill="currentColor" stroke="none">GFR</text>
    </svg>`
  },
  {
    id: 'nephro-esrd',
    name: 'ESRD/Kidney Failure',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['ESRD', 'end stage', 'kidney failure', 'dialysis', 'GFR less than 15'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z" fill="#808080" opacity="0.5"/>
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z"/>
      <line x1="16" y1="20" x2="36" y2="44" stroke="#DC143C" stroke-width="2"/>
      <line x1="36" y1="20" x2="16" y2="44" stroke="#DC143C" stroke-width="2"/>
      <text x="44" y="28" font-size="4" fill="currentColor" stroke="none">GFR</text>
      <text x="44" y="36" font-size="4" fill="currentColor" stroke="none">&lt;15</text>
    </svg>`
  },
  {
    id: 'nephro-diabetic-nephropathy',
    name: 'Diabetic Nephropathy',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['diabetic', 'nephropathy', 'DKD', 'Kimmelstiel-Wilson', 'nodular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="24" cy="28" r="6" fill="#FFA500" opacity="0.5"/>
      <circle cx="40" cy="28" r="6" fill="#FFA500" opacity="0.5"/>
      <circle cx="32" cy="40" r="6" fill="#FFA500" opacity="0.5"/>
      <path d="M18 28c4-2 8-2 12 0"/>
      <path d="M34 28c4-2 8-2 12 0"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">K-W nodules</text>
      <text x="44" y="58" font-size="3" fill="currentColor" stroke="none">GBM thick</text>
    </svg>`
  },
  {
    id: 'nephro-hypertensive-nephrosclerosis',
    name: 'Hypertensive Nephrosclerosis',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['hypertensive', 'nephrosclerosis', 'arteriolosclerosis', 'benign', 'malignant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-20 10-20 24s6 24 20 24c6 0 10-6 10-24S38 8 32 8z"/>
      <path d="M16 24c4-2 8 2 8 8s-4 10-8 8"/>
      <path d="M28 20c4-2 8 2 8 12s-4 14-8 12" stroke-width="2"/>
      <circle cx="20" cy="32" r="4" fill="#808080" opacity="0.5"/>
      <circle cx="32" cy="32" r="4" fill="#808080" opacity="0.5"/>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">Arteriolar</text>
      <text x="44" y="36" font-size="3" fill="currentColor" stroke="none">thickening</text>
    </svg>`
  },
  {
    id: 'nephro-pckd',
    name: 'Polycystic Kidney Disease',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['PCKD', 'PKD', 'polycystic', 'ADPKD', 'cysts', 'autosomal dominant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c-18 0-26 14-26 28s8 28 26 28c8 0 14-8 14-28S42 4 32 4z" fill="currentColor" opacity="0.1"/>
      <path d="M32 4c-18 0-26 14-26 28s8 28 26 28c8 0 14-8 14-28S42 4 32 4z"/>
      <circle cx="16" cy="24" r="6" fill="#4169E1" opacity="0.4"/>
      <circle cx="28" cy="18" r="5" fill="#4169E1" opacity="0.4"/>
      <circle cx="22" cy="36" r="7" fill="#4169E1" opacity="0.4"/>
      <circle cx="34" cy="30" r="5" fill="#4169E1" opacity="0.4"/>
      <circle cx="18" cy="48" r="4" fill="#4169E1" opacity="0.4"/>
      <circle cx="32" cy="44" r="6" fill="#4169E1" opacity="0.4"/>
      <text x="44" y="32" font-size="4" fill="currentColor" stroke="none">Cysts</text>
    </svg>`
  },
  {
    id: 'nephro-membranous-gn',
    name: 'Membranous Glomerulonephritis',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['membranous', 'GN', 'nephrotic', 'PLA2R', 'subepithelial deposits'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="14" stroke-width="4" stroke="#FFA500"/>
      <circle cx="26" cy="26" r="2" fill="#FFA500"/>
      <circle cx="38" cy="26" r="2" fill="#FFA500"/>
      <circle cx="26" cy="38" r="2" fill="#FFA500"/>
      <circle cx="38" cy="38" r="2" fill="#FFA500"/>
      <circle cx="32" cy="32" r="2" fill="#FFA500"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Thickened GBM</text>
      <text x="36" y="58" font-size="3" fill="currentColor" stroke="none">Deposits</text>
    </svg>`
  },
  {
    id: 'nephro-iga-nephropathy',
    name: 'IgA Nephropathy',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['IgA', 'nephropathy', 'Berger disease', 'mesangial', 'hematuria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <ellipse cx="32" cy="32" rx="8" ry="10" fill="#9333EA" opacity="0.4"/>
      <path d="M20 26c4-4 8-4 12 0"/>
      <path d="M32 26c4-4 8-4 12 0"/>
      <path d="M20 38c4 4 8 4 12 0"/>
      <path d="M32 38c4 4 8 4 12 0"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Mesangial IgA deposits</text>
    </svg>`
  },
  {
    id: 'nephro-fsgs',
    name: 'Focal Segmental Glomerulosclerosis',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['FSGS', 'focal', 'segmental', 'sclerosis', 'podocyte injury', 'nephrotic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 12c-8 4-12 12-12 20" stroke-dasharray="3 2"/>
      <path d="M20 32c0 8 4 16 12 20"/>
      <path d="M32 52c8-4 12-12 12-20s-4-16-12-20"/>
      <path d="M36 20c4 4 6 10 6 16" fill="#808080" opacity="0.6"/>
      <text x="40" y="32" font-size="4" fill="currentColor" stroke="none">Scar</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Segmental sclerosis</text>
    </svg>`
  },
  {
    id: 'nephro-lupus-nephritis',
    name: 'Lupus Nephritis',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['lupus', 'nephritis', 'SLE', 'immune complex', 'class I-VI'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M16 28c8-8 16-8 24 0s8 16 0 24-16 8-24 0-8-16 0-24z" fill="#DC143C" opacity="0.2"/>
      <circle cx="24" cy="28" r="3" fill="#9333EA"/>
      <circle cx="40" cy="28" r="3" fill="#9333EA"/>
      <circle cx="32" cy="36" r="3" fill="#9333EA"/>
      <circle cx="28" cy="44" r="2" fill="#9333EA"/>
      <circle cx="38" cy="42" r="2" fill="#9333EA"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Full house IF pattern</text>
    </svg>`
  },
  {
    id: 'nephro-amyloidosis',
    name: 'Renal Amyloidosis',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['amyloidosis', 'amyloid', 'Congo red', 'apple-green birefringence', 'AL AA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M20 24c4 4 8 4 12 0s8-4 12 0 4 8 0 12-4 8 0 12-8 4-12 0-8-4-12 0-4-8 0-12 4-8 0-12z" fill="#90EE90" opacity="0.4"/>
      <text x="26" y="36" font-size="5" fill="currentColor" stroke="none">AA</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Congo red +</text>
    </svg>`
  },

  // ===========================================================================
  // ELECTROLYTES & ACID-BASE
  // ===========================================================================
  {
    id: 'nephro-hyponatremia',
    name: 'Hyponatremia',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['hyponatremia', 'sodium', 'low sodium', 'SIADH', 'Na less than 135'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="#4169E1" opacity="0.2"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <text x="16" y="38" font-size="12" fill="currentColor" stroke="none">Na+</text>
      <path d="M44 28l8 8-8 8" stroke="#DC143C" stroke-width="2"/>
      <text x="44" y="56" font-size="5" fill="#DC143C" stroke="none">&lt;135</text>
    </svg>`
  },
  {
    id: 'nephro-hypernatremia',
    name: 'Hypernatremia',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['hypernatremia', 'sodium', 'high sodium', 'dehydration', 'Na greater than 145'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="#4169E1" opacity="0.2"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <text x="16" y="38" font-size="12" fill="currentColor" stroke="none">Na+</text>
      <path d="M52 36l-8-8 8-8" stroke="#DC143C" stroke-width="2"/>
      <text x="44" y="56" font-size="5" fill="#DC143C" stroke="none">&gt;145</text>
    </svg>`
  },
  {
    id: 'nephro-hypokalemia',
    name: 'Hypokalemia',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['hypokalemia', 'potassium', 'low potassium', 'K less than 3.5', 'U waves'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="#FFD700" opacity="0.2"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <text x="18" y="38" font-size="12" fill="currentColor" stroke="none">K+</text>
      <path d="M44 28l8 8-8 8" stroke="#DC143C" stroke-width="2"/>
      <text x="44" y="56" font-size="5" fill="#DC143C" stroke="none">&lt;3.5</text>
    </svg>`
  },
  {
    id: 'nephro-hyperkalemia',
    name: 'Hyperkalemia',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['hyperkalemia', 'potassium', 'high potassium', 'K greater than 5', 'peaked T'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="#FFD700" opacity="0.2"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <text x="18" y="38" font-size="12" fill="currentColor" stroke="none">K+</text>
      <path d="M52 36l-8-8 8-8" stroke="#DC143C" stroke-width="2"/>
      <text x="44" y="56" font-size="5" fill="#DC143C" stroke="none">&gt;5.5</text>
      <path d="M4 52l4-12 4 12" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'nephro-hypocalcemia',
    name: 'Hypocalcemia',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['hypocalcemia', 'calcium', 'low calcium', 'tetany', 'Chvostek Trousseau'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="#22C55E" opacity="0.2"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <text x="14" y="38" font-size="10" fill="currentColor" stroke="none">Ca2+</text>
      <path d="M48 28l6 8-6 8" stroke="#DC143C" stroke-width="2"/>
      <text x="44" y="56" font-size="5" fill="#DC143C" stroke="none">&lt;8.5</text>
    </svg>`
  },
  {
    id: 'nephro-hypercalcemia',
    name: 'Hypercalcemia',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['hypercalcemia', 'calcium', 'high calcium', 'bones stones groans', 'PTH'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="#22C55E" opacity="0.2"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <text x="14" y="38" font-size="10" fill="currentColor" stroke="none">Ca2+</text>
      <path d="M54 36l-6-8 6-8" stroke="#DC143C" stroke-width="2"/>
      <text x="44" y="56" font-size="5" fill="#DC143C" stroke="none">&gt;10.5</text>
    </svg>`
  },
  {
    id: 'nephro-hypophosphatemia',
    name: 'Hypophosphatemia',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['hypophosphatemia', 'phosphorus', 'low phos', 'refeeding', 'weakness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="#9333EA" opacity="0.2"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <text x="18" y="38" font-size="10" fill="currentColor" stroke="none">PO4</text>
      <path d="M48 28l6 8-6 8" stroke="#DC143C" stroke-width="2"/>
      <text x="44" y="56" font-size="5" fill="#DC143C" stroke="none">&lt;2.5</text>
    </svg>`
  },
  {
    id: 'nephro-hyperphosphatemia',
    name: 'Hyperphosphatemia',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['hyperphosphatemia', 'phosphorus', 'high phos', 'CKD', 'calciphylaxis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4" fill="#9333EA" opacity="0.2"/>
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <text x="18" y="38" font-size="10" fill="currentColor" stroke="none">PO4</text>
      <path d="M54 36l-6-8 6-8" stroke="#DC143C" stroke-width="2"/>
      <text x="44" y="56" font-size="5" fill="#DC143C" stroke="none">&gt;4.5</text>
    </svg>`
  },
  {
    id: 'nephro-metabolic-acidosis',
    name: 'Metabolic Acidosis',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['metabolic acidosis', 'low pH', 'low bicarb', 'anion gap', 'NAGMA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="14" y="32" font-size="8" fill="currentColor" stroke="none">pH</text>
      <path d="M36 24l12 12-12 12" stroke="#DC143C" stroke-width="3"/>
      <text x="12" y="48" font-size="6" fill="currentColor" stroke="none">HCO3-</text>
      <path d="M44 44l6 6-6 6" stroke="#DC143C" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'nephro-metabolic-alkalosis',
    name: 'Metabolic Alkalosis',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['metabolic alkalosis', 'high pH', 'high bicarb', 'vomiting', 'diuretics'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="14" y="32" font-size="8" fill="currentColor" stroke="none">pH</text>
      <path d="M48 36l-12-12 12-12" stroke="#4169E1" stroke-width="3"/>
      <text x="12" y="48" font-size="6" fill="currentColor" stroke="none">HCO3-</text>
      <path d="M50 50l-6-6 6-6" stroke="#4169E1" stroke-width="2"/>
    </svg>`
  },

  // ===========================================================================
  // DIALYSIS & TRANSPLANT
  // ===========================================================================
  {
    id: 'nephro-hemodialysis-machine',
    name: 'Hemodialysis Machine',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['hemodialysis', 'HD', 'dialyzer', 'machine', 'extracorporeal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="8" width="24" height="48" rx="2"/>
      <rect x="24" y="12" width="16" height="10" rx="1"/>
      <circle cx="28" cy="32" r="4"/>
      <circle cx="36" cy="32" r="4"/>
      <path d="M24 44h16"/>
      <path d="M24 48h16"/>
      <path d="M8 20h12" stroke="#DC143C" stroke-width="2"/>
      <path d="M44 20h12" stroke="#4169E1" stroke-width="2"/>
      <path d="M8 44h12" stroke="#4169E1" stroke-width="2"/>
      <path d="M44 44h12" stroke="#DC143C" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'nephro-av-fistula',
    name: 'AV Fistula',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['AVF', 'fistula', 'arteriovenous', 'vascular access', 'Brescia-Cimino'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h20" stroke="#DC143C" stroke-width="3"/>
      <path d="M8 40h20" stroke="#4169E1" stroke-width="3"/>
      <circle cx="36" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="36" cy="32" r="8"/>
      <path d="M44 32h12" stroke="#9333EA" stroke-width="4"/>
      <text x="4" y="22" font-size="4" fill="#DC143C" stroke="none">Art</text>
      <text x="4" y="44" font-size="4" fill="#4169E1" stroke="none">Vein</text>
      <text x="30" y="52" font-size="4" fill="currentColor" stroke="none">Fistula</text>
    </svg>`
  },
  {
    id: 'nephro-av-graft',
    name: 'AV Graft',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['AVG', 'graft', 'PTFE', 'synthetic', 'vascular access'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20h16" stroke="#DC143C" stroke-width="3"/>
      <path d="M8 44h16" stroke="#4169E1" stroke-width="3"/>
      <path d="M24 20c16 0 16 24 0 24" stroke="#808080" stroke-width="4"/>
      <path d="M40 20h16" stroke="#9333EA" stroke-width="3"/>
      <path d="M40 44h16" stroke="#9333EA" stroke-width="3"/>
      <text x="28" y="36" font-size="4" fill="currentColor" stroke="none">Graft</text>
    </svg>`
  },
  {
    id: 'nephro-dialysis-catheter',
    name: 'Dialysis Catheter',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['catheter', 'tunneled', 'permcath', 'vascular access', 'temporary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8v24" stroke="#DC143C" stroke-width="3"/>
      <path d="M24 8v28" stroke="#4169E1" stroke-width="3"/>
      <path d="M16 32c0 8 4 12 12 12h20"/>
      <path d="M24 36c0 6 2 8 8 8h16"/>
      <circle cx="16" cy="8" r="3" fill="#DC143C"/>
      <circle cx="24" cy="8" r="3" fill="#4169E1"/>
      <rect x="44" y="38" width="12" height="12" rx="2"/>
      <text x="46" y="48" font-size="4" fill="currentColor" stroke="none">Cuff</text>
    </svg>`
  },
  {
    id: 'nephro-peritoneal-dialysis',
    name: 'Peritoneal Dialysis',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['PD', 'peritoneal', 'CAPD', 'APD', 'Tenckhoff'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="20" ry="16" fill="#4169E1" opacity="0.2"/>
      <ellipse cx="32" cy="36" rx="20" ry="16"/>
      <path d="M32 8v12" stroke-width="2"/>
      <circle cx="32" cy="8" r="4"/>
      <path d="M20 32c4 4 8 4 12 0s8-4 12 0" stroke-dasharray="2 2"/>
      <path d="M20 40c4 4 8 4 12 0s8-4 12 0" stroke-dasharray="2 2"/>
      <text x="24" y="38" font-size="4" fill="currentColor" stroke="none">Dialysate</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Peritoneal cavity</text>
    </svg>`
  },
  {
    id: 'nephro-dialyzer',
    name: 'Dialyzer/Artificial Kidney',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['dialyzer', 'artificial kidney', 'hollow fiber', 'membrane', 'clearance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="16" y="8" width="32" height="48" rx="4"/>
      <path d="M24 8v48M32 8v48M40 8v48" stroke-dasharray="3 2"/>
      <path d="M8 16h8" stroke="#DC143C" stroke-width="2"/>
      <path d="M48 16h8" stroke="#4169E1" stroke-width="2"/>
      <path d="M8 48h8" stroke="#4169E1" stroke-width="2"/>
      <path d="M48 48h8" stroke="#DC143C" stroke-width="2"/>
      <text x="22" y="32" font-size="4" fill="currentColor" stroke="none">Hollow</text>
      <text x="24" y="38" font-size="4" fill="currentColor" stroke="none">fibers</text>
    </svg>`
  },
  {
    id: 'nephro-transplanted-kidney',
    name: 'Transplanted Kidney',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['transplant', 'kidney', 'allograft', 'iliac fossa', 'renal transplant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="24" ry="16" fill="currentColor" opacity="0.1"/>
      <path d="M32 16c-10 0-14 8-14 18s4 18 14 18c4 0 6-4 6-18s-2-18-6-18z" fill="#22C55E" opacity="0.3"/>
      <path d="M32 16c-10 0-14 8-14 18s4 18 14 18c4 0 6-4 6-18s-2-18-6-18z"/>
      <path d="M38 34h18" stroke="#DC143C" stroke-width="2"/>
      <path d="M38 40h14" stroke="#4169E1" stroke-width="2"/>
      <path d="M38 46h10"/>
      <text x="44" y="32" font-size="3" fill="currentColor" stroke="none">Renal a.</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">Renal v.</text>
      <text x="44" y="50" font-size="3" fill="currentColor" stroke="none">Ureter</text>
    </svg>`
  },
  {
    id: 'nephro-rejection',
    name: 'Transplant Rejection',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['rejection', 'acute', 'chronic', 'TCMR', 'ABMR', 'immunosuppression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 0-16 8-16 20s4 20 16 20c4 0 6-4 6-20s-2-20-6-20z" fill="#DC143C" opacity="0.2"/>
      <path d="M32 8c-12 0-16 8-16 20s4 20 16 20c4 0 6-4 6-20s-2-20-6-20z"/>
      <circle cx="24" cy="24" r="4" fill="#DC143C" opacity="0.5"/>
      <circle cx="28" cy="34" r="4" fill="#DC143C" opacity="0.5"/>
      <circle cx="22" cy="40" r="4" fill="#DC143C" opacity="0.5"/>
      <path d="M44 20l8 8-8 8" stroke="#DC143C" stroke-width="2"/>
      <text x="42" y="44" font-size="4" fill="currentColor" stroke="none">T cells</text>
      <text x="42" y="52" font-size="4" fill="currentColor" stroke="none">attack</text>
    </svg>`
  },
  {
    id: 'nephro-crrt',
    name: 'CRRT',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['CRRT', 'CVVH', 'CVVHD', 'continuous', 'ICU dialysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="56" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="4" width="16" height="56" rx="2"/>
      <circle cx="32" cy="16" r="6"/>
      <circle cx="32" cy="32" r="6"/>
      <circle cx="32" cy="48" r="6"/>
      <path d="M8 16h16" stroke="#DC143C" stroke-width="2"/>
      <path d="M40 16h16" stroke="#4169E1" stroke-width="2"/>
      <path d="M8 48h16" stroke="#22C55E" stroke-width="2"/>
      <text x="4" y="14" font-size="3" fill="currentColor" stroke="none">Blood</text>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">Replace</text>
      <text x="26" y="64" font-size="3" fill="currentColor" stroke="none">24h</text>
    </svg>`
  },
  {
    id: 'nephro-plasma-exchange',
    name: 'Plasmapheresis',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['plasmapheresis', 'plasma exchange', 'TPE', 'PLEX', 'apheresis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h12" stroke="#DC143C" stroke-width="3"/>
      <circle cx="32" cy="32" r="12" fill="#FFD700" opacity="0.3"/>
      <circle cx="32" cy="32" r="12"/>
      <path d="M32 20v24M20 32h24" stroke-dasharray="3 2"/>
      <path d="M44 24h12" stroke="#4169E1" stroke-width="3"/>
      <path d="M44 40h12" stroke="#FFD700" stroke-width="2"/>
      <text x="20" y="36" font-size="4" fill="currentColor" stroke="none">Plasma</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Blood in</text>
      <text x="44" y="22" font-size="3" fill="currentColor" stroke="none">Cells</text>
    </svg>`
  },
  {
    id: 'nephro-immunosuppression',
    name: 'Immunosuppression',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['immunosuppression', 'tacrolimus', 'MMF', 'prednisone', 'transplant meds'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="10" fill="#4169E1" opacity="0.3"/>
      <circle cx="44" cy="20" r="10" fill="#22C55E" opacity="0.3"/>
      <circle cx="32" cy="44" r="10" fill="#FFA500" opacity="0.3"/>
      <circle cx="20" cy="20" r="10"/>
      <circle cx="44" cy="20" r="10"/>
      <circle cx="32" cy="44" r="10"/>
      <text x="14" y="22" font-size="4" fill="currentColor" stroke="none">CNI</text>
      <text x="36" y="22" font-size="4" fill="currentColor" stroke="none">MMF</text>
      <text x="24" y="46" font-size="4" fill="currentColor" stroke="none">Pred</text>
      <line x1="28" y1="16" x2="36" y2="16" stroke-dasharray="2 2"/>
      <line x1="24" y1="28" x2="28" y2="36" stroke-dasharray="2 2"/>
      <line x1="40" y1="28" x2="36" y2="36" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'nephro-donor-kidney',
    name: 'Donor Kidney',
    domain: 'medicine',
    category: 'dialysis-transplant',
    tags: ['donor', 'living donor', 'deceased donor', 'organ donation', 'nephrectomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-12 0-16 10-16 24s4 24 16 24c4 0 6-6 6-24s-2-24-6-24z" fill="#22C55E" opacity="0.3"/>
      <path d="M32 8c-12 0-16 10-16 24s4 24 16 24c4 0 6-6 6-24s-2-24-6-24z"/>
      <path d="M38 32h18"/>
      <circle cx="48" cy="32" r="4" fill="currentColor"/>
      <path d="M44 24l8-8M52 24l-8-8" stroke="#22C55E" stroke-width="2"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Gift of life</text>
    </svg>`
  },

  // ===========================================================================
  // EQUIPMENT & PROCEDURES
  // ===========================================================================
  {
    id: 'nephro-urinalysis',
    name: 'Urinalysis',
    domain: 'medicine',
    category: 'equipment',
    tags: ['urinalysis', 'UA', 'dipstick', 'urine test', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="56" rx="2" fill="#FFD700" opacity="0.3"/>
      <rect x="24" y="4" width="16" height="56" rx="2"/>
      <rect x="26" y="8" width="12" height="4" fill="#DC143C"/>
      <rect x="26" y="16" width="12" height="4" fill="#FFA500"/>
      <rect x="26" y="24" width="12" height="4" fill="#22C55E"/>
      <rect x="26" y="32" width="12" height="4" fill="#4169E1"/>
      <rect x="26" y="40" width="12" height="4" fill="#9333EA"/>
      <rect x="26" y="48" width="12" height="4" fill="#808080"/>
      <text x="4" y="12" font-size="3" fill="currentColor" stroke="none">Blood</text>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">LE</text>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">Nitrite</text>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">Protein</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Glucose</text>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">pH</text>
    </svg>`
  },
  {
    id: 'nephro-urine-microscopy',
    name: 'Urine Microscopy',
    domain: 'medicine',
    category: 'equipment',
    tags: ['microscopy', 'sediment', 'casts', 'crystals', 'cells'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="24"/>
      <ellipse cx="24" cy="24" rx="6" ry="3" fill="#DC143C" opacity="0.5" transform="rotate(-30 24 24)"/>
      <ellipse cx="40" cy="28" rx="6" ry="3" fill="#DC143C" opacity="0.5" transform="rotate(30 40 28)"/>
      <rect x="28" y="36" width="12" height="4" rx="1" fill="#8B4513" opacity="0.6"/>
      <polygon points="20,44 24,40 28,44" fill="#FFD700" opacity="0.6"/>
      <circle cx="40" cy="44" r="3" fill="#4169E1" opacity="0.5"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">RBC, WBC, casts, crystals</text>
    </svg>`
  },
  {
    id: 'nephro-renal-biopsy',
    name: 'Renal Biopsy',
    domain: 'medicine',
    category: 'equipment',
    tags: ['biopsy', 'renal', 'kidney biopsy', 'needle', 'tissue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M36 20c-10 0-14 8-14 18s4 18 14 18c4 0 6-4 6-18s-2-18-6-18z" fill="currentColor" opacity="0.2"/>
      <path d="M36 20c-10 0-14 8-14 18s4 18 14 18c4 0 6-4 6-18s-2-18-6-18z"/>
      <path d="M8 12l18 18" stroke-width="3"/>
      <path d="M8 12l4-4 4 4-4 4z" fill="currentColor"/>
      <circle cx="30" cy="34" r="4" fill="#DC143C" opacity="0.5"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">US-guided</text>
    </svg>`
  },
  {
    id: 'nephro-ultrasound-kidney',
    name: 'Renal Ultrasound',
    domain: 'medicine',
    category: 'equipment',
    tags: ['ultrasound', 'US', 'renal imaging', 'hydronephrosis', 'echogenicity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="40" rx="4"/>
      <path d="M28 16c-8 0-12 6-12 14s4 14 12 14c4 0 6-4 6-14s-2-14-6-14z" fill="#808080" opacity="0.4"/>
      <ellipse cx="28" cy="30" rx="4" ry="6" fill="white" opacity="0.5"/>
      <path d="M36 20c4-4 8-4 12 0" stroke-width="2"/>
      <path d="M38 26c4-4 8-4 10 0" stroke-width="2"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">Renal US</text>
    </svg>`
  },
  {
    id: 'nephro-gfr-calculation',
    name: 'GFR Calculation',
    domain: 'medicine',
    category: 'equipment',
    tags: ['GFR', 'eGFR', 'CKD-EPI', 'MDRD', 'creatinine clearance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="12" y="24" font-size="6" fill="currentColor" stroke="none">eGFR=</text>
      <path d="M12 32h40"/>
      <text x="14" y="30" font-size="4" fill="currentColor" stroke="none">141 x min(Scr/k,1)^a</text>
      <text x="14" y="44" font-size="4" fill="currentColor" stroke="none">x max(Scr/k,1)^-1.209</text>
      <text x="14" y="52" font-size="4" fill="currentColor" stroke="none">x 0.993^Age</text>
    </svg>`
  },
  {
    id: 'nephro-fistulagram',
    name: 'Fistulagram',
    domain: 'medicine',
    category: 'equipment',
    tags: ['fistulagram', 'angiography', 'access', 'stenosis', 'intervention'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="#000" opacity="0.8"/>
      <path d="M12 28c8 0 12 8 20 8s12-8 20-8" stroke="white" stroke-width="3"/>
      <path d="M28 28c0 4 4 8 8 8" stroke="white" stroke-width="2" stroke-dasharray="2 2"/>
      <circle cx="36" cy="32" r="4" stroke="white" fill="none"/>
      <text x="16" y="50" font-size="4" fill="white" stroke="none">Stenosis</text>
    </svg>`
  },
  {
    id: 'nephro-cystoscopy',
    name: 'Cystoscopy',
    domain: 'medicine',
    category: 'equipment',
    tags: ['cystoscopy', 'bladder', 'endoscopy', 'urology', 'visualization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="20" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="40" rx="20" ry="16"/>
      <path d="M32 8v16" stroke-width="3"/>
      <circle cx="32" cy="8" r="4"/>
      <circle cx="32" cy="36" r="6" stroke-dasharray="2 2"/>
      <circle cx="24" cy="44" r="3"/>
      <circle cx="40" cy="44" r="3"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Bladder view</text>
    </svg>`
  },
  {
    id: 'nephro-ureteral-stent',
    name: 'Ureteral Stent',
    domain: 'medicine',
    category: 'equipment',
    tags: ['stent', 'ureteral', 'JJ stent', 'double J', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="12" rx="12" ry="6"/>
      <ellipse cx="40" cy="52" rx="16" ry="8"/>
      <path d="M24 18c0 8 8 16 16 26" stroke-width="3"/>
      <circle cx="24" cy="18" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="40" cy="44" r="4" fill="currentColor" opacity="0.3"/>
      <text x="4" y="16" font-size="4" fill="currentColor" stroke="none">Kidney</text>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Bladder</text>
    </svg>`
  },
  {
    id: 'nephro-nephrostomy',
    name: 'Percutaneous Nephrostomy',
    domain: 'medicine',
    category: 'equipment',
    tags: ['nephrostomy', 'PCN', 'percutaneous', 'drainage', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M36 12c-10 0-14 8-14 20s4 20 14 20c4 0 6-4 6-20s-2-20-6-20z" fill="currentColor" opacity="0.2"/>
      <path d="M36 12c-10 0-14 8-14 20s4 20 14 20c4 0 6-4 6-20s-2-20-6-20z"/>
      <ellipse cx="36" cy="32" rx="6" ry="10" fill="#4169E1" opacity="0.3"/>
      <path d="M42 32h14" stroke-width="3"/>
      <path d="M56 32l4-4v8z" fill="currentColor"/>
      <circle cx="58" cy="44" r="6"/>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Drainage</text>
    </svg>`
  },
  {
    id: 'nephro-24h-urine',
    name: '24-Hour Urine Collection',
    domain: 'medicine',
    category: 'equipment',
    tags: ['24 hour urine', 'collection', 'creatinine clearance', 'proteinuria', 'stone workup'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="40" rx="4" fill="#FFD700" opacity="0.3"/>
      <rect x="16" y="20" width="32" height="40" rx="4"/>
      <path d="M20 32h24"/>
      <path d="M20 44h24"/>
      <path d="M32 8v12"/>
      <circle cx="32" cy="8" r="4"/>
      <text x="26" y="40" font-size="6" fill="currentColor" stroke="none">24h</text>
      <text x="4" y="58" font-size="4" fill="currentColor" stroke="none">Collection</text>
    </svg>`
  },
  {
    id: 'nephro-renogram',
    name: 'Renal Scan/MAG3',
    domain: 'medicine',
    category: 'equipment',
    tags: ['MAG3', 'renogram', 'nuclear', 'renal scan', 'obstruction', 'function'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="#000" opacity="0.8"/>
      <path d="M20 24c-4 0-6 4-6 10s2 10 6 10c2 0 4-2 4-10s-2-10-4-10z" fill="#22C55E" opacity="0.6"/>
      <path d="M44 24c-4 0-6 4-6 10s2 10 6 10c2 0 4-2 4-10s-2-10-4-10z" fill="#22C55E" opacity="0.6"/>
      <path d="M8 56h48" stroke="white"/>
      <path d="M16 48l8-16 8 8 8-20 8 28" stroke="#22C55E" stroke-width="2"/>
      <text x="14" y="22" font-size="4" fill="white" stroke="none">L</text>
      <text x="46" y="22" font-size="4" fill="white" stroke="none">R</text>
    </svg>`
  },

  // ===========================================================================
  // KIDNEY STONES
  // ===========================================================================
  {
    id: 'nephro-calcium-oxalate-stone',
    name: 'Calcium Oxalate Stone',
    domain: 'medicine',
    category: 'kidney-stones',
    tags: ['stone', 'calcium oxalate', 'nephrolithiasis', 'envelope crystals', 'most common'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 48,24 48,44 32,56 16,44 16,24" fill="#8B4513" opacity="0.5"/>
      <polygon points="32,8 48,24 48,44 32,56 16,44 16,24"/>
      <path d="M20 28l12 8 12-8"/>
      <path d="M20 36l12 8 12-8"/>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">CaOx - 80%</text>
    </svg>`
  },
  {
    id: 'nephro-uric-acid-stone',
    name: 'Uric Acid Stone',
    domain: 'medicine',
    category: 'kidney-stones',
    tags: ['stone', 'uric acid', 'radiolucent', 'gout', 'acidic urine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="#FFA500" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="16" ry="20"/>
      <path d="M24 24c4 4 8 4 12 0"/>
      <path d="M24 32c4 4 8 4 12 0"/>
      <path d="M24 40c4 4 8 4 12 0"/>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">Uric acid - radiolucent</text>
    </svg>`
  },
  {
    id: 'nephro-struvite-stone',
    name: 'Struvite Stone',
    domain: 'medicine',
    category: 'kidney-stones',
    tags: ['stone', 'struvite', 'staghorn', 'infection', 'MAP', 'coffin lid crystals'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-10 0-14 8-14 20s4 20 14 20c4 0 6-4 6-20s-2-20-6-20z" fill="currentColor" opacity="0.1"/>
      <path d="M32 8c-10 0-14 8-14 20s4 20 14 20c4 0 6-4 6-20s-2-20-6-20z"/>
      <path d="M20 16l-8 4 8 4-8 4 8 4-8 4 8 4" fill="#808080" stroke="#808080"/>
      <path d="M28 12l-6 8 6 8-6 8 6 8" fill="#808080" opacity="0.6"/>
      <text x="40" y="32" font-size="4" fill="currentColor" stroke="none">Staghorn</text>
    </svg>`
  },
  {
    id: 'nephro-cystine-stone',
    name: 'Cystine Stone',
    domain: 'medicine',
    category: 'kidney-stones',
    tags: ['stone', 'cystine', 'cystinuria', 'hexagonal crystals', 'genetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,4 52,16 52,40 32,52 12,40 12,16" fill="#FFD700" opacity="0.4"/>
      <polygon points="32,4 52,16 52,40 32,52 12,40 12,16"/>
      <polygon points="32,12 44,20 44,36 32,44 20,36 20,20" fill="#FFD700" opacity="0.3"/>
      <text x="4" y="60" font-size="4" fill="currentColor" stroke="none">Hexagonal crystal</text>
    </svg>`
  },
  {
    id: 'nephro-kidney-stone-lithotripsy',
    name: 'Lithotripsy/ESWL',
    domain: 'medicine',
    category: 'kidney-stones',
    tags: ['ESWL', 'lithotripsy', 'shock wave', 'stone fragmentation', 'non-invasive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M36 20c-8 0-12 6-12 16s4 16 12 16c4 0 6-4 6-16s-2-16-6-16z" fill="currentColor" opacity="0.2"/>
      <path d="M36 20c-8 0-12 6-12 16s4 16 12 16c4 0 6-4 6-16s-2-16-6-16z"/>
      <polygon points="30,34 26,38 34,38" fill="#8B4513"/>
      <path d="M8 36l16-4" stroke="#4169E1" stroke-width="2" stroke-dasharray="4 2"/>
      <path d="M8 32l16 4" stroke="#4169E1" stroke-width="2" stroke-dasharray="4 2"/>
      <path d="M8 40l16-4" stroke="#4169E1" stroke-width="2" stroke-dasharray="4 2"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Shock waves</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL CLINICAL ICONS
  // ===========================================================================
  {
    id: 'nephro-glomerular-hyperfiltration',
    name: 'Glomerular Hyperfiltration',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['hyperfiltration', 'diabetic', 'early CKD', 'elevated GFR', 'hypertrophy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#DC143C" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M16 24l8-8M48 24l-8-8" stroke="#DC143C" stroke-width="2"/>
      <path d="M28 20l8 12 8-12"/>
      <path d="M28 28l8 12 8-12"/>
      <path d="M28 36l8 12 8-12"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Increased flow</text>
    </svg>`
  },
  {
    id: 'nephro-renal-artery-stenosis',
    name: 'Renal Artery Stenosis',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['RAS', 'stenosis', 'renovascular HTN', 'fibromuscular', 'atherosclerotic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h20" stroke="#DC143C" stroke-width="4"/>
      <path d="M28 28v8" stroke="#FFA500" stroke-width="4"/>
      <path d="M32 32h12" stroke="#DC143C" stroke-width="2"/>
      <path d="M48 20c-8 0-12 6-12 12s4 12 12 12c4 0 6-4 6-12s-2-12-6-12z" fill="currentColor" opacity="0.2"/>
      <path d="M48 20c-8 0-12 6-12 12s4 12 12 12c4 0 6-4 6-12s-2-12-6-12z"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Stenosis</text>
    </svg>`
  },
  {
    id: 'nephro-anca-vasculitis',
    name: 'ANCA Vasculitis',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['ANCA', 'vasculitis', 'GPA', 'MPA', 'crescentic GN', 'RPGN'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M20 24c4-4 8-4 12 0"/>
      <path d="M32 24c4-4 8-4 12 0"/>
      <circle cx="24" cy="32" r="6" fill="#DC143C" opacity="0.5"/>
      <circle cx="40" cy="32" r="6" fill="#DC143C" opacity="0.5"/>
      <path d="M20 44c4 4 8 4 12 0" stroke="#DC143C" stroke-width="2"/>
      <path d="M32 44c4 4 8 4 12 0" stroke="#DC143C" stroke-width="2"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Crescents + necrotizing</text>
    </svg>`
  },
  {
    id: 'nephro-anti-gbm-disease',
    name: 'Anti-GBM Disease',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['anti-GBM', 'Goodpasture', 'pulmonary-renal', 'linear IF', 'crescentic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="14" stroke="#22C55E" stroke-width="4" stroke-dasharray="0"/>
      <text x="22" y="36" font-size="8" fill="currentColor" stroke="none">IgG</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Linear IF pattern</text>
    </svg>`
  },
  {
    id: 'nephro-minimal-change',
    name: 'Minimal Change Disease',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['MCD', 'minimal change', 'podocyte', 'foot process effacement', 'nephrotic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="14" stroke-dasharray="3 2"/>
      <path d="M20 40v8M24 40v8M28 40v8M32 40v8M36 40v8M40 40v8M44 40v8" stroke-width="3"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Effaced foot processes</text>
    </svg>`
  },
  {
    id: 'nephro-rta-type1',
    name: 'Renal Tubular Acidosis Type 1',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['RTA', 'distal', 'type 1', 'hypokalemia', 'urine pH >5.5'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <text x="16" y="28" font-size="6" fill="currentColor" stroke="none">RTA</text>
      <text x="16" y="40" font-size="8" fill="#DC143C" stroke="none">Type 1</text>
      <text x="16" y="52" font-size="4" fill="currentColor" stroke="none">pH >5.5</text>
      <circle cx="48" cy="16" r="6" fill="#FFD700" opacity="0.4"/>
      <text x="44" y="18" font-size="4" fill="currentColor" stroke="none">K+</text>
      <path d="M46 22l4 4-4 4" stroke="#DC143C"/>
    </svg>`
  },
  {
    id: 'nephro-rta-type4',
    name: 'Renal Tubular Acidosis Type 4',
    domain: 'medicine',
    category: 'electrolytes',
    tags: ['RTA', 'hyperkalemic', 'type 4', 'aldosterone', 'diabetes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <text x="16" y="28" font-size="6" fill="currentColor" stroke="none">RTA</text>
      <text x="16" y="40" font-size="8" fill="#DC143C" stroke="none">Type 4</text>
      <text x="16" y="52" font-size="4" fill="currentColor" stroke="none">Low aldo</text>
      <circle cx="48" cy="16" r="6" fill="#FFD700" opacity="0.4"/>
      <text x="44" y="18" font-size="4" fill="currentColor" stroke="none">K+</text>
      <path d="M52 22l-4-8 4-4" stroke="#DC143C"/>
    </svg>`
  },
  {
    id: 'nephro-fanconi-syndrome',
    name: 'Fanconi Syndrome',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['Fanconi', 'proximal tubule', 'glycosuria', 'aminoaciduria', 'phosphaturia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24c8 4 16-4 24 0s16-4 24 0" stroke-width="3"/>
      <path d="M8 40c8 4 16-4 24 0s16-4 24 0" stroke-width="3"/>
      <circle cx="16" cy="32" r="4" fill="#9333EA" opacity="0.5"/>
      <circle cx="28" cy="32" r="4" fill="#FFD700" opacity="0.5"/>
      <circle cx="40" cy="32" r="4" fill="#4169E1" opacity="0.5"/>
      <circle cx="52" cy="32" r="4" fill="#22C55E" opacity="0.5"/>
      <path d="M16 36v8M28 36v8M40 36v8M52 36v8" stroke-dasharray="2 2"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">PCT dysfunction - multi-loss</text>
    </svg>`
  },
  {
    id: 'nephro-creatinine-marker',
    name: 'Creatinine',
    domain: 'medicine',
    category: 'lab-markers',
    tags: ['creatinine', 'Cr', 'kidney function', 'GFR marker', 'lab'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="20" y="32" font-size="12" fill="currentColor" stroke="none">Cr</text>
      <text x="12" y="48" font-size="5" fill="currentColor" stroke="none">0.7-1.3</text>
      <text x="36" y="48" font-size="4" fill="currentColor" stroke="none">mg/dL</text>
    </svg>`
  },
  {
    id: 'nephro-bun-marker',
    name: 'Blood Urea Nitrogen',
    domain: 'medicine',
    category: 'lab-markers',
    tags: ['BUN', 'urea', 'nitrogen', 'kidney function', 'lab'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="12" y="32" font-size="10" fill="currentColor" stroke="none">BUN</text>
      <text x="12" y="48" font-size="5" fill="currentColor" stroke="none">7-20</text>
      <text x="36" y="48" font-size="4" fill="currentColor" stroke="none">mg/dL</text>
    </svg>`
  },
  {
    id: 'nephro-cystatin-c',
    name: 'Cystatin C',
    domain: 'medicine',
    category: 'lab-markers',
    tags: ['cystatin C', 'GFR', 'muscle independent', 'kidney function', 'alternative'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="#4169E1" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="12" y="28" font-size="8" fill="currentColor" stroke="none">Cys-C</text>
      <text x="12" y="44" font-size="4" fill="currentColor" stroke="none">Muscle-</text>
      <text x="12" y="52" font-size="4" fill="currentColor" stroke="none">independent</text>
    </svg>`
  },
  {
    id: 'nephro-uacr',
    name: 'Urine Albumin-Creatinine Ratio',
    domain: 'medicine',
    category: 'lab-markers',
    tags: ['UACR', 'ACR', 'albuminuria', 'microalbuminuria', 'diabetic nephropathy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="#FFD700" opacity="0.1"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="12" y="28" font-size="8" fill="currentColor" stroke="none">UACR</text>
      <rect x="12" y="34" width="8" height="16" fill="#22C55E" opacity="0.6"/>
      <rect x="24" y="38" width="8" height="12" fill="#FFA500" opacity="0.6"/>
      <rect x="36" y="42" width="8" height="8" fill="#DC143C" opacity="0.6"/>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">A1  A2  A3</text>
    </svg>`
  },
  {
    id: 'nephro-kdigo-heatmap',
    name: 'KDIGO CKD Heatmap',
    domain: 'medicine',
    category: 'clinical',
    tags: ['KDIGO', 'CKD', 'risk', 'heatmap', 'staging', 'prognosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="12" width="12" height="8" fill="#22C55E"/>
      <rect x="24" y="12" width="12" height="8" fill="#84CC16"/>
      <rect x="36" y="12" width="12" height="8" fill="#FACC15"/>
      <rect x="12" y="20" width="12" height="8" fill="#84CC16"/>
      <rect x="24" y="20" width="12" height="8" fill="#FACC15"/>
      <rect x="36" y="20" width="12" height="8" fill="#F97316"/>
      <rect x="12" y="28" width="12" height="8" fill="#FACC15"/>
      <rect x="24" y="28" width="12" height="8" fill="#F97316"/>
      <rect x="36" y="28" width="12" height="8" fill="#DC2626"/>
      <rect x="12" y="36" width="12" height="8" fill="#F97316"/>
      <rect x="24" y="36" width="12" height="8" fill="#DC2626"/>
      <rect x="36" y="36" width="12" height="8" fill="#DC2626"/>
      <rect x="12" y="44" width="12" height="8" fill="#DC2626"/>
      <rect x="24" y="44" width="12" height="8" fill="#DC2626"/>
      <rect x="36" y="44" width="12" height="8" fill="#DC2626"/>
      <text x="4" y="18" font-size="3" fill="currentColor" stroke="none">G1</text>
      <text x="4" y="26" font-size="3" fill="currentColor" stroke="none">G2</text>
      <text x="4" y="34" font-size="3" fill="currentColor" stroke="none">G3</text>
      <text x="4" y="42" font-size="3" fill="currentColor" stroke="none">G4</text>
      <text x="4" y="50" font-size="3" fill="currentColor" stroke="none">G5</text>
    </svg>`
  },
  {
    id: 'nephro-sglt2-inhibitor',
    name: 'SGLT2 Inhibitor',
    domain: 'medicine',
    category: 'treatment',
    tags: ['SGLT2i', 'dapagliflozin', 'empagliflozin', 'DKD', 'renoprotective'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c8 4 16-4 24 0s16-4 24 0" stroke-width="2"/>
      <circle cx="24" cy="28" r="6" fill="#FFD700" opacity="0.3"/>
      <text x="21" y="30" font-size="4" fill="currentColor" stroke="none">Glu</text>
      <path d="M24 34l-8 16" stroke="#FFD700" stroke-width="2"/>
      <line x1="16" y1="36" x2="24" y2="40" stroke="#DC143C" stroke-width="3"/>
      <circle cx="16" cy="50" r="4" fill="#FFD700" opacity="0.5"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Block PCT glucose reabsorption</text>
    </svg>`
  },
  {
    id: 'nephro-raas-blockade',
    name: 'RAAS Blockade',
    domain: 'medicine',
    category: 'treatment',
    tags: ['ACEi', 'ARB', 'RAAS', 'proteinuria', 'renoprotective'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 20l12 8-12 8z" fill="#4169E1" opacity="0.3"/>
      <text x="4" y="36" font-size="4" fill="currentColor" stroke="none">Ang I</text>
      <path d="M20 28h8"/>
      <rect x="28" y="24" width="12" height="8" fill="#DC143C" opacity="0.3"/>
      <text x="30" y="30" font-size="4" fill="currentColor" stroke="none">ACE</text>
      <line x1="28" y1="20" x2="40" y2="36" stroke="#DC143C" stroke-width="3"/>
      <path d="M40 28h8"/>
      <path d="M48 20l12 8-12 8z" fill="#FFA500" opacity="0.3"/>
      <text x="44" y="36" font-size="4" fill="currentColor" stroke="none">Ang II</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">ACEi/ARB blockade</text>
    </svg>`
  },
  {
    id: 'nephro-epo-deficiency',
    name: 'EPO Deficiency',
    domain: 'medicine',
    category: 'pathology-ckd',
    tags: ['EPO', 'erythropoietin', 'anemia', 'CKD anemia', 'normocytic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12c-8 0-12 8-12 20s4 20 12 20c4 0 6-4 6-20s-2-20-6-20z" fill="currentColor" opacity="0.2"/>
      <path d="M20 12c-8 0-12 8-12 20s4 20 12 20c4 0 6-4 6-20s-2-20-6-20z"/>
      <path d="M26 32h12"/>
      <path d="M34 28l4 4-4 4" stroke-dasharray="2 2"/>
      <circle cx="48" cy="24" r="6" fill="#DC143C" opacity="0.3"/>
      <circle cx="48" cy="36" r="6" fill="#DC143C" opacity="0.3"/>
      <circle cx="48" cy="48" r="6" fill="#DC143C" opacity="0.3"/>
      <path d="M42 24l12 0M42 36l12 0M42 48l12 0" stroke="#DC143C" stroke-dasharray="3 2"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Low EPO -> anemia</text>
    </svg>`
  },
  // ===========================================================================
  // ADDITIONAL ICONS - ITERATION 2
  // ===========================================================================
  {
    id: 'nephro-urine-anion-gap',
    name: 'Urine Anion Gap',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['urine anion gap', 'RTA', 'acid-base', 'metabolic acidosis', 'UAG'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <text x="12" y="20" font-size="5" fill="#4169E1" stroke="none">Na+</text>
      <text x="36" y="20" font-size="5" fill="#FFD700" stroke="none">K+</text>
      <line x1="32" y1="24" x2="32" y2="40" stroke-width="2"/>
      <text x="12" y="50" font-size="5" fill="#20B2AA" stroke="none">Cl-</text>
      <text x="14" y="36" font-size="4" fill="currentColor" stroke="none">UAG = (Na + K) - Cl</text>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Neg: GI loss | Pos: RTA</text>
    </svg>`
  },
  {
    id: 'nephro-fena-calculation',
    name: 'FeNa Calculation',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['FeNa', 'fractional excretion', 'sodium', 'AKI', 'prerenal', 'intrinsic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="currentColor" opacity="0.1"/>
      <text x="8" y="18" font-size="4" fill="currentColor" stroke="none">FeNa = (UNa x PCr) / (PNa x UCr)</text>
      <line x1="8" y1="24" x2="56" y2="24"/>
      <rect x="8" y="28" width="20" height="12" fill="#228B22" opacity="0.3" rx="2"/>
      <text x="10" y="36" font-size="4" fill="currentColor" stroke="none">&lt;1%</text>
      <text x="10" y="48" font-size="3" fill="currentColor" stroke="none">Prerenal</text>
      <rect x="36" y="28" width="20" height="12" fill="#DC143C" opacity="0.3" rx="2"/>
      <text x="38" y="36" font-size="4" fill="currentColor" stroke="none">&gt;2%</text>
      <text x="38" y="48" font-size="3" fill="currentColor" stroke="none">Intrinsic</text>
    </svg>`
  },
  {
    id: 'nephro-winters-formula',
    name: 'Winters Formula',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['Winters formula', 'compensation', 'metabolic acidosis', 'respiratory', 'acid-base'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="currentColor" opacity="0.1"/>
      <text x="8" y="18" font-size="4" fill="currentColor" stroke="none">Metabolic Acidosis</text>
      <text x="8" y="32" font-size="3" fill="currentColor" stroke="none">Expected pCO2 =</text>
      <text x="8" y="42" font-size="4" fill="#4169E1" stroke="none">(1.5 x HCO3) + 8 +/- 2</text>
      <line x1="8" y1="48" x2="56" y2="48"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">If pCO2 different: mixed disorder</text>
    </svg>`
  },
  {
    id: 'nephro-egfr-mdrd',
    name: 'eGFR MDRD/CKD-EPI',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['eGFR', 'MDRD', 'CKD-EPI', 'creatinine', 'GFR estimation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="currentColor" opacity="0.1"/>
      <text x="8" y="16" font-size="5" fill="currentColor" stroke="none">eGFR</text>
      <text x="8" y="26" font-size="3" fill="currentColor" stroke="none">CKD-EPI 2021</text>
      <line x1="8" y1="30" x2="56" y2="30"/>
      <path d="M12 40h8v12h-8z" fill="#28A745" opacity="0.5"/>
      <path d="M22 38h8v14h-8z" fill="#9ACD32" opacity="0.5"/>
      <path d="M32 42h8v10h-8z" fill="#FFD700" opacity="0.5"/>
      <path d="M42 44h8v8h-8z" fill="#FFA500" opacity="0.5"/>
      <path d="M52 48h6v4h-6z" fill="#DC143C" opacity="0.5"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">G1 G2 G3a G3b G4 G5</text>
    </svg>`
  },
  {
    id: 'nephro-cockcroft-gault',
    name: 'Cockcroft-Gault Formula',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['Cockcroft-Gault', 'CrCl', 'creatinine clearance', 'drug dosing', 'renal function'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="currentColor" opacity="0.1"/>
      <text x="8" y="16" font-size="4" fill="currentColor" stroke="none">Cockcroft-Gault</text>
      <text x="8" y="28" font-size="3" fill="currentColor" stroke="none">CrCl = (140 - age) x wt</text>
      <line x1="8" y1="32" x2="48" y2="32"/>
      <text x="12" y="40" font-size="3" fill="currentColor" stroke="none">72 x SCr</text>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">x 0.85 if female</text>
      <circle cx="52" cy="48" r="8" fill="#9370DB" opacity="0.3"/>
      <text x="48" y="50" font-size="4" fill="currentColor" stroke="none">Rx</text>
    </svg>`
  },
  {
    id: 'nephro-proteinuria-quantification',
    name: 'Proteinuria Quantification',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['UPCR', 'UACR', '24h protein', 'proteinuria', 'albuminuria', 'nephrotic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8h32l8 48H8L16 8z" fill="#FFFF99" opacity="0.3"/>
      <path d="M16 8h32l8 48H8L16 8z"/>
      <line x1="12" y1="24" x2="52" y2="24" stroke-dasharray="2 2"/>
      <text x="14" y="20" font-size="3" fill="currentColor" stroke="none">&lt;150mg - Normal</text>
      <line x1="12" y1="36" x2="52" y2="36" stroke-dasharray="2 2"/>
      <text x="14" y="32" font-size="3" fill="currentColor" stroke="none">150-3500mg - Proteinuria</text>
      <line x1="12" y1="48" x2="52" y2="48" stroke-dasharray="2 2"/>
      <text x="14" y="44" font-size="3" fill="currentColor" stroke="none">&gt;3500mg - Nephrotic</text>
      <text x="18" y="56" font-size="3" fill="#DC143C" stroke="none">UPCR or 24h collection</text>
    </svg>`
  },
  {
    id: 'nephro-cystatin-c',
    name: 'Cystatin C',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['cystatin C', 'GFR', 'biomarker', 'creatinine alternative', 'kidney function'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16" fill="#9370DB" opacity="0.2"/>
      <circle cx="32" cy="28" r="16"/>
      <text x="22" y="32" font-size="6" fill="currentColor" stroke="none">Cys-C</text>
      <path d="M32 44v8"/>
      <path d="M28 48h8"/>
      <rect x="16" y="52" width="32" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="18" y="58" font-size="3" fill="currentColor" stroke="none">Muscle-independent</text>
    </svg>`
  },
  {
    id: 'nephro-renal-doppler',
    name: 'Renal Doppler Ultrasound',
    domain: 'medicine',
    category: 'imaging',
    tags: ['renal doppler', 'resistive index', 'RAS', 'ultrasound', 'vasculature'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c-12 0-16 12-16 24s4 24 16 24c6 0 8-6 8-24s-2-24-8-24z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8c-12 0-16 12-16 24s4 24 16 24c6 0 8-6 8-24s-2-24-8-24z"/>
      <path d="M32 32h24" stroke="#DC143C"/>
      <path d="M36 28c4 4 8-8 12 0s8-4 8 0" stroke="#DC143C"/>
      <text x="36" y="44" font-size="3" fill="currentColor" stroke="none">RI = (PSV-EDV)/PSV</text>
      <text x="36" y="52" font-size="3" fill="currentColor" stroke="none">Normal &lt;0.70</text>
    </svg>`
  },
];

export default nephrologyIcons;
