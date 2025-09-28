/**
 * PerformanceMonitor - Metrics collection and routing optimization service
 * Tracks routing performance, analyzes patterns, and provides insights
 * for continuous improvement of the intelligent routing system
 */

import {
  RoutingDecision,
  RoutingTask,
  RoutingMetrics,
  RoutingAuditLog,
  RoutingOutcome,
  PerformanceTargets,
  TimePeriod,
  AgentDomain,
  TaskPriority,
  StrategicImpact,
} from './types';

interface PerformanceSnapshot {
  timestamp: Date;
  routing_accuracy: number;
  average_response_time: number;
  agent_utilization: Record<string, number>;
  domain_distribution: Record<string, number>;
  escalation_rate: number;
  total_routings: number;
}

interface TrendAnalysis {
  metric_name: string;
  time_period: TimePeriod;
  trend_direction: 'improving' | 'declining' | 'stable';
  trend_magnitude: number;
  data_points: number[];
  analysis: string;
}

interface PerformanceAlert {
  alert_id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  metric_name: string;
  threshold_value: number;
  actual_value: number;
  description: string;
  timestamp: Date;
  resolved: boolean;
}

export class PerformanceMonitor {
  private routingDecisions: Map<string, RoutingDecision> = new Map();
  private auditLogs: Map<string, RoutingAuditLog> = new Map();
  private performanceSnapshots: PerformanceSnapshot[] = [];
  private alerts: Map<string, PerformanceAlert> = new Map();
  private targets: PerformanceTargets;
  
  // Performance tracking variables
  private totalRoutings = 0;
  private successfulRoutings = 0;
  private totalResponseTime = 0;
  private escalationCount = 0;
  private domainCounts: Record<string, number> = {};
  private agentUtilization: Record<string, number> = {};

  constructor(targets: PerformanceTargets) {
    this.targets = targets;
    this.initializeDomainCounts();
    console.log('[PerformanceMonitor] Initialized with performance targets:', targets);
    
    // Start periodic snapshot collection
    this.startPeriodicSnapshots();
  }

  /**
   * Records a routing decision for performance tracking
   */
  public async recordRoutingDecision(decision: RoutingDecision, responseTimeMs: number): Promise<void> {
    const routingId = `perf_${decision.decision_timestamp.getTime()}`;
    
    // Store decision
    this.routingDecisions.set(routingId, decision);
    
    // Update performance counters
    this.totalRoutings++;
    this.totalResponseTime += responseTimeMs;
    
    if (decision.success) {
      this.successfulRoutings++;
    }
    
    if (decision.escalation_required) {
      this.escalationCount++;
    }

    // Update agent utilization
    if (decision.primary_agent) {
      this.agentUtilization[decision.primary_agent] = 
        (this.agentUtilization[decision.primary_agent] || 0) + 1;
    }

    // Create audit log entry
    const auditLog: RoutingAuditLog = {
      routing_id: routingId,
      task_id: `task_${routingId}`, // In real system, this would be actual task ID
      decision: decision,
      outcome: {
        success: decision.success,
        completion_time: responseTimeMs,
        quality_score: decision.confidence_score,
        user_satisfaction: this.estimateUserSatisfaction(decision, responseTimeMs),
        agent_feedback: this.generateAgentFeedback(decision),
        areas_for_improvement: this.identifyImprovementAreas(decision, responseTimeMs)
      },
      performance_impact: this.calculatePerformanceImpact(decision, responseTimeMs),
      lessons_learned: this.extractLessonsLearned(decision, responseTimeMs),
      timestamp: new Date()
    };

    this.auditLogs.set(routingId, auditLog);

    // Check for performance alerts
    await this.checkPerformanceAlerts();

    console.log(`[PerformanceMonitor] Recorded routing decision: ${routingId} (Success: ${decision.success})`);
  }

  /**
   * Records an escalation event
   */
  public async recordEscalation(task: RoutingTask, reasons: string[]): Promise<void> {
    this.escalationCount++;
    this.totalRoutings++;

    // Create escalation audit log
    const escalationLog: RoutingAuditLog = {
      routing_id: `escalation_${Date.now()}`,
      task_id: task.id,
      decision: {
        success: false,
        primary_agent: 'human_review',
        confidence_score: 0,
        routing_rationale: `Escalation: ${reasons.join(', ')}`,
        coordination_required: false,
        estimated_completion_time: 0,
        escalation_required: true,
        decision_timestamp: new Date()
      },
      outcome: {
        success: false,
        completion_time: 0,
        quality_score: 0,
        user_satisfaction: 0.3, // Low satisfaction for escalations
        agent_feedback: 'Task escalated to human review',
        areas_for_improvement: ['Improve domain classification', 'Reduce uncertainty triggers']
      },
      performance_impact: -0.2, // Negative impact for escalations
      lessons_learned: reasons.map(reason => `Learn to handle: ${reason}`),
      timestamp: new Date()
    };

    this.auditLogs.set(escalationLog.routing_id, escalationLog);

    // Check for escalation rate alerts
    await this.checkEscalationRateAlert();

    console.log(`[PerformanceMonitor] Recorded escalation for task: ${task.id}`);
  }

