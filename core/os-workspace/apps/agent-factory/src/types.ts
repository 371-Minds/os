/**
 * Types and interfaces for the Autonomous Agent Spawning System
 * Defines data models for agent factory operations, capability gap detection,
 * brain generation, scaffold creation, and self-registration
 */

// Core spawning types
export interface SpawnRequest {
  capability: string;
  taskDescription: string;
  priority: SpawnPriority;
  requesterAgent: string;
  originalTaskId: string;
  domainHints: string[];
  performanceRequirements: PerformanceRequirements;
  economicConstraints?: EconomicConstraints;
}

export interface SpawnResponse {
  success: boolean;
  agentId?: string;
  estimatedReadyTime?: Date;
  deploymentId?: string;
  registryTxHash?: string;
  message: string;
  spawnId: string;
}

export enum SpawnPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical'
}

export interface PerformanceRequirements {
  maxResponseTime: number; // milliseconds
  minSuccessRate: number; // 0.0-1.0
  maxEscalationRate: number; // 0.0-1.0
  requiredCapabilities?: string[];
}

export interface EconomicConstraints {
  maxSpawnCost: number; // in USD
  maxMonthlyOperatingCost: number;
  stakingAmount?: number;
  budgetPriority: 'cost-optimized' | 'performance-optimized' | 'balanced';
}

// Capability gap analysis
export interface CapabilityGap {
  capability: string;
  gapType: CapabilityGapType;
  confidence: number;
  severity: GapSeverity;
  impact: string[];
  suggestedAgentType: string;
  estimatedDemand: number;
}

export enum CapabilityGapType {
  CRITICAL_GAP = 'critical_gap', // Zero agents available
  PERFORMANCE_GAP = 'performance_gap', // Agents exist but underperforming
  AVAILABILITY_GAP = 'availability_gap', // Agents exist but unavailable
  SPECIALIZATION_GAP = 'specialization_gap' // Generic agents exist but specialist needed
}

export enum GapSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Agent brain generation
export interface AgentBrainDefinition {
  agent_name: string;
  agent_type: string;
  description: string;
  core_instructions: string;
  personality_traits: Record<string, string>;
  required_tools: ToolRequirement[];
  performance_targets: PerformanceTargets;
  delegation_rules?: DelegationRule[];
  escalation_policies?: EscalationPolicy[];
}

export interface ToolRequirement {
  tool_category: string;
  permission_level: 'read' | 'write' | 'admin';
  required: boolean;
}

export interface PerformanceTargets {
  response_time_ms: number;
  task_success_rate: number;
  escalation_rate: number;
  quality_threshold: number;
}

export interface DelegationRule {
  condition: string;
  target_agent: string;
  delegation_type: 'handoff' | 'collaboration' | 'supervision';
}

export interface EscalationPolicy {
  trigger: string;
  escalation_target: string;
  timeout_ms: number;
}

// Agent scaffolding
export interface ScaffoldRequest {
  agentId: string;
  agentType: string;
  capabilities: string[];
  template: AgentTemplate;
  dependencies: string[];
  integrationPoints: IntegrationPoint[];
}

export interface ScaffoldResponse {
  success: boolean;
  projectPath?: string;
  generatedFiles: string[];
  buildConfiguration: BuildConfiguration;
  error?: string;
}

export enum AgentTemplate {
  BUSINESS_ANALYST = 'business-analyst',
  TECHNICAL_SPECIALIST = 'technical-specialist',
  COMMUNICATION_AGENT = 'communication-agent',
  INTEGRATION_AGENT = 'integration-agent',
  SPECIALIZED_CAPABILITY = 'specialized-capability'
}

export interface IntegrationPoint {
  type: 'blockchain-registry' | 'intelligent-router' | 'akash-deployment' | 'ipfs-storage';
  endpoint: string;
  authentication: AuthenticationConfig;
}

export interface AuthenticationConfig {
  type: 'api-key' | 'oauth2' | 'certificate' | 'wallet';
  credentials: Record<string, any>;
}

export interface BuildConfiguration {
  buildCommand: string;
  outputDirectory: string;
  dockerFile?: string;
  environmentVariables: Record<string, string>;
  dependencies: PackageDependency[];
}

export interface PackageDependency {
  name: string;
  version: string;
  type: 'runtime' | 'development';
}

// Self-registration system
export interface AgentRegistrationData {
  agentId: string;
  did: string;
  capabilities: AgentCapability[];
  spawnMetadata: SpawnMetadata;
  verifiableCredentials: VerifiableCredential[];
}

export interface SpawnMetadata {
  requestingAgent: string;
  capabilityGap: string;
  taskDescription: string;
  confidenceScore: number;
  relatedDomains: string[];
  spawnTimestamp: Date;
  factoryVersion: string;
}

