/**
 * Factory Controller - Main orchestrator for autonomous agent spawning
 * Coordinates brain generation, body scaffolding, deployment, and registration
 * Implements economic safeguards and performance monitoring
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import {
  SpawnRequest,
  SpawnResponse,
  FactoryConfiguration,
  CapabilityGap,
  AgentBrainDefinition,
  ScaffoldRequest,
  SpawnMetadata,
  FactoryApiResponse,
  FactoryHealthCheck,
  SpawningMetrics,
  EconomicSafeguards,
  SpawnPriority,
  CapabilityGapType,
  GapSeverity
} from './types';

import { BrainGenerator } from './brain-generator';
import { ScaffoldGenerator } from './scaffold-generator';
import { DeploymentManager } from './deployment-manager';
import { EconomicCoordinator } from './economic-coordinator';
import { SpawningAnalytics } from './spawning-analytics';

interface ActiveSpawn {
  spawnId: string;
  request: SpawnRequest;
  status: SpawnStatus;
  startTime: Date;
  estimatedCompletion: Date;
  currentPhase: SpawnPhase;
  agentId?: string;
  error?: string;
}

enum SpawnStatus {
  QUEUED = 'queued',
  ANALYZING = 'analyzing',
  GENERATING_BRAIN = 'generating_brain',
  SCAFFOLDING = 'scaffolding',
  DEPLOYING = 'deploying',
  REGISTERING = 'registering',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

enum SpawnPhase {
  VALIDATION = 'validation',
  BRAIN_GENERATION = 'brain_generation',
  SCAFFOLD_GENERATION = 'scaffold_generation',
  DEPLOYMENT = 'deployment',
  REGISTRATION = 'registration',
  VERIFICATION = 'verification'
}

export class FactoryController extends EventEmitter {
  private config: FactoryConfiguration;
  private brainGenerator: BrainGenerator;
  private scaffoldGenerator: ScaffoldGenerator;
  private deploymentManager: DeploymentManager;
  private economicCoordinator: EconomicCoordinator;
  private spawningAnalytics: SpawningAnalytics;
  
  private activeSpawns: Map<string, ActiveSpawn> = new Map();
  private spawnQueue: SpawnRequest[] = [];
  private isProcessing = false;
  private shutdownRequested = false;

  constructor(config: FactoryConfiguration) {
    super();
    this.config = config;
    
    // Initialize components
    this.brainGenerator = new BrainGenerator(config.brainGenerator);
    this.scaffoldGenerator = new ScaffoldGenerator(config.scaffoldGenerator);
    this.deploymentManager = new DeploymentManager(config.deploymentManager);
    this.economicCoordinator = new EconomicCoordinator(config.economicCoordinator);
    this.spawningAnalytics = new SpawningAnalytics();

    // Start processing loop
    this.startProcessingLoop();

    console.log('[FactoryController] Initialized autonomous agent spawning system');
  }

  /**
   * Main entry point for agent spawning requests
   */
  public async spawnAgent(request: SpawnRequest): Promise<FactoryApiResponse<SpawnResponse>> {
    const spawnId = uuidv4();
    const requestId = uuidv4();

    try {
      console.log(`[FactoryController] Received spawn request for capability: ${request.capability}`);

      // Validate request
      this.validateSpawnRequest(request);

      // Check economic constraints
      const economicValidation = await this.economicCoordinator.validateSpawnRequest(request);
      if (!economicValidation.approved) {
        throw new Error(`Economic validation failed: ${economicValidation.reason}`);
      }

      // Analyze capability gap
      const capabilityGap = await this.analyzeCapabilityGap(request);
      
      // Create spawn response immediately
      const response: SpawnResponse = {
        success: true,
        spawnId,
        estimatedReadyTime: this.calculateEstimatedReadyTime(request, capabilityGap),
        message: `Agent spawning initiated for capability: ${request.capability}`
      };

      // Add to processing queue
      const activeSpawn: ActiveSpawn = {
        spawnId,
        request,
        status: SpawnStatus.QUEUED,
        startTime: new Date(),
        estimatedCompletion: response.estimatedReadyTime!,
        currentPhase: SpawnPhase.VALIDATION
      };

      this.activeSpawns.set(spawnId, activeSpawn);
      this.spawnQueue.push(request);

      // Emit spawning started event
      this.emit('spawn-started', { spawnId, request });

      console.log(`[FactoryController] Spawn request queued: ${spawnId}`);

      return {
        success: true,
        data: response,
        timestamp: new Date(),
        requestId,
        spawnId
      };

    } catch (error) {
      console.error(`[FactoryController] Spawn request failed:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown spawning error',
        timestamp: new Date(),
        requestId
      };
    }
  }

  /**
   * Gets status of a specific spawn request
   */
  public getSpawnStatus(spawnId: string): FactoryApiResponse<ActiveSpawn> {
    const spawn = this.activeSpawns.get(spawnId);
    
    if (!spawn) {
      return {
        success: false,
        error: 'Spawn not found',
        timestamp: new Date(),
        requestId: uuidv4()
      };
    }

    return {
      success: true,
      data: spawn,
      timestamp: new Date(),
      requestId: uuidv4()
    };
  }

  /**
   * Gets current spawning metrics and analytics
   */
  public async getSpawningMetrics(): Promise<FactoryApiResponse<SpawningMetrics>> {
    try {
      const metrics = await this.spawningAnalytics.getSpawningMetrics();
      
      return {
        success: true,
        data: metrics,
        timestamp: new Date(),
        requestId: uuidv4()
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get metrics',
        timestamp: new Date(),
        requestId: uuidv4()
      };
    }
  }

  /**
   * Performs factory health check
   */
  public async healthCheck(): Promise<FactoryApiResponse<FactoryHealthCheck>> {
    try {
      const healthStatus: FactoryHealthCheck = {
        healthy: true,
        services: [],
        metrics: {
          activeSpawns: this.activeSpawns.size,
          queuedRequests: this.spawnQueue.length,
          systemLoad: process.cpuUsage().system / 1000000, // Convert to ms
          memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // Convert to MB
          diskUsage: 0, // Would implement actual disk usage check
          networkLatency: 0 // Would implement actual network latency check
        },
        issues: []
      };

      // Check each service
      const services = [
        { name: 'BrainGenerator', service: this.brainGenerator },
        { name: 'ScaffoldGenerator', service: this.scaffoldGenerator },
        { name: 'DeploymentManager', service: this.deploymentManager },
        { name: 'EconomicCoordinator', service: this.economicCoordinator }
      ];

      for (const { name, service } of services) {
        try {
          const serviceHealth = await this.checkServiceHealth(service);
          healthStatus.services.push({
            service: name,
            status: serviceHealth.healthy ? 'healthy' : 'unhealthy',
            lastCheck: new Date(),
            responseTime: serviceHealth.responseTime,
            details: serviceHealth.details
          });

          if (!serviceHealth.healthy) {
            healthStatus.healthy = false;
            healthStatus.issues.push(`${name} service unhealthy: ${serviceHealth.error}`);
          }
        } catch (error) {
          healthStatus.healthy = false;
          healthStatus.services.push({
            service: name,
            status: 'unhealthy',
            lastCheck: new Date(),
            responseTime: -1
          });
          healthStatus.issues.push(`${name} health check failed: ${error}`);
        }
      }

      return {
        success: true,
        data: healthStatus,
        timestamp: new Date(),
        requestId: uuidv4()
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Health check failed',
        timestamp: new Date(),
        requestId: uuidv4()
      };
    }
  }

  /**
   * Gracefully shuts down the factory
   */
  public async shutdown(): Promise<void> {
    console.log('[FactoryController] Initiating shutdown...');
    this.shutdownRequested = true;

    // Wait for active spawns to complete (with timeout)
    const shutdownTimeout = 60000; // 1 minute
    const startShutdown = Date.now();

    while (this.activeSpawns.size > 0 && (Date.now() - startShutdown) < shutdownTimeout) {
      console.log(`[FactoryController] Waiting for ${this.activeSpawns.size} active spawns to complete...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    if (this.activeSpawns.size > 0) {
      console.warn(`[FactoryController] Forced shutdown with ${this.activeSpawns.size} active spawns`);
    }

    // Cleanup components
    await this.deploymentManager.shutdown();
    
    console.log('[FactoryController] Shutdown complete');
  }

  /**
   * Main processing loop for spawn queue
   */
  private async startProcessingLoop(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (!this.shutdownRequested) {
      try {
        if (this.spawnQueue.length > 0) {
          const request = this.spawnQueue.shift()!;
          await this.processSpawnRequest(request);
        } else {
          // No requests, wait before checking again
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error('[FactoryController] Processing loop error:', error);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait longer on error
      }
    }

    this.isProcessing = false;
  }

  /**
   * Processes a single spawn request through all phases
   */
  private async processSpawnRequest(request: SpawnRequest): Promise<void> {
    const spawnId = this.findSpawnIdByRequest(request);
    if (!spawnId) {
      console.error('[FactoryController] Cannot find spawn ID for request');
      return;
    }

    const spawn = this.activeSpawns.get(spawnId)!;

    try {
      console.log(`[FactoryController] Processing spawn: ${spawnId}`);

      // Phase 1: Generate agent brain
      spawn.status = SpawnStatus.GENERATING_BRAIN;
      spawn.currentPhase = SpawnPhase.BRAIN_GENERATION;
      this.emit('spawn-progress', { spawnId, phase: spawn.currentPhase });

      const brainDefinition = await this.brainGenerator.generateAgentBrain(request);
      const agentId = this.generateAgentId(request, brainDefinition);
      spawn.agentId = agentId;

      // Phase 2: Generate agent scaffold
      spawn.status = SpawnStatus.SCAFFOLDING;
      spawn.currentPhase = SpawnPhase.SCAFFOLD_GENERATION;
      this.emit('spawn-progress', { spawnId, phase: spawn.currentPhase });

      const scaffoldRequest: ScaffoldRequest = {
        agentId,
        agentType: brainDefinition.agent_type,
        capabilities: [request.capability],
        template: this.determineAgentTemplate(request),
        dependencies: ['@elizaos/core', '@elizaos/plugin-blockchain-registry'],
        integrationPoints: []
      };

      const scaffoldResult = await this.scaffoldGenerator.generateAgentScaffold(scaffoldRequest);

      // Phase 3: Deploy agent
      spawn.status = SpawnStatus.DEPLOYING;
      spawn.currentPhase = SpawnPhase.DEPLOYMENT;
      this.emit('spawn-progress', { spawnId, phase: spawn.currentPhase });

      const deploymentResult = await this.deploymentManager.deployAgent(
        agentId,
        scaffoldResult.projectPath!,
        scaffoldResult.buildConfiguration
      );

      // Phase 4: Register agent
      spawn.status = SpawnStatus.REGISTERING;
      spawn.currentPhase = SpawnPhase.REGISTRATION;
      this.emit('spawn-progress', { spawnId, phase: spawn.currentPhase });

      // Create spawn metadata
      const spawnMetadata: SpawnMetadata = {
        requestingAgent: request.requesterAgent,
        capabilityGap: request.capability,
        taskDescription: request.taskDescription,
        confidenceScore: 0.8, // Initial confidence for spawned agents
        relatedDomains: request.domainHints,
        spawnTimestamp: spawn.startTime,
        factoryVersion: '1.0.0'
      };

      // Agent self-registration would happen here via the spawned agent's initialization
      // For now, we'll simulate this process
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate registration time

      // Phase 5: Verification
      spawn.currentPhase = SpawnPhase.VERIFICATION;
      this.emit('spawn-progress', { spawnId, phase: spawn.currentPhase });

      // Verify agent is operational
      const verificationResult = await this.verifyAgentOperation(agentId, deploymentResult.endpoint);

      if (verificationResult.operational) {
        spawn.status = SpawnStatus.COMPLETED;
        console.log(`[FactoryController] Successfully spawned agent: ${agentId}`);
        
        // Record success metrics
        await this.spawningAnalytics.recordSuccessfulSpawn(spawn, spawnMetadata);
        
        this.emit('spawn-completed', { spawnId, agentId, deploymentResult });
      } else {
        throw new Error(`Agent verification failed: ${verificationResult.error}`);
      }

    } catch (error) {
      console.error(`[FactoryController] Spawn failed: ${spawnId}`, error);
      
      spawn.status = SpawnStatus.FAILED;
      spawn.error = error instanceof Error ? error.message : 'Unknown error';
      
      // Record failure metrics
      await this.spawningAnalytics.recordFailedSpawn(spawn, error);
      
      this.emit('spawn-failed', { spawnId, error: spawn.error });
    }
  }

  /**
   * Validates spawn request parameters
   */
  private validateSpawnRequest(request: SpawnRequest): void {
    if (!request.capability || request.capability.trim().length === 0) {
      throw new Error('Capability is required');
    }

    if (!request.taskDescription || request.taskDescription.trim().length < 10) {
      throw new Error('Task description must be at least 10 characters');
    }

    if (!request.requesterAgent || request.requesterAgent.trim().length === 0) {
      throw new Error('Requester agent is required');
    }

    if (!request.originalTaskId || request.originalTaskId.trim().length === 0) {
      throw new Error('Original task ID is required');
    }

    if (!Object.values(SpawnPriority).includes(request.priority)) {
      throw new Error(`Invalid priority: ${request.priority}`);
    }
  }

  /**
   * Analyzes capability gap for spawn request
   */
  private async analyzeCapabilityGap(request: SpawnRequest): Promise<CapabilityGap> {
    // This would integrate with the Blockchain Registry to check for existing agents
    // For now, we'll create a mock analysis
    
    return {
      capability: request.capability,
      gapType: CapabilityGapType.CRITICAL_GAP,
      confidence: 0.9,
      severity: request.priority === SpawnPriority.CRITICAL ? GapSeverity.CRITICAL : GapSeverity.HIGH,
      impact: [`Missing capability: ${request.capability}`, 'Task routing will fail', 'User experience degraded'],
      suggestedAgentType: 'specialized-capability',
      estimatedDemand: 1.0
    };
  }

  /**
   * Calculates estimated ready time for spawn
   */
  private calculateEstimatedReadyTime(request: SpawnRequest, gap: CapabilityGap): Date {
    const baseTime = 5 * 60 * 1000; // 5 minutes base
    const complexityMultiplier = gap.severity === GapSeverity.CRITICAL ? 1.5 : 1.2;
    const priorityMultiplier = request.priority === SpawnPriority.URGENT ? 0.7 : 1.0;
    
    const estimatedMs = baseTime * complexityMultiplier * priorityMultiplier;
    return new Date(Date.now() + estimatedMs);
  }

  /**
   * Generates unique agent ID
   */
  private generateAgentId(request: SpawnRequest, brain: AgentBrainDefinition): string {
    const capability = request.capability.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const timestamp = Date.now().toString(36);
    return `${capability}-agent-${timestamp}`;
  }

  /**
   * Determines appropriate agent template based on capability
   */
  private determineAgentTemplate(request: SpawnRequest): any {
    const capability = request.capability.toLowerCase();
    
    if (capability.includes('business') || capability.includes('analytics') || capability.includes('data')) {
      return 'business-analyst';
    } else if (capability.includes('technical') || capability.includes('development') || capability.includes('architecture')) {
      return 'technical-specialist';
    } else if (capability.includes('communication') || capability.includes('customer') || capability.includes('support')) {
      return 'communication-agent';
    } else if (capability.includes('integration') || capability.includes('api') || capability.includes('sync')) {
      return 'integration-agent';
    } else {
      return 'specialized-capability';
    }
  }

  /**
   * Finds spawn ID by request (helper method)
   */
  private findSpawnIdByRequest(request: SpawnRequest): string | null {
    for (const [spawnId, spawn] of this.activeSpawns) {
      if (spawn.request === request) {
        return spawnId;
      }
    }
    return null;
  }

  /**
   * Verifies agent is operational after deployment
   */
  private async verifyAgentOperation(agentId: string, endpoint: string): Promise<{ operational: boolean; error?: string }> {
    try {
      // Would implement actual health check call to agent
      // For now, simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return { operational: true };
    } catch (error) {
      return { 
        operational: false, 
        error: error instanceof Error ? error.message : 'Verification failed' 
      };
    }
  }

  /**
   * Checks health of a service component
   */
  private async checkServiceHealth(service: any): Promise<{ healthy: boolean; responseTime: number; error?: string; details?: any }> {
    const startTime = Date.now();
    
    try {
      // Check if service has health check method
      if (typeof service.healthCheck === 'function') {
        const result = await service.healthCheck();
        return {
          healthy: result.healthy || true,
          responseTime: Date.now() - startTime,
          details: result
        };
      } else {
        return {
          healthy: true,
          responseTime: Date.now() - startTime,
          details: { status: 'no health check available' }
        };
      }
    } catch (error) {
      return {
        healthy: false,
        responseTime: Date.now() - startTime,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}