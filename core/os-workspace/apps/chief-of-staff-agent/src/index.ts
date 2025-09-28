/**
 * Chief of Staff Agent (Ortega) - Main Entry Point
 *
 * This agent serves as the bridge between high-level strategic intent and formal governance.
 * It transforms Stratplans from the bizbuilderprompts repository into formal DAO proposals.
 */

import * as fs from 'fs';
import * as path from 'path';
import { ChiefOfStaffOrchestrator } from './orchestrator.js';
import { StratplanProcessor } from './stratplan-processor.js';
import { DAOProposalGenerator } from './dao-proposal-generator.js';
import { BizbuilderpromptsBridge } from './bizbuilderprompts-bridge.js';
import type { AgentDefinition, StratplanInput, ProcessingResult } from './types.js';

/**
 * Chief of Staff Agent Implementation
 * 
 * The 371 DAO's orchestration engine that transforms strategic vision
 * into executable governance proposals.
 */
export class ChiefOfStaffAgent {
  private agentDefinition: AgentDefinition;
  private orchestrator: ChiefOfStaffOrchestrator;
  private stratplanProcessor: StratplanProcessor;
  private proposalGenerator: DAOProposalGenerator;
  private bizbuilderpromptsBridge: BizbuilderpromptsBridge;

  constructor() {
    // Load agent definition from centralized prompt library
    this.agentDefinition = this.loadAgentDefinition();
    
    // Initialize core components
    this.orchestrator = new ChiefOfStaffOrchestrator(this.agentDefinition);
    this.stratplanProcessor = new StratplanProcessor();
    this.proposalGenerator = new DAOProposalGenerator();
    this.bizbuilderpromptsBridge = new BizbuilderpromptsBridge();

    console.log('🎯 Chief of Staff Agent (Ortega) initialized successfully');
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
      'ortega_chief_of_staff.yml'
    );

    if (!fs.existsSync(agentDefinitionPath)) {
      throw new Error(`Agent definition file not found: ${agentDefinitionPath}`);
    }

    const yamlContent = fs.readFileSync(agentDefinitionPath, 'utf8');
    console.log('✅ Agent definition loaded successfully');
    
    // Parse YAML and return as AgentDefinition
    // For now, return a mock structure - will implement YAML parsing in next phase
    return {
      agent_name: 'Ortega (Chief of Staff)',
      agent_type: 'ORCHESTRATION',
      core_instructions: yamlContent,
      personality_traits: ['Meticulous', 'Process-oriented', 'Diplomatic', 'Highly-organized'],
      required_tools: ['file_system:read', 'file_system:write', 'json_formatter']
    };
  }

  /**
   * Process a Stratplan and generate DAO proposal
   */
  public async processStratplan(stratplanInput: StratplanInput): Promise<ProcessingResult> {
    try {
      // Validate input
      this.validateStratplanInput(stratplanInput);
      
      console.log('📋 Processing Stratplan:', stratplanInput.title);
      
      // 1. Load Stratplan from bizbuilderprompts repository
      const stratplanData = await this.bizbuilderpromptsBridge.loadStratplan(stratplanInput.source);
      
      // 2. Analyze the meta-prompt and sub-prompts
      const analysis = await this.stratplanProcessor.analyzeStratplan(stratplanData);
      
      // 3. Generate DAO proposal in both Markdown and JSON format
      const proposal = await this.proposalGenerator.generateProposal(analysis);
      
      // 4. Orchestrate the complete workflow
      const result = await this.orchestrator.orchestrateProposal({
        stratplan: stratplanData,
        analysis,
        proposal
      });
      
      console.log('✅ Stratplan processing completed successfully');
      return result;
      
    } catch (error) {
      console.error('❌ Failed to process Stratplan:', error);
      throw error;
    }
  }

  /**
   * Validate Stratplan input
   */
  private validateStratplanInput(input: StratplanInput): void {
    if (!input) {
      throw new Error('Stratplan input is required');
    }
    
    if (!input.title || input.title.trim() === '') {
      throw new Error('Stratplan title is required and cannot be empty');
    }
    
    if (!input.source || input.source.trim() === '') {
      throw new Error('Stratplan source is required and cannot be empty');
    }
    
    if (!input.requestedBy || input.requestedBy.trim() === '') {
      throw new Error('Stratplan requestedBy is required and cannot be empty');
    }
    
    const validPriorities = ['low', 'medium', 'high', 'critical'];
    if (!validPriorities.includes(input.priority)) {
      throw new Error(`Invalid priority: must be one of ${validPriorities.join(', ')}`);
    }
  }

  /**
   * Health check for the agent
   */
  public async healthCheck(): Promise<boolean> {
    try {
      // Verify all components are operational
      const checks = await Promise.all([
        this.bizbuilderpromptsBridge.testConnection(),
        this.stratplanProcessor.validate(),
        this.proposalGenerator.validate(),
        this.orchestrator.validate()
      ]);
      
      const allHealthy = checks.every((check: boolean) => check);
      console.log(allHealthy ? '💚 Agent health check passed' : '💔 Agent health check failed');
      return allHealthy;
      
    } catch (error) {
      console.error('❌ Health check failed:', error);
      return false;
    }
  }

  /**
   * Get agent status and capabilities
   */
  public getStatus() {
    return {
      name: this.agentDefinition.agent_name,
      type: this.agentDefinition.agent_type,
      status: 'operational',
      capabilities: [
        'Stratplan Analysis',
        'DAO Proposal Generation',
        'Governance Orchestration',
        'Strategic Bridge Operations'
      ],
      version: '1.0.0',
      lastUpdate: new Date().toISOString()
    };
  }
}

/**
 * Legacy function export for compatibility
 */
export default function chiefOfStaffAgent() {
  console.log('🚀 Initializing Chief of Staff Agent (Ortega)...');
  const agent = new ChiefOfStaffAgent();
  return agent;
}

// For testing purposes
if (require.main === module) {
  async function main() {
    const agent = new ChiefOfStaffAgent();
    
    // Perform health check
    const isHealthy = await agent.healthCheck();
    console.log('Agent Status:', agent.getStatus());
    
    if (isHealthy) {
      console.log('🎉 Chief of Staff Agent is ready for strategic orchestration!');
    } else {
      console.log('🔧 Agent requires maintenance before operational use');
    }
  }
  
  main().catch(console.error);
}