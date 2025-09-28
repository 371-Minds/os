/**
 * CEO Agent TypeScript Type Definitions
 * 
 * Comprehensive type system for the CEO Agent (Mimi) following the unified architecture pattern.
 * These types ensure type safety and provide excellent developer experience.
 */

// Core Agent Definition Types
export interface CEOAgentDefinition {
  agent_name: string;
  agent_type: 'STRATEGIC_LEADERSHIP';
  core_instructions: string;
  personality_traits: string[];
  required_tools: string[];
  delegation_rules: DelegationRules;
  escalation_criteria: EscalationCriteria;
  performance_targets: PerformanceTargets;
  monitoring_metrics: string[];
}

// Delegation System Types
export interface DelegationRules {
  financial_domain?: DelegationRule;
  technical_domain?: DelegationRule;
  marketing_domain?: DelegationRule;
  community_domain?: DelegationRule;
  [key: string]: DelegationRule;
}

export interface DelegationRule {
  keywords: string[];
  primary_agent: string;
  fallback_agents: string[];
  confidence_threshold: number;
}

// Escalation System Types
export interface EscalationCriteria {
  high_financial_impact?: EscalationRule;
  cross_domain_conflict?: EscalationRule;
  strategic_uncertainty?: EscalationRule;
  performance_degradation?: EscalationRule;
  [key: string]: EscalationRule;
}

export interface EscalationRule {
  condition: string;
  action: 'human_review' | 'multi_agent_coordination' | 'executive_decision' | 'system_review';
  notification_required: boolean;
}

// Performance Monitoring Types
export interface PerformanceTargets {
  response_time_ms: number;
  delegation_accuracy_rate: number;
  escalation_rate: number;
  agent_availability_target: number;
  decision_confidence_threshold: number;
}

export interface PerformanceMetrics {
  task_processing_time: number;
  delegation_success_rate: number;
  agent_availability_rates: { [agentId: string]: number };
  escalation_frequency: number;
  decision_confidence_scores: number[];
  cross_domain_coordination_efficiency: number;
  strategic_alignment_score: number;
}

// Task Processing Types
export interface StrategicTask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  domain: TaskDomain | TaskDomain[];
  complexity_score: number;
  financial_impact_usd?: number;
  resource_requirements: ResourceRequirement[];
  deadline?: Date;
  stakeholders: string[];
  strategic_implications: boolean;
  created_at: Date;
  updated_at: Date;
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export type TaskDomain = 'financial' | 'technical' | 'marketing' | 'community' | 'strategic' | 'multi_domain';

export interface ResourceRequirement {
  type: 'human' | 'computational' | 'financial' | 'temporal';
  amount: number;
  unit: string;
  description: string;
}

// Decision Making Types
export interface DelegationDecision {
  task_id: string;
  decision_type: DecisionType;
  target_agents: AgentTarget[];
  confidence_score: number;
  reasoning: string;
  estimated_completion: Date;
  monitoring_required: boolean;
  escalation_triggers: string[];
  decision_timestamp: Date;
  decision_context: DecisionContext;
}

export type DecisionType = 'delegate' | 'coordinate' | 'escalate' | 'execute' | 'defer';

export interface AgentTarget {
  agent_id: string;
  agent_name: string;
  role: string;
  responsibility: string;
  priority: number;
  expected_contribution: string;
}

export interface DecisionContext {
  current_workload: { [agentId: string]: number };
  agent_performance_history: { [agentId: string]: number };
  resource_availability: ResourceAvailability;
  strategic_priorities: string[];
  risk_factors: string[];
}

export interface ResourceAvailability {
  financial_budget: number;
  computational_capacity: number;
  human_resources: number;
  time_constraints: string[];
}

// Agent Registry Types
export interface AgentRegistryEntry {
  agent_id: string;
  agent_name: string;
  agent_type: string;
  capabilities: AgentCapability[];
  current_status: AgentStatus;
  performance_metrics: AgentPerformanceMetrics;
  availability_score: number;
  last_heartbeat: Date;
  reputation_score: number;
  stake_amount?: bigint;
}

export interface AgentCapability {
  name: string;
  description: string;
  proficiency_level: number;
  last_used: Date;
  success_rate: number;
}

export type AgentStatus = 'available' | 'busy' | 'offline' | 'maintenance' | 'degraded';

export interface AgentPerformanceMetrics {
  tasks_completed: number;
  average_response_time: number;
  success_rate: number;
  error_rate: number;
  last_performance_review: Date;
}

// Orchestration Types
export interface OrchestrationRequest {
  task: StrategicTask;
  context: OrchestrationContext;
  preferences: OrchestrationPreferences;
}

export interface OrchestrationContext {
  current_strategic_focus: string[];
  active_initiatives: string[];
  resource_constraints: ResourceConstraint[];
  organizational_priorities: OrganizationalPriority[];
}

export interface ResourceConstraint {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  impact: string;
}

export interface OrganizationalPriority {
  name: string;
  weight: number;
  description: string;
  deadline?: Date;
}

