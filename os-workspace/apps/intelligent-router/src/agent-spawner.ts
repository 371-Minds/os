/**
 * Agent Spawner - Triggers autonomous agent creation through Agent Factory
 * Interfaces with Agent Factory Service to spawn new agents for capability gaps
 */

import { RoutingTask } from './types';
import { CapabilityGap } from './capability-gap-detector';

export interface SpawnResult {
  spawningInitiated: boolean;
  spawnId?: string;
  estimatedReadyTime: number;
  error?: string;
}

export interface AgentFactoryClient {
  endpoint: string;
  timeout: number;
  retryAttempts: number;
}

export class AgentSpawner {
  private factoryClient: AgentFactoryClient;
  private activeSpawns: Map<string, { spawnId: string; estimatedReady: Date }> = new Map();

  constructor(factoryEndpoint?: string) {
    this.factoryClient = {
      endpoint: factoryEndpoint || process.env.AGENT_FACTORY_ENDPOINT || 'http://localhost:3001',
      timeout: 10000,
      retryAttempts: 3
    };

    console.log('[AgentSpawner] Initialized with factory endpoint:', this.factoryClient.endpoint);
  }

  /**
   * Spawns an agent for a detected capability gap
   */
  public async spawnAgentForCapability(
    capabilityGap: CapabilityGap,
    originalTask: RoutingTask
  ): Promise<SpawnResult> {
    console.log(`[AgentSpawner] Spawning agent for capability: ${capabilityGap.missingCapability}`);

    try {
      // Check if we're already spawning for this capability
      if (this.isAlreadySpawning(capabilityGap.missingCapability)) {
        return this.getExistingSpawnResult(capabilityGap.missingCapability);
      }

      // Create spawn request
      const spawnRequest = this.createSpawnRequest(capabilityGap, originalTask);

      // Call Agent Factory
      const factoryResponse = await this.callAgentFactory(spawnRequest);

      if (factoryResponse.success && factoryResponse.data) {
        const spawnId = factoryResponse.data.spawnId;
        const estimatedReadyTime = new Date(factoryResponse.data.estimatedReadyTime).getTime() - Date.now();

        // Track active spawn
        this.activeSpawns.set(capabilityGap.missingCapability, {
          spawnId,
          estimatedReady: new Date(factoryResponse.data.estimatedReadyTime)
        });

        console.log(`[AgentSpawner] Spawn initiated: ${spawnId} (ready in ${Math.round(estimatedReadyTime / 1000)}s)`);

        return {
          spawningInitiated: true,
          spawnId,
          estimatedReadyTime
        };
      } else {
        throw new Error(factoryResponse.error || 'Agent Factory request failed');
      }

    } catch (error) {
      console.error(`[AgentSpawner] Failed to spawn agent for ${capabilityGap.missingCapability}:`, error);
      
      return {
        spawningInitiated: false,
        estimatedReadyTime: 0,
        error: error instanceof Error ? error.message : 'Unknown spawning error'
      };
    }
  }

  /**
   * Creates spawn request from capability gap and task
   */
  private createSpawnRequest(capabilityGap: CapabilityGap, task: RoutingTask): any {
    return {
      capability: capabilityGap.missingCapability,
      taskDescription: this.generateTaskDescription(capabilityGap, task),
      priority: capabilityGap.priority,
      requesterAgent: 'intelligent-router',
      originalTaskId: task.id,
      domainHints: this.extractDomainHints(task),
      performanceRequirements: {
        maxResponseTime: this.calculateMaxResponseTime(capabilityGap, task),
        minSuccessRate: this.calculateMinSuccessRate(capabilityGap),
        maxEscalationRate: 0.10,
        requiredCapabilities: [capabilityGap.missingCapability]
      },
      economicConstraints: {
        maxSpawnCost: this.calculateMaxSpawnCost(capabilityGap),
        budgetPriority: this.determineBudgetPriority(capabilityGap, task)
      }
    };
  }

  /**
   * Generates appropriate task description for spawn request
   */
  private generateTaskDescription(capabilityGap: CapabilityGap, task: RoutingTask): string {
    const baseDescription = `Handle tasks requiring ${capabilityGap.missingCapability} expertise`;
    const context = `Original task context: ${task.title} - ${task.description.substring(0, 200)}`;
    const requirements = `Gap type: ${capabilityGap.gapType}, Severity: ${capabilityGap.severity}`;
    
    return `${baseDescription}. ${context}. ${requirements}`;
  }

  /**
   * Extracts domain hints from task
   */
  private extractDomainHints(task: RoutingTask): string[] {
    const hints: string[] = [];
    
    // Extract from task domain hints if available
    if (task.domain_hints) {
      hints.push(...task.domain_hints);
    }

    // Extract from task description
    const description = task.description.toLowerCase();
    const domainKeywords = {
      financial: ['financial', 'budget', 'cost', 'money', 'revenue'],
      technical: ['technical', 'development', 'code', 'system', 'software'],
      marketing: ['marketing', 'campaign', 'brand', 'customer', 'growth'],
      support: ['support', 'help', 'service', 'ticket', 'issue'],
      analytics: ['analysis', 'data', 'report', 'metrics', 'insights']
    };

    for (const [domain, keywords] of Object.entries(domainKeywords)) {
      if (keywords.some(keyword => description.includes(keyword))) {
        hints.push(domain);
      }
    }

    return [...new Set(hints)]; // Remove duplicates
  }

