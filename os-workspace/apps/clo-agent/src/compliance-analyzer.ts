import type {
  LegalTask,
  ComplianceAnalysisResult,
  ComplianceStatus,
  RiskLevel,
  ComplianceFinding,
  GovernanceDecision,
  GovernanceGap,
  EnforcementAction,
  StakeholderNotification,
  CLOAgentConfig,
  AuditEntry
} from './types.js';

/**
 * Compliance Analyzer
 * 
 * Specialized component for performing comprehensive compliance assessments
 * across multiple regulatory frameworks and jurisdictions.
 */
export class ComplianceAnalyzer {
  private config: CLOAgentConfig;
  private complianceRules: Map<string, ComplianceRule[]> = new Map();

  constructor(config: CLOAgentConfig) {
    this.config = config;
    this.initializeComplianceRules();
    console.log('Compliance Analyzer initialized');
  }

  /**
   * Analyze compliance for a legal task
   */
  async analyzeCompliance(task: LegalTask): Promise<ComplianceAnalysisResult> {
    console.log(`Analyzing compliance for task ${task.id}`);

    const findings: ComplianceFinding[] = [];
    const auditTrail: AuditEntry[] = [];

    // Analyze each compliance requirement
    for (const requirement of task.requiredCompliance) {
      const regulationFindings = await this.analyzeRegulation(task, requirement);
      findings.push(...regulationFindings);

      auditTrail.push({
        entryId: `compliance-audit-${Date.now()}`,
        timestamp: new Date(),
        agentId: this.config.agentId,
        action: 'compliance_check' as any,
        taskId: task.id,
        details: {
          description: `Compliance check for ${requirement.regulation}`,
          inputData: { regulation: requirement.regulation, jurisdiction: requirement.jurisdiction },
          outputData: { findingsCount: regulationFindings.length }
        },
        outcome: 'success' as const,
        metadata: {
          sessionId: `session-${Date.now()}`,
          correlationId: task.id
        }
      });
    }

    const overallRiskLevel = this.calculateOverallRisk(findings);
    const complianceStatus = this.determineComplianceStatus(findings);

    return {
      taskId: task.id,
      complianceStatus,
      riskLevel: overallRiskLevel,
      findings,
      recommendedActions: [],
      legalRequirements: [],
      timeToResolution: this.estimateComplianceResolution(findings),
      auditTrail
    };
  }

  /**
   * Initialize compliance rules for different regulations
   */
  private initializeComplianceRules(): void {
    // GDPR Rules
    this.complianceRules.set('GDPR', [
      {
        id: 'gdpr-consent',
        name: 'Consent Management',
        description: 'Valid consent required for data processing',
        severity: 'high' as RiskLevel,
        checkFunction: this.checkGDPRConsent.bind(this)
      },
      {
        id: 'gdpr-data-minimization',
        name: 'Data Minimization',
        description: 'Collect only necessary personal data',
        severity: 'medium' as RiskLevel,
        checkFunction: this.checkDataMinimization.bind(this)
      },
      {
        id: 'gdpr-retention',
        name: 'Data Retention',
        description: 'Personal data retention limits',
        severity: 'high' as RiskLevel,
        checkFunction: this.checkDataRetention.bind(this)
      }
    ]);

    // SOX Rules
    this.complianceRules.set('SOX', [
      {
        id: 'sox-controls',
        name: 'Internal Controls',
        description: 'Financial internal controls documentation',
        severity: 'critical' as RiskLevel,
        checkFunction: this.checkSOXControls.bind(this)
      },
      {
        id: 'sox-documentation',
        name: 'Financial Documentation',
        description: 'Proper financial documentation and reporting',
        severity: 'high' as RiskLevel,
        checkFunction: this.checkFinancialDocumentation.bind(this)
      }
    ]);

    // HIPAA Rules
    this.complianceRules.set('HIPAA', [
      {
        id: 'hipaa-safeguards',
        name: 'Administrative Safeguards',
        description: 'Administrative safeguards for PHI',
        severity: 'critical' as RiskLevel,
        checkFunction: this.checkHIPAASafeguards.bind(this)
      },
      {
        id: 'hipaa-access',
        name: 'Access Controls',
        description: 'PHI access controls and monitoring',
        severity: 'high' as RiskLevel,
        checkFunction: this.checkHIPAAAccess.bind(this)
      }
    ]);

    console.log('Compliance rules initialized for GDPR, SOX, HIPAA');
  }

