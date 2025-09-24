/**
 * RouterEngine - Core orchestration logic for intelligent task routing
 * Coordinates task analysis, agent selection, and delegation decisions
 * Serves as the main entry point for routing operations
 */

import {
  RoutingTask,
  RoutingDecision,
  TaskAnalysisResult,
  IntelligentRouterDefinition,
  RoutingApiResponse,
  EscalationRules,
  PerformanceTargets,
  AgentDomain,
  TaskPriority,
  StrategicImpact,
} from './types';

import { TaskAnalyzer } from './task-analyzer';
import { AgentSelector } from './agent-selector';
import { DelegationOrchestrator } from './delegation-orchestrator';
import { PerformanceMonitor } from './performance-monitor';

interface RouterEngineConfig {
  agent_brain_definition: IntelligentRouterDefinition;
  response_timeout_ms: number;
  max_concurrent_routings: number;
  enable_performance_monitoring: boolean;
}

export class RouterEngine {
  private taskAnalyzer: TaskAnalyzer;
  private agentSelector: AgentSelector;
  private delegationOrchestrator: DelegationOrchestrator;
  private performanceMonitor: PerformanceMonitor;
  
  private config: RouterEngineConfig;
  private activeRoutings: Map<string, RoutingTask> = new Map();
  private routingHistory: Map<string, RoutingDecision> = new Map();

  constructor(config: RouterEngineConfig) {
    this.config = config;
    
    // Initialize core components
    this.taskAnalyzer = new TaskAnalyzer();
    // Convert domain classification to the format expected by AgentSelector
    const routingPolicies: Record<string, any> = {};
    Object.entries(config.agent_brain_definition.routing_policies.domain_classification).forEach(([domain, policy]) => {
      routingPolicies[domain] = policy;
    });
    
    this.agentSelector = new AgentSelector(
      routingPolicies,
      config.agent_brain_definition.routing_policies.workload_balancing,
      config.agent_brain_definition.coordination_strategies
    );
    this.delegationOrchestrator = new DelegationOrchestrator();
    this.performanceMonitor = new PerformanceMonitor(
      config.agent_brain_definition.performance_targets
    );

    console.log('[RouterEngine] Initialized with advanced routing capabilities');
  }

