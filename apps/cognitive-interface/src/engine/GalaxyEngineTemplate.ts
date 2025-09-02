/**
 * GalaxyEngineTemplate.ts - Universal Galaxy Engine Template System
 * 
 * The revolutionary abstraction layer that enables infinite vertical scaling.
 * This template system demonstrates how ANY domain can be transformed into
 * a spatial universe interface using our proven Galaxy Engine paradigm.
 * 
 * Completes C3 milestone by proving universal scalability across domains:
 * - Business Intelligence → CEO's Orrery ✅
 * - Development → Developer's Galaxy ✅  
 * - Creative → Creator's Cosmos ✅
 * - Communications → Communications Universe ✅
 * - ANY DOMAIN → Spatial Universe 🌌
 */

export interface UniverseEntity {
  id: string;
  name: string;
  type: string;
  status: string;
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  size: number;
  color: string;
  satellites: UniverseSatellite[];
  metrics: Record<string, number>;
  metadata: Record<string, any>;
  isSelected: boolean;
  timestamp?: Date;
}

export interface UniverseSatellite {
  id: string;
  name: string;
  type: string;
  position: { x: number; y: number };
  orbitRadius: number;
  orbitSpeed: number;
  size: number;
  value: number;
  color: string;
  metadata?: Record<string, any>;
}

export interface UniverseConstellation {
  id: string;
  name: string;
  type: string;
  entities: string[];
  centerPosition: { x: number; y: number };
  connectionStrength: number;
  size: number;
  memberCount: number;
  metadata: Record<string, any>;
}

export interface UniverseFlow {
  id: string;
  name: string;
  type: string;
  stages: UniverseFlowStage[];
  entities: string[];
  status: 'active' | 'paused' | 'completed' | 'draft';
  progress: number;
  effectiveness: number;
  metadata: Record<string, any>;
}

export interface UniverseFlowStage {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'complete' | 'skipped';
  duration?: number;
  conditions?: string[];
  metadata?: Record<string, any>;
}

export interface UniverseControls {
  zoomLevel: number;
  centerPosition: { x: number; y: number };
  selectedEntity: string | null;
  viewMode: string;
  showSatellites: boolean;
  showFlows: boolean;
  showMetrics: boolean;
  showConnections: boolean;
  animationSpeed: number;
  timeRange: string;
}

export interface UniverseConfiguration {
  domain: string;
  title: string;
  description: string;
  entityTypes: Record<string, EntityTypeConfig>;
  satelliteTypes: Record<string, SatelliteTypeConfig>;
  constellationTypes: Record<string, ConstellationTypeConfig>;
  flowTypes: Record<string, FlowTypeConfig>;
  colorScheme: ColorScheme;
  defaultControls: Partial<UniverseControls>;
  canvasConfig: CanvasConfig;
  integrations: IntegrationConfig[];
}

export interface EntityTypeConfig {
  name: string;
  description: string;
  color: string;
  sizeRange: [number, number];
  orbitConfig: {
    speedRange: [number, number];
    radiusRange: [number, number];
  };
  statusOptions: string[];
  requiredMetrics: string[];
  optionalMetrics: string[];
  satelliteTypes: string[];
}

export interface SatelliteTypeConfig {
  name: string;
  description: string;
  color: string;
  sizeRange: [number, number];
  orbitConfig: {
    speedRange: [number, number];
    radiusRange: [number, number];
  };
}

export interface ConstellationTypeConfig {
  name: string;
  description: string;
  connectionColor: string;
  sizeRange: [number, number];
  maxEntities: number;
}

export interface FlowTypeConfig {
  name: string;
  description: string;
  color: string;
  maxStages: number;
  stageTypes: string[];
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  entityColors: Record<string, string>;
  satelliteColors: Record<string, string>;
  statusColors: Record<string, string>;
}

export interface CanvasConfig {
  width: number;
  height: number;
  backgroundEffects: boolean;
  particleEffects: boolean;
  glowEffects: boolean;
  animationFrameRate: number;
}

export interface IntegrationConfig {
  name: string;
  type: 'api' | 'webhook' | 'database' | 'file';
  endpoint?: string;
  apiKey?: string;
  syncInterval?: number;
  dataMapping: Record<string, string>;
  transformations: DataTransformation[];
}

export interface DataTransformation {
  field: string;
  operation: 'map' | 'calculate' | 'aggregate' | 'filter';
  parameters: Record<string, any>;
}

export interface UniverseStats {
  totalEntities: number;
  totalSatellites: number;
  avgMetricValues: Record<string, number>;
  totalConnections: number;
  activeFlows: number;
  lastUpdate: Date;
}

