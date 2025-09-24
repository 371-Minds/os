/**
 * CTO Agent Verification Script
 * 
 * Comprehensive validation of the CTO Agent implementation
 * Tests all core functionality and integration points
 */

import { CTOAgent } from './src/index.js';
import { CTORouterIntegration } from './src/router-integration.js';
import type { TechnicalTask } from './src/types.js';

// ANSI color codes for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(level: 'success' | 'error' | 'warning' | 'info', message: string) {
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: '🔍'
  };
  
  const colorMap = {
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
    info: colors.blue
  };
  
  console.log(`${colorMap[level]}${icons[level]} ${message}${colors.reset}`);
}

async function verifyAgentInitialization(): Promise<boolean> {
  try {
    log('info', 'Testing CTO Agent initialization...');
    
    const agent = new CTOAgent();
    const status = agent.getStatus();
    
    if (status.name !== 'Zara (CTO)') {
      log('error', `Expected agent name 'Zara (CTO)', got '${status.name}'`);
      return false;
    }
    
    if (status.type !== 'TECHNICAL_LEADERSHIP') {
      log('error', `Expected agent type 'TECHNICAL_LEADERSHIP', got '${status.type}'`);
      return false;
    }
    
    if (status.status !== 'operational') {
      log('error', `Expected status 'operational', got '${status.status}'`);
      return false;
    }
    
    log('success', 'Agent initialization verification passed');
    return true;
    
  } catch (error) {
    log('error', `Agent initialization failed: ${error}`);
    return false;
  }
}

async function verifyHealthCheck(): Promise<boolean> {
  try {
    log('info', 'Testing health check functionality...');
    
    const agent = new CTOAgent();
    const healthCheck = await agent.healthCheck();
    
    if (!healthCheck.checks || healthCheck.checks.length === 0) {
      log('error', 'Health check should return component checks');
      return false;
    }
    
    const requiredComponents = ['agent_definition', 'task_processor', 'technical_analyzer', 'performance_metrics'];
    const componentNames = healthCheck.checks.map(check => check.component);
    
    for (const required of requiredComponents) {
      if (!componentNames.includes(required)) {
        log('error', `Missing required health check component: ${required}`);
        return false;
      }
    }
    
    log('success', `Health check verification passed (${healthCheck.checks.length} components checked)`);
    return true;
    
  } catch (error) {
    log('error', `Health check failed: ${error}`);
    return false;
  }
}

async function verifyTaskProcessing(): Promise<boolean> {
  try {
    log('info', 'Testing task processing functionality...');
    
    const agent = new CTOAgent();
    
    // Test architecture design task
    const archTask: TechnicalTask = {
      id: 'verify-arch-001',
      title: 'Design microservices architecture',
      description: 'Need scalable distributed architecture with API gateway and event-driven communication',
      category: 'architecture_design',
      priority: 'high',
      requestedBy: 'verification-script',
      createdAt: new Date()
    };
    
    const archResult = await agent.processTask(archTask);
    
    if (archResult.status !== 'completed') {
      log('error', `Expected task status 'completed', got '${archResult.status}'`);
      return false;
    }
    
    if (archResult.category !== 'architecture_design') {
      log('error', `Expected category 'architecture_design', got '${archResult.category}'`);
      return false;
    }
    
    if (!archResult.analysis || archResult.analysis.confidence <= 0) {
      log('error', 'Task analysis should include positive confidence score');
      return false;
    }
    
    log('success', `Architecture task processing verified (confidence: ${archResult.analysis.confidence}%)`);
    
    // Test technology evaluation task
    const techTask: TechnicalTask = {
      id: 'verify-tech-001',
      title: 'Evaluate React framework',
      description: 'Technology assessment for React adoption in new frontend development',
      category: 'technology_evaluation',
      priority: 'medium',
      requestedBy: 'verification-script',
      createdAt: new Date()
    };
    
    const techResult = await agent.processTask(techTask);
    
    if (techResult.status !== 'completed' || techResult.category !== 'technology_evaluation') {
      log('error', 'Technology evaluation task processing failed');
      return false;
    }
    
    log('success', `Technology evaluation task processing verified (confidence: ${techResult.analysis.confidence}%)`);
    return true;
    
  } catch (error) {
    log('error', `Task processing verification failed: ${error}`);
    return false;
  }
}

async function verifyDirectAPIs(): Promise<boolean> {
  try {
    log('info', 'Testing direct API methods...');
    
    const agent = new CTOAgent();
    
    // Test architecture analysis
    const archDecision = await agent.analyzeArchitecture('Design high-performance microservices architecture');
    if (!archDecision.recommendedArchitecture || !archDecision.technicalSpecification) {
      log('error', 'Architecture analysis should return decision and specification');
      return false;
    }
    
    // Test technology evaluation
    const techAssessment = await agent.evaluateTechnology('Evaluate Node.js for backend services');
    if (!techAssessment.evaluation || !techAssessment.recommendation) {
      log('error', 'Technology evaluation should return evaluation and recommendation');
      return false;
    }
    
    // Test infrastructure planning
    const infraPlan = await agent.planInfrastructure('Plan cloud infrastructure with auto-scaling');
    if (!infraPlan.architecture || !infraPlan.scalingStrategy) {
      log('error', 'Infrastructure planning should return architecture and scaling strategy');
      return false;
    }
    
    log('success', 'Direct API methods verification passed');
    return true;
    
  } catch (error) {
    log('error', `Direct API verification failed: ${error}`);
    return false;
  }
}

