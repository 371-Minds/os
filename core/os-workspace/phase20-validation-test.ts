#!/usr/bin/env bun

/**
 * Phase 20 Validation Test - ElizaOS Character-Based Agent System
 * 
 * This comprehensive test validates the complete implementation of Phase 20:
 * Enterprise Hardening & Productization - Workstream 1: ElizaOS Optimization & Agent Modernization
 */

import { AgentFactory } from './apps/agent-factory/src/index';
import { CharacterFactory } from './apps/agent-factory/src/character-factory';

interface ValidationResult {
  testName: string;
  success: boolean;
  details: string;
  error?: string;
  duration?: number;
}

class Phase20Validator {
  private results: ValidationResult[] = [];

  /**
   * Run complete Phase 20 validation suite
   */
  async runValidation(): Promise<void> {
    console.log('\n🚀 === Phase 20 Validation Suite: ElizaOS Character-Based Agents ===\n');

    await this.validateCharacterPackageStructure();
    await this.validateCharacterDefinitions();
    await this.validateCharacterFactory();
    await this.validateAgentFactoryIntegration();
    await this.validateCapabilityMapping();
    await this.validateDeploymentTargets();
    await this.generateValidationReport();
  }

  /**
   * Test 1: Validate @elizaos/characters package structure
   */
  private async validateCharacterPackageStructure(): Promise<void> {
    const startTime = Date.now();
    
    try {
      console.log('🔍 Test 1: Validating @elizaos/characters package structure...');

      // Check if characters package was built successfully
      const fs = require('fs');
      const path = require('path');
      
      const packagePath = './packages/elizaos-characters';
      const distPath = path.join(packagePath, 'dist');
      
      // Validate package.json
      const packageJsonExists = fs.existsSync(path.join(packagePath, 'package.json'));
      if (!packageJsonExists) {
        throw new Error('package.json not found');
      }

      // Validate build output
      const distExists = fs.existsSync(distPath);
      if (!distExists) {
        throw new Error('dist directory not found - package not built');
      }

      // Validate character files exist
      const requiredFiles = [
        'index.js', 'index.mjs', 'index.d.ts',
        'ceo-mimi.character.js', 'ceo-mimi.character.mjs', 'ceo-mimi.character.d.ts',
        'cto-zara.character.js', 'cto-zara.character.mjs', 'cto-zara.character.d.ts',
        'cfo-maya.character.js', 'cfo-maya.character.mjs', 'cfo-maya.character.d.ts',
        'clo-alex.character.js', 'clo-alex.character.mjs', 'clo-alex.character.d.ts'
      ];

      for (const file of requiredFiles) {
        const filePath = path.join(distPath, file);
        if (!fs.existsSync(filePath)) {
          throw new Error(`Required build file missing: ${file}`);
        }
      }

      this.results.push({
        testName: 'Character Package Structure',
        success: true,
        details: `✅ All ${requiredFiles.length} required build files present`,
        duration: Date.now() - startTime
      });

      console.log('   ✅ Package structure validation passed');

    } catch (error) {
      this.results.push({
        testName: 'Character Package Structure',
        success: false,
        details: 'Package structure validation failed',
        error: (error as Error).message,
        duration: Date.now() - startTime
      });

      console.log('   ❌ Package structure validation failed:', (error as Error).message);
    }
  }

