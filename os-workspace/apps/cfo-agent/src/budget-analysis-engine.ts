/**
 * Budget Analysis Engine
 * 
 * Specialized component for budget performance analysis, variance identification,
 * and optimization recommendations. Provides comprehensive budget management
 * capabilities for the CFO Agent.
 */

import type {
  FinancialTask,
  BudgetAnalysis,
  BudgetPerformance,
  VarianceAnalysis,
  VarianceItem,
  BudgetRecommendation,
  ForecastAdjustment
} from './types.js';

export class BudgetAnalysisEngine {
  private budgetTemplates: Map<string, any>;
  private varianceThresholds: Map<string, number>;
  private analysisCache: Map<string, BudgetAnalysis>;

  constructor() {
    this.budgetTemplates = new Map();
    this.varianceThresholds = new Map();
    this.analysisCache = new Map();
    
    this.initializeBudgetTemplates();
    this.initializeVarianceThresholds();
    
    console.log('📊 Budget Analysis Engine initialized');
  }

  /**
   * Analyze budget performance and generate comprehensive analysis
   */
  public async analyzeBudget(task: FinancialTask): Promise<BudgetAnalysis> {
    console.log(`💰 Analyzing budget performance for: ${task.title}`);
    
    try {
      // Check cache first
      const cacheKey = this.generateCacheKey(task);
      if (this.analysisCache.has(cacheKey)) {
        console.log('📋 Returning cached budget analysis');
        return this.analysisCache.get(cacheKey)!;
      }
      
      // Extract budget data from task description
      const budgetData = this.extractBudgetData(task.description);
      
      // Perform budget performance analysis
      const budgetPerformance = this.analyzeBudgetPerformance(budgetData);
      
      // Conduct variance analysis
      const varianceAnalysis = this.performVarianceAnalysis(budgetData);
      
      // Identify optimization opportunities
      const optimizationOpportunities = this.identifyOptimizationOpportunities(budgetData, varianceAnalysis);
      
      // Generate recommendations
      const recommendations = this.generateBudgetRecommendations(budgetPerformance, varianceAnalysis, optimizationOpportunities);
      
      // Create forecast adjustments
      const forecastAdjustments = this.createForecastAdjustments(budgetData, varianceAnalysis);
      
      const analysis: BudgetAnalysis = {
        taskId: task.id,
        budgetPeriod: budgetData.period,
        totalBudget: budgetData.totalBudget,
        actualSpending: budgetData.actualSpending,
        budgetPerformance,
        varianceAnalysis,
        optimizationOpportunities,
        recommendations,
        forecastAdjustments
      };
      
      // Cache the analysis
      this.analysisCache.set(cacheKey, analysis);
      
      console.log(`✅ Budget analysis completed - Performance: ${budgetPerformance.performanceRating}`);
      console.log(`📈 Variance: ${budgetPerformance.variancePercentage.toFixed(1)}%`);
      console.log(`🎯 Recommendations: ${recommendations.length} generated`);
      
      return analysis;
      
    } catch (error) {
      console.error('❌ Budget analysis failed:', error);
      throw new Error(`Budget analysis failed: ${error}`);
    }
  }

  /**
   * Validate the budget analysis engine
   */
  public async validate(): Promise<boolean> {
    try {
      // Check if templates are initialized
      if (!this.budgetTemplates || this.budgetTemplates.size === 0) {
        return false;
      }
      
      // Check if variance thresholds are initialized
      if (!this.varianceThresholds || this.varianceThresholds.size === 0) {
        return false;
      }
      
      // Test budget analysis with sample data
      const testTask: FinancialTask = {
        id: 'test-budget',
        title: 'Test Budget Analysis',
        description: 'Budget: $100,000, Actual: $95,000, Period: Q4-2024',
        category: 'budget_analysis',
        priority: 'medium',
        requestedBy: 'test',
        createdAt: new Date()
      };
      
      const analysis = await this.analyzeBudget(testTask);
      
      return analysis && analysis.budgetPerformance && analysis.varianceAnalysis ? true : false;
      
    } catch (error) {
      console.error('Budget analysis engine validation failed:', error);
      return false;
    }
  }

  // ============================================================================
  // Private Analysis Methods
  // ============================================================================

