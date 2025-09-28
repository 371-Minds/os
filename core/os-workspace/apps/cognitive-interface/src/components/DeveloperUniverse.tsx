/**
 * DeveloperUniverse.tsx - Complete Developer's Galaxy Experience
 *
 * Revolutionary spatial development environment that transforms the Technical Mode
 * into an explorable universe where code becomes celestial bodies and development
 * workflows become cosmic journeys.
 *
 * The technical counterpart to CEO's Orrery for the Galaxy Engine paradigm.
 */

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import DeveloperGalaxyControls from './DeveloperGalaxyControls';
import DevelopersGalaxy from './DevelopersGalaxy';
import './DeveloperUniverse.css';

interface CodeProject {
  id: string;
  name: string;
  type: 'application' | 'library' | 'plugin' | 'service';
  size: number;
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  health: number;
  coverage: number;
  complexity: number;
  dependencies: string[];
  modules: CodeModule[];
  buildStatus: 'success' | 'failed' | 'building' | 'pending';
  lastUpdated: Date;
  color: string;
  isSelected: boolean;
}

interface CodeModule {
  id: string;
  name: string;
  type: 'component' | 'service' | 'util' | 'test';
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  quality: number;
  color: string;
}

interface BuildPipeline {
  id: string;
  name: string;
  projects: string[];
  stages: BuildStage[];
  status: 'running' | 'success' | 'failed' | 'idle';
  progress: number;
  startTime: Date;
  duration?: number;
}

interface BuildStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed';
  duration?: number;
  output?: string[];
}

interface GalaxyViewControls {
  viewMode: 'galaxy' | 'system' | 'module';
  zoomLevel: number;
  showDependencies: boolean;
  showBuildPipelines: boolean;
  showMetrics: boolean;
  showTests: boolean;
  filterByType: string[];
  filterByStatus: string[];
  animationSpeed: number;
}

interface BuildControl {
  action: 'build' | 'test' | 'lint' | 'deploy';
  targets: string[];
  parallel: boolean;
  watch: boolean;
}

interface DeveloperUniverseProps {
  userId?: string;
  onProjectSelect?: (project: CodeProject) => void;
  onModuleSelect?: (module: CodeModule) => void;
  onBuildTrigger?: (buildControl: BuildControl) => void;
  onToolLaunch?: (tool: string, params: any) => void;
}

