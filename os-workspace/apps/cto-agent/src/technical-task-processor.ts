/**
 * Technical Task Processor for CTO Agent (Zara)
 * 
 * Handles categorization and initial processing of technical tasks
 */

import type { 
  TechnicalTask, 
  TaskCategory, 
  TechnicalAnalysis,
  ComplexityScore,
  RiskAssessment,
  Risk,
  ResourceRequirements
} from './types.js';

export class TechnicalTaskProcessor {
  // Enhanced categorization keywords based on design specifications
  private readonly CATEGORIZATION_CONFIG = {
    architecture_design: {
      keywords: ['architecture', 'microservices', 'api', 'integration', 'system design', 'scalability', 'distributed systems', 'service mesh', 'event-driven'],
      complexityIndicators: ['high throughput', 'multi-region', 'real-time', 'complex workflows', 'distributed', 'event-driven', 'high availability'],
      decisionFactors: ['performance requirements', 'scalability needs', 'maintenance complexity', 'team expertise']
    },
    technology_evaluation: {
      keywords: ['technology', 'framework', 'library', 'platform', 'tool', 'evaluation', 'proof-of-concept', 'migration', 'upgrade', 'adoption'],
      complexityIndicators: ['multiple systems', 'legacy integration', 'vendor lock-in', 'migration'],
      decisionFactors: ['ecosystem maturity', 'community support', 'learning curve', 'integration complexity', 'long-term viability']
    },
    security_response: {
      keywords: ['security', 'vulnerability', 'threat', 'compliance', 'encryption', 'authentication', 'authorization', 'audit', 'penetration'],
      complexityIndicators: ['critical severity', 'data breach', 'regulatory impact', 'compliance'],
      decisionFactors: ['business impact', 'data sensitivity', 'exploit likelihood', 'regulatory requirements']
    },
    infrastructure_planning: {
      keywords: ['infrastructure', 'scaling', 'capacity', 'performance', 'deployment', 'monitoring', 'availability', 'disaster recovery', 'cloud'],
      complexityIndicators: ['high availability', 'disaster recovery', 'global distribution', 'scaling'],
      decisionFactors: ['growth projections', 'performance targets', 'cost constraints', 'reliability requirements']
    }
  };

  // Performance tracking for categorization accuracy
  private categorizationMetrics = {
    totalProcessed: 0,
    accuracyScore: 0.95,
    confidenceThreshold: 0.85
  };

  /**
   * Enhanced categorization with confidence scoring and decision factors
   */
  public categorizeTaskWithAnalysis(task: TechnicalTask): {
    category: TaskCategory;
    confidence: number;
    factors: string[];
    alternativeCategories: Array<{category: TaskCategory; score: number}>;
  } {
    const content = `${task.title} ${task.description}`.toLowerCase();
    const scores: Record<TaskCategory, number> = {} as Record<TaskCategory, number>;
    const factors: string[] = [];
    
    // Calculate weighted scores for each category
    Object.entries(this.CATEGORIZATION_CONFIG).forEach(([category, config]) => {
      const keywordScore = this.calculateKeywordScore(content, config.keywords);
      const complexityBonus = this.calculateComplexityScore(content, config.complexityIndicators);
      const priorityMultiplier = this.getPriorityMultiplier(task.priority);
      
      scores[category as TaskCategory] = (keywordScore + complexityBonus) * priorityMultiplier;
      
      if (keywordScore > 0) {
        factors.push(`${category}: keyword matches (${keywordScore.toFixed(1)})`);
      }
      if (complexityBonus > 0) {
        factors.push(`${category}: complexity indicators (${complexityBonus.toFixed(1)})`);
      }
    });
    
    // Sort categories by score
    const sortedCategories = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .map(([category, score]) => ({ 
        category: category as TaskCategory, 
        score 
      }));
    
    const primaryCategory = sortedCategories[0];
    const secondaryCategory = sortedCategories[1];
    
    // Calculate confidence based on score separation
    const confidence = this.calculateCategorizationConfidence(
      primaryCategory.score, 
      secondaryCategory?.score || 0,
      factors.length
    );
    
    console.log(`📊 Enhanced categorization: ${primaryCategory.category} (${confidence.toFixed(1)}% confidence)`);
    console.log(`🔍 Decision factors: ${factors.join(', ')}`);
    
    this.updateCategorizationMetrics(confidence);
    
    return {
      category: primaryCategory.category,
      confidence,
      factors,
      alternativeCategories: sortedCategories.slice(1, 3)
    };
  }