  /**
   * Gets current routing metrics
   */
  public async getRoutingMetrics(timePeriod?: TimePeriod): Promise<RoutingMetrics> {
    const now = new Date();
    const defaultPeriod: TimePeriod = {
      start_date: new Date(now.getTime() - 24 * 60 * 60 * 1000), // Last 24 hours
      end_date: now,
      duration_hours: 24
    };

    const period = timePeriod || defaultPeriod;
    
    // Filter decisions within time period
    const relevantDecisions = Array.from(this.routingDecisions.values())
      .filter(decision => 
        decision.decision_timestamp >= period.start_date && 
        decision.decision_timestamp <= period.end_date
      );

    const totalRoutingsInPeriod = relevantDecisions.length;
    const successfulRoutingsInPeriod = relevantDecisions.filter(d => d.success).length;
    const escalationsInPeriod = relevantDecisions.filter(d => d.escalation_required).length;

    // Calculate domain distribution
    const domainDistribution: Record<string, number> = {};
    const agentUtilization: Record<string, number> = {};

    relevantDecisions.forEach(decision => {
      // Note: In real system, we'd extract domain from task analysis
      const domain = this.inferDomainFromAgent(decision.primary_agent);
      domainDistribution[domain] = (domainDistribution[domain] || 0) + 1;
      
      if (decision.primary_agent) {
        agentUtilization[decision.primary_agent] = 
          (agentUtilization[decision.primary_agent] || 0) + 1;
      }
    });

    // Calculate average confidence score
    const avgConfidenceScore = totalRoutingsInPeriod > 0 ?
      relevantDecisions.reduce((sum, d) => sum + d.confidence_score, 0) / totalRoutingsInPeriod : 0;

    // Calculate average response time from recent logs
    const avgResponseTime = this.calculateAverageResponseTime(period);

    const metrics: RoutingMetrics = {
      total_tasks_routed: totalRoutingsInPeriod,
      successful_routings: successfulRoutingsInPeriod,
      escalations: escalationsInPeriod,
      average_confidence_score: avgConfidenceScore,
      average_response_time: avgResponseTime,
      agent_utilization: agentUtilization,
      domain_distribution: domainDistribution,
      time_period: period
    };

    return metrics;
  }

  /**
   * Analyzes performance trends over time
   */
  public async analyzeTrends(days: number = 7): Promise<TrendAnalysis[]> {
    const analyses: TrendAnalysis[] = [];
    const now = new Date();
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    // Generate daily snapshots for trend analysis
    const dailySnapshots = this.generateDailySnapshots(startDate, now);

    // Analyze routing accuracy trend
    const accuracyData = dailySnapshots.map(s => s.routing_accuracy);
    analyses.push(this.createTrendAnalysis(
      'routing_accuracy',
      { start_date: startDate, end_date: now, duration_hours: days * 24 },
      accuracyData,
      'Routing accuracy represents the percentage of successful task delegations'
    ));

    // Analyze response time trend
    const responseTimeData = dailySnapshots.map(s => s.average_response_time);
    analyses.push(this.createTrendAnalysis(
      'average_response_time',
      { start_date: startDate, end_date: now, duration_hours: days * 24 },
      responseTimeData,
      'Average response time for routing decisions in milliseconds'
    ));

    // Analyze escalation rate trend
    const escalationData = dailySnapshots.map(s => s.escalation_rate);
    analyses.push(this.createTrendAnalysis(
      'escalation_rate',
      { start_date: startDate, end_date: now, duration_hours: days * 24 },
      escalationData,
      'Percentage of tasks requiring human intervention'
    ));

    return analyses;
  }

