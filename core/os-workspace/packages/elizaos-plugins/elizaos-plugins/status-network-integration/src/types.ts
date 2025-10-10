// Address type - using string as ethers v6 uses string for addresses
export type Address = string;

// Re-export for convenience
export type { Address as EthersAddress };

// Community Configuration
export interface CommunityConfig {
  communityName: string;
  description: string;
  topics: string[];
  governanceParams: GovernanceParams;
  initialFunding: bigint;
  membershipRules: MembershipRules;
}

export interface GovernanceParams {
  votingDelay: number; // blocks
  votingPeriod: number; // blocks
  proposalThreshold: bigint; // SNT tokens
  quorum: number; // percentage
  timelock: number; // seconds
}

export interface MembershipRules {
  minimumStake: bigint;
  inviteOnly: boolean;
  verificationRequired: boolean;
  reputationRequired: number;
}

// Community DAO
export interface CommunityDAO {
  id: string;
  address: Address;
  name: string;
  memberCount: number;
  treasuryBalance: bigint;
  governanceToken: Address;
  createdAt: Date;
  active: boolean;
}

export interface CommunityMember {
  address: Address;
  joinedAt: Date;
  reputation: number;
  stakeAmount: bigint;
  votingPower: bigint;
  roles: CommunityRole[];
}

export enum CommunityRole {
  MEMBER = 'member',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
  AGENT = 'agent',
  VALIDATOR = 'validator'
}

// Agent Integration
export interface AgentCommunityAssignment {
  agentId: string;
  communityId: string;
  role: CommunityRole;
  capabilities: string[];
  compensationRate: bigint; // SNT per task
  performanceMetrics: AgentPerformanceMetrics;
}

export interface AgentPerformanceMetrics {
  tasksCompleted: number;
  successRate: number;
  communityRating: number;
  totalEarnings: bigint;
  lastActive: Date;
}

// Economic Models
export interface TokenomicsConfig {
  sntTokenAddress: Address;
  stakingContract: Address;
  rewardPool: Address;
  feeStructure: FeeStructure;
  inflationRate: number;
  burnRate: number;
}

export interface FeeStructure {
  baseFeePercent: number;
  volumeTiers: VolumeTier[];
  agentServiceFee: number;
  governanceFee: number;
}

export interface VolumeTier {
  threshold: bigint;
  feePercent: number;
}

// Governance Proposals
export interface GovernanceProposal {
  id: string;
  proposer: Address;
  title: string;
  description: string;
  proposalType: ProposalType;
  parameters: Record<string, any>;
  votingPeriod: number;
  status: ProposalStatus;
  votes: ProposalVotes;
  executionTime?: Date;
}

export enum ProposalType {
  PARAMETER_CHANGE = 'parameter-change',
  AGENT_ONBOARDING = 'agent-onboarding',
  TREASURY_ALLOCATION = 'treasury-allocation',
  FEE_ADJUSTMENT = 'fee-adjustment',
  PLATFORM_INTEGRATION = 'platform-integration',
  EMERGENCY_ACTION = 'emergency-action'
}

export enum ProposalStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUCCEEDED = 'succeeded',
  DEFEATED = 'defeated',
  QUEUED = 'queued',
  EXECUTED = 'executed',
  CANCELLED = 'cancelled'
}

export interface ProposalVotes {
  for: bigint;
  against: bigint;
  abstain: bigint;
  totalVoters: number;
  quorumReached: boolean;
}

// Cross-Community Coordination
export interface CrossCommunityProject {
  id: string;
  name: string;
  description: string;
  participatingCommunities: string[];
  budget: bigint;
  timeline: ProjectTimeline;
  deliverables: Deliverable[];
  coordinatingAgent: string;
}

export interface ProjectTimeline {
  startDate: Date;
  endDate: Date;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  deliverables: string[];
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  assignedCommunity: string;
  status: DeliverableStatus;
  budget: bigint;
}

export enum DeliverableStatus {
  NOT_STARTED = 'not-started',
  IN_PROGRESS = 'in-progress',
  UNDER_REVIEW = 'under-review',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Status Network Specific
export interface StatusNetworkConfig {
  rpcUrl: string;
  chainId: number;
  sntTokenAddress: Address;
  daoFactoryAddress: Address;
  registryAddress: Address;
  gaslessRelayUrl: string;
  ipfsGateway: string;
}

export interface GaslessTransaction {
  to: Address;
  data: string;
  value: bigint;
  signature: string;
  nonce: number;
  relayerFee: bigint;
}

// Events
export interface CommunityEvent {
  type: CommunityEventType;
  communityId: string;
  timestamp: Date;
  data: Record<string, any>;
  transactionHash?: string;
}

export enum CommunityEventType {
  COMMUNITY_CREATED = 'community-created',
  MEMBER_JOINED = 'member-joined',
  MEMBER_LEFT = 'member-left',
  PROPOSAL_CREATED = 'proposal-created',
  VOTE_CAST = 'vote-cast',
  PROPOSAL_EXECUTED = 'proposal-executed',
  AGENT_ASSIGNED = 'agent-assigned',
  TREASURY_UPDATED = 'treasury-updated',
  CROSS_COMMUNITY_PROJECT_STARTED = 'cross-community-project-started'
}

// Plugin Configuration
export interface StatusNetworkPluginConfig {
  networkConfig: StatusNetworkConfig;
  defaultGovernanceParams: GovernanceParams;
  defaultFeeStructure: FeeStructure;
  agentRegistryAddress: Address;
  enableGaslessTransactions: boolean;
  enableCrossCommunityCoordination: boolean;
}