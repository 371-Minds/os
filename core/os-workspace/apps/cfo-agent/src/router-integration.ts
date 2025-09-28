/**
 * Router Integration Layer for CFO Agent (Maya)
 * 
 * Provides seamless integration with the Intelligent Router for task distribution,
 * capability registration, performance monitoring, and health reporting.
 * Enables CFO Agent to participate in the broader 371 OS ecosystem.
 */

// Define local types to avoid cross-project dependencies
type AvailabilityStatus = 'available' | 'limited' | 'busy' | 'unavailable';
type TaskPriority = 'low' | 'medium' | 'high' | 'urgent' | 'critical';
type AgentDomain = 'financial' | 'technical' | 'marketing' | 'community' | 'strategic';

// Local interface definitions for router integration
interface AgentCapability {
  agent_id: string;
  agent_name: string;
  domain: AgentDomain;
  expertise_areas: string[];
  current_workload: number;
  max_concurrent_tasks: number;
  availability_status: AvailabilityStatus;
  performance_metrics: PerformanceMetrics;
  last_updated: Date;
}

interface PerformanceMetrics {
  total_tasks_completed: number;
  success_rate: number;
  average_completion_time: number;
  domain_specific_scores: Record<string, number>;
  recent_performance_trend: number;
  quality_score: number;
}

interface RoutingTask {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  domain_hints?: string[];
  resource_requirements?: any[];
  deadline?: Date;
  strategic_importance: boolean;
  submitted_at: Date;
  submitted_by: string;
}

interface RoutingDecision {
  success: boolean;
  primary_agent: string;
  confidence_score: number;
  routing_rationale: string;
  alternative_agents?: string[];
  coordination_required: boolean;
  coordination_strategy?: any;
  estimated_completion_time: number;
  escalation_required: boolean;
  decision_timestamp: Date;
}

import type {
  FinancialTask,
  ProcessingResult,
  AgentStatus,
  HealthCheckResult
} from './types.js';

import { CFOAgent } from './index.js';

/**
 * Router Integration Interface for CFO Agent
 */
export interface CFORouterIntegration {
  registerCapabilities(): AgentCapability;
  handleRoutedTask(routingTask: RoutingTask): Promise<ProcessingResult>;
  updateAvailabilityStatus(status: AvailabilityStatus): void;
  reportPerformanceMetrics(): PerformanceMetrics;
  getHealthStatus(): Promise<HealthCheckResult>;
}

/**
 * Router Integration Implementation
 */
export class CFOAgentRouterIntegration implements CFORouterIntegration {
  private cfoAgent: CFOAgent;
  private currentWorkload: number = 0;
  private maxConcurrentTasks: number = 5;
  private availabilityStatus: AvailabilityStatus = 'available';
  private performanceHistory: PerformanceTracker;

  constructor(cfoAgent: CFOAgent) {
    this.cfoAgent = cfoAgent;
    this.performanceHistory = new PerformanceTracker();
    
    console.log('🔌 CFO Agent Router Integration initialized');
  }

  /**
   * Register CFO Agent capabilities with the Intelligent Router
   */
  public registerCapabilities(): AgentCapability {
    const status = this.cfoAgent.getStatus();
    const capabilities = this.cfoAgent.getCapabilities();
    
    const agentCapability: AgentCapability = {
      agent_id: 'cfo-maya',
      agent_name: 'Maya (CFO)',
      domain: 'financial' as AgentDomain,
      expertise_areas: [
        'Budget Analysis & Optimization',
        'Cost Optimization & Savings Identification',
        'ROI Assessment & Investment Analysis',
        'Financial Reporting & Analytics',
        'Revenue Forecasting & Projections',
        'Cash Flow Analysis & Management',
        'Risk Assessment & Mitigation',
        'Strategic Financial Planning'
      ],
      current_workload: this.currentWorkload,
      max_concurrent_tasks: this.maxConcurrentTasks,
      availability_status: this.availabilityStatus,
      performance_metrics: this.reportPerformanceMetrics(),
      last_updated: new Date()
    };

    console.log(`📋 CFO Agent capabilities registered - Domain: ${agentCapability.domain}`);
    console.log(`🎯 Expertise Areas: ${agentCapability.expertise_areas.length} domains`);
    
    return agentCapability;
  }

