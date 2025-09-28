/**
 * Performance Monitor Component
 * 
 * Responsible for real-time agent performance tracking, metrics collection,
 * and performance trend analysis across all domains and complexity levels.
 */

import type { 
  AgentPerformanceData, 
  PerformanceMonitoringRequest,
  PerformanceMonitoringResponse,
  PerformanceTrend,
  TaskComplexityRating,
  ResourceUtilization,
  QualityMetrics,
  ImprovementRecommendation,
  CAOLogger,
  CAOOperationResult,
  PerformanceMonitoringDomain
} from './types.js';

export class PerformanceMonitor {
  private logger: CAOLogger;
  private monitoringDomains: Record<string, PerformanceMonitoringDomain>;
  private performanceDataStore: Map<string, AgentPerformanceData[]>;
  private realTimeMetrics: Map<string, number>;
  private alertThresholds: Map<string, number>;

  constructor(
    monitoringDomains: Record<string, PerformanceMonitoringDomain>,
    logger: CAOLogger
  ) {
    this.logger = logger;
    this.monitoringDomains = monitoringDomains;
    this.performanceDataStore = new Map();
    this.realTimeMetrics = new Map();
    this.alertThresholds = new Map();
    
    this.initializeMonitoring();
    this.logger.info('🔍 Performance Monitor initialized successfully');
  }

  /**
   * Initialize monitoring configurations and thresholds
   */
  private initializeMonitoring(): void {
    // Set up default alert thresholds
    this.alertThresholds.set('response_time_degradation', 5000); // 5 seconds
    this.alertThresholds.set('success_rate_decline', 0.75); // 75%
    this.alertThresholds.set('resource_utilization_spike', 0.90); // 90%
    this.alertThresholds.set('quality_score_decline', 0.70); // 70%

    // Initialize real-time metrics tracking
    this.realTimeMetrics.set('total_agents_monitored', 0);
    this.realTimeMetrics.set('active_performance_issues', 0);
    this.realTimeMetrics.set('average_system_performance', 0);
    
    this.logger.info('📊 Performance monitoring thresholds and metrics initialized');
  }

  /**
   * Track agent performance data in real-time
   */
  public async trackAgentPerformance(
    agentId: string,
    performanceData: Partial<AgentPerformanceData>
  ): Promise<CAOOperationResult> {
    const startTime = Date.now();
    
    try {
      this.logger.info(`📈 Tracking performance for agent: ${agentId}`);
      
      // Validate input data
      this.validatePerformanceData(agentId, performanceData);
      
      // Create complete performance data record
      const completeData: AgentPerformanceData = {
        agentId,
        agentType: performanceData.agentType || 'unknown',
        domain: performanceData.domain || 'general',
        timestamp: new Date(),
        performanceScore: performanceData.performanceScore || 0,
        successRate: performanceData.successRate || 0,
        averageResponseTime: performanceData.averageResponseTime || 0,
        taskComplexityHandling: performanceData.taskComplexityHandling || this.getDefaultComplexityRating(),
        learningProgress: performanceData.learningProgress || [],
        competencyAreas: performanceData.competencyAreas || {},
        improvementRecommendations: performanceData.improvementRecommendations || [],
        resourceUtilization: performanceData.resourceUtilization || this.getDefaultResourceUtilization(),
        qualityMetrics: performanceData.qualityMetrics || this.getDefaultQualityMetrics()
      };

      // Store performance data
      this.storePerformanceData(agentId, completeData);
      
      // Update real-time metrics
      this.updateRealTimeMetrics(completeData);
      
      // Check for performance alerts
      await this.checkPerformanceAlerts(completeData);
      
      // Generate improvement recommendations if needed
      const recommendations = await this.generatePerformanceRecommendations(completeData);
      
      const processingTime = Date.now() - startTime;
      
      this.logger.info(`✅ Performance tracking completed for ${agentId} in ${processingTime}ms`);
      
      return {
        success: true,
        operationType: 'track_agent_performance',
        operationId: `track_${agentId}_${Date.now()}`,
        timestamp: new Date(),
        processingTime,
        result: {
          agentId,
          performanceScore: completeData.performanceScore,
          recommendations: recommendations.length,
          alertsTriggered: await this.getActiveAlertsCount(agentId)
        },
        metadata: {
          agentVersion: '1.0.0',
          requestSource: 'performance_monitor',
          resourcesUsed: ['performance_data_store', 'real_time_metrics']
        }
      };

    } catch (error) {
      const processingTime = Date.now() - startTime;
      this.logger.error(`❌ Performance tracking failed for ${agentId}:`, error);
      
      return {
        success: false,
        operationType: 'track_agent_performance',
        operationId: `track_${agentId}_${Date.now()}`,
        timestamp: new Date(),
        processingTime,
        error: {
          code: 'PERFORMANCE_TRACKING_ERROR',
          message: error instanceof Error ? error.message : 'Unknown error',
          details: error,
          severity: 'medium',
          category: 'processing',
          recoverable: true,
          suggestedActions: [
            'Verify agent ID is valid',
            'Check performance data format',
            'Review monitoring domain configuration'
          ]
        },
        metadata: {
          agentVersion: '1.0.0',
          requestSource: 'performance_monitor',
          resourcesUsed: []
        }
      };
    }
  }

