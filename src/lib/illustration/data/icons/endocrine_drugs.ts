/**
 * Endocrine Drugs Icon Library
 * Comprehensive SVG icons for endocrine medication drug classes
 *
 * Categories:
 * - Insulin and Diabetes medications
 * - Thyroid medications
 * - Corticosteroids
 * - Sex hormones
 * - Pituitary hormones
 */

import type { IconDefinition } from './index';

export const endocrineDrugsIcons: IconDefinition[] = [
  // ===========================================================================
  // INSULIN AND DIABETES
  // ===========================================================================
  {
    id: 'endo-insulin-mechanism',
    name: 'Insulin Mechanism',
    domain: 'medicine',
    category: 'endocrine-diabetes',
    tags: ['insulin', 'glucose', 'receptor', 'mechanism', 'diabetes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="20" width="40" height="24" rx="4" fill="#2196F3" opacity="0.2"/>
      <rect x="12" y="20" width="40" height="24" rx="4"/>
      <circle cx="24" cy="32" r="6" fill="#4CAF50" opacity="0.5"/>
      <path d="M30 32l8 0"/>
      <circle cx="44" cy="32" r="4" fill="#FF9800"/>
      <path d="M24 44l0 8"/>
      <text x="20" y="30" font-size="4" fill="currentColor" stroke="none">INS</text>
      <text x="40" y="34" font-size="3" fill="currentColor" stroke="none">GLU</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Insulin Action</text>
    </svg>`
  },
  {
    id: 'endo-insulin-rapid',
    name: 'Rapid-Acting Insulin',
    domain: 'medicine',
    category: 'endocrine-diabetes',
    tags: ['insulin', 'lispro', 'aspart', 'glulisine', 'rapid', 'bolus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 48l16-36 16 36z" fill="#F44336" opacity="0.3"/>
      <path d="M16 48l16-36 16 36z"/>
      <text x="26" y="42" font-size="6" fill="currentColor" stroke="none">R</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Rapid Insulin</text>
    </svg>`
  },
  {
    id: 'endo-insulin-short',
    name: 'Short-Acting Insulin (Regular)',
    domain: 'medicine',
    category: 'endocrine-diabetes',
    tags: ['insulin', 'regular', 'short', 'humulin R', 'novolin R'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="4" fill="#FF9800" opacity="0.3"/>
      <rect x="16" y="16" width="32" height="32" rx="4"/>
      <text x="26" y="38" font-size="8" fill="currentColor" stroke="none">R</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Regular Insulin</text>
    </svg>`
  },
  {
    id: 'endo-insulin-nph',
    name: 'Intermediate-Acting Insulin (NPH)',
    domain: 'medicine',
    category: 'endocrine-diabetes',
    tags: ['insulin', 'NPH', 'intermediate', 'humulin N', 'cloudy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#9C27B0" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <text x="22" y="38" font-size="7" fill="currentColor" stroke="none">NPH</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Intermediate Insulin</text>
    </svg>`
  },
  {
    id: 'endo-insulin-long',
    name: 'Long-Acting Insulin',
    domain: 'medicine',
    category: 'endocrine-diabetes',
    tags: ['insulin', 'glargine', 'detemir', 'degludec', 'basal', 'lantus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="18" width="40" height="28" rx="8" fill="#3F51B5" opacity="0.3"/>
      <rect x="12" y="18" width="40" height="28" rx="8"/>
      <path d="M18 32h28"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">24h</text>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Basal Insulin</text>
    </svg>`
  },
  {
    id: 'endo-metformin',
    name: 'Metformin',
    domain: 'medicine',
    category: 'endocrine-diabetes',
    tags: ['metformin', 'biguanide', 'first-line', 'glucophage', 'insulin sensitizer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#4CAF50" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="18" y="38" font-size="7" fill="currentColor" stroke="none">MET</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Metformin</text>
    </svg>`
  },
  {
    id: 'endo-sulfonylurea',
    name: 'Sulfonylurea',
    domain: 'medicine',
    category: 'endocrine-diabetes',
    tags: ['sulfonylurea', 'glipizide', 'glyburide', 'glimepiride', 'secretagogue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 10l22 14v16l-22 14-22-14V24z" fill="#FF9800" opacity="0.3"/>
      <path d="M32 10l22 14v16l-22 14-22-14V24z"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">SU</text>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Sulfonylurea</text>
    </svg>`
  },
  {
    id: 'endo-sglt2',
    name: 'SGLT2 Inhibitor',
    domain: 'medicine',
    category: 'endocrine-diabetes',
    tags: ['SGLT2', 'empagliflozin', 'dapagliflozin', 'canagliflozin', 'cardiorenal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="16" width="36" height="32" rx="4" fill="#00BCD4" opacity="0.3"/>
      <rect x="14" y="16" width="36" height="32" rx="4"/>
      <path d="M24 28l8 8-8 8"/>
      <circle cx="38" cy="36" r="4" fill="#00BCD4"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">SGLT2 Inhibitor</text>
    </svg>`
  },
  {
    id: 'endo-glp1',
    name: 'GLP-1 Receptor Agonist',
    domain: 'medicine',
    category: 'endocrine-diabetes',
    tags: ['GLP-1', 'semaglutide', 'liraglutide', 'dulaglutide', 'weight loss'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="14" fill="#E91E63" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="22" ry="14"/>
      <text x="16" y="36" font-size="6" fill="currentColor" stroke="none">GLP-1</text>
      <text x="18" y="58" font-size="4" fill="currentColor" stroke="none">GLP-1 RA</text>
    </svg>`
  },
  {
    id: 'endo-dpp4',
    name: 'DPP-4 Inhibitor',
    domain: 'medicine',
    category: 'endocrine-diabetes',
    tags: ['DPP-4', 'sitagliptin', 'linagliptin', 'saxagliptin', 'gliptin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="18" fill="#9C27B0" opacity="0.3"/>
      <circle cx="32" cy="32" r="18"/>
      <path d="M24 24l16 16" stroke-width="2"/>
      <path d="M40 24l-16 16" stroke-width="2"/>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">DPP-4 Inhibitor</text>
    </svg>`
  },

  // ===========================================================================
  // THYROID MEDICATIONS
  // ===========================================================================
  {
    id: 'endo-levothyroxine',
    name: 'Levothyroxine (T4)',
    domain: 'medicine',
    category: 'endocrine-thyroid',
    tags: ['levothyroxine', 'synthroid', 'T4', 'hypothyroid', 'thyroid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 12c12 0 16 8 16 12s-4 8-8 10v18h-16v-18c-4-2-8-6-8-10s4-12 16-12z" fill="#673AB7" opacity="0.3"/>
      <path d="M32 12c12 0 16 8 16 12s-4 8-8 10v18h-16v-18c-4-2-8-6-8-10s4-12 16-12z"/>
      <text x="26" y="32" font-size="7" fill="currentColor" stroke="none">T4</text>
      <text x="10" y="60" font-size="4" fill="currentColor" stroke="none">Levothyroxine</text>
    </svg>`
  },
  {
    id: 'endo-liothyronine',
    name: 'Liothyronine (T3)',
    domain: 'medicine',
    category: 'endocrine-thyroid',
    tags: ['liothyronine', 'cytomel', 'T3', 'active thyroid', 'myxedema'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 14c10 0 14 6 14 10s-4 8-6 10v16h-16v-16c-2-2-6-6-6-10s4-10 14-10z" fill="#F44336" opacity="0.3"/>
      <path d="M32 14c10 0 14 6 14 10s-4 8-6 10v16h-16v-16c-2-2-6-6-6-10s4-10 14-10z"/>
      <text x="26" y="32" font-size="7" fill="currentColor" stroke="none">T3</text>
      <text x="14" y="60" font-size="4" fill="currentColor" stroke="none">Liothyronine</text>
    </svg>`
  },
  {
    id: 'endo-methimazole',
    name: 'Methimazole',
    domain: 'medicine',
    category: 'endocrine-thyroid',
    tags: ['methimazole', 'tapazole', 'antithyroid', 'hyperthyroid', 'Graves'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#FF5722" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <path d="M22 22l20 20" stroke-width="2"/>
      <path d="M42 22l-20 20" stroke-width="2"/>
      <text x="14" y="58" font-size="4" fill="currentColor" stroke="none">Methimazole</text>
    </svg>`
  },
  {
    id: 'endo-ptu',
    name: 'Propylthiouracil (PTU)',
    domain: 'medicine',
    category: 'endocrine-thyroid',
    tags: ['PTU', 'propylthiouracil', 'antithyroid', 'pregnancy', 'thyroid storm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="18" width="36" height="28" rx="4" fill="#795548" opacity="0.3"/>
      <rect x="14" y="18" width="36" height="28" rx="4"/>
      <text x="20" y="38" font-size="7" fill="currentColor" stroke="none">PTU</text>
      <text x="22" y="58" font-size="4" fill="currentColor" stroke="none">PTU</text>
    </svg>`
  },

  // ===========================================================================
  // CORTICOSTEROIDS
  // ===========================================================================
  {
    id: 'endo-prednisone',
    name: 'Prednisone',
    domain: 'medicine',
    category: 'endocrine-steroids',
    tags: ['prednisone', 'corticosteroid', 'glucocorticoid', 'anti-inflammatory', 'immunosuppressant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32l10-18h20l10 18-10 18H22z" fill="#FFC107" opacity="0.3"/>
      <path d="M12 32l10-18h20l10 18-10 18H22z"/>
      <text x="20" y="36" font-size="6" fill="currentColor" stroke="none">PRED</text>
      <text x="16" y="58" font-size="4" fill="currentColor" stroke="none">Prednisone</text>
    </svg>`
  },
  {
    id: 'endo-dexamethasone',
    name: 'Dexamethasone',
    domain: 'medicine',
    category: 'endocrine-steroids',
    tags: ['dexamethasone', 'decadron', 'potent', 'long-acting', 'cerebral edema'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20" fill="#3F51B5" opacity="0.3"/>
      <circle cx="32" cy="32" r="20"/>
      <text x="18" y="38" font-size="6" fill="currentColor" stroke="none">DEX</text>
      <text x="10" y="58" font-size="4" fill="currentColor" stroke="none">Dexamethasone</text>
    </svg>`
  },
  {
    id: 'endo-hydrocortisone',
    name: 'Hydrocortisone',
    domain: 'medicine',
    category: 'endocrine-steroids',
    tags: ['hydrocortisone', 'cortisol', 'physiologic', 'adrenal insufficiency', 'stress dose'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="14" y="16" width="36" height="32" rx="8" fill="#4CAF50" opacity="0.3"/>
      <rect x="14" y="16" width="36" height="32" rx="8"/>
      <text x="22" y="38" font-size="6" fill="currentColor" stroke="none">HC</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Hydrocortisone</text>
    </svg>`
  },
  {
    id: 'endo-fludrocortisone',
    name: 'Fludrocortisone',
    domain: 'medicine',
    category: 'endocrine-steroids',
    tags: ['fludrocortisone', 'florinef', 'mineralocorticoid', 'aldosterone', 'adrenal insufficiency'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#00BCD4" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <text x="22" y="36" font-size="6" fill="currentColor" stroke="none">FC</text>
      <text x="8" y="58" font-size="4" fill="currentColor" stroke="none">Fludrocortisone</text>
    </svg>`
  },

  // ===========================================================================
  // SEX HORMONES
  // ===========================================================================
  {
    id: 'endo-estrogen',
    name: 'Estrogen',
    domain: 'medicine',
    category: 'endocrine-sex-hormones',
    tags: ['estrogen', 'estradiol', 'HRT', 'menopause', 'female hormone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="26" r="14" fill="#E91E63" opacity="0.3"/>
      <circle cx="32" cy="26" r="14"/>
      <path d="M32 40v16"/>
      <path d="M24 50h16"/>
      <text x="18" y="60" font-size="4" fill="currentColor" stroke="none">Estrogen</text>
    </svg>`
  },
  {
    id: 'endo-progesterone',
    name: 'Progesterone',
    domain: 'medicine',
    category: 'endocrine-sex-hormones',
    tags: ['progesterone', 'progestin', 'prometrium', 'HRT', 'luteal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16" fill="#9C27B0" opacity="0.3"/>
      <circle cx="32" cy="28" r="16"/>
      <path d="M32 44v12"/>
      <text x="26" y="32" font-size="5" fill="currentColor" stroke="none">P4</text>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">Progesterone</text>
    </svg>`
  },
  {
    id: 'endo-testosterone',
    name: 'Testosterone',
    domain: 'medicine',
    category: 'endocrine-sex-hormones',
    tags: ['testosterone', 'androgen', 'TRT', 'hypogonadism', 'male hormone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="28" cy="32" r="14" fill="#2196F3" opacity="0.3"/>
      <circle cx="28" cy="32" r="14"/>
      <path d="M38 22l12-12"/>
      <path d="M44 10h6v6"/>
      <text x="12" y="58" font-size="4" fill="currentColor" stroke="none">Testosterone</text>
    </svg>`
  },
];

export default endocrineDrugsIcons;
