/**
 * Financial Task Processor
 * 
 * Intelligent categorization and analysis engine for financial tasks.
 * Provides sophisticated keyword analysis, complexity assessment, and
 * processing strategy determination for CFO Agent operations.
 */

import type {
  FinancialTask,
  TaskAnalysis,
  TaskCategory,
  ComplexityLevel,
  RiskAssessment,
  ProcessingStrategy
} from './types.js';

export class FinancialTaskProcessor {
  private keywordMappings: Map<TaskCategory, string[]>;
  private complexityIndicators: Map<string, number>;
  private riskFactors: Map<string, number>;

  constructor() {
    this.initializeKeywordMappings();
    this.initializeComplexityIndicators();
    this.initializeRiskFactors();
    
    console.log('📋 Financial Task Processor initialized');
  }

  /**
   * Generate comprehensive analysis for a financial task
   */
  public async generateAnalysis(task: FinancialTask): Promise<TaskAnalysis> {
    console.log(`🔍 Analyzing financial task: ${task.title}`);
    
    try {
      // Extract keywords and categorize task
      const keywords = this.extractKeywords(task);
      const category = this.categorizeTask(task, keywords);
      
      // Assess complexity and risk
      const complexity = this.assessComplexity(task, keywords);
      const riskAssessment = this.assessRisk(task, keywords, complexity);
      
      // Determine processing strategy
      const processingStrategy = this.determineProcessingStrategy(category, complexity, riskAssessment);
      
      // Calculate confidence score
      const confidence = this.calculateConfidence(task, keywords, complexity, riskAssessment);
      
      // Estimate processing time
      const estimatedTime = this.estimateProcessingTime(category, complexity);
      
      // Identify required data
      const requiredData = this.identifyRequiredData(category, task);
      
      const analysis: TaskAnalysis = {
        category,
        complexity,
        confidence,
        riskAssessment,
        processingStrategy,
        estimatedTime,
        requiredData,
        keywords
      };
      
      console.log(`📊 Task analysis completed - Category: ${category}, Complexity: ${complexity.level}, Confidence: ${confidence}%`);
      
      return analysis;
      
    } catch (error) {
      console.error('❌ Failed to analyze financial task:', error);
      throw new Error(`Task analysis failed: ${error}`);
    }
  }

  /**
   * Extract relevant keywords from task content
   */
  private extractKeywords(task: FinancialTask): string[] {
    const content = `${task.title} ${task.description}`.toLowerCase();
    const extractedKeywords: string[] = [];
    
    // Check against all keyword mappings
    for (const [category, keywords] of this.keywordMappings) {
      for (const keyword of keywords) {
        if (content.includes(keyword.toLowerCase())) {
          extractedKeywords.push(keyword);
        }
      }
    }
    
    // Add additional contextual keywords
    const contextualKeywords = this.extractContextualKeywords(content);
    extractedKeywords.push(...contextualKeywords);
    
    // Remove duplicates and return sorted by relevance
    return [...new Set(extractedKeywords)]
      .sort((a, b) => this.calculateKeywordRelevance(b, content) - this.calculateKeywordRelevance(a, content))
      .slice(0, 10); // Limit to top 10 most relevant keywords
  }

  /**
   * Categorize task based on content and keywords
   */
  private categorizeTask(task: FinancialTask, keywords: string[]): TaskCategory {
    // If category is already specified and valid, use it
    if (task.category && this.isValidCategory(task.category)) {
      return task.category;
    }
    
    // Score each category based on keyword matches
    const categoryScores = new Map<TaskCategory, number>();
    
    for (const [category, categoryKeywords] of this.keywordMappings) {
      let score = 0;
      for (const keyword of keywords) {
        if (categoryKeywords.some(ck => ck.toLowerCase().includes(keyword.toLowerCase()) || 
                                       keyword.toLowerCase().includes(ck.toLowerCase()))) {
          score += this.calculateKeywordRelevance(keyword, `${task.title} ${task.description}`);
        }
      }
      categoryScores.set(category, score);
    }
    
    // Return category with highest score
    const sortedCategories = Array.from(categoryScores.entries())
      .sort((a, b) => b[1] - a[1]);
    
    if (sortedCategories.length > 0 && sortedCategories[0][1] > 0) {
      return sortedCategories[0][0];
    }
    
    // Default fallback based on priority and content analysis
    return this.getDefaultCategory(task);
  }

