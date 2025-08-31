/**
 * Nx Workspace Provider - The Interface to Agent Self-Manipulation
 * 
 * This provider executes actual Nx commands and provides structured data
 * to the agents. It's the bridge between agent intentions and workspace reality.
 */

import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import * as fsExtra from 'fs-extra';
import {
  NxDependencyGraph,
  NxAffectedProjects, 
  NxTestResults,
  NxBuildResults,
  NxGenerateOptions,
  WorkspaceAnalysis
} from './types';

export class NxWorkspaceProvider {
  private workspaceRoot: string;

  constructor(workspaceRoot?: string) {
    this.workspaceRoot = workspaceRoot || process.cwd();
  }

  /**
   * Get Dependency Graph
   * 
   * Executes `nx graph --file=output.json` and parses the result
   */
  async getDependencyGraph(focus?: string): Promise<NxDependencyGraph> {
    try {
      const outputFile = join(this.workspaceRoot, 'tmp', 'dependency-graph.json');
      
      // Ensure tmp directory exists
      await fsExtra.ensureDir(join(this.workspaceRoot, 'tmp'));
      
      // Build nx graph command
      let command = `npx nx graph --file=${outputFile}`;
      if (focus) {
        command += ` --focus=${focus}`;
      }
      
      // Execute command
      execSync(command, { 
        cwd: this.workspaceRoot,
        stdio: 'pipe'
      });
      
      // Read and parse the generated graph file
      const graphContent = await fs.readFile(outputFile, 'utf-8');
      const graph: NxDependencyGraph = JSON.parse(graphContent);
      
      // Clean up temp file
      await fs.unlink(outputFile).catch(() => {});
      
      return graph;
    } catch (error) {
      console.error('Error generating dependency graph:', error);
      throw new Error(`Failed to generate dependency graph: ${(error as Error).message}`);
    }
  }

  /**
   * Find Affected Projects
   * 
   * Executes `nx affected --base=<base>` and returns affected projects
   */
  async findAffectedProjects(base: string = 'main'): Promise<NxAffectedProjects> {
    try {
      // Get affected projects as plain list
      const projectsOutput = execSync(`npx nx affected:apps --base=${base} --plain`, {
        cwd: this.workspaceRoot,
        encoding: 'utf-8'
      });
      
      const libsOutput = execSync(`npx nx affected:libs --base=${base} --plain`, {
        cwd: this.workspaceRoot,
        encoding: 'utf-8'
      });
      
      // Parse project names
      const apps = projectsOutput.trim().split('\n').filter(line => line.trim());
      const libs = libsOutput.trim().split('\n').filter(line => line.trim());
      const projects = [...apps, ...libs].filter(project => project !== '');
      
      // Get detailed task information
      const tasksOutput = execSync(`npx nx affected --target=build --base=${base} --dry-run`, {
        cwd: this.workspaceRoot,
        encoding: 'utf-8'
      });
      
      // Parse tasks (simplified - would need more sophisticated parsing in production)
      const tasks = projects.map(project => ({
        id: `${project}:build`,
        target: {
          project,
          target: 'build'
        },
        overrides: {}
      }));
      
      return {
        projects,
        tasks
      };
    } catch (error) {
      console.error('Error finding affected projects:', error);
      throw new Error(`Failed to find affected projects: ${(error as Error).message}`);
    }
  }

  /**
   * Run Tests for Affected Projects
   * 
   * Executes `nx affected --target=test` and returns results
   */
  async runTestsForAffected(base: string = 'main'): Promise<NxTestResults> {
    try {
      let overallSuccess = true;
      const projectResults: Record<string, any> = {};
      
      // Get affected projects first
      const affected = await this.findAffectedProjects(base);
      
      if (affected.projects.length === 0) {
        return {
          success: true,
          projects: {}
        };
      }
      
      // Run tests for affected projects
      try {
        const output = execSync(`npx nx affected --target=test --base=${base}`, {
          cwd: this.workspaceRoot,
          encoding: 'utf-8'
        });
        
        // Parse test results (simplified parsing)
        for (const project of affected.projects) {
          projectResults[project] = {
            success: true, // Would parse actual results in production
            tests: 0,
            failures: 0,
            output: output
          };
        }
      } catch (error) {
        overallSuccess = false;
        
        // Parse failed results
        for (const project of affected.projects) {
          projectResults[project] = {
            success: false,
            tests: 0,
            failures: 1,
            output: (error as Error).message
          };
        }
      }
      
      return {
        success: overallSuccess,
        projects: projectResults
      };
    } catch (error) {
      console.error('Error running tests for affected projects:', error);
      throw new Error(`Failed to run tests: ${(error as Error).message}`);
    }
  }

