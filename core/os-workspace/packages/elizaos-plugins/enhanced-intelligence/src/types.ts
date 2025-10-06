/**
 * @fileoverview Type definitions for Enhanced Intelligence Plugin
 * Provides comprehensive type safety for fuzzy logic, pattern recognition, and mathematical optimization
 */

import type { Vec2, Vec3 } from '@thi.ng/vectors';
import type { State, Memory, AgentRuntime } from '@elizaos/core';

/**
 * Fuzzy logic decision making types
 */
export interface FuzzyDecisionCriteria {
  value: number;           // Current value of the criterion
  weight: number;          // Importance weight (0-1)
  type: 'minimize' | 'maximize'; // Optimization direction
  fuzzySet?: FuzzySet;     // Optional custom fuzzy set
  uncertainty?: number;    // Uncertainty factor (0-1)
}

export interface FuzzySet {
  name: string;
  membershipFunction: (x: number) => number;
  universe: [number, number]; // [min, max] range
  linguisticTerms: LinguisticTerm[];
}

export interface LinguisticTerm {
  label: string;           // e.g., "low", "medium", "high"
  membershipFunction: (x: number) => number;
  range: [number, number]; // Typical range for this term
}

export interface FuzzyDecisionScenario {
  id: string;
  name: string;
  description: string;
  criteria: Record<string, FuzzyDecisionCriteria>;
  alternatives: string[];
  context?: any;           // Additional context data
  constraints?: DecisionConstraint[];
  timeCreated: number;
}

export interface DecisionConstraint {
  type: 'hard' | 'soft';
  criterion: string;
  operator: '<' | '>' | '=' | '<=' | '>=';
  value: number;
  penalty?: number;        // Penalty for soft constraint violation
}

export interface FuzzyDecisionResult {
  scenarioId: string;
  rankedAlternatives: AlternativeRanking[];
  confidenceScore: number;
  decisionReasoning: DecisionReasoning;
  optimizationMetrics: OptimizationMetrics;
  visualizationData?: DecisionVisualizationData;
  timestamp: number;
}

export interface AlternativeRanking {
  alternative: string;
  score: number;           // Overall score (0-1)
  fuzzyScore: number;      // Raw fuzzy logic score
  criteriaScores: Record<string, number>; // Individual criteria scores
  confidence: number;      // Confidence in this ranking
  riskAssessment: RiskAssessment;
}

export interface RiskAssessment {
  overallRisk: number;     // 0-1 scale
  riskFactors: string[];
  mitigationStrategies: string[];
  contingencyPlans?: string[];
}

/**
 * Pattern recognition and learning types
 */
export interface PatternRecognitionConfig {
  timeframe: string;       // e.g., '3_months', '1_year'
  decisionTypes: string[]; // Types of decisions to analyze
  learningMode: 'supervised' | 'unsupervised' | 'adaptive';
  optimizationGoal: 'accuracy' | 'speed' | 'robustness';
  patternTypes: PatternType[];
  minConfidence: number;   // Minimum confidence for pattern recognition
}

export enum PatternType {
  TEMPORAL = 'temporal',           // Time-based patterns
  CONTEXTUAL = 'contextual',       // Context-dependent patterns  
  BEHAVIORAL = 'behavioral',       // Agent behavior patterns
  PERFORMANCE = 'performance',     // Decision outcome patterns
  CORRELATION = 'correlation',     // Cross-variable correlations
  SEQUENTIAL = 'sequential'        // Sequential decision patterns
}

export interface IdentifiedPattern {
  id: string;
  type: PatternType;
  description: string;
  confidence: number;      // Pattern confidence (0-1)
  frequency: number;       // How often this pattern occurs
  context: PatternContext;
  predictiveValue: number; // How well this pattern predicts outcomes
  variables: PatternVariable[];
  visualizationData?: PatternVisualizationData;
}

export interface PatternContext {
  agentId?: string;
  timeRange: [number, number];
  decisionCategories: string[];
  environmentalFactors: Record<string, any>;
  performanceMetrics: Record<string, number>;
}

export interface PatternVariable {
  name: string;
  type: 'numeric' | 'categorical' | 'boolean' | 'temporal';
  importance: number;      // Variable importance in pattern (0-1)
  correlation: number;     // Correlation with outcome (-1 to 1)
  range?: [number, number]; // For numeric variables
  categories?: string[];   // For categorical variables
}

/**
 * Mathematical optimization types
 */
