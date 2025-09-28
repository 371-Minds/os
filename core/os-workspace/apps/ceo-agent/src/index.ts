/**
 * CEO Agent (Mimi) - Main Entry Point
 *
 * This agent serves as the Chief Executive Officer for the 371 DAO,
 * providing strategic oversight and intelligent task delegation following
 * the unified "brain/body" architecture pattern.
 */

import * as fs from 'fs';
import * as path from 'path';
import { createLogger, Logger } from 'winston';
import { StrategicOrchestrator } from './orchestrator.js';
import { TaskDelegator } from './delegator.js';
import { HealthMonitor } from './health-monitor.js';
import type { 
  CEOAgentDefinition, 
  StrategicTask, 
  ProcessingResult, 
  DecisionContext,
  OrchestrationRequest,
  HealthCheckResult
} from './types.js';

/**
 * CEO Agent Implementation
 * 
 * The 371 DAO's strategic leadership agent that transforms high-level
 * business objectives into executable tasks through intelligent delegation.
 */
export class CEOAgent {
  private agentDefinition: CEOAgentDefinition;
  private orchestrator: StrategicOrchestrator;
  private delegator: TaskDelegator;
  private healthMonitor: HealthMonitor;
  private logger: Logger;

  constructor() {
    // Initialize logger first
    this.logger = createLogger({
      level: 'info',
      format: require('winston').format.json(),
      transports: [
        new (require('winston').transports.Console)({
          format: require('winston').format.simple()
        })
      ]
    });

    // Load agent definition from centralized prompt library
    this.agentDefinition = this.loadAgentDefinition();
    
    // Initialize core components
    this.orchestrator = new StrategicOrchestrator(this.agentDefinition);
    this.delegator = new TaskDelegator(this.agentDefinition);
    this.healthMonitor = new HealthMonitor(this.agentDefinition);

    this.logger.info('🎯 CEO Agent (Mimi) initialized successfully');
  }

  /**
   * Load the agent definition from the centralized prompt library
   */
  private loadAgentDefinition(): CEOAgentDefinition {
    const agentDefinitionPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'libs',
      'prompts',
      'agent-definitions',
      'mimi_ceo.yml'
    );

    if (!fs.existsSync(agentDefinitionPath)) {
      this.logger.warn(`Agent definition file not found: ${agentDefinitionPath}, using defaults`);
      return this.getDefaultAgentDefinition();
    }

