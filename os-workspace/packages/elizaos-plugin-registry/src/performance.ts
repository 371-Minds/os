import { EventEmitter } from 'eventemitter3';
import type { PluginPerformanceMetrics } from './types.js';

/**
 * Performance alert
 */
export interface PerformanceAlert {
  pluginId: string;
  type: 'memory' | 'cpu' | 'execution_time' | 'error_rate';
  severity: 'warning' | 'critical';
  threshold: number;
  currentValue: number;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}

/**
 * Performance recommendation
 */
export interface PerformanceRecommendation {
  pluginId: string;
  type: 'optimization' | 'refactoring' | 'configuration' | 'resource_allocation';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  estimatedImpact: {
    performance: number; // percentage improvement
    memory: number; // MB saved
    cpu: number; // percentage saved
  };
  implementation: {
    difficulty: 'easy' | 'medium' | 'hard';
    timeEstimate: string;
    steps: string[];
  };
  generated: Date;
}

/**
 * Performance benchmark
 */
export interface PerformanceBenchmark {
  pluginId: string;
  version: string;
  testSuite: string;
  metrics: {
    executionTime: number;
    memoryUsage: number;
    cpuUsage: number;
    throughput: number;
    errorRate: number;
  };
  environment: {
    platform: string;
    nodeVersion: string;
    memoryLimit: number;
    cpuCores: number;
  };
  timestamp: Date;
}

/**
 * Performance events
 */
export interface PerformanceEvents {
  'alert:triggered': (alert: PerformanceAlert) => void;
  'recommendation:generated': (recommendation: PerformanceRecommendation) => void;
  'benchmark:completed': (benchmark: PerformanceBenchmark) => void;
  'monitoring:started': (pluginId: string) => void;
  'monitoring:stopped': (pluginId: string) => void;
  'performance:error': (error: Error) => void;
}

/**
 * Performance configuration
 */
export interface PerformanceConfig {
  enabled: boolean;
  monitoringInterval: number; // milliseconds
  alertThresholds: {
    memoryUsage: number; // MB
    cpuUsage: number; // percentage
    executionTime: number; // milliseconds
    errorRate: number; // percentage
  };
  enableRecommendations: boolean;
  enableBenchmarking: boolean;
  enableAutoOptimization: boolean;
  dataRetentionDays: number;
}

/**
 * Performance trend
 */
export interface PerformanceTrend {
  pluginId: string;
  metric: 'memory' | 'cpu' | 'execution_time' | 'error_rate';
  trend: 'improving' | 'stable' | 'degrading';
  changeRate: number; // percentage change
  period: {
    from: Date;
    to: Date;
  };
  dataPoints: Array<{
    timestamp: Date;
    value: number;
  }>;
}

/**
 * Performance comparison
 */
export interface PerformanceComparison {
  baseline: {
    pluginId: string;
    version: string;
    metrics: PluginPerformanceMetrics;
  };
  comparison: {
    pluginId: string;
    version: string;
    metrics: PluginPerformanceMetrics;
  };
  differences: {
    executionTime: number; // percentage difference
    memoryUsage: number;
    cpuUsage: number;
    errorRate: number;
  };
  recommendation: string;
}

/**
 * Plugin Performance Monitor
 * 
 * AI-driven performance monitoring and optimization for ElizaOS plugins
 */
export class PluginPerformanceMonitor extends EventEmitter<PerformanceEvents> {
  private config: PerformanceConfig;
  private metrics = new Map<string, PluginPerformanceMetrics>();
  private alerts = new Map<string, PerformanceAlert[]>();
  private recommendations = new Map<string, PerformanceRecommendation[]>();
  private benchmarks = new Map<string, PerformanceBenchmark[]>();
  private monitoringIntervals = new Map<string, NodeJS.Timeout>();
  private trends = new Map<string, PerformanceTrend[]>();

  constructor(config?: Partial<PerformanceConfig>) {
    super();
    
    this.config = {
      enabled: true,
      monitoringInterval: 5000, // 5 seconds
      alertThresholds: {
        memoryUsage: 100, // 100MB
        cpuUsage: 80, // 80%
        executionTime: 1000, // 1 second
        errorRate: 5, // 5%
      },
      enableRecommendations: true,
      enableBenchmarking: true,
      enableAutoOptimization: false,
      dataRetentionDays: 30,
      ...config,
    };
  }

  /**
   * Start monitoring a plugin
   */
  startMonitoring(pluginId: string): void {
    if (!this.config.enabled) {
      return;
    }

    if (this.monitoringIntervals.has(pluginId)) {
      this.stopMonitoring(pluginId);
    }

    const interval = setInterval(() => {
      this.collectMetrics(pluginId);
    }, this.config.monitoringInterval);

    this.monitoringIntervals.set(pluginId, interval);
    this.emit('monitoring:started', pluginId);
  }

