/**
 * TaskAnalyzer - Advanced task content analysis service
 * Performs sophisticated analysis of incoming tasks to extract metadata,
 * classify domains, assess complexity, and identify routing requirements
 */

import {
  RoutingTask,
  TaskAnalysisResult,
  DomainClassification,
  DomainScore,
  AgentDomain,
  StrategicImpact,
  ResourceRequirement,
  TaskPriority,
} from './types';

export class TaskAnalyzer {
  private readonly domainKeywords: Record<AgentDomain, string[]>;
  private readonly complexityIndicators: string[];
  private readonly strategicKeywords: string[];

  constructor() {
    this.domainKeywords = {
      [AgentDomain.FINANCIAL]: [
        'financial', 'budget', 'quarterly', 'revenue', 'cost', 'investment', 
        'roi', 'funding', 'accounting', 'profit', 'expenses', 'cash flow',
        'financial analysis', 'earnings', 'balance sheet', 'income statement',
        'profitability', 'margin', 'pricing', 'valuation', 'audit'
      ],
      [AgentDomain.TECHNICAL]: [
        'feature', 'application', 'security', 'infrastructure', 'development',
        'architecture', 'technical', 'engineering', 'code', 'system', 'software',
        'deployment', 'database', 'api', 'integration', 'scalability',
        'performance', 'debugging', 'testing', 'devops', 'cloud'
      ],
      [AgentDomain.MARKETING]: [
        'marketing', 'campaign', 'brand', 'promotion', 'advertising', 'growth',
        'customer', 'engagement', 'social media', 'content', 'seo', 'conversion',
        'lead generation', 'branding', 'positioning', 'market research',
        'customer acquisition', 'retention', 'analytics', 'metrics'
      ],
      [AgentDomain.COMMUNITY]: [
        'community', 'outreach', 'stakeholder', 'governance', 'social',
        'relationship', 'partnership', 'engagement', 'communication',
        'collaboration', 'networking', 'public relations', 'events',
        'user feedback', 'community building', 'advocacy', 'support'
      ],
      [AgentDomain.STRATEGIC]: [
        'strategic', 'planning', 'vision', 'roadmap', 'executive', 'leadership',
        'decision', 'direction', 'long-term', 'goals', 'objectives', 'strategy',
        'competitive analysis', 'market positioning', 'innovation',
        'transformation', 'expansion', 'acquisition', 'partnership'
      ],
      [AgentDomain.LEGAL]: [
        'legal', 'compliance', 'regulation', 'contract', 'terms', 'privacy',
        'gdpr', 'intellectual property', 'trademark', 'copyright', 'license',
        'liability', 'risk management', 'policy', 'governance framework'
      ],
      [AgentDomain.OPERATIONS]: [
        'operations', 'process', 'workflow', 'efficiency', 'optimization',
        'automation', 'logistics', 'supply chain', 'quality control',
        'resource management', 'coordination', 'implementation'
      ]
    };

    this.complexityIndicators = [
      'multi-step', 'complex', 'coordination', 'integration', 'cross-functional',
      'multiple stakeholders', 'dependencies', 'timeline', 'resources',
      'approval required', 'review process', 'multiple phases'
    ];

    this.strategicKeywords = [
      'strategic', 'critical', 'important', 'priority', 'urgent', 'high-impact',
      'company-wide', 'organization', 'business-critical', 'competitive advantage',
      'growth', 'expansion', 'transformation', 'innovation'
    ];
  }

  /**
   * Analyzes a routing task and returns comprehensive analysis results
   */
  public async analyzeTask(task: RoutingTask): Promise<TaskAnalysisResult> {
    console.log(`[TaskAnalyzer] Analyzing task: ${task.id}`);

    const keywords = this.extractKeywords(task);
    const domainClassification = this.classifyDomains(task, keywords);
    const complexityScore = this.assessComplexity(task, keywords);
    const resourceRequirements = this.analyzeResourceRequirements(task, keywords);
    const strategicImpact = this.assessStrategicImpact(task, keywords);
    const uncertaintyIndicators = this.identifyUncertaintyIndicators(task, domainClassification);

    const analysisResult: TaskAnalysisResult = {
      keywords,
      domain_classification: domainClassification,
      complexity_score: complexityScore,
      resource_requirements: resourceRequirements,
      strategic_impact: strategicImpact,
      uncertainty_indicators: uncertaintyIndicators
    };

    console.log(`[TaskAnalyzer] Analysis complete for task ${task.id}:`, {
      primaryDomain: domainClassification.primary_domain,
      confidence: domainClassification.confidence_score,
      complexity: complexityScore,
      strategicImpact
    });

    return analysisResult;
  }

