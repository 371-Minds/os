/**
 * Main entry point for the Intelligent Router Agent
 * Integrates all components and provides the unified interface
 * for task routing within the 371 OS ecosystem
 */

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

import {
  IntelligentRouterDefinition,
  RoutingTask,
  RoutingApiResponse,
  RoutingDecision,
  TaskPriority,
  AgentDomain,
  RouterConfiguration,
  RuntimeSettings,
  IntegrationEndpoints,
  MonitoringConfig,
} from './types';

import { RouterEngine } from './router-engine';
import { TaskAnalyzer } from './task-analyzer';
import { AgentSelector } from './agent-selector';
import { DelegationOrchestrator } from './delegation-orchestrator';
import { PerformanceMonitor } from './performance-monitor';

class IntelligentRouterAgent {
  private routerEngine: RouterEngine;
  private config: RouterConfiguration;
  private isInitialized = false;

  constructor(configPath?: string) {
    console.log('[IntelligentRouterAgent] Initializing Intelligent Router Agent...');
    
    // Load configuration
    this.config = this.loadConfiguration(configPath);
    
    // Initialize router engine
    this.routerEngine = new RouterEngine({
      agent_brain_definition: this.config.agent_brain_definition,
      response_timeout_ms: this.config.runtime_settings.response_timeout_ms,
      max_concurrent_routings: this.config.runtime_settings.max_concurrent_routings,
      enable_performance_monitoring: this.config.monitoring_config.metrics_collection_interval > 0
    });

    this.isInitialized = true;
    console.log('[IntelligentRouterAgent] Initialization complete');
  }

  /**
   * Routes a task to the most appropriate agent
   */
  public async routeTask(task: RoutingTask): Promise<RoutingApiResponse<RoutingDecision>> {
    if (!this.isInitialized) {
      throw new Error('IntelligentRouterAgent not properly initialized');
    }

    console.log(`[IntelligentRouterAgent] Routing task: ${task.id}`);
    
    try {
      return await this.routerEngine.routeTask(task);
    } catch (error) {
      console.error(`[IntelligentRouterAgent] Error routing task ${task.id}:`, error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown routing error',
        timestamp: new Date()
      };
    }
  }

  /**
   * Analyzes and delegates a task in one operation
   */
  public async analyzeAndDelegate(task: RoutingTask): Promise<RoutingApiResponse<RoutingDecision>> {
    if (!this.isInitialized) {
      throw new Error('IntelligentRouterAgent not properly initialized');
    }

    console.log(`[IntelligentRouterAgent] Analyzing and delegating task: ${task.id}`);
    return await this.routerEngine.analyzeAndDelegate(task);
  }

  /**
   * Gets current router statistics and performance metrics
   */
  public async getStatistics(): Promise<any> {
    if (!this.isInitialized) {
      throw new Error('IntelligentRouterAgent not properly initialized');
    }

    return await this.routerEngine.getRoutingStatistics();
  }

  /**
   * Gets detailed performance report
   */
  public async getPerformanceReport(days: number = 7): Promise<any> {
    if (!this.isInitialized) {
      throw new Error('IntelligentRouterAgent not properly initialized');
    }

    const stats = await this.routerEngine.getRoutingStatistics();
    return {
      agent_info: {
        name: this.config.agent_brain_definition.agent_name,
        type: this.config.agent_brain_definition.agent_type,
        description: this.config.agent_brain_definition.description
      },
      performance_metrics: stats.performance_metrics,
      routing_statistics: stats,
      configuration: {
        max_concurrent_routings: this.config.runtime_settings.max_concurrent_routings,
        response_timeout_ms: this.config.runtime_settings.response_timeout_ms,
        performance_monitoring_enabled: this.config.monitoring_config.metrics_collection_interval > 0
      }
    };
  }