async function verifyRouterIntegration(): Promise<boolean> {
  try {
    log('info', 'Testing router integration functionality...');
    
    const agent = new CTOAgent();
    const routerIntegration = new CTORouterIntegration(agent);
    
    // Test capability metadata
    const metadata = routerIntegration.getCapabilityMetadata();
    if (metadata.agent_id !== 'cto-agent-zara' || metadata.domain !== 'TECHNICAL') {
      log('error', 'Router capability metadata validation failed');
      return false;
    }
    
    // Test router health check
    const healthCheck = await routerIntegration.getRouterHealthCheck();
    if (healthCheck.component !== 'CTO Agent (Zara)' || !Array.isArray(healthCheck.capabilities)) {
      log('error', 'Router health check validation failed');
      return false;
    }
    
    // Test routed task handling
    const routingTask = {
      id: 'router-verify-001',
      title: 'Architecture design from router',
      description: 'Design microservices architecture delegated from intelligent router',
      priority: 'high' as const,
      domain_hints: ['technical', 'architecture'],
      submitted_at: new Date(),
      submitted_by: 'verification-router'
    };
    
    const routingResponse = await routerIntegration.handleRoutedTask(routingTask);
    if (!routingResponse.success || !routingResponse.result) {
      log('error', 'Router task delegation validation failed');
      return false;
    }
    
    // Test router registration
    const registered = await routerIntegration.registerWithRouter();
    if (!registered) {
      log('error', 'Router registration validation failed');
      return false;
    }
    
    log('success', 'Router integration verification passed');
    return true;
    
  } catch (error) {
    log('error', `Router integration verification failed: ${error}`);
    return false;
  }
}

async function verifyPerformanceMetrics(): Promise<boolean> {
  try {
    log('info', 'Testing performance metrics tracking...');
    
    const agent = new CTOAgent();
    
    // Get initial metrics
    const initialStatus = agent.getStatus();
    const initialTaskCount = initialStatus.performance.tasksProcessed;
    
    // Process a task
    const testTask: TechnicalTask = {
      id: 'metrics-verify-001',
      title: 'Test task for metrics',
      description: 'Simple task to verify performance metrics tracking',
      category: 'architecture_design',
      priority: 'low',
      requestedBy: 'verification-script',
      createdAt: new Date()
    };
    
    await agent.processTask(testTask);
    
    // Check updated metrics
    const updatedStatus = agent.getStatus();
    const updatedTaskCount = updatedStatus.performance.tasksProcessed;
    
    if (updatedTaskCount !== initialTaskCount + 1) {
      log('error', `Expected task count ${initialTaskCount + 1}, got ${updatedTaskCount}`);
      return false;
    }
    
    if (updatedStatus.performance.averageResponseTime <= 0) {
      log('error', 'Average response time should be greater than 0 after processing tasks');
      return false;
    }
    
    log('success', `Performance metrics verification passed (${updatedTaskCount} tasks processed)`);
    return true;
    
  } catch (error) {
    log('error', `Performance metrics verification failed: ${error}`);
    return false;
  }
}

async function verifyErrorHandling(): Promise<boolean> {
  try {
    log('info', 'Testing error handling...');
    
    const agent = new CTOAgent();
    
    // Test invalid task handling
    try {
      await agent.processTask(null as any);
      log('error', 'Should have thrown error for null task');
      return false;
    } catch (error) {
      // Expected error
    }
    
    // Test incomplete task handling
    try {
      const incompleteTask = {
        id: 'incomplete',
        // Missing required fields
      } as any;
      
      await agent.processTask(incompleteTask);
      log('error', 'Should have thrown error for incomplete task');
      return false;
    } catch (error) {
      // Expected error
    }
    
    log('success', 'Error handling verification passed');
    return true;
    
  } catch (error) {
    log('error', `Error handling verification failed: ${error}`);
    return false;
  }
}

async function runComprehensiveVerification(): Promise<void> {
  console.log(`${colors.bold}${colors.blue}🚀 CTO Agent (Zara) Comprehensive Verification${colors.reset}\n`);
  
  const tests = [
    { name: 'Agent Initialization', fn: verifyAgentInitialization },
    { name: 'Health Check', fn: verifyHealthCheck },
    { name: 'Task Processing', fn: verifyTaskProcessing },
    { name: 'Direct APIs', fn: verifyDirectAPIs },
    { name: 'Router Integration', fn: verifyRouterIntegration },
    { name: 'Performance Metrics', fn: verifyPerformanceMetrics },
    { name: 'Error Handling', fn: verifyErrorHandling }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      log('error', `Test '${test.name}' threw unexpected error: ${error}`);
      failed++;
    }
    console.log(); // Add spacing between tests
  }
  
  console.log(`${colors.bold}📊 Verification Summary:${colors.reset}`);
  console.log(`${colors.green}✅ Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}❌ Failed: ${failed}${colors.reset}`);
  console.log(`${colors.blue}📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%${colors.reset}`);
  
  if (failed === 0) {
    console.log(`\n${colors.bold}${colors.green}🎉 All verifications passed! CTO Agent is ready for deployment.${colors.reset}`);
  } else {
    console.log(`\n${colors.bold}${colors.yellow}⚠️ Some verifications failed. Please review and fix issues before deployment.${colors.reset}`);
  }
}

// Run verification if this script is executed directly
if (require.main === module) {
  runComprehensiveVerification().catch(error => {
    log('error', `Verification script failed: ${error}`);
    process.exit(1);
  });
}

export { runComprehensiveVerification };