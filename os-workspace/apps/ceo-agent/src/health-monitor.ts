/**
 * Health Monitor for CEO Agent (Mimi)
 * 
 * Provides comprehensive health checking, performance tracking,
 * and monitoring capabilities for the CEO Agent and its delegated tasks.
 */

import { createLogger, Logger } from 'winston';
import type {
  HealthCheckResult,
  ComponentHealth,
  HealthIssue,
  PerformanceMetrics,
  CEOAgentDefinition,
  PerformanceTargets,
  AlertThreshold,
  MonitoringSettings
} from './types.js';

export class HealthMonitor {
  private logger: Logger;
  private agentDefinition: CEOAgentDefinition;
  private performanceTargets: PerformanceTargets;
  private monitoringSettings: MonitoringSettings;
  private performanceHistory: PerformanceMetrics[] = [];
  private alertThresholds: AlertThreshold[];
  private lastHealthCheck: Date = new Date();

  constructor(agentDefinition: CEOAgentDefinition) {
    this.agentDefinition = agentDefinition;
    this.performanceTargets = agentDefinition.performance_targets;
    
    this.logger = createLogger({
      level: 'info',
      format: require('winston').format.json(),
      transports: [
        new (require('winston').transports.Console)({
          format: require('winston').format.simple()
        })
      ]
    });

    // Initialize monitoring settings
    this.monitoringSettings = {
      health_check_interval: 30000, // 30 seconds
      performance_logging: true,
      metric_collection_interval: 60000, // 1 minute
      alert_thresholds: [
        {
          metric: 'response_time_ms',
          threshold: this.performanceTargets.response_time_ms,
          operator: 'greater_than',
          severity: 'medium',
          action: 'log_warning'
        },
        {
          metric: 'delegation_accuracy_rate',
          threshold: this.performanceTargets.delegation_accuracy_rate,
          operator: 'less_than',
          severity: 'high',
          action: 'escalate_alert'
        },
        {
          metric: 'escalation_rate',
          threshold: this.performanceTargets.escalation_rate,
          operator: 'greater_than',
          severity: 'medium',
          action: 'review_delegation_rules'
        }
      ]
    };

    this.alertThresholds = this.monitoringSettings.alert_thresholds;

    this.logger.info('💚 Health Monitor initialized for CEO Agent (Mimi)');
    this.startPeriodicHealthChecks();
  }

  /**
   * Perform comprehensive health check of the CEO Agent
   */
  public async performHealthCheck(): Promise<HealthCheckResult> {
    const checkStartTime = Date.now();
    
    try {
      this.logger.info('🔍 Performing health check for CEO Agent (Mimi)');

      // Check all system components
      const componentChecks = await Promise.all([
        this.checkOrchestrator(),
        this.checkDelegator(),
        this.checkAgentRegistry(),
        this.checkPerformanceMetrics(),
        this.checkResourceUtilization()
      ]);

      // Analyze component health
      const components = componentChecks.map(check => check.component);
      const overallScore = this.calculateOverallHealthScore(components);
      const status = this.determineHealthStatus(overallScore);
      
      // Identify issues and recommendations
      const issues = this.identifyHealthIssues(components);
      const recommendations = this.generateRecommendations(issues, components);

      const healthResult: HealthCheckResult = {
        agent_id: 'ceo_mimi',
        status: status,
        timestamp: new Date(),
        components: components,
        overall_score: overallScore,
        issues: issues,
        recommendations: recommendations
      };

      this.lastHealthCheck = new Date();
      this.logger.info(`💚 Health check completed with status: ${status} (score: ${overallScore})`);

      // Process alerts if needed
      await this.processHealthAlerts(healthResult);

      return healthResult;
      
    } catch (error) {
      this.logger.error('❌ Health check failed:', error);
      
      return {
        agent_id: 'ceo_mimi',
        status: 'unhealthy',
        timestamp: new Date(),
        components: [],
        overall_score: 0,
        issues: [{
          severity: 'critical',
          category: 'system_failure',
          description: 'Health check system failure',
          impact: 'Unable to monitor agent health',
          suggested_action: 'Restart health monitoring system'
        }],
        recommendations: ['Investigate health monitoring system failure', 'Restart agent components']
      };
    }
  }