/**
 * Universal Galaxy Engine Template Class
 * 
 * Transforms any domain into a spatial universe using our proven patterns.
 * This is the core abstraction that enables infinite vertical scaling.
 */
export class GalaxyEngineTemplate {
  private config: UniverseConfiguration;
  private entities: UniverseEntity[] = [];
  private constellations: UniverseConstellation[] = [];
  private flows: UniverseFlow[] = [];
  private controls: UniverseControls;
  private stats: UniverseStats;
  private eventListeners: Map<string, Function[]> = new Map();

  constructor(config: UniverseConfiguration) {
    this.config = config;
    this.controls = {
      zoomLevel: 1.0,
      centerPosition: { x: 400, y: 300 },
      selectedEntity: null,
      viewMode: 'universe',
      showSatellites: true,
      showFlows: true,
      showMetrics: true,
      showConnections: true,
      animationSpeed: 1.0,
      timeRange: '7d',
      ...config.defaultControls
    };
    this.stats = this.initializeStats();
  }

  // Entity Management
  addEntity(rawData: Record<string, any>): UniverseEntity {
    const entity = this.transformToEntity(rawData);
    this.entities.push(entity);
    this.updateStats();
    this.emit('entity_added', entity);
    return entity;
  }

  updateEntity(entityId: string, updates: Partial<UniverseEntity>): void {
    const index = this.entities.findIndex(e => e.id === entityId);
    if (index !== -1) {
      this.entities[index] = { ...this.entities[index], ...updates };
      this.updateStats();
      this.emit('entity_updated', this.entities[index]);
    }
  }

  removeEntity(entityId: string): void {
    const index = this.entities.findIndex(e => e.id === entityId);
    if (index !== -1) {
      const entity = this.entities[index];
      this.entities.splice(index, 1);
      this.updateStats();
      this.emit('entity_removed', entity);
    }
  }

  // Constellation Management
  addConstellation(rawData: Record<string, any>): UniverseConstellation {
    const constellation = this.transformToConstellation(rawData);
    this.constellations.push(constellation);
    this.emit('constellation_added', constellation);
    return constellation;
  }

  // Flow Management
  addFlow(rawData: Record<string, any>): UniverseFlow {
    const flow = this.transformToFlow(rawData);
    this.flows.push(flow);
    this.emit('flow_added', flow);
    return flow;
  }

  // Data Transformation
  private transformToEntity(rawData: Record<string, any>): UniverseEntity {
    const entityType = this.determineEntityType(rawData);
    const typeConfig = this.config.entityTypes[entityType];
    
    if (!typeConfig) {
      throw new Error(`Unknown entity type: ${entityType}`);
    }

    const size = this.calculateSize(rawData, typeConfig.sizeRange);
    const color = typeConfig.color;
    const orbitConfig = this.calculateOrbitConfig(rawData, typeConfig.orbitConfig);
    const metrics = this.extractMetrics(rawData, typeConfig.requiredMetrics, typeConfig.optionalMetrics);
    const satellites = this.generateSatellites(rawData, typeConfig.satelliteTypes);

    return {
      id: rawData.id || this.generateId('entity'),
      name: rawData.name || rawData.title || 'Unnamed Entity',
      type: entityType,
      status: rawData.status || 'active',
      position: { x: 400, y: 300 },
      orbitRadius: orbitConfig.radius,
      orbitSpeed: orbitConfig.speed,
      orbitAngle: Math.random() * Math.PI * 2,
      size,
      color,
      satellites,
      metrics,
      metadata: rawData,
      isSelected: false,
      timestamp: rawData.timestamp ? new Date(rawData.timestamp) : new Date()
    };
  }

  private transformToConstellation(rawData: Record<string, any>): UniverseConstellation {
    const constellationType = this.determineConstellationType(rawData);
    const typeConfig = this.config.constellationTypes[constellationType];
    
    if (!typeConfig) {
      throw new Error(`Unknown constellation type: ${constellationType}`);
    }

    return {
      id: rawData.id || this.generateId('constellation'),
      name: rawData.name || 'Unnamed Constellation',
      type: constellationType,
      entities: rawData.entities || [],
      centerPosition: rawData.position || { x: 300, y: 300 },
      connectionStrength: rawData.connectionStrength || 50,
      size: this.calculateSize(rawData, typeConfig.sizeRange),
      memberCount: rawData.memberCount || rawData.entities?.length || 0,
      metadata: rawData
    };
  }