    try {
      const yamlContent = fs.readFileSync(agentDefinitionPath, 'utf8');
      this.logger.info('✅ Agent definition loaded successfully');
      
      // Parse YAML and return as CEOAgentDefinition
      // For now, return a parsed structure - YAML parsing can be added later
      return this.parseAgentDefinition(yamlContent);
      
    } catch (error) {
      this.logger.error('Failed to load agent definition:', error);
      return this.getDefaultAgentDefinition();
    }
  }

  /**
   * Parse agent definition from YAML content
   */
  private parseAgentDefinition(yamlContent: string): CEOAgentDefinition {
    // Mock parsed definition - in production, use a YAML parser like js-yaml
    return {
      agent_name: 'Mimi (CEO)',
      agent_type: 'STRATEGIC_LEADERSHIP',
      core_instructions: yamlContent,
      personality_traits: ['Visionary', 'Strategic', 'Decisive', 'Collaborative', 'Results-oriented'],
      required_tools: [
        'agent_registry:read',
        'task_router:delegate', 
        'progress_monitor:track',
        'decision_logger:record'
      ],
      delegation_rules: {
        financial_domain: {
          keywords: ['financial', 'budget', 'quarterly', 'revenue', 'cost'],
          primary_agent: 'CFO Cash',
          fallback_agents: ['Financial Analyst'],
          confidence_threshold: 0.8
        },
        technical_domain: {
          keywords: ['feature', 'application', 'security', 'infrastructure', 'technical'],
          primary_agent: 'CTO Alex',
          fallback_agents: ['Technical Lead'],
          confidence_threshold: 0.8
        },
        marketing_domain: {
          keywords: ['marketing', 'campaign', 'brand', 'promotion', 'growth'],
          primary_agent: 'CMO Anova',
          fallback_agents: ['Marketing Specialist'],
          confidence_threshold: 0.8
        },
        community_domain: {
          keywords: ['community', 'outreach', 'stakeholder', 'governance'],
          primary_agent: 'CCO Sage',
          fallback_agents: ['Community Manager'],
          confidence_threshold: 0.8
        }
      },
      escalation_criteria: {
        high_financial_impact: {
          condition: 'financial_impact_usd > 10000',
          action: 'executive_decision',
          notification_required: true
        },
        strategic_uncertainty: {
          condition: 'confidence_score < 0.6',
          action: 'human_review',
          notification_required: true
        }
      },
      performance_targets: {
        response_time_ms: 500,
        delegation_accuracy_rate: 0.95,
        escalation_rate: 0.05,
        agent_availability_target: 0.98,
        decision_confidence_threshold: 0.8
      },
      monitoring_metrics: [
        'task_processing_time',
        'delegation_success_rate',
        'agent_availability_rates',
        'escalation_frequency'
      ]
    };
  }

  /**
   * Get default agent definition as fallback
   */
  private getDefaultAgentDefinition(): CEOAgentDefinition {
    return {
      agent_name: 'Mimi (CEO)',
      agent_type: 'STRATEGIC_LEADERSHIP',
      core_instructions: 'Default CEO agent configuration',
      personality_traits: ['Strategic', 'Decisive', 'Results-oriented'],
      required_tools: ['task_router:delegate'],
      delegation_rules: {
        financial_domain: {
          keywords: ['financial', 'budget'],
          primary_agent: 'CFO Cash',
          fallback_agents: [],
          confidence_threshold: 0.8
        },
        technical_domain: {
          keywords: ['technical', 'feature'],
          primary_agent: 'CTO Alex',
          fallback_agents: [],
          confidence_threshold: 0.8
        }
      },
      escalation_criteria: {
        default_escalation: {
          condition: 'confidence_score < 0.5',
          action: 'human_review',
          notification_required: true
        }
      },
      performance_targets: {
        response_time_ms: 500,
        delegation_accuracy_rate: 0.90,
        escalation_rate: 0.10,
        agent_availability_target: 0.95,
        decision_confidence_threshold: 0.7
      },
      monitoring_metrics: ['task_processing_time', 'delegation_success_rate']
    };
  }

  /**
   * Process a strategic task through orchestration and delegation
   */
  public async processTask(task: StrategicTask): Promise<ProcessingResult> {
    try {
      this.logger.info(`📋 Processing strategic task: ${task.title} (ID: ${task.id})`);
      
      // Validate input task
      this.validateTask(task);
      
      // Generate decision context
      const decisionContext = await this.generateDecisionContext(task);
      
      // Create orchestration request
      const orchestrationRequest: OrchestrationRequest = {
        task: task,
        context: {
          current_strategic_focus: ['cost_optimization', 'agent_coordination'],
          active_initiatives: ['akash_deployment', 'blockchain_integration'],
          resource_constraints: [],
          organizational_priorities: [
            {
              name: 'Cost Reduction',
              weight: 0.9,
              description: '97.6% cost reduction through Akash Network'
            }
          ]
        },
        preferences: {
          prefer_single_agent: true,
          allow_parallel_execution: false,
          max_coordination_complexity: 0.7,
          escalation_threshold: 0.8
        }
      };
      
      // 1. Strategic orchestration
      const delegationDecision = await this.orchestrator.orchestrateTask(orchestrationRequest);
      
      // 2. Execute delegation based on decision
      const delegationResult = await this.delegator.delegateTask(task, decisionContext);
      
      this.logger.info(`✅ Task processing completed for ${task.id}`);
      return delegationResult;
      
    } catch (error) {
      this.logger.error(`❌ Task processing failed for ${task.id}:`, error);
      throw error;
    }
  }

  /**
   * Validate input task
   */
  private validateTask(task: StrategicTask): void {
    if (!task) {
      throw new Error('Task is required');
    }
    
    if (!task.id || task.id.trim() === '') {
      throw new Error('Task ID is required and cannot be empty');
    }
    
    if (!task.title || task.title.trim() === '') {
      throw new Error('Task title is required and cannot be empty');
    }
    
    if (!task.description || task.description.trim() === '') {
      throw new Error('Task description is required and cannot be empty');
    }
    
    const validPriorities = ['low', 'medium', 'high', 'critical'];
    if (!validPriorities.includes(task.priority)) {
      throw new Error(`Invalid priority: must be one of ${validPriorities.join(', ')}`);
    }
  }

  /**
   * Generate decision context for the task
   */
  private async generateDecisionContext(task: StrategicTask): Promise<DecisionContext> {
    // Mock decision context - in production, this would be gathered from various sources
    return {
      current_workload: {
        'CFO Cash': 0.6,
        'CTO Alex': 0.8,
        'CMO Anova': 0.4,
        'CCO Sage': 0.5
      },
      agent_performance_history: {
        'CFO Cash': 0.92,
        'CTO Alex': 0.88,
        'CMO Anova': 0.95,
        'CCO Sage': 0.89
      },
      resource_availability: {
        financial_budget: 100000,
        computational_capacity: 0.7,
        human_resources: 0.8,
        time_constraints: task.deadline ? [`Deadline: ${task.deadline.toISOString()}`] : []
      },
      strategic_priorities: ['cost_optimization', 'agent_coordination', 'dao_governance'],
      risk_factors: []
    };
  }

  /**
   * Health check for the agent
   */
  public async healthCheck(): Promise<HealthCheckResult> {
    try {
      return await this.healthMonitor.performHealthCheck();
    } catch (error) {
      this.logger.error('❌ Health check failed:', error);
      throw error;
    }
  }

  /**
   * Get agent status and capabilities
   */
  public getStatus() {
    return {
      name: this.agentDefinition.agent_name,
      type: this.agentDefinition.agent_type,
      status: 'operational',
      capabilities: [
        'Strategic Task Analysis',
        'Intelligent Task Delegation',
        'Multi-Domain Coordination',
        'Executive Decision Making',
        'Performance Monitoring'
      ],
      performance_targets: this.agentDefinition.performance_targets,
      last_update: new Date().toISOString(),
      version: '1.0.0'
    };
  }

  /**
   * Get performance metrics
   */
  public getPerformanceMetrics() {
    return this.healthMonitor.getHealthSummary();
  }

  /**
   * Process multiple tasks concurrently
   */
  public async processTasks(tasks: StrategicTask[]): Promise<ProcessingResult[]> {
    this.logger.info(`📋 Processing ${tasks.length} tasks concurrently`);
    
    try {
      const results = await Promise.allSettled(
        tasks.map(task => this.processTask(task))
      );
      
      return results.map((result, index) => {
        if (result.status === 'fulfilled') {
          return result.value;
        } else {
          this.logger.error(`Task ${tasks[index].id} failed:`, result.reason);
          return {
            success: false,
            task_id: tasks[index].id,
            agent_id: 'ceo_mimi',
            result_type: 'failed',
            execution_time: 0,
            metadata: {
              processing_start: new Date(),
              processing_end: new Date(),
              decision_points: [],
              resource_usage: {
                cpu_time: 0,
                memory_usage: 0,
                network_calls: 0,
                external_api_calls: 0
              },
              performance_impact: {
                response_time_impact: 1.0,
                accuracy_impact: 0.0,
                resource_efficiency: 0.0
              }
            }
          };
        }
      });
      
    } catch (error) {
      this.logger.error('❌ Concurrent task processing failed:', error);
      throw error;
    }
  }
}