  /**
   * Calculates appropriate max response time based on gap and task
   */
  private calculateMaxResponseTime(capabilityGap: CapabilityGap, task: RoutingTask): number {
    let baseTime = 5000; // 5 seconds base

    // Adjust based on gap severity
    switch (capabilityGap.severity) {
      case 'critical':
        baseTime = 2000;
        break;
      case 'high':
        baseTime = 3000;
        break;
      case 'medium':
        baseTime = 5000;
        break;
      case 'low':
        baseTime = 10000;
        break;
    }

    // Adjust based on task priority
    switch (task.priority) {
      case 'critical':
      case 'urgent':
        baseTime *= 0.5;
        break;
      case 'high':
        baseTime *= 0.7;
        break;
      case 'medium':
        baseTime *= 1.0;
        break;
      case 'low':
        baseTime *= 1.5;
        break;
    }

    return Math.max(1000, baseTime); // Minimum 1 second
  }

  /**
   * Calculates minimum success rate based on gap
   */
  private calculateMinSuccessRate(capabilityGap: CapabilityGap): number {
    const baseRate = 0.85;

    switch (capabilityGap.severity) {
      case 'critical':
        return 0.95;
      case 'high':
        return 0.90;
      case 'medium':
        return 0.85;
      case 'low':
        return 0.80;
      default:
        return baseRate;
    }
  }

  /**
   * Calculates maximum spawn cost
   */
  private calculateMaxSpawnCost(capabilityGap: CapabilityGap): number {
    const baseCost = 1.0; // $1.00 base

    switch (capabilityGap.severity) {
      case 'critical':
        return baseCost * 5.0;
      case 'high':
        return baseCost * 3.0;
      case 'medium':
        return baseCost * 2.0;
      case 'low':
        return baseCost * 1.0;
      default:
        return baseCost;
    }
  }

  /**
   * Determines budget priority
   */
  private determineBudgetPriority(capabilityGap: CapabilityGap, task: RoutingTask): string {
    if (capabilityGap.severity === 'critical' || task.priority === 'critical') {
      return 'performance-optimized';
    } else if (capabilityGap.severity === 'high' || task.priority === 'high') {
      return 'balanced';
    } else {
      return 'cost-optimized';
    }
  }

  /**
   * Calls the Agent Factory service
   */
  private async callAgentFactory(spawnRequest: any): Promise<any> {
    try {
      // In a real implementation, this would make an HTTP request to the Agent Factory
      // For now, we'll simulate the call
      
      console.log(`[AgentSpawner] Calling Agent Factory at ${this.factoryClient.endpoint}`);
      console.log('[AgentSpawner] Spawn request:', JSON.stringify(spawnRequest, null, 2));

      // Simulate factory response
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        data: {
          spawnId: `spawn_${Date.now()}`,
          estimatedReadyTime: new Date(Date.now() + 300000).toISOString(), // 5 minutes from now
          message: `Agent spawning initiated for capability: ${spawnRequest.capability}`
        },
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('[AgentSpawner] Agent Factory call failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Factory call failed'
      };
    }
  }

  /**
   * Checks if we're already spawning for this capability
   */
  private isAlreadySpawning(capability: string): boolean {
    const spawn = this.activeSpawns.get(capability);
    if (!spawn) return false;

    // Check if spawn is still pending
    return spawn.estimatedReady > new Date();
  }

  /**
   * Gets existing spawn result for capability
   */
  private getExistingSpawnResult(capability: string): SpawnResult {
    const spawn = this.activeSpawns.get(capability);
    if (!spawn) {
      return {
        spawningInitiated: false,
        estimatedReadyTime: 0,
        error: 'No active spawn found'
      };
    }

    const estimatedReadyTime = spawn.estimatedReady.getTime() - Date.now();
    
    return {
      spawningInitiated: true,
      spawnId: spawn.spawnId,
      estimatedReadyTime: Math.max(0, estimatedReadyTime)
    };
  }

  /**
   * Cleans up completed spawns
   */
  public cleanupCompletedSpawns(): void {
    const now = new Date();
    for (const [capability, spawn] of this.activeSpawns) {
      if (spawn.estimatedReady <= now) {
        this.activeSpawns.delete(capability);
        console.log(`[AgentSpawner] Cleaned up completed spawn for: ${capability}`);
      }
    }
  }

  /**
   * Gets active spawn status
   */
  public getActiveSpawns(): { capability: string; spawnId: string; estimatedReady: Date }[] {
    return Array.from(this.activeSpawns.entries()).map(([capability, spawn]) => ({
      capability,
      spawnId: spawn.spawnId,
      estimatedReady: spawn.estimatedReady
    }));
  }

  /**
   * Health check
   */
  public async healthCheck(): Promise<{ healthy: boolean; details?: any }> {
    try {
      // Could ping Agent Factory endpoint here in real implementation
      return {
        healthy: true,
        details: {
          factory_endpoint: this.factoryClient.endpoint,
          active_spawns: this.activeSpawns.size,
          timeout: this.factoryClient.timeout
        }
      };
    } catch (error) {
      return {
        healthy: false,
        details: {
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }
}