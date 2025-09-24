/**
 * CTO Agent (Zara) - Main Entry Point
 *
 * Chief Technology Officer agent providing technical leadership, architecture decisions,
 * technology evaluation, security oversight, and infrastructure planning.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'yaml';
import { TechnicalTaskProcessor } from './technical-task-processor.js';
import { TechnicalAnalyzer } from './technical-analyzer.js';
import type { 
  AgentDefinition, 
  TechnicalTask, 
  ProcessingResult,
  ArchitectureDecision,
  TechnologyAssessment,
  InfrastructurePlan,
  HealthCheckResult,
  AgentStatus,
  TaskCategory
} from './types.js';

/**
 * CTO Agent Implementation
 * 
 * The 371 DAO's technical leadership engine that provides strategic technology
 * decisions, architecture guidance, and infrastructure planning.
 */
export class CTOAgent {
  private agentDefinition: AgentDefinition;
  private taskProcessor: TechnicalTaskProcessor;
  private technicalAnalyzer: TechnicalAnalyzer;
  private performanceMetrics: {
    tasksProcessed: number;
    averageResponseTime: number;
    successRate: number;
    escalationRate: number;
  };

  constructor() {
    // Load agent definition from centralized prompt library
    this.agentDefinition = this.loadAgentDefinition();
    
    // Initialize core components
    this.taskProcessor = new TechnicalTaskProcessor();
    this.technicalAnalyzer = new TechnicalAnalyzer();
    
    // Initialize performance tracking
    this.performanceMetrics = {
      tasksProcessed: 0,
      averageResponseTime: 0,
      successRate: 1.0,
      escalationRate: 0.0
    };

    console.log('⚡ CTO Agent (Zara) initialized successfully');
    console.log('🎯 Ready for technical leadership and strategic decisions');
  }

  /**
   * Load the agent definition from the centralized prompt library
   */
  private loadAgentDefinition(): AgentDefinition {
    const agentDefinitionPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'libs',
      'prompts',
      'agent-definitions',
      'zara_cto.yml'
    );

    if (!fs.existsSync(agentDefinitionPath)) {
      throw new Error(`CTO Agent definition file not found: ${agentDefinitionPath}`);
    }

