/**
 * AgentSelector - Intelligent agent selection service
 * Implements sophisticated logic for selecting the most appropriate agent(s)
 * based on capabilities, availability, workload, and historical performance
 */

import {
  AgentCapability,
  AgentDomain,
  AvailabilityStatus,
  TaskAnalysisResult,
  RoutingTask,
  RoutingPolicy,
  WorkloadBalancingConfig,
  PerformanceMetrics,
  RoutingDecision,
  CoordinationStrategy,
  CoordinationStrategyType,
} from './types';

interface AgentSelectionCandidate {
  agent: AgentCapability;
  suitability_score: number;
  reasoning: string;
  availability_score: number;
  performance_score: number;
  workload_score: number;
  domain_match_score: number;
}

interface AgentSelectionResult {
  selected_agent: string;
  confidence_score: number;
  selection_reasoning: string;
  fallback_agents: string[];
  coordination_required: boolean;
  coordination_strategy?: CoordinationStrategy;
}

export class AgentSelector {
  private agentRegistry: Map<string, AgentCapability> = new Map();
  private routingPolicies: Record<string, RoutingPolicy> = {};
  private workloadConfig: WorkloadBalancingConfig;
  private coordinationStrategies: Record<string, CoordinationStrategy> = {};

  constructor(
    routingPolicies: Record<string, RoutingPolicy>,
    workloadConfig: WorkloadBalancingConfig,
    coordinationStrategies: Record<string, CoordinationStrategy>
  ) {
    this.routingPolicies = routingPolicies;
    this.workloadConfig = workloadConfig;
    this.coordinationStrategies = coordinationStrategies;
    
    // Initialize with mock agent data for simulation
    this.initializeMockAgents();
  }

  /**
   * Selects the most appropriate agent(s) for a task based on analysis results
   */
  public async selectAgent(
    task: RoutingTask,
    analysis: TaskAnalysisResult
  ): Promise<AgentSelectionResult> {
    console.log(`[AgentSelector] Selecting agent for task: ${task.id}`);

    // Get routing policy for primary domain
    const policy = this.routingPolicies[analysis.domain_classification.primary_domain];
    if (!policy) {
      throw new Error(`No routing policy found for domain: ${analysis.domain_classification.primary_domain}`);
    }

    // Handle multi-domain tasks
    if (analysis.domain_classification.multi_domain) {
      return this.handleMultiDomainSelection(task, analysis);
    }

    // Get candidate agents
    const candidates = await this.getCandidateAgents(analysis.domain_classification.primary_domain);
    
    // Score and rank candidates
    const scoredCandidates = await this.scoreCandidates(candidates, task, analysis, policy);
    
    // Select best candidate
    const selectedCandidate = scoredCandidates[0];
    
    if (!selectedCandidate || selectedCandidate.suitability_score < policy.confidence_threshold) {
      return this.handleFallbackSelection(task, analysis, policy, scoredCandidates);
    }

    const result: AgentSelectionResult = {
      selected_agent: selectedCandidate.agent.agent_id,
      confidence_score: selectedCandidate.suitability_score,
      selection_reasoning: selectedCandidate.reasoning,
      fallback_agents: this.getFallbackAgents(scoredCandidates.slice(1), policy),
      coordination_required: false
    };

    console.log(`[AgentSelector] Selected agent ${result.selected_agent} with confidence ${result.confidence_score}`);
    return result;
  }

