/**
 * Tests for Nx Workspace Provider
 */

import { expect, test, beforeEach, describe, spyOn, mock } from "bun:test";
import { NxWorkspaceProvider } from './provider';
import type { NxDependencyGraph } from './types';
import { execSync } from 'child_process';

// Mock child_process for testing
const mockExecSync = spyOn({ execSync }, "execSync").mockImplementation(execSync);

// Mock fs-extra
mock.module("fs-extra", () => ({
  ensureDir: () => Promise.resolve(undefined),
  unlink: () => Promise.resolve(undefined),
}));

// Mock fs/promises
mock.module("fs", () => ({
  promises: {
    readFile: () => Promise.resolve('{"nodes":{},"dependencies":{},"version":"1.0.0"}'),
    unlink: () => Promise.resolve(undefined),
  },
}));

import { promises as fs } from 'fs';

describe('NxWorkspaceProvider', () => {
  let provider: NxWorkspaceProvider;
  const mockReadFile = spyOn(fs, "readFile");

  beforeEach(() => {
    provider = new NxWorkspaceProvider('/test/workspace');
    mockExecSync.mockClear();
    mockReadFile.mockClear();
  });

  describe('getDependencyGraph', () => {
    test('should generate and parse dependency graph', async () => {
      const mockGraph: NxDependencyGraph = {
        nodes: {
          app1: {
            name: 'app1',
            type: 'app',
            data: {
              root: 'apps/app1',
              projectType: 'application',
            },
          },
          lib1: {
            name: 'lib1',
            type: 'lib',
            data: {
              root: 'packages/lib1',
              projectType: 'library',
            },
          },
        },
        dependencies: {
          app1: [
            {
              source: 'app1',
              target: 'lib1',
              type: 'static',
            },
          ],
          lib1: [],
        },
        version: '1.0.0',
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockGraph));
      mockExecSync.mockReturnValue(Buffer.from('')); // Mock successful execution

      const result = await provider.getDependencyGraph();

      expect(mockExecSync).toHaveBeenCalledWith(
        expect.stringContaining('npx nx graph --file='),
        expect.any(Object),
      );
      expect(result).toEqual(mockGraph);
    });

    test('should handle focus parameter', async () => {
      const mockGraph: NxDependencyGraph = {
        nodes: {
          app1: {
            name: 'app1',
            type: 'app',
            data: { root: 'apps/app1', projectType: 'application' },
          },
        },
        dependencies: { app1: [] },
        version: '1.0.0',
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockGraph));
      mockExecSync.mockReturnValue(Buffer.from('')); // Mock successful execution

      await provider.getDependencyGraph('app1');

      expect(mockExecSync).toHaveBeenCalledWith(
        expect.stringContaining('--focus=app1'),
        expect.any(Object),
      );
    });

    test('should handle errors gracefully', async () => {
      mockExecSync.mockImplementation(() => {
        throw new Error('Graph generation failed');
      });

      try {
        await provider.getDependencyGraph();
        expect(true).toBe(false); // Should not reach here
      } catch (error: unknown) {
        if (error instanceof Error) {
          expect(error.message).toBe('Failed to generate dependency graph: Graph generation failed');
        } else {
          expect(true).toBe(false); // Should not reach here
        }
      }
    });
  });

  describe('findAffectedProjects', () => {
    test('should find affected projects', async () => {
      mockExecSync
        .mockReturnValueOnce(Buffer.from('app1\napp2\n')) // affected apps
        .mockReturnValueOnce(Buffer.from('lib1\n')) // affected libs
        .mockReturnValueOnce(Buffer.from('task output')); // dry-run output

      const result = await provider.findAffectedProjects('main');

      expect(result.projects).toEqual(['app1', 'app2', 'lib1']);
      expect(result.tasks).toHaveLength(3);
      expect(mockExecSync).toHaveBeenCalledTimes(3);
    });

    test('should handle empty results', async () => {
      mockExecSync
        .mockReturnValueOnce(Buffer.from('')) // no affected apps
        .mockReturnValueOnce(Buffer.from('')) // no affected libs
        .mockReturnValueOnce(Buffer.from('')); // no tasks

      const result = await provider.findAffectedProjects('main');

      expect(result.projects).toEqual([]);
      expect(result.tasks).toEqual([]);
    });
  });

  describe('runTestsForAffected', () => {
    test('should run tests successfully', async () => {
      // Mock findAffectedProjects
      spyOn(provider, 'findAffectedProjects').mockResolvedValue({
        projects: ['app1', 'lib1'],
        tasks: [],
      });

      mockExecSync.mockReturnValue(Buffer.from('Tests passed'));

      const result = await provider.runTestsForAffected('main');

      expect(result.success).toBe(true);
      expect(Object.keys(result.projects)).toHaveLength(2);
      expect(result.projects['app1'].success).toBe(true);
      expect(result.projects['lib1'].success).toBe(true);
    });

    test('should handle test failures', async () => {
      spyOn(provider, 'findAffectedProjects').mockResolvedValue({
        projects: ['app1'],
        tasks: [],
      });

      mockExecSync.mockImplementation(() => {
        throw new Error('Tests failed');
      });

      const result = await provider.runTestsForAffected('main');

      expect(result.success).toBe(false);
      expect(result.projects['app1'].success).toBe(false);
    });

    test('should handle no affected projects', async () => {
      spyOn(provider, 'findAffectedProjects').mockResolvedValue({
        projects: [],
        tasks: [],
      });

      const result = await provider.runTestsForAffected('main');

      expect(result.success).toBe(true);
      expect(result.projects).toEqual({});
    });
  });

  describe('buildProject', () => {
    test('should build specific project successfully', async () => {
      mockExecSync.mockReturnValue(Buffer.from('Build successful'));

      const result = await provider.buildProject('app1');

      expect(result.success).toBe(true);
      expect(result.projects['app1'].success).toBe(true);
      expect(mockExecSync).toHaveBeenCalledWith(
        'npx nx build app1',
        expect.any(Object),
      );
    });

    test('should build all affected projects when no project specified', async () => {
      spyOn(provider, 'findAffectedProjects').mockResolvedValue({
        projects: ['app1', 'lib1'],
        tasks: [],
      });

      mockExecSync.mockReturnValue(Buffer.from('Build successful'));

      const result = await provider.buildProject();

      expect(result.success).toBe(true);
      expect(Object.keys(result.projects)).toHaveLength(2);
      expect(mockExecSync).toHaveBeenCalledWith(
        'npx nx affected --target=build',
        expect.any(Object),
      );
    });

    test('should handle build failures', async () => {
      mockExecSync.mockImplementation(() => {
        throw new Error('Build failed');
      });

      const result = await provider.buildProject('app1');

      expect(result.success).toBe(false);
      expect(result.projects['app1'].success).toBe(false);
    });
  });

  describe('generateScaffold', () => {
    test('should generate React application', async () => {
      const options = {
        type: 'app' as const,
        name: 'new-app',
        directory: 'apps',
        tags: ['frontend'],
      };

      mockExecSync.mockReturnValue(Buffer.from(''));
      // Mock the fs.unlink to avoid actual file system operations
      mock.module("fs", () => ({
        promises: {
          readFile: () => Promise.resolve('{"nodes":{},"dependencies":{},"version":"1.0.0"}'),
          unlink: () => Promise.resolve(undefined),
        },
      }));

      const result = await provider.generateScaffold(options);

      expect(result).toBe(true);
      expect(mockExecSync).toHaveBeenCalledWith(
        'npx nx generate @nx/react:application new-app --directory=apps --tags=frontend',
        expect.any(Object),
      );
    });

    test('should generate library', async () => {
      const options = {
        type: 'lib' as const,
        name: 'shared-utils',
      };

      mockExecSync.mockReturnValue(Buffer.from(''));
      // Mock the fs.unlink to avoid actual file system operations
      mock.module("fs", () => ({
        promises: {
          readFile: () => Promise.resolve('{"nodes":{},"dependencies":{},"version":"1.0.0"}'),
          unlink: () => Promise.resolve(undefined),
        },
      }));

      const result = await provider.generateScaffold(options);

      expect(result).toBe(true);
      expect(mockExecSync).toHaveBeenCalledWith(
        'npx nx generate @nx/js:library shared-utils',
        expect.any(Object),
      );
    });

    test('should handle unsupported generator types', async () => {
      const options = {
        type: 'unknown' as any,
        name: 'test',
      };

      const result = await provider.generateScaffold(options);

      expect(result).toBe(false);
    });

    test('should handle generation failures', async () => {
      const options = {
        type: 'app' as const,
        name: 'new-app',
      };

      mockExecSync.mockImplementation(() => {
        throw new Error('Generation failed');
      });

      const result = await provider.generateScaffold(options);

      expect(result).toBe(false);
    });
  });

  describe('analyzeWorkspace', () => {
    test('should analyze workspace successfully', async () => {
      const mockGraph: NxDependencyGraph = {
        nodes: {
          app1: {
            name: 'app1',
            type: 'app',
            data: { root: 'apps/app1', projectType: 'application' },
          },
          lib1: {
            name: 'lib1',
            type: 'lib',
            data: { root: 'packages/lib1', projectType: 'library' },
          },
          orphan: {
            name: 'orphan',
            type: 'lib',
            data: { root: 'packages/orphan', projectType: 'library' },
          },
        },
        dependencies: {
          app1: [{ source: 'app1', target: 'lib1', type: 'static' }],
          lib1: [],
          orphan: [],
        },
        version: '1.0.0',
      };

      spyOn(provider, 'getDependencyGraph').mockResolvedValue(mockGraph);

      const result = await provider.analyzeWorkspace();

      expect(result.totalProjects).toBe(3);
      expect(result.projectsByType).toEqual({ app: 1, lib: 2 });
      expect(result.dependencyComplexity).toBe(1);
      expect(result.orphanedProjects).toContain('orphan');
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    test('should handle analysis errors', async () => {
      spyOn(provider, 'getDependencyGraph').mockRejectedValue(new Error('Graph error'));

      try {
        await provider.analyzeWorkspace();
        expect(true).toBe(false); // Should not reach here
      } catch (error: unknown) {
        if (error instanceof Error) {
          expect(error.message).toBe('Failed to analyze workspace: Graph error');
        } else {
          expect(true).toBe(false); // Should not reach here
        }
      }
    });
  });
});