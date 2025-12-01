/**
 * Router Integration for Multimodal Agent
 *
 * Integrates with the 371 OS Intelligent Router for task distribution
 * and multi-agent coordination
 */

import type {
  AutonomousTask,
  OutputModality,
  ProcessingResult,
} from './types.js';

/** Router task for submission to the intelligent router */
export interface RouterTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  domain_hints: string[];
  resource_requirements?: ResourceRequirement[];
  deadline?: Date;
  strategic_importance: boolean;
  submitted_at: Date;
  submitted_by: string;
  /** Multimodal-specific metadata */
  multimodal_context?: MultimodalContext;
}

/** Resource requirement for router */
export interface ResourceRequirement {
  resource_type: 'computational' | 'expertise' | 'memory' | 'gpu';
  amount: number;
  unit: string;
  availability_required: boolean;
}

/** Multimodal context for router tasks */
export interface MultimodalContext {
  /** Required modalities */
  requiredModalities: ('text' | 'image' | 'audio' | 'video')[];
  /** Image count if applicable */
  imageCount?: number;
  /** Estimated complexity */
  complexity: 'simple' | 'moderate' | 'complex';
  /** Whether GPU is required */
  requiresGPU: boolean;
  /** Estimated processing time (ms) */
  estimatedTimeMs: number;
}

/** Routing decision from the intelligent router */
export interface RoutingDecision {
  success: boolean;
  primary_agent: string;
  confidence_score: number;
  routing_rationale: string;
  alternative_agents?: string[];
  coordination_required: boolean;
  coordination_strategy?: string;
  estimated_completion_time: number;
  escalation_required: boolean;
  decision_timestamp: Date;
}

/** Router configuration */
export interface RouterConfig {
  /** Router endpoint URL */
  routerEndpoint: string;
  /** Agent identifier for this multimodal agent */
  agentId: string;
  /** Agent capabilities to register */
  capabilities: AgentCapability[];
  /** Health check interval (ms) */
  healthCheckIntervalMs: number;
  /** Enable auto-registration */
  autoRegister: boolean;
}

/** Agent capability definition */
export interface AgentCapability {
  /** Capability name */
  name: string;
  /** Domains this capability serves */
  domains: string[];
  /** Modalities supported */
  modalities: ('text' | 'image' | 'audio' | 'video')[];
  /** Performance score (0-1) */
  performanceScore: number;
  /** Current workload (0-1) */
  currentWorkload: number;
}

/** Router integration class */
export class RouterIntegration {
  private config: RouterConfig;
  private isRegistered = false;
  private healthCheckInterval?: ReturnType<typeof setInterval>;
  private pendingTasks: Map<string, { task: RouterTask; timestamp: Date }> =
    new Map();

  constructor(config: RouterConfig) {
    this.config = config;
  }

  /**
   * Initialize router integration
   */
  async initialize(): Promise<boolean> {
    try {
      // Check router connectivity
      const health = await this.checkRouterHealth();
      if (!health.healthy) {
        console.warn(`[RouterIntegration] Router not healthy: ${health.error}`);
        return false;
      }

      // Register agent if auto-register is enabled
      if (this.config.autoRegister) {
        await this.registerAgent();
      }

      // Start health check interval
      if (this.config.healthCheckIntervalMs > 0) {
        this.startHealthCheck();
      }

      console.log('[RouterIntegration] Initialized successfully');
      return true;
    } catch (error) {
      console.error('[RouterIntegration] Initialization failed:', error);
      return false;
    }
  }

