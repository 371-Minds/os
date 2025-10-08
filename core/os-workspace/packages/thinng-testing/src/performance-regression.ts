/**
 * @fileoverview Performance Regression Testing Suite
 * Automated detection and prevention of performance degradation
 */

import type { 
  PerformanceRegressionTest, 
  PerformanceBaseline, 
  PerformanceMetrics,
  RegressionStatus,
  TestPhase 
} from './types';

/**
 * Performance Regression Testing Suite
 * Monitors and validates performance against established baselines
 */
export class PerformanceRegressionSuite {
  private baselines: Map<string, PerformanceBaseline> = new Map();
  private regressionThreshold = 0.05; // 5% tolerance

  /**
   * Add performance baseline for comparison
   */
  addBaseline(baseline: PerformanceBaseline): void {
    const key = `${baseline.phase}-${baseline.component}`;
    this.baselines.set(key, baseline);
    console.log(`📊 Added baseline for ${baseline.component} (${baseline.phase})`);
  }

  /**
   * Execute regression test against baseline
   */
  async executeRegressionTest(
    phase: TestPhase,
    component: string,
    currentMetrics: PerformanceMetrics
  ): Promise<PerformanceRegressionTest> {
    const key = `${phase}-${component}`;
    const baseline = this.baselines.get(key);

    if (!baseline) {
      throw new Error(`No baseline found for ${component} in ${phase}`);
    }

    const improvementRatio = currentMetrics.improvementFactor! / baseline.metrics.improvementFactor!;
    
    let status: RegressionStatus;
    if (improvementRatio < (1 - this.regressionThreshold)) {
      status = 'degraded';
    } else if (improvementRatio > (1 + this.regressionThreshold)) {
      status = 'improved';
    } else {
      status = 'maintained';
    }

    return {
      id: `regression-${key}-${Date.now()}`,
      name: `${component} Regression Test`,
      baseline,
      currentMetrics,
      threshold: this.regressionThreshold,
      status
    };
  }

  /**
   * Get all regression test results
   */
  async getAllRegressionTests(): Promise<PerformanceRegressionTest[]> {
    // This would typically load from a database or file system
    // For now, return empty array as placeholder
    return [];
  }

  /**
   * Set regression threshold
   */
  setRegressionThreshold(threshold: number): void {
    this.regressionThreshold = threshold;
    console.log(`📊 Regression threshold set to ${(threshold * 100).toFixed(1)}%`);
  }
}