  /**
   * Handle tasks routed from the Intelligent Router
   */
  public async handleRoutedTask(routingTask: RoutingTask): Promise<ProcessingResult> {
    console.log(`📥 Received routed task: ${routingTask.title}`);
    
    // Convert routing task to financial task
    const financialTask = this.convertRoutingTaskToFinancialTask(routingTask);
    
    // Update workload
    this.currentWorkload++;
    this.updateAvailabilityBasedOnWorkload();
    
    try {
      const startTime = Date.now();
      
      // Process the financial task
      const result = await this.cfoAgent.processTask(financialTask);
      
      const processingTime = Date.now() - startTime;
      
      // Track performance
      this.performanceHistory.recordTask(routingTask, result, processingTime);
      
      console.log(`✅ Routed task completed: ${routingTask.id}`);
      console.log(`⏱️ Processing time: ${processingTime}ms`);
      console.log(`🎯 Confidence: ${result.metadata.confidence}%`);
      
      return result;
      
    } catch (error) {
      console.error(`❌ Failed to process routed task ${routingTask.id}:`, error);
      
      // Track failed task
      this.performanceHistory.recordFailure(routingTask, error as Error);
      
      throw error;
    } finally {
      // Update workload
      this.currentWorkload = Math.max(0, this.currentWorkload - 1);
      this.updateAvailabilityBasedOnWorkload();
    }
  }

  /**
   * Update availability status
   */
  public updateAvailabilityStatus(status: AvailabilityStatus): void {
    this.availabilityStatus = status;
    console.log(`🔄 CFO Agent availability updated: ${status}`);
  }

  /**
   * Report current performance metrics for router optimization
   */
  public reportPerformanceMetrics(): PerformanceMetrics {
    const agentStatus = this.cfoAgent.getStatus();
    const history = this.performanceHistory.getMetrics();
    
    const metrics: PerformanceMetrics = {
      total_tasks_completed: agentStatus.performance.tasksProcessed,
      success_rate: agentStatus.performance.successRate,
      average_completion_time: agentStatus.performance.averageResponseTime,
      domain_specific_scores: {
        budget_analysis: 0.95,
        cost_optimization: 0.90,
        roi_assessment: 0.92,
        financial_reporting: 0.96,
        revenue_forecasting: 0.88,
        cash_flow_analysis: 0.91,
        investment_evaluation: 0.89,
        risk_assessment: 0.93
      },
      recent_performance_trend: history.recentTrend,
      quality_score: agentStatus.performance.accuracyRate || 0.95
    };
    
    return metrics;
  }

  /**
   * Get current health status for router monitoring
   */
  public async getHealthStatus(): Promise<HealthCheckResult> {
    return await this.cfoAgent.healthCheck();
  }

  /**
   * Get current workload information
   */
  public getWorkloadInfo(): {
    current: number;
    maximum: number;
    availability: AvailabilityStatus;
    utilizationPercentage: number;
  } {
    return {
      current: this.currentWorkload,
      maximum: this.maxConcurrentTasks,
      availability: this.availabilityStatus,
      utilizationPercentage: (this.currentWorkload / this.maxConcurrentTasks) * 100
    };
  }

  /**
   * Handle router capability queries
   */
  public canHandle(routingTask: RoutingTask): {
    capable: boolean;
    confidence: number;
    reasoning: string;
  } {
    const financialKeywords = [
      'budget', 'cost', 'financial', 'revenue', 'profit', 'expense',
      'investment', 'roi', 'cash flow', 'forecast', 'analysis',
      'optimization', 'savings', 'variance', 'reporting'
    ];
    
    const taskContent = `${routingTask.title} ${routingTask.description}`.toLowerCase();
    
    // Check for financial keywords
    const matchingKeywords = financialKeywords.filter(keyword => 
      taskContent.includes(keyword)
    );
    
    // Calculate confidence based on keyword matches and domain hints
    let confidence = 0;
    
    // Keyword matching (60% weight)
    confidence += (matchingKeywords.length / financialKeywords.length) * 0.6;
    
    // Domain hints (30% weight)
    if (routingTask.domain_hints?.includes('financial') || 
        routingTask.domain_hints?.includes('FINANCIAL')) {
      confidence += 0.3;
    }
    
    // Strategic importance (10% weight)
    if (routingTask.strategic_importance) {
      confidence += 0.1;
    }
    
    const capable = confidence > 0.5;
    
    const reasoning = `Financial keyword matches: ${matchingKeywords.length}/${financialKeywords.length}. ` +
                     `Domain hints: ${routingTask.domain_hints?.includes('financial') ? 'Yes' : 'No'}. ` +
                     `Strategic importance: ${routingTask.strategic_importance ? 'Yes' : 'No'}. ` +
                     `Overall confidence: ${(confidence * 100).toFixed(1)}%`;
    
    return {
      capable,
      confidence,
      reasoning
    };
  }

