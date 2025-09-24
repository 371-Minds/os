/**
 * Security Assessment Engine for CTO Agent (Zara)
 * 
 * Provides comprehensive security analysis, vulnerability assessment,
 * and security response coordination for technical tasks
 */

import type {
  TechnicalTask,
  Risk,
  RiskAssessment,
  SecurityRequirement,
  SecurityPlan
} from './types.js';

export interface SecurityAssessment {
  taskId: string;
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  vulnerabilities: Vulnerability[];
  threatModel: ThreatModel;
  complianceRequirements: ComplianceRequirement[];
  mitigationStrategy: MitigationStrategy;
  responseTime: number;
}

export interface Vulnerability {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  description: string;
  impact: string;
  exploitability: 'low' | 'medium' | 'high';
  mitigation: string;
  timeline: string;
}

export interface ThreatModel {
  assets: string[];
  threats: Threat[];
  attackVectors: string[];
  riskMatrix: RiskMatrix;
}

export interface Threat {
  name: string;
  likelihood: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  attackers: string[];
  mitigation: string;
}

export interface RiskMatrix {
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  totalRisk: number;
}

export interface ComplianceRequirement {
  framework: string;
  requirements: string[];
  status: 'compliant' | 'partial' | 'non-compliant';
  actions: string[];
}

export interface MitigationStrategy {
  immediate: string[];
  shortTerm: string[];
  longTerm: string[];
  resources: string[];
  timeline: string;
}

export class SecurityAssessmentEngine {
  // Security threat patterns and indicators
  private readonly SECURITY_PATTERNS = {
    authentication: {
      keywords: ['auth', 'login', 'password', 'token', 'oauth', 'saml'],
      vulnerabilities: ['weak passwords', 'session hijacking', 'credential stuffing'],
      mitigations: ['MFA', 'strong password policy', 'session management']
    },
    dataProtection: {
      keywords: ['data', 'personal', 'sensitive', 'encryption', 'storage'],
      vulnerabilities: ['data breach', 'unauthorized access', 'data leakage'],
      mitigations: ['encryption at rest', 'access controls', 'data classification']
    },
    apiSecurity: {
      keywords: ['api', 'endpoint', 'rest', 'graphql', 'webhook'],
      vulnerabilities: ['injection attacks', 'broken authorization', 'rate limiting'],
      mitigations: ['input validation', 'API gateway', 'rate limiting']
    },
    infrastructure: {
      keywords: ['server', 'cloud', 'container', 'kubernetes', 'docker'],
      vulnerabilities: ['misconfigurations', 'container escapes', 'privilege escalation'],
      mitigations: ['security hardening', 'container scanning', 'network segmentation']
    }
  };

  // Compliance frameworks
  private readonly COMPLIANCE_FRAMEWORKS = {
    GDPR: {
      keywords: ['personal', 'gdpr', 'privacy', 'eu', 'data subject'],
      requirements: ['consent management', 'data portability', 'right to be forgotten']
    },
    PCI_DSS: {
      keywords: ['payment', 'card', 'pci', 'financial', 'transaction'],
      requirements: ['secure network', 'cardholder data protection', 'vulnerability management']
    },
    HIPAA: {
      keywords: ['health', 'medical', 'hipaa', 'patient', 'healthcare'],
      requirements: ['access controls', 'audit logs', 'data encryption']
    },
    SOC2: {
      keywords: ['soc2', 'saas', 'service', 'customer data', 'cloud'],
      requirements: ['security controls', 'availability', 'processing integrity']
    }
  };

