/**
 * DAO Proposal Generator
 * 
 * Transforms Stratplan analysis into formal DAO proposals in both
 * Markdown and JSON formats for submission to DAO governance systems.
 */

import type {
  StratplanAnalysis,
  StratplanData,
  DAOProposal,
  ExecutionPlan,
  ExecutionPhase,
  BudgetRequest,
  ProposalTimeline,
  ExecutionTask
} from './types.js';

export class DAOProposalGenerator {
  private readonly proposalTemplates = {
    strategic: 'Strategic Initiative Proposal',
    operational: 'Operational Enhancement Proposal', 
    financial: 'Financial Allocation Proposal',
    governance: 'Governance Improvement Proposal',
    technical: 'Technical Implementation Proposal'
  };

  /**
   * Generate a comprehensive DAO proposal from Stratplan analysis
   */
  public async generateProposal(analysis: StratplanAnalysis): Promise<DAOProposal> {
    console.log('📝 Generating DAO proposal for Stratplan:', analysis.stratplanId);

    try {
      const proposalId = this.generateProposalId();
      const proposalType = this.determineProposalType(analysis);
      
      // Build core proposal components
      const objectives = this.extractObjectives(analysis);
      const executionPlan = await this.createExecutionPlan(analysis);
      const budgetRequest = this.createBudgetRequest(analysis);
      const timeline = this.createProposalTimeline(analysis);
      const successCriteria = this.defineSuccessCriteria(analysis);

      // Generate formatted content
      const markdownContent = await this.generateMarkdownContent({
        id: proposalId,
        title: this.generateTitle(analysis, proposalType),
        proposalType,
        objectives,
        executionPlan,
        budgetRequest,
        timeline,
        successCriteria,
        analysis
      });

      const jsonContent = await this.generateJsonContent({
        id: proposalId,
        proposalType,
        objectives,
        executionPlan,
        budgetRequest,
        timeline,
        successCriteria,
        analysis
      });

      const proposal: DAOProposal = {
        id: proposalId,
        title: this.generateTitle(analysis, proposalType),
        description: this.generateDescription(analysis),
        proposalType,
        stratplanId: analysis.stratplanId,
        objectives,
        executionPlan,
        budgetRequest,
        timeline,
        success_criteria: successCriteria,
        votingPeriod: this.calculateVotingPeriod(proposalType),
        quorum: this.calculateQuorum(proposalType),
        requiredApproval: this.calculateRequiredApproval(proposalType),
        stakeholders: this.extractStakeholders(analysis),
        markdownContent,
        jsonContent,
        createdAt: new Date(),
        createdBy: 'Chief of Staff Agent (Ortega)',
        version: '1.0.0',
        status: 'draft'
      };

      console.log('✅ DAO proposal generated successfully');
      console.log(`📋 Proposal: ${proposal.title} (${proposal.proposalType})`);
      console.log(`💰 Budget: ${budgetRequest?.totalAmount || 0} ${budgetRequest?.currency || 'USD'}`);
      console.log(`⏱️ Timeline: ${timeline.estimatedCompletionDate ? 
        Math.ceil((timeline.estimatedCompletionDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 7)) 
        : 'TBD'} weeks`);

      return proposal;

    } catch (error) {
      console.error('❌ Failed to generate DAO proposal:', error);
      throw new Error(`DAO proposal generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate unique proposal ID
   */
  private generateProposalId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `DAO-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Determine the type of DAO proposal based on analysis
   */
  private determineProposalType(analysis: StratplanAnalysis): 'strategic' | 'operational' | 'financial' | 'governance' | 'technical' {
    // Logic to determine proposal type based on analysis characteristics
    if (analysis.resourceAnalysis.totalResourcesRequired > 100000) {
      return 'financial';
    }
    if (analysis.complexityScore > 70) {
      return 'strategic';
    }
    if (analysis.dependencies.some(dep => dep.type === 'blocking')) {
      return 'operational';
    }
    if (analysis.riskAssessment.overallRiskLevel === 'high' || analysis.riskAssessment.overallRiskLevel === 'critical') {
      return 'governance';
    }
    return 'technical';
  }

  /**
   * Extract objectives from analysis
   */
  private extractObjectives(analysis: StratplanAnalysis): string[] {
    const objectives: string[] = [];
    
    // Generate objectives based on analysis insights
    objectives.push('Execute strategic initiative according to approved timeline');
    
    if (analysis.riskAssessment.overallRiskLevel !== 'low') {
      objectives.push('Implement comprehensive risk mitigation measures');
    }
    
    if (analysis.resourceAnalysis.resourceGaps.length > 0) {
      objectives.push('Address identified resource gaps through strategic allocation');
    }
    
    objectives.push('Achieve defined success criteria within budget constraints');
    objectives.push('Maintain stakeholder alignment throughout execution');
    
    // Add recommendation-based objectives
    analysis.recommendations.slice(0, 3).forEach(rec => {
      objectives.push(`Implement: ${rec}`);
    });

    return objectives;
  }

  /**
   * Create detailed execution plan
   */
  private async createExecutionPlan(analysis: StratplanAnalysis): Promise<ExecutionPlan> {
    const phases: ExecutionPhase[] = [];
    
    // Phase 1: Preparation and Setup
    phases.push({
      id: 'phase-1-prep',
      name: 'Preparation and Setup',
      description: 'Initial setup, resource allocation, and stakeholder alignment',
      objectives: [
        'Secure required resources and stakeholder buy-in',
        'Establish project governance structure',
        'Complete risk mitigation setup'
      ],
      tasks: [
        {
          id: 'task-1-1',
          name: 'Resource Procurement',
          description: 'Acquire and allocate necessary resources',
          assignedTo: 'Resource Manager',
          estimatedHours: 40,
          dependencies: [],
          deliverables: ['Resource allocation plan', 'Vendor agreements']
        },
        {
          id: 'task-1-2', 
          name: 'Governance Setup',
          description: 'Establish project governance and communication protocols',
          assignedTo: 'Project Manager',
          estimatedHours: 24,
          dependencies: ['task-1-1'],
          deliverables: ['Governance framework', 'Communication plan']
        }
      ],
      duration: '2-3 weeks',
      budget: Math.round(analysis.resourceAnalysis.totalResourcesRequired * 0.2),
      responsible_agents: ['Project Manager', 'Resource Manager'],
      deliverables: ['Project charter', 'Resource allocation', 'Risk mitigation plan']
    });

    // Phase 2: Core Implementation
    phases.push({
      id: 'phase-2-impl',
      name: 'Core Implementation',
      description: 'Primary execution of strategic initiatives',
      objectives: [
        'Execute core strategic initiatives',
        'Monitor progress against milestones',
        'Maintain quality standards'
      ],
      tasks: analysis.criticalPaths.slice(0, 5).map((path, index) => ({
        id: `task-2-${index + 1}`,
        name: `Critical Path Execution ${index + 1}`,
        description: `Execute critical path: ${path.path.join(' → ')}`,
        assignedTo: 'Implementation Team',
        estimatedHours: 80,
        dependencies: index === 0 ? ['task-1-2'] : [`task-2-${index}`],
        deliverables: [`Milestone ${index + 1} completion`, 'Progress report']
      })),
      duration: '8-12 weeks',
      budget: Math.round(analysis.resourceAnalysis.totalResourcesRequired * 0.6),
      responsible_agents: ['Implementation Team', 'Quality Assurance'],
      deliverables: ['Core deliverables', 'Progress reports', 'Quality assessments']
    });

    // Phase 3: Validation and Closure
    phases.push({
      id: 'phase-3-closure',
      name: 'Validation and Closure',
      description: 'Final validation, stakeholder approval, and project closure',
      objectives: [
        'Validate all deliverables against success criteria',
        'Obtain stakeholder approval',
        'Document lessons learned'
      ],
      tasks: [
        {
          id: 'task-3-1',
          name: 'Final Validation',
          description: 'Comprehensive validation of all deliverables',
          assignedTo: 'Validation Team',
          estimatedHours: 32,
          dependencies: ['task-2-5'],
          deliverables: ['Validation report', 'Acceptance criteria verification']
        }
      ],
      duration: '2-3 weeks',
      budget: Math.round(analysis.resourceAnalysis.totalResourcesRequired * 0.2),
      responsible_agents: ['Validation Team', 'Stakeholder Representatives'],
      deliverables: ['Final deliverables', 'Project closure report', 'Lessons learned']
    });

    return {
      phases,
      dependencies: phases.map((phase, index) => ({
        id: `dep-${index}`,
        fromPhase: index > 0 ? phases[index - 1].id : '',
        toPhase: phase.id,
        type: 'hard' as const,
        description: `${phase.name} depends on completion of previous phase`
      })).filter(dep => dep.fromPhase !== ''),
      milestones: phases.map((phase, index) => ({
        id: `milestone-${index + 1}`,
        name: `${phase.name} Completion`,
        description: `Complete all deliverables for ${phase.name}`,
        targetDate: new Date(Date.now() + (index + 1) * 4 * 7 * 24 * 60 * 60 * 1000), // 4 weeks per phase
        success_criteria: phase.objectives,
        deliverables: phase.deliverables
      })),
      resourceAllocations: phases.map(phase => ({
        phase: phase.name,
        resourceType: 'Mixed Resources',
        amount: phase.budget,
        duration: phase.duration,
        cost: phase.budget,
        source: 'DAO Treasury'
      }))
    };
  }

  /**
   * Create budget request based on analysis
   */
  private createBudgetRequest(analysis: StratplanAnalysis): BudgetRequest | undefined {
    if (analysis.resourceAnalysis.totalResourcesRequired === 0) {
      return undefined;
    }

    const totalAmount = analysis.resourceAnalysis.totalResourcesRequired;
    const contingency = Math.round(totalAmount * 0.15); // 15% contingency

    return {
      totalAmount: totalAmount + contingency,
      currency: 'USD',
      breakdown: [
        {
          category: 'Personnel',
          amount: Math.round(totalAmount * 0.6),
          percentage: 60,
          justification: 'Human resources for project execution'
        },
        {
          category: 'Technology',
          amount: Math.round(totalAmount * 0.25),
          percentage: 25,
          justification: 'Technical infrastructure and tools'
        },
        {
          category: 'Operations',
          amount: Math.round(totalAmount * 0.15),
          percentage: 15,
          justification: 'Operational expenses and overhead'
        }
      ],
      justification: `Budget request based on comprehensive resource analysis. Total required resources: $${totalAmount}, with ${contingency} contingency for risk mitigation.`,
      paymentSchedule: [
        {
          milestone: 'Project Initiation',
          amount: Math.round((totalAmount + contingency) * 0.3),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
          conditions: ['Proposal approval', 'Resource allocation confirmation']
        },
        {
          milestone: 'Phase 1 Completion',
          amount: Math.round((totalAmount + contingency) * 0.4),
          dueDate: new Date(Date.now() + 4 * 7 * 24 * 60 * 60 * 1000), // 4 weeks
          conditions: ['Phase 1 deliverables approved', 'Milestone criteria met']
        },
        {
          milestone: 'Project Completion',
          amount: Math.round((totalAmount + contingency) * 0.3),
          dueDate: new Date(Date.now() + 12 * 7 * 24 * 60 * 60 * 1000), // 12 weeks
          conditions: ['All deliverables completed', 'Stakeholder acceptance']
        }
      ],
      contingency
    };
  }

  /**
   * Create proposal timeline
   */
  private createProposalTimeline(analysis: StratplanAnalysis): ProposalTimeline {
    const now = new Date();
    const votingStart = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days from now
    const votingEnd = new Date(votingStart.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week voting period
    const implementationStart = new Date(votingEnd.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days after voting
    const estimatedCompletion = new Date(implementationStart.getTime() + 12 * 7 * 24 * 60 * 60 * 1000); // 12 weeks implementation

    return {
      submissionDate: now,
      votingStartDate: votingStart,
      votingEndDate: votingEnd,
      implementationStartDate: implementationStart,
      estimatedCompletionDate: estimatedCompletion,
      milestones: [
        {
          id: 'milestone-submission',
          name: 'Proposal Submission',
          date: now,
          description: 'DAO proposal submitted for community review',
          deliverables: ['Proposal document', 'Supporting analysis']
        },
        {
          id: 'milestone-voting',
          name: 'Community Voting',
          date: votingStart,
          description: 'Community voting period begins',
          deliverables: ['Voting interface', 'Community discussion forum']
        },
        {
          id: 'milestone-approval',
          name: 'Proposal Decision',
          date: votingEnd,
          description: 'Voting results finalized and decision announced',
          deliverables: ['Voting results', 'Implementation authorization']
        }
      ]
    };
  }

  /**
   * Define success criteria based on analysis
   */
  private defineSuccessCriteria(analysis: StratplanAnalysis): string[] {
    const criteria: string[] = [];
    
    criteria.push('All project deliverables completed within approved timeline');
    criteria.push('Budget utilized within approved allocation (including contingency)');
    criteria.push('Stakeholder acceptance achieved for all major deliverables');
    
    if (analysis.riskAssessment.overallRiskLevel !== 'low') {
      criteria.push('Risk mitigation measures successfully implemented');
    }
    
    criteria.push(`Project confidence score maintained above ${Math.round(analysis.confidence * 100)}%`);
    criteria.push('Quality standards met as defined in project charter');
    
    return criteria;
  }

  /**
   * Generate comprehensive Markdown content
   */
  private async generateMarkdownContent(proposalData: any): Promise<string> {
    const { id, title, proposalType, objectives, executionPlan, budgetRequest, timeline, successCriteria, analysis } = proposalData;
    
    return `# ${title}

**Proposal ID:** ${id}  
**Type:** ${proposalType.charAt(0).toUpperCase() + proposalType.slice(1)} Proposal  
**Submitted:** ${new Date().toLocaleDateString()}  
**Status:** Draft  

## Executive Summary

This proposal outlines a strategic initiative derived from comprehensive Stratplan analysis. The proposal addresses identified opportunities and challenges with a structured execution plan, resource allocation, and risk mitigation strategies.

**Key Metrics:**
- Complexity Score: ${analysis.complexityScore}/100
- Feasibility Score: ${analysis.feasibilityScore}/100  
- Overall Confidence: ${Math.round(analysis.confidence * 100)}%
- Risk Level: ${analysis.riskAssessment.overallRiskLevel}

## Objectives

${objectives.map((obj: string, i: number) => `${i + 1}. ${obj}`).join('\n')}

## Execution Plan

### Phase Overview
${executionPlan.phases.map((phase: any, i: number) => `
#### Phase ${i + 1}: ${phase.name}
**Duration:** ${phase.duration}  
**Budget:** $${phase.budget.toLocaleString()}  
**Responsible:** ${phase.responsible_agents.join(', ')}

**Objectives:**
${phase.objectives.map((obj: string) => `- ${obj}`).join('\n')}

**Key Deliverables:**
${phase.deliverables.map((del: string) => `- ${del}`).join('\n')}
`).join('\n')}

## Budget Request

${budgetRequest ? `
**Total Amount:** $${budgetRequest.totalAmount.toLocaleString()} ${budgetRequest.currency}

### Budget Breakdown
${budgetRequest.breakdown.map((item: any) => 
  `- **${item.category}:** $${item.amount.toLocaleString()} (${item.percentage}%) - ${item.justification}`
).join('\n')}

**Contingency:** $${budgetRequest.contingency.toLocaleString()} (15%)

### Payment Schedule
${budgetRequest.paymentSchedule.map((payment: any, i: number) => 
  `${i + 1}. **${payment.milestone}:** $${payment.amount.toLocaleString()} by ${payment.dueDate.toLocaleDateString()}`
).join('\n')}
` : 'No budget required for this proposal.'}

## Timeline

**Voting Period:** ${timeline.votingStartDate.toLocaleDateString()} - ${timeline.votingEndDate.toLocaleDateString()}  
**Implementation Start:** ${timeline.implementationStartDate?.toLocaleDateString()}  
**Estimated Completion:** ${timeline.estimatedCompletionDate?.toLocaleDateString()}

## Success Criteria

${successCriteria.map((criteria: string, i: number) => `${i + 1}. ${criteria}`).join('\n')}

## Risk Assessment

**Overall Risk Level:** ${analysis.riskAssessment.overallRiskLevel.toUpperCase()}

### Identified Risks
${analysis.riskAssessment.identifiedRisks.map((risk: any) => 
  `- **${risk.category.toUpperCase()}:** ${risk.description} (Probability: ${Math.round(risk.probability * 100)}%, Impact: ${Math.round(risk.impact * 100)}%)`
).join('\n')}

## Recommendations

${analysis.recommendations.map((rec: string, i: number) => `${i + 1}. ${rec}`).join('\n')}

## Governance Details

**Voting Period:** ${this.calculateVotingPeriod(proposalType)}  
**Quorum Required:** ${this.calculateQuorum(proposalType)}%  
**Approval Threshold:** ${this.calculateRequiredApproval(proposalType)}%

---

*This proposal was generated by the Chief of Staff Agent (Ortega) based on comprehensive strategic analysis.*
`;
  }

  /**
   * Generate structured JSON content
   */
  private async generateJsonContent(proposalData: any): Promise<Record<string, any>> {
    const { id, proposalType, objectives, executionPlan, budgetRequest, timeline, successCriteria, analysis } = proposalData;
    
    return {
      proposal: {
        id,
        type: proposalType,
        metadata: {
          created: new Date().toISOString(),
          creator: 'Chief of Staff Agent (Ortega)',
          version: '1.0.0',
          stratplan_id: analysis.stratplanId
        },
        analysis_summary: {
          complexity_score: analysis.complexityScore,
          feasibility_score: analysis.feasibilityScore,
          confidence: analysis.confidence,
          risk_level: analysis.riskAssessment.overallRiskLevel
        },
        objectives,
        execution: {
          phases: executionPlan.phases.map((phase: any) => ({
            id: phase.id,
            name: phase.name,
            description: phase.description,
            duration: phase.duration,
            budget: phase.budget,
            deliverables: phase.deliverables,
            responsible_agents: phase.responsible_agents
          })),
          milestones: executionPlan.milestones,
          total_duration: timeline.estimatedCompletionDate ? 
            Math.ceil((timeline.estimatedCompletionDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) + ' days' : 'TBD'
        },
        budget: budgetRequest ? {
          total: budgetRequest.totalAmount,
          currency: budgetRequest.currency,
          breakdown: budgetRequest.breakdown,
          payment_schedule: budgetRequest.paymentSchedule
        } : null,
        governance: {
          voting_period: this.calculateVotingPeriod(proposalType),
          quorum: this.calculateQuorum(proposalType),
          approval_threshold: this.calculateRequiredApproval(proposalType),
          voting_start: timeline.votingStartDate.toISOString(),
          voting_end: timeline.votingEndDate.toISOString()
        },
        success_criteria: successCriteria,
        risks: analysis.riskAssessment.identifiedRisks.map((risk: any) => ({
          category: risk.category,
          description: risk.description,
          probability: risk.probability,
          impact: risk.impact,
          severity: risk.severity
        })),
        recommendations: analysis.recommendations
      }
    };
  }

  /**
   * Generate proposal title
   */
  private generateTitle(analysis: StratplanAnalysis, type: string): string {
    const typeLabel = this.proposalTemplates[type as keyof typeof this.proposalTemplates];
    return `${typeLabel}: Strategic Initiative ${analysis.stratplanId.slice(-6)}`;
  }

  /**
   * Generate proposal description
   */
  private generateDescription(analysis: StratplanAnalysis): string {
    return `Comprehensive strategic proposal generated from Stratplan analysis with ${Math.round(analysis.confidence * 100)}% confidence. ` +
           `Addresses ${analysis.resourceAnalysis.resourceGaps.length} resource gaps and ${analysis.riskAssessment.identifiedRisks.length} identified risks.`;
  }

  /**
   * Calculate voting period based on proposal type
   */
  private calculateVotingPeriod(type: string): string {
    const periods = {
      strategic: '14 days',
      operational: '7 days', 
      financial: '10 days',
      governance: '21 days',
      technical: '7 days'
    };
    return periods[type as keyof typeof periods] || '7 days';
  }

  /**
   * Calculate required quorum based on proposal type
   */
  private calculateQuorum(type: string): number {
    const quorums = {
      strategic: 25,
      operational: 15,
      financial: 20,
      governance: 30,
      technical: 15
    };
    return quorums[type as keyof typeof quorums] || 20;
  }

  /**
   * Calculate required approval percentage
   */
  private calculateRequiredApproval(type: string): number {
    const approvals = {
      strategic: 66,
      operational: 51,
      financial: 60,
      governance: 75,
      technical: 51
    };
    return approvals[type as keyof typeof approvals] || 60;
  }

  /**
   * Extract stakeholders from analysis
   */
  private extractStakeholders(analysis: StratplanAnalysis): string[] {
    return [
      ...analysis.stakeholderAnalysis.primaryStakeholders.map(s => s.name),
      ...analysis.stakeholderAnalysis.secondaryStakeholders.map(s => s.name)
    ];
  }

  /**
   * Validate the generator is operational
   */
  public async validate(): Promise<boolean> {
    try {
      return typeof this.generateProposal === 'function' &&
             typeof this.generateMarkdownContent === 'function' &&
             typeof this.generateJsonContent === 'function';
    } catch (error) {
      console.error('DAOProposalGenerator validation failed:', error);
      return false;
    }
  }
}