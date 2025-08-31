/**
 * Nx Workspace Actions - The Agent's Construction Kit
 * 
 * These actions give agents the ability to manipulate their own digital reality.
 * Each action is a direct wrapper around powerful Nx commands.
 */

import { Action, IAgentRuntime, Memory, State, HandlerCallback } from '@elizaos/core';
import { NxWorkspaceProvider } from './provider';
import { 
  NxDependencyGraph, 
  NxAffectedProjects, 
  NxTestResults, 
  NxBuildResults, 
  NxGenerateOptions,
  WorkspaceAnalysis 
} from './types';

/**
 * Action: Get Dependency Graph
 * 
 * Executes `nx graph --file=output.json` and returns the structured JSON 
 * of the dependency graph. This is the agent's "eyes" - how it sees and 
 * understands its own world.
 */
export const getDependencyGraphAction: Action = {
  name: 'GET_DEPENDENCY_GRAPH',
  similes: [
    'ANALYZE_WORKSPACE_STRUCTURE',
    'VIEW_PROJECT_DEPENDENCIES',
    'GET_ARCHITECTURE_MAP',
    'UNDERSTAND_CODEBASE_CONNECTIONS'
  ],
  description: 'Retrieves the complete dependency graph of the Nx workspace, showing how all projects are interconnected',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return true; // No validation needed for graph retrieval
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options: any = {},
    callback?: HandlerCallback
  ): Promise<void> => {
    try {
      const provider = new NxWorkspaceProvider();
      const focus = options?.focus || null;
      
      const graph: NxDependencyGraph = await provider.getDependencyGraph(focus);
      
      if (callback) {
        callback({
          text: `Dependency graph retrieved successfully. Found ${Object.keys(graph.nodes).length} projects with ${Object.keys(graph.dependencies).reduce((acc, key) => acc + graph.dependencies[key].length, 0)} dependencies.`,
          content: {
            graph,
            analysis: {
              totalProjects: Object.keys(graph.nodes).length,
              totalDependencies: Object.keys(graph.dependencies).reduce((acc, key) => acc + graph.dependencies[key].length, 0),
              projectsByType: Object.values(graph.nodes).reduce((acc, node) => {
                acc[node.type] = (acc[node.type] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            }
          }
        });
      }
      
      return;
    } catch (error) {
      console.error('Failed to get dependency graph:', error);
      if (callback) {
        callback({
          text: `Failed to retrieve dependency graph: ${(error as Error).message}`,
          content: { error: (error as Error).message }
        });
      }
      return;
    }
  }
};

/**
 * Action: Find Affected Projects
 * 
 * Executes `nx affected --base=main --plain` and returns a list of all 
 * projects impacted by current changes. This enables surgical, efficient 
 * operations.
 */
export const findAffectedProjectsAction: Action = {
  name: 'FIND_AFFECTED_PROJECTS',
  similes: [
    'GET_IMPACTED_PROJECTS',
    'ANALYZE_CHANGE_IMPACT',
    'FIND_CHANGED_DEPENDENCIES',
    'GET_AFFECTED_SCOPE'
  ],
  description: 'Identifies all projects affected by recent changes, enabling targeted builds and tests',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options: any = {},
    callback?: HandlerCallback
  ): Promise<void> => {
    try {
      const provider = new NxWorkspaceProvider();
      const base = options?.base || 'main';
      
      const affected: NxAffectedProjects = await provider.findAffectedProjects(base);
      
      if (callback) {
        callback({
          text: `Found ${affected.projects.length} affected projects: ${affected.projects.join(', ')}`,
          content: {
            affected,
            summary: {
              affectedCount: affected.projects.length,
              taskCount: affected.tasks.length,
              projects: affected.projects
            }
          }
        });
      }
      
      return;
    } catch (error) {
      console.error('Failed to find affected projects:', error);
      if (callback) {
        callback({
          text: `Failed to find affected projects: ${(error as Error).message}`,
          content: { error: (error as Error).message }
        });
      }
      return;
    }
  }
};

/**
 * Action: Run Tests for Affected Projects
 * 
 * Executes `nx affected --target=test` and returns the results.
 * This enables agents to autonomously verify their changes.
 */
export const runTestsForAffectedAction: Action = {
  name: 'RUN_TESTS_AFFECTED',
  similes: [
    'TEST_AFFECTED_PROJECTS',
    'VERIFY_CHANGES',
    'RUN_IMPACTED_TESTS',
    'VALIDATE_MODIFICATIONS'
  ],
  description: 'Runs tests for all projects affected by recent changes',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options: any = {},
    callback?: HandlerCallback
  ): Promise<void> => {
    try {
      const provider = new NxWorkspaceProvider();
      const base = options?.base || 'main';
      
      const results: NxTestResults = await provider.runTestsForAffected(base);
      
      if (callback) {
        const passedProjects = Object.entries(results.projects).filter(([_, result]) => result.success);
        const failedProjects = Object.entries(results.projects).filter(([_, result]) => !result.success);
        
        callback({
          text: `Tests completed. ${passedProjects.length} projects passed, ${failedProjects.length} projects failed.`,
          content: {
            results,
            summary: {
              totalProjects: Object.keys(results.projects).length,
              passed: passedProjects.length,
              failed: failedProjects.length,
              overallSuccess: results.success
            }
          }
        });
      }
      
      return results.success;
    } catch (error) {
      console.error('Failed to run tests for affected projects:', error);
      if (callback) {
        callback({
          text: `Failed to run tests: ${(error as Error).message}`,
          content: { error: error.message }
        });
      }
      return;
    }
  }
};

