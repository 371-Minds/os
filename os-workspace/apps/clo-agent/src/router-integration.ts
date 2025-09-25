import type {
  CLOAgentConfig,
  LegalTask,
  LegalDomain,
  LegalTaskType,
  TaskPriority
} from './types.js';

/**
 * Adaptive LLM Router Integration
 * 
 * Provides cost-optimized legal analysis by routing tasks to the most
 * appropriate LLM provider based on complexity, cost, and accuracy requirements.
 */
export class RouterIntegration {
  private config: CLOAgentConfig;
  private providerMetrics: Map<string, ProviderMetrics> = new Map();
  private costTracker: CostTracker;

  constructor(config: CLOAgentConfig) {
    this.config = config;
    this.costTracker = new CostTracker();
    this.initializeProviderMetrics();
    console.log('Adaptive LLM Router Integration initialized');
  }

  /**
   * Route legal analysis task to optimal LLM provider
   */
  async routeLegalAnalysis(task: LegalTask, analysisType: LegalAnalysisType): Promise<LLMAnalysisResult> {
    console.log(`Routing legal analysis for task ${task.id}, type: ${analysisType}`);

    // Determine optimal provider based on task characteristics
    const optimalProvider = await this.selectOptimalProvider(task, analysisType);
    
    // Track routing decision
    const routingDecision: RoutingDecision = {
      taskId: task.id,
      analysisType,
      selectedProvider: optimalProvider.name,
      routingReason: optimalProvider.reason,
      estimatedCost: optimalProvider.estimatedCost,
      expectedAccuracy: optimalProvider.expectedAccuracy,
      timestamp: new Date()
    };

    console.log(`Selected provider: ${optimalProvider.name} (${optimalProvider.reason})`);

    try {
      // Execute analysis with selected provider
      const analysisResult = await this.executeLegalAnalysis(task, analysisType, optimalProvider);
      
      // Update provider metrics
      this.updateProviderMetrics(optimalProvider.name, analysisResult, true);
      
      // Track costs
      this.costTracker.recordUsage(routingDecision, analysisResult.actualCost);

      return analysisResult;

    } catch (error) {
      console.error(`Analysis failed with provider ${optimalProvider.name}:`, error);
      
      // Update metrics for failure
      this.updateProviderMetrics(optimalProvider.name, null, false);
      
      // Attempt fallback
      return this.attemptFallbackAnalysis(task, analysisType, optimalProvider);
    }
  }

  /**
   * Initialize provider performance metrics
   */
  private initializeProviderMetrics(): void {
    // GPT-4 Metrics (Premium, high accuracy)
    this.providerMetrics.set('gpt-4', {
      provider: 'gpt-4',
      averageAccuracy: 0.95,
      averageResponseTime: 3000, // 3 seconds
      costPerToken: 0.03,
      successRate: 0.98,
      specialties: ['contract_review', 'regulatory_analysis', 'complex_compliance'],
      reliability: 0.98,
      lastUpdated: new Date()
    });

    // Claude-3 Metrics (High quality, good for analysis)
    this.providerMetrics.set('claude-3', {
      provider: 'claude-3',
      averageAccuracy: 0.93,
      averageResponseTime: 2500, // 2.5 seconds
      costPerToken: 0.025,
      successRate: 0.96,
      specialties: ['policy_analysis', 'governance_review', 'risk_assessment'],
      reliability: 0.96,
      lastUpdated: new Date()
    });

    // GPT-3.5 Turbo Metrics (Cost-effective, fast)
    this.providerMetrics.set('gpt-3.5-turbo', {
      provider: 'gpt-3.5-turbo',
      averageAccuracy: 0.85,
      averageResponseTime: 1500, // 1.5 seconds
      costPerToken: 0.002,
      successRate: 0.94,
      specialties: ['basic_compliance', 'document_review', 'simple_analysis'],
      reliability: 0.94,
      lastUpdated: new Date()
    });

    // Local/Edge Model Metrics (Very cost-effective)
    this.providerMetrics.set('local-llm', {
      provider: 'local-llm',
      averageAccuracy: 0.75,
      averageResponseTime: 1000, // 1 second
      costPerToken: 0.0001,
      successRate: 0.90,
      specialties: ['routine_checks', 'document_classification', 'basic_validation'],
      reliability: 0.90,
      lastUpdated: new Date()
    });

    console.log('Provider metrics initialized for 4 LLM providers');
  }

