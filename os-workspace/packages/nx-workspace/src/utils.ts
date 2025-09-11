/**
 * Utility functions for the Nx Workspace Plugin
 */

import { promises as fs } from 'fs';
import { join } from 'path';
import type { NxDependencyGraph, WorkspaceAnalysis } from './types';

/**
 * Check if the current directory is an Nx workspace
 */
export async function isNxWorkspace(
  workspaceRoot: string = process.cwd(),
): Promise<boolean> {
  try {
    const nxJsonPath = join(workspaceRoot, 'nx.json');
    await fs.access(nxJsonPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get workspace configuration
 */
export async function getWorkspaceConfig(
  workspaceRoot: string = process.cwd(),
): Promise<any> {
  try {
    const nxJsonPath = join(workspaceRoot, 'nx.json');
    const nxConfig = await fs.readFile(nxJsonPath, 'utf-8');
    return JSON.parse(nxConfig);
  } catch (error) {
    throw new Error(
      `Failed to read workspace configuration: ${(error as Error).message}`,
    );
  }
}

/**
 * Find circular dependencies in the dependency graph
 */
export function findCircularDependencies(graph: NxDependencyGraph): string[][] {
  const circularPaths: string[][] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();

  function dfs(node: string, path: string[]): void {
    if (recursionStack.has(node)) {
      // Found a cycle - extract the circular part
      const cycleStart = path.indexOf(node);
      if (cycleStart !== -1) {
        circularPaths.push([...path.slice(cycleStart), node]);
      }
      return;
    }

    if (visited.has(node)) {
      return;
    }

    visited.add(node);
    recursionStack.add(node);
    path.push(node);

    // Visit all dependencies
    const dependencies = graph.dependencies[node] || [];
    for (const dep of dependencies) {
      dfs(dep.target, path);
    }

    recursionStack.delete(node);
    path.pop();
  }

  // Start DFS from each node
  for (const node of Object.keys(graph.nodes)) {
    if (!visited.has(node)) {
      dfs(node, []);
    }
  }

  return circularPaths;
}

/**
 * Calculate dependency complexity metrics
 */
export function calculateComplexityMetrics(graph: NxDependencyGraph) {
  const nodes = Object.keys(graph.nodes);
  const totalNodes = nodes.length;

  // Calculate in-degree and out-degree for each node
  const inDegree = new Map<string, number>();
  const outDegree = new Map<string, number>();

  // Initialize
  for (const node of nodes) {
    inDegree.set(node, 0);
    outDegree.set(node, 0);
  }

  // Count degrees
  for (const [source, dependencies] of Object.entries(graph.dependencies)) {
    outDegree.set(source, dependencies.length);

    for (const dep of dependencies) {
      inDegree.set(dep.target, (inDegree.get(dep.target) || 0) + 1);
    }
  }

  // Calculate metrics
  const maxInDegree = Math.max(...Array.from(inDegree.values()));
  const maxOutDegree = Math.max(...Array.from(outDegree.values()));
  const avgInDegree =
    Array.from(inDegree.values()).reduce((a, b) => a + b, 0) / totalNodes;
  const avgOutDegree =
    Array.from(outDegree.values()).reduce((a, b) => a + b, 0) / totalNodes;

  // Complexity score (0-100, where 100 is most complex)
  const complexityScore = Math.min(
    100,
    maxInDegree * 10 + maxOutDegree * 10 + avgInDegree * 5 + avgOutDegree * 5,
  );

  return {
    totalNodes,
    maxInDegree,
    maxOutDegree,
    avgInDegree,
    avgOutDegree,
    complexityScore,
  };
}

/**
 * Generate architectural recommendations based on analysis
 */
export function generateRecommendations(analysis: WorkspaceAnalysis): string[] {
  const recommendations: string[] = [];

  // Check project distribution
  const {
    projectsByType,
    totalProjects,
    circularDependencies,
    orphanedProjects,
  } = analysis;
  const libRatio = (projectsByType['lib'] || 0) / totalProjects;
  const appRatio = (projectsByType['app'] || 0) / totalProjects;

  if (libRatio < 0.3 && totalProjects > 5) {
    recommendations.push(
      'Consider extracting shared functionality into libraries. A healthy ratio is typically 70% libraries to 30% applications.',
    );
  }

  if (appRatio > 0.7) {
    recommendations.push(
      'High number of applications detected. Consider consolidating related apps or extracting common functionality into shared libraries.',
    );
  }

  // Circular dependencies
  if (circularDependencies.length > 0) {
    recommendations.push(
      `Found ${circularDependencies.length} circular dependencies. These should be resolved to prevent build issues and improve maintainability.`,
    );
  }

  // Orphaned projects
  if (orphanedProjects.length > 0) {
    recommendations.push(
      `${orphanedProjects.length} projects appear to be orphaned (no dependencies in either direction). Consider removing unused projects or better integration.`,
    );
  }

  // Complexity recommendations
  if (analysis.dependencyComplexity > 50) {
    recommendations.push(
      'High dependency complexity detected. Consider implementing a layered architecture with clear boundaries between domains.',
    );
  }

  if (analysis.dependencyComplexity > 100) {
    recommendations.push(
      'Very high complexity detected. Consider breaking down large projects into smaller, more focused libraries.',
    );
  }

  return recommendations;
}

/**
 * Format project statistics for display
 */
export function formatProjectStats(graph: NxDependencyGraph) {
  const stats = calculateComplexityMetrics(graph);
  const projectsByType = Object.values(graph.nodes).reduce(
    (acc, node) => {
      acc[node.type] = (acc[node.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return {
    overview: {
      totalProjects: stats.totalNodes,
      applications: projectsByType['app'] || 0,
      libraries: projectsByType['lib'] || 0,
      e2eTests: projectsByType['e2e'] || 0,
    },
    complexity: {
      score: Math.round(stats.complexityScore),
      level:
        stats.complexityScore < 25
          ? 'Low'
          : stats.complexityScore < 50
            ? 'Medium'
            : stats.complexityScore < 75
              ? 'High'
              : 'Very High',
      maxIncomingDependencies: stats.maxInDegree,
      maxOutgoingDependencies: stats.maxOutDegree,
      averageIncoming: Math.round(stats.avgInDegree * 100) / 100,
      averageOutgoing: Math.round(stats.avgOutDegree * 100) / 100,
    },
  };
}
