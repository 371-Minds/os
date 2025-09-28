import { describe, test, expect, beforeEach } from 'bun:test';
import CLOAgent from '../src/index.js';
import type { 
  LegalTask, 
  LegalTaskType, 
  LegalDomain, 
  TaskPriority,
  ComplianceRequirement,
  LegalTaskMetadata,
  BusinessImpact,
  ConfidentialityLevel
} from '../src/types.js';

describe('CLO Agent (Alex) Integration Tests', () => {
  let cloAgent: CLOAgent;

  beforeEach(() => {
    cloAgent = new CLOAgent();
  });

  describe('Agent Initialization', () => {
    test('should initialize CLO Agent successfully', () => {
      expect(cloAgent).toBeDefined();
      const config = cloAgent.getConfiguration();
      expect(config.agentId).toBe('clo-alex-001');
      expect(config.agentName).toContain('Alex');
    });

    test('should load brain definition configuration', () => {
      const config = cloAgent.getConfiguration();
      expect(config.capabilities.length).toBeGreaterThan(0);
      expect(config.performance.responseTimeTarget).toBeGreaterThan(0);
      expect(config.integration.adaptiveLLMRouter.enabled).toBe(true);
    });

    test('should have proper security configuration', () => {
      const config = cloAgent.getConfiguration();
      expect(config.security.encryptionEnabled).toBe(true);
      expect(config.security.auditLevel).toBe('comprehensive');
      expect(config.security.dataRetention.retentionPeriod).toBe(2555); // 7 years
    });
  });

  describe('Health Status Monitoring', () => {
    test('should report healthy status initially', () => {
      const health = cloAgent.getHealthStatus();
      expect(health.status).toBe('healthy');
      expect(health.agentId).toBe('clo-alex-001');
      expect(health.performanceMetrics.tasksProcessed).toBe(0);
      expect(health.performanceMetrics.successRate).toBe(1.0);
    });

    test('should track uptime correctly', () => {
      const health = cloAgent.getHealthStatus();
      expect(health.uptime).toBeGreaterThanOrEqual(0);
      expect(health.lastHealthCheck).toBeInstanceOf(Date);
    });

    test('should report system resources', () => {
      const health = cloAgent.getHealthStatus();
      expect(health.systemResources.memoryUsed).toBeGreaterThan(0);
      expect(health.systemResources.memoryTotal).toBeGreaterThan(0);
      expect(health.performanceMetrics.memoryUsage).toBeGreaterThan(0);
    });
  });

  describe('Legal Task Processing', () => {
    let testTask: LegalTask;

    beforeEach(() => {
      testTask = {
        id: 'test-legal-task-001',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Test GDPR compliance assessment for data processing workflow',
        priority: 'high' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [
          {
            regulation: 'GDPR',
            jurisdiction: 'EU',
            requirement: 'Data processing lawfulness assessment',
            mandatory: true,
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          }
        ],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test-team',
          submissionDate: new Date(),
          businessImpact: 'moderate' as BusinessImpact,
          stakeholders: ['product-manager', 'data-engineer'],
          relatedDocuments: ['test-policy.pdf'],
          confidentialityLevel: 'confidential' as ConfidentialityLevel
        }
      };
    });

    test('should process compliance assessment task successfully', async () => {
      const result = await cloAgent.processLegalTask(testTask);
      
      expect(result.taskId).toBe(testTask.id);
      expect(result.complianceStatus).toBeDefined();
      expect(result.riskLevel).toBeDefined();
      expect(result.findings).toBeDefined();
      expect(result.timeToResolution).toBeGreaterThan(0);
      expect(result.auditTrail.length).toBeGreaterThan(0);
    });

    test('should handle contract review task', async () => {
      testTask.type = 'contract_review' as LegalTaskType;
      testTask.domain = 'corporate_law' as LegalDomain;
      testTask.description = 'Review vendor service agreement';

      const result = await cloAgent.processLegalTask(testTask);
      
      expect(result.taskId).toBe(testTask.id);
      expect(result.complianceStatus).toBe('requires_review');
      expect(result.timeToResolution).toBe(24); // 24 hours for contract review
    });

    test('should handle risk assessment task', async () => {
      testTask.type = 'risk_assessment' as LegalTaskType;
      testTask.domain = 'security_compliance' as LegalDomain;
      testTask.description = 'Assess security compliance risks';

      const result = await cloAgent.processLegalTask(testTask);
      
      expect(result.taskId).toBe(testTask.id);
      expect(result.complianceStatus).toBe('pending_assessment');
      expect(result.riskLevel).toBeDefined();
    });

    test('should handle policy validation task', async () => {
      testTask.type = 'policy_validation' as LegalTaskType;
      testTask.domain = 'governance' as LegalDomain;
      testTask.description = 'Validate data governance policy';

      const result = await cloAgent.processLegalTask(testTask);
      
      expect(result.taskId).toBe(testTask.id);
      expect(result.complianceStatus).toBe('compliant');
      expect(result.timeToResolution).toBe(8); // 8 hours for policy validation
    });

    test('should handle incident response task', async () => {
      testTask.type = 'incident_response' as LegalTaskType;
      testTask.domain = 'data_privacy' as LegalDomain;
      testTask.priority = 'critical' as TaskPriority;
      testTask.description = 'Data breach incident legal response';

      const result = await cloAgent.processLegalTask(testTask);
      
      expect(result.taskId).toBe(testTask.id);
      expect(result.complianceStatus).toBe('non_compliant');
      expect(result.riskLevel).toBe('high');
    });

    test('should update performance metrics after task processing', async () => {
      const initialHealth = cloAgent.getHealthStatus();
      const initialTaskCount = initialHealth.performanceMetrics.tasksProcessed;

      await cloAgent.processLegalTask(testTask);

      const updatedHealth = cloAgent.getHealthStatus();
      expect(updatedHealth.performanceMetrics.tasksProcessed).toBe(initialTaskCount + 1);
      expect(updatedHealth.performanceMetrics.successRate).toBeGreaterThan(0);
    });

    test('should include compliance analysis when required', async () => {
      const result = await cloAgent.processLegalTask(testTask);
      
      expect(result.complianceAnalysis).toBeDefined();
      expect(result.complianceAnalysis.taskId).toBe(testTask.id);
      expect(result.complianceAnalysis.auditTrail.length).toBeGreaterThan(0);
    });

    test('should include governance decision', async () => {
      const result = await cloAgent.processLegalTask(testTask);
      
      expect(result.governanceDecision).toBeDefined();
      expect(result.governanceDecision.taskId).toBe(testTask.id);
      expect(result.governanceDecision.decisionId).toBeDefined();
    });

    test('should handle task validation errors', async () => {
      const invalidTask = { ...testTask, id: '' }; // Invalid task without ID
      
      await expect(cloAgent.processLegalTask(invalidTask as LegalTask))
        .rejects.toThrow('Task ID is required');
    });
  });

  describe('Performance and Configuration', () => {
    test('should provide performance metrics', () => {
      const metrics = cloAgent.getPerformanceMetrics();
      
      expect(metrics.tasksProcessed).toBeDefined();
      expect(metrics.successRate).toBeDefined();
      expect(metrics.averageResponseTime).toBeDefined();
      expect(metrics.memoryUsage).toBeGreaterThan(0);
    });

    test('should allow configuration updates', () => {
      const originalConfig = cloAgent.getConfiguration();
      const updates = {
        performance: {
          ...originalConfig.performance,
          maxConcurrentTasks: 20
        }
      };

      cloAgent.updateConfiguration(updates);
      const updatedConfig = cloAgent.getConfiguration();
      
      expect(updatedConfig.performance.maxConcurrentTasks).toBe(20);
    });

    test('should maintain agent identity through configuration updates', () => {
      const originalAgentId = cloAgent.getConfiguration().agentId;
      
      cloAgent.updateConfiguration({ 
        performance: { maxConcurrentTasks: 15, responseTimeTarget: 3000, throughputTarget: 150, cachingEnabled: false, circuitBreakerThreshold: 3 }
      });
      
      expect(cloAgent.getConfiguration().agentId).toBe(originalAgentId);
    });
  });

  describe('Shutdown and Cleanup', () => {
    test('should shutdown gracefully', async () => {
      await expect(cloAgent.shutdown()).resolves.not.toThrow();
    });

    test('should cleanup resources during shutdown', async () => {
      // Process a task to initialize components
      const testTask: LegalTask = {
        id: 'shutdown-test-task',
        type: 'compliance_assessment' as LegalTaskType,
        description: 'Test task for shutdown',
        priority: 'low' as TaskPriority,
        domain: 'data_privacy' as LegalDomain,
        requiredCompliance: [],
        escalationRequired: false,
        metadata: {
          submittedBy: 'test',
          submissionDate: new Date(),
          businessImpact: 'minimal' as BusinessImpact,
          stakeholders: [],
          relatedDocuments: [],
          confidentialityLevel: 'internal' as ConfidentialityLevel
        }
      };

      await cloAgent.processLegalTask(testTask);
      
      // Shutdown should complete without errors
      await expect(cloAgent.shutdown()).resolves.not.toThrow();
    });
  });
});