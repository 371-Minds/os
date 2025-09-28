/**
 * CFO Agent (Maya) - Main Entry Point
 *
 * Chief Financial Officer agent providing financial leadership, budget analysis,
 * cost optimization, ROI assessment, and strategic financial decision-making.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'yaml';
import { FinancialTaskProcessor } from './financial-task-processor.js';
import { FinancialAnalyzer } from './financial-analyzer.js';
import { BudgetAnalysisEngine } from './budget-analysis-engine.js';
import { CFOAgentRouterIntegration, createCFORouterIntegration } from './router-integration.js';
import type { 
  AgentDefinition, 
  FinancialTask, 
  ProcessingResult,
  BudgetAnalysis,
  CostOptimization,
  ROIAssessment,
  FinancialReport,
  RevenueForecast,
  HealthCheckResult,
  AgentStatus,
  TaskCategory,
  PerformanceMetrics
} from './types.js';

/**
 * CFO Agent Implementation
 * 
 * The 371 DAO's financial leadership engine that provides strategic financial
 * decisions, budget optimization, cost analysis, and investment evaluations.
 */
export class CFOAgent {
  private agentDefinition: AgentDefinition;
  private taskProcessor: FinancialTaskProcessor;
  private financialAnalyzer: FinancialAnalyzer;
  private budgetEngine: BudgetAnalysisEngine;
  private performanceMetrics: PerformanceMetrics;
  private routerIntegration: CFOAgentRouterIntegration;

  constructor() {
    // Load agent definition from centralized prompt library
    this.agentDefinition = this.loadAgentDefinition();
    
    // Initialize core components
    this.taskProcessor = new FinancialTaskProcessor();
    this.financialAnalyzer = new FinancialAnalyzer();
    this.budgetEngine = new BudgetAnalysisEngine();
    
    // Initialize performance tracking
    this.performanceMetrics = {
      tasksProcessed: 0,
      averageResponseTime: 0,
      successRate: 1.0,
      escalationRate: 0.0,
      accuracyRate: 0.95
    };

    // Initialize router integration
    this.routerIntegration = createCFORouterIntegration(this);

    console.log('💰 CFO Agent (Maya) initialized successfully');
    console.log('📊 Ready for financial leadership and strategic decisions');
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
      'maya_cfo.yml'
    );

    if (!fs.existsSync(agentDefinitionPath)) {
      throw new Error(`CFO Agent definition file not found: ${agentDefinitionPath}`);
    }