  /**
   * Analyze performance trends over time
   */
  public async analyzePerformanceTrends(
    request: PerformanceMonitoringRequest
  ): Promise<PerformanceMonitoringResponse> {
    const startTime = Date.now();
    
    try {
      this.logger.info(`📊 Analyzing performance trends for request: ${JSON.stringify(request)}`);
      
      // Retrieve relevant performance data
      const performanceData = this.getPerformanceData(request);
      
      // Calculate aggregated metrics
      const aggregatedMetrics = this.calculateAggregatedMetrics(performanceData, request.metrics);
      
      // Identify performance trends
      const trends = this.identifyPerformanceTrends(performanceData, request.timeframe);
      
      // Generate recommendations if requested
      const recommendations = request.includeRecommendations 
        ? await this.generateSystemRecommendations(performanceData, trends)
        : [];
      
      const response: PerformanceMonitoringResponse = {
        requestId: `analysis_${Date.now()}`,
        agentPerformanceData: performanceData,
        aggregatedMetrics,
        trends,
        recommendations,
        generatedAt: new Date()
      };
      
      const processingTime = Date.now() - startTime;
      this.logger.info(`✅ Performance trend analysis completed in ${processingTime}ms`);
      
      return response;

    } catch (error) {
      this.logger.error('❌ Performance trend analysis failed:', error);
      throw error;
    }
  }

  /**
   * Get real-time performance metrics
   */
  public getRealTimeMetrics(): Record<string, number> {
    return Object.fromEntries(this.realTimeMetrics);
  }

  /**
   * Get performance summary for specific agent
   */
  public getAgentPerformanceSummary(agentId: string): AgentPerformanceData | null {
    const agentData = this.performanceDataStore.get(agentId);
    if (!agentData || agentData.length === 0) {
      return null;
    }
    
    // Return the most recent performance data
    return agentData[agentData.length - 1];
  }

  /**
   * Get performance comparison between agents
   */
  public compareAgentPerformance(agentIds: string[]): Record<string, any> {
    const comparison: Record<string, any> = {};
    
    for (const agentId of agentIds) {
      const summary = this.getAgentPerformanceSummary(agentId);
      if (summary) {
        comparison[agentId] = {
          performanceScore: summary.performanceScore,
          successRate: summary.successRate,
          averageResponseTime: summary.averageResponseTime,
          qualityScore: this.calculateOverallQualityScore(summary.qualityMetrics),
          lastUpdated: summary.timestamp
        };
      }
    }
    
    return comparison;
  }

  /**
   * Private helper methods
   */
  
  private validatePerformanceData(agentId: string, data: Partial<AgentPerformanceData>): void {
    if (!agentId || agentId.trim() === '') {
      throw new Error('Agent ID is required');
    }
    
    if (data.performanceScore !== undefined && (data.performanceScore < 0 || data.performanceScore > 100)) {
      throw new Error('Performance score must be between 0 and 100');
    }
    
    if (data.successRate !== undefined && (data.successRate < 0 || data.successRate > 1)) {
      throw new Error('Success rate must be between 0 and 1');
    }
    
    if (data.averageResponseTime !== undefined && data.averageResponseTime < 0) {
      throw new Error('Average response time cannot be negative');
    }
  }

  private storePerformanceData(agentId: string, data: AgentPerformanceData): void {
    if (!this.performanceDataStore.has(agentId)) {
      this.performanceDataStore.set(agentId, []);
    }
    
    const agentData = this.performanceDataStore.get(agentId)!;
    agentData.push(data);
    
    // Keep only last 1000 records per agent to manage memory
    if (agentData.length > 1000) {
      agentData.splice(0, agentData.length - 1000);
    }
    
    this.performanceDataStore.set(agentId, agentData);
  }

  private updateRealTimeMetrics(data: AgentPerformanceData): void {
    // Update total agents monitored
    const uniqueAgents = new Set(this.performanceDataStore.keys()).size;
    this.realTimeMetrics.set('total_agents_monitored', uniqueAgents);
    
    // Update average system performance
    const allData = Array.from(this.performanceDataStore.values()).flat();
    const avgPerformance = allData.reduce((sum, d) => sum + d.performanceScore, 0) / allData.length;
    this.realTimeMetrics.set('average_system_performance', avgPerformance || 0);
    
    // Update active performance issues count
    const issuesCount = allData.filter(d => 
      d.performanceScore < 70 || 
      d.successRate < 0.80 || 
      d.averageResponseTime > 2000
    ).length;
    this.realTimeMetrics.set('active_performance_issues', issuesCount);
  }

