import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'yaml';
import { LegalTaskProcessor } from './legal-task-processor.js';
import { ComplianceAnalyzer } from './compliance-analyzer.js';
import { GovernanceEngine } from './governance-engine.js';
import { RouterIntegration } from './router-integration.js';
import type {
  CLOAgentConfig,
  LegalTask,
  AgentHealth,
  AgentStatus,
  PerformanceMetrics,
  SystemResources
} from './types.js';

/**
 * CLO Agent (Alex) - Chief Legal Officer
 * 
 * Main entry point for the CLO Agent providing legal compliance,
 * governance oversight, and risk management capabilities.
 */
export class CLOAgent {
  private config: CLOAgentConfig;
  private legalTaskProcessor: LegalTaskProcessor;
  private complianceAnalyzer: ComplianceAnalyzer;
  private governanceEngine: GovernanceEngine;
  private routerIntegration: RouterIntegration;
  private startTime: Date;
  private taskCount: number = 0;
  private successCount: number = 0;

  constructor() {
    this.startTime = new Date();
    this.loadConfiguration();
    this.initializeComponents();
    
    console.log(`CLO Agent (Alex) initialized successfully`);
    console.log(`Agent ID: ${this.config.agentId}`);
    console.log(`Version: ${this.config.version}`);
    console.log(`Capabilities: ${this.config.capabilities.map(c => c.name).join(', ')}`);
  }

  /**
   * Load agent configuration from brain definition
   */
  private loadConfiguration(): void {
    try {
      // Load brain definition from centralized prompt library
      const brainPath = join(
        process.cwd(),
        'libs/prompts/agent-definitions/alex_clo.yml'
      );
      
      const brainContent = readFileSync(brainPath, 'utf-8');
      const brainDefinition = yaml.parse(brainContent);

      // Transform brain definition to agent configuration
      this.config = {
        agentId: 'clo-alex-001',
        agentName: brainDefinition.agent_name,
        version: '1.0.0',
        capabilities: brainDefinition.required_tools?.map((tool: string) => ({
          name: tool,
          description: `${tool} capability`,
          enabled: true,
          configuration: {}
        })) || [],
        performance: {
          maxConcurrentTasks: 10,
          responseTimeTarget: brainDefinition.performance_targets?.compliance_assessment_time_hours * 3600000 || 2000,
          throughputTarget: 100,
          cachingEnabled: true,
          circuitBreakerThreshold: 5
        },
        integration: {
          adaptiveLLMRouter: {
            enabled: true,
            costOptimization: true,
            preferredProviders: ['gpt-4', 'claude-3'],
            fallbackProviders: ['gpt-3.5-turbo']
          },
          cSuiteCoordination: {
            coordinationEnabled: true,
            escalationRules: Object.entries(brainDefinition.escalation_criteria || {}).map(([key, criteria]: [string, any]) => ({
              condition: criteria.condition,
              target: criteria.notification_targets?.[0] || 'CEO',
              timeframe: criteria.response_time_minutes || 60,
              notificationMethod: 'email'
            })),
            communicationChannels: ['email', 'slack', 'dashboard']
          },
          externalSystems: []
        },
        security: {
          encryptionEnabled: true,
          auditLevel: 'comprehensive' as const,
          accessControls: [],
          dataRetention: {
            retentionPeriod: 2555, // 7 years for legal compliance
            archivalPolicy: 'encrypt_and_archive',
            deletionPolicy: 'secure_deletion',
            complianceRequirements: ['GDPR', 'SOX', 'HIPAA']
          }
        }
      };

      console.log('CLO Agent configuration loaded successfully');
    } catch (error) {
      console.error('Failed to load CLO Agent configuration:', error);
      throw new Error('Configuration loading failed');
    }
  }

  /**
   * Initialize agent components
   */
  private initializeComponents(): void {
    try {
      this.legalTaskProcessor = new LegalTaskProcessor(this.config);
      this.complianceAnalyzer = new ComplianceAnalyzer(this.config);
      this.governanceEngine = new GovernanceEngine(this.config);
      this.routerIntegration = new RouterIntegration(this.config);

      console.log('All CLO Agent components initialized successfully');
    } catch (error) {
      console.error('Failed to initialize CLO Agent components:', error);
      throw new Error('Component initialization failed');
    }
  }

  /**
   * Process incoming legal task
   */
  async processLegalTask(task: LegalTask): Promise<any> {
    const startTime = Date.now();
    this.taskCount++;

    try {
      console.log(`Processing legal task: ${task.id} (${task.type})`);

      // Route task through legal task processor
      const analysisResult = await this.legalTaskProcessor.processTask(task);

      // Perform compliance analysis if required
      if (task.requiredCompliance.length > 0) {
        const complianceResult = await this.complianceAnalyzer.analyzeCompliance(task);
        analysisResult.complianceAnalysis = complianceResult;
      }

      // Apply governance framework
      const governanceDecision = await this.governanceEngine.evaluateGovernance(task);
      analysisResult.governanceDecision = governanceDecision;

      // Log processing time
      const processingTime = Date.now() - startTime;
      console.log(`Task ${task.id} processed in ${processingTime}ms`);

      this.successCount++;
      return analysisResult;

    } catch (error) {
      console.error(`Failed to process legal task ${task.id}:`, error);
      throw error;
    }
  }

