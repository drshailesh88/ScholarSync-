/**
 * computer-science.ts
 * Computer Science color scheme for FINNISH scientific illustration
 *
 * Comprehensive color palette for computer science diagrams including:
 * - Data structures (blues and teals)
 * - Algorithms (greens and yellows)
 * - Cloud computing (sky blues)
 * - Databases (greens)
 * - AI/ML (purples and magentas)
 * - Cybersecurity (reds and oranges)
 * - Operating systems (grays)
 * - Programming concepts (primary colors)
 *
 * All colors are WCAG AA compliant for accessibility
 */

// =============================================================================
// PRIMARY PALETTE - Data Structures (Blues and Teals)
// =============================================================================

/**
 * Colors for data structure visualizations
 */
export const dataStructureColors = {
  /** Array/list elements */
  arrayElement: '#3B82F6',
  /** Array element alternate */
  arrayElementAlt: '#60A5FA',
  /** Linked list node */
  linkedListNode: '#0EA5E9',
  /** Linked list pointer */
  linkedListPointer: '#0284C7',
  /** Tree node */
  treeNode: '#14B8A6',
  /** Tree root node */
  treeRoot: '#0D9488',
  /** Tree leaf node */
  treeLeaf: '#5EEAD4',
  /** Graph vertex */
  graphVertex: '#06B6D4',
  /** Graph edge */
  graphEdge: '#22D3EE',
  /** Stack element */
  stackElement: '#0891B2',
  /** Queue element */
  queueElement: '#0E7490',
  /** Hash table bucket */
  hashBucket: '#155E75',
  /** Heap node */
  heapNode: '#164E63',
};

// =============================================================================
// SECONDARY PALETTE - Algorithms (Greens and Yellows)
// =============================================================================

/**
 * Colors for algorithm visualizations
 */
export const algorithmColors = {
  /** Current element being processed */
  currentElement: '#22C55E',
  /** Visited/processed element */
  visitedElement: '#86EFAC',
  /** Unvisited element */
  unvisitedElement: '#DCFCE7',
  /** Comparison highlight */
  comparisonHighlight: '#FCD34D',
  /** Swap operation */
  swapOperation: '#FBBF24',
  /** Pivot element */
  pivotElement: '#F59E0B',
  /** Merge operation */
  mergeOperation: '#16A34A',
  /** Divide operation */
  divideOperation: '#4ADE80',
  /** Optimal path */
  optimalPath: '#15803D',
  /** Suboptimal path */
  suboptimalPath: '#84CC16',
  /** Memoization cached */
  memoizedValue: '#A3E635',
  /** Recursive call */
  recursiveCall: '#65A30D',
};

// =============================================================================
// CLOUD COMPUTING PALETTE (Sky Blues)
// =============================================================================

/**
 * Colors for cloud architecture diagrams
 */
export const cloudColors = {
  /** Cloud provider background */
  cloudBackground: '#E0F2FE',
  /** Compute service */
  computeService: '#38BDF8',
  /** Container */
  container: '#0EA5E9',
  /** Kubernetes pod */
  kubernetesPod: '#0284C7',
  /** Serverless function */
  serverless: '#7DD3FC',
  /** Load balancer */
  loadBalancer: '#BAE6FD',
  /** CDN */
  cdn: '#E0F2FE',
  /** API Gateway */
  apiGateway: '#0369A1',
  /** VPC/Network */
  vpc: '#075985',
  /** Availability zone */
  availabilityZone: '#0C4A6E',
  /** Edge location */
  edgeLocation: '#F0F9FF',
  /** Auto-scaling */
  autoScaling: '#38BDF8',
};

// =============================================================================
// DATABASE PALETTE (Greens)
// =============================================================================

/**
 * Colors for database diagrams
 */