  /**
   * Analyze specific regulation compliance
   */
  private async analyzeRegulation(task: LegalTask, requirement: any): Promise<ComplianceFinding[]> {
    const rules = this.complianceRules.get(requirement.regulation) || [];
    const findings: ComplianceFinding[] = [];

    for (const rule of rules) {
      const result = await rule.checkFunction(task, requirement);
      if (!result.compliant) {
        findings.push({
          id: `finding-${task.id}-${rule.id}`,
          category: this.mapRuleToCategory(rule.id),
          severity: rule.severity,
          description: `${rule.name}: ${result.issue}`,
          regulation: `${requirement.regulation} - ${rule.name}`,
          recommendation: result.recommendation,
          remediation: {
            action: result.remediation,
            timeframe: this.calculateRemediationTimeframe(rule.severity),
            responsibility: this.assignRemediationResponsibility(rule.id),
            cost: this.estimateRemediationCost(rule.severity),
            complexity: this.assessRemediationComplexity(rule.severity)
          }
        });
      }
    }

    return findings;
  }

  // GDPR Compliance Checks

  private async checkGDPRConsent(task: LegalTask, requirement: any): Promise<ComplianceCheckResult> {
    // Mock GDPR consent check
    const hasConsentMechanism = Math.random() > 0.3; // 70% chance of having consent mechanism

    if (hasConsentMechanism) {
      return {
        compliant: true,
        confidence: 0.9
      };
    }

    return {
      compliant: false,
      issue: 'No valid consent mechanism identified for personal data processing',
      recommendation: 'Implement consent management system with granular controls',
      remediation: 'Deploy consent banner with opt-in/opt-out functionality',
      confidence: 0.8
    };
  }

  private async checkDataMinimization(task: LegalTask, requirement: any): Promise<ComplianceCheckResult> {
    // Mock data minimization check
    const followsMinimization = Math.random() > 0.4; // 60% chance of following minimization

    if (followsMinimization) {
      return {
        compliant: true,
        confidence: 0.85
      };
    }

    return {
      compliant: false,
      issue: 'Data collection exceeds stated purposes',
      recommendation: 'Review data collection practices and eliminate unnecessary fields',
      remediation: 'Implement data collection audit and remove excessive data points',
      confidence: 0.75
    };
  }

  private async checkDataRetention(task: LegalTask, requirement: any): Promise<ComplianceCheckResult> {
    // Mock data retention check
    const hasRetentionPolicy = Math.random() > 0.25; // 75% chance of having retention policy

    if (hasRetentionPolicy) {
      return {
        compliant: true,
        confidence: 0.9
      };
    }

    return {
      compliant: false,
      issue: 'No clear data retention policy or automated deletion process',
      recommendation: 'Establish data retention schedules and automated deletion workflows',
      remediation: 'Implement automated data lifecycle management system',
      confidence: 0.85
    };
  }

  // SOX Compliance Checks

  private async checkSOXControls(task: LegalTask, requirement: any): Promise<ComplianceCheckResult> {
    // Mock SOX controls check
    const hasControls = Math.random() > 0.2; // 80% chance of having controls

    if (hasControls) {
      return {
        compliant: true,
        confidence: 0.95
      };
    }

    return {
      compliant: false,
      issue: 'Internal financial controls not adequately documented or tested',
      recommendation: 'Implement comprehensive internal controls framework',
      remediation: 'Establish SOX compliance program with regular testing',
      confidence: 0.9
    };
  }

  private async checkFinancialDocumentation(task: LegalTask, requirement: any): Promise<ComplianceCheckResult> {
    // Mock financial documentation check
    const hasDocumentation = Math.random() > 0.3; // 70% chance of proper documentation

    if (hasDocumentation) {
      return {
        compliant: true,
        confidence: 0.85
      };
    }

    return {
      compliant: false,
      issue: 'Financial processes lack sufficient documentation for audit trail',
      recommendation: 'Enhance financial process documentation and approval workflows',
      remediation: 'Implement automated financial documentation system',
      confidence: 0.8
    };
  }

  // HIPAA Compliance Checks

