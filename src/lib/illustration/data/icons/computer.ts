/**
 * Computer Engineering Icon Library
 * Comprehensive SVG icons for computer engineering
 *
 * Categories:
 * - Processors (CPU, GPU, cores, cache)
 * - Memory (RAM, ROM, cache, storage)
 * - Networks (routers, switches, protocols)
 * - Embedded Systems (microcontrollers, sensors, actuators)
 * - Digital Logic (gates, flip-flops, registers)
 * - System Architecture (buses, interfaces, peripherals)
 */

import type { IconDefinition } from './index';

export const computerIcons: IconDefinition[] = [
  // ===========================================================================
  // PROCESSORS
  // ===========================================================================
  {
    id: 'comp-cpu',
    name: 'CPU',
    domain: 'engineering',
    category: 'processors',
    tags: ['CPU', 'processor', 'central', 'unit', 'chip'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <rect x="22" y="22" width="20" height="20" rx="1" fill="currentColor" opacity="0.1"/>
      <path d="M20 16v-8"/>
      <path d="M28 16v-8"/>
      <path d="M36 16v-8"/>
      <path d="M44 16v-8"/>
      <path d="M20 48v8"/>
      <path d="M28 48v8"/>
      <path d="M36 48v8"/>
      <path d="M44 48v8"/>
      <path d="M16 20h-8"/>
      <path d="M16 28h-8"/>
      <path d="M16 36h-8"/>
      <path d="M16 44h-8"/>
      <path d="M48 20h8"/>
      <path d="M48 28h8"/>
      <path d="M48 36h8"/>
      <path d="M48 44h8"/>
    </svg>`
  },
  {
    id: 'comp-gpu',
    name: 'GPU',
    domain: 'engineering',
    category: 'processors',
    tags: ['GPU', 'graphics', 'processor', 'parallel', 'CUDA'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="28" rx="2"/>
      <rect x="12" y="24" width="12" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="24" width="12" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="40" y="24" width="12" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="12" y="38" width="12" height="6"/>
      <rect x="26" y="38" width="12" height="6"/>
      <rect x="40" y="38" width="12" height="6"/>
      <path d="M16 20v-8"/>
      <path d="M32 20v-8"/>
      <path d="M48 20v-8"/>
      <path d="M16 48v8"/>
      <path d="M32 48v8"/>
      <path d="M48 48v8"/>
    </svg>`
  },
  {
    id: 'comp-core',
    name: 'Processor Core',
    domain: 'engineering',
    category: 'processors',
    tags: ['core', 'processor', 'execution', 'unit', 'multicore'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <rect x="20" y="20" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="34" y="20" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="20" y="34" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="34" y="34" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <path d="M30 20v10h4v-10"/>
      <path d="M30 34v10h4v-10"/>
      <path d="M20 30h10v4h-10"/>
      <path d="M34 30h10v4h-10"/>
    </svg>`
  },
  {
    id: 'comp-cache',
    name: 'Cache Memory',
    domain: 'engineering',
    category: 'processors',
    tags: ['cache', 'L1', 'L2', 'L3', 'SRAM'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="12" rx="2"/>
      <rect x="12" y="28" width="40" height="12" rx="2"/>
      <rect x="8" y="44" width="48" height="12" rx="2"/>
      <text x="28" y="22" font-size="6" fill="currentColor" stroke="none">L1</text>
      <text x="28" y="38" font-size="6" fill="currentColor" stroke="none">L2</text>
      <text x="28" y="54" font-size="6" fill="currentColor" stroke="none">L3</text>
    </svg>`
  },
  {
    id: 'comp-alu',
    name: 'ALU',
    domain: 'engineering',
    category: 'processors',
    tags: ['ALU', 'arithmetic', 'logic', 'unit', 'computation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 52,56 12,56" fill="currentColor" opacity="0.1"/>
      <polygon points="32,8 52,56 12,56"/>
      <path d="M20 16v-8"/>
      <path d="M44 16v-8"/>
      <path d="M32 56v8"/>
      <text x="24" y="40" font-size="8" fill="currentColor" stroke="none">ALU</text>
    </svg>`
  },

  // ===========================================================================
  // MEMORY
  // ===========================================================================
  {
    id: 'comp-ram',
    name: 'RAM Module',
    domain: 'engineering',
    category: 'memory',
    tags: ['RAM', 'memory', 'DRAM', 'DDR', 'volatile'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="2"/>
      <rect x="12" y="24" width="8" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="22" y="24" width="8" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="32" y="24" width="8" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="42" y="24" width="8" height="16" fill="currentColor" opacity="0.2"/>
      <path d="M12 44v4"/>
      <path d="M20 44v4"/>
      <path d="M28 44v4"/>
      <path d="M36 44v4"/>
      <path d="M44 44v4"/>
      <path d="M52 44v4"/>
      <path d="M24 20v-4"/>
      <path d="M40 20v-4"/>
    </svg>`
  },
  {
    id: 'comp-rom',
    name: 'ROM Chip',
    domain: 'engineering',
    category: 'memory',
    tags: ['ROM', 'memory', 'non-volatile', 'firmware', 'BIOS'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <circle cx="22" cy="22" r="2"/>
      <path d="M20 48v8"/>
      <path d="M28 48v8"/>
      <path d="M36 48v8"/>
      <path d="M44 48v8"/>
      <path d="M20 16v-8"/>
      <path d="M28 16v-8"/>
      <path d="M36 16v-8"/>
      <path d="M44 16v-8"/>
      <text x="22" y="38" font-size="6" fill="currentColor" stroke="none">ROM</text>
    </svg>`
  },
  {
    id: 'comp-ssd',
    name: 'SSD',
    domain: 'engineering',
    category: 'memory',
    tags: ['SSD', 'storage', 'flash', 'NAND', 'NVMe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="4"/>
      <rect x="12" y="20" width="16" height="12" fill="currentColor" opacity="0.2"/>
      <rect x="12" y="34" width="16" height="10" fill="currentColor" opacity="0.2"/>
      <rect x="32" y="20" width="20" height="8" rx="1"/>
      <rect x="32" y="30" width="20" height="8" rx="1"/>
      <rect x="32" y="40" width="20" height="4" rx="1"/>
      <path d="M16 48v8"/>
      <path d="M48 48v8"/>
    </svg>`
  },
  {
    id: 'comp-register',
    name: 'Register',
    domain: 'engineering',
    category: 'memory',
    tags: ['register', 'storage', 'flip-flop', 'CPU', 'fast'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="2"/>
      <rect x="12" y="28" width="8" height="8"/>
      <rect x="22" y="28" width="8" height="8"/>
      <rect x="32" y="28" width="8" height="8"/>
      <rect x="42" y="28" width="8" height="8"/>
      <path d="M16 24v-8"/>
      <path d="M26 24v-8"/>
      <path d="M36 24v-8"/>
      <path d="M46 24v-8"/>
      <path d="M32 40v8"/>
      <text x="10" y="52" font-size="5" fill="currentColor" stroke="none">D7 D6 D5 D4</text>
    </svg>`
  },
  {
    id: 'comp-buffer',
    name: 'Buffer',
    domain: 'engineering',
    category: 'memory',
    tags: ['buffer', 'queue', 'FIFO', 'data', 'storage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="40" rx="2"/>
      <rect x="20" y="16" width="24" height="6" fill="currentColor" opacity="0.3"/>
      <rect x="20" y="24" width="24" height="6" fill="currentColor" opacity="0.2"/>
      <rect x="20" y="32" width="24" height="6" fill="currentColor" opacity="0.1"/>
      <rect x="20" y="40" width="24" height="6"/>
      <path d="M8 20h8"/>
      <path d="M48 44h8"/>
      <polygon points="8,20 12,17 12,23" fill="currentColor"/>
      <polygon points="56,44 52,41 52,47" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // NETWORKS
  // ===========================================================================
  {
    id: 'comp-router',
    name: 'Router',
    domain: 'engineering',
    category: 'networks',
    tags: ['router', 'network', 'IP', 'routing', 'gateway'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="24" width="40" height="20" rx="4"/>
      <circle cx="20" cy="34" r="3"/>
      <circle cx="32" cy="34" r="3"/>
      <circle cx="44" cy="34" r="3"/>
      <path d="M20 24v-12"/>
      <path d="M32 24v-8"/>
      <path d="M44 24v-12"/>
      <path d="M20 44v8"/>
      <path d="M32 44v8"/>
      <path d="M44 44v8"/>
      <path d="M16 12h8"/>
      <path d="M40 12h8"/>
    </svg>`
  },
  {
    id: 'comp-switch',
    name: 'Network Switch',
    domain: 'engineering',
    category: 'networks',
    tags: ['switch', 'network', 'ethernet', 'layer 2', 'ports'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="48" height="16" rx="2"/>
      <rect x="12" y="28" width="4" height="8"/>
      <rect x="20" y="28" width="4" height="8"/>
      <rect x="28" y="28" width="4" height="8"/>
      <rect x="36" y="28" width="4" height="8"/>
      <rect x="44" y="28" width="4" height="8"/>
      <path d="M14 24v-8"/>
      <path d="M22 24v-8"/>
      <path d="M30 24v-8"/>
      <path d="M38 24v-8"/>
      <path d="M46 24v-8"/>
      <circle cx="52" cy="32" r="2" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'comp-firewall',
    name: 'Firewall',
    domain: 'engineering',
    category: 'networks',
    tags: ['firewall', 'security', 'network', 'protection', 'filter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="8" width="24" height="48" rx="2"/>
      <path d="M20 16h24"/>
      <path d="M20 24h24"/>
      <path d="M20 32h24"/>
      <path d="M20 40h24"/>
      <path d="M20 48h24"/>
      <path d="M8 20h12"/>
      <path d="M44 20h12"/>
      <path d="M8 44h12"/>
      <path d="M44 44h12"/>
      <circle cx="8" cy="20" r="2" fill="green"/>
      <circle cx="56" cy="44" r="2" fill="green"/>
      <path d="M8 32h12" stroke="red"/>
      <circle cx="8" cy="32" r="2" fill="red"/>
    </svg>`
  },
  {
    id: 'comp-server',
    name: 'Server',
    domain: 'engineering',
    category: 'networks',
    tags: ['server', 'rack', 'datacenter', 'hosting', 'compute'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="14" rx="2"/>
      <rect x="12" y="25" width="40" height="14" rx="2"/>
      <rect x="12" y="42" width="40" height="14" rx="2"/>
      <circle cx="20" cy="15" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="32" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="49" r="2" fill="currentColor" opacity="0.5"/>
      <path d="M28 15h20"/>
      <path d="M28 32h20"/>
      <path d="M28 49h20"/>
    </svg>`
  },
  {
    id: 'comp-network-node',
    name: 'Network Node',
    domain: 'engineering',
    category: 'networks',
    tags: ['node', 'network', 'host', 'endpoint', 'device'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="12"/>
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M32 20v-12"/>
      <path d="M32 44v12"/>
      <path d="M20 32h-12"/>
      <path d="M44 32h12"/>
      <path d="M23.5 23.5l-8.5-8.5"/>
      <path d="M40.5 40.5l8.5 8.5"/>
      <path d="M23.5 40.5l-8.5 8.5"/>
      <path d="M40.5 23.5l8.5-8.5"/>
    </svg>`
  },

  // ===========================================================================
  // EMBEDDED SYSTEMS
  // ===========================================================================
  {
    id: 'comp-microcontroller',
    name: 'Microcontroller',
    domain: 'engineering',
    category: 'embedded',
    tags: ['microcontroller', 'MCU', 'embedded', 'Arduino', 'PIC'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="2"/>
      <circle cx="22" cy="22" r="2"/>
      <path d="M20 16v-8"/>
      <path d="M28 16v-8"/>
      <path d="M36 16v-8"/>
      <path d="M44 16v-8"/>
      <path d="M20 48v8"/>
      <path d="M28 48v8"/>
      <path d="M36 48v8"/>
      <path d="M44 48v8"/>
      <path d="M16 24h-8"/>
      <path d="M16 32h-8"/>
      <path d="M16 40h-8"/>
      <path d="M48 24h8"/>
      <path d="M48 32h8"/>
      <path d="M48 40h8"/>
      <text x="22" y="38" font-size="5" fill="currentColor" stroke="none">MCU</text>
    </svg>`
  },
  {
    id: 'comp-sensor-module',
    name: 'Sensor Module',
    domain: 'engineering',
    category: 'embedded',
    tags: ['sensor', 'module', 'IoT', 'input', 'transducer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2"/>
      <circle cx="32" cy="32" r="8"/>
      <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <path d="M20 44v8"/>
      <path d="M28 44v8"/>
      <path d="M36 44v8"/>
      <path d="M44 44v8"/>
      <path d="M32 20v-8"/>
      <path d="M24 12h16"/>
    </svg>`
  },
  {
    id: 'comp-actuator',
    name: 'Actuator',
    domain: 'engineering',
    category: 'embedded',
    tags: ['actuator', 'motor', 'output', 'servo', 'control'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="16"/>
      <circle cx="32" cy="32" r="8"/>
      <path d="M32 16v-8"/>
      <path d="M32 48v8"/>
      <path d="M16 32h-8"/>
      <path d="M48 32h8"/>
      <path d="M32 24v16"/>
      <path d="M32 32l8-8"/>
      <circle cx="32" cy="32" r="3" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-pwm',
    name: 'PWM Signal',
    domain: 'engineering',
    category: 'embedded',
    tags: ['PWM', 'pulse', 'width', 'modulation', 'signal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 40v-24h8v24h4v-24h8v24h4v-24h8v24h4v-24h8v24"/>
      <path d="M4 40h56" stroke-dasharray="2 2"/>
      <path d="M4 16h56" stroke-dasharray="2 2"/>
      <text x="4" y="52" font-size="5" fill="currentColor" stroke="none">Duty cycle</text>
    </svg>`
  },
  {
    id: 'comp-gpio',
    name: 'GPIO Pins',
    domain: 'engineering',
    category: 'embedded',
    tags: ['GPIO', 'pins', 'input', 'output', 'digital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="20" width="24" height="24" rx="2"/>
      <path d="M8 24h12"/>
      <path d="M8 32h12"/>
      <path d="M8 40h12"/>
      <path d="M44 24h12"/>
      <path d="M44 32h12"/>
      <path d="M44 40h12"/>
      <circle cx="8" cy="24" r="2" fill="currentColor"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="8" cy="40" r="2"/>
      <circle cx="56" cy="24" r="2"/>
      <circle cx="56" cy="32" r="2" fill="currentColor"/>
      <circle cx="56" cy="40" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // DIGITAL LOGIC
  // ===========================================================================
  {
    id: 'comp-and-gate',
    name: 'AND Gate',
    domain: 'engineering',
    category: 'logic',
    tags: ['AND', 'gate', 'logic', 'digital', 'boolean'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16h16c10 0 18 8 18 16s-8 16-18 16H16z" fill="currentColor" opacity="0.1"/>
      <path d="M16 16h16c10 0 18 8 18 16s-8 16-18 16H16z"/>
      <path d="M8 24h8"/>
      <path d="M8 40h8"/>
      <path d="M50 32h6"/>
    </svg>`
  },
  {
    id: 'comp-or-gate',
    name: 'OR Gate',
    domain: 'engineering',
    category: 'logic',
    tags: ['OR', 'gate', 'logic', 'digital', 'boolean'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 16c8 8 8 24 0 32h8c16 0 28-8 28-16s-12-16-28-16z" fill="currentColor" opacity="0.1"/>
      <path d="M16 16c8 8 8 24 0 32h8c16 0 28-8 28-16s-12-16-28-16z"/>
      <path d="M8 24h12"/>
      <path d="M8 40h12"/>
      <path d="M52 32h4"/>
    </svg>`
  },
  {
    id: 'comp-not-gate',
    name: 'NOT Gate',
    domain: 'engineering',
    category: 'logic',
    tags: ['NOT', 'inverter', 'gate', 'logic', 'digital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="16,16 48,32 16,48" fill="currentColor" opacity="0.1"/>
      <polygon points="16,16 48,32 16,48"/>
      <circle cx="52" cy="32" r="4"/>
      <path d="M8 32h8"/>
      <path d="M56 32h4"/>
    </svg>`
  },
  {
    id: 'comp-xor-gate',
    name: 'XOR Gate',
    domain: 'engineering',
    category: 'logic',
    tags: ['XOR', 'exclusive OR', 'gate', 'logic', 'digital'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 16c8 8 8 24 0 32h8c16 0 24-8 24-16s-8-16-24-16z" fill="currentColor" opacity="0.1"/>
      <path d="M20 16c8 8 8 24 0 32h8c16 0 24-8 24-16s-8-16-24-16z"/>
      <path d="M16 16c8 8 8 24 0 32"/>
      <path d="M8 24h14"/>
      <path d="M8 40h14"/>
      <path d="M52 32h4"/>
    </svg>`
  },
  {
    id: 'comp-flip-flop',
    name: 'D Flip-Flop',
    domain: 'engineering',
    category: 'logic',
    tags: ['flip-flop', 'D', 'latch', 'sequential', 'memory'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="12" width="32" height="40" rx="2"/>
      <path d="M8 20h8"/>
      <path d="M8 44h8"/>
      <path d="M48 20h8"/>
      <path d="M48 44h8"/>
      <path d="M16 32l4-4v8z"/>
      <text x="20" y="24" font-size="6" fill="currentColor" stroke="none">D</text>
      <text x="38" y="24" font-size="6" fill="currentColor" stroke="none">Q</text>
      <text x="20" y="48" font-size="6" fill="currentColor" stroke="none">CLK</text>
      <text x="38" y="48" font-size="5" fill="currentColor" stroke="none">Q'</text>
    </svg>`
  },

  // ===========================================================================
  // SYSTEM ARCHITECTURE
  // ===========================================================================
  {
    id: 'comp-bus',
    name: 'System Bus',
    domain: 'engineering',
    category: 'architecture',
    tags: ['bus', 'data', 'address', 'control', 'interconnect'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="8" fill="currentColor" opacity="0.1"/>
      <path d="M8 28h48"/>
      <path d="M8 36h48"/>
      <path d="M16 28v-12"/>
      <path d="M32 28v-12"/>
      <path d="M48 28v-12"/>
      <path d="M16 36v12"/>
      <path d="M32 36v12"/>
      <path d="M48 36v12"/>
      <rect x="12" y="12" width="8" height="4"/>
      <rect x="28" y="12" width="8" height="4"/>
      <rect x="44" y="12" width="8" height="4"/>
      <rect x="12" y="48" width="8" height="4"/>
      <rect x="28" y="48" width="8" height="4"/>
      <rect x="44" y="48" width="8" height="4"/>
    </svg>`
  },
  {
    id: 'comp-interface',
    name: 'Interface',
    domain: 'engineering',
    category: 'architecture',
    tags: ['interface', 'I/O', 'port', 'connection', 'peripheral'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="20" height="24" rx="2"/>
      <rect x="36" y="20" width="20" height="24" rx="2"/>
      <path d="M28 28h8"/>
      <path d="M28 32h8"/>
      <path d="M28 36h8"/>
      <polygon points="32,28 34,30 32,32" fill="currentColor"/>
      <polygon points="32,32 34,34 32,36" fill="currentColor"/>
      <polygon points="36,36 34,38 36,40" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-dma',
    name: 'DMA Controller',
    domain: 'engineering',
    category: 'architecture',
    tags: ['DMA', 'direct', 'memory', 'access', 'transfer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="20" width="24" height="24" rx="2"/>
      <text x="24" y="36" font-size="6" fill="currentColor" stroke="none">DMA</text>
      <path d="M8 24h12"/>
      <path d="M8 40h12"/>
      <path d="M44 24h12"/>
      <path d="M44 40h12"/>
      <path d="M32 8v12"/>
      <path d="M32 44v12"/>
      <polygon points="8,24 12,22 12,26" fill="currentColor"/>
      <polygon points="56,40 52,38 52,42" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-interrupt',
    name: 'Interrupt Controller',
    domain: 'engineering',
    category: 'architecture',
    tags: ['interrupt', 'IRQ', 'controller', 'priority', 'handler'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="16" width="24" height="32" rx="2"/>
      <path d="M8 24h12"/>
      <path d="M8 32h12"/>
      <path d="M8 40h12"/>
      <path d="M44 32h12"/>
      <circle cx="8" cy="24" r="2" fill="currentColor"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="8" cy="40" r="2" fill="currentColor"/>
      <text x="24" y="36" font-size="5" fill="currentColor" stroke="none">INT</text>
      <polygon points="56,32 52,28 52,36" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-clock',
    name: 'Clock Generator',
    domain: 'engineering',
    category: 'architecture',
    tags: ['clock', 'oscillator', 'frequency', 'timing', 'crystal'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="20" width="32" height="24" rx="2"/>
      <path d="M24 32c0-4 4-4 4 0s4 4 4 0 4-4 4 0s4 4 4 0"/>
      <path d="M48 32h8"/>
      <path d="M8 32h8"/>
      <circle cx="32" cy="12" r="4"/>
      <path d="M32 16v4"/>
      <text x="24" y="42" font-size="5" fill="currentColor" stroke="none">CLK</text>
    </svg>`
  },

  // ===========================================================================
  // DATA STRUCTURES
  // ===========================================================================
  {
    id: 'comp-array',
    name: 'Array',
    domain: 'engineering',
    category: 'data-structures',
    tags: ['array', 'list', 'sequential', 'index', 'collection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="10" height="16"/>
      <rect x="18" y="24" width="10" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="28" y="24" width="10" height="16"/>
      <rect x="38" y="24" width="10" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="48" y="24" width="10" height="16"/>
      <text x="10" y="48" font-size="5" fill="currentColor" stroke="none">[0]</text>
      <text x="20" y="48" font-size="5" fill="currentColor" stroke="none">[1]</text>
      <text x="30" y="48" font-size="5" fill="currentColor" stroke="none">[2]</text>
      <text x="40" y="48" font-size="5" fill="currentColor" stroke="none">[3]</text>
      <text x="50" y="48" font-size="5" fill="currentColor" stroke="none">[4]</text>
    </svg>`
  },
  {
    id: 'comp-linked-list',
    name: 'Linked List',
    domain: 'engineering',
    category: 'data-structures',
    tags: ['linked', 'list', 'node', 'pointer', 'sequential'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="12" height="16" rx="2"/>
      <rect x="22" y="24" width="12" height="16" rx="2"/>
      <rect x="40" y="24" width="12" height="16" rx="2"/>
      <circle cx="58" cy="32" r="4"/>
      <path d="M16 32h6"/>
      <polygon points="22,32 19,30 19,34" fill="currentColor"/>
      <path d="M34 32h6"/>
      <polygon points="40,32 37,30 37,34" fill="currentColor"/>
      <path d="M52 32h2"/>
      <polygon points="54,32 52,30 52,34" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-binary-tree',
    name: 'Binary Tree',
    domain: 'engineering',
    category: 'data-structures',
    tags: ['binary', 'tree', 'node', 'BST', 'hierarchy'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="18" cy="32" r="6"/>
      <circle cx="46" cy="32" r="6"/>
      <circle cx="10" cy="52" r="5"/>
      <circle cx="26" cy="52" r="5"/>
      <circle cx="38" cy="52" r="5"/>
      <circle cx="54" cy="52" r="5"/>
      <path d="M28 16l-6 12"/>
      <path d="M36 16l6 12"/>
      <path d="M14 36l-2 12"/>
      <path d="M22 36l2 12"/>
      <path d="M42 36l-2 12"/>
      <path d="M50 36l2 12"/>
    </svg>`
  },
  {
    id: 'comp-hash-table',
    name: 'Hash Table',
    domain: 'engineering',
    category: 'data-structures',
    tags: ['hash', 'table', 'map', 'dictionary', 'key-value'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="48" rx="2"/>
      <path d="M8 16h20"/>
      <path d="M8 24h20"/>
      <path d="M8 32h20"/>
      <path d="M8 40h20"/>
      <path d="M8 48h20"/>
      <rect x="36" y="12" width="16" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="28" width="24" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="44" width="12" height="8" rx="2" fill="currentColor" opacity="0.2"/>
      <path d="M28 12h8"/>
      <path d="M28 28h8"/>
      <path d="M28 44h8"/>
    </svg>`
  },
  {
    id: 'comp-stack',
    name: 'Stack',
    domain: 'engineering',
    category: 'data-structures',
    tags: ['stack', 'LIFO', 'push', 'pop', 'data'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="10" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="16" y="20" width="32" height="10" rx="2"/>
      <rect x="16" y="32" width="32" height="10" rx="2"/>
      <rect x="16" y="44" width="32" height="10" rx="2"/>
      <path d="M8 8v-4h4"/>
      <path d="M52 8h4v4"/>
      <text x="4" y="16" font-size="4" fill="currentColor" stroke="none">TOP</text>
    </svg>`
  },
  {
    id: 'comp-queue',
    name: 'Queue',
    domain: 'engineering',
    category: 'data-structures',
    tags: ['queue', 'FIFO', 'enqueue', 'dequeue', 'data'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="10" height="16" rx="2"/>
      <rect x="20" y="24" width="10" height="16" rx="2"/>
      <rect x="32" y="24" width="10" height="16" rx="2"/>
      <rect x="44" y="24" width="10" height="16" rx="2" fill="currentColor" opacity="0.3"/>
      <path d="M4 32h4"/>
      <polygon points="4,32 8,29 8,35" fill="currentColor"/>
      <path d="M54 32h6"/>
      <polygon points="60,32 56,29 56,35" fill="currentColor"/>
      <text x="4" y="48" font-size="4" fill="currentColor" stroke="none">IN</text>
      <text x="52" y="48" font-size="4" fill="currentColor" stroke="none">OUT</text>
    </svg>`
  },
  {
    id: 'comp-heap',
    name: 'Heap',
    domain: 'engineering',
    category: 'data-structures',
    tags: ['heap', 'priority', 'queue', 'min', 'max'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="10" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="26" r="5"/>
      <circle cx="44" cy="26" r="5"/>
      <circle cx="12" cy="42" r="5"/>
      <circle cx="28" cy="42" r="5"/>
      <circle cx="36" cy="42" r="5"/>
      <circle cx="52" cy="42" r="5"/>
      <path d="M28 14l-5 8"/>
      <path d="M36 14l5 8"/>
      <path d="M17 30l-3 8"/>
      <path d="M23 30l3 8"/>
      <path d="M41 30l-3 8"/>
      <path d="M47 30l3 8"/>
      <text x="28" y="56" font-size="5" fill="currentColor" stroke="none">MIN</text>
    </svg>`
  },
  {
    id: 'comp-graph',
    name: 'Graph',
    domain: 'engineering',
    category: 'data-structures',
    tags: ['graph', 'node', 'edge', 'vertex', 'network'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="6" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="32" r="6"/>
      <circle cx="52" cy="32" r="6"/>
      <circle cx="20" cy="52" r="6"/>
      <circle cx="44" cy="52" r="6"/>
      <path d="M28 16l-12 12"/>
      <path d="M36 16l12 12"/>
      <path d="M16 36l2 12"/>
      <path d="M48 36l-2 12"/>
      <path d="M26 52h12"/>
      <path d="M18 32h28"/>
    </svg>`
  },
  {
    id: 'comp-trie',
    name: 'Trie',
    domain: 'engineering',
    category: 'data-structures',
    tags: ['trie', 'prefix', 'tree', 'string', 'search'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="8" r="5"/>
      <circle cx="16" cy="24" r="4"/>
      <circle cx="32" cy="24" r="4"/>
      <circle cx="48" cy="24" r="4"/>
      <circle cx="8" cy="40" r="4"/>
      <circle cx="24" cy="40" r="4"/>
      <circle cx="40" cy="40" r="4"/>
      <circle cx="56" cy="40" r="4"/>
      <circle cx="8" cy="56" r="3" fill="currentColor" opacity="0.3"/>
      <circle cx="24" cy="56" r="3" fill="currentColor" opacity="0.3"/>
      <path d="M29 12l-10 8"/>
      <path d="M32 13v7"/>
      <path d="M35 12l10 8"/>
      <path d="M13 27l-3 10"/>
      <path d="M19 27l3 10"/>
      <path d="M45 27l-3 10"/>
      <path d="M51 27l3 10"/>
      <path d="M8 44v8"/>
      <path d="M24 44v8"/>
    </svg>`
  },
  {
    id: 'comp-btree',
    name: 'B-Tree',
    domain: 'engineering',
    category: 'data-structures',
    tags: ['B-tree', 'balanced', 'database', 'index', 'storage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="8" width="32" height="12" rx="2"/>
      <path d="M24 8v12"/>
      <path d="M32 8v12"/>
      <path d="M40 8v12"/>
      <rect x="4" y="44" width="24" height="12" rx="2"/>
      <path d="M10 44v12"/>
      <path d="M16 44v12"/>
      <path d="M22 44v12"/>
      <rect x="36" y="44" width="24" height="12" rx="2"/>
      <path d="M42 44v12"/>
      <path d="M48 44v12"/>
      <path d="M54 44v12"/>
      <path d="M20 20l-4 24"/>
      <path d="M44 20l4 24"/>
    </svg>`
  },

  // ===========================================================================
  // ALGORITHMS
  // ===========================================================================
  {
    id: 'comp-sorting',
    name: 'Sorting Algorithm',
    domain: 'engineering',
    category: 'algorithms',
    tags: ['sort', 'algorithm', 'order', 'quicksort', 'mergesort'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="44" width="8" height="12"/>
      <rect x="18" y="36" width="8" height="20"/>
      <rect x="28" y="28" width="8" height="28"/>
      <rect x="38" y="20" width="8" height="36"/>
      <rect x="48" y="12" width="8" height="44"/>
      <path d="M4 8l4-4 4 4"/>
      <path d="M8 4v8"/>
    </svg>`
  },
  {
    id: 'comp-searching',
    name: 'Search Algorithm',
    domain: 'engineering',
    category: 'algorithms',
    tags: ['search', 'binary', 'linear', 'find', 'algorithm'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="12" rx="2"/>
      <path d="M16 28v12"/>
      <path d="M24 28v12"/>
      <path d="M32 28v12"/>
      <path d="M40 28v12"/>
      <path d="M48 28v12"/>
      <circle cx="36" cy="14" r="8"/>
      <path d="M42 20l6 6"/>
      <path d="M36 22v6"/>
      <polygon points="36,28 33,24 39,24" fill="currentColor"/>
      <rect x="32" y="28" width="8" height="12" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'comp-recursion',
    name: 'Recursion',
    domain: 'engineering',
    category: 'algorithms',
    tags: ['recursion', 'recursive', 'self-reference', 'algorithm', 'function'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="4" width="56" height="56" rx="4"/>
      <rect x="12" y="12" width="40" height="40" rx="3"/>
      <rect x="20" y="20" width="24" height="24" rx="2"/>
      <rect x="28" y="28" width="8" height="8" rx="1" fill="currentColor" opacity="0.3"/>
      <path d="M50 8c4 4 4 8 0 12"/>
    </svg>`
  },
  {
    id: 'comp-dynamic-programming',
    name: 'Dynamic Programming',
    domain: 'engineering',
    category: 'algorithms',
    tags: ['dynamic', 'programming', 'memoization', 'DP', 'optimization'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="12" height="12" rx="2"/>
      <rect x="24" y="8" width="12" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="40" y="8" width="12" height="12" rx="2"/>
      <rect x="8" y="24" width="12" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="24" width="12" height="12" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="40" y="24" width="12" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="8" y="40" width="12" height="12" rx="2"/>
      <rect x="24" y="40" width="12" height="12" rx="2" fill="currentColor" opacity="0.2"/>
      <rect x="40" y="40" width="12" height="12" rx="2" fill="currentColor" opacity="0.4"/>
      <path d="M20 14h4"/>
      <path d="M36 14h4"/>
      <path d="M14 20v4"/>
      <path d="M30 20v4"/>
      <path d="M46 20v4"/>
    </svg>`
  },
  {
    id: 'comp-big-o',
    name: 'Big O Notation',
    domain: 'engineering',
    category: 'algorithms',
    tags: ['big-o', 'complexity', 'time', 'space', 'analysis'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 56h48"/>
      <path d="M8 56V8"/>
      <path d="M12 52h4"/>
      <path d="M8 48h4"/>
      <path d="M8 32h4"/>
      <path d="M8 16h4"/>
      <path d="M12 52c4-2 8-4 12-8s8-8 12-16 8-12 16-16"/>
      <path d="M12 48c8-2 16-4 24-8s12-6 16-8" stroke-dasharray="2 2"/>
      <text x="44" y="12" font-size="8" fill="currentColor" stroke="none">O(n)</text>
    </svg>`
  },
  {
    id: 'comp-pathfinding',
    name: 'Pathfinding',
    domain: 'engineering',
    category: 'algorithms',
    tags: ['pathfinding', 'A*', 'Dijkstra', 'BFS', 'shortest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <circle cx="16" cy="16" r="4" fill="currentColor"/>
      <circle cx="48" cy="48" r="4"/>
      <rect x="24" y="16" width="8" height="16" fill="currentColor" opacity="0.3"/>
      <rect x="32" y="32" width="16" height="8" fill="currentColor" opacity="0.3"/>
      <path d="M20 16h4"/>
      <path d="M16 20v12"/>
      <path d="M16 32h8"/>
      <path d="M24 32v8"/>
      <path d="M24 40h24"/>
      <path d="M48 40v4"/>
      <circle cx="16" cy="32" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="24" cy="40" r="2" fill="currentColor" opacity="0.5"/>
    </svg>`
  },

  // ===========================================================================
  // CLOUD COMPUTING
  // ===========================================================================
  {
    id: 'comp-cloud-server',
    name: 'Cloud Server',
    domain: 'engineering',
    category: 'cloud',
    tags: ['cloud', 'server', 'AWS', 'Azure', 'GCP'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 40c-6 0-10-4-10-10 0-5 4-9 9-10 1-6 6-10 12-10 7 0 13 5 14 12 5 1 9 5 9 10 0 5-4 8-8 8z" fill="currentColor" opacity="0.1"/>
      <path d="M16 40c-6 0-10-4-10-10 0-5 4-9 9-10 1-6 6-10 12-10 7 0 13 5 14 12 5 1 9 5 9 10 0 5-4 8-8 8z"/>
      <rect x="20" y="44" width="24" height="14" rx="2"/>
      <circle cx="28" cy="51" r="2" fill="currentColor" opacity="0.5"/>
      <path d="M34 51h6"/>
    </svg>`
  },
  {
    id: 'comp-container',
    name: 'Container',
    domain: 'engineering',
    category: 'cloud',
    tags: ['container', 'Docker', 'pod', 'virtualization', 'image'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="48" height="32" rx="2"/>
      <rect x="12" y="20" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="24" y="20" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="36" y="20" width="10" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="12" y="32" width="10" height="10" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="32" width="10" height="10" fill="currentColor" opacity="0.2"/>
      <path d="M48 20v22"/>
      <circle cx="52" cy="26" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-kubernetes',
    name: 'Kubernetes',
    domain: 'engineering',
    category: 'cloud',
    tags: ['kubernetes', 'k8s', 'orchestration', 'container', 'cluster'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="24"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.2"/>
      <path d="M32 8v16"/>
      <path d="M32 40v16"/>
      <path d="M8 32h16"/>
      <path d="M40 32h16"/>
      <path d="M15 15l12 12"/>
      <path d="M37 37l12 12"/>
      <path d="M49 15l-12 12"/>
      <path d="M27 37l-12 12"/>
    </svg>`
  },
  {
    id: 'comp-load-balancer',
    name: 'Load Balancer',
    domain: 'engineering',
    category: 'cloud',
    tags: ['load', 'balancer', 'traffic', 'distribution', 'scaling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="16" rx="16" ry="8"/>
      <rect x="12" y="40" width="12" height="16" rx="2"/>
      <rect x="26" y="40" width="12" height="16" rx="2"/>
      <rect x="40" y="40" width="12" height="16" rx="2"/>
      <path d="M24 22l-6 18"/>
      <path d="M32 24v16"/>
      <path d="M40 22l6 18"/>
      <circle cx="18" cy="46" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="46" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="46" cy="46" r="2" fill="currentColor" opacity="0.5"/>
    </svg>`
  },
  {
    id: 'comp-serverless',
    name: 'Serverless',
    domain: 'engineering',
    category: 'cloud',
    tags: ['serverless', 'lambda', 'function', 'FaaS', 'event'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 8l20 12v24l-20 12-20-12V20z" fill="currentColor" opacity="0.1"/>
      <path d="M32 8l20 12v24l-20 12-20-12V20z"/>
      <path d="M32 8v16"/>
      <path d="M12 20l20 12"/>
      <path d="M52 20l-20 12"/>
      <path d="M32 32v24"/>
      <circle cx="32" cy="32" r="6"/>
      <path d="M30 30l4 4"/>
      <path d="M34 30l-4 4"/>
    </svg>`
  },
  {
    id: 'comp-cdn',
    name: 'CDN',
    domain: 'engineering',
    category: 'cloud',
    tags: ['CDN', 'content', 'delivery', 'network', 'cache'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <ellipse cx="32" cy="32" rx="20" ry="8"/>
      <ellipse cx="32" cy="32" rx="8" ry="20"/>
      <circle cx="32" cy="12" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="12" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="52" cy="32" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="52" r="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'comp-api-gateway',
    name: 'API Gateway',
    domain: 'engineering',
    category: 'cloud',
    tags: ['API', 'gateway', 'REST', 'endpoint', 'routing'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="12" width="16" height="40" rx="2"/>
      <path d="M24 20h16"/>
      <path d="M24 28h16"/>
      <path d="M24 36h16"/>
      <path d="M24 44h16"/>
      <path d="M8 20h16"/>
      <path d="M8 32h16"/>
      <path d="M8 44h16"/>
      <path d="M40 20h16"/>
      <path d="M40 32h16"/>
      <path d="M40 44h16"/>
      <circle cx="8" cy="20" r="2" fill="currentColor"/>
      <circle cx="8" cy="32" r="2" fill="currentColor"/>
      <circle cx="8" cy="44" r="2" fill="currentColor"/>
      <circle cx="56" cy="20" r="2"/>
      <circle cx="56" cy="32" r="2"/>
      <circle cx="56" cy="44" r="2"/>
    </svg>`
  },

  // ===========================================================================
  // DATABASES
  // ===========================================================================
  {
    id: 'comp-database',
    name: 'Database',
    domain: 'engineering',
    category: 'databases',
    tags: ['database', 'DB', 'storage', 'data', 'SQL'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="32" cy="14" rx="20" ry="8"/>
      <path d="M12 14v36c0 4 9 8 20 8s20-4 20-8V14"/>
      <path d="M12 26c0 4 9 8 20 8s20-4 20-8"/>
      <path d="M12 38c0 4 9 8 20 8s20-4 20-8"/>
    </svg>`
  },
  {
    id: 'comp-nosql',
    name: 'NoSQL Database',
    domain: 'engineering',
    category: 'databases',
    tags: ['NoSQL', 'MongoDB', 'document', 'key-value', 'database'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="20" rx="2"/>
      <rect x="36" y="8" width="20" height="20" rx="2"/>
      <rect x="8" y="36" width="20" height="20" rx="2"/>
      <rect x="36" y="36" width="20" height="20" rx="2"/>
      <path d="M12 12h12"/>
      <path d="M12 16h8"/>
      <path d="M40 12h12"/>
      <path d="M40 16h8"/>
      <path d="M40 20h6"/>
      <path d="M12 40h12"/>
      <path d="M12 44h8"/>
      <path d="M40 40h12"/>
      <path d="M40 48h8"/>
    </svg>`
  },
  {
    id: 'comp-table',
    name: 'Database Table',
    domain: 'engineering',
    category: 'databases',
    tags: ['table', 'schema', 'rows', 'columns', 'SQL'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <path d="M8 20h48"/>
      <path d="M8 32h48"/>
      <path d="M8 44h48"/>
      <path d="M24 8v48"/>
      <path d="M40 8v48"/>
      <rect x="10" y="10" width="12" height="8" fill="currentColor" opacity="0.2"/>
      <rect x="26" y="10" width="12" height="8" fill="currentColor" opacity="0.2"/>
      <rect x="42" y="10" width="12" height="8" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'comp-index',
    name: 'Database Index',
    domain: 'engineering',
    category: 'databases',
    tags: ['index', 'B-tree', 'query', 'performance', 'database'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="20" height="48" rx="2"/>
      <path d="M8 16h20"/>
      <path d="M8 24h20"/>
      <path d="M8 32h20"/>
      <path d="M8 40h20"/>
      <path d="M8 48h20"/>
      <circle cx="14" cy="12" r="2" fill="currentColor"/>
      <rect x="36" y="20" width="20" height="24" rx="2"/>
      <path d="M36 28h20"/>
      <path d="M36 36h20"/>
      <path d="M28 12h8"/>
      <path d="M28 28h8"/>
      <path d="M28 44h8"/>
      <polygon points="36,12 33,10 33,14" fill="currentColor"/>
      <polygon points="36,28 33,26 33,30" fill="currentColor"/>
      <polygon points="36,44 33,42 33,46" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-query',
    name: 'SQL Query',
    domain: 'engineering',
    category: 'databases',
    tags: ['query', 'SQL', 'SELECT', 'join', 'filter'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="32" rx="2"/>
      <text x="12" y="20" font-size="6" fill="currentColor" stroke="none">SELECT *</text>
      <text x="12" y="28" font-size="6" fill="currentColor" stroke="none">FROM users</text>
      <text x="12" y="36" font-size="6" fill="currentColor" stroke="none">WHERE id=1</text>
      <path d="M8 48h48"/>
      <circle cx="16" cy="48" r="2" fill="currentColor"/>
      <path d="M20 48l24 0"/>
      <polygon points="44,48 40,45 40,51" fill="currentColor"/>
      <ellipse cx="52" cy="48" rx="4" ry="6"/>
    </svg>`
  },
  {
    id: 'comp-replication',
    name: 'Database Replication',
    domain: 'engineering',
    category: 'databases',
    tags: ['replication', 'master', 'slave', 'sync', 'backup'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="20" cy="20" rx="12" ry="6"/>
      <path d="M8 20v16c0 3 5 6 12 6s12-3 12-6V20"/>
      <ellipse cx="44" cy="38" rx="12" ry="6"/>
      <path d="M32 38v16c0 3 5 6 12 6s12-3 12-6V38"/>
      <path d="M24 32l8 6"/>
      <polygon points="32,38 28,35 30,40" fill="currentColor"/>
      <circle cx="20" cy="16" r="2" fill="currentColor"/>
    </svg>`
  },

  // ===========================================================================
  // AI / MACHINE LEARNING
  // ===========================================================================
  {
    id: 'comp-neural-network',
    name: 'Neural Network',
    domain: 'engineering',
    category: 'ai-ml',
    tags: ['neural', 'network', 'AI', 'deep', 'learning'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="16" r="4"/>
      <circle cx="12" cy="32" r="4"/>
      <circle cx="12" cy="48" r="4"/>
      <circle cx="32" cy="12" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="28" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="44" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="32" cy="60" r="4" fill="currentColor" opacity="0.2"/>
      <circle cx="52" cy="24" r="4"/>
      <circle cx="52" cy="40" r="4"/>
      <path d="M16 16l12-4"/>
      <path d="M16 16l12 12"/>
      <path d="M16 32l12-20"/>
      <path d="M16 32l12-4"/>
      <path d="M16 32l12 12"/>
      <path d="M16 32l12 28"/>
      <path d="M16 48l12-20"/>
      <path d="M16 48l12-4"/>
      <path d="M16 48l12 12"/>
      <path d="M36 12l12 12"/>
      <path d="M36 28l12-4"/>
      <path d="M36 28l12 12"/>
      <path d="M36 44l12-20"/>
      <path d="M36 44l12-4"/>
      <path d="M36 60l12-20"/>
    </svg>`
  },
  {
    id: 'comp-deep-learning',
    name: 'Deep Learning',
    domain: 'engineering',
    category: 'ai-ml',
    tags: ['deep', 'learning', 'CNN', 'RNN', 'transformer'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="24" width="8" height="16" rx="1" fill="currentColor" opacity="0.3"/>
      <rect x="14" y="20" width="8" height="24" rx="1" fill="currentColor" opacity="0.25"/>
      <rect x="24" y="16" width="8" height="32" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="34" y="12" width="8" height="40" rx="1" fill="currentColor" opacity="0.15"/>
      <rect x="44" y="8" width="8" height="48" rx="1" fill="currentColor" opacity="0.1"/>
      <rect x="54" y="24" width="6" height="16" rx="1"/>
      <path d="M12 32h2"/>
      <path d="M22 32h2"/>
      <path d="M32 32h2"/>
      <path d="M42 32h2"/>
      <path d="M52 32h2"/>
    </svg>`
  },
  {
    id: 'comp-ml-model',
    name: 'ML Model',
    domain: 'engineering',
    category: 'ai-ml',
    tags: ['model', 'machine', 'learning', 'training', 'prediction'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="16" y="16" width="32" height="32" rx="4" fill="currentColor" opacity="0.1"/>
      <rect x="16" y="16" width="32" height="32" rx="4"/>
      <path d="M24 28l4 4 8-8"/>
      <path d="M24 40h16"/>
      <path d="M8 24h8"/>
      <path d="M8 32h8"/>
      <path d="M8 40h8"/>
      <path d="M48 32h8"/>
      <polygon points="8,24 12,22 12,26" fill="currentColor"/>
      <polygon points="8,32 12,30 12,34" fill="currentColor"/>
      <polygon points="8,40 12,38 12,42" fill="currentColor"/>
      <polygon points="56,32 52,30 52,34" fill="currentColor"/>
      <text x="24" y="44" font-size="5" fill="currentColor" stroke="none">MODEL</text>
    </svg>`
  },
  {
    id: 'comp-decision-tree-ml',
    name: 'Decision Tree ML',
    domain: 'engineering',
    category: 'ai-ml',
    tags: ['decision', 'tree', 'classification', 'random', 'forest'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="24" y="4" width="16" height="10" rx="2"/>
      <text x="28" y="12" font-size="5" fill="currentColor" stroke="none">x>5?</text>
      <path d="M28 14l-12 12"/>
      <path d="M36 14l12 12"/>
      <rect x="8" y="26" width="12" height="10" rx="2"/>
      <rect x="44" y="26" width="12" height="10" rx="2"/>
      <path d="M12 36l-4 10"/>
      <path d="M16 36l4 10"/>
      <path d="M48 36l-4 10"/>
      <path d="M52 36l4 10"/>
      <circle cx="8" cy="50" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="20" cy="50" r="4"/>
      <circle cx="44" cy="50" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="56" cy="50" r="4"/>
    </svg>`
  },
  {
    id: 'comp-clustering',
    name: 'Clustering',
    domain: 'engineering',
    category: 'ai-ml',
    tags: ['clustering', 'k-means', 'unsupervised', 'groups', 'segmentation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="20" r="12" stroke-dasharray="3 2"/>
      <circle cx="12" cy="18" r="2" fill="currentColor"/>
      <circle cx="18" cy="16" r="2" fill="currentColor"/>
      <circle cx="16" cy="24" r="2" fill="currentColor"/>
      <circle cx="20" cy="22" r="2" fill="currentColor"/>
      <circle cx="44" cy="24" r="10" stroke-dasharray="3 2"/>
      <circle cx="42" cy="22" r="2" fill="currentColor" opacity="0.6"/>
      <circle cx="46" cy="26" r="2" fill="currentColor" opacity="0.6"/>
      <circle cx="44" cy="20" r="2" fill="currentColor" opacity="0.6"/>
      <circle cx="32" cy="48" r="10" stroke-dasharray="3 2"/>
      <circle cx="30" cy="46" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="34" cy="50" r="2" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="44" r="2" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'comp-tensor',
    name: 'Tensor',
    domain: 'engineering',
    category: 'ai-ml',
    tags: ['tensor', 'matrix', 'array', 'TensorFlow', 'PyTorch'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="24" height="24"/>
      <rect x="16" y="16" width="24" height="24" fill="currentColor" opacity="0.1"/>
      <rect x="24" y="8" width="24" height="24" fill="currentColor" opacity="0.2"/>
      <path d="M8 24l8-8"/>
      <path d="M32 24l8-8"/>
      <path d="M8 48l8-8"/>
      <path d="M32 48l8-8"/>
      <path d="M32 24v24"/>
      <path d="M48 8v24"/>
    </svg>`
  },

  // ===========================================================================
  // SOFTWARE ARCHITECTURE
  // ===========================================================================
  {
    id: 'comp-microservices',
    name: 'Microservices',
    domain: 'engineering',
    category: 'architecture',
    tags: ['microservices', 'distributed', 'services', 'SOA', 'API'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="16" height="16" rx="2"/>
      <rect x="24" y="8" width="16" height="16" rx="2"/>
      <rect x="44" y="8" width="16" height="16" rx="2"/>
      <rect x="4" y="40" width="16" height="16" rx="2"/>
      <rect x="24" y="40" width="16" height="16" rx="2"/>
      <rect x="44" y="40" width="16" height="16" rx="2"/>
      <path d="M12 24v16"/>
      <path d="M32 24v16"/>
      <path d="M52 24v16"/>
      <path d="M20 32h4"/>
      <path d="M40 32h4"/>
      <path d="M20 16l4-4h16"/>
      <path d="M40 16l4-4"/>
    </svg>`
  },
  {
    id: 'comp-message-queue',
    name: 'Message Queue',
    domain: 'engineering',
    category: 'architecture',
    tags: ['queue', 'message', 'RabbitMQ', 'Kafka', 'async'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="20" y="20" width="24" height="24" rx="2"/>
      <rect x="24" y="24" width="16" height="4" fill="currentColor" opacity="0.3"/>
      <rect x="24" y="30" width="16" height="4" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="36" width="16" height="4" fill="currentColor" opacity="0.1"/>
      <path d="M8 28h12"/>
      <path d="M8 36h12"/>
      <polygon points="20,28 16,26 16,30" fill="currentColor"/>
      <polygon points="20,36 16,34 16,38" fill="currentColor"/>
      <path d="M44 32h12"/>
      <polygon points="56,32 52,30 52,34" fill="currentColor"/>
      <circle cx="8" cy="28" r="2"/>
      <circle cx="8" cy="36" r="2"/>
    </svg>`
  },
  {
    id: 'comp-event-bus',
    name: 'Event Bus',
    domain: 'engineering',
    category: 'architecture',
    tags: ['event', 'bus', 'pub-sub', 'publish', 'subscribe'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="28" width="48" height="8" rx="2" fill="currentColor" opacity="0.1"/>
      <rect x="8" y="28" width="48" height="8" rx="2"/>
      <rect x="12" y="8" width="12" height="12" rx="2"/>
      <rect x="40" y="8" width="12" height="12" rx="2"/>
      <rect x="12" y="44" width="12" height="12" rx="2"/>
      <rect x="40" y="44" width="12" height="12" rx="2"/>
      <path d="M18 20v8"/>
      <path d="M46 20v8"/>
      <path d="M18 36v8"/>
      <path d="M46 36v8"/>
      <circle cx="18" cy="32" r="2" fill="currentColor"/>
      <circle cx="32" cy="32" r="2" fill="currentColor"/>
      <circle cx="46" cy="32" r="2" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-monolith',
    name: 'Monolith',
    domain: 'engineering',
    category: 'architecture',
    tags: ['monolith', 'single', 'application', 'traditional', 'architecture'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="4"/>
      <path d="M12 20h40"/>
      <path d="M12 32h40"/>
      <path d="M12 44h40"/>
      <text x="20" y="16" font-size="5" fill="currentColor" stroke="none">UI Layer</text>
      <text x="18" y="28" font-size="5" fill="currentColor" stroke="none">Business</text>
      <text x="22" y="40" font-size="5" fill="currentColor" stroke="none">Data</text>
      <text x="24" y="52" font-size="5" fill="currentColor" stroke="none">DB</text>
    </svg>`
  },
  {
    id: 'comp-cicd',
    name: 'CI/CD Pipeline',
    domain: 'engineering',
    category: 'architecture',
    tags: ['CI', 'CD', 'pipeline', 'deploy', 'automation'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="32" r="8"/>
      <rect x="24" y="24" width="16" height="16" rx="2"/>
      <polygon points="52,32 44,24 44,40"/>
      <path d="M20 32h4"/>
      <path d="M40 32h4"/>
      <text x="8" y="34" font-size="4" fill="currentColor" stroke="none">SRC</text>
      <text x="26" y="34" font-size="4" fill="currentColor" stroke="none">BUILD</text>
      <circle cx="12" cy="32" r="4" fill="currentColor" opacity="0.2"/>
      <path d="M12 8v16"/>
      <path d="M32 8v16"/>
      <path d="M52 8v16"/>
      <circle cx="12" cy="8" r="2"/>
      <circle cx="32" cy="8" r="2"/>
      <circle cx="52" cy="8" r="2"/>
    </svg>`
  },

  // ===========================================================================
  // CYBERSECURITY
  // ===========================================================================
  {
    id: 'comp-encryption',
    name: 'Encryption',
    domain: 'engineering',
    category: 'security',
    tags: ['encryption', 'AES', 'RSA', 'cipher', 'secure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="24" width="16" height="20" rx="2"/>
      <text x="12" y="38" font-size="6" fill="currentColor" stroke="none">abc</text>
      <rect x="40" y="24" width="16" height="20" rx="2" fill="currentColor" opacity="0.1"/>
      <text x="44" y="38" font-size="6" fill="currentColor" stroke="none">%#@</text>
      <path d="M24 34h16"/>
      <polygon points="40,34 36,31 36,37" fill="currentColor"/>
      <rect x="28" y="8" width="8" height="12" rx="1"/>
      <circle cx="32" cy="14" r="3"/>
      <path d="M32 14v2"/>
    </svg>`
  },
  {
    id: 'comp-key',
    name: 'Cryptographic Key',
    domain: 'engineering',
    category: 'security',
    tags: ['key', 'public', 'private', 'asymmetric', 'crypto'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="20" cy="32" r="12"/>
      <circle cx="20" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      <path d="M30 32h26"/>
      <path d="M48 32v8"/>
      <path d="M54 32v12"/>
      <path d="M40 32v6"/>
    </svg>`
  },
  {
    id: 'comp-certificate',
    name: 'SSL Certificate',
    domain: 'engineering',
    category: 'security',
    tags: ['certificate', 'SSL', 'TLS', 'HTTPS', 'secure'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="8" width="40" height="48" rx="2"/>
      <circle cx="32" cy="24" r="8"/>
      <path d="M28 24l3 3 5-6"/>
      <path d="M20 40h24"/>
      <path d="M20 46h24"/>
      <path d="M32 36v-4"/>
      <path d="M28 52l4-4 4 4"/>
    </svg>`
  },
  {
    id: 'comp-authentication',
    name: 'Authentication',
    domain: 'engineering',
    category: 'security',
    tags: ['auth', 'login', 'OAuth', 'JWT', 'identity'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="20" r="10"/>
      <path d="M18 48c0-8 6-14 14-14s14 6 14 14"/>
      <rect x="24" y="52" width="16" height="8" rx="2"/>
      <circle cx="32" cy="56" r="2" fill="currentColor"/>
      <path d="M28 24l3 3 5-6"/>
    </svg>`
  },
  {
    id: 'comp-2fa',
    name: 'Two-Factor Auth',
    domain: 'engineering',
    category: 'security',
    tags: ['2FA', 'MFA', 'OTP', 'authenticator', 'security'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="16" width="20" height="32" rx="2"/>
      <rect x="12" y="20" width="12" height="20"/>
      <circle cx="18" cy="42" r="2"/>
      <rect x="36" y="24" width="20" height="16" rx="2"/>
      <path d="M40 32h4"/>
      <path d="M46 32h2"/>
      <path d="M50 32h2"/>
      <path d="M28 32h8"/>
      <text x="40" y="36" font-size="5" fill="currentColor" stroke="none">123</text>
    </svg>`
  },
  {
    id: 'comp-shield',
    name: 'Security Shield',
    domain: 'engineering',
    category: 'security',
    tags: ['shield', 'protection', 'defense', 'security', 'guard'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M32 4L8 16v16c0 16 10 24 24 32 14-8 24-16 24-32V16z" fill="currentColor" opacity="0.1"/>
      <path d="M32 4L8 16v16c0 16 10 24 24 32 14-8 24-16 24-32V16z"/>
      <path d="M24 32l6 6 10-12"/>
    </svg>`
  },

  // ===========================================================================
  // OPERATING SYSTEMS
  // ===========================================================================
  {
    id: 'comp-process',
    name: 'Process',
    domain: 'engineering',
    category: 'os',
    tags: ['process', 'PID', 'running', 'task', 'execution'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="12" y="12" width="40" height="40" rx="4"/>
      <rect x="16" y="16" width="32" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="16" y="28" width="20" height="6"/>
      <rect x="16" y="38" width="28" height="6"/>
      <rect x="16" y="48" width="16" height="4"/>
      <circle cx="44" cy="48" r="4"/>
      <path d="M44 46v4"/>
      <path d="M42 48h4"/>
    </svg>`
  },
  {
    id: 'comp-thread',
    name: 'Thread',
    domain: 'engineering',
    category: 'os',
    tags: ['thread', 'concurrent', 'parallel', 'execution', 'lightweight'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="12" r="8"/>
      <path d="M32 20v8"/>
      <path d="M32 28l-16 28"/>
      <path d="M32 28v28"/>
      <path d="M32 28l16 28"/>
      <circle cx="16" cy="56" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="32" cy="56" r="4" fill="currentColor" opacity="0.3"/>
      <circle cx="48" cy="56" r="4" fill="currentColor" opacity="0.3"/>
    </svg>`
  },
  {
    id: 'comp-scheduler',
    name: 'Scheduler',
    domain: 'engineering',
    category: 'os',
    tags: ['scheduler', 'CPU', 'queue', 'priority', 'scheduling'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="24" height="48" rx="2"/>
      <rect x="12" y="12" width="16" height="8" fill="currentColor" opacity="0.4"/>
      <rect x="12" y="24" width="16" height="8" fill="currentColor" opacity="0.3"/>
      <rect x="12" y="36" width="16" height="8" fill="currentColor" opacity="0.2"/>
      <rect x="40" y="24" width="16" height="16" rx="2"/>
      <path d="M32 32h8"/>
      <polygon points="40,32 36,30 36,34" fill="currentColor"/>
      <text x="42" y="34" font-size="5" fill="currentColor" stroke="none">CPU</text>
      <path d="M8 8l-4-4"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>`
  },
  {
    id: 'comp-filesystem',
    name: 'File System',
    domain: 'engineering',
    category: 'os',
    tags: ['filesystem', 'directory', 'inode', 'storage', 'files'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 8h16l4 4h28v44H8z"/>
      <path d="M8 16h48"/>
      <rect x="12" y="24" width="12" height="12" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="28" y="24" width="12" height="12" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="44" y="24" width="8" height="12" rx="1"/>
      <rect x="12" y="40" width="8" height="12" rx="1"/>
      <rect x="24" y="40" width="8" height="12" rx="1"/>
    </svg>`
  },
  {
    id: 'comp-kernel',
    name: 'Kernel',
    domain: 'engineering',
    category: 'os',
    tags: ['kernel', 'OS', 'core', 'system', 'privileged'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="28"/>
      <circle cx="32" cy="32" r="18" fill="currentColor" opacity="0.1"/>
      <circle cx="32" cy="32" r="8" fill="currentColor" opacity="0.3"/>
      <text x="20" y="34" font-size="5" fill="currentColor" stroke="none">KERNEL</text>
      <path d="M32 4v10"/>
      <path d="M32 50v10"/>
      <path d="M4 32h10"/>
      <path d="M50 32h10"/>
    </svg>`
  },
  {
    id: 'comp-memory-management',
    name: 'Memory Management',
    domain: 'engineering',
    category: 'os',
    tags: ['memory', 'management', 'allocation', 'paging', 'virtual'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <rect x="12" y="12" width="10" height="10" fill="currentColor" opacity="0.4"/>
      <rect x="24" y="12" width="10" height="10" fill="currentColor" opacity="0.2"/>
      <rect x="36" y="12" width="16" height="10"/>
      <rect x="12" y="24" width="16" height="10" fill="currentColor" opacity="0.3"/>
      <rect x="30" y="24" width="22" height="10"/>
      <rect x="12" y="36" width="10" height="16" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="36" width="28" height="8"/>
      <rect x="24" y="46" width="16" height="6" fill="currentColor" opacity="0.1"/>
    </svg>`
  },

  // ===========================================================================
  // WEB & PROGRAMMING
  // ===========================================================================
  {
    id: 'comp-browser',
    name: 'Web Browser',
    domain: 'engineering',
    category: 'web',
    tags: ['browser', 'web', 'Chrome', 'Firefox', 'Safari'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="4"/>
      <path d="M4 20h56"/>
      <circle cx="12" cy="14" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="14" r="2" fill="currentColor" opacity="0.5"/>
      <circle cx="28" cy="14" r="2" fill="currentColor" opacity="0.5"/>
      <rect x="36" y="12" width="20" height="4" rx="1"/>
      <rect x="8" y="24" width="48" height="28" rx="2"/>
    </svg>`
  },
  {
    id: 'comp-http',
    name: 'HTTP Request',
    domain: 'engineering',
    category: 'web',
    tags: ['HTTP', 'request', 'response', 'GET', 'POST'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="24" height="20" rx="2"/>
      <rect x="36" y="8" width="24" height="20" rx="2"/>
      <path d="M28 16h8"/>
      <polygon points="36,16 32,13 32,19" fill="currentColor"/>
      <path d="M36 20h-8"/>
      <polygon points="28,20 32,17 32,23" fill="currentColor"/>
      <text x="8" y="16" font-size="4" fill="currentColor" stroke="none">GET</text>
      <text x="40" y="16" font-size="4" fill="currentColor" stroke="none">200</text>
      <rect x="4" y="36" width="56" height="20" rx="2"/>
      <text x="8" y="48" font-size="5" fill="currentColor" stroke="none">{"data": "..."}</text>
    </svg>`
  },
  {
    id: 'comp-rest-api',
    name: 'REST API',
    domain: 'engineering',
    category: 'web',
    tags: ['REST', 'API', 'endpoint', 'CRUD', 'resource'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <path d="M8 20h48"/>
      <text x="12" y="16" font-size="5" fill="currentColor" stroke="none">/api/v1</text>
      <path d="M16 28h32"/>
      <path d="M16 36h32"/>
      <path d="M16 44h32"/>
      <text x="12" y="32" font-size="4" fill="currentColor" stroke="none">GET</text>
      <text x="12" y="40" font-size="4" fill="currentColor" stroke="none">POST</text>
      <text x="12" y="48" font-size="4" fill="currentColor" stroke="none">PUT</text>
      <rect x="24" y="26" width="24" height="4" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="34" width="20" height="4" rx="1" fill="currentColor" opacity="0.2"/>
      <rect x="24" y="42" width="16" height="4" rx="1" fill="currentColor" opacity="0.2"/>
    </svg>`
  },
  {
    id: 'comp-graphql',
    name: 'GraphQL',
    domain: 'engineering',
    category: 'web',
    tags: ['GraphQL', 'query', 'mutation', 'schema', 'API'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,4 56,18 56,46 32,60 8,46 8,18" fill="currentColor" opacity="0.1"/>
      <polygon points="32,4 56,18 56,46 32,60 8,46 8,18"/>
      <circle cx="32" cy="4" r="3" fill="currentColor"/>
      <circle cx="56" cy="18" r="3" fill="currentColor"/>
      <circle cx="56" cy="46" r="3" fill="currentColor"/>
      <circle cx="32" cy="60" r="3" fill="currentColor"/>
      <circle cx="8" cy="46" r="3" fill="currentColor"/>
      <circle cx="8" cy="18" r="3" fill="currentColor"/>
      <circle cx="32" cy="32" r="6"/>
    </svg>`
  },
  {
    id: 'comp-websocket',
    name: 'WebSocket',
    domain: 'engineering',
    category: 'web',
    tags: ['WebSocket', 'realtime', 'bidirectional', 'socket', 'connection'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="20" width="20" height="24" rx="2"/>
      <rect x="40" y="20" width="20" height="24" rx="2"/>
      <path d="M24 28h16"/>
      <path d="M24 36h16"/>
      <polygon points="40,28 36,26 36,30" fill="currentColor"/>
      <polygon points="24,36 28,34 28,38" fill="currentColor"/>
      <circle cx="14" cy="32" r="4"/>
      <circle cx="50" cy="32" r="4"/>
      <path d="M24 32h16" stroke-dasharray="2 2"/>
    </svg>`
  },
  {
    id: 'comp-function',
    name: 'Function',
    domain: 'engineering',
    category: 'programming',
    tags: ['function', 'method', 'procedure', 'subroutine', 'code'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="4"/>
      <text x="12" y="24" font-size="6" fill="currentColor" stroke="none">fn(x) {</text>
      <text x="16" y="36" font-size="6" fill="currentColor" stroke="none">return</text>
      <text x="16" y="48" font-size="6" fill="currentColor" stroke="none">x * 2</text>
      <text x="12" y="54" font-size="6" fill="currentColor" stroke="none">}</text>
      <path d="M8 28h4"/>
      <polygon points="8,28 4,26 4,30" fill="currentColor"/>
      <path d="M52 36h4"/>
      <polygon points="60,36 56,34 56,38" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'comp-class',
    name: 'Class',
    domain: 'engineering',
    category: 'programming',
    tags: ['class', 'OOP', 'object', 'type', 'blueprint'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="8" width="48" height="48" rx="2"/>
      <path d="M8 20h48"/>
      <path d="M8 40h48"/>
      <text x="20" y="16" font-size="6" fill="currentColor" stroke="none">ClassName</text>
      <text x="12" y="32" font-size="5" fill="currentColor" stroke="none">+ property</text>
      <text x="12" y="52" font-size="5" fill="currentColor" stroke="none">+ method()</text>
    </svg>`
  },
  {
    id: 'comp-variable',
    name: 'Variable',
    domain: 'engineering',
    category: 'programming',
    tags: ['variable', 'data', 'value', 'assignment', 'storage'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="20" width="48" height="24" rx="2"/>
      <text x="12" y="36" font-size="8" fill="currentColor" stroke="none">x = 42</text>
      <path d="M8 16l8-8"/>
      <path d="M8 16h8"/>
      <path d="M16 8v8"/>
    </svg>`
  },
  {
    id: 'comp-loop',
    name: 'Loop',
    domain: 'engineering',
    category: 'programming',
    tags: ['loop', 'for', 'while', 'iteration', 'repeat'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="32" cy="32" r="20"/>
      <path d="M32 12a20 20 0 0 1 17 10"/>
      <polygon points="49,22 52,18 46,17" fill="currentColor"/>
      <rect x="22" y="24" width="20" height="16" rx="2"/>
      <text x="26" y="34" font-size="5" fill="currentColor" stroke="none">i++</text>
    </svg>`
  },
  {
    id: 'comp-condition',
    name: 'Conditional',
    domain: 'engineering',
    category: 'programming',
    tags: ['if', 'else', 'condition', 'branch', 'decision'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="32,8 56,32 32,56 8,32" fill="currentColor" opacity="0.1"/>
      <polygon points="32,8 56,32 32,56 8,32"/>
      <text x="24" y="36" font-size="7" fill="currentColor" stroke="none">x>0</text>
      <path d="M56 32h6"/>
      <text x="58" y="28" font-size="5" fill="currentColor" stroke="none">Y</text>
      <path d="M32 56v6"/>
      <text x="36" y="62" font-size="5" fill="currentColor" stroke="none">N</text>
    </svg>`
  },
  {
    id: 'comp-git',
    name: 'Git',
    domain: 'engineering',
    category: 'programming',
    tags: ['git', 'version', 'control', 'branch', 'commit'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="16" cy="16" r="6" fill="currentColor" opacity="0.3"/>
      <circle cx="16" cy="48" r="6"/>
      <circle cx="48" cy="32" r="6" fill="currentColor" opacity="0.3"/>
      <path d="M16 22v20"/>
      <path d="M22 16h14c6 0 12 4 12 10v0"/>
      <path d="M42 32h-14c-6 0-12 4-12 10"/>
    </svg>`
  },
  {
    id: 'comp-terminal',
    name: 'Terminal',
    domain: 'engineering',
    category: 'programming',
    tags: ['terminal', 'CLI', 'command', 'shell', 'console'],
    svg: `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="8" width="56" height="48" rx="4"/>
      <path d="M4 20h56"/>
      <circle cx="12" cy="14" r="2" fill="currentColor"/>
      <circle cx="20" cy="14" r="2" fill="currentColor"/>
      <circle cx="28" cy="14" r="2" fill="currentColor"/>
      <path d="M12 32l8 6-8 6"/>
      <path d="M24 44h20"/>
    </svg>`
  }
];

export default computerIcons;
