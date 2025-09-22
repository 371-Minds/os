/**
 * DAO Governance Service Types
 * 
 * Comprehensive type definitions for the DAO Governance & Voting System
 * that manages proposal lifecycle, voting mechanics, and governance outcomes.
 */

/**
 * Core governance proposal structure
 */
export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  proposerAddress: string;
  type: ProposalType;
  status: ProposalStatus;
  
  // Content and execution details
  executionDetails: ExecutionDetails;
  budgetRequest?: BudgetRequest;
  timeline: ProposalTimeline;
  
  // Voting configuration
  votingConfig: VotingConfiguration;
  
  // Results and tracking
  votingResults?: VotingResults;
  executionStatus?: ExecutionStatus;
  
  // Metadata
  createdAt: Date;
  submittedAt?: Date;
  votingStartsAt?: Date;
  votingEndsAt?: Date;
  executedAt?: Date;
  
  // Blockchain integration
  blockchainData?: BlockchainProposalData;
  
  // Stakeholder information
  stakeholders: string[];
  impactedAgents: string[];
  
  // Validation and requirements
  requiresCustomQuorum?: boolean;
  customQuorumPercentage?: number;
  requiresSuperMajority?: boolean;
  emergencyProposal?: boolean;
}

/**
 * Types of governance proposals
 */
export enum ProposalType {
  STRATEGIC = 'strategic',
  OPERATIONAL = 'operational', 
  FINANCIAL = 'financial',
  GOVERNANCE = 'governance',
  TECHNICAL = 'technical',
  EMERGENCY = 'emergency',
  CONSTITUTIONAL = 'constitutional'
}

/**
 * Proposal status throughout lifecycle
 */
export enum ProposalStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  UNDER_REVIEW = 'under_review',
  VOTING_PENDING = 'voting_pending',
  VOTING_ACTIVE = 'voting_active',
  VOTING_ENDED = 'voting_ended',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  EXECUTED = 'executed',
  FAILED_EXECUTION = 'failed_execution',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired'
}

/**
 * Execution details for approved proposals
 */
export interface ExecutionDetails {
  phases: ExecutionPhase[];
  dependencies: ExecutionDependency[];
  success_criteria: string[];
  risk_mitigation: RiskMitigation[];
  resource_requirements: ResourceRequirement[];
}

/**
 * Individual execution phase
 */
export interface ExecutionPhase {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  deliverables: string[];
  estimatedDuration: string;
  responsible_agents: string[];
  budget_allocation?: number;
  completion_criteria: string[];
  dependencies: string[];
}

/**
 * Execution dependencies between phases
 */
export interface ExecutionDependency {
  id: string;
  fromPhase: string;
  toPhase: string;
  dependencyType: 'blocking' | 'preferred' | 'informational';
  description: string;
}

/**
 * Risk mitigation strategies
 */
export interface RiskMitigation {
  risk_id: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigation_strategy: string;
  contingency_plan: string;
  responsible_party: string;
}

/**
 * Resource requirements for execution
 */
export interface ResourceRequirement {
  type: 'human' | 'technical' | 'financial' | 'infrastructure';
  description: string;
  quantity: number;
  unit: string;
  estimated_cost?: number;
  priority: 'required' | 'preferred' | 'optional';
  availability_timeline: string;
}

/**
 * Budget request for proposals requiring funding
 */
export interface BudgetRequest {
  total_amount: number;
  currency: string;
  breakdown: BudgetBreakdown[];
  justification: string;
  funding_source: string;
  payment_schedule: PaymentMilestone[];
  contingency_percentage: number;
}

/**
 * Budget breakdown by category
 */
export interface BudgetBreakdown {
  category: string;
  amount: number;
  percentage: number;
  description: string;
}

/**
 * Payment milestones for budget disbursement
 */
export interface PaymentMilestone {
  milestone_id: string;
  amount: number;
  trigger_conditions: string[];
  expected_date: Date;
  approval_required: boolean;
}

/**
 * Proposal timeline and key dates
 */
export interface ProposalTimeline {
  submission_deadline?: Date;
  review_period_days: number;
  voting_period_days: number;
  execution_start_date?: Date;
  estimated_completion_date?: Date;
  key_milestones: TimelineMilestone[];
}

/**
 * Key milestones in proposal lifecycle
 */
export interface TimelineMilestone {
  id: string;
  name: string;
  description: string;
  target_date: Date;
  completion_criteria: string[];
  responsible_parties: string[];
}

/**
 * Voting configuration for proposals
 */
export interface VotingConfiguration {
  voting_mechanism: VotingMechanism;
  quorum_percentage: number;
  approval_threshold_percentage: number;
  voting_power_calculation: VotingPowerCalculation;
  eligible_voters: VoterEligibility;
  delegation_allowed: boolean;
  voting_period_hours: number;
  early_execution_allowed: boolean;
}

/**
 * Different voting mechanisms available
 */
