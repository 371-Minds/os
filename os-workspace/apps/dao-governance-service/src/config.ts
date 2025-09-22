/**
 * DAO Governance Configuration
 * 
 * Configuration setup for the DAO Governance Service with different
 * governance models and voting mechanisms.
 */

import {
  DAOGovernanceConfig,
  ProposalType,
  VotingMechanism,
  VotingConfiguration
} from './types.js';

/**
 * Default governance configuration for 371 DAO
 */
export const DEFAULT_DAO_CONFIG: DAOGovernanceConfig = {
  // Proposal submission rules
  proposal_submission: {
    minimum_stake_required: 1000, // Minimum stake to submit proposals
    submission_fee: 100, // Fee in DAO tokens
    review_period_days: 3, // Review period before voting starts
    supported_proposal_types: [
      ProposalType.STRATEGIC,
      ProposalType.OPERATIONAL,
      ProposalType.FINANCIAL,
      ProposalType.GOVERNANCE,
      ProposalType.TECHNICAL,
      ProposalType.EMERGENCY
    ]
  },

  // Default voting configuration
  default_voting_config: {
    voting_mechanism: VotingMechanism.WEIGHTED_VOTING,
    quorum_percentage: 20, // 20% participation required
    approval_threshold_percentage: 66, // 66% approval needed
    voting_power_calculation: {
      base_mechanism: 'hybrid',
      stake_weight_percentage: 70,
      reputation_weight_percentage: 30,
      minimum_stake_required: 100,
      maximum_voting_power_cap: 5000
    },
    eligible_voters: {
      minimum_stake_amount: 100,
      minimum_reputation_score: 50,
      blacklisted_addresses: [],
      registration_required: true
    },
    delegation_allowed: true,
    voting_period_hours: 168, // 7 days
    early_execution_allowed: true
  },

  // Type-specific voting configurations
  type_specific_configs: {
    [ProposalType.STRATEGIC]: {
      quorum_percentage: 30,
      approval_threshold_percentage: 75,
      voting_period_hours: 336 // 14 days for strategic decisions
    },
    [ProposalType.FINANCIAL]: {
      quorum_percentage: 25,
      approval_threshold_percentage: 70,
      voting_period_hours: 240 // 10 days for financial decisions
    },
    [ProposalType.GOVERNANCE]: {
      quorum_percentage: 35,
      approval_threshold_percentage: 80,
      voting_period_hours: 504 // 21 days for governance changes
    },
    [ProposalType.EMERGENCY]: {
      quorum_percentage: 15,
      approval_threshold_percentage: 60,
      voting_period_hours: 24 // 1 day for emergency proposals
    },
    [ProposalType.TECHNICAL]: {
      quorum_percentage: 20,
      approval_threshold_percentage: 66,
      voting_period_hours: 120 // 5 days for technical proposals
    },
    [ProposalType.OPERATIONAL]: {
      quorum_percentage: 15,
      approval_threshold_percentage: 60,
      voting_period_hours: 96 // 4 days for operational changes
    }
  },

  // Emergency protocols
  emergency_protocols: {
    emergency_voting_period_hours: 24,
    emergency_quorum_percentage: 15,
    emergency_council_addresses: [
      '0x1234567890123456789012345678901234567890', // CEO Agent
      '0x2345678901234567890123456789012345678901', // CTO Agent
      '0x3456789012345678901234567890123456789012'  // CFO Agent
    ],
    veto_power_enabled: true
  },

  // Execution configuration
  execution_config: {
    automatic_execution_enabled: true,
    execution_delay_hours: 48, // 48 hour delay before execution
    maximum_execution_attempts: 3,
    budget_approval_required: true
  },

  // Blockchain integration
  blockchain_config: {
    supported_chains: ['ethereum', 'polygon', 'sepolia'],
    primary_chain: 'ethereum',
    governance_contract_addresses: {
      ethereum: '0x4567890123456789012345678901234567890123',
      polygon: '0x5678901234567890123456789012345678901234',
      sepolia: '0x6789012345678901234567890123456789012345'
    }
  },

  // Agent coordination
  agent_coordination: {
    required_agent_signoffs: ['CEO', 'CTO', 'CFO'],
    agent_role_mapping: {
      'CEO': ['strategic', 'governance'],
      'CTO': ['technical', 'operational'],
      'CFO': ['financial', 'operational'],
      'CLO': ['governance', 'strategic'],
      'CMO': ['operational', 'strategic']
    },
    escalation_procedures: [
      {
        trigger_condition: 'proposal_execution_failed',
        escalation_level: 'high',
        responsible_parties: ['CEO', 'CTO'],
        resolution_timeframe_hours: 24,
        automatic_actions: ['notify_stakeholders', 'create_incident_report']
      },
      {
        trigger_condition: 'voting_anomaly_detected',
        escalation_level: 'medium',
        responsible_parties: ['CLO'],
        resolution_timeframe_hours: 12,
        automatic_actions: ['pause_voting', 'investigate_anomaly']
      }
    ]
  }
};

