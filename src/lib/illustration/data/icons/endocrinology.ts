/**
 * Endocrinology Icon Library
 * Comprehensive SVG icons for endocrine medicine
 *
 * Categories:
 * - Endocrine Glands (pituitary, thyroid, adrenals, pancreas, gonads)
 * - Hormones (insulin, glucagon, thyroid hormones, cortisol, growth hormone)
 * - Diabetes (glucose, devices, complications)
 * - Thyroid Disorders (goiter, nodules, Graves, Hashimoto's)
 * - Adrenal Disorders (Cushing's, Addison's, pheochromocytoma)
 * - Pituitary Disorders (tumors, acromegaly, prolactinoma)
 * - Bone/Calcium Metabolism (osteoporosis, vitamin D, parathyroid)
 */

import type { IconDefinition } from './index';

export const endocrinologyIcons: IconDefinition[] = [
  // ===========================================================================
  // ENDOCRINE GLANDS
  // ===========================================================================
  {
    id: 'endo-pituitary-gland',
    name: 'Pituitary Gland',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['pituitary', 'hypophysis', 'master gland', 'sella turcica', 'anterior', 'posterior'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 24c0-8 8-12 12-12s12 4 12 12" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="14" ry="10"/>
      <line x1="32" y1="22" x2="32" y2="42"/>
      <path d="M32 16v-8"/>
      <text x="18" y="34" font-size="4" fill="currentColor" stroke="none">Ant</text>
      <text x="38" y="34" font-size="4" fill="currentColor" stroke="none">Post</text>
      <text x="18" y="54" font-size="5" fill="currentColor" stroke="none">Pituitary</text>
    </svg>`
  },
  {
    id: 'endo-thyroid-gland',
    name: 'Thyroid Gland',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['thyroid', 'butterfly', 'isthmus', 'lobes', 'trachea', 'neck'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v48" stroke-dasharray="4 2"/>
      <path d="M16 20c-4 8-4 20 4 28 4 4 8 4 12 0" fill="currentColor" opacity="0.2"/>
      <path d="M48 20c4 8 4 20-4 28-4 4-8 4-12 0" fill="currentColor" opacity="0.2"/>
      <path d="M16 20c-4 8-4 20 4 28 4 4 8 4 12 0"/>
      <path d="M48 20c4 8 4 20-4 28-4 4-8 4-12 0"/>
      <path d="M28 32h8"/>
      <text x="6" y="36" font-size="4" fill="currentColor" stroke="none">L</text>
      <text x="54" y="36" font-size="4" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'endo-parathyroid-glands',
    name: 'Parathyroid Glands',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['parathyroid', 'PTH', 'calcium', 'four glands', 'posterior thyroid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16c-6 10-6 24 4 32 4 4 6 4 8 0"/>
      <path d="M44 16c6 10 6 24-4 32-4 4-6 4-8 0"/>
      <circle cx="16" cy="24" r="4" fill="#FFA500" stroke="#FFA500"/>
      <circle cx="16" cy="40" r="4" fill="#FFA500" stroke="#FFA500"/>
      <circle cx="48" cy="24" r="4" fill="#FFA500" stroke="#FFA500"/>
      <circle cx="48" cy="40" r="4" fill="#FFA500" stroke="#FFA500"/>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Parathyroids (4)</text>
    </svg>`
  },
  {
    id: 'endo-adrenal-glands',
    name: 'Adrenal Glands',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['adrenal', 'suprarenal', 'cortex', 'medulla', 'kidney', 'stress'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="40" rx="10" ry="14"/>
      <ellipse cx="44" cy="40" rx="10" ry="14"/>
      <path d="M12 22c2-6 8-10 16-10" fill="currentColor" opacity="0.3"/>
      <path d="M52 22c-2-6-8-10-16-10" fill="currentColor" opacity="0.3"/>
      <path d="M12 22c2-6 8-10 16-10"/>
      <path d="M52 22c-2-6-8-10-16-10"/>
      <text x="14" y="42" font-size="4" fill="currentColor" stroke="none">L</text>
      <text x="40" y="42" font-size="4" fill="currentColor" stroke="none">R</text>
      <text x="16" y="18" font-size="3" fill="currentColor" stroke="none">Adrenal</text>
    </svg>`
  },
  {
    id: 'endo-pancreatic-islets',
    name: 'Pancreatic Islets',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['islets', 'Langerhans', 'beta cells', 'alpha cells', 'pancreas', 'insulin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-8 12-16 24-16s24 8 24 16-12 16-24 16S8 40 8 32z"/>
      <circle cx="24" cy="28" r="5" fill="#4169E1" opacity="0.5"/>
      <circle cx="36" cy="36" r="6" fill="#4169E1" opacity="0.5"/>
      <circle cx="44" cy="26" r="4" fill="#4169E1" opacity="0.5"/>
      <circle cx="18" cy="38" r="4" fill="#4169E1" opacity="0.5"/>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">Islets of Langerhans</text>
    </svg>`
  },
  {
    id: 'endo-ovaries',
    name: 'Ovaries',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['ovary', 'gonad', 'estrogen', 'progesterone', 'follicle', 'female'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="36" rx="10" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="48" cy="36" rx="10" ry="12" fill="currentColor" opacity="0.2"/>
      <ellipse cx="16" cy="36" rx="10" ry="12"/>
      <ellipse cx="48" cy="36" rx="10" ry="12"/>
      <path d="M26 36c4-8 8-8 12 0"/>
      <path d="M32 28v-12"/>
      <circle cx="13" cy="32" r="3" fill="currentColor" opacity="0.4"/>
      <circle cx="51" cy="34" r="3" fill="currentColor" opacity="0.4"/>
      <text x="22" y="58" font-size="5" fill="currentColor" stroke="none">Ovaries</text>
    </svg>`
  },
  {
    id: 'endo-testes',
    name: 'Testes',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['testis', 'gonad', 'testosterone', 'Leydig cells', 'male', 'scrotum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="22" cy="40" rx="10" ry="14" fill="currentColor" opacity="0.2"/>
      <ellipse cx="42" cy="40" rx="10" ry="14" fill="currentColor" opacity="0.2"/>
      <ellipse cx="22" cy="40" rx="10" ry="14"/>
      <ellipse cx="42" cy="40" rx="10" ry="14"/>
      <path d="M22 26v-10c0-4 4-8 10-8s10 4 10 8v10"/>
      <path d="M22 36c2 0 4-2 4-4"/>
      <path d="M42 36c-2 0-4-2-4-4"/>
      <text x="24" y="60" font-size="5" fill="currentColor" stroke="none">Testes</text>
    </svg>`
  },
  {
    id: 'endo-pineal-gland',
    name: 'Pineal Gland',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['pineal', 'epiphysis', 'melatonin', 'circadian', 'brain', 'sleep'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" stroke-dasharray="4 2"/>
      <path d="M32 20c-4 0-8 4-8 8s4 8 8 12c4-4 8-8 8-12s-4-8-8-8z" fill="currentColor" opacity="0.3"/>
      <path d="M32 20c-4 0-8 4-8 8s4 8 8 12c4-4 8-8 8-12s-4-8-8-8z"/>
      <circle cx="32" cy="28" r="2" fill="currentColor"/>
      <path d="M28 44l-4 8"/>
      <path d="M36 44l4 8"/>
      <text x="18" y="58" font-size="5" fill="currentColor" stroke="none">Pineal Gland</text>
    </svg>`
  },
  {
    id: 'endo-hypothalamus',
    name: 'Hypothalamus',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['hypothalamus', 'neuroendocrine', 'releasing hormones', 'brain', 'regulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="20" ry="12" stroke-dasharray="3 2"/>
      <path d="M20 28c4 4 20 4 24 0" fill="currentColor" opacity="0.3"/>
      <path d="M20 28c4 4 20 4 24 0"/>
      <path d="M32 32v8"/>
      <ellipse cx="32" cy="46" rx="8" ry="6"/>
      <path d="M24 46h-8"/>
      <path d="M40 46h8"/>
      <text x="8" y="18" font-size="4" fill="currentColor" stroke="none">Hypothalamus</text>
      <text x="24" y="56" font-size="3" fill="currentColor" stroke="none">Pituitary</text>
    </svg>`
  },
  {
    id: 'endo-thymus',
    name: 'Thymus Gland',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['thymus', 'T cells', 'immune', 'mediastinum', 'thymosin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v48" stroke-dasharray="3 2"/>
      <path d="M20 12c-8 8-8 28 0 40 4 4 8 4 12 0"/>
      <path d="M44 12c8 8 8 28 0 40-4 4-8 4-12 0"/>
      <ellipse cx="24" cy="32" rx="8" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="32" rx="8" ry="16" fill="currentColor" opacity="0.2"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">Thymus</text>
    </svg>`
  },
  {
    id: 'endo-adrenal-cortex',
    name: 'Adrenal Cortex',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['cortex', 'zona', 'glomerulosa', 'fasciculata', 'reticularis', 'steroids'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="#FFD700" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="12" ry="16" fill="#FFA500" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="8" ry="12" fill="#FF6347" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="4" ry="6" fill="currentColor" opacity="0.5"/>
      <text x="44" y="18" font-size="3" fill="currentColor" stroke="none">ZG</text>
      <text x="44" y="28" font-size="3" fill="currentColor" stroke="none">ZF</text>
      <text x="44" y="38" font-size="3" fill="currentColor" stroke="none">ZR</text>
      <text x="44" y="48" font-size="3" fill="currentColor" stroke="none">Med</text>
    </svg>`
  },
  {
    id: 'endo-adrenal-medulla',
    name: 'Adrenal Medulla',
    domain: 'medicine',
    category: 'endocrine-glands',
    tags: ['medulla', 'catecholamines', 'epinephrine', 'norepinephrine', 'chromaffin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="32" cy="32" rx="8" ry="10" fill="#DC143C" opacity="0.4"/>
      <ellipse cx="32" cy="32" rx="8" ry="10"/>
      <path d="M28 28l8 0"/>
      <path d="M32 24v16"/>
      <text x="16" y="54" font-size="4" fill="currentColor" stroke="none">Medulla</text>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">Cortex</text>
    </svg>`
  },

  // ===========================================================================
  // HORMONES
  // ===========================================================================
  {
    id: 'endo-insulin-molecule',
    name: 'Insulin',
    domain: 'medicine',
    category: 'hormones',
    tags: ['insulin', 'peptide', 'beta cell', 'glucose', 'anabolic', 'A chain', 'B chain'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20c4-4 12-4 16 0s12 4 16 0" stroke-width="2"/>
      <path d="M16 32c4-4 12-4 16 0s12 4 16 0" stroke-width="2"/>
      <line x1="24" y1="20" x2="24" y2="32" stroke-dasharray="2 2"/>
      <line x1="40" y1="20" x2="40" y2="32" stroke-dasharray="2 2"/>
      <circle cx="16" cy="20" r="3" fill="#4169E1"/>
      <circle cx="48" cy="20" r="3" fill="#4169E1"/>
      <circle cx="16" cy="32" r="3" fill="#DC143C"/>
      <circle cx="48" cy="32" r="3" fill="#DC143C"/>
      <text x="6" y="24" font-size="4" fill="currentColor" stroke="none">A</text>
      <text x="6" y="36" font-size="4" fill="currentColor" stroke="none">B</text>
      <text x="20" y="50" font-size="5" fill="currentColor" stroke="none">Insulin</text>
    </svg>`
  },
  {
    id: 'endo-glucagon-molecule',
    name: 'Glucagon',
    domain: 'medicine',
    category: 'hormones',
    tags: ['glucagon', 'alpha cell', 'glycogenolysis', 'gluconeogenesis', 'counter-regulatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-10 8-20 20-20s20 10 20 20-8 20-20 20" stroke-width="2"/>
      <circle cx="16" cy="20" r="2" fill="#FFA500"/>
      <circle cx="28" cy="14" r="2" fill="#FFA500"/>
      <circle cx="40" cy="16" r="2" fill="#FFA500"/>
      <circle cx="48" cy="26" r="2" fill="#FFA500"/>
      <circle cx="48" cy="38" r="2" fill="#FFA500"/>
      <circle cx="40" cy="48" r="2" fill="#FFA500"/>
      <circle cx="28" cy="52" r="2" fill="#FFA500"/>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">Glucagon</text>
    </svg>`
  },
  {
    id: 'endo-t3-hormone',
    name: 'T3 (Triiodothyronine)',
    domain: 'medicine',
    category: 'hormones',
    tags: ['T3', 'triiodothyronine', 'thyroid hormone', 'active', 'metabolism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="10"/>
      <circle cx="44" cy="32" r="8"/>
      <line x1="34" y1="32" x2="36" y2="32" stroke-width="2"/>
      <circle cx="14" cy="24" r="3" fill="#8B008B"/>
      <circle cx="14" cy="40" r="3" fill="#8B008B"/>
      <circle cx="52" cy="32" r="3" fill="#8B008B"/>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">T3 (3 Iodines)</text>
      <text x="12" y="10" font-size="3" fill="#8B008B" stroke="none">I</text>
    </svg>`
  },
  {
    id: 'endo-t4-hormone',
    name: 'T4 (Thyroxine)',
    domain: 'medicine',
    category: 'hormones',
    tags: ['T4', 'thyroxine', 'thyroid hormone', 'prohormone', 'levothyroxine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="24" cy="32" r="10"/>
      <circle cx="44" cy="32" r="8"/>
      <line x1="34" y1="32" x2="36" y2="32" stroke-width="2"/>
      <circle cx="14" cy="24" r="3" fill="#8B008B"/>
      <circle cx="14" cy="40" r="3" fill="#8B008B"/>
      <circle cx="52" cy="24" r="3" fill="#8B008B"/>
      <circle cx="52" cy="40" r="3" fill="#8B008B"/>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">T4 (4 Iodines)</text>
    </svg>`
  },
  {
    id: 'endo-tsh-hormone',
    name: 'TSH (Thyroid Stimulating Hormone)',
    domain: 'medicine',
    category: 'hormones',
    tags: ['TSH', 'thyrotropin', 'pituitary', 'thyroid axis', 'feedback'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="12" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="12" ry="8"/>
      <path d="M32 36v8"/>
      <path d="M24 48c0-4 4-4 8-4s8 0 8 4" fill="currentColor" opacity="0.2"/>
      <path d="M24 48c0-4 4-4 8-4s8 0 8 4"/>
      <path d="M28 52l-4 6"/>
      <path d="M36 52l4 6"/>
      <text x="8" y="20" font-size="5" fill="currentColor" stroke="none">TSH</text>
      <text x="26" y="28" font-size="3" fill="currentColor" stroke="none">Pit</text>
    </svg>`
  },
  {
    id: 'endo-cortisol-hormone',
    name: 'Cortisol',
    domain: 'medicine',
    category: 'hormones',
    tags: ['cortisol', 'glucocorticoid', 'stress', 'steroid', 'hydrocortisone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 28h8l4-8h8l4 8h8"/>
      <path d="M20 28v8l4 8h16l4-8v-8"/>
      <circle cx="24" cy="24" r="2" fill="currentColor"/>
      <circle cx="40" cy="24" r="2" fill="currentColor"/>
      <path d="M28 20l-4-8"/>
      <path d="M36 20l4-8"/>
      <text x="16" y="54" font-size="5" fill="currentColor" stroke="none">Cortisol</text>
      <text x="20" y="60" font-size="3" fill="currentColor" stroke="none">(Steroid Ring)</text>
    </svg>`
  },
  {
    id: 'endo-acth-hormone',
    name: 'ACTH',
    domain: 'medicine',
    category: 'hormones',
    tags: ['ACTH', 'corticotropin', 'adrenocorticotropic', 'pituitary', 'cortisol'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="10" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="20" rx="10" ry="8"/>
      <path d="M32 28v8"/>
      <path d="M28 36l8 0"/>
      <path d="M32 36v8"/>
      <ellipse cx="32" cy="50" rx="8" ry="6"/>
      <text x="44" y="22" font-size="4" fill="currentColor" stroke="none">Pit</text>
      <text x="44" y="52" font-size="4" fill="currentColor" stroke="none">Adrenal</text>
      <text x="18" y="10" font-size="5" fill="currentColor" stroke="none">ACTH</text>
    </svg>`
  },
  {
    id: 'endo-growth-hormone',
    name: 'Growth Hormone (GH)',
    domain: 'medicine',
    category: 'hormones',
    tags: ['GH', 'somatotropin', 'growth', 'IGF-1', 'pituitary', 'anabolic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="12" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="12" ry="10"/>
      <path d="M24 32l-8 20"/>
      <path d="M40 32l8 20"/>
      <path d="M32 34v18"/>
      <path d="M20 38l4 8"/>
      <path d="M44 38l-4 8"/>
      <text x="22" y="26" font-size="4" fill="currentColor" stroke="none">GH</text>
      <text x="26" y="60" font-size="3" fill="currentColor" stroke="none">Growth</text>
    </svg>`
  },
  {
    id: 'endo-adh-hormone',
    name: 'ADH (Vasopressin)',
    domain: 'medicine',
    category: 'hormones',
    tags: ['ADH', 'vasopressin', 'antidiuretic', 'water', 'posterior pituitary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="8" ry="6"/>
      <path d="M32 22v10"/>
      <path d="M20 36c0-4 6-4 12-4s12 0 12 4c0 8-6 16-12 16s-12-8-12-16z" fill="currentColor" opacity="0.2"/>
      <path d="M20 36c0-4 6-4 12-4s12 0 12 4c0 8-6 16-12 16s-12-8-12-16z"/>
      <path d="M28 40c2 4 4 4 8 0"/>
      <text x="18" y="10" font-size="4" fill="currentColor" stroke="none">ADH</text>
      <text x="48" y="44" font-size="3" fill="currentColor" stroke="none">H₂O</text>
    </svg>`
  },
  {
    id: 'endo-aldosterone-hormone',
    name: 'Aldosterone',
    domain: 'medicine',
    category: 'hormones',
    tags: ['aldosterone', 'mineralocorticoid', 'sodium', 'potassium', 'RAAS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 24h8l4-8h8l4 8h8"/>
      <path d="M20 24v8l4 8h16l4-8v-8"/>
      <path d="M24 16l-4-8"/>
      <text x="6" y="48" font-size="4" fill="currentColor" stroke="none">Na⁺↑</text>
      <text x="40" y="48" font-size="4" fill="currentColor" stroke="none">K⁺↓</text>
      <text x="12" y="58" font-size="5" fill="currentColor" stroke="none">Aldosterone</text>
    </svg>`
  },
  {
    id: 'endo-pth-hormone',
    name: 'PTH (Parathyroid Hormone)',
    domain: 'medicine',
    category: 'hormones',
    tags: ['PTH', 'parathyroid hormone', 'calcium', 'phosphate', 'bone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="8" fill="#FFA500" opacity="0.4"/>
      <circle cx="32" cy="16" r="8"/>
      <path d="M32 24v12"/>
      <path d="M20 44c0-6 6-8 12-8s12 2 12 8"/>
      <path d="M16 52h32"/>
      <text x="12" y="48" font-size="4" fill="currentColor" stroke="none">Ca²⁺↑</text>
      <text x="22" y="60" font-size="5" fill="currentColor" stroke="none">PTH</text>
    </svg>`
  },
  {
    id: 'endo-sex-hormones',
    name: 'Sex Hormones',
    domain: 'medicine',
    category: 'hormones',
    tags: ['estrogen', 'progesterone', 'testosterone', 'sex steroids', 'gonads'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="10"/>
      <path d="M20 42v12"/>
      <path d="M14 48h12"/>
      <circle cx="44" cy="32" r="10"/>
      <path d="M51 25l6-6"/>
      <path d="M54 19h6"/>
      <path d="M57 16v6"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Estrogen</text>
      <text x="36" y="58" font-size="3" fill="currentColor" stroke="none">Testosterone</text>
    </svg>`
  },

  // ===========================================================================
  // DIABETES
  // ===========================================================================
  {
    id: 'endo-glucose-molecule',
    name: 'Glucose Molecule',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['glucose', 'sugar', 'blood sugar', 'hexose', 'dextrose', 'C6H12O6'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20l12 8 12-8 0 16-12 8-12-8z" fill="currentColor" opacity="0.2"/>
      <path d="M20 20l12 8 12-8 0 16-12 8-12-8z"/>
      <circle cx="20" cy="20" r="3" fill="#DC143C"/>
      <circle cx="32" cy="28" r="3" fill="#DC143C"/>
      <circle cx="44" cy="20" r="3" fill="#DC143C"/>
      <circle cx="44" cy="36" r="3" fill="#DC143C"/>
      <circle cx="32" cy="44" r="3" fill="#DC143C"/>
      <circle cx="20" cy="36" r="3" fill="#DC143C"/>
      <text x="16" y="58" font-size="5" fill="currentColor" stroke="none">Glucose</text>
    </svg>`
  },
  {
    id: 'endo-insulin-action',
    name: 'Insulin Action on Cell',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['insulin receptor', 'glucose uptake', 'GLUT4', 'cell membrane', 'signaling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="32" rx="4"/>
      <path d="M24 20v-8"/>
      <circle cx="24" cy="8" r="4" fill="#4169E1"/>
      <path d="M24 20c0 4 4 8 4 12"/>
      <circle cx="40" cy="8" r="3" fill="#DC143C"/>
      <path d="M40 11v6"/>
      <circle cx="44" cy="14" r="3" fill="#DC143C"/>
      <path d="M44 17v6"/>
      <circle cx="40" cy="32" r="3" fill="#DC143C"/>
      <text x="10" y="40" font-size="4" fill="currentColor" stroke="none">Cell</text>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Insulin + Receptor = Glucose Entry</text>
    </svg>`
  },
  {
    id: 'endo-beta-cells',
    name: 'Pancreatic Beta Cells',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['beta cell', 'islet', 'insulin secretion', 'granules', 'pancreas'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="20"/>
      <circle cx="28" cy="26" r="3" fill="#4169E1"/>
      <circle cx="36" cy="28" r="3" fill="#4169E1"/>
      <circle cx="30" cy="36" r="3" fill="#4169E1"/>
      <circle cx="38" cy="34" r="3" fill="#4169E1"/>
      <circle cx="26" cy="32" r="2" fill="#4169E1"/>
      <ellipse cx="32" cy="40" rx="6" ry="4"/>
      <text x="18" y="54" font-size="4" fill="currentColor" stroke="none">Beta Cell</text>
      <text x="48" y="30" font-size="3" fill="#4169E1" stroke="none">Insulin</text>
    </svg>`
  },
  {
    id: 'endo-glucometer',
    name: 'Glucometer',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['glucometer', 'blood glucose', 'finger stick', 'meter', 'SMBG'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="16" y="8" width="32" height="48" rx="4"/>
      <rect x="20" y="14" width="24" height="14" rx="2"/>
      <text x="24" y="26" font-size="8" fill="currentColor" stroke="none">126</text>
      <circle cx="32" cy="42" r="6"/>
      <rect x="28" y="2" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <text x="22" y="58" font-size="3" fill="currentColor" stroke="none">mg/dL</text>
    </svg>`
  },
  {
    id: 'endo-insulin-pump',
    name: 'Insulin Pump',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['insulin pump', 'CSII', 'continuous', 'infusion', 'basal', 'bolus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="28" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="12" width="28" height="40" rx="4"/>
      <rect x="12" y="16" width="20" height="12" rx="1"/>
      <circle cx="16" cy="40" r="3"/>
      <circle cx="28" cy="40" r="3"/>
      <path d="M36 32h12"/>
      <path d="M48 32v16"/>
      <circle cx="48" cy="52" r="4"/>
      <text x="14" y="26" font-size="4" fill="currentColor" stroke="none">2.5U</text>
      <text x="42" y="58" font-size="3" fill="currentColor" stroke="none">Site</text>
    </svg>`
  },
  {
    id: 'endo-cgm-device',
    name: 'Continuous Glucose Monitor',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['CGM', 'continuous glucose', 'sensor', 'interstitial', 'Dexcom', 'Libre'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="16" ry="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="20" rx="16" ry="12"/>
      <path d="M32 32v8"/>
      <circle cx="32" cy="44" r="4"/>
      <path d="M20 18c4 4 8 4 12 0s8-4 12 0"/>
      <path d="M10 52h44"/>
      <path d="M14 48v8"/>
      <path d="M24 46v10"/>
      <path d="M34 44v12"/>
      <path d="M44 46v10"/>
      <path d="M54 48v8"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">24h Trend</text>
    </svg>`
  },
  {
    id: 'endo-diabetic-retinopathy',
    name: 'Diabetic Retinopathy',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['retinopathy', 'eye', 'microaneurysm', 'hemorrhage', 'neovascularization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="22"/>
      <circle cx="32" cy="32" r="8" fill="currentColor"/>
      <circle cx="20" cy="24" r="2" fill="#DC143C"/>
      <circle cx="44" cy="28" r="2" fill="#DC143C"/>
      <circle cx="24" cy="42" r="2" fill="#DC143C"/>
      <path d="M40 38c4 4 8 4 8 8" stroke="#DC143C"/>
      <circle cx="18" cy="36" r="1" fill="#DC143C"/>
      <circle cx="46" cy="40" r="1" fill="#DC143C"/>
      <text x="6" y="58" font-size="4" fill="currentColor" stroke="none">Diabetic Retinopathy</text>
    </svg>`
  },
  {
    id: 'endo-diabetic-nephropathy',
    name: 'Diabetic Nephropathy',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['nephropathy', 'kidney', 'proteinuria', 'GFR', 'CKD', 'microalbuminuria'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16c-8 8-8 32 0 40 4 4 8 0 12-8 4 8 8 12 12 8 8-8 8-32 0-40-4-4-8 0-12 8-4-8-8-12-12-8z" fill="currentColor" opacity="0.2"/>
      <path d="M20 16c-8 8-8 32 0 40 4 4 8 0 12-8 4 8 8 12 12 8 8-8 8-32 0-40-4-4-8 0-12 8-4-8-8-12-12-8z"/>
      <circle cx="28" cy="28" r="3" fill="#DC143C" opacity="0.5"/>
      <circle cx="36" cy="36" r="3" fill="#DC143C" opacity="0.5"/>
      <text x="6" y="60" font-size="4" fill="currentColor" stroke="none">Diabetic Nephropathy</text>
    </svg>`
  },
  {
    id: 'endo-diabetic-neuropathy',
    name: 'Diabetic Neuropathy',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['neuropathy', 'nerve', 'peripheral', 'sensory', 'autonomic', 'numbness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v48" stroke-width="3"/>
      <path d="M32 16l-12 8"/>
      <path d="M32 16l12 8"/>
      <path d="M32 28l-16 10"/>
      <path d="M32 28l16 10"/>
      <path d="M32 40l-14 12"/>
      <path d="M32 40l14 12"/>
      <circle cx="20" cy="24" r="2" fill="#FFA500"/>
      <circle cx="44" cy="24" r="2" fill="#FFA500"/>
      <circle cx="16" cy="38" r="2" fill="#FFA500"/>
      <circle cx="48" cy="38" r="2" fill="#FFA500"/>
      <text x="6" y="60" font-size="4" fill="currentColor" stroke="none">Diabetic Neuropathy</text>
    </svg>`
  },
  {
    id: 'endo-diabetic-foot',
    name: 'Diabetic Foot',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['diabetic foot', 'ulcer', 'wound', 'amputation', 'Charcot', 'neuropathy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20c0-4 4-8 8-8h16c4 0 8 4 8 8v24c0 8-6 16-16 16s-16-8-16-16V20z" fill="currentColor" opacity="0.1"/>
      <path d="M16 20c0-4 4-8 8-8h16c4 0 8 4 8 8v24c0 8-6 16-16 16s-16-8-16-16V20z"/>
      <ellipse cx="28" cy="44" rx="4" ry="6" fill="#DC143C" opacity="0.5"/>
      <path d="M20 28h8"/>
      <path d="M36 28h8"/>
      <circle cx="32" cy="20" r="2"/>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">Diabetic Foot Ulcer</text>
    </svg>`
  },
  {
    id: 'endo-hba1c',
    name: 'HbA1c Test',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['HbA1c', 'glycated hemoglobin', 'A1C', 'glycemic control', '3 month average'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16" fill="#DC143C" opacity="0.3"/>
      <circle cx="32" cy="28" r="16"/>
      <circle cx="26" cy="24" r="3" fill="#FFD700"/>
      <circle cx="38" cy="26" r="3" fill="#FFD700"/>
      <circle cx="32" cy="34" r="3" fill="#FFD700"/>
      <text x="24" y="28" font-size="4" fill="currentColor" stroke="none">Hb</text>
      <rect x="16" y="48" width="32" height="8" rx="2"/>
      <text x="20" y="54" font-size="5" fill="currentColor" stroke="none">7.2%</text>
      <text x="16" y="62" font-size="3" fill="currentColor" stroke="none">3-month average</text>
    </svg>`
  },
  {
    id: 'endo-dka',
    name: 'Diabetic Ketoacidosis',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['DKA', 'ketoacidosis', 'ketones', 'acidosis', 'hyperglycemia', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l16 24-16 24-16-24z" fill="#FFA500" opacity="0.3"/>
      <path d="M32 8l16 24-16 24-16-24z"/>
      <text x="26" y="34" font-size="10" fill="currentColor" stroke="none">!</text>
      <text x="12" y="50" font-size="4" fill="currentColor" stroke="none">Glucose↑↑</text>
      <text x="12" y="56" font-size="4" fill="currentColor" stroke="none">Ketones↑</text>
      <text x="12" y="62" font-size="4" fill="currentColor" stroke="none">pH↓</text>
    </svg>`
  },
  {
    id: 'endo-hypoglycemia',
    name: 'Hypoglycemia',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['hypoglycemia', 'low blood sugar', 'insulin reaction', 'glucagon', 'glucose'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16" fill="#4169E1" opacity="0.2"/>
      <circle cx="32" cy="28" r="16"/>
      <path d="M24 32l16-8"/>
      <text x="26" y="26" font-size="6" fill="currentColor" stroke="none">↓</text>
      <rect x="16" y="48" width="32" height="8" rx="2"/>
      <text x="20" y="54" font-size="5" fill="#DC143C" stroke="none">&lt;70</text>
      <text x="18" y="62" font-size="3" fill="currentColor" stroke="none">mg/dL - Low!</text>
    </svg>`
  },
  {
    id: 'endo-insulin-syringe',
    name: 'Insulin Syringe',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['syringe', 'injection', 'subcutaneous', 'insulin pen', 'needle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="26" width="40" height="12" rx="2"/>
      <path d="M48 32h10"/>
      <path d="M58 28v8"/>
      <rect x="12" y="30" width="32" height="4" fill="currentColor" opacity="0.3"/>
      <path d="M8 32h-4"/>
      <path d="M12 22v-6h4v6"/>
      <line x1="20" y1="26" x2="20" y2="38"/>
      <line x1="28" y1="26" x2="28" y2="38"/>
      <line x1="36" y1="26" x2="36" y2="38"/>
      <text x="16" y="50" font-size="4" fill="currentColor" stroke="none">100 Units/mL</text>
    </svg>`
  },
  {
    id: 'endo-type1-diabetes',
    name: 'Type 1 Diabetes',
    domain: 'medicine',
    category: 'diabetes',
    tags: ['type 1', 'T1DM', 'autoimmune', 'insulin dependent', 'juvenile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16"/>
      <path d="M24 24l16 8"/>
      <path d="M24 32l16-8"/>
      <circle cx="26" cy="24" r="3" fill="#DC143C"/>
      <circle cx="38" cy="24" r="3" fill="#DC143C"/>
      <circle cx="26" cy="32" r="3" fill="#DC143C"/>
      <circle cx="38" cy="32" r="3" fill="#DC143C"/>
      <text x="28" y="28" font-size="6" fill="currentColor" stroke="none">1</text>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">Type 1 Diabetes</text>
      <text x="12" y="60" font-size="3" fill="currentColor" stroke="none">Autoimmune Beta Cell Loss</text>
    </svg>`
  },

  // ===========================================================================
  // THYROID DISORDERS
  // ===========================================================================
  {
    id: 'endo-thyroid-anatomy-detail',
    name: 'Thyroid Anatomy Detailed',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['thyroid', 'anatomy', 'lobes', 'isthmus', 'pyramidal lobe', 'trachea'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v56" stroke-dasharray="4 2"/>
      <path d="M12 16c-4 10-4 24 4 32 4 4 10 4 16-2"/>
      <path d="M52 16c4 10 4 24-4 32-4 4-10 4-16-2"/>
      <ellipse cx="20" cy="32" rx="10" ry="18" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="32" rx="10" ry="18" fill="currentColor" opacity="0.2"/>
      <path d="M30 30h4" stroke-width="2"/>
      <path d="M32 8v8"/>
      <text x="6" y="34" font-size="4" fill="currentColor" stroke="none">R</text>
      <text x="54" y="34" font-size="4" fill="currentColor" stroke="none">L</text>
      <text x="20" y="58" font-size="3" fill="currentColor" stroke="none">Isthmus</text>
    </svg>`
  },
  {
    id: 'endo-goiter',
    name: 'Goiter',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['goiter', 'enlarged thyroid', 'diffuse', 'multinodular', 'iodine deficiency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v56" stroke-dasharray="4 2"/>
      <path d="M8 12c-6 14-6 32 6 40 6 4 12 4 18-4"/>
      <path d="M56 12c6 14 6 32-6 40-6 4-12 4-18-4"/>
      <ellipse cx="18" cy="32" rx="14" ry="22" fill="currentColor" opacity="0.3"/>
      <ellipse cx="46" cy="32" rx="14" ry="22" fill="currentColor" opacity="0.3"/>
      <path d="M32 48c-4 4-8 4-12 0"/>
      <text x="20" y="58" font-size="5" fill="currentColor" stroke="none">Goiter</text>
    </svg>`
  },
  {
    id: 'endo-thyroid-nodule',
    name: 'Thyroid Nodule',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['nodule', 'thyroid nodule', 'TI-RADS', 'cold', 'hot', 'FNA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-4 8-4 20 4 28 4 4 8 4 12 0"/>
      <path d="M48 16c4 8 4 20-4 28-4 4-8 4-12 0"/>
      <ellipse cx="20" cy="32" rx="10" ry="16"/>
      <ellipse cx="44" cy="32" rx="10" ry="16"/>
      <circle cx="38" cy="28" r="6" fill="#FFA500" opacity="0.6"/>
      <circle cx="38" cy="28" r="6"/>
      <text x="36" y="30" font-size="4" fill="currentColor" stroke="none">N</text>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">Thyroid Nodule</text>
    </svg>`
  },
  {
    id: 'endo-graves-disease',
    name: 'Graves Disease (Exophthalmos)',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['Graves', 'exophthalmos', 'proptosis', 'hyperthyroid', 'TRAb', 'ophthalmopathy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16"/>
      <ellipse cx="24" cy="22" rx="6" ry="8" fill="white"/>
      <ellipse cx="40" cy="22" rx="6" ry="8" fill="white"/>
      <circle cx="24" cy="22" r="3" fill="currentColor"/>
      <circle cx="40" cy="22" r="3" fill="currentColor"/>
      <path d="M20 12c-2-4-1-6 2-6"/>
      <path d="M44 12c2-4 1-6-2-6"/>
      <path d="M28 34c2 2 6 2 8 0"/>
      <text x="10" y="50" font-size="4" fill="currentColor" stroke="none">Graves Disease</text>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">Exophthalmos</text>
    </svg>`
  },
  {
    id: 'endo-hashimotos',
    name: 'Hashimotos Thyroiditis',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['Hashimoto', 'autoimmune thyroiditis', 'hypothyroid', 'TPO antibodies', 'lymphocytic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-4 8-4 20 4 28 4 4 8 4 12 0"/>
      <path d="M48 16c4 8 4 20-4 28-4 4-8 4-12 0"/>
      <ellipse cx="20" cy="32" rx="10" ry="16" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="10" ry="16" fill="currentColor" opacity="0.3"/>
      <circle cx="18" cy="26" r="2" fill="#DC143C"/>
      <circle cx="24" cy="34" r="2" fill="#DC143C"/>
      <circle cx="16" cy="38" r="2" fill="#DC143C"/>
      <circle cx="42" cy="28" r="2" fill="#DC143C"/>
      <circle cx="48" cy="36" r="2" fill="#DC143C"/>
      <text x="10" y="54" font-size="4" fill="currentColor" stroke="none">Hashimoto's</text>
      <text x="30" y="60" font-size="3" fill="#DC143C" stroke="none">Lymphocytes</text>
    </svg>`
  },
  {
    id: 'endo-thyroid-cancer',
    name: 'Thyroid Cancer',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['thyroid cancer', 'papillary', 'follicular', 'medullary', 'anaplastic', 'malignant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-4 8-4 20 4 28 4 4 8 4 12 0"/>
      <path d="M48 16c4 8 4 20-4 28-4 4-8 4-12 0"/>
      <ellipse cx="20" cy="32" rx="10" ry="16"/>
      <ellipse cx="44" cy="32" rx="10" ry="16"/>
      <path d="M36 24c4-2 8 2 10 8s-2 10-6 10-8-6-8-10 2-6 4-8z" fill="#8B0000" opacity="0.6"/>
      <path d="M40 32c2 2 4 1 4-1s-2-4-4-4"/>
      <text x="10" y="56" font-size="4" fill="currentColor" stroke="none">Thyroid Cancer</text>
    </svg>`
  },
  {
    id: 'endo-thyroid-scan',
    name: 'Thyroid Uptake Scan',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['thyroid scan', 'uptake', 'I-123', 'nuclear', 'hot nodule', 'cold nodule'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M20 20c-4 6-4 18 2 24 2 2 6 2 10-2"/>
      <path d="M44 20c4 6 4 18-2 24-2 2-6 2-10-2"/>
      <ellipse cx="22" cy="32" rx="8" ry="12" fill="#00FF00" opacity="0.4"/>
      <ellipse cx="42" cy="32" rx="8" ry="12" fill="#00FF00" opacity="0.4"/>
      <circle cx="38" cy="28" r="5" fill="#FFD700"/>
      <text x="36" y="30" font-size="3" fill="currentColor" stroke="none">Hot</text>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">I-123 Scan</text>
    </svg>`
  },
  {
    id: 'endo-thyroid-fna',
    name: 'Thyroid FNA',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['FNA', 'fine needle aspiration', 'biopsy', 'Bethesda', 'cytology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="16" ry="12"/>
      <circle cx="36" cy="34" r="5" fill="currentColor" opacity="0.3"/>
      <path d="M48 8l-12 22"/>
      <path d="M48 8l4 2-2 4z" fill="currentColor"/>
      <rect x="52" y="4" width="8" height="16" rx="1"/>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">Thyroid FNA</text>
      <text x="10" y="60" font-size="3" fill="currentColor" stroke="none">US-Guided Biopsy</text>
    </svg>`
  },
  {
    id: 'endo-hyperthyroidism',
    name: 'Hyperthyroidism',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['hyperthyroid', 'thyrotoxicosis', 'high T4', 'low TSH', 'symptoms'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 20c-4 8-4 16 4 24 4 4 8 4 12 0"/>
      <path d="M48 20c4 8 4 16-4 24-4 4-8 4-12 0"/>
      <ellipse cx="20" cy="32" rx="10" ry="14" fill="#DC143C" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="10" ry="14" fill="#DC143C" opacity="0.3"/>
      <path d="M10 12l4 8"/>
      <path d="M54 12l-4 8"/>
      <path d="M28 8l4 8"/>
      <path d="M36 8l-4 8"/>
      <text x="8" y="54" font-size="4" fill="currentColor" stroke="none">Hyperthyroid</text>
      <text x="8" y="60" font-size="3" fill="#DC143C" stroke="none">T4↑ T3↑ TSH↓</text>
    </svg>`
  },
  {
    id: 'endo-hypothyroidism',
    name: 'Hypothyroidism',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['hypothyroid', 'myxedema', 'low T4', 'high TSH', 'levothyroxine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 24c-2 6-2 12 2 18 2 2 6 2 10 0"/>
      <path d="M44 24c2 6 2 12-2 18-2 2-6 2-10 0"/>
      <ellipse cx="24" cy="34" rx="8" ry="10" fill="#4169E1" opacity="0.2"/>
      <ellipse cx="40" cy="34" rx="8" ry="10" fill="#4169E1" opacity="0.2"/>
      <path d="M32 8v12" stroke-dasharray="2 2"/>
      <text x="8" y="54" font-size="4" fill="currentColor" stroke="none">Hypothyroid</text>
      <text x="8" y="60" font-size="3" fill="#4169E1" stroke="none">T4↓ T3↓ TSH↑</text>
    </svg>`
  },
  {
    id: 'endo-thyroid-storm',
    name: 'Thyroid Storm',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['thyroid storm', 'thyrotoxic crisis', 'emergency', 'hyperpyrexia', 'tachycardia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l16 24-16 24-16-24z" fill="#DC143C" opacity="0.3"/>
      <path d="M32 8l16 24-16 24-16-24z"/>
      <path d="M28 24l8 0 -4 8 6 0 -10 12 2-8-6 0z" fill="#FFD700"/>
      <text x="10" y="54" font-size="4" fill="currentColor" stroke="none">Thyroid Storm</text>
      <text x="20" y="60" font-size="3" fill="#DC143C" stroke="none">EMERGENCY</text>
    </svg>`
  },
  {
    id: 'endo-subacute-thyroiditis',
    name: 'Subacute Thyroiditis',
    domain: 'medicine',
    category: 'thyroid',
    tags: ['subacute', 'de Quervain', 'painful thyroid', 'viral', 'granulomatous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-4 8-4 20 4 28 4 4 8 4 12 0"/>
      <path d="M48 16c4 8 4 20-4 28-4 4-8 4-12 0"/>
      <ellipse cx="20" cy="32" rx="10" ry="16" fill="#FFA500" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="10" ry="16" fill="#FFA500" opacity="0.3"/>
      <path d="M8 24l6 4"/>
      <path d="M8 32l6 0"/>
      <path d="M8 40l6-4"/>
      <path d="M56 24l-6 4"/>
      <path d="M56 32l-6 0"/>
      <path d="M56 40l-6-4"/>
      <text x="6" y="56" font-size="3" fill="currentColor" stroke="none">Subacute Thyroiditis</text>
      <text x="22" y="62" font-size="3" fill="#FFA500" stroke="none">Painful</text>
    </svg>`
  },

  // ===========================================================================
  // ADRENAL DISORDERS
  // ===========================================================================
  {
    id: 'endo-adrenal-anatomy-detail',
    name: 'Adrenal Anatomy Detailed',
    domain: 'medicine',
    category: 'adrenal',
    tags: ['adrenal', 'anatomy', 'cortex', 'medulla', 'zones', 'suprarenal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="14" ry="18"/>
      <path d="M18 18c4-8 12-10 14-10s10 2 14 10" fill="currentColor" opacity="0.4"/>
      <path d="M18 18c4-8 12-10 14-10s10 2 14 10"/>
      <ellipse cx="32" cy="40" rx="10" ry="14" fill="#FFD700" opacity="0.3"/>
      <ellipse cx="32" cy="40" rx="6" ry="10" fill="#FFA500" opacity="0.3"/>
      <ellipse cx="32" cy="40" rx="3" ry="6" fill="#DC143C" opacity="0.5"/>
      <text x="48" y="24" font-size="3" fill="currentColor" stroke="none">Capsule</text>
      <text x="48" y="34" font-size="3" fill="currentColor" stroke="none">Cortex</text>
      <text x="48" y="46" font-size="3" fill="currentColor" stroke="none">Medulla</text>
    </svg>`
  },
  {
    id: 'endo-cushings-features',
    name: 'Cushings Syndrome Features',
    domain: 'medicine',
    category: 'adrenal',
    tags: ['Cushing', 'hypercortisolism', 'moon face', 'buffalo hump', 'striae', 'obesity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="14" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="20" r="14"/>
      <circle cx="27" cy="18" r="2"/>
      <circle cx="37" cy="18" r="2"/>
      <path d="M28 26c2 2 6 2 8 0"/>
      <ellipse cx="32" cy="46" rx="12" ry="10" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="46" rx="12" ry="10"/>
      <path d="M24 38h16"/>
      <path d="M20 44l4 6"/>
      <path d="M44 44l-4 6"/>
      <text x="6" y="22" font-size="3" fill="currentColor" stroke="none">Moon</text>
      <text x="6" y="28" font-size="3" fill="currentColor" stroke="none">Face</text>
      <text x="48" y="50" font-size="3" fill="currentColor" stroke="none">Truncal</text>
      <text x="48" y="56" font-size="3" fill="currentColor" stroke="none">Obesity</text>
    </svg>`
  },
  {
    id: 'endo-addisons-disease',
    name: 'Addisons Disease',
    domain: 'medicine',
    category: 'adrenal',
    tags: ['Addison', 'adrenal insufficiency', 'primary', 'hyperpigmentation', 'autoimmune'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="36" rx="8" ry="12" stroke-dasharray="3 2"/>
      <ellipse cx="44" cy="36" rx="8" ry="12" stroke-dasharray="3 2"/>
      <path d="M14 20c2-6 4-8 6-8"/>
      <path d="M50 20c-2-6-4-8-6-8"/>
      <circle cx="32" cy="18" r="8"/>
      <path d="M28 16c2 2 6 2 8 0"/>
      <ellipse cx="32" cy="18" rx="8" ry="8" fill="#8B4513" opacity="0.3"/>
      <text x="6" y="52" font-size="3" fill="currentColor" stroke="none">Addison's Disease</text>
      <text x="6" y="58" font-size="3" fill="currentColor" stroke="none">Adrenal Atrophy</text>
      <text x="46" y="20" font-size="3" fill="currentColor" stroke="none">Hyper-</text>
      <text x="46" y="26" font-size="3" fill="currentColor" stroke="none">pigment</text>
    </svg>`
  },
  {
    id: 'endo-pheochromocytoma',
    name: 'Pheochromocytoma',
    domain: 'medicine',
    category: 'adrenal',
    tags: ['pheochromocytoma', 'catecholamines', 'hypertension', 'paroxysmal', 'medulla tumor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="12" ry="16"/>
      <path d="M20 16c4-8 8-8 12-8s8 0 12 8"/>
      <circle cx="32" cy="36" r="8" fill="#DC143C" opacity="0.5"/>
      <circle cx="32" cy="36" r="8"/>
      <path d="M8 20l8 4"/>
      <path d="M8 28l8 0"/>
      <path d="M8 36l8-4"/>
      <path d="M56 20l-8 4"/>
      <path d="M56 28l-8 0"/>
      <path d="M56 36l-8-4"/>
      <text x="8" y="52" font-size="3" fill="currentColor" stroke="none">Pheochromocytoma</text>
      <text x="8" y="58" font-size="3" fill="#DC143C" stroke="none">Catecholamine surge</text>
    </svg>`
  },
  {
    id: 'endo-aldosteronoma',
    name: 'Aldosteronoma (Conns)',
    domain: 'medicine',
    category: 'adrenal',
    tags: ['aldosteronoma', 'Conn syndrome', 'primary aldosteronism', 'hypokalemia', 'hypertension'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="12" ry="16"/>
      <path d="M20 16c4-8 8-8 12-8s8 0 12 8"/>
      <ellipse cx="32" cy="28" rx="6" ry="4" fill="#FFD700" opacity="0.6"/>
      <ellipse cx="32" cy="28" rx="6" ry="4"/>
      <text x="10" y="52" font-size="3" fill="currentColor" stroke="none">Conn's Syndrome</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Na↑ K↓ BP↑ Aldo↑</text>
      <text x="40" y="28" font-size="3" fill="currentColor" stroke="none">Adenoma</text>
    </svg>`
  },
  {
    id: 'endo-adrenal-insufficiency',
    name: 'Adrenal Insufficiency',
    domain: 'medicine',
    category: 'adrenal',
    tags: ['adrenal insufficiency', 'crisis', 'cortisol deficiency', 'secondary', 'tertiary'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="36" rx="8" ry="12" stroke-dasharray="3 2"/>
      <ellipse cx="44" cy="36" rx="8" ry="12" stroke-dasharray="3 2"/>
      <path d="M14 20c2-6 4-8 6-8" stroke-dasharray="2 2"/>
      <path d="M50 20c-2-6-4-8-6-8" stroke-dasharray="2 2"/>
      <path d="M32 8l8 12-8 12-8-12z" fill="#FFA500" opacity="0.3"/>
      <text x="28" y="22" font-size="6" fill="currentColor" stroke="none">!</text>
      <text x="6" y="52" font-size="3" fill="currentColor" stroke="none">Adrenal Insufficiency</text>
      <text x="6" y="58" font-size="3" fill="currentColor" stroke="none">Low Cortisol + Aldosterone</text>
    </svg>`
  },
  {
    id: 'endo-adrenal-incidentaloma',
    name: 'Adrenal Incidentaloma',
    domain: 'medicine',
    category: 'adrenal',
    tags: ['incidentaloma', 'adrenal mass', 'CT finding', 'workup', 'Hounsfield'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="14" ry="18"/>
      <path d="M18 18c4-8 12-10 14-10s10 2 14 10"/>
      <ellipse cx="40" cy="36" rx="8" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="40" cy="36" rx="8" ry="6"/>
      <text x="44" y="38" font-size="4" fill="currentColor" stroke="none">?</text>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Incidentaloma</text>
      <text x="32" y="58" font-size="3" fill="currentColor" stroke="none">(Found on CT)</text>
    </svg>`
  },
  {
    id: 'endo-adrenal-hyperplasia',
    name: 'Congenital Adrenal Hyperplasia',
    domain: 'medicine',
    category: 'adrenal',
    tags: ['CAH', 'congenital adrenal hyperplasia', '21-hydroxylase', 'virilization', 'ambiguous'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="36" rx="10" ry="14" fill="currentColor" opacity="0.3"/>
      <ellipse cx="44" cy="36" rx="10" ry="14" fill="currentColor" opacity="0.3"/>
      <ellipse cx="20" cy="36" rx="10" ry="14"/>
      <ellipse cx="44" cy="36" rx="10" ry="14"/>
      <path d="M12 18c4-8 6-10 8-10"/>
      <path d="M52 18c-4-8-6-10-8-10"/>
      <text x="6" y="52" font-size="3" fill="currentColor" stroke="none">CAH - Bilateral</text>
      <text x="6" y="58" font-size="3" fill="currentColor" stroke="none">Adrenal Hyperplasia</text>
    </svg>`
  },
  {
    id: 'endo-cosyntropin-test',
    name: 'Cosyntropin (ACTH) Stimulation Test',
    domain: 'medicine',
    category: 'adrenal',
    tags: ['cosyntropin', 'ACTH stim', 'cortisol', 'adrenal function', 'stimulation test'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <path d="M8 32h48"/>
      <path d="M16 28l8-8 8 4 8-4 8 8"/>
      <path d="M16 42l8 2 8 6 8 4 8-4" stroke="#228B22"/>
      <circle cx="16" cy="28" r="2" fill="currentColor"/>
      <circle cx="24" cy="20" r="2" fill="currentColor"/>
      <circle cx="32" cy="24" r="2" fill="currentColor"/>
      <text x="12" y="56" font-size="3" fill="currentColor" stroke="none">ACTH Stim Test</text>
      <text x="10" y="12" font-size="3" fill="currentColor" stroke="none">Cortisol</text>
      <text x="44" y="12" font-size="3" fill="currentColor" stroke="none">Time</text>
    </svg>`
  },
  {
    id: 'endo-dexamethasone-test',
    name: 'Dexamethasone Suppression Test',
    domain: 'medicine',
    category: 'adrenal',
    tags: ['dexamethasone', 'DST', 'Cushing', 'suppression', 'cortisol', 'screening'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <path d="M8 32h48"/>
      <path d="M16 24l16 0"/>
      <path d="M32 24l16 12" stroke="#DC143C"/>
      <path d="M32 24l16-4" stroke="#228B22"/>
      <circle cx="16" cy="24" r="2" fill="currentColor"/>
      <circle cx="32" cy="24" r="2" fill="currentColor"/>
      <text x="44" y="42" font-size="3" fill="#DC143C" stroke="none">No suppress</text>
      <text x="46" y="22" font-size="3" fill="#228B22" stroke="none">Suppressed</text>
      <text x="10" y="56" font-size="3" fill="currentColor" stroke="none">Dex Suppression Test</text>
    </svg>`
  },

  // ===========================================================================
  // PITUITARY DISORDERS
  // ===========================================================================
  {
    id: 'endo-pituitary-tumor',
    name: 'Pituitary Tumor',
    domain: 'medicine',
    category: 'pituitary',
    tags: ['pituitary tumor', 'adenoma', 'macroadenoma', 'microadenoma', 'sellar mass'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 28c0-8 8-16 16-16s16 8 16 16" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="36" rx="14" ry="10"/>
      <circle cx="32" cy="36" r="8" fill="#DC143C" opacity="0.4"/>
      <circle cx="32" cy="36" r="8"/>
      <path d="M32 46v10"/>
      <path d="M24 52h16"/>
      <text x="42" y="38" font-size="3" fill="currentColor" stroke="none">Adenoma</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Pituitary Tumor</text>
    </svg>`
  },
  {
    id: 'endo-acromegaly',
    name: 'Acromegaly',
    domain: 'medicine',
    category: 'pituitary',
    tags: ['acromegaly', 'GH excess', 'IGF-1', 'growth hormone', 'enlarged features'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="22" rx="16" ry="14"/>
      <path d="M24 26c0 8 4 12 8 14s8-6 8-14"/>
      <circle cx="26" cy="18" r="2"/>
      <circle cx="38" cy="18" r="2"/>
      <path d="M28 22l4 1 4-1"/>
      <path d="M8 44h18"/>
      <path d="M38 44h18"/>
      <ellipse cx="14" cy="44" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="50" cy="44" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <text x="14" y="56" font-size="4" fill="currentColor" stroke="none">Acromegaly</text>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Large jaw, hands, feet</text>
    </svg>`
  },
  {
    id: 'endo-prolactinoma',
    name: 'Prolactinoma',
    domain: 'medicine',
    category: 'pituitary',
    tags: ['prolactinoma', 'prolactin', 'galactorrhea', 'amenorrhea', 'dopamine agonist'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="14" ry="10"/>
      <circle cx="32" cy="32" r="6" fill="#FF69B4" opacity="0.5"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M16 48c4-4 8-4 12-4"/>
      <path d="M48 48c-4-4-8-4-12-4"/>
      <circle cx="22" cy="52" r="4"/>
      <circle cx="42" cy="52" r="4"/>
      <circle cx="22" cy="52" r="2" fill="currentColor"/>
      <circle cx="42" cy="52" r="2" fill="currentColor"/>
      <text x="12" y="62" font-size="4" fill="currentColor" stroke="none">Prolactinoma</text>
      <text x="40" y="32" font-size="3" fill="currentColor" stroke="none">PRL↑</text>
    </svg>`
  },
  {
    id: 'endo-hypopituitarism',
    name: 'Hypopituitarism',
    domain: 'medicine',
    category: 'pituitary',
    tags: ['hypopituitarism', 'panhypopituitarism', 'hormone deficiency', 'Sheehan', 'pituitary failure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="14" ry="10" stroke-dasharray="3 2"/>
      <path d="M20 32l-4 8"/>
      <path d="M28 36l-2 10"/>
      <path d="M36 36l2 10"/>
      <path d="M44 32l4 8"/>
      <circle cx="16" cy="42" r="2" stroke-dasharray="2 2"/>
      <circle cx="26" cy="48" r="2" stroke-dasharray="2 2"/>
      <circle cx="38" cy="48" r="2" stroke-dasharray="2 2"/>
      <circle cx="48" cy="42" r="2" stroke-dasharray="2 2"/>
      <text x="6" y="56" font-size="3" fill="currentColor" stroke="none">Hypopituitarism</text>
      <text x="6" y="62" font-size="3" fill="currentColor" stroke="none">Multiple Hormone Loss</text>
    </svg>`
  },
  {
    id: 'endo-siadh',
    name: 'SIADH',
    domain: 'medicine',
    category: 'pituitary',
    tags: ['SIADH', 'ADH excess', 'hyponatremia', 'euvolemic', 'water retention'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="10" ry="8"/>
      <path d="M32 24v8"/>
      <path d="M16 40c0-6 8-8 16-8s16 2 16 8c0 10-8 18-16 18s-16-8-16-18z" fill="#4169E1" opacity="0.3"/>
      <path d="M16 40c0-6 8-8 16-8s16 2 16 8c0 10-8 18-16 18s-16-8-16-18z"/>
      <text x="26" y="44" font-size="5" fill="currentColor" stroke="none">H₂O</text>
      <text x="28" y="52" font-size="4" fill="currentColor" stroke="none">↑↑</text>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">SIADH</text>
    </svg>`
  },
  {
    id: 'endo-diabetes-insipidus',
    name: 'Diabetes Insipidus',
    domain: 'medicine',
    category: 'pituitary',
    tags: ['DI', 'diabetes insipidus', 'ADH deficiency', 'polyuria', 'polydipsia', 'central', 'nephrogenic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="10" ry="8"/>
      <path d="M32 24v8" stroke-dasharray="2 2"/>
      <path d="M20 36c0-4 6-4 12-4s12 0 12 4c0 6-4 12-12 12s-12-6-12-12z"/>
      <path d="M28 44l-4 12"/>
      <path d="M32 44v14"/>
      <path d="M36 44l4 12"/>
      <path d="M24 56l-4 4"/>
      <path d="M40 56l4 4"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Diabetes Insipidus (DI)</text>
      <text x="44" y="44" font-size="3" fill="currentColor" stroke="none">Dilute</text>
      <text x="44" y="50" font-size="3" fill="currentColor" stroke="none">Urine↑↑</text>
    </svg>`
  },
  {
    id: 'endo-cushings-disease',
    name: 'Cushings Disease (Pituitary)',
    domain: 'medicine',
    category: 'pituitary',
    tags: ['Cushing disease', 'ACTH-secreting', 'pituitary adenoma', 'hypercortisolism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="12" ry="10"/>
      <circle cx="32" cy="20" r="5" fill="#DC143C" opacity="0.4"/>
      <path d="M32 30v6"/>
      <path d="M26 40l12 0"/>
      <ellipse cx="32" cy="48" rx="8" ry="6"/>
      <path d="M28 20l4 1 4-1"/>
      <text x="8" y="12" font-size="3" fill="currentColor" stroke="none">ACTH adenoma</text>
      <text x="42" y="48" font-size="3" fill="currentColor" stroke="none">Adrenal</text>
      <text x="42" y="54" font-size="3" fill="currentColor" stroke="none">stimulation</text>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Cushing's Disease</text>
    </svg>`
  },
  {
    id: 'endo-empty-sella',
    name: 'Empty Sella Syndrome',
    domain: 'medicine',
    category: 'pituitary',
    tags: ['empty sella', 'sella turcica', 'CSF', 'pituitary compression', 'MRI finding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 28c0-12 8-16 16-16s16 4 16 16"/>
      <path d="M16 28c0 10 8 16 16 16s16-6 16-16" fill="currentColor" opacity="0.1"/>
      <path d="M16 28c0 10 8 16 16 16s16-6 16-16"/>
      <ellipse cx="32" cy="38" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <text x="26" y="28" font-size="4" fill="currentColor" stroke="none">CSF</text>
      <text x="24" y="56" font-size="4" fill="currentColor" stroke="none">Empty Sella</text>
      <text x="26" y="42" font-size="3" fill="currentColor" stroke="none">Pit</text>
    </svg>`
  },
  {
    id: 'endo-gigantism',
    name: 'Gigantism',
    domain: 'medicine',
    category: 'pituitary',
    tags: ['gigantism', 'GH excess', 'childhood', 'tall stature', 'growth plates open'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20v28"/>
      <path d="M24 28l-8 16"/>
      <path d="M40 28l8 16"/>
      <path d="M28 48l-4 12"/>
      <path d="M36 48l4 12"/>
      <circle cx="28" cy="10" r="1"/>
      <circle cx="36" cy="10" r="1"/>
      <path d="M16 8h-8v52h8"/>
      <path d="M48 8h8v52h-8"/>
      <text x="4" y="36" font-size="4" fill="currentColor" stroke="none">↑</text>
      <text x="52" y="36" font-size="4" fill="currentColor" stroke="none">↑</text>
    </svg>`
  },
  {
    id: 'endo-pituitary-apoplexy',
    name: 'Pituitary Apoplexy',
    domain: 'medicine',
    category: 'pituitary',
    tags: ['apoplexy', 'hemorrhage', 'infarction', 'emergency', 'headache', 'vision loss'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 24c0-8 8-16 16-16s16 8 16 16" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="32" rx="14" ry="10"/>
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="#DC143C" opacity="0.4"/>
      <path d="M24 28l4 4-4 4"/>
      <path d="M40 28l-4 4 4 4"/>
      <path d="M32 8l8 12-8 8-8-8z" fill="#FFA500" opacity="0.4"/>
      <text x="28" y="18" font-size="6" fill="currentColor" stroke="none">!</text>
      <text x="10" y="52" font-size="3" fill="currentColor" stroke="none">Pituitary Apoplexy</text>
      <text x="18" y="58" font-size="3" fill="#DC143C" stroke="none">EMERGENCY</text>
    </svg>`
  },

  // ===========================================================================
  // BONE/CALCIUM METABOLISM
  // ===========================================================================
  {
    id: 'endo-osteoporosis',
    name: 'Osteoporosis',
    domain: 'medicine',
    category: 'bone-calcium',
    tags: ['osteoporosis', 'bone loss', 'fracture', 'T-score', 'DEXA', 'fragility'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8c-4 4-8 20-8 32 0 8 4 16 8 16"/>
      <path d="M40 8c4 4 8 20 8 32 0 8-4 16-8 16"/>
      <path d="M24 8c4 4 12 4 16 0"/>
      <path d="M24 56c4-4 12-4 16 0"/>
      <circle cx="28" cy="24" r="2" fill="none" stroke-dasharray="1 1"/>
      <circle cx="36" cy="32" r="3" fill="none" stroke-dasharray="1 1"/>
      <circle cx="30" cy="44" r="2" fill="none" stroke-dasharray="1 1"/>
      <circle cx="38" cy="20" r="2" fill="none" stroke-dasharray="1 1"/>
      <text x="10" y="62" font-size="4" fill="currentColor" stroke="none">Osteoporosis</text>
    </svg>`
  },
  {
    id: 'endo-dexa-scan',
    name: 'DEXA Bone Density Scan',
    domain: 'medicine',
    category: 'bone-calcium',
    tags: ['DEXA', 'DXA', 'bone density', 'T-score', 'Z-score', 'BMD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="36" rx="2"/>
      <path d="M16 36l8-16 8 8 8-12 8 16"/>
      <line x1="16" y1="40" x2="48" y2="40" stroke-dasharray="2 2"/>
      <text x="10" y="18" font-size="4" fill="currentColor" stroke="none">BMD</text>
      <rect x="16" y="48" width="32" height="8" rx="1"/>
      <text x="20" y="54" font-size="4" fill="currentColor" stroke="none">T: -2.8</text>
      <text x="14" y="62" font-size="3" fill="currentColor" stroke="none">DEXA Scan Result</text>
    </svg>`
  },
  {
    id: 'endo-calcium-metabolism',
    name: 'Calcium Metabolism',
    domain: 'medicine',
    category: 'bone-calcium',
    tags: ['calcium', 'metabolism', 'PTH', 'vitamin D', 'bone', 'kidney', 'intestine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <text x="26" y="36" font-size="6" fill="currentColor" stroke="none">Ca</text>
      <path d="M32 24v-12"/>
      <path d="M32 40v12"/>
      <path d="M24 32h-12"/>
      <path d="M40 32h12"/>
      <circle cx="32" cy="8" r="4"/>
      <text x="28" y="10" font-size="3" fill="currentColor" stroke="none">GI</text>
      <circle cx="32" cy="56" r="4"/>
      <text x="25" y="58" font-size="3" fill="currentColor" stroke="none">Kidney</text>
      <circle cx="8" cy="32" r="4"/>
      <text x="3" y="34" font-size="3" fill="currentColor" stroke="none">Bone</text>
      <circle cx="56" cy="32" r="4"/>
      <text x="51" y="34" font-size="3" fill="currentColor" stroke="none">PTH</text>
    </svg>`
  },
  {
    id: 'endo-vitamin-d',
    name: 'Vitamin D',
    domain: 'medicine',
    category: 'bone-calcium',
    tags: ['vitamin D', 'cholecalciferol', 'calcitriol', '25-OH', '1,25-OH', 'sun'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12" fill="#FFD700" opacity="0.4"/>
      <circle cx="32" cy="24" r="12"/>
      <path d="M32 4v8"/>
      <path d="M32 36v8"/>
      <path d="M12 24h8"/>
      <path d="M44 24h8"/>
      <path d="M18 10l6 6"/>
      <path d="M46 10l-6 6"/>
      <path d="M18 38l6-6"/>
      <path d="M46 38l-6-6"/>
      <path d="M28 46l-4 8h16l-4-8"/>
      <text x="26" y="28" font-size="5" fill="currentColor" stroke="none">D</text>
      <text x="18" y="62" font-size="4" fill="currentColor" stroke="none">Vitamin D</text>
    </svg>`
  },
  {
    id: 'endo-hyperparathyroidism',
    name: 'Hyperparathyroidism',
    domain: 'medicine',
    category: 'bone-calcium',
    tags: ['hyperparathyroidism', 'PTH elevated', 'hypercalcemia', 'parathyroid adenoma', 'bones stones'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 12c-4 8-4 16 2 24 2 2 4 2 6 0"/>
      <path d="M40 12c4 8 4 16-2 24-2 2-4 2-6 0"/>
      <circle cx="20" cy="20" r="5" fill="#FFA500" opacity="0.6"/>
      <circle cx="20" cy="20" r="5"/>
      <path d="M20 28v8"/>
      <path d="M16 40h8"/>
      <text x="8" y="48" font-size="3" fill="currentColor" stroke="none">Ca↑↑</text>
      <text x="36" y="48" font-size="3" fill="currentColor" stroke="none">PTH↑↑</text>
      <text x="6" y="56" font-size="3" fill="currentColor" stroke="none">Hyperparathyroidism</text>
    </svg>`
  },
  {
    id: 'endo-hypoparathyroidism',
    name: 'Hypoparathyroidism',
    domain: 'medicine',
    category: 'bone-calcium',
    tags: ['hypoparathyroidism', 'PTH low', 'hypocalcemia', 'tetany', 'Chvostek', 'Trousseau'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 16c-4 6-4 12 2 18 2 2 4 2 6 0"/>
      <path d="M40 16c4 6 4 12-2 18-2 2-4 2-6 0"/>
      <circle cx="20" cy="22" r="3" stroke-dasharray="2 2"/>
      <circle cx="44" cy="22" r="3" stroke-dasharray="2 2"/>
      <circle cx="20" cy="32" r="3" stroke-dasharray="2 2"/>
      <circle cx="44" cy="32" r="3" stroke-dasharray="2 2"/>
      <path d="M28 44l-8 12"/>
      <path d="M36 44l8 12"/>
      <path d="M20 56c4-4 4-4 4-4"/>
      <path d="M44 56c-4-4-4-4-4-4"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Hypoparathyroid: Ca↓ PTH↓ Tetany</text>
    </svg>`
  },
  {
    id: 'endo-hypercalcemia',
    name: 'Hypercalcemia',
    domain: 'medicine',
    category: 'bone-calcium',
    tags: ['hypercalcemia', 'high calcium', 'malignancy', 'PTHrP', 'bones stones groans moans'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="14" fill="#FFA500" opacity="0.3"/>
      <circle cx="32" cy="28" r="14"/>
      <text x="22" y="32" font-size="8" fill="currentColor" stroke="none">Ca²⁺</text>
      <path d="M32 42v6"/>
      <path d="M28 48l8 0"/>
      <path d="M32 48v6"/>
      <text x="6" y="58" font-size="3" fill="currentColor" stroke="none">Bones Stones Groans Moans</text>
      <text x="48" y="24" font-size="6" fill="#DC143C" stroke="none">↑</text>
    </svg>`
  },
  {
    id: 'endo-hypocalcemia',
    name: 'Hypocalcemia',
    domain: 'medicine',
    category: 'bone-calcium',
    tags: ['hypocalcemia', 'low calcium', 'tetany', 'QT prolongation', 'seizure', 'paresthesias'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="14" fill="#4169E1" opacity="0.2"/>
      <circle cx="32" cy="28" r="14"/>
      <text x="22" y="32" font-size="8" fill="currentColor" stroke="none">Ca²⁺</text>
      <path d="M20 46c4-4 8 0 12 0s8 4 12 0"/>
      <path d="M16 52c4-4 8 0 12 0s8 4 12 0s8-4 8 0"/>
      <text x="48" y="24" font-size="6" fill="#4169E1" stroke="none">↓</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Tetany</text>
    </svg>`
  },
  {
    id: 'endo-pagets-disease',
    name: 'Pagets Disease of Bone',
    domain: 'medicine',
    category: 'bone-calcium',
    tags: ['Paget', 'bone remodeling', 'ALP elevated', 'deformity', 'osteoclast', 'skull'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-4 8-8 24-4 40 2 6 8 10 16 10s14-4 16-10c4-16 0-32-4-40"/>
      <path d="M20 8c4 4 14 4 24 0"/>
      <path d="M24 24c2-4 6-4 8 0 2 4 6 4 8 0"/>
      <path d="M24 36c4 1 8 2 16 0"/>
      <path d="M28 48c2 2 6 2 8 0"/>
      <ellipse cx="32" cy="32" rx="14" ry="20" fill="currentColor" opacity="0.1"/>
      <text x="10" y="62" font-size="3" fill="currentColor" stroke="none">Paget's Disease - Enlarged Skull</text>
    </svg>`
  },

  // ===========================================================================
  // FEEDBACK LOOPS & REGULATION
  // ===========================================================================
  {
    id: 'endo-negative-feedback-loop',
    name: 'Negative Feedback Loop',
    domain: 'medicine',
    category: 'regulation',
    tags: ['negative feedback', 'homeostasis', 'regulation', 'axis', 'inhibition'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="52" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M32 20v4" marker-end="url(#arrow)"/>
      <path d="M32 40v4" marker-end="url(#arrow)"/>
      <path d="M24 52c-12 0-16-20-16-40h4"/>
      <path d="M8 12l-4 4 4 4"/>
      <text x="26" y="14" font-size="4" fill="currentColor" stroke="none">H</text>
      <text x="26" y="34" font-size="4" fill="currentColor" stroke="none">P</text>
      <text x="26" y="54" font-size="4" fill="currentColor" stroke="none">T</text>
      <text x="48" y="32" font-size="6" fill="#E74C3C" stroke="none">−</text>
    </svg>`
  },
  {
    id: 'endo-positive-feedback-loop',
    name: 'Positive Feedback Loop',
    domain: 'medicine',
    category: 'regulation',
    tags: ['positive feedback', 'amplification', 'LH surge', 'ovulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="10" fill="currentColor" opacity="0.2"/>
      <circle cx="44" cy="32" r="10" fill="currentColor" opacity="0.2"/>
      <path d="M30 28c4-4 4-4 8 0"/>
      <path d="M30 36c4 4 4 4 8 0"/>
      <path d="M44 22v-10h-28v10"/>
      <text x="14" y="34" font-size="5" fill="currentColor" stroke="none">E2</text>
      <text x="38" y="34" font-size="5" fill="currentColor" stroke="none">LH</text>
      <text x="28" y="58" font-size="6" fill="#27AE60" stroke="none">+</text>
      <text x="14" y="58" font-size="3" fill="currentColor" stroke="none">Positive Feedback</text>
    </svg>`
  },
  {
    id: 'endo-hpa-axis',
    name: 'HPA Axis',
    domain: 'medicine',
    category: 'regulation',
    tags: ['HPA', 'hypothalamic pituitary adrenal', 'CRH', 'ACTH', 'cortisol', 'stress'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="12" ry="6" fill="#9B59B6" opacity="0.3"/>
      <ellipse cx="32" cy="28" rx="8" ry="5" fill="#F39C12" opacity="0.3"/>
      <path d="M24 44c-4 4-4 12 4 12h8c8 0 8-8 4-12"/>
      <path d="M24 44l16 0" fill="#FFD700" opacity="0.3"/>
      <path d="M32 16v6"/>
      <path d="M32 33v6"/>
      <path d="M20 44c-8-8-8-24 0-34"/>
      <text x="38" y="12" font-size="3" fill="currentColor" stroke="none">CRH</text>
      <text x="38" y="30" font-size="3" fill="currentColor" stroke="none">ACTH</text>
      <text x="38" y="48" font-size="3" fill="currentColor" stroke="none">Cortisol</text>
    </svg>`
  },
  {
    id: 'endo-hpt-axis',
    name: 'HPT Axis',
    domain: 'medicine',
    category: 'regulation',
    tags: ['HPT', 'hypothalamic pituitary thyroid', 'TRH', 'TSH', 'T3', 'T4'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="12" ry="6" fill="#9B59B6" opacity="0.3"/>
      <ellipse cx="32" cy="28" rx="8" ry="5" fill="#F39C12" opacity="0.3"/>
      <path d="M20 44c-4 6-4 12 4 14 4 2 8 2 16 0 8-2 8-8 4-14"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="#E74C3C" opacity="0.2"/>
      <path d="M32 16v6"/>
      <path d="M32 33v6"/>
      <path d="M20 44c-8-8-8-24 0-34"/>
      <text x="38" y="12" font-size="3" fill="currentColor" stroke="none">TRH</text>
      <text x="38" y="30" font-size="3" fill="currentColor" stroke="none">TSH</text>
      <text x="38" y="50" font-size="3" fill="currentColor" stroke="none">T3/T4</text>
    </svg>`
  },
  {
    id: 'endo-hpg-axis',
    name: 'HPG Axis',
    domain: 'medicine',
    category: 'regulation',
    tags: ['HPG', 'hypothalamic pituitary gonadal', 'GnRH', 'FSH', 'LH', 'testosterone', 'estrogen'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="12" ry="6" fill="#9B59B6" opacity="0.3"/>
      <ellipse cx="32" cy="28" rx="8" ry="5" fill="#F39C12" opacity="0.3"/>
      <ellipse cx="24" cy="50" rx="6" ry="8" fill="#FF69B4" opacity="0.3"/>
      <ellipse cx="40" cy="50" rx="6" ry="8" fill="#FF69B4" opacity="0.3"/>
      <path d="M32 16v6"/>
      <path d="M28 33l-4 10"/>
      <path d="M36 33l4 10"/>
      <path d="M18 50c-8-12-8-28 0-40"/>
      <text x="38" y="12" font-size="3" fill="currentColor" stroke="none">GnRH</text>
      <text x="38" y="30" font-size="3" fill="currentColor" stroke="none">FSH/LH</text>
      <text x="26" y="62" font-size="3" fill="currentColor" stroke="none">Gonads</text>
    </svg>`
  },

  // ===========================================================================
  // METABOLIC & SYNDROME DISORDERS
  // ===========================================================================
  {
    id: 'endo-metabolic-syndrome',
    name: 'Metabolic Syndrome',
    domain: 'medicine',
    category: 'metabolic',
    tags: ['metabolic syndrome', 'insulin resistance', 'obesity', 'dyslipidemia', 'hypertension'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="36" rx="16" ry="12" fill="#E67E22" opacity="0.3"/>
      <circle cx="20" cy="16" r="6"/>
      <text x="16" y="18" font-size="4" fill="currentColor" stroke="none">BP</text>
      <circle cx="44" cy="16" r="6"/>
      <text x="39" y="18" font-size="4" fill="currentColor" stroke="none">TG</text>
      <circle cx="16" cy="48" r="6"/>
      <text x="11" y="50" font-size="4" fill="currentColor" stroke="none">FG</text>
      <circle cx="48" cy="48" r="6"/>
      <text x="42" y="50" font-size="4" fill="currentColor" stroke="none">HDL</text>
      <text x="26" y="38" font-size="5" fill="currentColor" stroke="none">WC</text>
    </svg>`
  },
  {
    id: 'endo-pcos',
    name: 'Polycystic Ovary Syndrome',
    domain: 'medicine',
    category: 'metabolic',
    tags: ['PCOS', 'polycystic ovary', 'hyperandrogenism', 'anovulation', 'infertility'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <circle cx="20" cy="28" r="3" fill="#FFD700"/>
      <circle cx="44" cy="28" r="3" fill="#FFD700"/>
      <circle cx="26" cy="40" r="3" fill="#FFD700"/>
      <circle cx="38" cy="40" r="3" fill="#FFD700"/>
      <circle cx="32" cy="24" r="3" fill="#FFD700"/>
      <circle cx="18" cy="36" r="2" fill="#FFD700"/>
      <circle cx="46" cy="36" r="2" fill="#FFD700"/>
      <text x="20" y="58" font-size="4" fill="currentColor" stroke="none">PCOS</text>
    </svg>`
  },
  {
    id: 'endo-hirsutism',
    name: 'Hirsutism',
    domain: 'medicine',
    category: 'metabolic',
    tags: ['hirsutism', 'hyperandrogenism', 'excess hair', 'Ferriman-Gallwey', 'testosterone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="16"/>
      <circle cx="26" cy="20" r="2" fill="currentColor"/>
      <circle cx="38" cy="20" r="2" fill="currentColor"/>
      <path d="M26 28c4 4 8 4 12 0"/>
      <path d="M24 32l-2 4"/>
      <path d="M28 34l-1 4"/>
      <path d="M32 34v4"/>
      <path d="M36 34l1 4"/>
      <path d="M40 32l2 4"/>
      <path d="M32 44v8"/>
      <path d="M24 48h16"/>
      <text x="16" y="60" font-size="4" fill="currentColor" stroke="none">Hirsutism</text>
    </svg>`
  },
  {
    id: 'endo-men-syndrome',
    name: 'MEN Syndrome',
    domain: 'medicine',
    category: 'metabolic',
    tags: ['MEN', 'multiple endocrine neoplasia', 'MEN1', 'MEN2', 'familial', 'tumor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8" fill="#DC143C" opacity="0.3"/>
      <circle cx="16" cy="36" r="8" fill="#DC143C" opacity="0.3"/>
      <circle cx="48" cy="36" r="8" fill="#DC143C" opacity="0.3"/>
      <circle cx="32" cy="52" r="8" fill="#DC143C" opacity="0.3"/>
      <path d="M32 20v24"/>
      <path d="M24 36h16"/>
      <text x="28" y="14" font-size="4" fill="currentColor" stroke="none">Pit</text>
      <text x="10" y="38" font-size="4" fill="currentColor" stroke="none">Para</text>
      <text x="42" y="38" font-size="4" fill="currentColor" stroke="none">Thy</text>
      <text x="26" y="54" font-size="4" fill="currentColor" stroke="none">Panc</text>
      <text x="18" y="62" font-size="4" fill="currentColor" stroke="none">MEN Syndrome</text>
    </svg>`
  },
  {
    id: 'endo-carcinoid-syndrome',
    name: 'Carcinoid Syndrome',
    domain: 'medicine',
    category: 'metabolic',
    tags: ['carcinoid', 'serotonin', 'flushing', 'diarrhea', '5-HIAA', 'neuroendocrine'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="12"/>
      <path d="M26 18c2 2 6 2 8 0" fill="#FF6B6B"/>
      <path d="M26 16c0-2 2-4 3-4"/>
      <path d="M38 16c0-2-2-4-3-4"/>
      <path d="M20 20c-4 1-4 4-2 6"/>
      <path d="M44 20c4 1 4 4 2 6"/>
      <circle cx="32" cy="44" r="10"/>
      <path d="M28 42c0 4 8 4 8 0"/>
      <path d="M24 48l-4 8"/>
      <path d="M40 48l4 8"/>
      <text x="10" y="62" font-size="3" fill="currentColor" stroke="none">Carcinoid: Flush+Diarrhea</text>
    </svg>`
  },

  // ===========================================================================
  // GROWTH & DEVELOPMENT
  // ===========================================================================
  {
    id: 'endo-growth-chart',
    name: 'Growth Chart',
    domain: 'medicine',
    category: 'growth',
    tags: ['growth chart', 'percentile', 'height', 'weight', 'pediatric', 'development'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="40" rx="2"/>
      <path d="M16 12v32"/>
      <path d="M12 40h40"/>
      <path d="M20 36c8-4 16-8 24-20" stroke-dasharray="4 2"/>
      <path d="M20 32c8-4 16-8 24-16"/>
      <path d="M20 28c8-4 16-8 24-12" stroke-dasharray="4 2"/>
      <text x="44" y="18" font-size="3" fill="currentColor" stroke="none">97th</text>
      <text x="44" y="24" font-size="3" fill="currentColor" stroke="none">50th</text>
      <text x="44" y="30" font-size="3" fill="currentColor" stroke="none">3rd</text>
      <circle cx="36" cy="24" r="2" fill="currentColor"/>
      <text x="18" y="56" font-size="4" fill="currentColor" stroke="none">Growth Chart</text>
    </svg>`
  },
  {
    id: 'endo-short-stature',
    name: 'Short Stature',
    domain: 'medicine',
    category: 'growth',
    tags: ['short stature', 'growth hormone deficiency', 'dwarfism', 'achondroplasia', 'height'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 56v-40"/>
      <path d="M8 56h48"/>
      <path d="M8 16h8"/>
      <path d="M8 56h4"/>
      <circle cx="32" cy="44" r="8"/>
      <path d="M32 52v4"/>
      <path d="M28 56h8"/>
      <circle cx="52" cy="28" r="8" stroke-dasharray="3 2"/>
      <path d="M52 36v20" stroke-dasharray="3 2"/>
      <path d="M48 56h8" stroke-dasharray="3 2"/>
      <text x="16" y="62" font-size="4" fill="currentColor" stroke="none">Short Stature</text>
    </svg>`
  },
  {
    id: 'endo-acromegaly-features',
    name: 'Acromegaly Features',
    domain: 'medicine',
    category: 'growth',
    tags: ['acromegaly', 'growth hormone excess', 'enlarged hands', 'enlarged feet', 'prognathism'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="14" ry="16"/>
      <path d="M24 32c0 4 4 8 8 10s8-2 8-6"/>
      <circle cx="26" cy="20" r="2" fill="currentColor"/>
      <circle cx="38" cy="20" r="2" fill="currentColor"/>
      <path d="M28 24h8"/>
      <path d="M20 8l-4-4h-4"/>
      <path d="M44 8l4-4h4"/>
      <ellipse cx="16" cy="52" rx="8" ry="4"/>
      <ellipse cx="48" cy="52" rx="8" ry="4"/>
      <text x="12" y="62" font-size="3" fill="currentColor" stroke="none">Acromegaly Features</text>
    </svg>`
  },
  {
    id: 'endo-gigantism',
    name: 'Gigantism',
    domain: 'medicine',
    category: 'growth',
    tags: ['gigantism', 'GH excess', 'tall stature', 'childhood', 'pituitary adenoma'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 56v-40"/>
      <path d="M8 56h48"/>
      <path d="M8 16h8"/>
      <circle cx="32" cy="20" r="8"/>
      <path d="M32 28v28"/>
      <path d="M28 56h8"/>
      <path d="M24 36l-4 8"/>
      <path d="M40 36l4 8"/>
      <circle cx="52" cy="36" r="6" stroke-dasharray="3 2"/>
      <path d="M52 42v14" stroke-dasharray="3 2"/>
      <text x="18" y="62" font-size="4" fill="currentColor" stroke="none">Gigantism</text>
    </svg>`
  },

  // ===========================================================================
  // DIABETIC COMPLICATIONS
  // ===========================================================================
  {
    id: 'endo-diabetic-retinopathy',
    name: 'Diabetic Retinopathy',
    domain: 'medicine',
    category: 'diabetes-complications',
    tags: ['diabetic retinopathy', 'microaneurysm', 'hemorrhage', 'neovascularization', 'blindness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <circle cx="32" cy="32" r="8" fill="currentColor"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.5"/>
      <circle cx="42" cy="24" r="2" fill="#DC143C"/>
      <circle cx="24" cy="40" r="2" fill="#DC143C"/>
      <circle cx="40" cy="40" r="1" fill="#DC143C"/>
      <path d="M44 32c4 4 4 8 0 8" stroke="#DC143C"/>
      <path d="M20 28c-4 0-4 4 0 8" stroke="#DC143C"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Diabetic Retinopathy</text>
    </svg>`
  },
  {
    id: 'endo-diabetic-nephropathy',
    name: 'Diabetic Nephropathy',
    domain: 'medicine',
    category: 'diabetes-complications',
    tags: ['diabetic nephropathy', 'CKD', 'proteinuria', 'microalbuminuria', 'ESRD'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 12c-8 12-8 32 0 44 4 4 8 4 12 0"/>
      <path d="M44 12c8 12 8 32 0 44-4 4-8 4-12 0"/>
      <circle cx="24" cy="28" r="4" fill="#CD853F" opacity="0.5"/>
      <circle cx="24" cy="40" r="4" fill="#CD853F" opacity="0.5"/>
      <circle cx="40" cy="28" r="4" fill="#CD853F" opacity="0.5"/>
      <circle cx="40" cy="40" r="4" fill="#CD853F" opacity="0.5"/>
      <path d="M32 48v8"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Diabetic Nephropathy</text>
    </svg>`
  },
  {
    id: 'endo-diabetic-neuropathy',
    name: 'Diabetic Neuropathy',
    domain: 'medicine',
    category: 'diabetes-complications',
    tags: ['diabetic neuropathy', 'peripheral neuropathy', 'numbness', 'tingling', 'stocking glove'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8v20"/>
      <path d="M44 8v20"/>
      <ellipse cx="20" cy="38" rx="8" ry="16" fill="#DAA520" opacity="0.3"/>
      <ellipse cx="44" cy="38" rx="8" ry="16" fill="#DAA520" opacity="0.3"/>
      <path d="M16 48l-4 8h16l-4-8"/>
      <path d="M40 48l-4 8h16l-4-8"/>
      <path d="M14 40c-2-2-2-4 0-4"/>
      <path d="M26 36c2 2 2 4 0 4"/>
      <path d="M50 40c2-2 2-4 0-4"/>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">Diabetic Neuropathy</text>
    </svg>`
  },
  {
    id: 'endo-diabetic-foot',
    name: 'Diabetic Foot',
    domain: 'medicine',
    category: 'diabetes-complications',
    tags: ['diabetic foot', 'ulcer', 'gangrene', 'amputation', 'Charcot foot', 'wound'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8v24"/>
      <path d="M12 32c-4 8-4 16 4 20h24c8-4 8-12 4-20"/>
      <ellipse cx="24" cy="44" rx="12" ry="8"/>
      <circle cx="20" cy="44" r="4" fill="#8B0000" opacity="0.5"/>
      <circle cx="28" cy="46" r="2" fill="#8B0000" opacity="0.5"/>
      <path d="M32 36c4-4 8-4 12 0"/>
      <path d="M36 40c2-2 4-2 6 0"/>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Diabetic Foot</text>
    </svg>`
  },
  {
    id: 'endo-dka',
    name: 'DKA - Diabetic Ketoacidosis',
    domain: 'medicine',
    category: 'diabetes-complications',
    tags: ['DKA', 'diabetic ketoacidosis', 'acidosis', 'ketones', 'dehydration', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#DC143C" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="22" y="28" font-size="8" fill="currentColor" stroke="none">DKA</text>
      <text x="18" y="38" font-size="4" fill="currentColor" stroke="none">pH <7.3</text>
      <text x="16" y="46" font-size="4" fill="currentColor" stroke="none">Ketones+</text>
      <path d="M8 56l48 0"/>
      <path d="M16 52v4"/>
      <path d="M32 52v4"/>
      <path d="M48 52v4"/>
      <text x="10" y="62" font-size="3" fill="currentColor" stroke="none">Emergency!</text>
    </svg>`
  },
  {
    id: 'endo-hhs',
    name: 'HHS - Hyperosmolar Hyperglycemic State',
    domain: 'medicine',
    category: 'diabetes-complications',
    tags: ['HHS', 'hyperosmolar', 'hyperglycemic state', 'dehydration', 'type 2', 'emergency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#E67E22" opacity="0.2"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="22" y="28" font-size="8" fill="currentColor" stroke="none">HHS</text>
      <text x="14" y="38" font-size="3" fill="currentColor" stroke="none">Gluc >600</text>
      <text x="12" y="46" font-size="3" fill="currentColor" stroke="none">Osm >320</text>
      <path d="M20 52c4-4 8 0 12 0s8 4 12 0"/>
      <text x="10" y="62" font-size="3" fill="currentColor" stroke="none">Severe Dehydration</text>
    </svg>`
  },

  // ===========================================================================
  // AUTOIMMUNE & THYROID DISEASES
  // ===========================================================================
  {
    id: 'endo-graves-ophthalmopathy',
    name: 'Graves Ophthalmopathy',
    domain: 'medicine',
    category: 'thyroid-autoimmune',
    tags: ['Graves ophthalmopathy', 'thyroid eye disease', 'exophthalmos', 'proptosis', 'diplopia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="16"/>
      <ellipse cx="22" cy="26" rx="8" ry="10"/>
      <ellipse cx="42" cy="26" rx="8" ry="10"/>
      <circle cx="22" cy="26" r="4" fill="currentColor"/>
      <circle cx="42" cy="26" r="4" fill="currentColor"/>
      <path d="M14" y="26" cx="12" cy="26" r="2"/>
      <path d="M50 26" cx="52" cy="26" r="2"/>
      <path d="M28 40c4 4 8 4 8 0"/>
      <text x="6" y="56" font-size="3" fill="currentColor" stroke="none">Graves Ophthalmopathy</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Exophthalmos</text>
    </svg>`
  },
  {
    id: 'endo-hashimotos-thyroiditis',
    name: 'Hashimotos Thyroiditis',
    domain: 'medicine',
    category: 'thyroid-autoimmune',
    tags: ['Hashimoto', 'autoimmune thyroiditis', 'TPO antibody', 'hypothyroid', 'lymphocytic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8v48" stroke-dasharray="4 2"/>
      <path d="M16 20c-4 8-4 20 4 28 4 4 8 4 12 0" fill="#708090" opacity="0.3"/>
      <path d="M48 20c4 8 4 20-4 28-4 4-8 4-12 0" fill="#708090" opacity="0.3"/>
      <path d="M16 20c-4 8-4 20 4 28 4 4 8 4 12 0"/>
      <path d="M48 20c4 8 4 20-4 28-4 4-8 4-12 0"/>
      <circle cx="20" cy="32" r="2" fill="#4169E1"/>
      <circle cx="24" cy="40" r="2" fill="#4169E1"/>
      <circle cx="40" cy="28" r="2" fill="#4169E1"/>
      <circle cx="44" cy="36" r="2" fill="#4169E1"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Hashimoto's + TPO Ab</text>
    </svg>`
  },
  {
    id: 'endo-thyroid-storm',
    name: 'Thyroid Storm',
    domain: 'medicine',
    category: 'thyroid-autoimmune',
    tags: ['thyroid storm', 'thyrotoxicosis', 'hyperthyroid crisis', 'emergency', 'fever', 'tachycardia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 24c-4 8-4 16 4 24 4 4 8 4 12 0"/>
      <path d="M48 24c4 8 4 16-4 24-4 4-8 4-12 0"/>
      <path d="M28 36h8" fill="#FF0000"/>
      <path d="M32 12l-4 8 8-4-4 8" fill="#FF6347" stroke="#FF0000" stroke-width="2"/>
      <circle cx="32" cy="36" r="4" fill="#FF0000" opacity="0.5"/>
      <path d="M8 52l6-8 6 8 6-8 6 8 6-8 6 8 6-8 6 8" stroke="#DC143C"/>
      <text x="12" y="62" font-size="4" fill="#DC143C" stroke="none">THYROID STORM</text>
    </svg>`
  },
  {
    id: 'endo-myxedema-coma',
    name: 'Myxedema Coma',
    domain: 'medicine',
    category: 'thyroid-autoimmune',
    tags: ['myxedema coma', 'severe hypothyroid', 'hypothermia', 'emergency', 'altered mental status'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="16" ry="14" fill="#4682B4" opacity="0.3"/>
      <ellipse cx="32" cy="28" rx="16" ry="14"/>
      <path d="M24 24c0 2 1 3 2 3"/>
      <path d="M40 24c0 2-1 3-2 3"/>
      <path d="M28 32c4 0 8 0 8 0"/>
      <path d="M16 40c4 4 12 8 16 8s12-4 16-8"/>
      <path d="M8 52l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4" stroke="#4682B4"/>
      <text x="8" y="62" font-size="4" fill="#4682B4" stroke="none">MYXEDEMA COMA</text>
      <text x="28" y="12" font-size="6" fill="currentColor" stroke="none">Z</text>
    </svg>`
  },
  {
    id: 'endo-adrenal-crisis',
    name: 'Adrenal Crisis',
    domain: 'medicine',
    category: 'adrenal-emergency',
    tags: ['adrenal crisis', 'Addisonian crisis', 'hypotension', 'shock', 'emergency', 'cortisol'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24c2-6 8-10 12-10h8c4 0 10 4 12 10"/>
      <path d="M12 24c-2 6 2 12 8 12h24c6 0 10-6 8-12" fill="#8B4513" opacity="0.4"/>
      <text x="22" y="32" font-size="6" fill="currentColor" stroke="none">↓↓↓</text>
      <path d="M8 44l48 0"/>
      <path d="M32 44v12"/>
      <path d="M24 48l8 8 8-8"/>
      <text x="10" y="62" font-size="4" fill="#DC143C" stroke="none">ADRENAL CRISIS</text>
    </svg>`
  },
];

export default endocrinologyIcons;
