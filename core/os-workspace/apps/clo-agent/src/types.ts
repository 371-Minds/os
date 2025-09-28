// CLO Agent (Alex) Types and Interfaces
// Legal compliance and governance type definitions

export interface LegalTask {
  id: string;
  type: LegalTaskType;
  description: string;
  priority: TaskPriority;
  domain: LegalDomain;
  requiredCompliance: ComplianceRequirement[];
  deadline?: Date;
  escalationRequired: boolean;
  metadata: LegalTaskMetadata;
}

export enum LegalTaskType {
  COMPLIANCE_ASSESSMENT = 'compliance_assessment',
  CONTRACT_REVIEW = 'contract_review',
  RISK_ASSESSMENT = 'risk_assessment',
  POLICY_VALIDATION = 'policy_validation',
  GOVERNANCE_REVIEW = 'governance_review',
  REGULATORY_ANALYSIS = 'regulatory_analysis',
  AUDIT_PREPARATION = 'audit_preparation',
  INCIDENT_RESPONSE = 'incident_response'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum LegalDomain {
  DATA_PRIVACY = 'data_privacy',
  FINANCIAL_COMPLIANCE = 'financial_compliance',
  HEALTHCARE_COMPLIANCE = 'healthcare_compliance',
  SECURITY_COMPLIANCE = 'security_compliance',
  INTELLECTUAL_PROPERTY = 'intellectual_property',
  GOVERNANCE = 'governance',
  CORPORATE_LAW = 'corporate_law',
  EMPLOYMENT_LAW = 'employment_law'
}

export interface ComplianceRequirement {
  regulation: string;
  jurisdiction: string;
  requirement: string;
  mandatory: boolean;
  deadline?: Date;
}

export interface LegalTaskMetadata {
  submittedBy: string;
  submissionDate: Date;
  businessImpact: BusinessImpact;
  stakeholders: string[];
  relatedDocuments: string[];
  confidentialityLevel: ConfidentialityLevel;
}

export enum BusinessImpact {
  MINIMAL = 'minimal',
  MINOR = 'minor',
  MODERATE = 'moderate',
  MAJOR = 'major',
  SEVERE = 'severe'
}

export enum ConfidentialityLevel {
  PUBLIC = 'public',
  INTERNAL = 'internal',
  CONFIDENTIAL = 'confidential',
  RESTRICTED = 'restricted',
  TOP_SECRET = 'top_secret'
}

// Compliance Analysis Results

export interface ComplianceAnalysisResult {
  taskId: string;
  complianceStatus: ComplianceStatus;
  riskLevel: RiskLevel;
  findings: ComplianceFinding[];
  recommendedActions: RecommendedAction[];
  legalRequirements: LegalRequirement[];
  timeToResolution: number; // hours
  auditTrail: AuditEntry[];
}

export enum ComplianceStatus {
  COMPLIANT = 'compliant',
  NON_COMPLIANT = 'non_compliant',
  PARTIALLY_COMPLIANT = 'partially_compliant',
  REQUIRES_REVIEW = 'requires_review',
  PENDING_ASSESSMENT = 'pending_assessment'
}

export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface ComplianceFinding {
  id: string;
  category: ComplianceCategory;
  severity: RiskLevel;
  description: string;
  regulation: string;
  recommendation: string;
  remediation: RemediationAction;
}

export enum ComplianceCategory {
  DATA_HANDLING = 'data_handling',
  ACCESS_CONTROL = 'access_control',
  DOCUMENTATION = 'documentation',
  PROCESS_COMPLIANCE = 'process_compliance',
  TECHNICAL_SAFEGUARDS = 'technical_safeguards',
  ADMINISTRATIVE_SAFEGUARDS = 'administrative_safeguards'
}

export interface RemediationAction {
  action: string;
  timeframe: string;
  responsibility: string;
  cost: number;
  complexity: ActionComplexity;
}

export enum ActionComplexity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export interface RecommendedAction {
  id: string;
  priority: TaskPriority;
  action: string;
  justification: string;
  implementation: ImplementationPlan;
  stakeholders: string[];
  deadline: Date;
}

export interface ImplementationPlan {
  steps: ImplementationStep[];
  totalDuration: number; // hours
  dependencies: string[];
  resources: RequiredResource[];
}

export interface ImplementationStep {
  stepNumber: number;
  description: string;
  duration: number; // hours
  assignee: string;
  deliverables: string[];
}

export interface RequiredResource {
  type: ResourceType;
  description: string;
  quantity: number;
  cost: number;
}

export enum ResourceType {
  HUMAN = 'human',
  TECHNICAL = 'technical',
  FINANCIAL = 'financial',
  EXTERNAL = 'external'
}

export interface LegalRequirement {
  regulation: string;
  section: string;
  requirement: string;
  applicability: string;
  complianceMethod: string;
  verificationMethod: string;
}

// Governance Framework

export interface GovernanceDecision {
  decisionId: string;
  taskId: string;
  policyAlignment: boolean;
  governanceGaps: GovernanceGap[];
  enforcementActions: EnforcementAction[];
  stakeholderNotifications: StakeholderNotification[];
  auditTrail: AuditEntry[];
  approvalRequired: boolean;
  approvers: string[];
}

export interface GovernanceGap {
  gapId: string;
  policy: string;
  currentState: string;
  requiredState: string;
  severity: RiskLevel;
  remediation: RemediationAction;
}

export interface EnforcementAction {
  actionId: string;
  type: EnforcementType;
  description: string;
  target: string;
  severity: RiskLevel;
  timeline: string;
  followUp: FollowUpAction;
}

export enum EnforcementType {
  WARNING = 'warning',
  SUSPENSION = 'suspension',
  TERMINATION = 'termination',
  REMEDIATION = 'remediation',
  TRAINING = 'training',
  POLICY_UPDATE = 'policy_update'
}

export interface FollowUpAction {
  type: string;
  description: string;
  dueDate: Date;
  assignee: string;
}

export interface StakeholderNotification {
  notificationId: string;
  recipient: string;
  urgency: NotificationUrgency;
  message: string;
  channelType: NotificationChannel;
  deliveryStatus: DeliveryStatus;
  timestamp: Date;
}

export enum NotificationUrgency {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum NotificationChannel {
  EMAIL = 'email',
  SLACK = 'slack',
  SMS = 'sms',
  DASHBOARD = 'dashboard',
  WEBHOOK = 'webhook'
}

export enum DeliveryStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  ACKNOWLEDGED = 'acknowledged'
}

// Risk Assessment Framework

export interface RiskAssessment {
  assessmentId: string;
  taskId: string;
  riskCategory: RiskCategory;
  identifiedRisks: IdentifiedRisk[];
  overallRiskScore: number;
  riskLevel: RiskLevel;
  mitigationStrategies: MitigationStrategy[];
  residualRisk: number;
  reviewDate: Date;
}

export enum RiskCategory {
  REGULATORY = 'regulatory',
  CONTRACTUAL = 'contractual',
  OPERATIONAL = 'operational',
  REPUTATIONAL = 'reputational',
  FINANCIAL = 'financial',
  TECHNICAL = 'technical',
  STRATEGIC = 'strategic'
}

export interface IdentifiedRisk {
  riskId: string;
  description: string;
  category: RiskCategory;
  probability: number; // 0.0 - 1.0
  impact: number; // 1-9 scale
  riskScore: number; // probability * impact
  likelihood: RiskLikelihood;
  consequences: string[];
  triggers: string[];
}

export enum RiskLikelihood {
  VERY_LOW = 'very_low',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export interface MitigationStrategy {
  strategyId: string;
  riskId: string;
  type: MitigationType;
  description: string;
  implementation: ImplementationPlan;
  effectiveness: number; // 0.0 - 1.0
  cost: number;
  timeline: string;
}

export enum MitigationType {
  AVOID = 'avoid',
  REDUCE = 'reduce',
  TRANSFER = 'transfer',
  ACCEPT = 'accept'
}

// Audit Trail and Logging

export interface AuditEntry {
  entryId: string;
  timestamp: Date;
  agentId: string;
  action: AuditAction;
  taskId?: string;
  details: AuditDetails;
  outcome: AuditOutcome;
  metadata: AuditMetadata;
}

export enum AuditAction {
  TASK_RECEIVED = 'task_received',
  ANALYSIS_STARTED = 'analysis_started',
  COMPLIANCE_CHECK = 'compliance_check',
  RISK_ASSESSMENT = 'risk_assessment',
  DECISION_MADE = 'decision_made',
  ESCALATION = 'escalation',
  NOTIFICATION_SENT = 'notification_sent',
  TASK_COMPLETED = 'task_completed',
  ERROR_OCCURRED = 'error_occurred'
}

export interface AuditDetails {
  description: string;
  inputData?: Record<string, unknown>;
  outputData?: Record<string, unknown>;
  processingTime?: number; // milliseconds
  errorMessage?: string;
}

export enum AuditOutcome {
  SUCCESS = 'success',
  PARTIAL_SUCCESS = 'partial_success',
  FAILURE = 'failure',
  ESCALATED = 'escalated',
  PENDING = 'pending'
}

export interface AuditMetadata {
  sessionId: string;
  correlationId: string;
  userAgent?: string;
  ipAddress?: string;
  additionalContext?: Record<string, unknown>;
}

// Agent Configuration and Status

export interface CLOAgentConfig {
  agentId: string;
  agentName: string;
  version: string;
  capabilities: AgentCapability[];
  performance: PerformanceConfig;
  integration: IntegrationConfig;
  security: SecurityConfig;
}

export interface AgentCapability {
  name: string;
  description: string;
  enabled: boolean;
  configuration: Record<string, unknown>;
}

export interface PerformanceConfig {
  maxConcurrentTasks: number;
  responseTimeTarget: number; // milliseconds
  throughputTarget: number; // tasks per hour
  cachingEnabled: boolean;
  circuitBreakerThreshold: number;
}

export interface IntegrationConfig {
  adaptiveLLMRouter: RouterConfig;
  cSuiteCoordination: CSuiteConfig;
  externalSystems: ExternalSystemConfig[];
}

export interface RouterConfig {
  enabled: boolean;
  costOptimization: boolean;
  preferredProviders: string[];
  fallbackProviders: string[];
}

export interface CSuiteConfig {
  coordinationEnabled: boolean;
  escalationRules: EscalationRule[];
  communicationChannels: string[];
}

export interface EscalationRule {
  condition: string;
  target: string;
  timeframe: number; // minutes
  notificationMethod: string;
}

export interface ExternalSystemConfig {
  systemName: string;
  endpoint: string;
  apiKey: string;
  enabled: boolean;
  timeout: number; // milliseconds
}

export interface SecurityConfig {
  encryptionEnabled: boolean;
  auditLevel: AuditLevel;
  accessControls: AccessControl[];
  dataRetention: DataRetentionPolicy;
}

export enum AuditLevel {
  MINIMAL = 'minimal',
  STANDARD = 'standard',
  COMPREHENSIVE = 'comprehensive',
  FORENSIC = 'forensic'
}

export interface AccessControl {
  resource: string;
  permissions: Permission[];
  restrictions: string[];
}

export interface Permission {
  action: string;
  granted: boolean;
  conditions: string[];
}

export interface DataRetentionPolicy {
  retentionPeriod: number; // days
  archivalPolicy: string;
  deletionPolicy: string;
  complianceRequirements: string[];
}

// Agent Health and Monitoring

export interface AgentHealth {
  agentId: string;
  status: AgentStatus;
  lastHealthCheck: Date;
  performanceMetrics: PerformanceMetrics;
  systemResources: SystemResources;
  errorRate: number;
  uptime: number; // hours
}

export enum AgentStatus {
  HEALTHY = 'healthy',
  DEGRADED = 'degraded',
  UNHEALTHY = 'unhealthy',
  OFFLINE = 'offline',
  MAINTENANCE = 'maintenance'
}

export interface PerformanceMetrics {
  averageResponseTime: number; // milliseconds
  tasksProcessed: number;
  successRate: number; // 0.0 - 1.0
  throughput: number; // tasks per hour
  memoryUsage: number; // MB
  cpuUsage: number; // percentage
}

export interface SystemResources {
  memoryTotal: number; // MB
  memoryUsed: number; // MB
  cpuCores: number;
  diskSpace: number; // GB
  networkLatency: number; // milliseconds
}