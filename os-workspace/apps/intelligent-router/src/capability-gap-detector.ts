/**
 * Capability Gap Detector - Identifies missing capabilities in the agent ecosystem
 * Analyzes task requirements against available agents to detect gaps requiring spawning
 */

import {
  RoutingTask,
  TaskAnalysisResult,
  AgentDomain,
  TaskPriority,
  StrategicImpact
} from './types';

export interface CapabilityGap {
  missingCapability: string;
  gapType: CapabilityGapType;
  confidence: number;
  severity: GapSeverity;
  shouldSpawn: boolean;
  reasons: string[];
  suggestedAgentType: string;
  priority: TaskPriority;
}

export enum CapabilityGapType {
  NO_AGENTS_AVAILABLE = 'no_agents_available',
  LOW_CONFIDENCE_MATCH = 'low_confidence_match',
  PERFORMANCE_INSUFFICIENT = 'performance_insufficient',
  SPECIALIZATION_NEEDED = 'specialization_needed'
}

export enum GapSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export class CapabilityGapDetector {
  private gapHistory: Map<string, CapabilityGap[]> = new Map();
  private spawnThresholds = {
    confidenceThreshold: 0.3,
    frequencyThreshold: 3, // Same gap detected 3+ times
    timeWindowHours: 24
  };

  constructor() {
    console.log('[CapabilityGapDetector] Initialized');
  }

  /**
   * Detects capability gaps based on task analysis and agent selection results
   */
  public async detectCapabilityGap(
    task: RoutingTask,
    analysis: TaskAnalysisResult
  ): Promise<CapabilityGap> {
    console.log(`[CapabilityGapDetector] Analyzing capability gap for task: ${task.id}`);

    // Identify the specific missing capability
    const missingCapability = this.identifyMissingCapability(task, analysis);
    
    // Determine gap type
    const gapType = this.determineGapType(task, analysis);
    
    // Calculate gap severity
    const severity = this.calculateGapSeverity(task, analysis, gapType);
    
    // Calculate confidence in gap detection
    const confidence = this.calculateGapConfidence(task, analysis, gapType);
    
    // Determine if spawning should occur
    const shouldSpawn = this.shouldSpawnAgent(missingCapability, gapType, severity, task);
    
    // Generate reasoning
    const reasons = this.generateGapReasons(task, analysis, gapType, severity);
    
    // Suggest agent type
    const suggestedAgentType = this.suggestAgentType(missingCapability, analysis);

    const gap: CapabilityGap = {
      missingCapability,
      gapType,
      confidence,
      severity,
      shouldSpawn,
      reasons,
      suggestedAgentType,
      priority: this.mapSeverityToPriority(severity, task.priority)
    };

    // Record gap for trend analysis
    this.recordGap(missingCapability, gap);

    console.log(`[CapabilityGapDetector] Gap detected: ${missingCapability} (${gapType}) - Spawn: ${shouldSpawn}`);
    
    return gap;
  }

  /**
   * Identifies the specific missing capability
   */
  private identifyMissingCapability(task: RoutingTask, analysis: TaskAnalysisResult): string {
    // Extract key terms from task description and title
    const taskText = `${task.title} ${task.description}`.toLowerCase();
    
    // Look for specific capability indicators
    const capabilityPatterns = {
      'customer-service': ['customer', 'support', 'help', 'inquiry', 'ticket'],
      'data-analysis': ['analyze', 'data', 'report', 'metrics', 'statistics'],
      'content-creation': ['create', 'write', 'generate', 'content', 'blog'],
      'technical-integration': ['integrate', 'api', 'connect', 'sync', 'webhook'],
      'financial-modeling': ['model', 'forecast', 'budget', 'financial', 'projection'],
      'security-audit': ['security', 'audit', 'vulnerability', 'compliance', 'risk'],
      'user-research': ['research', 'survey', 'interview', 'feedback', 'ux'],
      'social-media': ['social', 'twitter', 'linkedin', 'post', 'engagement']
    };

    // Score each capability pattern
    let bestMatch = 'specialized-capability';
    let bestScore = 0;

    for (const [capability, keywords] of Object.entries(capabilityPatterns)) {
      const score = keywords.reduce((acc, keyword) => {
        const matches = (taskText.match(new RegExp(keyword, 'gi')) || []).length;
        return acc + matches;
      }, 0);

      if (score > bestScore) {
        bestScore = score;
        bestMatch = capability;
      }
    }

    // If no pattern matches, use domain-based capability
    if (bestScore === 0) {
      const domainMap = {
        [AgentDomain.FINANCIAL]: 'financial-specialist',
        [AgentDomain.TECHNICAL]: 'technical-specialist',
        [AgentDomain.MARKETING]: 'marketing-specialist',
        [AgentDomain.COMMUNITY]: 'community-specialist',
        [AgentDomain.STRATEGIC]: 'strategic-specialist'
      };
      
      bestMatch = domainMap[analysis.domain_classification.primary_domain] || 'general-specialist';
    }

    return bestMatch;
  }

