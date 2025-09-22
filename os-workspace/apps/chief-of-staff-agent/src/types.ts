/**
 * Chief of Staff Agent Types
 * 
 * Comprehensive type definitions for the Chief of Staff Agent (Ortega)
 * that orchestrates strategic plans into DAO governance proposals.
 */

/**
 * Agent Definition loaded from YAML configuration
 */
export interface AgentDefinition {
  agent_name: string;
  agent_type: string;
  core_instructions: string;
  personality_traits: string[];
  required_tools: string[];
}

/**
 * Input for Stratplan processing
 */
export interface StratplanInput {
  title: string;
  source: string; // Path or URL to the Stratplan
  priority: 'low' | 'medium' | 'high' | 'critical';
  requestedBy: string;
  deadline?: Date;
  metadata?: Record<string, any>;
}

/**
 * Stratplan data structure loaded from bizbuilderprompts
 */
export interface StratplanData {
  id: string;
  title: string;
  description: string;
  metaPrompt: string;
  subPrompts: SubPrompt[];
  phases: StratplanPhase[];
  requiredResources: ResourceRequirement[];
  success_criteria: string[];
  timeline: TimelineItem[];
  stakeholders: string[];
  budget?: BudgetRequirement;
  metadata: Record<string, any>;
}

/**
 * Sub-prompt within a Stratplan
 */
export interface SubPrompt {
  id: string;
  title: string;
  content: string;
  dependencies: string[];
  expectedOutputs: string[];
  priority: number;
}

/**
 * Strategic phase within a Stratplan
 */
export interface StratplanPhase {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  deliverables: string[];
  duration: string;
  dependencies: string[];
  success_metrics: string[];
}

/**
 * Resource requirement for a Stratplan
 */
export interface ResourceRequirement {
  type: 'human' | 'technical' | 'financial' | 'infrastructure';
  description: string;
  quantity: number;
  unit: string;
  priority: 'required' | 'preferred' | 'optional';
  estimatedCost?: number;
}

/**
 * Budget requirement for a Stratplan
 */
export interface BudgetRequirement {
  totalBudget: number;
  currency: string;
  breakdown: BudgetBreakdown[];
  contingency: number;
  funding_sources: string[];
}

/**
 * Budget breakdown item
 */
export interface BudgetBreakdown {
  category: string;
  amount: number;
  justification: string;
}

/**
 * Timeline item for Stratplan execution
 */
export interface TimelineItem {
  id: string;
  milestone: string;
  description: string;
  startDate: Date;
  endDate: Date;
  dependencies: string[];
  responsible_parties: string[];
}

/**
 * Analysis result from Stratplan processing
 */
export interface StratplanAnalysis {
  stratplanId: string;
  complexityScore: number;
  feasibilityScore: number;
  riskAssessment: RiskAssessment;
  resourceAnalysis: ResourceAnalysis;
  timelineAnalysis: TimelineAnalysis;
  stakeholderAnalysis: StakeholderAnalysis;
  recommendations: string[];
  criticalPaths: CriticalPath[];
  dependencies: DependencyAnalysis[];
  confidence: number;
}

/**
 * Risk assessment for a Stratplan
 */
export interface RiskAssessment {
  overallRiskLevel: 'low' | 'medium' | 'high' | 'critical';
  identifiedRisks: Risk[];
  mitigationStrategies: MitigationStrategy[];
}

/**
 * Individual risk item
 */
export interface Risk {
  id: string;
  description: string;
  category: 'technical' | 'financial' | 'operational' | 'strategic' | 'regulatory';
  probability: number; // 0-1
  impact: number; // 0-1
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigations: string[];
}

/**
 * Risk mitigation strategy
 */
export interface MitigationStrategy {
  riskId: string;
  strategy: string;
  implementationCost: number;
  effectiveness: number; // 0-1
  timeline: string;
}

/**
 * Resource analysis for a Stratplan
 */
export interface ResourceAnalysis {
  totalResourcesRequired: number;
  resourceGaps: ResourceGap[];
  availability: ResourceAvailability[];
  alternatives: ResourceAlternative[];
}

/**
 * Resource gap identification
 */
export interface ResourceGap {
  type: string;
  required: number;
  available: number;
  gap: number;
  criticalityLevel: 'low' | 'medium' | 'high' | 'critical';
  suggestions: string[];
}

/**
 * Resource availability assessment
 */
export interface ResourceAvailability {
  type: string;
  available: number;
  utilization: number;
  timeframe: string;
}

/**
 * Resource alternative option
 */
export interface ResourceAlternative {
  originalResource: string;
  alternative: string;
  costDifference: number;
  tradeoffs: string[];
  feasibility: number; // 0-1
}

/**
 * Timeline analysis result
 */
export interface TimelineAnalysis {
  totalDuration: string;
  criticalPath: string[];
  bufferTime: string;
  parallelizablePhases: string[][];
  bottlenecks: TimelineBottleneck[];
}

/**
 * Timeline bottleneck identification
 */
export interface TimelineBottleneck {
  phase: string;
  reason: string;
  impact: string;
  suggestions: string[];
}

/**
 * Stakeholder analysis result
 */
export interface StakeholderAnalysis {
  primaryStakeholders: Stakeholder[];
  secondaryStakeholders: Stakeholder[];
  influenceMap: StakeholderInfluence[];
  communicationPlan: CommunicationPlan[];
}

/**
 * Individual stakeholder information
 */
export interface Stakeholder {
  name: string;
  role: string;
  interest: 'low' | 'medium' | 'high';
  influence: 'low' | 'medium' | 'high';
  supportLevel: number; // -1 to 1
  keyInterests: string[];
  communicationPreference: string;
}

