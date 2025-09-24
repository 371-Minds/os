/**
 * Enhanced Task Delegator for CEO Agent (Mimi)
 * 
 * Implements sophisticated routing logic beyond simple keyword matching,
 * including semantic analysis, context awareness, priority management,
 * and resource optimization for efficient agent utilization.
 */

import { createLogger, Logger } from 'winston';
import type {
  StrategicTask,
  DelegationDecision,
  DelegationRule,
  DelegationRules,
  AgentRegistryEntry,
  AgentTarget,
  DecisionContext,
  CEOAgentDefinition,
  TaskDomain,
  DecisionType,
  ProcessingResult
} from './types.js';

export class TaskDelegator {
  private logger: Logger;
  private agentDefinition: CEOAgentDefinition;
  private delegationRules: DelegationRules;
  private agentRegistry: Map<string, AgentRegistryEntry> = new Map();

  constructor(agentDefinition: CEOAgentDefinition) {
    this.agentDefinition = agentDefinition;
    this.delegationRules = agentDefinition.delegation_rules;
    
    this.logger = createLogger({
      level: 'info',
      format: require('winston').format.json(),
      transports: [
        new (require('winston').transports.Console)({
          format: require('winston').format.simple()
        })
      ]
    });

    this.initializeMockAgentRegistry();
    this.logger.info('🎯 Enhanced Task Delegator initialized for CEO Agent (Mimi)');
  }

