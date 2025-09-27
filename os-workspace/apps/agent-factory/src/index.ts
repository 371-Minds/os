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
import { CSuiteRunnerFactory, type CSuiteRunnerInstance, type RunnerBuildOptions } from './csuite-runner-integration';
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
  private csuiteRunnerFactory: CSuiteRunnerFactory; // NEW: C-Suite Agent Runner Factory

  constructor(config?: Partial<FactoryConfiguration>) {
    const fullConfig = { ...createDefaultConfiguration(), ...config };
    this.factoryController = new FactoryController(fullConfig);
    this.characterFactory = new CharacterFactory(fullConfig.deploymentManager);
    this.csuiteRunnerFactory = new CSuiteRunnerFactory(); // NEW: Initialize runner factory
    
    console.log('[AgentFactory] Autonomous Agent Spawning System initialized');
    console.log('[AgentFactory] Character-based C-Suite agents available');
    console.log('[AgentFactory] 🏭 C-Suite Agent Runner Factory integrated - Ready to build distributables!');
  }

  /**
   * NEW FACTORY CAPABILITY: Build C-Suite Agent Runner Package
   * 
   * This transforms the factory into a true "factory" that builds
   * and packages instances of the c-suite-agent-runner application.
   */
  async buildCSuiteRunnerPackage(options?: RunnerBuildOptions) {
    console.log('🏭 Building C-Suite Agent Runner package...');
    return await this.csuiteRunnerFactory.buildRunnerPackage(options);
  }

  /**
   * NEW FACTORY CAPABILITY: Start C-Suite Agent Runner Instance
   * 
   * Factory can now produce running instances of the c-suite-agent-runner
   */
  async startCSuiteRunnerInstance(packageId?: string, roles?: string[]) {
    console.log('🚀 Starting C-Suite Agent Runner instance...');
    return await this.csuiteRunnerFactory.startRunnerInstance(packageId, roles);
  }

  /**
   * NEW FACTORY CAPABILITY: Stop C-Suite Agent Runner Instance
   */
  async stopCSuiteRunnerInstance(instanceId: string) {
    return await this.csuiteRunnerFactory.stopRunnerInstance(instanceId);
  }

  /**
   * Get all running C-Suite Agent Runner instances
   */
  getRunningCSuiteInstances(): CSuiteRunnerInstance[] {
    return this.csuiteRunnerFactory.getRunningInstances();
  }

  /**
   * Get all built C-Suite Agent Runner packages
   */
  getBuiltCSuitePackages() {
    return this.csuiteRunnerFactory.getBuiltPackages();
  }

  /**
   * Get C-Suite Runner Factory statistics
   */
  getCSuiteRunnerFactoryStats() {
    return this.csuiteRunnerFactory.getFactoryStats();
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
   * Shutdown factory and all running instances
   */
  async shutdown() {
    console.log('🔄 Shutting down Agent Factory...');
    
    // Shutdown C-Suite Runner Factory first
    await this.csuiteRunnerFactory.shutdown();
    
    // Then shutdown the main factory controller
    await this.factoryController.shutdown();
    
    console.log('🎆 Agent Factory shutdown complete');
  }
}

/**
 * Demo function showing both legacy and character-based factory capabilities
 */
async function demonstrateFactory(): Promise<void> {
  console.log('\n=== Agent Factory Demonstration ===\n');
  console.log('🏭 Now includes C-Suite Agent Runner Factory capabilities!\n');

  const factory = new AgentFactory();

  // Health check
  const health = await factory.healthCheck();
  console.log('Factory Health:', health.success ? 'HEALTHY' : 'UNHEALTHY');

  // === NEW: C-Suite Agent Runner Factory Demo ===
  console.log('\n--- C-Suite Agent Runner Factory ---');
  
  // Build a C-Suite Agent Runner package
  console.log('🏭 Building C-Suite Agent Runner package...');
  const packageResult = await factory.buildCSuiteRunnerPackage({
    buildTarget: 'production',
    outputFormat: 'package',
    deploymentTarget: 'local'
  });
  
  console.log(`✅ Package built: ${packageResult.packageId}`);
  console.log(`📦 Size: ${Math.round(packageResult.size / 1024 / 1024 * 100) / 100}MB`);
  console.log(`⏱️ Build time: ${packageResult.buildTime}ms`);
  
  // Start a C-Suite Agent Runner instance
  console.log('\n🚀 Starting C-Suite Agent Runner instance...');
  const instanceResult = await factory.startCSuiteRunnerInstance(packageResult.packageId);
  
  console.log(`✅ Instance started: ${instanceResult.instanceId}`);
  console.log(`🌐 URL: http://${instanceResult.host}:${instanceResult.port}`);
  console.log(`👥 Roles: ${instanceResult.roles.join(', ')}`);
  
  // Show C-Suite Runner Factory stats
  const runnerStats = factory.getCSuiteRunnerFactoryStats();
  console.log('\n📊 C-Suite Runner Factory Statistics:');
  console.log(`Running Instances: ${runnerStats.running_instances}`);
  console.log(`Built Packages: ${runnerStats.built_packages}`);
  console.log(`Average Build Time: ${Math.round(runnerStats.average_build_time_ms)}ms`);

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

  // Wait a moment to show the running instance
  console.log('\n⏱️ Letting instance run for 5 seconds...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Stop the C-Suite Agent Runner instance
  console.log('\n🔄 Stopping C-Suite Agent Runner instance...');
  await factory.stopCSuiteRunnerInstance(instanceResult.instanceId);
  
  // Shutdown
  await factory.shutdown();
  console.log('\n=== Demonstration Complete ===');
  console.log('\n🎆 Agent Factory now includes C-Suite Agent Runner capabilities! 🎆');
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
  CSuiteRunnerFactory, // NEW: Export C-Suite Runner Factory
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