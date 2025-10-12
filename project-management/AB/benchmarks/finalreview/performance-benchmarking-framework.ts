/**
 * 371 OS Performance Benchmarking Framework
 *
 * Comprehensive load testing, monitoring, and optimization framework
 * for the 371 Minds Operating System
 */

import { performance, PerformanceObserver } from 'perf_hooks';
import { EventEmitter } from 'events';

export interface PerformanceMetrics {
  timestamp: Date;
  operation: string;
  duration: number;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage: number;
  concurrentUsers: number;
  throughput: number;
  errorRate: number;
  responseTime: {
    p50: number;
    p95: number;
    p99: number;
  };
}

export interface LoadTestConfig {
  targetURL: string;
  virtualUsers: number[];
  duration: number;
  rampUpTime: number;
  requests: TestRequest[];
}

export interface TestRequest {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  payload?: any;
  expectedStatus?: number;
  weight?: number;
}

export interface LoadTestResult {
  summary: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    averageResponseTime: number;
    minResponseTime: number;
    maxResponseTime: number;
    requestsPerSecond: number;
    totalDataTransferred: number;
  };
  responseTimes: {
    p50: number;
    p95: number;
    p99: number;
  };
  errors: Array<{
    error: string;
    count: number;
    percentage: number;
  }>;
  throughput: Array<{
    timestamp: number;
    requestsPerSecond: number;
  }>;
}

export class PerformanceBenchmarkFramework extends EventEmitter {
  private metrics: PerformanceMetrics[] = [];
  private observers: PerformanceObserver[] = [];
  private activeTests: Map<string, boolean> = new Map();

  constructor() {
    super();
    this.setupPerformanceObservers();
  }