export enum VotingMechanism {
  SIMPLE_MAJORITY = 'simple_majority',
  SUPERMAJORITY = 'supermajority',
  QUADRATIC_VOTING = 'quadratic_voting',
  WEIGHTED_VOTING = 'weighted_voting',
  RANKED_CHOICE = 'ranked_choice',
  CONVICTION_VOTING = 'conviction_voting'
}

/**
 * How voting power is calculated
 */
export interface VotingPowerCalculation {
  base_mechanism: 'stake_weighted' | 'reputation_weighted' | 'hybrid' | 'equal';
  stake_weight_percentage: number;
  reputation_weight_percentage: number;
  minimum_stake_required?: number;
  maximum_voting_power_cap?: number;
  decay_factor?: number; // For conviction voting
}

/**
 * Voter eligibility criteria
 */
export interface VoterEligibility {
  minimum_stake_amount?: number;
  minimum_reputation_score?: number;
  required_agent_types?: string[];
  blacklisted_addresses: string[];
  whitelist_only?: boolean;
  whitelisted_addresses?: string[];
  registration_required: boolean;
}

/**
 * Individual vote cast by an agent/user
 */
export interface Vote {
  voter_id: string;
  voter_address: string;
  proposal_id: string;
  vote_option: VoteOption;
  voting_power: number;
  reason?: string;
  delegated_votes?: DelegatedVote[];
  timestamp: Date;
  transaction_hash?: string;
  signature: string;
}

/**
 * Vote options available
 */
export enum VoteOption {
  FOR = 'for',
  AGAINST = 'against',
  ABSTAIN = 'abstain',
  VETO = 'veto' // For emergency proposals
}

/**
 * Delegated votes when delegation is allowed
 */
export interface DelegatedVote {
  delegator_address: string;
  voting_power: number;
  delegation_timestamp: Date;
}

/**
 * Comprehensive voting results
 */
export interface VotingResults {
  proposal_id: string;
  total_votes_cast: number;
  total_voting_power: number;
  quorum_achieved: boolean;
  approval_threshold_met: boolean;
  
  // Vote tallies
  votes_for: number;
  votes_against: number;
  votes_abstain: number;
  votes_veto?: number;
  
  // Power-weighted tallies
  power_for: number;
  power_against: number;
  power_abstain: number;
  power_veto?: number;
  
  // Participation metrics
  participation_rate: number;
  unique_voters: number;
  delegated_votes_count: number;
  
  // Agent type breakdown
  agent_participation: AgentParticipation[];
  
  // Geographic/network distribution if applicable
  network_distribution?: NetworkDistribution[];
  
  // Final decision
  outcome: VotingOutcome;
  execution_authorized: boolean;
  
  // Metadata
  voting_ended_at: Date;
  results_finalized_at: Date;
}

/**
 * Participation breakdown by agent type
 */
export interface AgentParticipation {
  agent_type: string;
  total_eligible: number;
  votes_cast: number;
  participation_rate: number;
  voting_power_exercised: number;
}

/**
 * Network distribution of votes
 */
export interface NetworkDistribution {
  network_id: string;
  votes_count: number;
  voting_power: number;
  percentage_of_total: number;
}

/**
 * Final voting outcome
 */