  /**
   * Performs health check on the router system
   */
  public async healthCheck(): Promise<{ healthy: boolean; details: Record<string, any> }> {
    if (!this.isInitialized) {
      return {
        healthy: false,
        details: { error: 'IntelligentRouterAgent not properly initialized' }
      };
    }

    try {
      const engineHealth = await this.routerEngine.healthCheck();
      
      return {
        healthy: engineHealth.healthy,
        details: {
          ...engineHealth.details,
          agent_name: this.config.agent_brain_definition.agent_name,
          initialization_status: 'initialized',
          configuration_loaded: true
        }
      };
    } catch (error) {
      return {
        healthy: false,
        details: {
          error: error instanceof Error ? error.message : 'Health check failed',
          agent_name: this.config.agent_brain_definition.agent_name
        }
      };
    }
  }

  /**
   * Updates router configuration
   */
  public updateConfiguration(newConfig: Partial<RouterConfiguration>): void {
    if (!this.isInitialized) {
      throw new Error('IntelligentRouterAgent not properly initialized');
    }

    this.config = { ...this.config, ...newConfig };
    
    // Update router engine configuration
    this.routerEngine.updateConfiguration({
      agent_brain_definition: this.config.agent_brain_definition,
      response_timeout_ms: this.config.runtime_settings.response_timeout_ms,
      max_concurrent_routings: this.config.runtime_settings.max_concurrent_routings,
      enable_performance_monitoring: this.config.monitoring_config.metrics_collection_interval > 0
    });

    console.log('[IntelligentRouterAgent] Configuration updated');
  }

  /**
   * Gracefully shuts down the router
   */
  public async shutdown(): Promise<void> {
    if (!this.isInitialized) {
      console.log('[IntelligentRouterAgent] Already shut down');
      return;
    }

    console.log('[IntelligentRouterAgent] Shutting down...');
    
    await this.routerEngine.shutdown();
    this.isInitialized = false;
    
    console.log('[IntelligentRouterAgent] Shutdown complete');
  }

  /**
   * Loads configuration from brain definition and default settings
   */
  private loadConfiguration(configPath?: string): RouterConfiguration {
    // Load agent brain definition
    const brainDefinitionPath = configPath || this.getDefaultBrainDefinitionPath();
    const agentBrainDefinition = this.loadAgentBrainDefinition(brainDefinitionPath);

    // Create default configuration
    const config: RouterConfiguration = {
      agent_brain_definition: agentBrainDefinition,
      runtime_settings: {
        max_concurrent_routings: 10,
        response_timeout_ms: 5000,
        retry_attempts: 3,
        cache_duration_minutes: 15,
        logging_level: 'info'
      },
      integration_endpoints: {
        agent_registry_url: process.env.AGENT_REGISTRY_URL || 'http://localhost:3001/api/agents',
        performance_analytics_url: process.env.ANALYTICS_URL || 'http://localhost:3002/api/analytics',
        escalation_service_url: process.env.ESCALATION_URL || 'http://localhost:3003/api/escalation',
        notification_service_url: process.env.NOTIFICATION_URL || 'http://localhost:3004/api/notifications'
      },
      monitoring_config: {
        metrics_collection_interval: 60000, // 1 minute
        performance_reporting_frequency: 300000, // 5 minutes
        alert_thresholds: {
          routing_accuracy: 0.85,
          response_time: 2000,
          escalation_rate: 0.1
        },
        dashboard_refresh_rate: 30000 // 30 seconds
      }
    };

    console.log('[IntelligentRouterAgent] Configuration loaded successfully');
    return config;
  }

  /**
   * Gets the default path to the agent brain definition
   */
  private getDefaultBrainDefinitionPath(): string {
    // Look for brain definition in the standard location
    const workspaceRoot = process.cwd();
    return path.join(workspaceRoot, 'libs', 'prompts', 'agent-definitions', 'intelligent_router.yml');
  }

  /**
   * Loads agent brain definition from YAML file
   */
  private loadAgentBrainDefinition(brainPath: string): IntelligentRouterDefinition {
    try {
      if (!fs.existsSync(brainPath)) {
        console.warn(`[IntelligentRouterAgent] Brain definition not found at ${brainPath}, using default`);
        return this.getDefaultBrainDefinition();
      }

      const yamlContent = fs.readFileSync(brainPath, 'utf8');
      const brainDefinition = yaml.load(yamlContent) as IntelligentRouterDefinition;

      // Validate required fields
      if (!brainDefinition.agent_name || !brainDefinition.agent_type) {
        throw new Error('Invalid brain definition: missing required fields');
      }

      console.log(`[IntelligentRouterAgent] Loaded brain definition: ${brainDefinition.agent_name}`);
      return brainDefinition;

    } catch (error) {
      console.error(`[IntelligentRouterAgent] Error loading brain definition:`, error);
      console.log('[IntelligentRouterAgent] Falling back to default brain definition');
      return this.getDefaultBrainDefinition();
    }
  }

