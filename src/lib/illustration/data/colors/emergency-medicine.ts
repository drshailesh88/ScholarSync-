/**
 * emergency-medicine.ts
 * Emergency Medicine Color Scheme for FINNISH
 *
 * A comprehensive color palette designed for emergency medicine diagrams
 * featuring urgency-coded colors with WCAG-compliant variants.
 *
 * Design principles:
 * - Red primary for critical/immediate attention
 * - Orange secondary for urgent situations
 * - Yellow accent for warnings and caution
 * - Dark neutrals for readability in high-stress environments
 * - High contrast variants for accessibility
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface ColorVariant {
  /** Main color value */
  base: string;
  /** Lighter shade for backgrounds */
  light: string;
  /** Darker shade for text/emphasis */
  dark: string;
  /** Color for hover states */
  hover: string;
  /** WCAG AA compliant text color on white */
  wcagOnWhite: string;
  /** WCAG AA compliant text color on dark */
  wcagOnDark: string;
}

export interface TriageColor {
  /** Background color for triage category */
  background: string;
  /** Border color */
  border: string;
  /** Text color */
  text: string;
  /** Icon color */
  icon: string;
}

export interface EmergencyMedicineColorScheme {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Specialty domain */
  domain: 'emergency-medicine';
  /** Color scheme version */
  version: string;

  /** Primary colors - Red (urgency/critical) */
  primary: ColorVariant;
  /** Secondary colors - Orange (urgent) */
  secondary: ColorVariant;
  /** Accent colors - Yellow (warning) */
  accent: ColorVariant;
  /** Neutral colors - Dark gray for text */
  neutral: ColorVariant;

  /** Triage category colors (ESI/START) */
  triage: {
    immediate: TriageColor; // ESI 1 - Red
    emergent: TriageColor; // ESI 2 - Orange
    urgent: TriageColor; // ESI 3 - Yellow
    lessUrgent: TriageColor; // ESI 4 - Green
    nonUrgent: TriageColor; // ESI 5 - Blue
    deceased: TriageColor; // Black
  };

  /** Clinical status colors */
  status: {
    critical: string;
    unstable: string;
    stable: string;
    improved: string;
    discharged: string;
  };

  /** Vital sign indicator colors */
  vitals: {
    normal: string;
    borderline: string;
    abnormal: string;
    critical: string;
  };

  /** Resuscitation specific colors */
  resuscitation: {
    shockable: string; // VF/VT
    nonShockable: string; // Asystole/PEA
    rosc: string; // Return of spontaneous circulation
    cpr: string; // Active CPR
  };

  /** Medication administration colors */
  medications: {
    vasopressor: string;
    sedation: string;
    antidote: string;
    antibiotic: string;
    bloodProduct: string;
  };

  /** Trauma assessment colors */
  trauma: {
    airway: string;
    breathing: string;
    circulation: string;
    disability: string;
    exposure: string;
  };

  /** Chart/diagram specific colors */
  diagram: {
    background: string;
    gridLines: string;
    border: string;
    annotation: string;
    highlight: string;
  };

  /** Semantic colors */
  semantic: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
}

// =============================================================================
// EMERGENCY MEDICINE COLOR SCHEME
// =============================================================================

