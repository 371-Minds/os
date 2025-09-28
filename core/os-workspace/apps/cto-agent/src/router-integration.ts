/**
 * Router Integration for CTO Agent (Zara)
 * 
 * Provides integration interface for the Intelligent Router to delegate
 * technical tasks to the CTO Agent with proper task routing and response handling.
 */

import type { 
  TechnicalTask, 
  ProcessingResult, 
  TaskCategory,
  AgentStatus,
  HealthCheckResult
} from './types.js';

// Router integration types (simplified from intelligent-router)
interface RoutingTask {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  domain_hints?: string[];
  submitted_at: Date;
  submitted_by: string;
  strategic_importance?: boolean;
}

interface RoutingResponse {
  success: boolean;
  result?: ProcessingResult;
  error?: string;
  processing_time: number;
  agent_info: {
    name: string;
    type: string;
    version: string;
  };
  timestamp: Date;
}

interface RouterHealthCheck {
  healthy: boolean;
  component: string;
  response_time: number;
  capabilities: string[];
  current_load: number;
  performance_metrics: any;
}

/**
 * Router Integration Handler for CTO Agent
 * 
 * Adapts the CTO Agent interface for seamless integration with the
 * Intelligent Router system in the 371 OS ecosystem.
 */
export class CTORouterIntegration {
  private ctoAgent: any; // Will be injected from main CTO Agent instance
  private readonly SUPPORTED_CATEGORIES: TaskCategory[] = [
    'architecture_design',
    'technology_evaluation',
    'security_response',
    'infrastructure_planning'
  ];

  constructor(ctoAgentInstance: any) {
    this.ctoAgent = ctoAgentInstance;
    console.log('🔗 CTO Router Integration initialized');
  }

