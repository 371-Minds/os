/**
 * DevelopersGalaxy.tsx - Revolutionary Spatial Development Environment
 *
 * Transform development workflows into an explorable galaxy where:
 * - Projects become solar systems with modular planets
 * - Code metrics transform into stellar phenomena
 * - Build pipelines become cosmic rays connecting systems
 * - Developers navigate through their codebase universe
 *
 * Part of the Galaxy Engine cognitive-aware interface revolution.
 */

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import './DevelopersGalaxy.css';

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

interface GalaxyControls {
  zoomLevel: number;
  centerPosition: { x: number; y: number };
  selectedProject: string | null;
  viewMode: 'galaxy' | 'system' | 'module';
  showDependencies: boolean;
  showBuildPipelines: boolean;
  showMetrics: boolean;
  animationSpeed: number;
}

interface DevelopersGalaxyProps {
  projects?: CodeProject[];
  buildPipelines?: BuildPipeline[];
  onProjectSelect: (project: CodeProject) => void;
  onModuleSelect?: (module: CodeModule) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const DevelopersGalaxy: React.FC<DevelopersGalaxyProps> = ({
  projects = [],
  buildPipelines = [],
  onProjectSelect,
  onModuleSelect,
  canvasRef,
}) => {
  const [galaxyProjects, setGalaxyProjects] = useState<CodeProject[]>([]);
  const [controls, setControls] = useState<GalaxyControls>({
    zoomLevel: 1.0,
    centerPosition: { x: 400, y: 300 },
    selectedProject: null,
    viewMode: 'galaxy',
    showDependencies: true,
    showBuildPipelines: true,
    showMetrics: true,
    animationSpeed: 1.0,
  });
  const [orbitTime, setOrbitTime] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Initialize galaxy with sample development projects
  useEffect(() => {
    if (projects.length === 0) {
      const sampleProjects: CodeProject[] = [
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
          modules: generateModules('cognitive-interface'),
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
          modules: generateModules('elizaos-plugins'),
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
          modules: generateModules('nx-workspace'),
          buildStatus: 'building',
          lastUpdated: new Date(),
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
          modules: generateModules('universal-tool-server'),
          buildStatus: 'success',
          lastUpdated: new Date(Date.now() - 10 * 60 * 1000),
          color: '#f59e0b',
          isSelected: false,
        },
        {
          id: 'shared-ui',
          name: 'Shared UI Library',
          type: 'library',
          size: 12,
          position: { x: 150, y: 150 },
          orbitRadius: 120,
          orbitSpeed: 0.015,
          orbitAngle: Math.PI / 4,
          health: 90,
          coverage: 82,
          complexity: 5.2,
          dependencies: [],
          modules: generateModules('shared-ui'),
          buildStatus: 'success',
          lastUpdated: new Date(Date.now() - 20 * 60 * 1000),
          color: '#ec4899',
          isSelected: false,
        },
      ];
      setGalaxyProjects(sampleProjects);
    } else {
      setGalaxyProjects(projects);
    }
  }, [projects]);

  const generateModules = (projectId: string): CodeModule[] => {
    const moduleCount = Math.floor(Math.random() * 8) + 4;
    const modules: CodeModule[] = [];

    for (let i = 0; i < moduleCount; i++) {
      const angle = (i / moduleCount) * Math.PI * 2;
      const orbitRadius = 30 + i * 8;

      modules.push({
        id: `${projectId}-module-${i}`,
        name: `Module ${String.fromCharCode(65 + i)}`,
        type: ['component', 'service', 'util', 'test'][
          Math.floor(Math.random() * 4)
        ] as CodeModule['type'],
        position: { x: 0, y: 0 },
        orbitRadius,
        orbitSpeed: 0.02 + Math.random() * 0.02,
        size: 3 + Math.random() * 3,
        quality: 70 + Math.random() * 30,
        color: getModuleColor(
          ['component', 'service', 'util', 'test'][
            Math.floor(Math.random() * 4)
          ],
        ),
      });
    }

    return modules;
  };