  /**
   * Generates optimization recommendations based on performance data
   */
  public async generateOptimizationRecommendations(): Promise<string[]> {
    const recommendations: string[] = [];
    const currentMetrics = await this.getRoutingMetrics();

    // Check routing accuracy
    if ((currentMetrics.successful_routings / currentMetrics.total_tasks_routed) < this.targets.routing_accuracy) {
      recommendations.push('Improve domain classification accuracy by refining keyword matching algorithms');
      recommendations.push('Consider adding more training data for task analysis');
    }

    // Check response time
    if (currentMetrics.average_response_time > this.targets.average_response_time) {
      recommendations.push('Optimize task analysis pipeline for faster processing');
      recommendations.push('Consider caching agent capability information');
    }

    // Check escalation rate
    const escalationRate = currentMetrics.escalations / currentMetrics.total_tasks_routed;
    if (escalationRate > this.targets.escalation_rate) {
      recommendations.push('Reduce uncertainty thresholds to improve automatic routing confidence');
      recommendations.push('Expand agent capability definitions for better coverage');
    }

    // Check agent utilization balance
    const utilizationValues = Object.values(currentMetrics.agent_utilization);
    if (utilizationValues.length > 1) {
      const maxUtilization = Math.max(...utilizationValues);
      const minUtilization = Math.min(...utilizationValues);
      if (maxUtilization > minUtilization * 2) {
        recommendations.push('Rebalance task distribution to prevent agent overload');
        recommendations.push('Consider adding more agents for high-demand domains');
      }
    }

    // Domain-specific recommendations
    const sortedDomains = Object.entries(currentMetrics.domain_distribution)
      .sort(([,a], [,b]) => b - a);
    if (sortedDomains.length > 0) {
      const topDomain = sortedDomains[0][0];
      recommendations.push(`Consider specialized optimization for ${topDomain} domain (highest volume)`);
    }

    return recommendations;
  }

  /**
   * Gets active performance alerts
   */
  public getActiveAlerts(): PerformanceAlert[] {
    return Array.from(this.alerts.values()).filter(alert => !alert.resolved);
  }

  /**
   * Gets detailed performance report
   */
  public async getPerformanceReport(days: number = 7): Promise<any> {
    const metrics = await this.getRoutingMetrics();
    const trends = await this.analyzeTrends(days);
    const recommendations = await this.generateOptimizationRecommendations();
    const alerts = this.getActiveAlerts();

    return {
      summary: {
        total_routings: metrics.total_tasks_routed,
        success_rate: metrics.total_tasks_routed > 0 ? 
          metrics.successful_routings / metrics.total_tasks_routed : 0,
        average_response_time: metrics.average_response_time,
        escalation_rate: metrics.total_tasks_routed > 0 ? 
          metrics.escalations / metrics.total_tasks_routed : 0
      },
      current_metrics: metrics,
      trend_analysis: trends,
      optimization_recommendations: recommendations,
      active_alerts: alerts,
      performance_targets: this.targets,
      target_achievement: {
        routing_accuracy: this.calculateTargetAchievement('routing_accuracy', metrics),
        response_time: this.calculateTargetAchievement('response_time', metrics),
        escalation_rate: this.calculateTargetAchievement('escalation_rate', metrics)
      }
    };
  }

  /**
   * Resets performance counters (useful for testing)
   */
  public resetMetrics(): void {
    this.routingDecisions.clear();
    this.auditLogs.clear();
    this.performanceSnapshots = [];
    this.alerts.clear();
    
    this.totalRoutings = 0;
    this.successfulRoutings = 0;
    this.totalResponseTime = 0;
    this.escalationCount = 0;
    this.domainCounts = {};
    this.agentUtilization = {};
    
    this.initializeDomainCounts();
    console.log('[PerformanceMonitor] Metrics reset');
  }

  // Private helper methods

  private initializeDomainCounts(): void {
    Object.values(AgentDomain).forEach(domain => {
      this.domainCounts[domain] = 0;
    });
  }

  private startPeriodicSnapshots(): void {
    // Take performance snapshots every 5 minutes
    setInterval(() => {
      this.takePerformanceSnapshot();
    }, 5 * 60 * 1000);
  }

  private takePerformanceSnapshot(): void {
    const snapshot: PerformanceSnapshot = {
      timestamp: new Date(),
      routing_accuracy: this.totalRoutings > 0 ? this.successfulRoutings / this.totalRoutings : 0,
      average_response_time: this.totalRoutings > 0 ? this.totalResponseTime / this.totalRoutings : 0,
      agent_utilization: { ...this.agentUtilization },
      domain_distribution: { ...this.domainCounts },
      escalation_rate: this.totalRoutings > 0 ? this.escalationCount / this.totalRoutings : 0,
      total_routings: this.totalRoutings
    };

    this.performanceSnapshots.push(snapshot);

    // Keep only last 100 snapshots
    if (this.performanceSnapshots.length > 100) {
      this.performanceSnapshots = this.performanceSnapshots.slice(-100);
    }
  }

