/**
 * Shared TypeScript interfaces for 371 Minds OS
 * Core types used across multiple packages
 */

/**
 * Represents an entry in the agent registry
 */
export interface AgentRegistryEntry {
  /**
   * Unique identifier for the agent
   */
  agentId: string;
  
  /**
   * Decentralized identifier for the agent
   */
  did: string;
  
  /**
   * Capabilities of the agent
   */
  capabilities: AgentCapability[];
  
  /**
   * Reputation score of the agent
   */
  reputation: ReputationScore;
  
  /**
   * Amount of stake provided by the agent
   */
  stakeAmount: bigint;
}

/**
 * Represents a capability of an agent
 */
export interface AgentCapability {
  /**
   * Name of the capability
   */
  name: string;
  
  /**
   * Description of the capability
   */
  description: string;
  
  /**
   * Version of the capability
   */
  version: string;
}

/**
 * Represents a reputation score
 */
export interface ReputationScore {
  /**
   * Numerical value of the reputation score
   */
  value: number;
  
  /**
   * Timestamp of when the score was last updated
   */
  lastUpdated: Date;
}