/**
 * Spawning Analytics - Tracks and analyzes agent spawning metrics
 */

import {
  SpawningMetrics,
  CapabilityGapTrend,
  AgentUtilizationMetric,
  SpawnMetadata
} from './types';

interface ActiveSpawn {
  spawnId: string;
  request: any;
  status: string;
  startTime: Date;
  agentId?: string;
  error?: string;
}

export class SpawningAnalytics {
  private metrics: SpawningMetrics;
  private capabilityTrends: Map<string, CapabilityGapTrend> = new Map();
  private agentUtilization: Map<string, AgentUtilizationMetric> = new Map();

  constructor() {
    this.metrics = this.initializeMetrics();
    console.log('[SpawningAnalytics] Initialized');
  }

  async getSpawningMetrics(): Promise<SpawningMetrics> {
    return {
      ...this.metrics,
      capabilityGapsTrends: Array.from(this.capabilityTrends.values()),
      agentUtilization: Array.from(this.agentUtilization.values())
    };
  }

  async recordSuccessfulSpawn(spawn: ActiveSpawn, metadata: SpawnMetadata): Promise<void> {
    this.metrics.totalSpawnRequests++;
    this.metrics.successfulSpawns++;
    
    const spawnTime = Date.now() - spawn.startTime.getTime();
    this.updateAverageSpawnTime(spawnTime);
    
    // Update capability trends
    this.updateCapabilityTrend(metadata.capabilityGap, true, spawnTime);
    
    // Initialize agent utilization tracking
    if (spawn.agentId) {
      this.initializeAgentUtilization(spawn.agentId, spawn.startTime);
    }

    console.log(`[SpawningAnalytics] Recorded successful spawn: ${spawn.spawnId}`);
  }

  async recordFailedSpawn(spawn: ActiveSpawn, error: any): Promise<void> {
    this.metrics.totalSpawnRequests++;
    this.metrics.failedSpawns++;
    
    const spawnTime = Date.now() - spawn.startTime.getTime();
    
    // Update capability trends
    const capability = spawn.request.capability || 'unknown';
    this.updateCapabilityTrend(capability, false, spawnTime);

    console.log(`[SpawningAnalytics] Recorded failed spawn: ${spawn.spawnId}`);
  }

  private updateAverageSpawnTime(spawnTime: number): void {
    const totalSpawns = this.metrics.successfulSpawns + this.metrics.failedSpawns;
    const currentAverage = this.metrics.averageSpawnTime;
    
    this.metrics.averageSpawnTime = 
      ((currentAverage * (totalSpawns - 1)) + spawnTime) / totalSpawns;
  }

  private updateCapabilityTrend(capability: string, success: boolean, spawnTime: number): void {
    let trend = this.capabilityTrends.get(capability);
    
    if (!trend) {
      trend = {
        capability,
        frequency: 0,
        lastDetected: new Date(),
        averageResolutionTime: 0,
        successRate: 0
      };
      this.capabilityTrends.set(capability, trend);
    }

    trend.frequency++;
    trend.lastDetected = new Date();
    
    // Update average resolution time
    if (success) {
      const totalSuccesses = Math.floor(trend.frequency * trend.successRate) + 1;
      trend.averageResolutionTime = 
        ((trend.averageResolutionTime * (totalSuccesses - 1)) + spawnTime) / totalSuccesses;
    }
    
    // Update success rate
    const successes = Math.floor(trend.frequency * trend.successRate) + (success ? 1 : 0);
    trend.successRate = successes / trend.frequency;
  }

  private initializeAgentUtilization(agentId: string, spawnTime: Date): void {
    const utilization: AgentUtilizationMetric = {
      agentId,
      spawnedAt: spawnTime,
      tasksCompleted: 0,
      successRate: 1.0,
      averageResponseTime: 0,
      costPerTask: 0,
      active: true
    };

    this.agentUtilization.set(agentId, utilization);
  }

  updateAgentUtilization(
    agentId: string, 
    tasksCompleted: number, 
    successRate: number, 
    averageResponseTime: number
  ): void {
    const utilization = this.agentUtilization.get(agentId);
    if (utilization) {
      utilization.tasksCompleted = tasksCompleted;
      utilization.successRate = successRate;
      utilization.averageResponseTime = averageResponseTime;
    }
  }

  markAgentInactive(agentId: string): void {
    const utilization = this.agentUtilization.get(agentId);
    if (utilization) {
      utilization.active = false;
    }
  }

  getCapabilityGapAnalysis(): CapabilityGapTrend[] {
    return Array.from(this.capabilityTrends.values())
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10); // Top 10 most requested capabilities
  }

  getActiveAgentCount(): number {
    return Array.from(this.agentUtilization.values())
      .filter(agent => agent.active).length;
  }

  private initializeMetrics(): SpawningMetrics {
    return {
      totalSpawnRequests: 0,
      successfulSpawns: 0,
      failedSpawns: 0,
      averageSpawnTime: 0,
      costEfficiency: 0.95, // Initial efficiency
      capabilityGapsTrends: [],
      agentUtilization: []
    };
  }
}