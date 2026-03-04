/**
 * Neurology Icon Library
 * Comprehensive SVG icons for neurological medicine
 *
 * Categories:
 * - Brain Anatomy (cerebrum, cerebellum, brainstem, ventricles, lobes)
 * - Neurons & Synapses (motor, sensory, interneurons, synaptic structures)
 * - Spinal Cord & Nerves (cord segments, peripheral nerves, plexuses)
 * - Pathology (stroke, tumor, aneurysm, demyelination)
 * - Diagnostic Equipment (EEG, MRI brain, lumbar puncture)
 */

import type { IconDefinition } from './index';

export const neurologyIcons: IconDefinition[] = [
  // ===========================================================================
  // BRAIN ANATOMY
  // ===========================================================================
  {
    id: 'neuro-brain-lateral',
    name: 'Brain Lateral View',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['brain', 'lateral', 'cerebrum', 'anatomy', 'cortex', 'gyri', 'sulci'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <path d="M20 20c4 1 8 1 12 0"/>
      <path d="M16 28c6 2 14 2 20 0"/>
      <path d="M18 36c4 1 10 1 14 0"/>
      <path d="M36 16v8"/>
      <circle cx="40" cy="40" r="3"/>
    </svg>`
  },
  {
    id: 'neuro-brain-superior',
    name: 'Brain Superior View',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['brain', 'superior', 'top', 'hemispheres', 'longitudinal fissure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="22" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="26" ry="22"/>
      <line x1="32" y1="10" x2="32" y2="54"/>
      <path d="M12 24c6 2 12 2 18 0"/>
      <path d="M34 24c6 2 12 2 18 0"/>
      <path d="M12 40c6-2 12-2 18 0"/>
      <path d="M34 40c6-2 12-2 18 0"/>
      <text x="16" y="34" font-size="5" fill="currentColor" stroke="none">L</text>
      <text x="44" y="34" font-size="5" fill="currentColor" stroke="none">R</text>
    </svg>`
  },
  {
    id: 'neuro-cerebrum',
    name: 'Cerebrum',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['cerebrum', 'cerebral', 'cortex', 'gray matter', 'white matter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 28c0-12 10-20 24-20s24 8 24 20c0 10-8 18-20 20h-8c-12-2-20-10-20-20z" fill="currentColor" opacity="0.15"/>
      <path d="M8 28c0-12 10-20 24-20s24 8 24 20c0 10-8 18-20 20h-8c-12-2-20-10-20-20z"/>
      <path d="M14 22c4 2 10 2 14 0"/>
      <path d="M36 22c4 2 10 2 14 0"/>
      <path d="M16 32c4 2 8 2 12 0"/>
      <path d="M36 32c4 2 8 2 12 0"/>
      <path d="M20 40c4 1 8 1 12 0"/>
      <line x1="32" y1="10" x2="32" y2="48" stroke-dasharray="3 2"/>
    </svg>`
  },
  {
    id: 'neuro-cerebellum',
    name: 'Cerebellum',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['cerebellum', 'posterior fossa', 'coordination', 'vermis', 'folia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="22" ry="16" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="36" rx="22" ry="16"/>
      <path d="M32 20v32"/>
      <path d="M12 32c4 1 8 1 12 0"/>
      <path d="M40 32c4 1 8 1 12 0"/>
      <path d="M14 40c3 1 7 1 10 0"/>
      <path d="M40 40c3 1 7 1 10 0"/>
      <path d="M16 48c3 0 6 0 9-1"/>
      <path d="M39 47c3 1 6 1 9 1"/>
      <ellipse cx="32" cy="36" rx="4" ry="12" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'neuro-brainstem',
    name: 'Brainstem',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['brainstem', 'midbrain', 'pons', 'medulla', 'cranial nerves'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 8h16c4 0 8 4 8 10v8c0 4-2 8-4 10v12c0 6-4 12-12 12s-12-6-12-12V36c-2-2-4-6-4-10v-8c0-6 4-10 8-10z" fill="currentColor" opacity="0.1"/>
      <path d="M24 8h16c4 0 8 4 8 10v8c0 4-2 8-4 10v12c0 6-4 12-12 12s-12-6-12-12V36c-2-2-4-6-4-10v-8c0-6 4-10 8-10z"/>
      <line x1="20" y1="18" x2="44" y2="18" stroke-dasharray="2 2"/>
      <line x1="20" y1="30" x2="44" y2="30" stroke-dasharray="2 2"/>
      <text x="24" y="14" font-size="4" fill="currentColor" stroke="none">Midbrain</text>
      <text x="28" y="26" font-size="4" fill="currentColor" stroke="none">Pons</text>
      <text x="24" y="42" font-size="4" fill="currentColor" stroke="none">Medulla</text>
    </svg>`
  },
  {
    id: 'neuro-ventricles',
    name: 'Cerebral Ventricles',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['ventricles', 'lateral', 'third', 'fourth', 'CSF', 'aqueduct'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-4 4-4 12 0 16l4 4-4 4v8l16 8 16-8v-8l-4-4 4-4c4-4 4-12 0-16l-8-4h-16z" fill="currentColor" opacity="0.2"/>
      <path d="M16 16c-4 4-4 12 0 16l4 4-4 4v8l16 8 16-8v-8l-4-4 4-4c4-4 4-12 0-16l-8-4h-16z"/>
      <ellipse cx="32" cy="32" rx="4" ry="3"/>
      <path d="M32 35v10"/>
      <text x="8" y="24" font-size="4" fill="currentColor" stroke="none">Lat</text>
      <text x="48" y="24" font-size="4" fill="currentColor" stroke="none">Lat</text>
      <text x="26" y="35" font-size="4" fill="currentColor" stroke="none">3rd</text>
      <text x="26" y="52" font-size="4" fill="currentColor" stroke="none">4th</text>
    </svg>`
  },
  {
    id: 'neuro-frontal-lobe',
    name: 'Frontal Lobe',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['frontal', 'lobe', 'prefrontal', 'motor', 'Broca', 'executive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-14 10-24 24-24s24 10 24 24c0 14-10 24-24 24S8 46 8 32z" stroke-dasharray="3 3" opacity="0.3"/>
      <path d="M8 32c0-10 6-20 16-24v48c-10-4-16-14-16-24z" fill="currentColor" opacity="0.3"/>
      <path d="M8 32c0-10 6-20 16-24v48c-10-4-16-14-16-24z"/>
      <line x1="24" y1="8" x2="24" y2="56" stroke-dasharray="4 2"/>
      <path d="M12 24c3 1 6 1 9 0"/>
      <path d="M12 40c3-1 6-1 9 0"/>
      <text x="10" y="34" font-size="5" fill="currentColor" stroke="none">F</text>
    </svg>`
  },
  {
    id: 'neuro-temporal-lobe',
    name: 'Temporal Lobe',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['temporal', 'lobe', 'auditory', 'Wernicke', 'memory', 'hippocampus'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-14 10-24 24-24s24 10 24 24c0 14-10 24-24 24S8 46 8 32z" stroke-dasharray="3 3" opacity="0.3"/>
      <path d="M16 48c-5-4-8-10-8-16s3-12 8-16c4 8 4 24 0 32z" fill="currentColor" opacity="0.3"/>
      <path d="M16 48c-5-4-8-10-8-16s3-12 8-16c4 8 4 24 0 32z"/>
      <path d="M10 36c2 1 4 1 6 0"/>
      <path d="M10 44c2 1 4 1 6 0"/>
      <text x="8" y="34" font-size="5" fill="currentColor" stroke="none">T</text>
    </svg>`
  },

  // ===========================================================================
  // NEURONS & SYNAPSES
  // ===========================================================================
  {
    id: 'neuro-neuron-multipolar',
    name: 'Multipolar Neuron',
    domain: 'medicine',
    category: 'neurons',
    tags: ['neuron', 'multipolar', 'motor', 'cell body', 'dendrites', 'axon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <circle cx="20" cy="32" r="8"/>
      <circle cx="20" cy="32" r="3" fill="currentColor"/>
      <path d="M8 24l6 4"/>
      <path d="M6 32h6"/>
      <path d="M8 40l6-4"/>
      <path d="M14 22l4 6"/>
      <path d="M14 42l4-6"/>
      <path d="M28 32h28"/>
      <path d="M32 32v-4"/>
      <path d="M40 32v4"/>
      <path d="M48 32v-4"/>
      <path d="M56 28l4 4-4 4"/>
    </svg>`
  },
  {
    id: 'neuro-neuron-sensory',
    name: 'Sensory Neuron',
    domain: 'medicine',
    category: 'neurons',
    tags: ['neuron', 'sensory', 'afferent', 'pseudounipolar', 'DRG'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="20" r="6"/>
      <path d="M32 26v12"/>
      <path d="M32 38l-16 16"/>
      <path d="M32 38l16 16"/>
      <path d="M16 54l-4-2m0 0l-2-4"/>
      <path d="M48 54l4-2m0 0l2-4"/>
      <circle cx="32" cy="20" r="2" fill="currentColor"/>
      <path d="M32 8v6"/>
    </svg>`
  },
  {
    id: 'neuro-synapse',
    name: 'Synapse',
    domain: 'medicine',
    category: 'neurons',
    tags: ['synapse', 'synaptic cleft', 'vesicles', 'neurotransmitter', 'receptor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h16" stroke-width="3"/>
      <rect x="24" y="24" width="8" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="24" width="8" height="16" rx="2"/>
      <circle cx="27" cy="28" r="1.5" fill="currentColor"/>
      <circle cx="27" cy="32" r="1.5" fill="currentColor"/>
      <circle cx="27" cy="36" r="1.5" fill="currentColor"/>
      <rect x="36" y="24" width="4" height="16" fill="currentColor" opacity="0.1"/>
      <path d="M40 28c2 0 4 2 4 4s-2 4-4 4"/>
      <path d="M44 32h12" stroke-width="3"/>
      <circle cx="37" cy="32" r="1" fill="currentColor"/>
      <circle cx="39" cy="28" r="1" fill="currentColor"/>
      <circle cx="39" cy="36" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'neuro-axon-myelin',
    name: 'Myelinated Axon',
    domain: 'medicine',
    category: 'neurons',
    tags: ['axon', 'myelin', 'Schwann cell', 'node of Ranvier', 'saltatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32"/>
      <rect x="8" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="22" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="50" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="26" width="10" height="12" rx="2"/>
      <rect x="22" y="26" width="10" height="12" rx="2"/>
      <rect x="36" y="26" width="10" height="12" rx="2"/>
      <rect x="50" y="26" width="10" height="12" rx="2"/>
      <text x="16" y="48" font-size="4" fill="currentColor" stroke="none">Node</text>
    </svg>`
  },
  {
    id: 'neuro-action-potential',
    name: 'Action Potential',
    domain: 'medicine',
    category: 'neurons',
    tags: ['action potential', 'depolarization', 'repolarization', 'threshold', 'voltage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="48" x2="56" y2="48"/>
      <line x1="8" y1="8" x2="8" y2="56"/>
      <path d="M12 44h8l2-4 2 4 4-32 4 40 4-8 4 4h12"/>
      <line x1="8" y1="40" x2="56" y2="40" stroke-dasharray="2 2" opacity="0.5"/>
      <text x="4" y="42" font-size="4" fill="currentColor" stroke="none">Th</text>
      <text x="28" y="60" font-size="4" fill="currentColor" stroke="none">Time</text>
      <text x="2" y="32" font-size="4" fill="currentColor" stroke="none">mV</text>
    </svg>`
  },
  {
    id: 'neuro-neurotransmitter',
    name: 'Neurotransmitter Release',
    domain: 'medicine',
    category: 'neurons',
    tags: ['neurotransmitter', 'vesicle', 'exocytosis', 'receptor', 'signal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="24" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="8" width="20" height="24" rx="2"/>
      <circle cx="14" cy="14" r="2" fill="currentColor"/>
      <circle cx="22" cy="14" r="2" fill="currentColor"/>
      <circle cx="18" cy="20" r="2" fill="currentColor"/>
      <circle cx="14" cy="26" r="2" fill="currentColor"/>
      <circle cx="22" cy="26" r="2" fill="currentColor"/>
      <path d="M28 20c4-2 8-2 8 4"/>
      <circle cx="38" cy="28" r="2" fill="currentColor"/>
      <circle cx="42" cy="36" r="2" fill="currentColor"/>
      <circle cx="46" cy="44" r="2" fill="currentColor"/>
      <rect x="36" y="48" width="20" height="8" rx="2"/>
      <path d="M42 48v-4c0-2 4-2 4 0v4"/>
      <path d="M50 48v-4c0-2 4-2 4 0v4"/>
    </svg>`
  },

  // ===========================================================================
  // SPINAL CORD & NERVES
  // ===========================================================================
  {
    id: 'neuro-spinal-cord',
    name: 'Spinal Cord Cross Section',
    domain: 'medicine',
    category: 'spinal',
    tags: ['spinal cord', 'gray matter', 'white matter', 'dorsal', 'ventral horn'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <path d="M20 24c0-4 4-8 12-8s12 4 12 8c0 2-2 4-4 4h-16c-2 0-4-2-4-4z" fill="currentColor" opacity="0.3"/>
      <path d="M20 40c0 4 4 8 12 8s12-4 12-8c0-2-2-4-4-4h-16c-2 0-4 2-4 4z" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M8 28l10 2"/>
      <path d="M8 36l10-2"/>
      <path d="M46 30l10-2"/>
      <path d="M46 34l10 2"/>
      <text x="28" y="18" font-size="4" fill="currentColor" stroke="none">DH</text>
      <text x="28" y="50" font-size="4" fill="currentColor" stroke="none">VH</text>
    </svg>`
  },
  {
    id: 'neuro-spinal-cord-long',
    name: 'Spinal Cord Longitudinal',
    domain: 'medicine',
    category: 'spinal',
    tags: ['spinal cord', 'cervical', 'thoracic', 'lumbar', 'sacral', 'segments'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 4h8v12c2 0 4 0 6 2v10c-2 2-4 2-6 2v20c2 2 4 6 0 10h-8c-4-4-2-8 0-10V30c-2 0-4 0-6-2V18c2-2 4-2 6-2V4z" fill="currentColor" opacity="0.1"/>
      <path d="M28 4h8v12c2 0 4 0 6 2v10c-2 2-4 2-6 2v20c2 2 4 6 0 10h-8c-4-4-2-8 0-10V30c-2 0-4 0-6-2V18c2-2 4-2 6-2V4z"/>
      <path d="M22 20h-8"/>
      <path d="M22 26h-8"/>
      <path d="M22 40h-10"/>
      <path d="M22 48h-10"/>
      <path d="M42 20h8"/>
      <path d="M42 26h8"/>
      <path d="M42 40h10"/>
      <path d="M42 48h10"/>
      <text x="4" y="12" font-size="4" fill="currentColor" stroke="none">C</text>
      <text x="4" y="30" font-size="4" fill="currentColor" stroke="none">T</text>
      <text x="4" y="50" font-size="4" fill="currentColor" stroke="none">L</text>
    </svg>`
  },
  {
    id: 'neuro-peripheral-nerve',
    name: 'Peripheral Nerve',
    domain: 'medicine',
    category: 'spinal',
    tags: ['peripheral', 'nerve', 'fascicle', 'epineurium', 'perineurium', 'endoneurium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <ellipse cx="24" cy="28" rx="6" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="28" rx="6" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="38" rx="6" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="28" rx="6" ry="5"/>
      <ellipse cx="40" cy="28" rx="6" ry="5"/>
      <ellipse cx="32" cy="38" rx="6" ry="5"/>
      <circle cx="24" cy="28" r="1" fill="currentColor"/>
      <circle cx="40" cy="28" r="1" fill="currentColor"/>
      <circle cx="32" cy="38" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'neuro-brachial-plexus',
    name: 'Brachial Plexus',
    domain: 'medicine',
    category: 'spinal',
    tags: ['brachial plexus', 'roots', 'trunks', 'cords', 'branches', 'arm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8h4"/>
      <path d="M8 16h4"/>
      <path d="M8 24h4"/>
      <path d="M8 32h4"/>
      <path d="M8 40h4"/>
      <path d="M12 8l8 8"/>
      <path d="M12 16l8 4"/>
      <path d="M12 24h8"/>
      <path d="M12 32l8-4"/>
      <path d="M12 40l8-8"/>
      <path d="M20 16v8"/>
      <path d="M20 24v8"/>
      <path d="M20 16l12 8"/>
      <path d="M20 24l12 4"/>
      <path d="M20 32l12-4"/>
      <path d="M32 24l16 8"/>
      <path d="M32 28l16 4"/>
      <path d="M32 28l16-4"/>
      <circle cx="20" cy="24" r="2" fill="currentColor"/>
      <text x="2" y="10" font-size="4" fill="currentColor" stroke="none">C5</text>
      <text x="2" y="42" font-size="4" fill="currentColor" stroke="none">T1</text>
    </svg>`
  },
  {
    id: 'neuro-dermatome',
    name: 'Dermatome Map',
    domain: 'medicine',
    category: 'spinal',
    tags: ['dermatome', 'sensory', 'distribution', 'spinal level', 'sensation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4c8 0 14 4 14 12v36c0 4-6 8-14 8s-14-4-14-8V16c0-8 6-12 14-12z" fill="currentColor" opacity="0.1"/>
      <path d="M32 4c8 0 14 4 14 12v36c0 4-6 8-14 8s-14-4-14-8V16c0-8 6-12 14-12z"/>
      <path d="M18 20h28"/>
      <path d="M18 28h28"/>
      <path d="M18 36h28"/>
      <path d="M18 44h28"/>
      <text x="20" y="18" font-size="4" fill="currentColor" stroke="none">C4</text>
      <text x="20" y="26" font-size="4" fill="currentColor" stroke="none">T4</text>
      <text x="20" y="34" font-size="4" fill="currentColor" stroke="none">T10</text>
      <text x="20" y="42" font-size="4" fill="currentColor" stroke="none">L1</text>
      <text x="20" y="50" font-size="4" fill="currentColor" stroke="none">S1</text>
    </svg>`
  },

  // ===========================================================================
  // PATHOLOGY
  // ===========================================================================
  {
    id: 'neuro-stroke-ischemic',
    name: 'Ischemic Stroke',
    domain: 'medicine',
    category: 'pathology',
    tags: ['stroke', 'ischemic', 'infarct', 'MCA', 'occlusion', 'penumbra'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <ellipse cx="36" cy="28" rx="10" ry="8" fill="red" opacity="0.3"/>
      <ellipse cx="36" cy="28" rx="10" ry="8" stroke="red"/>
      <path d="M24 20l8 4"/>
      <path d="M32 24l-8 8" stroke="red" stroke-width="2"/>
      <line x1="28" y1="24" x2="36" y2="32" stroke="red" stroke-width="2"/>
      <text x="32" y="44" font-size="4" fill="red" stroke="none">MCA</text>
    </svg>`
  },
  {
    id: 'neuro-stroke-hemorrhagic',
    name: 'Hemorrhagic Stroke',
    domain: 'medicine',
    category: 'pathology',
    tags: ['stroke', 'hemorrhagic', 'ICH', 'bleeding', 'hypertensive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <circle cx="32" cy="30" r="10" fill="red" opacity="0.4"/>
      <circle cx="32" cy="30" r="10" stroke="red" stroke-width="2"/>
      <path d="M26 26c2-2 4-2 6 0" stroke="red"/>
      <path d="M32 26c2-2 4-2 6 0" stroke="red"/>
      <path d="M28 34c3 2 6 2 8 0" stroke="red"/>
      <circle cx="32" cy="30" r="4" fill="red" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'neuro-brain-tumor',
    name: 'Brain Tumor',
    domain: 'medicine',
    category: 'pathology',
    tags: ['tumor', 'glioma', 'meningioma', 'mass', 'neoplasm', 'lesion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <circle cx="40" cy="24" r="12" fill="purple" opacity="0.3"/>
      <circle cx="40" cy="24" r="12" stroke="purple" stroke-width="2"/>
      <path d="M34 20c4-2 8-2 12 0" stroke="purple"/>
      <path d="M36 28c3 1 6 1 8 0" stroke="purple"/>
      <path d="M48 24h8" stroke="purple" stroke-dasharray="2 2"/>
      <text x="48" y="20" font-size="4" fill="purple" stroke="none">Mass</text>
    </svg>`
  },
  {
    id: 'neuro-aneurysm',
    name: 'Cerebral Aneurysm',
    domain: 'medicine',
    category: 'pathology',
    tags: ['aneurysm', 'saccular', 'berry', 'subarachnoid', 'Circle of Willis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 32h12"/>
      <path d="M36 32h12"/>
      <path d="M28 32c0-8 8-8 8 0"/>
      <circle cx="32" cy="16" r="8" fill="red" opacity="0.3"/>
      <circle cx="32" cy="16" r="8" stroke="red" stroke-width="2"/>
      <path d="M32 24v8"/>
      <text x="40" y="18" font-size="4" fill="red" stroke="none">Aneurysm</text>
      <path d="M28 48l4-8 4 8" stroke-dasharray="2 2"/>
      <text x="20" y="54" font-size="4" fill="currentColor" stroke="none">ACA</text>
      <text x="38" y="54" font-size="4" fill="currentColor" stroke="none">MCA</text>
    </svg>`
  },
  {
    id: 'neuro-demyelination',
    name: 'Demyelination',
    domain: 'medicine',
    category: 'pathology',
    tags: ['demyelination', 'MS', 'multiple sclerosis', 'plaque', 'lesion', 'white matter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32"/>
      <rect x="8" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="26" width="10" height="12" rx="2"/>
      <rect x="22" y="26" width="10" height="12" rx="2" fill="orange" opacity="0.3" stroke="orange"/>
      <rect x="36" y="26" width="10" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="26" width="10" height="12" rx="2"/>
      <rect x="50" y="26" width="10" height="12" rx="2" fill="orange" opacity="0.3" stroke="orange"/>
      <path d="M24 28l6 8m0-8l-6 8" stroke="orange"/>
      <path d="M52 28l6 8m0-8l-6 8" stroke="orange"/>
      <text x="20" y="48" font-size="4" fill="orange" stroke="none">Demyelinated</text>
    </svg>`
  },
  {
    id: 'neuro-hydrocephalus',
    name: 'Hydrocephalus',
    domain: 'medicine',
    category: 'pathology',
    tags: ['hydrocephalus', 'ventricle', 'dilation', 'CSF', 'NPH', 'obstruction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="22" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="26" ry="22"/>
      <path d="M16 20c-4 4-6 12-4 20 4 4 12 6 20 4" fill="blue" opacity="0.2"/>
      <path d="M48 20c4 4 6 12 4 20-4 4-12 6-20 4" fill="blue" opacity="0.2"/>
      <path d="M16 20c-4 4-6 12-4 20 4 4 12 6 20 4" stroke="blue"/>
      <path d="M48 20c4 4 6 12 4 20-4 4-12 6-20 4" stroke="blue"/>
      <line x1="32" y1="10" x2="32" y2="54"/>
      <text x="18" y="36" font-size="4" fill="blue" stroke="none">Dilated</text>
    </svg>`
  },

  // ===========================================================================
  // DIAGNOSTIC EQUIPMENT
  // ===========================================================================
  {
    id: 'neuro-eeg',
    name: 'EEG Electrodes',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['EEG', 'electroencephalogram', 'electrodes', 'brain waves', 'monitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="22" ry="18" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="22" ry="18"/>
      <circle cx="20" cy="20" r="3" fill="currentColor"/>
      <circle cx="44" cy="20" r="3" fill="currentColor"/>
      <circle cx="32" cy="14" r="3" fill="currentColor"/>
      <circle cx="16" cy="32" r="3" fill="currentColor"/>
      <circle cx="48" cy="32" r="3" fill="currentColor"/>
      <path d="M20 20v-8"/>
      <path d="M44 20v-8"/>
      <path d="M32 14v-6"/>
      <path d="M4 48h56"/>
      <path d="M8 48c2-4 4 4 6 0s4 4 6 0 4 4 6 0 4 4 6 0 4 4 6 0 4 4 6 0 4 4 6 0"/>
    </svg>`
  },
  {
    id: 'neuro-mri-brain',
    name: 'Brain MRI',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['MRI', 'magnetic resonance', 'brain', 'imaging', 'neuroimaging', 'scan'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <ellipse cx="32" cy="32" rx="18" ry="20" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="32" rx="18" ry="20"/>
      <line x1="32" y1="12" x2="32" y2="52" stroke-dasharray="2 2"/>
      <path d="M18 24c4 1 8 1 12 0"/>
      <path d="M34 24c4 1 8 1 12 0"/>
      <path d="M20 36c4-1 8-1 12 0"/>
      <path d="M32 36c4-1 8-1 12 0"/>
      <ellipse cx="32" cy="44" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'neuro-ct-head',
    name: 'Head CT',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['CT', 'computed tomography', 'head', 'brain', 'scan', 'imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="currentColor" opacity="0.05"/>
      <circle cx="32" cy="32" r="24"/>
      <ellipse cx="32" cy="32" rx="18" ry="16" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="32" rx="18" ry="16"/>
      <path d="M20 28c4 2 8 2 12 0"/>
      <path d="M32 28c4 2 8 2 12 0"/>
      <line x1="32" y1="16" x2="32" y2="48" stroke-dasharray="3 2"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <text x="24" y="60" font-size="4" fill="currentColor" stroke="none">AXIAL</text>
    </svg>`
  },
  {
    id: 'neuro-lumbar-puncture',
    name: 'Lumbar Puncture',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['lumbar puncture', 'spinal tap', 'CSF', 'L3', 'L4', 'procedure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 8c-4 4-4 8-4 16s0 12 4 16v16h24V40c4-4 4-8 4-16s0-12-4-16" fill="currentColor" opacity="0.1"/>
      <path d="M20 8c-4 4-4 8-4 16s0 12 4 16v16h24V40c4-4 4-8 4-16s0-12-4-16"/>
      <line x1="16" y1="28" x2="48" y2="28" stroke-dasharray="2 2"/>
      <line x1="16" y1="36" x2="48" y2="36" stroke-dasharray="2 2"/>
      <path d="M56 28l-16 4" stroke-width="2"/>
      <circle cx="40" cy="32" r="2" fill="currentColor"/>
      <text x="8" y="26" font-size="4" fill="currentColor" stroke="none">L3</text>
      <text x="8" y="38" font-size="4" fill="currentColor" stroke="none">L4</text>
      <path d="M48 40c0-4 4-8 8-8"/>
    </svg>`
  },
  {
    id: 'neuro-reflex-hammer',
    name: 'Reflex Hammer',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['reflex', 'hammer', 'DTR', 'neurological exam', 'patellar', 'tendon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v32"/>
      <ellipse cx="32" cy="44" rx="20" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="44" rx="20" ry="8"/>
      <path d="M32 36c-4 0-8 2-8 8"/>
      <path d="M32 36c4 0 8 2 8 8"/>
      <ellipse cx="32" cy="50" rx="16" ry="6"/>
      <circle cx="32" cy="4" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'neuro-emg',
    name: 'EMG Needle',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['EMG', 'electromyography', 'needle', 'nerve conduction', 'NCS', 'muscle'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="32" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="24" width="32" height="16" rx="2"/>
      <path d="M40 32h16l4-4v8l-4-4"/>
      <line x1="12" y1="32" x2="36" y2="32" stroke-dasharray="2 2"/>
      <circle cx="16" cy="32" r="2" fill="currentColor"/>
      <circle cx="24" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <path d="M8 48h48"/>
      <path d="M12 48c2-4 4 4 6 0s4 4 6 0 4 4 6 0 4 4 6 0 4 4 6 0"/>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL BRAIN ANATOMY - FOUNDATION_25
  // ===========================================================================
  {
    id: 'neuro-thalamus',
    name: 'Thalamus',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['thalamus', 'diencephalon', 'relay', 'sensory', 'VPL', 'VPM', 'LGN', 'MGN'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="32" rx="12" ry="16" fill="currentColor" opacity="0.25"/>
      <ellipse cx="40" cy="32" rx="12" ry="16" fill="currentColor" opacity="0.25"/>
      <ellipse cx="24" cy="32" rx="12" ry="16"/>
      <ellipse cx="40" cy="32" rx="12" ry="16"/>
      <path d="M24 20v24" stroke-dasharray="2 2"/>
      <path d="M40 20v24" stroke-dasharray="2 2"/>
      <line x1="32" y1="16" x2="32" y2="48"/>
      <text x="18" y="34" font-size="5" fill="currentColor" stroke="none">L</text>
      <text x="42" y="34" font-size="5" fill="currentColor" stroke="none">R</text>
      <circle cx="24" cy="24" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="40" cy="24" r="2" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'neuro-hypothalamus',
    name: 'Hypothalamus',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['hypothalamus', 'diencephalon', 'autonomic', 'pituitary', 'neuroendocrine', 'homeostasis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16h24c4 0 8 4 8 8v8c0 4-4 8-8 8h-8v8c-2 4-6 8-4 12h-8c2-4-2-8-4-12v-8h-8c-4 0-8-4-8-8v-8c0-4 4-8 8-8z" fill="currentColor" opacity="0.15"/>
      <path d="M20 16h24c4 0 8 4 8 8v8c0 4-4 8-8 8h-8v8c-2 4-6 8-4 12h-8c2-4-2-8-4-12v-8h-8c-4 0-8-4-8-8v-8c0-4 4-8 8-8z"/>
      <ellipse cx="32" cy="56" rx="6" ry="4" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="56" rx="6" ry="4"/>
      <circle cx="26" cy="24" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="38" cy="24" r="3" fill="currentColor" opacity="0.3"/>
      <text x="22" y="60" font-size="4" fill="currentColor" stroke="none">Pit</text>
    </svg>`
  },
  {
    id: 'neuro-hippocampus',
    name: 'Hippocampus',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['hippocampus', 'memory', 'temporal lobe', 'limbic', 'Alzheimer', 'seahorse', 'learning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-8 4-16 12-18 6-2 12 2 16 8 4 6 8 10 16 10" fill="currentColor" opacity="0.15"/>
      <path d="M12 32c0-8 4-16 12-18 6-2 12 2 16 8 4 6 8 10 16 10"/>
      <path d="M12 38c4 8 12 12 20 10 8-2 16-8 24-6"/>
      <path d="M20 28c4-2 8-2 12 0"/>
      <path d="M32 32c4 2 8 2 12 0"/>
      <circle cx="16" cy="32" r="2" fill="currentColor"/>
      <path d="M52 42c4 4 4 8 0 12"/>
      <text x="16" y="52" font-size="4" fill="currentColor" stroke="none">CA1</text>
      <text x="32" y="52" font-size="4" fill="currentColor" stroke="none">CA3</text>
      <text x="46" y="52" font-size="4" fill="currentColor" stroke="none">DG</text>
    </svg>`
  },
  {
    id: 'neuro-amygdala',
    name: 'Amygdala',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['amygdala', 'emotion', 'fear', 'limbic', 'temporal lobe', 'almond'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 20c-4 4-8 12-4 20 4 10 16 14 24 10 8-4 12-12 8-20-4-8-12-14-20-12-4 0-6 0-8 2z" fill="currentColor" opacity="0.2"/>
      <path d="M20 20c-4 4-8 12-4 20 4 10 16 14 24 10 8-4 12-12 8-20-4-8-12-14-20-12-4 0-6 0-8 2z"/>
      <ellipse cx="28" cy="32" rx="6" ry="8" fill="currentColor" opacity="0.3"/>
      <ellipse cx="38" cy="36" rx="5" ry="6" fill="currentColor" opacity="0.3"/>
      <path d="M24 28c2-2 6-2 8 0"/>
      <path d="M34 34c2-1 4-1 6 0"/>
      <text x="22" y="48" font-size="4" fill="currentColor" stroke="none">BLA</text>
      <text x="36" y="48" font-size="4" fill="currentColor" stroke="none">CeA</text>
    </svg>`
  },
  {
    id: 'neuro-basal-ganglia',
    name: 'Basal Ganglia',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['basal ganglia', 'caudate', 'putamen', 'globus pallidus', 'striatum', 'movement', 'Parkinson'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-4 8-4 24 4 32 8 8 20 8 28 0 8-8 8-24 4-32" fill="currentColor" opacity="0.1"/>
      <path d="M16 16c-4 8-4 24 4 32 8 8 20 8 28 0 8-8 8-24 4-32"/>
      <path d="M20 20c-2 6-2 16 2 22" stroke="red" fill="none"/>
      <ellipse cx="28" cy="32" rx="8" ry="12" fill="blue" opacity="0.2"/>
      <ellipse cx="28" cy="32" rx="8" ry="12" stroke="blue"/>
      <ellipse cx="40" cy="32" rx="6" ry="10" fill="green" opacity="0.2"/>
      <ellipse cx="40" cy="32" rx="6" ry="10" stroke="green"/>
      <ellipse cx="48" cy="32" rx="4" ry="8" fill="purple" opacity="0.2"/>
      <ellipse cx="48" cy="32" rx="4" ry="8" stroke="purple"/>
      <text x="8" y="40" font-size="3" fill="red" stroke="none">Caud</text>
      <text x="24" y="48" font-size="3" fill="blue" stroke="none">Put</text>
      <text x="40" y="48" font-size="3" fill="green" stroke="none">GPe</text>
      <text x="50" y="40" font-size="3" fill="purple" stroke="none">GPi</text>
    </svg>`
  },
  {
    id: 'neuro-corpus-callosum',
    name: 'Corpus Callosum',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['corpus callosum', 'commissure', 'genu', 'splenium', 'white matter', 'interhemispheric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c4-12 16-16 24-16s20 4 24 16c-4-8-16-10-24-10s-20 2-24 10z" fill="currentColor" opacity="0.25"/>
      <path d="M8 32c4-12 16-16 24-16s20 4 24 16c-4-8-16-10-24-10s-20 2-24 10z"/>
      <path d="M8 32c4 8 16 10 24 10s20-2 24-10" stroke-dasharray="3 2"/>
      <circle cx="12" cy="28" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="28" r="3" fill="currentColor" opacity="0.3"/>
      <text x="8" y="24" font-size="4" fill="currentColor" stroke="none">Genu</text>
      <text x="28" y="20" font-size="4" fill="currentColor" stroke="none">Body</text>
      <text x="44" y="24" font-size="4" fill="currentColor" stroke="none">Splenium</text>
    </svg>`
  },
  {
    id: 'neuro-parietal-lobe',
    name: 'Parietal Lobe',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['parietal', 'lobe', 'sensory', 'somatosensory', 'spatial', 'integration'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-14 10-24 24-24s24 10 24 24c0 14-10 24-24 24S8 46 8 32z" stroke-dasharray="3 3" opacity="0.3"/>
      <path d="M32 8c8 4 16 10 20 16v8c-4 10-12 16-20 16" fill="currentColor" opacity="0.3"/>
      <path d="M32 8c8 4 16 10 20 16v8c-4 10-12 16-20 16"/>
      <line x1="32" y1="8" x2="32" y2="48" stroke-dasharray="4 2"/>
      <path d="M36 20c4 2 8 2 12 0"/>
      <path d="M36 32c4-2 8-2 12 0"/>
      <text x="40" y="28" font-size="5" fill="currentColor" stroke="none">P</text>
      <path d="M52 24l4 4"/>
    </svg>`
  },
  {
    id: 'neuro-occipital-lobe',
    name: 'Occipital Lobe',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['occipital', 'lobe', 'visual', 'cortex', 'V1', 'calcarine', 'vision'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-14 10-24 24-24s24 10 24 24c0 14-10 24-24 24S8 46 8 32z" stroke-dasharray="3 3" opacity="0.3"/>
      <path d="M44 12c8 6 12 14 12 20s-4 14-12 20c-4-8-4-24 0-40z" fill="currentColor" opacity="0.3"/>
      <path d="M44 12c8 6 12 14 12 20s-4 14-12 20c-4-8-4-24 0-40z"/>
      <path d="M48 24c2 2 4 6 4 8"/>
      <path d="M48 40c2-2 4-6 4-8"/>
      <line x1="52" y1="20" x2="52" y2="44" stroke-dasharray="2 2"/>
      <text x="46" y="34" font-size="5" fill="currentColor" stroke="none">O</text>
      <circle cx="48" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <text x="38" y="54" font-size="4" fill="currentColor" stroke="none">V1</text>
    </svg>`
  },

  // ===========================================================================
  // SPINE ANATOMY - FOUNDATION_25
  // ===========================================================================
  {
    id: 'neuro-vertebral-column',
    name: 'Vertebral Column',
    domain: 'medicine',
    category: 'spinal',
    tags: ['vertebral column', 'spine', 'vertebrae', 'cervical', 'thoracic', 'lumbar', 'sacral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M28 4h8v4h-8z" fill="currentColor" opacity="0.3"/>
      <path d="M26 8h12v4H26z" fill="currentColor" opacity="0.3"/>
      <path d="M26 12h12v4H26z" fill="currentColor" opacity="0.3"/>
      <path d="M28 16h8v4h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M28 20h8v4h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M28 24h8v4h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M28 28h8v4h-8z" fill="currentColor" opacity="0.2"/>
      <path d="M26 32h12v4H26z" fill="currentColor" opacity="0.15"/>
      <path d="M26 36h12v4H26z" fill="currentColor" opacity="0.15"/>
      <path d="M26 40h12v4H26z" fill="currentColor" opacity="0.15"/>
      <path d="M24 44h16v6H24z" fill="currentColor" opacity="0.1"/>
      <path d="M28 50h8v6h-8z" fill="currentColor" opacity="0.05"/>
      <path d="M28 4h8v4h-8zM26 8h12v4H26zM26 12h12v4H26zM28 16h8v4h-8zM28 20h8v4h-8zM28 24h8v4h-8zM28 28h8v4h-8zM26 32h12v4H26zM26 36h12v4H26zM26 40h12v4H26zM24 44h16v6H24zM28 50h8v6h-8z"/>
      <text x="4" y="10" font-size="4" fill="currentColor" stroke="none">C</text>
      <text x="4" y="26" font-size="4" fill="currentColor" stroke="none">T</text>
      <text x="4" y="42" font-size="4" fill="currentColor" stroke="none">L</text>
      <text x="4" y="52" font-size="4" fill="currentColor" stroke="none">S</text>
    </svg>`
  },
  {
    id: 'neuro-cervical-spine',
    name: 'Cervical Spine',
    domain: 'medicine',
    category: 'spinal',
    tags: ['cervical', 'spine', 'C1-C7', 'atlas', 'axis', 'neck', 'vertebrae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="14" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="10" rx="14" ry="4"/>
      <circle cx="32" cy="10" r="4"/>
      <rect x="24" y="16" width="16" height="6" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="16" width="16" height="6" rx="1"/>
      <path d="M28 16v-6"/>
      <path d="M36 16v-6"/>
      <rect x="22" y="24" width="20" height="6" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="22" y="24" width="20" height="6" rx="1"/>
      <rect x="22" y="32" width="20" height="6" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="22" y="32" width="20" height="6" rx="1"/>
      <rect x="22" y="40" width="20" height="6" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="22" y="40" width="20" height="6" rx="1"/>
      <rect x="22" y="48" width="20" height="6" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="22" y="48" width="20" height="6" rx="1"/>
      <text x="8" y="12" font-size="4" fill="currentColor" stroke="none">C1</text>
      <text x="8" y="21" font-size="4" fill="currentColor" stroke="none">C2</text>
      <text x="8" y="53" font-size="4" fill="currentColor" stroke="none">C7</text>
    </svg>`
  },
  {
    id: 'neuro-thoracic-spine',
    name: 'Thoracic Spine',
    domain: 'medicine',
    category: 'spinal',
    tags: ['thoracic', 'spine', 'T1-T12', 'ribs', 'kyphosis', 'vertebrae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="26" y="6" width="12" height="5" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="6" width="12" height="5" rx="1"/>
      <path d="M26 8h-10c-2 2-2 6 0 8h10"/>
      <path d="M38 8h10c2 2 2 6 0 8h-10"/>
      <rect x="26" y="13" width="12" height="5" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="13" width="12" height="5" rx="1"/>
      <path d="M26 15h-10c-2 2-2 6 0 8h10"/>
      <path d="M38 15h10c2 2 2 6 0 8h-10"/>
      <rect x="26" y="20" width="12" height="5" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="20" width="12" height="5" rx="1"/>
      <rect x="26" y="27" width="12" height="5" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="27" width="12" height="5" rx="1"/>
      <rect x="26" y="34" width="12" height="5" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="26" y="34" width="12" height="5" rx="1"/>
      <rect x="26" y="41" width="12" height="5" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="26" y="41" width="12" height="5" rx="1"/>
      <rect x="26" y="48" width="12" height="5" rx="1" fill="currentColor" opacity="0.1"/>
      <rect x="26" y="48" width="12" height="5" rx="1"/>
      <text x="8" y="12" font-size="4" fill="currentColor" stroke="none">T1</text>
      <text x="8" y="53" font-size="4" fill="currentColor" stroke="none">T12</text>
    </svg>`
  },
  {
    id: 'neuro-lumbar-spine',
    name: 'Lumbar Spine',
    domain: 'medicine',
    category: 'spinal',
    tags: ['lumbar', 'spine', 'L1-L5', 'lordosis', 'lower back', 'vertebrae'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="8" width="24" height="8" rx="2"/>
      <rect x="18" y="18" width="28" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="18" y="18" width="28" height="8" rx="2"/>
      <rect x="18" y="28" width="28" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="18" y="28" width="28" height="8" rx="2"/>
      <rect x="20" y="38" width="24" height="8" rx="2" fill="currentColor" opacity="0.15"/>
      <rect x="20" y="38" width="24" height="8" rx="2"/>
      <rect x="22" y="48" width="20" height="8" rx="2" fill="currentColor" opacity="0.15"/>
      <rect x="22" y="48" width="20" height="8" rx="2"/>
      <path d="M14 12h4"/>
      <path d="M46 12h4"/>
      <path d="M12 22h4"/>
      <path d="M48 22h4"/>
      <circle cx="32" cy="12" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="22" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="32" r="2" fill="currentColor" opacity="0.3"/>
      <text x="6" y="14" font-size="4" fill="currentColor" stroke="none">L1</text>
      <text x="6" y="54" font-size="4" fill="currentColor" stroke="none">L5</text>
    </svg>`
  },
  {
    id: 'neuro-brain-sagittal',
    name: 'Brain Sagittal View',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['brain', 'sagittal', 'midline', 'corpus callosum', 'brainstem', 'cerebellum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 8-4 14-10 18l-6 10h-10l-4-8c-8-4-12-12-12-20z" fill="currentColor" opacity="0.1"/>
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 8-4 14-10 18l-6 10h-10l-4-8c-8-4-12-12-12-20z"/>
      <path d="M16 24c12-4 24-4 36 0" fill="currentColor" opacity="0.2"/>
      <path d="M16 24c12-4 24-4 36 0"/>
      <ellipse cx="44" cy="42" rx="10" ry="8" fill="currentColor" opacity="0.15"/>
      <ellipse cx="44" cy="42" rx="10" ry="8"/>
      <path d="M34 36v8c0 2-2 4-4 4"/>
      <text x="24" y="20" font-size="4" fill="currentColor" stroke="none">CC</text>
      <text x="40" y="44" font-size="4" fill="currentColor" stroke="none">Cb</text>
      <text x="28" y="44" font-size="4" fill="currentColor" stroke="none">BS</text>
    </svg>`
  },
  {
    id: 'neuro-brain-whole',
    name: 'Brain Whole',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['brain', 'whole', 'complete', 'overview', 'anatomy', 'cerebrum'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-14-12-14-22z" fill="currentColor" opacity="0.1"/>
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-14-12-14-22z"/>
      <path d="M16 20c4 2 10 2 14 0"/>
      <path d="M34 20c4 2 10 2 14 0"/>
      <path d="M14 30c6 2 14 2 20 0"/>
      <path d="M30 30c6 2 14 2 20 0"/>
      <path d="M18 40c4 1 10 1 14 0"/>
      <line x1="32" y1="10" x2="32" y2="48" stroke-dasharray="3 2"/>
      <circle cx="42" cy="40" r="4" fill="currentColor" opacity="0.15"/>
    </svg>`
  },
  {
    id: 'neuro-brain-hemisphere',
    name: 'Brain Hemisphere',
    domain: 'medicine',
    category: 'brain-anatomy',
    tags: ['brain', 'hemisphere', 'lateral', 'lobes', 'cortex', 'sulci', 'gyri'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-14 10-24 24-24 12 0 20 8 20 20 0 12-6 20-16 22l-4 8h-8l-2-6c-10-2-14-12-14-20z" fill="currentColor" opacity="0.1"/>
      <path d="M8 32c0-14 10-24 24-24 12 0 20 8 20 20 0 12-6 20-16 22l-4 8h-8l-2-6c-10-2-14-12-14-20z"/>
      <path d="M16 16l20 4" stroke="red" opacity="0.6"/>
      <path d="M36 20c4 8 8 12 12 14" stroke="blue" opacity="0.6"/>
      <path d="M14 32c8 1 16 1 24 0"/>
      <path d="M18 42c6 2 12 2 18 0"/>
      <text x="12" y="26" font-size="4" fill="currentColor" stroke="none">F</text>
      <text x="36" y="18" font-size="4" fill="currentColor" stroke="none">P</text>
      <text x="44" y="36" font-size="4" fill="currentColor" stroke="none">O</text>
      <text x="18" y="44" font-size="4" fill="currentColor" stroke="none">T</text>
    </svg>`
  },
  {
    id: 'neuro-nerve-bundle',
    name: 'Nerve Bundle',
    domain: 'medicine',
    category: 'spinal',
    tags: ['nerve', 'bundle', 'fibers', 'axons', 'fascicle', 'connective tissue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="24" ry="20"/>
      <ellipse cx="20" cy="24" rx="6" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="20" cy="24" rx="6" ry="5"/>
      <ellipse cx="36" cy="22" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="36" cy="22" rx="8" ry="6"/>
      <ellipse cx="44" cy="36" rx="6" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="44" cy="36" rx="6" ry="5"/>
      <ellipse cx="24" cy="40" rx="7" ry="5" fill="currentColor" opacity="0.2"/>
      <ellipse cx="24" cy="40" rx="7" ry="5"/>
      <ellipse cx="38" cy="42" rx="4" ry="3" fill="currentColor" opacity="0.2"/>
      <ellipse cx="38" cy="42" rx="4" ry="3"/>
      <circle cx="20" cy="24" r="1" fill="currentColor"/>
      <circle cx="36" cy="22" r="1.5" fill="currentColor"/>
      <circle cx="44" cy="36" r="1" fill="currentColor"/>
      <circle cx="24" cy="40" r="1" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'neuro-nerve-impulse',
    name: 'Nerve Impulse',
    domain: 'medicine',
    category: 'neurons',
    tags: ['nerve', 'impulse', 'signal', 'propagation', 'action potential', 'conduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32" stroke-width="2"/>
      <circle cx="8" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="8" cy="32" r="4"/>
      <path d="M16 32c2-8 4-12 6-12s4 24 6 24 4-20 6-20 4 16 6 16 4-12 6-12 2 4 4 4" stroke="red" stroke-width="2" fill="none"/>
      <path d="M46 32h10"/>
      <polygon points="56,28 60,32 56,36" fill="currentColor"/>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">Depolarization</text>
      <text x="36" y="48" font-size="4" fill="currentColor" stroke="none">Propagation</text>
    </svg>`
  },

  // ===========================================================================
  // NEUROLOGICAL DISORDERS - PATHOLOGY_50
  // ===========================================================================
  {
    id: 'neuro-epilepsy-seizure',
    name: 'Epilepsy Seizure Focus',
    domain: 'medicine',
    category: 'pathology',
    tags: ['epilepsy', 'seizure', 'focus', 'ictal', 'epileptogenic', 'convulsion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <circle cx="28" cy="24" r="6" fill="red" opacity="0.4"/>
      <circle cx="28" cy="24" r="6" stroke="red" stroke-width="2"/>
      <path d="M28 18l2 4-4 2 4 2-2 4" stroke="yellow" stroke-width="2"/>
      <path d="M20 32c4-2 8-2 12 0" opacity="0.5"/>
      <path d="M34 28c2 1 4 1 6 0" opacity="0.5"/>
      <path d="M34 20l8-4" stroke="red" stroke-dasharray="2 2"/>
      <path d="M22 28l-6 4" stroke="red" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'neuro-parkinson-disease',
    name: 'Parkinson Disease',
    domain: 'medicine',
    category: 'pathology',
    tags: ['Parkinson', 'substantia nigra', 'dopamine', 'tremor', 'bradykinesia', 'rigidity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-12-14-22z" fill="currentColor" opacity="0.1"/>
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-12-14-22z"/>
      <ellipse cx="26" cy="40" rx="4" ry="3" fill="gray" opacity="0.5" stroke="gray"/>
      <ellipse cx="38" cy="40" rx="4" ry="3" fill="gray" opacity="0.5" stroke="gray"/>
      <path d="M26 40l-4-6" stroke="red" stroke-dasharray="2 2"/>
      <path d="M38 40l4-6" stroke="red" stroke-dasharray="2 2"/>
      <text x="18" y="52" font-size="4" fill="gray" stroke="none">SNpc</text>
      <text x="36" y="52" font-size="4" fill="gray" stroke="none">SNpc</text>
      <path d="M8 16c2-2 2-4 0-6" stroke="orange"/>
      <path d="M10 18c2-2 2-4 0-6" stroke="orange"/>
    </svg>`
  },
  {
    id: 'neuro-alzheimer-disease',
    name: 'Alzheimer Disease',
    domain: 'medicine',
    category: 'pathology',
    tags: ['Alzheimer', 'dementia', 'amyloid', 'tau', 'plaques', 'tangles', 'atrophy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-12-14-22z" fill="currentColor" opacity="0.1"/>
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-12-14-22z"/>
      <circle cx="20" cy="24" r="3" fill="brown" opacity="0.5"/>
      <circle cx="32" cy="20" r="2" fill="brown" opacity="0.5"/>
      <circle cx="40" cy="28" r="3" fill="brown" opacity="0.5"/>
      <circle cx="28" cy="34" r="2" fill="brown" opacity="0.5"/>
      <path d="M18 32c2-4 1-6-1-8" stroke="purple" stroke-width="1"/>
      <path d="M36 36c2-4 1-6-1-8" stroke="purple" stroke-width="1"/>
      <path d="M44 20c1-3 0-5-2-7" stroke="purple" stroke-width="1"/>
      <text x="16" y="48" font-size="3" fill="brown" stroke="none">Plaques</text>
      <text x="34" y="48" font-size="3" fill="purple" stroke="none">Tangles</text>
    </svg>`
  },
  {
    id: 'neuro-huntington-disease',
    name: 'Huntington Disease',
    domain: 'medicine',
    category: 'pathology',
    tags: ['Huntington', 'chorea', 'caudate', 'atrophy', 'genetic', 'CAG repeat'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c-4 8-4 24 4 32 8 8 20 8 28 0 8-8 8-24 4-32" fill="currentColor" opacity="0.1"/>
      <path d="M16 16c-4 8-4 24 4 32 8 8 20 8 28 0 8-8 8-24 4-32"/>
      <path d="M22 24c-2 4-2 12 2 16" stroke="orange" stroke-dasharray="3 2"/>
      <ellipse cx="30" cy="32" rx="4" ry="6" fill="orange" opacity="0.3" stroke="orange"/>
      <ellipse cx="40" cy="32" rx="4" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="40" cy="32" rx="4" ry="6"/>
      <path d="M10 14c2 2 1 4-1 5" stroke="red"/>
      <path d="M54 14c-2 2-1 4 1 5" stroke="red"/>
      <text x="24" y="50" font-size="3" fill="orange" stroke="none">Atrophied</text>
      <text x="24" y="56" font-size="3" fill="orange" stroke="none">Caudate</text>
    </svg>`
  },
  {
    id: 'neuro-als-disease',
    name: 'ALS Motor Neuron Disease',
    domain: 'medicine',
    category: 'pathology',
    tags: ['ALS', 'motor neuron', 'amyotrophic', 'lateral sclerosis', 'UMN', 'LMN'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="20" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="20" cy="20" r="6"/>
      <path d="M26 20h20" stroke-width="2"/>
      <path d="M32 16v8"/>
      <path d="M40 16v8"/>
      <path d="M46 20l8 4"/>
      <path d="M46 20l8-4"/>
      <circle cx="20" cy="44" r="6" fill="red" opacity="0.3" stroke="red"/>
      <path d="M26 44h8" stroke="red" stroke-dasharray="3 3"/>
      <line x1="34" y1="40" x2="42" y2="48" stroke="red" stroke-width="2"/>
      <line x1="34" y1="48" x2="42" y2="40" stroke="red" stroke-width="2"/>
      <text x="4" y="22" font-size="4" fill="currentColor" stroke="none">UMN</text>
      <text x="4" y="46" font-size="4" fill="red" stroke="none">LMN</text>
      <text x="46" y="50" font-size="3" fill="red" stroke="none">Denervation</text>
    </svg>`
  },
  {
    id: 'neuro-myasthenia-gravis',
    name: 'Myasthenia Gravis',
    domain: 'medicine',
    category: 'pathology',
    tags: ['myasthenia gravis', 'NMJ', 'acetylcholine', 'antibody', 'weakness', 'fatigability'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 24h20" stroke-width="3"/>
      <rect x="28" y="18" width="8" height="12" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="28" y="18" width="8" height="12" rx="1"/>
      <circle cx="31" cy="22" r="1.5" fill="currentColor"/>
      <circle cx="31" cy="26" r="1.5" fill="currentColor"/>
      <rect x="40" y="18" width="4" height="12"/>
      <path d="M44 22c2 0 4 2 4 4s-2 4-4 4"/>
      <path d="M48 26h8" stroke-width="3"/>
      <circle cx="42" cy="26" r="1" fill="currentColor"/>
      <path d="M38 22l-2 4" stroke="red"/>
      <path d="M38 26l-4 1" stroke="red"/>
      <ellipse cx="42" cy="10" rx="4" ry="2" fill="red" opacity="0.3" stroke="red"/>
      <path d="M42 12l-4 10" stroke="red" stroke-dasharray="2 2"/>
      <text x="36" y="8" font-size="3" fill="red" stroke="none">Anti-AChR Ab</text>
      <text x="12" y="44" font-size="4" fill="currentColor" stroke="none">Blocked receptors</text>
    </svg>`
  },
  {
    id: 'neuro-guillain-barre',
    name: 'Guillain-Barre Syndrome',
    domain: 'medicine',
    category: 'pathology',
    tags: ['Guillain-Barre', 'GBS', 'AIDP', 'demyelinating', 'ascending paralysis', 'areflexia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="32" y1="8" x2="32" y2="56"/>
      <rect x="22" y="12" width="8" height="6" rx="1" fill="red" opacity="0.3" stroke="red"/>
      <rect x="34" y="12" width="8" height="6" rx="1" fill="red" opacity="0.3" stroke="red"/>
      <rect x="22" y="22" width="8" height="6" rx="1" fill="red" opacity="0.3" stroke="red"/>
      <rect x="34" y="22" width="8" height="6" rx="1" fill="red" opacity="0.3" stroke="red"/>
      <rect x="22" y="32" width="8" height="6" rx="1" fill="orange" opacity="0.3" stroke="orange"/>
      <rect x="34" y="32" width="8" height="6" rx="1" fill="orange" opacity="0.3" stroke="orange"/>
      <rect x="22" y="42" width="8" height="6" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="34" y="42" width="8" height="6" rx="1" fill="currentColor" opacity="0.2"/>
      <path d="M8 48l12-4" stroke="blue"/>
      <path d="M56 48l-12-4" stroke="blue"/>
      <path d="M6 28l14 1" stroke-dasharray="3 2"/>
      <path d="M58 28l-14 1" stroke-dasharray="3 2"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Ascending weakness</text>
    </svg>`
  },
  {
    id: 'neuro-meningitis',
    name: 'Meningitis',
    domain: 'medicine',
    category: 'pathology',
    tags: ['meningitis', 'meninges', 'infection', 'inflammation', 'CSF', 'nuchal rigidity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-12-14-22z" fill="currentColor" opacity="0.1"/>
      <path d="M10 30c0-14 10-24 24-24s24 10 24 24" stroke="red" stroke-width="3" opacity="0.5"/>
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-12-14-22z"/>
      <circle cx="16" cy="20" r="2" fill="red"/>
      <circle cx="24" cy="14" r="2" fill="red"/>
      <circle cx="36" cy="12" r="2" fill="red"/>
      <circle cx="46" cy="18" r="2" fill="red"/>
      <circle cx="50" cy="28" r="2" fill="red"/>
      <text x="16" y="50" font-size="4" fill="red" stroke="none">Inflamed meninges</text>
    </svg>`
  },
  {
    id: 'neuro-encephalitis',
    name: 'Encephalitis',
    domain: 'medicine',
    category: 'pathology',
    tags: ['encephalitis', 'brain', 'infection', 'inflammation', 'viral', 'HSV'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-12-14-22z" fill="red" opacity="0.15"/>
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-12-14-22z" stroke="red"/>
      <ellipse cx="24" cy="32" rx="8" ry="10" fill="red" opacity="0.3"/>
      <ellipse cx="24" cy="32" rx="8" ry="10" stroke="red"/>
      <path d="M20 28c2 2 6 2 8 0" stroke="red"/>
      <path d="M20 36c2-2 6-2 8 0" stroke="red"/>
      <text x="36" y="30" font-size="4" fill="red" stroke="none">Temporal</text>
      <text x="36" y="36" font-size="4" fill="red" stroke="none">Lobe</text>
      <text x="6" y="56" font-size="3" fill="red" stroke="none">HSV Encephalitis</text>
    </svg>`
  },
  {
    id: 'neuro-subdural-hematoma',
    name: 'Subdural Hematoma',
    domain: 'medicine',
    category: 'pathology',
    tags: ['subdural', 'hematoma', 'SDH', 'bleeding', 'bridging veins', 'mass effect'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="22" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="26" ry="22"/>
      <path d="M10 22c6 4 16 6 26 4" fill="red" opacity="0.5" stroke="red" stroke-width="2"/>
      <path d="M8 26c8 4 20 6 30 2" fill="red" opacity="0.3"/>
      <path d="M36 32c-2 4-8 4-12 0" stroke-dasharray="2 2"/>
      <line x1="32" y1="14" x2="32" y2="50" stroke-dasharray="3 3"/>
      <path d="M30 36l-8 4" stroke="blue"/>
      <text x="14" y="14" font-size="4" fill="red" stroke="none">Crescent</text>
      <text x="36" y="50" font-size="4" fill="currentColor" stroke="none">Midline shift</text>
    </svg>`
  },
  {
    id: 'neuro-epidural-hematoma',
    name: 'Epidural Hematoma',
    domain: 'medicine',
    category: 'pathology',
    tags: ['epidural', 'hematoma', 'EDH', 'bleeding', 'middle meningeal', 'lucid interval'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="22" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="26" ry="22"/>
      <ellipse cx="18" cy="28" rx="8" ry="12" fill="red" opacity="0.5" stroke="red" stroke-width="2"/>
      <path d="M22 32c-2 4-4 4-6 2"/>
      <path d="M30 28c-2 4-6 4-8 0" stroke-dasharray="2 2"/>
      <line x1="32" y1="12" x2="36" y2="52" stroke-dasharray="3 3"/>
      <text x="10" y="50" font-size="4" fill="red" stroke="none">Biconvex</text>
      <text x="36" y="50" font-size="4" fill="currentColor" stroke="none">MMA injury</text>
    </svg>`
  },
  {
    id: 'neuro-disc-herniation',
    name: 'Disc Herniation',
    domain: 'medicine',
    category: 'pathology',
    tags: ['disc', 'herniation', 'prolapse', 'radiculopathy', 'nucleus pulposus', 'sciatica'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="8" width="32" height="12" rx="2"/>
      <ellipse cx="32" cy="28" rx="16" ry="6" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="28" rx="16" ry="6"/>
      <ellipse cx="44" cy="30" rx="6" ry="4" fill="red" opacity="0.4" stroke="red"/>
      <rect x="16" y="36" width="32" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="16" y="36" width="32" height="12" rx="2"/>
      <path d="M50 30l8 4" stroke="red"/>
      <path d="M50 34l8 8" stroke="red"/>
      <circle cx="32" cy="28" r="4" fill="currentColor" opacity="0.3"/>
      <text x="4" y="56" font-size="4" fill="red" stroke="none">Nerve root compression</text>
    </svg>`
  },
  {
    id: 'neuro-spinal-stenosis',
    name: 'Spinal Stenosis',
    domain: 'medicine',
    category: 'pathology',
    tags: ['stenosis', 'spinal canal', 'narrowing', 'claudication', 'compression', 'lumbar'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <path d="M24 8v48" stroke-width="2"/>
      <path d="M40 8v48" stroke-width="2"/>
      <rect x="28" y="12" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="24" width="8" height="8" fill="red" opacity="0.3" stroke="red"/>
      <rect x="26" y="24" width="12" height="8" stroke="red" stroke-width="2"/>
      <rect x="28" y="36" width="8" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M16 28h8"/>
      <path d="M40 28h8"/>
      <text x="14" y="60" font-size="4" fill="red" stroke="none">Narrowed canal</text>
    </svg>`
  },
  {
    id: 'neuro-peripheral-neuropathy',
    name: 'Peripheral Neuropathy',
    domain: 'medicine',
    category: 'pathology',
    tags: ['neuropathy', 'peripheral', 'diabetic', 'sensory', 'stocking-glove', 'numbness'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v20"/>
      <circle cx="32" cy="28" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="28" r="6"/>
      <path d="M26 34l-10 20"/>
      <path d="M38 34l10 20"/>
      <path d="M16 54l-6 6"/>
      <path d="M48 54l6 6"/>
      <path d="M14 48c4-2 8-2 12 0" fill="red" opacity="0.3" stroke="red"/>
      <path d="M38 48c4-2 8-2 12 0" fill="red" opacity="0.3" stroke="red"/>
      <path d="M10 54c4-2 10-2 14 0" fill="red" opacity="0.4" stroke="red"/>
      <path d="M40 54c4-2 10-2 14 0" fill="red" opacity="0.4" stroke="red"/>
      <text x="10" y="44" font-size="3" fill="red" stroke="none">Stocking-glove</text>
    </svg>`
  },
  {
    id: 'neuro-trigeminal-neuralgia',
    name: 'Trigeminal Neuralgia',
    domain: 'medicine',
    category: 'pathology',
    tags: ['trigeminal', 'neuralgia', 'facial pain', 'V1', 'V2', 'V3', 'tic douloureux'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="18" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="18" ry="20"/>
      <circle cx="32" cy="24" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M28 24l-12-8" stroke="red" stroke-width="2"/>
      <path d="M28 28l-14 4" stroke="red" stroke-width="2"/>
      <path d="M30 32l-12 12" stroke="red" stroke-width="2"/>
      <circle cx="16" cy="16" r="3" fill="red" opacity="0.4"/>
      <circle cx="14" cy="32" r="3" fill="red" opacity="0.4"/>
      <circle cx="18" cy="44" r="3" fill="red" opacity="0.4"/>
      <text x="4" y="18" font-size="4" fill="red" stroke="none">V1</text>
      <text x="2" y="34" font-size="4" fill="red" stroke="none">V2</text>
      <text x="4" y="50" font-size="4" fill="red" stroke="none">V3</text>
      <path d="M26 48l4 4" stroke="yellow" stroke-width="2"/>
      <path d="M28 50l4-4" stroke="yellow" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'neuro-bells-palsy',
    name: 'Bell Palsy',
    domain: 'medicine',
    category: 'pathology',
    tags: ['Bell palsy', 'facial nerve', 'CN VII', 'LMN', 'weakness', 'paralysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="24" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="24"/>
      <ellipse cx="24" cy="24" rx="4" ry="3"/>
      <ellipse cx="40" cy="24" rx="4" ry="3" fill="currentColor" opacity="0.2" stroke-dasharray="2 2"/>
      <circle cx="24" cy="24" r="1.5" fill="currentColor"/>
      <path d="M20 36c4 4 8 4 12 0"/>
      <path d="M32 36c4 1 8-1 10-3" stroke-dasharray="2 2"/>
      <path d="M20 16c2-2 6-2 8 0"/>
      <path d="M36 16c2-1 6 0 8 2" stroke-dasharray="2 2"/>
      <line x1="32" y1="8" x2="32" y2="56" stroke-dasharray="4 2" opacity="0.3"/>
      <text x="38" y="50" font-size="3" fill="red" stroke="none">Affected</text>
      <text x="38" y="56" font-size="3" fill="red" stroke="none">side</text>
    </svg>`
  },

  // ===========================================================================
  // SURGICAL PROCEDURES - CLINICAL_75
  // ===========================================================================
  {
    id: 'neuro-craniotomy',
    name: 'Craniotomy',
    domain: 'medicine',
    category: 'surgery',
    tags: ['craniotomy', 'surgery', 'brain', 'bone flap', 'skull', 'neurosurgery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="24" ry="20"/>
      <path d="M20 14a16 12 0 0 1 24 0" stroke="red" stroke-width="2"/>
      <path d="M20 14l-4-6" stroke="red"/>
      <path d="M44 14l4-6" stroke="red"/>
      <path d="M24 12c4-2 12-2 16 0" fill="currentColor" opacity="0.2" stroke="blue" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="20" rx="8" ry="6" fill="currentColor" opacity="0.3"/>
      <text x="8" y="52" font-size="4" fill="currentColor" stroke="none">Bone flap</text>
      <text x="36" y="52" font-size="4" fill="blue" stroke="none">Dura</text>
    </svg>`
  },
  {
    id: 'neuro-vp-shunt',
    name: 'VP Shunt',
    domain: 'medicine',
    category: 'surgery',
    tags: ['VP shunt', 'ventriculoperitoneal', 'hydrocephalus', 'CSF', 'drainage', 'catheter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="14" rx="16" ry="10" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="14" rx="16" ry="10"/>
      <path d="M32 14c-2 2-4 4-4 6" fill="blue" opacity="0.2"/>
      <path d="M28 20v4"/>
      <rect x="24" y="24" width="8" height="6" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="24" y="24" width="8" height="6" rx="1"/>
      <path d="M28 30v20"/>
      <path d="M28 50c4 4 12 4 16 2"/>
      <ellipse cx="44" cy="52" rx="8" ry="4" fill="currentColor" opacity="0.1"/>
      <ellipse cx="44" cy="52" rx="8" ry="4"/>
      <circle cx="32" cy="14" r="3" fill="blue" opacity="0.3"/>
      <text x="6" y="28" font-size="3" fill="currentColor" stroke="none">Valve</text>
      <text x="38" y="58" font-size="3" fill="currentColor" stroke="none">Peritoneum</text>
    </svg>`
  },
  {
    id: 'neuro-dbs-electrode',
    name: 'Deep Brain Stimulator',
    domain: 'medicine',
    category: 'surgery',
    tags: ['DBS', 'deep brain stimulation', 'electrode', 'Parkinson', 'tremor', 'neurostimulator'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="18" ry="14" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="20" rx="18" ry="14"/>
      <path d="M24 8v24"/>
      <path d="M40 8v24"/>
      <circle cx="24" cy="20" r="2" fill="blue"/>
      <circle cx="40" cy="20" r="2" fill="blue"/>
      <circle cx="24" cy="26" r="2" fill="blue"/>
      <circle cx="40" cy="26" r="2" fill="blue"/>
      <path d="M24 8c-4-4-8-4-12 0"/>
      <path d="M40 8c4-4 8-4 12 0"/>
      <path d="M12 8v8"/>
      <path d="M52 8v8"/>
      <rect x="8" y="44" width="12" height="16" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="44" width="12" height="16" rx="2"/>
      <path d="M12 16v28"/>
      <text x="22" y="58" font-size="3" fill="currentColor" stroke="none">IPG</text>
      <text x="28" y="38" font-size="3" fill="blue" stroke="none">STN</text>
    </svg>`
  },
  {
    id: 'neuro-spine-fusion',
    name: 'Spinal Fusion',
    domain: 'medicine',
    category: 'surgery',
    tags: ['fusion', 'spine', 'ACDF', 'PLIF', 'instrumentation', 'screws', 'rods'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="22" y="8" width="20" height="10" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="22" y="8" width="20" height="10" rx="2"/>
      <rect x="22" y="22" width="20" height="10" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="22" y="22" width="20" height="10" rx="2"/>
      <rect x="22" y="36" width="20" height="10" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="22" y="36" width="20" height="10" rx="2"/>
      <rect x="24" y="18" width="16" height="4" fill="gray" opacity="0.3"/>
      <rect x="24" y="32" width="16" height="4" fill="gray" opacity="0.3"/>
      <path d="M16 12v40" stroke="blue" stroke-width="3"/>
      <path d="M48 12v40" stroke="blue" stroke-width="3"/>
      <circle cx="16" cy="13" r="3" fill="blue"/>
      <circle cx="16" cy="27" r="3" fill="blue"/>
      <circle cx="16" cy="41" r="3" fill="blue"/>
      <circle cx="48" cy="13" r="3" fill="blue"/>
      <circle cx="48" cy="27" r="3" fill="blue"/>
      <circle cx="48" cy="41" r="3" fill="blue"/>
      <text x="4" y="58" font-size="3" fill="blue" stroke="none">Pedicle screws + rods</text>
    </svg>`
  },
  {
    id: 'neuro-laminectomy',
    name: 'Laminectomy',
    domain: 'medicine',
    category: 'surgery',
    tags: ['laminectomy', 'decompression', 'stenosis', 'spine', 'lamina', 'surgery'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="12" width="24" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="12" width="24" height="40" rx="4"/>
      <ellipse cx="32" cy="24" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="24" rx="8" ry="4"/>
      <path d="M28 28v8h8v-8" fill="red" opacity="0.2" stroke="red" stroke-dasharray="3 2"/>
      <ellipse cx="32" cy="44" rx="8" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="44" rx="8" ry="4"/>
      <circle cx="32" cy="24" r="2" fill="currentColor"/>
      <circle cx="32" cy="44" r="2" fill="currentColor"/>
      <path d="M14 32h8"/>
      <path d="M42 32h8"/>
      <text x="4" y="58" font-size="3" fill="red" stroke="none">Lamina removed</text>
    </svg>`
  },
  {
    id: 'neuro-aneurysm-clip',
    name: 'Aneurysm Clipping',
    domain: 'medicine',
    category: 'surgery',
    tags: ['aneurysm', 'clip', 'clipping', 'SAH', 'microsurgery', 'berry aneurysm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 40h14"/>
      <path d="M34 40h14"/>
      <path d="M30 40v-8"/>
      <path d="M34 40v-8"/>
      <circle cx="32" cy="22" r="10" fill="red" opacity="0.3" stroke="red"/>
      <rect x="28" y="30" width="8" height="4" fill="gray"/>
      <path d="M28 32h-4l-2 4" stroke="gray" stroke-width="2"/>
      <path d="M36 32h4l2 4" stroke="gray" stroke-width="2"/>
      <text x="40" y="20" font-size="4" fill="red" stroke="none">Aneurysm</text>
      <text x="14" y="50" font-size="4" fill="gray" stroke="none">Surgical clip</text>
    </svg>`
  },
  {
    id: 'neuro-coiling',
    name: 'Endovascular Coiling',
    domain: 'medicine',
    category: 'surgery',
    tags: ['coiling', 'endovascular', 'aneurysm', 'interventional', 'coil embolization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 48h14"/>
      <path d="M34 48h14"/>
      <path d="M30 48v-12"/>
      <path d="M34 48v-12"/>
      <circle cx="32" cy="24" r="12" stroke-width="2"/>
      <path d="M26 24c2-4 4-4 6 0s4 4 6 0-4-4-6 0-4 4-6 0 4-4 6 0" fill="none" stroke="blue" stroke-width="1.5"/>
      <path d="M28 28c1-2 2-2 3 0s2 2 3 0-2-2-3 0-2 2-3 0 2-2 3 0" fill="none" stroke="blue" stroke-width="1.5"/>
      <path d="M34 48l8 8" stroke="gray"/>
      <circle cx="44" cy="58" r="3" fill="gray" opacity="0.3"/>
      <text x="4" y="20" font-size="4" fill="blue" stroke="none">Coils</text>
      <text x="40" y="56" font-size="3" fill="gray" stroke="none">Catheter</text>
    </svg>`
  },
  {
    id: 'neuro-thrombectomy',
    name: 'Mechanical Thrombectomy',
    domain: 'medicine',
    category: 'surgery',
    tags: ['thrombectomy', 'stroke', 'clot', 'stent retriever', 'LVO', 'endovascular'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32h18"/>
      <ellipse cx="32" cy="32" rx="6" ry="4" fill="red" opacity="0.5" stroke="red"/>
      <path d="M38 32h18"/>
      <path d="M44 32v-20"/>
      <path d="M44 12h8"/>
      <circle cx="54" cy="12" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M26 28c2-2 8-2 12 0" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M26 36c2 2 8 2 12 0" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M28 26l8 12" stroke="blue"/>
      <path d="M36 26l-8 12" stroke="blue"/>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">MCA</text>
      <text x="26" y="48" font-size="3" fill="red" stroke="none">Clot</text>
      <text x="46" y="24" font-size="3" fill="blue" stroke="none">Stent retriever</text>
    </svg>`
  },
  {
    id: 'neuro-evd',
    name: 'External Ventricular Drain',
    domain: 'medicine',
    category: 'surgery',
    tags: ['EVD', 'external ventricular drain', 'ICP', 'hydrocephalus', 'CSF', 'drainage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="18" ry="14" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="20" rx="18" ry="14"/>
      <path d="M24 16c-2 2-3 6-2 10" fill="blue" opacity="0.2"/>
      <path d="M40 16c2 2 3 6 2 10" fill="blue" opacity="0.2"/>
      <path d="M32 10v-6"/>
      <path d="M32 4l-4 4"/>
      <path d="M32 4l4 4"/>
      <path d="M28 4v-2h8v2"/>
      <path d="M32 2v-2"/>
      <path d="M32 0c8 0 12-8 16 0"/>
      <path d="M48 0v20"/>
      <rect x="44" y="20" width="12" height="20" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="44" y="20" width="12" height="20" rx="2"/>
      <path d="M50 28h-4"/>
      <path d="M50 32h-4"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">CSF drainage</text>
      <text x="44" y="52" font-size="3" fill="currentColor" stroke="none">Collection</text>
    </svg>`
  },

  // ===========================================================================
  // DIAGNOSTIC EQUIPMENT - CLINICAL_75
  // ===========================================================================
  {
    id: 'neuro-tuning-fork',
    name: 'Tuning Fork',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['tuning fork', 'vibration', 'proprioception', '128 Hz', 'sensory exam', 'dorsal columns'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 4v28"/>
      <path d="M40 4v28"/>
      <path d="M24 32c4 4 12 4 16 0"/>
      <path d="M32 36v24"/>
      <circle cx="32" cy="60" r="3" fill="currentColor" opacity="0.2"/>
      <path d="M20 8c-2 2-2 4 0 6" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M44 8c2 2 2 4 0 6" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M18 16c-2 2-2 4 0 6" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M46 16c2 2 2 4 0 6" stroke="blue" stroke-dasharray="2 2"/>
      <text x="8" y="44" font-size="4" fill="currentColor" stroke="none">128 Hz</text>
    </svg>`
  },
  {
    id: 'neuro-ophthalmoscope',
    name: 'Ophthalmoscope',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['ophthalmoscope', 'fundoscopy', 'papilledema', 'optic disc', 'retina', 'exam'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="40" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="4" width="16" height="40" rx="4"/>
      <circle cx="32" cy="12" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="12" r="6"/>
      <circle cx="32" cy="12" r="3"/>
      <path d="M32 18v8"/>
      <rect x="28" y="28" width="8" height="4" rx="1"/>
      <path d="M32 44v12"/>
      <ellipse cx="32" cy="58" rx="6" ry="3" fill="currentColor" opacity="0.2"/>
      <path d="M38 12l8-4" stroke="yellow" stroke-width="2"/>
      <path d="M46 8l4 4"/>
      <circle cx="52" cy="14" r="4" fill="currentColor" opacity="0.1"/>
    </svg>`
  },
  {
    id: 'neuro-pet-scan',
    name: 'PET Scan Brain',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['PET', 'positron emission', 'FDG', 'metabolism', 'neuroimaging', 'dementia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <ellipse cx="32" cy="32" rx="18" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="18" ry="16"/>
      <ellipse cx="24" cy="28" rx="6" ry="5" fill="red" opacity="0.4"/>
      <ellipse cx="40" cy="28" rx="6" ry="5" fill="orange" opacity="0.4"/>
      <ellipse cx="32" cy="38" rx="8" ry="4" fill="yellow" opacity="0.4"/>
      <ellipse cx="26" cy="24" rx="3" ry="2" fill="red" opacity="0.6"/>
      <ellipse cx="38" cy="24" rx="3" ry="2" fill="red" opacity="0.6"/>
      <text x="12" y="60" font-size="4" fill="currentColor" stroke="none">FDG-PET</text>
    </svg>`
  },
  {
    id: 'neuro-angiography',
    name: 'Cerebral Angiography',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['angiography', 'DSA', 'cerebral', 'vessels', 'arteries', 'interventional'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="black" opacity="0.8"/>
      <path d="M32 56v-20" stroke="white" stroke-width="2"/>
      <path d="M32 36l-8-8"/>
      <path d="M32 36l8-8"/>
      <path d="M24 28l-6-6" stroke="white"/>
      <path d="M40 28l6-6" stroke="white"/>
      <path d="M24 28c0-8 4-12 8-16" stroke="white" stroke-width="1.5"/>
      <path d="M40 28c0-8-4-12-8-16" stroke="white" stroke-width="1.5"/>
      <path d="M32 12l-4-4" stroke="white"/>
      <path d="M32 12l4-4" stroke="white"/>
      <path d="M18 22l-4 2" stroke="white"/>
      <path d="M46 22l4 2" stroke="white"/>
      <circle cx="32" cy="24" r="6" fill="none" stroke="red" stroke-width="2"/>
      <text x="36" y="26" font-size="4" fill="red" stroke="none">Aneurysm</text>
    </svg>`
  },
  {
    id: 'neuro-ncs-study',
    name: 'Nerve Conduction Study',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['NCS', 'nerve conduction', 'EMG', 'CMAP', 'SNAP', 'velocity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40h48"/>
      <path d="M8 24h48"/>
      <path d="M16 24v16"/>
      <path d="M32 24v16"/>
      <path d="M48 24v16"/>
      <circle cx="16" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="16" cy="32" r="4"/>
      <circle cx="32" cy="32" r="4" fill="red" opacity="0.2"/>
      <circle cx="32" cy="32" r="4" stroke="red"/>
      <circle cx="48" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="48" cy="32" r="4"/>
      <path d="M4 52h12l2-6 3 12 3-16 3 14 2-4h8"/>
      <text x="10" y="18" font-size="3" fill="currentColor" stroke="none">Stim</text>
      <text x="42" y="18" font-size="3" fill="currentColor" stroke="none">Record</text>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">CMAP waveform</text>
    </svg>`
  },
  {
    id: 'neuro-icp-monitor',
    name: 'ICP Monitor',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['ICP', 'intracranial pressure', 'monitoring', 'bolt', 'Lundberg waves'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="20" ry="16" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="24" rx="20" ry="16"/>
      <rect x="28" y="8" width="8" height="8" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="28" y="8" width="8" height="8" rx="1"/>
      <path d="M32 16v-8"/>
      <path d="M32 8l8 0"/>
      <path d="M40 8v12"/>
      <rect x="40" y="44" width="20" height="16" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="40" y="44" width="20" height="16" rx="2"/>
      <path d="M44 52h12"/>
      <path d="M44 52c2-4 4-4 6 0s4 4 6 0"/>
      <text x="44" y="48" font-size="4" fill="currentColor" stroke="none">ICP</text>
      <text x="44" y="58" font-size="4" fill="red" stroke="none">22</text>
    </svg>`
  },
  {
    id: 'neuro-evoked-potentials',
    name: 'Evoked Potentials',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['evoked potentials', 'VEP', 'BAEP', 'SSEP', 'neurophysiology', 'conduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="4" y="4" width="56" height="56" rx="4"/>
      <path d="M8 32h48" stroke-dasharray="2 2" opacity="0.5"/>
      <path d="M12 32c2-4 4-8 6-8s4 16 6 16 4-12 6-12 4 8 6 8" stroke="blue" stroke-width="2"/>
      <path d="M36 36c2-2 4-4 6-4s4 8 6 8 4-6 6-6" stroke="blue" stroke-width="2"/>
      <text x="8" y="16" font-size="4" fill="currentColor" stroke="none">VEP</text>
      <path d="M8 52h12l2-4 2 8 2-12 2 10 2-2h8" stroke="green" stroke-width="1.5"/>
      <text x="38" y="56" font-size="4" fill="green" stroke="none">SSEP</text>
    </svg>`
  },
  {
    id: 'neuro-sleep-study',
    name: 'Polysomnography',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['PSG', 'polysomnography', 'sleep study', 'apnea', 'EEG', 'EMG', 'EOG'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="24" cy="24" rx="16" ry="12" fill="currentColor" opacity="0.1"/>
      <ellipse cx="24" cy="24" rx="16" ry="12"/>
      <circle cx="18" cy="20" r="2" fill="currentColor"/>
      <circle cx="30" cy="20" r="2" fill="currentColor"/>
      <path d="M18 28c3 2 9 2 12 0"/>
      <circle cx="12" cy="16" r="2" fill="blue"/>
      <circle cx="36" cy="16" r="2" fill="blue"/>
      <circle cx="24" cy="10" r="2" fill="blue"/>
      <path d="M12 16l-4-4"/>
      <path d="M36 16l4-4"/>
      <path d="M24 10v-6"/>
      <rect x="44" y="12" width="16" height="40" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="44" y="12" width="16" height="40" rx="2"/>
      <path d="M48 20h8"/>
      <path d="M48 20c1-2 2 2 3 0s2-2 3 0 2 2 2 0"/>
      <path d="M48 28h8"/>
      <path d="M48 28c1-1 2 1 3 0s2-1 3 0"/>
      <text x="48" y="18" font-size="3" fill="currentColor" stroke="none">EEG</text>
      <text x="48" y="26" font-size="3" fill="currentColor" stroke="none">EOG</text>
    </svg>`
  },

  // ===========================================================================
  // CLINICAL TOOLS & SCALES - COMPLETE
  // ===========================================================================
  {
    id: 'neuro-nihss-scale',
    name: 'NIHSS Scale',
    domain: 'medicine',
    category: 'scales',
    tags: ['NIHSS', 'stroke scale', 'assessment', 'deficit', 'severity', 'scoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="8" y="4" width="48" height="56" rx="4"/>
      <text x="20" y="16" font-size="6" fill="currentColor" stroke="none">NIHSS</text>
      <line x1="12" y1="20" x2="52" y2="20"/>
      <text x="12" y="30" font-size="4" fill="currentColor" stroke="none">LOC</text>
      <rect x="36" y="24" width="12" height="8" fill="green" opacity="0.3"/>
      <text x="14" y="42" font-size="4" fill="currentColor" stroke="none">Motor</text>
      <rect x="36" y="36" width="12" height="8" fill="yellow" opacity="0.3"/>
      <text x="14" y="54" font-size="4" fill="currentColor" stroke="none">Language</text>
      <rect x="36" y="48" width="12" height="8" fill="red" opacity="0.3"/>
      <text x="40" y="30" font-size="4" fill="currentColor" stroke="none">0</text>
      <text x="40" y="42" font-size="4" fill="currentColor" stroke="none">2</text>
      <text x="40" y="54" font-size="4" fill="currentColor" stroke="none">3</text>
    </svg>`
  },
  {
    id: 'neuro-gcs-scale',
    name: 'Glasgow Coma Scale',
    domain: 'medicine',
    category: 'scales',
    tags: ['GCS', 'Glasgow', 'coma', 'consciousness', 'TBI', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="8" y="4" width="48" height="56" rx="4"/>
      <text x="20" y="16" font-size="6" fill="currentColor" stroke="none">GCS</text>
      <line x1="12" y1="20" x2="52" y2="20"/>
      <circle cx="20" cy="30" r="4"/>
      <circle cx="20" cy="30" r="2" fill="currentColor"/>
      <text x="28" y="32" font-size="4" fill="currentColor" stroke="none">E: 4</text>
      <path d="M16 42h8"/>
      <path d="M18 40c2 4 4 4 4 0"/>
      <text x="28" y="44" font-size="4" fill="currentColor" stroke="none">V: 5</text>
      <path d="M16 52l4 4 4-4"/>
      <text x="28" y="54" font-size="4" fill="currentColor" stroke="none">M: 6</text>
      <rect x="42" y="26" width="8" height="28" fill="green" opacity="0.2"/>
      <text x="44" y="44" font-size="6" fill="green" stroke="none">15</text>
    </svg>`
  },
  {
    id: 'neuro-moca-test',
    name: 'MoCA Test',
    domain: 'medicine',
    category: 'scales',
    tags: ['MoCA', 'Montreal', 'cognitive', 'dementia', 'screening', 'assessment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="8" y="4" width="48" height="56" rx="4"/>
      <text x="18" y="16" font-size="6" fill="currentColor" stroke="none">MoCA</text>
      <line x1="12" y1="20" x2="52" y2="20"/>
      <path d="M16 28l4 4 8-8"/>
      <text x="32" y="28" font-size="3" fill="currentColor" stroke="none">Visuospatial</text>
      <path d="M16 38l4 4 8-8"/>
      <text x="32" y="38" font-size="3" fill="currentColor" stroke="none">Naming</text>
      <path d="M16 48l4 4 8-8"/>
      <text x="32" y="48" font-size="3" fill="currentColor" stroke="none">Memory</text>
      <circle cx="48" cy="52" r="6" fill="currentColor" opacity="0.2"/>
      <text x="44" y="54" font-size="5" fill="currentColor" stroke="none">26</text>
    </svg>`
  },
  {
    id: 'neuro-motor-grading',
    name: 'Motor Strength Grading',
    domain: 'medicine',
    category: 'scales',
    tags: ['motor', 'strength', 'MRC', 'grading', '0-5', 'examination'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="4" width="48" height="56" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="8" y="4" width="48" height="56" rx="4"/>
      <text x="12" y="16" font-size="5" fill="currentColor" stroke="none">Motor Scale</text>
      <line x1="12" y1="20" x2="52" y2="20"/>
      <text x="12" y="28" font-size="3" fill="currentColor" stroke="none">5 - Normal</text>
      <text x="12" y="34" font-size="3" fill="currentColor" stroke="none">4 - Against resistance</text>
      <text x="12" y="40" font-size="3" fill="currentColor" stroke="none">3 - Against gravity</text>
      <text x="12" y="46" font-size="3" fill="currentColor" stroke="none">2 - Gravity eliminated</text>
      <text x="12" y="52" font-size="3" fill="currentColor" stroke="none">1 - Trace/flicker</text>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">0 - No movement</text>
      <rect x="46" y="24" width="4" height="4" fill="green" opacity="0.5"/>
      <rect x="46" y="30" width="4" height="4" fill="green" opacity="0.4"/>
      <rect x="46" y="36" width="4" height="4" fill="yellow" opacity="0.4"/>
      <rect x="46" y="42" width="4" height="4" fill="orange" opacity="0.4"/>
      <rect x="46" y="48" width="4" height="4" fill="red" opacity="0.3"/>
      <rect x="46" y="54" width="4" height="4" fill="red" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'neuro-pupil-exam',
    name: 'Pupillary Examination',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['pupil', 'PERRLA', 'light reflex', 'accommodation', 'anisocoria', 'CN III'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="12"/>
      <circle cx="20" cy="32" r="4" fill="currentColor"/>
      <circle cx="44" cy="32" r="12"/>
      <circle cx="44" cy="32" r="8" fill="currentColor"/>
      <path d="M4 32l8-4" stroke="yellow" stroke-width="2"/>
      <path d="M4 32l8 4" stroke="yellow" stroke-width="2"/>
      <path d="M52 32l8-4" stroke="yellow" stroke-width="2" opacity="0.3"/>
      <path d="M52 32l8 4" stroke="yellow" stroke-width="2" opacity="0.3"/>
      <text x="14" y="52" font-size="4" fill="currentColor" stroke="none">Normal</text>
      <text x="34" y="52" font-size="4" fill="red" stroke="none">Dilated</text>
      <path d="M8 8l8 8" stroke="yellow" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'neuro-romberg-test',
    name: 'Romberg Test',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['Romberg', 'balance', 'proprioception', 'dorsal columns', 'ataxia', 'sensory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="10" r="6"/>
      <path d="M32 16v20"/>
      <path d="M24 22l8 4 8-4"/>
      <path d="M26 36l-4 20"/>
      <path d="M38 36l4 20"/>
      <ellipse cx="22" cy="58" rx="4" ry="2"/>
      <ellipse cx="42" cy="58" rx="4" ry="2"/>
      <line x1="30" y1="8" x2="30" y2="12" stroke-width="0.5"/>
      <line x1="34" y1="8" x2="34" y2="12" stroke-width="0.5"/>
      <path d="M50 30c4-4 4-8 0-12" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M52 36c4-4 4-8 0-12" stroke="blue" stroke-dasharray="2 2"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Eyes closed</text>
      <text x="48" y="44" font-size="3" fill="blue" stroke="none">Sway</text>
    </svg>`
  },
  {
    id: 'neuro-babinski-sign',
    name: 'Babinski Sign',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['Babinski', 'plantar', 'reflex', 'UMN', 'pyramidal', 'sign'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 12c8-4 24-4 32 0l-4 40c-2 4-6 8-12 8s-10-4-12-8z" fill="currentColor" opacity="0.1"/>
      <path d="M16 12c8-4 24-4 32 0l-4 40c-2 4-6 8-12 8s-10-4-12-8z"/>
      <path d="M24 20v6"/>
      <path d="M30 18v8"/>
      <path d="M36 18v8"/>
      <path d="M42 20v6"/>
      <path d="M20 52l12-20" stroke="red" stroke-width="2"/>
      <path d="M32 32l-4-6" stroke="red"/>
      <path d="M32 32l4-6" stroke="red"/>
      <path d="M20 20l8 4"/>
      <path d="M44 20l-8 4"/>
      <path d="M24 12c0 4 4 6 6 4" stroke="red"/>
      <path d="M30 10c0 4 4 6 6 4" stroke="red"/>
      <path d="M36 10c0 4 4 6 6 4" stroke="red"/>
      <text x="36" y="52" font-size="3" fill="red" stroke="none">Positive</text>
      <text x="36" y="58" font-size="3" fill="red" stroke="none">Babinski</text>
    </svg>`
  },
  {
    id: 'neuro-finger-nose-test',
    name: 'Finger-Nose Test',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['finger-nose', 'dysmetria', 'ataxia', 'cerebellar', 'coordination', 'intention tremor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="16" r="10"/>
      <path d="M28 14c2 2 6 2 8 0"/>
      <path d="M32 18v4"/>
      <path d="M32 26v8"/>
      <path d="M24 30l-16 8"/>
      <path d="M40 30l16 8"/>
      <circle cx="32" cy="18" r="2" fill="currentColor"/>
      <path d="M8 38l20-16" stroke="red" stroke-width="2" stroke-dasharray="4 2"/>
      <path d="M12 42c-2-2 0-6 2-4" stroke="red"/>
      <path d="M18 36c-2-2 0-6 2-4" stroke="red"/>
      <path d="M24 30c-2-2 0-6 2-4" stroke="red"/>
      <circle cx="8" cy="38" r="3" fill="currentColor" opacity="0.3"/>
      <text x="36" y="52" font-size="3" fill="red" stroke="none">Intention</text>
      <text x="36" y="58" font-size="3" fill="red" stroke="none">tremor</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL ANATOMY - COMPLETE
  // ===========================================================================
  {
    id: 'neuro-circle-of-willis',
    name: 'Circle of Willis',
    domain: 'medicine',
    category: 'vascular',
    tags: ['Circle of Willis', 'cerebral', 'arteries', 'ACA', 'MCA', 'PCA', 'ICA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M24 56v-20"/>
      <path d="M40 56v-20"/>
      <path d="M24 36c0-8 4-12 8-12s8 4 8 12"/>
      <path d="M24 36l-8-4"/>
      <path d="M40 36l8-4"/>
      <path d="M16 32l-8 4"/>
      <path d="M48 32l8 4"/>
      <circle cx="32" cy="24" r="4" fill="none"/>
      <path d="M32 20v-12"/>
      <path d="M28 24l-8 8"/>
      <path d="M36 24l8 8"/>
      <path d="M20 32h-4"/>
      <path d="M44 32h4"/>
      <text x="28" y="10" font-size="3" fill="currentColor" stroke="none">ACA</text>
      <text x="4" y="30" font-size="3" fill="currentColor" stroke="none">MCA</text>
      <text x="48" y="30" font-size="3" fill="currentColor" stroke="none">MCA</text>
      <text x="4" y="40" font-size="3" fill="currentColor" stroke="none">PCA</text>
      <text x="48" y="40" font-size="3" fill="currentColor" stroke="none">PCA</text>
      <text x="18" y="54" font-size="3" fill="currentColor" stroke="none">ICA</text>
      <text x="40" y="54" font-size="3" fill="currentColor" stroke="none">ICA</text>
    </svg>`
  },
  {
    id: 'neuro-blood-brain-barrier',
    name: 'Blood Brain Barrier',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['BBB', 'blood brain barrier', 'endothelium', 'tight junctions', 'astrocyte', 'pericyte'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="4" fill="red" opacity="0.2"/>
      <rect x="8" y="24" width="48" height="16" rx="4"/>
      <line x1="20" y1="24" x2="20" y2="40" stroke-width="2"/>
      <line x1="32" y1="24" x2="32" y2="40" stroke-width="2"/>
      <line x1="44" y1="24" x2="44" y2="40" stroke-width="2"/>
      <circle cx="14" cy="32" r="2" fill="red"/>
      <circle cx="26" cy="32" r="2" fill="red"/>
      <circle cx="38" cy="32" r="2" fill="red"/>
      <circle cx="50" cy="32" r="2" fill="red"/>
      <path d="M12 20c2-4 6-4 8 0"/>
      <path d="M24 20c2-4 6-4 8 0"/>
      <path d="M36 20c2-4 6-4 8 0"/>
      <path d="M48 20c2-4 6-4 8 0"/>
      <ellipse cx="16" cy="48" rx="6" ry="4" fill="blue" opacity="0.2"/>
      <ellipse cx="32" cy="48" rx="6" ry="4" fill="blue" opacity="0.2"/>
      <ellipse cx="48" cy="48" rx="6" ry="4" fill="blue" opacity="0.2"/>
      <path d="M16 44v-4"/>
      <path d="M32 44v-4"/>
      <path d="M48 44v-4"/>
      <text x="4" y="16" font-size="3" fill="currentColor" stroke="none">Pericytes</text>
      <text x="4" y="56" font-size="3" fill="blue" stroke="none">Astrocyte endfeet</text>
    </svg>`
  },
  {
    id: 'neuro-meninges',
    name: 'Meninges Layers',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['meninges', 'dura', 'arachnoid', 'pia', 'CSF', 'subarachnoid'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="8" fill="gray" opacity="0.3"/>
      <rect x="8" y="8" width="48" height="8"/>
      <rect x="8" y="18" width="48" height="4" fill="orange" opacity="0.3"/>
      <rect x="8" y="18" width="48" height="4"/>
      <rect x="8" y="24" width="48" height="6" fill="blue" opacity="0.2"/>
      <rect x="8" y="24" width="48" height="6"/>
      <path d="M12 26c4 2 8 2 12 0s8-2 12 0 8 2 12 0" stroke="blue" stroke-dasharray="2 2"/>
      <rect x="8" y="32" width="48" height="2" fill="yellow" opacity="0.3"/>
      <rect x="8" y="32" width="48" height="2"/>
      <rect x="8" y="36" width="48" height="20" fill="currentColor" opacity="0.15"/>
      <path d="M12 42c4 2 10 2 14 0"/>
      <path d="M38 42c4 2 10 2 14 0"/>
      <text x="4" y="14" font-size="3" fill="currentColor" stroke="none">Skull</text>
      <text x="4" y="22" font-size="3" fill="orange" stroke="none">Dura</text>
      <text x="4" y="30" font-size="3" fill="blue" stroke="none">Arachnoid</text>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">Pia</text>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">Brain</text>
    </svg>`
  },
  {
    id: 'neuro-motor-homunculus',
    name: 'Motor Homunculus',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['homunculus', 'motor cortex', 'somatotopic', 'precentral gyrus', 'body map'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56c4-8 8-12 12-20 4-8 8-12 12-12s8 4 12 12c4 8 8 12 12 20" fill="currentColor" opacity="0.1"/>
      <path d="M8 56c4-8 8-12 12-20 4-8 8-12 12-12s8 4 12 12c4 8 8 12 12 20"/>
      <ellipse cx="32" cy="8" rx="4" ry="6" fill="currentColor" opacity="0.3"/>
      <ellipse cx="32" cy="8" rx="4" ry="6"/>
      <path d="M28 20c-4 8-12 16-16 24" stroke-width="2"/>
      <path d="M36 20c4 8 12 16 16 24" stroke-width="2"/>
      <ellipse cx="12" cy="44" rx="6" ry="8" fill="currentColor" opacity="0.2"/>
      <ellipse cx="52" cy="44" rx="6" ry="8" fill="currentColor" opacity="0.2"/>
      <circle cx="28" cy="6" r="1" fill="currentColor"/>
      <circle cx="36" cy="6" r="1" fill="currentColor"/>
      <path d="M30 10c2 2 2 2 4 0"/>
      <text x="28" y="38" font-size="3" fill="currentColor" stroke="none">Face</text>
      <text x="4" y="50" font-size="3" fill="currentColor" stroke="none">Hand</text>
    </svg>`
  },
  {
    id: 'neuro-sensory-homunculus',
    name: 'Sensory Homunculus',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['homunculus', 'sensory cortex', 'somatotopic', 'postcentral gyrus', 'body map'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56c4-8 8-12 12-20 4-8 8-12 12-12s8 4 12 12c4 8 8 12 12 20" fill="blue" opacity="0.1"/>
      <path d="M8 56c4-8 8-12 12-20 4-8 8-12 12-12s8 4 12 12c4 8 8 12 12 20" stroke="blue"/>
      <ellipse cx="32" cy="8" rx="6" ry="8" fill="blue" opacity="0.2"/>
      <ellipse cx="32" cy="8" rx="6" ry="8" stroke="blue"/>
      <ellipse cx="24" cy="16" rx="8" ry="4" fill="blue" opacity="0.2"/>
      <ellipse cx="40" cy="16" rx="8" ry="4" fill="blue" opacity="0.2"/>
      <path d="M28 28c-4 6-10 12-14 18" stroke="blue" stroke-width="2"/>
      <path d="M36 28c4 6 10 12 14 18" stroke="blue" stroke-width="2"/>
      <ellipse cx="14" cy="46" rx="8" ry="6" fill="blue" opacity="0.2"/>
      <ellipse cx="50" cy="46" rx="8" ry="6" fill="blue" opacity="0.2"/>
      <circle cx="28" cy="6" r="2" fill="blue"/>
      <circle cx="36" cy="6" r="2" fill="blue"/>
      <path d="M30 12c2 2 2 2 4 0" stroke="blue"/>
      <text x="26" y="38" font-size="3" fill="blue" stroke="none">Lips</text>
      <text x="4" y="52" font-size="3" fill="blue" stroke="none">Hand</text>
    </svg>`
  },
  {
    id: 'neuro-limbic-system',
    name: 'Limbic System',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['limbic', 'emotion', 'hippocampus', 'amygdala', 'cingulate', 'fornix'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-12-14-22z" fill="currentColor" opacity="0.05"/>
      <path d="M12 28c0-12 8-20 20-20 14 0 22 8 22 20 0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-12-14-22z"/>
      <path d="M20 24c0-6 6-10 12-10 8 0 12 4 12 10" stroke="purple" fill="purple" opacity="0.2"/>
      <path d="M20 24c0-6 6-10 12-10 8 0 12 4 12 10" stroke="purple"/>
      <ellipse cx="20" cy="36" rx="6" ry="4" fill="orange" opacity="0.3" stroke="orange"/>
      <ellipse cx="36" cy="38" rx="8" ry="4" fill="green" opacity="0.3" stroke="green"/>
      <path d="M32 14l4-6" stroke="purple" stroke-dasharray="2 2"/>
      <path d="M20 24v12"/>
      <text x="28" y="22" font-size="3" fill="purple" stroke="none">Cingulate</text>
      <text x="12" y="44" font-size="3" fill="orange" stroke="none">Amyg</text>
      <text x="32" y="46" font-size="3" fill="green" stroke="none">Hippocampus</text>
    </svg>`
  },
  {
    id: 'neuro-cauda-equina',
    name: 'Cauda Equina',
    domain: 'medicine',
    category: 'spinal',
    tags: ['cauda equina', 'nerve roots', 'lumbar', 'conus medullaris', 'L1-S5'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="20" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="4" width="16" height="20" rx="2"/>
      <path d="M32 24c-2 4-4 8-2 12" stroke-width="2"/>
      <path d="M28 24c-4 8-8 20-10 32"/>
      <path d="M30 24c-2 8-4 20-6 32"/>
      <path d="M34 24c2 8 4 20 6 32"/>
      <path d="M36 24c4 8 8 20 10 32"/>
      <path d="M26 28c-2 6-6 14-8 24"/>
      <path d="M38 28c2 6 6 14 8 24"/>
      <ellipse cx="32" cy="36" rx="2" ry="4" fill="currentColor" opacity="0.3"/>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">L1</text>
      <text x="4" y="40" font-size="3" fill="currentColor" stroke="none">L4</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">S1</text>
      <text x="36" y="38" font-size="3" fill="currentColor" stroke="none">Conus</text>
    </svg>`
  },
  {
    id: 'neuro-optic-pathway',
    name: 'Visual Pathway',
    domain: 'medicine',
    category: 'anatomy',
    tags: ['visual', 'optic', 'pathway', 'chiasm', 'LGN', 'occipital', 'V1'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="12" r="6"/>
      <circle cx="48" cy="12" r="6"/>
      <circle cx="16" cy="12" r="2" fill="currentColor"/>
      <circle cx="48" cy="12" r="2" fill="currentColor"/>
      <path d="M16 18v8l16 8"/>
      <path d="M48 18v8l-16 8"/>
      <ellipse cx="32" cy="34" rx="6" ry="4" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="34" rx="6" ry="4"/>
      <path d="M26 34l-8 8"/>
      <path d="M38 34l8 8"/>
      <ellipse cx="18" cy="44" rx="4" ry="3" fill="currentColor" opacity="0.2"/>
      <ellipse cx="46" cy="44" rx="4" ry="3" fill="currentColor" opacity="0.2"/>
      <path d="M18 47l-4 8"/>
      <path d="M46 47l4 8"/>
      <ellipse cx="14" cy="58" rx="6" ry="4" fill="currentColor" opacity="0.15"/>
      <ellipse cx="50" cy="58" rx="6" ry="4" fill="currentColor" opacity="0.15"/>
      <text x="28" y="40" font-size="3" fill="currentColor" stroke="none">Chiasm</text>
      <text x="12" y="50" font-size="3" fill="currentColor" stroke="none">LGN</text>
      <text x="8" y="62" font-size="3" fill="currentColor" stroke="none">V1</text>
    </svg>`
  },

  // ===========================================================================
  // MOVEMENT DISORDERS - COMPLETE
  // ===========================================================================
  {
    id: 'neuro-essential-tremor',
    name: 'Essential Tremor',
    domain: 'medicine',
    category: 'movement-disorders',
    tags: ['tremor', 'essential', 'postural', 'kinetic', 'familial', 'benign'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20v12"/>
      <path d="M24 26l-12 20" stroke-width="2"/>
      <path d="M40 26l12 20" stroke-width="2"/>
      <path d="M8 46c2-2 4-2 6 0s4 2 6 0" stroke="orange" stroke-width="2"/>
      <path d="M44 46c2-2 4-2 6 0s4 2 6 0" stroke="orange" stroke-width="2"/>
      <path d="M10 50c2-2 4-2 6 0s4 2 6 0" stroke="orange" stroke-width="2"/>
      <path d="M42 50c2-2 4-2 6 0s4 2 6 0" stroke="orange" stroke-width="2"/>
      <text x="16" y="60" font-size="3" fill="orange" stroke="none">Postural tremor</text>
    </svg>`
  },
  {
    id: 'neuro-dystonia',
    name: 'Dystonia',
    domain: 'medicine',
    category: 'movement-disorders',
    tags: ['dystonia', 'torticollis', 'sustained', 'contraction', 'twisting', 'posture'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20c-8 4-12 12-8 20" stroke-width="2"/>
      <path d="M24 26l-8 4"/>
      <path d="M40 22c8 4 12 0 12-4" stroke-width="2" stroke="purple"/>
      <path d="M24 40l-10 14"/>
      <path d="M24 40c4 8 8 12 16 10"/>
      <path d="M36 8c4-4 8-4 8 0" stroke="purple"/>
      <path d="M28 8c-4-4-8-4-8 0" stroke="purple"/>
      <text x="4" y="58" font-size="3" fill="purple" stroke="none">Sustained contraction</text>
    </svg>`
  },
  {
    id: 'neuro-chorea',
    name: 'Chorea',
    domain: 'medicine',
    category: 'movement-disorders',
    tags: ['chorea', 'Huntington', 'Sydenham', 'involuntary', 'dance-like', 'random'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="12" r="6"/>
      <path d="M32 18v10"/>
      <path d="M24 24l-12 8"/>
      <path d="M40 24l12 8"/>
      <path d="M28 28l-8 20"/>
      <path d="M36 28l8 20"/>
      <path d="M8 32c4-4 4-8 0-8" stroke="red" stroke-dasharray="2 2"/>
      <path d="M56 32c-4-4-4-8 0-8" stroke="red" stroke-dasharray="2 2"/>
      <path d="M16 48c4 4 4 8 0 8" stroke="red" stroke-dasharray="2 2"/>
      <path d="M48 48c-4 4-4 8 0 8" stroke="red" stroke-dasharray="2 2"/>
      <path d="M30 12c-2-2-2-4 0-4" stroke="red" stroke-dasharray="2 2"/>
      <text x="12" y="60" font-size="3" fill="red" stroke="none">Random, dance-like</text>
    </svg>`
  },
  {
    id: 'neuro-athetosis',
    name: 'Athetosis',
    domain: 'medicine',
    category: 'movement-disorders',
    tags: ['athetosis', 'slow', 'writhing', 'sinuous', 'distal', 'CP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="10" r="6"/>
      <path d="M32 16v12"/>
      <path d="M26 22l-8 8c-4 4-8 12-4 16" stroke-width="2"/>
      <path d="M38 22l8 8c4 4 8 12 4 16" stroke-width="2"/>
      <path d="M10 46c4 4 8 4 12-2" stroke="teal" stroke-width="2"/>
      <path d="M54 46c-4 4-8 4-12-2" stroke="teal" stroke-width="2"/>
      <path d="M28 28l-4 24c0 4 4 4 6 0"/>
      <path d="M36 28l4 24c0 4-4 4-6 0"/>
      <text x="8" y="60" font-size="3" fill="teal" stroke="none">Slow, writhing movements</text>
    </svg>`
  },
  {
    id: 'neuro-myoclonus',
    name: 'Myoclonus',
    domain: 'medicine',
    category: 'movement-disorders',
    tags: ['myoclonus', 'jerk', 'sudden', 'brief', 'shock-like', 'epileptic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="10" r="6"/>
      <path d="M32 16v14"/>
      <path d="M24 24l-12 4"/>
      <path d="M40 24l12 4"/>
      <path d="M28 30l-4 24"/>
      <path d="M36 30l4 24"/>
      <path d="M8 28l4-8" stroke="yellow" stroke-width="3"/>
      <path d="M56 28l-4-8" stroke="yellow" stroke-width="3"/>
      <path d="M20 54l4-8" stroke="yellow" stroke-width="3"/>
      <path d="M44 54l-4-8" stroke="yellow" stroke-width="3"/>
      <text x="12" y="60" font-size="3" fill="currentColor" stroke="none">Sudden jerks</text>
    </svg>`
  },
  {
    id: 'neuro-tics',
    name: 'Tics / Tourette',
    domain: 'medicine',
    category: 'movement-disorders',
    tags: ['tics', 'Tourette', 'motor', 'vocal', 'stereotyped', 'repetitive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="16" r="10" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="16" r="10"/>
      <ellipse cx="27" cy="14" rx="2" ry="3"/>
      <ellipse cx="37" cy="14" rx="2" ry="3"/>
      <path d="M27 14c0-2 1-4 2-4" stroke="green" stroke-width="2"/>
      <path d="M37 14c0-2-1-4-2-4" stroke="green" stroke-width="2"/>
      <path d="M27 22c3 2 7 2 10 0"/>
      <path d="M32 26v8"/>
      <path d="M24 30l-8 4"/>
      <path d="M40 30l8 4"/>
      <path d="M36 8l4-4" stroke="green" stroke-width="2"/>
      <path d="M38 12l4 0" stroke="green" stroke-width="2"/>
      <path d="M4 44c2-2 4 0 4 2" stroke="orange"/>
      <path d="M6 48c2 0 4-2 4 0" stroke="orange"/>
      <text x="12" y="54" font-size="3" fill="orange" stroke="none">Vocal tic</text>
      <text x="36" y="54" font-size="3" fill="green" stroke="none">Motor tic</text>
    </svg>`
  },
  {
    id: 'neuro-ballismus',
    name: 'Ballismus',
    domain: 'medicine',
    category: 'movement-disorders',
    tags: ['ballismus', 'hemiballismus', 'STN', 'violent', 'flinging', 'proximal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="10" r="6"/>
      <path d="M32 16v12"/>
      <path d="M26 22l-18-8" stroke-width="3" stroke="red"/>
      <path d="M38 22l8 4"/>
      <path d="M28 28l-12 24" stroke-width="3" stroke="red"/>
      <path d="M36 28l4 24"/>
      <path d="M4 14l8 4" stroke="red" stroke-dasharray="3 2"/>
      <path d="M12 52l8 4" stroke="red" stroke-dasharray="3 2"/>
      <text x="32" y="56" font-size="3" fill="currentColor" stroke="none">Unaffected</text>
      <text x="4" y="24" font-size="3" fill="red" stroke="none">Flinging</text>
    </svg>`
  },
  {
    id: 'neuro-ataxic-gait',
    name: 'Ataxic Gait',
    domain: 'medicine',
    category: 'movement-disorders',
    tags: ['ataxia', 'gait', 'cerebellar', 'wide-based', 'unsteady', 'staggering'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="10" r="6"/>
      <path d="M32 16v14"/>
      <path d="M26 24l-6 4"/>
      <path d="M38 24l6 4"/>
      <path d="M28 30l-12 24" stroke-width="2"/>
      <path d="M36 30l12 24" stroke-width="2"/>
      <ellipse cx="16" cy="56" rx="6" ry="3"/>
      <ellipse cx="48" cy="56" rx="6" ry="3"/>
      <path d="M22 50l-4 4" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M42 50l4 4" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M12 46c-4 4-4 8 0 8" stroke="blue" stroke-dasharray="2 2"/>
      <text x="16" y="44" font-size="3" fill="blue" stroke="none">Wide base</text>
    </svg>`
  },

  // ===========================================================================
  // PEDIATRIC NEUROLOGY - COMPLETE
  // ===========================================================================
  {
    id: 'neuro-febrile-seizure',
    name: 'Febrile Seizure',
    domain: 'medicine',
    category: 'pediatric',
    tags: ['febrile', 'seizure', 'fever', 'pediatric', 'convulsion', 'childhood'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="14" rx="12" ry="10" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="14" rx="12" ry="10"/>
      <circle cx="27" cy="12" r="2"/>
      <circle cx="37" cy="12" r="2"/>
      <path d="M27 18c3 2 7 2 10 0"/>
      <path d="M32 24v8"/>
      <path d="M24 28l-10 6"/>
      <path d="M40 28l10 6"/>
      <path d="M28 32l-6 20"/>
      <path d="M36 32l6 20"/>
      <path d="M44 8l4-4" stroke="red" stroke-width="2"/>
      <path d="M48 12l4 0" stroke="red" stroke-width="2"/>
      <path d="M44 16l4 4" stroke="red" stroke-width="2"/>
      <rect x="50" y="28" width="10" height="20" fill="red" opacity="0.2"/>
      <text x="52" y="42" font-size="6" fill="red" stroke="none">39°</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Fever-induced</text>
    </svg>`
  },
  {
    id: 'neuro-cerebral-palsy',
    name: 'Cerebral Palsy',
    domain: 'medicine',
    category: 'pediatric',
    tags: ['cerebral palsy', 'CP', 'spastic', 'diplegia', 'hemiplegia', 'quadriplegia'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="10" r="6"/>
      <path d="M32 16v10"/>
      <path d="M26 22l-8 4"/>
      <path d="M38 22l8 4"/>
      <path d="M28 26c-4 8-6 20-4 28" stroke-width="2"/>
      <path d="M36 26c4 8 6 20 4 28" stroke-width="2"/>
      <path d="M22 54c-2 4 0 6 4 6" fill="currentColor" opacity="0.2"/>
      <path d="M42 54c2 4 0 6-4 6" fill="currentColor" opacity="0.2"/>
      <path d="M14 26c0 4 4 4 4 0" stroke="purple" stroke-width="2"/>
      <path d="M46 26c0 4 4 4 4 0" stroke="purple" stroke-width="2"/>
      <path d="M20 46c0 4 4 4 4 0" stroke="purple" stroke-width="2"/>
      <path d="M40 46c0 4 4 4 4 0" stroke="purple" stroke-width="2"/>
      <text x="4" y="40" font-size="3" fill="purple" stroke="none">Spasticity</text>
    </svg>`
  },
  {
    id: 'neuro-hydrocephalus-pediatric',
    name: 'Pediatric Hydrocephalus',
    domain: 'medicine',
    category: 'pediatric',
    tags: ['hydrocephalus', 'macrocephaly', 'fontanelle', 'shunt', 'pediatric', 'infant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="24" rx="24" ry="20"/>
      <ellipse cx="32" cy="8" rx="6" ry="4" fill="blue" opacity="0.3" stroke="blue"/>
      <ellipse cx="24" cy="24" rx="8" ry="10" fill="blue" opacity="0.2"/>
      <ellipse cx="40" cy="24" rx="8" ry="10" fill="blue" opacity="0.2"/>
      <circle cx="26" cy="30" r="3"/>
      <circle cx="38" cy="30" r="3"/>
      <path d="M28 38c2 2 6 2 8 0"/>
      <path d="M32 44v8"/>
      <path d="M26 48l-8 4"/>
      <path d="M38 48l8 4"/>
      <text x="26" y="10" font-size="3" fill="blue" stroke="none">Bulging</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Enlarged head</text>
    </svg>`
  },
  {
    id: 'neuro-neural-tube-defect',
    name: 'Neural Tube Defect',
    domain: 'medicine',
    category: 'pediatric',
    tags: ['neural tube', 'spina bifida', 'myelomeningocele', 'anencephaly', 'congenital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="20" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="4" width="16" height="20" rx="2"/>
      <rect x="22" y="26" width="20" height="6" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="22" y="26" width="20" height="6" rx="1"/>
      <rect x="22" y="34" width="20" height="6" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="22" y="34" width="20" height="6" rx="1"/>
      <path d="M26 42c-2 8 0 16 6 18"/>
      <path d="M38 42c2 8 0 16-6 18"/>
      <ellipse cx="32" cy="46" rx="8" ry="6" fill="red" opacity="0.3" stroke="red"/>
      <path d="M28 42v8" stroke="red"/>
      <path d="M36 42v8" stroke="red"/>
      <text x="4" y="50" font-size="3" fill="red" stroke="none">Myelomeningocele</text>
    </svg>`
  },
  {
    id: 'neuro-infantile-spasms',
    name: 'Infantile Spasms',
    domain: 'medicine',
    category: 'pediatric',
    tags: ['infantile spasms', 'West syndrome', 'hypsarrhythmia', 'epilepsy', 'flexor', 'clusters'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="10" ry="8" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="16" rx="10" ry="8"/>
      <circle cx="28" cy="14" r="2" fill="currentColor"/>
      <circle cx="36" cy="14" r="2" fill="currentColor"/>
      <path d="M28 20c2 1 6 1 8 0"/>
      <ellipse cx="32" cy="36" rx="12" ry="10" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="36" rx="12" ry="10"/>
      <path d="M20 24c-4 4-8 8-8 16" stroke-width="2"/>
      <path d="M44 24c4 4 8 8 8 16" stroke-width="2"/>
      <path d="M24 46c-4 4-4 8-8 12"/>
      <path d="M40 46c4 4 4 8 8 12"/>
      <path d="M28 24c4 4 4 8 4 12" stroke="red"/>
      <path d="M36 24c-4 4-4 8-4 12" stroke="red"/>
      <text x="4" y="58" font-size="3" fill="red" stroke="none">Flexor spasms</text>
    </svg>`
  },
  {
    id: 'neuro-developmental-delay',
    name: 'Developmental Delay',
    domain: 'medicine',
    category: 'pediatric',
    tags: ['developmental delay', 'milestone', 'motor', 'cognitive', 'speech', 'pediatric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <line x1="8" y1="20" x2="56" y2="20"/>
      <line x1="8" y1="32" x2="56" y2="32"/>
      <line x1="8" y1="44" x2="56" y2="44"/>
      <text x="10" y="16" font-size="3" fill="currentColor" stroke="none">Motor</text>
      <text x="10" y="28" font-size="3" fill="currentColor" stroke="none">Speech</text>
      <text x="10" y="40" font-size="3" fill="currentColor" stroke="none">Social</text>
      <circle cx="30" cy="26" r="3" fill="green"/>
      <circle cx="38" cy="38" r="3" fill="yellow"/>
      <circle cx="44" cy="50" r="3" fill="red"/>
      <path d="M30 26l8 12" stroke="orange" stroke-width="2"/>
      <path d="M38 38l6 12" stroke="orange" stroke-width="2"/>
      <text x="12" y="52" font-size="3" fill="currentColor" stroke="none">Expected</text>
      <text x="40" y="52" font-size="3" fill="red" stroke="none">Delayed</text>
    </svg>`
  },
  {
    id: 'neuro-autism-spectrum',
    name: 'Autism Spectrum',
    domain: 'medicine',
    category: 'pediatric',
    tags: ['autism', 'ASD', 'spectrum', 'neurodevelopmental', 'social', 'communication'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="12" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="24" r="12"/>
      <circle cx="28" cy="22" r="2"/>
      <circle cx="36" cy="22" r="2"/>
      <path d="M27 22l-4-4" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M37 22l4-4" stroke="blue" stroke-dasharray="2 2"/>
      <path d="M28 30h8"/>
      <path d="M32 36v8"/>
      <ellipse cx="16" cy="44" rx="8" ry="6" fill="currentColor" opacity="0.1"/>
      <ellipse cx="48" cy="44" rx="8" ry="6" fill="currentColor" opacity="0.1"/>
      <circle cx="16" cy="44" r="3" fill="purple" opacity="0.4"/>
      <circle cx="48" cy="44" r="3" fill="purple" opacity="0.4"/>
      <path d="M24 44h-8" stroke-dasharray="3 2"/>
      <path d="M40 44h8" stroke-dasharray="3 2"/>
      <text x="4" y="56" font-size="3" fill="blue" stroke="none">Social interaction</text>
      <text x="36" y="56" font-size="3" fill="purple" stroke="none">Repetitive</text>
    </svg>`
  },
  {
    id: 'neuro-muscular-dystrophy',
    name: 'Muscular Dystrophy',
    domain: 'medicine',
    category: 'pediatric',
    tags: ['muscular dystrophy', 'Duchenne', 'DMD', 'Gower', 'weakness', 'dystrophin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="10" r="6"/>
      <path d="M32 16v10"/>
      <path d="M26 22l-8 4"/>
      <path d="M38 22l8 4"/>
      <path d="M28 26c-2 8-2 16-6 22" stroke-width="2"/>
      <path d="M36 26c2 8 2 16 6 22" stroke-width="2"/>
      <ellipse cx="22" cy="38" rx="6" ry="10" fill="red" opacity="0.2" stroke="red"/>
      <ellipse cx="42" cy="38" rx="6" ry="10" fill="red" opacity="0.2" stroke="red"/>
      <path d="M18 48l4 8"/>
      <path d="M46 48l-4 8"/>
      <text x="4" y="58" font-size="3" fill="red" stroke="none">Pseudohypertrophy</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL PATHOLOGY - COMPLETE
  // ===========================================================================
  {
    id: 'neuro-lacunar-stroke',
    name: 'Lacunar Stroke',
    domain: 'medicine',
    category: 'pathology',
    tags: ['lacunar', 'stroke', 'small vessel', 'basal ganglia', 'thalamus', 'pure motor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <circle cx="28" cy="36" r="4" fill="red" opacity="0.5" stroke="red"/>
      <circle cx="38" cy="32" r="3" fill="red" opacity="0.5" stroke="red"/>
      <circle cx="32" cy="28" r="2" fill="red" opacity="0.5" stroke="red"/>
      <path d="M24 24c4 2 8 2 12 0" opacity="0.5"/>
      <path d="M26 40c3 1 6 1 9 0" opacity="0.5"/>
      <text x="8" y="56" font-size="3" fill="red" stroke="none">Small lacunar infarcts</text>
    </svg>`
  },
  {
    id: 'neuro-watershed-infarct',
    name: 'Watershed Infarct',
    domain: 'medicine',
    category: 'pathology',
    tags: ['watershed', 'infarct', 'border zone', 'hypotension', 'ACA-MCA', 'MCA-PCA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="26" ry="22" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="26" ry="22"/>
      <line x1="32" y1="10" x2="32" y2="54"/>
      <path d="M20 16c0 8 4 24 0 32" stroke="red" stroke-width="2" fill="red" opacity="0.2"/>
      <path d="M44 16c0 8-4 24 0 32" stroke="red" stroke-width="2" fill="red" opacity="0.2"/>
      <text x="8" y="34" font-size="3" fill="currentColor" stroke="none">ACA</text>
      <text x="24" y="34" font-size="3" fill="currentColor" stroke="none">MCA</text>
      <text x="44" y="34" font-size="3" fill="currentColor" stroke="none">PCA</text>
      <text x="4" y="56" font-size="3" fill="red" stroke="none">Border zones</text>
    </svg>`
  },
  {
    id: 'neuro-glioblastoma',
    name: 'Glioblastoma',
    domain: 'medicine',
    category: 'pathology',
    tags: ['glioblastoma', 'GBM', 'grade IV', 'glioma', 'butterfly', 'necrosis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <path d="M20 28c4-4 12-4 16 0 4-4 8-4 12 0 0 8-8 16-14 16s-14-8-14-16z" fill="purple" opacity="0.4" stroke="purple" stroke-width="2"/>
      <circle cx="28" cy="32" r="4" fill="black" opacity="0.3"/>
      <circle cx="38" cy="30" r="3" fill="black" opacity="0.3"/>
      <path d="M32 20v8" stroke="purple" stroke-dasharray="2 2"/>
      <text x="4" y="56" font-size="3" fill="purple" stroke="none">Butterfly glioma</text>
      <text x="32" y="56" font-size="3" fill="currentColor" stroke="none">Necrosis</text>
    </svg>`
  },
  {
    id: 'neuro-pituitary-adenoma',
    name: 'Pituitary Adenoma',
    domain: 'medicine',
    category: 'pathology',
    tags: ['pituitary', 'adenoma', 'sella', 'prolactinoma', 'chiasm compression', 'hormone'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16c0-6 6-10 12-10s12 4 12 10" fill="currentColor" opacity="0.1"/>
      <path d="M20 16c0-6 6-10 12-10s12 4 12 10"/>
      <path d="M20 16l-8 8h8"/>
      <path d="M44 16l8 8h-8"/>
      <rect x="18" y="24" width="28" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="18" y="24" width="28" height="8" rx="2"/>
      <ellipse cx="32" cy="44" rx="14" ry="12" fill="purple" opacity="0.3" stroke="purple" stroke-width="2"/>
      <path d="M20 32v12" stroke="purple"/>
      <path d="M44 32v12" stroke="purple"/>
      <path d="M32 28v4" stroke-dasharray="2 2"/>
      <text x="24" y="48" font-size="4" fill="purple" stroke="none">Adenoma</text>
      <text x="18" y="22" font-size="3" fill="currentColor" stroke="none">Chiasm</text>
    </svg>`
  },
  {
    id: 'neuro-acoustic-neuroma',
    name: 'Acoustic Neuroma',
    domain: 'medicine',
    category: 'pathology',
    tags: ['acoustic neuroma', 'vestibular schwannoma', 'CPA', 'hearing loss', 'tinnitus', 'CN VIII'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <path d="M12 32h40" stroke-dasharray="2 2"/>
      <ellipse cx="18" cy="32" rx="8" ry="10" fill="orange" opacity="0.3" stroke="orange" stroke-width="2"/>
      <circle cx="18" cy="32" r="3" fill="orange"/>
      <path d="M10 32h-6"/>
      <path d="M4 28c-2 4-2 4 0 8"/>
      <path d="M26 32h8" stroke="orange" stroke-width="2"/>
      <text x="4" y="48" font-size="3" fill="orange" stroke="none">CN VIII tumor</text>
      <text x="4" y="54" font-size="3" fill="currentColor" stroke="none">CPA</text>
    </svg>`
  },
  {
    id: 'neuro-cavernoma',
    name: 'Cavernous Malformation',
    domain: 'medicine',
    category: 'pathology',
    tags: ['cavernoma', 'cavernous malformation', 'CCM', 'vascular', 'popcorn', 'hemosiderin'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z" fill="currentColor" opacity="0.1"/>
      <path d="M12 32c0-14 10-24 22-24s18 8 18 20c0 10-6 18-14 20l-4 8h-8l-2-6c-8-2-12-10-12-18z"/>
      <circle cx="36" cy="28" r="4" fill="purple" opacity="0.4"/>
      <circle cx="40" cy="32" r="3" fill="purple" opacity="0.5"/>
      <circle cx="34" cy="34" r="3" fill="purple" opacity="0.5"/>
      <circle cx="38" cy="26" r="2" fill="purple" opacity="0.5"/>
      <circle cx="42" cy="28" r="2" fill="purple" opacity="0.4"/>
      <circle cx="36" cy="28" r="8" stroke="brown" stroke-width="2" fill="none"/>
      <text x="4" y="56" font-size="3" fill="purple" stroke="none">Popcorn lesion</text>
      <text x="32" y="56" font-size="3" fill="brown" stroke="none">Hemosiderin</text>
    </svg>`
  },
  {
    id: 'neuro-transverse-myelitis',
    name: 'Transverse Myelitis',
    domain: 'medicine',
    category: 'pathology',
    tags: ['transverse myelitis', 'spinal cord', 'inflammation', 'demyelination', 'paraplegia', 'sensory level'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="56" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="4" width="16" height="56" rx="4"/>
      <rect x="24" y="24" width="16" height="16" fill="red" opacity="0.3" stroke="red" stroke-width="2"/>
      <path d="M16 32h8"/>
      <path d="M40 32h8"/>
      <path d="M16 28h4"/>
      <path d="M44 28h4"/>
      <path d="M16 36h4"/>
      <path d="M44 36h4"/>
      <line x1="8" y1="24" x2="8" y2="40" stroke="blue" stroke-width="3"/>
      <text x="4" y="48" font-size="3" fill="blue" stroke="none">Level</text>
      <text x="42" y="52" font-size="3" fill="red" stroke="none">Inflamed</text>
    </svg>`
  },
  {
    id: 'neuro-syringomyelia',
    name: 'Syringomyelia',
    domain: 'medicine',
    category: 'pathology',
    tags: ['syringomyelia', 'syrinx', 'spinal cord', 'cavity', 'Chiari', 'cape distribution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="56" rx="4" fill="currentColor" opacity="0.15"/>
      <rect x="24" y="4" width="16" height="56" rx="4"/>
      <ellipse cx="32" cy="32" rx="4" ry="20" fill="blue" opacity="0.3" stroke="blue" stroke-width="1.5"/>
      <path d="M16 16h8"/>
      <path d="M40 16h8"/>
      <path d="M16 48h8"/>
      <path d="M40 48h8"/>
      <path d="M28 32h8" stroke-dasharray="2 2"/>
      <text x="4" y="34" font-size="3" fill="blue" stroke="none">Syrinx</text>
      <text x="44" y="34" font-size="3" fill="currentColor" stroke="none">Cavity</text>
    </svg>`
  },
  {
    id: 'neuro-chiari-malformation',
    name: 'Chiari Malformation',
    domain: 'medicine',
    category: 'pathology',
    tags: ['Chiari', 'malformation', 'tonsillar herniation', 'foramen magnum', 'syrinx', 'headache'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 24c0-10 8-18 20-18s20 8 20 18" fill="currentColor" opacity="0.1"/>
      <path d="M12 24c0-10 8-18 20-18s20 8 20 18"/>
      <ellipse cx="32" cy="28" rx="8" ry="6" fill="currentColor" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="8" ry="6"/>
      <line x1="8" y1="32" x2="56" y2="32" stroke-width="2"/>
      <ellipse cx="26" cy="40" rx="4" ry="8" fill="purple" opacity="0.3" stroke="purple"/>
      <ellipse cx="38" cy="40" rx="4" ry="8" fill="purple" opacity="0.3" stroke="purple"/>
      <rect x="28" y="48" width="8" height="12" rx="2" fill="currentColor" opacity="0.15"/>
      <text x="4" y="34" font-size="3" fill="currentColor" stroke="none">FM</text>
      <text x="4" y="48" font-size="3" fill="purple" stroke="none">Herniated tonsils</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL DIAGNOSTIC EQUIPMENT - COMPLETE
  // ===========================================================================
  {
    id: 'neuro-eeg-montage',
    name: 'EEG Montage Setup',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['EEG', 'montage', '10-20 system', 'electrodes', 'scalp', 'placement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="24" ry="20" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="24" ry="20"/>
      <circle cx="32" cy="10" r="2" fill="blue"/>
      <circle cx="20" cy="16" r="2" fill="blue"/>
      <circle cx="44" cy="16" r="2" fill="blue"/>
      <circle cx="12" cy="28" r="2" fill="blue"/>
      <circle cx="52" cy="28" r="2" fill="blue"/>
      <circle cx="20" cy="40" r="2" fill="blue"/>
      <circle cx="44" cy="40" r="2" fill="blue"/>
      <circle cx="32" cy="28" r="2" fill="red"/>
      <circle cx="24" cy="24" r="2" fill="green"/>
      <circle cx="40" cy="24" r="2" fill="green"/>
      <circle cx="24" cy="32" r="2" fill="green"/>
      <circle cx="40" cy="32" r="2" fill="green"/>
      <text x="28" y="52" font-size="3" fill="currentColor" stroke="none">Fp-Fz-Cz-Pz-Oz</text>
      <text x="4" y="58" font-size="3" fill="blue" stroke="none">10-20 System</text>
    </svg>`
  },
  {
    id: 'neuro-continuous-eeg',
    name: 'Continuous EEG Monitoring',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['cEEG', 'continuous', 'ICU', 'monitoring', 'seizure detection', 'status'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="40" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="4" y="4" width="56" height="40" rx="4"/>
      <path d="M8 16h48" stroke-dasharray="2 2" opacity="0.3"/>
      <path d="M8 24h48" stroke-dasharray="2 2" opacity="0.3"/>
      <path d="M8 32h48" stroke-dasharray="2 2" opacity="0.3"/>
      <path d="M10 16c2-4 4 4 6 0s4 4 6 0 4 4 6 0 4 4 6 0 4 4 6 0 4 4 6 0" stroke="blue"/>
      <path d="M10 24c2-2 4 2 6 0s4 2 6 0 4 2 6 0 4 2 6 0 4 2 6 0 4 2 6 0" stroke="green"/>
      <path d="M10 32c1-1 2 1 3 0s2 1 3 0 2 1 3 0 2 1 3 0 2 1 3 0 2 1 3 0 2 1 3 0 2 1 3 0" stroke="purple"/>
      <circle cx="50" cy="8" r="3" fill="green"/>
      <text x="4" y="12" font-size="3" fill="currentColor" stroke="none">Fp1-F3</text>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">F3-C3</text>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">C3-P3</text>
      <rect x="8" y="48" width="16" height="12" rx="2" fill="red" opacity="0.2"/>
      <text x="10" y="56" font-size="3" fill="red" stroke="none">SEIZURE</text>
    </svg>`
  },
  {
    id: 'neuro-video-eeg',
    name: 'Video EEG',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['video EEG', 'VEEG', 'epilepsy monitoring', 'seizure', 'localization', 'presurgical'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="32" y="4" width="28" height="20" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="32" y="4" width="28" height="20" rx="2"/>
      <circle cx="46" cy="14" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="46" cy="14" r="3"/>
      <rect x="4" y="28" width="56" height="32" rx="2" fill="currentColor" opacity="0.05"/>
      <rect x="4" y="28" width="56" height="32" rx="2"/>
      <path d="M8 40h20"/>
      <path d="M8 40c2-4 4 4 6 0s4 4 6 0 2 4 4 0" stroke="blue"/>
      <path d="M8 48h20"/>
      <path d="M8 48c2-2 4 2 6 0s4 2 6 0 2 2 4 0" stroke="green"/>
      <rect x="34" y="32" width="22" height="16" rx="1" fill="currentColor" opacity="0.1"/>
      <circle cx="45" cy="40" r="4"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">EEG</text>
      <text x="34" y="54" font-size="3" fill="currentColor" stroke="none">Video sync</text>
    </svg>`
  },
  {
    id: 'neuro-transcranial-doppler',
    name: 'Transcranial Doppler',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['TCD', 'transcranial doppler', 'cerebral blood flow', 'vasospasm', 'MCA velocity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="24" rx="20" ry="16"/>
      <path d="M20 24h24" stroke="red" stroke-width="2"/>
      <path d="M8 24l8-4v8z" fill="currentColor" opacity="0.3"/>
      <path d="M8 24l-4 0"/>
      <path d="M4 20v8"/>
      <path d="M4 44h56"/>
      <path d="M8 44c4-8 8-8 12 0s8 8 12 0 8-8 12 0 8 8 12 0" stroke="blue" stroke-width="2"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">Probe</text>
      <text x="28" y="20" font-size="3" fill="red" stroke="none">MCA</text>
      <text x="4" y="58" font-size="3" fill="blue" stroke="none">Flow velocity</text>
    </svg>`
  },
  {
    id: 'neuro-mri-spectroscopy',
    name: 'MR Spectroscopy',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['MRS', 'spectroscopy', 'NAA', 'choline', 'creatine', 'lactate', 'metabolites'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="4" y="4" width="56" height="56" rx="4"/>
      <line x1="8" y1="48" x2="56" y2="48"/>
      <line x1="8" y1="48" x2="8" y2="8"/>
      <path d="M16 44v-20" stroke="blue" stroke-width="3"/>
      <path d="M26 44v-16" stroke="green" stroke-width="3"/>
      <path d="M36 44v-12" stroke="purple" stroke-width="3"/>
      <path d="M46 44v-8" stroke="orange" stroke-width="3"/>
      <text x="14" y="56" font-size="3" fill="blue" stroke="none">NAA</text>
      <text x="23" y="56" font-size="3" fill="green" stroke="none">Cho</text>
      <text x="33" y="56" font-size="3" fill="purple" stroke="none">Cr</text>
      <text x="43" y="56" font-size="3" fill="orange" stroke="none">Lac</text>
      <text x="8" y="12" font-size="3" fill="currentColor" stroke="none">Amplitude</text>
      <text x="48" y="52" font-size="3" fill="currentColor" stroke="none">ppm</text>
    </svg>`
  },
  {
    id: 'neuro-functional-mri',
    name: 'Functional MRI',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['fMRI', 'BOLD', 'functional', 'activation', 'motor cortex', 'language'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <ellipse cx="32" cy="32" rx="18" ry="16" fill="currentColor" opacity="0.15"/>
      <ellipse cx="32" cy="32" rx="18" ry="16"/>
      <line x1="32" y1="16" x2="32" y2="48" stroke-dasharray="2 2"/>
      <ellipse cx="22" cy="28" rx="6" ry="4" fill="red" opacity="0.5"/>
      <ellipse cx="42" cy="28" rx="6" ry="4" fill="orange" opacity="0.5"/>
      <ellipse cx="32" cy="40" rx="4" ry="3" fill="yellow" opacity="0.5"/>
      <text x="16" y="24" font-size="3" fill="red" stroke="none">Motor</text>
      <text x="38" y="24" font-size="3" fill="orange" stroke="none">Sensory</text>
      <text x="26" y="48" font-size="3" fill="yellow" stroke="none">Language</text>
    </svg>`
  },
  {
    id: 'neuro-intraoperative-monitoring',
    name: 'Intraoperative Monitoring',
    domain: 'medicine',
    category: 'diagnostics',
    tags: ['IOM', 'IONM', 'MEP', 'SSEP', 'EMG', 'surgery', 'neuromonitoring'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4" fill="currentColor" opacity="0.05"/>
      <rect x="4" y="4" width="56" height="56" rx="4"/>
      <rect x="8" y="8" width="24" height="20" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="10" y="14" font-size="3" fill="currentColor" stroke="none">MEP</text>
      <path d="M10 20c2-4 4 4 6 0s4 4 6 0" stroke="red"/>
      <rect x="36" y="8" width="24" height="20" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="38" y="14" font-size="3" fill="currentColor" stroke="none">SSEP</text>
      <path d="M38 20c2-2 4 2 6 0s4 2 6 0 4-2 6 0" stroke="blue"/>
      <rect x="8" y="32" width="24" height="20" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="10" y="38" font-size="3" fill="currentColor" stroke="none">EMG</text>
      <path d="M10 44h20"/>
      <path d="M14 44v-4"/>
      <path d="M20 44v-6"/>
      <path d="M26 44v-3"/>
      <circle cx="48" cy="42" r="10" fill="green" opacity="0.2"/>
      <text x="44" y="44" font-size="4" fill="green" stroke="none">OK</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL SURGICAL PROCEDURES - COMPLETE
  // ===========================================================================
  {
    id: 'neuro-microvascular-decompression',
    name: 'Microvascular Decompression',
    domain: 'medicine',
    category: 'surgery',
    tags: ['MVD', 'microvascular', 'decompression', 'trigeminal', 'hemifacial', 'Teflon'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="28" r="16" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="28" r="16"/>
      <circle cx="32" cy="28" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M28 28l-12 8" stroke="red" stroke-width="2"/>
      <path d="M16 36c-4 4-8 8-4 12" stroke="red" stroke-width="2"/>
      <path d="M22 32c-2 2-4 6-2 10" stroke="blue" stroke-width="1.5"/>
      <rect x="18" y="36" width="6" height="4" fill="white" stroke="gray"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Teflon pad</text>
      <text x="8" y="30" font-size="3" fill="red" stroke="none">Artery</text>
      <text x="8" y="48" font-size="3" fill="blue" stroke="none">CN V</text>
    </svg>`
  },
  {
    id: 'neuro-stereotactic-biopsy',
    name: 'Stereotactic Biopsy',
    domain: 'medicine',
    category: 'surgery',
    tags: ['stereotactic', 'biopsy', 'brain', 'frame', 'coordinates', 'lesion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="16" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="28" rx="20" ry="16"/>
      <rect x="8" y="8" width="48" height="40" rx="2" fill="none" stroke="blue"/>
      <line x1="8" y1="28" x2="56" y2="28" stroke="blue" stroke-dasharray="2 2"/>
      <line x1="32" y1="8" x2="32" y2="48" stroke="blue" stroke-dasharray="2 2"/>
      <circle cx="40" cy="24" r="4" fill="purple" opacity="0.4" stroke="purple"/>
      <path d="M40 8v12" stroke-width="2"/>
      <circle cx="40" cy="8" r="2" fill="currentColor"/>
      <text x="44" y="26" font-size="3" fill="purple" stroke="none">Target</text>
      <text x="4" y="56" font-size="3" fill="blue" stroke="none">Frame coordinates</text>
    </svg>`
  },
  {
    id: 'neuro-awake-craniotomy',
    name: 'Awake Craniotomy',
    domain: 'medicine',
    category: 'surgery',
    tags: ['awake', 'craniotomy', 'eloquent cortex', 'mapping', 'language', 'motor'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="22" ry="18" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="24" rx="22" ry="18"/>
      <path d="M18 12a18 14 0 0 1 28 0" stroke="red" stroke-width="2"/>
      <ellipse cx="32" cy="20" rx="10" ry="8" fill="currentColor" opacity="0.2"/>
      <circle cx="26" cy="18" r="2" fill="blue"/>
      <circle cx="38" cy="18" r="2" fill="green"/>
      <circle cx="32" cy="24" r="2" fill="orange"/>
      <path d="M26 18l-4-8" stroke="blue"/>
      <path d="M38 18l4-8" stroke="green"/>
      <path d="M24 44l4-4 4 4"/>
      <path d="M36 44l4-4 4 4"/>
      <ellipse cx="30" cy="52" rx="4" ry="2"/>
      <path d="M28 50c2 2 2 4 0 4"/>
      <text x="4" y="10" font-size="3" fill="blue" stroke="none">Motor</text>
      <text x="46" y="10" font-size="3" fill="green" stroke="none">Sensory</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Patient awake</text>
    </svg>`
  },
  {
    id: 'neuro-lumboperitoneal-shunt',
    name: 'LP Shunt',
    domain: 'medicine',
    category: 'surgery',
    tags: ['LP shunt', 'lumboperitoneal', 'pseudotumor', 'IIH', 'CSF', 'drainage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="24" rx="2" fill="currentColor" opacity="0.15"/>
      <rect x="24" y="4" width="16" height="24" rx="2"/>
      <rect x="22" y="28" width="20" height="8" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="22" y="28" width="20" height="8" rx="1"/>
      <path d="M32 36v4"/>
      <rect x="28" y="40" width="8" height="6" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="28" y="40" width="8" height="6" rx="1"/>
      <path d="M32 46c8 4 16 4 20 8"/>
      <ellipse cx="52" cy="56" rx="6" ry="4" fill="currentColor" opacity="0.1"/>
      <ellipse cx="52" cy="56" rx="6" ry="4"/>
      <circle cx="32" cy="32" r="2" fill="blue" opacity="0.5"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">L3-L4</text>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Valve</text>
      <text x="44" y="52" font-size="3" fill="currentColor" stroke="none">Peritoneum</text>
    </svg>`
  },
  {
    id: 'neuro-vagal-nerve-stimulator',
    name: 'Vagal Nerve Stimulator',
    domain: 'medicine',
    category: 'surgery',
    tags: ['VNS', 'vagal', 'stimulator', 'epilepsy', 'refractory', 'neuromodulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20v8"/>
      <path d="M28 28l-8 4v16"/>
      <path d="M36 28l8 4"/>
      <ellipse cx="20" cy="50" rx="6" ry="4" fill="blue" opacity="0.2"/>
      <ellipse cx="20" cy="50" rx="6" ry="4" stroke="blue"/>
      <path d="M20 46v-8" stroke="blue" stroke-width="2"/>
      <path d="M20 38c-4 0-8-4-8-8" stroke="blue"/>
      <rect x="4" y="28" width="10" height="14" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="4" y="28" width="10" height="14" rx="2"/>
      <path d="M9 28v-4"/>
      <path d="M9 24l11 14" stroke="blue"/>
      <text x="4" y="48" font-size="3" fill="currentColor" stroke="none">IPG</text>
      <text x="14" y="56" font-size="3" fill="blue" stroke="none">CN X</text>
    </svg>`
  },
  {
    id: 'neuro-responsive-neurostimulation',
    name: 'Responsive Neurostimulation',
    domain: 'medicine',
    category: 'surgery',
    tags: ['RNS', 'responsive', 'neurostimulation', 'epilepsy', 'closed-loop', 'seizure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="22" ry="18" fill="currentColor" opacity="0.1"/>
      <ellipse cx="32" cy="24" rx="22" ry="18"/>
      <rect x="24" y="8" width="16" height="8" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="24" y="8" width="16" height="8" rx="2"/>
      <path d="M28 16v8"/>
      <path d="M36 16v8"/>
      <circle cx="28" cy="28" r="3" fill="green"/>
      <circle cx="36" cy="28" r="3" fill="green"/>
      <path d="M28 28c2-4 4-4 8 0" stroke="red" stroke-width="2"/>
      <path d="M26 32c4 4 10 4 12 0" stroke="blue" stroke-width="2"/>
      <path d="M4 48h12l2-4 2 8 2-12 2 10 2-2h6" stroke="red"/>
      <path d="M32 48h4l2-2 2 4 2-6 2 4h8" stroke="blue"/>
      <text x="4" y="58" font-size="3" fill="red" stroke="none">Detect</text>
      <text x="32" y="58" font-size="3" fill="blue" stroke="none">Stimulate</text>
    </svg>`
  },
];

export default neurologyIcons;