  /**
   * Extracts relevant keywords from task content
   */
  private extractKeywords(task: RoutingTask): string[] {
    const text = `${task.title} ${task.description}`.toLowerCase();
    const words = text.split(/\s+/);
    
    // Extract domain-specific keywords
    const domainKeywords: string[] = [];
    Object.values(this.domainKeywords).flat().forEach(keyword => {
      if (text.includes(keyword.toLowerCase())) {
        domainKeywords.push(keyword);
      }
    });

    // Extract complexity and strategic keywords
    const specialKeywords: string[] = [];
    [...this.complexityIndicators, ...this.strategicKeywords].forEach(keyword => {
      if (text.includes(keyword.toLowerCase())) {
        specialKeywords.push(keyword);
      }
    });

    // Include domain hints if provided
    const hintKeywords = task.domain_hints || [];

    // Combine and deduplicate keywords
    const allKeywords = [...domainKeywords, ...specialKeywords, ...hintKeywords];
    return [...new Set(allKeywords)];
  }

  /**
   * Classifies task into domain categories with confidence scores
   */
  private classifyDomains(task: RoutingTask, keywords: string[]): DomainClassification {
    const text = `${task.title} ${task.description}`.toLowerCase();
    const domainScores: DomainScore[] = [];

    // Calculate scores for each domain
    Object.entries(this.domainKeywords).forEach(([domain, domainKeywords]) => {
      const matchingKeywords = keywords.filter(keyword => 
        domainKeywords.some(dk => dk.toLowerCase().includes(keyword.toLowerCase()) || 
                                keyword.toLowerCase().includes(dk.toLowerCase()))
      );

      // Calculate base score from keyword matches
      let score = matchingKeywords.length / domainKeywords.length;

      // Apply domain hints bonus
      if (task.domain_hints?.includes(domain)) {
        score += 0.2;
      }

      // Apply priority multiplier for strategic tasks
      if (task.strategic_importance && domain === AgentDomain.STRATEGIC) {
        score += 0.15;
      }

      // Generate reasoning for the score
      const reasoning = this.generateDomainReasoning(domain as AgentDomain, matchingKeywords, score);

      domainScores.push({
        domain: domain as AgentDomain,
        score: Math.min(score, 1.0), // Cap at 1.0
        matching_keywords: matchingKeywords,
        reasoning
      });
    });

    // Sort by score and identify primary domain
    domainScores.sort((a, b) => b.score - a.score);
    const primaryDomain = domainScores[0]?.domain || AgentDomain.STRATEGIC;
    const primaryScore = domainScores[0]?.score || 0;
    
    // Check for multi-domain tasks
    const secondaryScore = domainScores[1]?.score || 0;
    const multiDomain = secondaryScore > 0.3 && (primaryScore - secondaryScore) < 0.3;

    // Calculate overall confidence
    const confidenceScore = multiDomain ? 
      Math.max(0.4, primaryScore - 0.2) : // Reduce confidence for multi-domain
      Math.min(0.95, primaryScore + 0.1); // Boost confidence for clear single-domain

    return {
      domains: domainScores,
      primary_domain: primaryDomain,
      confidence_score: confidenceScore,
      multi_domain: multiDomain
    };
  }

  /**
   * Assesses task complexity on a scale of 0-1
   */
  private assessComplexity(task: RoutingTask, keywords: string[]): number {
    let complexityScore = 0;

    // Base complexity from task description length
    const descriptionLength = task.description.length;
    complexityScore += Math.min(0.3, descriptionLength / 1000);

    // Complexity indicators
    const complexityMatches = keywords.filter(keyword => 
      this.complexityIndicators.some(ci => ci.toLowerCase().includes(keyword.toLowerCase()))
    );
    complexityScore += complexityMatches.length * 0.15;

    // Resource requirements complexity
    if (task.resource_requirements && task.resource_requirements.length > 0) {
      complexityScore += task.resource_requirements.length * 0.1;
    }

    // Priority-based complexity
    const priorityComplexity = {
      [TaskPriority.LOW]: 0,
      [TaskPriority.MEDIUM]: 0.1,
      [TaskPriority.HIGH]: 0.2,
      [TaskPriority.URGENT]: 0.25,
      [TaskPriority.CRITICAL]: 0.3
    };
    complexityScore += priorityComplexity[task.priority] || 0;

    // Strategic importance adds complexity
    if (task.strategic_importance) {
      complexityScore += 0.2;
    }

    // Deadline pressure
    if (task.deadline) {
      const now = new Date();
      const timeToDeadline = task.deadline.getTime() - now.getTime();
      const hoursToDeadline = timeToDeadline / (1000 * 60 * 60);
      
      if (hoursToDeadline < 24) {
        complexityScore += 0.2; // Urgent deadline
      } else if (hoursToDeadline < 72) {
        complexityScore += 0.1; // Tight deadline
      }
    }

    return Math.min(1.0, complexityScore);
  }