export interface OrchestrationPreferences {
  prefer_single_agent: boolean;
  allow_parallel_execution: boolean;
  max_coordination_complexity: number;
  escalation_threshold: number;
}

// Health Monitoring Types
export interface HealthCheckResult {
  agent_id: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: Date;
  components: ComponentHealth[];
  overall_score: number;
  issues: HealthIssue[];
  recommendations: string[];
}

export interface ComponentHealth {
  component: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  response_time: number;
  last_check: Date;
  error_count: number;
}

export interface HealthIssue {
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  description: string;
  impact: string;
  suggested_action: string;
}

// Processing Results Types
export interface ProcessingResult {
  success: boolean;
  task_id: string;
  agent_id: string;
  result_type: 'delegated' | 'coordinated' | 'escalated' | 'completed' | 'failed';
  execution_time: number;
  delegation_details?: DelegationDetails;
  coordination_details?: CoordinationDetails;
  escalation_details?: EscalationDetails;
  metadata: ProcessingMetadata;
}

export interface DelegationDetails {
  target_agent: string;
  delegation_reason: string;
  confidence_score: number;
  expected_completion: Date;
  monitoring_schedule: string[];
}

export interface CoordinationDetails {
  participating_agents: string[];
  coordination_strategy: string;
  milestone_schedule: Milestone[];
  communication_plan: string;
}

export interface Milestone {
  name: string;
  description: string;
  deadline: Date;
  responsible_agent: string;
  dependencies: string[];
}

export interface EscalationDetails {
  escalation_reason: string;
  escalation_level: 'human_review' | 'executive_decision' | 'system_review';
  required_stakeholders: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
  context_summary: string;
}

export interface ProcessingMetadata {
  processing_start: Date;
  processing_end: Date;
  decision_points: DecisionPoint[];
  resource_usage: ResourceUsage;
  performance_impact: PerformanceImpact;
}

export interface DecisionPoint {
  timestamp: Date;
  decision: string;
  reasoning: string;
  confidence: number;
  alternatives_considered: string[];
}

export interface ResourceUsage {
  cpu_time: number;
  memory_usage: number;
  network_calls: number;
  external_api_calls: number;
}

export interface PerformanceImpact {
  response_time_impact: number;
  accuracy_impact: number;
  resource_efficiency: number;
  user_satisfaction_score?: number;
}

// Configuration Types
export interface CEOAgentConfig {
  agent_definition: CEOAgentDefinition;
  runtime_settings: RuntimeSettings;
  integration_settings: IntegrationSettings;
  monitoring_settings: MonitoringSettings;
}

export interface RuntimeSettings {
  max_concurrent_tasks: number;
  default_timeout: number;
  retry_attempts: number;
  cache_ttl: number;
  debug_mode: boolean;
}

export interface IntegrationSettings {
  agent_registry_url: string;
  blockchain_network: string;
  ipfs_gateway: string;
  external_apis: ExternalAPIConfig[];
}

export interface ExternalAPIConfig {
  name: string;
  url: string;
  api_key?: string;
  timeout: number;
  retry_policy: RetryPolicy;
}

export interface RetryPolicy {
  max_attempts: number;
  backoff_strategy: 'exponential' | 'linear' | 'fixed';
  base_delay: number;
}

export interface MonitoringSettings {
  health_check_interval: number;
  performance_logging: boolean;
  metric_collection_interval: number;
  alert_thresholds: AlertThreshold[];
}

export interface AlertThreshold {
  metric: string;
  threshold: number;
  operator: 'greater_than' | 'less_than' | 'equals';
  severity: 'low' | 'medium' | 'high' | 'critical';
  action: string;
}

// Event Types for Real-time Updates
export interface CEOAgentEvent {
  event_id: string;
  event_type: CEOEventType;
  timestamp: Date;
  source: string;
  data: unknown;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

export type CEOEventType = 
  | 'task_received'
  | 'delegation_completed' 
  | 'coordination_started'
  | 'escalation_triggered'
  | 'agent_status_changed'
  | 'performance_threshold_exceeded'
  | 'system_health_alert'
  | 'strategic_priority_updated';

// Error Types
export interface CEOAgentError extends Error {
  error_code: string;
  error_category: 'delegation' | 'coordination' | 'escalation' | 'system' | 'configuration';
  severity: 'low' | 'medium' | 'high' | 'critical';
  context: unknown;
  timestamp: Date;
  recovery_suggestions: string[];
}

// Utility Types
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Required<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

// Type Guards
export function isStrategicTask(obj: unknown): obj is StrategicTask {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'description' in obj;
}

export function isDelegationDecision(obj: unknown): obj is DelegationDecision {
  return typeof obj === 'object' && obj !== null && 'task_id' in obj && 'decision_type' in obj;
}

export function isProcessingResult(obj: unknown): obj is ProcessingResult {
  return typeof obj === 'object' && obj !== null && 'success' in obj && 'task_id' in obj;
}