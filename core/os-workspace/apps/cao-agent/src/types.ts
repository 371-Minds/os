/**
 * CAO Agent Data Models and Types
 * 
 * Comprehensive type definitions for the Chief Academic Officer Agent
 * following the design specifications and performance tracking requirements.
 */

import type { Logger } from 'winston';

// =====================================================
// CORE AGENT DEFINITION TYPES
// =====================================================

export interface CAOAgentDefinition {
  agent_name: string;
  agent_type: 'ACADEMIC_LEADERSHIP';
  core_instructions: string;
  personality_traits: string[];
  required_tools: string[];
  performance_monitoring_domains: Record<string, PerformanceMonitoringDomain>;
  curriculum_development_framework: CurriculumDevelopmentFramework;
  assessment_evaluation_criteria: AssessmentEvaluationCriteria;
  learning_optimization_strategies: LearningOptimizationStrategies;
  c_suite_integration_protocols: CSuiteIntegrationProtocols;
  escalation_criteria: Record<string, EscalationCriterion>;
  performance_targets: PerformanceTargets;
  monitoring_metrics: string[];
}

// =====================================================
// PERFORMANCE MONITORING TYPES
// =====================================================

export interface PerformanceMonitoringDomain {
  metrics: string[];
  assessment_frequency: 'real_time' | 'daily' | 'weekly' | 'monthly';
  improvement_threshold: number;
  escalation_threshold: number;
}

export interface AgentPerformanceData {
  agentId: string;
  agentType: string;
  domain: string;
  timestamp: Date;
  performanceScore: number; // 0-100
  successRate: number; // 0-1.0
  averageResponseTime: number; // milliseconds
  taskComplexityHandling: TaskComplexityRating;
  learningProgress: LearningMilestone[];
  competencyAreas: Record<string, CompetencyRating>;
  improvementRecommendations: ImprovementRecommendation[];
  resourceUtilization: ResourceUtilization;
  qualityMetrics: QualityMetrics;
}

export interface TaskComplexityRating {
  simple: number; // 0-100 rating
  moderate: number;
  complex: number;
  critical: number;
}

export interface LearningMilestone {
  id: string;
  competencyArea: string;
  achievedAt: Date;
  skillLevel: CompetencyLevel;
  validatedBy: string;
  evidence: string[];
}

export interface CompetencyRating {
  currentLevel: CompetencyLevel;
  targetLevel: CompetencyLevel;
  progressPercentage: number;
  lastAssessmentDate: Date;
  nextAssessmentDue: Date;
}

export type CompetencyLevel = 'novice' | 'developing' | 'proficient' | 'expert';

export interface ImprovementRecommendation {
  id: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  competencyArea: string;
  currentGap: number;
  targetImprovement: number;
  recommendedActions: string[];
  estimatedTimeframe: string;
  resourceRequirements: string[];
  expectedOutcome: string;
}

export interface ResourceUtilization {
  cpuUsage: number; // 0-1.0
  memoryUsage: number; // bytes
  networkCalls: number;
  externalApiCalls: number;
  processingTime: number; // milliseconds
  efficiency: number; // 0-1.0
}

export interface QualityMetrics {
  accuracy: number; // 0-1.0
  completeness: number; // 0-1.0
  relevance: number; // 0-1.0
  consistency: number; // 0-1.0
  compliance: number; // 0-1.0
}

// =====================================================
// CURRICULUM MANAGEMENT TYPES
// =====================================================

export interface CurriculumDevelopmentFramework {
  adaptive_learning: AdaptiveLearningConfig;
  skill_enhancement_programs: SkillEnhancementPrograms;
  best_practice_documentation: BestPracticeDocumentationConfig;
}

export interface AdaptiveLearningConfig {
  personalization_level: 'individual_agent' | 'agent_type' | 'domain_based';
  content_difficulty_progression: 'linear' | 'dynamic' | 'adaptive';
  prerequisite_validation: 'mandatory' | 'recommended' | 'optional';
  completion_criteria: 'time_based' | 'competency_based' | 'hybrid';
}

export interface SkillEnhancementPrograms {
  technical_skills: string[];
  business_skills: string[];
  communication_skills: string[];
}

export interface BestPracticeDocumentationConfig {
  capture_frequency: 'continuous' | 'daily' | 'weekly';
  validation_process: 'automated' | 'peer_review' | 'expert_review';
  distribution_method: 'automated_delivery' | 'manual_assignment' | 'self_service';
  update_schedule: 'real_time' | 'daily' | 'weekly' | 'monthly';
}