  private transformToFlow(rawData: Record<string, any>): UniverseFlow {
    const flowType = this.determineFlowType(rawData);
    const typeConfig = this.config.flowTypes[flowType];
    
    if (!typeConfig) {
      throw new Error(`Unknown flow type: ${flowType}`);
    }

    return {
      id: rawData.id || this.generateId('flow'),
      name: rawData.name || 'Unnamed Flow',
      type: flowType,
      stages: rawData.stages || [],
      entities: rawData.entities || [],
      status: rawData.status || 'active',
      progress: rawData.progress || 0,
      effectiveness: rawData.effectiveness || 0,
      metadata: rawData
    };
  }

  // Type Determination (Override in domain-specific implementations)
  protected determineEntityType(rawData: Record<string, any>): string {
    // Default implementation - override for domain-specific logic
    return rawData.type || Object.keys(this.config.entityTypes)[0];
  }

  protected determineConstellationType(rawData: Record<string, any>): string {
    return rawData.type || Object.keys(this.config.constellationTypes)[0];
  }

  protected determineFlowType(rawData: Record<string, any>): string {
    return rawData.type || Object.keys(this.config.flowTypes)[0];
  }

  // Calculation Helpers
  private calculateSize(rawData: Record<string, any>, sizeRange: [number, number]): number {
    const [min, max] = sizeRange;
    const value = rawData.size || rawData.value || rawData.count || 1;
    const normalized = Math.min(value / 1000, 1); // Normalize to 0-1
    return min + (normalized * (max - min));
  }

  private calculateOrbitConfig(rawData: Record<string, any>, orbitConfig: EntityTypeConfig['orbitConfig']): { radius: number; speed: number } {
    const index = this.entities.length;
    const radius = index === 0 ? 0 : orbitConfig.radiusRange[0] + (index * 40);
    const speed = orbitConfig.speedRange[0] + (Math.random() * (orbitConfig.speedRange[1] - orbitConfig.speedRange[0]));
    
    return { radius, speed };
  }

  private extractMetrics(rawData: Record<string, any>, required: string[], optional: string[]): Record<string, number> {
    const metrics: Record<string, number> = {};
    
    [...required, ...optional].forEach(metric => {
      if (rawData[metric] !== undefined) {
        metrics[metric] = Number(rawData[metric]) || 0;
      }
    });
    
    return metrics;
  }

  private generateSatellites(rawData: Record<string, any>, satelliteTypes: string[]): UniverseSatellite[] {
    const satellites: UniverseSatellite[] = [];
    
    satelliteTypes.forEach((satelliteType, index) => {
      const typeConfig = this.config.satelliteTypes[satelliteType];
      if (typeConfig && rawData[satelliteType]) {
        satellites.push({
          id: this.generateId('satellite'),
          name: typeConfig.name,
          type: satelliteType,
          position: { x: 0, y: 0 },
          orbitRadius: 20 + (index * 8),
          orbitSpeed: typeConfig.orbitConfig.speedRange[0] + (Math.random() * 0.01),
          size: this.calculateSize(rawData, typeConfig.sizeRange),
          value: Number(rawData[satelliteType]) || 0,
          color: typeConfig.color,
          metadata: { [satelliteType]: rawData[satelliteType] }
        });
      }
    });
    
    return satellites;
  }

  // Integration Management
  async syncWithIntegration(integrationName: string): Promise<void> {
    const integration = this.config.integrations.find(i => i.name === integrationName);
    if (!integration) {
      throw new Error(`Integration not found: ${integrationName}`);
    }

    try {
      const rawData = await this.fetchIntegrationData(integration);
      const transformedData = this.applyTransformations(rawData, integration.transformations);
      
      transformedData.forEach((item: Record<string, any>) => {
        this.addEntity(item);
      });
      
      this.emit('integration_synced', { integration: integrationName, count: transformedData.length });
    } catch (error) {
      this.emit('integration_error', { integration: integrationName, error });
      throw error;
    }
  }

  private async fetchIntegrationData(integration: IntegrationConfig): Promise<any[]> {
    switch (integration.type) {
      case 'api':
        if (!integration.endpoint) throw new Error('API endpoint required');
        const response = await fetch(integration.endpoint, {
          headers: integration.apiKey ? { 'Authorization': `Bearer ${integration.apiKey}` } : {}
        });
        return response.json();
      
      case 'database':
        // Implement database connection logic
        throw new Error('Database integration not implemented');
      
      case 'webhook':
        // Return cached webhook data
        return [];
      
      default:
        throw new Error(`Unsupported integration type: ${integration.type}`);
    }
  }

