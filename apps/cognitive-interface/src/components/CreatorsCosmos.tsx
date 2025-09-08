/**
 * CreatorsCosmos.tsx - Revolutionary Spatial Creative Environment
 *
 * Transform creative workflows into an explorable cosmos where:
 * - Creative projects become nebulae with ideation particles
 * - Content pieces transform into artistic constellations
 * - Brand campaigns become galactic formations
 * - Creators navigate through their creative universe
 *
 * Part of the Galaxy Engine cognitive-aware interface revolution.
 */

import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import './CreatorsCosmos.css';

interface CreativeProject {
  id: string;
  title: string;
  type: 'campaign' | 'content' | 'design' | 'video' | 'social' | 'brand';
  status: 'idea' | 'draft' | 'review' | 'published' | 'archived';
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  size: number;
  progress: number;
  engagement: number;
  creativity: number;
  impact: number;
  color: string;
  particles: CreativeParticle[];
  isSelected: boolean;
  lastUpdated: Date;
}

interface CreativeParticle {
  id: string;
  name: string;
  type: 'idea' | 'asset' | 'feedback' | 'inspiration';
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  quality: number;
  color: string;
}

interface ContentConstellation {
  id: string;
  name: string;
  theme: string;
  projects: string[];
  centerPosition: { x: number; y: number };
  brightness: number;
  reach: number;
  engagement: number;
}

interface CreativeFlow {
  id: string;
  name: string;
  stages: CreativeStage[];
  projects: string[];
  status: 'ideation' | 'creation' | 'review' | 'publication';
  progress: number;
  energy: number;
}

interface CreativeStage {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'complete' | 'blocked';
  duration?: number;
  output?: string[];
}

interface CosmosControls {
  zoomLevel: number;
  centerPosition: { x: number; y: number };
  selectedProject: string | null;
  viewMode: 'cosmos' | 'constellation' | 'particle';
  showParticles: boolean;
  showFlows: boolean;
  showInspiration: boolean;
  showEngagement: boolean;
  animationSpeed: number;
}

