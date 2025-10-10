import type { Address } from './types.js';
import { CommunityRole } from './types.js';
import type { 
  AgentCommunityAssignment, 
  AgentPerformanceMetrics,
  CommunityDAO 
} from './types.js';
import { StatusNetworkCommunityManager } from './community-manager.js';
import { logger } from './utils/logger.js';

export interface AgentCapability {
  name: string;
  description: string;
  category: 'technical' | 'business' | 'creative' | 'coordination';
  skillLevel: number; // 1-10
  communitySpecific: boolean;
}

export class AgentCommunityCoordinator {
  private communityManager: StatusNetworkCommunityManager;
  private agentAssignments: Map<string, AgentCommunityAssignment[]> = new Map();
  private agentCapabilities: Map<string, AgentCapability[]> = new Map();

  constructor(communityManager: StatusNetworkCommunityManager) {
    this.communityManager = communityManager;
    this.initializeAgentCapabilities();
  }

  /**
   * Assign an agent to a community with specific role and capabilities
   */
  async assignAgentToCommunity(
    agentId: string,
    communityId: string,
    role: CommunityRole,
    capabilities: string[] = []
  ): Promise<void> {
    try {
      logger.info('Assigning agent to community', {
        agentId,
        communityId,
        role,
        capabilities: capabilities.length
      });

      // Validate community exists
      const community = await this.communityManager.getCommunity(communityId);
      if (!community) {
        throw new Error(`Community ${communityId} not found`);
      }

      // Validate agent capabilities
      const agentCaps = this.agentCapabilities.get(agentId) || [];
      const validCapabilities = capabilities.filter(cap => 
        agentCaps.some(ac => ac.name === cap)
      );

      if (validCapabilities.length !== capabilities.length) {
        logger.warn('Some capabilities not found for agent', {
          agentId,
          requested: capabilities,
          valid: validCapabilities
        });
      }

      // Create assignment
      const assignment: AgentCommunityAssignment = {
        agentId,
        communityId,
        role,
        capabilities: validCapabilities,
        compensationRate: this.calculateCompensationRate(role, validCapabilities),
        performanceMetrics: {
          tasksCompleted: 0,
          successRate: 1.0,
          communityRating: 5.0,
          totalEarnings: BigInt(0),
          lastActive: new Date()
        }
      };

      // Store assignment
      const existingAssignments = this.agentAssignments.get(agentId) || [];
      const updatedAssignments = existingAssignments.filter(a => a.communityId !== communityId);
      updatedAssignments.push(assignment);
      this.agentAssignments.set(agentId, updatedAssignments);

      // Configure agent for community-specific tasks
      await this.configureAgentCapabilities(agentId, communityId, validCapabilities);

      // Setup SNT compensation mechanisms
      await this.setupAgentCompensation(agentId, communityId, assignment.compensationRate);

      logger.info('Agent successfully assigned to community', {
        agentId,
        communityId,
        role,
        compensationRate: assignment.compensationRate.toString()
      });

    } catch (error) {
      logger.error('Failed to assign agent to community', {
        agentId,
        communityId,
        role,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Update agent performance metrics
   */
  async updateAgentPerformance(
    agentId: string,
    communityId: string,
    metrics: Partial<AgentPerformanceMetrics>
  ): Promise<void> {
    const assignments = this.agentAssignments.get(agentId) || [];
    const assignment = assignments.find(a => a.communityId === communityId);

    if (!assignment) {
      throw new Error(`Agent ${agentId} not assigned to community ${communityId}`);
    }

    // Update metrics
    Object.assign(assignment.performanceMetrics, metrics);
    assignment.performanceMetrics.lastActive = new Date();

    // Process compensation if tasks completed
    if (metrics.tasksCompleted && metrics.tasksCompleted > 0) {
      await this.communityManager.manageAgentCompensation(
        agentId,
        assignment.performanceMetrics
      );
    }

    logger.info('Agent performance updated', {
      agentId,
      communityId,
      metrics: assignment.performanceMetrics
    });
  }

  /**
   * Get agent assignments for a specific community
   */
  getCommunityAgents(communityId: string): AgentCommunityAssignment[] {
    const allAssignments: AgentCommunityAssignment[] = [];
    
    for (const assignments of this.agentAssignments.values()) {
      allAssignments.push(...assignments.filter(a => a.communityId === communityId));
    }

    return allAssignments;
  }

  /**
   * Get all assignments for a specific agent
   */
  getAgentAssignments(agentId: string): AgentCommunityAssignment[] {
    return this.agentAssignments.get(agentId) || [];
  }

  /**
   * Remove agent from community
   */
  async removeAgentFromCommunity(agentId: string, communityId: string): Promise<void> {
    const assignments = this.agentAssignments.get(agentId) || [];
    const updatedAssignments = assignments.filter(a => a.communityId !== communityId);
    
    if (updatedAssignments.length === assignments.length) {
      throw new Error(`Agent ${agentId} not assigned to community ${communityId}`);
    }

    this.agentAssignments.set(agentId, updatedAssignments);

    logger.info('Agent removed from community', { agentId, communityId });
  }

  /**
   * Initialize default agent capabilities for 371 OS agents
   */
  private initializeAgentCapabilities(): void {
    // CEO Agent (Mimi) capabilities
    this.agentCapabilities.set('ceo-mimi', [
      { name: 'strategic-planning', description: 'High-level strategic decision making', category: 'business', skillLevel: 10, communitySpecific: false },
      { name: 'cost-optimization', description: 'Financial efficiency optimization', category: 'business', skillLevel: 9, communitySpecific: false },
      { name: 'cross-community-coordination', description: 'Inter-community project management', category: 'coordination', skillLevel: 10, communitySpecific: false },
      { name: 'stakeholder-management', description: 'Community leader relationship management', category: 'business', skillLevel: 9, communitySpecific: true }
    ]);

    // CTO Agent (Zara) capabilities
    this.agentCapabilities.set('cto-zara', [
      { name: 'technical-architecture', description: 'System design and technical leadership', category: 'technical', skillLevel: 10, communitySpecific: false },
      { name: 'plugin-development', description: 'ElizaOS plugin ecosystem expansion', category: 'technical', skillLevel: 9, communitySpecific: true },
      { name: 'blockchain-integration', description: 'Decentralized system coordination', category: 'technical', skillLevel: 8, communitySpecific: false },
      { name: 'security-optimization', description: 'System security and trust frameworks', category: 'technical', skillLevel: 9, communitySpecific: false }
    ]);

    // CFO Agent (Maya) capabilities
    this.agentCapabilities.set('cfo-maya', [
      { name: 'treasury-management', description: 'Community treasury optimization', category: 'business', skillLevel: 10, communitySpecific: true },
      { name: 'tokenomics-design', description: 'Economic model development', category: 'business', skillLevel: 9, communitySpecific: false },
      { name: 'financial-analytics', description: 'Performance and ROI analysis', category: 'business', skillLevel: 9, communitySpecific: false },
      { name: 'dao-governance', description: 'Decentralized governance coordination', category: 'coordination', skillLevel: 8, communitySpecific: true }
    ]);

    // CMO Agent capabilities
    this.agentCapabilities.set('cmo-agent', [
      { name: 'community-growth', description: 'Member acquisition and engagement', category: 'business', skillLevel: 9, communitySpecific: true },
      { name: 'content-strategy', description: 'Community content and messaging', category: 'creative', skillLevel: 8, communitySpecific: true },
      { name: 'event-coordination', description: 'Community events and hackathons', category: 'coordination', skillLevel: 9, communitySpecific: true },
      { name: 'brand-management', description: 'Community identity and reputation', category: 'creative', skillLevel: 8, communitySpecific: true }
    ]);

    logger.info('Agent capabilities initialized', {
      totalAgents: this.agentCapabilities.size,
      totalCapabilities: Array.from(this.agentCapabilities.values()).reduce((sum, caps) => sum + caps.length, 0)
    });
  }

  /**
   * Configure agent for community-specific tasks
   */
  private async configureAgentCapabilities(
    agentId: string,
    communityId: string,
    capabilities: string[]
  ): Promise<void> {
    // This would integrate with the agent's configuration system
    // For now, we'll log the configuration
    logger.info('Configuring agent capabilities', {
      agentId,
      communityId,
      capabilities
    });

    // TODO: Implement actual agent configuration
    // This would involve:
    // 1. Updating agent's prompt/instructions
    // 2. Configuring access to community-specific tools
    // 3. Setting up community-specific knowledge base access
  }

  /**
   * Setup SNT compensation mechanisms for agent
   */
  private async setupAgentCompensation(
    agentId: string,
    communityId: string,
    compensationRate: bigint
  ): Promise<void> {
    // This would set up automatic compensation triggers
    logger.info('Setting up agent compensation', {
      agentId,
      communityId,
      compensationRate: compensationRate.toString()
    });

    // TODO: Implement compensation automation
    // This would involve:
    // 1. Setting up smart contract triggers
    // 2. Configuring performance monitoring
    // 3. Automating payment distribution
  }

  /**
   * Calculate compensation rate based on role and capabilities
   */
  private calculateCompensationRate(role: CommunityRole, capabilities: string[]): bigint {
    // Base rates in SNT (wei units, 18 decimals)
    const baseRates = {
      [CommunityRole.MEMBER]: BigInt(50),      // 50 SNT per task
      [CommunityRole.MODERATOR]: BigInt(100),  // 100 SNT per task
      [CommunityRole.ADMIN]: BigInt(200),      // 200 SNT per task  
      [CommunityRole.AGENT]: BigInt(150),      // 150 SNT per task
      [CommunityRole.VALIDATOR]: BigInt(75)    // 75 SNT per task
    };

    const baseRate = baseRates[role];
    
    // Capability bonus: 10 SNT per capability
    const capabilityBonus = BigInt(capabilities.length) * BigInt(10);
    
    // Convert to wei (18 decimals) - 1 followed by 18 zeros
    const weiMultiplier = BigInt('1000000000000000000'); // 10^18
    return (baseRate + capabilityBonus) * weiMultiplier;
  }

  /**
   * Get agent performance summary across all communities
   */
  getAgentPerformanceSummary(agentId: string): {
    totalCommunities: number;
    totalTasksCompleted: number;
    averageSuccessRate: number;
    averageRating: number;
    totalEarnings: bigint;
  } {
    const assignments = this.agentAssignments.get(agentId) || [];
    
    if (assignments.length === 0) {
      return {
        totalCommunities: 0,
        totalTasksCompleted: 0,
        averageSuccessRate: 0,
        averageRating: 0,
        totalEarnings: BigInt(0)
      };
    }

    const totalTasksCompleted = assignments.reduce((sum, a) => sum + a.performanceMetrics.tasksCompleted, 0);
    const averageSuccessRate = assignments.reduce((sum, a) => sum + a.performanceMetrics.successRate, 0) / assignments.length;
    const averageRating = assignments.reduce((sum, a) => sum + a.performanceMetrics.communityRating, 0) / assignments.length;
    const totalEarnings = assignments.reduce((sum, a) => sum + a.performanceMetrics.totalEarnings, BigInt(0));

    return {
      totalCommunities: assignments.length,
      totalTasksCompleted,
      averageSuccessRate,
      averageRating,
      totalEarnings
    };
  }
}