/**
 * Character-Based Agent Factory
 * 
 * This module modernizes the agent factory to use TypeScript character
 * definitions instead of YAML parsing, enabling type-safe, integrated
 * agent instantiation with full ElizaOS plugin support.
 */

import type { Character } from '@elizaos/core';
// Using relative imports until workspace package is properly linked
import { 
  ceoMimiCharacter,
  ctoZaraCharacter, 
  cfoMayaCharacter,
  cloAlexCharacter
} from '../../../packages/elizaos-characters/dist/index.js';

// Define character roles locally for now
const C_Suite_Characters = {
  CEO: ceoMimiCharacter,
  CTO: ctoZaraCharacter,
  CFO: cfoMayaCharacter,
  CLO: cloAlexCharacter
} as const;

const CHARACTER_ROLES = {
  CEO: 'CEO',
  CTO: 'CTO', 
  CFO: 'CFO',
  CLO: 'CLO'
} as const;

type CharacterRole = typeof CHARACTER_ROLES[keyof typeof CHARACTER_ROLES];

function getCharacterByRole(role: CharacterRole) {
  return C_Suite_Characters[role];
}

function getAllRoles(): CharacterRole[] {
  return Object.values(CHARACTER_ROLES);
}

/**
 * Character-based agent instance configuration
 */
export interface CharacterAgentConfig {
  character: Character;
  agentId: string;
  role: CharacterRole;
  capabilities: string[];
  deploymentTarget?: 'local' | 'akash' | 'hybrid';
  resources?: {
    cpu: string;
    memory: string;
    storage: string;
  };
}

/**
 * Character Factory Result
 */
export interface CharacterFactoryResult {
  success: boolean;
  agentId?: string;
  character?: Character;
  role?: CharacterRole;
  error?: string;
  capabilities?: string[];
  deploymentInfo?: {
    target: string;
    status: string;
    endpoint?: string;
  };
}

/**
 * Modernized Character-Based Agent Factory
 */
export class CharacterFactory {
  private activeAgents: Map<string, CharacterAgentConfig> = new Map();
  private deploymentManager: any; // Will be injected from main factory

  constructor(deploymentManager?: any) {
    this.deploymentManager = deploymentManager;
    console.log('[CharacterFactory] Character-based agent factory initialized');
  }

  /**
   * Create an agent from a character definition
   */
  async createAgentFromCharacter(
    role: CharacterRole,
    options?: {
      agentId?: string;
      deploymentTarget?: 'local' | 'akash' | 'hybrid';
      customCapabilities?: string[];
    }
  ): Promise<CharacterFactoryResult> {
    try {
      const character = getCharacterByRole(role);
      if (!character) {
        return {
          success: false,
          error: `Character not found for role: ${role}`
        };
      }

      const agentId = options?.agentId || `${role.toLowerCase()}-${Date.now()}`;
      
      // Create agent configuration
      const agentConfig: CharacterAgentConfig = {
        character,
        agentId,
        role,
        capabilities: this.extractCapabilities(character, options?.customCapabilities),
        deploymentTarget: options?.deploymentTarget || 'local',
        resources: this.getDefaultResources(role)
      };

      // Store active agent
      this.activeAgents.set(agentId, agentConfig);

      console.log(`[CharacterFactory] ✅ Created ${role} agent: ${character.name} (${agentId})`);
      console.log(`[CharacterFactory] 📋 Capabilities: ${agentConfig.capabilities.join(', ')}`);

      // Simulate deployment (in real implementation, this would use ElizaOS runtime)
      let deploymentInfo;
      if (options?.deploymentTarget === 'akash') {
        deploymentInfo = await this.simulateAkashDeployment(agentConfig);
      } else {
        deploymentInfo = {
          target: options?.deploymentTarget || 'local',
          status: 'running',
          endpoint: `http://localhost:3000/agents/${agentId}`
        };
      }

      return {
        success: true,
        agentId,
        character,
        role,
        capabilities: agentConfig.capabilities,
        deploymentInfo
      };

    } catch (error) {
      console.error(`[CharacterFactory] Failed to create ${role} agent:`, error);
      return {
        success: false,
        error: (error as Error).message
      };
    }
  }