export const databaseColors = {
  /** Database primary */
  databasePrimary: '#10B981',
  /** Table */
  table: '#34D399',
  /** Primary key */
  primaryKey: '#059669',
  /** Foreign key */
  foreignKey: '#047857',
  /** Index */
  index: '#065F46',
  /** Column */
  column: '#6EE7B7',
  /** Row highlight */
  rowHighlight: '#A7F3D0',
  /** SQL keyword */
  sqlKeyword: '#064E3B',
  /** NoSQL document */
  nosqlDocument: '#14B8A6',
  /** Cache */
  cache: '#2DD4BF',
  /** Replication */
  replication: '#5EEAD4',
  /** Partition */
  partition: '#99F6E4',
};

// =============================================================================
// AI/ML PALETTE (Purples and Magentas)
// =============================================================================

/**
 * Colors for AI/ML architecture diagrams
 */
export const aiMlColors = {
  /** Neural network primary */
  neuralNetworkPrimary: '#8B5CF6',
  /** Input layer */
  inputLayer: '#A78BFA',
  /** Hidden layer */
  hiddenLayer: '#7C3AED',
  /** Output layer */
  outputLayer: '#6D28D9',
  /** Neuron */
  neuron: '#C4B5FD',
  /** Weight connection */
  weightConnection: '#DDD6FE',
  /** Activation function */
  activation: '#EDE9FE',
  /** Convolution layer */
  convolutionLayer: '#EC4899',
  /** Pooling layer */
  poolingLayer: '#F472B6',
  /** Attention mechanism */
  attention: '#DB2777',
  /** Loss/Error */
  loss: '#BE185D',
  /** Gradient */
  gradient: '#9D174D',
  /** Training data */
  trainingData: '#A855F7',
  /** Prediction */
  prediction: '#D946EF',
};

// =============================================================================
// CYBERSECURITY PALETTE (Reds and Oranges)
// =============================================================================

/**
 * Colors for security diagrams
 */
export const securityColors = {
  /** Security primary */
  securityPrimary: '#EF4444',
  /** Threat/Attack */
  threat: '#DC2626',
  /** Critical vulnerability */
  criticalVulnerability: '#B91C1C',
  /** High risk */
  highRisk: '#F97316',
  /** Medium risk */
  mediumRisk: '#FB923C',
  /** Low risk */
  lowRisk: '#FDBA74',
  /** Encryption */
  encryption: '#22C55E',
  /** Authentication */
  authentication: '#3B82F6',
  /** Firewall */
  firewall: '#F59E0B',
  /** Trust boundary */
  trustBoundary: '#A855F7',
  /** Secure zone */
  secureZone: '#10B981',
  /** DMZ */
  dmz: '#FCD34D',
  /** Untrusted zone */
  untrustedZone: '#FCA5A5',
};

// =============================================================================
// OPERATING SYSTEMS PALETTE (Grays)
// =============================================================================

/**
 * Colors for operating system diagrams
 */
export const osColors = {
  /** Kernel */
  kernel: '#374151',
  /** User space */
  userSpace: '#9CA3AF',
  /** Process */
  process: '#6B7280',
  /** Thread */
  thread: '#D1D5DB',
  /** Memory segment */
  memorySegment: '#4B5563',
  /** File system */
  fileSystem: '#1F2937',
  /** Device driver */
  deviceDriver: '#111827',
  /** System call */
  systemCall: '#E5E7EB',
  /** Interrupt */
  interrupt: '#F3F4F6',
  /** Scheduler */
  scheduler: '#6B7280',
  /** CPU */
  cpu: '#1F2937',
  /** I/O */
  io: '#9CA3AF',
};

// =============================================================================
// PROGRAMMING CONCEPTS PALETTE (Primary Colors)
// =============================================================================

/**
 * Colors for programming concept diagrams
 */
export const programmingColors = {
  /** Function/Method */
  function: '#3B82F6',
  /** Class */
  class: '#8B5CF6',
  /** Interface */
  interface: '#06B6D4',
  /** Variable */
  variable: '#22C55E',
  /** Constant */
  constant: '#14B8A6',
  /** Loop */
  loop: '#F59E0B',
  /** Conditional */
  conditional: '#EF4444',
  /** Return value */
  returnValue: '#10B981',
  /** Parameter */
  parameter: '#6366F1',
  /** Exception */
  exception: '#DC2626',
  /** Comment */
  comment: '#6B7280',
  /** String */
  string: '#F97316',
  /** Number */
  number: '#3B82F6',
  /** Boolean */
  boolean: '#8B5CF6',
};