    try {
      const yamlContent = fs.readFileSync(agentDefinitionPath, 'utf8');
      const parsedDefinition = parse(yamlContent);
      
      console.log('✅ CTO Agent definition loaded successfully');
      console.log(`📋 Agent: ${parsedDefinition.agent_name} (${parsedDefinition.agent_type})`);
      
      return {
        agent_name: parsedDefinition.agent_name || 'Zara (CTO)',
        agent_type: parsedDefinition.agent_type || 'TECHNICAL_LEADERSHIP',
        core_instructions: parsedDefinition.core_instructions || '',
        personality_traits: parsedDefinition.personality_traits || [],
        required_tools: parsedDefinition.required_tools || []
      };
    } catch (error) {
      console.error('❌ Failed to parse CTO agent definition:', error);
      throw new Error(`Failed to load CTO agent definition: ${error}`);
    }
  }

  /**
   * Process a technical task with appropriate analysis and decision-making
   */
  public async processTask(task: TechnicalTask): Promise<ProcessingResult> {
    const startTime = Date.now();
    
    try {
      console.log(`🚀 Processing technical task: ${task.title}`);
      console.log(`🏷️ Category: ${task.category} | Priority: ${task.priority}`);
      
      // Validate input
      this.validateTaskInput(task);
      
      // Generate comprehensive technical analysis
      const analysis = await this.taskProcessor.generateAnalysis(task);
      console.log(`📊 Analysis completed with ${analysis.confidence}% confidence`);
      
      // Generate appropriate decision based on task category
      let result: ArchitectureDecision | TechnologyAssessment | InfrastructurePlan;
      
      switch (analysis.category) {
        case 'architecture_design':
          result = await this.technicalAnalyzer.analyzeArchitecture(task);
          break;
          
        case 'technology_evaluation':
          result = await this.technicalAnalyzer.evaluateTechnology(task);
          break;
          
        case 'infrastructure_planning':
          result = await this.technicalAnalyzer.planInfrastructure(task);
          break;
          
        case 'security_response':
          // Use architecture analyzer for security tasks (can be extended)
          result = await this.technicalAnalyzer.analyzeArchitecture(task);
          break;
          
        default:
          throw new Error(`Unsupported task category: ${analysis.category}`);
      }
      
      const processingTime = Date.now() - startTime;
      
      // Update performance metrics
      this.updatePerformanceMetrics(processingTime, true);
      
      const processingResult: ProcessingResult = {
        taskId: task.id,
        category: analysis.category,
        status: 'completed',
        result,
        analysis,
        metadata: {
          processingTime,
          confidence: analysis.confidence,
          escalated: this.shouldEscalate(analysis, task),
          version: '1.0.0',
          timestamp: new Date()
        }
      };
      
      console.log(`✅ Task processing completed in ${processingTime}ms`);
      console.log(`🎯 Decision confidence: ${analysis.confidence}%`);
      
      if (processingResult.metadata.escalated) {
        console.log('⚠️ Task escalated for executive review');
      }
      
      return processingResult;
      
    } catch (error) {
      const processingTime = Date.now() - startTime;
      this.updatePerformanceMetrics(processingTime, false);
      
      console.error('❌ Failed to process technical task:', error);
      throw error;
    }
  }

  /**
   * Generate architecture decision for design tasks
   */
  public async analyzeArchitecture(requirements: string): Promise<ArchitectureDecision> {
    console.log('🏗️ Generating architecture decision for requirements');
    
    const mockTask: TechnicalTask = {
      id: `arch-${Date.now()}`,
      title: 'Architecture Design Request',
      description: requirements,
      category: 'architecture_design',
      priority: 'medium',
      requestedBy: 'system',
      createdAt: new Date()
    };
    
    return await this.technicalAnalyzer.analyzeArchitecture(mockTask);
  }

  /**
   * Evaluate technology options and provide recommendations
   */
  public async evaluateTechnology(proposal: string): Promise<TechnologyAssessment> {
    console.log('⚡ Evaluating technology proposal');
    
    const mockTask: TechnicalTask = {
      id: `tech-${Date.now()}`,
      title: 'Technology Evaluation Request',
      description: proposal,
      category: 'technology_evaluation',
      priority: 'medium',
      requestedBy: 'system',
      createdAt: new Date()
    };
    
    return await this.technicalAnalyzer.evaluateTechnology(mockTask);
  }

  /**
   * Plan infrastructure architecture and scaling
   */
  public async planInfrastructure(requirements: string): Promise<InfrastructurePlan> {
    console.log('🏢 Planning infrastructure architecture');
    
    const mockTask: TechnicalTask = {
      id: `infra-${Date.now()}`,
      title: 'Infrastructure Planning Request',
      description: requirements,
      category: 'infrastructure_planning',
      priority: 'medium',
      requestedBy: 'system',
      createdAt: new Date()
    };
    
    return await this.technicalAnalyzer.planInfrastructure(mockTask);
  }

  /**
   * Validate technical task input
   */
  private validateTaskInput(task: TechnicalTask): void {
    if (!task) {
      throw new Error('Technical task is required');
    }
    
    if (!task.id || task.id.trim() === '') {
      throw new Error('Task ID is required and cannot be empty');
    }
    
    if (!task.title || task.title.trim() === '') {
      throw new Error('Task title is required and cannot be empty');
    }
    
    if (!task.description || task.description.trim() === '') {
      throw new Error('Task description is required and cannot be empty');
    }
    
    const validPriorities = ['low', 'medium', 'high', 'critical'];
    if (!validPriorities.includes(task.priority)) {
      throw new Error(`Invalid priority: must be one of ${validPriorities.join(', ')}`);
    }
    
    if (!task.requestedBy || task.requestedBy.trim() === '') {
      throw new Error('Task requestedBy is required and cannot be empty');
    }
  }

  /**
   * Determine if task requires escalation
   */
  private shouldEscalate(analysis: any, task: TechnicalTask): boolean {
    // Escalate high-risk critical tasks
    if (task.priority === 'critical' && analysis.riskAssessment?.overallRisk === 'high') {
      return true;
    }
    
    // Escalate low-confidence decisions
    if (analysis.confidence < 70) {
      return true;
    }
    
    // Escalate complex architecture decisions
    if (analysis.category === 'architecture_design' && analysis.complexity?.level === 'high') {
      return true;
    }
    
    return false;
  }

  /**
   * Update performance metrics
   */
  private updatePerformanceMetrics(processingTime: number, success: boolean): void {
    this.performanceMetrics.tasksProcessed++;
    
    // Update average response time
    const previousTotal = this.performanceMetrics.averageResponseTime * (this.performanceMetrics.tasksProcessed - 1);
    this.performanceMetrics.averageResponseTime = (previousTotal + processingTime) / this.performanceMetrics.tasksProcessed;
    
    // Update success rate
    const successCount = Math.floor(this.performanceMetrics.successRate * (this.performanceMetrics.tasksProcessed - 1));
    const newSuccessCount = success ? successCount + 1 : successCount;
    this.performanceMetrics.successRate = newSuccessCount / this.performanceMetrics.tasksProcessed;
  }

  /**
   * Health check for the CTO agent
   */
  public async healthCheck(): Promise<HealthCheckResult> {
    try {
      console.log('🔍 Performing CTO Agent health check...');
      
      const checks = await Promise.all([
        this.checkAgentDefinition(),
        this.checkTaskProcessor(),
        this.checkTechnicalAnalyzer(),
        this.checkPerformanceMetrics()
      ]);
      
      const allHealthy = checks.every(check => check.status);
      const status = allHealthy ? 'healthy' : 'degraded';
      
      const result: HealthCheckResult = {
        status,
        checks,
        overall: allHealthy,
        timestamp: new Date()
      };
      
      console.log(allHealthy ? '💚 CTO Agent health check passed' : '💔 CTO Agent health check failed');
      return result;
      
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return {
        status: 'unhealthy',
        checks: [{ component: 'health_check', status: false, message: `Health check failed: ${error}` }],
        overall: false,
        timestamp: new Date()
      };
    }
  }

  /**
   * Individual health check methods
   */
  private async checkAgentDefinition() {
    return {
      component: 'agent_definition',
      status: this.agentDefinition && this.agentDefinition.agent_name !== '',
      message: this.agentDefinition ? 'Agent definition loaded' : 'Agent definition missing'
    };
  }

  private async checkTaskProcessor() {
    try {
      const isValid = await this.taskProcessor.validate();
      return {
        component: 'task_processor',
        status: isValid,
        message: isValid ? 'Task processor operational' : 'Task processor validation failed'
      };
    } catch (error) {
      return {
        component: 'task_processor',
        status: false,
        message: `Task processor error: ${error}`
      };
    }
  }

  private async checkTechnicalAnalyzer() {
    try {
      const isValid = await this.technicalAnalyzer.validate();
      return {
        component: 'technical_analyzer',
        status: isValid,
        message: isValid ? 'Technical analyzer operational' : 'Technical analyzer validation failed'
      };
    } catch (error) {
      return {
        component: 'technical_analyzer',
        status: false,
        message: `Technical analyzer error: ${error}`
      };
    }
  }

  private async checkPerformanceMetrics() {
    return {
      component: 'performance_metrics',
      status: this.performanceMetrics.successRate >= 0.8,
      message: `Success rate: ${(this.performanceMetrics.successRate * 100).toFixed(1)}%`
    };
  }

  /**
   * Get agent status and capabilities
   */
  public getStatus(): AgentStatus {
    return {
      name: this.agentDefinition.agent_name,
      type: this.agentDefinition.agent_type,
      status: 'operational',
      capabilities: [
        'Architecture Design & Review',
        'Technology Evaluation & Selection',
        'Infrastructure Planning & Scaling',
        'Security Assessment & Response',
        'Technical Risk Analysis',
        'Performance Optimization Strategy'
      ],
      performance: this.performanceMetrics,
      version: '1.0.0',
      lastUpdate: new Date().toISOString()
    };
  }

  /**
   * Get detailed capability information
   */
  public getCapabilities() {
    return {
      technical_domains: [
        'Microservices Architecture',
        'Distributed Systems Design',
        'Cloud Infrastructure Planning',
        'Security Architecture',
        'Performance Optimization',
        'Technology Strategy'
      ],
      decision_types: [
        'Architecture Design Decisions',
        'Technology Adoption Recommendations',
        'Infrastructure Scaling Strategies',
        'Security Risk Assessments'
      ],
      integration_points: [
        'Intelligent Task Router',
        'Agent Registry',
        'Performance Monitoring',
        'Knowledge Base'
      ],
      performance_targets: {
        response_time_ms: 500,
        decision_confidence_threshold: 0.85,
        escalation_rate_target: 0.05
      }
    };
  }
}