  private async checkHIPAASafeguards(task: LegalTask, requirement: any): Promise<ComplianceCheckResult> {
    // Mock HIPAA safeguards check
    const hasSafeguards = Math.random() > 0.15; // 85% chance of having safeguards

    if (hasSafeguards) {
      return {
        compliant: true,
        confidence: 0.9
      };
    }

    return {
      compliant: false,
      issue: 'Administrative safeguards for PHI protection are insufficient',
      recommendation: 'Implement comprehensive HIPAA administrative safeguards',
      remediation: 'Deploy HIPAA compliance training and administrative controls',
      confidence: 0.85
    };
  }

  private async checkHIPAAAccess(task: LegalTask, requirement: any): Promise<ComplianceCheckResult> {
    // Mock HIPAA access check
    const hasAccessControls = Math.random() > 0.25; // 75% chance of proper access controls

    if (hasAccessControls) {
      return {
        compliant: true,
        confidence: 0.88
      };
    }

    return {
      compliant: false,
      issue: 'PHI access controls and monitoring are inadequate',
      recommendation: 'Strengthen PHI access controls with role-based permissions',
      remediation: 'Implement comprehensive PHI access management system',
      confidence: 0.82
    };
  }

  // Helper methods

  private mapRuleToCategory(ruleId: string): any {
    if (ruleId.includes('consent') || ruleId.includes('access')) return 'access_control';
    if (ruleId.includes('documentation')) return 'documentation';
    if (ruleId.includes('controls')) return 'technical_safeguards';
    if (ruleId.includes('safeguards')) return 'administrative_safeguards';
    return 'process_compliance';
  }

  private calculateRemediationTimeframe(severity: RiskLevel): string {
    switch (severity) {
      case 'critical': return '1 week';
      case 'high': return '2 weeks';
      case 'medium': return '4 weeks';
      case 'low': return '8 weeks';
      default: return '4 weeks';
    }
  }

  private assignRemediationResponsibility(ruleId: string): string {
    if (ruleId.includes('gdpr')) return 'Privacy Team';
    if (ruleId.includes('sox')) return 'Finance Team';
    if (ruleId.includes('hipaa')) return 'Compliance Team';
    return 'Legal Team';
  }

  private estimateRemediationCost(severity: RiskLevel): number {
    switch (severity) {
      case 'critical': return 50000;
      case 'high': return 25000;
      case 'medium': return 15000;
      case 'low': return 5000;
      default: return 15000;
    }
  }

  private assessRemediationComplexity(severity: RiskLevel): any {
    switch (severity) {
      case 'critical': return 'very_high';
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  }

  private calculateOverallRisk(findings: ComplianceFinding[]): RiskLevel {
    if (findings.some(f => f.severity === 'critical')) return 'critical';
    if (findings.some(f => f.severity === 'high')) return 'high';
    if (findings.some(f => f.severity === 'medium')) return 'medium';
    return 'low';
  }

  private determineComplianceStatus(findings: ComplianceFinding[]): ComplianceStatus {
    if (findings.length === 0) return 'compliant';
    if (findings.some(f => f.severity === 'critical')) return 'non_compliant';
    if (findings.some(f => f.severity === 'high')) return 'requires_review';
    return 'partially_compliant';
  }

  private estimateComplianceResolution(findings: ComplianceFinding[]): number {
    const baseHours = 8;
    const complexityMultiplier = findings.length * 0.5;
    const severityMultiplier = findings.some(f => f.severity === 'critical') ? 3 : 
                              findings.some(f => f.severity === 'high') ? 2 : 1;
    
    return Math.ceil(baseHours * (1 + complexityMultiplier) * severityMultiplier);
  }

  /**
   * Shutdown analyzer
   */
  async shutdown(): Promise<void> {
    console.log('Compliance Analyzer shutdown completed');
  }
}

/**
 * Governance Engine
 * 
 * Specialized component for enforcing governance policies and
 * organizational standards across the 371 DAO ecosystem.
 */
export class GovernanceEngine {
  private config: CLOAgentConfig;
  private governancePolicies: Map<string, GovernancePolicy[]> = new Map();

  constructor(config: CLOAgentConfig) {
    this.config = config;
    this.initializeGovernancePolicies();
    console.log('Governance Engine initialized');
  }