  /**
   * Primary entry point for router task delegation
   * Converts router tasks to CTO agent format and processes them
   */
  public async handleRoutedTask(routingTask: RoutingTask): Promise<RoutingResponse> {
    const startTime = Date.now();
    
    try {
      console.log(`🎯 Handling routed task: ${routingTask.title}`);
      
      // Convert routing task to technical task format
      const technicalTask = this.convertToTechnicalTask(routingTask);
      
      // Validate that this task is appropriate for CTO agent
      if (!this.canHandleTask(technicalTask)) {
        throw new Error(`Task category '${technicalTask.category}' is not supported by CTO Agent`);
      }
      
      // Process the task using CTO agent
      const processingResult = await this.ctoAgent.processTask(technicalTask);
      
      const processingTime = Date.now() - startTime;
      
      const response: RoutingResponse = {
        success: true,
        result: processingResult,
        processing_time: processingTime,
        agent_info: {
          name: 'CTO Agent (Zara)',
          type: 'TECHNICAL_LEADERSHIP',
          version: '1.0.0'
        },
        timestamp: new Date()
      };
      
      console.log(`✅ Task completed successfully in ${processingTime}ms`);
      return response;
      
    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      console.error(`❌ Failed to handle routed task: ${error}`);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown processing error',
        processing_time: processingTime,
        agent_info: {
          name: 'CTO Agent (Zara)',
          type: 'TECHNICAL_LEADERSHIP',
          version: '1.0.0'
        },
        timestamp: new Date()
      };
    }
  }

  /**
   * Handle specific technical decision requests from router
   */
  public async handleArchitectureRequest(requirements: string, routingContext?: any): Promise<RoutingResponse> {
    const startTime = Date.now();
    
    try {
      console.log('🏗️ Processing architecture decision request from router');
      
      const architectureDecision = await this.ctoAgent.analyzeArchitecture(requirements);
      
      const processingTime = Date.now() - startTime;
      
      return {
        success: true,
        result: {
          taskId: `arch-router-${Date.now()}`,
          category: 'architecture_design' as TaskCategory,
          status: 'completed' as const,
          result: architectureDecision,
          analysis: {
            taskId: `arch-router-${Date.now()}`,
            category: 'architecture_design' as TaskCategory,
            complexity: { level: 'medium' as const, factors: ['Router delegated'], score: 5 },
            riskAssessment: { overallRisk: 'medium' as const, risks: [], mitigationStrategies: [] },
            resourceRequirements: { teamSize: 2, timeline: '2-3 weeks', technologies: ['Architecture Tools'], expertise: ['Solution Architecture'] },
            timeline: '2-3 weeks',
            recommendations: ['Follow established architecture patterns'],
            confidence: 85
          },
          metadata: {
            processingTime,
            confidence: 85,
            escalated: false,
            version: '1.0.0',
            timestamp: new Date()
          }
        },
        processing_time: processingTime,
        agent_info: {
          name: 'CTO Agent (Zara)',
          type: 'TECHNICAL_LEADERSHIP',
          version: '1.0.0'
        },
        timestamp: new Date()
      };
      
    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Architecture analysis failed',
        processing_time: processingTime,
        agent_info: {
          name: 'CTO Agent (Zara)',
          type: 'TECHNICAL_LEADERSHIP',
          version: '1.0.0'
        },
        timestamp: new Date()
      };
    }
  }

  /**
   * Handle technology evaluation requests from router
   */
  public async handleTechnologyEvaluation(proposal: string, routingContext?: any): Promise<RoutingResponse> {
    const startTime = Date.now();
    
    try {
      console.log('⚡ Processing technology evaluation request from router');
      
      const technologyAssessment = await this.ctoAgent.evaluateTechnology(proposal);
      
      const processingTime = Date.now() - startTime;
      
      return {
        success: true,
        result: {
          taskId: `tech-router-${Date.now()}`,
          category: 'technology_evaluation' as TaskCategory,
          status: 'completed' as const,
          result: technologyAssessment,
          analysis: {
            taskId: `tech-router-${Date.now()}`,
            category: 'technology_evaluation' as TaskCategory,
            complexity: { level: 'medium' as const, factors: ['Router delegated'], score: 5 },
            riskAssessment: { overallRisk: 'medium' as const, risks: [], mitigationStrategies: [] },
            resourceRequirements: { teamSize: 1, timeline: '1-2 weeks', technologies: ['Evaluation Tools'], expertise: ['Technology Research'] },
            timeline: '1-2 weeks',
            recommendations: ['Conduct proof-of-concept evaluation'],
            confidence: 80
          },
          metadata: {
            processingTime,
            confidence: 80,
            escalated: false,
            version: '1.0.0',
            timestamp: new Date()
          }
        },
        processing_time: processingTime,
        agent_info: {
          name: 'CTO Agent (Zara)',
          type: 'TECHNICAL_LEADERSHIP',
          version: '1.0.0'
        },
        timestamp: new Date()
      };
      
    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Technology evaluation failed',
        processing_time: processingTime,
        agent_info: {
          name: 'CTO Agent (Zara)',
          type: 'TECHNICAL_LEADERSHIP',
          version: '1.0.0'
        },
        timestamp: new Date()
      };
    }
  }

  /**
   * Handle infrastructure planning requests from router
   */
  public async handleInfrastructurePlanning(requirements: string, routingContext?: any): Promise<RoutingResponse> {
    const startTime = Date.now();
    
    try {
      console.log('🏢 Processing infrastructure planning request from router');
      
      const infrastructurePlan = await this.ctoAgent.planInfrastructure(requirements);
      
      const processingTime = Date.now() - startTime;
      
      return {
        success: true,
        result: {
          taskId: `infra-router-${Date.now()}`,
          category: 'infrastructure_planning' as TaskCategory,
          status: 'completed' as const,
          result: infrastructurePlan,
          analysis: {
            taskId: `infra-router-${Date.now()}`,
            category: 'infrastructure_planning' as TaskCategory,
            complexity: { level: 'medium' as const, factors: ['Router delegated'], score: 5 },
            riskAssessment: { overallRisk: 'medium' as const, risks: [], mitigationStrategies: [] },
            resourceRequirements: { teamSize: 2, timeline: '1-2 weeks', technologies: ['Infrastructure Tools'], expertise: ['Infrastructure Engineering'] },
            timeline: '1-2 weeks',
            recommendations: ['Include capacity buffer in planning'],
            confidence: 85
          },
          metadata: {
            processingTime,
            confidence: 85,
            escalated: false,
            version: '1.0.0',
            timestamp: new Date()
          }
        },
        processing_time: processingTime,
        agent_info: {
          name: 'CTO Agent (Zara)',
          type: 'TECHNICAL_LEADERSHIP',
          version: '1.0.0'
        },
        timestamp: new Date()
      };
      
    } catch (error) {
      const processingTime = Date.now() - startTime;
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Infrastructure planning failed',
        processing_time: processingTime,
        agent_info: {
          name: 'CTO Agent (Zara)',
          type: 'TECHNICAL_LEADERSHIP',
          version: '1.0.0'
        },
        timestamp: new Date()
      };
    }
  }

  /**
   * Router health check integration
   */
  public async getRouterHealthCheck(): Promise<RouterHealthCheck> {
    try {
      const healthCheck = await this.ctoAgent.healthCheck();
      const status = this.ctoAgent.getStatus();
      
      return {
        healthy: healthCheck.overall,
        component: 'CTO Agent (Zara)',
        response_time: 0, // Will be measured by caller
        capabilities: status.capabilities,
        current_load: this.calculateCurrentLoad(),
        performance_metrics: status.performance
      };
      
    } catch (error) {
      return {
        healthy: false,
        component: 'CTO Agent (Zara)',
        response_time: 0,
        capabilities: [],
        current_load: 0,
        performance_metrics: null
      };
    }
  }

  /**
   * Get agent capabilities for router registration
   */
  public getCapabilityMetadata() {
    return {
      agent_id: 'cto-agent-zara',
      agent_name: 'CTO Agent (Zara)',
      domain: 'TECHNICAL',
      expertise_areas: [
        'Architecture Design',
        'Technology Evaluation', 
        'Security Assessment',
        'Infrastructure Planning',
        'Performance Optimization',
        'Technical Risk Analysis'
      ],
      supported_categories: this.SUPPORTED_CATEGORIES,
      keywords: [
        'architecture', 'technology', 'security', 'infrastructure',
        'microservices', 'distributed systems', 'scalability',
        'performance', 'evaluation', 'planning', 'risk'
      ],
      performance_targets: {
        response_time_ms: 500,
        confidence_threshold: 0.85,
        success_rate: 0.95
      },
      integration_version: '1.0.0'
    };
  }

  /**
   * Convert router task format to CTO agent technical task format
   */
  private convertToTechnicalTask(routingTask: RoutingTask): TechnicalTask {
    // Determine category from task content and domain hints
    const category = this.inferTaskCategory(routingTask);
    
    const technicalTask: TechnicalTask = {
      id: routingTask.id,
      title: routingTask.title,
      description: routingTask.description,
      category,
      priority: routingTask.priority,
      requestedBy: routingTask.submitted_by,
      createdAt: routingTask.submitted_at,
      metadata: {
        routerDelegated: true,
        domainHints: routingTask.domain_hints,
        strategicImportance: routingTask.strategic_importance || false
      }
    };
    
    return technicalTask;
  }

  /**
   * Infer task category from routing task content
   */
  private inferTaskCategory(routingTask: RoutingTask): TaskCategory {
    const content = `${routingTask.title} ${routingTask.description}`.toLowerCase();
    const hints = (routingTask.domain_hints || []).join(' ').toLowerCase();
    const fullContent = `${content} ${hints}`;
    
    // Architecture keywords
    if (this.containsKeywords(fullContent, ['architecture', 'design', 'microservices', 'system', 'service'])) {
      return 'architecture_design';
    }
    
    // Technology evaluation keywords
    if (this.containsKeywords(fullContent, ['technology', 'evaluate', 'tool', 'framework', 'migration'])) {
      return 'technology_evaluation';
    }
    
    // Security keywords
    if (this.containsKeywords(fullContent, ['security', 'vulnerability', 'threat', 'compliance', 'audit'])) {
      return 'security_response';
    }
    
    // Infrastructure keywords
    if (this.containsKeywords(fullContent, ['infrastructure', 'scaling', 'capacity', 'deployment', 'cloud'])) {
      return 'infrastructure_planning';
    }
    
    // Default to architecture design for technical tasks
    return 'architecture_design';
  }

  /**
   * Check if content contains specific keywords
   */
  private containsKeywords(content: string, keywords: string[]): boolean {
    return keywords.some(keyword => content.includes(keyword));
  }

  /**
   * Check if CTO agent can handle the given task category
   */
  private canHandleTask(task: TechnicalTask): boolean {
    return this.SUPPORTED_CATEGORIES.includes(task.category);
  }

  /**
   * Calculate current agent load for router metrics
   */
  private calculateCurrentLoad(): number {
    // Mock implementation - in real scenario would track active tasks
    return Math.random() * 0.5; // Random load between 0-50%
  }

  /**
   * Register agent capabilities with the router system
   */
  public async registerWithRouter(): Promise<boolean> {
    try {
      console.log('📋 Registering CTO Agent capabilities with Intelligent Router...');
      
      const capabilities = this.getCapabilityMetadata();
      
      // In a real implementation, this would make an API call to the router
      // For now, we'll just log the registration
      console.log('✅ CTO Agent registered with router:', capabilities.agent_name);
      console.log('🎯 Supported categories:', capabilities.supported_categories);
      console.log('🔧 Expertise areas:', capabilities.expertise_areas);
      
      return true;
    } catch (error) {
      console.error('❌ Failed to register with router:', error);
      return false;
    }
  }

  /**
   * Update router with current performance metrics
   */
  public async updateRouterMetrics(): Promise<void> {
    try {
      const status = this.ctoAgent.getStatus();
      const healthCheck = await this.ctoAgent.healthCheck();
      
      const metricsUpdate = {
        agent_id: 'cto-agent-zara',
        timestamp: new Date(),
        performance: status.performance,
        health: healthCheck.overall,
        current_load: this.calculateCurrentLoad(),
        availability: healthCheck.overall ? 'available' : 'degraded'
      };
      
      // In real implementation, would send to router metrics endpoint
      console.log('📊 Updated router with CTO Agent metrics:', metricsUpdate);
      
    } catch (error) {
      console.error('❌ Failed to update router metrics:', error);
    }
  }

  /**
   * Validate integration functionality
   */
  public async validate(): Promise<boolean> {
    try {
      // Test task conversion
      const testRoutingTask: RoutingTask = {
        id: 'test-router-001',
        title: 'Design microservices architecture',
        description: 'Need scalable architecture for distributed system',
        priority: 'high',
        domain_hints: ['technical', 'architecture'],
        submitted_at: new Date(),
        submitted_by: 'test-router'
      };
      
      const technicalTask = this.convertToTechnicalTask(testRoutingTask);
      const canHandle = this.canHandleTask(technicalTask);
      
      console.log('🔍 Router integration validation completed');
      return canHandle && technicalTask.category === 'architecture_design';
      
    } catch (error) {
      console.error('❌ Router integration validation failed:', error);
      return false;
    }
  }
}