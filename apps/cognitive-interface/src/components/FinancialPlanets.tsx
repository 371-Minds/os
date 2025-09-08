/**
 * FinancialPlanets.tsx - Interactive Financial Celestial Bodies
 * Enhanced planets with real-time business intelligence integration
 */

import type React from 'react';
import { useCallback, useEffect, useState } from 'react';

interface FinancialPlanet {
  id: string;
  name: string;
  type: 'revenue' | 'expense' | 'asset' | 'liability' | 'kpi';
  value: number;
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  size: number;
  color: string;
  growth: number;
  volatility: number;
  confidence: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  trend: 'ascending' | 'descending' | 'stable' | 'volatile';
  satellites: FinancialSatellite[];
  alerts: PlanetAlert[];
  isSelected: boolean;
  isHovered: boolean;
}

interface FinancialSatellite {
  id: string;
  name: string;
  value: number;
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  color: string;
  impact: 'positive' | 'negative' | 'neutral';
}

interface PlanetAlert {
  id: string;
  type: 'warning' | 'critical' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  priority: number;
}

interface FinancialPlanetsProps {
  businessData: any[];
  agentInsights?: any[];
  onPlanetSelect: (planet: FinancialPlanet) => void;
  onDrillDown: (planetId: string, timeRange: string) => void;
  onAlertAction: (alert: PlanetAlert) => void;
  animationSpeed: number;
  showSatellites: boolean;
  realTimeMode: boolean;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  orbitTime: number;
}