  /**
   * Evaluate governance compliance for a legal task
   */
  async evaluateGovernance(task: LegalTask): Promise<GovernanceDecision> {
    console.log(`Evaluating governance for task ${task.id}`);

    const governanceGaps: GovernanceGap[] = [];
    const enforcementActions: EnforcementAction[] = [];
    const stakeholderNotifications: StakeholderNotification[] = [];
    const auditTrail: AuditEntry[] = [];

    // Check policy alignment
    const policyAlignment = await this.checkPolicyAlignment(task);
    
    if (!policyAlignment.aligned) {
      governanceGaps.push(...policyAlignment.gaps);
      enforcementActions.push(...this.generateEnforcementActions(policyAlignment.gaps));
      stakeholderNotifications.push(...this.generateStakeholderNotifications(task, policyAlignment.gaps));
    }

    // Create audit entry
    auditTrail.push({
      entryId: `governance-audit-${Date.now()}`,
      timestamp: new Date(),
      agentId: this.config.agentId,
      action: 'governance_review' as any,
      taskId: task.id,
      details: {
        description: 'Governance policy evaluation completed',
        inputData: { taskType: task.type, domain: task.domain },
        outputData: { 
          policyAlignment: policyAlignment.aligned,
          gapsCount: governanceGaps.length,
          actionsCount: enforcementActions.length
        }
      },
      outcome: 'success' as const,
      metadata: {
        sessionId: `session-${Date.now()}`,
        correlationId: task.id
      }
    });

    return {
      decisionId: `governance-${task.id}-${Date.now()}`,
      taskId: task.id,
      policyAlignment: policyAlignment.aligned,
      governanceGaps,
      enforcementActions,
      stakeholderNotifications,
      auditTrail,
      approvalRequired: this.requiresApproval(task, governanceGaps),
      approvers: this.identifyApprovers(task, governanceGaps)
    };
  }

  /**
   * Initialize governance policies
   */
  private initializeGovernancePolicies(): void {
    // Data Governance Policies
    this.governancePolicies.set('data_governance', [
      {
        id: 'data-classification',
        name: 'Data Classification Policy',
        description: 'All data must be properly classified',
        severity: 'high' as RiskLevel,
        checkFunction: this.checkDataClassification.bind(this)
      },
      {
        id: 'data-access',
        name: 'Data Access Policy',
        description: 'Role-based access controls required',
        severity: 'critical' as RiskLevel,
        checkFunction: this.checkDataAccess.bind(this)
      }
    ]);

    // Financial Governance Policies
    this.governancePolicies.set('financial_governance', [
      {
        id: 'budget-approval',
        name: 'Budget Approval Policy',
        description: 'Financial expenditures require proper approval',
        severity: 'critical' as RiskLevel,
        checkFunction: this.checkBudgetApproval.bind(this)
      },
      {
        id: 'vendor-management',
        name: 'Vendor Management Policy',
        description: 'Vendor relationships must be properly managed',
        severity: 'high' as RiskLevel,
        checkFunction: this.checkVendorManagement.bind(this)
      }
    ]);

    // Security Governance Policies
    this.governancePolicies.set('security_governance', [
      {
        id: 'incident-response',
        name: 'Incident Response Policy',
        description: 'Security incidents require immediate response',
        severity: 'critical' as RiskLevel,
        checkFunction: this.checkIncidentResponse.bind(this)
      },
      {
        id: 'access-review',
        name: 'Access Review Policy',
        description: 'Regular access reviews required',
        severity: 'medium' as RiskLevel,
        checkFunction: this.checkAccessReview.bind(this)
      }
    ]);

    console.log('Governance policies initialized');
  }

