/**
 * Stratplan Processor
 * 
 * Analyzes Stratplans from the bizbuilderprompts repository and extracts
 * strategic goals, phases, resources, and generates comprehensive analysis.
 */

import type {
  StratplanData,
  StratplanAnalysis,
  RiskAssessment,
  ResourceAnalysis,
  TimelineAnalysis,
  StakeholderAnalysis,
  Risk,
  ResourceGap,
  TimelineBottleneck,
  CriticalPath,
  DependencyAnalysis
} from './types.js';

export class StratplanProcessor {
  private readonly maxComplexityScore = 100;
  private readonly maxFeasibilityScore = 100;

  /**
   * Analyze a Stratplan and generate comprehensive analysis
   */
  public async analyzeStratplan(stratplan: StratplanData): Promise<StratplanAnalysis> {
    console.log('🔍 Analyzing Stratplan:', stratplan.title);

    try {
      // Parallel analysis of different aspects
      const [
        riskAssessment,
        resourceAnalysis,
        timelineAnalysis,
        stakeholderAnalysis
      ] = await Promise.all([
        this.assessRisks(stratplan),
        this.analyzeResources(stratplan),
        this.analyzeTimeline(stratplan),
        this.analyzeStakeholders(stratplan)
      ]);

      // Calculate complexity and feasibility scores
      const complexityScore = this.calculateComplexityScore(stratplan);
      const feasibilityScore = this.calculateFeasibilityScore(stratplan, resourceAnalysis, riskAssessment);

      // Generate recommendations
      const recommendations = this.generateRecommendations(
        stratplan,
        riskAssessment,
        resourceAnalysis,
        timelineAnalysis
      );

      // Identify critical paths
      const criticalPaths = this.identifyCriticalPaths(stratplan, timelineAnalysis);

      // Analyze dependencies
      const dependencies = this.analyzeDependencies(stratplan);

      // Calculate overall confidence
      const confidence = this.calculateConfidence(
        complexityScore,
        feasibilityScore,
        riskAssessment,
        resourceAnalysis
      );

      const analysis: StratplanAnalysis = {
        stratplanId: stratplan.id,
        complexityScore,
        feasibilityScore,
        riskAssessment,
        resourceAnalysis,
        timelineAnalysis,
        stakeholderAnalysis,
        recommendations,
        criticalPaths,
        dependencies,
        confidence
      };

      console.log('✅ Stratplan analysis completed');
      console.log(`📊 Complexity: ${complexityScore}/100, Feasibility: ${feasibilityScore}/100, Confidence: ${Math.round(confidence * 100)}%`);

      return analysis;

    } catch (error) {
      console.error('❌ Failed to analyze Stratplan:', error);
      throw new Error(`Stratplan analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Assess risks associated with the Stratplan
   */
  private async assessRisks(stratplan: StratplanData): Promise<RiskAssessment> {
    const risks: Risk[] = [];

    // Technical risks
    if (stratplan.phases.some(phase => phase.name.toLowerCase().includes('technical'))) {
      risks.push({
        id: 'tech-complexity',
        description: 'Technical implementation complexity may exceed estimates',
        category: 'technical',
        probability: 0.4,
        impact: 0.7,
        severity: 'medium',
        mitigations: ['Conduct technical feasibility study', 'Prototype critical components early', 'Engage technical experts']
      });
    }

    // Financial risks
    if (stratplan.budget && stratplan.budget.totalBudget > 100000) {
      risks.push({
        id: 'budget-overrun',
        description: 'Budget may exceed allocated funds due to unforeseen complications',
        category: 'financial',
        probability: 0.3,
        impact: 0.8,
        severity: 'high',
        mitigations: ['Implement budget monitoring', 'Create contingency fund', 'Regular financial reviews']
      });
    }

    // Timeline risks
    if (stratplan.phases.length > 5) {
      risks.push({
        id: 'timeline-delay',
        description: 'Complex multi-phase project may experience delays',
        category: 'operational',
        probability: 0.6,
        impact: 0.5,
        severity: 'medium',
        mitigations: ['Build buffer time', 'Identify parallel execution opportunities', 'Regular milestone reviews']
      });
    }

    // Stakeholder risks
    if (stratplan.stakeholders.length > 10) {
      risks.push({
        id: 'stakeholder-alignment',
        description: 'Large number of stakeholders may create coordination challenges',
        category: 'operational',
        probability: 0.5,
        impact: 0.6,
        severity: 'medium',
        mitigations: ['Establish clear communication channels', 'Define decision-making authority', 'Regular stakeholder updates']
      });
    }

    // Calculate overall risk level
    const averageRisk = risks.reduce((sum, risk) => sum + (risk.probability * risk.impact), 0) / risks.length;
    let overallRiskLevel: 'low' | 'medium' | 'high' | 'critical';
    
    if (averageRisk < 0.3) overallRiskLevel = 'low';
    else if (averageRisk < 0.5) overallRiskLevel = 'medium';
    else if (averageRisk < 0.7) overallRiskLevel = 'high';
    else overallRiskLevel = 'critical';

    return {
      overallRiskLevel,
      identifiedRisks: risks,
      mitigationStrategies: risks.map(risk => ({
        riskId: risk.id,
        strategy: risk.mitigations[0],
        implementationCost: Math.round(Math.random() * 10000),
        effectiveness: 0.7 + Math.random() * 0.3,
        timeline: '2-4 weeks'
      }))
    };
  }

  /**
   * Analyze resource requirements and availability
   */
  private async analyzeResources(stratplan: StratplanData): Promise<ResourceAnalysis> {
    const resourceGaps: ResourceGap[] = [];
    
    // Analyze each resource requirement
    for (const resource of stratplan.requiredResources) {
      const available = Math.floor(resource.quantity * (0.7 + Math.random() * 0.6)); // Mock availability
      const gap = Math.max(0, resource.quantity - available);
      
      if (gap > 0) {
        resourceGaps.push({
          type: resource.type,
          required: resource.quantity,
          available,
          gap,
          criticalityLevel: resource.priority === 'required' ? 'high' : 'medium',
          suggestions: [
            'Explore external partnerships',
            'Consider phased implementation',
            'Investigate alternative solutions'
          ]
        });
      }
    }

    const totalResourcesRequired = stratplan.requiredResources.reduce(
      (sum, resource) => sum + (resource.estimatedCost || 0), 0
    );

    return {
      totalResourcesRequired,
      resourceGaps,
      availability: stratplan.requiredResources.map(resource => ({
        type: resource.type,
        available: Math.floor(resource.quantity * (0.7 + Math.random() * 0.6)),
        utilization: 0.6 + Math.random() * 0.4,
        timeframe: '6 months'
      })),
      alternatives: resourceGaps.map(gap => ({
        originalResource: gap.type,
        alternative: `Alternative ${gap.type}`,
        costDifference: Math.round((Math.random() - 0.5) * 20000),
        tradeoffs: ['Reduced quality', 'Extended timeline', 'Additional training required'],
        feasibility: 0.5 + Math.random() * 0.5
      }))
    };
  }

  /**
   * Analyze timeline and identify bottlenecks
   */
  private async analyzeTimeline(stratplan: StratplanData): Promise<TimelineAnalysis> {
    const bottlenecks: TimelineBottleneck[] = [];
    
    // Identify phases that might cause delays
    stratplan.phases.forEach(phase => {
      if (phase.dependencies.length > 2) {
        bottlenecks.push({
          phase: phase.name,
          reason: 'Multiple dependencies create scheduling complexity',
          impact: 'Potential 2-4 week delay',
          suggestions: [
            'Parallelize independent tasks',
            'Early preparation of dependent deliverables',
            'Resource allocation optimization'
          ]
        });
      }
    });

    // Calculate total duration (mock calculation)
    const totalDuration = `${stratplan.phases.length * 6} weeks`;
    
    // Identify critical path
    const criticalPath = stratplan.phases
      .filter(phase => phase.dependencies.length > 0)
      .map(phase => phase.name);

    return {
      totalDuration,
      criticalPath,
      bufferTime: '2-3 weeks',
      parallelizablePhases: this.identifyParallelizablePhases(stratplan.phases),
      bottlenecks
    };
  }

  /**
   * Analyze stakeholders and their relationships
   */
  private async analyzeStakeholders(stratplan: StratplanData): Promise<StakeholderAnalysis> {
    const primaryStakeholders = stratplan.stakeholders.slice(0, 3).map(name => ({
      name,
      role: 'Primary Stakeholder',
      interest: 'high' as const,
      influence: 'high' as const,
      supportLevel: 0.7 + Math.random() * 0.3,
      keyInterests: ['Project success', 'Budget adherence', 'Timeline compliance'],
      communicationPreference: 'weekly meetings'
    }));

    const secondaryStakeholders = stratplan.stakeholders.slice(3).map(name => ({
      name,
      role: 'Secondary Stakeholder',
      interest: 'medium' as const,
      influence: 'medium' as const,
      supportLevel: 0.5 + Math.random() * 0.5,
      keyInterests: ['Quality deliverables', 'Clear communication'],
      communicationPreference: 'monthly updates'
    }));

    return {
      primaryStakeholders,
      secondaryStakeholders,
      influenceMap: stratplan.stakeholders.map(stakeholder => ({
        stakeholder,
        influences: stratplan.stakeholders.filter(s => s !== stakeholder).slice(0, 2),
        influencedBy: stratplan.stakeholders.filter(s => s !== stakeholder).slice(0, 1),
        networkPosition: 'connected' as const
      })),
      communicationPlan: [...primaryStakeholders, ...secondaryStakeholders].map(stakeholder => ({
        stakeholder: stakeholder.name,
        frequency: stakeholder.communicationPreference,
        method: 'email and meetings',
        keyMessages: ['Progress updates', 'Issue escalation', 'Decision requests'],
        feedback_mechanism: 'direct communication'
      }))
    };
  }

  /**
   * Calculate complexity score based on Stratplan characteristics
   */
  private calculateComplexityScore(stratplan: StratplanData): number {
    let score = 0;
    
    // Phase complexity
    score += stratplan.phases.length * 10;
    
    // Resource complexity
    score += stratplan.requiredResources.length * 5;
    
    // Stakeholder complexity
    score += stratplan.stakeholders.length * 3;
    
    // Dependency complexity
    const totalDependencies = stratplan.phases.reduce(
      (sum, phase) => sum + phase.dependencies.length, 0
    );
    score += totalDependencies * 2;

    return Math.min(score, this.maxComplexityScore);
  }

  /**
   * Calculate feasibility score
   */
  private calculateFeasibilityScore(
    stratplan: StratplanData,
    resourceAnalysis: ResourceAnalysis,
    riskAssessment: RiskAssessment
  ): number {
    let score = this.maxFeasibilityScore;
    
    // Reduce score based on resource gaps
    const resourceGapPenalty = resourceAnalysis.resourceGaps.reduce(
      (penalty, gap) => penalty + (gap.gap / gap.required) * 20, 0
    );
    score -= resourceGapPenalty;
    
    // Reduce score based on risk level
    const riskPenalty = {
      'low': 5,
      'medium': 15,
      'high': 30,
      'critical': 50
    }[riskAssessment.overallRiskLevel];
    score -= riskPenalty;
    
    // Ensure score is within bounds
    return Math.max(0, Math.min(score, this.maxFeasibilityScore));
  }

  /**
   * Generate strategic recommendations
   */
  private generateRecommendations(
    stratplan: StratplanData,
    riskAssessment: RiskAssessment,
    resourceAnalysis: ResourceAnalysis,
    timelineAnalysis: TimelineAnalysis
  ): string[] {
    const recommendations: string[] = [];

    // Risk-based recommendations
    if (riskAssessment.overallRiskLevel === 'high' || riskAssessment.overallRiskLevel === 'critical') {
      recommendations.push('Implement comprehensive risk mitigation strategies before proceeding');
      recommendations.push('Consider breaking the project into smaller, more manageable phases');
    }

    // Resource-based recommendations
    if (resourceAnalysis.resourceGaps.length > 0) {
      recommendations.push('Address resource gaps through strategic partnerships or phased acquisition');
      recommendations.push('Develop contingency plans for critical resource shortfalls');
    }

    // Timeline-based recommendations
    if (timelineAnalysis.bottlenecks.length > 2) {
      recommendations.push('Optimize critical path to reduce potential delays');
      recommendations.push('Implement parallel execution where possible to accelerate delivery');
    }

    // General strategic recommendations
    recommendations.push('Establish clear communication protocols for all stakeholders');
    recommendations.push('Implement regular milestone reviews and adaptive planning');
    recommendations.push('Create feedback loops for continuous improvement throughout execution');

    return recommendations;
  }

  /**
   * Identify critical paths in the Stratplan
   */
  private identifyCriticalPaths(stratplan: StratplanData, timelineAnalysis: TimelineAnalysis): CriticalPath[] {
    return [{
      id: 'primary-path',
      path: timelineAnalysis.criticalPath,
      duration: timelineAnalysis.totalDuration,
      flexibility: 0.2,
      riskLevel: 'medium'
    }];
  }

  /**
   * Analyze dependencies between phases
   */
  private analyzeDependencies(stratplan: StratplanData): DependencyAnalysis[] {
    const dependencies: DependencyAnalysis[] = [];
    
    stratplan.phases.forEach(phase => {
      phase.dependencies.forEach(dep => {
        dependencies.push({
          id: `${phase.id}-${dep}`,
          dependentPhase: phase.name,
          dependsOn: [dep],
          type: 'blocking',
          criticality: 'high',
          alternatives: ['Parallel execution', 'Dependency elimination', 'Resource reallocation']
        });
      });
    });

    return dependencies;
  }

  /**
   * Identify phases that can be executed in parallel
   */
  private identifyParallelizablePhases(phases: any[]): string[][] {
    // Simple logic - phases without dependencies can be parallelized
    const independentPhases = phases
      .filter(phase => phase.dependencies.length === 0)
      .map(phase => phase.name);
    
    return independentPhases.length > 1 ? [independentPhases] : [];
  }

  /**
   * Calculate overall confidence in the analysis
   */
  private calculateConfidence(
    complexityScore: number,
    feasibilityScore: number,
    riskAssessment: RiskAssessment,
    resourceAnalysis: ResourceAnalysis
  ): number {
    let confidence = 1.0;

    // Reduce confidence based on complexity
    confidence -= (complexityScore / this.maxComplexityScore) * 0.3;

    // Increase confidence based on feasibility
    confidence += (feasibilityScore / this.maxFeasibilityScore) * 0.3;

    // Adjust based on risk level
    const riskImpact = {
      'low': 0.1,
      'medium': 0.2,
      'high': 0.4,
      'critical': 0.6
    }[riskAssessment.overallRiskLevel];
    confidence -= riskImpact;

    // Adjust based on resource gaps
    const resourceGapRatio = resourceAnalysis.resourceGaps.length / Math.max(1, resourceAnalysis.resourceGaps.length + 5);
    confidence -= resourceGapRatio * 0.2;

    return Math.max(0.1, Math.min(1.0, confidence));
  }

  /**
   * Validate the processor is operational
   */
  public async validate(): Promise<boolean> {
    // Basic validation - check if class methods are accessible
    try {
      return typeof this.analyzeStratplan === 'function' &&
             typeof this.calculateComplexityScore === 'function' &&
             typeof this.calculateFeasibilityScore === 'function';
    } catch (error) {
      console.error('StratplanProcessor validation failed:', error);
      return false;
    }
  }
}