export const FinancialPlanets: React.FC<FinancialPlanetsProps> = ({
  businessData,
  onPlanetSelect,
  animationSpeed = 1.0,
  showSatellites = true,
  canvasRef,
  orbitTime,
}) => {
  const [planets, setPlanets] = useState<FinancialPlanet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  // Create planets from business data
  const createPlanets = useCallback((data: any[]): FinancialPlanet[] => {
    return data.map((metric, index) => {
      const planetSize = Math.max(
        8,
        Math.min(25, (metric.value / 1000000) * 2),
      );
      const orbitRadius = 80 + index * 40;

      return {
        id: metric.id,
        name: metric.name,
        type: metric.category,
        value: metric.value,
        position: { x: 400, y: 300 },
        orbitRadius,
        orbitSpeed: 0.01 + Math.random() * 0.02,
        orbitAngle: (index * Math.PI * 2) / data.length,
        size: planetSize,
        color: getPlanetColor(metric.category, metric.value),
        growth:
          ((metric.value - (metric.previousValue || metric.value)) /
            metric.value) *
          100,
        volatility: metric.volatility || Math.random() * 0.5,
        confidence: metric.confidence || 0.8,
        priority: metric.priority || 'medium',
        trend: metric.trend || 'stable',
        satellites: createSatellites(metric),
        alerts: generateAlerts(metric),
        isSelected: false,
        isHovered: false,
      };
    });
  }, []);

  const getPlanetColor = (type: string, value: number) => {
    switch (type) {
      case 'revenue':
        return '#10b981';
      case 'expense':
        return '#ef4444';
      case 'asset':
        return '#3b82f6';
      case 'kpi':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const createSatellites = (metric: any): FinancialSatellite[] => {
    return [
      {
        id: `${metric.id}-growth`,
        name: 'Growth Rate',
        value: Math.random() * 20,
        position: { x: 0, y: 0 },
        orbitRadius: 20,
        orbitSpeed: 0.05,
        size: 4,
        color: '#10b981',
        impact: 'positive',
      },
    ];
  };

  const generateAlerts = (metric: any): PlanetAlert[] => {
    const alerts: PlanetAlert[] = [];
    if (metric.priority === 'critical') {
      alerts.push({
        id: `${metric.id}-alert`,
        type: 'critical',
        title: 'Critical Metric',
        message: `${metric.name} requires attention`,
        timestamp: new Date(),
        priority: 10,
      });
    }
    return alerts;
  };

  // Update planet positions
  const updatePositions = useCallback(() => {
    setPlanets((prev) =>
      prev.map((planet) => {
        const angle = orbitTime * planet.orbitSpeed * animationSpeed;
        const wobble = Math.sin(orbitTime * 5) * planet.volatility * 3;

        const newX =
          400 +
          Math.cos(angle + planet.orbitAngle) * (planet.orbitRadius + wobble);
        const newY =
          300 +
          Math.sin(angle + planet.orbitAngle) * (planet.orbitRadius + wobble);

        const updatedSatellites = planet.satellites.map((satellite) => {
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
          ...planet,
          position: { x: newX, y: newY },
          satellites: updatedSatellites,
        };
      }),
    );
  }, [orbitTime, animationSpeed]);

  // Render planets with enhanced visuals
  const renderPlanets = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      planets.forEach((planet) => {
        const { x, y } = planet.position;

        // Planet atmosphere
        const atmosphereGradient = ctx.createRadialGradient(
          x,
          y,
          planet.size,
          x,
          y,
          planet.size + 8,
        );
        atmosphereGradient.addColorStop(0, planet.color + '40');
        atmosphereGradient.addColorStop(1, planet.color + '00');
        ctx.fillStyle = atmosphereGradient;
        ctx.beginPath();
        ctx.arc(x, y, planet.size + 8, 0, Math.PI * 2);
        ctx.fill();

        // Main planet
        const planetGradient = ctx.createRadialGradient(
          x - planet.size * 0.3,
          y - planet.size * 0.3,
          0,
          x,
          y,
          planet.size,
        );
        planetGradient.addColorStop(0, planet.color);
        planetGradient.addColorStop(1, planet.color + '80');

        ctx.fillStyle = planetGradient;
        ctx.shadowColor = planet.color;
        ctx.shadowBlur = planet.isSelected ? 25 : 15;
        ctx.beginPath();
        ctx.arc(x, y, planet.size, 0, Math.PI * 2);
        ctx.fill();

        // Satellites
        if (showSatellites) {
          planet.satellites.forEach((satellite) => {
            ctx.fillStyle = satellite.color;
            ctx.shadowBlur = 5;
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
        }

        // Alert indicators
        if (planet.alerts.length > 0) {
          ctx.fillStyle = '#ef4444';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x + planet.size, y - planet.size, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.shadowBlur = 0;
      });
    },
    [planets, showSatellites],
  );

  // Mouse interaction handlers
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const hoveredPlanet = planets.find((planet) => {
        const distance = Math.sqrt(
          (x - planet.position.x) ** 2 + (y - planet.position.y) ** 2,
        );
        return distance <= planet.size + 5;
      });

      setPlanets((prev) =>
        prev.map((planet) => ({
          ...planet,
          isHovered: planet.id === hoveredPlanet?.id,
        })),
      );
    },
    [planets, canvasRef],
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const clickedPlanet = planets.find((planet) => {
        const distance = Math.sqrt(
          (x - planet.position.x) ** 2 + (y - planet.position.y) ** 2,
        );
        return distance <= planet.size + 10;
      });

      if (clickedPlanet) {
        setSelectedPlanet((prev) =>
          prev === clickedPlanet.id ? null : clickedPlanet.id,
        );
        onPlanetSelect(clickedPlanet);
      }
    },
    [planets, onPlanetSelect, canvasRef],
  );

  // Initialize and update
  useEffect(() => {
    if (businessData.length > 0) {
      setPlanets(createPlanets(businessData));
    }
  }, [businessData, createPlanets]);

  useEffect(() => {
    updatePositions();
  }, [updatePositions]);

  useEffect(() => {
    setPlanets((prev) =>
      prev.map((planet) => ({
        ...planet,
        isSelected: planet.id === selectedPlanet,
      })),
    );
  }, [selectedPlanet]);

  return null;
};

export default FinancialPlanets;
