/**
 * Neuroscience Icon Library
 * Comprehensive SVG icons for neuroscience
 *
 * Categories:
 * - Neurons (structure, types)
 * - Synapses (structure, transmission)
 * - Brain Regions (anatomy, function)
 * - Neural Circuits (pathways, networks)
 */

import type { IconDefinition } from './index';

export const neuroscienceIcons: IconDefinition[] = [
  // ===========================================================================
  // NEURONS
  // ===========================================================================
  {
    id: 'neuro-neuron',
    name: 'Neuron Structure',
    domain: 'biology',
    category: 'neurons',
    tags: ['neuron', 'soma', 'axon', 'dendrite', 'nerve cell'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="32" r="10" fill="#9B59B6" opacity="0.4"/>
      <circle cx="16" cy="32" r="4" fill="#9B59B6"/>
      <path d="M4 24l8 4"/>
      <path d="M4 32l6 0"/>
      <path d="M4 40l8-4"/>
      <path d="M8 20l4 8"/>
      <path d="M8 44l4-8"/>
      <path d="M26 32h30"/>
      <path d="M56 24l-8 8 8 8"/>
      <path d="M36 32c0-2 2-4 4-4"/>
      <path d="M44 32c0-2 2-4 4-4"/>
      <path d="M52 32c0-2 2-4 4-4"/>
      <text x="10" y="52" font-size="3" fill="currentColor" stroke="none">Dendrites</text>
      <text x="28" y="52" font-size="3" fill="currentColor" stroke="none">Axon</text>
      <text x="48" y="52" font-size="3" fill="currentColor" stroke="none">Terminal</text>
    </svg>`
  },
  {
    id: 'neuro-multipolar',
    name: 'Multipolar Neuron',
    domain: 'biology',
    category: 'neurons',
    tags: ['multipolar', 'motor neuron', 'interneuron', 'many dendrites'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="24" r="10" fill="#E74C3C" opacity="0.4"/>
      <path d="M24 16l-8-8"/>
      <path d="M32 14l0-8"/>
      <path d="M40 16l8-8"/>
      <path d="M22 24l-8 0"/>
      <path d="M42 24l8 0"/>
      <path d="M26 30l-4 4"/>
      <path d="M38 30l4 4"/>
      <path d="M32 34v24"/>
      <path d="M28 58l4-4 4 4"/>
      <path d="M24 54l4-4"/>
      <path d="M40 54l-4-4"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Multipolar</text>
    </svg>`
  },
  {
    id: 'neuro-bipolar',
    name: 'Bipolar Neuron',
    domain: 'biology',
    category: 'neurons',
    tags: ['bipolar', 'sensory neuron', 'retina', 'two processes'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l-4-4 4-2 4 2-4 4"/>
      <path d="M32 8v16"/>
      <circle cx="32" cy="32" r="8" fill="#3498DB" opacity="0.4"/>
      <path d="M32 40v16"/>
      <path d="M28 56l4 4 4-4"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Bipolar</text>
    </svg>`
  },
  {
    id: 'neuro-unipolar',
    name: 'Unipolar Neuron',
    domain: 'biology',
    category: 'neurons',
    tags: ['unipolar', 'pseudounipolar', 'sensory', 'DRG'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="8" fill="#27AE60" opacity="0.4"/>
      <path d="M32 28v8"/>
      <path d="M32 36l-16 16"/>
      <path d="M32 36l16 16"/>
      <path d="M16 52l-4-4 4-4"/>
      <path d="M48 52l4-4-4-4"/>
      <text x="20" y="62" font-size="4" fill="currentColor" stroke="none">Unipolar</text>
    </svg>`
  },
  {
    id: 'neuro-myelin',
    name: 'Myelinated Axon',
    domain: 'biology',
    category: 'neurons',
    tags: ['myelin', 'Schwann cell', 'node of Ranvier', 'saltatory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32" stroke-width="2"/>
      <ellipse cx="12" cy="32" rx="6" ry="8" fill="#F39C12" opacity="0.4"/>
      <ellipse cx="28" cy="32" rx="6" ry="8" fill="#F39C12" opacity="0.4"/>
      <ellipse cx="44" cy="32" rx="6" ry="8" fill="#F39C12" opacity="0.4"/>
      <path d="M6 24v16"/>
      <path d="M18 24v16"/>
      <path d="M22 24v16"/>
      <path d="M34 24v16"/>
      <path d="M38 24v16"/>
      <path d="M50 24v16"/>
      <text x="16" y="52" font-size="3" fill="currentColor" stroke="none">Node of Ranvier</text>
      <text x="8" y="18" font-size="3" fill="currentColor" stroke="none">Myelin sheath</text>
    </svg>`
  },
  {
    id: 'neuro-action-potential',
    name: 'Action Potential',
    domain: 'biology',
    category: 'neurons',
    tags: ['action potential', 'depolarization', 'repolarization', 'threshold'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="56" x2="56" y2="56"/>
      <line x1="8" y1="56" x2="8" y2="8"/>
      <path d="M8 44h12l4-32 8 40 4-8h20" stroke="#E74C3C" stroke-width="2"/>
      <line x1="8" y1="44" x2="56" y2="44" stroke-dasharray="2 2"/>
      <text x="40" y="40" font-size="3" fill="currentColor" stroke="none">Threshold</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Time</text>
      <text x="2" y="28" font-size="3" fill="currentColor" stroke="none">mV</text>
      <text x="24" y="20" font-size="3" fill="currentColor" stroke="none">Spike</text>
    </svg>`
  },

  // ===========================================================================
  // SYNAPSES
  // ===========================================================================
  {
    id: 'neuro-synapse',
    name: 'Chemical Synapse',
    domain: 'biology',
    category: 'synapses',
    tags: ['synapse', 'neurotransmitter', 'vesicle', 'receptor', 'cleft'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="24" height="24" rx="4" fill="#9B59B6" opacity="0.3"/>
      <circle cx="12" cy="16" r="3" fill="#E74C3C"/>
      <circle cx="20" cy="12" r="3" fill="#E74C3C"/>
      <circle cx="16" cy="20" r="3" fill="#E74C3C"/>
      <rect x="4" y="32" width="56" height="4" fill="#87CEEB" opacity="0.2"/>
      <circle cx="12" cy="34" r="2" fill="#E74C3C"/>
      <circle cx="20" cy="34" r="2" fill="#E74C3C"/>
      <circle cx="28" cy="34" r="2" fill="#E74C3C"/>
      <rect x="4" y="40" width="56" height="20" rx="4" fill="#3498DB" opacity="0.3"/>
      <ellipse cx="16" cy="44" rx="4" ry="2" fill="#27AE60"/>
      <ellipse cx="28" cy="44" rx="4" ry="2" fill="#27AE60"/>
      <text x="36" y="16" font-size="3" fill="currentColor" stroke="none">Presynaptic</text>
      <text x="36" y="36" font-size="3" fill="currentColor" stroke="none">Cleft</text>
      <text x="36" y="52" font-size="3" fill="currentColor" stroke="none">Postsynaptic</text>
    </svg>`
  },
  {
    id: 'neuro-vesicle-release',
    name: 'Vesicle Release',
    domain: 'biology',
    category: 'synapses',
    tags: ['vesicle', 'exocytosis', 'neurotransmitter release', 'calcium'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="28" rx="4" fill="#9B59B6" opacity="0.2"/>
      <circle cx="20" cy="16" r="6" fill="#E74C3C" opacity="0.5"/>
      <circle cx="36" cy="16" r="6" fill="#E74C3C" opacity="0.5"/>
      <circle cx="28" cy="24" r="6" stroke-dasharray="2 2"/>
      <path d="M28 30v8"/>
      <circle cx="28" cy="42" r="2" fill="#E74C3C"/>
      <circle cx="24" cy="46" r="2" fill="#E74C3C"/>
      <circle cx="32" cy="46" r="2" fill="#E74C3C"/>
      <circle cx="28" cy="50" r="2" fill="#E74C3C"/>
      <rect x="4" y="52" width="56" height="8" fill="#3498DB" opacity="0.3"/>
      <circle cx="48" cy="12" r="3" fill="#87CEEB"/>
      <text x="40" y="16" font-size="3" fill="currentColor" stroke="none">Ca²⁺</text>
    </svg>`
  },
  {
    id: 'neuro-neurotransmitters',
    name: 'Neurotransmitters',
    domain: 'biology',
    category: 'synapses',
    tags: ['neurotransmitter', 'dopamine', 'serotonin', 'GABA', 'glutamate'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="16" r="8" fill="#E74C3C" opacity="0.4"/>
      <text x="6" y="20" font-size="4" fill="currentColor" stroke="none">DA</text>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">Dopamine</text>
      <circle cx="36" cy="16" r="8" fill="#3498DB" opacity="0.4"/>
      <text x="30" y="20" font-size="4" fill="currentColor" stroke="none">5HT</text>
      <text x="26" y="32" font-size="3" fill="currentColor" stroke="none">Serotonin</text>
      <circle cx="12" cy="48" r="8" fill="#27AE60" opacity="0.4"/>
      <text x="4" y="52" font-size="4" fill="currentColor" stroke="none">Glu</text>
      <text x="2" y="62" font-size="3" fill="currentColor" stroke="none">Glutamate</text>
      <circle cx="36" cy="48" r="8" fill="#9B59B6" opacity="0.4"/>
      <text x="28" y="52" font-size="4" fill="currentColor" stroke="none">GABA</text>
      <text x="28" y="62" font-size="3" fill="currentColor" stroke="none">Inhibitory</text>
      <text x="48" y="16" font-size="3" fill="currentColor" stroke="none">+</text>
      <text x="48" y="48" font-size="3" fill="currentColor" stroke="none">-</text>
    </svg>`
  },
  {
    id: 'neuro-receptor-types',
    name: 'Receptor Types',
    domain: 'biology',
    category: 'synapses',
    tags: ['receptor', 'ionotropic', 'metabotropic', 'ligand-gated', 'GPCR'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="24" height="24" fill="#3498DB" opacity="0.2"/>
      <circle cx="16" cy="16" r="4" fill="#E74C3C"/>
      <ellipse cx="16" cy="32" rx="8" ry="12" fill="#27AE60" opacity="0.4"/>
      <path d="M8 32h16"/>
      <path d="M16 44v8" stroke-dasharray="2 2"/>
      <text x="4" y="60" font-size="3" fill="currentColor" stroke="none">Ionotropic</text>
      <rect x="36" y="20" width="24" height="24" fill="#3498DB" opacity="0.2"/>
      <circle cx="48" cy="16" r="4" fill="#E74C3C"/>
      <path d="M40 24c4-4 12-4 16 0" fill="#9B59B6" opacity="0.4"/>
      <path d="M48 28v8"/>
      <circle cx="48" cy="40" r="4" fill="#F39C12"/>
      <path d="M48 44v8" stroke-dasharray="2 2"/>
      <text x="34" y="60" font-size="3" fill="currentColor" stroke="none">Metabotropic</text>
    </svg>`
  },
  {
    id: 'neuro-synaptic-plasticity',
    name: 'Synaptic Plasticity',
    domain: 'biology',
    category: 'synapses',
    tags: ['plasticity', 'LTP', 'LTD', 'learning', 'memory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="24" height="20" fill="#9B59B6" opacity="0.2"/>
      <circle cx="12" cy="16" r="2" fill="#E74C3C"/>
      <circle cx="20" cy="16" r="2" fill="#E74C3C"/>
      <rect x="4" y="32" width="24" height="8" fill="#3498DB" opacity="0.2"/>
      <text x="8" y="42" font-size="3" fill="currentColor" stroke="none">Baseline</text>
      <rect x="36" y="8" width="24" height="20" fill="#9B59B6" opacity="0.3"/>
      <circle cx="40" cy="14" r="3" fill="#E74C3C"/>
      <circle cx="48" cy="14" r="3" fill="#E74C3C"/>
      <circle cx="56" cy="14" r="3" fill="#E74C3C"/>
      <circle cx="44" cy="22" r="3" fill="#E74C3C"/>
      <circle cx="52" cy="22" r="3" fill="#E74C3C"/>
      <rect x="36" y="32" width="24" height="8" fill="#27AE60" opacity="0.4"/>
      <text x="44" y="42" font-size="3" fill="currentColor" stroke="none">LTP</text>
      <path d="M28 20l8 0"/>
      <path d="M36 16l4 4-4 4"/>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Before stimulation</text>
      <text x="36" y="56" font-size="3" fill="currentColor" stroke="none">After stimulation</text>
    </svg>`
  },

  // ===========================================================================
  // BRAIN REGIONS
  // ===========================================================================
  {
    id: 'neuro-brain-overview',
    name: 'Brain Overview',
    domain: 'biology',
    category: 'brain-regions',
    tags: ['brain', 'cerebrum', 'cerebellum', 'brainstem', 'anatomy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c0-16 12-24 24-24s24 8 24 20c0 8-4 16-12 20"/>
      <path d="M8 32c-4 4-4 12 0 16s8 4 12 0"/>
      <path d="M44 48c4-4 8-8 8-16"/>
      <ellipse cx="48" cy="48" rx="8" ry="6" fill="#E74C3C" opacity="0.3"/>
      <path d="M20 40l-8 16"/>
      <path d="M16 20c8 4 8-4 16 0"/>
      <path d="M20 32c8 4 8-4 16 0"/>
      <text x="20" y="18" font-size="3" fill="currentColor" stroke="none">Cerebrum</text>
      <text x="40" y="54" font-size="3" fill="currentColor" stroke="none">Cerebellum</text>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Brainstem</text>
    </svg>`
  },
  {
    id: 'neuro-cerebral-cortex',
    name: 'Cerebral Cortex Lobes',
    domain: 'biology',
    category: 'brain-regions',
    tags: ['cortex', 'lobes', 'frontal', 'parietal', 'temporal', 'occipital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40c0-20 12-32 28-32s20 8 20 24"/>
      <path d="M8 40c-4 4-4 12 4 12h44"/>
      <line x1="28" y1="8" x2="28" y2="40" stroke-dasharray="2 2"/>
      <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="2 2"/>
      <path d="M28 40l28-8" stroke-dasharray="2 2"/>
      <text x="12" y="24" font-size="4" fill="#E74C3C" stroke="none">F</text>
      <text x="36" y="24" font-size="4" fill="#3498DB" stroke="none">P</text>
      <text x="12" y="44" font-size="4" fill="#27AE60" stroke="none">T</text>
      <text x="44" y="44" font-size="4" fill="#F39C12" stroke="none">O</text>
    </svg>`
  },
  {
    id: 'neuro-hippocampus',
    name: 'Hippocampus',
    domain: 'biology',
    category: 'brain-regions',
    tags: ['hippocampus', 'memory', 'learning', 'limbic system', 'temporal lobe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 32c8-16 24-16 32-8s8 16 0 24-24 8-32-8c0-4 4-8 8-8s8 4 8 8"/>
      <path d="M24 32c4-8 12-8 16 0" fill="#27AE60" opacity="0.3"/>
      <path d="M28 44c4-4 8-4 12 0" fill="#27AE60" opacity="0.3"/>
      <text x="16" y="56" font-size="4" fill="currentColor" stroke="none">Hippocampus</text>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Memory formation</text>
    </svg>`
  },
  {
    id: 'neuro-basal-ganglia',
    name: 'Basal Ganglia',
    domain: 'biology',
    category: 'brain-regions',
    tags: ['basal ganglia', 'striatum', 'movement', 'dopamine', 'reward'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="20" ry="12" fill="#E74C3C" opacity="0.3"/>
      <text x="22" y="24" font-size="4" fill="currentColor" stroke="none">Caudate</text>
      <ellipse cx="24" cy="36" rx="12" ry="8" fill="#3498DB" opacity="0.3"/>
      <text x="16" y="40" font-size="4" fill="currentColor" stroke="none">Putamen</text>
      <ellipse cx="44" cy="40" rx="8" ry="6" fill="#27AE60" opacity="0.3"/>
      <text x="38" y="44" font-size="3" fill="currentColor" stroke="none">GP</text>
      <circle cx="32" cy="52" r="6" fill="#9B59B6" opacity="0.3"/>
      <text x="28" y="56" font-size="3" fill="currentColor" stroke="none">STN</text>
    </svg>`
  },
  {
    id: 'neuro-thalamus',
    name: 'Thalamus',
    domain: 'biology',
    category: 'brain-regions',
    tags: ['thalamus', 'relay', 'sensory', 'diencephalon', 'nuclei'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#F39C12" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="20" ry="16"/>
      <path d="M4 16l20 12"/>
      <path d="M4 48l20-12"/>
      <path d="M60 16l-20 12"/>
      <path d="M60 48l-20-12"/>
      <path d="M32 8v8"/>
      <path d="M32 48v8"/>
      <circle cx="24" cy="28" r="4" fill="#E74C3C" opacity="0.4"/>
      <circle cx="40" cy="28" r="4" fill="#3498DB" opacity="0.4"/>
      <circle cx="32" cy="40" r="4" fill="#27AE60" opacity="0.4"/>
      <text x="20" y="60" font-size="4" fill="currentColor" stroke="none">Thalamus</text>
    </svg>`
  },

  // ===========================================================================
  // NEURAL CIRCUITS
  // ===========================================================================
  {
    id: 'neuro-reflex-arc',
    name: 'Reflex Arc',
    domain: 'biology',
    category: 'circuits',
    tags: ['reflex', 'arc', 'sensory', 'motor', 'interneuron', 'spinal cord'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="32" r="6" fill="#3498DB" opacity="0.4"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">S</text>
      <path d="M14 32h8"/>
      <circle cx="28" cy="32" r="6" fill="#9B59B6" opacity="0.4"/>
      <text x="24" y="36" font-size="3" fill="currentColor" stroke="none">IN</text>
      <path d="M34 32h8"/>
      <circle cx="48" cy="32" r="6" fill="#E74C3C" opacity="0.4"/>
      <text x="44" y="36" font-size="3" fill="currentColor" stroke="none">M</text>
      <path d="M54 32h6"/>
      <rect x="4" y="48" width="56" height="8" fill="#F39C12" opacity="0.2"/>
      <path d="M8 38v10"/>
      <path d="M28 38v10"/>
      <path d="M48 38v10"/>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Sensory</text>
      <text x="36" y="44" font-size="3" fill="currentColor" stroke="none">Motor</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Spinal cord</text>
    </svg>`
  },
  {
    id: 'neuro-neural-network',
    name: 'Neural Network',
    domain: 'biology',
    category: 'circuits',
    tags: ['network', 'connections', 'layers', 'input', 'output', 'processing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="16" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="8" cy="32" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="8" cy="48" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="32" cy="12" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="32" cy="28" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="32" cy="44" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="56" cy="24" r="4" fill="#E74C3C" opacity="0.5"/>
      <circle cx="56" cy="40" r="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M12 16l16-4"/>
      <path d="M12 16l16 12"/>
      <path d="M12 32l16-20"/>
      <path d="M12 32l16-4"/>
      <path d="M12 32l16 12"/>
      <path d="M12 48l16-4"/>
      <path d="M12 48l16-20"/>
      <path d="M36 12l16 12"/>
      <path d="M36 28l16-4"/>
      <path d="M36 28l16 12"/>
      <path d="M36 44l16-4"/>
      <path d="M36 44l16-20"/>
      <text x="2" y="62" font-size="3" fill="currentColor" stroke="none">Input</text>
      <text x="24" y="62" font-size="3" fill="currentColor" stroke="none">Hidden</text>
      <text x="48" y="62" font-size="3" fill="currentColor" stroke="none">Output</text>
    </svg>`
  },
  {
    id: 'neuro-reward-pathway',
    name: 'Reward Pathway',
    domain: 'biology',
    category: 'circuits',
    tags: ['reward', 'dopamine', 'VTA', 'nucleus accumbens', 'motivation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="48" rx="8" ry="6" fill="#27AE60" opacity="0.4"/>
      <text x="10" y="52" font-size="4" fill="currentColor" stroke="none">VTA</text>
      <path d="M24 48l16-16" stroke="#E74C3C" stroke-width="2"/>
      <ellipse cx="44" cy="28" rx="10" ry="8" fill="#3498DB" opacity="0.4"/>
      <text x="36" y="32" font-size="3" fill="currentColor" stroke="none">NAc</text>
      <path d="M44 20l0-8" stroke="#E74C3C" stroke-width="2"/>
      <ellipse cx="44" cy="8" rx="12" ry="6" fill="#9B59B6" opacity="0.4"/>
      <text x="36" y="12" font-size="3" fill="currentColor" stroke="none">PFC</text>
      <text x="4" y="60" font-size="3" fill="#E74C3C" stroke="none">Dopamine pathway</text>
    </svg>`
  },
  {
    id: 'neuro-sensory-pathway',
    name: 'Sensory Pathway',
    domain: 'biology',
    category: 'circuits',
    tags: ['sensory', 'afferent', 'ascending', 'thalamus', 'cortex'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="56" r="6" fill="#3498DB" opacity="0.4"/>
      <text x="26" y="60" font-size="4" fill="currentColor" stroke="none">R</text>
      <path d="M32 50v-8"/>
      <path d="M28 42l4 4 4-4"/>
      <ellipse cx="32" cy="32" rx="8" ry="6" fill="#F39C12" opacity="0.4"/>
      <text x="28" y="36" font-size="3" fill="currentColor" stroke="none">Th</text>
      <path d="M32 26v-8"/>
      <path d="M28 18l4 4 4-4"/>
      <ellipse cx="32" cy="10" rx="12" ry="6" fill="#9B59B6" opacity="0.4"/>
      <text x="24" y="14" font-size="3" fill="currentColor" stroke="none">Cortex</text>
      <text x="4" y="56" font-size="3" fill="currentColor" stroke="none">Receptor</text>
      <text x="44" y="36" font-size="3" fill="currentColor" stroke="none">Thalamus</text>
    </svg>`
  },
  {
    id: 'neuro-motor-pathway',
    name: 'Motor Pathway',
    domain: 'biology',
    category: 'circuits',
    tags: ['motor', 'efferent', 'descending', 'pyramidal', 'corticospinal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="10" rx="12" ry="6" fill="#E74C3C" opacity="0.4"/>
      <text x="20" y="14" font-size="3" fill="currentColor" stroke="none">Motor cortex</text>
      <path d="M32 16v8"/>
      <path d="M28 24l4-4 4 4"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#F39C12" opacity="0.4"/>
      <text x="26" y="36" font-size="3" fill="currentColor" stroke="none">BS</text>
      <path d="M24 36l-8 16"/>
      <path d="M40 36l8 16"/>
      <circle cx="14" cy="54" r="4" fill="#27AE60" opacity="0.4"/>
      <circle cx="50" cy="54" r="4" fill="#27AE60" opacity="0.4"/>
      <text x="2" y="62" font-size="3" fill="currentColor" stroke="none">Muscle</text>
      <text x="44" y="62" font-size="3" fill="currentColor" stroke="none">Muscle</text>
    </svg>`
  },
  {
    id: 'neuro-eeg',
    name: 'EEG Brain Waves',
    domain: 'biology',
    category: 'circuits',
    tags: ['EEG', 'brain waves', 'alpha', 'beta', 'theta', 'delta'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 12c2-4 4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0" stroke="#E74C3C"/>
      <text x="52" y="14" font-size="3" fill="currentColor" stroke="none">Beta</text>
      <path d="M4 24c4-4 4 4 8 0s4 4 8 0s4 4 8 0s4 4 8 0s4 4 8 0s4 4 8 0" stroke="#F39C12"/>
      <text x="52" y="26" font-size="3" fill="currentColor" stroke="none">Alpha</text>
      <path d="M4 36c4-6 8 6 12 0s8 6 12 0s8 6 12 0s8 6 12 0" stroke="#27AE60"/>
      <text x="52" y="38" font-size="3" fill="currentColor" stroke="none">Theta</text>
      <path d="M4 52c8-8 8 8 16 0s8 8 16 0s8 8 16 0" stroke="#3498DB"/>
      <text x="52" y="54" font-size="3" fill="currentColor" stroke="none">Delta</text>
    </svg>`
  },

  // ===========================================================================
  // NEUROIMAGING RESEARCH
  // ===========================================================================
  {
    id: 'neuro-fmri-brain',
    name: 'fMRI Brain Activation',
    domain: 'biology',
    category: 'neuroimaging',
    tags: ['fMRI', 'BOLD', 'functional imaging', 'brain activation', 'neuroimaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="24" ry="20" fill="#E8E8E8" opacity="0.3"/>
      <path d="M16 24c8 4 8-4 16 0"/>
      <path d="M16 32c8 4 8-4 16 0"/>
      <ellipse cx="24" cy="20" rx="6" ry="4" fill="#E74C3C" opacity="0.7"/>
      <ellipse cx="40" cy="24" rx="8" ry="6" fill="#F39C12" opacity="0.7"/>
      <ellipse cx="28" cy="36" rx="5" ry="4" fill="#3498DB" opacity="0.7"/>
      <rect x="4" y="52" width="56" height="8" rx="2" fill="#27AE60" opacity="0.3"/>
      <text x="14" y="58" font-size="3" fill="currentColor" stroke="none">BOLD Signal</text>
    </svg>`
  },
  {
    id: 'neuro-fmri-scanner',
    name: 'MRI Scanner',
    domain: 'biology',
    category: 'neuroimaging',
    tags: ['MRI', 'scanner', 'imaging', 'magnetic resonance', 'equipment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="32" rx="12" ry="16" fill="#3498DB" opacity="0.2"/>
      <ellipse cx="16" cy="32" rx="8" ry="12"/>
      <rect x="16" y="16" width="44" height="32" rx="2" fill="#9B59B6" opacity="0.2"/>
      <rect x="16" y="16" width="44" height="32" rx="2"/>
      <rect x="24" y="28" width="32" height="8" fill="#95A5A6" opacity="0.3"/>
      <circle cx="16" cy="32" r="4"/>
      <path d="M4 32h8"/>
      <text x="32" y="56" font-size="3" fill="currentColor" stroke="none">MRI Scanner</text>
    </svg>`
  },
  {
    id: 'neuro-pet-scan',
    name: 'PET Scan',
    domain: 'biology',
    category: 'neuroimaging',
    tags: ['PET', 'positron emission', 'metabolic imaging', 'FDG', 'tracer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="22" ry="18" fill="#F39C12" opacity="0.2"/>
      <ellipse cx="32" cy="28" rx="22" ry="18"/>
      <circle cx="24" cy="24" r="6" fill="#E74C3C" opacity="0.8"/>
      <circle cx="38" cy="22" r="4" fill="#F39C12" opacity="0.8"/>
      <circle cx="32" cy="34" r="5" fill="#27AE60" opacity="0.8"/>
      <circle cx="42" cy="32" r="3" fill="#3498DB" opacity="0.6"/>
      <rect x="8" y="52" width="48" height="6" rx="1"/>
      <rect x="12" y="54" width="8" height="2" fill="#E74C3C"/>
      <rect x="24" y="54" width="8" height="2" fill="#F39C12"/>
      <rect x="36" y="54" width="8" height="2" fill="#27AE60"/>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Metabolic Activity</text>
    </svg>`
  },
  {
    id: 'neuro-eeg-cap',
    name: 'EEG Electrode Cap',
    domain: 'biology',
    category: 'neuroimaging',
    tags: ['EEG', 'electrode', 'cap', '10-20 system', 'scalp recording'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="20" ry="18" fill="#9B59B6" opacity="0.2"/>
      <path d="M12 32c0-16 8-24 20-24s20 8 20 24"/>
      <circle cx="32" cy="12" r="3" fill="#27AE60"/>
      <circle cx="20" cy="16" r="3" fill="#3498DB"/>
      <circle cx="44" cy="16" r="3" fill="#3498DB"/>
      <circle cx="16" cy="28" r="3" fill="#E74C3C"/>
      <circle cx="48" cy="28" r="3" fill="#E74C3C"/>
      <circle cx="24" cy="24" r="3" fill="#F39C12"/>
      <circle cx="40" cy="24" r="3" fill="#F39C12"/>
      <circle cx="32" cy="24" r="3" fill="#27AE60"/>
      <path d="M32 12v-6"/>
      <path d="M20 16l-4-4"/>
      <path d="M44 16l4-4"/>
      <text x="20" y="58" font-size="3" fill="currentColor" stroke="none">EEG 10-20</text>
    </svg>`
  },
  {
    id: 'neuro-meg',
    name: 'MEG Device',
    domain: 'biology',
    category: 'neuroimaging',
    tags: ['MEG', 'magnetoencephalography', 'magnetic field', 'neural imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="16" ry="14" fill="#3498DB" opacity="0.2"/>
      <path d="M12 28c0-16 8-24 20-24s20 8 20 24"/>
      <path d="M8 28c0 8 4 12 4 20"/>
      <path d="M56 28c0 8-4 12-4 20"/>
      <ellipse cx="32" cy="24" rx="24" ry="20" fill="none" stroke-dasharray="4 2"/>
      <circle cx="32" cy="16" r="2" fill="#E74C3C"/>
      <circle cx="24" cy="24" r="2" fill="#E74C3C"/>
      <circle cx="40" cy="24" r="2" fill="#E74C3C"/>
      <rect x="4" y="48" width="56" height="8" fill="#9B59B6" opacity="0.3"/>
      <text x="18" y="62" font-size="3" fill="currentColor" stroke="none">MEG Sensors</text>
    </svg>`
  },
  {
    id: 'neuro-dti-tractography',
    name: 'DTI Tractography',
    domain: 'biology',
    category: 'neuroimaging',
    tags: ['DTI', 'diffusion tensor', 'tractography', 'white matter', 'connectivity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="22" ry="18" fill="#E8E8E8" opacity="0.3"/>
      <path d="M12 28c4-8 8 0 12-4s8 4 12 0s8-4 12 4" stroke="#E74C3C" stroke-width="2"/>
      <path d="M14 24c8-4 16 8 24-4s8 4 12 0" stroke="#3498DB" stroke-width="2"/>
      <path d="M16 36c6 0 12-8 18-4s8 4 14 0" stroke="#27AE60" stroke-width="2"/>
      <path d="M32 12v-4"/>
      <path d="M32 44v4"/>
      <path d="M10 28h-4"/>
      <path d="M54 28h4"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">White Matter Tracts</text>
    </svg>`
  },
  {
    id: 'neuro-resting-state',
    name: 'Resting State Network',
    domain: 'biology',
    category: 'neuroimaging',
    tags: ['resting state', 'default mode', 'DMN', 'functional connectivity', 'network'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="24" ry="20" fill="#E8E8E8" opacity="0.3"/>
      <circle cx="20" cy="20" r="5" fill="#E74C3C" opacity="0.6"/>
      <circle cx="44" cy="20" r="5" fill="#E74C3C" opacity="0.6"/>
      <circle cx="32" cy="36" r="5" fill="#3498DB" opacity="0.6"/>
      <circle cx="20" cy="36" r="4" fill="#27AE60" opacity="0.6"/>
      <circle cx="44" cy="36" r="4" fill="#27AE60" opacity="0.6"/>
      <path d="M20 20l24 0" stroke="#9B59B6" stroke-width="2" stroke-dasharray="2 2"/>
      <path d="M20 20l12 16" stroke="#9B59B6" stroke-width="2" stroke-dasharray="2 2"/>
      <path d="M44 20l-12 16" stroke="#9B59B6" stroke-width="2" stroke-dasharray="2 2"/>
      <path d="M20 36l12 0" stroke="#F39C12" stroke-dasharray="2 2"/>
      <path d="M44 36l-12 0" stroke="#F39C12" stroke-dasharray="2 2"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Default Mode Network</text>
    </svg>`
  },

  // ===========================================================================
  // ELECTROPHYSIOLOGY
  // ===========================================================================
  {
    id: 'neuro-patch-clamp',
    name: 'Patch Clamp Recording',
    domain: 'biology',
    category: 'electrophysiology',
    tags: ['patch clamp', 'electrophysiology', 'whole cell', 'ion channel', 'recording'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="36" r="12" fill="#3498DB" opacity="0.3"/>
      <circle cx="32" cy="36" r="8" fill="#9B59B6" opacity="0.4"/>
      <path d="M32 4v16" stroke-width="2"/>
      <path d="M28 4h8"/>
      <ellipse cx="32" cy="28" rx="2" ry="1" fill="#F39C12"/>
      <path d="M32 28v4" stroke-width="2"/>
      <circle cx="32" cy="34" r="2" fill="#27AE60"/>
      <path d="M8 52h20"/>
      <path d="M8 56l20-8"/>
      <text x="32" y="56" font-size="3" fill="currentColor" stroke="none">Patch</text>
      <text x="4" y="50" font-size="3" fill="currentColor" stroke="none">mV</text>
    </svg>`
  },
  {
    id: 'neuro-microelectrode-array',
    name: 'Microelectrode Array',
    domain: 'biology',
    category: 'electrophysiology',
    tags: ['MEA', 'multielectrode', 'array', 'multi-unit', 'recording'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="16" width="40" height="32" rx="2" fill="#9B59B6" opacity="0.2"/>
      <rect x="12" y="16" width="40" height="32" rx="2"/>
      <circle cx="20" cy="24" r="2" fill="#27AE60"/>
      <circle cx="32" cy="24" r="2" fill="#27AE60"/>
      <circle cx="44" cy="24" r="2" fill="#27AE60"/>
      <circle cx="20" cy="32" r="2" fill="#E74C3C"/>
      <circle cx="32" cy="32" r="2" fill="#E74C3C"/>
      <circle cx="44" cy="32" r="2" fill="#E74C3C"/>
      <circle cx="20" cy="40" r="2" fill="#3498DB"/>
      <circle cx="32" cy="40" r="2" fill="#3498DB"/>
      <circle cx="44" cy="40" r="2" fill="#3498DB"/>
      <path d="M20 24v-16"/>
      <path d="M32 24v-16"/>
      <path d="M44 24v-16"/>
      <text x="18" y="58" font-size="3" fill="currentColor" stroke="none">64-ch MEA</text>
    </svg>`
  },
  {
    id: 'neuro-spike-train',
    name: 'Spike Train Recording',
    domain: 'biology',
    category: 'electrophysiology',
    tags: ['spike', 'action potential', 'single unit', 'firing rate', 'raster'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="52" x2="60" y2="52"/>
      <line x1="4" y1="52" x2="4" y2="8"/>
      <path d="M8 44v-24l2 24" stroke="#E74C3C" stroke-width="2"/>
      <path d="M16 44v-28l2 28" stroke="#E74C3C" stroke-width="2"/>
      <path d="M18 44v-20l2 20" stroke="#E74C3C" stroke-width="2"/>
      <path d="M28 44v-24l2 24" stroke="#E74C3C" stroke-width="2"/>
      <path d="M40 44v-28l2 28" stroke="#E74C3C" stroke-width="2"/>
      <path d="M44 44v-22l2 22" stroke="#E74C3C" stroke-width="2"/>
      <path d="M52 44v-26l2 26" stroke="#E74C3C" stroke-width="2"/>
      <text x="24" y="60" font-size="3" fill="currentColor" stroke="none">Time (ms)</text>
      <text x="1" y="28" font-size="3" fill="currentColor" stroke="none">mV</text>
    </svg>`
  },
  {
    id: 'neuro-spike-raster',
    name: 'Spike Raster Plot',
    domain: 'biology',
    category: 'electrophysiology',
    tags: ['raster', 'spike times', 'neural activity', 'trials', 'PSTH'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="60" y2="52"/>
      <line x1="8" y1="52" x2="8" y2="8"/>
      <line x1="12" y1="12" x2="12" y2="16" stroke="#27AE60"/>
      <line x1="20" y1="12" x2="20" y2="16" stroke="#27AE60"/>
      <line x1="24" y1="12" x2="24" y2="16" stroke="#27AE60"/>
      <line x1="36" y1="12" x2="36" y2="16" stroke="#27AE60"/>
      <line x1="14" y1="20" x2="14" y2="24" stroke="#3498DB"/>
      <line x1="22" y1="20" x2="22" y2="24" stroke="#3498DB"/>
      <line x1="38" y1="20" x2="38" y2="24" stroke="#3498DB"/>
      <line x1="44" y1="20" x2="44" y2="24" stroke="#3498DB"/>
      <line x1="16" y1="28" x2="16" y2="32" stroke="#E74C3C"/>
      <line x1="24" y1="28" x2="24" y2="32" stroke="#E74C3C"/>
      <line x1="28" y1="28" x2="28" y2="32" stroke="#E74C3C"/>
      <line x1="40" y1="28" x2="40" y2="32" stroke="#E74C3C"/>
      <line x1="48" y1="28" x2="48" y2="32" stroke="#E74C3C"/>
      <line x1="18" y1="36" x2="18" y2="40" stroke="#9B59B6"/>
      <line x1="26" y1="36" x2="26" y2="40" stroke="#9B59B6"/>
      <line x1="42" y1="36" x2="42" y2="40" stroke="#9B59B6"/>
      <line x1="32" y1="8" x2="32" y2="48" stroke="#F39C12" stroke-dasharray="2 2"/>
      <text x="28" y="58" font-size="3" fill="currentColor" stroke="none">Stim</text>
    </svg>`
  },
  {
    id: 'neuro-lfp',
    name: 'Local Field Potential',
    domain: 'biology',
    category: 'electrophysiology',
    tags: ['LFP', 'local field potential', 'oscillation', 'neural ensemble'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="32" x2="60" y2="32" stroke-dasharray="2 2"/>
      <path d="M4 32c4-12 8 12 12 0s8 8 12-4s8 16 12-8s8 12 12 4s8-8 8-4" stroke="#9B59B6" stroke-width="2"/>
      <rect x="4" y="44" width="56" height="12" fill="#3498DB" opacity="0.2"/>
      <path d="M4 52c2-4 4 4 6 0s4 4 6 0s4 4 6 0s4 4 6 0" stroke="#27AE60"/>
      <text x="36" y="52" font-size="3" fill="currentColor" stroke="none">Gamma</text>
      <text x="4" y="42" font-size="3" fill="currentColor" stroke="none">LFP</text>
      <text x="4" y="12" font-size="3" fill="currentColor" stroke="none">mV</text>
    </svg>`
  },
  {
    id: 'neuro-intracellular',
    name: 'Intracellular Recording',
    domain: 'biology',
    category: 'electrophysiology',
    tags: ['intracellular', 'sharp electrode', 'membrane potential', 'Vm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="40" r="14" fill="#9B59B6" opacity="0.3"/>
      <circle cx="32" cy="40" r="10" fill="#3498DB" opacity="0.4"/>
      <path d="M32 4v20" stroke-width="2"/>
      <path d="M28 4h8"/>
      <ellipse cx="32" cy="24" rx="1" ry="4" fill="#F39C12"/>
      <circle cx="32" cy="36" r="3" fill="#27AE60"/>
      <path d="M4 56h24l4-8l4 16l4-12l4 8l4-4h12" stroke="#E74C3C" stroke-width="1.5"/>
      <text x="16" y="64" font-size="3" fill="currentColor" stroke="none">Membrane Potential</text>
    </svg>`
  },
  {
    id: 'neuro-tetrode',
    name: 'Tetrode Recording',
    domain: 'biology',
    category: 'electrophysiology',
    tags: ['tetrode', 'spike sorting', 'unit isolation', 'multi-unit'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4v16" stroke-width="3"/>
      <circle cx="30" cy="22" r="1" fill="#E74C3C"/>
      <circle cx="34" cy="22" r="1" fill="#3498DB"/>
      <circle cx="30" cy="26" r="1" fill="#27AE60"/>
      <circle cx="34" cy="26" r="1" fill="#F39C12"/>
      <ellipse cx="32" cy="40" rx="16" ry="12" fill="#9B59B6" opacity="0.2"/>
      <circle cx="24" cy="36" r="3" fill="#E74C3C" opacity="0.5"/>
      <circle cx="40" cy="38" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="32" cy="44" r="3" fill="#27AE60" opacity="0.5"/>
      <text x="16" y="60" font-size="3" fill="currentColor" stroke="none">Spike Sorting</text>
    </svg>`
  },

  // ===========================================================================
  // OPTOGENETICS
  // ===========================================================================
  {
    id: 'neuro-channelrhodopsin',
    name: 'Channelrhodopsin',
    domain: 'biology',
    category: 'optogenetics',
    tags: ['ChR2', 'channelrhodopsin', 'opsin', 'light-gated', 'activation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" fill="#3498DB" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="8" ry="12" fill="#27AE60" opacity="0.5"/>
      <path d="M32 4l-8 12h16l-8-12" fill="#3498DB"/>
      <path d="M24 16v4" stroke="#3498DB" stroke-width="2"/>
      <path d="M32 16v4" stroke="#3498DB" stroke-width="2"/>
      <path d="M40 16v4" stroke="#3498DB" stroke-width="2"/>
      <circle cx="32" cy="32" r="3" fill="#F39C12"/>
      <path d="M32 44v8"/>
      <path d="M28 52h8" stroke-dasharray="2 2"/>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">470nm</text>
      <text x="20" y="60" font-size="3" fill="currentColor" stroke="none">ChR2</text>
    </svg>`
  },
  {
    id: 'neuro-halorhodopsin',
    name: 'Halorhodopsin',
    domain: 'biology',
    category: 'optogenetics',
    tags: ['NpHR', 'halorhodopsin', 'opsin', 'inhibition', 'silencing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" fill="#F39C12" opacity="0.2"/>
      <ellipse cx="32" cy="32" rx="8" ry="12" fill="#E74C3C" opacity="0.5"/>
      <path d="M32 4l-8 12h16l-8-12" fill="#F39C12"/>
      <path d="M24 16v4" stroke="#F39C12" stroke-width="2"/>
      <path d="M32 16v4" stroke="#F39C12" stroke-width="2"/>
      <path d="M40 16v4" stroke="#F39C12" stroke-width="2"/>
      <circle cx="32" cy="32" r="3" fill="#27AE60"/>
      <path d="M26 52h12"/>
      <path d="M32 44v8"/>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">590nm</text>
      <text x="20" y="60" font-size="3" fill="currentColor" stroke="none">NpHR</text>
    </svg>`
  },
  {
    id: 'neuro-fiber-optic',
    name: 'Fiber Optic Cannula',
    domain: 'biology',
    category: 'optogenetics',
    tags: ['fiber optic', 'cannula', 'light delivery', 'implant'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="4" width="8" height="8" fill="#9B59B6" opacity="0.4"/>
      <rect x="28" y="4" width="8" height="8"/>
      <path d="M30 12v24" stroke-width="2" stroke="#3498DB"/>
      <path d="M34 12v24" stroke-width="2" stroke="#3498DB"/>
      <ellipse cx="32" cy="40" rx="16" ry="12" fill="#E8E8E8" opacity="0.3"/>
      <path d="M32 36l-8 8h16l-8-8" fill="#27AE60" opacity="0.5"/>
      <path d="M24 44l8-8 8 8" stroke="#27AE60" stroke-width="2"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Light Delivery</text>
    </svg>`
  },
  {
    id: 'neuro-optogenetic-setup',
    name: 'Optogenetics Setup',
    domain: 'biology',
    category: 'optogenetics',
    tags: ['optogenetics', 'setup', 'laser', 'stimulation', 'experiment'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="20" height="12" rx="2" fill="#3498DB" opacity="0.3"/>
      <text x="8" y="18" font-size="4" fill="currentColor" stroke="none">Laser</text>
      <path d="M24 14h16" stroke="#27AE60" stroke-width="2"/>
      <rect x="40" y="4" width="16" height="20" rx="2" fill="#9B59B6" opacity="0.2"/>
      <circle cx="48" cy="14" r="4"/>
      <path d="M48 24v8" stroke="#27AE60" stroke-width="1"/>
      <ellipse cx="48" cy="44" rx="12" ry="10" fill="#E8E8E8" opacity="0.3"/>
      <circle cx="48" cy="44" r="4" fill="#27AE60" opacity="0.5"/>
      <rect x="4" y="36" width="24" height="16" rx="2" fill="#F39C12" opacity="0.2"/>
      <text x="6" y="46" font-size="3" fill="currentColor" stroke="none">Control</text>
      <path d="M28 44h8" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'neuro-viral-vector',
    name: 'Viral Vector Injection',
    domain: 'biology',
    category: 'optogenetics',
    tags: ['AAV', 'viral vector', 'injection', 'gene delivery', 'transduction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="28" y="4" width="8" height="20" fill="#9B59B6" opacity="0.3"/>
      <rect x="28" y="4" width="8" height="20"/>
      <path d="M32 24v8"/>
      <ellipse cx="32" cy="40" rx="16" ry="12" fill="#E8E8E8" opacity="0.3"/>
      <circle cx="28" cy="36" r="2" fill="#27AE60"/>
      <circle cx="36" cy="38" r="2" fill="#27AE60"/>
      <circle cx="32" cy="44" r="2" fill="#27AE60"/>
      <circle cx="24" cy="42" r="2" fill="#27AE60"/>
      <circle cx="40" cy="44" r="2" fill="#27AE60"/>
      <path d="M28 36l-4 4" stroke="#27AE60" stroke-dasharray="1 1"/>
      <path d="M36 38l4 4" stroke="#27AE60" stroke-dasharray="1 1"/>
      <text x="18" y="58" font-size="3" fill="currentColor" stroke="none">AAV-ChR2</text>
    </svg>`
  },
  {
    id: 'neuro-dreadd',
    name: 'DREADD Chemogenetics',
    domain: 'biology',
    category: 'optogenetics',
    tags: ['DREADD', 'chemogenetics', 'CNO', 'hM3Dq', 'hM4Di'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="14" fill="#9B59B6" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="6" ry="10" fill="#E74C3C" opacity="0.4"/>
      <circle cx="16" cy="16" r="4" fill="#F39C12"/>
      <text x="12" y="20" font-size="3" fill="currentColor" stroke="none">CNO</text>
      <path d="M20 20l8 8" stroke="#F39C12" stroke-dasharray="2 2"/>
      <circle cx="32" cy="32" r="3" fill="#27AE60"/>
      <path d="M32 46v8"/>
      <path d="M24 54h16" stroke-dasharray="2 2"/>
      <text x="16" y="62" font-size="3" fill="currentColor" stroke="none">DREADD</text>
    </svg>`
  },

  // ===========================================================================
  // CONNECTOMICS & NEURAL TRACING
  // ===========================================================================
  {
    id: 'neuro-connectome',
    name: 'Connectome Network',
    domain: 'biology',
    category: 'connectomics',
    tags: ['connectome', 'network', 'connectivity', 'graph', 'brain network'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="#E74C3C" opacity="0.5"/>
      <circle cx="12" cy="32" r="6" fill="#3498DB" opacity="0.5"/>
      <circle cx="52" cy="32" r="6" fill="#3498DB" opacity="0.5"/>
      <circle cx="20" cy="52" r="6" fill="#27AE60" opacity="0.5"/>
      <circle cx="44" cy="52" r="6" fill="#27AE60" opacity="0.5"/>
      <path d="M32 18l-14 8" stroke-width="2"/>
      <path d="M32 18l14 8" stroke-width="2"/>
      <path d="M18 32l-4 14" stroke-width="1"/>
      <path d="M46 32l4 14" stroke-width="1"/>
      <path d="M18 32h28" stroke-width="3" stroke="#9B59B6"/>
      <path d="M26 52h12" stroke-width="2"/>
      <path d="M12 38l8 8"/>
      <path d="M52 38l-8 8"/>
      <text x="18" y="62" font-size="3" fill="currentColor" stroke="none">Connectome</text>
    </svg>`
  },
  {
    id: 'neuro-neural-tracing',
    name: 'Neural Tracing',
    domain: 'biology',
    category: 'connectomics',
    tags: ['tracing', 'anterograde', 'retrograde', 'circuit mapping', 'tracer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="20" r="8" fill="#27AE60" opacity="0.4"/>
      <text x="8" y="24" font-size="4" fill="currentColor" stroke="none">A</text>
      <circle cx="52" cy="20" r="8" fill="#E74C3C" opacity="0.4"/>
      <text x="48" y="24" font-size="4" fill="currentColor" stroke="none">B</text>
      <circle cx="32" cy="48" r="8" fill="#3498DB" opacity="0.4"/>
      <text x="28" y="52" font-size="4" fill="currentColor" stroke="none">C</text>
      <path d="M20 20h24" stroke="#9B59B6" stroke-width="2"/>
      <path d="M44 20l-4-4 4 4-4 4" stroke="#9B59B6" stroke-width="2"/>
      <path d="M16 26l12 16" stroke="#F39C12" stroke-width="2"/>
      <path d="M28 42l-4 4-4-4" stroke="#F39C12" stroke-width="2"/>
      <path d="M48 26l-12 16" stroke="#87CEEB" stroke-width="2"/>
      <text x="4" y="58" font-size="3" fill="currentColor" stroke="none">Anterograde</text>
      <text x="36" y="58" font-size="3" fill="currentColor" stroke="none">Retrograde</text>
    </svg>`
  },
  {
    id: 'neuro-rabies-tracing',
    name: 'Rabies Virus Tracing',
    domain: 'biology',
    category: 'connectomics',
    tags: ['rabies', 'monosynaptic', 'circuit tracing', 'retrograde', 'TVA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="44" r="8" fill="#E74C3C" opacity="0.4"/>
      <text x="28" y="48" font-size="3" fill="currentColor" stroke="none">Start</text>
      <circle cx="12" cy="20" r="6" fill="#27AE60" opacity="0.4"/>
      <circle cx="32" cy="12" r="6" fill="#27AE60" opacity="0.4"/>
      <circle cx="52" cy="20" r="6" fill="#27AE60" opacity="0.4"/>
      <path d="M16 24l12 12" stroke="#9B59B6" stroke-width="2"/>
      <path d="M32 18v18" stroke="#9B59B6" stroke-width="2"/>
      <path d="M48 24l-12 12" stroke="#9B59B6" stroke-width="2"/>
      <path d="M12 20l-4-4 4-4" stroke="#9B59B6"/>
      <path d="M32 12l-4-4h8l-4 4" stroke="#9B59B6"/>
      <path d="M52 20l4-4-4-4" stroke="#9B59B6"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">Monosynaptic Input Mapping</text>
    </svg>`
  },
  {
    id: 'neuro-connectivity-matrix',
    name: 'Connectivity Matrix',
    domain: 'biology',
    category: 'connectomics',
    tags: ['connectivity matrix', 'adjacency', 'correlation', 'brain regions'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40"/>
      <line x1="12" y1="22" x2="52" y2="22"/>
      <line x1="12" y1="32" x2="52" y2="32"/>
      <line x1="12" y1="42" x2="52" y2="42"/>
      <line x1="22" y1="12" x2="22" y2="52"/>
      <line x1="32" y1="12" x2="32" y2="52"/>
      <line x1="42" y1="12" x2="42" y2="52"/>
      <rect x="12" y="12" width="10" height="10" fill="#E74C3C" opacity="0.8"/>
      <rect x="22" y="12" width="10" height="10" fill="#F39C12" opacity="0.5"/>
      <rect x="32" y="22" width="10" height="10" fill="#E74C3C" opacity="0.8"/>
      <rect x="12" y="32" width="10" height="10" fill="#F39C12" opacity="0.5"/>
      <rect x="42" y="32" width="10" height="10" fill="#27AE60" opacity="0.6"/>
      <rect x="32" y="42" width="10" height="10" fill="#27AE60" opacity="0.6"/>
      <rect x="42" y="42" width="10" height="10" fill="#E74C3C" opacity="0.8"/>
      <text x="24" y="60" font-size="3" fill="currentColor" stroke="none">Regions</text>
    </svg>`
  },

  // ===========================================================================
  // BEHAVIORAL PARADIGMS
  // ===========================================================================
  {
    id: 'neuro-morris-water-maze',
    name: 'Morris Water Maze',
    domain: 'biology',
    category: 'behavioral',
    tags: ['Morris water maze', 'spatial memory', 'hippocampus', 'learning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#3498DB" opacity="0.3"/>
      <circle cx="32" cy="32" r="24"/>
      <circle cx="44" cy="20" r="4" fill="#27AE60" opacity="0.5"/>
      <text x="42" y="14" font-size="3" fill="currentColor" stroke="none">Platform</text>
      <path d="M8 40c4 0 8-4 12 0s8 4 12 0s8-4 12 0" stroke="#87CEEB"/>
      <ellipse cx="20" cy="44" rx="3" ry="2" fill="#9B59B6"/>
      <path d="M20 44l12-12" stroke-dasharray="2 2"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Swim Path</text>
    </svg>`
  },
  {
    id: 'neuro-t-maze',
    name: 'T-Maze',
    domain: 'biology',
    category: 'behavioral',
    tags: ['T-maze', 'working memory', 'alternation', 'choice'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="12" fill="#F39C12" opacity="0.2"/>
      <rect x="8" y="24" width="48" height="12"/>
      <rect x="26" y="36" width="12" height="20" fill="#F39C12" opacity="0.2"/>
      <rect x="26" y="36" width="12" height="20"/>
      <circle cx="16" cy="30" r="3" fill="#27AE60"/>
      <text x="12" y="22" font-size="3" fill="currentColor" stroke="none">Reward</text>
      <circle cx="48" cy="30" r="3" fill="#E74C3C"/>
      <text x="44" y="22" font-size="3" fill="currentColor" stroke="none">Reward</text>
      <ellipse cx="32" cy="52" rx="3" ry="2" fill="#9B59B6"/>
      <text x="24" y="62" font-size="3" fill="currentColor" stroke="none">Start</text>
    </svg>`
  },
  {
    id: 'neuro-fear-conditioning',
    name: 'Fear Conditioning',
    domain: 'biology',
    category: 'behavioral',
    tags: ['fear conditioning', 'amygdala', 'freezing', 'CS', 'US'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="32" rx="2" fill="#9B59B6" opacity="0.2"/>
      <rect x="8" y="20" width="48" height="32" rx="2"/>
      <line x1="8" y1="52" x2="56" y2="52" stroke-width="3" stroke="#F39C12"/>
      <path d="M32 8l-4 8h8l-4-8" fill="#E74C3C"/>
      <path d="M28 16v4"/>
      <path d="M36 16v4"/>
      <circle cx="24" cy="40" r="4" fill="#3498DB" opacity="0.5"/>
      <text x="20" y="44" font-size="3" fill="currentColor" stroke="none">CS</text>
      <path d="M40 36l8 8"/>
      <path d="M48 36l-8 8"/>
      <text x="40" y="50" font-size="3" fill="currentColor" stroke="none">US</text>
      <text x="20" y="62" font-size="3" fill="currentColor" stroke="none">Shock Grid</text>
    </svg>`
  },
  {
    id: 'neuro-operant-chamber',
    name: 'Operant Chamber',
    domain: 'biology',
    category: 'behavioral',
    tags: ['operant', 'Skinner box', 'lever press', 'reward', 'reinforcement'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="12" width="48" height="40" rx="2" fill="#E8E8E8" opacity="0.3"/>
      <rect x="8" y="12" width="48" height="40" rx="2"/>
      <rect x="12" y="28" width="8" height="16" fill="#F39C12" opacity="0.4"/>
      <path d="M16 28v-4" stroke-width="2"/>
      <text x="12" y="50" font-size="3" fill="currentColor" stroke="none">Lever</text>
      <circle cx="44" cy="24" r="4" fill="#27AE60"/>
      <text x="40" y="34" font-size="3" fill="currentColor" stroke="none">Food</text>
      <circle cx="44" cy="44" r="4" fill="#3498DB"/>
      <text x="38" y="54" font-size="3" fill="currentColor" stroke="none">Light</text>
      <ellipse cx="28" cy="40" rx="4" ry="3" fill="#9B59B6" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'neuro-novel-object',
    name: 'Novel Object Recognition',
    domain: 'biology',
    category: 'behavioral',
    tags: ['novel object', 'recognition memory', 'perirhinal', 'familiarity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2" fill="#E8E8E8" opacity="0.3"/>
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <circle cx="20" cy="36" r="6" fill="#27AE60" opacity="0.5"/>
      <text x="16" y="40" font-size="3" fill="currentColor" stroke="none">Fam</text>
      <rect x="38" y="30" width="12" height="12" fill="#E74C3C" opacity="0.5"/>
      <text x="40" y="40" font-size="3" fill="currentColor" stroke="none">Nov</text>
      <ellipse cx="32" cy="40" rx="3" ry="2" fill="#9B59B6"/>
      <path d="M32 38l12-4" stroke="#3498DB" stroke-dasharray="2 2"/>
      <text x="14" y="58" font-size="3" fill="currentColor" stroke="none">Recognition Memory</text>
    </svg>`
  },
  {
    id: 'neuro-radial-arm-maze',
    name: 'Radial Arm Maze',
    domain: 'biology',
    category: 'behavioral',
    tags: ['radial arm', 'spatial memory', 'working memory', 'reference memory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="8" fill="#F39C12" opacity="0.3"/>
      <path d="M32 8v16"/>
      <path d="M32 40v16"/>
      <path d="M8 32h16"/>
      <path d="M40 32h16"/>
      <path d="M15 15l12 12"/>
      <path d="M37 37l12 12"/>
      <path d="M49 15l-12 12"/>
      <path d="M27 37l-12 12"/>
      <circle cx="32" cy="8" r="2" fill="#27AE60"/>
      <circle cx="32" cy="56" r="2" fill="#E74C3C"/>
      <circle cx="8" cy="32" r="2" fill="#27AE60"/>
      <circle cx="56" cy="32" r="2" fill="#E74C3C"/>
      <ellipse cx="32" cy="32" rx="3" ry="2" fill="#9B59B6"/>
    </svg>`
  },

  // ===========================================================================
  // COMPUTATIONAL NEUROSCIENCE
  // ===========================================================================
  {
    id: 'neuro-computational-model',
    name: 'Computational Neural Model',
    domain: 'biology',
    category: 'computational',
    tags: ['computational', 'model', 'Hodgkin-Huxley', 'integrate-fire', 'simulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12" fill="#9B59B6" opacity="0.3"/>
      <circle cx="32" cy="32" r="8" fill="#3498DB" opacity="0.4"/>
      <path d="M8 32h12"/>
      <path d="M44 32h12"/>
      <path d="M32 8v12"/>
      <path d="M32 44v12"/>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">I</text>
      <text x="48" y="24" font-size="3" fill="currentColor" stroke="none">V</text>
      <path d="M28 28l8 0 0 8 -8 0z" fill="#E74C3C" opacity="0.5"/>
      <text x="28" y="34" font-size="3" fill="currentColor" stroke="none">gNa</text>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">H-H Model</text>
    </svg>`
  },
  {
    id: 'neuro-population-vector',
    name: 'Population Vector',
    domain: 'biology',
    category: 'computational',
    tags: ['population coding', 'vector', 'motor cortex', 'direction tuning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 32l16 0" stroke="#95A5A6"/>
      <path d="M32 32l0-16" stroke="#95A5A6"/>
      <path d="M32 32l11 11" stroke="#95A5A6"/>
      <path d="M32 32l-11 11" stroke="#95A5A6"/>
      <path d="M32 32l-11-11" stroke="#95A5A6"/>
      <path d="M32 32l11-11" stroke="#95A5A6"/>
      <path d="M32 32l8-14" stroke="#E74C3C" stroke-width="3"/>
      <path d="M40 18l-2 4 -4-2" fill="#E74C3C"/>
      <text x="42" y="16" font-size="3" fill="currentColor" stroke="none">PV</text>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Direction Tuning</text>
    </svg>`
  },
  {
    id: 'neuro-snn',
    name: 'Spiking Neural Network',
    domain: 'biology',
    category: 'computational',
    tags: ['SNN', 'spiking', 'neural network', 'neuromorphic', 'temporal coding'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="16" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="12" cy="32" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="12" cy="48" r="4" fill="#3498DB" opacity="0.5"/>
      <circle cx="32" cy="24" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="32" cy="40" r="4" fill="#9B59B6" opacity="0.5"/>
      <circle cx="52" cy="32" r="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M16 16l12 6" stroke-width="1"/>
      <path d="M16 32l12-6" stroke-width="2" stroke="#27AE60"/>
      <path d="M16 32l12 6" stroke-width="1"/>
      <path d="M16 48l12-6" stroke-width="2" stroke="#27AE60"/>
      <path d="M36 24l12 6" stroke-width="2" stroke="#E74C3C"/>
      <path d="M36 40l12-6" stroke-width="1"/>
      <path d="M4 12v-4l2 4" stroke="#27AE60"/>
      <path d="M4 28v-4l2 4" stroke="#27AE60"/>
      <text x="20" y="58" font-size="3" fill="currentColor" stroke="none">SNN</text>
    </svg>`
  },
  {
    id: 'neuro-tuning-curve',
    name: 'Tuning Curve',
    domain: 'biology',
    category: 'computational',
    tags: ['tuning curve', 'receptive field', 'selectivity', 'orientation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="48" x2="56" y2="48"/>
      <line x1="8" y1="48" x2="8" y2="8"/>
      <path d="M8 44c8 0 12-32 24-32s16 32 24 32" stroke="#E74C3C" stroke-width="2"/>
      <line x1="32" y1="12" x2="32" y2="48" stroke-dasharray="2 2"/>
      <text x="28" y="56" font-size="3" fill="currentColor" stroke="none">Pref</text>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">FR</text>
      <text x="24" y="62" font-size="3" fill="currentColor" stroke="none">Stimulus</text>
    </svg>`
  },
  {
    id: 'neuro-attractor-network',
    name: 'Attractor Network',
    domain: 'biology',
    category: 'computational',
    tags: ['attractor', 'network', 'memory', 'Hopfield', 'stable states'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="20" rx="8" ry="6" fill="#E74C3C" opacity="0.3"/>
      <ellipse cx="44" cy="20" rx="8" ry="6" fill="#3498DB" opacity="0.3"/>
      <ellipse cx="32" cy="44" rx="8" ry="6" fill="#27AE60" opacity="0.3"/>
      <path d="M8 36c4-8 8-4 12-8" stroke="#9B59B6" stroke-width="2"/>
      <path d="M20 28c0 4 4 8 8 12" stroke="#9B59B6"/>
      <path d="M44 28c0 4-4 8-8 12" stroke="#9B59B6"/>
      <circle cx="20" cy="20" r="2" fill="#E74C3C"/>
      <circle cx="44" cy="20" r="2" fill="#3498DB"/>
      <circle cx="32" cy="44" r="2" fill="#27AE60"/>
      <text x="16" y="58" font-size="3" fill="currentColor" stroke="none">Attractors</text>
    </svg>`
  },

  // ===========================================================================
  // MICROSCOPY & IMAGING TECHNIQUES
  // ===========================================================================
  {
    id: 'neuro-two-photon',
    name: 'Two-Photon Microscopy',
    domain: 'biology',
    category: 'microscopy',
    tags: ['two-photon', '2P', 'calcium imaging', 'in vivo', 'deep imaging'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="12" rx="2" fill="#9B59B6" opacity="0.3"/>
      <text x="26" y="12" font-size="3" fill="currentColor" stroke="none">Laser</text>
      <path d="M32 16v8" stroke="#E74C3C" stroke-width="2"/>
      <path d="M28 20l4 4 4-4" stroke="#E74C3C"/>
      <ellipse cx="32" cy="36" rx="16" ry="12" fill="#27AE60" opacity="0.2"/>
      <circle cx="24" cy="32" r="3" fill="#27AE60" opacity="0.8"/>
      <circle cx="40" cy="34" r="2" fill="#27AE60" opacity="0.6"/>
      <circle cx="32" cy="40" r="3" fill="#27AE60" opacity="0.7"/>
      <circle cx="36" cy="32" r="2" fill="#27AE60" opacity="0.5"/>
      <text x="4" y="36" font-size="3" fill="currentColor" stroke="none">920nm</text>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">Ca2+ Activity</text>
    </svg>`
  },
  {
    id: 'neuro-calcium-imaging',
    name: 'Calcium Imaging Trace',
    domain: 'biology',
    category: 'microscopy',
    tags: ['calcium', 'GCaMP', 'imaging', 'fluorescence', 'activity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" y1="48" x2="60" y2="48"/>
      <line x1="4" y1="48" x2="4" y2="8"/>
      <path d="M8 44c0 0 2-20 4-20s2 20 4 20s2-28 4-28s2 28 4 28s2-16 4-16s2 16 4 16s2-24 4-24s2 24 4 24s2-12 4-12s2 12 4 12" stroke="#27AE60" stroke-width="2"/>
      <text x="4" y="6" font-size="3" fill="currentColor" stroke="none">dF/F</text>
      <text x="24" y="56" font-size="3" fill="currentColor" stroke="none">Time (s)</text>
      <rect x="44" y="8" width="16" height="12" rx="2" fill="#27AE60" opacity="0.3"/>
      <text x="46" y="16" font-size="3" fill="currentColor" stroke="none">GCaMP</text>
    </svg>`
  },
  {
    id: 'neuro-confocal',
    name: 'Confocal Microscopy',
    domain: 'biology',
    category: 'microscopy',
    tags: ['confocal', 'fluorescence', 'z-stack', 'optical sectioning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="8" rx="2" fill="#3498DB" opacity="0.3"/>
      <text x="26" y="10" font-size="3" fill="currentColor" stroke="none">Laser</text>
      <path d="M32 12v8"/>
      <ellipse cx="32" cy="24" rx="4" ry="2" fill="#F39C12"/>
      <path d="M32 26v8"/>
      <rect x="16" y="36" width="32" height="4" fill="#E8E8E8" opacity="0.5"/>
      <rect x="16" y="42" width="32" height="4" fill="#E8E8E8" opacity="0.5"/>
      <rect x="16" y="48" width="32" height="4" fill="#E8E8E8" opacity="0.5"/>
      <circle cx="32" cy="38" r="2" fill="#27AE60"/>
      <circle cx="24" cy="44" r="2" fill="#E74C3C"/>
      <circle cx="40" cy="50" r="2" fill="#9B59B6"/>
      <text x="4" y="44" font-size="3" fill="currentColor" stroke="none">Z</text>
      <text x="18" y="60" font-size="3" fill="currentColor" stroke="none">Optical Section</text>
    </svg>`
  },
  {
    id: 'neuro-light-sheet',
    name: 'Light Sheet Microscopy',
    domain: 'biology',
    category: 'microscopy',
    tags: ['light sheet', 'SPIM', 'whole brain', 'cleared tissue'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="28" width="12" height="8" rx="2" fill="#3498DB" opacity="0.3"/>
      <path d="M16 32h16" stroke="#3498DB" stroke-width="1"/>
      <rect x="32" y="16" width="2" height="32" fill="#3498DB" opacity="0.2"/>
      <ellipse cx="44" cy="32" rx="12" ry="16" fill="#E8E8E8" opacity="0.3"/>
      <ellipse cx="44" cy="32" rx="8" ry="12" fill="#9B59B6" opacity="0.2"/>
      <path d="M44 16v-8"/>
      <path d="M40 8h8"/>
      <text x="38" y="6" font-size="3" fill="currentColor" stroke="none">Det</text>
      <text x="16" y="56" font-size="3" fill="currentColor" stroke="none">Light Sheet</text>
    </svg>`
  },
  {
    id: 'neuro-miniscope',
    name: 'Miniscope',
    domain: 'biology',
    category: 'microscopy',
    tags: ['miniscope', 'freely moving', 'one-photon', 'GRIN lens'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="4" width="24" height="16" rx="2" fill="#9B59B6" opacity="0.3"/>
      <rect x="20" y="4" width="24" height="16" rx="2"/>
      <circle cx="32" cy="12" r="4" fill="#3498DB" opacity="0.5"/>
      <rect x="28" y="20" width="8" height="8" fill="#F39C12" opacity="0.4"/>
      <path d="M32 28v12" stroke-width="2"/>
      <ellipse cx="32" cy="48" rx="12" ry="8" fill="#E8E8E8" opacity="0.3"/>
      <circle cx="28" cy="46" r="2" fill="#27AE60"/>
      <circle cx="36" cy="48" r="2" fill="#27AE60"/>
      <circle cx="32" cy="52" r="2" fill="#27AE60"/>
      <text x="4" y="12" font-size="3" fill="currentColor" stroke="none">CMOS</text>
      <text x="4" y="28" font-size="3" fill="currentColor" stroke="none">GRIN</text>
    </svg>`
  },

  // ===========================================================================
  // MEMORY & LEARNING
  // ===========================================================================
  {
    id: 'neuro-engram',
    name: 'Memory Engram',
    domain: 'biology',
    category: 'memory',
    tags: ['engram', 'memory trace', 'memory cells', 'encoding', 'retrieval'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="22" ry="18" fill="#E8E8E8" opacity="0.3"/>
      <circle cx="20" cy="24" r="4" fill="#E74C3C" opacity="0.7"/>
      <circle cx="32" cy="20" r="4" fill="#E74C3C" opacity="0.7"/>
      <circle cx="44" cy="28" r="4" fill="#E74C3C" opacity="0.7"/>
      <circle cx="28" cy="36" r="4" fill="#E74C3C" opacity="0.7"/>
      <circle cx="40" cy="40" r="4" fill="#E74C3C" opacity="0.7"/>
      <path d="M20 24l12-4" stroke="#9B59B6" stroke-width="2"/>
      <path d="M32 20l12 8" stroke="#9B59B6" stroke-width="2"/>
      <path d="M20 24l8 12" stroke="#9B59B6" stroke-width="2"/>
      <path d="M28 36l12 4" stroke="#9B59B6" stroke-width="2"/>
      <path d="M44 28l-4 12" stroke="#9B59B6" stroke-width="2"/>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">Memory Engram</text>
    </svg>`
  },
  {
    id: 'neuro-consolidation',
    name: 'Memory Consolidation',
    domain: 'biology',
    category: 'memory',
    tags: ['consolidation', 'hippocampus', 'cortex', 'replay', 'sleep'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="20" rx="10" ry="8" fill="#27AE60" opacity="0.3"/>
      <text x="8" y="24" font-size="4" fill="currentColor" stroke="none">HPC</text>
      <ellipse cx="48" cy="20" rx="10" ry="8" fill="#3498DB" opacity="0.3"/>
      <text x="40" y="24" font-size="4" fill="currentColor" stroke="none">CTX</text>
      <path d="M26 20h12" stroke="#9B59B6" stroke-width="2"/>
      <path d="M38 16l4 4-4 4" stroke="#9B59B6"/>
      <path d="M16 28v8"/>
      <path d="M48 28v8"/>
      <ellipse cx="32" cy="44" rx="20" ry="8" fill="#F39C12" opacity="0.2"/>
      <text x="22" y="48" font-size="4" fill="currentColor" stroke="none">Sleep</text>
      <path d="M20 36l-4 8" stroke-dasharray="2 2"/>
      <path d="M44 36l4 8" stroke-dasharray="2 2"/>
      <text x="10" y="60" font-size="3" fill="currentColor" stroke="none">Systems Consolidation</text>
    </svg>`
  },
  {
    id: 'neuro-reconsolidation',
    name: 'Memory Reconsolidation',
    domain: 'biology',
    category: 'memory',
    tags: ['reconsolidation', 'reactivation', 'updating', 'memory modification'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="16" height="24" rx="2" fill="#27AE60" opacity="0.3"/>
      <text x="6" y="36" font-size="3" fill="currentColor" stroke="none">Stable</text>
      <path d="M20 32h8"/>
      <path d="M28 28l4 4-4 4"/>
      <rect x="32" y="20" width="16" height="24" rx="2" fill="#E74C3C" opacity="0.3"/>
      <text x="34" y="34" font-size="3" fill="currentColor" stroke="none">Labile</text>
      <path d="M40 20v-8l8 4-8 4"/>
      <text x="50" y="16" font-size="3" fill="currentColor" stroke="none">Reactivate</text>
      <path d="M48 32h8"/>
      <path d="M52 32c0-8 4-12 4-12"/>
      <rect x="48" y="28" width="12" height="8" rx="2" fill="#3498DB" opacity="0.3"/>
      <text x="50" y="34" font-size="3" fill="currentColor" stroke="none">New</text>
      <text x="8" y="56" font-size="3" fill="currentColor" stroke="none">Reconsolidation Window</text>
    </svg>`
  },
  {
    id: 'neuro-stdp',
    name: 'Spike-Timing Dependent Plasticity',
    domain: 'biology',
    category: 'memory',
    tags: ['STDP', 'spike timing', 'Hebbian', 'plasticity', 'learning rule'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32"/>
      <line x1="32" y1="8" x2="32" y2="56"/>
      <path d="M32 32c8-16 16-16 20-16" stroke="#27AE60" stroke-width="2"/>
      <path d="M32 32c-8 16-16 16-20 16" stroke="#E74C3C" stroke-width="2"/>
      <text x="44" y="14" font-size="3" fill="currentColor" stroke="none">LTP</text>
      <text x="4" y="52" font-size="3" fill="currentColor" stroke="none">LTD</text>
      <text x="36" y="58" font-size="3" fill="currentColor" stroke="none">+dt</text>
      <text x="8" y="30" font-size="3" fill="currentColor" stroke="none">-dt</text>
      <text x="4" y="20" font-size="3" fill="currentColor" stroke="none">dW</text>
    </svg>`
  },

  // ===========================================================================
  // COGNITIVE FUNCTIONS
  // ===========================================================================
  {
    id: 'neuro-attention',
    name: 'Attention Networks',
    domain: 'biology',
    category: 'cognitive',
    tags: ['attention', 'dorsal', 'ventral', 'executive', 'salience'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="24" rx="22" ry="16" fill="#E8E8E8" opacity="0.3"/>
      <ellipse cx="20" cy="20" rx="6" ry="4" fill="#E74C3C" opacity="0.5"/>
      <ellipse cx="44" cy="20" rx="6" ry="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M20 20l24 0" stroke="#E74C3C" stroke-width="2" stroke-dasharray="2 2"/>
      <ellipse cx="16" cy="32" rx="6" ry="4" fill="#3498DB" opacity="0.5"/>
      <ellipse cx="48" cy="32" rx="6" ry="4" fill="#3498DB" opacity="0.5"/>
      <path d="M16 32l32 0" stroke="#3498DB" stroke-width="2" stroke-dasharray="2 2"/>
      <text x="16" y="16" font-size="3" fill="currentColor" stroke="none">FEF</text>
      <text x="40" y="16" font-size="3" fill="currentColor" stroke="none">IPS</text>
      <text x="10" y="38" font-size="3" fill="currentColor" stroke="none">TPJ</text>
      <text x="44" y="38" font-size="3" fill="currentColor" stroke="none">VFC</text>
      <text x="10" y="52" font-size="3" fill="#E74C3C" stroke="none">Dorsal</text>
      <text x="38" y="52" font-size="3" fill="#3498DB" stroke="none">Ventral</text>
    </svg>`
  },
  {
    id: 'neuro-working-memory',
    name: 'Working Memory',
    domain: 'biology',
    category: 'cognitive',
    tags: ['working memory', 'prefrontal', 'delay activity', 'maintenance'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="20" rx="16" ry="10" fill="#9B59B6" opacity="0.3"/>
      <text x="24" y="24" font-size="4" fill="currentColor" stroke="none">PFC</text>
      <line x1="8" y1="44" x2="56" y2="44"/>
      <path d="M8 40v-8h8v8"/>
      <text x="10" y="52" font-size="3" fill="currentColor" stroke="none">Cue</text>
      <path d="M20 40v-4c0-4 8-4 8-4s8 0 8 4v4" fill="#F39C12" opacity="0.3"/>
      <text x="26" y="52" font-size="3" fill="currentColor" stroke="none">Delay</text>
      <path d="M48 40v-12" stroke="#27AE60" stroke-width="2"/>
      <text x="44" y="52" font-size="3" fill="currentColor" stroke="none">Resp</text>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Persistent Activity</text>
    </svg>`
  },
  {
    id: 'neuro-decision-making',
    name: 'Decision Making',
    domain: 'biology',
    category: 'cognitive',
    tags: ['decision', 'accumulator', 'threshold', 'choice', 'drift diffusion'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="32" x2="56" y2="32" stroke-dasharray="2 2"/>
      <line x1="8" y1="12" x2="56" y2="12"/>
      <line x1="8" y1="52" x2="56" y2="52"/>
      <path d="M8 32c4-4 8 4 12-2s8-6 12-8s8-4 12-8" stroke="#E74C3C" stroke-width="2"/>
      <text x="44" y="10" font-size="3" fill="currentColor" stroke="none">Choice A</text>
      <text x="44" y="58" font-size="3" fill="currentColor" stroke="none">Choice B</text>
      <line x1="8" y1="8" x2="8" y2="56"/>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">E</text>
      <text x="24" y="60" font-size="3" fill="currentColor" stroke="none">Time</text>
    </svg>`
  },
  {
    id: 'neuro-executive-function',
    name: 'Executive Function',
    domain: 'biology',
    category: 'cognitive',
    tags: ['executive', 'inhibition', 'switching', 'updating', 'prefrontal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8" fill="#9B59B6" opacity="0.3"/>
      <text x="24" y="20" font-size="4" fill="currentColor" stroke="none">PFC</text>
      <circle cx="16" cy="44" r="8" fill="#E74C3C" opacity="0.3"/>
      <text x="10" y="48" font-size="3" fill="currentColor" stroke="none">Inhib</text>
      <circle cx="32" cy="44" r="8" fill="#3498DB" opacity="0.3"/>
      <text x="26" y="48" font-size="3" fill="currentColor" stroke="none">Shift</text>
      <circle cx="48" cy="44" r="8" fill="#27AE60" opacity="0.3"/>
      <text x="42" y="48" font-size="3" fill="currentColor" stroke="none">Upd</text>
      <path d="M24 22l-6 14"/>
      <path d="M32 24v12"/>
      <path d="M40 22l6 14"/>
      <text x="8" y="60" font-size="3" fill="currentColor" stroke="none">Executive Functions</text>
    </svg>`
  },

  // ===========================================================================
  // RESEARCH TOOLS & EQUIPMENT
  // ===========================================================================
  {
    id: 'neuro-stereotaxic',
    name: 'Stereotaxic Frame',
    domain: 'biology',
    category: 'equipment',
    tags: ['stereotaxic', 'surgery', 'coordinates', 'implant', 'injection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="44" width="48" height="8" fill="#95A5A6" opacity="0.3"/>
      <rect x="8" y="44" width="48" height="8"/>
      <path d="M16 44v-16"/>
      <path d="M48 44v-16"/>
      <path d="M16 28h32"/>
      <path d="M32 4v20"/>
      <ellipse cx="32" cy="38" rx="10" ry="6" fill="#E8E8E8" opacity="0.5"/>
      <path d="M12 28l4 4"/>
      <path d="M52 28l-4 4"/>
      <path d="M28 4h8"/>
      <text x="8" y="58" font-size="3" fill="currentColor" stroke="none">AP</text>
      <text x="28" y="58" font-size="3" fill="currentColor" stroke="none">ML</text>
      <text x="48" y="58" font-size="3" fill="currentColor" stroke="none">DV</text>
    </svg>`
  },
  {
    id: 'neuro-brain-atlas',
    name: 'Brain Atlas',
    domain: 'biology',
    category: 'equipment',
    tags: ['atlas', 'Paxinos', 'coordinates', 'brain regions', 'stereotaxic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="#E8E8E8" opacity="0.2"/>
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <ellipse cx="32" cy="32" rx="18" ry="14" fill="#9B59B6" opacity="0.2"/>
      <path d="M32 18v28" stroke-dasharray="2 2"/>
      <path d="M14 32h36" stroke-dasharray="2 2"/>
      <ellipse cx="24" cy="28" rx="4" ry="3" fill="#27AE60" opacity="0.5"/>
      <ellipse cx="40" cy="28" rx="4" ry="3" fill="#27AE60" opacity="0.5"/>
      <ellipse cx="32" cy="38" rx="6" ry="4" fill="#3498DB" opacity="0.5"/>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">-3.0</text>
      <text x="50" y="32" font-size="3" fill="currentColor" stroke="none">3.0</text>
      <text x="28" y="6" font-size="3" fill="currentColor" stroke="none">Bregma</text>
    </svg>`
  },
  {
    id: 'neuro-tms',
    name: 'TMS Coil',
    domain: 'biology',
    category: 'equipment',
    tags: ['TMS', 'transcranial magnetic', 'stimulation', 'non-invasive'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="44" rx="20" ry="12" fill="#E8E8E8" opacity="0.3"/>
      <path d="M12 32c0-16 8-24 20-24s20 8 20 24"/>
      <ellipse cx="20" cy="20" rx="8" ry="12" fill="#3498DB" opacity="0.3"/>
      <ellipse cx="44" cy="20" rx="8" ry="12" fill="#3498DB" opacity="0.3"/>
      <path d="M20 8v-4"/>
      <path d="M44 8v-4"/>
      <path d="M28 20h8"/>
      <circle cx="32" cy="36" r="4" fill="#E74C3C" opacity="0.5"/>
      <text x="4" y="24" font-size="3" fill="currentColor" stroke="none">Coil</text>
      <text x="28" y="58" font-size="3" fill="currentColor" stroke="none">TMS</text>
    </svg>`
  },
  {
    id: 'neuro-tdcs',
    name: 'tDCS Electrodes',
    domain: 'biology',
    category: 'equipment',
    tags: ['tDCS', 'transcranial', 'direct current', 'neuromodulation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="20" ry="16" fill="#E8E8E8" opacity="0.3"/>
      <path d="M12 32c0-16 8-24 20-24s20 8 20 24"/>
      <rect x="16" y="24" width="10" height="10" rx="2" fill="#E74C3C" opacity="0.5"/>
      <text x="18" y="32" font-size="4" fill="currentColor" stroke="none">+</text>
      <rect x="38" y="24" width="10" height="10" rx="2" fill="#3498DB" opacity="0.5"/>
      <text x="41" y="32" font-size="4" fill="currentColor" stroke="none">-</text>
      <path d="M21 24v-8"/>
      <path d="M43 24v-8"/>
      <path d="M21 16h22"/>
      <rect x="28" y="4" width="8" height="8" rx="2" fill="#F39C12" opacity="0.3"/>
      <text x="26" y="56" font-size="3" fill="currentColor" stroke="none">tDCS</text>
    </svg>`
  },
  {
    id: 'neuro-cranial-window',
    name: 'Cranial Window',
    domain: 'biology',
    category: 'equipment',
    tags: ['cranial window', 'chronic imaging', 'glass', 'optical access'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="36" rx="20" ry="14" fill="#E8E8E8" opacity="0.3"/>
      <path d="M12 32c0-16 8-24 20-24s20 8 20 24"/>
      <circle cx="32" cy="24" r="10" fill="#87CEEB" opacity="0.4"/>
      <circle cx="32" cy="24" r="10"/>
      <circle cx="32" cy="24" r="6" stroke-dasharray="2 2"/>
      <ellipse cx="32" cy="32" rx="8" ry="4" fill="#9B59B6" opacity="0.3"/>
      <path d="M32 4v12"/>
      <path d="M28 4h8"/>
      <text x="12" y="54" font-size="3" fill="currentColor" stroke="none">Chronic Imaging Window</text>
    </svg>`
  },
  {
    id: 'neuro-implanted-probe',
    name: 'Implanted Neural Probe',
    domain: 'biology',
    category: 'equipment',
    tags: ['probe', 'Neuropixels', 'silicon probe', 'chronic recording'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="40" rx="18" ry="12" fill="#E8E8E8" opacity="0.3"/>
      <path d="M14 36c0-16 8-24 18-24s18 8 18 24"/>
      <rect x="28" y="4" width="8" height="8" fill="#F39C12" opacity="0.4"/>
      <rect x="30" y="12" width="4" height="24" fill="#95A5A6"/>
      <circle cx="32" cy="16" r="1" fill="#27AE60"/>
      <circle cx="32" cy="20" r="1" fill="#27AE60"/>
      <circle cx="32" cy="24" r="1" fill="#27AE60"/>
      <circle cx="32" cy="28" r="1" fill="#27AE60"/>
      <circle cx="32" cy="32" r="1" fill="#27AE60"/>
      <path d="M32 4v-2"/>
      <path d="M28 2h8"/>
      <text x="40" y="24" font-size="3" fill="currentColor" stroke="none">Electrodes</text>
      <text x="16" y="56" font-size="3" fill="currentColor" stroke="none">Neuropixels</text>
    </svg>`
  },

  // ===========================================================================
  // NEUROGENETICS
  // ===========================================================================
  {
    id: 'neuro-cre-lox',
    name: 'Cre-lox System',
    domain: 'biology',
    category: 'genetics',
    tags: ['Cre', 'loxP', 'recombination', 'conditional', 'genetic'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="8" fill="#3498DB" opacity="0.3"/>
      <rect x="8" y="16" width="48" height="8"/>
      <path d="M16 16v-4l4 2-4 2"/>
      <path d="M48 16v-4l-4 2 4 2"/>
      <rect x="20" y="18" width="24" height="4" fill="#E74C3C" opacity="0.5"/>
      <text x="28" y="22" font-size="3" fill="currentColor" stroke="none">STOP</text>
      <circle cx="32" cy="36" r="8" fill="#27AE60" opacity="0.3"/>
      <text x="28" y="40" font-size="4" fill="currentColor" stroke="none">Cre</text>
      <path d="M32 28v-4"/>
      <rect x="8" y="48" width="48" height="8" fill="#3498DB" opacity="0.3"/>
      <rect x="8" y="48" width="48" height="8"/>
      <rect x="20" y="50" width="24" height="4" fill="#27AE60" opacity="0.5"/>
      <text x="26" y="54" font-size="3" fill="currentColor" stroke="none">Gene ON</text>
    </svg>`
  },
  {
    id: 'neuro-gcamp-expression',
    name: 'GCaMP Expression',
    domain: 'biology',
    category: 'genetics',
    tags: ['GCaMP', 'calcium indicator', 'GECI', 'fluorescence', 'reporter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="20" ry="16" fill="#E8E8E8" opacity="0.3"/>
      <circle cx="20" cy="28" r="6" fill="#27AE60" opacity="0.3"/>
      <circle cx="20" cy="28" r="6"/>
      <circle cx="20" cy="28" r="3" fill="#27AE60" opacity="0.8"/>
      <circle cx="36" cy="24" r="6" fill="#27AE60" opacity="0.3"/>
      <circle cx="36" cy="24" r="6"/>
      <circle cx="36" cy="24" r="5" fill="#27AE60" opacity="0.9"/>
      <circle cx="28" cy="40" r="6" fill="#27AE60" opacity="0.3"/>
      <circle cx="28" cy="40" r="6"/>
      <circle cx="28" cy="40" r="2" fill="#27AE60" opacity="0.5"/>
      <circle cx="44" cy="36" r="6" fill="#27AE60" opacity="0.3"/>
      <circle cx="44" cy="36" r="6"/>
      <circle cx="44" cy="36" r="4" fill="#27AE60" opacity="0.7"/>
      <text x="18" y="58" font-size="3" fill="currentColor" stroke="none">GCaMP Brightness</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL RESEARCH ICONS
  // ===========================================================================
  {
    id: 'neuro-brain-slice',
    name: 'Brain Slice',
    domain: 'biology',
    category: 'techniques',
    tags: ['brain slice', 'in vitro', 'acute slice', 'electrophysiology'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="#E8E8E8" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="24" ry="16"/>
      <path d="M16 24c8 4 8-4 16 0s8 4 16 0" stroke="#9B59B6"/>
      <ellipse cx="24" cy="32" rx="6" ry="4" fill="#27AE60" opacity="0.4"/>
      <ellipse cx="40" cy="32" rx="6" ry="4" fill="#3498DB" opacity="0.4"/>
      <ellipse cx="32" cy="40" rx="4" ry="2" fill="#E74C3C" opacity="0.4"/>
      <path d="M8 32c0-4 4-8 8-8"/>
      <path d="M56 32c0-4-4-8-8-8"/>
      <text x="20" y="28" font-size="3" fill="currentColor" stroke="none">CA1</text>
      <text x="36" y="28" font-size="3" fill="currentColor" stroke="none">CA3</text>
      <text x="28" y="46" font-size="3" fill="currentColor" stroke="none">DG</text>
    </svg>`
  },
  {
    id: 'neuro-psychophysics',
    name: 'Psychophysics Curve',
    domain: 'biology',
    category: 'behavioral',
    tags: ['psychophysics', 'detection', 'threshold', 'sensitivity', 'psychometric'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="8" y1="52" x2="56" y2="52"/>
      <line x1="8" y1="52" x2="8" y2="8"/>
      <path d="M8 48c8 0 12-4 20-20s12-16 20-16" stroke="#E74C3C" stroke-width="2"/>
      <line x1="8" y1="28" x2="56" y2="28" stroke-dasharray="2 2"/>
      <text x="4" y="30" font-size="3" fill="currentColor" stroke="none">50%</text>
      <circle cx="28" cy="28" r="2" fill="#3498DB"/>
      <line x1="28" y1="28" x2="28" y2="52" stroke-dasharray="2 2"/>
      <text x="24" y="58" font-size="3" fill="currentColor" stroke="none">PSE</text>
      <text x="4" y="16" font-size="3" fill="currentColor" stroke="none">P</text>
      <text x="44" y="58" font-size="3" fill="currentColor" stroke="none">Stimulus</text>
    </svg>`
  },
  {
    id: 'neuro-oscillation-coupling',
    name: 'Neural Oscillation Coupling',
    domain: 'biology',
    category: 'circuits',
    tags: ['coupling', 'phase-amplitude', 'oscillation', 'gamma', 'theta'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 20c8-8 8 8 16 0s8 8 16 0s8 8 16 0s8-8 8 0" stroke="#3498DB" stroke-width="2"/>
      <text x="52" y="16" font-size="3" fill="currentColor" stroke="none">Theta</text>
      <path d="M4 44c2-4 2 4 4 0s2 4 4 0s2 4 4 0s2 4 4 0s2 4 4 0s2 4 4 0s2 4 4 0s2 4 4 0s2 4 4 0s2 4 4 0s2 4 4 0s2 4 4 0" stroke="#E74C3C" stroke-width="1.5"/>
      <text x="52" y="48" font-size="3" fill="currentColor" stroke="none">Gamma</text>
      <path d="M12 28v8" stroke="#9B59B6" stroke-dasharray="2 2"/>
      <path d="M28 28v8" stroke="#9B59B6" stroke-dasharray="2 2"/>
      <path d="M44 28v8" stroke="#9B59B6" stroke-dasharray="2 2"/>
      <text x="12" y="58" font-size="3" fill="currentColor" stroke="none">Phase-Amplitude Coupling</text>
    </svg>`
  },
  {
    id: 'neuro-place-cell',
    name: 'Place Cell',
    domain: 'biology',
    category: 'circuits',
    tags: ['place cell', 'hippocampus', 'spatial', 'cognitive map', 'OKeefe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="#E8E8E8" opacity="0.2"/>
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <ellipse cx="36" cy="28" rx="10" ry="8" fill="#E74C3C" opacity="0.5"/>
      <ellipse cx="36" cy="28" rx="6" ry="5" fill="#E74C3C" opacity="0.8"/>
      <path d="M12 12l8 8l-4 12l12-4l8 16l4-8l8 4l4-8" stroke="#3498DB" stroke-width="1"/>
      <circle cx="36" cy="28" r="2" fill="#27AE60"/>
      <text x="44" y="40" font-size="3" fill="currentColor" stroke="none">Place</text>
      <text x="44" y="46" font-size="3" fill="currentColor" stroke="none">Field</text>
      <text x="4" y="62" font-size="3" fill="currentColor" stroke="none">Trajectory</text>
    </svg>`
  },
  {
    id: 'neuro-grid-cell',
    name: 'Grid Cell',
    domain: 'biology',
    category: 'circuits',
    tags: ['grid cell', 'entorhinal', 'spatial', 'navigation', 'Moser'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2" fill="#E8E8E8" opacity="0.2"/>
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <circle cx="20" cy="16" r="4" fill="#E74C3C" opacity="0.6"/>
      <circle cx="44" cy="16" r="4" fill="#E74C3C" opacity="0.6"/>
      <circle cx="32" cy="32" r="4" fill="#E74C3C" opacity="0.6"/>
      <circle cx="20" cy="48" r="4" fill="#E74C3C" opacity="0.6"/>
      <circle cx="44" cy="48" r="4" fill="#E74C3C" opacity="0.6"/>
      <path d="M20 16l12 16l12-16" stroke="#9B59B6" stroke-dasharray="2 2"/>
      <path d="M20 48l12-16l12 16" stroke="#9B59B6" stroke-dasharray="2 2"/>
      <path d="M20 16v32" stroke="#9B59B6" stroke-dasharray="2 2"/>
      <path d="M44 16v32" stroke="#9B59B6" stroke-dasharray="2 2"/>
      <text x="16" y="62" font-size="3" fill="currentColor" stroke="none">Hexagonal Grid</text>
    </svg>`
  },
  {
    id: 'neuro-neural-decoder',
    name: 'Neural Decoder',
    domain: 'biology',
    category: 'computational',
    tags: ['decoder', 'BCI', 'brain-computer', 'machine learning', 'prediction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="16" cy="24" rx="10" ry="8" fill="#9B59B6" opacity="0.3"/>
      <path d="M8 20v-8l2 8" stroke="#27AE60"/>
      <path d="M12 20v-12l2 12" stroke="#27AE60"/>
      <path d="M16 20v-8l2 8" stroke="#27AE60"/>
      <path d="M20 20v-10l2 10" stroke="#27AE60"/>
      <text x="8" y="36" font-size="3" fill="currentColor" stroke="none">Spikes</text>
      <rect x="28" y="16" width="16" height="16" rx="2" fill="#3498DB" opacity="0.3"/>
      <text x="30" y="28" font-size="4" fill="currentColor" stroke="none">ML</text>
      <path d="M26 24h2"/>
      <path d="M44 24h4"/>
      <circle cx="52" cy="24" r="6" fill="#E74C3C" opacity="0.3"/>
      <path d="M52 18l4 6-4 6" stroke="#E74C3C" stroke-width="2"/>
      <text x="44" y="36" font-size="3" fill="currentColor" stroke="none">Output</text>
      <text x="14" y="52" font-size="3" fill="currentColor" stroke="none">Neural Decoding</text>
    </svg>`
  },

  // ===========================================================================
  // ION CHANNELS
  // ===========================================================================
  {
    id: 'neuro-sodium-channel',
    name: 'Voltage-Gated Na+ Channel',
    domain: 'biology',
    category: 'ion-channels',
    tags: ['sodium channel', 'Nav', 'voltage-gated', 'action potential', 'inactivation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" fill="#F39C12" opacity="0.2"/>
      <rect x="20" y="16" width="24" height="32" fill="#E74C3C" opacity="0.3"/>
      <path d="M28 16v32" stroke="#E74C3C"/>
      <path d="M36 16v32" stroke="#E74C3C"/>
      <ellipse cx="32" cy="32" rx="6" ry="8" fill="#FFFFFF"/>
      <circle cx="32" cy="24" r="2" fill="#3498DB"/>
      <circle cx="32" cy="32" r="2" fill="#3498DB"/>
      <circle cx="32" cy="40" r="2" fill="#3498DB"/>
      <path d="M32 12v4" stroke="#27AE60" stroke-width="2"/>
      <path d="M32 48v4" stroke="#27AE60" stroke-width="2"/>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">OUT</text>
      <text x="52" y="32" font-size="3" fill="currentColor" stroke="none">IN</text>
      <text x="24" y="58" font-size="3" fill="currentColor" stroke="none">Nav</text>
    </svg>`
  },
  {
    id: 'neuro-potassium-channel',
    name: 'Voltage-Gated K+ Channel',
    domain: 'biology',
    category: 'ion-channels',
    tags: ['potassium channel', 'Kv', 'voltage-gated', 'repolarization', 'delayed rectifier'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" fill="#F39C12" opacity="0.2"/>
      <rect x="20" y="16" width="24" height="32" fill="#9B59B6" opacity="0.3"/>
      <path d="M28 16v32" stroke="#9B59B6"/>
      <path d="M36 16v32" stroke="#9B59B6"/>
      <ellipse cx="32" cy="32" rx="6" ry="8" fill="#FFFFFF"/>
      <circle cx="32" cy="40" r="2" fill="#27AE60"/>
      <circle cx="32" cy="32" r="2" fill="#27AE60"/>
      <path d="M32 48v4" stroke="#27AE60" stroke-width="2"/>
      <path d="M32 12v4" stroke="#E74C3C" stroke-width="2"/>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">OUT</text>
      <text x="52" y="32" font-size="3" fill="currentColor" stroke="none">IN</text>
      <text x="24" y="58" font-size="3" fill="currentColor" stroke="none">Kv</text>
    </svg>`
  },
  {
    id: 'neuro-calcium-channel',
    name: 'Voltage-Gated Ca2+ Channel',
    domain: 'biology',
    category: 'ion-channels',
    tags: ['calcium channel', 'Cav', 'L-type', 'T-type', 'neurotransmitter release'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" fill="#F39C12" opacity="0.2"/>
      <rect x="20" y="16" width="24" height="32" fill="#3498DB" opacity="0.3"/>
      <path d="M28 16v32" stroke="#3498DB"/>
      <path d="M36 16v32" stroke="#3498DB"/>
      <ellipse cx="32" cy="32" rx="6" ry="8" fill="#FFFFFF"/>
      <circle cx="32" cy="24" r="2" fill="#27AE60"/>
      <circle cx="32" cy="32" r="2" fill="#27AE60"/>
      <path d="M32 12v4" stroke="#27AE60" stroke-width="2"/>
      <text x="27" y="50" font-size="3" fill="currentColor" stroke="none">2+</text>
      <text x="4" y="32" font-size="3" fill="currentColor" stroke="none">OUT</text>
      <text x="52" y="32" font-size="3" fill="currentColor" stroke="none">IN</text>
      <text x="22" y="58" font-size="3" fill="currentColor" stroke="none">Cav</text>
    </svg>`
  },
  {
    id: 'neuro-nmda-receptor',
    name: 'NMDA Receptor',
    domain: 'biology',
    category: 'ion-channels',
    tags: ['NMDA', 'glutamate receptor', 'Mg2+ block', 'LTP', 'coincidence detector'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="20" fill="#F39C12" opacity="0.2"/>
      <rect x="16" y="20" width="32" height="28" fill="#27AE60" opacity="0.3"/>
      <ellipse cx="32" cy="32" rx="8" ry="10" fill="#FFFFFF"/>
      <circle cx="32" cy="32" r="3" fill="#95A5A6"/>
      <text x="30" y="35" font-size="4" fill="currentColor" stroke="none">Mg</text>
      <circle cx="24" cy="16" r="3" fill="#E74C3C"/>
      <text x="20" y="12" font-size="3" fill="currentColor" stroke="none">Glu</text>
      <circle cx="40" cy="16" r="3" fill="#3498DB"/>
      <text x="38" y="12" font-size="3" fill="currentColor" stroke="none">Gly</text>
      <path d="M24 19v1"/>
      <path d="M40 19v1"/>
      <text x="16" y="56" font-size="3" fill="currentColor" stroke="none">NMDA Receptor</text>
    </svg>`
  },

  // ===========================================================================
  // COGNITIVE NETWORKS
  // ===========================================================================
  {
    id: 'neuro-default-mode-network',
    name: 'Default Mode Network',
    domain: 'biology',
    category: 'networks',
    tags: ['DMN', 'default mode', 'resting state', 'self-referential', 'mind-wandering'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="24" ry="18" fill="#E8E8E8" opacity="0.3"/>
      <circle cx="32" cy="16" r="6" fill="#9B59B6" opacity="0.5"/>
      <text x="28" y="18" font-size="3" fill="currentColor" stroke="none">mPFC</text>
      <circle cx="20" cy="32" r="5" fill="#9B59B6" opacity="0.5"/>
      <text x="16" y="34" font-size="3" fill="currentColor" stroke="none">PCC</text>
      <circle cx="44" cy="32" r="5" fill="#9B59B6" opacity="0.5"/>
      <text x="40" y="34" font-size="3" fill="currentColor" stroke="none">IPL</text>
      <circle cx="32" cy="44" r="5" fill="#9B59B6" opacity="0.5"/>
      <text x="28" y="46" font-size="3" fill="currentColor" stroke="none">Hip</text>
      <path d="M32 22v16" stroke="#9B59B6"/>
      <path d="M25 32h14" stroke="#9B59B6"/>
      <path d="M26 20l-4 8" stroke="#9B59B6"/>
      <path d="M38 20l4 8" stroke="#9B59B6"/>
      <text x="20" y="58" font-size="3" fill="currentColor" stroke="none">DMN</text>
    </svg>`
  },
  {
    id: 'neuro-attention-network',
    name: 'Attention Network',
    domain: 'biology',
    category: 'networks',
    tags: ['attention', 'dorsal attention', 'DAN', 'FEF', 'IPS', 'top-down'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="24" ry="18" fill="#E8E8E8" opacity="0.3"/>
      <circle cx="20" cy="20" r="5" fill="#3498DB" opacity="0.5"/>
      <text x="16" y="22" font-size="3" fill="currentColor" stroke="none">FEF</text>
      <circle cx="44" cy="20" r="5" fill="#3498DB" opacity="0.5"/>
      <text x="40" y="22" font-size="3" fill="currentColor" stroke="none">FEF</text>
      <circle cx="16" cy="36" r="5" fill="#27AE60" opacity="0.5"/>
      <text x="12" y="38" font-size="3" fill="currentColor" stroke="none">IPS</text>
      <circle cx="48" cy="36" r="5" fill="#27AE60" opacity="0.5"/>
      <text x="44" y="38" font-size="3" fill="currentColor" stroke="none">IPS</text>
      <path d="M25 20h14" stroke="#3498DB"/>
      <path d="M21 36h22" stroke="#27AE60"/>
      <path d="M20 25v6" stroke="#E74C3C"/>
      <path d="M44 25v6" stroke="#E74C3C"/>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">Dorsal Attention</text>
    </svg>`
  },
  {
    id: 'neuro-salience-network',
    name: 'Salience Network',
    domain: 'biology',
    category: 'networks',
    tags: ['salience', 'anterior insula', 'ACC', 'switching', 'arousal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="28" rx="24" ry="18" fill="#E8E8E8" opacity="0.3"/>
      <circle cx="32" cy="16" r="6" fill="#E74C3C" opacity="0.5"/>
      <text x="28" y="18" font-size="3" fill="currentColor" stroke="none">ACC</text>
      <circle cx="16" cy="32" r="5" fill="#F39C12" opacity="0.5"/>
      <text x="14" y="34" font-size="2" fill="currentColor" stroke="none">AI</text>
      <circle cx="48" cy="32" r="5" fill="#F39C12" opacity="0.5"/>
      <text x="46" y="34" font-size="2" fill="currentColor" stroke="none">AI</text>
      <path d="M26 20l-8 8" stroke="#E74C3C"/>
      <path d="M38 20l8 8" stroke="#E74C3C"/>
      <path d="M21 32h22" stroke="#F39C12"/>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">Salience Network</text>
    </svg>`
  },

  // ===========================================================================
  // NEUROPLASTICITY
  // ===========================================================================
  {
    id: 'neuro-dendritic-spine',
    name: 'Dendritic Spine',
    domain: 'biology',
    category: 'plasticity',
    tags: ['spine', 'mushroom spine', 'thin spine', 'stubby', 'plasticity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48" stroke-width="4" fill="#9B59B6" opacity="0.3"/>
      <path d="M16 56v-16"/>
      <circle cx="16" cy="36" r="4" fill="#E74C3C" opacity="0.5"/>
      <text x="12" y="28" font-size="3" fill="currentColor" stroke="none">Thin</text>
      <path d="M32 56v-12"/>
      <ellipse cx="32" cy="36" rx="6" ry="8" fill="#27AE60" opacity="0.5"/>
      <text x="24" y="24" font-size="3" fill="currentColor" stroke="none">Mushroom</text>
      <path d="M48 56v-6"/>
      <rect x="44" y="46" width="8" height="4" rx="1" fill="#3498DB" opacity="0.5"/>
      <text x="42" y="42" font-size="3" fill="currentColor" stroke="none">Stubby</text>
      <text x="16" y="62" font-size="3" fill="currentColor" stroke="none">Spine Morphology</text>
    </svg>`
  },
  {
    id: 'neuro-neurogenesis',
    name: 'Adult Neurogenesis',
    domain: 'biology',
    category: 'plasticity',
    tags: ['neurogenesis', 'hippocampus', 'dentate gyrus', 'SVZ', 'new neurons'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="32" rx="24" ry="16" fill="#E8E8E8" opacity="0.2"/>
      <circle cx="16" cy="32" r="4" fill="#3498DB" opacity="0.5"/>
      <text x="12" y="42" font-size="3" fill="currentColor" stroke="none">NSC</text>
      <path d="M20 32h6" stroke="#9B59B6"/>
      <circle cx="28" cy="32" r="3" fill="#9B59B6" opacity="0.5"/>
      <path d="M31 32h6" stroke="#27AE60"/>
      <circle cx="40" cy="32" r="4" fill="#27AE60" opacity="0.5"/>
      <path d="M40 32l-3-4"/>
      <path d="M40 32l3-4"/>
      <path d="M40 32l4 1"/>
      <path d="M44 32h6" stroke="#E74C3C"/>
      <circle cx="52" cy="32" r="5" fill="#E74C3C" opacity="0.5"/>
      <path d="M52 32l-4-6"/>
      <path d="M52 32l4-5"/>
      <path d="M52 32l-3-2"/>
      <path d="M52 32l5 3"/>
      <path d="M52 37v4"/>
      <text x="48" y="48" font-size="3" fill="currentColor" stroke="none">Mature</text>
      <text x="14" y="56" font-size="3" fill="currentColor" stroke="none">Adult Neurogenesis</text>
    </svg>`
  },

  // ===========================================================================
  // ADDITIONAL RESEARCH TOOLS
  // ===========================================================================
  {
    id: 'neuro-fiber-photometry',
    name: 'Fiber Photometry',
    domain: 'biology',
    category: 'equipment',
    tags: ['fiber photometry', 'calcium signal', 'bulk fluorescence', 'GCaMP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="20" height="12" rx="2" fill="#3498DB" opacity="0.3"/>
      <text x="8" y="16" font-size="3" fill="currentColor" stroke="none">LED</text>
      <rect x="40" y="8" width="20" height="12" rx="2" fill="#27AE60" opacity="0.3"/>
      <text x="42" y="16" font-size="3" fill="currentColor" stroke="none">PMT</text>
      <path d="M24 14h4"/>
      <path d="M36 14h4"/>
      <rect x="28" y="10" width="8" height="8" rx="1" fill="#9B59B6" opacity="0.3"/>
      <path d="M32 18v20" stroke="#9B59B6" stroke-width="2"/>
      <ellipse cx="32" cy="44" rx="12" ry="8" fill="#E8E8E8" opacity="0.3"/>
      <circle cx="32" cy="44" r="4" fill="#27AE60" opacity="0.5"/>
      <path d="M14 14l14 4" stroke="#3498DB" stroke-dasharray="2 2"/>
      <path d="M32 38l18-20" stroke="#27AE60" stroke-dasharray="2 2"/>
      <text x="14" y="58" font-size="3" fill="currentColor" stroke="none">Fiber Photometry</text>
    </svg>`
  },
  {
    id: 'neuro-head-direction-cell',
    name: 'Head Direction Cell',
    domain: 'biology',
    category: 'circuits',
    tags: ['head direction', 'navigation', 'postsubiculum', 'compass', 'Taube'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24" fill="#E8E8E8" opacity="0.2"/>
      <circle cx="32" cy="32" r="24"/>
      <line x1="32" y1="8" x2="32" y2="14"/>
      <line x1="32" y1="50" x2="32" y2="56"/>
      <line x1="8" y1="32" x2="14" y2="32"/>
      <line x1="50" y1="32" x2="56" y2="32"/>
      <text x="30" y="6" font-size="3" fill="currentColor" stroke="none">N</text>
      <text x="30" y="62" font-size="3" fill="currentColor" stroke="none">S</text>
      <text x="2" y="34" font-size="3" fill="currentColor" stroke="none">W</text>
      <text x="58" y="34" font-size="3" fill="currentColor" stroke="none">E</text>
      <path d="M32 32l12-12" stroke="#E74C3C" stroke-width="3"/>
      <circle cx="44" cy="20" r="3" fill="#E74C3C"/>
      <ellipse cx="44" cy="20" rx="8" ry="6" fill="#E74C3C" opacity="0.3" transform="rotate(-45 44 20)"/>
    </svg>`
  },
];

export default neuroscienceIcons;
