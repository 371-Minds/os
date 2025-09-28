/**
 * Economic Coordinator - Manages spawning costs and economic safeguards
 */

import {
  SpawnRequest,
  EconomicSafeguards,
  EconomicCoordinatorConfig,
  SpawnPriority
} from './types';

export interface EconomicValidation {
  approved: boolean;
  reason?: string;
  estimatedCost: number;
  budgetRemaining: number;
}

export class EconomicCoordinator {
  private config: EconomicCoordinatorConfig;
  private safeguards: EconomicSafeguards;
  private spawnHistory: { timestamp: Date; cost: number }[] = [];

  constructor(config: EconomicCoordinatorConfig) {
    this.config = config;
    this.safeguards = this.initializeSafeguards();
    console.log('[EconomicCoordinator] Initialized');
  }

  async validateSpawnRequest(request: SpawnRequest): Promise<EconomicValidation> {
    try {
      const estimatedCost = this.calculateSpawnCost(request);
      
      // Check rate limits
      if (!this.checkRateLimits()) {
        return {
          approved: false,
          reason: 'Spawn rate limit exceeded',
          estimatedCost,
          budgetRemaining: 0
        };
      }

      // Check cost thresholds
      if (estimatedCost > this.safeguards.costThresholds[0].maxCostUSD) {
        return {
          approved: false,
          reason: 'Cost exceeds maximum threshold',
          estimatedCost,
          budgetRemaining: 0
        };
      }

      // Check budget allocation
      const budgetCheck = this.checkBudgetAllocation(request.capability, estimatedCost);
      if (!budgetCheck.approved) {
        return budgetCheck;
      }

      return {
        approved: true,
        estimatedCost,
        budgetRemaining: budgetCheck.budgetRemaining
      };

    } catch (error) {
      return {
        approved: false,
        reason: error instanceof Error ? error.message : 'Economic validation failed',
        estimatedCost: 0,
        budgetRemaining: 0
      };
    }
  }

  private calculateSpawnCost(request: SpawnRequest): number {
    let baseCost = 0.50; // Base cost in USD

    // Priority multiplier
    const priorityMultipliers = {
      [SpawnPriority.LOW]: 0.7,
      [SpawnPriority.MEDIUM]: 1.0,
      [SpawnPriority.HIGH]: 1.3,
      [SpawnPriority.URGENT]: 1.6,
      [SpawnPriority.CRITICAL]: 2.0
    };

    baseCost *= priorityMultipliers[request.priority];

    // Complexity multiplier
    const complexity = this.estimateComplexity(request);
    baseCost *= (1 + complexity);

    // Performance requirements multiplier
    if (request.performanceRequirements.maxResponseTime < 1000) {
      baseCost *= 1.5;
    }
    if (request.performanceRequirements.minSuccessRate > 0.95) {
      baseCost *= 1.3;
    }

    return Math.round(baseCost * 100) / 100;
  }

  private estimateComplexity(request: SpawnRequest): number {
    let complexity = 0.2; // Base complexity

    if (request.taskDescription.length > 500) complexity += 0.3;
    if (request.domainHints.length > 2) complexity += 0.2;
    if (request.economicConstraints?.budgetPriority === 'performance-optimized') complexity += 0.4;

    return Math.min(1.0, complexity);
  }

  private checkRateLimits(): boolean {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentSpawns = this.spawnHistory.filter(spawn => spawn.timestamp > oneHourAgo);
    
    return recentSpawns.length < this.safeguards.maxSpawnRatePerHour;
  }

  private checkBudgetAllocation(capability: string, estimatedCost: number): EconomicValidation {
    const allocation = this.safeguards.budgetAllocations.find(
      a => a.capability === capability || a.capability === 'default'
    );

    if (!allocation) {
      return {
        approved: false,
        reason: 'No budget allocation found for capability',
        estimatedCost,
        budgetRemaining: 0
      };
    }

    // Simplified budget check (would be more complex in real implementation)
    const budgetRemaining = allocation.monthlyBudgetUSD * 0.8; // Simulate remaining budget
    
    if (estimatedCost > budgetRemaining) {
      return {
        approved: false,
        reason: 'Insufficient budget remaining',
        estimatedCost,
        budgetRemaining
      };
    }

    return {
      approved: true,
      estimatedCost,
      budgetRemaining: budgetRemaining - estimatedCost
    };
  }

  recordSpawnCost(cost: number): void {
    this.spawnHistory.push({
      timestamp: new Date(),
      cost
    });

    // Keep only last 24 hours of history
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    this.spawnHistory = this.spawnHistory.filter(spawn => spawn.timestamp > twentyFourHoursAgo);
  }

  private initializeSafeguards(): EconomicSafeguards {
    return {
      maxSpawnRatePerHour: 5,
      maxConcurrentSpawns: 3,
      minimumStakeAmount: 0.1,
      costThresholds: [
        {
          operation: 'spawn',
          maxCostUSD: 5.0,
          alertThresholdUSD: 3.0,
          autoApprovalLimit: 1.0
        }
      ],
      budgetAllocations: [
        {
          capability: 'default',
          monthlyBudgetUSD: 100.0,
          priorityMultiplier: 1.0,
          rolloverPolicy: 'accumulate'
        }
      ]
    };
  }

  async healthCheck(): Promise<{ healthy: boolean; details?: any }> {
    return {
      healthy: true,
      details: {
        rate_limits: this.safeguards.maxSpawnRatePerHour,
        recent_spawns: this.spawnHistory.length,
        cost_tracking: this.config.costTrackingEnabled
      }
    };
  }
}