/**
 * Legacy function export for compatibility
 */
export default function ctoAgent() {
  console.log('🚀 Initializing CTO Agent (Zara)...');
  const agent = new CTOAgent();
  return agent;
}

// For testing purposes
if (require.main === module) {
  async function main() {
    const agent = new CTOAgent();
    
    console.log('🔧 CTO Agent Status:', agent.getStatus());
    console.log('⚡ CTO Agent Capabilities:', agent.getCapabilities());
    
    // Perform health check
    const healthCheck = await agent.healthCheck();
    console.log('💊 Health Check Result:', healthCheck);
    
    if (healthCheck.overall) {
      console.log('🎉 CTO Agent is ready for technical leadership!');
      
      // Demo task processing
      const demoTask: TechnicalTask = {
        id: 'demo-001',
        title: 'Design scalable microservices architecture',
        description: 'Need to design a high-performance, distributed architecture for our new platform with real-time processing capabilities',
        category: 'architecture_design',
        priority: 'high',
        requestedBy: 'demo-user',
        createdAt: new Date()
      };
      
      console.log('🚀 Processing demo architecture task...');
      const result = await agent.processTask(demoTask);
      console.log('✅ Demo task completed:', result.status);
      console.log('📊 Processing time:', result.metadata.processingTime, 'ms');
      console.log('🎯 Confidence:', result.metadata.confidence, '%');
      
    } else {
      console.log('🔧 CTO Agent requires maintenance before operational use');
    }
  }
  
  main().catch(console.error);
}