export const DeveloperUniverse: React.FC<DeveloperUniverseProps> = ({
  userId = 'developer-user',
  onProjectSelect,
  onModuleSelect,
  onBuildTrigger,
  onToolLaunch,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedProject, setSelectedProject] = useState<CodeProject | null>(
    null,
  );
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [buildStatus, setBuildStatus] = useState<
    'idle' | 'running' | 'success' | 'failed'
  >('idle');
  const [lastBuildTime, setLastBuildTime] = useState<Date | undefined>();
  const [buildPipelines, setBuildPipelines] = useState<BuildPipeline[]>([]);

  const [controls, setControls] = useState<GalaxyViewControls>({
    viewMode: 'galaxy',
    zoomLevel: 1.0,
    showDependencies: true,
    showBuildPipelines: true,
    showMetrics: true,
    showTests: false,
    filterByType: [],
    filterByStatus: [],
    animationSpeed: 1.0,
  });

  // Sample projects for the Developer's Galaxy
  const [projects, setProjects] = useState<CodeProject[]>([
    {
      id: 'cognitive-interface',
      name: 'Cognitive Interface',
      type: 'application',
      size: 25,
      position: { x: 400, y: 300 },
      orbitRadius: 0,
      orbitSpeed: 0,
      orbitAngle: 0,
      health: 94,
      coverage: 89,
      complexity: 6.2,
      dependencies: ['shared-ui', 'cognitive-layer'],
      modules: [],
      buildStatus: 'success',
      lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
      color: '#3b82f6',
      isSelected: false,
    },
    {
      id: 'elizaos-plugins',
      name: 'ElizaOS Plugins',
      type: 'library',
      size: 20,
      position: { x: 600, y: 200 },
      orbitRadius: 180,
      orbitSpeed: 0.008,
      orbitAngle: 0,
      health: 98,
      coverage: 94,
      complexity: 4.1,
      dependencies: ['elizaos-core'],
      modules: [],
      buildStatus: 'success',
      lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
      color: '#10b981',
      isSelected: false,
    },
    {
      id: 'nx-workspace',
      name: 'Nx Workspace Plugin',
      type: 'plugin',
      size: 15,
      position: { x: 200, y: 400 },
      orbitRadius: 200,
      orbitSpeed: 0.012,
      orbitAngle: Math.PI,
      health: 96,
      coverage: 87,
      complexity: 7.8,
      dependencies: ['nx-devkit'],
      modules: [],
      buildStatus: 'success',
      lastUpdated: new Date(Date.now() - 8 * 60 * 1000),
      color: '#8b5cf6',
      isSelected: false,
    },
    {
      id: 'universal-tool-server',
      name: 'Universal Tool Server',
      type: 'service',
      size: 18,
      position: { x: 650, y: 450 },
      orbitRadius: 250,
      orbitSpeed: 0.006,
      orbitAngle: Math.PI / 2,
      health: 92,
      coverage: 85,
      complexity: 8.9,
      dependencies: ['blockchain-core', 'ipfs-client'],
      modules: [],
      buildStatus: 'success',
      lastUpdated: new Date(Date.now() - 10 * 60 * 1000),
      color: '#f59e0b',
      isSelected: false,
    },
    {
      id: 'business-intelligence',
      name: 'Business Intelligence Plugin',
      type: 'plugin',
      size: 16,
      position: { x: 150, y: 150 },
      orbitRadius: 160,
      orbitSpeed: 0.01,
      orbitAngle: Math.PI / 3,
      health: 95,
      coverage: 91,
      complexity: 5.8,
      dependencies: ['elizaos-core'],
      modules: [],
      buildStatus: 'success',
      lastUpdated: new Date(Date.now() - 3 * 60 * 1000),
      color: '#ec4899',
      isSelected: false,
    },
  ]);

  // Initialize sample build pipelines
  useEffect(() => {
    setBuildPipelines([
      {
        id: 'cognitive-pipeline',
        name: 'Cognitive Interface Pipeline',
        projects: ['cognitive-interface', 'shared-ui'],
        stages: [
          { id: 'lint', name: 'Lint', status: 'success', duration: 2.1 },
          { id: 'test', name: 'Test', status: 'success', duration: 8.7 },
          { id: 'build', name: 'Build', status: 'success', duration: 12.4 },
          { id: 'deploy', name: 'Deploy', status: 'success', duration: 5.2 },
        ],
        status: 'success',
        progress: 100,
        startTime: new Date(Date.now() - 15 * 60 * 1000),
        duration: 28.4,
      },
      {
        id: 'plugin-pipeline',
        name: 'ElizaOS Plugin Pipeline',
        projects: ['elizaos-plugins', 'nx-workspace', 'business-intelligence'],
        stages: [
          { id: 'lint', name: 'Lint', status: 'success', duration: 1.8 },
          { id: 'test', name: 'Test', status: 'success', duration: 15.2 },
          { id: 'build', name: 'Build', status: 'success', duration: 6.9 },
        ],
        status: 'success',
        progress: 100,
        startTime: new Date(Date.now() - 8 * 60 * 1000),
        duration: 23.9,
      },
    ]);
  }, []);

  const handleProjectSelect = useCallback(
    (project: CodeProject) => {
      setSelectedProject(project);

      // Toggle selection in multi-select mode
      setSelectedProjects((prev) => {
        const isSelected = prev.includes(project.id);
        if (isSelected) {
          return prev.filter((id) => id !== project.id);
        } else {
          return [...prev, project.id];
        }
      });

      if (onProjectSelect) {
        onProjectSelect(project);
      }

      // Simulate project analysis
      console.log('Developer Universe: Project selected:', project.name);
      console.log(
        'Health:',
        project.health,
        'Coverage:',
        project.coverage,
        'Complexity:',
        project.complexity,
      );
    },
    [onProjectSelect],
  );

  const handleModuleSelect = useCallback(
    (module: CodeModule) => {
      if (onModuleSelect) {
        onModuleSelect(module);
      }

      console.log(
        'Developer Universe: Module selected:',
        module.name,
        'Quality:',
        module.quality,
      );
    },
    [onModuleSelect],
  );

  const handleBuildAction = useCallback(
    (buildControl: BuildControl) => {
      console.log('Developer Universe: Build action triggered:', buildControl);

      setBuildStatus('running');
      setLastBuildTime(new Date());

      // Simulate build process
      const mockBuildTime = buildControl.action === 'test' ? 8000 : 3000;

      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        setBuildStatus(success ? 'success' : 'failed');

        // Update project statuses
        setProjects((prev) =>
          prev.map((project) => {
            if (
              buildControl.targets.includes(project.id) ||
              buildControl.targets.includes('all')
            ) {
              return {
                ...project,
                buildStatus: success ? 'success' : 'failed',
                lastUpdated: new Date(),
              };
            }
            return project;
          }),
        );
      }, mockBuildTime);

      if (onBuildTrigger) {
        onBuildTrigger(buildControl);
      }
    },
    [onBuildTrigger],
  );

  const handleNavigation = useCallback(
    (direction: 'zoom-in' | 'zoom-out' | 'center' | 'fit') => {
      setControls((prev) => {
        switch (direction) {
          case 'zoom-in':
            return { ...prev, zoomLevel: Math.min(5.0, prev.zoomLevel + 0.3) };
          case 'zoom-out':
            return { ...prev, zoomLevel: Math.max(0.1, prev.zoomLevel - 0.3) };
          case 'center':
            // Reset to center view
            return { ...prev, zoomLevel: 1.0 };
          case 'fit':
            // Fit all projects in view
            return { ...prev, zoomLevel: 0.8 };
          default:
            return prev;
        }
      });
    },
    [],
  );

  const handleProjectFilter = useCallback((filter: string) => {
    console.log('Developer Universe: Filter applied:', filter);
    // Filter implementation would go here
  }, []);

  return (
    <div className="developer-universe">
      {/* Galaxy Canvas */}
      <DevelopersGalaxy
        projects={projects}
        buildPipelines={buildPipelines}
        onProjectSelect={handleProjectSelect}
        onModuleSelect={handleModuleSelect}
        canvasRef={canvasRef}
      />

      {/* Galaxy Controls */}
      <DeveloperGalaxyControls
        controls={controls}
        onControlsChange={setControls}
        onBuildAction={handleBuildAction}
        onNavigate={handleNavigation}
        onProjectFilter={handleProjectFilter}
        selectedProjects={selectedProjects}
        buildStatus={buildStatus}
        lastBuildTime={lastBuildTime}
      />

      {/* Project Information Panel */}
      {selectedProject && (
        <div className="project-details-panel">
          <div className="panel-header">
            <div className="project-icon">
              {selectedProject.type === 'application'
                ? '🚀'
                : selectedProject.type === 'library'
                  ? '📚'
                  : selectedProject.type === 'plugin'
                    ? '🧩'
                    : '⚙️'}
            </div>
            <div className="project-info">
              <h3 className="project-name">{selectedProject.name}</h3>
              <span className="project-type">{selectedProject.type}</span>
            </div>
            <button
              className="close-btn"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>
          </div>

          <div className="project-metrics">
            <div className="metric-row">
              <div className="metric">
                <span className="metric-label">Health</span>
                <span
                  className={`metric-value ${selectedProject.health > 90 ? 'excellent' : selectedProject.health > 70 ? 'good' : 'warning'}`}
                >
                  {selectedProject.health}%
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Coverage</span>
                <span
                  className={`metric-value ${selectedProject.coverage > 85 ? 'excellent' : selectedProject.coverage > 70 ? 'good' : 'warning'}`}
                >
                  {selectedProject.coverage}%
                </span>
              </div>
            </div>
            <div className="metric-row">
              <div className="metric">
                <span className="metric-label">Complexity</span>
                <span
                  className={`metric-value ${selectedProject.complexity < 5 ? 'excellent' : selectedProject.complexity < 8 ? 'good' : 'warning'}`}
                >
                  {selectedProject.complexity.toFixed(1)}
                </span>
              </div>
              <div className="metric">
                <span className="metric-label">Dependencies</span>
                <span className="metric-value">
                  {selectedProject.dependencies.length}
                </span>
              </div>
            </div>
          </div>

          <div className="project-actions">
            <button
              className="action-btn primary"
              onClick={() =>
                handleBuildAction({
                  action: 'build',
                  targets: [selectedProject.id],
                  parallel: false,
                  watch: false,
                })
              }
              disabled={buildStatus === 'running'}
            >
              🔨 Build
            </button>
            <button
              className="action-btn secondary"
              onClick={() =>
                handleBuildAction({
                  action: 'test',
                  targets: [selectedProject.id],
                  parallel: false,
                  watch: false,
                })
              }
              disabled={buildStatus === 'running'}
            >
              🧪 Test
            </button>
            <button
              className="action-btn secondary"
              onClick={() =>
                onToolLaunch &&
                onToolLaunch('open_editor', { project: selectedProject.id })
              }
            >
              📝 Edit
            </button>
          </div>

          <div className="dependencies-list">
            <h4>Dependencies</h4>
            {selectedProject.dependencies.map((dep) => (
              <span key={dep} className="dependency-chip">
                {dep}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Build Status Overlay */}
      {buildStatus === 'running' && (
        <div className="build-overlay">
          <div className="build-progress">
            <div className="build-icon">⚡</div>
            <div className="build-text">
              <h4>Building Projects...</h4>
              <p>Compiling {selectedProjects.length || 'all'} project(s)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperUniverse;