  /**
   * Build Project
   * 
   * Executes `nx build <project>` or builds all affected projects
   */
  async buildProject(project?: string): Promise<NxBuildResults> {
    try {
      let overallSuccess = true;
      const projectResults: Record<string, any> = {};
      
      let command: string;
      let targetProjects: string[];
      
      if (project) {
        command = `npx nx build ${project}`;
        targetProjects = [project];
      } else {
        // Build all affected projects
        const affected = await this.findAffectedProjects();
        command = `npx nx affected --target=build`;
        targetProjects = affected.projects;
      }
      
      if (targetProjects.length === 0) {
        return {
          success: true,
          projects: {}
        };
      }
      
      try {
        const output = execSync(command, {
          cwd: this.workspaceRoot,
          encoding: 'utf-8'
        });
        
        // Parse build results (simplified)
        for (const proj of targetProjects) {
          projectResults[proj] = {
            success: true,
            outputPath: `dist/${proj}`,
            size: 0, // Would calculate actual size in production
            errors: [],
            warnings: []
          };
        }
      } catch (error) {
        overallSuccess = false;
        
        for (const proj of targetProjects) {
          projectResults[proj] = {
            success: false,
            errors: [error.message],
            warnings: []
          };
        }
      }
      
      return {
        success: overallSuccess,
        projects: projectResults
      };
    } catch (error) {
      console.error('Error building project:', error);
      throw new Error(`Failed to build project: ${(error as Error).message}`);
    }
  }

  /**
   * Generate Scaffold
   * 
   * Executes `nx generate` commands to create new projects/components
   */
  async generateScaffold(options: NxGenerateOptions): Promise<boolean> {
    try {
      let generator: string;
      let command: string;
      
      switch (options.type) {
        case 'app':
          generator = '@nx/react:application';
          break;
        case 'lib':
          generator = '@nx/js:library';
          break;
        case 'component':
          generator = '@nx/react:component';
          break;
        case 'service':
          generator = '@nx/node:service';
          break;
        default:
          throw new Error(`Unsupported generator type: ${options.type}`);
      }
      
      command = `npx nx generate ${generator} ${options.name}`;
      
      // Add additional options
      if (options.directory) {
        command += ` --directory=${options.directory}`;
      }
      
      if (options.tags && options.tags.length > 0) {
        command += ` --tags=${options.tags.join(',')}`;
      }
      
      // Add any other options
      Object.entries(options).forEach(([key, value]) => {
        if (!['type', 'name', 'directory', 'tags'].includes(key) && value !== undefined) {
          command += ` --${key}=${value}`;
        }
      });
      
      execSync(command, {
        cwd: this.workspaceRoot,
        stdio: 'pipe'
      });
      
      return true;
    } catch (error) {
      console.error('Error generating scaffold:', error);
      return false;
    }
  }

  /**
   * Analyze Workspace
   * 
   * Performs comprehensive workspace analysis
   */
  async analyzeWorkspace(): Promise<WorkspaceAnalysis> {
    try {
      // Get dependency graph for analysis
      const graph = await this.getDependencyGraph();
      
      // Calculate metrics
      const totalProjects = Object.keys(graph.nodes).length;
      const projectsByType = Object.values(graph.nodes).reduce((acc, node) => {
        acc[node.type] = (acc[node.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      // Calculate dependency complexity (simplified)
      const dependencyComplexity = Object.keys(graph.dependencies).reduce((acc, key) => {
        return acc + graph.dependencies[key].length;
      }, 0);
      
      // Detect circular dependencies (simplified algorithm)
      const circularDependencies: string[][] = [];
      // TODO: Implement proper circular dependency detection
      
      // Find orphaned projects (projects with no dependencies or dependents)
      const orphanedProjects = Object.keys(graph.nodes).filter(project => {
        const hasIncoming = Object.values(graph.dependencies).some(deps => 
          deps.some(dep => dep.target === project)
        );
        const hasOutgoing = graph.dependencies[project] && graph.dependencies[project].length > 0;
        return !hasIncoming && !hasOutgoing;
      });
      
      // Generate recommendations
      const recommendations: string[] = [];
      
      if (orphanedProjects.length > 0) {
        recommendations.push(`Consider consolidating or removing ${orphanedProjects.length} orphaned projects: ${orphanedProjects.join(', ')}`);
      }
      
      if (dependencyComplexity > 50) {
        recommendations.push('High dependency complexity detected. Consider creating shared libraries to reduce coupling.');
      }
      
      const appCount = projectsByType['app'] || 0;
      const libCount = projectsByType['lib'] || 0;
      
      if (appCount > 0 && libCount === 0) {
        recommendations.push('Consider extracting shared functionality into libraries for better reusability.');
      }
      
      return {
        totalProjects,
        projectsByType,
        dependencyComplexity,
        circularDependencies,
        orphanedProjects,
        recommendations
      };
    } catch (error) {
      console.error('Error analyzing workspace:', error);
      throw new Error(`Failed to analyze workspace: ${(error as Error).message}`);
    }
  }
}