  /**
   * Stop monitoring a plugin
   */
  stopMonitoring(pluginId: string): void {
    const interval = this.monitoringIntervals.get(pluginId);
    if (interval) {
      clearInterval(interval);
      this.monitoringIntervals.delete(pluginId);
      this.emit('monitoring:stopped', pluginId);
    }
  }

  /**
   * Get current metrics for a plugin
   */
  getMetrics(pluginId: string): PluginPerformanceMetrics | undefined {
    return this.metrics.get(pluginId);
  }

  /**
   * Get alerts for a plugin
   */
  getAlerts(pluginId: string): PerformanceAlert[] {
    return this.alerts.get(pluginId) || [];
  }

  /**
   * Get recommendations for a plugin
   */
  getRecommendations(pluginId: string): PerformanceRecommendation[] {
    return this.recommendations.get(pluginId) || [];
  }

  /**
   * Run performance benchmark
   */
  async runBenchmark(pluginId: string, testSuite: string): Promise<PerformanceBenchmark> {
    if (!this.config.enableBenchmarking) {
      throw new Error('Benchmarking is disabled');
    }

    // Mock benchmark execution
    const startTime = Date.now();
    
    // Simulate benchmark workload
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const executionTime = Date.now() - startTime;

    const benchmark: PerformanceBenchmark = {
      pluginId,
      version: '1.0.0', // Mock version
      testSuite,
      metrics: {
        executionTime,
        memoryUsage: Math.random() * 50 + 10, // 10-60MB
        cpuUsage: Math.random() * 40 + 20, // 20-60%
        throughput: Math.random() * 1000 + 500, // 500-1500 ops/sec
        errorRate: Math.random() * 2, // 0-2%
      },
      environment: {
        platform: process.platform,
        nodeVersion: process.version,
        memoryLimit: 512, // Mock limit
        cpuCores: 4, // Mock cores
      },
      timestamp: new Date(),
    };

    if (!this.benchmarks.has(pluginId)) {
      this.benchmarks.set(pluginId, []);
    }
    this.benchmarks.get(pluginId)!.push(benchmark);

    this.emit('benchmark:completed', benchmark);
    return benchmark;
  }

  /**
   * Generate performance recommendations
   */
  generateRecommendations(pluginId: string): PerformanceRecommendation[] {
    if (!this.config.enableRecommendations) {
      return [];
    }

    const metrics = this.metrics.get(pluginId);
    if (!metrics) {
      return [];
    }

    const recommendations: PerformanceRecommendation[] = [];

    // Memory optimization recommendation
    if (metrics.memoryUsage.average > this.config.alertThresholds.memoryUsage) {
      recommendations.push({
        pluginId,
        type: 'optimization',
        priority: 'high',
        title: 'Optimize Memory Usage',
        description: 'Plugin is using excessive memory. Consider implementing memory pooling or reducing object allocations.',
        estimatedImpact: {
          performance: 15,
          memory: 30,
          cpu: 5,
        },
        implementation: {
          difficulty: 'medium',
          timeEstimate: '2-4 hours',
          steps: [
            'Profile memory usage to identify leaks',
            'Implement object pooling for frequently created objects',
            'Add memory cleanup in plugin lifecycle methods',
            'Consider using WeakMap/WeakSet for cache implementations',
          ],
        },
        generated: new Date(),
      });
    }

    // CPU optimization recommendation
    if (metrics.cpuUsage.average > this.config.alertThresholds.cpuUsage) {
      recommendations.push({
        pluginId,
        type: 'optimization',
        priority: 'medium',
        title: 'Optimize CPU Usage',
        description: 'Plugin is consuming high CPU. Consider async/await patterns and worker threads for heavy computations.',
        estimatedImpact: {
          performance: 25,
          memory: 0,
          cpu: 40,
        },
        implementation: {
          difficulty: 'hard',
          timeEstimate: '4-8 hours',
          steps: [
            'Profile CPU usage to identify bottlenecks',
            'Move heavy computations to worker threads',
            'Implement async/await for I/O operations',
            'Add request throttling and rate limiting',
          ],
        },
        generated: new Date(),
      });
    }

    if (!this.recommendations.has(pluginId)) {
      this.recommendations.set(pluginId, []);
    }
    this.recommendations.get(pluginId)!.push(...recommendations);

    recommendations.forEach(rec => {
      this.emit('recommendation:generated', rec);
    });

    return recommendations;
  }

  /**
   * Get performance trends
   */
  getTrends(pluginId: string): PerformanceTrend[] {
    return this.trends.get(pluginId) || [];
  }

