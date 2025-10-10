/**
 * Example configuration for Status Network Integration
 * 
 * This file demonstrates how to configure the Status Network plugin
 * for different environments and use cases.
 */

import type { 
  StatusNetworkConfig,
  StatusNetworkPluginConfig,
  GovernanceParams,
  FeeStructure,
  TokenomicsConfig
} from '@elizaos/plugin-status-network';
import { ethers } from 'ethers';

/**
 * Production Status Network Configuration
 */
export const PRODUCTION_CONFIG: StatusNetworkConfig = {
  rpcUrl: 'https://rpc.status.network',
  chainId: 1, // Status Network mainnet
  sntTokenAddress: '0x744d70FDBE2Ba4CF95131626614a1763DF805B9E',
  daoFactoryAddress: process.env.DAO_FACTORY_ADDRESS || '',
  registryAddress: process.env.AGENT_REGISTRY_ADDRESS || '',
  gaslessRelayUrl: 'https://relay.status.network',
  ipfsGateway: 'https://ipfs.status.network'
};

/**
 * Development/Testnet Configuration
 */
export const DEVELOPMENT_CONFIG: StatusNetworkConfig = {
  rpcUrl: 'https://testnet-rpc.status.network',
  chainId: 11155111, // Status testnet
  sntTokenAddress: '0x...', // Testnet SNT address
  daoFactoryAddress: '0x...', // Testnet DAO factory
  registryAddress: '0x...', // Testnet registry
  gaslessRelayUrl: 'https://testnet-relay.status.network',
  ipfsGateway: 'https://testnet-ipfs.status.network'
};

/**
 * Default Governance Parameters
 */
export const DEFAULT_GOVERNANCE: GovernanceParams = {
  votingDelay: 1, // 1 block (~12 seconds)
  votingPeriod: 50400, // ~7 days in blocks
  proposalThreshold: ethers.parseEther('1000'), // 1000 SNT minimum
  quorum: 40, // 40% quorum required
  timelock: 86400 // 24 hour timelock
};

/**
 * Conservative Governance (for high-stakes communities)
 */
export const CONSERVATIVE_GOVERNANCE: GovernanceParams = {
  votingDelay: 100, // ~20 minutes
  votingPeriod: 100800, // ~14 days
  proposalThreshold: ethers.parseEther('10000'), // 10k SNT minimum
  quorum: 60, // 60% quorum
  timelock: 259200 // 3 day timelock
};

/**
 * Rapid Governance (for experimental communities)
 */
export const RAPID_GOVERNANCE: GovernanceParams = {
  votingDelay: 1,
  votingPeriod: 7200, // ~1 day
  proposalThreshold: ethers.parseEther('100'), // 100 SNT minimum
  quorum: 20, // 20% quorum
  timelock: 3600 // 1 hour timelock
};

/**
 * Default Fee Structure
 */
export const DEFAULT_FEE_STRUCTURE: FeeStructure = {
  baseFeePercent: 2.5, // 2.5% base fee
  volumeTiers: [
    { threshold: ethers.parseEther('10000'), feePercent: 2.0 }, // 2% for 10k+
    { threshold: ethers.parseEther('100000'), feePercent: 1.5 }, // 1.5% for 100k+
    { threshold: ethers.parseEther('1000000'), feePercent: 1.0 } // 1% for 1M+
  ],
  agentServiceFee: 1.0, // 1% agent service fee
  governanceFee: 0.5 // 0.5% governance fee
};

/**
 * Zero-Fee Structure (for community-focused DAOs)
 */
export const ZERO_FEE_STRUCTURE: FeeStructure = {
  baseFeePercent: 0,
  volumeTiers: [],
  agentServiceFee: 0,
  governanceFee: 0
};

/**
 * Tokenomics Configuration
 */
export const DEFAULT_TOKENOMICS: TokenomicsConfig = {
  sntTokenAddress: PRODUCTION_CONFIG.sntTokenAddress,
  stakingContract: process.env.STAKING_CONTRACT_ADDRESS || '',
  rewardPool: process.env.REWARD_POOL_ADDRESS || '',
  feeStructure: DEFAULT_FEE_STRUCTURE,
  inflationRate: 0.05, // 5% annual inflation for rewards
  burnRate: 0.01 // 1% token burn
};

/**
 * Complete Plugin Configuration
 */
export const DEFAULT_PLUGIN_CONFIG: StatusNetworkPluginConfig = {
  networkConfig: PRODUCTION_CONFIG,
  defaultGovernanceParams: DEFAULT_GOVERNANCE,
  defaultFeeStructure: DEFAULT_FEE_STRUCTURE,
  agentRegistryAddress: process.env.AGENT_REGISTRY_ADDRESS || '',
  enableGaslessTransactions: true,
  enableCrossCommunityCoordination: true
};

/**
 * Development Plugin Configuration
 */
export const DEV_PLUGIN_CONFIG: StatusNetworkPluginConfig = {
  networkConfig: DEVELOPMENT_CONFIG,
  defaultGovernanceParams: RAPID_GOVERNANCE,
  defaultFeeStructure: ZERO_FEE_STRUCTURE,
  agentRegistryAddress: '0x...',
  enableGaslessTransactions: true,
  enableCrossCommunityCoordination: true
};

/**
 * Example: Create a community with custom configuration
 */
export const EXAMPLE_COMMUNITY_CONFIG = {
  communityName: '371-os-core-developers',
  description: 'Core development community for 371 OS autonomous agent platform',
  topics: ['autonomous-agents', 'blockchain', 'ai', 'decentralization'],
  governanceParams: DEFAULT_GOVERNANCE,
  initialFunding: ethers.parseEther('100000'), // 100k SNT
  membershipRules: {
    minimumStake: ethers.parseEther('100'), // 100 SNT minimum stake
    inviteOnly: false, // Open membership
    verificationRequired: true, // Require identity verification
    reputationRequired: 50 // Minimum 50 reputation points
  }
};

/**
 * Helper: Get configuration for current environment
 */
export function getConfig(environment: 'production' | 'development' | 'local' = 'production'): StatusNetworkPluginConfig {
  switch (environment) {
    case 'production':
      return DEFAULT_PLUGIN_CONFIG;
    case 'development':
      return DEV_PLUGIN_CONFIG;
    case 'local':
      return {
        ...DEV_PLUGIN_CONFIG,
        networkConfig: {
          ...DEVELOPMENT_CONFIG,
          rpcUrl: 'http://localhost:8545', // Local blockchain
          gaslessRelayUrl: 'http://localhost:3000' // Local relay
        }
      };
    default:
      return DEFAULT_PLUGIN_CONFIG;
  }
}

/**
 * Helper: Validate configuration
 */
export function validateConfig(config: StatusNetworkPluginConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate network config
  if (!config.networkConfig.rpcUrl) {
    errors.push('RPC URL is required');
  }
  if (!config.networkConfig.sntTokenAddress) {
    errors.push('SNT token address is required');
  }
  if (!config.networkConfig.daoFactoryAddress) {
    errors.push('DAO factory address is required');
  }

  // Validate governance params
  if (config.defaultGovernanceParams.quorum < 0 || config.defaultGovernanceParams.quorum > 100) {
    errors.push('Quorum must be between 0 and 100');
  }

  // Validate fee structure
  if (config.defaultFeeStructure.baseFeePercent < 0 || config.defaultFeeStructure.baseFeePercent > 100) {
    errors.push('Base fee percent must be between 0 and 100');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