  /**
   * Assess task complexity based on multiple factors
   */
  private assessComplexity(task: FinancialTask, keywords: string[]): ComplexityLevel {
    let complexityScore = 0;
    const factors: string[] = [];
    
    // Priority contribution
    const priorityScores = { low: 1, medium: 2, high: 3, critical: 4 };
    complexityScore += priorityScores[task.priority] || 2;
    
    // Keyword complexity indicators
    for (const keyword of keywords) {
      if (this.complexityIndicators.has(keyword.toLowerCase())) {
        const indicatorScore = this.complexityIndicators.get(keyword.toLowerCase())!;
        complexityScore += indicatorScore;
        if (indicatorScore > 2) {
          factors.push(`Complex keyword: ${keyword}`);
        }
      }
    }
    
    // Content length and detail level
    const contentLength = `${task.title} ${task.description}`.length;
    if (contentLength > 500) {
      complexityScore += 2;
      factors.push('Detailed requirements');
    } else if (contentLength > 200) {
      complexityScore += 1;
      factors.push('Moderate detail level');
    }
    
    // Multi-domain indicators
    const categoryMatches = this.countCategoryMatches(task, keywords);
    if (categoryMatches > 2) {
      complexityScore += 3;
      factors.push('Multi-domain analysis required');
    } else if (categoryMatches > 1) {
      complexityScore += 1;
      factors.push('Cross-functional impact');
    }
    
    // Determine complexity level
    let level: 'low' | 'medium' | 'high';
    let description: string;
    
    if (complexityScore <= 4) {
      level = 'low';
      description = 'Straightforward analysis with standard methodologies';
    } else if (complexityScore <= 8) {
      level = 'medium';
      description = 'Moderate complexity requiring enhanced analysis';
    } else {
      level = 'high';
      description = 'High complexity requiring comprehensive evaluation';
    }
    
    return { level, factors, description };
  }

  /**
   * Assess financial and business risk for the task
   */
  private assessRisk(task: FinancialTask, keywords: string[], complexity: ComplexityLevel): RiskAssessment {
    let riskScore = 0;
    const riskFactors: string[] = [];
    const mitigationStrategies: string[] = [];
    
    // Priority-based risk
    const priorityRisk = { low: 1, medium: 2, high: 3, critical: 4 };
    riskScore += priorityRisk[task.priority] || 2;
    
    // Complexity-based risk
    const complexityRisk = { low: 1, medium: 2, high: 3 };
    riskScore += complexityRisk[complexity.level];
    
    // Keyword-based risk factors
    for (const keyword of keywords) {
      if (this.riskFactors.has(keyword.toLowerCase())) {
        const keywordRisk = this.riskFactors.get(keyword.toLowerCase())!;
        riskScore += keywordRisk;
        if (keywordRisk > 2) {
          riskFactors.push(`High-risk keyword: ${keyword}`);
        }
      }
    }
    
    // Category-specific risk assessment
    const categoryRisk = this.assessCategoryRisk(task.category);
    riskScore += categoryRisk.score;
    riskFactors.push(...categoryRisk.factors);
    mitigationStrategies.push(...categoryRisk.mitigations);
    
    // Determine overall risk level
    let overallRisk: 'low' | 'medium' | 'high';
    let financialImpact: 'minimal' | 'moderate' | 'significant';
    let businessImpact: 'minimal' | 'moderate' | 'significant';
    
    if (riskScore <= 4) {
      overallRisk = 'low';
      financialImpact = 'minimal';
      businessImpact = 'minimal';
    } else if (riskScore <= 8) {
      overallRisk = 'medium';
      financialImpact = 'moderate';
      businessImpact = 'moderate';
    } else {
      overallRisk = 'high';
      financialImpact = 'significant';
      businessImpact = 'significant';
    }
    
    // Add standard mitigation strategies
    mitigationStrategies.push(
      'Comprehensive data validation',
      'Multiple scenario analysis',
      'Stakeholder review process',
      'Sensitivity analysis'
    );
    
    return {
      overallRisk,
      financialImpact,
      businessImpact,
      riskFactors,
      mitigationStrategies
    };
  }