export interface OptimizationProblem {
  id: string;
  name: string;
  description: string;
  variables: OptimizationVariable[];
  objectives: OptimizationObjective[];
  constraints: OptimizationConstraint[];
  algorithm: OptimizationAlgorithm;
  parameters: OptimizationParameters;
}

export interface OptimizationVariable {
  name: string;
  type: 'continuous' | 'integer' | 'binary' | 'categorical';
  bounds?: [number, number]; // For continuous/integer variables
  values?: any[];           // For categorical variables
  initialValue?: any;
  description?: string;
}

export interface OptimizationObjective {
  name: string;
  type: 'minimize' | 'maximize';
  weight: number;           // Multi-objective weight
  function: string;         // Mathematical expression or function name
  priority: number;         // Priority level for lexicographic optimization
}

export interface OptimizationConstraint {
  name: string;
  type: 'equality' | 'inequality';
  function: string;         // Mathematical expression
  priority: 'hard' | 'soft';
  penalty?: number;         // For soft constraints
  tolerance?: number;       // Tolerance for constraint satisfaction
}

export enum OptimizationAlgorithm {
  GRADIENT_DESCENT = 'gradient_descent',
  GENETIC_ALGORITHM = 'genetic_algorithm',
  SIMULATED_ANNEALING = 'simulated_annealing',
  PARTICLE_SWARM = 'particle_swarm',
  DIFFERENTIAL_EVOLUTION = 'differential_evolution',
  CONSTRAINT_SATISFACTION = 'constraint_satisfaction'
}

export interface OptimizationParameters {
  maxIterations: number;
  tolerance: number;
  populationSize?: number;  // For population-based algorithms
  crossoverRate?: number;   // For genetic algorithms
  mutationRate?: number;    // For genetic algorithms
  temperature?: number;     // For simulated annealing
  coolingRate?: number;     // For simulated annealing
  inertia?: number;         // For particle swarm
}

export interface OptimizationResult {
  problemId: string;
  solution: OptimizationSolution;
  performance: OptimizationPerformance;
  convergenceData: ConvergenceData;
  visualizationData?: OptimizationVisualizationData;
  timestamp: number;
}

export interface OptimizationSolution {
  variables: Record<string, any>;
  objectiveValues: Record<string, number>;
  overallScore: number;
  feasible: boolean;
  constraintViolations: ConstraintViolation[];
}

export interface ConstraintViolation {
  constraintName: string;
  violation: number;
  severity: 'minor' | 'moderate' | 'severe';
  impact: string;
}

export interface OptimizationPerformance {
  iterations: number;
  executionTime: number;   // milliseconds
  convergenceTime: number; // milliseconds to convergence
  evaluations: number;     // Function evaluations
  memoryUsage: number;     // bytes
  successRate: number;     // Success rate for stochastic algorithms
}

export interface ConvergenceData {
  iterationHistory: IterationData[];
  convergencePoint: number; // Iteration where convergence was achieved
  finalGradient?: Vec3;     // Final gradient (if applicable)
  stagnationCount: number;  // Iterations without improvement
}

export interface IterationData {
  iteration: number;
  objectiveValue: number;
  bestSolution: Record<string, any>;
  constraints: number;      // Constraint violation measure
  diversity?: number;       // Population diversity (for population-based)
}

/**
 * Decision explanation and visualization types
 */
export interface DecisionReasoning {
  steps: ReasoningStep[];
  criticalFactors: string[];
  assumptions: string[];
  alternatives: AlternativeComparison[];
  riskAnalysis: string[];
  recommendations: string[];
  confidenceFactors: ConfidenceFactor[];
}

export interface ReasoningStep {
  step: number;
  description: string;
  type: 'data_collection' | 'analysis' | 'comparison' | 'conclusion';
  inputs: any[];
  outputs: any[];
  reasoning: string;
  confidence: number;
}

export interface AlternativeComparison {
  alternatives: [string, string];
  winner: string;
  margin: number;          // How much better the winner is
  reasoningFactors: string[];
  tradeoffs: string[];
}

export interface ConfidenceFactor {
  factor: string;
  impact: 'positive' | 'negative';
  magnitude: number;       // How much this affects confidence
  explanation: string;
}

export interface OptimizationMetrics {
  efficiency: number;      // How well resources were used (0-1)
  effectiveness: number;   // How well objectives were met (0-1)
  robustness: number;      // Sensitivity to parameter changes (0-1)
  scalability: number;     // Performance at larger scales (0-1)
  interpretability: number; // How explainable the solution is (0-1)
}

/**
 * Visualization integration types for WebGL rendering
 */