  private async checkPerformanceAlerts(data: AgentPerformanceData): Promise<void> {
    const alerts: string[] = [];
    
    // Check response time
    if (data.averageResponseTime > this.alertThresholds.get('response_time_degradation')!) {
      alerts.push(`High response time detected: ${data.averageResponseTime}ms`);
    }
    
    // Check success rate
    if (data.successRate < this.alertThresholds.get('success_rate_decline')!) {
      alerts.push(`Low success rate detected: ${(data.successRate * 100).toFixed(1)}%`);
    }
    
    // Check resource utilization
    if (data.resourceUtilization.efficiency < (1 - this.alertThresholds.get('resource_utilization_spike')!)) {
      alerts.push(`High resource utilization detected`);
    }
    
    // Check quality metrics
    const qualityScore = this.calculateOverallQualityScore(data.qualityMetrics);
    if (qualityScore < this.alertThresholds.get('quality_score_decline')!) {
      alerts.push(`Quality score decline detected: ${(qualityScore * 100).toFixed(1)}%`);
    }
    
    if (alerts.length > 0) {
      this.logger.warn(`🚨 Performance alerts for ${data.agentId}:`, alerts);
    }
  }

  private async generatePerformanceRecommendations(data: AgentPerformanceData): Promise<ImprovementRecommendation[]> {
    const recommendations: ImprovementRecommendation[] = [];
    
    // Response time recommendations
    if (data.averageResponseTime > 2000) {
      recommendations.push({
        id: `perf_resp_${Date.now()}`,
        priority: 'high',
        competencyArea: 'performance_optimization',
        currentGap: (data.averageResponseTime - 1000) / 1000,
        targetImprovement: 0.5,
        recommendedActions: [
          'Optimize query performance',
          'Implement caching strategies',
          'Review algorithm complexity'
        ],
        estimatedTimeframe: '1-2 weeks',
        resourceRequirements: ['Performance profiling tools', 'Cache infrastructure'],
        expectedOutcome: 'Reduce response time to under 1 second'
      });
    }
    
    // Success rate recommendations
    if (data.successRate < 0.85) {
      recommendations.push({
        id: `perf_succ_${Date.now()}`,
        priority: 'high',
        competencyArea: 'accuracy_improvement',
        currentGap: 0.85 - data.successRate,
        targetImprovement: 0.15,
        recommendedActions: [
          'Review error patterns',
          'Enhance input validation',
          'Implement retry mechanisms'
        ],
        estimatedTimeframe: '2-3 weeks',
        resourceRequirements: ['Error analysis tools', 'Testing infrastructure'],
        expectedOutcome: 'Achieve >85% success rate consistently'
      });
    }
    
    return recommendations;
  }

  private async generateSystemRecommendations(
    performanceData: AgentPerformanceData[],
    trends: PerformanceTrend[]
  ): Promise<ImprovementRecommendation[]> {
    const recommendations: ImprovementRecommendation[] = [];
    
    // Analyze declining trends
    const decliningTrends = trends.filter(t => t.direction === 'declining' && t.significance !== 'low');
    
    for (const trend of decliningTrends) {
      recommendations.push({
        id: `sys_trend_${Date.now()}_${trend.metric}`,
        priority: trend.significance === 'high' ? 'high' : 'medium',
        competencyArea: 'system_optimization',
        currentGap: Math.abs(trend.changePercentage) / 100,
        targetImprovement: 0.2,
        recommendedActions: [
          `Address declining ${trend.metric}`,
          'Implement corrective measures',
          'Monitor progress closely'
        ],
        estimatedTimeframe: trend.significance === 'high' ? '1 week' : '2-3 weeks',
        resourceRequirements: ['System monitoring tools', 'Performance optimization resources'],
        expectedOutcome: `Reverse declining trend in ${trend.metric}`
      });
    }
    
    return recommendations;
  }

  private getPerformanceData(request: PerformanceMonitoringRequest): AgentPerformanceData[] {
    let allData: AgentPerformanceData[] = [];
    
    if (request.agentId) {
      const agentData = this.performanceDataStore.get(request.agentId) || [];
      allData = agentData;
    } else {
      allData = Array.from(this.performanceDataStore.values()).flat();
    }
    
    // Filter by timeframe
    allData = allData.filter(data => 
      data.timestamp >= request.timeframe.startDate && 
      data.timestamp <= request.timeframe.endDate
    );
    
    // Filter by domain if specified
    if (request.domain) {
      allData = allData.filter(data => data.domain === request.domain);
    }
    
    return allData;
  }

