/**
 * Tests for Nx Workspace Provider
 */

import { NxWorkspaceProvider } from './provider';
import { NxDependencyGraph } from './types';

// Mock child_process for testing
jest.mock('child_process', () => ({
  execSync: jest.fn()
}));

// Mock fs-extra
jest.mock('fs-extra', () => ({
  ensureDir: jest.fn().mockResolvedValue(undefined),
  unlink: jest.fn().mockResolvedValue(undefined)
}));

// Mock fs/promises
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    unlink: jest.fn().mockResolvedValue(undefined)
  }
}));

import { execSync } from 'child_process';
import { promises as fs } from 'fs';

describe('NxWorkspaceProvider', () => {
  let provider: NxWorkspaceProvider;
  const mockExecSync = execSync as jest.MockedFunction<typeof execSync>;
  const mockReadFile = fs.readFile as jest.MockedFunction<typeof fs.readFile>;

  beforeEach(() => {
    provider = new NxWorkspaceProvider('/test/workspace');
    jest.clearAllMocks();
  });

  describe('getDependencyGraph', () => {
    it('should generate and parse dependency graph', async () => {
      const mockGraph: NxDependencyGraph = {
        nodes: {
          'app1': {
            name: 'app1',
            type: 'app',
            data: {
              root: 'apps/app1',
              projectType: 'application'
            }
          },
          'lib1': {
            name: 'lib1', 
            type: 'lib',
            data: {
              root: 'packages/lib1',
              projectType: 'library'
            }
          }
        },
        dependencies: {
          'app1': [
            {
              source: 'app1',
              target: 'lib1',
              type: 'static'
            }
          ],
          'lib1': []
        },
        version: '1.0.0'
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockGraph));

      const result = await provider.getDependencyGraph();

      expect(mockExecSync).toHaveBeenCalledWith(
        expect.stringContaining('npx nx graph --file='),
        expect.any(Object)
      );
      expect(result).toEqual(mockGraph);
    });

    it('should handle focus parameter', async () => {
      const mockGraph: NxDependencyGraph = {
        nodes: { 'app1': { name: 'app1', type: 'app', data: { root: 'apps/app1', projectType: 'application' } } },
        dependencies: { 'app1': [] },
        version: '1.0.0'
      };

      mockReadFile.mockResolvedValue(JSON.stringify(mockGraph));

      await provider.getDependencyGraph('app1');

      expect(mockExecSync).toHaveBeenCalledWith(
        expect.stringContaining('--focus=app1'),
        expect.any(Object)
      );
    });

    it('should handle errors gracefully', async () => {
      mockExecSync.mockImplementation(() => {
        throw new Error('Graph generation failed');
      });

      await expect(provider.getDependencyGraph()).rejects.toThrow(
        'Failed to generate dependency graph: Graph generation failed'
      );
    });
  });

  describe('findAffectedProjects', () => {
    it('should find affected projects', async () => {
      mockExecSync
        .mockReturnValueOnce('app1\napp2\n') // affected apps
        .mockReturnValueOnce('lib1\n')        // affected libs
        .mockReturnValueOnce('task output');  // dry-run output

      const result = await provider.findAffectedProjects('main');

      expect(result.projects).toEqual(['app1', 'app2', 'lib1']);
      expect(result.tasks).toHaveLength(3);
      expect(mockExecSync).toHaveBeenCalledTimes(3);
    });

    it('should handle empty results', async () => {
      mockExecSync
        .mockReturnValueOnce('')  // no affected apps
        .mockReturnValueOnce('')  // no affected libs
        .mockReturnValueOnce(''); // no tasks

      const result = await provider.findAffectedProjects('main');

      expect(result.projects).toEqual([]);
      expect(result.tasks).toEqual([]);
    });
  });

  describe('runTestsForAffected', () => {
    it('should run tests successfully', async () => {
      // Mock findAffectedProjects
      jest.spyOn(provider, 'findAffectedProjects').mockResolvedValue({
        projects: ['app1', 'lib1'],
        tasks: []
      });

      mockExecSync.mockReturnValue('Tests passed');

      const result = await provider.runTestsForAffected('main');

      expect(result.success).toBe(true);
      expect(Object.keys(result.projects)).toHaveLength(2);
      expect(result.projects['app1'].success).toBe(true);
      expect(result.projects['lib1'].success).toBe(true);
    });

    it('should handle test failures', async () => {
      jest.spyOn(provider, 'findAffectedProjects').mockResolvedValue({
        projects: ['app1'],
        tasks: []
      });

      mockExecSync.mockImplementation(() => {
        throw new Error('Tests failed');
      });

      const result = await provider.runTestsForAffected('main');

      expect(result.success).toBe(false);
      expect(result.projects['app1'].success).toBe(false);
    });

    it('should handle no affected projects', async () => {
      jest.spyOn(provider, 'findAffectedProjects').mockResolvedValue({
        projects: [],
        tasks: []
      });

      const result = await provider.runTestsForAffected('main');

      expect(result.success).toBe(true);
      expect(result.projects).toEqual({});
    });
  });

  describe('buildProject', () => {
    it('should build specific project successfully', async () => {
      mockExecSync.mockReturnValue('Build successful');

      const result = await provider.buildProject('app1');

      expect(result.success).toBe(true);
      expect(result.projects['app1'].success).toBe(true);
      expect(mockExecSync).toHaveBeenCalledWith(
        'npx nx build app1',
        expect.any(Object)
      );
    });

    it('should build all affected projects when no project specified', async () => {
      jest.spyOn(provider, 'findAffectedProjects').mockResolvedValue({
        projects: ['app1', 'lib1'],
        tasks: []
      });

      mockExecSync.mockReturnValue('Build successful');

      const result = await provider.buildProject();

      expect(result.success).toBe(true);
      expect(Object.keys(result.projects)).toHaveLength(2);
      expect(mockExecSync).toHaveBeenCalledWith(
        'npx nx affected --target=build',
        expect.any(Object)
      );
    });

    it('should handle build failures', async () => {
      mockExecSync.mockImplementation(() => {
        throw new Error('Build failed');
      });

      const result = await provider.buildProject('app1');

      expect(result.success).toBe(false);
      expect(result.projects['app1'].success).toBe(false);
    });
  });

  describe('generateScaffold', () => {
    it('should generate React application', async () => {
      const options = {
        type: 'app' as const,
        name: 'new-app',
        directory: 'apps',
        tags: ['frontend']
      };

      mockExecSync.mockReturnValue('');

      const result = await provider.generateScaffold(options);

      expect(result).toBe(true);
      expect(mockExecSync).toHaveBeenCalledWith(
        'npx nx generate @nx/react:application new-app --directory=apps --tags=frontend',
        expect.any(Object)
      );
    });

    it('should generate library', async () => {
      const options = {
        type: 'lib' as const,
        name: 'shared-utils'
      };

      mockExecSync.mockReturnValue('');

      const result = await provider.generateScaffold(options);

      expect(result).toBe(true);
      expect(mockExecSync).toHaveBeenCalledWith(
        'npx nx generate @nx/js:library shared-utils',
        expect.any(Object)
      );
    });

    it('should handle unsupported generator types', async () => {
      const options = {
        type: 'unknown' as any,
        name: 'test'
      };

      const result = await provider.generateScaffold(options);

      expect(result).toBe(false);
    });

    it('should handle generation failures', async () => {
      const options = {
        type: 'app' as const,
        name: 'new-app'
      };

      mockExecSync.mockImplementation(() => {
        throw new Error('Generation failed');
      });

      const result = await provider.generateScaffold(options);

      expect(result).toBe(false);
    });
  });

  describe('analyzeWorkspace', () => {
    it('should analyze workspace successfully', async () => {
      const mockGraph: NxDependencyGraph = {
        nodes: {
          'app1': { name: 'app1', type: 'app', data: { root: 'apps/app1', projectType: 'application' } },
          'lib1': { name: 'lib1', type: 'lib', data: { root: 'packages/lib1', projectType: 'library' } },
          'orphan': { name: 'orphan', type: 'lib', data: { root: 'packages/orphan', projectType: 'library' } }
        },
        dependencies: {
          'app1': [{ source: 'app1', target: 'lib1', type: 'static' }],
          'lib1': [],
          'orphan': []
        },
        version: '1.0.0'
      };

      jest.spyOn(provider, 'getDependencyGraph').mockResolvedValue(mockGraph);

      const result = await provider.analyzeWorkspace();

      expect(result.totalProjects).toBe(3);
      expect(result.projectsByType).toEqual({ app: 1, lib: 2 });
      expect(result.dependencyComplexity).toBe(1);
      expect(result.orphanedProjects).toContain('orphan');
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should handle analysis errors', async () => {
      jest.spyOn(provider, 'getDependencyGraph').mockRejectedValue(new Error('Graph error'));

      await expect(provider.analyzeWorkspace()).rejects.toThrow(
        'Failed to analyze workspace: Graph error'
      );
    });
  });
});