  /**
   * Determines the type of capability gap
   */
  private determineGapType(task: RoutingTask, analysis: TaskAnalysisResult): CapabilityGapType {
    // Check if this is a low confidence match situation
    if (analysis.domain_classification.confidence_score < this.spawnThresholds.confidenceThreshold) {
      return CapabilityGapType.LOW_CONFIDENCE_MATCH;
    }

    // Check if this is a specialization need
    if (analysis.complexity_score > 0.7 && analysis.strategic_impact === StrategicImpact.HIGH) {
      return CapabilityGapType.SPECIALIZATION_NEEDED;
    }

    // Check if this is performance insufficient
    if (task.priority === TaskPriority.URGENT || task.priority === TaskPriority.CRITICAL) {
      return CapabilityGapType.PERFORMANCE_INSUFFICIENT;
    }

    // Default to no agents available
    return CapabilityGapType.NO_AGENTS_AVAILABLE;
  }

  /**
   * Calculates the severity of the capability gap
   */
  private calculateGapSeverity(
    task: RoutingTask,
    analysis: TaskAnalysisResult,
    gapType: CapabilityGapType
  ): GapSeverity {
    let severityScore = 0;

    // Task priority influence
    const priorityWeights = {
      [TaskPriority.LOW]: 0.2,
      [TaskPriority.MEDIUM]: 0.4,
      [TaskPriority.HIGH]: 0.6,
      [TaskPriority.URGENT]: 0.8,
      [TaskPriority.CRITICAL]: 1.0
    };
    severityScore += priorityWeights[task.priority];

    // Strategic importance influence
    const strategicWeights = {
      [StrategicImpact.LOW]: 0.1,
      [StrategicImpact.MEDIUM]: 0.3,
      [StrategicImpact.HIGH]: 0.6,
      [StrategicImpact.CRITICAL]: 1.0
    };
    severityScore += strategicWeights[analysis.strategic_impact];

    // Gap type influence
    const gapTypeWeights = {
      [CapabilityGapType.NO_AGENTS_AVAILABLE]: 1.0,
      [CapabilityGapType.SPECIALIZATION_NEEDED]: 0.8,
      [CapabilityGapType.PERFORMANCE_INSUFFICIENT]: 0.6,
      [CapabilityGapType.LOW_CONFIDENCE_MATCH]: 0.4
    };
    severityScore += gapTypeWeights[gapType];

    // Complexity influence
    severityScore += analysis.complexity_score * 0.3;

    // Deadline urgency
    if (task.deadline && task.deadline <= new Date(Date.now() + 86400000)) { // Within 24 hours
      severityScore += 0.5;
    }

    // Map score to severity
    if (severityScore >= 2.5) return GapSeverity.CRITICAL;
    if (severityScore >= 2.0) return GapSeverity.HIGH;
    if (severityScore >= 1.5) return GapSeverity.MEDIUM;
    return GapSeverity.LOW;
  }

  /**
   * Calculates confidence in the gap detection
   */
  private calculateGapConfidence(
    task: RoutingTask,
    analysis: TaskAnalysisResult,
    gapType: CapabilityGapType
  ): number {
    let confidence = 0.5; // Base confidence

    // Higher confidence for clearer indicators
    if (analysis.domain_classification.confidence_score < 0.2) {
      confidence += 0.3; // Clear indication of gap
    }

    // Task description clarity
    if (task.description.length > 100) {
      confidence += 0.2; // More context available
    }

    // Frequency of similar gaps
    const capability = this.identifyMissingCapability(task, analysis);
    const historicalGaps = this.getRecentGaps(capability);
    if (historicalGaps.length >= 2) {
      confidence += 0.2; // Pattern detected
    }

    // Strategic importance
    if (analysis.strategic_impact !== StrategicImpact.LOW) {
      confidence += 0.1;
    }

    return Math.min(1.0, confidence);
  }

  /**
   * Determines if an agent should be spawned for this gap
   */
  private shouldSpawnAgent(
    capability: string,
    gapType: CapabilityGapType,
    severity: GapSeverity,
    task: RoutingTask
  ): boolean {
    // Never spawn for low severity gaps
    if (severity === GapSeverity.LOW) {
      return false;
    }

    // Always spawn for critical gaps
    if (severity === GapSeverity.CRITICAL) {
      return true;
    }

    // Check frequency threshold for medium/high severity
    const recentGaps = this.getRecentGaps(capability);
    if (recentGaps.length >= this.spawnThresholds.frequencyThreshold) {
      return true;
    }

    // Spawn for high-priority strategic tasks
    if (task.strategic_importance && task.priority >= TaskPriority.HIGH) {
      return true;
    }

    // Special cases based on gap type
    if (gapType === CapabilityGapType.NO_AGENTS_AVAILABLE && severity === GapSeverity.HIGH) {
      return true;
    }

    return false;
  }