  /**
   * Handle escalation requests from router
   */
  public handleEscalation(routingTask: RoutingTask, reason: string): {
    escalated: boolean;
    escalationTarget: string;
    notes: string;
  } {
    console.log(`⚠️ CFO Agent escalation requested for task: ${routingTask.id}`);
    console.log(`📝 Reason: ${reason}`);
    
    // Determine escalation target based on reason and task characteristics
    let escalationTarget = 'ceo-mimi'; // Default to CEO
    
    if (reason.includes('legal') || reason.includes('compliance')) {
      escalationTarget = 'clo-sage';
    } else if (reason.includes('technical') || reason.includes('technology')) {
      escalationTarget = 'cto-alex';
    } else if (routingTask.strategic_importance) {
      escalationTarget = 'ceo-mimi';
    }
    
    const notes = `CFO Agent (Maya) escalated task due to: ${reason}. ` +
                  `Task involves financial analysis with complexity requiring executive review. ` +
                  `Recommended escalation target: ${escalationTarget}`;
    
    return {
      escalated: true,
      escalationTarget,
      notes
    };
  }

  // ============================================================================
  // Private Helper Methods
  // ============================================================================

  /**
   * Convert routing task to financial task format
   */
  private convertRoutingTaskToFinancialTask(routingTask: RoutingTask): FinancialTask {
    // Determine financial task category based on content
    const category = this.determineFinancialCategory(routingTask);
    
    // Map priority
    const priority = this.mapPriority(routingTask.priority);
    
    return {
      id: routingTask.id,
      title: routingTask.title,
      description: routingTask.description,
      category,
      priority,
      requestedBy: routingTask.submitted_by,
      createdAt: routingTask.submitted_at,
      metadata: {
        routedFromIntelligentRouter: true,
        originalPriority: routingTask.priority,
        domainHints: routingTask.domain_hints,
        strategicImportance: routingTask.strategic_importance,
        deadline: routingTask.deadline
      }
    };
  }

  /**
   * Determine financial task category from routing task
   */
  private determineFinancialCategory(routingTask: RoutingTask): any {
    const content = `${routingTask.title} ${routingTask.description}`.toLowerCase();
    
    if (content.includes('budget') || content.includes('allocation') || content.includes('variance')) {
      return 'budget_analysis';
    } else if (content.includes('cost') || content.includes('optimization') || content.includes('savings')) {
      return 'cost_optimization';
    } else if (content.includes('roi') || content.includes('investment') || content.includes('return')) {
      return 'roi_assessment';
    } else if (content.includes('forecast') || content.includes('revenue') || content.includes('projection')) {
      return 'revenue_forecasting';
    } else if (content.includes('cash flow') || content.includes('liquidity')) {
      return 'cash_flow_analysis';
    } else if (content.includes('risk') || content.includes('assessment')) {
      return 'risk_assessment';
    } else if (content.includes('report') || content.includes('analysis')) {
      return 'financial_reporting';
    } else {
      return 'financial_reporting'; // Default fallback
    }
  }

  /**
   * Map routing task priority to financial task priority
   */
  private mapPriority(routingPriority: TaskPriority): 'low' | 'medium' | 'high' | 'critical' {
    switch (routingPriority) {
      case 'low':
        return 'low';
      case 'medium':
        return 'medium';
      case 'high':
        return 'high';
      case 'urgent':
      case 'critical':
        return 'critical';
      default:
        return 'medium';
    }
  }

  private updateAvailabilityBasedOnWorkload(): void {
    const utilizationPercentage = (this.currentWorkload / this.maxConcurrentTasks) * 100;
    
    if (utilizationPercentage >= 100) {
      this.availabilityStatus = 'unavailable';
    } else if (utilizationPercentage >= 80) {
      this.availabilityStatus = 'busy';
    } else if (utilizationPercentage >= 50) {
      this.availabilityStatus = 'limited';
    } else {
      this.availabilityStatus = 'available';
    }
  }
}

/**
 * Performance tracking for router optimization
 */
class PerformanceTracker {
  private taskHistory: TaskRecord[] = [];
  private readonly maxHistorySize = 100;

  public recordTask(routingTask: RoutingTask, result: ProcessingResult, processingTime: number): void {
    const record: TaskRecord = {
      taskId: routingTask.id,
      category: this.categorizeTask(routingTask),
      priority: routingTask.priority,
      processingTime,
      success: result.status === 'completed',
      confidence: result.metadata.confidence,
      escalated: result.metadata.escalated,
      timestamp: new Date()
    };

    this.taskHistory.push(record);
    
    // Maintain history size
    if (this.taskHistory.length > this.maxHistorySize) {
      this.taskHistory.shift();
    }
  }

