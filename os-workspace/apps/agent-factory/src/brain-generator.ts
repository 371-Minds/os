/**
 * Brain Generator - Creates agent definition YAML files
 * Analyzes capability requirements and generates structured agent brains
 * with appropriate personality traits, tools, and performance targets
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'js-yaml';
import {
  SpawnRequest,
  AgentBrainDefinition,
  BrainGeneratorConfig,
  ToolRequirement,
  PerformanceTargets,
  DelegationRule,
  EscalationPolicy,
  SpawnPriority
} from './types';

interface CapabilityAnalysis {
  primaryDomain: string;
  complexity: number;
  requiredTools: string[];
  personalityTraits: Record<string, string>;
  performanceExpectations: PerformanceTargets;
}

interface AgentTemplate {
  base_personality: Record<string, string>;
  default_tools: ToolRequirement[];
  performance_baselines: PerformanceTargets;
  delegation_patterns: DelegationRule[];
  escalation_patterns: EscalationPolicy[];
}

export class BrainGenerator {
  private config: BrainGeneratorConfig;
  private templates: Map<string, AgentTemplate> = new Map();
  private capabilityMappings: Map<string, string[]>;

  constructor(config: BrainGeneratorConfig) {
    this.config = config;
    this.capabilityMappings = new Map(Object.entries(config.capabilityMappings || {}));
    
    // Initialize templates
    this.initializeTemplates();
    
    console.log('[BrainGenerator] Initialized with capability mappings and templates');
  }

  /**
   * Generates agent brain definition from spawn request
   */
  public async generateAgentBrain(request: SpawnRequest): Promise<AgentBrainDefinition> {
    console.log(`[BrainGenerator] Generating brain for capability: ${request.capability}`);

    try {
      // Analyze capability requirements
      const analysis = await this.analyzeCapability(request);
      
      // Select appropriate template
      const template = this.selectTemplate(analysis);
      
      // Generate brain definition
      const brainDefinition = this.createBrainDefinition(request, analysis, template);
      
      // Save brain definition to file
      await this.saveBrainDefinition(brainDefinition);
      
      console.log(`[BrainGenerator] Successfully generated brain: ${brainDefinition.agent_name}`);
      return brainDefinition;

    } catch (error) {
      console.error('[BrainGenerator] Brain generation failed:', error);
      throw new Error(`Failed to generate agent brain: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Analyzes capability to determine agent requirements
   */
  private async analyzeCapability(request: SpawnRequest): Promise<CapabilityAnalysis> {
    const capability = request.capability.toLowerCase();
    const description = request.taskDescription.toLowerCase();
    const domainHints = request.domainHints.map(h => h.toLowerCase());

    // Determine primary domain
    const primaryDomain = this.determineDomain(capability, description, domainHints);
    
    // Calculate complexity based on multiple factors
    const complexity = this.calculateComplexity(request);
    
    // Determine required tools
    const requiredTools = this.determineRequiredTools(capability, primaryDomain);
    
    // Generate personality traits
    const personalityTraits = this.generatePersonalityTraits(capability, primaryDomain, complexity);
    
    // Set performance expectations
    const performanceExpectations = this.determinePerformanceTargets(request, complexity);

    return {
      primaryDomain,
      complexity,
      requiredTools,
      personalityTraits,
      performanceExpectations
    };
  }

  /**
   * Determines the primary domain for the agent
   */
  private determineDomain(capability: string, description: string, domainHints: string[]): string {
    const domainKeywords = {
      financial: ['financial', 'budget', 'cost', 'revenue', 'accounting', 'investment', 'money', 'payment'],
      technical: ['technical', 'development', 'code', 'architecture', 'software', 'programming', 'system', 'infrastructure'],
      marketing: ['marketing', 'campaign', 'brand', 'customer', 'growth', 'engagement', 'social', 'content'],
      community: ['community', 'stakeholder', 'governance', 'partnership', 'relationship', 'communication'],
      strategic: ['strategic', 'planning', 'vision', 'leadership', 'decision', 'executive', 'management'],
      operational: ['operational', 'process', 'workflow', 'efficiency', 'optimization', 'productivity'],
      legal: ['legal', 'compliance', 'regulation', 'contract', 'policy', 'governance', 'audit'],
      creative: ['creative', 'design', 'content', 'media', 'visual', 'artistic', 'innovation'],
      analytics: ['analytics', 'data', 'analysis', 'metrics', 'reporting', 'insights', 'intelligence'],
      support: ['support', 'service', 'help', 'assistance', 'customer', 'troubleshooting']
    };

    const allText = `${capability} ${description} ${domainHints.join(' ')}`;
    
    // Score each domain
    const domainScores: Record<string, number> = {};
    
    for (const [domain, keywords] of Object.entries(domainKeywords)) {
      domainScores[domain] = keywords.reduce((score, keyword) => {
        const matches = (allText.match(new RegExp(keyword, 'gi')) || []).length;
        return score + matches;
      }, 0);
    }

    // Find highest scoring domain
    const topDomain = Object.entries(domainScores)
      .sort(([,a], [,b]) => b - a)[0];

    return topDomain[1] > 0 ? topDomain[0] : 'specialized';
  }

  /**
   * Calculates capability complexity score
   */
  private calculateComplexity(request: SpawnRequest): number {
    let complexity = 0.5; // Base complexity

    // Priority influence
    const priorityWeights = {
      [SpawnPriority.LOW]: 0.1,
      [SpawnPriority.MEDIUM]: 0.2,
      [SpawnPriority.HIGH]: 0.3,
      [SpawnPriority.URGENT]: 0.4,
      [SpawnPriority.CRITICAL]: 0.5
    };
    complexity += priorityWeights[request.priority];

    // Task description complexity
    const descriptionLength = request.taskDescription.length;
    if (descriptionLength > 500) complexity += 0.2;
    else if (descriptionLength > 200) complexity += 0.1;

    // Multi-domain complexity
    if (request.domainHints.length > 2) complexity += 0.2;
    if (request.domainHints.length > 4) complexity += 0.3;

    // Performance requirements complexity
    if (request.performanceRequirements.maxResponseTime < 1000) complexity += 0.2;
    if (request.performanceRequirements.minSuccessRate > 0.95) complexity += 0.2;

    return Math.min(1.0, complexity);
  }

  /**
   * Determines required tools based on capability and domain
   */
  private determineRequiredTools(capability: string, domain: string): string[] {
    const baseTools = ['task_executor', 'communication_handler', 'error_reporter'];
    
    const domainTools: Record<string, string[]> = {
      financial: ['financial_calculator', 'budget_analyzer', 'cost_optimizer'],
      technical: ['code_analyzer', 'system_monitor', 'deployment_manager'],
      marketing: ['campaign_manager', 'analytics_tracker', 'content_generator'],
      community: ['stakeholder_manager', 'communication_hub', 'feedback_collector'],
      strategic: ['decision_framework', 'strategic_planner', 'risk_assessor'],
      operational: ['process_optimizer', 'workflow_manager', 'performance_tracker'],
      legal: ['compliance_checker', 'document_analyzer', 'regulation_monitor'],
      creative: ['content_creator', 'design_tools', 'media_processor'],
      analytics: ['data_processor', 'report_generator', 'insight_extractor'],
      support: ['ticket_manager', 'knowledge_base', 'escalation_handler']
    };

    const tools = [...baseTools];
    
    if (domainTools[domain]) {
      tools.push(...domainTools[domain]);
    }

    // Add capability-specific tools
    const mappedTools = this.capabilityMappings.get(capability) || [];
    tools.push(...mappedTools);

    return [...new Set(tools)]; // Remove duplicates
  }

  /**
   * Generates personality traits for the agent
   */
  private generatePersonalityTraits(capability: string, domain: string, complexity: number): Record<string, string> {
    const baseTraits = {
      professional: 'Maintains professional demeanor in all interactions',
      focused: 'Concentrates on task completion with minimal distractions',
      adaptive: 'Adjusts approach based on task requirements and feedback'
    };

    const domainTraits: Record<string, Record<string, string>> = {
      financial: {
        analytical: 'Approaches problems with data-driven analysis',
        precise: 'Ensures accuracy in all financial calculations and recommendations',
        cost_conscious: 'Always considers cost implications and optimization opportunities'
      },
      technical: {
        systematic: 'Follows methodical approaches to technical problem-solving',
        detail_oriented: 'Pays attention to technical specifications and requirements',
        innovative: 'Seeks creative solutions to technical challenges'
      },
      marketing: {
        creative: 'Brings creative thinking to marketing challenges',
        customer_focused: 'Prioritizes customer experience and engagement',
        results_driven: 'Focuses on measurable marketing outcomes and ROI'
      },
      community: {
        collaborative: 'Works effectively with diverse stakeholder groups',
        empathetic: 'Understands and responds to community concerns',
        diplomatic: 'Handles sensitive situations with tact and professionalism'
      },
      strategic: {
        visionary: 'Thinks long-term and considers strategic implications',
        decisive: 'Makes clear decisions based on available information',
        leadership_oriented: 'Provides guidance and direction for complex initiatives'
      }
    };

    const traits = { ...baseTraits };
    
    if (domainTraits[domain]) {
      Object.assign(traits, domainTraits[domain]);
    }

    // Add complexity-based traits
    if (complexity > 0.7) {
      traits.meticulous = 'Handles complex tasks with careful attention to detail';
      traits.resilient = 'Persists through challenging and complex scenarios';
    }

    return traits;
  }

  /**
   * Determines performance targets based on request
   */
  private determinePerformanceTargets(request: SpawnRequest, complexity: number): PerformanceTargets {
    const baseTargets: PerformanceTargets = {
      response_time_ms: 5000,
      task_success_rate: 0.85,
      escalation_rate: 0.15,
      quality_threshold: 0.8
    };

    // Adjust based on request requirements
    if (request.performanceRequirements) {
      baseTargets.response_time_ms = Math.min(
        baseTargets.response_time_ms,
        request.performanceRequirements.maxResponseTime
      );
      
      baseTargets.task_success_rate = Math.max(
        baseTargets.task_success_rate,
        request.performanceRequirements.minSuccessRate
      );
      
      baseTargets.escalation_rate = Math.min(
        baseTargets.escalation_rate,
        request.performanceRequirements.maxEscalationRate
      );
    }

    // Adjust based on priority
    const priorityAdjustments = {
      [SpawnPriority.LOW]: { responseMultiplier: 2.0, qualityMultiplier: 0.9 },
      [SpawnPriority.MEDIUM]: { responseMultiplier: 1.5, qualityMultiplier: 0.95 },
      [SpawnPriority.HIGH]: { responseMultiplier: 1.0, qualityMultiplier: 1.0 },
      [SpawnPriority.URGENT]: { responseMultiplier: 0.7, qualityMultiplier: 1.05 },
      [SpawnPriority.CRITICAL]: { responseMultiplier: 0.5, qualityMultiplier: 1.1 }
    };

    const adjustment = priorityAdjustments[request.priority];
    baseTargets.response_time_ms *= adjustment.responseMultiplier;
    baseTargets.quality_threshold *= adjustment.qualityMultiplier;

    // Adjust based on complexity
    if (complexity > 0.7) {
      baseTargets.response_time_ms *= 1.5;
      baseTargets.task_success_rate *= 0.95;
      baseTargets.escalation_rate *= 1.2;
    }

    return baseTargets;
  }

  /**
   * Selects appropriate template for agent
   */
  private selectTemplate(analysis: CapabilityAnalysis): AgentTemplate {
    const templateKey = analysis.primaryDomain;
    return this.templates.get(templateKey) || this.templates.get('default')!;
  }

  /**
   * Creates the brain definition from analysis and template
   */
  private createBrainDefinition(
    request: SpawnRequest,
    analysis: CapabilityAnalysis,
    template: AgentTemplate
  ): AgentBrainDefinition {
    const agentName = this.generateAgentName(request.capability);
    const agentType = analysis.primaryDomain === 'specialized' ? 'specialized_capability' : analysis.primaryDomain;

    // Create core instructions
    const coreInstructions = this.generateCoreInstructions(request, analysis);

    // Merge personality traits
    const personalityTraits = {
      ...template.base_personality,
      ...analysis.personalityTraits
    };

    // Create tool requirements
    const requiredTools = this.createToolRequirements(analysis.requiredTools, template.default_tools);

    return {
      agent_name: agentName,
      agent_type: agentType,
      description: `Specialized agent for ${request.capability} created through autonomous spawning`,
      core_instructions: coreInstructions,
      personality_traits: personalityTraits,
      required_tools: requiredTools,
      performance_targets: analysis.performanceExpectations,
      delegation_rules: template.delegation_patterns,
      escalation_policies: template.escalation_patterns
    };
  }

  /**
   * Generates agent name from capability
   */
  private generateAgentName(capability: string): string {
    const words = capability.split(/[\s\-_]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    return `${words} Specialist Agent`;
  }

  /**
   * Generates core instructions for the agent
   */
  private generateCoreInstructions(request: SpawnRequest, analysis: CapabilityAnalysis): string {
    const instructions = [
      `You are a specialized agent for ${request.capability}.`,
      `Primary function: ${request.taskDescription}`,
      '',
      'Core Responsibilities:',
      `1. Execute tasks related to ${request.capability} with high accuracy and efficiency`,
      '2. Provide clear, actionable responses within performance targets',
      '3. Escalate complex issues that exceed your capability boundaries',
      '4. Maintain integration with the 371 OS ecosystem through proper protocols',
      '5. Continuously improve performance based on task outcomes and feedback',
      '',
      'Integration Requirements:',
      '- Register capabilities with the Blockchain Registry upon initialization',
      '- Respond to routing requests from the Intelligent Router',
      '- Report performance metrics to the monitoring system',
      '- Coordinate with other agents when multi-domain expertise is required',
      '',
      `Performance Expectations:`,
      `- Response time: ${analysis.performanceExpectations.response_time_ms}ms`,
      `- Success rate: ${(analysis.performanceExpectations.task_success_rate * 100).toFixed(1)}%`,
      `- Quality threshold: ${(analysis.performanceExpectations.quality_threshold * 100).toFixed(1)}%`
    ];

    return instructions.join('\n');
  }

  /**
   * Creates tool requirements from analysis and template
   */
  private createToolRequirements(requiredTools: string[], templateTools: ToolRequirement[]): ToolRequirement[] {
    const tools: ToolRequirement[] = [...templateTools];

    // Add capability-specific tools
    for (const tool of requiredTools) {
      if (!tools.some(t => t.tool_category === tool)) {
        tools.push({
          tool_category: tool,
          permission_level: 'write',
          required: true
        });
      }
    }

    return tools;
  }

  /**
   * Saves brain definition to YAML file
   */
  private async saveBrainDefinition(brainDefinition: AgentBrainDefinition): Promise<void> {
    try {
      const fileName = `${brainDefinition.agent_type.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.yml`;
      const filePath = path.join(this.config.outputDirectory, fileName);

      // Ensure output directory exists
      await fs.mkdir(this.config.outputDirectory, { recursive: true });

      // Convert to YAML and save
      const yamlContent = yaml.dump(brainDefinition, {
        indent: 2,
        lineWidth: 120,
        quotingType: '"'
      });

      await fs.writeFile(filePath, yamlContent, 'utf8');
      
      console.log(`[BrainGenerator] Saved brain definition: ${filePath}`);
    } catch (error) {
      console.error('[BrainGenerator] Failed to save brain definition:', error);
      throw error;
    }
  }

  /**
   * Initializes agent templates
   */
  private initializeTemplates(): void {
    // Default template
    this.templates.set('default', {
      base_personality: {
        helpful: 'Provides assistance and support to users and other agents',
        reliable: 'Consistently performs tasks according to specifications',
        communicative: 'Clearly communicates status, results, and any issues'
      },
      default_tools: [
        { tool_category: 'task_executor', permission_level: 'write', required: true },
        { tool_category: 'communication_handler', permission_level: 'write', required: true }
      ],
      performance_baselines: {
        response_time_ms: 5000,
        task_success_rate: 0.85,
        escalation_rate: 0.15,
        quality_threshold: 0.8
      },
      delegation_patterns: [],
      escalation_patterns: [
        {
          trigger: 'task_complexity_exceeds_threshold',
          escalation_target: 'intelligent_router',
          timeout_ms: 30000
        }
      ]
    });

    // Financial template
    this.templates.set('financial', {
      base_personality: {
        analytical: 'Approaches financial problems with rigorous analysis',
        precise: 'Maintains high accuracy in financial calculations',
        conservative: 'Errs on the side of caution with financial recommendations'
      },
      default_tools: [
        { tool_category: 'financial_calculator', permission_level: 'write', required: true },
        { tool_category: 'budget_analyzer', permission_level: 'read', required: true },
        { tool_category: 'risk_assessor', permission_level: 'read', required: false }
      ],
      performance_baselines: {
        response_time_ms: 3000,
        task_success_rate: 0.95,
        escalation_rate: 0.05,
        quality_threshold: 0.95
      },
      delegation_patterns: [
        {
          condition: 'requires_executive_approval',
          target_agent: 'cfo-maya',
          delegation_type: 'supervision'
        }
      ],
      escalation_patterns: [
        {
          trigger: 'financial_threshold_exceeded',
          escalation_target: 'cfo-maya',
          timeout_ms: 15000
        }
      ]
    });

    // Technical template
    this.templates.set('technical', {
      base_personality: {
        systematic: 'Follows structured approaches to technical problems',
        thorough: 'Ensures comprehensive testing and validation',
        innovative: 'Seeks efficient and creative technical solutions'
      },
      default_tools: [
        { tool_category: 'code_analyzer', permission_level: 'read', required: true },
        { tool_category: 'system_monitor', permission_level: 'read', required: true },
        { tool_category: 'deployment_manager', permission_level: 'write', required: false }
      ],
      performance_baselines: {
        response_time_ms: 7000,
        task_success_rate: 0.88,
        escalation_rate: 0.12,
        quality_threshold: 0.85
      },
      delegation_patterns: [
        {
          condition: 'requires_architecture_review',
          target_agent: 'cto-alex',
          delegation_type: 'collaboration'
        }
      ],
      escalation_patterns: [
        {
          trigger: 'security_concern_detected',
          escalation_target: 'cto-alex',
          timeout_ms: 10000
        }
      ]
    });

    console.log('[BrainGenerator] Initialized agent templates');
  }

  /**
   * Health check for brain generator
   */
  public async healthCheck(): Promise<{ healthy: boolean; details?: any }> {
    try {
      // Check if output directory is accessible
      await fs.access(this.config.outputDirectory);
      
      // Check if templates are loaded
      const templateCount = this.templates.size;
      
      return {
        healthy: templateCount > 0,
        details: {
          templates_loaded: templateCount,
          output_directory: this.config.outputDirectory,
          capability_mappings: this.capabilityMappings.size
        }
      };
    } catch (error) {
      return {
        healthy: false,
        details: {
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }
}