  /**
   * Generate comprehensive technical analysis for a task
   */
  public async generateAnalysis(task: TechnicalTask): Promise<TechnicalAnalysis> {
    console.log(`🔍 Generating technical analysis for task: ${task.title}`);
    
    const categorization = this.categorizeTaskWithAnalysis(task);
    const complexity = this.assessComplexity(task, categorization.category);
    const riskAssessment = this.assessRisks(task, categorization.category);
    const resourceRequirements = this.estimateResources(task, categorization.category, complexity);
    
    const analysis: TechnicalAnalysis = {
      taskId: task.id,
      category: categorization.category,
      complexity,
      riskAssessment,
      resourceRequirements,
      timeline: this.estimateTimeline(complexity, riskAssessment),
      recommendations: this.generateRecommendations(task, categorization.category, complexity, riskAssessment),
      confidence: this.calculateOverallConfidence(
        categorization.confidence,
        complexity,
        riskAssessment,
        task
      )
    };

    console.log(`✅ Technical analysis completed with ${analysis.confidence}% confidence`);
    console.log(`📋 Category: ${analysis.category} | Complexity: ${complexity.level} | Risk: ${riskAssessment.overallRisk}`);
    
    return analysis;
  }

  /**
   * Calculate keyword match score for categorization with enhanced weighting
   */
  private calculateKeywordScore(content: string, keywords: string[]): number {
    let score = 0;
    const wordCount = content.split(' ').length;
    
    for (const keyword of keywords) {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      const matches = (content.match(regex) || []).length;
      
      if (matches > 0) {
        // Weight by keyword specificity and frequency
        const specificity = keyword.length / 10;
        const frequency = matches / wordCount;
        const normalizedScore = Math.min(matches * specificity * (1 + frequency), 5);
        score += normalizedScore;
      }
    }
    return score;
  }

  /**
   * Calculate complexity indicators score
   */
  private calculateComplexityScore(content: string, indicators: string[]): number {
    let score = 0;
    for (const indicator of indicators) {
      if (content.includes(indicator)) {
        score += 2; // Higher weight for complexity indicators
      }
    }
    return score;
  }

  /**
   * Get priority multiplier for scoring
   */
  private getPriorityMultiplier(priority: string): number {
    const multipliers = {
      low: 1.0,
      medium: 1.2,
      high: 1.5,
      critical: 2.0
    };
    return multipliers[priority as keyof typeof multipliers] || 1.0;
  }

  /**
   * Calculate categorization confidence
   */
  private calculateCategorizationConfidence(
    primaryScore: number,
    secondaryScore: number,
    factorCount: number
  ): number {
    const scoreSeparation = primaryScore - secondaryScore;
    const factorBonus = Math.min(factorCount * 5, 20);
    
    let confidence = 70; // Base confidence
    
    if (scoreSeparation > 3) confidence += 20;
    else if (scoreSeparation > 1) confidence += 10;
    else confidence -= 10;
    
    confidence += factorBonus;
    
    return Math.max(50, Math.min(95, confidence));
  }

  /**
   * Update categorization metrics for monitoring
   */
  private updateCategorizationMetrics(confidence: number): void {
    this.categorizationMetrics.totalProcessed++;
    
    // Update running accuracy average
    const prevTotal = (this.categorizationMetrics.totalProcessed - 1) * this.categorizationMetrics.accuracyScore;
    const accuracyContribution = confidence / 100;
    this.categorizationMetrics.accuracyScore = (prevTotal + accuracyContribution) / this.categorizationMetrics.totalProcessed;
  }

  /**
   * Calculate overall analysis confidence
   */
  private calculateOverallConfidence(
    categorizationConfidence: number,
    complexity: ComplexityScore,
    riskAssessment: RiskAssessment,
    task: TechnicalTask
  ): number {
    let confidence = categorizationConfidence * 0.4; // 40% weight on categorization
    
    // Complexity confidence (30% weight)
    const complexityConfidence = complexity.level === 'low' ? 90 : 
                                 complexity.level === 'medium' ? 80 : 70;
    confidence += complexityConfidence * 0.3;
    
    // Risk assessment confidence (20% weight)
    const riskConfidence = riskAssessment.risks.length > 0 ? 85 : 75;
    confidence += riskConfidence * 0.2;
    
    // Task detail quality (10% weight)
    const detailQuality = task.description.length > 200 ? 90 : 
                         task.description.length > 100 ? 80 : 70;
    confidence += detailQuality * 0.1;
    
    return Math.max(50, Math.min(95, Math.round(confidence)));
  }

