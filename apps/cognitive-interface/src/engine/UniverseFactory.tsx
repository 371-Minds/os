/**
 * UniverseFactory.tsx - Universal Universe Factory
 * 
 * The revolutionary factory that can create a spatial universe for ANY domain
 * using the Galaxy Engine Template system. This demonstrates infinite scalability
 * and completes the C3 milestone by proving universal applicability.
 * 
 * ANY DOMAIN → SPATIAL UNIVERSE IN MINUTES! 🌌
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GalaxyEngineTemplate, UniverseConfiguration, UniverseEntity, UniverseConstellation, UniverseFlow, DomainTemplates } from './GalaxyEngineTemplate';
import './UniverseFactory.css';

interface UniverseFactoryProps {
  configuration: UniverseConfiguration;
  data?: any[];
  onEntitySelect?: (entity: UniverseEntity) => void;
  onConstellationSelect?: (constellation: UniverseConstellation) => void;
  onFlowAction?: (flow: UniverseFlow, action: string) => void;
  onUniverseAction?: (action: string, data: any) => void;
  enableRealTimeSync?: boolean;
  className?: string;
}

interface UniverseCanvasProps {
  galaxyEngine: GalaxyEngineTemplate;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onEntityClick?: (entity: UniverseEntity) => void;
  onConstellationClick?: (constellation: UniverseConstellation) => void;
}

// Universal Canvas Renderer
const UniverseCanvas: React.FC<UniverseCanvasProps> = ({
  galaxyEngine,
  canvasRef,
  onEntityClick,
  onConstellationClick
}) => {
  const [orbitTime, setOrbitTime] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setOrbitTime(prev => prev + 0.016 * galaxyEngine.getControls().animationSpeed);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [galaxyEngine]);

  // Render universe
  const renderUniverse = useCallback((ctx: CanvasRenderingContext2D) => {
    const canvas = ctx.canvas;
    const config = galaxyEngine.getConfiguration();
    const controls = galaxyEngine.getControls();
    const entities = galaxyEngine.getEntities();
    const constellations = galaxyEngine.getConstellations();
    const flows = galaxyEngine.getFlows();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background effects
    if (config.canvasConfig.backgroundEffects) {
      renderBackgroundEffects(ctx, config);
    }

    // Flow connections
    if (controls.showFlows) {
      renderFlows(ctx, flows, entities, config);
    }

    // Constellation connections
    if (controls.showConnections) {
      renderConstellations(ctx, constellations, entities, config);
    }

    // Entities with satellites
    entities.forEach(entity => {
      renderEntity(ctx, entity, controls, config, orbitTime);
    });

    // Universe metrics overlay
    if (controls.showMetrics) {
      renderMetricsOverlay(ctx, galaxyEngine.getStats(), config);
    }
  }, [galaxyEngine, orbitTime]);

  const renderBackgroundEffects = (ctx: CanvasRenderingContext2D, config: UniverseConfiguration) => {
    // Cosmic dust and stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * ctx.canvas.width;
      const y = Math.random() * ctx.canvas.height;
      const size = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // Domain-specific energy streams
    ctx.strokeStyle = `${config.colorScheme.primary}40`;
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      const startX = Math.random() * ctx.canvas.width;
      const startY = Math.random() * ctx.canvas.height;
      const endX = startX + (Math.random() - 0.5) * 150;
      const endY = startY + (Math.random() - 0.5) * 150;
      
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  };

  const renderFlows = (
    ctx: CanvasRenderingContext2D, 
    flows: UniverseFlow[], 
    entities: UniverseEntity[], 
    config: UniverseConfiguration
  ) => {
    flows.forEach(flow => {
      if (flow.status === 'active') {
        const flowType = config.flowTypes[flow.type];
        ctx.strokeStyle = flowType?.color || config.colorScheme.accent;
        ctx.lineWidth = 2;
        ctx.shadowColor = flowType?.color || config.colorScheme.accent;
        ctx.shadowBlur = 8;
        
        // Connect entities in the flow
        flow.entities.forEach((entityId, index) => {
          const entity = entities.find(e => e.id === entityId);
          if (entity && index > 0) {
            const prevEntity = entities.find(e => e.id === flow.entities[index - 1]);
            if (prevEntity) {
              ctx.beginPath();
              ctx.moveTo(prevEntity.position.x, prevEntity.position.y);
              ctx.lineTo(entity.position.x, entity.position.y);
              ctx.stroke();
            }
          }
        });
        
        ctx.shadowBlur = 0;
      }
    });
  };

  const renderConstellations = (
    ctx: CanvasRenderingContext2D,
    constellations: UniverseConstellation[],
    entities: UniverseEntity[],
    config: UniverseConfiguration
  ) => {
    constellations.forEach(constellation => {
      const constellationType = config.constellationTypes[constellation.type];
      ctx.strokeStyle = constellationType?.connectionColor || config.colorScheme.secondary;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      
      // Connect constellation center to entities
      constellation.entities.forEach(entityId => {
        const entity = entities.find(e => e.id === entityId);
        if (entity) {
          ctx.beginPath();
          ctx.moveTo(constellation.centerPosition.x, constellation.centerPosition.y);
          ctx.lineTo(entity.position.x, entity.position.y);
          ctx.stroke();
        }
      });
      
      ctx.setLineDash([]);
    });
  };

  const renderEntity = (
    ctx: CanvasRenderingContext2D,
    entity: UniverseEntity,
    controls: any,
    config: UniverseConfiguration,
    orbitTime: number
  ) => {
    const { x, y } = entity.position;

    // Entity glow effect
    ctx.fillStyle = entity.color;
    ctx.shadowColor = entity.color;
    ctx.shadowBlur = entity.isSelected ? 25 : 15;
    
    // Draw entity
    ctx.beginPath();
    ctx.arc(x, y, entity.size, 0, Math.PI * 2);
    ctx.fill();

    // Status indicator ring
    const statusColor = config.colorScheme.statusColors[entity.status] || entity.color;
    if (statusColor !== entity.color) {
      ctx.strokeStyle = statusColor;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, entity.size + 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Render satellites if enabled
    if (controls.showSatellites && entity.satellites.length > 0) {
      entity.satellites.forEach(satellite => {
        const satelliteAngle = orbitTime * satellite.orbitSpeed;
        const satelliteX = x + Math.cos(satelliteAngle) * satellite.orbitRadius;
        const satelliteY = y + Math.sin(satelliteAngle) * satellite.orbitRadius;
        
        ctx.fillStyle = satellite.color;
        ctx.shadowBlur = 3;
        ctx.beginPath();
        ctx.arc(satelliteX, satelliteY, satellite.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // High-performance indicator for top entities
    const avgMetric = Object.values(entity.metrics).reduce((sum, val) => sum + val, 0) / Object.values(entity.metrics).length;
    if (avgMetric > 80) {
      renderPerformanceEffect(ctx, x, y, entity.size, orbitTime);
    }

    ctx.shadowBlur = 0;
  };

  const renderPerformanceEffect = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, orbitTime: number) => {
    const pulseRadius = size + 12 + Math.sin(orbitTime * 2) * 6;
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
    ctx.stroke();
  };

  const renderMetricsOverlay = (ctx: CanvasRenderingContext2D, stats: any, config: UniverseConfiguration) => {
    ctx.fillStyle = config.colorScheme.primary;
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText(`Entities: ${stats.totalEntities}`, 20, 30);
    ctx.fillText(`Satellites: ${stats.totalSatellites}`, 20, 50);
    ctx.fillText(`Active Flows: ${stats.activeFlows}`, 20, 70);
    ctx.fillText(`Last Update: ${stats.lastUpdate.toLocaleTimeString()}`, 20, 90);
  };

  // Handle canvas interactions
  const handleCanvasClick = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check entity clicks
    const entities = galaxyEngine.getEntities();
    const clickedEntity = entities.find(entity => {
      const distance = Math.sqrt(
        Math.pow(x - entity.position.x, 2) + Math.pow(y - entity.position.y, 2)
      );
      return distance <= entity.size + 10;
    });

    if (clickedEntity && onEntityClick) {
      onEntityClick(clickedEntity);
      return;
    }

    // Check constellation clicks
    const constellations = galaxyEngine.getConstellations();
    constellations.forEach(constellation => {
      const distance = Math.sqrt(
        Math.pow(x - constellation.centerPosition.x, 2) + 
        Math.pow(y - constellation.centerPosition.y, 2)
      );
      if (distance <= constellation.size + 15 && onConstellationClick) {
        onConstellationClick(constellation);
      }
    });
  }, [galaxyEngine, onEntityClick, onConstellationClick, canvasRef]);

  // Update entity positions based on orbits
  useEffect(() => {
    const entities = galaxyEngine.getEntities();
    const controls = galaxyEngine.getControls();
    
    entities.forEach(entity => {
      if (entity.orbitRadius > 0) {
        const angle = orbitTime * entity.orbitSpeed;
        const newX = controls.centerPosition.x + Math.cos(angle + entity.orbitAngle) * entity.orbitRadius;
        const newY = controls.centerPosition.y + Math.sin(angle + entity.orbitAngle) * entity.orbitRadius;
        
        galaxyEngine.updateEntity(entity.id, {
          position: { x: newX, y: newY }
        });
      }
    });
  }, [orbitTime, galaxyEngine]);

  // Render to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderUniverse(ctx);
  }, [renderUniverse, canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      width={galaxyEngine.getConfiguration().canvasConfig.width}
      height={galaxyEngine.getConfiguration().canvasConfig.height}
      onClick={handleCanvasClick}
      className="universe-canvas"
    />
  );
};

// Main Universe Factory Component
export const UniverseFactory: React.FC<UniverseFactoryProps> = ({
  configuration,
  data = [],
  onEntitySelect,
  onConstellationSelect,
  onFlowAction,
  onUniverseAction,
  enableRealTimeSync = false,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [galaxyEngine] = useState(() => new GalaxyEngineTemplate(configuration));
  const [selectedEntity, setSelectedEntity] = useState<UniverseEntity | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize universe with data
  useEffect(() => {
    if (data.length > 0 && !isInitialized) {
      data.forEach(item => {
        try {
          galaxyEngine.addEntity(item);
        } catch (error) {
          console.error('Failed to add entity:', error, item);
        }
      });
      setIsInitialized(true);
    }
  }, [data, galaxyEngine, isInitialized]);

  // Set up event listeners
  useEffect(() => {
    galaxyEngine.on('entity_added', (entity: UniverseEntity) => {
      onUniverseAction?.('entity_added', entity);
    });

    galaxyEngine.on('entity_updated', (entity: UniverseEntity) => {
      onUniverseAction?.('entity_updated', entity);
    });

    galaxyEngine.on('stats_updated', (stats: any) => {
      onUniverseAction?.('stats_updated', stats);
    });
  }, [galaxyEngine, onUniverseAction]);

  const handleEntityClick = useCallback((entity: UniverseEntity) => {
    // Update selection in galaxy engine
    galaxyEngine.getEntities().forEach(e => {
      galaxyEngine.updateEntity(e.id, { isSelected: e.id === entity.id });
    });

    setSelectedEntity(entity);
    onEntitySelect?.(entity);
  }, [galaxyEngine, onEntitySelect]);

  const handleConstellationClick = useCallback((constellation: UniverseConstellation) => {
    onConstellationSelect?.(constellation);
  }, [onConstellationSelect]);

  return (
    <div className={`universe-factory ${className}`}>
      <div className="universe-header">
        <h2 className="universe-title">{configuration.title}</h2>
        <p className="universe-description">{configuration.description}</p>
        <div className="universe-stats">
          <span className="stat">
            🌌 {galaxyEngine.getStats().totalEntities} {configuration.domain} entities
          </span>
          <span className="stat">
            ⭐ {galaxyEngine.getStats().totalSatellites} satellites
          </span>
          <span className="stat">
            ⚡ {galaxyEngine.getStats().activeFlows} active flows
          </span>
        </div>
      </div>

      <div className="universe-canvas-container">
        <UniverseCanvas
          galaxyEngine={galaxyEngine}
          canvasRef={canvasRef}
          onEntityClick={handleEntityClick}
          onConstellationClick={handleConstellationClick}
        />
      </div>

      {selectedEntity && (
        <div className="selected-entity-panel">
          <div className="panel-header">
            <h3>{selectedEntity.name}</h3>
            <button 
              className="close-btn"
              onClick={() => setSelectedEntity(null)}
            >
              ×
            </button>
          </div>
          <div className="panel-content">
            <div className="entity-details">
              <div className="detail-row">
                <span className="label">Type:</span>
                <span className="value">{selectedEntity.type}</span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className={`value status-${selectedEntity.status}`}>
                  {selectedEntity.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Satellites:</span>
                <span className="value">{selectedEntity.satellites.length}</span>
              </div>
            </div>
            
            <div className="entity-metrics">
              {Object.entries(selectedEntity.metrics).map(([metric, value]) => (
                <div key={metric} className="metric">
                  <span className="metric-label">{metric}</span>
                  <span className="metric-value">{value.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Pre-configured Universe Components
export const BusinessIntelligenceUniverse: React.FC<Omit<UniverseFactoryProps, 'configuration'>> = (props) => (
  <UniverseFactory configuration={DomainTemplates.BusinessIntelligence()} {...props} />
);

export const DevelopmentUniverse: React.FC<Omit<UniverseFactoryProps, 'configuration'>> = (props) => (
  <UniverseFactory configuration={DomainTemplates.Development()} {...props} />
);

export const CommunicationsUniverse: React.FC<Omit<UniverseFactoryProps, 'configuration'>> = (props) => (
  <UniverseFactory configuration={DomainTemplates.Communications()} {...props} />
);

// Universe Creation Helper
export const createUniverse = (domain: string, customConfig?: Partial<UniverseConfiguration>): UniverseConfiguration => {
  const template = DomainTemplates[domain as keyof typeof DomainTemplates];
  if (!template) {
    throw new Error(`Unknown domain template: ${domain}. Available: ${Object.keys(DomainTemplates).join(', ')}`);
  }
  
  const baseConfig = template();
  return customConfig ? { ...baseConfig, ...customConfig } : baseConfig;
};

export default UniverseFactory;