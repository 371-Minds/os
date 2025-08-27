/**
 * Type definitions for Universal Tool Server Plugin
 * 
 * Implements the next-generation architecture beyond MCP limitations
 */

// MCP Evolution Types
export interface MCPServerConfig {
  transport: 'stdio' | 'sse' | 'websocket';
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  uri?: string;
  headers?: Record<string, string>;
}

export interface UniversalToolCall {
  id: string;
  tool: string;
  parameters: Record<string, any>;
  authentication: AgentAuthentication;
  context?: AgentContext;
}

export interface UniversalToolResponse {
  id: string;
  success: boolean;
  result?: any;
  error?: string;
  cost?: number;
  provenance: ToolProvenance;
}

// Blockchain Registry Types
export interface AgentRegistryEntry {
  agentId: string;
  did: string; // Decentralized Identifier
  capabilities: AgentCapability[];
  verifiableCredentials: VerifiableCredential[];
  reputation: ReputationScore;
  economicTerms: EconomicTerms;
  deploymentInfo: DeploymentInfo;
}

export interface AgentCapability {
  toolId: string;
  name: string;
  description: string;
  inputSchema: any; // JSON Schema
  outputSchema: any; // JSON Schema
  costModel: CostModel;
  permissions: Permission[];
  availability: AvailabilitySchedule;
}

export interface VerifiableCredential {
  id: string;
  issuer: string;
  subject: string;
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: any;
  proof: CryptographicProof;
}

export interface CryptographicProof {
  type: string;
  created: string;
  proofPurpose: string;
  verificationMethod: string;
  signature: string;
}

// Economic Coordination Types
export interface EconomicTerms {
  paymentModel: 'per-call' | 'subscription' | 'compute-time' | 'outcome-based';
  basePrice: number;
  currency: 'AKT' | 'ETH' | 'USDC' | 'native';
  dynamicPricing?: DynamicPricingConfig;
  escrowRequired: boolean;
  slashing?: SlashingConfig;
}

export interface CostModel {
  basePrice: number;
  scalingFactors: ScalingFactor[];
  discounts: VolumeDiscount[];
  penalties: PerformancePenalty[];
}

export interface ScalingFactor {
  metric: 'complexity' | 'data-size' | 'processing-time' | 'accuracy-requirement';
  multiplier: number;
  threshold?: number;
}

// Authentication Evolution Types
export interface AgentAuthentication {
  method: 'delegated-oauth' | 'cryptographic-identity' | 'zero-knowledge-proof';
  credentials?: DelegatedCredentials;
  identity?: CryptographicIdentity;
  proof?: ZKProof;
}

export interface DelegatedCredentials {
  userId: string;
  delegationToken: string;
  scope: string[];
  expiresAt: string;
  refreshToken?: string;
}

export interface CryptographicIdentity {
  did: string;
  publicKey: string;
  signature: string;
  nonce: string;
  timestamp: string;
}

export interface ZKProof {
  circuit: string;
  proof: string;
  publicInputs: any[];
  verificationKey: string;
}

// Cross-Platform Deployment Types
export interface DeploymentInfo {
  platforms: PlatformDeployment[];
  akashDeployment?: AkashDeployment;
  constraints: DeploymentConstraints;
  monitoring: MonitoringConfig;
}

export interface PlatformDeployment {
  platform: 'browser-extension' | 'vscode-extension' | 'slack-bot' | 'discord-bot' | 'telegram-bot';
  endpoint: string;
  authentication: PlatformAuth;
  capabilities: string[];
  limitations: string[];
}

export interface AkashDeployment {
  leaseId: string;
  provider: string;
  endpoint: string;
  resources: ResourceSpec;
  cost: number;
  region: string;
}

export interface ResourceSpec {
  cpu: string;
  memory: string;
  storage: string;
  gpu?: string;
  bandwidth?: string;
}

// Trust and Reputation Types
export interface ReputationScore {
  overall: number;
  categories: CategoryScore[];
  history: ReputationEvent[];
  attestations: Attestation[];
  slashingHistory: SlashingEvent[];
}

export interface CategoryScore {
  category: 'reliability' | 'accuracy' | 'speed' | 'cost-effectiveness' | 'security';
  score: number;
  confidence: number;
  sampleSize: number;
}

export interface Attestation {
  attestorDid: string;
  attestorReputation: number;
  claimType: string;
  claimValue: any;
  evidence: string[];
  timestamp: string;
  signature: string;
}

// Performance and Monitoring Types
export interface PerformanceMetrics {
  latency: LatencyMetrics;
  throughput: ThroughputMetrics;
  reliability: ReliabilityMetrics;
  cost: CostMetrics;
}

export interface LatencyMetrics {
  p50: number;
  p95: number;
  p99: number;
  mean: number;
  trend: 'improving' | 'stable' | 'degrading';
}

export interface ToolUsageAnalytics {
  totalCalls: number;
  uniqueUsers: number;
  averageCost: number;
  successRate: number;
  popularParameters: ParameterUsage[];
  errorPatterns: ErrorPattern[];
}

// Smart Contract Integration Types
export interface SmartContractConfig {
  chainId: number;
  contractAddress: string;
  abi: any[];
  gasSettings: GasConfig;
  multicallEnabled: boolean;
}

export interface GovernanceProposal {
  id: string;
  proposer: string;
  title: string;
  description: string;
  proposalType: 'tool-update' | 'economic-parameter' | 'security-policy' | 'platform-integration';
  parameters: any;
  votingPeriod: VotingPeriod;
  status: 'pending' | 'active' | 'passed' | 'rejected' | 'executed';
}

// Utility Types
export interface AgentContext {
  userId?: string;
  sessionId?: string;
  platform: string;
  capabilities: string[];
  preferences: UserPreferences;
  budget?: BudgetConstraints;
}

export interface UserPreferences {
  costSensitivity: 'low' | 'medium' | 'high';
  speedPriority: 'low' | 'medium' | 'high';
  privacyLevel: 'public' | 'private' | 'confidential';
  trustedProviders: string[];
  blockedProviders: string[];
}

export interface BudgetConstraints {
  maxCostPerCall: number;
  maxTotalCost: number;
  currency: string;
  resetPeriod: 'daily' | 'weekly' | 'monthly';
}

export interface ToolProvenance {
  providerId: string;
  executionId: string;
  timestamp: string;
  computeResources: ResourceUsage;
  cryptographicHash: string;
  auditTrail: AuditEvent[];
}

export interface ResourceUsage {
  cpuTime: number;
  memoryUsed: number;
  networkBandwidth: number;
  storageAccessed: number;
  gpuTime?: number;
}