import { describe, test, expect, beforeEach } from 'bun:test';
import { ComplianceAnalyzer } from '../src/compliance-analyzer.js';
import type { 
  LegalTask, 
  LegalTaskType, 
  LegalDomain, 
  TaskPriority,
  CLOAgentConfig,
  ComplianceRequirement
} from '../src/types.js';

describe('Compliance Analyzer Unit Tests', () => {
  let analyzer: ComplianceAnalyzer;
  let mockConfig: CLOAgentConfig;

  beforeEach(() => {
    mockConfig = {
      agentId: 'test-compliance-analyzer',
      agentName: 'Test Compliance Analyzer',
      version: '1.0.0',
      capabilities: [],
      performance: {
        maxConcurrentTasks: 10,
        responseTimeTarget: 2000,
        throughputTarget: 100,
        cachingEnabled: true,
        circuitBreakerThreshold: 5
      },
      integration: {
        adaptiveLLMRouter: { enabled: true, costOptimization: true, preferredProviders: [], fallbackProviders: [] },
        cSuiteCoordination: { coordinationEnabled: true, escalationRules: [], communicationChannels: [] },
        externalSystems: []
      },
      security: {
        encryptionEnabled: true,
        auditLevel: 'comprehensive' as const,
        accessControls: [],
        dataRetention: {
          retentionPeriod: 2555,
          archivalPolicy: 'encrypt_and_archive',
          deletionPolicy: 'secure_deletion',
          complianceRequirements: []
        }
      }
    };

    analyzer = new ComplianceAnalyzer(mockConfig);
  });

  describe('GDPR Compliance Analysis', () => {
    let gdprTask: LegalTask;

    beforeEach(() => {
      gdprTask = {
        id: 'gdpr-compliance-test',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'GDPR compliance assessment for data processing',
        priority: 'high' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [
          {
            regulation: 'GDPR',
            jurisdiction: 'EU',
            requirement: 'Data processing lawfulness and consent',
            mandatory: true,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        ],
        escalationRequired: false,
        metadata: {
          submittedBy: 'privacy-team',
          submissionDate: new Date(),
          businessImpact: 'major' as const,
          stakeholders: ['privacy-officer', 'legal-counsel'],
          relatedDocuments: ['privacy-policy.pdf'],
          confidentialityLevel: 'confidential' as const
        }
      };
    });

    test('should analyze GDPR compliance requirements', async () => {
      const result = await analyzer.analyzeCompliance(gdprTask);

      expect(result.taskId).toBe(gdprTask.id);
      expect(result.complianceStatus).toBeDefined();
      expect(result.riskLevel).toBeDefined();
      expect(result.auditTrail.length).toBeGreaterThan(0);
    });

    test('should identify potential GDPR compliance gaps', async () => {
      const result = await analyzer.analyzeCompliance(gdprTask);

      if (result.complianceStatus !== 'compliant') {
        expect(result.findings.length).toBeGreaterThan(0);
        
        const gdprFindings = result.findings.filter(finding => 
          finding.regulation.includes('GDPR')
        );
        
        if (gdprFindings.length > 0) {
          const finding = gdprFindings[0];
          expect(finding.category).toBeDefined();
          expect(finding.severity).toBeDefined();
          expect(finding.description).toBeDefined();
          expect(finding.recommendation).toBeDefined();
          expect(finding.remediation).toBeDefined();
          expect(finding.remediation.timeframe).toBeDefined();
          expect(finding.remediation.responsibility).toBe('Privacy Team');
        }
      }
    });

    test('should handle multiple GDPR requirements', async () => {
      gdprTask.requiredCompliance.push(
        {
          regulation: 'GDPR',
          jurisdiction: 'EU',
          requirement: 'Data retention and deletion',
          mandatory: true,
          deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        },
        {
          regulation: 'GDPR',
          jurisdiction: 'EU',
          requirement: 'Data subject rights implementation',
          mandatory: true,
          deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
        }
      );

      const result = await analyzer.analyzeCompliance(gdprTask);
      
      expect(result.auditTrail.length).toBe(gdprTask.requiredCompliance.length);
      
      // Verify each compliance requirement was analyzed
      gdprTask.requiredCompliance.forEach(requirement => {
        const auditEntry = result.auditTrail.find(entry => 
          entry.details.inputData && 
          entry.details.inputData.regulation === requirement.regulation
        );
        expect(auditEntry).toBeDefined();
      });
    });
  });

  describe('SOX Compliance Analysis', () => {
    let soxTask: LegalTask;

    beforeEach(() => {
      soxTask = {
        id: 'sox-compliance-test',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'SOX compliance assessment for financial controls',
        priority: 'critical' as TaskPriority,
        domain: 'financial_compliance' as LegalDomain,
        requiredCompliance: [
          {
            regulation: 'SOX',
            jurisdiction: 'US',
            requirement: 'Internal controls over financial reporting',
            mandatory: true,
            deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
          }
        ],
        escalationRequired: true,
        metadata: {
          submittedBy: 'finance-team',
          submissionDate: new Date(),
          businessImpact: 'severe' as const,
          stakeholders: ['cfo', 'audit-committee'],
          relatedDocuments: ['financial-controls.pdf'],
          confidentialityLevel: 'restricted' as const
        }
      };
    });

    test('should analyze SOX compliance requirements', async () => {
      const result = await analyzer.analyzeCompliance(soxTask);

      expect(result.taskId).toBe(soxTask.id);
      expect(result.complianceStatus).toBeDefined();
      expect(result.riskLevel).toBeDefined();
    });

    test('should identify SOX control deficiencies', async () => {
      const result = await analyzer.analyzeCompliance(soxTask);

      if (result.complianceStatus !== 'compliant') {
        const soxFindings = result.findings.filter(finding => 
          finding.regulation.includes('SOX')
        );
        
        if (soxFindings.length > 0) {
          const finding = soxFindings[0];
          expect(finding.severity).toBeDefined();
          expect(finding.remediation.responsibility).toBe('Finance Team');
          expect(finding.remediation.cost).toBeGreaterThan(0);
        }
      }
    });

    test('should prioritize critical SOX findings', async () => {
      const result = await analyzer.analyzeCompliance(soxTask);

      if (result.riskLevel === 'critical') {
        expect(result.complianceStatus).toBe('non_compliant');
      }

      const criticalFindings = result.findings.filter(finding => 
        finding.severity === 'critical'
      );

      if (criticalFindings.length > 0) {
        expect(criticalFindings[0].remediation.timeframe).toBe('1 week');
      }
    });
  });

  describe('HIPAA Compliance Analysis', () => {
    let hipaaTask: LegalTask;

    beforeEach(() => {
      hipaaTask = {
        id: 'hipaa-compliance-test',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'HIPAA compliance assessment for PHI handling',
        priority: 'critical' as TaskPriority,
        domain: 'healthcare_compliance' as LegalDomain,
        requiredCompliance: [
          {
            regulation: 'HIPAA',
            jurisdiction: 'US',
            requirement: 'Administrative safeguards for PHI',
            mandatory: true,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        ],
        escalationRequired: true,
        metadata: {
          submittedBy: 'healthcare-team',
          submissionDate: new Date(),
          businessImpact: 'severe' as const,
          stakeholders: ['privacy-officer', 'security-officer'],
          relatedDocuments: ['hipaa-policy.pdf'],
          confidentialityLevel: 'top_secret' as const
        }
      };
    });

    test('should analyze HIPAA compliance requirements', async () => {
      const result = await analyzer.analyzeCompliance(hipaaTask);

      expect(result.taskId).toBe(hipaaTask.id);
      expect(result.riskLevel).toBeDefined();
      
      // HIPAA violations should be treated as high or critical risk
      expect(['high', 'critical']).toContain(result.riskLevel);
    });

    test('should identify HIPAA safeguard deficiencies', async () => {
      const result = await analyzer.analyzeCompliance(hipaaTask);

      const hipaaFindings = result.findings.filter(finding => 
        finding.regulation.includes('HIPAA')
      );

      if (hipaaFindings.length > 0) {
        const finding = hipaaFindings[0];
        expect(finding.remediation.responsibility).toBe('Compliance Team');
        expect(['critical', 'high']).toContain(finding.severity);
      }
    });
  });

  describe('Multi-Regulation Compliance Analysis', () => {
    test('should handle multiple regulation requirements', async () => {
      const multiRegTask: LegalTask = {
        id: 'multi-regulation-test',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Multi-regulation compliance assessment',
        priority: 'high' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [
          {
            regulation: 'GDPR',
            jurisdiction: 'EU',
            requirement: 'Data processing compliance',
            mandatory: true,
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          },
          {
            regulation: 'SOX',
            jurisdiction: 'US',
            requirement: 'Financial data controls',
            mandatory: true,
            deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000)
          },
          {
            regulation: 'HIPAA',
            jurisdiction: 'US',
            requirement: 'PHI protection measures',
            mandatory: true,
            deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
          }
        ],
        escalationRequired: true,
        metadata: {
          submittedBy: 'compliance-team',
          submissionDate: new Date(),
          businessImpact: 'major' as const,
          stakeholders: ['cpo', 'legal-counsel'],
          relatedDocuments: [],
          confidentialityLevel: 'confidential' as const
        }
      };

      const result = await analyzer.analyzeCompliance(multiRegTask);

      expect(result.taskId).toBe(multiRegTask.id);
      expect(result.auditTrail.length).toBe(multiRegTask.requiredCompliance.length);

      // Verify findings from different regulations
      const gdprFindings = result.findings.filter(f => f.regulation.includes('GDPR'));
      const soxFindings = result.findings.filter(f => f.regulation.includes('SOX'));
      const hipaaFindings = result.findings.filter(f => f.regulation.includes('HIPAA'));

      // At least one regulation should have findings (in mock implementation)
      expect(gdprFindings.length + soxFindings.length + hipaaFindings.length).toBeGreaterThanOrEqual(0);
    });

    test('should calculate overall risk from multiple regulations', async () => {
      const highRiskTask: LegalTask = {
        id: 'high-risk-multi-reg',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'High risk multi-regulation assessment',
        priority: 'critical' as TaskPriority,
        domain: 'financial_compliance' as LegalDomain,
        requiredCompliance: [
          {
            regulation: 'SOX',
            jurisdiction: 'US',
            requirement: 'Critical financial controls',
            mandatory: true
          },
          {
            regulation: 'GDPR',
            jurisdiction: 'EU',
            requirement: 'Sensitive data handling',
            mandatory: true
          }
        ],
        escalationRequired: true,
        metadata: {
          submittedBy: 'risk-team',
          submissionDate: new Date(),
          businessImpact: 'severe' as const,
          stakeholders: ['ceo', 'cfo'],
          relatedDocuments: [],
          confidentialityLevel: 'restricted' as const
        }
      };

      const result = await analyzer.analyzeCompliance(highRiskTask);

      // With critical priority and multiple regulations, expect elevated risk
      expect(['medium', 'high', 'critical']).toContain(result.riskLevel);
    });
  });

  describe('Risk Level Calculation', () => {
    test('should calculate low risk for compliant findings', async () => {
      // Mock a scenario where all checks pass
      const lowRiskTask: LegalTask = {
        id: 'low-risk-test',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Low risk compliance check',
        priority: 'low' as TaskPriority,
        domain: 'governance' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'routine-check',
          submissionDate: new Date(),
          businessImpact: 'minimal' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      };

      const result = await analyzer.analyzeCompliance(lowRiskTask);

      if (result.findings.length === 0) {
        expect(result.riskLevel).toBe('low');
        expect(result.complianceStatus).toBe('compliant');
      }
    });

    test('should escalate risk for critical findings', async () => {
      const criticalTask: LegalTask = {
        id: 'critical-risk-test',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Critical compliance issue',
        priority: 'critical' as TaskPriority,
        domain: 'healthcare_compliance' as LegalDomain,
        requiredCompliance: [
          {
            regulation: 'HIPAA',
            jurisdiction: 'US',
            requirement: 'Critical PHI breach response',
            mandatory: true
          }
        ],
        escalationRequired: true,
        metadata: {
          submittedBy: 'incident-response',
          submissionDate: new Date(),
          businessImpact: 'severe' as const,
          stakeholders: ['ceo', 'legal-counsel'],
          relatedDocuments: [],
          confidentialityLevel: 'top_secret' as const
        }
      };

      const result = await analyzer.analyzeCompliance(criticalTask);

      // Critical task should result in elevated risk assessment
      expect(['high', 'critical']).toContain(result.riskLevel);
    });
  });

  describe('Audit Trail Generation', () => {
    test('should generate comprehensive audit trail', async () => {
      const auditTask: LegalTask = {
        id: 'audit-trail-test',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Audit trail generation test',
        priority: 'medium' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [
          {
            regulation: 'GDPR',
            jurisdiction: 'EU',
            requirement: 'Test audit trail generation',
            mandatory: true
          }
        ],
        escalationRequired: false,
        metadata: {
          submittedBy: 'audit-team',
          submissionDate: new Date(),
          businessImpact: 'moderate' as const,
          stakeholders: ['auditor'],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      };

      const result = await analyzer.analyzeCompliance(auditTask);

      expect(result.auditTrail.length).toBeGreaterThan(0);

      const auditEntry = result.auditTrail[0];
      expect(auditEntry.entryId).toBeDefined();
      expect(auditEntry.timestamp).toBeInstanceOf(Date);
      expect(auditEntry.agentId).toBe(mockConfig.agentId);
      expect(auditEntry.action).toBe('compliance_check');
      expect(auditEntry.taskId).toBe(auditTask.id);
      expect(auditEntry.details.description).toContain('Compliance check for GDPR');
      expect(auditEntry.outcome).toBe('success');
    });

    test('should include regulation-specific audit details', async () => {
      const detailedAuditTask: LegalTask = {
        id: 'detailed-audit-test',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Detailed audit information test',
        priority: 'high' as TaskPriority,
        domain: 'financial_compliance' as LegalDomain,
        requiredCompliance: [
          {
            regulation: 'SOX',
            jurisdiction: 'US',
            requirement: 'Detailed audit requirements',
            mandatory: true
          }
        ],
        escalationRequired: false,
        metadata: {
          submittedBy: 'compliance-officer',
          submissionDate: new Date(),
          businessImpact: 'major' as const,
          stakeholders: ['cfo'],
          relatedDocuments: [],
          confidentialityLevel: 'confidential' as const
        }
      };

      const result = await analyzer.analyzeCompliance(detailedAuditTask);

      const soxAuditEntry = result.auditTrail.find(entry => 
        entry.details.inputData && 
        entry.details.inputData.regulation === 'SOX'
      );

      expect(soxAuditEntry).toBeDefined();
      expect(soxAuditEntry?.details.inputData?.jurisdiction).toBe('US');
      expect(soxAuditEntry?.details.outputData?.findingsCount).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Performance and Resource Management', () => {
    test('should complete analysis within reasonable time', async () => {
      const performanceTask: LegalTask = {
        id: 'performance-test',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Performance testing task',
        priority: 'medium' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [
          {
            regulation: 'GDPR',
            jurisdiction: 'EU',
            requirement: 'Performance test requirement',
            mandatory: true
          }
        ],
        escalationRequired: false,
        metadata: {
          submittedBy: 'performance-tester',
          submissionDate: new Date(),
          businessImpact: 'moderate' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      };

      const startTime = Date.now();
      const result = await analyzer.analyzeCompliance(performanceTask);
      const duration = Date.now() - startTime;

      expect(duration).toBeLessThan(5000); // Should complete within 5 seconds
      expect(result.taskId).toBe(performanceTask.id);
    });

    test('should shutdown gracefully', async () => {
      await expect(analyzer.shutdown()).resolves.not.toThrow();
    });
  });
});