/**
 * Legacy function export for compatibility
 */
export default function ceoAgent() {
  console.log('🚀 Initializing CEO Agent (Mimi)...');
  const agent = new CEOAgent();
  return agent;
}

// For testing purposes
if (require.main === module) {
  async function main() {
    try {
      const agent = new CEOAgent();
      
      // Perform health check
      const healthResult = await agent.healthCheck();
      console.log('Agent Status:', agent.getStatus());
      console.log('Health Check:', healthResult.status);
      
      // Test task processing
      const testTask: StrategicTask = {
        id: 'test_001',
        title: 'Quarterly Financial Review',
        description: 'Analyze quarterly financial results and budget optimization opportunities',
        priority: 'high',
        domain: 'financial',
        complexity_score: 0.6,
        financial_impact_usd: 15000,
        resource_requirements: [
          {
            type: 'human',
            amount: 2,
            unit: 'analysts',
            description: 'Financial analysts for data analysis'
          }
        ],
        stakeholders: ['CFO', 'Finance Team'],
        strategic_implications: true,
        created_at: new Date(),
        updated_at: new Date()
      };
      
      const result = await agent.processTask(testTask);
      console.log('Task Processing Result:', result.success ? 'SUCCESS' : 'FAILED');
      
      if (healthResult.status === 'healthy' && result.success) {
        console.log('🎉 CEO Agent is ready for strategic leadership!');
      } else {
        console.log('🔧 Agent requires maintenance before operational use');
      }
      
    } catch (error) {
      console.error('❌ Agent initialization or testing failed:', error);
    }
  }
  
  main();
}