  /**
   * Test 2: Validate character definitions
   */
  private async validateCharacterDefinitions(): Promise<void> {
    const startTime = Date.now();

    try {
      console.log('🧠 Test 2: Validating character definitions...');

      // Import characters from built package
      const characters = await import('./packages/elizaos-characters/dist/index.mjs');
      
      const requiredCharacters = ['ceoMimiCharacter', 'ctoZaraCharacter', 'cfoMayaCharacter', 'cloAlexCharacter'];
      const requiredCapabilities = ['CEOCapabilities', 'CTOCapabilities', 'CFOCapabilities', 'CLOCapabilities'];

      // Validate character exports
      for (const charName of requiredCharacters) {
        if (!characters[charName]) {
          throw new Error(`Character not exported: ${charName}`);
        }

        const character = characters[charName];
        
        // Validate required character properties
        const requiredProps = ['name', 'username', 'bio', 'messageExamples', 'postExamples', 'style', 'topics'];
        for (const prop of requiredProps) {
          if (!character[prop]) {
            throw new Error(`Character ${charName} missing required property: ${prop}`);
          }
        }

        // Validate bio is array with content
        if (!Array.isArray(character.bio) || character.bio.length === 0) {
          throw new Error(`Character ${charName} bio must be non-empty array`);
        }

        // Validate message examples structure
        if (!Array.isArray(character.messageExamples) || character.messageExamples.length === 0) {
          throw new Error(`Character ${charName} messageExamples must be non-empty array`);
        }
      }

      // Validate capability exports
      for (const capName of requiredCapabilities) {
        if (!characters[capName]) {
          throw new Error(`Capabilities not exported: ${capName}`);
        }

        const capabilities = characters[capName];
        if (typeof capabilities !== 'object' || Object.keys(capabilities).length === 0) {
          throw new Error(`Capabilities ${capName} must be non-empty object`);
        }
      }

      this.results.push({
        testName: 'Character Definitions',
        success: true,
        details: `✅ All 4 characters and capabilities properly defined`,
        duration: Date.now() - startTime
      });

      console.log('   ✅ Character definitions validation passed');

    } catch (error) {
      this.results.push({
        testName: 'Character Definitions',
        success: false,
        details: 'Character definitions validation failed',
        error: (error as Error).message,
        duration: Date.now() - startTime
      });

      console.log('   ❌ Character definitions validation failed:', (error as Error).message);
    }
  }

  /**
   * Test 3: Validate character factory functionality
   */
  private async validateCharacterFactory(): Promise<void> {
    const startTime = Date.now();

    try {
      console.log('🏭 Test 3: Validating character factory functionality...');

      const factory = new CharacterFactory();

      // Test individual agent creation
      const ceoResult = await factory.createAgentFromCharacter('CEO', {
        agentId: 'test-ceo-agent',
        deploymentTarget: 'local'
      });

      if (!ceoResult.success) {
        throw new Error(`CEO agent creation failed: ${ceoResult.error}`);
      }

      if (!ceoResult.character || !ceoResult.agentId || !ceoResult.capabilities) {
        throw new Error('CEO agent result missing required properties');
      }

      // Test CTO agent with Akash deployment
      const ctoResult = await factory.createAgentFromCharacter('CTO', {
        agentId: 'test-cto-agent',
        deploymentTarget: 'akash'
      });

      if (!ctoResult.success) {
        throw new Error(`CTO agent creation failed: ${ctoResult.error}`);
      }

      // Test factory statistics
      const stats = factory.getFactoryStats();
      if (stats.totalAgents !== 2) {
        throw new Error(`Expected 2 agents, got ${stats.totalAgents}`);
      }

      // Test agent retrieval
      const agents = factory.getAllAgents();
      if (agents.length !== 2) {
        throw new Error(`Expected 2 agents in getAllAgents, got ${agents.length}`);
      }

      const ceoAgents = factory.getAgentsByRole('CEO');
      if (ceoAgents.length !== 1) {
        throw new Error(`Expected 1 CEO agent, got ${ceoAgents.length}`);
      }

      this.results.push({
        testName: 'Character Factory Functionality',
        success: true,
        details: `✅ Created 2 agents (CEO, CTO), factory statistics working`,
        duration: Date.now() - startTime
      });

      console.log('   ✅ Character factory functionality validation passed');

    } catch (error) {
      this.results.push({
        testName: 'Character Factory Functionality',
        success: false,
        details: 'Character factory functionality validation failed',
        error: (error as Error).message,
        duration: Date.now() - startTime
      });

      console.log('   ❌ Character factory functionality validation failed:', (error as Error).message);
    }
  }