export interface AgentCapability {
  toolId: string;
  name: string;
  description: string;
  inputSchema: object;
  outputSchema: object;
  metadata: CapabilityMetadata;
}

export interface CapabilityMetadata {
  complexity: number;
  estimatedExecutionTime: number;
  resourceRequirements: ResourceRequirement[];
  dependentCapabilities: string[];
  confidenceLevel: number;
}

export interface ResourceRequirement {
  type: 'cpu' | 'memory' | 'storage' | 'network' | 'gpu';
  amount: number;
  unit: string;
  priority: 'required' | 'preferred' | 'optional';
}

export interface VerifiableCredential {
  type: string;
  issuer: string;
  subject: string;
  claims: Record<string, any>;
  proof: CryptographicProof;
}

export interface CryptographicProof {
  type: string;
  created: Date;
  verificationMethod: string;
  signature: string;
}

// Factory analytics and monitoring
export interface SpawningMetrics {
  totalSpawnRequests: number;
  successfulSpawns: number;
  failedSpawns: number;
  averageSpawnTime: number;
  costEfficiency: number;
  capabilityGapsTrends: CapabilityGapTrend[];
  agentUtilization: AgentUtilizationMetric[];
}

export interface CapabilityGapTrend {
  capability: string;
  frequency: number;
  lastDetected: Date;
  averageResolutionTime: number;
  successRate: number;
}

export interface AgentUtilizationMetric {
  agentId: string;
  spawnedAt: Date;
  tasksCompleted: number;
  successRate: number;
  averageResponseTime: number;
  costPerTask: number;
  active: boolean;
}

// Economic coordination
export interface EconomicSafeguards {
  maxSpawnRatePerHour: number;
  maxConcurrentSpawns: number;
  minimumStakeAmount: number;
  costThresholds: CostThreshold[];
  budgetAllocations: BudgetAllocation[];
}

export interface CostThreshold {
  operation: 'spawn' | 'deploy' | 'register' | 'monitor';
  maxCostUSD: number;
  alertThresholdUSD: number;
  autoApprovalLimit: number;
}

export interface BudgetAllocation {
  capability: string;
  monthlyBudgetUSD: number;
  priorityMultiplier: number;
  rolloverPolicy: 'accumulate' | 'reset' | 'redistribute';
}

// Factory configuration
export interface FactoryConfiguration {
  brainGenerator: BrainGeneratorConfig;
  scaffoldGenerator: ScaffoldGeneratorConfig;
  deploymentManager: DeploymentManagerConfig;
  economicCoordinator: EconomicCoordinatorConfig;
  monitoring: MonitoringConfig;
}

export interface BrainGeneratorConfig {
  templateDirectory: string;
  outputDirectory: string;
  defaultPersonalityTraits: Record<string, string>;
  capabilityMappings: Record<string, string[]>;
}

export interface ScaffoldGeneratorConfig {
  nxWorkspaceRoot: string;
  templateRepository: string;
  defaultDependencies: string[];
  buildToolchain: 'bun' | 'npm' | 'yarn';
}

export interface DeploymentManagerConfig {
  akashNetworkConfig: AkashConfig;
  dockerRegistry: string;
  deploymentTimeout: number;
  healthCheckInterval: number;
}

export interface AkashConfig {
  rpcEndpoint: string;
  walletMnemonic: string;
  defaultResources: ResourceSpec;
  networkId: string;
}

export interface ResourceSpec {
  cpu: string;
  memory: string;
  storage: string;
  count: number;
}

export interface EconomicCoordinatorConfig {
  costTrackingEnabled: boolean;
  budgetEnforcementLevel: 'strict' | 'advisory' | 'disabled';
  stakingContract: string;
  tokenAddress: string;
  gasPriceLimit: number;
}

export interface MonitoringConfig {
  metricsCollectionInterval: number;
  alertingEnabled: boolean;
  dashboardEndpoint: string;
  performanceTargets: FactoryPerformanceTargets;
}

export interface FactoryPerformanceTargets {
  spawnSuccessRate: number;
  averageSpawnTime: number;
  maxCostPerSpawn: number;
  agentRetentionRate: number;
}

// API response types
export interface FactoryApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
  spawnId?: string;
  requestId: string;
}

export interface FactoryHealthCheck {
  healthy: boolean;
  services: ServiceHealthStatus[];
  metrics: FactorySystemMetrics;
  issues: string[];
}

export interface ServiceHealthStatus {
  service: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  lastCheck: Date;
  responseTime: number;
  details?: Record<string, any>;
}

export interface FactorySystemMetrics {
  activeSpawns: number;
  queuedRequests: number;
  systemLoad: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
}