  /**
   * Gets default brain definition when file is not available
   */
  private getDefaultBrainDefinition(): IntelligentRouterDefinition {
    return {
      agent_name: 'Intelligent Router Agent',
      agent_type: 'intelligent_router',
      description: 'Central nervous system for task routing within 371 OS ecosystem',
      core_instructions: 'Analyze incoming tasks and route them to appropriate agents based on domain expertise',
      personality_traits: {
        analytical: 'Approaches every task with systematic analysis',
        efficient: 'Optimizes for speed and accuracy in routing decisions',
        adaptive: 'Learns from routing outcomes to improve decisions'
      },
      required_tools: ['task_analyzer', 'agent_registry', 'performance_monitor'],
      routing_policies: {
        domain_classification: {
          [AgentDomain.FINANCIAL]: {
            domain: AgentDomain.FINANCIAL,
            keywords: ['financial', 'budget', 'cost', 'revenue'],
            primary_agent: 'cfo-cash',
            fallback_agents: ['financial-analyst'],
            confidence_threshold: 0.8
          },
          [AgentDomain.TECHNICAL]: {
            domain: AgentDomain.TECHNICAL,
            keywords: ['technical', 'development', 'architecture'],
            primary_agent: 'cto-alex',
            fallback_agents: ['technical-lead'],
            confidence_threshold: 0.8
          },
          [AgentDomain.MARKETING]: {
            domain: AgentDomain.MARKETING,
            keywords: ['marketing', 'campaign', 'brand'],
            primary_agent: 'cmo-anova',
            fallback_agents: ['marketing-specialist'],
            confidence_threshold: 0.8
          },
          [AgentDomain.COMMUNITY]: {
            domain: AgentDomain.COMMUNITY,
            keywords: ['community', 'stakeholder', 'governance'],
            primary_agent: 'cco-sage',
            fallback_agents: ['community-manager'],
            confidence_threshold: 0.8
          },
          [AgentDomain.STRATEGIC]: {
            domain: AgentDomain.STRATEGIC,
            keywords: ['strategic', 'planning', 'vision'],
            primary_agent: 'ceo-mimi',
            fallback_agents: ['strategic-advisor'],
            confidence_threshold: 0.9
          }
        },
        workload_balancing: {
          max_concurrent_tasks: 5,
          priority_multiplier: 1.5,
          availability_check_required: true,
          fallback_threshold: 0.7
        }
      },
      escalation_rules: {
        uncertainty_threshold: 0.6,
        multi_domain_complexity: 3,
        resource_conflict_detection: true,
        human_review_triggers: ['approval required', 'legal review', 'compliance check']
      },
      performance_targets: {
        routing_accuracy: 0.95,
        average_response_time: 500,
        delegation_success_rate: 0.90,
        escalation_rate: 0.05
      },
      learning_parameters: {
        feedback_integration: true,
        success_weighting: 1.2,
        failure_analysis: true,
        pattern_recognition: true,
        continuous_improvement: true
      },
      coordination_strategies: {
        sequential_execution: {
          strategy_type: 'sequential_execution' as any,
          description: 'Tasks executed one after another with dependencies',
          use_cases: ['Financial analysis followed by strategic planning']
        },
        parallel_execution: {
          strategy_type: 'parallel_execution' as any,
          description: 'Independent tasks executed simultaneously',
          use_cases: ['Marketing campaign with technical development']
        }
      }
    };
  }
}

/**
 * Creates sample tasks for testing and demonstration
 */