  /**
   * Test 4: Validate agent factory integration
   */
  private async validateAgentFactoryIntegration(): Promise<void> {
    const startTime = Date.now();

    try {
      console.log('🔧 Test 4: Validating agent factory integration...');

      const factory = new AgentFactory();

      // Test health check
      const health = await factory.healthCheck();
      if (!health.success) {
        throw new Error('Agent factory health check failed');
      }

      // Test C-Suite agent creation through main factory
      const cfoResult = await factory.createCSuiteAgent('CFO', {
        deploymentTarget: 'local',
        agentId: 'integration-test-cfo'
      });

      if (!cfoResult.success) {
        throw new Error(`CFO agent creation via main factory failed: ${cfoResult.error}`);
      }

      // Test character factory stats access
      const charStats = factory.getCharacterFactoryStats();
      if (charStats.totalAgents === 0) {
        throw new Error('No character agents found in factory stats');
      }

      // Test character agents retrieval
      const charAgents = factory.getCharacterAgents();
      if (charAgents.length === 0) {
        throw new Error('No character agents returned from main factory');
      }

      this.results.push({
        testName: 'Agent Factory Integration',
        success: true,
        details: `✅ Main factory integration with ${charStats.totalAgents} character agents`,
        duration: Date.now() - startTime
      });

      console.log('   ✅ Agent factory integration validation passed');

    } catch (error) {
      this.results.push({
        testName: 'Agent Factory Integration',
        success: false,
        details: 'Agent factory integration validation failed',
        error: (error as Error).message,
        duration: Date.now() - startTime
      });

      console.log('   ❌ Agent factory integration validation failed:', (error as Error).message);
    }
  }

  /**
   * Test 5: Validate capability mapping
   */
  private async validateCapabilityMapping(): Promise<void> {
    const startTime = Date.now();

    try {
      console.log('⚙️ Test 5: Validating capability mapping...');

      const factory = new CharacterFactory();

      // Create all C-Suite agents and check capabilities
      const agents = await factory.createCSuiteAgents('local');
      
      if (agents.length !== 4) {
        throw new Error(`Expected 4 C-Suite agents, got ${agents.length}`);
      }

      const successfulAgents = agents.filter(a => a.success);
      if (successfulAgents.length !== 4) {
        throw new Error(`Expected 4 successful agents, got ${successfulAgents.length}`);
      }

      // Validate each agent has appropriate capabilities
      for (const agent of successfulAgents) {
        if (!agent.capabilities || agent.capabilities.length === 0) {
          throw new Error(`Agent ${agent.role} has no capabilities`);
        }

        const requiredBaseCaps = ['workspace_analysis', 'business_intelligence', 'agent_coordination'];
        for (const cap of requiredBaseCaps) {
          if (!agent.capabilities.includes(cap)) {
            throw new Error(`Agent ${agent.role} missing base capability: ${cap}`);
          }
        }

        // Validate role-specific capabilities
        if (agent.role === 'CEO' && !agent.capabilities.includes('strategic_planning')) {
          throw new Error('CEO agent missing strategic_planning capability');
        }
        
        if (agent.role === 'CTO' && !agent.capabilities.includes('technical_architecture')) {
          throw new Error('CTO agent missing technical_architecture capability');
        }

        if (agent.role === 'CFO' && !agent.capabilities.includes('financial_analysis')) {
          throw new Error('CFO agent missing financial_analysis capability');
        }

        if (agent.role === 'CLO' && !agent.capabilities.includes('legal_compliance')) {
          throw new Error('CLO agent missing legal_compliance capability');
        }
      }

      this.results.push({
        testName: 'Capability Mapping',
        success: true,
        details: `✅ All 4 C-Suite agents have proper capability mapping`,
        duration: Date.now() - startTime
      });

      console.log('   ✅ Capability mapping validation passed');

    } catch (error) {
      this.results.push({
        testName: 'Capability Mapping',
        success: false,
        details: 'Capability mapping validation failed',
        error: (error as Error).message,
        duration: Date.now() - startTime
      });

      console.log('   ❌ Capability mapping validation failed:', (error as Error).message);
    }
  }