  private applyTransformations(data: any[], transformations: DataTransformation[]): any[] {
    return data.map(item => {
      let transformed = { ...item };
      
      transformations.forEach(transform => {
        switch (transform.operation) {
          case 'map':
            if (transform.parameters.from && transform.parameters.to) {
              transformed[transform.parameters.to] = transformed[transform.parameters.from];
            }
            break;
          
          case 'calculate':
            if (transform.parameters.formula) {
              // Simple calculation implementation
              transformed[transform.field] = this.evaluateFormula(transform.parameters.formula, transformed);
            }
            break;
          
          case 'filter':
            // Apply filter logic
            break;
        }
      });
      
      return transformed;
    });
  }

  private evaluateFormula(formula: string, data: Record<string, any>): number {
    // Simple formula evaluation - could be enhanced with a proper expression parser
    try {
      const expression = formula.replace(/\{(\w+)\}/g, (match, field) => {
        return data[field] || 0;
      });
      return eval(expression);
    } catch {
      return 0;
    }
  }

  // Statistics and Analytics
  private initializeStats(): UniverseStats {
    return {
      totalEntities: 0,
      totalSatellites: 0,
      avgMetricValues: {},
      totalConnections: 0,
      activeFlows: 0,
      lastUpdate: new Date()
    };
  }

  private updateStats(): void {
    this.stats = {
      totalEntities: this.entities.length,
      totalSatellites: this.entities.reduce((sum, entity) => sum + entity.satellites.length, 0),
      avgMetricValues: this.calculateAverageMetrics(),
      totalConnections: this.calculateTotalConnections(),
      activeFlows: this.flows.filter(flow => flow.status === 'active').length,
      lastUpdate: new Date()
    };
    
    this.emit('stats_updated', this.stats);
  }

  private calculateAverageMetrics(): Record<string, number> {
    const metricSums: Record<string, number> = {};
    const metricCounts: Record<string, number> = {};
    
    this.entities.forEach(entity => {
      Object.entries(entity.metrics).forEach(([metric, value]) => {
        metricSums[metric] = (metricSums[metric] || 0) + value;
        metricCounts[metric] = (metricCounts[metric] || 0) + 1;
      });
    });
    
    const avgMetrics: Record<string, number> = {};
    Object.keys(metricSums).forEach(metric => {
      avgMetrics[metric] = metricSums[metric] / metricCounts[metric];
    });
    
    return avgMetrics;
  }

  private calculateTotalConnections(): number {
    return this.constellations.reduce((sum, constellation) => sum + constellation.entities.length, 0);
  }

  // Event System
  on(event: string, listener: Function): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(listener);
  }

  emit(event: string, data?: any): void {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(data));
    }
  }

  // Getters
  getEntities(): UniverseEntity[] {
    return [...this.entities];
  }

  getConstellations(): UniverseConstellation[] {
    return [...this.constellations];
  }

  getFlows(): UniverseFlow[] {
    return [...this.flows];
  }

  getControls(): UniverseControls {
    return { ...this.controls };
  }

  getStats(): UniverseStats {
    return { ...this.stats };
  }

  getConfiguration(): UniverseConfiguration {
    return { ...this.config };
  }

  // Control Updates
  updateControls(updates: Partial<UniverseControls>): void {
    this.controls = { ...this.controls, ...updates };
    this.emit('controls_updated', this.controls);
  }

  // Utility
  private generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Pre-configured Domain Templates
