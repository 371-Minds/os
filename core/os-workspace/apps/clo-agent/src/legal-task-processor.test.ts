import { describe, test, expect, beforeEach } from 'bun:test';
import { LegalTaskProcessor } from '../src/legal-task-processor.js';
import type { 
  LegalTask, 
  LegalTaskType, 
  LegalDomain, 
  TaskPriority,
  CLOAgentConfig
} from '../src/types.js';

describe('Legal Task Processor Unit Tests', () => {
  let processor: LegalTaskProcessor;
  let mockConfig: CLOAgentConfig;

  beforeEach(() => {
    mockConfig = {
      agentId: 'test-clo-agent',
      agentName: 'Test CLO Agent',
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

    processor = new LegalTaskProcessor(mockConfig);
  });

  describe('Task Validation', () => {
    test('should validate valid legal task', async () => {
      const validTask: LegalTask = {
        id: 'valid-task-001',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Valid compliance assessment task',
        priority: 'medium' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-user',
          submissionDate: new Date(),
          businessImpact: 'moderate' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      };

      const result = await processor.processTask(validTask);
      expect(result.taskId).toBe(validTask.id);
      expect(result.complianceStatus).toBeDefined();
    });

    test('should reject task without ID', async () => {
      const invalidTask = {
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Task without ID',
        priority: 'medium' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-user',
          submissionDate: new Date(),
          businessImpact: 'moderate' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      } as LegalTask;

      await expect(processor.processTask(invalidTask))
        .rejects.toThrow('Task ID is required');
    });

    test('should reject task without description', async () => {
      const invalidTask = {
        id: 'task-001',
        type: 'compliance_assessment' as LegalTaskType,
        priority: 'medium' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-user',
          submissionDate: new Date(),
          businessImpact: 'moderate' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      } as LegalTask;

      await expect(processor.processTask(invalidTask))
        .rejects.toThrow('Task description is required');
    });

    test('should reject invalid task type', async () => {
      const invalidTask = {
        id: 'task-001',
        type: 'invalid_type' as LegalTaskType,
        description: 'Invalid task type',
        priority: 'medium' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-user',
          submissionDate: new Date(),
          businessImpact: 'moderate' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      };

      await expect(processor.processTask(invalidTask))
        .rejects.toThrow('Invalid task type: invalid_type');
    });
  });

  describe('Task Type Processing', () => {
    const createTestTask = (type: LegalTaskType, domain: LegalDomain = 'data_privacy'): LegalTask => ({
      id: `task-${type}-001`,
      type,
      description: `Test ${type} task`,
      priority: 'medium' as TaskPriority,
      domain,
      requiredCompliance: [],
      escalationRequired: false,
      metadata: {
        submittedBy: 'test-user',
        submissionDate: new Date(),
        businessImpact: 'moderate' as const,
        stakeholders: [],
        relatedDocuments: [],
        confidentialityLevel: 'internal' as const
      }
    });

    test('should process compliance assessment task', async () => {
      const task = createTestTask('compliance_assessment');
      const result = await processor.processTask(task);

      expect(result.taskId).toBe(task.id);
      expect(result.findings.length).toBeGreaterThan(0);
      expect(result.recommendedActions.length).toBeGreaterThan(0);
      expect(result.auditTrail.length).toBeGreaterThan(0);
    });

    test('should process contract review task', async () => {
      const task = createTestTask('contract_review', 'corporate_law');
      const result = await processor.processTask(task);

      expect(result.taskId).toBe(task.id);
      expect(result.complianceStatus).toBe('requires_review');
      expect(result.timeToResolution).toBe(24);
    });

    test('should process risk assessment task', async () => {
      const task = createTestTask('risk_assessment', 'security_compliance');
      const result = await processor.processTask(task);

      expect(result.taskId).toBe(task.id);
      expect(result.complianceStatus).toBe('pending_assessment');
      expect(result.riskLevel).toBeDefined();
    });

    test('should process policy validation task', async () => {
      const task = createTestTask('policy_validation', 'governance');
      const result = await processor.processTask(task);

      expect(result.taskId).toBe(task.id);
      expect(result.complianceStatus).toBe('compliant');
      expect(result.timeToResolution).toBe(8);
    });

    test('should process governance review task', async () => {
      const task = createTestTask('governance_review', 'governance');
      const result = await processor.processTask(task);

      expect(result.taskId).toBe(task.id);
      expect(result.complianceStatus).toBe('compliant');
      expect(result.riskLevel).toBe('low');
      expect(result.timeToResolution).toBe(4);
    });

    test('should process regulatory analysis task', async () => {
      const task = createTestTask('regulatory_analysis', 'financial_compliance');
      const result = await processor.processTask(task);

      expect(result.taskId).toBe(task.id);
      expect(result.complianceStatus).toBe('requires_review');
      expect(result.timeToResolution).toBe(48);
    });

    test('should process audit preparation task', async () => {
      const task = createTestTask('audit_preparation', 'financial_compliance');
      const result = await processor.processTask(task);

      expect(result.taskId).toBe(task.id);
      expect(result.complianceStatus).toBe('compliant');
      expect(result.riskLevel).toBe('medium');
      expect(result.timeToResolution).toBe(72);
    });

    test('should process incident response task', async () => {
      const task = createTestTask('incident_response', 'data_privacy');
      const result = await processor.processTask(task);

      expect(result.taskId).toBe(task.id);
      expect(result.complianceStatus).toBe('non_compliant');
      expect(result.riskLevel).toBe('high');
    });
  });

  describe('Domain-Specific Analysis', () => {
    test('should generate GDPR-specific findings for data privacy domain', async () => {
      const task: LegalTask = {
        id: 'gdpr-task-001',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'GDPR compliance assessment',
        priority: 'high' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'privacy-team',
          submissionDate: new Date(),
          businessImpact: 'major' as const,
          stakeholders: ['privacy-officer'],
          relatedDocuments: [],
          confidentialityLevel: 'confidential' as const
        }
      };

      const result = await processor.processTask(task);
      
      expect(result.findings.length).toBeGreaterThan(0);
      const gdprFinding = result.findings.find(f => f.regulation.includes('GDPR'));
      expect(gdprFinding).toBeDefined();
      expect(gdprFinding?.category).toBe('data_handling');
    });

    test('should generate SOX-specific findings for financial compliance domain', async () => {
      const task: LegalTask = {
        id: 'sox-task-001',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'SOX compliance assessment',
        priority: 'critical' as TaskPriority,
        domain: 'financial_compliance' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'finance-team',
          submissionDate: new Date(),
          businessImpact: 'severe' as const,
          stakeholders: ['cfo'],
          relatedDocuments: [],
          confidentialityLevel: 'restricted' as const
        }
      };

      const result = await processor.processTask(task);
      
      expect(result.findings.length).toBeGreaterThan(0);
      const soxFinding = result.findings.find(f => f.regulation.includes('SOX'));
      expect(soxFinding).toBeDefined();
      expect(soxFinding?.category).toBe('process_compliance');
      expect(soxFinding?.severity).toBe('high');
    });

    test('should adjust risk level based on task priority', async () => {
      const lowPriorityTask: LegalTask = {
        id: 'low-priority-task',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Low priority assessment',
        priority: 'low' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-user',
          submissionDate: new Date(),
          businessImpact: 'minimal' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      };

      const criticalPriorityTask: LegalTask = {
        ...lowPriorityTask,
        id: 'critical-priority-task',
        priority: 'critical' as TaskPriority,
        metadata: {
          ...lowPriorityTask.metadata,
          businessImpact: 'severe' as const
        }
      };

      const lowResult = await processor.processTask(lowPriorityTask);
      const criticalResult = await processor.processTask(criticalPriorityTask);

      expect(lowResult.timeToResolution).toBeLessThan(criticalResult.timeToResolution);
    });
  });

  describe('Audit Trail Generation', () => {
    test('should generate audit trail for all processed tasks', async () => {
      const task: LegalTask = {
        id: 'audit-task-001',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Audit trail test task',
        priority: 'medium' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-user',
          submissionDate: new Date(),
          businessImpact: 'moderate' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      };

      const result = await processor.processTask(task);

      expect(result.auditTrail.length).toBeGreaterThan(0);
      
      const auditEntry = result.auditTrail[0];
      expect(auditEntry.entryId).toBeDefined();
      expect(auditEntry.timestamp).toBeInstanceOf(Date);
      expect(auditEntry.agentId).toBe(mockConfig.agentId);
      expect(auditEntry.taskId).toBe(task.id);
      expect(auditEntry.action).toBe('task_completed');
      expect(auditEntry.outcome).toBe('success');
    });

    test('should include processing time in audit trail', async () => {
      const task: LegalTask = {
        id: 'timing-task-001',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Processing time test task',
        priority: 'medium' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-user',
          submissionDate: new Date(),
          businessImpact: 'moderate' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      };

      const result = await processor.processTask(task);
      const auditEntry = result.auditTrail.find(entry => entry.action === 'task_completed');
      
      expect(auditEntry).toBeDefined();
      expect(auditEntry?.details.processingTime).toBeGreaterThan(0);
    });
  });

  describe('Recommended Actions Generation', () => {
    test('should generate actionable recommendations', async () => {
      const task: LegalTask = {
        id: 'recommendations-task-001',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Test recommendations generation',
        priority: 'high' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-user',
          submissionDate: new Date(),
          businessImpact: 'major' as const,
          stakeholders: ['privacy-officer'],
          relatedDocuments: [],
          confidentialityLevel: 'confidential' as const
        }
      };

      const result = await processor.processTask(task);

      expect(result.recommendedActions.length).toBeGreaterThan(0);
      
      const action = result.recommendedActions[0];
      expect(action.id).toBeDefined();
      expect(action.priority).toBeDefined();
      expect(action.action).toBeDefined();
      expect(action.justification).toBeDefined();
      expect(action.implementation).toBeDefined();
      expect(action.implementation.steps.length).toBeGreaterThan(0);
      expect(action.stakeholders.length).toBeGreaterThan(0);
      expect(action.deadline).toBeInstanceOf(Date);
    });

    test('should prioritize critical findings in recommendations', async () => {
      const task: LegalTask = {
        id: 'critical-recommendations-task',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Critical priority recommendations test',
        priority: 'critical' as TaskPriority,
        domain: 'financial_compliance' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'finance-team',
          submissionDate: new Date(),
          businessImpact: 'severe' as const,
          stakeholders: ['cfo'],
          relatedDocuments: [],
          confidentialityLevel: 'restricted' as const
        }
      };

      const result = await processor.processTask(task);
      
      expect(result.recommendedActions.length).toBeGreaterThan(0);
      const criticalActions = result.recommendedActions.filter(action => 
        action.priority === 'critical' || action.priority === 'high'
      );
      expect(criticalActions.length).toBeGreaterThan(0);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    test('should handle unsupported task type gracefully', async () => {
      const task = {
        id: 'unsupported-task-001',
        type: 'unsupported_type' as LegalTaskType,
        description: 'Unsupported task type',
        priority: 'medium' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-user',
          submissionDate: new Date(),
          businessImpact: 'moderate' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      };

      await expect(processor.processTask(task))
        .rejects.toThrow('Unsupported task type: unsupported_type');
    });

    test('should handle empty task description gracefully', async () => {
      const task = {
        id: 'empty-desc-task',
        type: 'compliance_assessment' as LegalTaskType,
        description: '',
        priority: 'medium' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-user',
          submissionDate: new Date(),
          businessImpact: 'moderate' as const,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as const
        }
      };

      await expect(processor.processTask(task))
        .rejects.toThrow('Task description is required');
    });

    test('should shutdown gracefully', async () => {
      await expect(processor.shutdown()).resolves.not.toThrow();
    });
  });
});