  /**
   * Handles multi-domain task selection requiring coordination
   */
  private async handleMultiDomainSelection(
    task: RoutingTask,
    analysis: TaskAnalysisResult
  ): Promise<AgentSelectionResult> {
    console.log(`[AgentSelector] Handling multi-domain task: ${task.id}`);

    // Identify relevant domains (score > 0.3)
    const relevantDomains = analysis.domain_classification.domains
      .filter(d => d.score > 0.3)
      .sort((a, b) => b.score - a.score);

    if (relevantDomains.length < 2) {
      // Fallback to single domain selection
      return this.selectAgent(task, {
        ...analysis,
        domain_classification: {
          ...analysis.domain_classification,
          multi_domain: false
        }
      });
    }

    // Determine coordination strategy
    const strategy = this.determineCoordinationStrategy(task, analysis, relevantDomains);
    
    // Select primary agent from highest scoring domain
    const primaryDomain = relevantDomains[0].domain;
    const primaryPolicy = this.routingPolicies[primaryDomain];
    const primaryCandidates = await this.getCandidateAgents(primaryDomain);
    const primaryScoredCandidates = await this.scoreCandidates(primaryCandidates, task, analysis, primaryPolicy);
    
    const primaryAgent = primaryScoredCandidates[0];
    if (!primaryAgent) {
      throw new Error(`No suitable primary agent found for domain: ${primaryDomain}`);
    }

    // Calculate coordination confidence (slightly lower than single-domain)
    const coordinationPenalty = 0.15;
    const confidenceScore = Math.max(0.4, primaryAgent.suitability_score - coordinationPenalty);

    return {
      selected_agent: primaryAgent.agent.agent_id,
      confidence_score: confidenceScore,
      selection_reasoning: `Multi-domain coordination: Primary agent for ${primaryDomain} with ${relevantDomains.length} domain coordination`,
      fallback_agents: this.getFallbackAgents(primaryScoredCandidates.slice(1), primaryPolicy),
      coordination_required: true,
      coordination_strategy: strategy
    };
  }

  /**
   * Determines appropriate coordination strategy for multi-domain tasks
   */
  private determineCoordinationStrategy(
    task: RoutingTask,
    analysis: TaskAnalysisResult,
    relevantDomains: any[]
  ): CoordinationStrategy {
    // Check for dependencies or sequential requirements
    const hasSequentialKeywords = analysis.keywords.some(k => 
      ['after', 'following', 'then', 'subsequent', 'dependent', 'prerequisite'].includes(k.toLowerCase())
    );

    // Check for parallel execution indicators
    const hasParallelKeywords = analysis.keywords.some(k => 
      ['simultaneously', 'parallel', 'concurrent', 'together', 'same time'].includes(k.toLowerCase())
    );

    // Check for collaborative requirements
    const hasCollaborativeKeywords = analysis.keywords.some(k => 
      ['collaborate', 'coordinate', 'work together', 'joint', 'shared'].includes(k.toLowerCase())
    );

    // Determine strategy based on task characteristics
    if (hasSequentialKeywords || analysis.complexity_score > 0.8) {
      return this.coordinationStrategies['sequential_execution'] || this.getDefaultSequentialStrategy();
    } else if (hasParallelKeywords && relevantDomains.length <= 3) {
      return this.coordinationStrategies['parallel_execution'] || this.getDefaultParallelStrategy();
    } else if (hasCollaborativeKeywords || analysis.complexity_score > 0.6) {
      return this.coordinationStrategies['collaborative_execution'] || this.getDefaultCollaborativeStrategy();
    }

    // Default to parallel for efficiency
    return this.coordinationStrategies['parallel_execution'] || this.getDefaultParallelStrategy();
  }

  /**
   * Gets candidate agents for a specific domain
   */
  private async getCandidateAgents(domain: AgentDomain): Promise<AgentCapability[]> {
    const candidates: AgentCapability[] = [];
    
    for (const agent of this.agentRegistry.values()) {
      if (agent.domain === domain || agent.expertise_areas.includes(domain)) {
        candidates.push(agent);
      }
    }

    return candidates;
  }

  /**
   * Scores and ranks candidate agents based on multiple factors
   */
  private async scoreCandidates(
    candidates: AgentCapability[],
    task: RoutingTask,
    analysis: TaskAnalysisResult,
    policy: RoutingPolicy
  ): Promise<AgentSelectionCandidate[]> {
    const scoredCandidates: AgentSelectionCandidate[] = [];

    for (const agent of candidates) {
      const domainMatchScore = this.calculateDomainMatchScore(agent, analysis);
      const availabilityScore = this.calculateAvailabilityScore(agent);
      const performanceScore = this.calculatePerformanceScore(agent, analysis);
      const workloadScore = this.calculateWorkloadScore(agent);

      // Weighted overall score
      const suitabilityScore = (
        domainMatchScore * 0.35 +
        availabilityScore * 0.25 +
        performanceScore * 0.25 +
        workloadScore * 0.15
      );

      const reasoning = this.generateSelectionReasoning(
        agent,
        domainMatchScore,
        availabilityScore,
        performanceScore,
        workloadScore,
        suitabilityScore
      );

      scoredCandidates.push({
        agent,
        suitability_score: suitabilityScore,
        reasoning,
        availability_score: availabilityScore,
        performance_score: performanceScore,
        workload_score: workloadScore,
        domain_match_score: domainMatchScore
      });
    }

    // Sort by suitability score (descending)
    return scoredCandidates.sort((a, b) => b.suitability_score - a.suitability_score);
  }

