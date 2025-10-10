/**
 * @elizaos/plugin-status-network
 * 
 * Status Network integration plugin for 371 OS
 * Enables community building, DAO governance, and autonomous agent coordination
 * 
 * @module status-network-integration
 */

// Core managers
export { StatusNetworkCommunityManager } from './community-manager.js';
export { AgentCommunityCoordinator } from './agent-coordinator.js';
export { GaslessTransactionManager } from './gasless-manager.js';
export { CommunityTokenomics } from './tokenomics.js';
export { InterCommunityCoordinator } from './inter-community.js';

// Types
export type {
  // Community types
  CommunityConfig,
  CommunityDAO,
  CommunityMember,
  CommunityEvent,
  
  // Agent types
  AgentCommunityAssignment,
  AgentPerformanceMetrics,
  
  // Governance types
  GovernanceParams,
  GovernanceProposal,
  ProposalVotes,
  MembershipRules,
  
  // Economic types
  TokenomicsConfig,
  FeeStructure,
  VolumeTier,
  GaslessTransaction,
  
  // Cross-community types
  CrossCommunityProject,
  ProjectTimeline,
  Milestone,
  Deliverable,
  
  // Configuration types
  StatusNetworkConfig,
  StatusNetworkPluginConfig,
  
  // Address type
  Address
} from './types.js';

// Enums
export {
  CommunityRole,
  ProposalType,
  ProposalStatus,
  DeliverableStatus,
  CommunityEventType
} from './types.js';

// Plugin metadata
export const plugin = {
  name: '@elizaos/plugin-status-network',
  version: '1.0.0',
  description: 'Status Network integration for community building and DAO governance',
  author: '371 Minds',
  capabilities: [
    'community-creation',
    'dao-governance',
    'agent-coordination',
    'gasless-transactions',
    'tokenomics-management',
    'cross-community-projects'
  ]
};
