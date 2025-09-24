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
  private readonly ARCHITECTURE_KEYWORDS = [
    'architecture', 'microservices', 'api', 'integration', 'system design', 
    'scalability', 'distributed systems', 'service mesh', 'event-driven'
  ];

  private readonly TECHNOLOGY_KEYWORDS = [
    'technology', 'framework', 'library', 'platform', 'tool', 'evaluation',
    'proof-of-concept', 'migration', 'upgrade', 'adoption'
  ];

  private readonly SECURITY_KEYWORDS = [
    'security', 'vulnerability', 'threat', 'compliance', 'encryption',
    'authentication', 'authorization', 'audit', 'penetration'
  ];

  private readonly INFRASTRUCTURE_KEYWORDS = [
    'infrastructure', 'scaling', 'capacity', 'performance', 'deployment',
    'monitoring', 'availability', 'disaster recovery', 'cloud'
  ];

  /**
   * Categorize a technical task based on content analysis
   */
  public categorizeTask(task: TechnicalTask): TaskCategory {
    const content = `${task.title} ${task.description}`.toLowerCase();
    
    const scores = {
      architecture_design: this.calculateKeywordScore(content, this.ARCHITECTURE_KEYWORDS),
      technology_evaluation: this.calculateKeywordScore(content, this.TECHNOLOGY_KEYWORDS),
      security_response: this.calculateKeywordScore(content, this.SECURITY_KEYWORDS),
      infrastructure_planning: this.calculateKeywordScore(content, this.INFRASTRUCTURE_KEYWORDS)
    };

    // Return category with highest score
    const maxCategory = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as TaskCategory] > scores[b[0] as TaskCategory] ? a : b
    )[0] as TaskCategory;

    console.log(`📊 Task categorized as: ${maxCategory} (scores:`, scores, ')');
    return maxCategory;
  }

  /**
   * Generate comprehensive technical analysis for a task
   */
  public async generateAnalysis(task: TechnicalTask): Promise<TechnicalAnalysis> {
    console.log(`🔍 Generating technical analysis for task: ${task.title}`);
    
    const category = this.categorizeTask(task);
    const complexity = this.assessComplexity(task, category);
    const riskAssessment = this.assessRisks(task, category);
    const resourceRequirements = this.estimateResources(task, category, complexity);
    
    const analysis: TechnicalAnalysis = {
      taskId: task.id,
      category,
      complexity,
      riskAssessment,
      resourceRequirements,
      timeline: this.estimateTimeline(complexity, riskAssessment),
      recommendations: this.generateRecommendations(task, category, complexity, riskAssessment),
      confidence: this.calculateConfidence(task, category, complexity)
    };

    console.log(`✅ Technical analysis completed with ${analysis.confidence}% confidence`);
    return analysis;
  }

  /**
   * Calculate keyword match score for categorization
   */
  private calculateKeywordScore(content: string, keywords: string[]): number {
    let score = 0;
    for (const keyword of keywords) {
      const matches = (content.match(new RegExp(keyword, 'gi')) || []).length;
      score += matches * (keyword.length / 10); // Weight by keyword specificity
    }
    return score;
  }

  /**
   * Assess task complexity based on category and content
   */
  private assessComplexity(task: TechnicalTask, category: TaskCategory): ComplexityScore {
    const content = `${task.title} ${task.description}`.toLowerCase();
    const factors: string[] = [];
    let score = 1; // Base complexity

    // Category-based complexity indicators
    const complexityIndicators = {
      architecture_design: ['distributed', 'microservices', 'real-time', 'high availability', 'multi-region'],
      technology_evaluation: ['migration', 'integration', 'multiple systems', 'legacy'],
      security_response: ['critical', 'breach', 'compliance', 'audit', 'vulnerability'],
      infrastructure_planning: ['scaling', 'high throughput', 'global', 'disaster recovery']
    };

    const indicators = complexityIndicators[category] || [];
    for (const indicator of indicators) {
      if (content.includes(indicator)) {
        factors.push(`Contains ${indicator} requirements`);
        score += 2;
      }
    }

    // Priority-based complexity adjustment
    const priorityMultiplier = {
      low: 1.0,
      medium: 1.2,
      high: 1.5,
      critical: 2.0
    };
    score *= priorityMultiplier[task.priority];
    factors.push(`Priority level: ${task.priority}`);

    // Content length complexity
    if (task.description.length > 500) {
      factors.push('Detailed requirements provided');
      score += 1;
    }

    // Determine complexity level
    let level: 'low' | 'medium' | 'high';
    if (score <= 3) level = 'low';
    else if (score <= 6) level = 'medium';
    else level = 'high';

    return { level, factors, score: Math.min(score, 10) };
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
      architecture_design: this.ARCHITECTURE_KEYWORDS,
      technology_evaluation: this.TECHNOLOGY_KEYWORDS,
      security_response: this.SECURITY_KEYWORDS,
      infrastructure_planning: this.INFRASTRUCTURE_KEYWORDS
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