  /**
   * Calculates domain match score based on agent expertise
   */
  private calculateDomainMatchScore(agent: AgentCapability, analysis: TaskAnalysisResult): number {
    let score = 0;

    // Primary domain match
    if (agent.domain === analysis.domain_classification.primary_domain) {
      score += 0.6;
    }

    // Expertise area matches
    const matchingExpertise = agent.expertise_areas.filter(area =>
      analysis.keywords.some(keyword => area.toLowerCase().includes(keyword.toLowerCase()))
    );
    score += (matchingExpertise.length / Math.max(agent.expertise_areas.length, 1)) * 0.4;

    return Math.min(1.0, score);
  }

  /**
   * Calculates availability score based on agent status and workload
   */
  private calculateAvailabilityScore(agent: AgentCapability): number {
    // Base score from availability status
    const statusScores = {
      [AvailabilityStatus.AVAILABLE]: 1.0,
      [AvailabilityStatus.BUSY]: 0.6,
      [AvailabilityStatus.OFFLINE]: 0.0,
      [AvailabilityStatus.MAINTENANCE]: 0.0
    };

    let score = statusScores[agent.availability_status] || 0;

    // Adjust for current workload
    const workloadRatio = agent.current_workload / agent.max_concurrent_tasks;
    if (workloadRatio < 0.5) {
      score *= 1.0; // No penalty for low workload
    } else if (workloadRatio < 0.8) {
      score *= 0.8; // Slight penalty for medium workload
    } else {
      score *= 0.5; // Significant penalty for high workload
    }

    return score;
  }

  /**
   * Calculates performance score based on historical metrics
   */
  private calculatePerformanceScore(agent: AgentCapability, analysis: TaskAnalysisResult): number {
    const metrics = agent.performance_metrics;
    let score = 0;

    // Success rate (40% weight)
    score += metrics.success_rate * 0.4;

    // Quality score (30% weight)
    score += metrics.quality_score * 0.3;

    // Recent performance trend (20% weight)
    score += Math.max(0, metrics.recent_performance_trend) * 0.2;

    // Domain-specific performance (10% weight)
    const domainScore = metrics.domain_specific_scores[analysis.domain_classification.primary_domain] || 0.5;
    score += domainScore * 0.1;

    return Math.min(1.0, score);
  }

  /**
   * Calculates workload score (higher score for lower workload)
   */
  private calculateWorkloadScore(agent: AgentCapability): number {
    const workloadRatio = agent.current_workload / agent.max_concurrent_tasks;
    return Math.max(0, 1 - workloadRatio);
  }

  /**
   * Handles fallback selection when primary selection fails
   */
  private handleFallbackSelection(
    task: RoutingTask,
    analysis: TaskAnalysisResult,
    policy: RoutingPolicy,
    scoredCandidates: AgentSelectionCandidate[]
  ): AgentSelectionResult {
    console.log(`[AgentSelector] Primary selection failed, using fallback for task: ${task.id}`);

    // Try fallback agents from policy
    for (const fallbackAgentId of policy.fallback_agents) {
      const fallbackAgent = this.agentRegistry.get(fallbackAgentId);
      if (fallbackAgent && fallbackAgent.availability_status === AvailabilityStatus.AVAILABLE) {
        return {
          selected_agent: fallbackAgentId,
          confidence_score: this.workloadConfig.fallback_threshold,
          selection_reasoning: `Fallback selection: Primary agents unavailable, using fallback agent`,
          fallback_agents: policy.fallback_agents.filter(id => id !== fallbackAgentId),
          coordination_required: false
        };
      }
    }

    // Use best available candidate even if below threshold
    if (scoredCandidates.length > 0) {
      const bestCandidate = scoredCandidates[0];
      return {
        selected_agent: bestCandidate.agent.agent_id,
        confidence_score: bestCandidate.suitability_score,
        selection_reasoning: `Low confidence selection: ${bestCandidate.reasoning}`,
        fallback_agents: this.getFallbackAgents(scoredCandidates.slice(1), policy),
        coordination_required: false
      };
    }

    // No agents available - escalation required
    throw new Error(`No suitable agents available for domain: ${analysis.domain_classification.primary_domain}`);
  }