  const getModuleColor = (type: string): string => {
    const colors = {
      component: '#3b82f6',
      service: '#10b981',
      util: '#f59e0b',
      test: '#ef4444',
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  const getProjectColor = (type: string, status: string): string => {
    if (status === 'building') return '#f59e0b';
    if (status === 'failed') return '#ef4444';

    const colors = {
      application: '#3b82f6',
      library: '#10b981',
      plugin: '#8b5cf6',
      service: '#f59e0b',
    };
    return colors[type as keyof typeof colors] || '#6b7280';
  };

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setOrbitTime((prev) => prev + 0.016 * controls.animationSpeed);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [controls.animationSpeed]);

  // Update project positions
  useEffect(() => {
    setGalaxyProjects((prev) =>
      prev.map((project) => {
        if (project.orbitRadius === 0) {
          return project; // Central projects don't orbit
        }

        const angle = orbitTime * project.orbitSpeed;
        const newX =
          controls.centerPosition.x +
          Math.cos(angle + project.orbitAngle) * project.orbitRadius;
        const newY =
          controls.centerPosition.y +
          Math.sin(angle + project.orbitAngle) * project.orbitRadius;

        const updatedModules = project.modules.map((module) => {
          const moduleAngle = orbitTime * module.orbitSpeed;
          return {
            ...module,
            position: {
              x: newX + Math.cos(moduleAngle) * module.orbitRadius,
              y: newY + Math.sin(moduleAngle) * module.orbitRadius,
            },
          };
        });

        return {
          ...project,
          position: { x: newX, y: newY },
          modules: updatedModules,
          color: getProjectColor(project.type, project.buildStatus),
        };
      }),
    );
  }, [orbitTime, controls.centerPosition]);

  // Render galaxy
  const renderGalaxy = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const canvas = ctx.canvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background stars
      renderStars(ctx);

      // Dependency connections
      if (controls.showDependencies) {
        renderDependencies(ctx);
      }

      // Build pipelines
      if (controls.showBuildPipelines) {
        renderBuildPipelines(ctx);
      }

      // Projects
      galaxyProjects.forEach((project) => {
        renderProject(ctx, project);
      });
    },
    [galaxyProjects, controls],
  );

  const renderStars = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * ctx.canvas.width;
      const y = Math.random() * ctx.canvas.height;
      const size = Math.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const renderDependencies = (ctx: CanvasRenderingContext2D) => {
    galaxyProjects.forEach((project) => {
      project.dependencies.forEach((depId) => {
        const dependency = galaxyProjects.find((p) => p.id === depId);
        if (dependency) {
          ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(project.position.x, project.position.y);
          ctx.lineTo(dependency.position.x, dependency.position.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
    });
  };

  const renderBuildPipelines = (ctx: CanvasRenderingContext2D) => {
    // Render cosmic rays representing build flows
    buildPipelines.forEach((pipeline) => {
      if (pipeline.status === 'running') {
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#10b981';
        ctx.shadowBlur = 10;

        pipeline.projects.forEach((projectId, index) => {
          const project = galaxyProjects.find((p) => p.id === projectId);
          if (project && index > 0) {
            const prevProject = galaxyProjects.find(
              (p) => p.id === pipeline.projects[index - 1],
            );
            if (prevProject) {
              ctx.beginPath();
              ctx.moveTo(prevProject.position.x, prevProject.position.y);
              ctx.lineTo(project.position.x, project.position.y);
              ctx.stroke();
            }
          }
        });

        ctx.shadowBlur = 0;
      }
    });
  };

  const renderProject = (
    ctx: CanvasRenderingContext2D,
    project: CodeProject,
  ) => {
    const { x, y } = project.position;

    // Project glow effect
    ctx.fillStyle = project.color;
    ctx.shadowColor = project.color;
    ctx.shadowBlur = project.isSelected ? 30 : 15;

    // Draw project as star/planet
    ctx.beginPath();
    ctx.arc(x, y, project.size, 0, Math.PI * 2);
    ctx.fill();

    // Health indicator ring
    if (controls.showMetrics) {
      ctx.strokeStyle =
        project.health > 90
          ? '#10b981'
          : project.health > 70
            ? '#f59e0b'
            : '#ef4444';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(x, y, project.size + 5, 0, (project.health / 100) * Math.PI * 2);
      ctx.stroke();
    }

    // Render modules if in system view or project is selected
    if (controls.viewMode === 'system' || project.isSelected) {
      project.modules.forEach((module) => {
        ctx.fillStyle = module.color;
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.arc(
          module.position.x,
          module.position.y,
          module.size,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      });
    }

    // Build status indicator
    if (project.buildStatus === 'building') {
      renderBuildingEffect(ctx, x, y, project.size);
    } else if (project.buildStatus === 'failed') {
      renderFailureEffect(ctx, x, y, project.size);
    }

    ctx.shadowBlur = 0;
  };

  const renderBuildingEffect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
  ) => {
    const pulseRadius = size + 10 + Math.sin(orbitTime * 3) * 5;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
    ctx.stroke();
  };

  const renderFailureEffect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
  ) => {
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 20;

    // Draw X
    ctx.beginPath();
    ctx.moveTo(x - size / 2, y - size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.moveTo(x + size / 2, y - size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.stroke();
  };

  // Handle canvas interactions
  const handleCanvasClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Check project clicks
      const clickedProject = galaxyProjects.find((project) => {
        const distance = Math.sqrt(
          (x - project.position.x) ** 2 + (y - project.position.y) ** 2,
        );
        return distance <= project.size + 10;
      });

      if (clickedProject) {
        setControls((prev) => ({
          ...prev,
          selectedProject:
            prev.selectedProject === clickedProject.id
              ? null
              : clickedProject.id,
        }));

        setGalaxyProjects((prev) =>
          prev.map((p) => ({
            ...p,
            isSelected: p.id === clickedProject.id,
          })),
        );

        onProjectSelect(clickedProject);
        return;
      }

      // Check module clicks if in system view
      if (controls.viewMode === 'system') {
        for (const project of galaxyProjects) {
          const clickedModule = project.modules.find((module) => {
            const distance = Math.sqrt(
              (x - module.position.x) ** 2 + (y - module.position.y) ** 2,
            );
            return distance <= module.size + 3;
          });

          if (clickedModule && onModuleSelect) {
            onModuleSelect(clickedModule);
            return;
          }
        }
      }
    },
    [
      galaxyProjects,
      controls.viewMode,
      onProjectSelect,
      onModuleSelect,
      canvasRef,
    ],
  );

  // Render to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderGalaxy(ctx);
  }, [renderGalaxy, canvasRef]);

  return (
    <div className="developers-galaxy">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        className="galaxy-canvas"
      />
    </div>
  );
};

export default DevelopersGalaxy;