function createSampleTasks(): RoutingTask[] {
  const now = new Date();
  
  return [
    {
      id: 'task_001',
      title: 'Analyze Q3 Financial Performance',
      description: 'Review quarterly financial results, identify cost optimization opportunities, and prepare executive summary for board presentation',
      priority: TaskPriority.HIGH,
      domain_hints: [AgentDomain.FINANCIAL],
      strategic_importance: true,
      submitted_at: now,
      submitted_by: 'user_demo'
    },
    {
      id: 'task_002', 
      title: 'Implement User Authentication System',
      description: 'Develop secure authentication system with multi-factor authentication, OAuth integration, and security audit compliance',
      priority: TaskPriority.MEDIUM,
      domain_hints: [AgentDomain.TECHNICAL],
      resource_requirements: [
        { resource_type: 'computational', amount: 1, unit: 'instance', availability_required: true },
        { resource_type: 'expertise', amount: 1, unit: 'security_specialist', availability_required: true }
      ],
      strategic_importance: false,
      submitted_at: now,
      submitted_by: 'user_demo'
    },
    {
      id: 'task_003',
      title: 'Launch Product Marketing Campaign',
      description: 'Create comprehensive marketing campaign for new product launch including social media, content marketing, and paid advertising',
      priority: TaskPriority.URGENT,
      domain_hints: [AgentDomain.MARKETING],
      deadline: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      strategic_importance: true,
      submitted_at: now,
      submitted_by: 'user_demo'
    },
    {
      id: 'task_004',
      title: 'Strategic Partnership Development',
      description: 'Identify and evaluate potential strategic partnerships, conduct due diligence, and develop partnership framework for long-term growth',
      priority: TaskPriority.HIGH,
      domain_hints: [AgentDomain.STRATEGIC, AgentDomain.COMMUNITY],
      strategic_importance: true,
      submitted_at: now,
      submitted_by: 'user_demo'
    }
  ];
}

/**
 * Demonstration function showing router capabilities
 */
async function demonstrateRouter(): Promise<void> {
  console.log('\n=== Intelligent Router Agent Demonstration ===\n');

  // Initialize router
  const router = new IntelligentRouterAgent();

  // Health check
  const health = await router.healthCheck();
  console.log('Router Health Check:', health.healthy ? 'HEALTHY' : 'UNHEALTHY');
  console.log('Health Details:', JSON.stringify(health.details, null, 2));

  // Create sample tasks
  const sampleTasks = createSampleTasks();

  // Route each task
  for (const task of sampleTasks) {
    console.log(`\n--- Routing Task: ${task.title} ---`);
    
    try {
      const result = await router.routeTask(task);
      
      if (result.success && result.data) {
        console.log(`✅ Successfully routed to: ${result.data.primary_agent}`);
        console.log(`   Confidence Score: ${result.data.confidence_score.toFixed(2)}`);
        console.log(`   Coordination Required: ${result.data.coordination_required}`);
        console.log(`   Rationale: ${result.data.routing_rationale}`);
        
        if (result.data.alternative_agents && result.data.alternative_agents.length > 0) {
          console.log(`   Fallback Agents: ${result.data.alternative_agents.join(', ')}`);
        }
      } else {
        console.log(`❌ Routing failed: ${result.error}`);
      }
    } catch (error) {
      console.error(`❌ Error routing task: ${error}`);
    }
  }

  // Get performance report
  console.log('\n--- Performance Report ---');
  const report = await router.getPerformanceReport();
  console.log('Agent Info:', report.agent_info);
  console.log('Routing Statistics:', report.routing_statistics);

  // Shutdown
  await router.shutdown();
  console.log('\n=== Demonstration Complete ===');
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  try {
    // Check if this is being run directly or imported
    if (require.main === module) {
      await demonstrateRouter();
    } else {
      console.log('[IntelligentRouterAgent] Module loaded successfully');
    }
  } catch (error) {
    console.error('Fatal error in Intelligent Router Agent:', error);
    process.exit(1);
  }
}

// Export classes and types for use as a library
export {
  IntelligentRouterAgent,
  RouterEngine,
  TaskAnalyzer,
  AgentSelector,
  DelegationOrchestrator,
  PerformanceMonitor,
  createSampleTasks
};

export * from './types';

// Run main if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}