  /**
   * Select optimal provider for legal analysis
   */
  private async selectOptimalProvider(task: LegalTask, analysisType: LegalAnalysisType): Promise<ProviderSelection> {
    const candidates = Array.from(this.providerMetrics.values());
    const scoredProviders: ScoredProvider[] = [];

    for (const provider of candidates) {
      const score = this.calculateProviderScore(task, analysisType, provider);
      scoredProviders.push({
        provider,
        score,
        reasoning: this.generateSelectionReasoning(task, analysisType, provider, score)
      });
    }

    // Sort by score (highest first)
    scoredProviders.sort((a, b) => b.score - a.score);
    const selectedProvider = scoredProviders[0];

    return {
      name: selectedProvider.provider.provider,
      reason: selectedProvider.reasoning,
      estimatedCost: this.estimateAnalysisCost(task, analysisType, selectedProvider.provider),
      expectedAccuracy: selectedProvider.provider.averageAccuracy,
      fallbackProviders: scoredProviders.slice(1, 3).map(sp => sp.provider.provider)
    };
  }

  /**
   * Calculate provider suitability score
   */
  private calculateProviderScore(task: LegalTask, analysisType: LegalAnalysisType, provider: ProviderMetrics): number {
    let score = 0;

    // Base accuracy weight (40%)
    score += provider.averageAccuracy * 40;

    // Specialty match weight (30%)
    const specialtyMatch = this.calculateSpecialtyMatch(analysisType, provider.specialties);
    score += specialtyMatch * 30;

    // Cost efficiency weight (20%)
    const costEfficiency = this.calculateCostEfficiency(task, provider);
    score += costEfficiency * 20;

    // Reliability weight (10%)
    score += provider.reliability * 10;

    // Priority adjustments
    if (task.priority === 'critical') {
      // Prioritize accuracy and reliability for critical tasks
      score = score * 0.7 + (provider.averageAccuracy * 0.5 + provider.reliability * 0.5) * 30;
    } else if (task.priority === 'low') {
      // Prioritize cost efficiency for low priority tasks
      score = score * 0.8 + costEfficiency * 20;
    }

    return Math.min(100, Math.max(0, score)); // Normalize to 0-100
  }

  /**
   * Calculate specialty match score
   */
  private calculateSpecialtyMatch(analysisType: LegalAnalysisType, specialties: string[]): number {
    const analysisTypeMap: Record<LegalAnalysisType, string[]> = {
      'compliance_assessment': ['basic_compliance', 'complex_compliance', 'regulatory_analysis'],
      'contract_review': ['contract_review', 'document_review'],
      'risk_assessment': ['risk_assessment', 'policy_analysis'],
      'policy_validation': ['policy_analysis', 'governance_review'],
      'regulatory_analysis': ['regulatory_analysis', 'complex_compliance'],
      'document_analysis': ['document_review', 'basic_compliance'],
      'governance_review': ['governance_review', 'policy_analysis']
    };

    const relevantSpecialties = analysisTypeMap[analysisType] || [];
    const matchCount = specialties.filter(specialty => 
      relevantSpecialties.includes(specialty)
    ).length;

    return Math.min(1.0, matchCount / Math.max(1, relevantSpecialties.length));
  }

  /**
   * Calculate cost efficiency score
   */
  private calculateCostEfficiency(task: LegalTask, provider: ProviderMetrics): number {
    // Estimate token usage based on task complexity
    const estimatedTokens = this.estimateTokenUsage(task);
    const estimatedCost = estimatedTokens * provider.costPerToken;
    
    // Budget consideration
    const budgetThreshold = this.getBudgetThreshold(task);
    
    if (estimatedCost <= budgetThreshold * 0.3) return 1.0; // Very cost efficient
    if (estimatedCost <= budgetThreshold * 0.6) return 0.8; // Good efficiency
    if (estimatedCost <= budgetThreshold) return 0.5; // Acceptable
    return 0.2; // Expensive
  }