  /**
   * Gets fallback agents from scored candidates and policy
   */
  private getFallbackAgents(
    remainingCandidates: AgentSelectionCandidate[],
    policy: RoutingPolicy
  ): string[] {
    const fallbacks: string[] = [];

    // Add top remaining candidates
    remainingCandidates.slice(0, 2).forEach(candidate => {
      fallbacks.push(candidate.agent.agent_id);
    });

    // Add policy fallbacks
    policy.fallback_agents.forEach(agentId => {
      if (!fallbacks.includes(agentId)) {
        fallbacks.push(agentId);
      }
    });

    return fallbacks.slice(0, 3); // Limit to 3 fallbacks
  }

  /**
   * Generates human-readable selection reasoning
   */
  private generateSelectionReasoning(
    agent: AgentCapability,
    domainScore: number,
    availabilityScore: number,
    performanceScore: number,
    workloadScore: number,
    overallScore: number
  ): string {
    const strengths: string[] = [];
    const concerns: string[] = [];

    if (domainScore > 0.8) strengths.push('excellent domain match');
    else if (domainScore > 0.6) strengths.push('good domain match');
    else concerns.push('limited domain expertise');

    if (availabilityScore > 0.8) strengths.push('highly available');
    else if (availabilityScore > 0.5) strengths.push('available');
    else concerns.push('limited availability');

    if (performanceScore > 0.8) strengths.push('excellent performance history');
    else if (performanceScore > 0.6) strengths.push('good performance');
    else concerns.push('performance concerns');

    if (workloadScore > 0.7) strengths.push('low workload');
    else if (workloadScore < 0.3) concerns.push('high workload');

    let reasoning = `Overall score: ${overallScore.toFixed(2)} - `;
    
    if (strengths.length > 0) {
      reasoning += `Strengths: ${strengths.join(', ')}`;
    }
    
    if (concerns.length > 0) {
      reasoning += strengths.length > 0 ? `. Concerns: ${concerns.join(', ')}` : `Concerns: ${concerns.join(', ')}`;
    }

    return reasoning;
  }

  /**
   * Updates agent registry with new or updated agent information
   */
  public updateAgentRegistry(agents: AgentCapability[]): void {
    agents.forEach(agent => {
      this.agentRegistry.set(agent.agent_id, agent);
    });
    console.log(`[AgentSelector] Updated agent registry with ${agents.length} agents`);
  }

  /**
   * Gets current agent availability status
   */
  public getAgentAvailability(): Record<string, AvailabilityStatus> {
    const availability: Record<string, AvailabilityStatus> = {};
    for (const [agentId, agent] of this.agentRegistry) {
      availability[agentId] = agent.availability_status;
    }
    return availability;
  }