// =============================================================================
// SOFTWARE ARCHITECTURE PALETTE
// =============================================================================

/**
 * Colors for software architecture diagrams
 */
export const architectureColors = {
  /** Microservice */
  microservice: '#3B82F6',
  /** API */
  api: '#8B5CF6',
  /** Message queue */
  messageQueue: '#F59E0B',
  /** Event bus */
  eventBus: '#EF4444',
  /** Gateway */
  gateway: '#06B6D4',
  /** Service mesh */
  serviceMesh: '#14B8A6',
  /** Circuit breaker */
  circuitBreaker: '#EC4899',
  /** Monolith */
  monolith: '#6B7280',
  /** Component */
  component: '#22C55E',
  /** Module */
  module: '#10B981',
  /** Package */
  package: '#059669',
  /** Dependency */
  dependency: '#6366F1',
};

// =============================================================================
// SEVERITY & STATUS GRADIENTS
// =============================================================================

/**
 * Severity gradient for risk/importance levels
 */
export const severityGradient = {
  critical: '#DC2626',
  high: '#F97316',
  medium: '#F59E0B',
  low: '#22C55E',
  info: '#3B82F6',
};

/**
 * Status colors for process/workflow states
 */
export const statusColors = {
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  pending: '#6B7280',
  running: '#8B5CF6',
  completed: '#10B981',
  failed: '#DC2626',
};

/**
 * Complexity notation colors
 */
export const complexityColors = {
  o1: '#22C55E',        // O(1) - Constant
  oLogN: '#84CC16',     // O(log n) - Logarithmic
  oN: '#F59E0B',        // O(n) - Linear
  oNLogN: '#F97316',    // O(n log n) - Linearithmic
  oN2: '#EF4444',       // O(n^2) - Quadratic
  oN3: '#DC2626',       // O(n^3) - Cubic
  o2N: '#B91C1C',       // O(2^n) - Exponential
  oNFactorial: '#7F1D1D', // O(n!) - Factorial
};

// =============================================================================
// FLOWCHART COLORS
// =============================================================================

/**
 * Standard flowchart element colors
 */
export const flowchartColors = {
  start: '#22C55E',
  end: '#EF4444',
  process: '#3B82F6',
  decision: '#F59E0B',
  input: '#8B5CF6',
  output: '#06B6D4',
  connector: '#6B7280',
  arrow: '#374151',
  subgraph: '#F3F4F6',
  annotation: '#9CA3AF',
};

// =============================================================================
// MAIN COLOR SCHEME EXPORT
// =============================================================================

/**
 * Complete computer science color scheme
 */
export interface ComputerScienceColorScheme {
  dataStructures: typeof dataStructureColors;
  algorithms: typeof algorithmColors;
  cloud: typeof cloudColors;
  database: typeof databaseColors;
  aiMl: typeof aiMlColors;
  security: typeof securityColors;
  os: typeof osColors;
  programming: typeof programmingColors;
  architecture: typeof architectureColors;
  severity: typeof severityGradient;
  status: typeof statusColors;
  complexity: typeof complexityColors;
  flowchart: typeof flowchartColors;
}

/**
 * Default computer science color scheme
 */
export const computerScienceColorScheme: ComputerScienceColorScheme = {
  dataStructures: dataStructureColors,
  algorithms: algorithmColors,
  cloud: cloudColors,
  database: databaseColors,
  aiMl: aiMlColors,
  security: securityColors,
  os: osColors,
  programming: programmingColors,
  architecture: architectureColors,
  severity: severityGradient,
  status: statusColors,
  complexity: complexityColors,
  flowchart: flowchartColors,
};

export default computerScienceColorScheme;