export interface EducationalCurriculum {
  curriculumId: string;
  name: string;
  description: string;
  version: string;
  targetCompetencies: LearningObjective[];
  learningModules: LearningModule[];
  assessmentCriteria: AssessmentCriteria;
  prerequisiteSkills: string[];
  difficultyProgression: DifficultyProgression;
  completionMetrics: CompletionMetrics;
  estimatedDuration: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  status: 'draft' | 'active' | 'deprecated';
}

export interface LearningObjective {
  id: string;
  title: string;
  description: string;
  competencyArea: string;
  targetLevel: CompetencyLevel;
  successCriteria: string[];
  assessmentMethod: string;
}

export interface LearningModule {
  moduleId: string;
  title: string;
  description: string;
  content: LearningContent[];
  duration: string; // ISO 8601 duration
  prerequisites: string[];
  learningObjectives: string[];
  assessments: Assessment[];
  resources: LearningResource[];
}

export interface LearningContent {
  contentId: string;
  type: 'text' | 'video' | 'interactive' | 'simulation' | 'practice';
  title: string;
  description: string;
  content: string;
  mediaUrl?: string;
  interactiveElements?: InteractiveElement[];
}

export interface InteractiveElement {
  elementId: string;
  type: 'quiz' | 'exercise' | 'simulation' | 'code_challenge';
  title: string;
  instructions: string;
  expectedInputs: any[];
  expectedOutputs: any[];
  scoring: ScoringCriteria;
}

export interface ScoringCriteria {
  maxScore: number;
  passingScore: number;
  rubric: RubricItem[];
}

export interface RubricItem {
  criterion: string;
  weight: number;
  levels: RubricLevel[];
}

export interface RubricLevel {
  level: number;
  description: string;
  points: number;
}

// =====================================================
// ASSESSMENT AND EVALUATION TYPES
// =====================================================

export interface AssessmentEvaluationCriteria {
  competency_levels: Record<CompetencyLevel, CompetencyLevelDefinition>;
  performance_thresholds: Record<string, PerformanceThreshold>;
}

export interface CompetencyLevelDefinition {
  score_range: string;
  description: string;
  training_intensity: 'maintenance' | 'low' | 'medium' | 'high';
}

export interface PerformanceThreshold {
  threshold: number;
  action: string;
}

export interface Assessment {
  assessmentId: string;
  type: 'diagnostic' | 'formative' | 'summative' | 'competency';
  title: string;
  description: string;
  competencyAreas: string[];
  questions: AssessmentQuestion[];
  duration: string; // ISO 8601 duration
  passingScore: number;
  maxAttempts: number;
  availableFrom: Date;
  availableUntil: Date;
  createdBy: string;
  createdAt: Date;
}