/**
 * Development/Testing configuration with relaxed requirements
 */
export const DEV_DAO_CONFIG: DAOGovernanceConfig = {
  ...DEFAULT_DAO_CONFIG,
  
  proposal_submission: {
    ...DEFAULT_DAO_CONFIG.proposal_submission,
    minimum_stake_required: 10,
    submission_fee: 1,
    review_period_days: 0 // No review period in dev
  },

  default_voting_config: {
    ...DEFAULT_DAO_CONFIG.default_voting_config,
    quorum_percentage: 10, // Lower quorum for testing
    approval_threshold_percentage: 51,
    voting_period_hours: 1, // 1 hour voting for fast testing
    eligible_voters: {
      ...DEFAULT_DAO_CONFIG.default_voting_config.eligible_voters,
      minimum_stake_amount: 1,
      minimum_reputation_score: 1
    }
  },

  type_specific_configs: {
    [ProposalType.STRATEGIC]: {
      quorum_percentage: 10,
      approval_threshold_percentage: 60,
      voting_period_hours: 2
    },
    [ProposalType.FINANCIAL]: {
      quorum_percentage: 10,
      approval_threshold_percentage: 55,
      voting_period_hours: 1
    },
    [ProposalType.GOVERNANCE]: {
      quorum_percentage: 15,
      approval_threshold_percentage: 65,
      voting_period_hours: 3
    },
    [ProposalType.EMERGENCY]: {
      quorum_percentage: 5,
      approval_threshold_percentage: 51,
      voting_period_hours: 0.5 // 30 minutes
    }
  },

  execution_config: {
    ...DEFAULT_DAO_CONFIG.execution_config,
    execution_delay_hours: 0, // No delay in dev
    automatic_execution_enabled: true
  }
};

/**
 * High-security configuration for critical infrastructure
 */
export const HIGH_SECURITY_DAO_CONFIG: DAOGovernanceConfig = {
  ...DEFAULT_DAO_CONFIG,
  
  proposal_submission: {
    ...DEFAULT_DAO_CONFIG.proposal_submission,
    minimum_stake_required: 10000,
    submission_fee: 1000,
    review_period_days: 7
  },

  default_voting_config: {
    ...DEFAULT_DAO_CONFIG.default_voting_config,
    quorum_percentage: 40,
    approval_threshold_percentage: 80,
    voting_period_hours: 336, // 14 days minimum
    eligible_voters: {
      ...DEFAULT_DAO_CONFIG.default_voting_config.eligible_voters,
      minimum_stake_amount: 1000,
      minimum_reputation_score: 80,
      registration_required: true
    }
  },

  type_specific_configs: {
    [ProposalType.STRATEGIC]: {
      quorum_percentage: 50,
      approval_threshold_percentage: 85,
      voting_period_hours: 504 // 21 days
    },
    [ProposalType.GOVERNANCE]: {
      quorum_percentage: 60,
      approval_threshold_percentage: 90,
      voting_period_hours: 672 // 28 days
    },
    [ProposalType.EMERGENCY]: {
      quorum_percentage: 30,
      approval_threshold_percentage: 75,
      voting_period_hours: 48 // 2 days even for emergencies
    }
  },

  execution_config: {
    ...DEFAULT_DAO_CONFIG.execution_config,
    execution_delay_hours: 168, // 7 day delay
    automatic_execution_enabled: false // Manual execution required
  }
};