export interface DecisionVisualizationData {
  decisionTree: DecisionTreeNode[];
  criteriaMap: CriteriaVisualization[];
  alternativeSpace: AlternativeSpaceVisualization;
  riskLandscape: RiskLandscapeVisualization;
  timelineData: DecisionTimelineData[];
}

export interface DecisionTreeNode {
  id: string;
  label: string;
  type: 'root' | 'criteria' | 'alternative' | 'outcome';
  position: Vec3;          // 3D position for WebGL rendering
  children: string[];      // Child node IDs
  score?: number;
  confidence?: number;
  visualProperties: {
    size: number;
    color: [number, number, number]; // RGB
    opacity: number;
    shape: 'sphere' | 'cube' | 'pyramid';
  };
}

export interface CriteriaVisualization {
  criteriaName: string;
  weight: number;
  impact: number;
  position: Vec3;
  connections: CriteriaConnection[];
  fuzzyMembership?: number[];
}

export interface CriteriaConnection {
  targetCriteria: string;
  strength: number;        // Connection strength (0-1)
  type: 'positive' | 'negative' | 'neutral';
  influence: number;       // How much one affects the other
}

export interface AlternativeSpaceVisualization {
  alternatives: AlternativePoint[];
  decisionBoundaries: DecisionBoundary[];
  paretoFront: Vec3[];     // Pareto-optimal solutions
  dominanceRegions: DominanceRegion[];
}

export interface AlternativePoint {
  alternative: string;
  position: Vec3;          // Position in criteria space
  score: number;
  rank: number;
  dominated: boolean;      // Whether this is dominated by others
  neighbors: string[];     // Similar alternatives
}

export interface DecisionBoundary {
  points: Vec3[];          // Boundary line/surface points
  separatesAlternatives: [string, string];
  confidence: number;
  type: 'linear' | 'nonlinear' | 'fuzzy';
}

export interface DominanceRegion {
  region: Vec3[];          // Region boundary points
  dominatingAlternative: string;
  dominanceStrength: number;
  conflictZones: Vec3[];   // Areas of high uncertainty
}

export interface RiskLandscapeVisualization {
  riskSurface: RiskSurfacePoint[];
  riskGradients: RiskGradient[];
  safeZones: SafeZone[];
  uncertaintyRegions: UncertaintyRegion[];
}

export interface RiskSurfacePoint {
  position: Vec3;
  riskLevel: number;       // Risk at this point (0-1)
  riskType: string;
  confidence: number;
}

export interface RiskGradient {
  position: Vec3;
  direction: Vec3;         // Direction of increasing risk
  magnitude: number;       // Steepness of risk increase
}

export interface SafeZone {
  center: Vec3;
  radius: number;
  safetyLevel: number;     // How safe this zone is (0-1)
  conditions: string[];    // Conditions for safety
}

export interface UncertaintyRegion {
  boundary: Vec3[];
  uncertaintyLevel: number; // Uncertainty in this region (0-1)
  source: string;          // Source of uncertainty
}

export interface DecisionTimelineData {
  timestamp: number;
  event: string;
  impact: number;
  position: Vec3;          // Position in timeline visualization
  connections: string[];   // Connected events
}

/**
 * Pattern visualization types
 */
export interface PatternVisualizationData {
  patternGraph: PatternGraphNode[];
  temporalFlow: TemporalFlowData[];
  correlationMatrix: CorrelationVisualization[];
  clusterData: PatternClusterData[];
}

export interface PatternGraphNode {
  id: string;
  label: string;
  type: 'variable' | 'pattern' | 'outcome';
  position: Vec3;
  strength: number;        // Pattern strength (0-1)
  connections: PatternConnection[];
  visualProperties: {
    size: number;
    color: [number, number, number];
    opacity: number;
    animation?: 'pulse' | 'rotate' | 'glow';
  };
}

export interface PatternConnection {
  targetId: string;
  strength: number;
  type: 'causal' | 'correlational' | 'temporal';
  confidence: number;
  direction: 'bidirectional' | 'forward' | 'backward';
}

export interface TemporalFlowData {
  timepoint: number;
  patterns: string[];      // Active patterns at this time
  intensity: number;       // Overall pattern intensity
  position: Vec3;
  flowVectors: Vec3[];     // Flow direction vectors
}

export interface CorrelationVisualization {
  variable1: string;
  variable2: string;
  correlation: number;     // -1 to 1
  significance: number;    // Statistical significance
  position: Vec3;
  connectionStrength: number;
}