  /**
   * Enhanced complexity assessment based on design specifications
   */
  private assessComplexity(task: TechnicalTask, category: TaskCategory): ComplexityScore {
    const content = `${task.title} ${task.description}`.toLowerCase();
    const factors: string[] = [];
    let score = 1; // Base complexity

    // Get category-specific complexity indicators
    const config = this.CATEGORIZATION_CONFIG[category];
    const indicators = config?.complexityIndicators || [];
    
    // Category-based complexity analysis
    for (const indicator of indicators) {
      if (content.includes(indicator)) {
        factors.push(`Contains ${indicator} requirements`);
        score += 2;
      }
    }

    // Multi-dimensional complexity factors
    const complexityFactors = {
      scope: this.assessScopeComplexity(content, factors),
      technical: this.assessTechnicalComplexity(content, category, factors),
      integration: this.assessIntegrationComplexity(content, factors),
      timeline: this.assessTimelineComplexity(task.priority, factors)
    };

    // Apply complexity factor scores
    score += Object.values(complexityFactors).reduce((sum, val) => sum + val, 0);

    // Priority-based complexity adjustment
    const priorityMultiplier = {
      low: 1.0,
      medium: 1.2,
      high: 1.5,
      critical: 2.0
    };
    score *= priorityMultiplier[task.priority];
    factors.push(`Priority level: ${task.priority} (×${priorityMultiplier[task.priority]})`);

    // Content detail complexity
    if (task.description.length > 500) {
      factors.push('Detailed requirements provided (+1)');
      score += 1;
    } else if (task.description.length < 100) {
      factors.push('Limited requirements detail (-1)');
      score -= 1;
    }

    // Determine complexity level with refined thresholds
    let level: 'low' | 'medium' | 'high';
    if (score <= 3) level = 'low';
    else if (score <= 7) level = 'medium';
    else level = 'high';

    const finalScore = Math.max(1, Math.min(score, 10));
    
    console.log(`🔍 Complexity assessment: ${level} (score: ${finalScore.toFixed(1)})`);
    console.log(`📋 Complexity factors: ${factors.join(', ')}`);

    return { level, factors, score: finalScore };
  }

  /**
   * Assess scope complexity
   */
  private assessScopeComplexity(content: string, factors: string[]): number {
    let score = 0;
    const scopeIndicators = ['multiple', 'various', 'complex', 'enterprise', 'global', 'multi-tenant'];
    
    for (const indicator of scopeIndicators) {
      if (content.includes(indicator)) {
        factors.push(`Scope: ${indicator}`);
        score += 1;
      }
    }
    return Math.min(score, 3);
  }

  /**
   * Assess technical complexity
   */
  private assessTechnicalComplexity(content: string, category: TaskCategory, factors: string[]): number {
    let score = 0;
    
    const technicalIndicators = {
      architecture_design: ['distributed', 'microservices', 'event-driven', 'real-time', 'high-availability'],
      technology_evaluation: ['migration', 'integration', 'legacy', 'compatibility', 'vendor-specific'],
      security_response: ['zero-trust', 'encryption', 'compliance', 'audit', 'penetration'],
      infrastructure_planning: ['auto-scaling', 'load-balancing', 'disaster-recovery', 'multi-region']
    };
    
    const indicators = technicalIndicators[category] || [];
    for (const indicator of indicators) {
      if (content.includes(indicator)) {
        factors.push(`Technical: ${indicator}`);
        score += 1.5;
      }
    }
    return Math.min(score, 4);
  }

  /**
   * Assess integration complexity
   */
  private assessIntegrationComplexity(content: string, factors: string[]): number {
    let score = 0;
    const integrationIndicators = ['integrate', 'connect', 'sync', 'api', 'webhook', 'third-party'];
    
    for (const indicator of integrationIndicators) {
      if (content.includes(indicator)) {
        factors.push(`Integration: ${indicator}`);
        score += 0.5;
      }
    }
    return Math.min(score, 2);
  }