  /**
   * Generate selection reasoning
   */
  private generateSelectionReasoning(task: LegalTask, analysisType: LegalAnalysisType, provider: ProviderMetrics, score: number): string {
    const reasons: string[] = [];

    if (score >= 80) {
      reasons.push('Optimal match for task requirements');
    } else if (score >= 60) {
      reasons.push('Good balance of accuracy and cost');
    } else {
      reasons.push('Best available option');
    }

    if (provider.specialties.some(s => s.includes(analysisType.split('_')[0]))) {
      reasons.push(`Specialized in ${analysisType}`);
    }

    if (task.priority === 'critical' && provider.averageAccuracy >= 0.95) {
      reasons.push('High accuracy required for critical task');
    }

    if (task.priority === 'low' && provider.costPerToken <= 0.005) {
      reasons.push('Cost-optimized for low priority task');
    }

    return reasons.join(', ');
  }

  /**
   * Execute legal analysis with selected provider
   */
  private async executeLegalAnalysis(task: LegalTask, analysisType: LegalAnalysisType, provider: ProviderSelection): Promise<LLMAnalysisResult> {
    const startTime = Date.now();
    
    // Mock LLM analysis execution
    console.log(`Executing ${analysisType} analysis with ${provider.name}`);
    
    // Simulate processing time based on provider characteristics
    const processingTime = this.simulateProcessingTime(provider.name);
    await new Promise(resolve => setTimeout(resolve, processingTime));

    // Generate mock analysis result
    const analysisResult = this.generateMockAnalysisResult(task, analysisType, provider);
    
    const actualCost = this.calculateActualCost(task, provider.name, Date.now() - startTime);

    return {
      taskId: task.id,
      analysisType,
      provider: provider.name,
      result: analysisResult,
      confidence: provider.expectedAccuracy,
      processingTime: Date.now() - startTime,
      actualCost,
      metadata: {
        tokenUsage: this.estimateTokenUsage(task),
        modelVersion: this.getModelVersion(provider.name),
        timestamp: new Date()
      }
    };
  }

  /**
   * Attempt fallback analysis if primary provider fails
   */
  private async attemptFallbackAnalysis(task: LegalTask, analysisType: LegalAnalysisType, failedProvider: ProviderSelection): Promise<LLMAnalysisResult> {
    console.log(`Attempting fallback analysis for task ${task.id}`);
    
    for (const fallbackProviderName of failedProvider.fallbackProviders) {
      try {
        const fallbackProvider = this.providerMetrics.get(fallbackProviderName);
        if (!fallbackProvider) continue;

        console.log(`Trying fallback provider: ${fallbackProviderName}`);
        
        const fallbackSelection: ProviderSelection = {
          name: fallbackProviderName,
          reason: 'Fallback after primary provider failure',
          estimatedCost: this.estimateAnalysisCost(task, analysisType, fallbackProvider),
          expectedAccuracy: fallbackProvider.averageAccuracy,
          fallbackProviders: []
        };

        const result = await this.executeLegalAnalysis(task, analysisType, fallbackSelection);
        
        console.log(`Fallback analysis successful with ${fallbackProviderName}`);
        return result;

      } catch (error) {
        console.error(`Fallback provider ${fallbackProviderName} also failed:`, error);
        continue;
      }
    }

    throw new Error(`All providers failed for task ${task.id}`);
  }

  /**
   * Update provider performance metrics
   */
  private updateProviderMetrics(providerName: string, result: LLMAnalysisResult | null, success: boolean): void {
    const metrics = this.providerMetrics.get(providerName);
    if (!metrics) return;

    // Update success rate
    const alpha = 0.1; // Learning rate
    metrics.successRate = metrics.successRate * (1 - alpha) + (success ? 1 : 0) * alpha;

    if (result) {
      // Update response time
      metrics.averageResponseTime = metrics.averageResponseTime * (1 - alpha) + result.processingTime * alpha;
      
      // Update accuracy (based on confidence)
      metrics.averageAccuracy = metrics.averageAccuracy * (1 - alpha) + result.confidence * alpha;
    }

    metrics.lastUpdated = new Date();
    console.log(`Updated metrics for provider ${providerName}`);
  }

