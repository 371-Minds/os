/**
 * CEO Agent (Mimi) - Comprehensive Test Suite
 * 
 * Unit and integration tests for the CEO Agent following the unified architecture.
 * Tests cover orchestration, delegation, health monitoring, and end-to-end workflows.
 */

import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { CEOAgent } from '../src/index.js';
import { StrategicOrchestrator } from '../src/orchestrator.js';
import { TaskDelegator } from '../src/delegator.js';
import { HealthMonitor } from '../src/health-monitor.js';
import type { StrategicTask, CEOAgentDefinition, DecisionContext } from '../src/types.js';

describe('CEO Agent (Mimi) - Unit Tests', () => {
  let ceoAgent: CEOAgent;
  let mockAgentDefinition: CEOAgentDefinition;

  beforeEach(() => {
    // Setup mock agent definition
    mockAgentDefinition = {
      agent_name: 'Mimi (CEO)',
      agent_type: 'STRATEGIC_LEADERSHIP',
      core_instructions: 'Test CEO agent configuration',
      personality_traits: ['Strategic', 'Decisive'],
      required_tools: ['task_router:delegate'],
      delegation_rules: {
        financial_domain: {
          keywords: ['financial', 'budget'],
          primary_agent: 'CFO Cash',
          fallback_agents: [],
          confidence_threshold: 0.8
        },
        technical_domain: {
          keywords: ['technical', 'feature'],
          primary_agent: 'CTO Alex',
          fallback_agents: [],
          confidence_threshold: 0.8
        }
      },
      escalation_criteria: {
        test_escalation: {
          condition: 'confidence_score < 0.5',
          action: 'human_review',
          notification_required: true
        }
      },
      performance_targets: {
        response_time_ms: 500,
        delegation_accuracy_rate: 0.90,
        escalation_rate: 0.10,
        agent_availability_target: 0.95,
        decision_confidence_threshold: 0.7
      },
      monitoring_metrics: ['task_processing_time']
    };

    // Initialize CEO agent
    ceoAgent = new CEOAgent();
  });

  afterEach(() => {
    // Cleanup if needed
  });

  describe('Agent Initialization', () => {
    it('should initialize CEO agent successfully', () => {
      expect(ceoAgent).toBeDefined();
      expect(ceoAgent).toBeInstanceOf(CEOAgent);
    });

    it('should load agent definition', () => {
      const status = ceoAgent.getStatus();
      expect(status.name).toBe('Mimi (CEO)');
      expect(status.type).toBe('STRATEGIC_LEADERSHIP');
      expect(status.status).toBe('operational');
    });

    it('should have required capabilities', () => {
      const status = ceoAgent.getStatus();
      expect(status.capabilities).toContain('Strategic Task Analysis');
      expect(status.capabilities).toContain('Intelligent Task Delegation');
      expect(status.capabilities).toContain('Multi-Domain Coordination');
    });
  });

  describe('Task Processing', () => {
    it('should process a financial task successfully', async () => {
      const financialTask: StrategicTask = {
        id: 'test_financial_001',
        title: 'Budget Analysis',
        description: 'Analyze quarterly budget performance and identify optimization opportunities',
        priority: 'high',
        domain: 'financial',
        complexity_score: 0.5,
        resource_requirements: [],
        stakeholders: ['CFO'],
        strategic_implications: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      const result = await ceoAgent.processTask(financialTask);
      
      expect(result.success).toBe(true);
      expect(result.task_id).toBe('test_financial_001');
      expect(result.result_type).toBe('delegated');
      expect(result.delegation_details?.target_agent).toBe('CFO Cash');
    });

    it('should process a technical task successfully', async () => {
      const technicalTask: StrategicTask = {
        id: 'test_technical_001',
        title: 'Infrastructure Upgrade',
        description: 'Implement new security features for the application infrastructure',
        priority: 'medium',
        domain: 'technical',
        complexity_score: 0.7,
        resource_requirements: [],
        stakeholders: ['CTO', 'DevOps Team'],
        strategic_implications: true,
        created_at: new Date(),
        updated_at: new Date()
      };

      const result = await ceoAgent.processTask(technicalTask);
      
      expect(result.success).toBe(true);
      expect(result.task_id).toBe('test_technical_001');
      expect(result.result_type).toBe('delegated');
      expect(result.delegation_details?.target_agent).toBe('CTO Alex');
    });

    it('should handle multi-domain coordination', async () => {
      const multiDomainTask: StrategicTask = {
        id: 'test_multi_001',
        title: 'Product Launch Campaign',
        description: 'Launch new product with marketing campaign and technical implementation',
        priority: 'critical',
        domain: ['technical', 'marketing'],
        complexity_score: 0.8,
        resource_requirements: [],
        stakeholders: ['CTO', 'CMO', 'Product Team'],
        strategic_implications: true,
        created_at: new Date(),
        updated_at: new Date()
      };

      const result = await ceoAgent.processTask(multiDomainTask);
      
      expect(result.success).toBe(true);
      expect(result.task_id).toBe('test_multi_001');
      expect(result.result_type).toBe('coordinated');
      expect(result.coordination_details?.participating_agents).toContain('CTO Alex');
    });

    it('should validate task input correctly', async () => {
      const invalidTask = {
        id: '',
        title: '',
        description: 'Test task without required fields'
      } as StrategicTask;

      await expect(ceoAgent.processTask(invalidTask)).rejects.toThrow();
    });
  });

  describe('Health Monitoring', () => {
    it('should perform health check successfully', async () => {
      const healthResult = await ceoAgent.healthCheck();
      
      expect(healthResult).toBeDefined();
      expect(healthResult.agent_id).toBe('ceo_mimi');
      expect(['healthy', 'degraded', 'unhealthy']).toContain(healthResult.status);
      expect(healthResult.overall_score).toBeGreaterThanOrEqual(0);
      expect(healthResult.overall_score).toBeLessThanOrEqual(1);
    });

    it('should return performance metrics', () => {
      const metrics = ceoAgent.getPerformanceMetrics();
      
      expect(metrics).toBeDefined();
      expect(metrics.status).toBeDefined();
      expect(metrics.lastCheck).toBeInstanceOf(Date);
    });
  });

  describe('Concurrent Task Processing', () => {
    it('should process multiple tasks concurrently', async () => {
      const tasks: StrategicTask[] = [
        {
          id: 'concurrent_001',
          title: 'Financial Report',
          description: 'Generate monthly financial report',
          priority: 'medium',
          domain: 'financial',
          complexity_score: 0.3,
          resource_requirements: [],
          stakeholders: ['CFO'],
          strategic_implications: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 'concurrent_002',
          title: 'Security Audit',
          description: 'Conduct security audit of infrastructure',
          priority: 'high',
          domain: 'technical',
          complexity_score: 0.6,
          resource_requirements: [],
          stakeholders: ['CTO'],
          strategic_implications: true,
          created_at: new Date(),
          updated_at: new Date()
        }
      ];

      const results = await ceoAgent.processTasks(tasks);
      
      expect(results).toHaveLength(2);
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(true);
      expect(results[0].task_id).toBe('concurrent_001');
      expect(results[1].task_id).toBe('concurrent_002');
    });
  });
});

describe('Strategic Orchestrator - Unit Tests', () => {
  let orchestrator: StrategicOrchestrator;
  let mockAgentDefinition: CEOAgentDefinition;

  beforeEach(() => {
    mockAgentDefinition = {
      agent_name: 'Test CEO',
      agent_type: 'STRATEGIC_LEADERSHIP',
      core_instructions: 'Test instructions',
      personality_traits: ['Strategic'],
      required_tools: ['test_tool'],
      delegation_rules: {
        financial_domain: {
          keywords: ['financial'],
          primary_agent: 'CFO Cash',
          fallback_agents: [],
          confidence_threshold: 0.8
        }
      },
      escalation_criteria: {
        test_criteria: {
          condition: 'test',
          action: 'human_review',
          notification_required: true
        }
      },
      performance_targets: {
        response_time_ms: 500,
        delegation_accuracy_rate: 0.90,
        escalation_rate: 0.10,
        agent_availability_target: 0.95,
        decision_confidence_threshold: 0.7
      },
      monitoring_metrics: ['test_metric']
    };

    orchestrator = new StrategicOrchestrator(mockAgentDefinition);
  });

  describe('Task Orchestration', () => {
    it('should validate orchestrator functionality', async () => {
      const isValid = await orchestrator.validate();
      expect(isValid).toBe(true);
    });

    it('should orchestrate a simple task', async () => {
      const testTask: StrategicTask = {
        id: 'orchestration_test_001',
        title: 'Test Financial Task',
        description: 'Test financial analysis for orchestration',
        priority: 'medium',
        domain: 'financial',
        complexity_score: 0.4,
        resource_requirements: [],
        stakeholders: ['CFO'],
        strategic_implications: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      const orchestrationRequest = {
        task: testTask,
        context: {
          current_strategic_focus: ['test_focus'],
          active_initiatives: ['test_initiative'],
          resource_constraints: [],
          organizational_priorities: [{
            name: 'Test Priority',
            weight: 0.8,
            description: 'Test priority description'
          }]
        },
        preferences: {
          prefer_single_agent: true,
          allow_parallel_execution: false,
          max_coordination_complexity: 0.7,
          escalation_threshold: 0.8
        }
      };

      const decision = await orchestrator.orchestrateTask(orchestrationRequest);
      
      expect(decision).toBeDefined();
      expect(decision.task_id).toBe('orchestration_test_001');
      expect(decision.confidence_score).toBeGreaterThan(0);
      expect(decision.target_agents).toBeDefined();
    });
  });
});

describe('Task Delegator - Unit Tests', () => {
  let delegator: TaskDelegator;
  let mockAgentDefinition: CEOAgentDefinition;

  beforeEach(() => {
    mockAgentDefinition = {
      agent_name: 'Test CEO',
      agent_type: 'STRATEGIC_LEADERSHIP',
      core_instructions: 'Test instructions',
      personality_traits: ['Strategic'],
      required_tools: ['test_tool'],
      delegation_rules: {
        financial_domain: {
          keywords: ['financial', 'budget'],
          primary_agent: 'CFO Cash',
          fallback_agents: ['Financial Analyst'],
          confidence_threshold: 0.8
        },
        technical_domain: {
          keywords: ['technical', 'feature'],
          primary_agent: 'CTO Alex',
          fallback_agents: ['Technical Lead'],
          confidence_threshold: 0.8
        }
      },
      escalation_criteria: {
        test_criteria: {
          condition: 'test',
          action: 'human_review',
          notification_required: true
        }
      },
      performance_targets: {
        response_time_ms: 500,
        delegation_accuracy_rate: 0.90,
        escalation_rate: 0.10,
        agent_availability_target: 0.95,
        decision_confidence_threshold: 0.7
      },
      monitoring_metrics: ['test_metric']
    };

    delegator = new TaskDelegator(mockAgentDefinition);
  });

  describe('Task Delegation', () => {
    it('should validate delegator functionality', async () => {
      const isValid = await delegator.validate();
      expect(isValid).toBe(true);
    });

    it('should delegate a financial task correctly', async () => {
      const testTask: StrategicTask = {
        id: 'delegation_test_001',
        title: 'Budget Review',
        description: 'Review quarterly budget performance',
        priority: 'medium',
        domain: 'financial',
        complexity_score: 0.5,
        resource_requirements: [],
        stakeholders: ['CFO'],
        strategic_implications: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      const decisionContext: DecisionContext = {
        current_workload: { 'CFO Cash': 0.6 },
        agent_performance_history: { 'CFO Cash': 0.9 },
        resource_availability: {
          financial_budget: 50000,
          computational_capacity: 0.8,
          human_resources: 0.9,
          time_constraints: []
        },
        strategic_priorities: ['cost_optimization'],
        risk_factors: []
      };

      const result = await delegator.delegateTask(testTask, decisionContext);
      
      expect(result.success).toBe(true);
      expect(result.task_id).toBe('delegation_test_001');
      expect(result.result_type).toBe('delegated');
    });
  });
});

describe('Health Monitor - Unit Tests', () => {
  let healthMonitor: HealthMonitor;
  let mockAgentDefinition: CEOAgentDefinition;

  beforeEach(() => {
    mockAgentDefinition = {
      agent_name: 'Test CEO',
      agent_type: 'STRATEGIC_LEADERSHIP',
      core_instructions: 'Test instructions',
      personality_traits: ['Strategic'],
      required_tools: ['test_tool'],
      delegation_rules: {
        test_domain: {
          keywords: ['test'],
          primary_agent: 'Test Agent',
          fallback_agents: [],
          confidence_threshold: 0.8
        }
      },
      escalation_criteria: {
        test_criteria: {
          condition: 'test',
          action: 'human_review',
          notification_required: true
        }
      },
      performance_targets: {
        response_time_ms: 500,
        delegation_accuracy_rate: 0.90,
        escalation_rate: 0.10,
        agent_availability_target: 0.95,
        decision_confidence_threshold: 0.7
      },
      monitoring_metrics: ['test_metric']
    };

    healthMonitor = new HealthMonitor(mockAgentDefinition);
  });

  describe('Health Monitoring', () => {
    it('should validate health monitor functionality', async () => {
      const isValid = await healthMonitor.validate();
      expect(isValid).toBe(true);
    });

    it('should perform health check and return results', async () => {
      const healthResult = await healthMonitor.performHealthCheck();
      
      expect(healthResult).toBeDefined();
      expect(healthResult.agent_id).toBe('ceo_mimi');
      expect(['healthy', 'degraded', 'unhealthy']).toContain(healthResult.status);
      expect(healthResult.components).toBeDefined();
      expect(healthResult.overall_score).toBeGreaterThanOrEqual(0);
    });

    it('should return health summary', () => {
      const summary = healthMonitor.getHealthSummary();
      
      expect(summary).toBeDefined();
      expect(summary.status).toBeDefined();
      expect(summary.lastCheck).toBeInstanceOf(Date);
      expect(typeof summary.uptime).toBe('number');
      expect(typeof summary.issueCount).toBe('number');
    });
  });
});

describe('Integration Tests', () => {
  let ceoAgent: CEOAgent;

  beforeEach(() => {
    ceoAgent = new CEOAgent();
  });

  describe('End-to-End Task Processing', () => {
    it('should handle complete task lifecycle', async () => {
      // Create a comprehensive test task
      const complexTask: StrategicTask = {
        id: 'integration_test_001',
        title: 'Strategic Initiative Implementation',
        description: 'Implement new cost optimization strategy across financial and technical domains',
        priority: 'critical',
        domain: ['financial', 'technical'],
        complexity_score: 0.9,
        financial_impact_usd: 50000,
        resource_requirements: [
          {
            type: 'human',
            amount: 5,
            unit: 'specialists',
            description: 'Cross-functional team members'
          },
          {
            type: 'financial',
            amount: 25000,
            unit: 'USD',
            description: 'Implementation budget'
          }
        ],
        stakeholders: ['CEO', 'CFO', 'CTO', 'Board'],
        strategic_implications: true,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        created_at: new Date(),
        updated_at: new Date()
      };

      // Process the task
      const result = await ceoAgent.processTask(complexTask);
      
      // Verify comprehensive results
      expect(result.success).toBe(true);
      expect(result.task_id).toBe('integration_test_001');
      expect(result.result_type).toBe('coordinated');
      expect(result.execution_time).toBeGreaterThan(0);
      expect(result.metadata).toBeDefined();
      expect(result.metadata.performance_impact).toBeDefined();
      
      // Verify coordination details for multi-domain task
      if (result.coordination_details) {
        expect(result.coordination_details.participating_agents.length).toBeGreaterThan(1);
        expect(result.coordination_details.coordination_strategy).toBeDefined();
      }
    });

    it('should maintain performance under load', async () => {
      const tasks: StrategicTask[] = [];
      
      // Create 10 test tasks
      for (let i = 1; i <= 10; i++) {
        tasks.push({
          id: `load_test_${i.toString().padStart(3, '0')}`,
          title: `Load Test Task ${i}`,
          description: `Load testing task number ${i} for performance validation`,
          priority: i <= 3 ? 'high' : i <= 7 ? 'medium' : 'low',
          domain: ['financial', 'technical', 'marketing', 'community'][i % 4] as any,
          complexity_score: Math.random() * 0.8 + 0.2,
          resource_requirements: [],
          stakeholders: ['Test Stakeholder'],
          strategic_implications: i <= 2,
          created_at: new Date(),
          updated_at: new Date()
        });
      }

      const startTime = Date.now();
      const results = await ceoAgent.processTasks(tasks);
      const totalTime = Date.now() - startTime;
      
      // Performance assertions
      expect(results).toHaveLength(10);
      expect(totalTime).toBeLessThan(5000); // Should complete within 5 seconds
      expect(results.every(r => r.success)).toBe(true);
      
      // Average processing time should be reasonable
      const avgProcessingTime = results.reduce((sum, r) => sum + r.execution_time, 0) / results.length;
      expect(avgProcessingTime).toBeLessThan(1000); // Average < 1 second per task
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle invalid input gracefully', async () => {
      const invalidTask = null as any;
      
      await expect(ceoAgent.processTask(invalidTask)).rejects.toThrow();
    });

    it('should recover from component failures', async () => {
      // Perform health check to ensure system is operational
      const healthResult = await ceoAgent.healthCheck();
      
      // Even if some components are degraded, overall system should be functional
      expect(['healthy', 'degraded']).toContain(healthResult.status);
      expect(healthResult.overall_score).toBeGreaterThan(0.3); // Minimum operational threshold
    });
  });

  describe('Performance and Scalability', () => {
    it('should meet performance targets', async () => {
      const testTask: StrategicTask = {
        id: 'performance_test_001',
        title: 'Performance Validation Task',
        description: 'Task to validate performance targets are met',
        priority: 'medium',
        domain: 'financial',
        complexity_score: 0.5,
        resource_requirements: [],
        stakeholders: ['Performance Team'],
        strategic_implications: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      const startTime = Date.now();
      const result = await ceoAgent.processTask(testTask);
      const processingTime = Date.now() - startTime;
      
      // Should meet performance targets
      expect(result.success).toBe(true);
      expect(processingTime).toBeLessThan(500); // Target response time
      expect(result.execution_time).toBeLessThan(500);
    });
  });
});