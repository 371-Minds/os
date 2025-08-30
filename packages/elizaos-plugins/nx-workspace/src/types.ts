/**
 * Type definitions for the Nx Workspace Plugin
 */

export interface NxDependencyGraph {
  nodes: Record<string, NxProjectNode>;
  dependencies: Record<string, NxDependency[]>;
  version: string;
}

export interface NxProjectNode {
  name: string;
  type: 'app' | 'lib' | 'e2e';
  data: {
    root: string;
    sourceRoot?: string;
    projectType: string;
    targets?: Record<string, any>;
    tags?: string[];
    metadata?: Record<string, any>;
  };
}

export interface NxDependency {
  source: string;
  target: string;
  type: 'static' | 'dynamic' | 'implicit';
}

export interface NxAffectedProjects {
  projects: string[];
  tasks: NxTask[];
}

export interface NxTask {
  id: string;
  target: {
    project: string;
    target: string;
    configuration?: string;
  };
  overrides: Record<string, any>;
}

export interface NxTestResults {
  success: boolean;
  projects: {
    [projectName: string]: {
      success: boolean;
      tests: number;
      failures: number;
      coverage?: number;
      output?: string;
    };
  };
}

export interface NxBuildResults {
  success: boolean;
  projects: {
    [projectName: string]: {
      success: boolean;
      outputPath?: string;
      size?: number;
      errors?: string[];
      warnings?: string[];
    };
  };
}

export interface NxGenerateOptions {
  type: 'app' | 'lib' | 'component' | 'service';
  name: string;
  directory?: string;
  tags?: string[];
  [key: string]: any;
}

export interface WorkspaceAnalysis {
  totalProjects: number;
  projectsByType: Record<string, number>;
  dependencyComplexity: number;
  circularDependencies: string[][];
  orphanedProjects: string[];
  recommendations: string[];
}