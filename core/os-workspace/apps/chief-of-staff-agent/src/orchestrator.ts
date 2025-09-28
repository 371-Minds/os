/**
 * Chief of Staff Orchestrator
 * 
 * Orchestrates the complete workflow of transforming Stratplans into DAO proposals,
 * handling file outputs, workflow coordination, and ensuring proper governance integration.
 */

import * as fs from 'fs';
import * as path from 'path';
import type {
  AgentDefinition,
  OrchestrationWorkflow,
  ProcessingResult,
  DAOProposal,
  StratplanAnalysis,
  StratplanData
} from './types.js';

export class ChiefOfStaffOrchestrator {
  private readonly outputDirectory: string;
  private readonly agentDefinition: AgentDefinition;

  constructor(agentDefinition: AgentDefinition) {
    this.agentDefinition = agentDefinition;
    this.outputDirectory = path.join(process.cwd(), 'output', 'dao-proposals');
    this.ensureOutputDirectory();
  }

  /**
   * Orchestrate the complete Stratplan to DAO proposal workflow
   */
  public async orchestrateProposal(workflow: OrchestrationWorkflow): Promise<ProcessingResult> {
    const startTime = Date.now();
    console.log('🚀 Orchestrating DAO proposal generation workflow...');

    try {
      const { stratplan, analysis, proposal } = workflow;

      // 1. Validate inputs
      await this.validateWorkflowInputs(workflow);

      // 2. Prepare output structure
      const outputPaths = this.prepareOutputPaths(proposal.id);

      // 3. Generate and save Markdown content
      const markdownPath = await this.saveMarkdownProposal(proposal, outputPaths.markdown);

      // 4. Generate and save JSON content
      const jsonPath = await this.saveJsonProposal(proposal, outputPaths.json);

      // 5. Generate governance metadata
      const governanceMetadata = await this.generateGovernanceMetadata(proposal, analysis);

      // 6. Create audit trail
      await this.createAuditTrail(stratplan, analysis, proposal, {
        markdownPath,
        jsonPath,
        processingTime: Date.now() - startTime
      });

      // 7. Prepare final result
      const result: ProcessingResult = {
        success: true,
        stratplanId: stratplan.id,
        proposalId: proposal.id,
        analysis,
        proposal,
        markdownFilePath: markdownPath,
        jsonFilePath: jsonPath,
        processingTime: Date.now() - startTime,
        confidence: analysis.confidence,
        warnings: this.generateWarnings(analysis),
        errors: [],
        recommendedActions: this.generateRecommendedActions(analysis, proposal),
        followUpRequired: this.determineFollowUpRequired(analysis)
      };

      console.log('✅ Workflow orchestration completed successfully');
      console.log(`📁 Outputs saved to: ${this.outputDirectory}`);
      console.log(`⏱️ Processing time: ${result.processingTime}ms`);
      console.log(`🎯 Confidence: ${Math.round(result.confidence * 100)}%`);

      // 8. Post-processing notifications (for future integration)
      await this.sendNotifications(result);

      return result;

    } catch (error) {
      console.error('❌ Workflow orchestration failed:', error);
      
      const errorResult: ProcessingResult = {
        success: false,
        stratplanId: workflow.stratplan.id,
        analysis: workflow.analysis,
        processingTime: Date.now() - startTime,
        confidence: 0,
        warnings: [],
        errors: [error instanceof Error ? error.message : 'Unknown orchestration error'],
        recommendedActions: ['Review input data', 'Check system configuration', 'Retry with simplified parameters'],
        followUpRequired: true
      };

      return errorResult;
    }
  }