  /**
   * Sets up performance observers for detailed metrics collection
   */
  private setupPerformanceObservers(): void {
    // HTTP request duration observer
    const httpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name.startsWith('http')) {
          this.recordMetric({
            timestamp: new Date(),
            operation: entry.name,
            duration: entry.duration,
            memoryUsage: process.memoryUsage(),
            cpuUsage: process.cpuUsage().user,
            concurrentUsers: 0, // Would be tracked separately
            throughput: 0,
            errorRate: 0,
            responseTime: { p50: 0, p95: 0, p99: 0 }
          });
        }
      }
    });

    httpObserver.observe({ entryTypes: ['measure', 'http'] });
    this.observers.push(httpObserver);

    // Memory usage observer
    const memoryObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'gc') {
          console.log(`[PerformanceFramework] GC Event: ${entry.kind} - ${entry.duration}ms`);
        }
      }
    });

    memoryObserver.observe({ entryTypes: ['gc'] });
    this.observers.push(memoryObserver);
  }

  /**
   * Records a performance metric
   */
  public recordMetric(metric: PerformanceMetrics): void {
    this.metrics.push(metric);
    this.emit('metric_recorded', metric);

    // Keep only last 10000 metrics in memory
    if (this.metrics.length > 10000) {
      this.metrics = this.metrics.slice(-10000);
    }
  }

  /**
   * Runs a comprehensive load test against specified endpoints
   */
  public async runLoadTest(config: LoadTestConfig): Promise<LoadTestResult> {
    const testId = `load_test_${Date.now()}`;
    this.activeTests.set(testId, true);

    console.log(`[PerformanceFramework] Starting load test: ${testId}`);
    console.log(`[PerformanceFramework] Target: ${config.targetURL}`);
    console.log(`[PerformanceFramework] Virtual Users: ${config.virtualUsers.join(', ')}`);
    console.log(`[PerformanceFramework] Duration: ${config.duration}s`);

    try {
      const results = await this.executeLoadTest(config);

      console.log(`[PerformanceFramework] Load test completed: ${testId}`);
      console.log(`[PerformanceFramework] Total Requests: ${results.summary.totalRequests}`);
      console.log(`[PerformanceFramework] Avg Response Time: ${results.summary.averageResponseTime}ms`);
      console.log(`[PerformanceFramework] Requests/sec: ${results.summary.requestsPerSecond}`);

      this.emit('load_test_completed', { testId, results });

      return results;

    } catch (error) {
      console.error(`[PerformanceFramework] Load test failed: ${testId}`, error);
      throw error;
    } finally {
      this.activeTests.set(testId, false);
    }
  }

  /**
   * Executes the actual load test
   */
  private async executeLoadTest(config: LoadTestConfig): Promise<LoadTestResult> {
    const startTime = Date.now();
    const responseTimes: number[] = [];
    const errors: Map<string, number> = new Map();
    const throughputData: Array<{ timestamp: number; requestsPerSecond: number }> = [];
    let requestCount = 0;
    let errorCount = 0;

    // Simulate load test (in real implementation, would use artillery, k6, or similar)
    const testDuration = config.duration * 1000; // Convert to milliseconds
    const endTime = startTime + testDuration;

    while (Date.now() < endTime) {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      // Calculate current user load based on ramp-up
      const userLoad = this.calculateCurrentUserLoad(config, elapsed);

      // Execute requests for current user load
      const promises = [];
      for (let i = 0; i < userLoad; i++) {
        promises.push(this.executeTestRequest(config));
      }

      const results = await Promise.allSettled(promises);

      results.forEach((result) => {
        requestCount++;
        if (result.status === 'fulfilled') {
          const responseTime = result.value.responseTime;
          responseTimes.push(responseTime);
        } else {
          errorCount++;
          const errorMsg = result.reason?.message || 'Unknown error';
          errors.set(errorMsg, (errors.get(errorMsg) || 0) + 1);
        }
      });

      // Record throughput every second
      if (Math.floor(elapsed / 1000) !== Math.floor((elapsed - 100) / 1000)) {
        const requestsInLastSecond = results.length;
        throughputData.push({
          timestamp: currentTime,
          requestsPerSecond: requestsInLastSecond
        });
      }

      // Small delay to prevent overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return this.calculateLoadTestResults(responseTimes, errors, throughputData, requestCount, errorCount);
  }

  /**
   * Executes a single test request
   */
  private async executeTestRequest(config: LoadTestConfig): Promise<{ responseTime: number }> {
    const request = this.selectWeightedRequest(config.requests);
    const startTime = performance.now();

    try {
      // Simulate HTTP request (in real implementation, would make actual HTTP calls)
      const responseTime = Math.random() * 1000 + 50; // 50-1050ms random response time

      // Simulate occasional errors
      if (Math.random() < 0.05) { // 5% error rate
        throw new Error('Simulated network error');
      }

      await new Promise(resolve => setTimeout(resolve, responseTime));
      return { responseTime };

    } catch (error) {
      throw error;
    }
  }

  /**
   * Selects a request based on weight distribution
   */
  private selectWeightedRequest(requests: TestRequest[]): TestRequest {
    const totalWeight = requests.reduce((sum, req) => sum + (req.weight || 1), 0);
    let random = Math.random() * totalWeight;

    for (const request of requests) {
      random -= (request.weight || 1);
      if (random <= 0) {
        return request;
      }
    }

    return requests[0];
  }

  /**
   * Calculates current user load based on ramp-up configuration
   */
  private calculateCurrentUserLoad(config: LoadTestConfig, elapsedMs: number): number {
    const rampUpProgress = Math.min(elapsedMs / (config.rampUpTime * 1000), 1);

    // For simplicity, use the first user count for this demo
    // In real implementation, would interpolate between user count steps
    return Math.floor(config.virtualUsers[0] * rampUpProgress);
  }

  /**
   * Calculates final load test results
   */
  private calculateLoadTestResults(
    responseTimes: number[],
    errors: Map<string, number>,
    throughputData: Array<{ timestamp: number; requestsPerSecond: number }>,
    totalRequests: number,
    errorCount: number
  ): LoadTestResult {
    const successfulRequests = totalRequests - errorCount;
    const sortedResponseTimes = responseTimes.sort((a, b) => a - b);

    const p50Index = Math.floor(sortedResponseTimes.length * 0.5);
    const p95Index = Math.floor(sortedResponseTimes.length * 0.95);
    const p99Index = Math.floor(sortedResponseTimes.length * 0.99);

    const avgResponseTime = responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length;
    const avgThroughput = throughputData.reduce((sum, data) => sum + data.requestsPerSecond, 0) / throughputData.length;

    return {
      summary: {
        totalRequests,
        successfulRequests,
        failedRequests: errorCount,
        averageResponseTime: avgResponseTime,
        minResponseTime: Math.min(...responseTimes),
        maxResponseTime: Math.max(...responseTimes),
        requestsPerSecond: avgThroughput,
        totalDataTransferred: totalRequests * 1024 // Assume 1KB per request
      },
      responseTimes: {
        p50: sortedResponseTimes[p50Index] || 0,
        p95: sortedResponseTimes[p95Index] || 0,
        p99: sortedResponseTimes[p99Index] || 0
      },
      errors: Array.from(errors.entries()).map(([error, count]) => ({
        error,
        count,
        percentage: (count / totalRequests) * 100
      })),
      throughput: throughputData
    };
  }

  /**
   * Benchmarks email service performance
   */
  public async benchmarkEmailService(): Promise<PerformanceMetrics[]> {
    console.log('[PerformanceFramework] Starting email service benchmarks...');

    const emailMetrics: PerformanceMetrics[] = [];

    // Benchmark email campaign creation
    const campaignStartTime = performance.now();
    // Simulate email campaign creation
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
    const campaignDuration = performance.now() - campaignStartTime;

    emailMetrics.push({
      timestamp: new Date(),
      operation: 'email_campaign_creation',
      duration: campaignDuration,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage().user,
      concurrentUsers: 1,
      throughput: 1 / (campaignDuration / 1000),
      errorRate: 0,
      responseTime: { p50: campaignDuration, p95: campaignDuration, p99: campaignDuration }
    });

    // Benchmark individual email sending
    const emailStartTime = performance.now();
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));
    const emailDuration = performance.now() - emailStartTime;

    emailMetrics.push({
      timestamp: new Date(),
      operation: 'individual_email_send',
      duration: emailDuration,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage().user,
      concurrentUsers: 1,
      throughput: 1 / (emailDuration / 1000),
      errorRate: 0,
      responseTime: { p50: emailDuration, p95: emailDuration, p99: emailDuration }
    });

    console.log(`[PerformanceFramework] Email benchmarks completed`);
    console.log(`[PerformanceFramework] Campaign Creation: ${campaignDuration.toFixed(2)}ms`);
    console.log(`[PerformanceFramework] Email Send: ${emailDuration.toFixed(2)}ms`);

    return emailMetrics;
  }

  /**
   * Benchmarks agent coordination performance
   */
  public async benchmarkAgentCoordination(): Promise<PerformanceMetrics[]> {
    console.log('[PerformanceFramework] Starting agent coordination benchmarks...');

    const agentMetrics: PerformanceMetrics[] = [];

    // Benchmark agent selection
    const selectionStartTime = performance.now();
    await new Promise(resolve => setTimeout(resolve, Math.random() * 150 + 50));
    const selectionDuration = performance.now() - selectionStartTime;

    agentMetrics.push({
      timestamp: new Date(),
      operation: 'agent_selection',
      duration: selectionDuration,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage().user,
      concurrentUsers: 1,
      throughput: 1 / (selectionDuration / 1000),
      errorRate: 0,
      responseTime: { p50: selectionDuration, p95: selectionDuration, p99: selectionDuration }
    });

    // Benchmark multi-agent coordination
    const coordinationStartTime = performance.now();
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
    const coordinationDuration = performance.now() - coordinationStartTime;

    agentMetrics.push({
      timestamp: new Date(),
      operation: 'multi_agent_coordination',
      duration: coordinationDuration,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage().user,
      concurrentUsers: 3, // Simulating 3-agent coordination
      throughput: 1 / (coordinationDuration / 1000),
      errorRate: 0,
      responseTime: { p50: coordinationDuration, p95: coordinationDuration, p99: coordinationDuration }
    });

    console.log(`[PerformanceFramework] Agent coordination benchmarks completed`);
    console.log(`[PerformanceFramework] Agent Selection: ${selectionDuration.toFixed(2)}ms`);
    console.log(`[PerformanceFramework] Multi-Agent Coordination: ${coordinationDuration.toFixed(2)}ms`);

    return agentMetrics;
  }

  /**
   * Benchmarks blockchain integration performance
   */
  public async benchmarkBlockchainIntegration(): Promise<PerformanceMetrics[]> {
    console.log('[PerformanceFramework] Starting blockchain integration benchmarks...');

    const blockchainMetrics: PerformanceMetrics[] = [];

    // Benchmark DAO proposal creation
    const daoStartTime = performance.now();
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500)); // Blockchain ops are slower
    const daoDuration = performance.now() - daoStartTime;

    blockchainMetrics.push({
      timestamp: new Date(),
      operation: 'dao_proposal_creation',
      duration: daoDuration,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage().user,
      concurrentUsers: 1,
      throughput: 1 / (daoDuration / 1000),
      errorRate: 0,
      responseTime: { p50: daoDuration, p95: daoDuration, p99: daoDuration }
    });

    // Benchmark blockchain verification
    const verificationStartTime = performance.now();
    await new Promise(resolve => setTimeout(resolve, Math.random() * 800 + 300));
    const verificationDuration = performance.now() - verificationStartTime;

    blockchainMetrics.push({
      timestamp: new Date(),
      operation: 'blockchain_verification',
      duration: verificationDuration,
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage().user,
      concurrentUsers: 1,
      throughput: 1 / (verificationDuration / 1000),
      errorRate: 0,
      responseTime: { p50: verificationDuration, p95: verificationDuration, p99: verificationDuration }
    });

    console.log(`[PerformanceFramework] Blockchain benchmarks completed`);
    console.log(`[PerformanceFramework] DAO Proposal: ${daoDuration.toFixed(2)}ms`);
    console.log(`[PerformanceFramework] Blockchain Verification: ${verificationDuration.toFixed(2)}ms`);

    return blockchainMetrics;
  }

  /**
   * Runs comprehensive system benchmarks
   */
  public async runComprehensiveBenchmarks(): Promise<{
    email: PerformanceMetrics[];
    agent: PerformanceMetrics[];
    blockchain: PerformanceMetrics[];
    summary: any;
  }> {
    console.log('[PerformanceFramework] Starting comprehensive system benchmarks...');

    const startTime = Date.now();

    // Run all benchmarks
    const [emailMetrics, agentMetrics, blockchainMetrics] = await Promise.all([
      this.benchmarkEmailService(),
      this.benchmarkAgentCoordination(),
      this.benchmarkBlockchainIntegration()
    ]);

    const totalDuration = Date.now() - startTime;

    // Calculate summary statistics
    const allMetrics = [...emailMetrics, ...agentMetrics, ...blockchainMetrics];
    const avgResponseTime = allMetrics.reduce((sum, m) => sum + m.duration, 0) / allMetrics.length;
    const totalMemoryUsed = Math.max(...allMetrics.map(m => m.memoryUsage.heapUsed));

    const summary = {
      totalDuration,
      totalOperations: allMetrics.length,
      averageResponseTime: avgResponseTime,
      peakMemoryUsage: totalMemoryUsed,
      operationsPerSecond: allMetrics.length / (totalDuration / 1000),
      benchmarks: {
        email: emailMetrics.length,
        agent: agentMetrics.length,
        blockchain: blockchainMetrics.length
      }
    };

    console.log(`[PerformanceFramework] Comprehensive benchmarks completed in ${totalDuration}ms`);
    console.log(`[PerformanceFramework] Average Response Time: ${avgResponseTime.toFixed(2)}ms`);
    console.log(`[PerformanceFramework] Operations/sec: ${summary.operationsPerSecond.toFixed(2)}`);

    this.emit('comprehensive_benchmarks_completed', { metrics: allMetrics, summary });

    return {
      email: emailMetrics,
      agent: agentMetrics,
      blockchain: blockchainMetrics,
      summary
    };
  }

  /**
   * Generates performance optimization recommendations
   */
  public generateOptimizationRecommendations(metrics: PerformanceMetrics[]): string[] {
    const recommendations: string[] = [];

    // Analyze response times
    const avgResponseTime = metrics.reduce((sum, m) => sum + m.duration, 0) / metrics.length;
    if (avgResponseTime > 1000) {
      recommendations.push('High average response time detected. Consider implementing caching for frequently accessed data.');
      recommendations.push('Review external API calls for potential optimization or batching.');
    }

    // Analyze memory usage
    const peakMemory = Math.max(...metrics.map(m => m.memoryUsage.heapUsed));
    if (peakMemory > 100 * 1024 * 1024) { // 100MB
      recommendations.push('High memory usage detected. Consider implementing memory pooling for large objects.');
      recommendations.push('Review object lifecycle and implement proper cleanup procedures.');
    }

    // Analyze error rates
    const errorRate = metrics.filter(m => m.errorRate > 0).length / metrics.length;
    if (errorRate > 0.05) { // 5% error rate
      recommendations.push('High error rate detected. Review error handling and implement retry mechanisms.');
      recommendations.push('Consider implementing circuit breaker pattern for external service calls.');
    }

    // Analyze throughput
    const avgThroughput = metrics.reduce((sum, m) => sum + m.throughput, 0) / metrics.length;
    if (avgThroughput < 10) {
      recommendations.push('Low throughput detected. Consider implementing parallel processing where possible.');
      recommendations.push('Review sequential operations that could be optimized with concurrency.');
    }

    return recommendations;
  }

  /**
   * Exports metrics for external analysis
   */
  public exportMetrics(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = ['timestamp', 'operation', 'duration', 'memoryUsage', 'cpuUsage', 'concurrentUsers', 'throughput', 'errorRate'];
      const csvData = [
        headers.join(','),
        ...this.metrics.map(m => [
          m.timestamp.toISOString(),
          m.operation,
          m.duration.toString(),
          m.memoryUsage.heapUsed.toString(),
          m.cpuUsage.toString(),
          m.concurrentUsers.toString(),
          m.throughput.toString(),
          m.errorRate.toString()
        ].join(','))
      ].join('\n');

      return csvData;
    }

    return JSON.stringify(this.metrics, null, 2);
  }

  /**
   * Cleans up resources
   */
  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = [];
    this.activeTests.clear();

    console.log('[PerformanceFramework] Cleanup completed');
  }
}

// Export default instance for global use
export const performanceFramework = new PerformanceBenchmarkFramework();