  // Helper methods

  private estimateTokenUsage(task: LegalTask): number {
    // Base token estimate
    let tokens = 500; // Base prompt

    // Add tokens based on task description length
    tokens += Math.ceil(task.description.length / 4); // ~4 chars per token

    // Add tokens based on task complexity
    switch (task.type) {
      case 'compliance_assessment': tokens += 1000; break;
      case 'contract_review': tokens += 2000; break;
      case 'risk_assessment': tokens += 1500; break;
      case 'policy_validation': tokens += 800; break;
      case 'regulatory_analysis': tokens += 2500; break;
      default: tokens += 1000;
    }

    // Add tokens based on domain complexity
    switch (task.domain) {
      case 'data_privacy': tokens += 500; break;
      case 'financial_compliance': tokens += 800; break;
      case 'healthcare_compliance': tokens += 700; break;
      case 'security_compliance': tokens += 600; break;
      default: tokens += 400;
    }

    return tokens;
  }

  private getBudgetThreshold(task: LegalTask): number {
    // Budget allocation based on task priority
    switch (task.priority) {
      case 'critical': return 100; // $100
      case 'high': return 50; // $50
      case 'medium': return 25; // $25
      case 'low': return 10; // $10
      default: return 25;
    }
  }

  private estimateAnalysisCost(task: LegalTask, analysisType: LegalAnalysisType, provider: ProviderMetrics): number {
    const estimatedTokens = this.estimateTokenUsage(task);
    return estimatedTokens * provider.costPerToken;
  }

  private simulateProcessingTime(providerName: string): number {
    const baseTime = this.providerMetrics.get(providerName)?.averageResponseTime || 2000;
    // Add some random variation (±20%)
    return Math.floor(baseTime * (0.8 + Math.random() * 0.4));
  }

  private generateMockAnalysisResult(task: LegalTask, analysisType: LegalAnalysisType, provider: ProviderSelection): any {
    // Generate realistic mock analysis based on type
    const baseResult = {
      summary: `${analysisType} completed for ${task.domain} domain`,
      findings: [],
      recommendations: [],
      confidence: provider.expectedAccuracy
    };

    // Add type-specific content
    switch (analysisType) {
      case 'compliance_assessment':
        baseResult.findings.push('GDPR consent mechanism requires review');
        baseResult.recommendations.push('Implement granular consent controls');
        break;
      case 'contract_review':
        baseResult.findings.push('Liability clauses need clarification');
        baseResult.recommendations.push('Add indemnification provisions');
        break;
      case 'risk_assessment':
        baseResult.findings.push('Medium regulatory risk identified');
        baseResult.recommendations.push('Implement monitoring controls');
        break;
    }

    return baseResult;
  }

  private calculateActualCost(task: LegalTask, providerName: string, processingTime: number): number {
    const provider = this.providerMetrics.get(providerName);
    if (!provider) return 0;

    const tokenUsage = this.estimateTokenUsage(task);
    return tokenUsage * provider.costPerToken;
  }

  private getModelVersion(providerName: string): string {
    const versions: Record<string, string> = {
      'gpt-4': 'gpt-4-0125-preview',
      'claude-3': 'claude-3-opus-20240229',
      'gpt-3.5-turbo': 'gpt-3.5-turbo-0125',
      'local-llm': 'local-model-v1.0'
    };
    return versions[providerName] || 'unknown';
  }

  /**
   * Get cost analytics
   */
  getCostAnalytics(): CostAnalytics {
    return this.costTracker.getAnalytics();
  }

  /**
   * Get provider performance summary
   */
  getProviderPerformance(): ProviderPerformanceSummary[] {
    return Array.from(this.providerMetrics.values()).map(metrics => ({
      provider: metrics.provider,
      averageAccuracy: metrics.averageAccuracy,
      averageResponseTime: metrics.averageResponseTime,
      successRate: metrics.successRate,
      costPerToken: metrics.costPerToken,
      totalUsage: this.costTracker.getProviderUsage(metrics.provider)
    }));
  }