  /**
   * Check Strategic Orchestrator health
   */
  private async checkOrchestrator(): Promise<{ component: ComponentHealth; details: any }> {
    const startTime = Date.now();
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    let errorCount = 0;

    try {
      // Test orchestrator functionality
      const testResult = await this.testOrchestrator();
      
      if (!testResult.success) {
        status = 'degraded';
        errorCount++;
      }
      
      if (testResult.responseTime > this.performanceTargets.response_time_ms) {
        status = 'degraded';
      }

    } catch (error) {
      status = 'unhealthy';
      errorCount++;
      this.logger.error('Orchestrator health check failed:', error);
    }

    const responseTime = Date.now() - startTime;

    return {
      component: {
        component: 'strategic_orchestrator',
        status: status,
        response_time: responseTime,
        last_check: new Date(),
        error_count: errorCount
      },
      details: { tested: true }
    };
  }

  /**
   * Check Task Delegator health
   */
  private async checkDelegator(): Promise<{ component: ComponentHealth; details: any }> {
    const startTime = Date.now();
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    let errorCount = 0;

    try {
      // Test delegator functionality
      const testResult = await this.testDelegator();
      
      if (!testResult.success) {
        status = 'degraded';
        errorCount++;
      }

    } catch (error) {
      status = 'unhealthy';
      errorCount++;
      this.logger.error('Delegator health check failed:', error);
    }

    const responseTime = Date.now() - startTime;

    return {
      component: {
        component: 'task_delegator',
        status: status,
        response_time: responseTime,
        last_check: new Date(),
        error_count: errorCount
      },
      details: { tested: true }
    };
  }

  /**
   * Check Agent Registry connectivity
   */
  private async checkAgentRegistry(): Promise<{ component: ComponentHealth; details: any }> {
    const startTime = Date.now();
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    let errorCount = 0;

    try {
      // Test registry connectivity (mock for now)
      const registryConnected = await this.testRegistryConnection();
      
      if (!registryConnected) {
        status = 'degraded';
        errorCount++;
      }

    } catch (error) {
      status = 'unhealthy';
      errorCount++;
      this.logger.error('Agent registry health check failed:', error);
    }

    const responseTime = Date.now() - startTime;

    return {
      component: {
        component: 'agent_registry',
        status: status,
        response_time: responseTime,
        last_check: new Date(),
        error_count: errorCount
      },
      details: { connected: status !== 'unhealthy' }
    };
  }

  /**
   * Check Performance Metrics
   */
  private async checkPerformanceMetrics(): Promise<{ component: ComponentHealth; details: any }> {
    const startTime = Date.now();
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    let errorCount = 0;

    try {
      const currentMetrics = this.getCurrentPerformanceMetrics();
      
      // Check against performance targets
      if (currentMetrics.task_processing_time > this.performanceTargets.response_time_ms) {
        status = 'degraded';
      }
      
      if (currentMetrics.delegation_success_rate < this.performanceTargets.delegation_accuracy_rate) {
        status = 'degraded';
      }
      
      if (currentMetrics.escalation_frequency > this.performanceTargets.escalation_rate) {
        status = 'degraded';
      }

    } catch (error) {
      status = 'unhealthy';
      errorCount++;
      this.logger.error('Performance metrics check failed:', error);
    }

    const responseTime = Date.now() - startTime;

    return {
      component: {
        component: 'performance_metrics',
        status: status,
        response_time: responseTime,
        last_check: new Date(),
        error_count: errorCount
      },
      details: { metricsCollected: true }
    };
  }

  /**
   * Check Resource Utilization
   */
  private async checkResourceUtilization(): Promise<{ component: ComponentHealth; details: any }> {
    const startTime = Date.now();
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
    let errorCount = 0;

    try {
      const resourceUsage = await this.getResourceUsage();
      
      // Check resource thresholds
      if (resourceUsage.memoryUsage > 0.8) {
        status = 'degraded';
      }
      
      if (resourceUsage.cpuUsage > 0.9) {
        status = 'degraded';
      }

    } catch (error) {
      status = 'unhealthy';
      errorCount++;
      this.logger.error('Resource utilization check failed:', error);
    }

    const responseTime = Date.now() - startTime;

    return {
      component: {
        component: 'resource_utilization',
        status: status,
        response_time: responseTime,
        last_check: new Date(),
        error_count: errorCount
      },
      details: { checked: true }
    };
  }