/**
 * Action: Build Project
 * 
 * Executes `nx build <project>` and reports on success or failure.
 * This allows agents to create deployable artifacts.
 */
export const buildProjectAction: Action = {
  name: 'BUILD_PROJECT',
  similes: [
    'COMPILE_PROJECT',
    'CREATE_BUILD',
    'GENERATE_ARTIFACTS',
    'PREPARE_DEPLOYMENT'
  ],
  description: 'Builds a specific project or all affected projects',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options: any = {},
    callback?: HandlerCallback
  ): Promise<void> => {
    try {
      const provider = new NxWorkspaceProvider();
      const project = options?.project;
      
      const results: NxBuildResults = await provider.buildProject(project);
      
      if (callback) {
        const successfulBuilds = Object.entries(results.projects).filter(([_, result]) => result.success);
        const failedBuilds = Object.entries(results.projects).filter(([_, result]) => !result.success);
        
        callback({
          text: `Build completed. ${successfulBuilds.length} projects built successfully, ${failedBuilds.length} projects failed.`,
          content: {
            results,
            summary: {
              totalProjects: Object.keys(results.projects).length,
              successful: successfulBuilds.length,
              failed: failedBuilds.length,
              overallSuccess: results.success
            }
          }
        });
      }
      
      return results.success;
    } catch (error) {
      console.error('Failed to build project:', error);
      if (callback) {
        callback({
          text: `Failed to build project: ${(error as Error).message}`,
          content: { error: error.message }
        });
      }
      return;
    }
  }
};

/**
 * Action: Generate Scaffold
 * 
 * Executes `nx generate` commands to create new projects/components.
 * This allows agents to autonomously create new applications and libraries.
 */
export const generateScaffoldAction: Action = {
  name: 'GENERATE_SCAFFOLD',
  similes: [
    'CREATE_PROJECT',
    'SCAFFOLD_APPLICATION',
    'GENERATE_COMPONENT',
    'CREATE_LIBRARY'
  ],
  description: 'Generates new projects, applications, libraries, or components using Nx generators',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    const content = message.content;
    if (!content.type || !content.name) {
      return;
    }
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options: any = {},
    callback?: HandlerCallback
  ): Promise<void> => {
    try {
      const provider = new NxWorkspaceProvider();
      const generateOptions: NxGenerateOptions = {
        type: options?.type || message.content.type,
        name: options?.name || message.content.name,
        directory: options?.directory,
        tags: options?.tags || [],
        ...options
      };
      
      const success = await provider.generateScaffold(generateOptions);
      
      if (callback) {
        callback({
          text: success 
            ? `Successfully generated ${generateOptions.type} '${generateOptions.name}'`
            : `Failed to generate ${generateOptions.type} '${generateOptions.name}'`,
          content: {
            success,
            generated: generateOptions
          }
        });
      }
      
      return success;
    } catch (error) {
      console.error('Failed to generate scaffold:', error);
      if (callback) {
        callback({
          text: `Failed to generate scaffold: ${(error as Error).message}`,
          content: { error: error.message }
        });
      }
      return;
    }
  }
};

/**
 * Action: Analyze Workspace
 * 
 * Performs comprehensive workspace analysis including architectural smells,
 * circular dependencies, and optimization recommendations.
 */
export const analyzeWorkspaceAction: Action = {
  name: 'ANALYZE_WORKSPACE',
  similes: [
    'AUDIT_ARCHITECTURE',
    'ASSESS_CODE_QUALITY',
    'FIND_OPTIMIZATIONS',
    'EVALUATE_STRUCTURE'
  ],
  description: 'Performs comprehensive analysis of the workspace architecture and provides optimization recommendations',
  validate: async (runtime: IAgentRuntime, message: Memory) => {
    return true;
  },
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State,
    options: any = {},
    callback?: HandlerCallback
  ): Promise<void> => {
    try {
      const provider = new NxWorkspaceProvider();
      const analysis: WorkspaceAnalysis = await provider.analyzeWorkspace();
      
      if (callback) {
        callback({
          text: `Workspace analysis complete. Found ${analysis.totalProjects} projects with ${analysis.circularDependencies.length} circular dependencies and ${analysis.recommendations.length} optimization recommendations.`,
          content: {
            analysis,
            insights: {
              healthScore: analysis.circularDependencies.length === 0 ? 'Excellent' : 
                         analysis.circularDependencies.length < 3 ? 'Good' : 'Needs Attention',
              complexityLevel: analysis.dependencyComplexity < 10 ? 'Low' :
                              analysis.dependencyComplexity < 25 ? 'Medium' : 'High'
            }
          }
        });
      }
      
      return;
    } catch (error) {
      console.error('Failed to analyze workspace:', error);
      if (callback) {
        callback({
          text: `Failed to analyze workspace: ${(error as Error).message}`,
          content: { error: error.message }
        });
      }
      return;
    }
  }
};

/**
 * All Nx Workspace Actions
 */
export const NxWorkspaceActions = [
  getDependencyGraphAction,
  findAffectedProjectsAction,
  runTestsForAffectedAction,
  buildProjectAction,
  generateScaffoldAction,
  analyzeWorkspaceAction
];