export interface PatternClusterData {
  clusterId: string;
  patterns: string[];
  centroid: Vec3;
  radius: number;
  cohesion: number;        // How tightly clustered (0-1)
  separation: number;      // Distance to other clusters
}

/**
 * Optimization visualization types
 */
export interface OptimizationVisualizationData {
  searchSpace: SearchSpaceVisualization;
  convergencePath: ConvergencePathData[];
  objectiveLandscape: ObjectiveLandscapeData[];
  constraintVisualization: ConstraintVisualizationData[];
}

export interface SearchSpaceVisualization {
  feasibleRegion: Vec3[];  // Feasible solution space boundary
  infeasibleRegions: InfeasibleRegion[];
  optimalPoints: OptimalPoint[];
  searchHistory: SearchPoint[];
}

export interface InfeasibleRegion {
  boundary: Vec3[];
  violatedConstraints: string[];
  severity: number;        // Severity of constraint violations
}

export interface OptimalPoint {
  position: Vec3;
  objectiveValue: number;
  type: 'global' | 'local' | 'pareto';
  confidence: number;
}

export interface SearchPoint {
  position: Vec3;
  iteration: number;
  objectiveValue: number;
  feasible: boolean;
  improvement: boolean;    // Whether this was an improvement
}

export interface ConvergencePathData {
  iteration: number;
  position: Vec3;
  objectiveValue: number;
  gradient?: Vec3;
  stepSize: number;
  direction: Vec3;
}

export interface ObjectiveLandscapeData {
  position: Vec3;
  objectiveValue: number;
  gradient: Vec3;
  hessian?: number[][];    // Second derivatives (if available)
  landscapeType: 'valley' | 'peak' | 'saddle' | 'plateau';
}

export interface ConstraintVisualizationData {
  constraintName: string;
  type: 'equality' | 'inequality';
  surface: Vec3[];         // Constraint surface points
  normalVectors: Vec3[];   // Normal vectors to surface
  violationGradient: Vec3[]; // Direction of increasing violation
  activeRegion: Vec3[];    // Where constraint is active
}

/**
 * Enhanced agent state with intelligence capabilities
 */
export interface EnhancedIntelligenceState extends State {
  fuzzyDecisionHistory: FuzzyDecisionResult[];
  recognizedPatterns: IdentifiedPattern[];
  optimizationProblems: OptimizationProblem[];
  learningMetrics: LearningMetrics;
  decisionCapabilities: DecisionCapability[];
  intelligenceMetrics: IntelligenceMetrics;
}

export interface LearningMetrics {
  totalDecisions: number;
  decisionAccuracy: number;        // Historical accuracy (0-1)
  learningRate: number;            // How quickly agent improves
  adaptationSpeed: number;         // Speed of adapting to new patterns
  patternRecognitionAccuracy: number;
  optimizationEfficiency: number;
  memoryUtilization: number;       // How efficiently memory is used
  knowledgeBase: number;           // Size of accumulated knowledge
}

export interface DecisionCapability {
  domain: string;                  // e.g., 'financial', 'technical', 'strategic'
  proficiency: number;             // Proficiency level (0-1)
  experience: number;              // Amount of experience in this domain
  successRate: number;             // Historical success rate
  averageConfidence: number;       // Average confidence in decisions
  specializations: string[];       // Specialized areas within domain
}

export interface IntelligenceMetrics {
  overallIntelligence: number;     // General intelligence score (0-1)
  analyticalIntelligence: number;  // Analytical problem-solving
  creativityIndex: number;         // Creative solution generation
  adaptabilityScore: number;       // Adaptation to new situations
  reasoningDepth: number;          // Depth of reasoning chains
  uncertaintyHandling: number;     // Ability to handle uncertainty
  learningEfficiency: number;      // Efficiency of learning from experience
  socialIntelligence?: number;     // Multi-agent coordination (if applicable)
}

/**
 * Action result types for ElizaOS integration
 */
export interface EnhancedIntelligenceActionResult {
  success: boolean;
  data?: any;
  error?: string;
  metrics?: {
    executionTime: number;
    memoryUsage: number;
    confidenceScore: number;
    qualityScore: number;
  };
  visualization?: {
    webglData: any;
    renderingHints: RenderingHints;
  };
}

export interface RenderingHints {
  preferredVisualization: 'decision_tree' | 'pattern_graph' | 'optimization_landscape';
  animationSpeed: number;
  interactivityLevel: 'low' | 'medium' | 'high';
  colorScheme: 'business' | 'technical' | 'creative';
  dimensionality: '2d' | '3d' | 'auto';
}