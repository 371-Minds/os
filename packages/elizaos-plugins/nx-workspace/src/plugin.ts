/**
 * Nx Workspace Plugin for ElizaOS
 *
 * This plugin enables agents to become self-aware and self-modifying by giving them
 * direct access to the Nx workspace commands that control their own digital reality.
 */

import type { Plugin } from '@elizaos/core';
import { NxWorkspaceActions } from './actions';
import { NxWorkspaceProvider } from './provider';

/**
 * The Nx Workspace Plugin
 *
 * When loaded into an ElizaOS agent, this plugin provides the agent with
 * the ability to:
 *
 * 1. Understand its own codebase structure (dependency graph)
 * 2. Identify what will be affected by changes (affected analysis)
 * 3. Test and validate modifications (automated testing)
 * 4. Build and deploy components (build management)
 * 5. Create new projects and components (scaffold generation)
 * 6. Analyze and optimize the architecture (workspace analysis)
 *
 * This represents the evolutionary leap from agents that just "run" the business
 * to agents that can "build and repair" the business itself.
 */
export const NxWorkspacePlugin: Plugin = {
  name: 'nx-workspace',
  description:
    'Enables agents to understand and manipulate their own Nx workspace for true self-awareness',
  actions: NxWorkspaceActions,
  evaluators: [],
  providers: [],

  /**
   * Plugin initialization
   *
   * Sets up the workspace provider and validates that we're in an Nx workspace
   */
  async onLoad(runtime: any) {
    console.log('🏗️  Loading Nx Workspace Plugin...');

    try {
      // Validate that we're in an Nx workspace
      const provider = new NxWorkspaceProvider();

      // Try to get a basic dependency graph to validate setup
      const graph = await provider.getDependencyGraph();

      console.log(`✅ Nx Workspace Plugin loaded successfully!`);
      console.log(
        `   📊 Found ${Object.keys(graph.nodes).length} projects in workspace`,
      );
      console.log(
        `   🔗 Total dependencies: ${Object.keys(graph.dependencies).reduce((acc, key) => acc + graph.dependencies[key].length, 0)}`,
      );

      // Store provider instance for actions to use
      runtime.registerService('nxWorkspaceProvider', provider);

      return true;
    } catch (error) {
      console.error(
        '❌ Failed to load Nx Workspace Plugin:',
        (error as Error).message,
      );
      console.error('   Make sure you are in a valid Nx workspace directory');
      return false;
    }
  },

  /**
   * Plugin cleanup
   */
  async onUnload(runtime: any) {
    console.log('🏗️  Unloading Nx Workspace Plugin...');
    runtime.unregisterService('nxWorkspaceProvider');
  },
};