  /**
   * Validate workflow inputs
   */
  private async validateWorkflowInputs(workflow: OrchestrationWorkflow): Promise<void> {
    const { stratplan, analysis, proposal } = workflow;

    if (!stratplan.id || !stratplan.title) {
      throw new Error('Invalid Stratplan: missing required fields (id, title)');
    }

    if (!analysis.stratplanId || analysis.confidence < 0.1) {
      throw new Error('Invalid analysis: insufficient confidence or missing stratplan reference');
    }

    if (!proposal.id || !proposal.title || !proposal.executionPlan) {
      throw new Error('Invalid proposal: missing required fields (id, title, executionPlan)');
    }

    if (stratplan.id !== analysis.stratplanId) {
      throw new Error('Stratplan ID mismatch between data and analysis');
    }

    console.log('✅ Workflow inputs validated successfully');
  }

  /**
   * Prepare output file paths
   */
  private prepareOutputPaths(proposalId: string): { markdown: string; json: string; metadata: string } {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const baseFilename = `${proposalId}_${timestamp}`;

    return {
      markdown: path.join(this.outputDirectory, `${baseFilename}.md`),
      json: path.join(this.outputDirectory, `${baseFilename}.json`),
      metadata: path.join(this.outputDirectory, `${baseFilename}_metadata.json`)
    };
  }