  /**
   * Check policy alignment for task
   */
  private async checkPolicyAlignment(task: LegalTask): Promise<PolicyAlignmentResult> {
    const gaps: GovernanceGap[] = [];
    let overallAlignment = true;

    // Check relevant governance policies based on task domain
    const relevantPolicies = this.getRelevantPolicies(task);

    for (const [category, policies] of relevantPolicies) {
      for (const policy of policies) {
        const result = await policy.checkFunction(task);
        
        if (!result.compliant) {
          overallAlignment = false;
          gaps.push({
            gapId: `gap-${task.id}-${policy.id}`,
            policy: policy.name,
            currentState: result.currentState || 'Non-compliant',
            requiredState: result.requiredState || 'Policy compliant',
            severity: policy.severity,
            remediation: {
              action: result.remediation || 'Implement policy compliance',
              timeframe: this.calculatePolicyTimeframe(policy.severity),
              responsibility: this.assignPolicyResponsibility(policy.id),
              cost: this.estimatePolicyCost(policy.severity),
              complexity: this.assessPolicyComplexity(policy.severity)
            }
          });
        }
      }
    }

    return {
      aligned: overallAlignment,
      gaps
    };
  }

  /**
   * Get relevant policies for task
   */
  private getRelevantPolicies(task: LegalTask): Map<string, GovernancePolicy[]> {
    const relevant = new Map<string, GovernancePolicy[]>();

    // Map task domains to governance categories
    switch (task.domain) {
      case 'data_privacy':
        relevant.set('data_governance', this.governancePolicies.get('data_governance') || []);
        break;
      case 'financial_compliance':
        relevant.set('financial_governance', this.governancePolicies.get('financial_governance') || []);
        break;
      case 'security_compliance':
        relevant.set('security_governance', this.governancePolicies.get('security_governance') || []);
        break;
      default:
        // Include all policies for comprehensive review
        relevant.set('data_governance', this.governancePolicies.get('data_governance') || []);
        relevant.set('financial_governance', this.governancePolicies.get('financial_governance') || []);
    }

    return relevant;
  }

  // Policy check implementations

  private async checkDataClassification(task: LegalTask): Promise<GovernanceCheckResult> {
    const hasClassification = Math.random() > 0.3; // 70% chance of proper classification
    
    if (hasClassification) {
      return { compliant: true };
    }

    return {
      compliant: false,
      currentState: 'Data not properly classified',
      requiredState: 'All data classified according to sensitivity',
      remediation: 'Implement data classification system'
    };
  }

  private async checkDataAccess(task: LegalTask): Promise<GovernanceCheckResult> {
    const hasAccessControls = Math.random() > 0.2; // 80% chance of access controls
    
    if (hasAccessControls) {
      return { compliant: true };
    }

    return {
      compliant: false,
      currentState: 'Inadequate access controls',
      requiredState: 'Role-based access controls implemented',
      remediation: 'Deploy role-based access control system'
    };
  }

  private async checkBudgetApproval(task: LegalTask): Promise<GovernanceCheckResult> {
    const hasApproval = Math.random() > 0.15; // 85% chance of proper approval
    
    if (hasApproval) {
      return { compliant: true };
    }

    return {
      compliant: false,
      currentState: 'Budget approval process not followed',
      requiredState: 'All expenditures properly approved',
      remediation: 'Implement automated budget approval workflow'
    };
  }

  private async checkVendorManagement(task: LegalTask): Promise<GovernanceCheckResult> {
    const hasVendorProcess = Math.random() > 0.4; // 60% chance of vendor management
    
    if (hasVendorProcess) {
      return { compliant: true };
    }

    return {
      compliant: false,
      currentState: 'Vendor management process incomplete',
      requiredState: 'Comprehensive vendor management implemented',
      remediation: 'Establish vendor management framework'
    };
  }

  private async checkIncidentResponse(task: LegalTask): Promise<GovernanceCheckResult> {
    const hasIncidentResponse = Math.random() > 0.25; // 75% chance of incident response
    
    if (hasIncidentResponse) {
      return { compliant: true };
    }

    return {
      compliant: false,
      currentState: 'Incident response plan incomplete',
      requiredState: 'Comprehensive incident response capability',
      remediation: 'Develop and test incident response procedures'
    };
  }

  private async checkAccessReview(task: LegalTask): Promise<GovernanceCheckResult> {
    const hasAccessReview = Math.random() > 0.35; // 65% chance of access review
    
    if (hasAccessReview) {
      return { compliant: true };
    }

    return {
      compliant: false,
      currentState: 'Access review process not established',
      requiredState: 'Regular access reviews conducted',
      remediation: 'Implement automated access review process'
    };
  }

  // Helper methods for governance