  /**
   * Compare performance between two plugin versions
   */
  comparePerformance(baselineId: string, comparisonId: string): PerformanceComparison | null {
    const baseline = this.metrics.get(baselineId);
    const comparison = this.metrics.get(comparisonId);

    if (!baseline || !comparison) {
      return null;
    }

    const differences = {
      executionTime: ((comparison.executionTime.average - baseline.executionTime.average) / baseline.executionTime.average) * 100,
      memoryUsage: ((comparison.memoryUsage.average - baseline.memoryUsage.average) / baseline.memoryUsage.average) * 100,
      cpuUsage: ((comparison.cpuUsage.average - baseline.cpuUsage.average) / baseline.cpuUsage.average) * 100,
      errorRate: ((comparison.errorRate - baseline.errorRate) / baseline.errorRate) * 100,
    };

    let recommendation = 'Performance comparison complete.';
    if (differences.executionTime > 10) {
      recommendation = 'Execution time has increased significantly. Consider optimization.';
    } else if (differences.memoryUsage > 20) {
      recommendation = 'Memory usage has increased. Check for memory leaks.';
    } else if (differences.cpuUsage > 15) {
      recommendation = 'CPU usage has increased. Profile for performance bottlenecks.';
    }

    return {
      baseline: {
        pluginId: baselineId,
        version: '1.0.0', // Mock version
        metrics: baseline,
      },
      comparison: {
        pluginId: comparisonId,
        version: '1.1.0', // Mock version
        metrics: comparison,
      },
      differences,
      recommendation,
    };
  }

  /**
   * Cleanup monitoring resources
   */
  destroy(): void {
    // Stop all monitoring intervals
    this.monitoringIntervals.forEach((interval, pluginId) => {
      this.stopMonitoring(pluginId);
    });

    // Clear all data
    this.metrics.clear();
    this.alerts.clear();
    this.recommendations.clear();
    this.benchmarks.clear();
    this.trends.clear();
    
    this.removeAllListeners();
  }

  /**
   * Collect metrics for a plugin (private method)
   */
  private collectMetrics(pluginId: string): void {
    // Mock metrics collection
    const metrics: PluginPerformanceMetrics = {
      pluginId,
      executionTime: {
        average: Math.random() * 100 + 50, // 50-150ms
        min: Math.random() * 30 + 10, // 10-40ms
        max: Math.random() * 200 + 100, // 100-300ms
        p95: Math.random() * 150 + 75, // 75-225ms
        p99: Math.random() * 200 + 100, // 100-300ms
      },
      memoryUsage: {
        current: Math.random() * 80 + 20, // 20-100MB
        peak: Math.random() * 120 + 50, // 50-170MB
        average: Math.random() * 60 + 30, // 30-90MB
      },
      cpuUsage: {
        current: Math.random() * 60 + 10, // 10-70%
        average: Math.random() * 40 + 20, // 20-60%
        peak: Math.random() * 80 + 40, // 40-120%
      },
      errorRate: Math.random() * 5, // 0-5%
      lastMeasurement: new Date(),
    };

    this.metrics.set(pluginId, metrics);

    // Check for alerts
    this.checkAlerts(pluginId, metrics);

    // Generate recommendations periodically
    if (Math.random() < 0.1) { // 10% chance
      this.generateRecommendations(pluginId);
    }
  }

  /**
   * Check for performance alerts
   */
  private checkAlerts(pluginId: string, metrics: PluginPerformanceMetrics): void {
    const alerts: PerformanceAlert[] = [];

    // Memory alert
    if (metrics.memoryUsage.current > this.config.alertThresholds.memoryUsage) {
      alerts.push({
        pluginId,
        type: 'memory',
        severity: metrics.memoryUsage.current > this.config.alertThresholds.memoryUsage * 1.5 ? 'critical' : 'warning',
        threshold: this.config.alertThresholds.memoryUsage,
        currentValue: metrics.memoryUsage.current,
        message: `Memory usage (${metrics.memoryUsage.current.toFixed(1)}MB) exceeds threshold (${this.config.alertThresholds.memoryUsage}MB)`,
        timestamp: new Date(),
        acknowledged: false,
      });
    }

    // CPU alert
    if (metrics.cpuUsage.current > this.config.alertThresholds.cpuUsage) {
      alerts.push({
        pluginId,
        type: 'cpu',
        severity: metrics.cpuUsage.current > this.config.alertThresholds.cpuUsage * 1.2 ? 'critical' : 'warning',
        threshold: this.config.alertThresholds.cpuUsage,
        currentValue: metrics.cpuUsage.current,
        message: `CPU usage (${metrics.cpuUsage.current.toFixed(1)}%) exceeds threshold (${this.config.alertThresholds.cpuUsage}%)`,
        timestamp: new Date(),
        acknowledged: false,
      });
    }

    // Store alerts and emit events
    if (alerts.length > 0) {
      if (!this.alerts.has(pluginId)) {
        this.alerts.set(pluginId, []);
      }
      this.alerts.get(pluginId)!.push(...alerts);

      alerts.forEach(alert => {
        this.emit('alert:triggered', alert);
      });
    }
  }
}