interface CreatorsCosmosProps {
  projects?: CreativeProject[];
  constellations?: ContentConstellation[];
  creativeFlows?: CreativeFlow[];
  onProjectSelect: (project: CreativeProject) => void;
  onParticleSelect?: (particle: CreativeParticle) => void;
  onCreativeAction?: (action: string, data: any) => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const CreatorsCosmos: React.FC<CreatorsCosmosProps> = ({
  projects = [],
  constellations = [],
  creativeFlows = [],
  onProjectSelect,
  onParticleSelect,
  onCreativeAction,
  canvasRef,
}) => {
  const [cosmosProjects, setCosmosProjects] = useState<CreativeProject[]>([]);
  const [controls, setControls] = useState<CosmosControls>({
    zoomLevel: 1.0,
    centerPosition: { x: 400, y: 300 },
    selectedProject: null,
    viewMode: 'cosmos',
    showParticles: true,
    showFlows: true,
    showInspiration: true,
    showEngagement: true,
    animationSpeed: 1.0,
  });
  const [orbitTime, setOrbitTime] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Initialize cosmos with sample creative projects
  useEffect(() => {
    if (projects.length === 0) {
      const sampleProjects: CreativeProject[] = [
        {
          id: 'galaxy-campaign',
          title: 'Galaxy Engine Launch',
          type: 'campaign',
          status: 'review',
          position: { x: 400, y: 300 },
          orbitRadius: 0,
          orbitSpeed: 0,
          orbitAngle: 0,
          size: 30,
          progress: 85,
          engagement: 94,
          creativity: 88,
          impact: 92,
          color: '#8b5cf6',
          particles: generateParticles('galaxy-campaign'),
          isSelected: false,
          lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: 'cosmic-content',
          title: 'Cosmic Content Series',
          type: 'content',
          status: 'published',
          position: { x: 600, y: 200 },
          orbitRadius: 180,
          orbitSpeed: 0.006,
          orbitAngle: 0,
          size: 22,
          progress: 100,
          engagement: 87,
          creativity: 91,
          impact: 85,
          color: '#10b981',
          particles: generateParticles('cosmic-content'),
          isSelected: false,
          lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000),
        },
        {
          id: 'stellar-design',
          title: 'Stellar UI Designs',
          type: 'design',
          status: 'draft',
          position: { x: 200, y: 400 },
          orbitRadius: 200,
          orbitSpeed: 0.008,
          orbitAngle: Math.PI,
          size: 25,
          progress: 65,
          engagement: 76,
          creativity: 95,
          impact: 78,
          color: '#ec4899',
          particles: generateParticles('stellar-design'),
          isSelected: false,
          lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
        },
        {
          id: 'nebula-videos',
          title: 'Nebula Demo Videos',
          type: 'video',
          status: 'idea',
          position: { x: 650, y: 450 },
          orbitRadius: 220,
          orbitSpeed: 0.005,
          orbitAngle: Math.PI / 2,
          size: 20,
          progress: 35,
          engagement: 0,
          creativity: 82,
          impact: 88,
          color: '#f59e0b',
          particles: generateParticles('nebula-videos'),
          isSelected: false,
          lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
        },
        {
          id: 'social-stars',
          title: 'Social Media Stars',
          type: 'social',
          status: 'published',
          position: { x: 150, y: 150 },
          orbitRadius: 140,
          orbitSpeed: 0.012,
          orbitAngle: Math.PI / 4,
          size: 18,
          progress: 100,
          engagement: 92,
          creativity: 73,
          impact: 89,
          color: '#3b82f6',
          particles: generateParticles('social-stars'),
          isSelected: false,
          lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000),
        },
      ];
      setCosmosProjects(sampleProjects);
    } else {
      setCosmosProjects(projects);
    }
  }, [projects]);

  const generateParticles = (projectId: string): CreativeParticle[] => {
    const particleCount = Math.floor(Math.random() * 6) + 4;
    const particles: CreativeParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const orbitRadius = 35 + i * 10;

      particles.push({
        id: `${projectId}-particle-${i}`,
        name: getParticleName(i),
        type: getParticleType(i),
        position: { x: 0, y: 0 },
        orbitRadius,
        orbitSpeed: 0.015 + Math.random() * 0.01,
        size: 2 + Math.random() * 2,
        quality: 70 + Math.random() * 30,
        color: getParticleColor(getParticleType(i)),
      });
    }

    return particles;
  };

  const getParticleName = (index: number): string => {
    const names = [
      'Inspiration',
      'Concept',
      'Asset',
      'Feedback',
      'Iteration',
      'Innovation',
    ];
    return names[index % names.length];
  };

  const getParticleType = (index: number): CreativeParticle['type'] => {
    const types: CreativeParticle['type'][] = [
      'idea',
      'asset',
      'feedback',
      'inspiration',
    ];
    return types[index % types.length];
  };

  const getParticleColor = (type: CreativeParticle['type']): string => {
    const colors = {
      idea: '#fbbf24',
      asset: '#3b82f6',
      feedback: '#10b981',
      inspiration: '#ec4899',
    };
    return colors[type];
  };

  const getProjectColor = (type: string, status: string): string => {
    if (status === 'idea') return '#6366f1';
    if (status === 'archived') return '#6b7280';

    const colors = {
      campaign: '#8b5cf6',
      content: '#10b981',
      design: '#ec4899',
      video: '#f59e0b',
      social: '#3b82f6',
      brand: '#ef4444',
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
    setCosmosProjects((prev) =>
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

        const updatedParticles = project.particles.map((particle) => {
          const particleAngle = orbitTime * particle.orbitSpeed;
          return {
            ...particle,
            position: {
              x: newX + Math.cos(particleAngle) * particle.orbitRadius,
              y: newY + Math.sin(particleAngle) * particle.orbitRadius,
            },
          };
        });

        return {
          ...project,
          position: { x: newX, y: newY },
          particles: updatedParticles,
          color: getProjectColor(project.type, project.status),
        };
      }),
    );
  }, [orbitTime, controls.centerPosition]);

  // Render cosmos
  const renderCosmos = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const canvas = ctx.canvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background cosmic dust
      renderCosmicDust(ctx);

      // Inspiration waves
      if (controls.showInspiration) {
        renderInspirationWaves(ctx);
      }

      // Creative flows
      if (controls.showFlows) {
        renderCreativeFlows(ctx);
      }

      // Projects as nebulae
      cosmosProjects.forEach((project) => {
        renderProject(ctx, project);
      });
    },
    [cosmosProjects, controls],
  );

  const renderCosmicDust = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * ctx.canvas.width;
      const y = Math.random() * ctx.canvas.height;
      const size = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const renderInspirationWaves = (ctx: CanvasRenderingContext2D) => {
    const centerX = controls.centerPosition.x;
    const centerY = controls.centerPosition.y;

    for (let i = 0; i < 3; i++) {
      const radius = 50 + i * 80 + Math.sin(orbitTime * 0.5 + i) * 20;
      ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 - i * 0.02})`;
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const renderCreativeFlows = (ctx: CanvasRenderingContext2D) => {
    creativeFlows.forEach((flow) => {
      if (flow.status === 'creation') {
        ctx.strokeStyle = '#ec4899';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 15;

        flow.projects.forEach((projectId, index) => {
          const project = cosmosProjects.find((p) => p.id === projectId);
          if (project && index > 0) {
            const prevProject = cosmosProjects.find(
              (p) => p.id === flow.projects[index - 1],
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
    project: CreativeProject,
  ) => {
    const { x, y } = project.position;

    // Project nebula effect
    const gradient = ctx.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      project.size * 1.5,
    );
    gradient.addColorStop(0, project.color + '80');
    gradient.addColorStop(0.5, project.color + '40');
    gradient.addColorStop(1, project.color + '10');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, project.size * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Project core
    ctx.fillStyle = project.color;
    ctx.shadowColor = project.color;
    ctx.shadowBlur = project.isSelected ? 25 : 15;

    ctx.beginPath();
    ctx.arc(x, y, project.size, 0, Math.PI * 2);
    ctx.fill();

    // Progress ring
    if (controls.showEngagement && project.progress > 0) {
      ctx.strokeStyle =
        project.engagement > 80
          ? '#10b981'
          : project.engagement > 60
            ? '#f59e0b'
            : '#ef4444';
      ctx.lineWidth = 3;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(
        x,
        y,
        project.size + 8,
        -Math.PI / 2,
        -Math.PI / 2 + (project.progress / 100) * Math.PI * 2,
      );
      ctx.stroke();
    }

    // Render particles if enabled
    if (
      controls.showParticles &&
      (controls.viewMode === 'cosmos' || project.isSelected)
    ) {
      project.particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.arc(
          particle.position.x,
          particle.position.y,
          particle.size,
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Particle trail
        if (particle.type === 'inspiration') {
          ctx.strokeStyle = particle.color + '40';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(particle.position.x, particle.position.y);
          ctx.stroke();
        }
      });
    }

    // Status indicator
    renderStatusIndicator(ctx, x, y, project);

    ctx.shadowBlur = 0;
  };

  const renderStatusIndicator = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    project: CreativeProject,
  ) => {
    const statusColors = {
      idea: '#6366f1',
      draft: '#f59e0b',
      review: '#8b5cf6',
      published: '#10b981',
      archived: '#6b7280',
    };

    if (project.status === 'idea') {
      // Pulsing idea effect
      const pulseRadius = project.size + 15 + Math.sin(orbitTime * 4) * 5;
      ctx.strokeStyle = statusColors[project.status] + '60';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (project.status === 'published') {
      // Success glow
      ctx.strokeStyle = statusColors[project.status];
      ctx.lineWidth = 2;
      ctx.shadowColor = statusColors[project.status];
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(x, y, project.size + 12, 0, Math.PI * 2);
      ctx.stroke();
    }
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
      const clickedProject = cosmosProjects.find((project) => {
        const distance = Math.sqrt(
          (x - project.position.x) ** 2 + (y - project.position.y) ** 2,
        );
        return distance <= project.size + 15;
      });

      if (clickedProject) {
        setControls((prev) => ({
          ...prev,
          selectedProject:
            prev.selectedProject === clickedProject.id
              ? null
              : clickedProject.id,
        }));

        setCosmosProjects((prev) =>
          prev.map((p) => ({
            ...p,
            isSelected: p.id === clickedProject.id,
          })),
        );

        onProjectSelect(clickedProject);
        return;
      }

      // Check particle clicks if in detailed view
      if (controls.viewMode === 'particle') {
        for (const project of cosmosProjects) {
          const clickedParticle = project.particles.find((particle) => {
            const distance = Math.sqrt(
              (x - particle.position.x) ** 2 + (y - particle.position.y) ** 2,
            );
            return distance <= particle.size + 3;
          });

          if (clickedParticle && onParticleSelect) {
            onParticleSelect(clickedParticle);
            return;
          }
        }
      }
    },
    [
      cosmosProjects,
      controls.viewMode,
      onProjectSelect,
      onParticleSelect,
      canvasRef,
    ],
  );

  // Render to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderCosmos(ctx);
  }, [renderCosmos, canvasRef]);

  return (
    <div className="creators-cosmos">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onClick={handleCanvasClick}
        className="cosmos-canvas"
      />
    </div>
  );
};

export default CreatorsCosmos;