  /**
   * Assess timeline complexity
   */
  private assessTimelineComplexity(priority: string, factors: string[]): number {
    if (priority === 'critical') {
      factors.push('Timeline: Critical urgency');
      return 2;
    } else if (priority === 'high') {
      factors.push('Timeline: High priority');
      return 1;
    }
    return 0;
  }

  /**
   * Assess risks associated with the task
   */
  private assessRisks(task: TechnicalTask, category: TaskCategory): RiskAssessment {
    const content = `${task.title} ${task.description}`.toLowerCase();
    const risks: Risk[] = [];

    // Category-specific risk patterns
    if (category === 'security_response') {
      risks.push({
        type: 'security',
        description: 'Security vulnerability exposure during mitigation',
        impact: 'high',
        likelihood: 'medium',
        mitigation: 'Implement staged rollout with monitoring'
      });
    }

    if (category === 'architecture_design' && content.includes('migration')) {
      risks.push({
        type: 'operational',
        description: 'Service disruption during architecture transition',
        impact: 'medium',
        likelihood: 'medium',
        mitigation: 'Blue-green deployment strategy'
      });
    }

    if (category === 'technology_evaluation' && content.includes('new')) {
      risks.push({
        type: 'technical',
        description: 'Unknown technical debt from new technology adoption',
        impact: 'medium',
        likelihood: 'high',
        mitigation: 'Proof-of-concept with limited scope'
      });
    }

    if (category === 'infrastructure_planning') {
      risks.push({
        type: 'operational',
        description: 'Resource capacity planning inaccuracies',
        impact: 'medium',
        likelihood: 'medium',
        mitigation: 'Conservative estimates with buffer capacity'
      });
    }

    // Determine overall risk level
    const highRisks = risks.filter(r => r.impact === 'high' || r.impact === 'critical').length;
    const mediumRisks = risks.filter(r => r.impact === 'medium').length;
    
    let overallRisk: 'low' | 'medium' | 'high' | 'critical';
    if (highRisks > 0) overallRisk = 'high';
    else if (mediumRisks > 1) overallRisk = 'medium';
    else overallRisk = 'low';

    const mitigationStrategies = risks.map(r => r.mitigation);

    return { overallRisk, risks, mitigationStrategies };
  }

  /**
   * Estimate resource requirements
   */
  private estimateResources(
    task: TechnicalTask, 
    category: TaskCategory, 
    complexity: ComplexityScore
  ): ResourceRequirements {
    // Base resource requirements by category
    const baseRequirements = {
      architecture_design: { teamSize: 2, timeline: '2-4 weeks', technologies: ['Design Tools', 'Documentation'] },
      technology_evaluation: { teamSize: 1, timeline: '1-2 weeks', technologies: ['Testing Environment'] },
      security_response: { teamSize: 1, timeline: '1-3 days', technologies: ['Security Tools', 'Monitoring'] },
      infrastructure_planning: { teamSize: 2, timeline: '1-2 weeks', technologies: ['Infrastructure Tools', 'Monitoring'] }
    };

    const base = baseRequirements[category];
    
    // Adjust based on complexity
    const complexityMultiplier = { low: 1.0, medium: 1.5, high: 2.5 };
    const multiplier = complexityMultiplier[complexity.level];
    
    const teamSize = Math.ceil(base.teamSize * multiplier);
    const expertise = this.getRequiredExpertise(category, complexity);
    
    return {
      teamSize,
      timeline: base.timeline,
      technologies: base.technologies,
      expertise
    };
  }

  /**
   * Get required expertise for the task
   */
  private getRequiredExpertise(category: TaskCategory, complexity: ComplexityScore): string[] {
    const expertiseMap = {
      architecture_design: ['Solution Architecture', 'System Design', 'Distributed Systems'],
      technology_evaluation: ['Technology Research', 'Proof-of-Concept Development'],
      security_response: ['Security Engineering', 'Incident Response', 'Compliance'],
      infrastructure_planning: ['Infrastructure Engineering', 'Capacity Planning', 'Performance Optimization']
    };

    const base = expertiseMap[category] || [];
    
    if (complexity.level === 'high') {
      base.push('Senior Technical Leadership');
    }
    
    return base;
  }

