/**
 * Test suite for the Intelligent Router Agent
 * Comprehensive testing of routing logic, agent selection, and performance monitoring
 */

import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import {
  IntelligentRouterAgent,
  TaskAnalyzer,
  AgentSelector,
  RouterEngine,
  DelegationOrchestrator,
  PerformanceMonitor,
  createSampleTasks
} from '../src/index';

import {
  RoutingTask,
  TaskPriority,
  AgentDomain,
  StrategicImpact,
  AvailabilityStatus,
  PerformanceTargets
} from '../src/types';

describe('Intelligent Router Agent', () => {
  let router: IntelligentRouterAgent;

  beforeEach(() => {
    router = new IntelligentRouterAgent();
  });

  afterEach(async () => {
    await router.shutdown();
  });

  test('should initialize successfully', async () => {
    const health = await router.healthCheck();
    expect(health.healthy).toBe(true);
    expect(health.details.initialization_status).toBe('initialized');
  });

  test('should route financial task to CFO agent', async () => {
    const financialTask: RoutingTask = {
      id: 'test_financial_001',
      title: 'Budget Analysis',
      description: 'Analyze quarterly budget performance and identify cost optimization opportunities',
      priority: TaskPriority.HIGH,
      domain_hints: [AgentDomain.FINANCIAL],
      strategic_importance: true,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const result = await router.routeTask(financialTask);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    if (result.data) {
      expect(result.data.primary_agent).toContain('cfo');
      expect(result.data.confidence_score).toBeGreaterThan(0.8);
    }
  });

  test('should route technical task to CTO agent', async () => {
    const technicalTask: RoutingTask = {
      id: 'test_technical_001',
      title: 'System Architecture Review',
      description: 'Review current system architecture and recommend improvements for scalability',
      priority: TaskPriority.MEDIUM,
      domain_hints: [AgentDomain.TECHNICAL],
      strategic_importance: false,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const result = await router.routeTask(technicalTask);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    if (result.data) {
      expect(result.data.primary_agent).toContain('cto');
      expect(result.data.confidence_score).toBeGreaterThan(0.7);
    }
  });

  test('should handle multi-domain coordination', async () => {
    const multiDomainTask: RoutingTask = {
      id: 'test_multi_001',
      title: 'Product Launch Coordination',
      description: 'Coordinate product launch involving technical development, marketing campaign, and financial planning',
      priority: TaskPriority.URGENT,
      domain_hints: [AgentDomain.TECHNICAL, AgentDomain.MARKETING, AgentDomain.FINANCIAL],
      strategic_importance: true,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const result = await router.routeTask(multiDomainTask);
    
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    if (result.data) {
      expect(result.data.coordination_required).toBe(true);
      expect(result.data.alternative_agents).toBeDefined();
      expect(result.data.alternative_agents!.length).toBeGreaterThan(0);
    }
  });

  test('should generate performance report', async () => {
    // Route a few tasks first
    const tasks = createSampleTasks().slice(0, 2);
    for (const task of tasks) {
      await router.routeTask(task);
    }

    const report = await router.getPerformanceReport();
    
    expect(report).toBeDefined();
    expect(report.agent_info).toBeDefined();
    expect(report.agent_info.name).toBe('Intelligent Router Agent');
    expect(report.routing_statistics).toBeDefined();
  });

  test('should handle configuration updates', () => {
    const newConfig = {
      runtime_settings: {
        max_concurrent_routings: 20,
        response_timeout_ms: 10000,
        retry_attempts: 5,
        cache_duration_minutes: 30,
        logging_level: 'debug' as const
      }
    };

    expect(() => router.updateConfiguration(newConfig)).not.toThrow();
  });
});

describe('TaskAnalyzer', () => {
  let analyzer: TaskAnalyzer;

  beforeEach(() => {
    analyzer = new TaskAnalyzer();
  });

  test('should extract relevant keywords from task', async () => {
    const task: RoutingTask = {
      id: 'test_001',
      title: 'Financial Budget Analysis',
      description: 'Analyze quarterly financial performance and budget allocation for cost optimization',
      priority: TaskPriority.HIGH,
      strategic_importance: true,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const analysis = await analyzer.analyzeTask(task);
    
    expect(analysis.keywords).toContain('financial');
    expect(analysis.keywords).toContain('budget');
    expect(analysis.domain_classification.primary_domain).toBe(AgentDomain.FINANCIAL);
    expect(analysis.domain_classification.confidence_score).toBeGreaterThan(0.7);
  });

  test('should classify technical tasks correctly', async () => {
    const task: RoutingTask = {
      id: 'test_002',
      title: 'Software Architecture Design',
      description: 'Design microservices architecture for scalable application development with security considerations',
      priority: TaskPriority.MEDIUM,
      strategic_importance: false,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const analysis = await analyzer.analyzeTask(task);
    
    expect(analysis.domain_classification.primary_domain).toBe(AgentDomain.TECHNICAL);
    expect(analysis.keywords).toContain('architecture');
    expect(analysis.complexity_score).toBeGreaterThan(0.5);
  });

  test('should identify multi-domain tasks', async () => {
    const task: RoutingTask = {
      id: 'test_003',
      title: 'Cross-functional Project Launch',
      description: 'Launch new product requiring technical development, marketing strategy, and financial planning coordination',
      priority: TaskPriority.HIGH,
      domain_hints: [AgentDomain.TECHNICAL, AgentDomain.MARKETING, AgentDomain.FINANCIAL],
      strategic_importance: true,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const analysis = await analyzer.analyzeTask(task);
    
    expect(analysis.domain_classification.multi_domain).toBe(true);
    expect(analysis.domain_classification.domains.length).toBeGreaterThan(1);
    expect(analysis.complexity_score).toBeGreaterThan(0.6);
  });

  test('should assess strategic impact correctly', async () => {
    const strategicTask: RoutingTask = {
      id: 'test_004',
      title: 'Strategic Vision Development',
      description: 'Develop long-term strategic vision for company growth and competitive advantage',
      priority: TaskPriority.CRITICAL,
      strategic_importance: true,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const analysis = await analyzer.analyzeTask(strategicTask);
    
    expect(analysis.strategic_impact).toBe(StrategicImpact.CRITICAL);
    expect(analysis.domain_classification.primary_domain).toBe(AgentDomain.STRATEGIC);
  });

  test('should validate analysis results', async () => {
    const task: RoutingTask = {
      id: 'test_005',
      title: 'Simple Task',
      description: 'A simple task for validation testing',
      priority: TaskPriority.LOW,
      strategic_importance: false,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const analysis = await analyzer.analyzeTask(task);
    const isValid = analyzer.validateAnalysis(analysis);
    
    expect(isValid).toBe(true);
    expect(analysis.domain_classification.confidence_score).toBeGreaterThanOrEqual(0);
    expect(analysis.domain_classification.confidence_score).toBeLessThanOrEqual(1);
    expect(analysis.complexity_score).toBeGreaterThanOrEqual(0);
    expect(analysis.complexity_score).toBeLessThanOrEqual(1);
  });
});

describe('AgentSelector', () => {
  let selector: AgentSelector;

  beforeEach(() => {
    const mockPolicies = {
      [AgentDomain.FINANCIAL]: {
        domain: AgentDomain.FINANCIAL,
        keywords: ['financial', 'budget'],
        primary_agent: 'cfo-cash',
        fallback_agents: ['financial-analyst'],
        confidence_threshold: 0.8
      }
    };

    const mockWorkloadConfig = {
      max_concurrent_tasks: 5,
      priority_multiplier: 1.5,
      availability_check_required: true,
      fallback_threshold: 0.7
    };

    selector = new AgentSelector(mockPolicies, mockWorkloadConfig, {});
  });

  test('should select appropriate agent based on domain', async () => {
    const mockAnalysis = {
      keywords: ['financial', 'budget'],
      domain_classification: {
        domains: [{
          domain: AgentDomain.FINANCIAL,
          score: 0.9,
          matching_keywords: ['financial', 'budget'],
          reasoning: 'High financial content'
        }],
        primary_domain: AgentDomain.FINANCIAL,
        confidence_score: 0.9,
        multi_domain: false
      },
      complexity_score: 0.6,
      resource_requirements: [],
      strategic_impact: StrategicImpact.MEDIUM,
      uncertainty_indicators: []
    };

    const mockTask: RoutingTask = {
      id: 'test_select_001',
      title: 'Financial Analysis',
      description: 'Analyze financial data',
      priority: TaskPriority.HIGH,
      strategic_importance: false,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const result = await selector.selectAgent(mockTask, mockAnalysis);
    
    expect(result.selected_agent).toBe('cfo-cash');
    expect(result.confidence_score).toBeGreaterThan(0.7);
  });

  test('should get agent availability status', () => {
    const availability = selector.getAgentAvailability();
    
    expect(availability).toBeDefined();
    expect(typeof availability).toBe('object');
  });
});

describe('DelegationOrchestrator', () => {
  let orchestrator: DelegationOrchestrator;

  beforeEach(() => {
    orchestrator = new DelegationOrchestrator();
  });

  test('should delegate single agent task successfully', async () => {
    const mockTask: RoutingTask = {
      id: 'test_delegate_001',
      title: 'Test Delegation',
      description: 'Test single agent delegation',
      priority: TaskPriority.MEDIUM,
      strategic_importance: false,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const mockDecision = {
      success: true,
      primary_agent: 'test-agent',
      confidence_score: 0.8,
      routing_rationale: 'Test delegation',
      coordination_required: false,
      estimated_completion_time: 3600000,
      escalation_required: false,
      decision_timestamp: new Date()
    };

    const result = await orchestrator.delegateTask(mockTask, mockDecision);
    
    expect(result.success).toBe(true);
    expect(result.assigned_agents).toContain('test-agent');
    expect(result.delegation_id).toBeDefined();
  });

  test('should handle multi-agent coordination', async () => {
    const mockTask: RoutingTask = {
      id: 'test_coordinate_001',
      title: 'Test Coordination',
      description: 'Test multi-agent coordination',
      priority: TaskPriority.HIGH,
      strategic_importance: true,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    const mockDecision = {
      success: true,
      primary_agent: 'primary-agent',
      confidence_score: 0.7,
      routing_rationale: 'Test coordination',
      alternative_agents: ['secondary-agent', 'tertiary-agent'],
      coordination_required: true,
      estimated_completion_time: 7200000,
      escalation_required: false,
      decision_timestamp: new Date()
    };

    const mockStrategy = {
      strategy_type: 'parallel_execution' as any,
      description: 'Parallel execution strategy',
      use_cases: ['Test coordination']
    };

    const result = await orchestrator.delegateTask(mockTask, mockDecision, mockStrategy);
    
    expect(result.success).toBe(true);
    expect(result.coordination_required).toBe(true);
    expect(result.assigned_agents.length).toBeGreaterThan(1);
  });

  test('should track delegation statistics', () => {
    const stats = orchestrator.getDelegationStatistics();
    
    expect(stats).toBeDefined();
    expect(stats.total_delegations).toBeGreaterThanOrEqual(0);
    expect(stats.success_rate).toBeGreaterThanOrEqual(0);
    expect(stats.success_rate).toBeLessThanOrEqual(1);
  });
});

describe('PerformanceMonitor', () => {
  let monitor: PerformanceMonitor;
  const mockTargets: PerformanceTargets = {
    routing_accuracy: 0.95,
    average_response_time: 500,
    delegation_success_rate: 0.90,
    escalation_rate: 0.05
  };

  beforeEach(() => {
    monitor = new PerformanceMonitor(mockTargets);
  });

  test('should record routing decisions', async () => {
    const mockDecision = {
      success: true,
      primary_agent: 'test-agent',
      confidence_score: 0.85,
      routing_rationale: 'Test decision',
      coordination_required: false,
      estimated_completion_time: 3600000,
      escalation_required: false,
      decision_timestamp: new Date()
    };

    await monitor.recordRoutingDecision(mockDecision, 450);
    
    const metrics = await monitor.getRoutingMetrics();
    expect(metrics.total_tasks_routed).toBeGreaterThan(0);
    expect(metrics.successful_routings).toBeGreaterThan(0);
  });

  test('should record escalations', async () => {
    const mockTask: RoutingTask = {
      id: 'test_escalation_001',
      title: 'Test Escalation',
      description: 'Test escalation recording',
      priority: TaskPriority.HIGH,
      strategic_importance: true,
      submitted_at: new Date(),
      submitted_by: 'test_user'
    };

    await monitor.recordEscalation(mockTask, ['Low confidence', 'Multi-domain complexity']);
    
    const metrics = await monitor.getRoutingMetrics();
    expect(metrics.escalations).toBeGreaterThan(0);
  });

  test('should generate optimization recommendations', async () => {
    // Record some sample data
    const mockDecision = {
      success: false,
      primary_agent: 'test-agent',
      confidence_score: 0.5,
      routing_rationale: 'Low confidence test',
      coordination_required: false,
      estimated_completion_time: 3600000,
      escalation_required: true,
      decision_timestamp: new Date()
    };

    await monitor.recordRoutingDecision(mockDecision, 2000);
    
    const recommendations = await monitor.generateOptimizationRecommendations();
    expect(recommendations).toBeDefined();
    expect(recommendations.length).toBeGreaterThan(0);
  });

  test('should analyze performance trends', async () => {
    const trends = await monitor.analyzeTrends(7);
    
    expect(trends).toBeDefined();
    expect(trends.length).toBeGreaterThan(0);
    expect(trends[0].metric_name).toBeDefined();
    expect(trends[0].trend_direction).toMatch(/improving|declining|stable/);
  });

  test('should generate performance report', async () => {
    const report = await monitor.getPerformanceReport(7);
    
    expect(report).toBeDefined();
    expect(report.summary).toBeDefined();
    expect(report.current_metrics).toBeDefined();
    expect(report.trend_analysis).toBeDefined();
    expect(report.optimization_recommendations).toBeDefined();
  });
});

describe('Integration Tests', () => {
  let router: IntelligentRouterAgent;

  beforeEach(() => {
    router = new IntelligentRouterAgent();
  });

  afterEach(async () => {
    await router.shutdown();
  });

  test('should handle complete routing workflow', async () => {
    const sampleTasks = createSampleTasks();
    
    for (const task of sampleTasks) {
      const result = await router.routeTask(task);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      if (result.data) {
        expect(result.data.primary_agent).toBeDefined();
        expect(result.data.confidence_score).toBeGreaterThan(0);
        expect(result.data.routing_rationale).toBeDefined();
      }
    }
  });

  test('should maintain consistent performance across multiple routings', async () => {
    const tasks = createSampleTasks();
    const results = [];
    
    for (const task of tasks) {
      const result = await router.routeTask(task);
      results.push(result);
    }
    
    const successfulResults = results.filter(r => r.success);
    expect(successfulResults.length).toBeGreaterThan(tasks.length * 0.8); // At least 80% success rate
  });

  test('should generate meaningful statistics after multiple routings', async () => {
    const tasks = createSampleTasks();
    
    // Route all sample tasks
    for (const task of tasks) {
      await router.routeTask(task);
    }
    
    const stats = await router.getStatistics();
    expect(stats).toBeDefined();
    expect(stats.routing_statistics).toBeDefined();
    
    const report = await router.getPerformanceReport();
    expect(report.routing_statistics.total_routings).toBeGreaterThan(0);
  });
});