  private async checkPerformanceAlerts(): Promise<void> {
    const currentAccuracy = this.totalRoutings > 0 ? this.successfulRoutings / this.totalRoutings : 1;
    const currentResponseTime = this.totalRoutings > 0 ? this.totalResponseTime / this.totalRoutings : 0;
    const currentEscalationRate = this.totalRoutings > 0 ? this.escalationCount / this.totalRoutings : 0;

    // Check routing accuracy alert
    if (currentAccuracy < this.targets.routing_accuracy * 0.9) {
      this.createAlert(
        'routing_accuracy_low',
        'high',
        'routing_accuracy',
        this.targets.routing_accuracy,
        currentAccuracy,
        'Routing accuracy below 90% of target'
      );
    }

    // Check response time alert
    if (currentResponseTime > this.targets.average_response_time * 1.5) {
      this.createAlert(
        'response_time_high',
        'medium',
        'response_time',
        this.targets.average_response_time,
        currentResponseTime,
        'Response time exceeds 150% of target'
      );
    }

    // Check escalation rate alert
    if (currentEscalationRate > this.targets.escalation_rate * 2) {
      this.createAlert(
        'escalation_rate_high',
        'high',
        'escalation_rate',
        this.targets.escalation_rate,
        currentEscalationRate,
        'Escalation rate exceeds 200% of target'
      );
    }
  }

  private async checkEscalationRateAlert(): Promise<void> {
    const currentRate = this.totalRoutings > 0 ? this.escalationCount / this.totalRoutings : 0;
    if (currentRate > this.targets.escalation_rate * 1.5) {
      this.createAlert(
        'escalation_spike',
        'critical',
        'escalation_rate',
        this.targets.escalation_rate,
        currentRate,
        'Sudden spike in escalation rate detected'
      );
    }
  }

  private createAlert(
    alertId: string,
    severity: 'low' | 'medium' | 'high' | 'critical',
    metricName: string,
    threshold: number,
    actualValue: number,
    description: string
  ): void {
    if (!this.alerts.has(alertId)) {
      const alert: PerformanceAlert = {
        alert_id: alertId,
        severity,
        metric_name: metricName,
        threshold_value: threshold,
        actual_value: actualValue,
        description,
        timestamp: new Date(),
        resolved: false
      };

      this.alerts.set(alertId, alert);
      console.warn(`[PerformanceMonitor] ${severity.toUpperCase()} ALERT: ${description}`);
    }
  }

  private estimateUserSatisfaction(decision: RoutingDecision, responseTime: number): number {
    let satisfaction = decision.confidence_score;
    
    // Penalize for slow response times
    if (responseTime > this.targets.average_response_time) {
      satisfaction *= 0.8;
    }
    
    // Penalize for escalations
    if (decision.escalation_required) {
      satisfaction *= 0.5;
    }
    
    return Math.max(0, Math.min(1, satisfaction));
  }

  private generateAgentFeedback(decision: RoutingDecision): string {
    if (decision.escalation_required) {
      return 'Task escalated - agent feedback not available';
    }
    
    if (decision.confidence_score > 0.8) {
      return 'High confidence routing - agent likely to handle effectively';
    } else if (decision.confidence_score > 0.6) {
      return 'Moderate confidence routing - monitor for potential issues';
    } else {
      return 'Low confidence routing - may require additional support';
    }
  }

  private identifyImprovementAreas(decision: RoutingDecision, responseTime: number): string[] {
    const areas: string[] = [];
    
    if (decision.confidence_score < 0.7) {
      areas.push('Improve domain classification accuracy');
    }
    
    if (responseTime > this.targets.average_response_time) {
      areas.push('Optimize response time');
    }
    
    if (decision.escalation_required) {
      areas.push('Reduce escalation triggers');
    }
    
    if (decision.coordination_required) {
      areas.push('Streamline multi-agent coordination');
    }
    
    return areas;
  }

  private calculatePerformanceImpact(decision: RoutingDecision, responseTime: number): number {
    let impact = decision.confidence_score;
    
    // Adjust for response time
    const responseTimeRatio = responseTime / this.targets.average_response_time;
    impact *= Math.max(0.5, 2 - responseTimeRatio);
    
    // Adjust for success
    if (!decision.success) {
      impact *= 0.3;
    }
    
    return impact;
  }

