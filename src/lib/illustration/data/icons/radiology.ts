/**
 * Radiology Icon Library
 * Comprehensive SVG icons for diagnostic radiology and medical imaging
 *
 * Categories:
 * - Imaging Modalities (equipment and machines)
 * - X-ray Findings (radiographic patterns)
 * - CT Findings (computed tomography)
 * - MRI Findings (magnetic resonance imaging)
 * - Ultrasound (sonography and US patterns)
 * - Interventional (procedures and devices)
 * - Nuclear Medicine (PET, SPECT, scintigraphy)
 * - Radiation Safety (protection and monitoring)
 */

import type { IconDefinition } from './index';

export const radiologyIcons: IconDefinition[] = [
  // ===========================================================================
  // IMAGING MODALITIES
  // ===========================================================================
  {
    id: 'rad-xray-machine',
    name: 'X-ray Machine',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['x-ray', 'radiograph', 'plain film', 'machine', 'equipment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="16" rx="2"/>
      <path d="M32 24v12"/>
      <circle cx="32" cy="16" r="4" fill="currentColor" opacity="0.3"/>
      <rect x="12" y="44" width="40" height="12" rx="2"/>
      <path d="M24 36h16l4 8H20z"/>
      <path d="M16 56v4"/>
      <path d="M48 56v4"/>
      <text x="24" y="52" font-size="5" fill="currentColor" stroke="none">X-RAY</text>
    </svg>`
  },
  {
    id: 'rad-ct-scanner',
    name: 'CT Scanner',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['CT', 'computed tomography', 'scanner', 'CAT scan', 'gantry'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="16" ry="24"/>
      <ellipse cx="20" cy="32" rx="8" ry="12" fill="currentColor" opacity="0.1"/>
      <rect x="28" y="26" width="32" height="12" rx="2"/>
      <path d="M28 32h32"/>
      <circle cx="20" cy="32" r="4"/>
      <text x="6" y="58" font-size="5" fill="currentColor" stroke="none">CT</text>
    </svg>`
  },
  {
    id: 'rad-mri-machine',
    name: 'MRI Machine',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['MRI', 'magnetic resonance', 'scanner', 'magnet', 'Tesla'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="12" width="32" height="40" rx="8"/>
      <ellipse cx="20" cy="32" rx="10" ry="14"/>
      <ellipse cx="20" cy="32" rx="6" ry="8" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="24" width="24" height="16" rx="2"/>
      <path d="M36 32h24"/>
      <path d="M12 20c4-2 8-2 16 0"/>
      <path d="M12 44c4 2 8 2 16 0"/>
      <text x="40" y="56" font-size="4" fill="currentColor" stroke="none">MRI</text>
    </svg>`
  },
  {
    id: 'rad-ultrasound-machine',
    name: 'Ultrasound Machine',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['ultrasound', 'sonography', 'US', 'machine', 'probe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="28" height="36" rx="2"/>
      <rect x="16" y="12" width="20" height="14" rx="1" fill="currentColor" opacity="0.1"/>
      <path d="M18 18h4l2 3 4-6 4 6 2-3h2"/>
      <circle cx="26" cy="36" r="4"/>
      <path d="M44 20c4 0 8 4 8 12v24"/>
      <ellipse cx="52" cy="58" rx="4" ry="6"/>
    </svg>`
  },
  {
    id: 'rad-pet-scanner',
    name: 'PET Scanner',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['PET', 'positron emission', 'scanner', 'nuclear', 'FDG'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="16" ry="24"/>
      <ellipse cx="20" cy="32" rx="10" ry="16" stroke-dasharray="4 2"/>
      <ellipse cx="20" cy="32" rx="4" ry="6" fill="#FFD700" opacity="0.4"/>
      <rect x="28" y="26" width="32" height="12" rx="2"/>
      <path d="M28 32h32"/>
      <circle cx="20" cy="32" r="2" fill="#FFD700"/>
      <text x="6" y="58" font-size="4" fill="currentColor" stroke="none">PET</text>
    </svg>`
  },
  {
    id: 'rad-fluoroscopy',
    name: 'Fluoroscopy Unit',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['fluoroscopy', 'fluoro', 'real-time', 'C-arm', 'dynamic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 48c0-20 12-36 24-36s24 16 24 36"/>
      <rect x="28" y="12" width="8" height="8" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="24" y="48" width="16" height="8" rx="2"/>
      <path d="M32 20v28"/>
      <circle cx="32" cy="36" r="6"/>
      <path d="M26 36h12"/>
      <path d="M32 30v12"/>
    </svg>`
  },
  {
    id: 'rad-mammography',
    name: 'Mammography Unit',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['mammography', 'breast', 'screening', 'tomosynthesis', '3D mammo'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="8" rx="2"/>
      <path d="M32 12v8"/>
      <rect x="20" y="20" width="24" height="4" rx="1"/>
      <rect x="20" y="32" width="24" height="4" rx="1"/>
      <ellipse cx="32" cy="28" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <path d="M32 36v12"/>
      <rect x="16" y="48" width="32" height="12" rx="2"/>
      <path d="M20 60v4"/>
      <path d="M44 60v4"/>
    </svg>`
  },
  {
    id: 'rad-nuclear-medicine',
    name: 'Nuclear Medicine Camera',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['gamma camera', 'SPECT', 'nuclear', 'scintigraphy', 'detector'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="2"/>
      <rect x="36" y="16" width="20" height="32" rx="2"/>
      <rect x="26" y="28" width="12" height="8" rx="2"/>
      <path d="M28 32h8"/>
      <circle cx="18" cy="32" r="6" fill="#FFD700" opacity="0.3"/>
      <circle cx="46" cy="32" r="6" fill="#FFD700" opacity="0.3"/>
      <path d="M18 20v-8"/>
      <path d="M46 20v-8"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">SPECT</text>
    </svg>`
  },
  {
    id: 'rad-portable-xray',
    name: 'Portable X-ray',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['portable', 'mobile', 'x-ray', 'bedside', 'AP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="32" width="32" height="24" rx="2"/>
      <rect x="20" y="36" width="24" height="12" rx="1" fill="currentColor" opacity="0.1"/>
      <path d="M24 42h4l2 3 4-6 4 6 2-3h4"/>
      <path d="M32 32v-16"/>
      <rect x="24" y="8" width="16" height="8" rx="2"/>
      <circle cx="32" cy="12" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="60" r="4"/>
      <circle cx="44" cy="60" r="4"/>
    </svg>`
  },
  {
    id: 'rad-c-arm',
    name: 'C-Arm Fluoroscopy',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['C-arm', 'fluoroscopy', 'intraoperative', 'mobile', 'surgical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 44c0-20 10-32 20-32s20 12 20 32" stroke-width="2"/>
      <rect x="8" y="44" width="8" height="12" rx="2"/>
      <rect x="48" y="44" width="8" height="12" rx="2"/>
      <circle cx="12" cy="50" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="50" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M32 12v-4"/>
      <rect x="24" y="4" width="16" height="4" rx="1"/>
      <circle cx="32" cy="32" r="4"/>
    </svg>`
  },
  {
    id: 'rad-dexa-scanner',
    name: 'DEXA Scanner',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['DEXA', 'DXA', 'bone density', 'osteoporosis', 'BMD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="36" width="48" height="8" rx="2"/>
      <rect x="24" y="8" width="16" height="12" rx="2"/>
      <path d="M32 20v16"/>
      <circle cx="32" cy="40" r="3" fill="currentColor" opacity="0.3"/>
      <rect x="12" y="48" width="40" height="8" rx="2"/>
      <path d="M16" y1="56" x2="16" y2="60"/>
      <path d="M48 56v4"/>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">DEXA</text>
    </svg>`
  },
  {
    id: 'rad-angiography-suite',
    name: 'Angiography Suite',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['angiography', 'DSA', 'cath lab', 'interventional', 'biplane'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="32" cy="32" rx="16" ry="12"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <path d="M8 32h48"/>
      <path d="M32 12v40"/>
      <rect x="4" y="28" width="8" height="8" rx="1"/>
      <rect x="52" y="28" width="8" height="8" rx="1"/>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">DSA</text>
    </svg>`
  },

  // ===========================================================================
  // X-RAY FINDINGS
  // ===========================================================================
  {
    id: 'rad-normal-cxr',
    name: 'Normal Chest X-ray',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['chest', 'x-ray', 'normal', 'CXR', 'PA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M20 16c-4 8-6 20-4 32h32c2-12 0-24-4-32"/>
      <ellipse cx="32" cy="32" rx="8" ry="10"/>
      <path d="M20 20c4-2 8-2 12 0"/>
      <path d="M32 20c4-2 8-2 12 0"/>
      <path d="M24 48h16"/>
      <circle cx="32" cy="12" r="4"/>
    </svg>`
  },
  {
    id: 'rad-cardiomegaly',
    name: 'Cardiomegaly',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['cardiomegaly', 'enlarged heart', 'CTR', 'cardiac', 'x-ray'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M16 20c-4 8-6 16-4 28h40c2-12 0-20-4-28"/>
      <ellipse cx="32" cy="34" rx="16" ry="14" fill="#DC143C" opacity="0.2"/>
      <path d="M16 34h32" stroke-dasharray="2 2"/>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">CTR &gt;0.5</text>
    </svg>`
  },
  {
    id: 'rad-infiltrate',
    name: 'Pulmonary Infiltrate',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['infiltrate', 'opacity', 'pneumonia', 'lung', 'infection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M20 16c-4 8-6 20-4 32h32c2-12 0-24-4-32"/>
      <ellipse cx="32" cy="32" rx="6" ry="8"/>
      <ellipse cx="44" cy="28" rx="8" ry="10" fill="#FFA500" opacity="0.4"/>
      <path d="M40 22c4-2 8 2 8 6s-4 10-8 12"/>
      <text x="36" y="44" font-size="4" fill="currentColor" stroke="none">Infiltrate</text>
    </svg>`
  },
  {
    id: 'rad-consolidation',
    name: 'Lobar Consolidation',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['consolidation', 'lobar', 'pneumonia', 'air bronchograms', 'opacity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M20 16c-4 8-6 20-4 32h32c2-12 0-24-4-32"/>
      <ellipse cx="32" cy="32" rx="6" ry="8"/>
      <path d="M16 24c0 0 4 20 4 24h12" fill="#808080" opacity="0.5"/>
      <path d="M18 32h8" stroke="#000" stroke-width="1"/>
      <path d="M18 38h6" stroke="#000" stroke-width="1"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Air bronchograms</text>
    </svg>`
  },
  {
    id: 'rad-pneumothorax',
    name: 'Pneumothorax',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['pneumothorax', 'PTX', 'collapsed lung', 'air', 'pleural'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M20 16c-4 8-6 20-4 32h32c2-12 0-24-4-32"/>
      <ellipse cx="32" cy="32" rx="6" ry="8"/>
      <path d="M44 20c2 6 2 16 0 24" stroke-dasharray="3 2" stroke="#DC143C"/>
      <path d="M48 16v32" stroke-dasharray="2 1"/>
      <text x="46" y="32" font-size="4" fill="#DC143C" stroke="none">PTX</text>
      <path d="M44 32l4 0" stroke="#DC143C"/>
    </svg>`
  },
  {
    id: 'rad-pleural-effusion',
    name: 'Pleural Effusion',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['pleural effusion', 'fluid', 'meniscus', 'blunting', 'costophrenic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M20 16c-4 8-6 20-4 32h32c2-12 0-24-4-32"/>
      <ellipse cx="32" cy="30" rx="6" ry="8"/>
      <path d="M44 36c4 4 6 8 4 12H36" fill="#4169E1" opacity="0.4"/>
      <path d="M36 48c4-6 8-8 12-12"/>
      <text x="38" y="44" font-size="3" fill="currentColor" stroke="none">Effusion</text>
    </svg>`
  },
  {
    id: 'rad-bone-fracture',
    name: 'Bone Fracture',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['fracture', 'bone', 'break', 'trauma', 'displacement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M24 8v20l4 4-4 4v20" stroke-width="3"/>
      <path d="M40 8v18l-4 6 4 4v20" stroke-width="3"/>
      <path d="M28 32l8-4" stroke="#DC143C" stroke-width="2"/>
      <path d="M26 28l12 8" stroke="#DC143C" stroke-width="1" stroke-dasharray="2 1"/>
      <text x="8" y="56" font-size="4" fill="#DC143C" stroke="none">Fx line</text>
    </svg>`
  },
  {
    id: 'rad-foreign-body',
    name: 'Foreign Body',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['foreign body', 'radiopaque', 'metal', 'swallowed', 'aspirated'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M20 16c-4 8-6 20-4 32h32c2-12 0-24-4-32"/>
      <ellipse cx="32" cy="32" rx="6" ry="8"/>
      <circle cx="40" cy="40" r="6" fill="#FFD700" stroke="#FFD700"/>
      <path d="M36 40l8 0"/>
      <path d="M40 36v8"/>
      <text x="32" y="56" font-size="4" fill="currentColor" stroke="none">FB</text>
    </svg>`
  },
  {
    id: 'rad-hilar-adenopathy',
    name: 'Hilar Adenopathy',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['hilar', 'adenopathy', 'lymph nodes', 'mediastinal', 'widening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M20 16c-4 8-6 20-4 32h32c2-12 0-24-4-32"/>
      <ellipse cx="32" cy="32" rx="6" ry="8"/>
      <ellipse cx="24" cy="26" rx="6" ry="4" fill="#FFA500" opacity="0.5"/>
      <ellipse cx="40" cy="26" rx="6" ry="4" fill="#FFA500" opacity="0.5"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Bilateral hilar</text>
    </svg>`
  },
  {
    id: 'rad-atelectasis',
    name: 'Atelectasis',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['atelectasis', 'collapse', 'volume loss', 'subsegmental', 'lobar'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M20 16c-4 8-6 20-4 32h32c2-12 0-24-4-32"/>
      <ellipse cx="32" cy="32" rx="6" ry="8"/>
      <path d="M16 24l8 16" fill="#808080" opacity="0.4"/>
      <path d="M16 24c4-2 8 4 8 16" fill="#808080" opacity="0.4"/>
      <path d="M24 28l-4-4" stroke-dasharray="2 1"/>
      <text x="8" y="56" font-size="4" fill="currentColor" stroke="none">Volume loss</text>
    </svg>`
  },
  {
    id: 'rad-pulmonary-edema',
    name: 'Pulmonary Edema',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['pulmonary edema', 'CHF', 'bat wing', 'Kerley B', 'cephalization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M20 16c-4 8-6 20-4 32h32c2-12 0-24-4-32"/>
      <ellipse cx="32" cy="32" rx="10" ry="12" fill="#808080" opacity="0.3"/>
      <path d="M22 24c4 4 16 4 20 0" fill="#808080" opacity="0.4"/>
      <path d="M22 40c4 4 16 4 20 0" fill="#808080" opacity="0.4"/>
      <path d="M16 40h4" stroke-width="0.5"/>
      <path d="M16 44h4" stroke-width="0.5"/>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Bat wing pattern</text>
    </svg>`
  },
  {
    id: 'rad-rib-fractures',
    name: 'Rib Fractures',
    domain: 'medicine',
    category: 'xray-findings',
    tags: ['rib', 'fracture', 'trauma', 'flail chest', 'multiple'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M16 20c12 4 20 4 32 0"/>
      <path d="M16 28c12 4 20 4 32 0"/>
      <path d="M16 36c12 4 20 4 32 0"/>
      <path d="M16 44c12 4 20 4 32 0"/>
      <circle cx="40" cy="28" r="3" fill="#DC143C" opacity="0.5"/>
      <circle cx="38" cy="36" r="3" fill="#DC143C" opacity="0.5"/>
      <path d="M38 26l4 4" stroke="#DC143C" stroke-width="2"/>
      <path d="M36 34l4 4" stroke="#DC143C" stroke-width="2"/>
    </svg>`
  },

  // ===========================================================================
  // CT FINDINGS
  // ===========================================================================
  {
    id: 'rad-ct-lung-window',
    name: 'CT Lung Window',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['CT', 'lung window', 'parenchyma', 'nodule', 'setting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#000" opacity="0.8"/>
      <ellipse cx="22" cy="32" rx="10" ry="14" fill="#333"/>
      <ellipse cx="42" cy="32" rx="10" ry="14" fill="#333"/>
      <ellipse cx="32" cy="32" rx="4" ry="6" fill="#666"/>
      <path d="M22 22v20" stroke="#444" stroke-width="0.5"/>
      <path d="M42 22v20" stroke="#444" stroke-width="0.5"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">W:1500 L:-600</text>
    </svg>`
  },
  {
    id: 'rad-ct-bone-window',
    name: 'CT Bone Window',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['CT', 'bone window', 'skeletal', 'fracture', 'setting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#222"/>
      <circle cx="32" cy="32" r="26" stroke="#FFF" stroke-width="3"/>
      <ellipse cx="32" cy="32" rx="16" ry="18" fill="#444"/>
      <path d="M20 24c8 4 16 4 24 0" stroke="#FFF" stroke-width="2"/>
      <path d="M20 40c8 4 16 4 24 0" stroke="#FFF" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">W:2000 L:400</text>
    </svg>`
  },
  {
    id: 'rad-ct-soft-tissue',
    name: 'CT Soft Tissue Window',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['CT', 'soft tissue', 'abdomen', 'liver', 'setting'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#666"/>
      <ellipse cx="24" cy="28" rx="10" ry="12" fill="#888"/>
      <ellipse cx="40" cy="32" rx="8" ry="10" fill="#777"/>
      <ellipse cx="32" cy="44" rx="6" ry="4" fill="#999"/>
      <circle cx="32" cy="32" r="4" fill="#555"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">W:400 L:40</text>
    </svg>`
  },
  {
    id: 'rad-ct-contrast-enhance',
    name: 'Contrast Enhancement',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['contrast', 'enhancement', 'iodine', 'IV', 'arterial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#444"/>
      <ellipse cx="24" cy="28" rx="10" ry="12" fill="#666"/>
      <ellipse cx="40" cy="32" rx="8" ry="10" fill="#FFF" opacity="0.8"/>
      <path d="M36 24c4 4 6 12 4 16" stroke="#FFF" stroke-width="2"/>
      <circle cx="32" cy="20" r="3" fill="#FFF"/>
      <path d="M32 23v6" stroke="#FFF" stroke-width="2"/>
      <text x="32" y="56" font-size="4" fill="currentColor" stroke="none">Enhancing</text>
    </svg>`
  },
  {
    id: 'rad-ct-hemorrhage',
    name: 'CT Hemorrhage',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['hemorrhage', 'blood', 'hyperdense', 'acute', 'ICH'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#444"/>
      <ellipse cx="32" cy="32" rx="24" ry="22" fill="#555"/>
      <ellipse cx="28" cy="28" rx="10" ry="8" fill="#FFF"/>
      <path d="M22 24c8-4 12-4 16 0 4 8 2 12-4 14-6 2-12-2-12-8v-6z" fill="#FFF"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Hyperdense</text>
    </svg>`
  },
  {
    id: 'rad-ct-mass',
    name: 'CT Mass/Tumor',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['mass', 'tumor', 'lesion', 'neoplasm', 'CT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#555"/>
      <ellipse cx="24" cy="28" rx="10" ry="12" fill="#666"/>
      <ellipse cx="42" cy="28" rx="8" ry="10" fill="#666"/>
      <ellipse cx="38" cy="34" rx="10" ry="8" fill="#888" stroke="#FFF" stroke-width="2"/>
      <path d="M32 30c4 2 8 4 10 6" stroke="#FFF" stroke-dasharray="2 1"/>
      <text x="34" y="48" font-size="4" fill="currentColor" stroke="none">Mass</text>
    </svg>`
  },
  {
    id: 'rad-ct-lymphadenopathy',
    name: 'CT Lymphadenopathy',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['lymphadenopathy', 'lymph nodes', 'enlarged', 'mediastinal', 'retroperitoneal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#555"/>
      <ellipse cx="32" cy="32" rx="12" ry="16" fill="#666"/>
      <circle cx="24" cy="24" r="5" fill="#999" stroke="#FFF"/>
      <circle cx="40" cy="24" r="5" fill="#999" stroke="#FFF"/>
      <circle cx="24" cy="40" r="4" fill="#999" stroke="#FFF"/>
      <circle cx="40" cy="40" r="4" fill="#999" stroke="#FFF"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Nodes &gt;1cm</text>
    </svg>`
  },
  {
    id: 'rad-ct-pe',
    name: 'CT Pulmonary Embolism',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['PE', 'pulmonary embolism', 'CTA', 'filling defect', 'clot'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#333"/>
      <ellipse cx="22" cy="32" rx="10" ry="14" fill="#444"/>
      <ellipse cx="42" cy="32" rx="10" ry="14" fill="#444"/>
      <path d="M32 16v-4"/>
      <path d="M32 16l-8 8" stroke="#FFF" stroke-width="3"/>
      <path d="M32 16l8 8" stroke="#FFF" stroke-width="3"/>
      <ellipse cx="26" cy="22" rx="3" ry="2" fill="#DC143C"/>
      <ellipse cx="38" cy="22" rx="3" ry="2" fill="#DC143C"/>
      <text x="12" y="58" font-size="4" fill="#DC143C" stroke="none">Filling defects</text>
    </svg>`
  },
  {
    id: 'rad-ct-aortic-dissection',
    name: 'CT Aortic Dissection',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['aortic dissection', 'intimal flap', 'true lumen', 'false lumen', 'CTA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#444"/>
      <circle cx="32" cy="32" r="16" fill="#FFF"/>
      <path d="M24 20c0 24 0 24 0 24" stroke="#333" stroke-width="2"/>
      <ellipse cx="28" cy="32" rx="6" ry="10" fill="#FFF"/>
      <ellipse cx="38" cy="32" rx="6" ry="10" fill="#999"/>
      <text x="22" y="48" font-size="3" fill="currentColor" stroke="none">TL</text>
      <text x="36" y="48" font-size="3" fill="currentColor" stroke="none">FL</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Intimal flap</text>
    </svg>`
  },
  {
    id: 'rad-ct-ground-glass',
    name: 'Ground Glass Opacity',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['ground glass', 'GGO', 'opacity', 'interstitial', 'COVID'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#222"/>
      <ellipse cx="22" cy="32" rx="10" ry="14" fill="#444"/>
      <ellipse cx="42" cy="32" rx="10" ry="14" fill="#444"/>
      <ellipse cx="44" cy="30" rx="6" ry="8" fill="#777" opacity="0.6"/>
      <ellipse cx="46" cy="36" rx="4" ry="5" fill="#777" opacity="0.6"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">GGO</text>
    </svg>`
  },
  {
    id: 'rad-ct-pulmonary-nodule',
    name: 'Pulmonary Nodule',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['nodule', 'lung', 'SPN', 'incidental', 'Fleischner'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#222"/>
      <ellipse cx="22" cy="32" rx="10" ry="14" fill="#444"/>
      <ellipse cx="42" cy="32" rx="10" ry="14" fill="#444"/>
      <circle cx="38" cy="28" r="4" fill="#FFF"/>
      <path d="M42 24l4-4"/>
      <path d="M46 20l4 0 0 4"/>
      <text x="46" y="22" font-size="3" fill="currentColor" stroke="none">6mm</text>
    </svg>`
  },
  {
    id: 'rad-ct-liver-lesion',
    name: 'CT Liver Lesion',
    domain: 'medicine',
    category: 'ct-findings',
    tags: ['liver', 'lesion', 'hepatic', 'hypodense', 'metastasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#555"/>
      <path d="M12 24c8-8 24-8 40 0 0 16-8 28-24 28s-16-12-16-28z" fill="#888"/>
      <circle cx="28" cy="32" r="6" fill="#444" stroke="#FFF"/>
      <circle cx="40" cy="28" r="4" fill="#444" stroke="#FFF"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Hypodense lesions</text>
    </svg>`
  },

  // ===========================================================================
  // MRI FINDINGS
  // ===========================================================================
  {
    id: 'rad-mri-t1-weighted',
    name: 'MRI T1-Weighted',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['MRI', 'T1', 'weighted', 'fat bright', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#333"/>
      <ellipse cx="32" cy="32" rx="24" ry="22" fill="#444"/>
      <ellipse cx="24" cy="28" rx="8" ry="10" fill="#555"/>
      <ellipse cx="40" cy="28" rx="8" ry="10" fill="#555"/>
      <ellipse cx="32" cy="40" rx="10" ry="4" fill="#FFF" opacity="0.8"/>
      <text x="8" y="58" font-size="5" fill="currentColor" stroke="none">T1W</text>
      <text x="38" y="58" font-size="3" fill="currentColor" stroke="none">Fat bright</text>
    </svg>`
  },
  {
    id: 'rad-mri-t2-weighted',
    name: 'MRI T2-Weighted',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['MRI', 'T2', 'weighted', 'fluid bright', 'edema'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#222"/>
      <ellipse cx="32" cy="32" rx="24" ry="22" fill="#333"/>
      <ellipse cx="24" cy="28" rx="8" ry="10" fill="#444"/>
      <ellipse cx="40" cy="28" rx="8" ry="10" fill="#444"/>
      <ellipse cx="32" cy="40" rx="10" ry="4" fill="#666"/>
      <ellipse cx="32" cy="24" rx="4" ry="2" fill="#FFF"/>
      <text x="8" y="58" font-size="5" fill="currentColor" stroke="none">T2W</text>
      <text x="34" y="58" font-size="3" fill="currentColor" stroke="none">Fluid bright</text>
    </svg>`
  },
  {
    id: 'rad-mri-flair',
    name: 'MRI FLAIR',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['MRI', 'FLAIR', 'fluid attenuated', 'CSF dark', 'periventricular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#333"/>
      <ellipse cx="32" cy="32" rx="24" ry="22" fill="#555"/>
      <ellipse cx="24" cy="28" rx="6" ry="8" fill="#222"/>
      <ellipse cx="40" cy="28" rx="6" ry="8" fill="#222"/>
      <ellipse cx="32" cy="38" rx="4" ry="6" fill="#222"/>
      <ellipse cx="28" cy="24" rx="3" ry="2" fill="#FFF"/>
      <ellipse cx="36" cy="24" rx="3" ry="2" fill="#FFF"/>
      <text x="8" y="58" font-size="5" fill="currentColor" stroke="none">FLAIR</text>
    </svg>`
  },
  {
    id: 'rad-mri-dwi',
    name: 'MRI DWI/ADC',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['MRI', 'DWI', 'diffusion', 'ADC', 'restricted', 'stroke'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#222"/>
      <ellipse cx="32" cy="32" rx="24" ry="22" fill="#333"/>
      <ellipse cx="24" cy="30" rx="6" ry="6" fill="#444"/>
      <ellipse cx="40" cy="30" rx="6" ry="6" fill="#444"/>
      <ellipse cx="36" cy="28" rx="8" ry="6" fill="#FFF"/>
      <text x="8" y="58" font-size="5" fill="currentColor" stroke="none">DWI</text>
      <text x="28" y="58" font-size="3" fill="currentColor" stroke="none">Restricted diffusion</text>
    </svg>`
  },
  {
    id: 'rad-mri-contrast',
    name: 'MRI Contrast Enhancement',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['MRI', 'gadolinium', 'contrast', 'enhancement', 'T1 post'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#333"/>
      <ellipse cx="32" cy="32" rx="24" ry="22" fill="#444"/>
      <ellipse cx="24" cy="28" rx="6" ry="8" fill="#555"/>
      <ellipse cx="40" cy="28" rx="6" ry="8" fill="#555"/>
      <circle cx="36" cy="30" r="6" fill="#222" stroke="#FFF" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">T1+C Ring</text>
    </svg>`
  },
  {
    id: 'rad-mri-ms-plaques',
    name: 'MS Plaques',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['MS', 'multiple sclerosis', 'plaques', 'demyelination', 'periventricular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#333"/>
      <ellipse cx="32" cy="32" rx="24" ry="22" fill="#555"/>
      <ellipse cx="28" cy="30" rx="4" ry="6" fill="#222"/>
      <ellipse cx="36" cy="30" rx="4" ry="6" fill="#222"/>
      <circle cx="22" cy="24" r="3" fill="#FFF"/>
      <circle cx="42" cy="24" r="2" fill="#FFF"/>
      <circle cx="24" cy="38" r="2" fill="#FFF"/>
      <circle cx="40" cy="36" r="3" fill="#FFF"/>
      <ellipse cx="32" cy="18" rx="4" ry="2" fill="#FFF"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Dawson fingers</text>
    </svg>`
  },
  {
    id: 'rad-mri-acute-stroke',
    name: 'MRI Acute Stroke',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['stroke', 'infarct', 'acute', 'DWI', 'ischemia', 'territory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#222"/>
      <ellipse cx="32" cy="32" rx="24" ry="22" fill="#333"/>
      <ellipse cx="24" cy="30" rx="6" ry="8" fill="#444"/>
      <ellipse cx="40" cy="30" rx="6" ry="8" fill="#444"/>
      <path d="M36 20c8 4 12 12 10 20-2 4-6 6-10 6" fill="#FFF"/>
      <text x="38" y="34" font-size="4" fill="#333" stroke="none">MCA</text>
      <text x="8" y="58" font-size="4" fill="#DC143C" stroke="none">Acute infarct</text>
    </svg>`
  },
  {
    id: 'rad-mri-brain-tumor',
    name: 'MRI Brain Tumor',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['tumor', 'brain', 'glioma', 'mass effect', 'edema'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28" fill="#333"/>
      <ellipse cx="32" cy="32" rx="24" ry="22" fill="#444"/>
      <ellipse cx="24" cy="30" rx="4" ry="6" fill="#333"/>
      <ellipse cx="40" cy="30" rx="4" ry="6" fill="#333"/>
      <ellipse cx="38" cy="26" rx="10" ry="8" fill="#888" opacity="0.6"/>
      <ellipse cx="38" cy="26" rx="6" ry="5" fill="#FFF" stroke="#FFF" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Mass + edema</text>
    </svg>`
  },
  {
    id: 'rad-mri-spine-herniation',
    name: 'MRI Disc Herniation',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['spine', 'disc', 'herniation', 'protrusion', 'cord compression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="56" rx="2" fill="#444"/>
      <ellipse cx="32" cy="12" rx="8" ry="4" fill="#888"/>
      <ellipse cx="32" cy="28" rx="8" ry="4" fill="#888"/>
      <ellipse cx="32" cy="44" rx="8" ry="4" fill="#888"/>
      <rect x="28" y="16" width="8" height="8" fill="#FFF"/>
      <rect x="28" y="32" width="8" height="8" fill="#FFF"/>
      <rect x="28" y="48" width="8" height="8" fill="#FFF"/>
      <ellipse cx="38" cy="28" rx="4" ry="3" fill="#555" stroke="#FFF"/>
      <text x="44" y="30" font-size="4" fill="#DC143C" stroke="none">HNP</text>
    </svg>`
  },
  {
    id: 'rad-mri-cord-compression',
    name: 'MRI Cord Compression',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['spinal cord', 'compression', 'myelopathy', 'T2 signal', 'stenosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="56" rx="2" fill="#444"/>
      <path d="M28 8v48" stroke="#FFF" stroke-width="6"/>
      <path d="M28 24h8" fill="#888"/>
      <ellipse cx="32" cy="32" rx="12" ry="4" fill="#666"/>
      <path d="M28 28c0 4 1 6 4 8s4 4 0 8" stroke="#FFF" stroke-width="3"/>
      <ellipse cx="32" cy="32" rx="2" ry="4" fill="#FFF"/>
      <text x="8" y="58" font-size="4" fill="#DC143C" stroke="none">Cord signal</text>
    </svg>`
  },
  {
    id: 'rad-mri-meniscus-tear',
    name: 'MRI Meniscus Tear',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['knee', 'meniscus', 'tear', 'orthopedic', 'joint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="24" fill="#444"/>
      <ellipse cx="32" cy="20" rx="16" ry="8" fill="#888"/>
      <ellipse cx="32" cy="44" rx="16" ry="8" fill="#888"/>
      <path d="M16 32c8-4 24-4 32 0" fill="#222" stroke="#222"/>
      <path d="M20 32l8 4" stroke="#FFF" stroke-width="2"/>
      <text x="28" y="38" font-size="4" fill="#DC143C" stroke="none">Tear</text>
    </svg>`
  },
  {
    id: 'rad-mri-acl-tear',
    name: 'MRI ACL Tear',
    domain: 'medicine',
    category: 'mri-findings',
    tags: ['knee', 'ACL', 'tear', 'ligament', 'anterior cruciate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="28" fill="#444"/>
      <ellipse cx="32" cy="16" rx="12" ry="8" fill="#888"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="#888"/>
      <path d="M24 24l16 16" stroke="#222" stroke-width="4"/>
      <path d="M24 24l8 6" stroke="#FFF" stroke-width="3"/>
      <path d="M36 36l4 4" stroke="#FFF" stroke-width="3" stroke-dasharray="2 2"/>
      <text x="12" y="58" font-size="4" fill="#DC143C" stroke="none">Discontinuous ACL</text>
    </svg>`
  },

  // ===========================================================================
  // ULTRASOUND
  // ===========================================================================
  {
    id: 'rad-us-linear-probe',
    name: 'Linear Probe',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['ultrasound', 'linear', 'probe', 'vascular', 'superficial'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="12" rx="2"/>
      <rect x="20" y="20" width="24" height="36" rx="4"/>
      <rect x="16" y="56" width="32" height="4" rx="1" fill="currentColor" opacity="0.3"/>
      <path d="M24 32h16"/>
      <path d="M24 40h16"/>
      <path d="M24 48h16"/>
      <text x="20" y="28" font-size="4" fill="currentColor" stroke="none">Linear</text>
    </svg>`
  },
  {
    id: 'rad-us-curvilinear-probe',
    name: 'Curvilinear Probe',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['ultrasound', 'curvilinear', 'probe', 'abdominal', 'deep'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="12" rx="2"/>
      <path d="M16 20h32v20c0 8-8 16-16 16s-16-8-16-16V20z"/>
      <path d="M16 56c8 4 24 4 32 0" fill="currentColor" opacity="0.3"/>
      <path d="M24 30c4 4 12 4 16 0"/>
      <path d="M24 38c4 4 12 4 16 0"/>
      <text x="18" y="26" font-size="4" fill="currentColor" stroke="none">Curvi</text>
    </svg>`
  },
  {
    id: 'rad-us-gallstones',
    name: 'Gallstones',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['gallstones', 'cholelithiasis', 'GB', 'shadow', 'mobile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="#111"/>
      <ellipse cx="32" cy="28" rx="16" ry="12" fill="#333"/>
      <ellipse cx="32" cy="32" rx="4" ry="3" fill="#FFF"/>
      <path d="M28 35l-8 20" fill="#000"/>
      <path d="M36 35l8 20" fill="#000"/>
      <path d="M28 35l8 0 8 20h-16z" fill="#000"/>
      <text x="8" y="58" font-size="4" fill="#FFF" stroke="none">Shadow</text>
    </svg>`
  },
  {
    id: 'rad-us-kidney-stones',
    name: 'Kidney Stones',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['kidney stones', 'nephrolithiasis', 'hydronephrosis', 'renal', 'calculi'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="#111"/>
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#333"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#222"/>
      <ellipse cx="32" cy="32" rx="3" ry="2" fill="#FFF"/>
      <path d="M30 34l-4 16" fill="#000"/>
      <path d="M34 34l4 16" fill="#000"/>
      <text x="8" y="14" font-size="4" fill="#FFF" stroke="none">Kidney</text>
    </svg>`
  },
  {
    id: 'rad-us-dvt',
    name: 'Deep Vein Thrombosis',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['DVT', 'thrombosis', 'venous', 'compression', 'non-compressible'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="#111"/>
      <ellipse cx="24" cy="32" rx="8" ry="12" fill="#444"/>
      <ellipse cx="44" cy="32" rx="8" ry="12" fill="#444"/>
      <ellipse cx="44" cy="32" rx="5" ry="8" fill="#888"/>
      <circle cx="24" cy="32" r="4" fill="#888"/>
      <text x="16" y="52" font-size="3" fill="#FFF" stroke="none">Compressed</text>
      <text x="36" y="52" font-size="3" fill="#DC143C" stroke="none">Thrombus</text>
    </svg>`
  },
  {
    id: 'rad-us-fast-exam',
    name: 'FAST Exam',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['FAST', 'trauma', 'free fluid', 'hemoperitoneum', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="28" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <circle cx="20" cy="20" r="4" fill="#4169E1"/>
      <circle cx="44" cy="20" r="4" fill="#4169E1"/>
      <circle cx="32" cy="44" r="4" fill="#4169E1"/>
      <circle cx="32" cy="16" r="3" fill="#4169E1"/>
      <text x="8" y="22" font-size="3" fill="currentColor" stroke="none">RUQ</text>
      <text x="48" y="22" font-size="3" fill="currentColor" stroke="none">LUQ</text>
      <text x="24" y="50" font-size="3" fill="currentColor" stroke="none">Pelvis</text>
      <text x="22" y="14" font-size="3" fill="currentColor" stroke="none">Cardiac</text>
    </svg>`
  },
  {
    id: 'rad-us-obstetric',
    name: 'Obstetric Ultrasound',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['OB', 'obstetric', 'fetal', 'pregnancy', 'gestational'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="#111"/>
      <ellipse cx="32" cy="32" rx="20" ry="18" fill="#222"/>
      <ellipse cx="36" cy="28" rx="10" ry="12" fill="#333"/>
      <circle cx="38" cy="24" r="4" fill="#444"/>
      <path d="M32 30c2 4 4 8 2 12"/>
      <path d="M30 36c-2 2-4 6-2 8"/>
      <text x="8" y="58" font-size="4" fill="#FFF" stroke="none">Fetus</text>
    </svg>`
  },
  {
    id: 'rad-us-echo-parasternal',
    name: 'Echo Parasternal View',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['echo', 'parasternal', 'PLAX', 'cardiac', 'LV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="#111"/>
      <path d="M12 48l20-32 20 32z" fill="#222"/>
      <ellipse cx="32" cy="36" rx="12" ry="8" fill="#444"/>
      <ellipse cx="32" cy="36" rx="8" ry="5" fill="#333"/>
      <path d="M24 32c4-2 12-2 16 0"/>
      <text x="8" y="14" font-size="4" fill="#FFF" stroke="none">PLAX</text>
      <text x="26" y="40" font-size="4" fill="#FFF" stroke="none">LV</text>
    </svg>`
  },
  {
    id: 'rad-us-echo-apical',
    name: 'Echo Apical 4-Chamber',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['echo', 'apical', 'A4C', 'four chamber', 'cardiac'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="#111"/>
      <path d="M32 56l-20-40h40z" fill="#222"/>
      <path d="M32 56v-40"/>
      <path d="M12 16h40"/>
      <text x="16" y="24" font-size="4" fill="#FFF" stroke="none">RA</text>
      <text x="42" y="24" font-size="4" fill="#FFF" stroke="none">LA</text>
      <text x="18" y="42" font-size="4" fill="#FFF" stroke="none">RV</text>
      <text x="40" y="42" font-size="4" fill="#FFF" stroke="none">LV</text>
    </svg>`
  },
  {
    id: 'rad-us-thyroid-nodule',
    name: 'Thyroid Nodule',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['thyroid', 'nodule', 'TI-RADS', 'suspicious', 'FNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="#111"/>
      <ellipse cx="24" cy="32" rx="12" ry="16" fill="#444"/>
      <ellipse cx="44" cy="32" rx="12" ry="16" fill="#444"/>
      <ellipse cx="28" cy="28" rx="6" ry="5" fill="#222" stroke="#FFF"/>
      <circle cx="30" cy="30" r="1" fill="#FFF"/>
      <text x="8" y="58" font-size="4" fill="#FFF" stroke="none">Nodule</text>
    </svg>`
  },
  {
    id: 'rad-us-carotid',
    name: 'Carotid Ultrasound',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['carotid', 'duplex', 'stenosis', 'plaque', 'IMT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="#111"/>
      <path d="M32 8v24" stroke="#888" stroke-width="12"/>
      <path d="M24 32l-8 24" stroke="#888" stroke-width="8"/>
      <path d="M40 32l8 24" stroke="#888" stroke-width="8"/>
      <path d="M32 8v24" stroke="#444" stroke-width="6"/>
      <path d="M24 32l-8 24" stroke="#444" stroke-width="4"/>
      <path d="M40 32l8 24" stroke="#444" stroke-width="4"/>
      <ellipse cx="28" cy="24" rx="3" ry="2" fill="#FFF"/>
      <text x="8" y="58" font-size="4" fill="#FFF" stroke="none">Plaque</text>
    </svg>`
  },
  {
    id: 'rad-us-aaa',
    name: 'Abdominal Aortic Aneurysm',
    domain: 'medicine',
    category: 'ultrasound',
    tags: ['AAA', 'aortic aneurysm', 'abdominal', 'vascular', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="#111"/>
      <path d="M32 8v12c0 0-12 4-12 16s12 16 12 16v4" stroke="#888" stroke-width="4"/>
      <ellipse cx="32" cy="36" rx="12" ry="10" fill="#444" stroke="#FFF"/>
      <ellipse cx="32" cy="36" rx="6" ry="5" fill="#222"/>
      <path d="M44 28l8 0"/>
      <path d="M52 28v16"/>
      <text x="52" y="38" font-size="4" fill="#FFF" stroke="none">5cm</text>
    </svg>`
  },

  // ===========================================================================
  // INTERVENTIONAL RADIOLOGY
  // ===========================================================================
  {
    id: 'rad-ir-angiography',
    name: 'Angiography',
    domain: 'medicine',
    category: 'interventional',
    tags: ['angiography', 'DSA', 'arterial', 'catheter', 'contrast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="2" fill="#111"/>
      <path d="M32 8v48" stroke="#FFF" stroke-width="4"/>
      <path d="M32 20l-12 8" stroke="#FFF" stroke-width="2"/>
      <path d="M32 20l12 8" stroke="#FFF" stroke-width="2"/>
      <path d="M32 36l-16 12" stroke="#FFF" stroke-width="3"/>
      <path d="M32 36l16 12" stroke="#FFF" stroke-width="3"/>
      <circle cx="32" cy="20" r="2" fill="#DC143C"/>
      <text x="8" y="58" font-size="4" fill="#FFF" stroke="none">Arterial tree</text>
    </svg>`
  },
  {
    id: 'rad-ir-stent',
    name: 'Vascular Stent',
    domain: 'medicine',
    category: 'interventional',
    tags: ['stent', 'endovascular', 'angioplasty', 'scaffold', 'deployment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="8"/>
      <path d="M20 12v40" stroke-dasharray="4 2"/>
      <path d="M28 12v40" stroke-dasharray="4 2"/>
      <path d="M36 12v40" stroke-dasharray="4 2"/>
      <path d="M44 12v40" stroke-dasharray="4 2"/>
      <path d="M16 20h32"/>
      <path d="M16 32h32"/>
      <path d="M16 44h32"/>
      <rect x="20" y="24" width="24" height="16" rx="4" fill="currentColor" opacity="0.2"/>
      <text x="24" y="36" font-size="5" fill="currentColor" stroke="none">Stent</text>
    </svg>`
  },
  {
    id: 'rad-ir-embolization',
    name: 'Embolization',
    domain: 'medicine',
    category: 'interventional',
    tags: ['embolization', 'coils', 'particles', 'occlusion', 'hemorrhage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v16" stroke-width="3"/>
      <path d="M32 24l-12 12" stroke-width="2"/>
      <path d="M32 24l12 12" stroke-width="2"/>
      <circle cx="20" cy="40" r="8" fill="currentColor" opacity="0.3"/>
      <path d="M16 40c2-2 4 2 6 0s2-4 4-2 2 4 4 2"/>
      <circle cx="20" cy="40" r="3" fill="#FFD700"/>
      <circle cx="18" cy="42" r="2" fill="#FFD700"/>
      <circle cx="22" cy="38" r="2" fill="#FFD700"/>
      <text x="32" y="50" font-size="4" fill="currentColor" stroke="none">Coils</text>
    </svg>`
  },
  {
    id: 'rad-ir-biopsy-needle',
    name: 'Biopsy Needle',
    domain: 'medicine',
    category: 'interventional',
    tags: ['biopsy', 'needle', 'core', 'CT-guided', 'percutaneous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8l48 48" stroke-width="3"/>
      <path d="M8 8l8 2-2 8z" fill="currentColor"/>
      <rect x="44" y="44" width="16" height="8" rx="2" transform="rotate(45 52 48)"/>
      <circle cx="40" cy="40" r="12"/>
      <ellipse cx="40" cy="40" rx="6" ry="8" fill="currentColor" opacity="0.2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Target lesion</text>
    </svg>`
  },
  {
    id: 'rad-ir-drainage',
    name: 'Drainage Catheter',
    domain: 'medicine',
    category: 'interventional',
    tags: ['drainage', 'catheter', 'abscess', 'pigtail', 'percutaneous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="36" cy="36" rx="16" ry="12" fill="#FFA500" opacity="0.3"/>
      <ellipse cx="36" cy="36" rx="16" ry="12"/>
      <path d="M8 16l20 12"/>
      <path d="M28 28c4 4 4 12-2 14-6 2-8-6-4-10"/>
      <rect x="4" y="12" width="8" height="8" rx="2"/>
      <circle cx="32" cy="36" r="2" fill="currentColor"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Collection</text>
    </svg>`
  },
  {
    id: 'rad-ir-picc',
    name: 'PICC Line',
    domain: 'medicine',
    category: 'interventional',
    tags: ['PICC', 'central line', 'catheter', 'venous access', 'placement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h24c8 0 12-8 16-16"/>
      <path d="M48 16v-8"/>
      <ellipse cx="48" cy="12" rx="4" ry="8"/>
      <circle cx="8" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M32 32c4 4 8 4 12 0"/>
      <path d="M8 32l-4 4"/>
      <path d="M8 32l-4-4"/>
      <text x="4" y="56" font-size="4" fill="currentColor" stroke="none">Arm vein</text>
      <text x="36" y="56" font-size="4" fill="currentColor" stroke="none">SVC</text>
    </svg>`
  },
  {
    id: 'rad-ir-ablation',
    name: 'Tumor Ablation',
    domain: 'medicine',
    category: 'interventional',
    tags: ['ablation', 'RFA', 'microwave', 'cryoablation', 'tumor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="36" cy="36" rx="14" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="36" cy="36" rx="14" ry="10"/>
      <path d="M8 12l24 20"/>
      <rect x="4" y="8" width="8" height="8" rx="1"/>
      <circle cx="36" cy="36" r="6" fill="#DC143C" opacity="0.4" stroke="#DC143C"/>
      <circle cx="36" cy="36" r="10" stroke="#FFA500" stroke-dasharray="2 2"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Ablation zone</text>
    </svg>`
  },
  {
    id: 'rad-ir-tips',
    name: 'TIPS Procedure',
    domain: 'medicine',
    category: 'interventional',
    tags: ['TIPS', 'transjugular', 'portosystemic', 'shunt', 'portal HTN'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <path d="M24 8v20" stroke-width="3"/>
      <path d="M40 8v48" stroke-width="2"/>
      <path d="M24 28l16 8" stroke-width="4" stroke="#4169E1"/>
      <path d="M24 28v28" stroke-width="2"/>
      <text x="8" y="20" font-size="4" fill="currentColor" stroke="none">Hepatic V</text>
      <text x="44" y="20" font-size="4" fill="currentColor" stroke="none">Portal V</text>
      <text x="26" y="40" font-size="4" fill="#4169E1" stroke="none">Shunt</text>
    </svg>`
  },
  {
    id: 'rad-ir-nephrostomy',
    name: 'Nephrostomy Tube',
    domain: 'medicine',
    category: 'interventional',
    tags: ['nephrostomy', 'PCN', 'kidney', 'drainage', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="36" cy="32" rx="16" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="36" cy="32" rx="16" ry="20"/>
      <ellipse cx="36" cy="32" rx="8" ry="10" fill="currentColor" opacity="0.2"/>
      <path d="M8 20l20 8"/>
      <path d="M28 28c4 4 6 8 4 12-2 4-8 4-10 0"/>
      <circle cx="8" cy="20" r="4"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Kidney</text>
    </svg>`
  },
  {
    id: 'rad-ir-vertebroplasty',
    name: 'Vertebroplasty',
    domain: 'medicine',
    category: 'interventional',
    tags: ['vertebroplasty', 'kyphoplasty', 'spine', 'cement', 'fracture'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="12" rx="2"/>
      <rect x="16" y="24" width="32" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="40" width="32" height="12" rx="2"/>
      <path d="M8 16l16 12"/>
      <ellipse cx="32" cy="30" rx="8" ry="4" fill="#FFF"/>
      <text x="26" y="32" font-size="4" fill="currentColor" stroke="none">PMMA</text>
    </svg>`
  },
  {
    id: 'rad-ir-ivc-filter',
    name: 'IVC Filter',
    domain: 'medicine',
    category: 'interventional',
    tags: ['IVC filter', 'inferior vena cava', 'PE prevention', 'retrievable'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8v48" stroke-width="3"/>
      <path d="M44 8v48" stroke-width="3"/>
      <path d="M20 24l12 12 12-12"/>
      <path d="M20 36l12-12 12 12"/>
      <path d="M32 36v8"/>
      <circle cx="32" cy="48" r="3"/>
      <circle cx="28" cy="32" r="2" fill="#DC143C"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Filter + clot</text>
    </svg>`
  },
  {
    id: 'rad-ir-thrombectomy',
    name: 'Mechanical Thrombectomy',
    domain: 'medicine',
    category: 'interventional',
    tags: ['thrombectomy', 'stroke', 'clot retrieval', 'stent retriever', 'MT'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-4 16-8 24-8s16 4 24 8" stroke-width="4"/>
      <path d="M32 24v-16"/>
      <rect x="28" y="4" width="8" height="8" rx="1"/>
      <ellipse cx="40" cy="32" rx="6" ry="4" fill="#DC143C"/>
      <path d="M32 32c4-2 8-2 12 0" stroke-dasharray="2 2"/>
      <path d="M44 36l8 8"/>
      <path d="M52 44l4-4 4 4"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Clot retrieval</text>
    </svg>`
  },

  // ===========================================================================
  // NUCLEAR MEDICINE
  // ===========================================================================
  {
    id: 'rad-nm-bone-scan',
    name: 'Bone Scan',
    domain: 'medicine',
    category: 'nuclear-medicine',
    tags: ['bone scan', 'scintigraphy', 'Tc-99m', 'MDP', 'metastasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v8"/>
      <ellipse cx="32" cy="16" rx="8" ry="4"/>
      <path d="M24 20v8"/>
      <path d="M40 20v8"/>
      <rect x="24" y="28" width="16" height="16" rx="2"/>
      <path d="M28 44v12"/>
      <path d="M36 44v12"/>
      <circle cx="36" cy="32" r="3" fill="#FFD700"/>
      <circle cx="28" cy="50" r="2" fill="#FFD700"/>
      <circle cx="32" cy="12" r="2" fill="#FFD700"/>
      <text x="8" y="58" font-size="4" fill="#FFD700" stroke="none">Hot spots</text>
    </svg>`
  },
  {
    id: 'rad-nm-pet-ct',
    name: 'PET-CT',
    domain: 'medicine',
    category: 'nuclear-medicine',
    tags: ['PET-CT', 'FDG', 'oncology', 'SUV', 'metabolic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="28"/>
      <ellipse cx="32" cy="32" rx="12" ry="16" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="20" r="4" fill="#FFD700"/>
      <circle cx="26" cy="32" r="3" fill="#FFA500"/>
      <circle cx="38" cy="36" r="5" fill="#DC143C"/>
      <ellipse cx="32" cy="48" rx="6" ry="4" fill="#FFD700" opacity="0.5"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">FDG uptake</text>
    </svg>`
  },
  {
    id: 'rad-nm-thyroid-scan',
    name: 'Thyroid Scan',
    domain: 'medicine',
    category: 'nuclear-medicine',
    tags: ['thyroid', 'I-123', 'Tc-99m', 'uptake', 'nodule'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="12" ry="20"/>
      <ellipse cx="40" cy="32" rx="12" ry="20"/>
      <path d="M24 12h16"/>
      <ellipse cx="24" cy="32" rx="8" ry="14" fill="#FFD700" opacity="0.4"/>
      <ellipse cx="40" cy="32" rx="8" ry="14" fill="#FFD700" opacity="0.4"/>
      <circle cx="36" cy="28" r="4" fill="#222"/>
      <text x="32" y="58" font-size="4" fill="currentColor" stroke="none">Cold nodule</text>
    </svg>`
  },
  {
    id: 'rad-nm-vq-scan',
    name: 'V/Q Scan',
    domain: 'medicine',
    category: 'nuclear-medicine',
    tags: ['V/Q', 'ventilation', 'perfusion', 'PE', 'lung scan'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="12" ry="18"/>
      <ellipse cx="44" cy="32" rx="12" ry="18"/>
      <ellipse cx="20" cy="32" rx="8" ry="12" fill="#90EE90" opacity="0.5"/>
      <ellipse cx="44" cy="32" rx="8" ry="12" fill="#90EE90" opacity="0.5"/>
      <path d="M44 24c-4 4-4 12 0 16" fill="#222"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">V</text>
      <text x="38" y="58" font-size="4" fill="currentColor" stroke="none">Q defect</text>
    </svg>`
  },
  {
    id: 'rad-nm-muga',
    name: 'MUGA Scan',
    domain: 'medicine',
    category: 'nuclear-medicine',
    tags: ['MUGA', 'gated', 'RVG', 'ejection fraction', 'cardiac'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8c-14 0-24 12-24 24 0 16 24 28 24 28s24-12 24-28c0-12-10-24-24-24z"/>
      <path d="M32 8c-8 0-14 8-14 14 0 10 14 18 14 18s14-8 14-18c0-6-6-14-14-14z" fill="#FFD700" opacity="0.4"/>
      <path d="M32 8c-4 0-8 4-8 8 0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8z" fill="#FFA500" opacity="0.6"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">EF: 55%</text>
    </svg>`
  },
  {
    id: 'rad-nm-renal-scan',
    name: 'Renal Scan',
    domain: 'medicine',
    category: 'nuclear-medicine',
    tags: ['renal', 'MAG3', 'DTPA', 'renogram', 'function'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="32" rx="10" ry="16"/>
      <ellipse cx="44" cy="32" rx="10" ry="16"/>
      <ellipse cx="20" cy="32" rx="6" ry="10" fill="#FFD700" opacity="0.5"/>
      <ellipse cx="44" cy="32" rx="6" ry="10" fill="#FFA500" opacity="0.3"/>
      <path d="M20 48v8"/>
      <path d="M44 48v8"/>
      <path d="M20 56h24"/>
      <text x="14" y="58" font-size="3" fill="currentColor" stroke="none">55%</text>
      <text x="40" y="58" font-size="3" fill="currentColor" stroke="none">45%</text>
    </svg>`
  },
  {
    id: 'rad-nm-gi-bleed',
    name: 'GI Bleeding Scan',
    domain: 'medicine',
    category: 'nuclear-medicine',
    tags: ['GI bleed', 'RBC', 'tagged', 'hemorrhage', 'localization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <path d="M16 24c8 4 24 4 32 0"/>
      <path d="M12 32c10 4 28 4 40 0"/>
      <path d="M16 40c8 4 24 4 32 0"/>
      <circle cx="28" cy="36" r="6" fill="#DC143C"/>
      <path d="M28 42v8" stroke="#DC143C" stroke-width="2"/>
      <text x="8" y="58" font-size="4" fill="#DC143C" stroke="none">Active bleed</text>
    </svg>`
  },
  {
    id: 'rad-nm-parathyroid',
    name: 'Parathyroid Scan',
    domain: 'medicine',
    category: 'nuclear-medicine',
    tags: ['parathyroid', 'sestamibi', 'adenoma', 'SPECT', 'localization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="10" ry="16"/>
      <ellipse cx="40" cy="32" rx="10" ry="16"/>
      <path d="M24 16h16"/>
      <ellipse cx="24" cy="32" rx="6" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="32" rx="6" ry="10" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="40" r="4" fill="#FFD700" stroke="#FFD700"/>
      <text x="8" y="58" font-size="4" fill="#FFD700" stroke="none">Adenoma</text>
    </svg>`
  },

  // ===========================================================================
  // RADIATION SAFETY
  // ===========================================================================
  {
    id: 'rad-safety-symbol',
    name: 'Radiation Symbol',
    domain: 'medicine',
    category: 'radiation-safety',
    tags: ['radiation', 'symbol', 'trefoil', 'warning', 'ionizing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 4a28 28 0 0 1 24.25 14l-16.97 9.8a8 8 0 0 0-7.28-4.2z" fill="#FFD700"/>
      <path d="M56.25 18a28 28 0 0 1 0 28l-16.97-9.8a8 8 0 0 0 0-8.4z" fill="#FFD700"/>
      <path d="M56.25 46a28 28 0 0 1-24.25 14v-19.6a8 8 0 0 0 7.28-4.2z" fill="#FFD700"/>
      <path d="M32 60a28 28 0 0 1-24.25-14l16.97-9.8a8 8 0 0 0 7.28 4.2z" fill="#FFD700"/>
      <path d="M7.75 46a28 28 0 0 1 0-28l16.97 9.8a8 8 0 0 0 0 8.4z" fill="#FFD700"/>
      <path d="M7.75 18a28 28 0 0 1 24.25-14v19.6a8 8 0 0 0-7.28 4.2z" fill="#FFD700"/>
    </svg>`
  },
  {
    id: 'rad-safety-lead-apron',
    name: 'Lead Apron',
    domain: 'medicine',
    category: 'radiation-safety',
    tags: ['lead', 'apron', 'protection', 'shielding', 'PPE'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8c0-2 2-4 4-4h24c2 0 4 2 4 4v4c0 2-2 4-4 4H20c-2 0-4-2-4-4V8z"/>
      <path d="M12 16h40v40c0 4-8 8-20 8s-20-4-20-8V16z" fill="currentColor" opacity="0.3"/>
      <path d="M20 16v40"/>
      <path d="M44 16v40"/>
      <rect x="24" y="24" width="16" height="4" rx="1"/>
      <text x="22" y="44" font-size="5" fill="currentColor" stroke="none">0.5mm</text>
      <text x="28" y="52" font-size="4" fill="currentColor" stroke="none">Pb</text>
    </svg>`
  },
  {
    id: 'rad-safety-dosimeter',
    name: 'Dosimeter Badge',
    domain: 'medicine',
    category: 'radiation-safety',
    tags: ['dosimeter', 'badge', 'TLD', 'monitoring', 'exposure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <rect x="16" y="12" width="32" height="24" rx="2" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="24" r="8"/>
      <path d="M32 16v16"/>
      <path d="M24 24h16"/>
      <rect x="20" y="40" width="24" height="8" rx="1"/>
      <text x="24" y="46" font-size="4" fill="currentColor" stroke="none">ID:001</text>
    </svg>`
  },
  {
    id: 'rad-safety-thyroid-shield',
    name: 'Thyroid Shield',
    domain: 'medicine',
    category: 'radiation-safety',
    tags: ['thyroid', 'shield', 'collar', 'protection', 'lead'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <ellipse cx="32" cy="32" rx="16" ry="10" fill="currentColor" opacity="0.3"/>
      <path d="M16 24c8-4 24-4 32 0"/>
      <path d="M16 40c8 4 24 4 32 0"/>
      <path d="M20 32h24" stroke-dasharray="4 2"/>
      <text x="20" y="36" font-size="5" fill="currentColor" stroke="none">THYROID</text>
    </svg>`
  },
  {
    id: 'rad-safety-exposure-limits',
    name: 'Exposure Limits Chart',
    domain: 'medicine',
    category: 'radiation-safety',
    tags: ['exposure', 'limits', 'dose', 'ALARA', 'regulations'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <path d="M16 48V24"/>
      <path d="M16 48h40"/>
      <rect x="20" y="36" width="8" height="12" fill="#90EE90"/>
      <rect x="32" y="28" width="8" height="20" fill="#FFD700"/>
      <rect x="44" y="20" width="8" height="28" fill="#DC143C"/>
      <text x="20" y="16" font-size="4" fill="currentColor" stroke="none">mSv/yr</text>
      <text x="22" y="44" font-size="3" fill="currentColor" stroke="none">1</text>
      <text x="34" y="36" font-size="3" fill="currentColor" stroke="none">20</text>
      <text x="45" y="28" font-size="3" fill="currentColor" stroke="none">50</text>
    </svg>`
  },

  // ===========================================================================
  // ADVANCED IMAGING & PACS
  // ===========================================================================
  {
    id: 'rad-pacs-workstation',
    name: 'PACS Workstation',
    domain: 'medicine',
    category: 'imaging-systems',
    tags: ['PACS', 'workstation', 'RIS', 'radiology', 'computer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="24" height="20" rx="2"/>
      <rect x="36" y="8" width="24" height="20" rx="2"/>
      <rect x="8" y="12" width="16" height="12" rx="1" fill="currentColor" opacity="0.1"/>
      <rect x="40" y="12" width="16" height="12" rx="1" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="32" width="24" height="16" rx="2"/>
      <path d="M32 48v8"/>
      <path d="M24 56h16"/>
      <ellipse cx="16" cy="18" rx="4" ry="3" fill="#4169E1" opacity="0.5"/>
      <ellipse cx="48" cy="18" rx="4" ry="3" fill="#4169E1" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'rad-3d-reconstruction',
    name: '3D Reconstruction',
    domain: 'medicine',
    category: 'imaging-systems',
    tags: ['3D', 'reconstruction', 'VRT', 'MIP', 'MPR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l20 12v24l-20 12-20-12V20z"/>
      <path d="M32 8v24"/>
      <path d="M12 20l20 12"/>
      <path d="M52 20l-20 12"/>
      <path d="M32 32v24"/>
      <ellipse cx="32" cy="28" rx="8" ry="4" fill="#87CEEB" opacity="0.5"/>
      <path d="M24 28c0 8 4 12 8 12s8-4 8-12" stroke-dasharray="2 2"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">3D VRT</text>
    </svg>`
  },
  {
    id: 'rad-ai-detection',
    name: 'AI Detection',
    domain: 'medicine',
    category: 'imaging-systems',
    tags: ['AI', 'artificial intelligence', 'CAD', 'detection', 'machine learning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="40" rx="2"/>
      <rect x="12" y="12" width="40" height="28" rx="1" fill="currentColor" opacity="0.1"/>
      <circle cx="28" cy="28" r="8" stroke="#DC143C" stroke-width="2"/>
      <path d="M28 20v-4"/>
      <path d="M28 36v4"/>
      <path d="M20 28h-4"/>
      <path d="M36 28h4"/>
      <circle cx="44" cy="20" r="4" fill="#32CD32"/>
      <text x="41" y="22" font-size="6" fill="white" stroke="none">AI</text>
      <rect x="20" y="52" width="24" height="8" rx="2"/>
      <text x="23" y="58" font-size="4" fill="currentColor" stroke="none">Nodule</text>
    </svg>`
  },
  {
    id: 'rad-dicom-transfer',
    name: 'DICOM Transfer',
    domain: 'medicine',
    category: 'imaging-systems',
    tags: ['DICOM', 'transfer', 'network', 'HL7', 'interoperability'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="20" height="24" rx="2"/>
      <rect x="40" y="20" width="20" height="24" rx="2"/>
      <path d="M24 32h16"/>
      <path d="M36 28l4 4-4 4"/>
      <path d="M28 28l-4 4 4 4"/>
      <rect x="8" y="24" width="12" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="44" y="24" width="12" height="8" rx="1" fill="currentColor" opacity="0.2"/>
      <text x="7" y="42" font-size="3" fill="currentColor" stroke="none">DICOM</text>
      <text x="43" y="42" font-size="3" fill="currentColor" stroke="none">PACS</text>
    </svg>`
  },
  {
    id: 'rad-contrast-injector',
    name: 'Contrast Injector',
    domain: 'medicine',
    category: 'equipment',
    tags: ['contrast', 'injector', 'power', 'IV', 'injection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="40" rx="4"/>
      <circle cx="32" cy="24" r="8"/>
      <path d="M32 16v16"/>
      <path d="M24 24h16"/>
      <rect x="20" y="36" width="24" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M20 48h24"/>
      <path d="M28 48v12"/>
      <path d="M36 48v12"/>
      <circle cx="28" cy="60" r="2"/>
      <circle cx="36" cy="60" r="2"/>
      <text x="22" y="42" font-size="4" fill="currentColor" stroke="none">350 HU</text>
    </svg>`
  },
  {
    id: 'rad-bolus-tracking',
    name: 'Bolus Tracking',
    domain: 'medicine',
    category: 'techniques',
    tags: ['bolus', 'tracking', 'timing', 'trigger', 'contrast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="40" rx="2"/>
      <path d="M16 40c0-16 8-24 16-24s16 8 16 24"/>
      <circle cx="32" cy="24" r="4" fill="#DC143C"/>
      <path d="M32 28v-12" stroke="#DC143C" stroke-width="2"/>
      <path d="M20 32h24" stroke-dasharray="2 2"/>
      <text x="36" y="34" font-size="4" fill="#DC143C" stroke="none">Trigger</text>
      <rect x="12" y="52" width="40" height="8" rx="2"/>
      <rect x="16" y="54" width="16" height="4" fill="#4169E1"/>
      <text x="34" y="58" font-size="3" fill="currentColor" stroke="none">100 HU</text>
    </svg>`
  },
  {
    id: 'rad-dual-energy-ct',
    name: 'Dual Energy CT',
    domain: 'medicine',
    category: 'imaging-modalities',
    tags: ['dual energy', 'DECT', 'spectral', 'material decomposition', 'gout'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M32 12c-8 0-16 8-16 20s8 20 16 20" stroke="#4169E1" stroke-width="2"/>
      <path d="M32 12c8 0 16 8 16 20s-8 20-16 20" stroke="#32CD32" stroke-width="2"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <text x="16" y="34" font-size="4" fill="#4169E1" stroke="none">80kV</text>
      <text x="40" y="34" font-size="3" fill="#32CD32" stroke="none">140kV</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">Dual Energy</text>
    </svg>`
  },
  {
    id: 'rad-perfusion-imaging',
    name: 'Perfusion Imaging',
    domain: 'medicine',
    category: 'techniques',
    tags: ['perfusion', 'CBF', 'CBV', 'MTT', 'penumbra'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <path d="M16 32c4-8 12-12 16-12" stroke="#228B22" stroke-width="3"/>
      <path d="M32 20c4 0 12 4 16 12" stroke="#FFD700" stroke-width="3"/>
      <path d="M48 32c-4 8-12 12-16 12" stroke="#DC143C" stroke-width="3"/>
      <path d="M32 44c-4 0-12-4-16-12" stroke="#FF8C00" stroke-width="3"/>
      <circle cx="32" cy="32" r="8" fill="#9370DB" opacity="0.5"/>
      <text x="24" y="12" font-size="3" fill="currentColor" stroke="none">CBF</text>
      <text x="44" y="24" font-size="3" fill="currentColor" stroke="none">CBV</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">MTT</text>
    </svg>`
  },
  {
    id: 'rad-structured-report',
    name: 'Structured Report',
    domain: 'medicine',
    category: 'reporting',
    tags: ['structured', 'report', 'template', 'findings', 'impression'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="2"/>
      <path d="M16 12h32"/>
      <path d="M16 20h24"/>
      <path d="M16 28h28"/>
      <path d="M16 36h20"/>
      <path d="M16 44h32" stroke-dasharray="4 2"/>
      <rect x="16" y="48" width="32" height="8" rx="1" fill="currentColor" opacity="0.1"/>
      <text x="18" y="54" font-size="4" fill="currentColor" stroke="none">IMPRESSION:</text>
      <circle cx="12" cy="12" r="2" fill="#228B22"/>
      <circle cx="12" cy="20" r="2" fill="#228B22"/>
      <circle cx="12" cy="28" r="2" fill="#FFD700"/>
      <circle cx="12" cy="36" r="2" fill="#DC143C"/>
    </svg>`
  },
  {
    id: 'rad-critical-finding',
    name: 'Critical Finding Alert',
    domain: 'medicine',
    category: 'reporting',
    tags: ['critical', 'finding', 'alert', 'communication', 'urgent'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4L4 56h56L32 4z" fill="#DC143C" opacity="0.2"/>
      <path d="M32 4L4 56h56L32 4z"/>
      <path d="M32 20v20" stroke-width="3"/>
      <circle cx="32" cy="48" r="3" fill="currentColor"/>
      <rect x="40" y="8" width="20" height="16" rx="2" fill="#FF4500"/>
      <text x="44" y="18" font-size="5" fill="white" stroke="none">STAT</text>
      <circle cx="56" cy="12" r="4" fill="#FFD700"/>
      <text x="54" y="14" font-size="4" fill="#8B0000" stroke="none">!</text>
    </svg>`
  },
  {
    id: 'rad-measurement-tool',
    name: 'Measurement Tool',
    domain: 'medicine',
    category: 'tools',
    tags: ['measurement', 'ruler', 'caliper', 'dimension', 'size'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="currentColor" opacity="0.05"/>
      <path d="M16 32h32" stroke-width="2"/>
      <path d="M16 28v8"/>
      <path d="M48 28v8"/>
      <path d="M24 30v4"/>
      <path d="M32 30v4"/>
      <path d="M40 30v4"/>
      <circle cx="28" cy="20" r="8" stroke-dasharray="2 2"/>
      <path d="M28 12v16"/>
      <path d="M20 20h16"/>
      <text x="20" y="44" font-size="4" fill="currentColor" stroke="none">2.4 cm</text>
      <text x="20" y="52" font-size="3" fill="currentColor" stroke="none">RECIST: +15%</text>
    </svg>`
  },
  {
    id: 'rad-teleradiology',
    name: 'Teleradiology',
    domain: 'medicine',
    category: 'imaging-systems',
    tags: ['teleradiology', 'remote', 'reading', 'network', 'communication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="20" height="16" rx="2"/>
      <rect x="40" y="24" width="20" height="16" rx="2"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M24 32h-4"/>
      <path d="M44 32h-4"/>
      <path d="M32 24v-8"/>
      <path d="M28 12h8"/>
      <circle cx="14" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="50" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M28 28l8 8"/>
      <path d="M36 28l-8 8"/>
      <text x="10" y="52" font-size="3" fill="currentColor" stroke="none">Hospital</text>
      <text x="42" y="52" font-size="3" fill="currentColor" stroke="none">Remote</text>
    </svg>`
  },
];

export default radiologyIcons;
