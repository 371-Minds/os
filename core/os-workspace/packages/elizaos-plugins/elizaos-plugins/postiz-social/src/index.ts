/**
 * Postiz Social Media Plugin for ElizaOS
 * 371 OS Integration - Revolutionary cognitive-aware social media management
 * 
 * @module @elizaos/plugin-postiz-social
 */

export * from './types.js';
export * from './provider.js';
export * from './actions.js';
export * from './spatial.js';
export * from './agent.js';

import { PostizProvider } from './provider.js';
import { PostizActions } from './actions.js';
import { SocialMediaAgent, type SocialMediaAgentConfig } from './agent.js';
import { SpatialSocialMediaUniverse } from './spatial.js';
import type { PostizPluginConfig } from './types.js';

/**
 * Plugin version
 */
export const PLUGIN_VERSION = '1.0.0';

/**
 * Plugin name
 */
export const PLUGIN_NAME = '@elizaos/plugin-postiz-social';

/**
 * Initialize Postiz plugin
 */
export function initializePostizPlugin(config: PostizPluginConfig) {
  const provider = new PostizProvider(config);
  const actions = new PostizActions(provider);

  return {
    provider,
    actions,
    version: PLUGIN_VERSION,
    name: PLUGIN_NAME,
  };
}

/**
 * Create Social Media Agent
 */
export function createSocialMediaAgent(
  provider: PostizProvider,
  agentConfig: SocialMediaAgentConfig
) {
  return new SocialMediaAgent(provider, agentConfig);
}

/**
 * Postiz Plugin Factory
 * Main entry point for 371 OS integration
 */
export class PostizPlugin {
  private provider: PostizProvider;
  private actions: PostizActions;
  private agents: Map<string, SocialMediaAgent>;

  constructor(config: PostizPluginConfig) {
    this.provider = new PostizProvider(config);
    this.actions = new PostizActions(this.provider);
    this.agents = new Map();
  }

  /**
   * Get provider instance
   */
  getProvider(): PostizProvider {
    return this.provider;
  }

  /**
   * Get actions handler
   */
  getActions(): PostizActions {
    return this.actions;
  }

  /**
   * Create and register an agent
   */
  createAgent(id: string, config: SocialMediaAgentConfig): SocialMediaAgent {
    const agent = new SocialMediaAgent(this.provider, config);
    this.agents.set(id, agent);
    return agent;
  }

  /**
   * Get registered agent
   */
  getAgent(id: string): SocialMediaAgent | undefined {
    return this.agents.get(id);
  }

  /**
   * Get all registered agents
   */
  getAllAgents(): Map<string, SocialMediaAgent> {
    return this.agents;
  }

  /**
   * Generate spatial visualization
   */
  async getSpatialVisualization(startDate: string, endDate: string) {
    const analytics = await this.provider.getSpatialAnalytics(startDate, endDate);
    const visualization = SpatialSocialMediaUniverse.generateVisualization(analytics);
    return SpatialSocialMediaUniverse.exportForOrrery(visualization);
  }

  /**
   * Get plugin info
   */
  getInfo() {
    return {
      name: PLUGIN_NAME,
      version: PLUGIN_VERSION,
      description: 'Social media management with cognitive-aware interfaces',
      agents: Array.from(this.agents.keys()),
    };
  }
}

/**
 * Default export
 */
export default PostizPlugin;