  private generateEnforcementActions(gaps: GovernanceGap[]): EnforcementAction[] {
    return gaps.map((gap, index) => ({
      actionId: `enforcement-${Date.now()}-${index}`,
      type: this.mapGapToEnforcementType(gap.severity),
      description: `Address governance gap: ${gap.policy}`,
      target: gap.remediation.responsibility,
      severity: gap.severity,
      timeline: gap.remediation.timeframe,
      followUp: {
        type: 'compliance_verification',
        description: 'Verify gap remediation completion',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        assignee: 'Compliance Officer'
      }
    }));
  }

  private mapGapToEnforcementType(severity: RiskLevel): any {
    switch (severity) {
      case 'critical': return 'suspension';
      case 'high': return 'remediation';
      case 'medium': return 'warning';
      case 'low': return 'training';
      default: return 'warning';
    }
  }

  private generateStakeholderNotifications(task: LegalTask, gaps: GovernanceGap[]): StakeholderNotification[] {
    const notifications: StakeholderNotification[] = [];

    gaps.forEach((gap, index) => {
      notifications.push({
        notificationId: `notification-${Date.now()}-${index}`,
        recipient: gap.remediation.responsibility,
        urgency: this.mapSeverityToUrgency(gap.severity),
        message: `Governance gap identified in ${gap.policy}: ${gap.currentState}. Remediation required: ${gap.remediation.action}`,
        channelType: 'email' as const,
        deliveryStatus: 'pending' as const,
        timestamp: new Date()
      });
    });

    return notifications;
  }

  private mapSeverityToUrgency(severity: RiskLevel): any {
    switch (severity) {
      case 'critical': return 'urgent';
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  }

  private requiresApproval(task: LegalTask, gaps: GovernanceGap[]): boolean {
    return gaps.some(gap => gap.severity === 'critical' || gap.severity === 'high') ||
           task.priority === 'critical';
  }

  private identifyApprovers(task: LegalTask, gaps: GovernanceGap[]): string[] {
    const approvers = ['Chief Legal Officer'];
    
    if (gaps.some(gap => gap.severity === 'critical')) {
      approvers.push('Chief Executive Officer');
    }
    
    if (task.domain === 'financial_compliance') {
      approvers.push('Chief Financial Officer');
    }
    
    if (task.domain === 'security_compliance') {
      approvers.push('Chief Technology Officer');
    }

    return Array.from(new Set(approvers)); // Remove duplicates
  }

  // Helper methods similar to compliance analyzer
  private calculatePolicyTimeframe(severity: RiskLevel): string {
    switch (severity) {
      case 'critical': return '1 week';
      case 'high': return '2 weeks';
      case 'medium': return '4 weeks';
      case 'low': return '8 weeks';
      default: return '4 weeks';
    }
  }

  private assignPolicyResponsibility(policyId: string): string {
    if (policyId.includes('data')) return 'Data Governance Team';
    if (policyId.includes('budget') || policyId.includes('vendor')) return 'Finance Team';
    if (policyId.includes('incident') || policyId.includes('access')) return 'Security Team';
    return 'Compliance Team';
  }

  private estimatePolicyCost(severity: RiskLevel): number {
    switch (severity) {
      case 'critical': return 75000;
      case 'high': return 35000;
      case 'medium': return 20000;
      case 'low': return 8000;
      default: return 20000;
    }
  }

  private assessPolicyComplexity(severity: RiskLevel): any {
    switch (severity) {
      case 'critical': return 'very_high';
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  }

  /**
   * Shutdown governance engine
   */
  async shutdown(): Promise<void> {
    console.log('Governance Engine shutdown completed');
  }
}

// Supporting interfaces and types

interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  severity: RiskLevel;
  checkFunction: (task: LegalTask, requirement: any) => Promise<ComplianceCheckResult>;
}

interface ComplianceCheckResult {
  compliant: boolean;
  issue?: string;
  recommendation?: string;
  remediation?: string;
  confidence: number;
}

interface GovernancePolicy {
  id: string;
  name: string;
  description: string;
  severity: RiskLevel;
  checkFunction: (task: LegalTask) => Promise<GovernanceCheckResult>;
}

interface GovernanceCheckResult {
  compliant: boolean;
  currentState?: string;
  requiredState?: string;
  remediation?: string;
}

interface PolicyAlignmentResult {
  aligned: boolean;
  gaps: GovernanceGap[];
}