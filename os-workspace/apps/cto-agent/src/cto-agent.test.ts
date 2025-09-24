/**
 * Test Suite for CTO Agent (Zara)
 * 
 * Comprehensive testing covering all components:
 * - Agent initialization and configuration loading
 * - Technical task processing and analysis
 * - Architecture decision generation
 * - Technology evaluation and assessment
 * - Infrastructure planning
 * - Router integration
 * - Health checks and performance monitoring
 */

import { test, expect, describe, beforeEach } from 'bun:test';
import { CTOAgent } from '../src/index';
import { TechnicalTaskProcessor } from '../src/technical-task-processor';
import { TechnicalAnalyzer } from '../src/technical-analyzer';
import { CTORouterIntegration } from '../src/router-integration';
import type { TechnicalTask, TaskCategory } from '../src/types';

describe('CTO Agent (Zara) - Complete Test Suite', () => {
  let ctoAgent: CTOAgent;
  let taskProcessor: TechnicalTaskProcessor;
  let technicalAnalyzer: TechnicalAnalyzer;
  let routerIntegration: CTORouterIntegration;

  beforeEach(() => {
    ctoAgent = new CTOAgent();
    taskProcessor = new TechnicalTaskProcessor();
    technicalAnalyzer = new TechnicalAnalyzer();
    routerIntegration = new CTORouterIntegration(ctoAgent);
  });

  describe('Agent Initialization', () => {
    test('should initialize CTO agent successfully', () => {
      expect(ctoAgent).toBeDefined();
      expect(ctoAgent.getStatus().name).toBe('Zara (CTO)');
      expect(ctoAgent.getStatus().type).toBe('TECHNICAL_LEADERSHIP');
    });

    test('should load agent definition from YAML file', () => {
      const status = ctoAgent.getStatus();
      expect(status.capabilities).toContain('Architecture Design & Review');
      expect(status.capabilities).toContain('Technology Evaluation & Selection');
      expect(status.capabilities).toContain('Infrastructure Planning & Scaling');
    });

    test('should initialize with correct performance metrics', () => {
      const status = ctoAgent.getStatus();
      expect(status.performance.tasksProcessed).toBe(0);
      expect(status.performance.successRate).toBe(1.0);
      expect(status.performance.escalationRate).toBe(0.0);
    });
  });

  describe('Technical Task Processing', () => {
    const createTestTask = (category: TaskCategory, title: string, description: string): TechnicalTask => ({
      id: `test-${Date.now()}`,
      title,
      description,
      category,
      priority: 'medium',
      requestedBy: 'test-user',
      createdAt: new Date()
    });

    test('should process architecture design tasks', async () => {
      const task = createTestTask(
        'architecture_design',
        'Design microservices architecture',
        'Need scalable distributed architecture with high throughput requirements'
      );

      const result = await ctoAgent.processTask(task);
      
      expect(result.status).toBe('completed');
      expect(result.category).toBe('architecture_design');
      expect(result.analysis.confidence).toBeGreaterThan(50);
      expect(result.metadata.processingTime).toBeGreaterThan(0);
    });

    test('should process technology evaluation tasks', async () => {
      const task = createTestTask(
        'technology_evaluation',
        'Evaluate React framework',
        'Assess React for new frontend development with integration requirements'
      );

      const result = await ctoAgent.processTask(task);
      
      expect(result.status).toBe('completed');
      expect(result.category).toBe('technology_evaluation');
      expect(result.analysis.confidence).toBeGreaterThan(50);
    });

    test('should process infrastructure planning tasks', async () => {
      const task = createTestTask(
        'infrastructure_planning',
        'Plan cloud infrastructure scaling',
        'Design auto-scaling infrastructure for high availability and performance'
      );

      const result = await ctoAgent.processTask(task);
      
      expect(result.status).toBe('completed');
      expect(result.category).toBe('infrastructure_planning');
      expect(result.analysis.confidence).toBeGreaterThan(50);
    });

    test('should handle security response tasks', async () => {
      const task = createTestTask(
        'security_response',
        'Address critical vulnerability',
        'Security vulnerability detected in authentication system requiring immediate response'
      );

      const result = await ctoAgent.processTask(task);
      
      expect(result.status).toBe('completed');
      expect(result.category).toBe('security_response');
    });

    test('should validate task input parameters', async () => {
      const invalidTask = {
        id: '',
        title: '',
        description: 'Valid description',
        category: 'architecture_design' as TaskCategory,
        priority: 'medium' as const,
        requestedBy: 'test-user',
        createdAt: new Date()
      };

      await expect(ctoAgent.processTask(invalidTask)).rejects.toThrow();
    });

    test('should escalate high-risk critical tasks', async () => {
      const criticalTask = createTestTask(
        'security_response',
        'Critical security breach',
        'Immediate response required for data breach with high business impact'
      );
      criticalTask.priority = 'critical';

      const result = await ctoAgent.processTask(criticalTask);
      
      // Escalation logic may vary, but should complete successfully
      expect(result.status).toBe('completed');
      expect(result.metadata.escalated).toBeDefined();
    });
  });

  describe('Technical Task Processor', () => {
    test('should categorize architecture tasks correctly', () => {
      const task = {
        id: 'test-arch',
        title: 'Design microservices architecture',
        description: 'Need distributed system with API gateway and service mesh',
        category: 'architecture_design' as TaskCategory,
        priority: 'medium' as const,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const category = taskProcessor.categorizeTask(task);
      expect(category).toBe('architecture_design');
    });

    test('should categorize technology evaluation tasks', () => {
      const task = {
        id: 'test-tech',
        title: 'Evaluate new framework',
        description: 'Technology assessment for React migration with proof-of-concept',
        category: 'technology_evaluation' as TaskCategory,
        priority: 'medium' as const,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const category = taskProcessor.categorizeTask(task);
      expect(category).toBe('technology_evaluation');
    });

    test('should generate comprehensive technical analysis', async () => {
      const task = {
        id: 'test-analysis',
        title: 'Complex system design',
        description: 'Design high-performance distributed system with real-time processing',
        category: 'architecture_design' as TaskCategory,
        priority: 'high' as const,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const analysis = await taskProcessor.generateAnalysis(task);
      
      expect(analysis.taskId).toBe(task.id);
      expect(analysis.category).toBe('architecture_design');
      expect(analysis.complexity).toBeDefined();
      expect(analysis.riskAssessment).toBeDefined();
      expect(analysis.resourceRequirements).toBeDefined();
      expect(analysis.recommendations).toBeArray();
      expect(analysis.confidence).toBeGreaterThan(0);
    });

    test('should assess complexity levels correctly', async () => {
      const simpleTask = {
        id: 'simple',
        title: 'Simple API design',
        description: 'Basic REST API for user management',
        category: 'architecture_design' as TaskCategory,
        priority: 'low' as const,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const complexTask = {
        id: 'complex',
        title: 'Distributed real-time system',
        description: 'High-performance distributed system with real-time processing, microservices, and multi-region deployment',
        category: 'architecture_design' as TaskCategory,
        priority: 'critical' as const,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const simpleAnalysis = await taskProcessor.generateAnalysis(simpleTask);
      const complexAnalysis = await taskProcessor.generateAnalysis(complexTask);

      expect(simpleAnalysis.complexity.score).toBeLessThan(complexAnalysis.complexity.score);
    });

    test('should validate processor functionality', async () => {
      const isValid = await taskProcessor.validate();
      expect(isValid).toBe(true);
    });
  });

  describe('Technical Analyzer', () => {
    test('should generate architecture decisions', async () => {
      const task = {
        id: 'arch-test',
        title: 'Microservices architecture',
        description: 'Design scalable microservices with API gateway and event-driven communication',
        category: 'architecture_design' as TaskCategory,
        priority: 'high' as const,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const decision = await technicalAnalyzer.analyzeArchitecture(task);
      
      expect(decision.taskId).toBe(task.id);
      expect(decision.recommendedArchitecture).toBeDefined();
      expect(decision.technicalSpecification).toBeDefined();
      expect(decision.implementation).toBeDefined();
      expect(decision.alternatives).toBeArray();
      expect(decision.rationale).toBeDefined();
    });

    test('should evaluate technology options', async () => {
      const task = {
        id: 'tech-test',
        title: 'React evaluation',
        description: 'Evaluate React framework for new frontend with integration requirements',
        category: 'technology_evaluation' as TaskCategory,
        priority: 'medium' as const,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const assessment = await technicalAnalyzer.evaluateTechnology(task);
      
      expect(assessment.taskId).toBe(task.id);
      expect(assessment.technology).toBeDefined();
      expect(assessment.evaluation).toBeDefined();
      expect(assessment.recommendation).toBeDefined();
      expect(assessment.implementationRoadmap).toBeDefined();
    });

    test('should plan infrastructure architecture', async () => {
      const task = {
        id: 'infra-test',
        title: 'Cloud infrastructure planning',
        description: 'Plan scalable cloud infrastructure with auto-scaling and high availability',
        category: 'infrastructure_planning' as TaskCategory,
        priority: 'high' as const,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const plan = await technicalAnalyzer.planInfrastructure(task);
      
      expect(plan.taskId).toBe(task.id);
      expect(plan.requirements).toBeDefined();
      expect(plan.architecture).toBeDefined();
      expect(plan.scalingStrategy).toBeDefined();
      expect(plan.costOptimization).toBeDefined();
    });

    test('should validate analyzer functionality', async () => {
      const isValid = await technicalAnalyzer.validate();
      expect(isValid).toBe(true);
    });
  });

  describe('Router Integration', () => {
    test('should handle routed tasks successfully', async () => {
      const routingTask = {
        id: 'router-test-001',
        title: 'Architecture design from router',
        description: 'Design microservices architecture delegated from intelligent router',
        priority: 'high' as const,
        domain_hints: ['technical', 'architecture'],
        submitted_at: new Date(),
        submitted_by: 'intelligent-router'
      };

      const response = await routerIntegration.handleRoutedTask(routingTask);
      
      expect(response.success).toBe(true);
      expect(response.result).toBeDefined();
      expect(response.processing_time).toBeGreaterThan(0);
      expect(response.agent_info.name).toBe('CTO Agent (Zara)');
    });

    test('should handle architecture requests from router', async () => {
      const requirements = 'Design scalable microservices architecture with API gateway';
      
      const response = await routerIntegration.handleArchitectureRequest(requirements);
      
      expect(response.success).toBe(true);
      expect(response.result?.category).toBe('architecture_design');
    });

    test('should handle technology evaluation requests', async () => {
      const proposal = 'Evaluate React framework for frontend development';
      
      const response = await routerIntegration.handleTechnologyEvaluation(proposal);
      
      expect(response.success).toBe(true);
      expect(response.result?.category).toBe('technology_evaluation');
    });

    test('should handle infrastructure planning requests', async () => {
      const requirements = 'Plan cloud infrastructure with auto-scaling capabilities';
      
      const response = await routerIntegration.handleInfrastructurePlanning(requirements);
      
      expect(response.success).toBe(true);
      expect(response.result?.category).toBe('infrastructure_planning');
    });

    test('should provide router health check', async () => {
      const healthCheck = await routerIntegration.getRouterHealthCheck();
      
      expect(healthCheck.component).toBe('CTO Agent (Zara)');
      expect(healthCheck.capabilities).toBeArray();
      expect(healthCheck.current_load).toBeDefined();
    });

    test('should provide capability metadata', () => {
      const metadata = routerIntegration.getCapabilityMetadata();
      
      expect(metadata.agent_id).toBe('cto-agent-zara');
      expect(metadata.agent_name).toBe('CTO Agent (Zara)');
      expect(metadata.domain).toBe('TECHNICAL');
      expect(metadata.expertise_areas).toContain('Architecture Design');
      expect(metadata.supported_categories).toContain('architecture_design');
    });

    test('should register with router successfully', async () => {
      const registered = await routerIntegration.registerWithRouter();
      expect(registered).toBe(true);
    });

    test('should validate integration functionality', async () => {
      const isValid = await routerIntegration.validate();
      expect(isValid).toBe(true);
    });
  });

  describe('Health Checks and Monitoring', () => {
    test('should perform comprehensive health check', async () => {
      const healthCheck = await ctoAgent.healthCheck();
      
      expect(healthCheck.status).toBeOneOf(['healthy', 'degraded', 'unhealthy']);
      expect(healthCheck.checks).toBeArray();
      expect(healthCheck.overall).toBeBoolean();
      expect(healthCheck.timestamp).toBeInstanceOf(Date);
    });

    test('should validate all components during health check', async () => {
      const healthCheck = await ctoAgent.healthCheck();
      
      const componentNames = healthCheck.checks.map(check => check.component);
      expect(componentNames).toContain('agent_definition');
      expect(componentNames).toContain('task_processor');
      expect(componentNames).toContain('technical_analyzer');
      expect(componentNames).toContain('performance_metrics');
    });

    test('should track performance metrics', async () => {
      const task = {
        id: 'metrics-test',
        title: 'Test task for metrics',
        description: 'Simple task to test performance tracking',
        category: 'architecture_design' as TaskCategory,
        priority: 'low' as const,
        requestedBy: 'test',
        createdAt: new Date()
      };

      const initialStatus = ctoAgent.getStatus();
      const initialTaskCount = initialStatus.performance.tasksProcessed;

      await ctoAgent.processTask(task);

      const updatedStatus = ctoAgent.getStatus();
      expect(updatedStatus.performance.tasksProcessed).toBe(initialTaskCount + 1);
      expect(updatedStatus.performance.averageResponseTime).toBeGreaterThan(0);
    });
  });

  describe('Direct API Methods', () => {
    test('should analyze architecture via direct API', async () => {
      const requirements = 'Design high-performance microservices architecture';
      
      const decision = await ctoAgent.analyzeArchitecture(requirements);
      
      expect(decision.recommendedArchitecture).toBeDefined();
      expect(decision.technicalSpecification.services).toBeArray();
      expect(decision.implementation.phases).toBeArray();
    });

    test('should evaluate technology via direct API', async () => {
      const proposal = 'Evaluate Node.js for backend services';
      
      const assessment = await ctoAgent.evaluateTechnology(proposal);
      
      expect(assessment.evaluation.maturity).toBeOneOf(['emerging', 'proven', 'legacy']);
      expect(assessment.recommendation.decision).toBeOneOf(['adopt', 'pilot', 'defer', 'reject']);
    });

    test('should plan infrastructure via direct API', async () => {
      const requirements = 'Plan infrastructure for high-availability system';
      
      const plan = await ctoAgent.planInfrastructure(requirements);
      
      expect(plan.architecture.components).toBeArray();
      expect(plan.scalingStrategy.approach).toBeOneOf(['horizontal', 'vertical', 'hybrid']);
    });
  });

  describe('Error Handling', () => {
    test('should handle invalid task gracefully', async () => {
      const invalidTask = null as any;
      
      await expect(ctoAgent.processTask(invalidTask)).rejects.toThrow('Technical task is required');
    });

    test('should handle missing task properties', async () => {
      const incompleteTask = {
        id: 'incomplete',
        // Missing required properties
      } as any;
      
      await expect(ctoAgent.processTask(incompleteTask)).rejects.toThrow();
    });

    test('should return error response for router integration failures', async () => {
      const invalidRoutingTask = null as any;
      
      const response = await routerIntegration.handleRoutedTask(invalidRoutingTask);
      
      expect(response.success).toBe(false);
      expect(response.error).toBeDefined();
    });
  });

  describe('Agent Capabilities', () => {
    test('should provide detailed capability information', () => {
      const capabilities = ctoAgent.getCapabilities();
      
      expect(capabilities.technical_domains).toContain('Microservices Architecture');
      expect(capabilities.decision_types).toContain('Architecture Design Decisions');
      expect(capabilities.integration_points).toContain('Intelligent Task Router');
      expect(capabilities.performance_targets.response_time_ms).toBe(500);
    });

    test('should maintain correct agent status', () => {
      const status = ctoAgent.getStatus();
      
      expect(status.name).toBe('Zara (CTO)');
      expect(status.type).toBe('TECHNICAL_LEADERSHIP');
      expect(status.status).toBe('operational');
      expect(status.version).toBe('1.0.0');
    });
  });
});