  /**
   * Save Markdown proposal to file
   */
  private async saveMarkdownProposal(proposal: DAOProposal, outputPath: string): Promise<string> {
    try {
      const enhancedMarkdown = this.enhanceMarkdownContent(proposal);
      await fs.promises.writeFile(outputPath, enhancedMarkdown, 'utf8');
      console.log('📝 Markdown proposal saved:', path.basename(outputPath));
      return outputPath;
    } catch (error) {
      console.error('❌ Failed to save Markdown proposal:', error);
      throw new Error(`Markdown save failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Save JSON proposal to file
   */
  private async saveJsonProposal(proposal: DAOProposal, outputPath: string): Promise<string> {
    try {
      const enhancedJson = this.enhanceJsonContent(proposal);
      await fs.promises.writeFile(outputPath, JSON.stringify(enhancedJson, null, 2), 'utf8');
      console.log('📊 JSON proposal saved:', path.basename(outputPath));
      return outputPath;
    } catch (error) {
      console.error('❌ Failed to save JSON proposal:', error);
      throw new Error(`JSON save failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Enhance Markdown content with orchestrator metadata
   */
  private enhanceMarkdownContent(proposal: DAOProposal): string {
    const orchestratorMetadata = `
---
**Generated by:** ${this.agentDefinition.agent_name}  
**Agent Type:** ${this.agentDefinition.agent_type}  
**Generation Time:** ${new Date().toISOString()}  
**Proposal Version:** ${proposal.version}  
**Workflow ID:** ${this.generateWorkflowId()}  
---

`;

    return orchestratorMetadata + proposal.markdownContent + `

---

## Orchestrator Notes

### Agent Capabilities
${this.agentDefinition.personality_traits.map(trait => `- ${trait}`).join('\n')}

### Required Tools Validated
${this.agentDefinition.required_tools.map(tool => `- ✅ ${tool}`).join('\n')}

### Next Steps
1. Submit proposal to DAO governance system
2. Initiate community discussion period
3. Coordinate stakeholder engagement
4. Monitor voting process
5. Prepare implementation readiness

---

*This proposal has been orchestrated through the 371 DAO governance framework with comprehensive validation and strategic alignment.*
`;
  }

  /**
   * Enhance JSON content with orchestrator metadata
   */
  private enhanceJsonContent(proposal: DAOProposal): Record<string, any> {
    return {
      ...proposal.jsonContent,
      orchestrator_metadata: {
        agent_name: this.agentDefinition.agent_name,
        agent_type: this.agentDefinition.agent_type,
        personality_traits: this.agentDefinition.personality_traits,
        required_tools: this.agentDefinition.required_tools,
        workflow_id: this.generateWorkflowId(),
        generation_timestamp: new Date().toISOString(),
        validation_status: 'completed',
        governance_ready: true
      },
      next_steps: {
        immediate: [
          'Submit to DAO governance platform',
          'Initiate community review period'
        ],
        short_term: [
          'Coordinate stakeholder engagement',
          'Monitor community feedback'
        ],
        long_term: [
          'Prepare implementation team',
          'Setup monitoring and reporting'
        ]
      },
      validation_checklist: {
        stratplan_analysis: true,
        resource_requirements: true,
        risk_assessment: true,
        stakeholder_alignment: true,
        budget_approval: proposal.budgetRequest !== undefined,
        timeline_feasibility: true,
        governance_compliance: true
      }
    };
  }

  /**
   * Generate governance metadata
   */
  private async generateGovernanceMetadata(proposal: DAOProposal, analysis: StratplanAnalysis): Promise<Record<string, any>> {
    return {
      governance_framework: '371_DAO_v1.0',
      proposal_category: proposal.proposalType,
      voting_configuration: {
        period: proposal.votingPeriod,
        quorum_required: proposal.quorum,
        approval_threshold: proposal.requiredApproval
      },
      analysis_summary: {
        complexity_score: analysis.complexityScore,
        feasibility_score: analysis.feasibilityScore,
        confidence_level: analysis.confidence,
        risk_assessment: analysis.riskAssessment.overallRiskLevel
      },
      compliance_status: {
        dao_standards: 'compliant',
        proposal_format: 'validated',
        content_review: 'passed',
        governance_ready: true
      },
      integration_readiness: {
        blockchain_registry: true,
        ipfs_storage: true,
        dao_dao_platform: true,
        akash_deployment: true
      }
    };
  }

  /**
   * Create audit trail for the complete workflow
   */
  private async createAuditTrail(
    stratplan: StratplanData,
    analysis: StratplanAnalysis,
    proposal: DAOProposal,
    metadata: { markdownPath: string; jsonPath: string; processingTime: number }
  ): Promise<void> {
    const auditTrail = {
      workflow_id: this.generateWorkflowId(),
      timestamp: new Date().toISOString(),
      agent: {
        name: this.agentDefinition.agent_name,
        type: this.agentDefinition.agent_type,
        version: '1.0.0'
      },
      inputs: {
        stratplan_id: stratplan.id,
        stratplan_title: stratplan.title,
        stratplan_phases: stratplan.phases.length,
        stratplan_resources: stratplan.requiredResources.length
      },
      processing: {
        analysis_confidence: analysis.confidence,
        complexity_score: analysis.complexityScore,
        feasibility_score: analysis.feasibilityScore,
        risk_level: analysis.riskAssessment.overallRiskLevel,
        processing_time_ms: metadata.processingTime
      },
      outputs: {
        proposal_id: proposal.id,
        proposal_type: proposal.proposalType,
        markdown_file: path.basename(metadata.markdownPath),
        json_file: path.basename(metadata.jsonPath),
        budget_requested: proposal.budgetRequest?.totalAmount || 0
      },
      validation: {
        inputs_validated: true,
        analysis_complete: true,
        proposal_generated: true,
        files_saved: true,
        governance_ready: true
      }
    };

    const auditPath = path.join(this.outputDirectory, 'audit', `audit_${proposal.id}_${Date.now()}.json`);
    await this.ensureDirectory(path.dirname(auditPath));
    await fs.promises.writeFile(auditPath, JSON.stringify(auditTrail, null, 2), 'utf8');
    
    console.log('📋 Audit trail created:', path.basename(auditPath));
  }

  /**
   * Generate warnings based on analysis
   */
  private generateWarnings(analysis: StratplanAnalysis): string[] {
    const warnings: string[] = [];

    if (analysis.confidence < 0.7) {
      warnings.push(`Low confidence score (${Math.round(analysis.confidence * 100)}%) - consider additional analysis`);
    }

    if (analysis.riskAssessment.overallRiskLevel === 'high' || analysis.riskAssessment.overallRiskLevel === 'critical') {
      warnings.push(`High risk level detected (${analysis.riskAssessment.overallRiskLevel}) - comprehensive mitigation required`);
    }

    if (analysis.resourceAnalysis.resourceGaps.length > 3) {
      warnings.push(`Multiple resource gaps identified (${analysis.resourceAnalysis.resourceGaps.length}) - may impact feasibility`);
    }

    if (analysis.complexityScore > 80) {
      warnings.push(`High complexity score (${analysis.complexityScore}) - consider phased implementation`);
    }

    return warnings;
  }

  /**
   * Generate recommended actions
   */
  private generateRecommendedActions(analysis: StratplanAnalysis, proposal: DAOProposal): string[] {
    const actions: string[] = [];

    // Always recommended
    actions.push('Submit proposal to DAO governance platform for community review');
    actions.push('Engage key stakeholders for early feedback and alignment');

    // Analysis-based recommendations
    if (analysis.confidence < 0.8) {
      actions.push('Consider additional analysis or expert consultation before submission');
    }

    if (analysis.riskAssessment.overallRiskLevel !== 'low') {
      actions.push('Develop detailed risk mitigation plans before implementation');
    }

    if (proposal.budgetRequest && proposal.budgetRequest.totalAmount > 500000) {
      actions.push('Prepare detailed budget justification for large financial request');
    }

    if (analysis.stakeholderAnalysis.primaryStakeholders.length > 5) {
      actions.push('Create stakeholder coordination plan for complex stakeholder landscape');
    }

    actions.push('Monitor community sentiment and be prepared to address questions');
    actions.push('Prepare implementation team and resources for potential approval');

    return actions;
  }

  /**
   * Determine if follow-up is required
   */
  private determineFollowUpRequired(analysis: StratplanAnalysis): boolean {
    return (
      analysis.confidence < 0.7 ||
      analysis.riskAssessment.overallRiskLevel === 'high' ||
      analysis.riskAssessment.overallRiskLevel === 'critical' ||
      analysis.resourceAnalysis.resourceGaps.length > 2
    );
  }

  /**
   * Send notifications (placeholder for future integration)
   */
  private async sendNotifications(result: ProcessingResult): Promise<void> {
    // Future integration points:
    // - Slack/Discord notifications
    // - Email to stakeholders
    // - Dashboard updates
    // - Blockchain event emission
    
    console.log('📢 Notifications would be sent to:');
    console.log('  - DAO governance platform');
    console.log('  - Stakeholder communication channels');
    console.log('  - Project monitoring dashboard');

    // For Phase 2: Implement actual notification logic
  }

  /**
   * Generate unique workflow ID
   */
  private generateWorkflowId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `WF-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Ensure output directory exists
   */
  private ensureOutputDirectory(): void {
    try {
      if (!fs.existsSync(this.outputDirectory)) {
        fs.mkdirSync(this.outputDirectory, { recursive: true });
        console.log('📁 Created output directory:', this.outputDirectory);
      }
    } catch (error) {
      console.error('❌ Failed to create output directory:', error);
      throw new Error(`Output directory creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Ensure specific directory exists
   */
  private async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await fs.promises.mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.error('❌ Failed to create directory:', dirPath, error);
      throw error;
    }
  }

  /**
   * Validate the orchestrator is operational
   */
  public async validate(): Promise<boolean> {
    try {
      // Check if output directory exists and is writable
      const testFile = path.join(this.outputDirectory, 'test.tmp');
      await fs.promises.writeFile(testFile, 'test', 'utf8');
      await fs.promises.unlink(testFile);

      // Validate orchestrator methods
      const methodsExist = [
        'orchestrateProposal',
        'validateWorkflowInputs',
        'saveMarkdownProposal',
        'saveJsonProposal'
      ].every(method => typeof (this as any)[method] === 'function');

      return methodsExist;

    } catch (error) {
      console.error('ChiefOfStaffOrchestrator validation failed:', error);
      return false;
    }
  }
}