  /**
   * Determine optimal processing strategy
   */
  private determineProcessingStrategy(
    category: TaskCategory,
    complexity: ComplexityLevel,
    risk: RiskAssessment
  ): ProcessingStrategy {
    let approach: 'standard' | 'enhanced' | 'comprehensive';
    const steps: string[] = [];
    let validationRequired = false;
    let stakeholderReview = false;
    
    // Determine approach based on complexity and risk
    if (complexity.level === 'low' && risk.overallRisk === 'low') {
      approach = 'standard';
      steps.push(
        'Initial data collection',
        'Standard analysis execution',
        'Result compilation',
        'Basic validation'
      );
    } else if (complexity.level === 'high' || risk.overallRisk === 'high') {
      approach = 'comprehensive';
      validationRequired = true;
      stakeholderReview = true;
      steps.push(
        'Comprehensive data gathering',
        'Multi-scenario analysis',
        'Risk assessment integration',
        'Sensitivity analysis',
        'Stakeholder consultation',
        'Results validation',
        'Executive summary preparation'
      );
    } else {
      approach = 'enhanced';
      validationRequired = true;
      steps.push(
        'Enhanced data collection',
        'Detailed analysis execution',
        'Risk-adjusted calculations',
        'Results validation',
        'Recommendation formulation'
      );
    }
    
    // Add category-specific steps
    const categorySteps = this.getCategorySpecificSteps(category);
    steps.splice(2, 0, ...categorySteps);
    
    return {
      approach,
      steps,
      validationRequired,
      stakeholderReview
    };
  }

  /**
   * Calculate confidence score for analysis
   */
  private calculateConfidence(
    task: FinancialTask,
    keywords: string[],
    complexity: ComplexityLevel,
    risk: RiskAssessment
  ): number {
    let confidence = 85; // Base confidence
    
    // Adjust for keyword relevance
    const keywordRelevance = keywords.length > 0 ? 
      keywords.reduce((sum, kw) => sum + this.calculateKeywordRelevance(kw, `${task.title} ${task.description}`), 0) / keywords.length : 0;
    confidence += Math.min(keywordRelevance * 10, 10);
    
    // Adjust for complexity
    const complexityAdjustment = { low: 5, medium: 0, high: -5 };
    confidence += complexityAdjustment[complexity.level];
    
    // Adjust for risk
    const riskAdjustment = { low: 5, medium: 0, high: -10 };
    confidence += riskAdjustment[risk.overallRisk];
    
    // Adjust for task completeness
    const descriptionQuality = task.description.length > 100 ? 5 : 
                              task.description.length > 50 ? 0 : -5;
    confidence += descriptionQuality;
    
    // Ensure confidence is within bounds
    return Math.max(0, Math.min(100, Math.round(confidence)));
  }

  /**
   * Estimate processing time based on category and complexity
   */
  private estimateProcessingTime(category: TaskCategory, complexity: ComplexityLevel): number {
    // Base times by category (in milliseconds)
    const baseTimes: Record<TaskCategory, number> = {
      budget_analysis: 800,
      cost_optimization: 1000,
      roi_assessment: 1200,
      financial_reporting: 600,
      revenue_forecasting: 1000,
      cash_flow_analysis: 800,
      investment_evaluation: 1200,
      risk_assessment: 900
    };
    
    // Complexity multipliers
    const complexityMultipliers = { low: 0.8, medium: 1.0, high: 1.5 };
    
    const baseTime = baseTimes[category] || 1000;
    const multiplier = complexityMultipliers[complexity.level];
    
    return Math.round(baseTime * multiplier);
  }