  /**
   * Test orchestrator functionality
   */
  private async testOrchestrator(): Promise<{ success: boolean; responseTime: number }> {
    const startTime = Date.now();
    
    try {
      // Mock test for orchestrator validation
      await new Promise(resolve => setTimeout(resolve, 10)); // Simulate work
      
      return {
        success: true,
        responseTime: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        responseTime: Date.now() - startTime
      };
    }
  }

  /**
   * Test delegator functionality
   */
  private async testDelegator(): Promise<{ success: boolean; responseTime: number }> {
    const startTime = Date.now();
    
    try {
      // Mock test for delegator validation
      await new Promise(resolve => setTimeout(resolve, 15)); // Simulate work
      
      return {
        success: true,
        responseTime: Date.now() - startTime
      };
    } catch (error) {
      return {
        success: false,
        responseTime: Date.now() - startTime
      };
    }
  }

  /**
   * Test registry connection
   */
  private async testRegistryConnection(): Promise<boolean> {
    try {
      // Mock registry connection test
      await new Promise(resolve => setTimeout(resolve, 5));
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get current performance metrics
   */
  private getCurrentPerformanceMetrics(): PerformanceMetrics {
    // Mock current metrics (in production, these would come from actual monitoring)
    return {
      task_processing_time: 350,
      delegation_success_rate: 0.94,
      agent_availability_rates: {
        'CFO Cash': 0.95,
        'CTO Alex': 0.87,
        'CMO Anova': 0.92,
        'CCO Sage': 0.89
      },
      escalation_frequency: 0.03,
      decision_confidence_scores: [0.85, 0.92, 0.78, 0.91, 0.88],
      cross_domain_coordination_efficiency: 0.82,
      strategic_alignment_score: 0.89
    };
  }

  /**
   * Get resource usage information
   */
  private async getResourceUsage(): Promise<{
    memoryUsage: number;
    cpuUsage: number;
    networkLatency: number;
  }> {
    // Mock resource usage (in production, would use actual system monitoring)
    return {
      memoryUsage: 0.65,
      cpuUsage: 0.45,
      networkLatency: 25
    };
  }

  /**
   * Calculate overall health score
   */
  private calculateOverallHealthScore(components: ComponentHealth[]): number {
    if (components.length === 0) return 0;
    
    const scores = components.map(component => {
      switch (component.status) {
        case 'healthy': return 1.0;
        case 'degraded': return 0.6;
        case 'unhealthy': return 0.2;
        default: return 0.5;
      }
    });
    
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }

  /**
   * Determine overall health status
   */
  private determineHealthStatus(score: number): 'healthy' | 'degraded' | 'unhealthy' {
    if (score >= 0.8) return 'healthy';
    if (score >= 0.5) return 'degraded';
    return 'unhealthy';
  }

  /**
   * Identify health issues
   */
  private identifyHealthIssues(components: ComponentHealth[]): HealthIssue[] {
    const issues: HealthIssue[] = [];
    
    components.forEach(component => {
      if (component.status === 'unhealthy') {
        issues.push({
          severity: 'critical',
          category: 'component_failure',
          description: `${component.component} is unhealthy`,
          impact: 'Component functionality compromised',
          suggested_action: `Restart ${component.component} service`
        });
      } else if (component.status === 'degraded') {
        issues.push({
          severity: 'medium',
          category: 'performance_degradation',
          description: `${component.component} performance degraded`,
          impact: 'Reduced system performance',
          suggested_action: `Investigate ${component.component} performance`
        });
      }
      
      if (component.response_time > this.performanceTargets.response_time_ms) {
        issues.push({
          severity: 'medium',
          category: 'response_time',
          description: `${component.component} response time exceeded target`,
          impact: 'Slower task processing',
          suggested_action: 'Optimize component performance'
        });
      }
    });
    
    return issues;
  }

  /**
   * Generate recommendations based on health analysis
   */
  private generateRecommendations(issues: HealthIssue[], components: ComponentHealth[]): string[] {
    const recommendations: string[] = [];
    
    // Critical issues first
    const criticalIssues = issues.filter(issue => issue.severity === 'critical');
    if (criticalIssues.length > 0) {
      recommendations.push('Address critical system failures immediately');
      recommendations.push('Consider failover to backup systems');
    }
    
    // Performance issues
    const performanceIssues = issues.filter(issue => issue.category === 'performance_degradation');
    if (performanceIssues.length > 0) {
      recommendations.push('Review and optimize system performance');
      recommendations.push('Consider scaling resources if needed');
    }
    
    // Response time issues
    const responseTimeIssues = issues.filter(issue => issue.category === 'response_time');
    if (responseTimeIssues.length > 0) {
      recommendations.push('Optimize slow components');
      recommendations.push('Review delegation algorithms for efficiency');
    }
    
    // General recommendations
    if (components.every(c => c.status === 'healthy')) {
      recommendations.push('System operating normally');
      recommendations.push('Continue monitoring for optimal performance');
    }
    
    return recommendations;
  }

  /**
   * Process health alerts based on thresholds
   */
  private async processHealthAlerts(healthResult: HealthCheckResult): Promise<void> {
    const currentMetrics = this.getCurrentPerformanceMetrics();
    
    this.alertThresholds.forEach(threshold => {
      const metricValue = this.getMetricValue(currentMetrics, threshold.metric);
      const shouldAlert = this.shouldTriggerAlert(metricValue, threshold);
      
      if (shouldAlert) {
        this.triggerAlert(threshold, metricValue, healthResult);
      }
    });
  }

  /**
   * Get metric value by name
   */
  private getMetricValue(metrics: PerformanceMetrics, metricName: string): number {
    switch (metricName) {
      case 'response_time_ms':
        return metrics.task_processing_time;
      case 'delegation_accuracy_rate':
        return metrics.delegation_success_rate;
      case 'escalation_rate':
        return metrics.escalation_frequency;
      default:
        return 0;
    }
  }

  /**
   * Check if alert should be triggered
   */
  private shouldTriggerAlert(value: number, threshold: AlertThreshold): boolean {
    switch (threshold.operator) {
      case 'greater_than':
        return value > threshold.threshold;
      case 'less_than':
        return value < threshold.threshold;
      case 'equals':
        return value === threshold.threshold;
      default:
        return false;
    }
  }

  /**
   * Trigger alert
   */
  private triggerAlert(threshold: AlertThreshold, value: number, healthResult: HealthCheckResult): void {
    const alertMessage = `Alert: ${threshold.metric} = ${value} (threshold: ${threshold.threshold})`;
    
    switch (threshold.severity) {
      case 'critical':
        this.logger.error(`🚨 CRITICAL: ${alertMessage}`);
        break;
      case 'high':
        this.logger.error(`⚠️ HIGH: ${alertMessage}`);
        break;
      case 'medium':
        this.logger.warn(`⚠️ MEDIUM: ${alertMessage}`);
        break;
      case 'low':
        this.logger.info(`ℹ️ LOW: ${alertMessage}`);
        break;
    }
    
    // Execute alert action
    this.executeAlertAction(threshold.action, threshold, value);
  }

  /**
   * Execute alert action
   */
  private executeAlertAction(action: string, threshold: AlertThreshold, value: number): void {
    switch (action) {
      case 'log_warning':
        this.logger.warn(`Alert action: Logging warning for ${threshold.metric}`);
        break;
      case 'escalate_alert':
        this.logger.error(`Alert action: Escalating alert for ${threshold.metric}`);
        break;
      case 'review_delegation_rules':
        this.logger.info(`Alert action: Review delegation rules triggered for ${threshold.metric}`);
        break;
      default:
        this.logger.info(`Alert action: ${action} for ${threshold.metric}`);
        break;
    }
  }

  /**
   * Start periodic health checks
   */
  private startPeriodicHealthChecks(): void {
    setInterval(async () => {
      try {
        await this.performHealthCheck();
      } catch (error) {
        this.logger.error('Periodic health check failed:', error);
      }
    }, this.monitoringSettings.health_check_interval);
    
    this.logger.info(`🔄 Periodic health checks started (interval: ${this.monitoringSettings.health_check_interval}ms)`);
  }

  /**
   * Get health status summary
   */
  public getHealthSummary(): {
    status: string;
    lastCheck: Date;
    uptime: number;
    issueCount: number;
  } {
    return {
      status: 'operational', // Would be determined from latest health check
      lastCheck: this.lastHealthCheck,
      uptime: Date.now() - this.lastHealthCheck.getTime(),
      issueCount: 0 // Would be from latest health check
    };
  }

  /**
   * Validate health monitor functionality
   */
  public async validate(): Promise<boolean> {
    try {
      const healthResult = await this.performHealthCheck();
      return healthResult.overall_score > 0 && healthResult.status !== 'unhealthy';
    } catch (error) {
      this.logger.error('Health monitor validation failed:', error);
      return false;
    }
  }
}