  /**
   * Register this agent with the router
   */
  async registerAgent(): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.config.routerEndpoint}/api/agents/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            agent_id: this.config.agentId,
            agent_name: 'Multimodal Local Agent',
            agent_type: 'multimodal_processor',
            capabilities: this.config.capabilities,
            status: 'available',
            metadata: {
              version: '1.0.0',
              supports_vision: true,
              supports_autonomous: true,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Registration failed: ${response.statusText}`);
      }

      this.isRegistered = true;
      console.log('[RouterIntegration] Agent registered with router');
      return true;
    } catch (error) {
      console.error('[RouterIntegration] Registration failed:', error);
      return false;
    }
  }

  /**
   * Submit a task to the router for routing decision
   */
  async submitTask(task: RouterTask): Promise<RoutingDecision> {
    try {
      const response = await fetch(
        `${this.config.routerEndpoint}/api/tasks/route`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        },
      );

      if (!response.ok) {
        throw new Error(`Routing failed: ${response.statusText}`);
      }

      const decision = (await response.json()) as RoutingDecision;

      // Track pending task
      this.pendingTasks.set(task.id, { task, timestamp: new Date() });

      return decision;
    } catch (error) {
      console.error('[RouterIntegration] Task submission failed:', error);

      // Return fallback decision - route to self
      return {
        success: false,
        primary_agent: this.config.agentId,
        confidence_score: 0.5,
        routing_rationale: 'Fallback: Router unavailable, processing locally',
        coordination_required: false,
        estimated_completion_time: 60000,
        escalation_required: false,
        decision_timestamp: new Date(),
      };
    }
  }

  /**
   * Report task completion to the router
   */
  async reportCompletion(
    taskId: string,
    result: ProcessingResult,
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `${this.config.routerEndpoint}/api/tasks/${taskId}/complete`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            task_id: taskId,
            agent_id: this.config.agentId,
            success: result.success,
            execution_time_ms: result.metrics.totalTimeMs,
            output_type: result.outputType,
            metadata: {
              llm_calls: result.metrics.llmCalls,
              vision_processing: result.metrics.visionProcessingCount,
              reasoning_steps: result.reasoning.length,
            },
          }),
        },
      );

      // Remove from pending tasks
      this.pendingTasks.delete(taskId);

      return response.ok;
    } catch (error) {
      console.error('[RouterIntegration] Completion report failed:', error);
      return false;
    }
  }

  /**
   * Convert autonomous task to router task format
   */
  toRouterTask(task: AutonomousTask, submittedBy: string): RouterTask {
    // Map priority: 'critical' maps to 'urgent' for router compatibility
    const priorityMap: Record<string, 'low' | 'medium' | 'high' | 'urgent'> = {
      low: 'low',
      medium: 'medium',
      high: 'high',
      critical: 'urgent',
    };
    const routerPriority = priorityMap[task.priority] || 'medium';

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      priority: routerPriority,
      domain_hints: this.inferDomainHints(task),
      resource_requirements: this.inferResourceRequirements(task),
      strategic_importance: task.priority === 'critical',
      submitted_at: task.createdAt,
      submitted_by: submittedBy,
      multimodal_context: {
        requiredModalities: task.requiredCapabilities.filter((c) =>
          ['text', 'image', 'audio', 'video'].includes(c),
        ) as ('text' | 'image' | 'audio' | 'video')[],
        imageCount: task.context?.imageInputs?.length,
        complexity: this.estimateComplexity(task),
        requiresGPU: task.requiredCapabilities.includes('image'),
        // Estimated processing time: conservative estimate at 50% of timeout
        // This allows buffer for network latency and potential retries
        estimatedTimeMs: Math.floor(task.timeoutMs * 0.5),
      },
    };
  }

  /**
   * Check router health
   */
  async checkRouterHealth(): Promise<{ healthy: boolean; error?: string }> {
    try {
      const response = await fetch(`${this.config.routerEndpoint}/api/health`, {
        signal: AbortSignal.timeout(5000),
      });

      return { healthy: response.ok };
    } catch (error) {
      return {
        healthy: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Update agent workload
   */
  async updateWorkload(workload: number): Promise<boolean> {
    if (!this.isRegistered) return false;

    try {
      const response = await fetch(
        `${this.config.routerEndpoint}/api/agents/${this.config.agentId}/workload`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workload }),
        },
      );
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * Get pending tasks
   */
  getPendingTasks(): Map<string, { task: RouterTask; timestamp: Date }> {
    return new Map(this.pendingTasks);
  }

  /**
   * Shutdown router integration
   */
  async shutdown(): Promise<void> {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    // Deregister agent
    if (this.isRegistered) {
      try {
        await fetch(
          `${this.config.routerEndpoint}/api/agents/${this.config.agentId}`,
          {
            method: 'DELETE',
          },
        );
      } catch {
        // Ignore errors during shutdown
      }
    }

    console.log('[RouterIntegration] Shutdown complete');
  }

  /**
   * Start periodic health check
   */
  private startHealthCheck(): void {
    this.healthCheckInterval = setInterval(async () => {
      const health = await this.checkRouterHealth();
      if (!health.healthy) {
        console.warn('[RouterIntegration] Router health check failed');
      }
    }, this.config.healthCheckIntervalMs);
  }

  /**
   * Infer domain hints from task
   */
  private inferDomainHints(task: AutonomousTask): string[] {
    const hints: string[] = [];
    const lowerDesc = task.description.toLowerCase();

    if (task.requiredCapabilities.includes('image')) {
      hints.push('visual_analysis');
    }

    if (lowerDesc.includes('code') || lowerDesc.includes('programming')) {
      hints.push('technical');
    }

    if (lowerDesc.includes('financial') || lowerDesc.includes('budget')) {
      hints.push('financial');
    }

    if (lowerDesc.includes('marketing') || lowerDesc.includes('campaign')) {
      hints.push('marketing');
    }

    if (hints.length === 0) {
      hints.push('general');
    }

    return hints;
  }

  /**
   * Infer resource requirements
   */
  private inferResourceRequirements(
    task: AutonomousTask,
  ): ResourceRequirement[] {
    const requirements: ResourceRequirement[] = [];

    if (task.requiredCapabilities.includes('image')) {
      requirements.push({
        resource_type: 'gpu',
        amount: 1,
        unit: 'device',
        availability_required: true,
      });
    }

    if (task.allowSubTasks) {
      requirements.push({
        resource_type: 'computational',
        amount: 2,
        unit: 'cores',
        availability_required: false,
      });
    }

    return requirements;
  }

  /**
   * Estimate task complexity
   */
  private estimateComplexity(
    task: AutonomousTask,
  ): 'simple' | 'moderate' | 'complex' {
    let complexityScore = 0;

    // More modalities = more complex
    complexityScore += task.requiredCapabilities.length * 0.2;

    // Sub-tasks allowed = more complex
    if (task.allowSubTasks) complexityScore += 0.3;

    // Longer timeout = potentially more complex
    if (task.timeoutMs > 30000) complexityScore += 0.2;

    // Images = more complex
    if (task.context?.imageInputs && task.context.imageInputs.length > 0) {
      complexityScore += task.context.imageInputs.length * 0.15;
    }

    if (complexityScore < 0.3) return 'simple';
    if (complexityScore < 0.6) return 'moderate';
    return 'complex';
  }
}

/**
 * Create router integration with default configuration
 */
export function createRouterIntegration(
  routerEndpoint: string,
  agentId: string,
): RouterIntegration {
  return new RouterIntegration({
    routerEndpoint,
    agentId,
    capabilities: [
      {
        name: 'text_generation',
        domains: ['general', 'technical', 'creative'],
        modalities: ['text'],
        performanceScore: 0.9,
        currentWorkload: 0,
      },
      {
        name: 'vision_analysis',
        domains: ['visual_analysis', 'technical'],
        modalities: ['text', 'image'],
        performanceScore: 0.85,
        currentWorkload: 0,
      },
      {
        name: 'code_generation',
        domains: ['technical'],
        modalities: ['text'],
        performanceScore: 0.88,
        currentWorkload: 0,
      },
      {
        name: 'autonomous_reasoning',
        domains: ['general', 'technical', 'strategic'],
        modalities: ['text', 'image'],
        performanceScore: 0.82,
        currentWorkload: 0,
      },
    ],
    healthCheckIntervalMs: 60000,
    autoRegister: true,
  });
}