  /**
   * Identify required data for analysis
   */
  private identifyRequiredData(category: TaskCategory, task: FinancialTask): string[] {
    const baseRequirements: Record<TaskCategory, string[]> = {
      budget_analysis: ['Budget allocations', 'Actual spending', 'Period definitions', 'Cost centers'],
      cost_optimization: ['Current costs', 'Cost categories', 'Historical data', 'Benchmark data'],
      roi_assessment: ['Investment amount', 'Expected returns', 'Time horizon', 'Risk factors'],
      financial_reporting: ['Financial statements', 'KPI definitions', 'Comparison periods'],
      revenue_forecasting: ['Historical revenue', 'Market data', 'Growth assumptions'],
      cash_flow_analysis: ['Cash inflows', 'Cash outflows', 'Working capital', 'Seasonality'],
      investment_evaluation: ['Investment details', 'Market analysis', 'Competitive landscape'],
      risk_assessment: ['Risk factors', 'Impact assessments', 'Mitigation strategies']
    };
    
    const requirements = baseRequirements[category] || ['Financial data', 'Context information'];
    
    // Add task-specific requirements based on content
    const content = `${task.title} ${task.description}`.toLowerCase();
    if (content.includes('quarterly') || content.includes('q1') || content.includes('q2') || content.includes('q3') || content.includes('q4')) {
      requirements.push('Quarterly data');
    }
    if (content.includes('annual') || content.includes('yearly')) {
      requirements.push('Annual data');
    }
    if (content.includes('department') || content.includes('division')) {
      requirements.push('Departmental breakdowns');
    }
    
    return [...new Set(requirements)];
  }