  /**
   * Execute sophisticated task delegation with enhanced routing logic
   */
  public async delegateTask(
    task: StrategicTask,
    decisionContext: DecisionContext
  ): Promise<ProcessingResult> {
    const startTime = Date.now();
    
    try {
      this.logger.info(`🚀 Delegating task: ${task.title} (ID: ${task.id})`);

      // 1. Perform semantic analysis of the task
      const semanticAnalysis = await this.performSemanticAnalysis(task);
      
      // 2. Identify and rank candidate agents
      const rankedCandidates = await this.identifyAndRankCandidates(
        task,
        semanticAnalysis,
        decisionContext
      );
      
      // 3. Select optimal agent(s) and execute delegation
      const delegationResult = await this.selectAndDelegate(
        rankedCandidates,
        task,
        decisionContext
      );

      const processingTime = Date.now() - startTime;
      
      this.logger.info(
        `✅ Task delegation completed in ${processingTime}ms for task ${task.id}`
      );

      return {
        success: true,
        task_id: task.id,
        agent_id: 'ceo_mimi',
        result_type: delegationResult.strategy === 'coordinate' ? 'coordinated' : 'delegated',
        execution_time: processingTime,
        delegation_details: delegationResult.strategy === 'delegate' ? {
          target_agent: delegationResult.selectedAgents[0]?.agent_name || 'unknown',
          delegation_reason: delegationResult.reasoning,
          confidence_score: delegationResult.confidence_score,
          expected_completion: delegationResult.estimated_completion,
          monitoring_schedule: ['Daily check-in']
        } : undefined,
        metadata: {
          processing_start: new Date(startTime),
          processing_end: new Date(),
          decision_points: [],
          resource_usage: {
            cpu_time: processingTime,
            memory_usage: 0,
            network_calls: 0,
            external_api_calls: 0
          },
          performance_impact: {
            response_time_impact: 0,
            accuracy_impact: delegationResult.confidence_score,
            resource_efficiency: 0.8
          }
        }
      };
      
    } catch (error) {
      this.logger.error(`❌ Task delegation failed for task ${task.id}:`, error);
      
      return {
        success: false,
        task_id: task.id,
        agent_id: 'ceo_mimi',
        result_type: 'failed',
        execution_time: Date.now() - startTime,
        metadata: {
          processing_start: new Date(startTime),
          processing_end: new Date(),
          decision_points: [],
          resource_usage: {
            cpu_time: Date.now() - startTime,
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
  }

  /**
   * Perform semantic analysis of the task beyond keyword matching
   */
  private async performSemanticAnalysis(task: StrategicTask): Promise<{
    domain_confidence: { [domain: string]: number };
    complexity_indicators: string[];
    primary_intent: string;
  }> {
    const taskText = `${task.title} ${task.description}`.toLowerCase();
    
    // Analyze domain confidence using enhanced keyword analysis
    const domainConfidence = this.analyzeDomainConfidence(taskText);
    
    // Identify complexity indicators
    const complexityIndicators = this.identifyComplexityIndicators(taskText);
    
    // Determine primary intent
    const primaryIntent = this.determinePrimaryIntent(domainConfidence, task.priority);
    
    return {
      domain_confidence: domainConfidence,
      complexity_indicators: complexityIndicators,
      primary_intent: primaryIntent
    };
  }

  /**
   * Analyze domain confidence using enhanced techniques
   */
  private analyzeDomainConfidence(taskText: string): { [domain: string]: number } {
    const domainConfidence: { [domain: string]: number } = {
      financial: 0,
      technical: 0,
      marketing: 0,
      community: 0,
      strategic: 0
    };
    
    // Enhanced keyword analysis with weights
    Object.entries(this.delegationRules).forEach(([domainKey, rule]) => {
      const domain = domainKey.replace('_domain', '');
      let confidence = 0;
      
      rule.keywords.forEach(keyword => {
        if (taskText.includes(keyword)) {
          confidence += 0.2;
          // Boost for multiple occurrences
          const occurrences = (taskText.match(new RegExp(keyword, 'g')) || []).length;
          confidence += (occurrences - 1) * 0.1;
        }
      });
      
      domainConfidence[domain] = Math.min(confidence, 1.0);
    });
    
    return domainConfidence;
  }

  /**
   * Identify complexity indicators in the task
   */
  private identifyComplexityIndicators(taskText: string): string[] {
    const indicators: string[] = [];
    
    const complexityKeywords = {
      'high_complexity': ['complex', 'complicated', 'sophisticated', 'advanced'],
      'coordination_required': ['coordinate', 'collaborate', 'multiple', 'team'],
      'time_sensitive': ['urgent', 'immediate', 'asap', 'priority'],
      'strategic_impact': ['strategic', 'critical', 'important', 'key']
    };
    
    Object.entries(complexityKeywords).forEach(([indicator, keywords]) => {
      keywords.forEach(keyword => {
        if (taskText.includes(keyword)) {
          indicators.push(indicator);
        }
      });
    });
    
    return [...new Set(indicators)];
  }

  /**
   * Determine primary intent from analysis
   */
  private determinePrimaryIntent(
    domainConfidence: { [domain: string]: number },
    priority: string
  ): string {
    const primaryDomain = Object.entries(domainConfidence)
      .sort(([,a], [,b]) => b - a)[0][0];
    
    if (priority === 'critical') {
      return `urgent_${primaryDomain}_execution`;
    } else {
      return `standard_${primaryDomain}_task`;
    }
  }

  /**
   * Identify and rank candidate agents
   */
  private async identifyAndRankCandidates(
    task: StrategicTask,
    semanticAnalysis: any,
    decisionContext: DecisionContext
  ): Promise<Array<AgentRegistryEntry & { ranking_score: number }>> {
    const candidates: AgentRegistryEntry[] = [];
    
    // Map domains to agents
    const domainAgentMap = {
      'financial': 'CFO Cash',
      'technical': 'CTO Alex',
      'marketing': 'CMO Anova',
      'community': 'CCO Sage'
    };
    
    // Get candidates based on domain confidence
    Object.entries(semanticAnalysis.domain_confidence).forEach(([domain, confidence]) => {
      if (typeof confidence === 'number' && confidence > 0.3) {
        const agentName = domainAgentMap[domain];
        if (agentName) {
          const agentEntry = this.agentRegistry.get(agentName);
          if (agentEntry && agentEntry.current_status === 'available') {
            candidates.push(agentEntry);
          }
        }
      }
    });
    
    // Rank candidates
    return candidates.map(candidate => {
      const performanceScore = decisionContext.agent_performance_history[candidate.agent_name] || 0.5;
      const workloadScore = 1 - (decisionContext.current_workload[candidate.agent_name] || 0.5);
      const rankingScore = (performanceScore + workloadScore) / 2;
      
      return {
        ...candidate,
        ranking_score: rankingScore
      };
    }).sort((a, b) => b.ranking_score - a.ranking_score);
  }

  /**
   * Select optimal agents and execute delegation
   */
  private async selectAndDelegate(
    rankedCandidates: any[],
    task: StrategicTask,
    decisionContext: DecisionContext
  ): Promise<{
    selectedAgents: AgentTarget[];
    strategy: DecisionType;
    confidence_score: number;
    reasoning: string;
    estimated_completion: Date;
  }> {
    const selectedAgents: AgentTarget[] = [];
    
    if (rankedCandidates.length === 0) {
      throw new Error('No suitable agents found for delegation');
    }
    
    // Select agents based on task domain
    if (!Array.isArray(task.domain) && task.domain !== 'multi_domain') {
      const topCandidate = rankedCandidates[0];
      selectedAgents.push({
        agent_id: topCandidate.agent_id,
        agent_name: topCandidate.agent_name,
        role: 'primary_executor',
        responsibility: `Execute ${task.domain} task`,
        priority: 1,
        expected_contribution: 'Complete task execution'
      });
    } else {
      // Multi-domain coordination
      rankedCandidates.slice(0, 2).forEach((candidate, index) => {
        selectedAgents.push({
          agent_id: candidate.agent_id,
          agent_name: candidate.agent_name,
          role: index === 0 ? 'lead_coordinator' : 'supporting_agent',
          responsibility: `Handle domain-specific aspects`,
          priority: index + 1,
          expected_contribution: 'Domain expertise'
        });
      });
    }
    
    const strategy: DecisionType = selectedAgents.length === 1 ? 'delegate' : 'coordinate';
    
    // Calculate confidence
    const avgPerformance = selectedAgents.reduce((sum, agent) => {
      return sum + (decisionContext.agent_performance_history[agent.agent_name] || 0.5);
    }, 0) / selectedAgents.length;
    
    const confidence_score = Math.min(avgPerformance * (1 - task.complexity_score), 0.99);
    
    // Generate reasoning
    const agentNames = selectedAgents.map(agent => agent.agent_name).join(', ');
    const reasoning = `${strategy === 'delegate' ? 'Delegated' : 'Coordinated'} to ${agentNames} based on domain expertise and availability`;
    
    // Estimate completion
    let baseHours = 4 * (1 + task.complexity_score);
    if (selectedAgents.length > 1) baseHours *= 1.3;
    const estimated_completion = new Date(Date.now() + baseHours * 60 * 60 * 1000);
    
    return {
      selectedAgents,
      strategy,
      confidence_score,
      reasoning,
      estimated_completion
    };
  }

  /**
   * Initialize mock agent registry for testing
   */
  private initializeMockAgentRegistry(): void {
    const mockAgents = [
      {
        agent_id: 'cfo_cash',
        agent_name: 'CFO Cash',
        agent_type: 'FINANCIAL',
        capabilities: [
          { name: 'financial_analysis', description: 'Financial analysis and reporting', proficiency_level: 0.9, last_used: new Date(), success_rate: 0.92 }
        ],
        current_status: 'available' as const,
        performance_metrics: {
          tasks_completed: 150,
          average_response_time: 300,
          success_rate: 0.92,
          error_rate: 0.08,
          last_performance_review: new Date()
        },
        availability_score: 0.8,
        last_heartbeat: new Date(),
        reputation_score: 85
      },
      {
        agent_id: 'cto_alex',
        agent_name: 'CTO Alex',
        agent_type: 'TECHNICAL',
        capabilities: [
          { name: 'technical_architecture', description: 'Technical architecture and implementation', proficiency_level: 0.95, last_used: new Date(), success_rate: 0.88 }
        ],
        current_status: 'available' as const,
        performance_metrics: {
          tasks_completed: 200,
          average_response_time: 250,
          success_rate: 0.88,
          error_rate: 0.12,
          last_performance_review: new Date()
        },
        availability_score: 0.7,
        last_heartbeat: new Date(),
        reputation_score: 82
      },
      {
        agent_id: 'cmo_anova',
        agent_name: 'CMO Anova',
        agent_type: 'MARKETING',
        capabilities: [
          { name: 'marketing_strategy', description: 'Marketing strategy and campaigns', proficiency_level: 0.92, last_used: new Date(), success_rate: 0.95 }
        ],
        current_status: 'available' as const,
        performance_metrics: {
          tasks_completed: 120,
          average_response_time: 280,
          success_rate: 0.95,
          error_rate: 0.05,
          last_performance_review: new Date()
        },
        availability_score: 0.9,
        last_heartbeat: new Date(),
        reputation_score: 90
      },
      {
        agent_id: 'cco_sage',
        agent_name: 'CCO Sage',
        agent_type: 'COMMUNITY',
        capabilities: [
          { name: 'community_engagement', description: 'Community engagement and outreach', proficiency_level: 0.88, last_used: new Date(), success_rate: 0.89 }
        ],
        current_status: 'available' as const,
        performance_metrics: {
          tasks_completed: 100,
          average_response_time: 350,
          success_rate: 0.89,
          error_rate: 0.11,
          last_performance_review: new Date()
        },
        availability_score: 0.85,
        last_heartbeat: new Date(),
        reputation_score: 78
      }
    ];

    mockAgents.forEach(agent => {
      this.agentRegistry.set(agent.agent_name, agent);
    });
  }

  /**
   * Validate delegator functionality
   */
  public async validate(): Promise<boolean> {
    try {
      const testTask: StrategicTask = {
        id: 'test_delegation_001',
        title: 'Test Financial Analysis',
        description: 'Analyze quarterly budget for optimization opportunities',
        priority: 'medium',
        domain: 'financial',
        complexity_score: 0.5,
        resource_requirements: [],
        stakeholders: ['CFO'],
        strategic_implications: false,
        created_at: new Date(),
        updated_at: new Date()
      };
      
      const testContext: DecisionContext = {
        current_workload: { 'CFO Cash': 0.6 },
        agent_performance_history: { 'CFO Cash': 0.9 },
        resource_availability: {
          financial_budget: 50000,
          computational_capacity: 0.8,
          human_resources: 0.9,
          time_constraints: []
        },
        strategic_priorities: ['cost_optimization'],
        risk_factors: []
      };
      
      const result = await this.delegateTask(testTask, testContext);
      return result.success;
      
    } catch (error) {
      this.logger.error('Delegator validation failed:', error);
      return false;
    }
  }
}