/**
 * Stakeholder influence mapping
 */
export interface StakeholderInfluence {
  stakeholder: string;
  influences: string[];
  influencedBy: string[];
  networkPosition: 'peripheral' | 'connected' | 'central' | 'bridge';
}

/**
 * Communication plan for stakeholders
 */
export interface CommunicationPlan {
  stakeholder: string;
  frequency: string;
  method: string;
  keyMessages: string[];
  feedback_mechanism: string;
}

/**
 * Critical path analysis
 */
export interface CriticalPath {
  id: string;
  path: string[];
  duration: string;
  flexibility: number; // 0-1
  riskLevel: 'low' | 'medium' | 'high';
}

/**
 * Dependency analysis
 */
export interface DependencyAnalysis {
  id: string;
  dependentPhase: string;
  dependsOn: string[];
  type: 'blocking' | 'enabling' | 'informational';
  criticality: 'low' | 'medium' | 'high';
  alternatives: string[];
}

/**
 * DAO Proposal structure (both Markdown and JSON)
 */
export interface DAOProposal {
  id: string;
  title: string;
  description: string;
  proposalType: 'strategic' | 'operational' | 'financial' | 'governance' | 'technical';
  stratplanId: string;
  
  // Core proposal content
  objectives: string[];
  executionPlan: ExecutionPlan;
  budgetRequest?: BudgetRequest;
  timeline: ProposalTimeline;
  success_criteria: string[];
  
  // Governance metadata
  votingPeriod: string;
  quorum: number;
  requiredApproval: number; // percentage
  stakeholders: string[];
  
  // Generated formats
  markdownContent: string;
  jsonContent: Record<string, any>;
  
  // Metadata
  createdAt: Date;
  createdBy: string;
  version: string;
  status: 'draft' | 'submitted' | 'voting' | 'approved' | 'rejected' | 'implemented';
}

/**
 * Execution plan for DAO proposal
 */
export interface ExecutionPlan {
  phases: ExecutionPhase[];
  dependencies: ExecutionDependency[];
  milestones: ExecutionMilestone[];
  resourceAllocations: ResourceAllocation[];
}

/**
 * Execution phase within a proposal
 */
export interface ExecutionPhase {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  tasks: ExecutionTask[];
  duration: string;
  budget: number;
  responsible_agents: string[];
  deliverables: string[];
}

/**
 * Individual execution task
 */
export interface ExecutionTask {
  id: string;
  name: string;
  description: string;
  assignedTo: string;
  estimatedHours: number;
  dependencies: string[];
  deliverables: string[];
}

/**
 * Execution dependency
 */
export interface ExecutionDependency {
  id: string;
  fromPhase: string;
  toPhase: string;
  type: 'hard' | 'soft';
  description: string;
}

/**
 * Execution milestone
 */
export interface ExecutionMilestone {
  id: string;
  name: string;
  description: string;
  targetDate: Date;
  success_criteria: string[];
  deliverables: string[];
}

/**
 * Resource allocation for execution
 */
export interface ResourceAllocation {
  phase: string;
  resourceType: string;
  amount: number;
  duration: string;
  cost: number;
  source: string;
}

/**
 * Budget request for DAO proposal
 */
export interface BudgetRequest {
  totalAmount: number;
  currency: string;
  breakdown: BudgetRequestBreakdown[];
  justification: string;
  paymentSchedule: PaymentSchedule[];
  contingency: number;
}

/**
 * Budget request breakdown
 */
export interface BudgetRequestBreakdown {
  category: string;
  amount: number;
  percentage: number;
  justification: string;
}

/**
 * Payment schedule for budget request
 */
export interface PaymentSchedule {
  milestone: string;
  amount: number;
  dueDate: Date;
  conditions: string[];
}

/**
 * Proposal timeline
 */
export interface ProposalTimeline {
  submissionDate: Date;
  votingStartDate: Date;
  votingEndDate: Date;
  implementationStartDate?: Date;
  estimatedCompletionDate?: Date;
  milestones: TimelineMilestone[];
}

/**
 * Timeline milestone for proposal
 */
export interface TimelineMilestone {
  id: string;
  name: string;
  date: Date;
  description: string;
  deliverables: string[];
}

/**
 * Final processing result
 */
export interface ProcessingResult {
  success: boolean;
  stratplanId: string;
  proposalId?: string;
  analysis: StratplanAnalysis;
  proposal?: DAOProposal;
  
  // File outputs
  markdownFilePath?: string;
  jsonFilePath?: string;
  
  // Processing metadata
  processingTime: number;
  confidence: number;
  warnings: string[];
  errors: string[];
  
  // Next steps
  recommendedActions: string[];
  followUpRequired: boolean;
}

/**
 * Orchestration workflow data
 */
export interface OrchestrationWorkflow {
  stratplan: StratplanData;
  analysis: StratplanAnalysis;
  proposal: DAOProposal;
}

/**
 * Configuration for Chief of Staff Agent
 */
export interface ChiefOfStaffConfig {
  bizbuilderprompts: {
    repositoryUrl: string;
    accessToken?: string;
    defaultBranch: string;
  };
  output: {
    proposalsDirectory: string;
    markdownTemplate: string;
    jsonSchema: string;
  };
  dao: {
    daoEndpoint: string;
    governanceContract: string;
    proposalTypes: string[];
  };
  validation: {
    minConfidenceScore: number;
    requiredApprovals: number;
    maxProcessingTime: number;
  };
}