  private calculateAggregatedMetrics(
    data: AgentPerformanceData[], 
    requestedMetrics: string[]
  ): Record<string, number> {
    const metrics: Record<string, number> = {};
    
    if (data.length === 0) return metrics;
    
    for (const metric of requestedMetrics) {
      switch (metric) {
        case 'average_performance_score':
          metrics[metric] = data.reduce((sum, d) => sum + d.performanceScore, 0) / data.length;
          break;
        case 'average_success_rate':
          metrics[metric] = data.reduce((sum, d) => sum + d.successRate, 0) / data.length;
          break;
        case 'average_response_time':
          metrics[metric] = data.reduce((sum, d) => sum + d.averageResponseTime, 0) / data.length;
          break;
        case 'total_agents':
          metrics[metric] = new Set(data.map(d => d.agentId)).size;
          break;
        default:
          this.logger.warn(`Unknown metric requested: ${metric}`);
      }
    }
    
    return metrics;
  }

  private identifyPerformanceTrends(
    data: AgentPerformanceData[],
    timeframe: { startDate: Date; endDate: Date }
  ): PerformanceTrend[] {
    const trends: PerformanceTrend[] = [];
    
    if (data.length < 2) return trends;
    
    // Sort data by timestamp
    const sortedData = data.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    // Calculate trends for key metrics
    const metrics = ['performanceScore', 'successRate', 'averageResponseTime'];
    
    for (const metric of metrics) {
      const values = sortedData.map(d => this.getMetricValue(d, metric));
      const trend = this.calculateTrend(values);
      
      trends.push({
        metric,
        direction: trend.direction,
        changePercentage: trend.changePercentage,
        significance: trend.significance,
        timeframe: `${timeframe.startDate.toISOString()} to ${timeframe.endDate.toISOString()}`
      });
    }
    
    return trends;
  }

  private getMetricValue(data: AgentPerformanceData, metric: string): number {
    switch (metric) {
      case 'performanceScore': return data.performanceScore;
      case 'successRate': return data.successRate;
      case 'averageResponseTime': return data.averageResponseTime;
      default: return 0;
    }
  }

  private calculateTrend(values: number[]): {
    direction: 'improving' | 'declining' | 'stable';
    changePercentage: number;
    significance: 'low' | 'medium' | 'high';
  } {
    if (values.length < 2) {
      return { direction: 'stable', changePercentage: 0, significance: 'low' };
    }
    
    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    const changePercentage = ((lastValue - firstValue) / firstValue) * 100;
    
    let direction: 'improving' | 'declining' | 'stable';
    if (Math.abs(changePercentage) < 5) {
      direction = 'stable';
    } else if (changePercentage > 0) {
      direction = 'improving';
    } else {
      direction = 'declining';
    }
    
    let significance: 'low' | 'medium' | 'high';
    if (Math.abs(changePercentage) < 10) {
      significance = 'low';
    } else if (Math.abs(changePercentage) < 25) {
      significance = 'medium';
    } else {
      significance = 'high';
    }
    
    return { direction, changePercentage, significance };
  }

  private calculateOverallQualityScore(metrics: QualityMetrics): number {
    const weights = {
      accuracy: 0.3,
      completeness: 0.25,
      relevance: 0.25,
      consistency: 0.1,
      compliance: 0.1
    };
    
    return (
      metrics.accuracy * weights.accuracy +
      metrics.completeness * weights.completeness +
      metrics.relevance * weights.relevance +
      metrics.consistency * weights.consistency +
      metrics.compliance * weights.compliance
    );
  }

  private async getActiveAlertsCount(agentId: string): Promise<number> {
    const data = this.getAgentPerformanceSummary(agentId);
    if (!data) return 0;
    
    let alertCount = 0;
    
    if (data.averageResponseTime > this.alertThresholds.get('response_time_degradation')!) alertCount++;
    if (data.successRate < this.alertThresholds.get('success_rate_decline')!) alertCount++;
    if (data.resourceUtilization.efficiency < (1 - this.alertThresholds.get('resource_utilization_spike')!)) alertCount++;
    if (this.calculateOverallQualityScore(data.qualityMetrics) < this.alertThresholds.get('quality_score_decline')!) alertCount++;
    
    return alertCount;
  }

  private getDefaultComplexityRating(): TaskComplexityRating {
    return { simple: 0, moderate: 0, complex: 0, critical: 0 };
  }

  private getDefaultResourceUtilization(): ResourceUtilization {
    return {
      cpuUsage: 0,
      memoryUsage: 0,
      networkCalls: 0,
      externalApiCalls: 0,
      processingTime: 0,
      efficiency: 1.0
    };
  }

  private getDefaultQualityMetrics(): QualityMetrics {
    return {
      accuracy: 0,
      completeness: 0,
      relevance: 0,
      consistency: 0,
      compliance: 0
    };
  }
}