export const emergencyMedicineColors: EmergencyMedicineColorScheme = {
  id: 'emergency-medicine-default',
  name: 'Emergency Medicine',
  domain: 'emergency-medicine',
  version: '1.0.0',

  // Primary: Red - Critical/Immediate attention
  primary: {
    base: '#DC143C', // Crimson Red
    light: '#FEE2E2', // Light red background
    dark: '#8B0000', // Dark red
    hover: '#B91C1C', // Hover state
    wcagOnWhite: '#991B1B', // WCAG AA on white (4.5:1)
    wcagOnDark: '#FCA5A5', // WCAG AA on dark
  },

  // Secondary: Orange - Urgent
  secondary: {
    base: '#FF6B00', // Vivid Orange
    light: '#FFEDD5', // Light orange background
    dark: '#C2410C', // Dark orange
    hover: '#EA580C', // Hover state
    wcagOnWhite: '#9A3412', // WCAG AA on white (4.5:1)
    wcagOnDark: '#FDBA74', // WCAG AA on dark
  },

  // Accent: Yellow - Warning/Caution
  accent: {
    base: '#F59E0B', // Amber Yellow
    light: '#FEF3C7', // Light yellow background
    dark: '#B45309', // Dark yellow/amber
    hover: '#D97706', // Hover state
    wcagOnWhite: '#92400E', // WCAG AA on white (4.5:1)
    wcagOnDark: '#FDE68A', // WCAG AA on dark
  },

  // Neutral: Dark Gray - Text and backgrounds
  neutral: {
    base: '#374151', // Gray 700
    light: '#F3F4F6', // Gray 100
    dark: '#111827', // Gray 900
    hover: '#4B5563', // Gray 600
    wcagOnWhite: '#374151', // WCAG AA on white
    wcagOnDark: '#E5E7EB', // WCAG AA on dark
  },

  // Triage Colors (ESI 5-Level System)
  triage: {
    // ESI Level 1: Immediate - Life threatening
    immediate: {
      background: '#DC143C',
      border: '#8B0000',
      text: '#FFFFFF',
      icon: '#FFFFFF',
    },
    // ESI Level 2: Emergent - High risk
    emergent: {
      background: '#FF6B00',
      border: '#C2410C',
      text: '#FFFFFF',
      icon: '#FFFFFF',
    },
    // ESI Level 3: Urgent - Stable but needs resources
    urgent: {
      background: '#F59E0B',
      border: '#B45309',
      text: '#000000',
      icon: '#000000',
    },
    // ESI Level 4: Less Urgent - Single resource
    lessUrgent: {
      background: '#22C55E',
      border: '#15803D',
      text: '#FFFFFF',
      icon: '#FFFFFF',
    },
    // ESI Level 5: Non-Urgent - No resources needed
    nonUrgent: {
      background: '#3B82F6',
      border: '#1D4ED8',
      text: '#FFFFFF',
      icon: '#FFFFFF',
    },
    // Deceased/Expectant
    deceased: {
      background: '#1F2937',
      border: '#000000',
      text: '#FFFFFF',
      icon: '#FFFFFF',
    },
  },

  // Clinical Status Indicators
  status: {
    critical: '#DC143C', // Red - Critical condition
    unstable: '#FF6B00', // Orange - Unstable
    stable: '#22C55E', // Green - Stable
    improved: '#10B981', // Emerald - Improving
    discharged: '#3B82F6', // Blue - Discharged
  },

  // Vital Sign Indicators
  vitals: {
    normal: '#22C55E', // Green
    borderline: '#F59E0B', // Yellow/Amber
    abnormal: '#FF6B00', // Orange
    critical: '#DC143C', // Red
  },

  // Resuscitation Colors
  resuscitation: {
    shockable: '#DC143C', // Red - VF/pVT (needs shock)
    nonShockable: '#6366F1', // Indigo - Asystole/PEA
    rosc: '#22C55E', // Green - Return of circulation
    cpr: '#F59E0B', // Yellow - Active CPR in progress
  },

  // Medication Categories
  medications: {
    vasopressor: '#7C3AED', // Violet - Pressors
    sedation: '#8B5CF6', // Purple - Sedatives
    antidote: '#10B981', // Emerald - Antidotes
    antibiotic: '#06B6D4', // Cyan - Antibiotics
    bloodProduct: '#EF4444', // Red - Blood products
  },

  // Trauma ABCDE Colors
  trauma: {
    airway: '#DC143C', // Red - A
    breathing: '#FF6B00', // Orange - B
    circulation: '#F59E0B', // Yellow - C
    disability: '#3B82F6', // Blue - D
    exposure: '#8B5CF6', // Purple - E
  },

  // Diagram Elements
  diagram: {
    background: '#FFFFFF',
    gridLines: '#E5E7EB',
    border: '#D1D5DB',
    annotation: '#6B7280',
    highlight: '#FEF3C7',
  },

  // Semantic Colors
  semantic: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#DC143C',
    info: '#3B82F6',
  },
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Get triage color by ESI level (1-5)
 */
export function getTriageColor(esiLevel: 1 | 2 | 3 | 4 | 5): TriageColor {
  const mapping: Record<number, keyof typeof emergencyMedicineColors.triage> = {
    1: 'immediate',
    2: 'emergent',
    3: 'urgent',
    4: 'lessUrgent',
    5: 'nonUrgent',
  };
  return emergencyMedicineColors.triage[mapping[esiLevel]];
}

/**
 * Get vital sign color based on status
 */
export function getVitalColor(
  status: 'normal' | 'borderline' | 'abnormal' | 'critical'
): string {
  return emergencyMedicineColors.vitals[status];
}

/**
 * Get ABCDE trauma assessment color
 */
export function getTraumaColor(
  phase: 'airway' | 'breathing' | 'circulation' | 'disability' | 'exposure'
): string {
  return emergencyMedicineColors.trauma[phase];
}

/**
 * Generate CSS custom properties for the color scheme
 */
export function generateCSSVariables(): Record<string, string> {
  const vars: Record<string, string> = {};
  const scheme = emergencyMedicineColors;

  // Primary colors
  vars['--em-primary'] = scheme.primary.base;
  vars['--em-primary-light'] = scheme.primary.light;
  vars['--em-primary-dark'] = scheme.primary.dark;

  // Secondary colors
  vars['--em-secondary'] = scheme.secondary.base;
  vars['--em-secondary-light'] = scheme.secondary.light;
  vars['--em-secondary-dark'] = scheme.secondary.dark;

  // Accent colors
  vars['--em-accent'] = scheme.accent.base;
  vars['--em-accent-light'] = scheme.accent.light;
  vars['--em-accent-dark'] = scheme.accent.dark;

  // Neutral colors
  vars['--em-neutral'] = scheme.neutral.base;
  vars['--em-neutral-light'] = scheme.neutral.light;
  vars['--em-neutral-dark'] = scheme.neutral.dark;

  // Triage colors
  vars['--em-triage-immediate'] = scheme.triage.immediate.background;
  vars['--em-triage-emergent'] = scheme.triage.emergent.background;
  vars['--em-triage-urgent'] = scheme.triage.urgent.background;
  vars['--em-triage-less-urgent'] = scheme.triage.lessUrgent.background;
  vars['--em-triage-non-urgent'] = scheme.triage.nonUrgent.background;

  // Status colors
  vars['--em-status-critical'] = scheme.status.critical;
  vars['--em-status-unstable'] = scheme.status.unstable;
  vars['--em-status-stable'] = scheme.status.stable;
  vars['--em-status-improved'] = scheme.status.improved;

  // Semantic colors
  vars['--em-success'] = scheme.semantic.success;
  vars['--em-warning'] = scheme.semantic.warning;
  vars['--em-error'] = scheme.semantic.error;
  vars['--em-info'] = scheme.semantic.info;

  return vars;
}

// =============================================================================
// EXPORT
// =============================================================================

export default emergencyMedicineColors;
