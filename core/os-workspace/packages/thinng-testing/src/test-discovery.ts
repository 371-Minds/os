/**
 * @fileoverview Test Discovery Engine
 * Automatic test suite discovery and dependency management
 */

import type { TestSuite, TestCase, TestPhase } from './types';

/**
 * Test Discovery Engine
 * Automatically discovers and manages test suites and dependencies
 */
export class TestDiscoveryEngine {
  private discoveredSuites: Map<string, TestSuite> = new Map();
  private dependencyGraph: Map<string, string[]> = new Map();

  /**
   * Discover test suites in the given directories
   */
  async discoverTestSuites(directories: string[]): Promise<TestSuite[]> {
    console.log('🔍 Discovering test suites...');
    
    // This would typically scan file system for test files
    // For now, return empty array as placeholder
    const suites: TestSuite[] = [];
    
    for (const suite of suites) {
      this.discoveredSuites.set(suite.id, suite);
      this.buildDependencyGraph(suite);
    }
    
    console.log(`📚 Discovered ${suites.length} test suites`);
    return suites;
  }

  /**
   * Build dependency graph for test execution order
   */
  private buildDependencyGraph(suite: TestSuite): void {
    const dependencies: string[] = [];
    
    suite.tests.forEach(test => {
      if (test.dependencies) {
        dependencies.push(...test.dependencies);
      }
    });
    
    this.dependencyGraph.set(suite.id, dependencies);
  }

  /**
   * Get execution order based on dependencies
   */
  getExecutionOrder(suiteIds: string[]): string[] {
    const visited = new Set<string>();
    const visiting = new Set<string>();
    const result: string[] = [];

    const visit = (suiteId: string) => {
      if (visiting.has(suiteId)) {
        throw new Error(`Circular dependency detected involving ${suiteId}`);
      }
      
      if (visited.has(suiteId)) {
        return;
      }

      visiting.add(suiteId);
      
      const dependencies = this.dependencyGraph.get(suiteId) || [];
      dependencies.forEach(dep => visit(dep));
      
      visiting.delete(suiteId);
      visited.add(suiteId);
      result.push(suiteId);
    };

    suiteIds.forEach(id => visit(id));
    return result;
  }

  /**
   * Filter test suites by phase
   */
  filterByPhase(phase: TestPhase): TestSuite[] {
    return Array.from(this.discoveredSuites.values())
      .filter(suite => suite.phase === phase);
  }

  /**
   * Get test suite by ID
   */
  getTestSuite(id: string): TestSuite | undefined {
    return this.discoveredSuites.get(id);
  }

  /**
   * Register manually created test suite
   */
  registerTestSuite(suite: TestSuite): void {
    this.discoveredSuites.set(suite.id, suite);
    this.buildDependencyGraph(suite);
    console.log(`📝 Registered test suite: ${suite.name}`);
  }

  /**
   * Get all discovered test suites
   */
  getAllTestSuites(): TestSuite[] {
    return Array.from(this.discoveredSuites.values());
  }

  /**
   * Validate test dependencies
   */
  validateDependencies(): boolean {
    try {
      const allSuiteIds = Array.from(this.discoveredSuites.keys());
      this.getExecutionOrder(allSuiteIds);
      return true;
    } catch (error) {
      console.error('❌ Dependency validation failed:', error);
      return false;
    }
  }
}