  /**
   * Perform comprehensive security assessment
   */
  public async assessSecurity(task: TechnicalTask): Promise<SecurityAssessment> {
    console.log(`🛡️ Performing security assessment for: ${task.title}`);
    
    const content = `${task.title} ${task.description}`.toLowerCase();
    
    // Determine security level based on content and priority
    const securityLevel = this.determineSecurityLevel(content, task.priority);
    
    // Identify vulnerabilities
    const vulnerabilities = this.identifyVulnerabilities(content, securityLevel);
    
    // Build threat model
    const threatModel = this.buildThreatModel(content, vulnerabilities);
    
    // Assess compliance requirements
    const complianceRequirements = this.assessComplianceRequirements(content);
    
    // Generate mitigation strategy
    const mitigationStrategy = this.generateMitigationStrategy(
      vulnerabilities, 
      threatModel, 
      securityLevel,
      task.priority
    );
    
    // Calculate response time based on security level
    const responseTime = this.calculateResponseTime(securityLevel, task.priority);
    
    const assessment: SecurityAssessment = {
      taskId: task.id,
      securityLevel,
      vulnerabilities,
      threatModel,
      complianceRequirements,
      mitigationStrategy,
      responseTime
    };
    
    console.log(`✅ Security assessment completed: ${securityLevel} security level`);
    console.log(`🚨 Found ${vulnerabilities.length} vulnerabilities, ${threatModel.threats.length} threats`);
    console.log(`⏱️ Response time requirement: ${responseTime} hours`);
    
    return assessment;
  }

  /**
   * Determine security level based on content analysis
   */
  private determineSecurityLevel(content: string, priority: string): 'low' | 'medium' | 'high' | 'critical' {
    let score = 0;
    
    // High-impact keywords
    const criticalKeywords = ['breach', 'vulnerability', 'exploit', 'attack', 'critical'];
    const highKeywords = ['security', 'sensitive', 'personal', 'financial', 'authentication'];
    const mediumKeywords = ['data', 'api', 'user', 'access', 'permission'];
    
    criticalKeywords.forEach(keyword => {
      if (content.includes(keyword)) score += 4;
    });
    
    highKeywords.forEach(keyword => {
      if (content.includes(keyword)) score += 2;
    });
    
    mediumKeywords.forEach(keyword => {
      if (content.includes(keyword)) score += 1;
    });
    
    // Priority-based adjustment
    if (priority === 'critical') score += 3;
    else if (priority === 'high') score += 2;
    else if (priority === 'medium') score += 1;
    
    // Determine level
    if (score >= 8) return 'critical';
    else if (score >= 5) return 'high';
    else if (score >= 2) return 'medium';
    else return 'low';
  }

  /**
   * Identify potential vulnerabilities
   */
  private identifyVulnerabilities(content: string, securityLevel: string): Vulnerability[] {
    const vulnerabilities: Vulnerability[] = [];
    let vulnId = 1;
    
    Object.entries(this.SECURITY_PATTERNS).forEach(([category, pattern]) => {
      const hasKeywords = pattern.keywords.some(keyword => content.includes(keyword));
      
      if (hasKeywords) {
        pattern.vulnerabilities.forEach((vulnDesc, index) => {
          const severity = this.determineSeverity(vulnDesc, securityLevel);
          const exploitability = this.determineExploitability(vulnDesc, content);
          
          vulnerabilities.push({
            id: `VULN-${vulnId.toString().padStart(3, '0')}`,
            severity,
            category: category.charAt(0).toUpperCase() + category.slice(1),
            description: vulnDesc,
            impact: this.determineImpact(vulnDesc, severity),
            exploitability,
            mitigation: pattern.mitigations[index] || 'Implement security controls',
            timeline: this.determineTimeline(severity)
          });
          vulnId++;
        });
      }
    });
    
    return vulnerabilities;
  }

  /**
   * Build comprehensive threat model
   */
  private buildThreatModel(content: string, vulnerabilities: Vulnerability[]): ThreatModel {
    // Identify assets
    const assets = this.identifyAssets(content);
    
    // Generate threats based on vulnerabilities and assets
    const threats = this.generateThreats(vulnerabilities, assets, content);
    
    // Identify attack vectors
    const attackVectors = this.identifyAttackVectors(content, vulnerabilities);
    
    // Calculate risk matrix
    const riskMatrix = this.calculateRiskMatrix(threats);
    
    return {
      assets,
      threats,
      attackVectors,
      riskMatrix
    };
  }

  /**
   * Assess compliance requirements
   */
  private assessComplianceRequirements(content: string): ComplianceRequirement[] {
    const requirements: ComplianceRequirement[] = [];
    
    Object.entries(this.COMPLIANCE_FRAMEWORKS).forEach(([framework, config]) => {
      const hasKeywords = config.keywords.some(keyword => content.includes(keyword));
      
      if (hasKeywords) {
        requirements.push({
          framework,
          requirements: config.requirements,
          status: this.assessComplianceStatus(framework, content),
          actions: this.generateComplianceActions(framework, content)
        });
      }
    });
    
    return requirements;
  }

