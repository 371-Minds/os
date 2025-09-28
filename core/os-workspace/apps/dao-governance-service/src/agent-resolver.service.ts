/**
 * Agent Resolver Service
 * 
 * Maps between legacy agent identifiers and new ElizaOS character definitions
 * from Phase 20 modernization. Provides unified agent identification and 
 * capability resolution for governance workflows.
 */

import {
  getCharacterByRole,
  getCapabilitiesByRole,
  CHARACTER_ROLES,
  type CharacterRole
} from '@elizaos/characters';

export interface ResolvedAgent {
  agentId: string;
  characterRole: CharacterRole;
  character: any; // ElizaOS Character type
  capabilities: string[];
  displayName: string;
  description: string;
}

export interface AgentVotingWeight {
  agentId: string;
  role: CharacterRole;
  votingPower: number;
  stakingWeight: number;
  reputationScore: number;
}

export class AgentResolverService {
  // Legacy agent ID mappings to new character roles
  private readonly legacyIdMapping: Record<string, CharacterRole> = {
    // Legacy C-Suite agent IDs
    'ceo_mimi': 'CEO',
    'ceo-mimi': 'CEO',
    'mimi_ceo': 'CEO',
    'ceo': 'CEO',
    
    'cto_alex': 'CTO',
    'cto-alex': 'CTO',
    'alex_cto': 'CTO',
    'cto': 'CTO',
    'cto_zara': 'CTO',
    'zara_cto': 'CTO',
    
    'cfo_maya': 'CFO',
    'cfo-maya': 'CFO',
    'maya_cfo': 'CFO',
    'cfo': 'CFO',
    
    'clo_alex': 'CLO',
    'clo-alex': 'CLO',
    'alex_clo': 'CLO',
    'clo': 'CLO',
    
    // Additional variants
    'chief_executive_officer': 'CEO',
    'chief_technology_officer': 'CTO',
    'chief_financial_officer': 'CFO',
    'chief_legal_officer': 'CLO'
  };

  // Character role display names
  private readonly roleDisplayNames: Record<CharacterRole, string> = {
    'CEO': 'Mimi - Chief Executive Officer',
    'CTO': 'Zara - Chief Technology Officer', 
    'CFO': 'Maya - Chief Financial Officer',
    'CLO': 'Alex - Chief Legal Officer'
  };

  // Standard voting weights for C-Suite roles
  private readonly standardVotingWeights: Record<CharacterRole, AgentVotingWeight> = {
    'CEO': {
      agentId: 'ceo-mimi-character',
      role: 'CEO',
      votingPower: 1000,
      stakingWeight: 0.4, // 40% weight in governance
      reputationScore: 1000
    },
    'CTO': {
      agentId: 'cto-zara-character',
      role: 'CTO',
      votingPower: 800,
      stakingWeight: 0.3, // 30% weight in governance
      reputationScore: 900
    },
    'CFO': {
      agentId: 'cfo-maya-character',
      role: 'CFO',
      votingPower: 900,
      stakingWeight: 0.35, // 35% weight in governance
      reputationScore: 950
    },
    'CLO': {
      agentId: 'clo-alex-character',
      role: 'CLO',
      votingPower: 700,
      stakingWeight: 0.25, // 25% weight in governance
      reputationScore: 850
    }
  };

  constructor() {
    console.log('🔍 Agent Resolver Service initialized with character mapping');
  }

  /**
   * Resolve legacy agent ID to modern character definition
   */
  public resolveAgent(agentIdOrRole: string): ResolvedAgent | null {
    try {
      // First try direct role mapping
      let characterRole: CharacterRole | undefined;
      
      // Check if it's already a valid character role
      if (this.isValidCharacterRole(agentIdOrRole)) {
        characterRole = agentIdOrRole as CharacterRole;
      } else {
        // Map legacy ID to character role
        const normalizedId = agentIdOrRole.toLowerCase().replace(/[-_]/g, '_');
        characterRole = this.legacyIdMapping[normalizedId];
      }

      if (!characterRole) {
        console.warn(`⚠️ Unable to resolve agent: ${agentIdOrRole}`);
        return null;
      }

      // Get character definition from @elizaos/characters
      const character = getCharacterByRole(characterRole);
      const capabilities = getCapabilitiesByRole(characterRole);

      const resolved: ResolvedAgent = {
        agentId: this.generateModernAgentId(characterRole),
        characterRole,
        character,
        capabilities: Object.keys(capabilities),
        displayName: this.roleDisplayNames[characterRole],
        description: character.bio?.[0] || `${characterRole} Agent`
      };

      console.log(`✅ Resolved agent ${agentIdOrRole} → ${resolved.displayName}`);
      return resolved;

    } catch (error) {
      console.error(`❌ Error resolving agent ${agentIdOrRole}:`, error);
      return null;
    }
  }

