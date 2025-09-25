/**
 * CFO Agent Test Suite
 * 
 * Comprehensive test coverage for the CFO Agent implementation,
 * including unit tests for core components and integration tests
 * for end-to-end financial analysis workflows.
 */

import { describe, it, expect, beforeEach } from 'bun:test';
import { CFOAgent } from './index.js';
import { FinancialTaskProcessor } from './financial-task-processor.js';
import { FinancialAnalyzer } from './financial-analyzer.js';
import { BudgetAnalysisEngine } from './budget-analysis-engine.js';
import type { FinancialTask } from './types.js';

describe('CFO Agent (Maya) Implementation', () => {
  let cfoAgent: CFOAgent;
  let taskProcessor: FinancialTaskProcessor;
  let financialAnalyzer: FinancialAnalyzer;
  let budgetEngine: BudgetAnalysisEngine;

  beforeEach(() => {
    cfoAgent = new CFOAgent();
    taskProcessor = new FinancialTaskProcessor();
    financialAnalyzer = new FinancialAnalyzer();
    budgetEngine = new BudgetAnalysisEngine();
  });

  describe('Agent Initialization', () => {
    it('should initialize CFO agent successfully', () => {
      expect(cfoAgent).toBeDefined();
      expect(cfoAgent.getStatus().name).toBe('Maya (CFO)');
      expect(cfoAgent.getStatus().type).toBe('FINANCIAL_LEADERSHIP');
      expect(cfoAgent.getStatus().status).toBe('operational');
    });

    it('should load agent definition from YAML file', () => {
      const status = cfoAgent.getStatus();
      expect(status.capabilities).toContain('Budget Analysis & Optimization');
      expect(status.capabilities).toContain('Cost Optimization & Savings Identification');
      expect(status.capabilities).toContain('ROI Assessment & Investment Analysis');
    });

    it('should initialize all core components', async () => {
      const healthCheck = await cfoAgent.healthCheck();
      expect(healthCheck.overall).toBe(true);
      expect(healthCheck.status).toBe('healthy');
    });
  });

  describe('Financial Task Processing', () => {
    const createTestTask = (category: string, description: string): FinancialTask => ({
      id: `test-${Date.now()}`,
      title: `Test ${category} Task`,
      description,
      category: category as any,
      priority: 'medium',
      requestedBy: 'test-user',
      createdAt: new Date()
    });

    it('should process budget analysis tasks', async () => {
      const task = createTestTask('budget_analysis', 
        'Analyze Q4 budget performance with variance identification and recommendations'
      );

      const result = await cfoAgent.processTask(task);
      
      expect(result.status).toBe('completed');
      expect(result.category).toBe('budget_analysis');
      expect(result.analysis.confidence).toBeGreaterThan(0);
      expect(result.metadata.processingTime).toBeGreaterThan(0);
    });

    it('should process cost optimization tasks', async () => {
      const task = createTestTask('cost_optimization',
        'Identify cost savings opportunities across operations with $500,000 budget'
      );

      const result = await cfoAgent.processTask(task);
      
      expect(result.status).toBe('completed');
      expect(result.category).toBe('cost_optimization');
      expect(result.result).toBeDefined();
    });

    it('should process ROI assessment tasks', async () => {
      const task = createTestTask('roi_assessment',
        'Evaluate ROI for $100,000 technology investment with 3-year horizon'
      );

      const result = await cfoAgent.processTask(task);
      
      expect(result.status).toBe('completed');
      expect(result.category).toBe('roi_assessment');
      expect(result.result).toBeDefined();
    });

    it('should validate task input requirements', async () => {
      const invalidTask = {
        id: '',
        title: '',
        description: '',
        category: 'invalid_category',
        priority: 'invalid_priority',
        requestedBy: '',
        createdAt: new Date()
      } as any;

      await expect(cfoAgent.processTask(invalidTask)).rejects.toThrow();
    });
  });

  describe('Financial Task Processor', () => {
    it('should categorize financial tasks accurately', async () => {
      const budgetTask = {
        id: 'test-1',
        title: 'Budget Analysis',
        description: 'Analyze quarterly budget variance and spending patterns',
        category: 'budget_analysis' as any,
        priority: 'medium' as any,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const analysis = await taskProcessor.generateAnalysis(budgetTask);
      
      expect(analysis.category).toBe('budget_analysis');
      expect(analysis.confidence).toBeGreaterThan(70);
      expect(analysis.keywords.length).toBeGreaterThan(0);
    });

    it('should assess task complexity correctly', async () => {
      const complexTask = {
        id: 'test-2',
        title: 'Enterprise-wide cost optimization',
        description: 'Comprehensive multi-year strategic cost optimization across all business units with regulatory compliance requirements',
        category: 'cost_optimization' as any,
        priority: 'critical' as any,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const analysis = await taskProcessor.generateAnalysis(complexTask);
      
      expect(analysis.complexity.level).toBe('high');
      expect(analysis.riskAssessment.overallRisk).toBe('high');
    });

    it('should validate processor functionality', async () => {
      const isValid = await taskProcessor.validate();
      expect(isValid).toBe(true);
    });
  });

  describe('Financial Analyzer', () => {
    it('should generate cost optimization analysis', async () => {
      const task = {
        id: 'test-cost',
        title: 'Cost Optimization',
        description: 'Optimize operational costs for $200,000 annual budget',
        category: 'cost_optimization' as any,
        priority: 'medium' as any,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const result = await financialAnalyzer.optimizeCosts(task);
      
      expect(result.taskId).toBe(task.id);
      expect(result.optimizationOpportunities.length).toBeGreaterThan(0);
      expect(result.expectedSavings).toBeDefined();
      expect(result.implementationPlan).toBeDefined();
    });

    it('should perform ROI assessment', async () => {
      const task = {
        id: 'test-roi',
        title: 'ROI Assessment',
        description: 'Assess ROI for $75,000 marketing investment',
        category: 'roi_assessment' as any,
        priority: 'medium' as any,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const result = await financialAnalyzer.assessROI(task);
      
      expect(result.taskId).toBe(task.id);
      expect(result.financialMetrics.roi).toBeDefined();
      expect(result.financialMetrics.npv).toBeDefined();
      expect(result.recommendation.decision).toMatch(/approve|reject|modify|defer/);
    });

    it('should validate analyzer functionality', async () => {
      const isValid = await financialAnalyzer.validate();
      expect(isValid).toBe(true);
    });
  });

  describe('Budget Analysis Engine', () => {
    it('should analyze budget performance', async () => {
      const task = {
        id: 'test-budget',
        title: 'Budget Analysis',
        description: 'Budget: $150,000, Actual: $145,000, Period: Q4-2024',
        category: 'budget_analysis' as any,
        priority: 'medium' as any,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const result = await budgetEngine.analyzeBudget(task);
      
      expect(result.taskId).toBe(task.id);
      expect(result.budgetPerformance.variancePercentage).toBeDefined();
      expect(result.varianceAnalysis.positiveVariances).toBeDefined();
      expect(result.varianceAnalysis.negativeVariances).toBeDefined();
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should identify significant variances', async () => {
      const task = {
        id: 'test-variance',
        title: 'High Variance Analysis',
        description: 'Budget: $100,000, Actual: $120,000, Period: Q4-2024',
        category: 'budget_analysis' as any,
        priority: 'high' as any,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const result = await budgetEngine.analyzeBudget(task);
      
      expect(result.budgetPerformance.performanceRating).toMatch(/concerning|critical/);
      expect(result.varianceAnalysis.significantVariances.length).toBeGreaterThan(0);
    });

    it('should validate budget engine functionality', async () => {
      const isValid = await budgetEngine.validate();
      expect(isValid).toBe(true);
    });
  });

  describe('Performance and Error Handling', () => {
    it('should handle processing within performance targets', async () => {
      const task = {
        id: 'perf-test',
        title: 'Performance Test',
        description: 'Simple budget analysis for performance testing',
        category: 'budget_analysis' as any,
        priority: 'low' as any,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const startTime = Date.now();
      const result = await cfoAgent.processTask(task);
      const processingTime = Date.now() - startTime;
      
      // Should complete within 2 seconds (2000ms)
      expect(processingTime).toBeLessThan(2000);
      expect(result.metadata.processingTime).toBeLessThan(2000);
    });

    it('should handle invalid task categories gracefully', async () => {
      const invalidTask = {
        id: 'invalid-test',
        title: 'Invalid Task',
        description: 'Task with invalid category',
        category: 'invalid_category' as any,
        priority: 'medium' as any,
        requestedBy: 'test',
        createdAt: new Date()
      };

      await expect(cfoAgent.processTask(invalidTask)).rejects.toThrow();
    });

    it('should maintain high confidence in analysis', async () => {
      const task = {
        id: 'confidence-test',
        title: 'High Confidence Task',
        description: 'Detailed budget analysis with comprehensive data for Q4 2024 budget performance evaluation',
        category: 'budget_analysis' as any,
        priority: 'medium' as any,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const result = await cfoAgent.processTask(task);
      
      expect(result.analysis.confidence).toBeGreaterThan(80);
      expect(result.metadata.confidence).toBeGreaterThan(80);
    });
  });

  describe('Agent Capabilities and Status', () => {
    it('should provide comprehensive capability information', () => {
      const capabilities = cfoAgent.getCapabilities();
      
      expect(capabilities.financial_domains).toContain('Budget Management & Variance Analysis');
      expect(capabilities.decision_types).toContain('Budget Allocation Recommendations');
      expect(capabilities.financial_metrics).toContain('ROI, NPV, IRR Calculations');
      expect(capabilities.performance_targets.response_time_ms).toBe(1000);
    });

    it('should track performance metrics accurately', async () => {
      const task = {
        id: 'metrics-test',
        title: 'Metrics Test',
        description: 'Test task for performance metrics tracking',
        category: 'budget_analysis' as any,
        priority: 'medium' as any,
        requestedBy: 'test',
        createdAt: new Date()
      };

      await cfoAgent.processTask(task);
      
      const status = cfoAgent.getStatus();
      expect(status.performance.tasksProcessed).toBeGreaterThan(0);
      expect(status.performance.averageResponseTime).toBeGreaterThan(0);
      expect(status.performance.successRate).toBeGreaterThan(0);
    });

    it('should provide health check information', async () => {
      const healthCheck = await cfoAgent.healthCheck();
      
      expect(healthCheck.status).toMatch(/healthy|degraded|unhealthy/);
      expect(healthCheck.checks.length).toBeGreaterThan(0);
      expect(healthCheck.timestamp).toBeInstanceOf(Date);
      
      // Verify individual component checks
      const componentNames = healthCheck.checks.map(check => check.component);
      expect(componentNames).toContain('agent_definition');
      expect(componentNames).toContain('task_processor');
      expect(componentNames).toContain('financial_analyzer');
      expect(componentNames).toContain('budget_engine');
    });
  });

  describe('Integration Tests', () => {
    it('should handle complex multi-step financial analysis', async () => {
      const budgetTask = {
        id: 'integration-1',
        title: 'Comprehensive Financial Analysis',
        description: 'Budget: $500,000, Actual: $485,000, Analyze variance and identify cost optimization opportunities',
        category: 'budget_analysis' as any,
        priority: 'high' as any,
        requestedBy: 'cfo',
        createdAt: new Date()
      };

      const result = await cfoAgent.processTask(budgetTask);
      
      expect(result.status).toBe('completed');
      expect(result.analysis.category).toBe('budget_analysis');
      expect(result.result).toBeDefined();
      
      // Verify budget analysis specific results
      const budgetResult = result.result as any;
      expect(budgetResult.budgetPerformance).toBeDefined();
      expect(budgetResult.varianceAnalysis).toBeDefined();
      expect(budgetResult.recommendations).toBeDefined();
    });

    it('should escalate high-risk financial decisions', async () => {
      const criticalTask = {
        id: 'escalation-test',
        title: 'Critical Financial Decision',
        description: 'High-risk investment evaluation with uncertain market conditions and significant financial impact',
        category: 'roi_assessment' as any,
        priority: 'critical' as any,
        requestedBy: 'ceo',
        createdAt: new Date()
      };

      const result = await cfoAgent.processTask(criticalTask);
      
      // Should escalate due to critical priority and high risk
      expect(result.metadata.escalated).toBe(true);
    });
  });
});