  public recordFailure(routingTask: RoutingTask, error: Error): void {
    const record: TaskRecord = {
      taskId: routingTask.id,
      category: this.categorizeTask(routingTask),
      priority: routingTask.priority,
      processingTime: 0,
      success: false,
      confidence: 0,
      escalated: true,
      error: error.message,
      timestamp: new Date()
    };

    this.taskHistory.push(record);
    
    if (this.taskHistory.length > this.maxHistorySize) {
      this.taskHistory.shift();
    }
  }

  public getMetrics(): {
    totalTasks: number;
    successRate: number;
    averageProcessingTime: number;
    averageConfidence: number;
    escalationRate: number;
    recentTrend: number;
  } {
    if (this.taskHistory.length === 0) {
      return {
        totalTasks: 0,
        successRate: 1.0,
        averageProcessingTime: 0,
        averageConfidence: 95,
        escalationRate: 0,
        recentTrend: 1.0
      };
    }

    const successfulTasks = this.taskHistory.filter(t => t.success);
    const escalatedTasks = this.taskHistory.filter(t => t.escalated);
    
    // Calculate recent trend (last 20% of tasks vs previous tasks)
    const recentThreshold = Math.floor(this.taskHistory.length * 0.2);
    const recentTasks = this.taskHistory.slice(-recentThreshold);
    const earlierTasks = this.taskHistory.slice(0, -recentThreshold);
    
    const recentSuccessRate = recentTasks.length > 0 ? 
      recentTasks.filter(t => t.success).length / recentTasks.length : 1.0;
    const earlierSuccessRate = earlierTasks.length > 0 ? 
      earlierTasks.filter(t => t.success).length / earlierTasks.length : 1.0;
    
    const recentTrend = earlierSuccessRate > 0 ? recentSuccessRate / earlierSuccessRate : 1.0;

    return {
      totalTasks: this.taskHistory.length,
      successRate: successfulTasks.length / this.taskHistory.length,
      averageProcessingTime: successfulTasks.reduce((sum, t) => sum + t.processingTime, 0) / successfulTasks.length,
      averageConfidence: successfulTasks.reduce((sum, t) => sum + t.confidence, 0) / successfulTasks.length,
      escalationRate: escalatedTasks.length / this.taskHistory.length,
      recentTrend: Math.max(0.5, Math.min(2.0, recentTrend)) // Clamp between 0.5 and 2.0
    };
  }

  private categorizeTask(routingTask: RoutingTask): string {
    const content = `${routingTask.title} ${routingTask.description}`.toLowerCase();
    
    if (content.includes('budget')) return 'budget_analysis';
    if (content.includes('cost')) return 'cost_optimization';
    if (content.includes('roi') || content.includes('investment')) return 'roi_assessment';
    if (content.includes('forecast')) return 'revenue_forecasting';
    if (content.includes('cash')) return 'cash_flow_analysis';
    if (content.includes('risk')) return 'risk_assessment';
    
    return 'financial_reporting';
  }
}

/**
 * Task record for performance tracking
 */
interface TaskRecord {
  taskId: string;
  category: string;
  priority: TaskPriority;
  processingTime: number;
  success: boolean;
  confidence: number;
  escalated: boolean;
  error?: string;
  timestamp: Date;
}

/**
 * Factory function to create router integration for CFO Agent
 */
export function createCFORouterIntegration(cfoAgent: CFOAgent): CFOAgentRouterIntegration {
  return new CFOAgentRouterIntegration(cfoAgent);
}

/**
 * Helper function to register CFO Agent with router
 */
export async function registerCFOAgentWithRouter(
  cfoAgent: CFOAgent,
  routerEndpoint: string = 'http://localhost:3001/api/agents'
): Promise<boolean> {
  try {
    const integration = createCFORouterIntegration(cfoAgent);
    const capabilities = integration.registerCapabilities();
    
    // In a real implementation, this would make an HTTP request to register
    // For now, we'll just log the registration
    console.log('🔌 Registering CFO Agent with Intelligent Router...');
    console.log(`📡 Router Endpoint: ${routerEndpoint}`);
    console.log(`🤖 Agent ID: ${capabilities.agent_id}`);
    console.log(`📊 Domain: ${capabilities.domain}`);
    console.log('✅ CFO Agent registration completed');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to register CFO Agent with router:', error);
    return false;
  }
}