  /**
   * Analyzes resource requirements for the task
   */
  private analyzeResourceRequirements(task: RoutingTask, keywords: string[]): ResourceRequirement[] {
    const requirements: ResourceRequirement[] = [];

    // Include existing requirements
    if (task.resource_requirements) {
      requirements.push(...task.resource_requirements);
    }

    // Infer additional requirements from keywords
    const hasComputationalKeywords = keywords.some(k => 
      ['analysis', 'processing', 'calculation', 'modeling', 'simulation'].includes(k.toLowerCase())
    );
    if (hasComputationalKeywords) {
      requirements.push({
        resource_type: 'computational',
        amount: 1,
        unit: 'instance',
        availability_required: true
      });
    }

    const hasExpertiseKeywords = keywords.some(k => 
      ['specialized', 'expert', 'technical', 'complex', 'advanced'].includes(k.toLowerCase())
    );
    if (hasExpertiseKeywords) {
      requirements.push({
        resource_type: 'expertise',
        amount: 1,
        unit: 'specialist',
        availability_required: true
      });
    }

    const hasApprovalKeywords = keywords.some(k => 
      ['approval', 'review', 'sign-off', 'authorization', 'permission'].includes(k.toLowerCase())
    );
    if (hasApprovalKeywords) {
      requirements.push({
        resource_type: 'approval',
        amount: 1,
        unit: 'authorization',
        availability_required: true
      });
    }

    return requirements;
  }

  /**
   * Assesses strategic impact of the task
   */
  private assessStrategicImpact(task: RoutingTask, keywords: string[]): StrategicImpact {
    let impactScore = 0;

    // Strategic importance flag
    if (task.strategic_importance) {
      impactScore += 0.4;
    }

    // Strategic keywords
    const strategicMatches = keywords.filter(keyword => 
      this.strategicKeywords.some(sk => sk.toLowerCase().includes(keyword.toLowerCase()))
    );
    impactScore += strategicMatches.length * 0.15;

    // Priority impact
    const priorityImpact = {
      [TaskPriority.LOW]: 0,
      [TaskPriority.MEDIUM]: 0.1,
      [TaskPriority.HIGH]: 0.2,
      [TaskPriority.URGENT]: 0.25,
      [TaskPriority.CRITICAL]: 0.3
    };
    impactScore += priorityImpact[task.priority] || 0;

    // Convert score to enum
    if (impactScore >= 0.7) return StrategicImpact.CRITICAL;
    if (impactScore >= 0.5) return StrategicImpact.HIGH;
    if (impactScore >= 0.3) return StrategicImpact.MEDIUM;
    return StrategicImpact.LOW;
  }

  /**
   * Identifies uncertainty indicators that might require escalation
   */
  private identifyUncertaintyIndicators(task: RoutingTask, domainClassification: DomainClassification): string[] {
    const indicators: string[] = [];

    // Low confidence in domain classification
    if (domainClassification.confidence_score < 0.6) {
      indicators.push('Low confidence in domain classification');
    }

    // Multi-domain complexity
    if (domainClassification.multi_domain) {
      indicators.push('Multi-domain task requiring coordination');
    }

    // Unclear or vague task description
    if (task.description.length < 50) {
      indicators.push('Task description too brief for accurate analysis');
    }

    // Missing critical information
    if (!task.priority || task.priority === TaskPriority.LOW) {
      indicators.push('Priority level not clearly specified');
    }

    // Conflicting indicators
    const domains = domainClassification.domains.filter(d => d.score > 0.3);
    if (domains.length > 2) {
      indicators.push('Multiple domains with significant relevance');
    }

    return indicators;
  }

  /**
   * Generates human-readable reasoning for domain classification
   */
  private generateDomainReasoning(domain: AgentDomain, matchingKeywords: string[], score: number): string {
    if (matchingKeywords.length === 0) {
      return `No domain-specific keywords found for ${domain}`;
    }

    const keywordList = matchingKeywords.slice(0, 3).join(', ');
    const confidenceLevel = score > 0.7 ? 'high' : score > 0.4 ? 'moderate' : 'low';
    
    return `${confidenceLevel} confidence based on keywords: ${keywordList}${matchingKeywords.length > 3 ? ` and ${matchingKeywords.length - 3} others` : ''}`;
  }

  /**
   * Validates analysis results for quality assurance
   */
  public validateAnalysis(analysis: TaskAnalysisResult): boolean {
    // Check required fields
    if (!analysis.domain_classification || !analysis.domain_classification.primary_domain) {
      console.warn('[TaskAnalyzer] Invalid analysis: missing domain classification');
      return false;
    }

    // Check confidence bounds
    const confidence = analysis.domain_classification.confidence_score;
    if (confidence < 0 || confidence > 1) {
      console.warn('[TaskAnalyzer] Invalid analysis: confidence score out of bounds');
      return false;
    }

    // Check complexity bounds
    if (analysis.complexity_score < 0 || analysis.complexity_score > 1) {
      console.warn('[TaskAnalyzer] Invalid analysis: complexity score out of bounds');
      return false;
    }

    return true;
  }
}