  /**
   * Estimate project timeline
   */
  private estimateTimeline(complexity: ComplexityScore, riskAssessment: RiskAssessment): string {
    let baseWeeks = 1;
    
    // Complexity adjustment
    if (complexity.level === 'medium') baseWeeks = 2;
    else if (complexity.level === 'high') baseWeeks = 4;
    
    // Risk adjustment
    if (riskAssessment.overallRisk === 'high') baseWeeks *= 1.5;
    else if (riskAssessment.overallRisk === 'critical') baseWeeks *= 2;
    
    const weeks = Math.ceil(baseWeeks);
    return weeks === 1 ? '1 week' : `${weeks} weeks`;
  }

  /**
   * Generate specific recommendations based on analysis
   */
  private generateRecommendations(
    task: TechnicalTask,
    category: TaskCategory,
    complexity: ComplexityScore,
    riskAssessment: RiskAssessment
  ): string[] {
    const recommendations: string[] = [];
    
    // Category-specific recommendations
    if (category === 'architecture_design') {
      recommendations.push('Start with high-level service boundaries and data flow');
      if (complexity.level === 'high') {
        recommendations.push('Consider phased implementation approach');
        recommendations.push('Establish clear service contracts and API specifications');
      }
    }
    
    if (category === 'technology_evaluation') {
      recommendations.push('Develop proof-of-concept with real-world scenarios');
      recommendations.push('Evaluate total cost of ownership including training');
    }
    
    if (category === 'security_response') {
      recommendations.push('Prioritize by business impact and exploit likelihood');
      if (task.priority === 'critical') {
        recommendations.push('Implement immediate containment measures');
      }
    }
    
    if (category === 'infrastructure_planning') {
      recommendations.push('Include 30% buffer in capacity planning');
      recommendations.push('Design for horizontal scaling from the start');
    }
    
    // Risk-based recommendations
    if (riskAssessment.overallRisk === 'high') {
      recommendations.push('Implement comprehensive monitoring and rollback procedures');
    }
    
    // Complexity-based recommendations
    if (complexity.level === 'high') {
      recommendations.push('Break down into smaller, manageable phases');
      recommendations.push('Establish clear success criteria for each phase');
    }
    
    return recommendations;
  }

  /**
   * Calculate confidence score for the analysis
   */
  private calculateConfidence(
    task: TechnicalTask,
    category: TaskCategory,
    complexity: ComplexityScore
  ): number {
    let confidence = 80; // Base confidence
    
    // Adjust based on task detail quality
    if (task.description.length > 200) confidence += 10;
    if (task.description.length < 50) confidence -= 15;
    
    // Adjust based on complexity
    if (complexity.level === 'low') confidence += 10;
    else if (complexity.level === 'high') confidence -= 10;
    
    // Adjust based on category clarity
    const categoryKeywords = {
      architecture_design: this.CATEGORIZATION_CONFIG.architecture_design.keywords,
      technology_evaluation: this.CATEGORIZATION_CONFIG.technology_evaluation.keywords,
      security_response: this.CATEGORIZATION_CONFIG.security_response.keywords,
      infrastructure_planning: this.CATEGORIZATION_CONFIG.infrastructure_planning.keywords
    };
    
    const keywordScore = this.calculateKeywordScore(
      `${task.title} ${task.description}`.toLowerCase(),
      categoryKeywords[category]
    );
    
    if (keywordScore > 5) confidence += 5;
    else if (keywordScore < 2) confidence -= 10;
    
    return Math.max(50, Math.min(95, confidence));
  }

  /**
   * Backward compatibility method for categorizeTask
   */
  public categorizeTask(task: TechnicalTask): TaskCategory {
    return this.categorizeTaskWithAnalysis(task).category;
  }

  /**
   * Get categorization metrics for monitoring
   */
  public getCategorizationMetrics() {
    return {
      ...this.categorizationMetrics,
      meetingThreshold: this.categorizationMetrics.accuracyScore >= this.categorizationMetrics.confidenceThreshold
    };
  }

  /**
   * Validate the processor functionality
   */
  public async validate(): Promise<boolean> {
    try {
      // Test with a sample task
      const testTask: TechnicalTask = {
        id: 'test-001',
        title: 'Design microservices architecture',
        description: 'Need scalable architecture for high-throughput distributed system',
        category: 'architecture_design',
        priority: 'high',
        requestedBy: 'test-user',
        createdAt: new Date()
      };
      
      const analysis = await this.generateAnalysis(testTask);
      return analysis.confidence > 0 && analysis.category === 'architecture_design';
    } catch (error) {
      console.error('❌ Task processor validation failed:', error);
      return false;
    }
  }
}