export const DomainTemplates = {
  // Business Intelligence Template
  BusinessIntelligence: (): UniverseConfiguration => ({
    domain: 'business-intelligence',
    title: 'CEO\'s Orrery',
    description: 'Spatial business intelligence universe',
    entityTypes: {
      financial_metric: {
        name: 'Financial Metric',
        description: 'Revenue, expenses, profit metrics as cosmic entities',
        color: '#8b5cf6',
        sizeRange: [15, 40],
        orbitConfig: { speedRange: [0.003, 0.008], radiusRange: [100, 300] },
        statusOptions: ['healthy', 'warning', 'critical'],
        requiredMetrics: ['value', 'change'],
        optionalMetrics: ['target', 'forecast'],
        satelliteTypes: ['kpi', 'trend', 'alert']
      }
    },
    satelliteTypes: {
      kpi: { name: 'KPI', description: 'Key performance indicator', color: '#10b981', sizeRange: [2, 6], orbitConfig: { speedRange: [0.015, 0.025], radiusRange: [20, 40] } }
    },
    constellationTypes: {
      department: { name: 'Department', description: 'Team performance cluster', connectionColor: '#3b82f6', sizeRange: [20, 35], maxEntities: 10 }
    },
    flowTypes: {
      analysis: { name: 'Analysis Flow', description: 'Business analysis pipeline', color: '#ec4899', maxStages: 5, stageTypes: ['collect', 'analyze', 'report'] }
    },
    colorScheme: {
      primary: '#8b5cf6',
      secondary: '#3b82f6',
      accent: '#10b981',
      background: '#0f172a',
      surface: '#1e293b',
      entityColors: { financial_metric: '#8b5cf6' },
      satelliteColors: { kpi: '#10b981' },
      statusColors: { healthy: '#10b981', warning: '#f59e0b', critical: '#ef4444' }
    },
    defaultControls: { viewMode: 'universe', showMetrics: true },
    canvasConfig: { width: 800, height: 600, backgroundEffects: true, particleEffects: true, glowEffects: true, animationFrameRate: 60 },
    integrations: []
  }),

  // Development Template
  Development: (): UniverseConfiguration => ({
    domain: 'development',
    title: 'Developer\'s Galaxy',
    description: 'Spatial development environment',
    entityTypes: {
      project: {
        name: 'Code Project',
        description: 'Development projects as celestial bodies',
        color: '#3b82f6',
        sizeRange: [15, 35],
        orbitConfig: { speedRange: [0.005, 0.012], radiusRange: [120, 280] },
        statusOptions: ['building', 'success', 'failed', 'pending'],
        requiredMetrics: ['health', 'coverage'],
        optionalMetrics: ['complexity', 'activity'],
        satelliteTypes: ['module', 'test', 'dependency']
      }
    },
    satelliteTypes: {
      module: { name: 'Module', description: 'Code module', color: '#10b981', sizeRange: [2, 5], orbitConfig: { speedRange: [0.02, 0.03], radiusRange: [25, 45] } }
    },
    constellationTypes: {
      repository: { name: 'Repository', description: 'Related projects', connectionColor: '#8b5cf6', sizeRange: [25, 40], maxEntities: 8 }
    },
    flowTypes: {
      build_pipeline: { name: 'Build Pipeline', description: 'CI/CD workflow', color: '#f59e0b', maxStages: 6, stageTypes: ['build', 'test', 'deploy'] }
    },
    colorScheme: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#10b981',
      background: '#0f172a',
      surface: '#1e293b',
      entityColors: { project: '#3b82f6' },
      satelliteColors: { module: '#10b981' },
      statusColors: { success: '#10b981', building: '#f59e0b', failed: '#ef4444', pending: '#64748b' }
    },
    defaultControls: { viewMode: 'galaxy', showSatellites: true },
    canvasConfig: { width: 800, height: 600, backgroundEffects: true, particleEffects: true, glowEffects: true, animationFrameRate: 60 },
    integrations: []
  }),

  // Communications Template
  Communications: (): UniverseConfiguration => ({
    domain: 'communications',
    title: 'Communications Universe',
    description: 'Spatial email management system',
    entityTypes: {
      email: {
        name: 'Email',
        description: 'Email communications as cosmic entities',
        color: '#8b5cf6',
        sizeRange: [15, 40],
        orbitConfig: { speedRange: [0.003, 0.009], radiusRange: [100, 250] },
        statusOptions: ['draft', 'sent', 'delivered', 'opened', 'clicked', 'bounced'],
        requiredMetrics: ['deliveryRate', 'openRate'],
        optionalMetrics: ['clickRate', 'engagementScore'],
        satelliteTypes: ['recipient', 'attachment', 'link']
      }
    },
    satelliteTypes: {
      recipient: { name: 'Recipient', description: 'Email recipient', color: '#3b82f6', sizeRange: [2, 4], orbitConfig: { speedRange: [0.015, 0.025], radiusRange: [20, 35] } }
    },
    constellationTypes: {
      audience: { name: 'Audience', description: 'Contact list', connectionColor: '#10b981', sizeRange: [20, 30], maxEntities: 15 }
    },
    flowTypes: {
      campaign: { name: 'Email Campaign', description: 'Email marketing flow', color: '#ec4899', maxStages: 4, stageTypes: ['compose', 'send', 'track'] }
    },
    colorScheme: {
      primary: '#8b5cf6',
      secondary: '#3b82f6',
      accent: '#10b981',
      background: '#0f172a',
      surface: '#1e293b',
      entityColors: { email: '#8b5cf6' },
      satelliteColors: { recipient: '#3b82f6' },
      statusColors: { delivered: '#10b981', opened: '#059669', clicked: '#065f46', bounced: '#ef4444' }
    },
    defaultControls: { viewMode: 'universe', showConnections: true },
    canvasConfig: { width: 800, height: 600, backgroundEffects: true, particleEffects: true, glowEffects: true, animationFrameRate: 60 },
    integrations: []
  })
};

export default GalaxyEngineTemplate;