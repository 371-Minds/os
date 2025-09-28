/**
 * DepartmentSolarSystems.tsx - Team Performance Solar Systems
 * Departments as star systems with team planets and project asteroids
 */

import type React from 'react';
import { useCallback, useEffect, useState } from 'react';

interface DepartmentSolarSystem {
  id: string;
  name: string;
  centerPosition: { x: number; y: number };
  performance: number;
  budget: number;
  budgetUtilization: number;
  headcount: number;
  efficiency: number;
  productivity: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  strategicImportance: number;
  starSize: number;
  starColor: string;
  gravitationalPull: number;
  teams: Team[];
  projects: Project[];
  isSelected: boolean;
  isExpanded: boolean;
}

interface Team {
  id: string;
  name: string;
  size: number;
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  performance: number;
  velocity: number;
  satisfaction: number;
  planetSize: number;
  planetColor: string;
  satellites: TeamSatellite[];
}

interface Project {
  id: string;
  name: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  progress: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  position: { x: number; y: number };
  size: number;
  color: string;
  assignedTeamId: string;
}

interface TeamSatellite {
  id: string;
  name: string;
  type: 'skill' | 'tool' | 'metric';
  value: number;
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  color: string;
}

interface DepartmentSolarSystemsProps {
  departments: DepartmentSolarSystem[];
  agentInsights?: any[];
  onDepartmentSelect: (department: DepartmentSolarSystem) => void;
  onTeamSelect: (team: Team) => void;
  onProjectSelect?: (project: Project) => void;
  animationSpeed: number;
  showProjects: boolean;
  showTeamDetails?: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  orbitTime: number;
}