  /**
   * Resolve multiple agents from array of IDs
   */
  public resolveAgents(agentIds: string[]): ResolvedAgent[] {
    return agentIds
      .map(id => this.resolveAgent(id))
      .filter((agent): agent is ResolvedAgent => agent !== null);
  }

  /**
   * Get all C-Suite agents with their voting weights
   */
  public getAllCSuiteAgents(): AgentVotingWeight[] {
    return Object.values(this.standardVotingWeights);
  }

  /**
   * Get voting weight for a specific agent
   */
  public getAgentVotingWeight(agentIdOrRole: string): AgentVotingWeight | null {
    const resolved = this.resolveAgent(agentIdOrRole);
    if (!resolved) return null;

    return this.standardVotingWeights[resolved.characterRole];
  }

  /**
   * Check if an agent has specific capability
   */
  public hasCapability(agentIdOrRole: string, capability: string): boolean {
    const resolved = this.resolveAgent(agentIdOrRole);
    if (!resolved) return false;

    return resolved.capabilities.includes(capability) ||
           resolved.capabilities.some(cap => cap.toLowerCase().includes(capability.toLowerCase()));
  }

  /**
   * Get agents with specific capability
   */
  public getAgentsWithCapability(capability: string): ResolvedAgent[] {
    const allRoles = Object.values(CHARACTER_ROLES);
    return allRoles
      .map((role: CharacterRole) => this.resolveAgent(role))
      .filter((agent): agent is ResolvedAgent => 
        agent !== null && this.hasCapability(agent.agentId, capability)
      );
  }

  /**
   * Generate modern agent ID from character role
   */
  private generateModernAgentId(role: CharacterRole): string {
    const roleName = role.toLowerCase();
    const characterName = this.getCharacterNameByRole(role);
    return `${roleName}-${characterName}-character`;
  }

  /**
   * Get character name by role
   */
  private getCharacterNameByRole(role: CharacterRole): string {
    const nameMap: Record<CharacterRole, string> = {
      'CEO': 'mimi',
      'CTO': 'zara',
      'CFO': 'maya',
      'CLO': 'alex'
    };
    return nameMap[role];
  }

  /**
   * Check if string is valid character role
   */
  private isValidCharacterRole(value: string): boolean {
    return Object.values(CHARACTER_ROLES).includes(value as CharacterRole);
  }

  /**
   * Get responsible agents for proposal execution phases
   */
  public resolveExecutionAgents(executionDetails: any): ResolvedAgent[] {
    const agentIds = new Set<string>();
    
    // Extract agent IDs from execution phases
    if (executionDetails.phases) {
      for (const phase of executionDetails.phases) {
        if (phase.responsible_agents) {
          phase.responsible_agents.forEach((agentId: string) => agentIds.add(agentId));
        }
      }
    }

    return this.resolveAgents(Array.from(agentIds));
  }

  /**
   * Map proposal type to recommended agents
   */
  public getRecommendedAgentsForProposalType(proposalType: string): ResolvedAgent[] {
    const typeAgentMapping: Record<string, CharacterRole[]> = {
      'strategic': ['CEO', 'CTO', 'CFO'],
      'operational': ['CEO', 'CTO'],
      'financial': ['CFO', 'CEO'],
      'governance': ['CLO', 'CEO'],
      'technical': ['CTO', 'CEO'],
      'emergency': ['CEO', 'CTO', 'CFO', 'CLO'],
      'constitutional': ['CLO', 'CEO']
    };

    const recommendedRoles = typeAgentMapping[proposalType.toLowerCase()] || ['CEO'];
    return recommendedRoles
      .map(role => this.resolveAgent(role))
      .filter((agent): agent is ResolvedAgent => agent !== null);
  }

  /**
   * Validate service functionality
   */
  public async validate(): Promise<boolean> {
    try {
      // Test resolving all standard roles
      const allRoles = Object.values(CHARACTER_ROLES);
      const resolved = allRoles.map((role: CharacterRole) => this.resolveAgent(role));
      
      return resolved.every(agent => agent !== null);
    } catch (error) {
      console.error('❌ Agent Resolver Service validation failed:', error);
      return false;
    }
  }
}

export default AgentResolverService;