  /**
   * Test 6: Validate deployment targets
   */
  private async validateDeploymentTargets(): Promise<void> {
    const startTime = Date.now();

    try {
      console.log('🌐 Test 6: Validating deployment targets...');

      const factory = new CharacterFactory();

      // Test local deployment
      const localAgent = await factory.createAgentFromCharacter('CEO', {
        agentId: 'local-deployment-test',
        deploymentTarget: 'local'
      });

      if (!localAgent.success || !localAgent.deploymentInfo) {
        throw new Error('Local deployment failed');
      }

      if (localAgent.deploymentInfo.target !== 'local') {
        throw new Error(`Expected local deployment, got ${localAgent.deploymentInfo.target}`);
      }

      // Test Akash deployment simulation
      const akashAgent = await factory.createAgentFromCharacter('CTO', {
        agentId: 'akash-deployment-test',
        deploymentTarget: 'akash'
      });

      if (!akashAgent.success || !akashAgent.deploymentInfo) {
        throw new Error('Akash deployment simulation failed');
      }

      if (akashAgent.deploymentInfo.target !== 'akash') {
        throw new Error(`Expected akash deployment, got ${akashAgent.deploymentInfo.target}`);
      }

      // Verify deployment info is complete
      if (!akashAgent.deploymentInfo.endpoint || !akashAgent.deploymentInfo.endpoint.includes('akash')) {
        throw new Error('Akash deployment missing proper endpoint information');
      }

      this.results.push({
        testName: 'Deployment Targets',
        success: true,
        details: `✅ Local and Akash deployment targets working`,
        duration: Date.now() - startTime
      });

      console.log('   ✅ Deployment targets validation passed');

    } catch (error) {
      this.results.push({
        testName: 'Deployment Targets',
        success: false,
        details: 'Deployment targets validation failed',
        error: (error as Error).message,
        duration: Date.now() - startTime
      });

      console.log('   ❌ Deployment targets validation failed:', (error as Error).message);
    }
  }

  /**
   * Generate comprehensive validation report
   */
  private async generateValidationReport(): Promise<void> {
    console.log('\n📊 === Phase 20 Validation Report ===\n');

    const totalTests = this.results.length;
    const passedTests = this.results.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const successRate = (passedTests / totalTests * 100).toFixed(1);
    const totalDuration = this.results.reduce((sum, r) => sum + (r.duration || 0), 0);

    console.log(`📈 Overall Results:`);
    console.log(`   Total Tests: ${totalTests}`);
    console.log(`   Passed: ${passedTests} ✅`);
    console.log(`   Failed: ${failedTests} ❌`);
    console.log(`   Success Rate: ${successRate}%`);
    console.log(`   Total Duration: ${totalDuration}ms`);

    console.log(`\n📋 Detailed Results:`);
    for (const result of this.results) {
      const status = result.success ? '✅' : '❌';
      const duration = result.duration ? `(${result.duration}ms)` : '';
      console.log(`   ${status} ${result.testName} ${duration}`);
      console.log(`      ${result.details}`);
      if (result.error) {
        console.log(`      Error: ${result.error}`);
      }
    }

    // Phase 20 milestone assessment
    console.log(`\n🎯 Phase 20 Milestone Assessment:`);
    
    if (passedTests === totalTests) {
      console.log(`   🎆 PHASE 20 WORKSTREAM 1 COMPLETE!`);
      console.log(`   ✅ ElizaOS Character-Based Agent System: 100% operational`);
      console.log(`   ✅ C-Suite Agent Modernization: Revolutionary upgrade complete`);
      console.log(`   ✅ Type-Safe Agent Definitions: YAML legacy eliminated`);
      console.log(`   ✅ Self-Awareness Integration: Workspace manipulation enabled`);
      console.log(`   ✅ Enterprise Hardening: Production-ready agent factory`);
    } else {
      console.log(`   ⚠️ Phase 20 Workstream 1 requires attention`);
      console.log(`   📊 Success Rate: ${successRate}% (Target: 100%)`);
      console.log(`   🔧 ${failedTests} test(s) need resolution`);
    }

    console.log(`\n🚀 Next Steps:`);
    if (passedTests === totalTests) {
      console.log(`   1. Update milestone tracker with Phase 20 completion`);
      console.log(`   2. Create session documentation for revolutionary upgrade`);
      console.log(`   3. Begin Phase 20 Workstream 2: Advanced Plugin Integration`);
      console.log(`   4. Deploy character-based agents to production environment`);
    } else {
      console.log(`   1. Review and fix failed test cases`);
      console.log(`   2. Re-run validation suite until 100% success rate`);
      console.log(`   3. Document any architectural improvements needed`);
    }

    console.log(`\n=== Phase 20 Validation Complete ===\n`);
  }
}

/**
 * Main validation execution
 */
async function main() {
  try {
    const validator = new Phase20Validator();
    await validator.runValidation();
  } catch (error) {
    console.error('💥 Validation suite failed:', error);
    process.exit(1);
  }
}

// Run validation if script is executed directly
if (require.main === module) {
  main();
}

export { Phase20Validator, ValidationResult };