  /**
   * Validate the task processor
   */
  public async validate(): Promise<boolean> {
    try {
      // Check if keyword mappings are initialized
      if (!this.keywordMappings || this.keywordMappings.size === 0) {
        return false;
      }
      
      // Check if complexity indicators are initialized
      if (!this.complexityIndicators || this.complexityIndicators.size === 0) {
        return false;
      }
      
      // Check if risk factors are initialized
      if (!this.riskFactors || this.riskFactors.size === 0) {
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Task processor validation failed:', error);
      return false;
    }
  }

  // ============================================================================
  // Private Helper Methods
  // ============================================================================

  private initializeKeywordMappings(): void {
    this.keywordMappings = new Map([
      ['budget_analysis', ['budget', 'allocation', 'spending', 'variance', 'performance', 'targets', 'actuals', 'forecast']],
      ['cost_optimization', ['cost-saving', 'efficiency', 'optimization', 'reduce', 'expenses', 'overhead', 'streamline']],
      ['roi_assessment', ['investment', 'return', 'profitability', 'value', 'ROI', 'payback', 'NPV', 'IRR']],
      ['financial_reporting', ['P&L', 'financial', 'quarterly', 'analysis', 'reporting', 'statements', 'metrics']],
      ['revenue_forecasting', ['forecast', 'revenue', 'projection', 'growth', 'prediction', 'trends', 'pipeline']],
      ['cash_flow_analysis', ['cash flow', 'liquidity', 'working capital', 'cash management', 'burn rate']],
      ['investment_evaluation', ['investment', 'capital', 'acquisition', 'merger', 'expansion', 'project']],
      ['risk_assessment', ['risk', 'threat', 'vulnerability', 'compliance', 'audit', 'governance']]
    ]);
  }

  private initializeComplexityIndicators(): void {
    this.complexityIndicators = new Map([
      // High complexity indicators
      ['enterprise', 4], ['strategic', 4], ['transformation', 4], ['integration', 4],
      ['multi-year', 3], ['cross-functional', 3], ['regulatory', 3], ['compliance', 3],
      // Medium complexity indicators
      ['quarterly', 2], ['department', 2], ['analysis', 2], ['optimization', 2],
      // Low complexity indicators
      ['monthly', 1], ['simple', 1], ['standard', 1], ['routine', 1]
    ]);
  }

  private initializeRiskFactors(): void {
    this.riskFactors = new Map([
      // High risk factors
      ['critical', 4], ['urgent', 4], ['regulatory', 4], ['compliance', 4],
      ['merger', 3], ['acquisition', 3], ['restructuring', 3], ['layoffs', 3],
      // Medium risk factors
      ['investment', 2], ['expansion', 2], ['market', 2], ['competitive', 2],
      // Low risk factors
      ['routine', 1], ['standard', 1], ['maintenance', 1], ['reporting', 1]
    ]);
  }

  private extractContextualKeywords(content: string): string[] {
    const contextual: string[] = [];
    
    // Financial amount indicators
    if (/\$[\d,]+/.test(content) || /\d+\s*(million|billion|thousand)/.test(content)) {
      contextual.push('high-value');
    }
    
    // Time indicators
    if (/\d+\s*(year|month|quarter)/.test(content)) {
      contextual.push('time-sensitive');
    }
    
    // Urgency indicators
    if (/urgent|asap|immediately|critical/.test(content)) {
      contextual.push('urgent');
    }
    
    return contextual;
  }

  private calculateKeywordRelevance(keyword: string, content: string): number {
    const occurrences = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
    const position = content.toLowerCase().indexOf(keyword.toLowerCase());
    const positionScore = position === -1 ? 0 : Math.max(0, 10 - position / 10);
    
    return occurrences * 2 + positionScore;
  }

  private isValidCategory(category: string): category is TaskCategory {
    const validCategories: TaskCategory[] = [
      'budget_analysis', 'cost_optimization', 'roi_assessment',
      'financial_reporting', 'revenue_forecasting', 'cash_flow_analysis',
      'investment_evaluation', 'risk_assessment'
    ];
    return validCategories.includes(category as TaskCategory);
  }

  private getDefaultCategory(task: FinancialTask): TaskCategory {
    // Default categorization based on priority and content
    if (task.priority === 'critical' || task.priority === 'high') {
      return 'risk_assessment';
    }
    return 'financial_reporting';
  }

  private countCategoryMatches(task: FinancialTask, keywords: string[]): number {
    const content = `${task.title} ${task.description}`.toLowerCase();
    let matches = 0;
    
    for (const [, categoryKeywords] of this.keywordMappings) {
      const hasMatch = categoryKeywords.some(kw => content.includes(kw.toLowerCase()));
      if (hasMatch) matches++;
    }
    
    return matches;
  }

  private assessCategoryRisk(category: TaskCategory): { score: number; factors: string[]; mitigations: string[] } {
    const categoryRisks: Record<TaskCategory, { score: number; factors: string[]; mitigations: string[] }> = {
      budget_analysis: {
        score: 2,
        factors: ['Budget variance impact', 'Resource allocation decisions'],
        mitigations: ['Historical variance analysis', 'Conservative estimates']
      },
      cost_optimization: {
        score: 3,
        factors: ['Operational disruption', 'Employee impact', 'Service quality'],
        mitigations: ['Phased implementation', 'Impact assessment', 'Stakeholder communication']
      },
      roi_assessment: {
        score: 3,
        factors: ['Market uncertainty', 'Competitive response', 'Technology risks'],
        mitigations: ['Scenario planning', 'Sensitivity analysis', 'Market research']
      },
      financial_reporting: {
        score: 1,
        factors: ['Data accuracy', 'Regulatory compliance'],
        mitigations: ['Data validation', 'Audit trail', 'Compliance review']
      },
      revenue_forecasting: {
        score: 3,
        factors: ['Market volatility', 'Economic conditions', 'Competitive dynamics'],
        mitigations: ['Multiple scenarios', 'Regular updates', 'Market monitoring']
      },
      cash_flow_analysis: {
        score: 2,
        factors: ['Liquidity risk', 'Working capital impact'],
        mitigations: ['Cash reserves', 'Credit facilities', 'Payment terms optimization']
      },
      investment_evaluation: {
        score: 4,
        factors: ['Capital commitment', 'Strategic alignment', 'Market timing'],
        mitigations: ['Due diligence', 'Staged investment', 'Exit strategies']
      },
      risk_assessment: {
        score: 2,
        factors: ['Risk identification completeness', 'Mitigation effectiveness'],
        mitigations: ['Comprehensive analysis', 'Expert consultation', 'Regular review']
      }
    };
    
    return categoryRisks[category] || { score: 2, factors: ['General financial risk'], mitigations: ['Standard validation'] };
  }

  private getCategorySpecificSteps(category: TaskCategory): string[] {
    const categorySteps: Record<TaskCategory, string[]> = {
      budget_analysis: ['Variance calculation', 'Trend analysis'],
      cost_optimization: ['Cost categorization', 'Savings identification'],
      roi_assessment: ['Return calculation', 'Risk adjustment'],
      financial_reporting: ['Data compilation', 'Metric calculation'],
      revenue_forecasting: ['Historical analysis', 'Growth modeling'],
      cash_flow_analysis: ['Cash mapping', 'Liquidity assessment'],
      investment_evaluation: ['Valuation analysis', 'Strategic fit assessment'],
      risk_assessment: ['Risk quantification', 'Mitigation planning']
    };
    
    return categorySteps[category] || ['Analysis execution'];
  }
}