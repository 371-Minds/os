/**
 * Router Integration Tests for CFO Agent
 * 
 * Validates the router integration layer functionality including
 * capability registration, task routing, performance monitoring,
 * and health status reporting.
 */

import { describe, it, expect, beforeEach } from 'bun:test';
import { CFOAgent } from './index.js';
import { CFOAgentRouterIntegration, createCFORouterIntegration } from './router-integration.js';

// Mock router types for testing
interface MockRoutingTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
  domain_hints?: string[];
  strategic_importance: boolean;
  submitted_at: Date;
  submitted_by: string;
}

describe('CFO Agent Router Integration', () => {
  let cfoAgent: CFOAgent;
  let routerIntegration: CFOAgentRouterIntegration;

  beforeEach(() => {
    cfoAgent = new CFOAgent();
    routerIntegration = createCFORouterIntegration(cfoAgent);
  });

  describe('Capability Registration', () => {
    it('should register CFO agent capabilities correctly', () => {
      const capabilities = routerIntegration.registerCapabilities();
      
      expect(capabilities.agent_id).toBe('cfo-maya');
      expect(capabilities.agent_name).toBe('Maya (CFO)');
      expect(capabilities.domain).toBe('financial');
      expect(capabilities.expertise_areas).toContain('Budget Analysis & Optimization');
      expect(capabilities.expertise_areas).toContain('ROI Assessment & Investment Analysis');
      expect(capabilities.max_concurrent_tasks).toBeGreaterThan(0);
      expect(capabilities.availability_status).toBeDefined();
      expect(capabilities.performance_metrics).toBeDefined();
    });

    it('should have comprehensive expertise areas', () => {
      const capabilities = routerIntegration.registerCapabilities();
      
      expect(capabilities.expertise_areas.length).toBeGreaterThanOrEqual(8);
      expect(capabilities.expertise_areas).toContain('Cost Optimization & Savings Identification');
      expect(capabilities.expertise_areas).toContain('Financial Reporting & Analytics');
      expect(capabilities.expertise_areas).toContain('Revenue Forecasting & Projections');
    });

    it('should report accurate performance metrics', () => {
      const metrics = routerIntegration.reportPerformanceMetrics();
      
      expect(metrics.total_tasks_completed).toBeGreaterThanOrEqual(0);
      expect(metrics.success_rate).toBeBetween(0, 1);
      expect(metrics.average_completion_time).toBeGreaterThanOrEqual(0);
      expect(metrics.quality_score).toBeBetween(0, 1);
      expect(metrics.domain_specific_scores).toBeDefined();
      expect(metrics.domain_specific_scores.budget_analysis).toBeGreaterThan(0);
    });
  });

  describe('Task Routing and Handling', () => {
    const createMockRoutingTask = (overrides: Partial<MockRoutingTask> = {}): MockRoutingTask => ({
      id: 'router-test-' + Date.now(),
      title: 'Budget Analysis Task',
      description: 'Analyze quarterly budget performance with variance identification',
      priority: 'medium',
      domain_hints: ['financial'],
      strategic_importance: false,
      submitted_at: new Date(),
      submitted_by: 'router-system',
      ...overrides
    });

    it('should handle routed budget analysis tasks', async () => {
      const routingTask = createMockRoutingTask({
        title: 'Q4 Budget Variance Analysis',
        description: 'Budget: $200,000, Actual: $195,000, analyze variance and recommend optimizations',
        priority: 'high'
      });

      const result = await routerIntegration.handleRoutedTask(routingTask as any);
      
      expect(result.taskId).toBe(routingTask.id);
      expect(result.status).toBe('completed');
      expect(result.category).toBe('budget_analysis');
      expect(result.metadata.confidence).toBeGreaterThan(80);
    });

    it('should handle routed cost optimization tasks', async () => {
      const routingTask = createMockRoutingTask({
        title: 'Cost Reduction Initiative',
        description: 'Identify cost savings opportunities in operational expenses totaling $500,000',
        priority: 'medium',
        strategic_importance: true
      });

      const result = await routerIntegration.handleRoutedTask(routingTask as any);
      
      expect(result.taskId).toBe(routingTask.id);
      expect(result.status).toBe('completed');
      expect(result.category).toBe('cost_optimization');
    });

    it('should handle routed ROI assessment tasks', async () => {
      const routingTask = createMockRoutingTask({
        title: 'Technology Investment ROI',
        description: 'Evaluate ROI for $150,000 technology infrastructure investment over 3 years',
        priority: 'high'
      });

      const result = await routerIntegration.handleRoutedTask(routingTask as any);
      
      expect(result.taskId).toBe(routingTask.id);
      expect(result.status).toBe('completed');
      expect(result.category).toBe('roi_assessment');
    });

    it('should update workload during task processing', async () => {
      const initialWorkload = routerIntegration.getWorkloadInfo();
      expect(initialWorkload.current).toBe(0);
      
      const routingTask = createMockRoutingTask();
      
      // Process task (this will temporarily increase workload)
      const result = await routerIntegration.handleRoutedTask(routingTask as any);
      
      // After completion, workload should be back to 0
      const finalWorkload = routerIntegration.getWorkloadInfo();
      expect(finalWorkload.current).toBe(0);
      expect(result.status).toBe('completed');
    });
  });

  describe('Capability Assessment', () => {
    it('should accurately assess financial task capability', () => {
      const financialTask = {
        id: 'test-financial',
        title: 'Budget Variance Analysis',
        description: 'Analyze budget performance and identify cost optimization opportunities',
        priority: 'medium' as any,
        domain_hints: ['financial'],
        strategic_importance: false,
        submitted_at: new Date(),
        submitted_by: 'test'
      };

      const assessment = routerIntegration.canHandle(financialTask);
      
      expect(assessment.capable).toBe(true);
      expect(assessment.confidence).toBeGreaterThan(0.5);
      expect(assessment.reasoning).toContain('keyword matches');
    });

    it('should reject non-financial tasks with low confidence', () => {
      const nonFinancialTask = {
        id: 'test-technical',
        title: 'Software Development Task',
        description: 'Implement user authentication system with multi-factor authentication',
        priority: 'medium' as any,
        domain_hints: ['technical'],
        strategic_importance: false,
        submitted_at: new Date(),
        submitted_by: 'test'
      };

      const assessment = routerIntegration.canHandle(nonFinancialTask);
      
      expect(assessment.capable).toBe(false);
      expect(assessment.confidence).toBeLessThan(0.5);
    });

    it('should handle mixed-domain tasks with appropriate confidence', () => {
      const mixedTask = {
        id: 'test-mixed',
        title: 'Technology Investment Analysis',
        description: 'Evaluate financial ROI for new software development tools and infrastructure',
        priority: 'high' as any,
        domain_hints: ['financial', 'technical'],
        strategic_importance: true,
        submitted_at: new Date(),
        submitted_by: 'test'
      };

      const assessment = routerIntegration.canHandle(mixedTask);
      
      expect(assessment.capable).toBe(true);
      expect(assessment.confidence).toBeGreaterThan(0.6);
      expect(assessment.reasoning).toContain('financial');
    });
  });

  describe('Availability and Workload Management', () => {
    it('should start with available status', () => {
      const workload = routerIntegration.getWorkloadInfo();
      
      expect(workload.current).toBe(0);
      expect(workload.availability).toBe('available');
      expect(workload.utilizationPercentage).toBe(0);
    });

    it('should update availability status', () => {
      routerIntegration.updateAvailabilityStatus('busy');
      
      const workload = routerIntegration.getWorkloadInfo();
      expect(workload.availability).toBe('busy');
    });

    it('should provide workload information', () => {
      const workload = routerIntegration.getWorkloadInfo();
      
      expect(workload.current).toBeGreaterThanOrEqual(0);
      expect(workload.maximum).toBeGreaterThan(0);
      expect(workload.utilizationPercentage).toBeBetween(0, 100);
      expect(['available', 'limited', 'busy', 'unavailable']).toContain(workload.availability);
    });
  });

  describe('Escalation Handling', () => {
    it('should handle escalation requests appropriately', () => {
      const routingTask = {
        id: 'escalation-test',
        title: 'Complex Financial Decision',
        description: 'High-risk investment requiring executive approval',
        priority: 'critical' as any,
        strategic_importance: true,
        submitted_at: new Date(),
        submitted_by: 'test'
      };

      const escalation = routerIntegration.handleEscalation(routingTask, 'high-risk financial decision');
      
      expect(escalation.escalated).toBe(true);
      expect(escalation.escalationTarget).toBeDefined();
      expect(escalation.notes).toContain('CFO Agent (Maya) escalated');
    });

    it('should route legal escalations to CLO', () => {
      const routingTask = {
        id: 'legal-test',
        title: 'Compliance Review',
        description: 'Financial compliance assessment',
        priority: 'high' as any,
        strategic_importance: false,
        submitted_at: new Date(),
        submitted_by: 'test'
      };

      const escalation = routerIntegration.handleEscalation(routingTask, 'legal compliance review required');
      
      expect(escalation.escalationTarget).toBe('clo-sage');
    });

    it('should route strategic escalations to CEO', () => {
      const routingTask = {
        id: 'strategic-test',
        title: 'Strategic Investment',
        description: 'Major strategic investment decision',
        priority: 'critical' as any,
        strategic_importance: true,
        submitted_at: new Date(),
        submitted_by: 'test'
      };

      const escalation = routerIntegration.handleEscalation(routingTask, 'strategic decision required');
      
      expect(escalation.escalationTarget).toBe('ceo-mimi');
    });
  });

  describe('Health Status and Monitoring', () => {
    it('should provide health status for router monitoring', async () => {
      const healthStatus = await routerIntegration.getHealthStatus();
      
      expect(healthStatus.status).toMatch(/healthy|degraded|unhealthy/);
      expect(healthStatus.checks).toBeDefined();
      expect(healthStatus.overall).toBeDefined();
      expect(healthStatus.timestamp).toBeInstanceOf(Date);
    });

    it('should track performance metrics over time', async () => {
      // Process a few tasks to generate metrics
      const tasks = [
        {
          id: 'metrics-1',
          title: 'Budget Analysis',
          description: 'Analyze budget performance',
          priority: 'medium' as any,
          domain_hints: ['financial'],
          strategic_importance: false,
          submitted_at: new Date(),
          submitted_by: 'test'
        },
        {
          id: 'metrics-2',
          title: 'Cost Optimization',
          description: 'Identify cost savings',
          priority: 'high' as any,
          strategic_importance: true,
          submitted_at: new Date(),
          submitted_by: 'test'
        }
      ];

      for (const task of tasks) {
        await routerIntegration.handleRoutedTask(task as any);
      }

      const metrics = routerIntegration.reportPerformanceMetrics();
      
      expect(metrics.total_tasks_completed).toBeGreaterThanOrEqual(0);
      expect(metrics.success_rate).toBeGreaterThan(0);
      expect(metrics.average_completion_time).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Integration with Main CFO Agent', () => {
    it('should integrate router functionality with main agent', async () => {
      const routerIntegration = cfoAgent.getRouterIntegration();
      
      expect(routerIntegration).toBeDefined();
      expect(routerIntegration).toBeInstanceOf(CFOAgentRouterIntegration);
    });

    it('should support router registration', async () => {
      const registrationResult = await cfoAgent.registerWithRouter();
      
      expect(registrationResult).toBe(true);
    });

    it('should maintain consistency between agent and router capabilities', () => {
      const agentCapabilities = cfoAgent.getCapabilities();
      const routerCapabilities = cfoAgent.getRouterIntegration().registerCapabilities();
      
      // Both should indicate financial domain expertise
      expect(routerCapabilities.domain).toBe('financial');
      expect(agentCapabilities.financial_domains).toBeDefined();
      expect(agentCapabilities.financial_domains.length).toBeGreaterThan(0);
    });
  });
});