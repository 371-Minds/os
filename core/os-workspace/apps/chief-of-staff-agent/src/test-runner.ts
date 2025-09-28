/**
 * Test Runner for Chief of Staff Agent
 * 
 * Comprehensive test suite to validate the Agent's functionality
 */

import { ChiefOfStaffAgent } from './index.js';
import type { StratplanInput } from './types.js';

/**
 * Test suite for Chief of Staff Agent
 */
export class ChiefOfStaffAgentTestSuite {
  private agent: ChiefOfStaffAgent;

  constructor() {
    this.agent = new ChiefOfStaffAgent();
  }

  /**
   * Run all tests
   */
  public async runAllTests(): Promise<void> {
    console.log('🧪 Starting Chief of Staff Agent Test Suite');
    console.log('=' .repeat(60));

    try {
      await this.testAgentInitialization();
      await this.testHealthChecks();
      await this.testStratplanProcessing();
      await this.testFileOutputs();
      await this.testErrorHandling();
      
      console.log('\n✅ All tests completed successfully!');
      console.log('🎉 Chief of Staff Agent is ready for deployment!');
      
    } catch (error) {
      console.error('\n❌ Test suite failed:', error);
      throw error;
    }
  }

  /**
   * Test agent initialization
   */
  private async testAgentInitialization(): Promise<void> {
    console.log('\n1. Testing Agent Initialization...');
    
    const status = this.agent.getStatus();
    
    if (!status.name || !status.type || !status.capabilities) {
      throw new Error('Agent initialization failed - missing required status fields');
    }
    
    console.log('   ✅ Agent initialized successfully');
    console.log(`   📋 Name: ${status.name}`);
    console.log(`   🏷️ Type: ${status.type}`);
    console.log(`   🛠️ Capabilities: ${status.capabilities.length}`);
  }

  /**
   * Test health checks
   */
  private async testHealthChecks(): Promise<void> {
    console.log('\n2. Testing Health Checks...');
    
    const isHealthy = await this.agent.healthCheck();
    
    if (!isHealthy) {
      throw new Error('Agent health check failed');
    }
    
    console.log('   ✅ All components operational');
  }

  /**
   * Test Stratplan processing
   */
  private async testStratplanProcessing(): Promise<void> {
    console.log('\n3. Testing Stratplan Processing...');
    
    const testStratplan: StratplanInput = {
      title: 'Revenue Optimization Strategy',
      source: 'revenue-optimization-2024.md',
      priority: 'high',
      requestedBy: 'Test Suite',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      metadata: {
        category: 'financial',
        urgency: 'high',
        complexity: 'medium'
      }
    };
    
    const result = await this.agent.processStratplan(testStratplan);
    
    if (!result.success) {
      throw new Error(`Stratplan processing failed: ${result.errors.join(', ')}`);
    }
    
    if (!result.proposal) {
      throw new Error('No proposal generated');
    }
    
    console.log('   ✅ Stratplan processed successfully');
    console.log(`   📋 Proposal ID: ${result.proposalId}`);
    console.log(`   🎯 Confidence: ${Math.round(result.confidence * 100)}%`);
    console.log(`   ⏱️ Processing Time: ${result.processingTime}ms`);
    
    // Validate proposal structure
    this.validateProposalStructure(result.proposal);
    console.log('   ✅ Proposal structure validated');
  }

  /**
   * Test file outputs
   */
  private async testFileOutputs(): Promise<void> {
    console.log('\n4. Testing File Outputs...');
    
    const testStratplan: StratplanInput = {
      title: 'File Output Test Strategy',
      source: 'file-output-test.md',
      priority: 'medium',
      requestedBy: 'Test Suite'
    };
    
    const result = await this.agent.processStratplan(testStratplan);
    
    if (!result.markdownFilePath || !result.jsonFilePath) {
      throw new Error('File outputs not generated');
    }
    
    // Check if files exist (would need filesystem access to verify)
    console.log('   ✅ File outputs configured');
    console.log(`   📝 Markdown: ${result.markdownFilePath}`);
    console.log(`   📊 JSON: ${result.jsonFilePath}`);
  }

  /**
   * Test error handling
   */
  private async testErrorHandling(): Promise<void> {
    console.log('\n5. Testing Error Handling...');
    
    // Test with invalid input
    const invalidStratplan: StratplanInput = {
      title: '',
      source: '',
      priority: 'low',
      requestedBy: 'Test Suite'
    };
    
    try {
      await this.agent.processStratplan(invalidStratplan);
      throw new Error('Expected error handling to trigger');
    } catch (error) {
      if (error instanceof Error && error.message.includes('Expected error handling')) {
        throw error;
      }
      console.log('   ✅ Error handling working correctly');
      console.log(`   🚨 Caught expected error: ${error instanceof Error ? error.message.substring(0, 50) : 'Unknown'}...`);
    }
  }

  /**
   * Validate proposal structure
   */
  private validateProposalStructure(proposal: any): void {
    const requiredFields = [
      'id', 'title', 'description', 'proposalType', 'objectives',
      'executionPlan', 'timeline', 'success_criteria', 'markdownContent', 'jsonContent'
    ];
    
    for (const field of requiredFields) {
      if (!(field in proposal)) {
        throw new Error(`Missing required proposal field: ${field}`);
      }
    }
    
    // Validate execution plan structure
    if (!proposal.executionPlan.phases || !Array.isArray(proposal.executionPlan.phases)) {
      throw new Error('Invalid execution plan: missing or invalid phases');
    }
    
    if (proposal.executionPlan.phases.length === 0) {
      throw new Error('Invalid execution plan: no phases defined');
    }
    
    // Validate timeline structure
    if (!proposal.timeline.submissionDate || !proposal.timeline.votingStartDate) {
      throw new Error('Invalid timeline: missing required dates');
    }
  }

  /**
   * Run performance tests
   */
  public async runPerformanceTests(): Promise<void> {
    console.log('\n🏃 Running Performance Tests...');
    
    const iterations = 5;
    const times: number[] = [];
    
    for (let i = 0; i < iterations; i++) {
      const testStratplan: StratplanInput = {
        title: `Performance Test ${i + 1}`,
        source: `perf-test-${i + 1}.md`,
        priority: 'medium',
        requestedBy: 'Performance Test Suite'
      };
      
      const startTime = Date.now();
      const result = await this.agent.processStratplan(testStratplan);
      const endTime = Date.now();
      
      if (!result.success) {
        throw new Error(`Performance test ${i + 1} failed`);
      }
      
      times.push(endTime - startTime);
      console.log(`   Test ${i + 1}: ${endTime - startTime}ms`);
    }
    
    const avgTime = times.reduce((sum, time) => sum + time, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    
    console.log('\n📊 Performance Results:');
    console.log(`   Average: ${Math.round(avgTime)}ms`);
    console.log(`   Min: ${minTime}ms`);
    console.log(`   Max: ${maxTime}ms`);
    
    if (avgTime > 10000) { // 10 seconds
      console.log('   ⚠️ Warning: Average processing time exceeds 10 seconds');
    } else {
      console.log('   ✅ Performance within acceptable limits');
    }
  }
}

// Run tests if called directly
if (require.main === module) {
  async function main() {
    const testSuite = new ChiefOfStaffAgentTestSuite();
    
    try {
      await testSuite.runAllTests();
      await testSuite.runPerformanceTests();
      
      console.log('\n🏆 Chief of Staff Agent: ALL TESTS PASSED');
      console.log('🚀 Ready for production deployment!');
      
    } catch (error) {
      console.error('\n💥 TEST SUITE FAILED:', error);
      process.exit(1);
    }
  }
  
  main();
}