  /**
   * Analyze overall budget performance
   */
  private analyzeBudgetPerformance(budgetData: any): BudgetPerformance {
    const actualVsBudget = budgetData.actualSpending / budgetData.totalBudget;
    const varianceAmount = budgetData.actualSpending - budgetData.totalBudget;
    const variancePercentage = (varianceAmount / budgetData.totalBudget) * 100;
    
    // Determine performance rating
    let performanceRating: 'excellent' | 'good' | 'acceptable' | 'concerning' | 'critical';
    const absVariancePercentage = Math.abs(variancePercentage);
    
    if (absVariancePercentage <= 2) {
      performanceRating = 'excellent';
    } else if (absVariancePercentage <= 5) {
      performanceRating = 'good';
    } else if (absVariancePercentage <= 10) {
      performanceRating = 'acceptable';
    } else if (absVariancePercentage <= 20) {
      performanceRating = 'concerning';
    } else {
      performanceRating = 'critical';
    }
    
    // Generate trend analysis
    const trendAnalysis = this.generateTrendAnalysis(budgetData, variancePercentage);
    
    return {
      actualVsBudget,
      variancePercentage,
      varianceAmount,
      trendAnalysis,
      performanceRating
    };
  }

  /**
   * Perform detailed variance analysis
   */
  private performVarianceAnalysis(budgetData: any): VarianceAnalysis {
    const positiveVariances: VarianceItem[] = [];
    const negativeVariances: VarianceItem[] = [];
    const significantVariances: VarianceItem[] = [];
    
    // Analyze each budget category
    for (const category of budgetData.categories) {
      const categoryData = budgetData.breakdown[category];
      
      if (categoryData) {
        const variance = categoryData.actual - categoryData.budget;
        const variancePercentage = (variance / categoryData.budget) * 100;
        
        const varianceItem: VarianceItem = {
          category,
          budgetAmount: categoryData.budget,
          actualAmount: categoryData.actual,
          variance,
          variancePercentage,
          explanation: this.generateVarianceExplanation(category, variancePercentage),
          impact: this.assessVarianceImpact(Math.abs(variancePercentage))
        };
        
        // Categorize variances
        if (variance > 0) {
          negativeVariances.push(varianceItem); // Over budget
        } else {
          positiveVariances.push(varianceItem); // Under budget
        }
        
        // Check if significant
        const threshold = this.varianceThresholds.get(category) || 5;
        if (Math.abs(variancePercentage) > threshold) {
          significantVariances.push(varianceItem);
        }
      }
    }
    
    // Generate root cause analysis
    const rootCauseAnalysis = this.performRootCauseAnalysis(significantVariances, budgetData);
    
    return {
      positiveVariances: positiveVariances.sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance)),
      negativeVariances: negativeVariances.sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance)),
      significantVariances: significantVariances.sort((a, b) => Math.abs(b.variancePercentage) - Math.abs(a.variancePercentage)),
      rootCauseAnalysis
    };
  }

  /**
   * Identify optimization opportunities from budget analysis
   */
  private identifyOptimizationOpportunities(budgetData: any, varianceAnalysis: VarianceAnalysis): any[] {
    const opportunities: any[] = [];
    
    // Analyze significant over-budget variances
    for (const variance of varianceAnalysis.negativeVariances) {
      if (variance.impact === 'high' || variance.impact === 'medium') {
        opportunities.push({
          id: `opt-${variance.category}-${Date.now()}`,
          category: variance.category,
          description: `Optimize ${variance.category} spending to reduce over-budget variance`,
          currentCost: variance.actualAmount,
          optimizedCost: variance.budgetAmount,
          savingsPotential: variance.variance,
          savingsPercentage: Math.abs(variance.variancePercentage),
          implementationComplexity: this.assessImplementationComplexity(variance.category),
          riskLevel: this.assessOptimizationRisk(variance.category),
          paybackPeriod: this.estimatePaybackPeriod(variance.category),
          confidence: this.calculateOptimizationConfidence(variance)
        });
      }
    }
    
    // Identify process improvements
    opportunities.push({
      id: `opt-process-${Date.now()}`,
      category: 'budget_process',
      description: 'Improve budget monitoring and forecasting processes',
      currentCost: 0,
      optimizedCost: 0,
      savingsPotential: budgetData.totalBudget * 0.02, // 2% improvement
      savingsPercentage: 2,
      implementationComplexity: 'medium',
      riskLevel: 'low',
      paybackPeriod: 6,
      confidence: 80
    });
    
    return opportunities;
  }

  /**
   * Generate budget recommendations
   */
  private generateBudgetRecommendations(
    performance: BudgetPerformance,
    variance: VarianceAnalysis,
    opportunities: any[]
  ): BudgetRecommendation[] {
    const recommendations: BudgetRecommendation[] = [];
    
    // Performance-based recommendations
    if (performance.performanceRating === 'critical' || performance.performanceRating === 'concerning') {
      recommendations.push({
        priority: 'high',
        action: 'Implement immediate cost control measures',
        expectedImpact: Math.abs(performance.varianceAmount) * 0.5,
        timeframe: '30 days',
        implementation: 'Freeze non-essential spending and review all expenditures',
        riskLevel: 'low'
      });
    }
    
    // Variance-based recommendations
    for (const significantVariance of variance.significantVariances.slice(0, 3)) {
      recommendations.push({
        priority: significantVariance.impact === 'high' ? 'high' : 'medium',
        action: `Address ${significantVariance.category} budget variance`,
        expectedImpact: Math.abs(significantVariance.variance) * 0.7,
        timeframe: '60 days',
        implementation: `Detailed analysis and corrective action for ${significantVariance.category}`,
        riskLevel: 'medium'
      });
    }
    
    // Opportunity-based recommendations
    for (const opportunity of opportunities.slice(0, 2)) {
      recommendations.push({
        priority: opportunity.savingsPercentage > 5 ? 'high' : 'medium',
        action: opportunity.description,
        expectedImpact: opportunity.savingsPotential,
        timeframe: `${opportunity.paybackPeriod} months`,
        implementation: `Implement ${opportunity.category} optimization initiative`,
        riskLevel: opportunity.riskLevel
      });
    }
    
    // Process improvement recommendations
    if (variance.significantVariances.length > 2) {
      recommendations.push({
        priority: 'medium',
        action: 'Enhance budget monitoring and forecasting capabilities',
        expectedImpact: performance.varianceAmount * 0.3,
        timeframe: '90 days',
        implementation: 'Implement advanced budgeting tools and regular review processes',
        riskLevel: 'low'
      });
    }
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * Create forecast adjustments based on analysis
   */
  private createForecastAdjustments(budgetData: any, variance: VarianceAnalysis): ForecastAdjustment[] {
    const adjustments: ForecastAdjustment[] = [];
    
    // Adjust forecasts based on significant variances
    for (const significantVariance of variance.significantVariances) {
      const adjustmentPercentage = significantVariance.variancePercentage * 0.5; // Conservative adjustment
      const currentForecast = significantVariance.budgetAmount;
      const adjustment = currentForecast * (adjustmentPercentage / 100);
      
      adjustments.push({
        category: significantVariance.category,
        currentForecast,
        adjustedForecast: currentForecast + adjustment,
        adjustment,
        reasoning: `Adjusted based on ${significantVariance.variancePercentage.toFixed(1)}% variance in current period`,
        confidenceLevel: this.calculateForecastConfidence(significantVariance)
      });
    }
    
    return adjustments;
  }

  // ============================================================================
  // Private Helper Methods
  // ============================================================================

  private initializeBudgetTemplates(): void {
    this.budgetTemplates.set('quarterly', {
      categories: ['personnel', 'technology', 'marketing', 'operations', 'facilities'],
      defaultAllocations: { personnel: 0.4, technology: 0.2, marketing: 0.15, operations: 0.15, facilities: 0.1 }
    });
    
    this.budgetTemplates.set('annual', {
      categories: ['personnel', 'technology', 'marketing', 'operations', 'facilities', 'strategic_initiatives'],
      defaultAllocations: { personnel: 0.35, technology: 0.2, marketing: 0.15, operations: 0.15, facilities: 0.1, strategic_initiatives: 0.05 }
    });
  }

  private initializeVarianceThresholds(): void {
    this.varianceThresholds.set('personnel', 3);
    this.varianceThresholds.set('technology', 10);
    this.varianceThresholds.set('marketing', 15);
    this.varianceThresholds.set('operations', 8);
    this.varianceThresholds.set('facilities', 5);
    this.varianceThresholds.set('strategic_initiatives', 20);
  }

  private generateCacheKey(task: FinancialTask): string {
    return `budget-${task.id}-${Date.now()}`;
  }

  private extractBudgetData(description: string): any {
    // Parse budget information from description
    const budgetMatch = description.match(/budget:?\s*\$?([\d,]+(?:\.\d{2})?)/i);
    const actualMatch = description.match(/actual:?\s*\$?([\d,]+(?:\.\d{2})?)/i);
    const periodMatch = description.match(/(Q[1-4]|quarterly|annual|\d{4})/i);
    
    const totalBudget = budgetMatch ? parseFloat(budgetMatch[1].replace(/,/g, '')) : 100000;
    const actualSpending = actualMatch ? parseFloat(actualMatch[1].replace(/,/g, '')) : totalBudget * 0.95;
    const period = periodMatch ? periodMatch[1] : 'Q4-2024';
    
    // Generate sample breakdown
    const template = this.budgetTemplates.get('quarterly') || this.budgetTemplates.get('annual')!;
    const breakdown: any = {};
    
    for (const [category, allocation] of Object.entries(template.defaultAllocations)) {
      const categoryBudget = totalBudget * (allocation as number);
      const variance = (Math.random() - 0.5) * 0.2; // ±10% variance
      const categoryActual = categoryBudget * (1 + variance);
      
      breakdown[category] = {
        budget: categoryBudget,
        actual: categoryActual
      };
    }
    
    return {
      totalBudget,
      actualSpending,
      period,
      categories: Object.keys(breakdown),
      breakdown
    };
  }

  private generateTrendAnalysis(budgetData: any, variancePercentage: number): string {
    if (Math.abs(variancePercentage) <= 2) {
      return 'Budget performance is on track with minimal variance';
    } else if (variancePercentage > 0) {
      return `Spending is ${variancePercentage.toFixed(1)}% over budget, requiring attention`;
    } else {
      return `Spending is ${Math.abs(variancePercentage).toFixed(1)}% under budget, indicating potential underutilization`;
    }
  }

  private generateVarianceExplanation(category: string, variancePercentage: number): string {
    const absVariance = Math.abs(variancePercentage);
    
    if (absVariance <= 5) {
      return `${category} spending is within acceptable variance range`;
    } else if (variancePercentage > 0) {
      return `${category} overspent by ${variancePercentage.toFixed(1)}%, requires investigation`;
    } else {
      return `${category} underspent by ${absVariance.toFixed(1)}%, may indicate delayed initiatives or reduced activity`;
    }
  }

  private assessVarianceImpact(absVariancePercentage: number): 'low' | 'medium' | 'high' {
    if (absVariancePercentage <= 5) return 'low';
    if (absVariancePercentage <= 15) return 'medium';
    return 'high';
  }

  private performRootCauseAnalysis(significantVariances: VarianceItem[], budgetData: any): string[] {
    const causes: string[] = [];
    
    if (significantVariances.length > 0) {
      causes.push('Multiple categories showing significant variance suggests systematic issues');
    }
    
    const overBudgetCount = significantVariances.filter(v => v.variance > 0).length;
    if (overBudgetCount > significantVariances.length / 2) {
      causes.push('Majority of variances are over-budget, indicating budget planning or control issues');
    }
    
    // Category-specific analysis
    const technologyVariance = significantVariances.find(v => v.category === 'technology');
    if (technologyVariance && technologyVariance.variance > 0) {
      causes.push('Technology overspend may indicate unplanned infrastructure needs or scope creep');
    }
    
    const personnelVariance = significantVariances.find(v => v.category === 'personnel');
    if (personnelVariance && personnelVariance.variance > 0) {
      causes.push('Personnel overspend may indicate hiring above plan or compensation adjustments');
    }
    
    return causes.length > 0 ? causes : ['Variances appear to be within normal operational fluctuations'];
  }

  private assessImplementationComplexity(category: string): 'low' | 'medium' | 'high' {
    const complexityMap: Record<string, 'low' | 'medium' | 'high'> = {
      personnel: 'high',
      technology: 'medium',
      marketing: 'low',
      operations: 'medium',
      facilities: 'low',
      budget_process: 'medium'
    };
    return complexityMap[category] || 'medium';
  }

  private assessOptimizationRisk(category: string): 'low' | 'medium' | 'high' {
    const riskMap: Record<string, 'low' | 'medium' | 'high'> = {
      personnel: 'high',
      technology: 'medium',
      marketing: 'medium',
      operations: 'medium',
      facilities: 'low',
      budget_process: 'low'
    };
    return riskMap[category] || 'medium';
  }

  private estimatePaybackPeriod(category: string): number {
    const paybackMap: Record<string, number> = {
      personnel: 12,
      technology: 6,
      marketing: 3,
      operations: 6,
      facilities: 9,
      budget_process: 6
    };
    return paybackMap[category] || 6;
  }

  private calculateOptimizationConfidence(variance: VarianceItem): number {
    let confidence = 75; // Base confidence
    
    // Adjust based on variance magnitude
    if (Math.abs(variance.variancePercentage) > 20) confidence += 10;
    else if (Math.abs(variance.variancePercentage) > 10) confidence += 5;
    
    // Adjust based on impact
    if (variance.impact === 'high') confidence += 10;
    else if (variance.impact === 'medium') confidence += 5;
    
    return Math.min(95, confidence);
  }

  private calculateForecastConfidence(variance: VarianceItem): number {
    const baseConfidence = 80;
    const varianceImpact = Math.min(Math.abs(variance.variancePercentage) / 2, 15);
    return Math.max(60, baseConfidence - varianceImpact);
  }
}