export const DepartmentSolarSystems: React.FC<DepartmentSolarSystemsProps> = ({
  departments,
  onDepartmentSelect,
  onTeamSelect,
  animationSpeed = 1.0,
  showProjects = true,
  canvasRef,
  orbitTime,
}) => {
  const [enhancedDepartments, setEnhancedDepartments] = useState<
    DepartmentSolarSystem[]
  >([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );

  // Generate teams for departments
  const generateTeams = (department: DepartmentSolarSystem): Team[] => {
    const teamCount = Math.max(2, Math.floor(department.headcount / 8));
    const teams: Team[] = [];

    for (let i = 0; i < teamCount; i++) {
      const angle = (i / teamCount) * Math.PI * 2;
      const orbitRadius = 60 + i * 25;

      teams.push({
        id: `${department.id}-team-${i}`,
        name: `Team ${String.fromCharCode(65 + i)}`,
        size: Math.floor(department.headcount / teamCount),
        position: { x: 0, y: 0 },
        orbitRadius,
        orbitSpeed: 0.015 + Math.random() * 0.01,
        orbitAngle: angle,
        performance: 70 + Math.random() * 30,
        velocity: 50 + Math.random() * 50,
        satisfaction: 60 + Math.random() * 40,
        planetSize: 6 + Math.random() * 4,
        planetColor: getTeamColor(i),
        satellites: generateSatellites(`${department.id}-team-${i}`),
      });
    }

    return teams;
  };

  const generateProjects = (department: DepartmentSolarSystem): Project[] => {
    const projectCount = Math.floor(department.headcount / 5);
    const projects: Project[] = [];

    for (let i = 0; i < projectCount; i++) {
      const status = ['planning', 'active', 'on-hold', 'completed'][
        Math.floor(Math.random() * 4)
      ] as Project['status'];
      const priority = ['low', 'medium', 'high', 'critical'][
        Math.floor(Math.random() * 4)
      ] as Project['priority'];

      projects.push({
        id: `${department.id}-project-${i}`,
        name: `Project ${String.fromCharCode(65 + i)}`,
        status,
        progress: Math.random() * 100,
        priority,
        position: { x: 0, y: 0 },
        size: 3 + Math.random() * 3,
        color: getProjectColor(status),
        assignedTeamId: `${department.id}-team-${Math.floor(Math.random() * Math.max(1, Math.floor(department.headcount / 8)))}`,
      });
    }

    return projects;
  };

  const generateSatellites = (teamId: string): TeamSatellite[] => {
    const skills = ['Technical', 'Leadership', 'Communication'];
    return skills.map((skill, index) => ({
      id: `${teamId}-skill-${index}`,
      name: skill,
      type: 'skill' as const,
      value: 60 + Math.random() * 40,
      position: { x: 0, y: 0 },
      orbitRadius: 15 + index * 5,
      orbitSpeed: 0.1 + Math.random() * 0.05,
      size: 2,
      color: '#60a5fa',
    }));
  };

  const getTeamColor = (index: number): string => {
    const colors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];
    return colors[index % colors.length];
  };

  const getProjectColor = (status: string): string => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'planning':
        return '#3b82f6';
      case 'on-hold':
        return '#f59e0b';
      case 'completed':
        return '#6b7280';
      default:
        return '#ef4444';
    }
  };

  const getStarColor = (performance: number): string => {
    if (performance >= 90) return '#fbbf24'; // Gold star
    if (performance >= 70) return '#60a5fa'; // Blue star
    if (performance >= 50) return '#f87171'; // Red star
    return '#9ca3af'; // Gray star
  };

  // Update positions
  const updatePositions = useCallback(() => {
    setEnhancedDepartments((prev) =>
      prev.map((dept) => {
        const updatedTeams = dept.teams.map((team) => {
          const angle = orbitTime * team.orbitSpeed * animationSpeed;
          const newX =
            dept.centerPosition.x +
            Math.cos(angle + team.orbitAngle) * team.orbitRadius;
          const newY =
            dept.centerPosition.y +
            Math.sin(angle + team.orbitAngle) * team.orbitRadius;

          const updatedSatellites = team.satellites.map((satellite) => {
            const satAngle = orbitTime * satellite.orbitSpeed * animationSpeed;
            return {
              ...satellite,
              position: {
                x: newX + Math.cos(satAngle) * satellite.orbitRadius,
                y: newY + Math.sin(satAngle) * satellite.orbitRadius,
              },
            };
          });

          return {
            ...team,
            position: { x: newX, y: newY },
            satellites: updatedSatellites,
          };
        });

        const updatedProjects = dept.projects.map((project, index) => {
          const angle = orbitTime * 0.008 * animationSpeed + index * 0.5;
          const radius = 100 + index * 15;
          return {
            ...project,
            position: {
              x: dept.centerPosition.x + Math.cos(angle) * radius,
              y: dept.centerPosition.y + Math.sin(angle) * radius,
            },
          };
        });

        return { ...dept, teams: updatedTeams, projects: updatedProjects };
      }),
    );
  }, [orbitTime, animationSpeed]);

  // Render departments
  const renderDepartments = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      enhancedDepartments.forEach((dept) => {
        const { x, y } = dept.centerPosition;

        // Draw department star
        ctx.fillStyle = dept.starColor;
        ctx.shadowColor = dept.starColor;
        ctx.shadowBlur = dept.isSelected ? 30 : 20;
        ctx.beginPath();
        ctx.arc(x, y, dept.starSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw teams as planets
        dept.teams.forEach((team) => {
          ctx.fillStyle = team.planetColor;
          ctx.shadowColor = team.planetColor;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(
            team.position.x,
            team.position.y,
            team.planetSize,
            0,
            Math.PI * 2,
          );
          ctx.fill();

          // Draw team satellites
          team.satellites.forEach((satellite) => {
            ctx.fillStyle = satellite.color;
            ctx.shadowBlur = 3;
            ctx.beginPath();
            ctx.arc(
              satellite.position.x,
              satellite.position.y,
              satellite.size,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          });
        });

        // Draw projects as asteroids
        if (showProjects) {
          dept.projects.forEach((project) => {
            ctx.fillStyle = project.color;
            ctx.shadowBlur = 5;
            ctx.beginPath();
            ctx.arc(
              project.position.x,
              project.position.y,
              project.size,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          });
        }

        ctx.shadowBlur = 0;
      });
    },
    [enhancedDepartments, showProjects],
  );

  // Handle interactions
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Check department clicks
      const clickedDepartment = enhancedDepartments.find((dept) => {
        const distance = Math.sqrt(
          (x - dept.centerPosition.x) ** 2 + (y - dept.centerPosition.y) ** 2,
        );
        return distance <= dept.starSize + 10;
      });

      if (clickedDepartment) {
        setSelectedDepartment((prev) =>
          prev === clickedDepartment.id ? null : clickedDepartment.id,
        );
        onDepartmentSelect(clickedDepartment);
        return;
      }

      // Check team clicks
      for (const dept of enhancedDepartments) {
        const clickedTeam = dept.teams.find((team) => {
          const distance = Math.sqrt(
            (x - team.position.x) ** 2 + (y - team.position.y) ** 2,
          );
          return distance <= team.planetSize + 5;
        });

        if (clickedTeam) {
          onTeamSelect(clickedTeam);
          return;
        }
      }
    },
    [enhancedDepartments, onDepartmentSelect, onTeamSelect, canvasRef],
  );

  // Initialize enhanced departments
  useEffect(() => {
    const enhanced = departments.map((dept) => ({
      ...dept,
      teams: generateTeams(dept),
      projects: generateProjects(dept),
      starSize: Math.max(12, Math.min(30, dept.performance / 3)),
      starColor: getStarColor(dept.performance),
      gravitationalPull: 1.0 + dept.strategicImportance / 10,
      isSelected: false,
      isExpanded: false,
    }));
    setEnhancedDepartments(enhanced);
  }, [departments]);

  useEffect(() => {
    updatePositions();
  }, [updatePositions]);

  useEffect(() => {
    setEnhancedDepartments((prev) =>
      prev.map((dept) => ({
        ...dept,
        isSelected: dept.id === selectedDepartment,
      })),
    );
  }, [selectedDepartment]);

  return null;
};

export default DepartmentSolarSystems;
