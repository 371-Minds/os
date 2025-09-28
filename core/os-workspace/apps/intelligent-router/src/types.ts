/**
 * Core type definitions for the Intelligent Router Agent
 * Provides type safety and structure for the routing system
 */

// Base task and routing types
export interface RoutingTask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  domain_hints?: string[];
  resource_requirements?: ResourceRequirement[];
  deadline?: Date;
  strategic_importance: boolean;
  submitted_at: Date;
  submitted_by: string;
}

export interface RoutingDecision {
  success: boolean;
  primary_agent: string;
  confidence_score: number;
  routing_rationale: string;
  alternative_agents?: string[];
  coordination_required: boolean;
  coordination_strategy?: CoordinationStrategy;
  estimated_completion_time: number;
  escalation_required: boolean;
  decision_timestamp: Date;
}

export interface TaskAnalysisResult {
  keywords: string[];
  domain_classification: DomainClassification;
  complexity_score: number;
  resource_requirements: ResourceRequirement[];
  strategic_impact: StrategicImpact;
  uncertainty_indicators: string[];
}

// Domain and agent types
export interface DomainClassification {
  domains: DomainScore[];
  primary_domain: string;
  confidence_score: number;
  multi_domain: boolean;
}

export interface DomainScore {
  domain: AgentDomain;
  score: number;
  matching_keywords: string[];
  reasoning: string;
}

export interface AgentCapability {
  agent_id: string;
  agent_name: string;
  domain: AgentDomain;
  expertise_areas: string[];
  current_workload: number;
  max_concurrent_tasks: number;
  availability_status: AvailabilityStatus;
  performance_metrics: PerformanceMetrics;
  last_updated: Date;
}

export interface PerformanceMetrics {
  total_tasks_completed: number;
  success_rate: number;
  average_completion_time: number;
  domain_specific_scores: Record<string, number>;
  recent_performance_trend: number;
  quality_score: number;
}

// Routing configuration types
export interface RoutingPolicy {
  domain: AgentDomain;
  keywords: string[];
  primary_agent: string;
  fallback_agents: string[];
  confidence_threshold: number;
  special_conditions?: RoutingCondition[];
}

export interface RoutingCondition {
  condition_type: 'workload' | 'time_constraint' | 'complexity' | 'strategic';
  threshold_value: number;
  action: 'escalate' | 'delegate_fallback' | 'require_approval';
  description: string;
}

export interface IntelligentRouterDefinition {
  agent_name: string;
  agent_type: string;
  description: string;
  core_instructions: string;
  personality_traits: Record<string, string>;
  required_tools: string[];
  routing_policies: {
    domain_classification: Record<string, RoutingPolicy>;
    workload_balancing: WorkloadBalancingConfig;
  };
  escalation_rules: EscalationRules;
  performance_targets: PerformanceTargets;
  learning_parameters: LearningParameters;
  coordination_strategies: Record<string, CoordinationStrategy>;
}

// Workload and coordination types
export interface WorkloadBalancingConfig {
  max_concurrent_tasks: number;
  priority_multiplier: number;
  availability_check_required: boolean;
  fallback_threshold: number;
}

export interface CoordinationStrategy {
  strategy_type: CoordinationStrategyType;
  description: string;
  use_cases: string[];
  execution_plan?: ExecutionStep[];
}

export interface ExecutionStep {
  step_id: string;
  agent_id: string;
  task_description: string;
  dependencies: string[];
  estimated_duration: number;
  parallel_execution_allowed: boolean;
}

// Escalation and performance types
export interface EscalationRules {
  uncertainty_threshold: number;
  multi_domain_complexity: number;
  resource_conflict_detection: boolean;
  human_review_triggers: string[];
}

export interface PerformanceTargets {
  routing_accuracy: number;
  average_response_time: number;
  delegation_success_rate: number;
  escalation_rate: number;
}

export interface LearningParameters {
  feedback_integration: boolean;
  success_weighting: number;
  failure_analysis: boolean;
  pattern_recognition: boolean;
  continuous_improvement: boolean;
}

// Monitoring and analytics types
export interface RoutingMetrics {
  total_tasks_routed: number;
  successful_routings: number;
  escalations: number;
  average_confidence_score: number;
  average_response_time: number;
  agent_utilization: Record<string, number>;
  domain_distribution: Record<string, number>;
  time_period: TimePeriod;
}

export interface RoutingAuditLog {
  routing_id: string;
  task_id: string;
  decision: RoutingDecision;
  outcome: RoutingOutcome;
  performance_impact: number;
  lessons_learned: string[];
  timestamp: Date;
}

export interface RoutingOutcome {
  success: boolean;
  completion_time: number;
  quality_score: number;
  user_satisfaction: number;
  agent_feedback: string;
  areas_for_improvement: string[];
}

// Enums and union types
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical'
}

export enum AgentDomain {
  FINANCIAL = 'financial',
  TECHNICAL = 'technical',
  MARKETING = 'marketing',
  COMMUNITY = 'community',
  STRATEGIC = 'strategic',
  LEGAL = 'legal',
  OPERATIONS = 'operations'
}

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  OFFLINE = 'offline',
  MAINTENANCE = 'maintenance'
}

export enum CoordinationStrategyType {
  SEQUENTIAL = 'sequential_execution',
  PARALLEL = 'parallel_execution',
  COLLABORATIVE = 'collaborative_execution'
}

export enum StrategicImpact {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface ResourceRequirement {
  resource_type: 'computational' | 'time' | 'expertise' | 'approval';
  amount: number;
  unit: string;
  availability_required: boolean;
}

export interface TimePeriod {
  start_date: Date;
  end_date: Date;
  duration_hours: number;
}

// Utility types for API responses
export interface RoutingApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
  routing_id?: string;
}

export interface AgentRegistryResponse {
  agents: AgentCapability[];
  total_count: number;
  last_updated: Date;
}

export interface PerformanceAnalyticsResponse {
  metrics: RoutingMetrics;
  trends: Record<string, number[]>;
  recommendations: string[];
  optimization_opportunities: string[];
}

// Configuration and settings types
export interface RouterConfiguration {
  agent_brain_definition: IntelligentRouterDefinition;
  runtime_settings: RuntimeSettings;
  integration_endpoints: IntegrationEndpoints;
  monitoring_config: MonitoringConfig;
}

export interface RuntimeSettings {
  max_concurrent_routings: number;
  response_timeout_ms: number;
  retry_attempts: number;
  cache_duration_minutes: number;
  logging_level: 'debug' | 'info' | 'warn' | 'error';
}

export interface IntegrationEndpoints {
  agent_registry_url: string;
  performance_analytics_url: string;
  escalation_service_url: string;
  notification_service_url: string;
}

export interface MonitoringConfig {
  metrics_collection_interval: number;
  performance_reporting_frequency: number;
  alert_thresholds: Record<string, number>;
  dashboard_refresh_rate: number;
}