  /**
   * Generates reasons for the capability gap
   */
  private generateGapReasons(
    task: RoutingTask,
    analysis: TaskAnalysisResult,
    gapType: CapabilityGapType,
    severity: GapSeverity
  ): string[] {
    const reasons: string[] = [];

    // Gap type specific reasons
    switch (gapType) {
      case CapabilityGapType.NO_AGENTS_AVAILABLE:
        reasons.push('No agents available with required capability');
        break;
      case CapabilityGapType.LOW_CONFIDENCE_MATCH:
        reasons.push(`Low confidence match (${analysis.domain_classification.confidence_score.toFixed(2)})`);
        break;
      case CapabilityGapType.PERFORMANCE_INSUFFICIENT:
        reasons.push('Available agents cannot meet performance requirements');
        break;
      case CapabilityGapType.SPECIALIZATION_NEEDED:
        reasons.push('Task requires specialized expertise not available');
        break;
    }

    // Severity specific reasons
    if (severity === GapSeverity.CRITICAL || severity === GapSeverity.HIGH) {
      reasons.push(`High priority task (${task.priority})`);
    }

    if (analysis.strategic_impact !== StrategicImpact.LOW) {
      reasons.push(`Strategic importance: ${analysis.strategic_impact}`);
    }

    if (analysis.complexity_score > 0.7) {
      reasons.push(`High complexity task (${analysis.complexity_score.toFixed(2)})`);
    }

    // Frequency reasons
    const capability = this.identifyMissingCapability(task, analysis);
    const recentGaps = this.getRecentGaps(capability);
    if (recentGaps.length >= 2) {
      reasons.push(`Recurring gap: ${recentGaps.length} similar requests in 24h`);
    }

    return reasons;
  }

  /**
   * Suggests appropriate agent type for the capability
   */
  private suggestAgentType(capability: string, analysis: TaskAnalysisResult): string {
    const domainAgentTypes = {
      [AgentDomain.FINANCIAL]: 'financial-specialist',
      [AgentDomain.TECHNICAL]: 'technical-specialist',
      [AgentDomain.MARKETING]: 'marketing-specialist',
      [AgentDomain.COMMUNITY]: 'community-specialist',
      [AgentDomain.STRATEGIC]: 'strategic-specialist'
    };

    // Use domain mapping first
    const domainType = domainAgentTypes[analysis.domain_classification.primary_domain];
    if (domainType) {
      return domainType;
    }

    // Use capability-specific mapping
    const capabilityAgentTypes = {
      'customer-service': 'communication-agent',
      'data-analysis': 'business-analyst',
      'content-creation': 'creative-specialist',
      'technical-integration': 'integration-specialist',
      'financial-modeling': 'financial-analyst',
      'security-audit': 'security-specialist'
    };

    return capabilityAgentTypes[capability] || 'specialized-capability';
  }

  /**
   * Maps severity to spawn priority
   */
  private mapSeverityToPriority(severity: GapSeverity, originalPriority: TaskPriority): TaskPriority {
    const severityToPriority = {
      [GapSeverity.CRITICAL]: TaskPriority.CRITICAL,
      [GapSeverity.HIGH]: TaskPriority.HIGH,
      [GapSeverity.MEDIUM]: TaskPriority.MEDIUM,
      [GapSeverity.LOW]: TaskPriority.LOW
    };

    // Use higher of severity mapping or original task priority
    const severityPriority = severityToPriority[severity];
    return this.getHigherPriority(severityPriority, originalPriority);
  }

  private getHigherPriority(priority1: TaskPriority, priority2: TaskPriority): TaskPriority {
    const priorityOrder = [
      TaskPriority.LOW,
      TaskPriority.MEDIUM,
      TaskPriority.HIGH,
      TaskPriority.URGENT,
      TaskPriority.CRITICAL
    ];

    const index1 = priorityOrder.indexOf(priority1);
    const index2 = priorityOrder.indexOf(priority2);
    
    return index1 > index2 ? priority1 : priority2;
  }

  /**
   * Records gap for trend analysis
   */
  private recordGap(capability: string, gap: CapabilityGap): void {
    if (!this.gapHistory.has(capability)) {
      this.gapHistory.set(capability, []);
    }

    const gaps = this.gapHistory.get(capability)!;
    gaps.push(gap);

    // Keep only recent gaps (within time window)
    const timeWindowMs = this.spawnThresholds.timeWindowHours * 60 * 60 * 1000;
    const cutoffTime = Date.now() - timeWindowMs;
    
    this.gapHistory.set(
      capability,
      gaps.filter(g => Date.now() < cutoffTime + timeWindowMs) // Simplified for demo
    );
  }

  /**
   * Gets recent gaps for a capability
   */
  private getRecentGaps(capability: string): CapabilityGap[] {
    return this.gapHistory.get(capability) || [];
  }

  /**
   * Gets gap analysis summary
   */
  public getGapAnalysis(): { capability: string; frequency: number; lastSeen: Date }[] {
    const analysis: { capability: string; frequency: number; lastSeen: Date }[] = [];

    for (const [capability, gaps] of this.gapHistory) {
      if (gaps.length > 0) {
        analysis.push({
          capability,
          frequency: gaps.length,
          lastSeen: new Date() // Simplified for demo
        });
      }
    }

    return analysis.sort((a, b) => b.frequency - a.frequency);
  }
}