  private extractLessonsLearned(decision: RoutingDecision, responseTime: number): string[] {
    const lessons: string[] = [];
    
    if (decision.success && decision.confidence_score > 0.8) {
      lessons.push(`Successful high-confidence routing to ${decision.primary_agent}`);
    }
    
    if (responseTime < this.targets.average_response_time * 0.5) {
      lessons.push('Fast routing achieved - analyze patterns for optimization');
    }
    
    if (decision.coordination_required) {
      lessons.push('Multi-agent coordination required - evaluate efficiency');
    }
    
    return lessons;
  }

  private calculateAverageResponseTime(period: TimePeriod): number {
    // Simplified calculation - in real system would track actual response times
    return this.totalRoutings > 0 ? this.totalResponseTime / this.totalRoutings : 0;
  }

  private inferDomainFromAgent(agentId: string): string {
    // Simple domain inference from agent ID
    if (agentId.includes('ceo') || agentId.includes('strategic')) return AgentDomain.STRATEGIC;
    if (agentId.includes('cfo') || agentId.includes('financial')) return AgentDomain.FINANCIAL;
    if (agentId.includes('cto') || agentId.includes('technical')) return AgentDomain.TECHNICAL;
    if (agentId.includes('cmo') || agentId.includes('marketing')) return AgentDomain.MARKETING;
    if (agentId.includes('cco') || agentId.includes('community')) return AgentDomain.COMMUNITY;
    return AgentDomain.OPERATIONS;
  }

  private generateDailySnapshots(startDate: Date, endDate: Date): PerformanceSnapshot[] {
    // Generate mock daily snapshots for trend analysis
    const snapshots: PerformanceSnapshot[] = [];
    const dayMs = 24 * 60 * 60 * 1000;
    
    for (let date = new Date(startDate); date <= endDate; date = new Date(date.getTime() + dayMs)) {
      snapshots.push({
        timestamp: new Date(date),
        routing_accuracy: 0.85 + Math.random() * 0.1,
        average_response_time: 400 + Math.random() * 200,
        agent_utilization: { ...this.agentUtilization },
        domain_distribution: { ...this.domainCounts },
        escalation_rate: 0.03 + Math.random() * 0.02,
        total_routings: Math.floor(10 + Math.random() * 50)
      });
    }
    
    return snapshots;
  }

  private createTrendAnalysis(
    metricName: string,
    timePeriod: TimePeriod,
    dataPoints: number[],
    description: string
  ): TrendAnalysis {
    if (dataPoints.length < 2) {
      return {
        metric_name: metricName,
        time_period: timePeriod,
        trend_direction: 'stable',
        trend_magnitude: 0,
        data_points: dataPoints,
        analysis: 'Insufficient data for trend analysis'
      };
    }

    // Simple linear trend calculation
    const firstValue = dataPoints[0];
    const lastValue = dataPoints[dataPoints.length - 1];
    const change = lastValue - firstValue;
    const changePercent = firstValue !== 0 ? (change / firstValue) * 100 : 0;

    let direction: 'improving' | 'declining' | 'stable';
    if (Math.abs(changePercent) < 5) {
      direction = 'stable';
    } else if (metricName.includes('accuracy') || metricName.includes('success')) {
      direction = change > 0 ? 'improving' : 'declining';
    } else {
      // For metrics where lower is better (response time, escalation rate)
      direction = change < 0 ? 'improving' : 'declining';
    }

    return {
      metric_name: metricName,
      time_period: timePeriod,
      trend_direction: direction,
      trend_magnitude: Math.abs(changePercent),
      data_points: dataPoints,
      analysis: `${description}. Trend: ${direction} by ${Math.abs(changePercent).toFixed(1)}%`
    };
  }

  private calculateTargetAchievement(targetType: string, metrics: RoutingMetrics): number {
    switch (targetType) {
      case 'routing_accuracy':
        const accuracy = metrics.total_tasks_routed > 0 ? 
          metrics.successful_routings / metrics.total_tasks_routed : 0;
        return accuracy / this.targets.routing_accuracy;
      
      case 'response_time':
        if (metrics.average_response_time === 0) return 1;
        return Math.max(0, this.targets.average_response_time / metrics.average_response_time);
      
      case 'escalation_rate':
        const escalationRate = metrics.total_tasks_routed > 0 ? 
          metrics.escalations / metrics.total_tasks_routed : 0;
        if (escalationRate === 0) return 1;
        return Math.max(0, this.targets.escalation_rate / escalationRate);
      
      default:
        return 0;
    }
  }
}