  /**
   * Generate comprehensive mitigation strategy
   */
  private generateMitigationStrategy(
    vulnerabilities: Vulnerability[],
    threatModel: ThreatModel,
    securityLevel: string,
    priority: string
  ): MitigationStrategy {
    const immediate: string[] = [];
    const shortTerm: string[] = [];
    const longTerm: string[] = [];
    const resources: string[] = [];
    
    // Immediate actions for critical vulnerabilities
    const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical');
    if (criticalVulns.length > 0) {
      immediate.push('Implement emergency patches for critical vulnerabilities');
      immediate.push('Enable enhanced monitoring and alerting');
      immediate.push('Activate incident response team');
    }
    
    // Short-term actions
    const highVulns = vulnerabilities.filter(v => v.severity === 'high');
    if (highVulns.length > 0) {
      shortTerm.push('Deploy security patches and updates');
      shortTerm.push('Implement additional access controls');
      shortTerm.push('Conduct security testing');
    }
    
    // Long-term strategic actions
    longTerm.push('Establish security architecture review process');
    longTerm.push('Implement security training program');
    longTerm.push('Regular security assessments and penetration testing');
    
    // Resource requirements
    resources.push('Security engineering team');
    resources.push('Security tools and monitoring platforms');
    if (securityLevel === 'critical' || priority === 'critical') {
      resources.push('External security consultants');
      resources.push('Dedicated security operations center');
    }
    
    return {
      immediate,
      shortTerm,
      longTerm,
      resources,
      timeline: this.calculateMitigationTimeline(securityLevel, vulnerabilities.length)
    };
  }

  // Helper methods
  private determineSeverity(vulnerability: string, securityLevel: string): 'low' | 'medium' | 'high' | 'critical' {
    if (vulnerability.includes('breach') || vulnerability.includes('exploit')) {
      return securityLevel === 'critical' ? 'critical' : 'high';
    }
    if (vulnerability.includes('unauthorized') || vulnerability.includes('injection')) {
      return 'high';
    }
    return 'medium';
  }

  private determineExploitability(vulnerability: string, content: string): 'low' | 'medium' | 'high' {
    if (content.includes('public') || content.includes('internet-facing')) return 'high';
    if (content.includes('internal') || content.includes('private')) return 'medium';
    return 'low';
  }

  private determineImpact(vulnerability: string, severity: string): string {
    const impacts = {
      critical: 'Complete system compromise, data breach, service unavailability',
      high: 'Significant data exposure, unauthorized access, service degradation',
      medium: 'Limited data access, minor service disruption',
      low: 'Minimal impact, information disclosure'
    };
    return impacts[severity as keyof typeof impacts] || 'Unknown impact';
  }

  private determineTimeline(severity: string): string {
    const timelines = {
      critical: 'Immediate (0-24 hours)',
      high: 'Urgent (1-7 days)',
      medium: 'Standard (1-4 weeks)',
      low: 'Planned (1-3 months)'
    };
    return timelines[severity as keyof typeof timelines] || '1-4 weeks';
  }

  private identifyAssets(content: string): string[] {
    const assets = ['Application', 'Database'];
    
    if (content.includes('user') || content.includes('customer')) {
      assets.push('User Data', 'Customer Information');
    }
    if (content.includes('payment') || content.includes('financial')) {
      assets.push('Payment Systems', 'Financial Data');
    }
    if (content.includes('api')) {
      assets.push('API Endpoints');
    }
    if (content.includes('infrastructure') || content.includes('server')) {
      assets.push('Infrastructure', 'Servers');
    }
    
    return assets;
  }

  private generateThreats(vulnerabilities: Vulnerability[], assets: string[], content: string): Threat[] {
    const threats: Threat[] = [];
    
    // Generate threats based on vulnerabilities
    vulnerabilities.forEach(vuln => {
      threats.push({
        name: `${vuln.category} Attack via ${vuln.description}`,
        likelihood: vuln.exploitability,
        impact: vuln.severity,
        attackers: this.identifyAttackers(content, vuln.category),
        mitigation: vuln.mitigation
      });
    });
    
    return threats;
  }

