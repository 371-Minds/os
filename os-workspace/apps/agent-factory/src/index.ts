/**
 * Agent Factory Service - Main entry point
 * Autonomous agent spawning system for 371 OS
 */

import { FactoryController } from './factory-controller';
import { BrainGenerator } from './brain-generator';
import { ScaffoldGenerator } from './scaffold-generator';
import { DeploymentManager } from './deployment-manager';
import { EconomicCoordinator } from './economic-coordinator';
import { SpawningAnalytics } from './spawning-analytics';
import { CharacterFactory, demonstrateCharacterFactory } from './character-factory';
import {
  FactoryConfiguration,
  SpawnRequest,
  SpawnPriority,
  AgentTemplate
} from './types';

/**
 * Creates default factory configuration
 */
function createDefaultConfiguration(): FactoryConfiguration {
  return {
    brainGenerator: {
      templateDirectory: './templates',
      outputDirectory: './libs/prompts/agent-definitions',
      defaultPersonalityTraits: {
        professional: 'Maintains professional demeanor',
        focused: 'Concentrates on task completion',
        adaptive: 'Adjusts approach based on requirements'
      },
      capabilityMappings: {
        'financial-analysis': ['financial_calculator', 'budget_analyzer'],
        'technical-support': ['code_analyzer', 'system_monitor'],
        'customer-service': ['communication_hub', 'ticket_manager']
      }
    },
    scaffoldGenerator: {
      nxWorkspaceRoot: process.cwd(),
      templateRepository: 'https://github.com/371-minds/agent-templates',
      defaultDependencies: ['@elizaos/core', 'uuid'],
      buildToolchain: 'bun'
    },
    deploymentManager: {
      akashNetworkConfig: {
        rpcEndpoint: process.env.AKASH_RPC_ENDPOINT || 'https://rpc.akash.network:443',
        walletMnemonic: process.env.AKASH_WALLET_MNEMONIC || '',
        defaultResources: {
          cpu: '0.5',
          memory: '512Mi', 
          storage: '1Gi',
          count: 1
        },
        networkId: 'akashnet-2'
      },
      dockerRegistry: process.env.DOCKER_REGISTRY || 'registry.akash.network',
      deploymentTimeout: 300000,
      healthCheckInterval: 30000
    },
    economicCoordinator: {
      costTrackingEnabled: true,
      budgetEnforcementLevel: 'strict',
      stakingContract: process.env.STAKING_CONTRACT || '',
      tokenAddress: process.env.TOKEN_ADDRESS || '',
      gasPriceLimit: 1000000
    },
    monitoring: {
      metricsCollectionInterval: 60000,
      alertingEnabled: true,
      dashboardEndpoint: process.env.DASHBOARD_ENDPOINT || 'http://localhost:3000',
      performanceTargets: {
        spawnSuccessRate: 0.95,
        averageSpawnTime: 300000, // 5 minutes
        maxCostPerSpawn: 2.0,
        agentRetentionRate: 0.90
      }
    }
  };
}

/**
 * Main Agent Factory Service
 */
export class AgentFactory {
  private factoryController: FactoryController;
  private characterFactory: CharacterFactory;

  constructor(config?: Partial<FactoryConfiguration>) {
    const fullConfig = { ...createDefaultConfiguration(), ...config };
    this.factoryController = new FactoryController(fullConfig);
    this.characterFactory = new CharacterFactory(fullConfig.deploymentManager);
    
    console.log('[AgentFactory] Autonomous Agent Spawning System initialized');
    console.log('[AgentFactory] Character-based C-Suite agents available');
  }

  /**
   * Create C-Suite agent from character definition
   */
  async createCSuiteAgent(role: 'CEO' | 'CTO' | 'CFO' | 'CLO', options?: {
    deploymentTarget?: 'local' | 'akash' | 'hybrid';
    agentId?: string;
  }) {
    return await this.characterFactory.createAgentFromCharacter(role, options);
  }

  /**
   * Create all C-Suite agents
   */
  async createAllCSuiteAgents(deploymentTarget: 'local' | 'akash' | 'hybrid' = 'local') {
    return await this.characterFactory.createCSuiteAgents(deploymentTarget);
  }

  /**
   * Get character factory statistics
   */
  getCharacterFactoryStats() {
    return this.characterFactory.getFactoryStats();
  }

  /**
   * Get all active character-based agents
   */
  getCharacterAgents() {
    return this.characterFactory.getAllAgents();
  }