  /**
   * Get agent health status
   */
  getHealthStatus(): AgentHealth {
    const now = new Date();
    const uptimeHours = (now.getTime() - this.startTime.getTime()) / (1000 * 60 * 60);
    const successRate = this.taskCount > 0 ? this.successCount / this.taskCount : 1.0;

    return {
      agentId: this.config.agentId,
      status: this.determineAgentStatus(successRate),
      lastHealthCheck: now,
      performanceMetrics: {
        averageResponseTime: 1500, // Mock value
        tasksProcessed: this.taskCount,
        successRate,
        throughput: this.taskCount / Math.max(uptimeHours, 1),
        memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
        cpuUsage: 15 // Mock value
      },
      systemResources: {
        memoryTotal: process.memoryUsage().heapTotal / 1024 / 1024, // MB
        memoryUsed: process.memoryUsage().heapUsed / 1024 / 1024, // MB
        cpuCores: 4, // Mock value
        diskSpace: 100, // Mock value in GB
        networkLatency: 50 // Mock value in ms
      },
      errorRate: 1.0 - successRate,
      uptime: uptimeHours
    };
  }

  /**
   * Determine agent status based on performance metrics
   */
  private determineAgentStatus(successRate: number): AgentStatus {
    if (successRate >= 0.95) return 'healthy';
    if (successRate >= 0.80) return 'degraded';
    if (successRate >= 0.50) return 'unhealthy';
    return 'offline';
  }

  /**
   * Shutdown agent gracefully
   */
  async shutdown(): Promise<void> {
    console.log('Shutting down CLO Agent...');
    
    try {
      // Cleanup resources
      await this.legalTaskProcessor.shutdown();
      await this.complianceAnalyzer.shutdown();
      await this.governanceEngine.shutdown();
      await this.routerIntegration.shutdown();

      console.log('CLO Agent shutdown completed');
    } catch (error) {
      console.error('Error during CLO Agent shutdown:', error);
      throw error;
    }
  }

  /**
   * Get agent configuration
   */
  getConfiguration(): CLOAgentConfig {
    return this.config;
  }

  /**
   * Update agent configuration
   */
  updateConfiguration(updates: Partial<CLOAgentConfig>): void {
    this.config = { ...this.config, ...updates };
    console.log('CLO Agent configuration updated');
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): PerformanceMetrics {
    return this.getHealthStatus().performanceMetrics;
  }
}

/**
 * Main execution function
 */
async function main(): Promise<void> {
  try {
    // Initialize CLO Agent
    const cloAgent = new CLOAgent();

    // Display agent information
    console.log('\n=== CLO Agent (Alex) Status ===');
    console.log('Agent Type: Chief Legal Officer');
    console.log('Primary Functions:');
    console.log('  - Legal Compliance Assessment');
    console.log('  - Governance Oversight');
    console.log('  - Risk Management');
    console.log('  - Contract Review');
    console.log('  - Regulatory Analysis');

    // Show health status
    const health = cloAgent.getHealthStatus();
    console.log('\n=== Health Status ===');
    console.log(`Status: ${health.status}`);
    console.log(`Uptime: ${health.uptime.toFixed(2)} hours`);
    console.log(`Tasks Processed: ${health.performanceMetrics.tasksProcessed}`);
    console.log(`Success Rate: ${(health.performanceMetrics.successRate * 100).toFixed(1)}%`);
    console.log(`Memory Usage: ${health.performanceMetrics.memoryUsage.toFixed(1)} MB`);

    // Example legal task processing
    console.log('\n=== Processing Example Legal Task ===');
    
    const exampleTask: LegalTask = {
      id: 'legal-task-001',
      type: 'compliance_assessment' as const,
      description: 'Assess GDPR compliance for new data processing workflow',
      priority: 'high' as const,
      domain: 'data_privacy' as const,
      requiredCompliance: [
        {
          regulation: 'GDPR',
          jurisdiction: 'EU',
          requirement: 'Data processing lawfulness assessment',
          mandatory: true,
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        }
      ],
      escalationRequired: false,
      metadata: {
        submittedBy: 'product-team',
        submissionDate: new Date(),
        businessImpact: 'moderate' as const,
        stakeholders: ['product-manager', 'data-engineer', 'privacy-officer'],
        relatedDocuments: ['privacy-policy.pdf', 'data-flow-diagram.png'],
        confidentialityLevel: 'confidential' as const
      }
    };

    const result = await cloAgent.processLegalTask(exampleTask);
    console.log('Task processed successfully');
    console.log(`Result: ${JSON.stringify(result, null, 2)}`);

    // Keep agent running
    console.log('\n=== CLO Agent Running ===');
    console.log('Agent is ready to process legal tasks...');
    console.log('Press Ctrl+C to shutdown');

    // Graceful shutdown handling
    process.on('SIGINT', async () => {
      console.log('\nReceived shutdown signal...');
      await cloAgent.shutdown();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\nReceived termination signal...');
      await cloAgent.shutdown();
      process.exit(0);
    });

    // Keep process alive
    setInterval(() => {
      const health = cloAgent.getHealthStatus();
      console.log(`Agent Status: ${health.status} | Tasks: ${health.performanceMetrics.tasksProcessed} | Success Rate: ${(health.performanceMetrics.successRate * 100).toFixed(1)}%`);
    }, 30000); // Status update every 30 seconds

  } catch (error) {
    console.error('Failed to start CLO Agent:', error);
    process.exit(1);
  }
}

// Run the agent if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('CLO Agent failed:', error);
    process.exit(1);
  });
}

export default CLOAgent;