export enum VotingOutcome {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  QUORUM_NOT_MET = 'quorum_not_met',
  VETOED = 'vetoed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

/**
 * Execution status tracking
 */
export interface ExecutionStatus {
  proposal_id: string;
  current_phase: string;
  overall_progress_percentage: number;
  phase_statuses: PhaseStatus[];
  encountered_issues: ExecutionIssue[];
  budget_utilization: BudgetUtilization;
  timeline_adherence: TimelineAdherence;
  quality_metrics: QualityMetric[];
  next_milestones: UpcomingMilestone[];
}

/**
 * Status of individual execution phases
 */
export interface PhaseStatus {
  phase_id: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed' | 'failed';
  progress_percentage: number;
  start_date?: Date;
  completion_date?: Date;
  deliverables_completed: string[];
  blockers: string[];
  responsible_agent_status: AgentStatus[];
}

/**
 * Status of agents responsible for execution
 */
export interface AgentStatus {
  agent_id: string;
  role: string;
  availability: 'available' | 'busy' | 'unavailable';
  current_tasks: string[];
  completion_rate: number;
}

/**
 * Issues encountered during execution
 */
export interface ExecutionIssue {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  impact_on_timeline: string;
  impact_on_budget: number;
  resolution_plan: string;
  responsible_party: string;
  created_at: Date;
  resolved_at?: Date;
}

/**
 * Budget utilization tracking
 */
export interface BudgetUtilization {
  total_allocated: number;
  total_spent: number;
  remaining_budget: number;
  utilization_percentage: number;
  spending_by_category: CategorySpending[];
  projected_overrun: number;
  cost_efficiency_score: number;
}

/**
 * Spending breakdown by category
 */
export interface CategorySpending {
  category: string;
  allocated: number;
  spent: number;
  remaining: number;
  utilization_rate: number;
}

/**
 * Timeline adherence tracking
 */
export interface TimelineAdherence {
  original_timeline_days: number;
  actual_days_elapsed: number;
  projected_total_days: number;
  schedule_variance_days: number;
  schedule_performance_index: number;
  critical_path_delays: CriticalPathDelay[];
}

/**
 * Critical path delays
 */
export interface CriticalPathDelay {
  phase_id: string;
  delay_days: number;
  reason: string;
  impact_on_overall_timeline: number;
  mitigation_plan: string;
}

/**
 * Quality metrics for execution
 */
export interface QualityMetric {
  metric_name: string;
  target_value: number;
  actual_value: number;
  measurement_unit: string;
  trend: 'improving' | 'stable' | 'declining';
  last_measured: Date;
}

/**
 * Upcoming milestones
 */
export interface UpcomingMilestone {
  milestone_id: string;
  name: string;
  target_date: Date;
  completion_criteria: string[];
  risk_factors: string[];
  preparation_status: 'on_track' | 'at_risk' | 'delayed';
}

/**
 * Blockchain integration data
 */
export interface BlockchainProposalData {
  chain_id: string;
  contract_address: string;
  proposal_id_onchain: string;
  transaction_hash: string;
  block_number: number;
  gas_used: number;
  confirmation_count: number;
  ipfs_hash?: string; // For storing large proposal data
}

/**
 * Event types for proposal lifecycle tracking
 */
export enum GovernanceEventType {
  PROPOSAL_CREATED = 'proposal_created',
  PROPOSAL_SUBMITTED = 'proposal_submitted',
  VOTING_STARTED = 'voting_started',
  VOTE_CAST = 'vote_cast',
  VOTING_ENDED = 'voting_ended',
  PROPOSAL_APPROVED = 'proposal_approved',
  PROPOSAL_REJECTED = 'proposal_rejected',
  EXECUTION_STARTED = 'execution_started',
  PHASE_COMPLETED = 'phase_completed',
  MILESTONE_REACHED = 'milestone_reached',
  ISSUE_REPORTED = 'issue_reported',
  BUDGET_MILESTONE_PAID = 'budget_milestone_paid',
  PROPOSAL_COMPLETED = 'proposal_completed'
}

/**
 * Governance event for audit trail
 */
export interface GovernanceEvent {
  id: string;
  type: GovernanceEventType;
  proposal_id: string;
  triggered_by: string;
  timestamp: Date;
  data: Record<string, any>;
  blockchain_reference?: string;
}

/**
 * DAO governance configuration
 */
export interface DAOGovernanceConfig {
  // Proposal submission rules
  proposal_submission: {
    minimum_stake_required: number;
    submission_fee: number;
    review_period_days: number;
    supported_proposal_types: ProposalType[];
  };
  
  // Default voting configurations
  default_voting_config: VotingConfiguration;
  
  // Type-specific overrides
  type_specific_configs: {
    [key in ProposalType]?: Partial<VotingConfiguration>;
  };
  
  // Emergency procedures
  emergency_protocols: {
    emergency_voting_period_hours: number;
    emergency_quorum_percentage: number;
    emergency_council_addresses: string[];
    veto_power_enabled: boolean;
  };
  
  // Execution parameters
  execution_config: {
    automatic_execution_enabled: boolean;
    execution_delay_hours: number;
    maximum_execution_attempts: number;
    budget_approval_required: boolean;
  };
  
  // Integration settings
  blockchain_config: {
    supported_chains: string[];
    primary_chain: string;
    governance_contract_addresses: Record<string, string>;
  };
  
  // Agent coordination
  agent_coordination: {
    required_agent_signoffs: string[];
    agent_role_mapping: Record<string, string[]>;
    escalation_procedures: EscalationProcedure[];
  };
}

/**
 * Escalation procedures for governance issues
 */
export interface EscalationProcedure {
  trigger_condition: string;
  escalation_level: 'low' | 'medium' | 'high' | 'critical';
  responsible_parties: string[];
  resolution_timeframe_hours: number;
  automatic_actions: string[];
}

/**
 * API request/response types
 */
export interface CreateProposalRequest {
  title: string;
  description: string;
  type: ProposalType;
  proposer: string;
  execution_details: ExecutionDetails;
  budget_request?: BudgetRequest;
  timeline: ProposalTimeline;
  voting_config?: Partial<VotingConfiguration>;
  stakeholders: string[];
  emergency_proposal?: boolean;
}

export interface SubmitVoteRequest {
  proposal_id: string;
  voter_address: string;
  vote_option: VoteOption;
  voting_power?: number;
  reason?: string;
  signature: string;
  delegated_votes?: DelegatedVote[];
}

export interface ProposalQueryParams {
  status?: ProposalStatus;
  type?: ProposalType;
  proposer?: string;
  created_after?: Date;
  created_before?: Date;
  voting_active?: boolean;
  page?: number;
  limit?: number;
  sort_by?: 'created_at' | 'voting_ends_at' | 'total_votes' | 'voting_power';
  sort_order?: 'asc' | 'desc';
}

export interface GovernanceServiceResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  metadata?: {
    total_count?: number;
    page?: number;
    limit?: number;
    execution_time_ms?: number;
  };
}