/**
 * Get configuration based on environment
 */
export function getDAOConfig(environment: 'development' | 'production' | 'high-security' = 'production'): DAOGovernanceConfig {
  switch (environment) {
    case 'development':
      return DEV_DAO_CONFIG;
    case 'high-security':
      return HIGH_SECURITY_DAO_CONFIG;
    case 'production':
    default:
      return DEFAULT_DAO_CONFIG;
  }
}

/**
 * Validate DAO configuration
 */
export function validateDAOConfig(config: DAOGovernanceConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate proposal submission config
  if (config.proposal_submission.minimum_stake_required < 0) {
    errors.push('Minimum stake required cannot be negative');
  }

  if (config.proposal_submission.submission_fee < 0) {
    errors.push('Submission fee cannot be negative');
  }

  if (config.proposal_submission.review_period_days < 0) {
    errors.push('Review period cannot be negative');
  }

  // Validate default voting config
  const voting = config.default_voting_config;
  if (voting.quorum_percentage < 0 || voting.quorum_percentage > 100) {
    errors.push('Quorum percentage must be between 0 and 100');
  }

  if (voting.approval_threshold_percentage < 0 || voting.approval_threshold_percentage > 100) {
    errors.push('Approval threshold must be between 0 and 100');
  }

  if (voting.voting_period_hours <= 0) {
    errors.push('Voting period must be positive');
  }

  // Validate voting power calculation
  const calc = voting.voting_power_calculation;
  if (calc.stake_weight_percentage + calc.reputation_weight_percentage !== 100) {
    errors.push('Stake and reputation weight percentages must sum to 100');
  }

  // Validate emergency protocols
  if (config.emergency_protocols.emergency_voting_period_hours <= 0) {
    errors.push('Emergency voting period must be positive');
  }

  if (config.emergency_protocols.emergency_council_addresses.length === 0) {
    errors.push('Emergency council must have at least one address');
  }

  // Validate execution config
  if (config.execution_config.execution_delay_hours < 0) {
    errors.push('Execution delay cannot be negative');
  }

  if (config.execution_config.maximum_execution_attempts <= 0) {
    errors.push('Maximum execution attempts must be positive');
  }

  // Validate blockchain config
  if (config.blockchain_config.supported_chains.length === 0) {
    errors.push('At least one blockchain must be supported');
  }

  if (!config.blockchain_config.supported_chains.includes(config.blockchain_config.primary_chain)) {
    errors.push('Primary chain must be in supported chains list');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Create custom voting configuration for specific proposal types
 */
export function createCustomVotingConfig(
  baseConfig: VotingConfiguration,
  overrides: Partial<VotingConfiguration>
): VotingConfiguration {
  return {
    ...baseConfig,
    ...overrides,
    voting_power_calculation: {
      ...baseConfig.voting_power_calculation,
      ...(overrides.voting_power_calculation || {})
    },
    eligible_voters: {
      ...baseConfig.eligible_voters,
      ...(overrides.eligible_voters || {})
    }
  };
}

/**
 * Calculate required votes for proposal approval
 */
export function calculateRequiredVotes(
  totalEligibleVoters: number,
  totalVotingPower: number,
  config: VotingConfiguration
): {
  requiredParticipation: number;
  requiredApprovalVotes: number;
  requiredApprovalPower: number;
} {
  const requiredParticipation = Math.ceil(
    (totalVotingPower * config.quorum_percentage) / 100
  );
  
  const requiredApprovalPower = Math.ceil(
    (requiredParticipation * config.approval_threshold_percentage) / 100
  );

  const requiredApprovalVotes = Math.ceil(
    (totalEligibleVoters * config.quorum_percentage * config.approval_threshold_percentage) / 10000
  );

  return {
    requiredParticipation,
    requiredApprovalVotes,
    requiredApprovalPower
  };
}