  private identifyAttackers(content: string, category: string): string[] {
    const attackers = ['External Attackers'];
    
    if (content.includes('insider') || content.includes('employee')) {
      attackers.push('Malicious Insiders');
    }
    if (content.includes('nation') || content.includes('state')) {
      attackers.push('Nation State Actors');
    }
    if (content.includes('competitor') || content.includes('industrial')) {
      attackers.push('Corporate Espionage');
    }
    
    return attackers;
  }

  private identifyAttackVectors(content: string, vulnerabilities: Vulnerability[]): string[] {
    const vectors = ['Network-based attacks', 'Application-level attacks'];
    
    if (content.includes('email') || content.includes('phishing')) {
      vectors.push('Email-based attacks');
    }
    if (content.includes('social') || content.includes('human')) {
      vectors.push('Social engineering');
    }
    if (content.includes('physical') || content.includes('device')) {
      vectors.push('Physical access');
    }
    
    return vectors;
  }

  private calculateRiskMatrix(threats: Threat[]): RiskMatrix {
    let highRisk = 0;
    let mediumRisk = 0;
    let lowRisk = 0;
    
    threats.forEach(threat => {
      const riskScore = this.calculateThreatRisk(threat.likelihood, threat.impact);
      if (riskScore >= 9) highRisk++;
      else if (riskScore >= 4) mediumRisk++;
      else lowRisk++;
    });
    
    return {
      highRisk,
      mediumRisk,
      lowRisk,
      totalRisk: threats.length
    };
  }

  private calculateThreatRisk(likelihood: string, impact: string): number {
    const likelihoodScore = { low: 1, medium: 2, high: 3 };
    const impactScore = { low: 1, medium: 2, high: 3, critical: 4 };
    
    return (likelihoodScore[likelihood as keyof typeof likelihoodScore] || 1) * 
           (impactScore[impact as keyof typeof impactScore] || 1);
  }

  private assessComplianceStatus(framework: string, content: string): 'compliant' | 'partial' | 'non-compliant' {
    // Simple heuristic - in real implementation, this would be more sophisticated
    if (content.includes('compliant') || content.includes('certified')) {
      return 'compliant';
    }
    if (content.includes('audit') || content.includes('review')) {
      return 'partial';
    }
    return 'non-compliant';
  }

  private generateComplianceActions(framework: string, content: string): string[] {
    const actions = [`Conduct ${framework} gap analysis`, `Implement ${framework} controls`];
    
    if (framework === 'GDPR') {
      actions.push('Implement consent management', 'Establish data subject request process');
    }
    if (framework === 'PCI_DSS') {
      actions.push('Implement payment data encryption', 'Establish vulnerability scanning');
    }
    
    return actions;
  }

  private calculateResponseTime(securityLevel: string, priority: string): number {
    const baseTimes = {
      critical: 1,
      high: 4,
      medium: 24,
      low: 72
    };
    
    let responseTime = baseTimes[securityLevel as keyof typeof baseTimes] || 24;
    
    // Priority adjustment
    if (priority === 'critical') responseTime = Math.min(responseTime, 2);
    
    return responseTime;
  }

  private calculateMitigationTimeline(securityLevel: string, vulnerabilityCount: number): string {
    let weeks = 4;
    
    if (securityLevel === 'critical') weeks = 2;
    else if (securityLevel === 'high') weeks = 4;
    else if (securityLevel === 'medium') weeks = 8;
    else weeks = 12;
    
    // Adjust for vulnerability count
    if (vulnerabilityCount > 10) weeks += 2;
    else if (vulnerabilityCount > 5) weeks += 1;
    
    return `${weeks} weeks`;
  }

  /**
   * Validate security assessment engine
   */
  public async validate(): Promise<boolean> {
    try {
      const testTask: TechnicalTask = {
        id: 'security-test-001',
        title: 'Security vulnerability assessment',
        description: 'Critical security breach in authentication system with personal data exposure',
        category: 'security_response',
        priority: 'critical',
        requestedBy: 'test-user',
        createdAt: new Date()
      };
      
      const assessment = await this.assessSecurity(testTask);
      return assessment.securityLevel === 'critical' && assessment.vulnerabilities.length > 0;
    } catch (error) {
      console.error('❌ Security Assessment Engine validation failed:', error);
      return false;
    }
  }
}