  /**
   * Initializes mock agent data for simulation and testing
   */
  private initializeMockAgents(): void {
    const mockAgents: AgentCapability[] = [
      {
        agent_id: 'ceo-mimi',
        agent_name: 'CEO Mimi',
        domain: AgentDomain.STRATEGIC,
        expertise_areas: ['strategic planning', 'vision', 'leadership', 'decision making'],
        current_workload: 2,
        max_concurrent_tasks: 5,
        availability_status: AvailabilityStatus.AVAILABLE,
        performance_metrics: {
          total_tasks_completed: 150,
          success_rate: 0.95,
          average_completion_time: 3600000, // 1 hour in ms
          domain_specific_scores: { [AgentDomain.STRATEGIC]: 0.95 },
          recent_performance_trend: 0.1,
          quality_score: 0.92
        },
        last_updated: new Date()
      },
      {
        agent_id: 'cfo-cash',
        agent_name: 'CFO Cash',
        domain: AgentDomain.FINANCIAL,
        expertise_areas: ['financial analysis', 'budget management', 'cost optimization', 'investment'],
        current_workload: 1,
        max_concurrent_tasks: 4,
        availability_status: AvailabilityStatus.AVAILABLE,
        performance_metrics: {
          total_tasks_completed: 200,
          success_rate: 0.93,
          average_completion_time: 2700000, // 45 minutes in ms
          domain_specific_scores: { [AgentDomain.FINANCIAL]: 0.96 },
          recent_performance_trend: 0.05,
          quality_score: 0.94
        },
        last_updated: new Date()
      },
      {
        agent_id: 'cto-alex',
        agent_name: 'CTO Alex',
        domain: AgentDomain.TECHNICAL,
        expertise_areas: ['software development', 'architecture', 'security', 'infrastructure'],
        current_workload: 3,
        max_concurrent_tasks: 6,
        availability_status: AvailabilityStatus.BUSY,
        performance_metrics: {
          total_tasks_completed: 300,
          success_rate: 0.91,
          average_completion_time: 5400000, // 1.5 hours in ms
          domain_specific_scores: { [AgentDomain.TECHNICAL]: 0.94 },
          recent_performance_trend: 0.02,
          quality_score: 0.89
        },
        last_updated: new Date()
      },
      {
        agent_id: 'cmo-anova',
        agent_name: 'CMO Anova',
        domain: AgentDomain.MARKETING,
        expertise_areas: ['marketing campaigns', 'brand management', 'customer engagement', 'growth'],
        current_workload: 2,
        max_concurrent_tasks: 5,
        availability_status: AvailabilityStatus.AVAILABLE,
        performance_metrics: {
          total_tasks_completed: 180,
          success_rate: 0.89,
          average_completion_time: 4200000, // 70 minutes in ms
          domain_specific_scores: { [AgentDomain.MARKETING]: 0.91 },
          recent_performance_trend: 0.08,
          quality_score: 0.87
        },
        last_updated: new Date()
      },
      {
        agent_id: 'cco-sage',
        agent_name: 'CCO Sage',
        domain: AgentDomain.COMMUNITY,
        expertise_areas: ['community management', 'stakeholder relations', 'governance', 'partnerships'],
        current_workload: 1,
        max_concurrent_tasks: 4,
        availability_status: AvailabilityStatus.AVAILABLE,
        performance_metrics: {
          total_tasks_completed: 120,
          success_rate: 0.92,
          average_completion_time: 3000000, // 50 minutes in ms
          domain_specific_scores: { [AgentDomain.COMMUNITY]: 0.93 },
          recent_performance_trend: 0.12,
          quality_score: 0.90
        },
        last_updated: new Date()
      }
    ];

    this.updateAgentRegistry(mockAgents);
  }

  // Default coordination strategies
  private getDefaultSequentialStrategy(): CoordinationStrategy {
    return {
      strategy_type: CoordinationStrategyType.SEQUENTIAL,
      description: 'Tasks executed one after another with dependencies',
      use_cases: ['Financial analysis followed by strategic planning', 'Technical implementation after security review']
    };
  }

  private getDefaultParallelStrategy(): CoordinationStrategy {
    return {
      strategy_type: CoordinationStrategyType.PARALLEL,
      description: 'Independent tasks executed simultaneously',
      use_cases: ['Marketing campaign with separate technical feature development', 'Community outreach with financial planning']
    };
  }

  private getDefaultCollaborativeStrategy(): CoordinationStrategy {
    return {
      strategy_type: CoordinationStrategyType.COLLABORATIVE,
      description: 'Agents work together on complex multi-domain tasks',
      use_cases: ['Product launch requiring technical, marketing, and financial coordination', 'Strategic initiative with legal and operational components']
    };
  }
}