  /**
   * Shutdown router integration
   */
  async shutdown(): Promise<void> {
    console.log('Adaptive LLM Router Integration shutdown completed');
  }
}

/**
 * Cost Tracker
 * 
 * Tracks and analyzes LLM usage costs for optimization insights.
 */
class CostTracker {
  private usageHistory: RoutingDecision[] = [];
  private costByProvider: Map<string, number> = new Map();
  private usageByProvider: Map<string, number> = new Map();

  recordUsage(decision: RoutingDecision, actualCost: number): void {
    decision.actualCost = actualCost;
    this.usageHistory.push(decision);

    // Update provider totals
    const currentCost = this.costByProvider.get(decision.selectedProvider) || 0;
    this.costByProvider.set(decision.selectedProvider, currentCost + actualCost);

    const currentUsage = this.usageByProvider.get(decision.selectedProvider) || 0;
    this.usageByProvider.set(decision.selectedProvider, currentUsage + 1);
  }

  getAnalytics(): CostAnalytics {
    const totalCost = Array.from(this.costByProvider.values()).reduce((sum, cost) => sum + cost, 0);
    const totalRequests = this.usageHistory.length;

    return {
      totalCost,
      totalRequests,
      averageCostPerRequest: totalRequests > 0 ? totalCost / totalRequests : 0,
      costByProvider: Object.fromEntries(this.costByProvider),
      usageByProvider: Object.fromEntries(this.usageByProvider),
      savingsFromOptimization: this.calculateOptimizationSavings(),
      period: {
        start: this.usageHistory[0]?.timestamp || new Date(),
        end: new Date()
      }
    };
  }

  getProviderUsage(provider: string): number {
    return this.usageByProvider.get(provider) || 0;
  }

  private calculateOptimizationSavings(): number {
    // Calculate potential savings by comparing with always using most expensive provider
    const mostExpensiveProvider = 'gpt-4';
    const mostExpensiveCostPerToken = 0.03;
    
    let potentialCost = 0;
    let actualCost = 0;

    for (const decision of this.usageHistory) {
      // Estimate tokens used (simplified)
      const estimatedTokens = 1000; // Average estimate
      potentialCost += estimatedTokens * mostExpensiveCostPerToken;
      actualCost += decision.actualCost || 0;
    }

    return Math.max(0, potentialCost - actualCost);
  }
}

// Supporting types and interfaces

export type LegalAnalysisType = 
  | 'compliance_assessment'
  | 'contract_review'
  | 'risk_assessment'
  | 'policy_validation'
  | 'regulatory_analysis'
  | 'document_analysis'
  | 'governance_review';

interface ProviderMetrics {
  provider: string;
  averageAccuracy: number;
  averageResponseTime: number; // milliseconds
  costPerToken: number;
  successRate: number;
  specialties: string[];
  reliability: number;
  lastUpdated: Date;
}

interface ProviderSelection {
  name: string;
  reason: string;
  estimatedCost: number;
  expectedAccuracy: number;
  fallbackProviders: string[];
}

interface ScoredProvider {
  provider: ProviderMetrics;
  score: number;
  reasoning: string;
}

interface RoutingDecision {
  taskId: string;
  analysisType: LegalAnalysisType;
  selectedProvider: string;
  routingReason: string;
  estimatedCost: number;
  expectedAccuracy: number;
  timestamp: Date;
  actualCost?: number;
}

interface LLMAnalysisResult {
  taskId: string;
  analysisType: LegalAnalysisType;
  provider: string;
  result: any;
  confidence: number;
  processingTime: number;
  actualCost: number;
  metadata: {
    tokenUsage: number;
    modelVersion: string;
    timestamp: Date;
  };
}

interface CostAnalytics {
  totalCost: number;
  totalRequests: number;
  averageCostPerRequest: number;
  costByProvider: Record<string, number>;
  usageByProvider: Record<string, number>;
  savingsFromOptimization: number;
  period: {
    start: Date;
    end: Date;
  };
}

interface ProviderPerformanceSummary {
  provider: string;
  averageAccuracy: number;
  averageResponseTime: number;
  successRate: number;
  costPerToken: number;
  totalUsage: number;
}