  /**
   * Spawn a new agent based on capability gap
   */
  async spawnAgent(request: SpawnRequest) {
    return await this.factoryController.spawnAgent(request);
  }

  /**
   * Get spawn status
   */
  getSpawnStatus(spawnId: string) {
    return this.factoryController.getSpawnStatus(spawnId);
  }

  /**
   * Get spawning metrics
   */
  async getMetrics() {
    return await this.factoryController.getSpawningMetrics();
  }

  /**
   * Health check
   */
  async healthCheck() {
    return await this.factoryController.healthCheck();
  }

  /**
   * Shutdown factory
   */
  async shutdown() {
    await this.factoryController.shutdown();
  }
}

/**
 * Demo function showing both legacy and character-based factory capabilities
 */
async function demonstrateFactory(): Promise<void> {
  console.log('\n=== Agent Factory Demonstration ===\n');

  const factory = new AgentFactory();

  // Health check
  const health = await factory.healthCheck();
  console.log('Factory Health:', health.success ? 'HEALTHY' : 'UNHEALTHY');

  // === Character-Based Agent Demo ===
  console.log('\n--- Character-Based C-Suite Agents ---');
  
  // Create CEO agent
  const ceoResult = await factory.createCSuiteAgent('CEO', {
    deploymentTarget: 'local',
    agentId: 'ceo-demo-agent'
  });
  
  if (ceoResult.success) {
    console.log(`✅ CEO Agent created: ${ceoResult.character?.name}`);
    console.log(`📋 Capabilities: ${ceoResult.capabilities?.join(', ')}`);
  }

  // Create CTO agent with Akash deployment
  const ctoResult = await factory.createCSuiteAgent('CTO', {
    deploymentTarget: 'akash',
    agentId: 'cto-demo-agent'
  });
  
  if (ctoResult.success) {
    console.log(`✅ CTO Agent created: ${ctoResult.character?.name}`);
    console.log(`🌐 Deployment: ${ctoResult.deploymentInfo?.target} - ${ctoResult.deploymentInfo?.status}`);
  }

  // Show character factory stats
  const charStats = factory.getCharacterFactoryStats();
  console.log('\n📊 Character Factory Statistics:');
  console.log(`Total Agents: ${charStats.totalAgents}`);
  console.log(`Role Distribution:`, charStats.roleDistribution);
  console.log(`Deployment Targets:`, charStats.deploymentTargets);

  // === Legacy Spawning Demo ===
  console.log('\n--- Legacy Agent Spawning ---');
  
  const spawnRequest: SpawnRequest = {
    capability: 'customer-service-specialist',
    taskDescription: 'Handle customer inquiries and provide technical support for 371 OS users',
    priority: SpawnPriority.MEDIUM,
    requesterAgent: 'intelligent-router',
    originalTaskId: 'task_123',
    domainHints: ['customer-service', 'technical-support'],
    performanceRequirements: {
      maxResponseTime: 3000,
      minSuccessRate: 0.90,
      maxEscalationRate: 0.10
    }
  };

  const spawnResult = await factory.spawnAgent(spawnRequest);
  
  if (spawnResult.success && spawnResult.data) {
    console.log(`✅ Legacy spawn initiated: ${spawnResult.data.spawnId}`);
    console.log(`📅 Estimated ready time: ${spawnResult.data.estimatedReadyTime}`);
  }

  // Get final metrics
  const metrics = await factory.getMetrics();
  if (metrics.success) {
    console.log('\n--- Factory Metrics ---');
    console.log(`Total Spawns: ${metrics.data?.totalSpawnRequests}`);
    console.log(`Success Rate: ${((metrics.data?.successfulSpawns || 0) / Math.max(1, metrics.data?.totalSpawnRequests || 1) * 100).toFixed(1)}%`);
  }

  // Shutdown
  await factory.shutdown();
  console.log('\n=== Demonstration Complete ===');
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  try {
    if (require.main === module) {
      await demonstrateFactory();
    } else {
      console.log('[AgentFactory] Module loaded successfully');
    }
  } catch (error) {
    console.error('Fatal error in Agent Factory:', error);
    process.exit(1);
  }
}

// Export main classes and types
export {
  FactoryController,
  BrainGenerator,
  ScaffoldGenerator,
  DeploymentManager,
  EconomicCoordinator, 
  SpawningAnalytics,
  CharacterFactory,
  createDefaultConfiguration,
  demonstrateCharacterFactory
};

export * from './types';

// Run main if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}