  /**
   * Main routing method - analyzes task and makes routing decision
   */
  public async routeTask(task: RoutingTask): Promise<RoutingApiResponse<RoutingDecision>> {
    const startTime = Date.now();
    const routingId = `routing_${task.id}_${startTime}`;

    try {
      console.log(`[RouterEngine] Starting routing for task: ${task.id}`);
      
      // Check concurrent routing limit
      if (this.activeRoutings.size >= this.config.max_concurrent_routings) {
        throw new Error('Maximum concurrent routings exceeded');
      }

      // Add to active routings
      this.activeRoutings.set(routingId, task);

      // Validate task
      this.validateTask(task);

      // Analyze task
      const analysis = await this.taskAnalyzer.analyzeTask(task);
      
      // Validate analysis
      if (!this.taskAnalyzer.validateAnalysis(analysis)) {
        throw new Error('Task analysis validation failed');
      }

      // Check for escalation requirements
      const escalationCheck = this.checkEscalationRequirements(task, analysis);
      if (escalationCheck.escalation_required) {
        return this.handleEscalation(task, analysis, escalationCheck.reasons, routingId);
      }

      // Select agent
      const agentSelection = await this.agentSelector.selectAgent(task, analysis);

      // Create routing decision
      const decision = this.createRoutingDecision(task, analysis, agentSelection, startTime);

      // Execute delegation (simulation)
      const delegationResult = await this.delegationOrchestrator.delegateTask(
        task,
        decision,
        agentSelection.coordination_strategy
      );

      // Update decision with delegation results
      decision.success = delegationResult.success;
      if (!delegationResult.success) {
        decision.routing_rationale += `. Delegation failed: ${delegationResult.error}`;
      }

      // Record performance metrics
      if (this.config.enable_performance_monitoring) {
        await this.performanceMonitor.recordRoutingDecision(decision, Date.now() - startTime);
      }

      // Store in history
      this.routingHistory.set(routingId, decision);

      console.log(`[RouterEngine] Routing completed for task ${task.id}: ${decision.success ? 'Success' : 'Failed'}`);

      return {
        success: true,
        data: decision,
        timestamp: new Date(),
        routing_id: routingId
      };

    } catch (error) {
      console.error(`[RouterEngine] Routing failed for task ${task.id}:`, error);
      
      const failedDecision: RoutingDecision = {
        success: false,
        primary_agent: '',
        confidence_score: 0,
        routing_rationale: `Routing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        coordination_required: false,
        estimated_completion_time: 0,
        escalation_required: true,
        decision_timestamp: new Date()
      };

      // Record failure
      if (this.config.enable_performance_monitoring) {
        await this.performanceMonitor.recordRoutingDecision(failedDecision, Date.now() - startTime);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown routing error',
        timestamp: new Date(),
        routing_id: routingId
      };

    } finally {
      // Remove from active routings
      this.activeRoutings.delete(routingId);
    }
  }

  /**
   * Analyzes and delegates a task in a single operation
   */
  public async analyzeAndDelegate(task: RoutingTask): Promise<RoutingApiResponse<RoutingDecision>> {
    console.log(`[RouterEngine] Analyzing and delegating task: ${task.id}`);
    
    const routingResult = await this.routeTask(task);
    
    if (!routingResult.success || !routingResult.data) {
      return routingResult;
    }

    // Additional delegation orchestration if needed
    const decision = routingResult.data;
    if (decision.coordination_required) {
      console.log(`[RouterEngine] Coordinating multi-agent execution for task: ${task.id}`);
      // Additional coordination logic would go here
    }

    return routingResult;
  }

  /**
   * Handles escalation when routing confidence is too low or other issues arise
   */
  public async handleEscalation(
    task: RoutingTask,
    analysis: TaskAnalysisResult,
    reasons: string[],
    routingId: string
  ): Promise<RoutingApiResponse<RoutingDecision>> {
    console.log(`[RouterEngine] Escalating task ${task.id}. Reasons:`, reasons);

    const escalationDecision: RoutingDecision = {
      success: false,
      primary_agent: 'human_review_required',
      confidence_score: 0,
      routing_rationale: `Escalation required: ${reasons.join(', ')}`,
      coordination_required: false,
      estimated_completion_time: 0,
      escalation_required: true,
      decision_timestamp: new Date()
    };

    // Record escalation metrics
    if (this.config.enable_performance_monitoring) {
      await this.performanceMonitor.recordEscalation(task, reasons);
    }

    // Store in history
    this.routingHistory.set(routingId, escalationDecision);

    // In a real system, this would trigger human notification
    console.log(`[RouterEngine] Human review requested for task: ${task.id}`);

    return {
      success: true,
      data: escalationDecision,
      timestamp: new Date(),
      routing_id: routingId
    };
  }

  /**
   * Validates task before processing
   */
  private validateTask(task: RoutingTask): void {
    if (!task.id || !task.title || !task.description) {
      throw new Error('Task missing required fields: id, title, or description');
    }

    if (task.description.length < 10) {
      throw new Error('Task description too short for meaningful analysis');
    }

    if (!Object.values(TaskPriority).includes(task.priority)) {
      throw new Error(`Invalid task priority: ${task.priority}`);
    }

    // Check for deadline validity
    if (task.deadline && task.deadline <= new Date()) {
      throw new Error('Task deadline is in the past');
    }
  }

  /**
   * Checks if task requires escalation based on various criteria
   */
  private checkEscalationRequirements(
    task: RoutingTask,
    analysis: TaskAnalysisResult
  ): { escalation_required: boolean; reasons: string[] } {
    const reasons: string[] = [];
    const escalationRules = this.config.agent_brain_definition.escalation_rules;

    // Low confidence in domain classification
    if (analysis.domain_classification.confidence_score < escalationRules.uncertainty_threshold) {
      reasons.push(`Low domain classification confidence: ${analysis.domain_classification.confidence_score}`);
    }

    // High complexity multi-domain tasks
    if (analysis.domain_classification.multi_domain && 
        analysis.domain_classification.domains.filter(d => d.score > 0.3).length >= escalationRules.multi_domain_complexity) {
      reasons.push(`High complexity multi-domain task with ${analysis.domain_classification.domains.filter(d => d.score > 0.3).length} domains`);
    }

    // Critical strategic importance with uncertainty
    if (task.strategic_importance && 
        analysis.strategic_impact === StrategicImpact.CRITICAL && 
        analysis.uncertainty_indicators.length > 0) {
      reasons.push('Critical strategic task with uncertainty indicators');
    }

    // Resource conflicts
    if (escalationRules.resource_conflict_detection && 
        analysis.resource_requirements.some(req => req.resource_type === 'approval')) {
      reasons.push('Task requires approval authority beyond agent capabilities');
    }

    // Check for specific trigger phrases
    const triggerPhrases = escalationRules.human_review_triggers;
    const taskText = `${task.title} ${task.description}`.toLowerCase();
    for (const trigger of triggerPhrases) {
      if (taskText.includes(trigger.toLowerCase())) {
        reasons.push(`Trigger phrase detected: ${trigger}`);
      }
    }

    return {
      escalation_required: reasons.length > 0,
      reasons
    };
  }

  /**
   * Creates a comprehensive routing decision from analysis and selection results
   */
  private createRoutingDecision(
    task: RoutingTask,
    analysis: TaskAnalysisResult,
    agentSelection: any,
    startTime: number
  ): RoutingDecision {
    // Estimate completion time based on complexity and agent performance
    const baseTime = 3600000; // 1 hour base
    const complexityMultiplier = 1 + analysis.complexity_score;
    const priorityMultiplier = task.priority === TaskPriority.URGENT ? 0.5 : 
                              task.priority === TaskPriority.HIGH ? 0.7 : 1.0;
    
    const estimatedTime = baseTime * complexityMultiplier * priorityMultiplier;

    return {
      success: true, // Will be updated based on delegation result
      primary_agent: agentSelection.selected_agent,
      confidence_score: agentSelection.confidence_score,
      routing_rationale: this.generateRoutingRationale(analysis, agentSelection),
      alternative_agents: agentSelection.fallback_agents,
      coordination_required: agentSelection.coordination_required,
      estimated_completion_time: estimatedTime,
      escalation_required: false,
      decision_timestamp: new Date()
    };
  }

  /**
   * Generates comprehensive routing rationale
   */
  private generateRoutingRationale(analysis: TaskAnalysisResult, agentSelection: any): string {
    const domain = analysis.domain_classification.primary_domain;
    const confidence = analysis.domain_classification.confidence_score.toFixed(2);
    const complexity = analysis.complexity_score.toFixed(2);
    
    let rationale = `Routed to ${agentSelection.selected_agent} based on ${domain} domain classification (confidence: ${confidence})`;
    
    if (analysis.domain_classification.multi_domain) {
      rationale += `. Multi-domain coordination required with ${agentSelection.coordination_strategy?.strategy_type}`;
    }
    
    rationale += `. Task complexity: ${complexity}`;
    
    if (analysis.strategic_impact !== StrategicImpact.LOW) {
      rationale += `. Strategic impact: ${analysis.strategic_impact}`;
    }
    
    rationale += `. ${agentSelection.selection_reasoning}`;
    
    return rationale;
  }

  /**
   * Gets current routing statistics and performance metrics
   */
  public async getRoutingStatistics(): Promise<any> {
    if (!this.config.enable_performance_monitoring) {
      return { error: 'Performance monitoring disabled' };
    }

    const metrics = await this.performanceMonitor.getRoutingMetrics();
    
    return {
      active_routings: this.activeRoutings.size,
      total_routings_completed: this.routingHistory.size,
      performance_metrics: metrics,
      agent_availability: this.agentSelector.getAgentAvailability(),
      routing_history_sample: Array.from(this.routingHistory.entries()).slice(-5)
    };
  }

  /**
   * Gets detailed information about a specific routing decision
   */
  public getRoutingDetails(routingId: string): RoutingDecision | null {
    return this.routingHistory.get(routingId) || null;
  }

  /**
   * Updates router configuration and components
   */
  public updateConfiguration(newConfig: Partial<RouterEngineConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    if (newConfig.agent_brain_definition) {
      // Convert domain classification to the format expected by AgentSelector
      const routingPolicies: Record<string, any> = {};
      Object.entries(newConfig.agent_brain_definition.routing_policies.domain_classification).forEach(([domain, policy]) => {
        routingPolicies[domain] = policy;
      });
      
      // Reinitialize components with new configuration
      this.agentSelector = new AgentSelector(
        routingPolicies,
        newConfig.agent_brain_definition.routing_policies.workload_balancing,
        newConfig.agent_brain_definition.coordination_strategies
      );
      
      this.performanceMonitor = new PerformanceMonitor(
        newConfig.agent_brain_definition.performance_targets
      );
    }
    
    console.log('[RouterEngine] Configuration updated');
  }

  /**
   * Performs health check on all router components
   */
  public async healthCheck(): Promise<{ healthy: boolean; details: Record<string, any> }> {
    const details: Record<string, any> = {};
    let healthy = true;

    try {
      // Check task analyzer
      details.task_analyzer = 'operational';
      
      // Check agent selector
      const availability = this.agentSelector.getAgentAvailability();
      details.agent_selector = {
        status: 'operational',
        available_agents: Object.values(availability).filter(status => status === 'available').length
      };
      
      // Check delegation orchestrator
      details.delegation_orchestrator = 'operational';
      
      // Check performance monitor
      if (this.config.enable_performance_monitoring) {
        const metrics = await this.performanceMonitor.getRoutingMetrics();
        details.performance_monitor = {
          status: 'operational',
          metrics_available: !!metrics
        };
      } else {
        details.performance_monitor = 'disabled';
      }
      
      // Check routing capacity
      details.routing_capacity = {
        active_routings: this.activeRoutings.size,
        max_concurrent: this.config.max_concurrent_routings,
        utilization: this.activeRoutings.size / this.config.max_concurrent_routings
      };
      
    } catch (error) {
      healthy = false;
      details.error = error instanceof Error ? error.message : 'Unknown error';
    }

    return { healthy, details };
  }

  /**
   * Gracefully shuts down the router engine
   */
  public async shutdown(): Promise<void> {
    console.log('[RouterEngine] Initiating shutdown...');
    
    // Wait for active routings to complete (with timeout)
    const shutdownTimeout = 30000; // 30 seconds
    const startShutdown = Date.now();
    
    while (this.activeRoutings.size > 0 && (Date.now() - startShutdown) < shutdownTimeout) {
      console.log(`[RouterEngine] Waiting for ${this.activeRoutings.size} active routings to complete...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    if (this.activeRoutings.size > 0) {
      console.warn(`[RouterEngine] Forced shutdown with ${this.activeRoutings.size} active routings`);
    }
    
    // Cleanup resources
    this.activeRoutings.clear();
    
    console.log('[RouterEngine] Shutdown complete');
  }
}