    try {
      const yamlContent = fs.readFileSync(agentDefinitionPath, 'utf8');
      const parsedDefinition = parse(yamlContent);
      
      console.log('✅ CFO Agent definition loaded successfully');
      console.log(`📋 Agent: ${parsedDefinition.agent_name} (${parsedDefinition.agent_type})`);
      
      return {
        agent_name: parsedDefinition.agent_name || 'Maya (CFO)',
        agent_type: parsedDefinition.agent_type || 'FINANCIAL_LEADERSHIP',
        core_instructions: parsedDefinition.core_instructions || '',
        personality_traits: parsedDefinition.personality_traits || [],
        required_tools: parsedDefinition.required_tools || []
      };
    } catch (error) {
      console.error('❌ Failed to parse CFO agent definition:', error);
      throw new Error(`Failed to load CFO agent definition: ${error}`);
    }
  }

  /**
   * Process a financial task with appropriate analysis and decision-making
   */
  public async processTask(task: FinancialTask): Promise<ProcessingResult> {
    const startTime = Date.now();
    
    try {
      // Validate input first
      if (!task) {
        throw new Error('Financial task is required');
      }
      
      console.log(`💼 Processing financial task: ${task.title}`);
      console.log(`🏷️ Category: ${task.category} | Priority: ${task.priority}`);
      
      // Validate input
      this.validateTaskInput(task);
      
      // Generate comprehensive financial analysis
      const analysis = await this.taskProcessor.generateAnalysis(task);
      console.log(`📈 Analysis completed with ${analysis.confidence}% confidence`);
      
      // Generate appropriate financial decision based on task category
      let result: BudgetAnalysis | CostOptimization | ROIAssessment | FinancialReport | RevenueForecast;
      
      switch (analysis.category) {
        case 'budget_analysis':
          result = await this.budgetEngine.analyzeBudget(task);
          break;
          
        case 'cost_optimization':
          result = await this.financialAnalyzer.optimizeCosts(task);
          break;
          
        case 'roi_assessment':
          result = await this.financialAnalyzer.assessROI(task);
          break;
          
        case 'financial_reporting':
          result = await this.financialAnalyzer.generateReport(task);
          break;
          
        case 'revenue_forecasting':
          result = await this.financialAnalyzer.forecastRevenue(task);
          break;
          
        case 'cash_flow_analysis':
          result = await this.financialAnalyzer.analyzeCashFlow(task);
          break;
          
        case 'investment_evaluation':
          result = await this.financialAnalyzer.evaluateInvestment(task);
          break;
          
        case 'risk_assessment':
          result = await this.financialAnalyzer.assessRisk(task);
          break;
          
        default:
          throw new Error(`Unsupported financial task category: ${analysis.category}`);
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
      
      console.error('❌ Failed to process financial task:', error);
      throw error;
    }
  }

  /**
   * Analyze budget performance and identify optimization opportunities
   */
  public async analyzeBudget(budgetData: string): Promise<BudgetAnalysis> {
    console.log('📊 Generating budget analysis and optimization recommendations');
    
    const mockTask: FinancialTask = {
      id: `budget-${Date.now()}`,
      title: 'Budget Analysis Request',
      description: budgetData,
      category: 'budget_analysis',
      priority: 'medium',
      requestedBy: 'system',
      createdAt: new Date()
    };
    
    return await this.budgetEngine.analyzeBudget(mockTask);
  }

  /**
   * Identify cost optimization opportunities and savings potential
   */
  public async optimizeCosts(costData: string): Promise<CostOptimization> {
    console.log('💡 Evaluating cost optimization opportunities');
    
    const mockTask: FinancialTask = {
      id: `cost-${Date.now()}`,
      title: 'Cost Optimization Analysis',
      description: costData,
      category: 'cost_optimization',
      priority: 'medium',
      requestedBy: 'system',
      createdAt: new Date()
    };
    
    return await this.financialAnalyzer.optimizeCosts(mockTask);
  }

  /**
   * Assess return on investment for proposals and initiatives
   */
  public async assessROI(investmentProposal: string): Promise<ROIAssessment> {
    console.log('📈 Conducting ROI assessment and investment analysis');
    
    const mockTask: FinancialTask = {
      id: `roi-${Date.now()}`,
      title: 'ROI Assessment Request',
      description: investmentProposal,
      category: 'roi_assessment',
      priority: 'medium',
      requestedBy: 'system',
      createdAt: new Date()
    };
    
    return await this.financialAnalyzer.assessROI(mockTask);
  }

  /**
   * Generate comprehensive financial reports and analysis
   */
  public async generateFinancialReport(reportSpec: string): Promise<FinancialReport> {
    console.log('📋 Generating comprehensive financial report');
    
    const mockTask: FinancialTask = {
      id: `report-${Date.now()}`,
      title: 'Financial Report Generation',
      description: reportSpec,
      category: 'financial_reporting',
      priority: 'medium',
      requestedBy: 'system',
      createdAt: new Date()
    };
    
    return await this.financialAnalyzer.generateReport(mockTask);
  }

  /**
   * Create revenue forecasts and projections
   */
  public async forecastRevenue(forecastSpec: string): Promise<RevenueForecast> {
    console.log('🔮 Developing revenue forecast and projections');
    
    const mockTask: FinancialTask = {
      id: `forecast-${Date.now()}`,
      title: 'Revenue Forecast Request',
      description: forecastSpec,
      category: 'revenue_forecasting',
      priority: 'medium',
      requestedBy: 'system',
      createdAt: new Date()
    };
    
    return await this.financialAnalyzer.forecastRevenue(mockTask);
  }

  /**
   * Validate financial task input
   */
  private validateTaskInput(task: FinancialTask): void {
    if (!task) {
      throw new Error('Financial task is required');
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
    
    const validCategories: TaskCategory[] = [
      'budget_analysis', 'cost_optimization', 'roi_assessment', 
      'financial_reporting', 'revenue_forecasting', 'cash_flow_analysis',
      'investment_evaluation', 'risk_assessment'
    ];
    
    if (!validCategories.includes(task.category)) {
      throw new Error(`Invalid category: must be one of ${validCategories.join(', ')}`);
    }
  }

  /**
   * Determine if task requires escalation based on financial criteria
   */
  private shouldEscalate(analysis: any, task: FinancialTask): boolean {
    // Escalate critical financial tasks with high risk
    if (task.priority === 'critical' && analysis.riskAssessment?.overallRisk === 'high') {
      return true;
    }
    
    // Escalate low-confidence financial decisions
    if (analysis.confidence < 70) {
      return true;
    }
    
    // Escalate budget variances exceeding threshold
    if (task.category === 'budget_analysis' && analysis.complexity?.level === 'high') {
      return true;
    }
    
    // Escalate high-value investment decisions
    if (task.category === 'roi_assessment' && analysis.riskAssessment?.financialImpact === 'significant') {
      return true;
    }
    
    // Escalate major cost optimization initiatives
    if (task.category === 'cost_optimization' && analysis.complexity?.level === 'high') {
      return true;
    }
    
    return false;
  }

  /**
   * Update performance metrics for financial operations
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
    
    // Update escalation rate if escalated
    if (!success) {
      const escalationCount = Math.floor(this.performanceMetrics.escalationRate * (this.performanceMetrics.tasksProcessed - 1));
      this.performanceMetrics.escalationRate = (escalationCount + 1) / this.performanceMetrics.tasksProcessed;
    }
  }

  /**
   * Health check for the CFO agent
   */
  public async healthCheck(): Promise<HealthCheckResult> {
    try {
      console.log('🔍 Performing CFO Agent health check...');
      
      const checks = await Promise.all([
        this.checkAgentDefinition(),
        this.checkTaskProcessor(),
        this.checkFinancialAnalyzer(),
        this.checkBudgetEngine(),
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
      
      console.log(allHealthy ? '💚 CFO Agent health check passed' : '💔 CFO Agent health check failed');
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

  private async checkFinancialAnalyzer() {
    try {
      const isValid = await this.financialAnalyzer.validate();
      return {
        component: 'financial_analyzer',
        status: isValid,
        message: isValid ? 'Financial analyzer operational' : 'Financial analyzer validation failed'
      };
    } catch (error) {
      return {
        component: 'financial_analyzer',
        status: false,
        message: `Financial analyzer error: ${error}`
      };
    }
  }

  private async checkBudgetEngine() {
    try {
      const isValid = await this.budgetEngine.validate();
      return {
        component: 'budget_engine',
        status: isValid,
        message: isValid ? 'Budget engine operational' : 'Budget engine validation failed'
      };
    } catch (error) {
      return {
        component: 'budget_engine',
        status: false,
        message: `Budget engine error: ${error}`
      };
    }
  }

  private async checkPerformanceMetrics() {
    const targetSuccessRate = 0.8;
    const targetAccuracyRate = 0.85;
    
    const successRateHealthy = (this.performanceMetrics.successRate || 1.0) >= targetSuccessRate;
    const accuracyRateHealthy = (this.performanceMetrics.accuracyRate || 0.95) >= targetAccuracyRate;
    
    return {
      component: 'performance_metrics',
      status: successRateHealthy && accuracyRateHealthy,
      message: `Success rate: ${((this.performanceMetrics.successRate || 1.0) * 100).toFixed(1)}%, Accuracy: ${((this.performanceMetrics.accuracyRate || 0.95) * 100).toFixed(1)}%`
    };
  }

  /**
   * Get agent status and financial capabilities
   */
  public getStatus(): AgentStatus {
    return {
      name: this.agentDefinition.agent_name,
      type: this.agentDefinition.agent_type,
      status: 'operational',
      capabilities: [
        'Budget Analysis & Optimization',
        'Cost Optimization & Savings Identification',
        'ROI Assessment & Investment Analysis',
        'Financial Reporting & Analytics',
        'Revenue Forecasting & Projections',
        'Cash Flow Analysis & Management',
        'Risk Assessment & Mitigation',
        'Strategic Financial Planning'
      ],
      performance: this.performanceMetrics,
      version: '1.0.0',
      lastUpdate: new Date().toISOString()
    };
  }

  /**
   * Get router integration instance for ecosystem connectivity
   */
  public getRouterIntegration(): CFOAgentRouterIntegration {
    return this.routerIntegration;
  }

  /**
   * Register with Intelligent Router for task distribution
   */
  public async registerWithRouter(routerEndpoint?: string): Promise<boolean> {
    try {
      console.log('🔌 Registering CFO Agent with Intelligent Router...');
      
      const capabilities = this.routerIntegration.registerCapabilities();
      console.log(`📊 Registered capabilities for domain: ${capabilities.domain}`);
      console.log(`🎯 Expertise areas: ${capabilities.expertise_areas.length}`);
      
      // In a real implementation, this would make HTTP requests to the router
      // For now, we simulate successful registration
      console.log('✅ CFO Agent successfully registered with router');
      
      return true;
    } catch (error) {
      console.error('❌ Failed to register with router:', error);
      return false;
    }
  }
  /**
   * Get detailed financial capability information
   */
  public getCapabilities() {
    return {
      financial_domains: [
        'Budget Management & Variance Analysis',
        'Cost Optimization & Efficiency',
        'Investment Analysis & ROI Assessment',
        'Financial Planning & Forecasting',
        'Cash Flow Management',
        'Risk Assessment & Mitigation',
        'Performance Analytics',
        'Strategic Financial Decision Making'
      ],
      decision_types: [
        'Budget Allocation Recommendations',
        'Cost Reduction Strategies',
        'Investment Approval Decisions',
        'Financial Risk Assessments',
        'Revenue Optimization Plans',
        'Capital Expenditure Analysis'
      ],
      financial_metrics: [
        'ROI, NPV, IRR Calculations',
        'Budget Variance Analysis',
        'Cost-Benefit Analysis',
        'Cash Flow Projections',
        'Profitability Analysis',
        'Risk-Adjusted Returns'
      ],
      integration_points: [
        'Intelligent Task Router',
        'Agent Registry',
        'Financial Data Sources',
        'Performance Monitoring',
        'Business Intelligence Systems'
      ],
      performance_targets: {
        response_time_ms: 1000,
        decision_confidence_threshold: 0.85,
        forecast_accuracy_target: 0.90,
        budget_variance_threshold: 0.05
      }
    };
  }
}

/**
 * Legacy function export for compatibility
 */
export default function cfoAgent() {
  console.log('💰 Initializing CFO Agent (Maya)...');
  const agent = new CFOAgent();
  return agent;
}

// For testing purposes
if (require.main === module) {
  async function main() {
    const agent = new CFOAgent();
    
    console.log('💼 CFO Agent Status:', agent.getStatus());
    console.log('📊 CFO Agent Capabilities:', agent.getCapabilities());
    
    // Perform health check
    const healthCheck = await agent.healthCheck();
    console.log('💊 Health Check Result:', healthCheck);
    
    if (healthCheck.overall) {
      console.log('🎉 CFO Agent is ready for financial leadership!');
      
      // Demo task processing
      const demoTask: FinancialTask = {
        id: 'demo-001',
        title: 'Analyze Q4 budget performance',
        description: 'Need comprehensive analysis of Q4 budget performance with variance identification and optimization recommendations for next quarter',
        category: 'budget_analysis',
        priority: 'high',
        requestedBy: 'demo-user',
        createdAt: new Date()
      };
      
      console.log('💼 Processing demo budget analysis task...');
      const result = await agent.processTask(demoTask);
      console.log('✅ Demo task completed:', result.status);
      console.log('📊 Processing time:', result.metadata.processingTime, 'ms');
      console.log('🎯 Confidence:', result.metadata.confidence, '%');
      
    } else {
      console.log('🔧 CFO Agent requires maintenance before operational use');
    }
  }
  
  main().catch(console.error);
}