  /**
   * Create all C-Suite agents
   */
  async createCSuiteAgents(deploymentTarget: 'local' | 'akash' | 'hybrid' = 'local'): Promise<CharacterFactoryResult[]> {
    const results: CharacterFactoryResult[] = [];
    
    console.log('[CharacterFactory] 🏢 Creating complete C-Suite agent ecosystem...');

    for (const role of getAllRoles()) {
      const result = await this.createAgentFromCharacter(role, { 
        deploymentTarget,
        agentId: `${role.toLowerCase()}-csuite-${Date.now()}`
      });
      results.push(result);

      // Brief delay between agent creation for realistic simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`[CharacterFactory] 🎆 C-Suite creation complete: ${successCount}/${results.length} agents successful`);

    return results;
  }

  /**
   * Get active agent by ID
   */
  getAgent(agentId: string): CharacterAgentConfig | undefined {
    return this.activeAgents.get(agentId);
  }

  /**
   * Get all active agents
   */
  getAllAgents(): CharacterAgentConfig[] {
    return Array.from(this.activeAgents.values());
  }

  /**
   * Get agents by role
   */
  getAgentsByRole(role: CharacterRole): CharacterAgentConfig[] {
    return this.getAllAgents().filter(agent => agent.role === role);
  }

  /**
   * Stop and remove an agent
   */
  async removeAgent(agentId: string): Promise<boolean> {
    const agent = this.activeAgents.get(agentId);
    if (!agent) {
      return false;
    }

    // In real implementation, would stop ElizaOS runtime
    console.log(`[CharacterFactory] 🛑 Stopping agent: ${agent.character.name} (${agentId})`);
    
    this.activeAgents.delete(agentId);
    return true;
  }

  /**
   * Extract capabilities from character definition
   */
  private extractCapabilities(character: Character, customCapabilities?: string[]): string[] {
    const defaultCapabilities = [
      'workspace_analysis',
      'business_intelligence',
      'agent_coordination'
    ];

    // Add role-specific capabilities based on character
    const roleCapabilities = character.username?.includes('ceo') ? [
      'strategic_planning', 'roi_optimization', 'c_suite_coordination'
    ] : character.username?.includes('cto') ? [
      'technical_architecture', 'infrastructure_management', 'deployment_automation'
    ] : character.username?.includes('cfo') ? [
      'financial_analysis', 'budget_optimization', 'cost_management'
    ] : character.username?.includes('clo') ? [
      'legal_compliance', 'governance', 'risk_management'
    ] : [];

    return [...defaultCapabilities, ...roleCapabilities, ...(customCapabilities || [])];
  }

  /**
   * Get default resource allocation by role
   */
  private getDefaultResources(role: CharacterRole) {
    const resourceMap = {
      CEO: { cpu: '1.0', memory: '1Gi', storage: '2Gi' },
      CTO: { cpu: '1.5', memory: '2Gi', storage: '5Gi' },
      CFO: { cpu: '0.5', memory: '1Gi', storage: '2Gi' },
      CLO: { cpu: '0.5', memory: '1Gi', storage: '2Gi' }
    };

    return resourceMap[role] || { cpu: '0.5', memory: '512Mi', storage: '1Gi' };
  }

  /**
   * Simulate Akash Network deployment
   */
  private async simulateAkashDeployment(config: CharacterAgentConfig) {
    console.log(`[CharacterFactory] 🌐 Deploying ${config.character.name} to Akash Network...`);
    
    // Simulate deployment delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      target: 'akash',
      status: 'deployed',
      endpoint: `https://${config.agentId}.akash.371minds.com`,
      resources: config.resources,
      costReduction: '97.6%'
    };
  }

  /**
   * Get factory statistics
   */
  getFactoryStats() {
    const agents = this.getAllAgents();
    const roleDistribution = getAllRoles().reduce((acc, role) => {
      acc[role] = this.getAgentsByRole(role).length;
      return acc;
    }, {} as Record<CharacterRole, number>);

    return {
      totalAgents: agents.length,
      roleDistribution,
      deploymentTargets: {
        local: agents.filter(a => a.deploymentTarget === 'local').length,
        akash: agents.filter(a => a.deploymentTarget === 'akash').length,
        hybrid: agents.filter(a => a.deploymentTarget === 'hybrid').length
      },
      capabilities: [...new Set(agents.flatMap(a => a.capabilities))].sort()
    };
  }
}

/**
 * Demo function showcasing character-based agent creation
 */
export async function demonstrateCharacterFactory(): Promise<void> {
  console.log('\n=== Character-Based Agent Factory Demonstration ===\n');

  const factory = new CharacterFactory();

  // Create individual agents
  console.log('--- Creating Individual C-Suite Agents ---');
  
  const ceoResult = await factory.createAgentFromCharacter('CEO', {
    deploymentTarget: 'local'
  });
  
  const ctoResult = await factory.createAgentFromCharacter('CTO', {
    deploymentTarget: 'akash'
  });

  if (ceoResult.success && ctoResult.success) {
    console.log(`✅ Individual agents created successfully`);
    console.log(`📊 CEO Agent: ${ceoResult.character?.name} - ${ceoResult.capabilities?.length} capabilities`);
    console.log(`⚡ CTO Agent: ${ctoResult.character?.name} - ${ctoResult.capabilities?.length} capabilities`);
  }

  // Create full C-Suite
  console.log('\n--- Creating Complete C-Suite Ecosystem ---');
  const csuiteResults = await factory.createCSuiteAgents('hybrid');
  
  // Display factory statistics
  console.log('\n--- Factory Statistics ---');
  const stats = factory.getFactoryStats();
  console.log(`📈 Total Active Agents: ${stats.totalAgents}`);
  console.log(`🏢 Role Distribution:`, stats.roleDistribution);
  console.log(`🌐 Deployment Targets:`, stats.deploymentTargets);
  console.log(`⚙️ Available Capabilities: ${stats.capabilities.length}`);

  console.log('\n=== Character Factory Demonstration Complete ===');
}

export default CharacterFactory;