export interface AssessmentQuestion {
  questionId: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay' | 'practical';
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: any;
  points: number;
  competencyArea: string;
  difficultyLevel: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export interface AssessmentResult {
  resultId: string;
  assessmentId: string;
  agentId: string;
  startTime: Date;
  endTime: Date;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  responses: AssessmentResponse[];
  competencyBreakdown: Record<string, number>;
  feedback: string;
  recommendedActions: string[];
}

export interface AssessmentResponse {
  questionId: string;
  response: any;
  isCorrect: boolean;
  pointsEarned: number;
  timeSpent: number; // milliseconds
}

export interface AssessmentCriteria {
  passingScore: number;
  maxAttempts: number;
  timeLimit: string; // ISO 8601 duration
  prerequisiteAssessments: string[];
  competencyMapping: Record<string, number>; // competency area -> weight
}

// =====================================================
// LEARNING OPTIMIZATION TYPES
// =====================================================

export interface LearningOptimizationStrategies {
  performance_gap_analysis: PerformanceGapAnalysisConfig;
  continuous_improvement_loops: ContinuousImprovementConfig;
  knowledge_transfer_optimization: KnowledgeTransferConfig;
}

export interface PerformanceGapAnalysisConfig {
  identification_method: 'single_metric' | 'multi_dimensional_analysis' | 'ai_assisted';
  gap_severity_classification: string[];
  intervention_timeline: string;
}

export interface ContinuousImprovementConfig {
  feedback_collection: 'automated' | 'manual' | 'automated_and_manual';
  analysis_frequency: 'real_time' | 'daily' | 'weekly';
  optimization_deployment: 'manual' | 'real_time' | 'scheduled';
  effectiveness_validation: 'immediate' | 'weekly' | 'monthly';
}

export interface KnowledgeTransferConfig {
  peer_learning_facilitation: 'enabled' | 'disabled';
  cross_domain_knowledge_sharing: 'encouraged' | 'required' | 'optional';
  mentorship_program_coordination: 'active' | 'passive' | 'none';
  best_practice_dissemination: 'automatic' | 'systematic' | 'manual';
}

export interface LearningProgress {
  agentId: string;
  curriculumId: string;
  moduleId: string;
  startDate: Date;
  lastAccessDate: Date;
  completionPercentage: number;
  timeSpent: number; // milliseconds
  assessmentScores: number[];
  competencyImprovements: CompetencyImprovement[];
  learningVelocity: number; // improvements per week
  engagementLevel: 'low' | 'medium' | 'high';
  strugglingAreas: string[];
  strengths: string[];
  nextRecommendedModule: string;
}

export interface CompetencyImprovement {
  competencyArea: string;
  beforeScore: number;
  afterScore: number;
  improvementPercentage: number;
  dateAchieved: Date;
  validationMethod: string;
}

// =====================================================
// C-SUITE INTEGRATION TYPES
// =====================================================

export interface CSuiteIntegrationProtocols {
  ceo_coordination: CSuiteCoordinationConfig;
  cto_collaboration: CSuiteCoordinationConfig;
  cfo_partnership: CSuiteCoordinationConfig;
  clo_coordination: CSuiteCoordinationConfig;
}

export interface CSuiteCoordinationConfig {
  reporting_frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'as_needed';
  strategic_alignment_verification?: 'monthly' | 'quarterly' | 'annually';
  resource_allocation_requests?: 'as_needed' | 'scheduled';
  [key: string]: any;
}

export interface PerformanceReport {
  reportId: string;
  reportType: 'executive_summary' | 'detailed_analysis' | 'trend_report' | 'intervention_report';
  generatedFor: string; // C-Suite agent
  generatedBy: string; // CAO agent
  reportPeriod: {
    startDate: Date;
    endDate: Date;
  };
  agentsCovered: string[];
  keyMetrics: ReportMetric[];
  findings: ReportFinding[];
  recommendations: ReportRecommendation[];
  actionItems: ActionItem[];
  generatedAt: Date;
  status: 'draft' | 'final' | 'archived';
}

export interface ReportMetric {
  metricName: string;
  currentValue: number;
  previousValue?: number;
  target: number;
  trend: 'improving' | 'declining' | 'stable';
  significance: 'low' | 'medium' | 'high' | 'critical';
}

export interface ReportFinding {
  findingId: string;
  category: 'performance' | 'learning' | 'resource' | 'system';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  affectedAgents: string[];
  evidence: string[];
  impact: string;
}

export interface ReportRecommendation {
  recommendationId: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'training' | 'resource' | 'process' | 'strategic';
  title: string;
  description: string;
  rationale: string;
  expectedBenefit: string;
  implementationSteps: string[];
  resourceRequirements: string[];
  timeline: string;
  successMetrics: string[];
}

export interface ActionItem {
  itemId: string;
  assignedTo: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  dependencies: string[];
  createdAt: Date;
  updatedAt: Date;
}

// =====================================================
// ESCALATION AND PERFORMANCE TARGETS
// =====================================================

export interface EscalationCriterion {
  condition: string;
  action: string;
  notification_required: boolean;
  c_suite_involvement?: string[];
}

export interface PerformanceTargets {
  assessment_response_time_ms: number;
  educational_effectiveness_rate: number;
  agent_improvement_success_rate: number;
  learning_content_delivery_uptime: number;
  cross_domain_knowledge_transfer_rate: number;
  performance_regression_prevention_rate: number;
}

// =====================================================
// UTILITY AND RESPONSE TYPES
// =====================================================

export interface DifficultyProgression {
  levels: DifficultyLevel[];
  adaptationRules: AdaptationRule[];
}

export interface DifficultyLevel {
  level: number;
  name: string;
  description: string;
  prerequisites: string[];
  expectedDuration: string;
}

export interface AdaptationRule {
  condition: string;
  action: 'advance' | 'repeat' | 'provide_support' | 'skip';
  parameters: Record<string, any>;
}

export interface CompletionMetrics {
  minimumScore: number;
  requiredModules: string[];
  optionalModules: string[];
  practicalAssessments: string[];
  timeLimit?: string; // ISO 8601 duration
}

export interface LearningResource {
  resourceId: string;
  type: 'document' | 'video' | 'tool' | 'reference' | 'external_link';
  title: string;
  description: string;
  url?: string;
  content?: string;
  metadata: Record<string, any>;
}

// =====================================================
// OPERATIONAL INTERFACES
// =====================================================

export interface PerformanceMonitoringRequest {
  agentId?: string;
  domain?: string;
  timeframe: {
    startDate: Date;
    endDate: Date;
  };
  metrics: string[];
  includeRecommendations: boolean;
}

export interface PerformanceMonitoringResponse {
  requestId: string;
  agentPerformanceData: AgentPerformanceData[];
  aggregatedMetrics: Record<string, number>;
  trends: PerformanceTrend[];
  recommendations: ImprovementRecommendation[];
  generatedAt: Date;
}

export interface PerformanceTrend {
  metric: string;
  direction: 'improving' | 'declining' | 'stable';
  changePercentage: number;
  significance: 'low' | 'medium' | 'high';
  timeframe: string;
}

export interface CurriculumDeliveryRequest {
  agentId: string;
  curriculumId: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customizations?: Record<string, any>;
  scheduledStartDate?: Date;
}

export interface CurriculumDeliveryResponse {
  deliveryId: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  agentId: string;
  curriculumId: string;
  progress: LearningProgress;
  estimatedCompletion: Date;
  nextSteps: string[];
}

export interface LearningOptimizationRequest {
  scope: 'individual' | 'domain' | 'organization';
  targetAgents?: string[];
  targetDomains?: string[];
  optimizationGoals: string[];
  constraints: string[];
}

export interface LearningOptimizationResponse {
  optimizationId: string;
  recommendations: OptimizationRecommendation[];
  implementationPlan: ImplementationStep[];
  expectedOutcomes: ExpectedOutcome[];
  resourceRequirements: string[];
  timeline: string;
}

export interface OptimizationRecommendation {
  recommendationId: string;
  type: 'curriculum_adjustment' | 'assessment_modification' | 'resource_allocation' | 'process_improvement';
  description: string;
  rationale: string;
  expectedImpact: string;
  implementationComplexity: 'low' | 'medium' | 'high';
}

export interface ImplementationStep {
  stepId: string;
  order: number;
  title: string;
  description: string;
  estimatedDuration: string;
  dependencies: string[];
  assignedTo: string;
  resources: string[];
}

export interface ExpectedOutcome {
  outcomeId: string;
  metric: string;
  currentValue: number;
  targetValue: number;
  confidence: number; // 0-1.0
  timeframe: string;
}

// =====================================================
// ERROR AND HEALTH TYPES
// =====================================================

export interface CAOHealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  componentStatus: {
    performanceMonitor: 'operational' | 'degraded' | 'failed';
    curriculumManager: 'operational' | 'degraded' | 'failed';
    assessmentAnalyzer: 'operational' | 'degraded' | 'failed';
    learningOptimizer: 'operational' | 'degraded' | 'failed';
  };
  systemMetrics: {
    memoryUsage: number;
    cpuUsage: number;
    responseTime: number;
    errorRate: number;
  };
  recentIssues: HealthIssue[];
  recommendations: string[];
}

export interface HealthIssue {
  issueId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  component: string;
  description: string;
  occurredAt: Date;
  resolved: boolean;
  resolvedAt?: Date;
}

export interface CAOOperationResult {
  success: boolean;
  operationType: string;
  operationId: string;
  timestamp: Date;
  processingTime: number;
  result?: any;
  error?: CAOError;
  metadata: {
    agentVersion: string;
    requestSource: string;
    resourcesUsed: string[];
  };
}

export interface CAOError {
  code: string;
  message: string;
  details?: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'validation' | 'processing' | 'integration' | 'system';
  recoverable: boolean;
  suggestedActions: string[];
}

// =====================================================
// LOGGER TYPE FOR COMPONENT INJECTION
// =====================================================

export interface CAOLogger extends Logger {
  // Extended logger interface for CAO-specific logging needs
}