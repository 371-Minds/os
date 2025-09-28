/**
 * Type definitions for CTO Agent (Zara)
 * 
 * Technical leadership and strategic decision-making interfaces
 */

// Agent Core Types
export interface AgentDefinition {
  agent_name: string;
  agent_type: string;
  core_instructions: string;
  personality_traits: string[];
  required_tools: string[];
}

// Technical Task Types
export interface TechnicalTask {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: 'low' | 'medium' | 'high' | 'critical';
  requestedBy: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export type TaskCategory = 
  | 'architecture_design'
  | 'technology_evaluation'
  | 'security_response'
  | 'infrastructure_planning'
  | 'performance_optimization'
  | 'compliance_review';

// Analysis and Decision Types
export interface TechnicalAnalysis {
  taskId: string;
  category: TaskCategory;
  complexity: ComplexityScore;
  riskAssessment: RiskAssessment;
  resourceRequirements: ResourceRequirements;
  timeline: string;
  recommendations: string[];
  confidence: number;
}

export interface ComplexityScore {
  level: 'low' | 'medium' | 'high';
  factors: string[];
  score: number; // 0-10 scale
}

export interface RiskAssessment {
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  risks: Risk[];
  mitigationStrategies: string[];
}

export interface Risk {
  type: 'technical' | 'security' | 'operational' | 'compliance';
  description: string;
  impact: 'low' | 'medium' | 'high' | 'critical';
  likelihood: 'low' | 'medium' | 'high';
  mitigation: string;
}

export interface ResourceRequirements {
  teamSize: number;
  timeline: string;
  technologies: string[];
  estimatedCost?: number;
  expertise: string[];
}

// Decision Output Types
export interface ArchitectureDecision {
  taskId: string;
  recommendedArchitecture: string;
  technicalSpecification: TechnicalSpecification;
  implementation: ImplementationPlan;
  alternatives: Alternative[];
  rationale: string;
}

export interface TechnicalSpecification {
  services: ServiceDefinition[];
  dataFlow: string;
  integrations: Integration[];
  securityConsiderations: string[];
  performanceTargets: PerformanceTarget[];
}

export interface ServiceDefinition {
  name: string;
  purpose: string;
  technology: string;
  interfaces: string[];
  dependencies: string[];
}

export interface Integration {
  source: string;
  target: string;
  method: string;
  dataFormat: string;
  securityRequirements: string[];
}

export interface PerformanceTarget {
  metric: string;
  target: string;
  measurement: string;
}

export interface ImplementationPlan {
  phases: Phase[];
  milestones: Milestone[];
  risks: string[];
  successCriteria: string[];
}

export interface Phase {
  name: string;
  description: string;
  duration: string;
  deliverables: string[];
  dependencies: string[];
}

export interface Milestone {
  name: string;
  description: string;
  target: string;
  criteria: string[];
}

export interface Alternative {
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  effort: 'low' | 'medium' | 'high';
}

// Technology Evaluation Types
export interface TechnologyAssessment {
  taskId: string;
  technology: string;
  evaluation: TechnologyEvaluation;
  recommendation: TechnologyRecommendation;
  implementationRoadmap: ImplementationRoadmap;
}

export interface TechnologyEvaluation {
  maturity: 'emerging' | 'proven' | 'legacy';
  ecosystemSupport: number; // 1-10 scale
  learningCurve: 'low' | 'medium' | 'high';
  integrationComplexity: 'low' | 'medium' | 'high';
  longTermViability: number; // 1-10 scale
  costs: CostAnalysis;
}

export interface CostAnalysis {
  licensing: number;
  training: number;
  implementation: number;
  maintenance: number;
  total: number;
}

export interface TechnologyRecommendation {
  decision: 'adopt' | 'pilot' | 'defer' | 'reject';
  rationale: string;
  conditions: string[];
  timeline: string;
  successMetrics: string[];
}

export interface ImplementationRoadmap {
  phases: RoadmapPhase[];
  prerequisites: string[];
  risks: string[];
  rollbackPlan: string;
}

export interface RoadmapPhase {
  name: string;
  description: string;
  duration: string;
  objectives: string[];
  deliverables: string[];
  successCriteria: string[];
}

// Infrastructure Planning Types
export interface InfrastructurePlan {
  taskId: string;
  requirements: InfrastructureRequirements;
  architecture: InfrastructureArchitecture;
  scalingStrategy: ScalingStrategy;
  costOptimization: CostOptimization;
}

export interface InfrastructureRequirements {
  performanceTargets: PerformanceRequirement[];
  availabilityTargets: AvailabilityTarget[];
  securityRequirements: SecurityRequirement[];
  complianceRequirements: string[];
}

export interface PerformanceRequirement {
  metric: string;
  target: number;
  unit: string;
  context: string;
}

export interface AvailabilityTarget {
  service: string;
  uptime: number;
  rto: number; // Recovery Time Objective in minutes
  rpo: number; // Recovery Point Objective in minutes
}

export interface SecurityRequirement {
  category: string;
  requirement: string;
  implementation: string;
  verification: string;
}

export interface InfrastructureArchitecture {
  components: InfrastructureComponent[];
  networking: NetworkingPlan;
  storage: StoragePlan;
  security: SecurityPlan;
}

export interface InfrastructureComponent {
  name: string;
  type: string;
  specifications: Record<string, any>;
  redundancy: string;
  monitoring: string[];
}

export interface NetworkingPlan {
  topology: string;
  bandwidth: string;
  latency: string;
  security: string[];
}

export interface StoragePlan {
  type: string;
  capacity: string;
  performance: string;
  backup: string;
  retention: string;
}

export interface SecurityPlan {
  access: string[];
  encryption: string[];
  monitoring: string[];
  compliance: string[];
}

export interface ScalingStrategy {
  approach: 'horizontal' | 'vertical' | 'hybrid';
  triggers: ScalingTrigger[];
  automation: AutomationPlan;
  limits: ScalingLimits;
}

export interface ScalingTrigger {
  metric: string;
  threshold: number;
  direction: 'up' | 'down';
  action: string;
}

export interface AutomationPlan {
  tools: string[];
  processes: string[];
  monitoring: string[];
}

export interface ScalingLimits {
  maxInstances: number;
  maxCost: number;
  performance: string[];
}

export interface CostOptimization {
  strategies: OptimizationStrategy[];
  savings: CostSavings;
  recommendations: string[];
}

export interface OptimizationStrategy {
  name: string;
  description: string;
  implementation: string;
  impact: number; // percentage savings
}

export interface CostSavings {
  monthly: number;
  annual: number;
  currency: string;
  confidence: number;
}

// Processing and Result Types
export interface ProcessingResult {
  taskId: string;
  category: TaskCategory;
  status: 'completed' | 'failed' | 'partial';
  result: ArchitectureDecision | TechnologyAssessment | InfrastructurePlan;
  analysis: TechnicalAnalysis;
  metadata: ProcessingMetadata;
}

export interface ProcessingMetadata {
  processingTime: number;
  confidence: number;
  escalated: boolean;
  version: string;
  timestamp: Date;
}

// Health Check Types
export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: HealthCheck[];
  overall: boolean;
  timestamp: Date;
}

export interface HealthCheck {
  component: string;
  status: boolean;
  message: string;
  latency?: number;
}

// Agent Status Types
export interface AgentStatus {
  name: string;
  type: string;
  status: 'operational' | 'degraded' | 'offline';
  capabilities: string[];
  performance: PerformanceMetrics;
  version: string;
  lastUpdate: string;
}

export interface PerformanceMetrics {
  tasksProcessed: number;
  averageResponseTime: number;
  successRate: number;
  escalationRate: number;
}