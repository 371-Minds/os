/**
 * ElizaOS Plugin Registry Types
 * 
 * Type definitions for the plugin registry system
 */

/**
 * Plugin metadata structure
 */
export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  homepage?: string;
  repository?: string;
  keywords: string[];
  categories: string[];
  license: string;
  signature?: string;
  verified: boolean;
  permissions?: string[];
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  engines?: {
    node?: string;
    elizaos?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Plugin registry entry
 */
export interface PluginRegistryEntry {
  id: string;
  metadata: PluginMetadata;
  source: {
    type: 'local' | 'remote' | 'marketplace';
    uri: string;
    checksum?: string;
  };
  installation: {
    status: PluginInstallationStatus;
    path?: string;
    installedAt?: Date;
    version?: string;
  };
  enabled: boolean;
  lastUsed?: Date;
}

/**
 * Plugin discovery configuration
 */
export interface PluginDiscoveryConfig {
  sources: Array<{
    type: 'local' | 'remote' | 'marketplace';
    uri: string;
    enabled: boolean;
    priority: number;
    auth?: {
      type: 'bearer' | 'basic' | 'api-key';
      credentials: Record<string, string>;
    };
  }>;
  enableAutoDiscovery: boolean;
  discoveryInterval: number; // milliseconds
  enableHotReload: boolean;
  enableVersionCheck: boolean;
  filters?: PluginSearchFilters;
}

/**
 * Plugin search options
 */
export interface PluginSearchOptions {
  query?: string;
  filters?: PluginSearchFilters;
  sortBy: 'name' | 'downloads' | 'rating' | 'updated' | 'created';
  sortOrder: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * Plugin search filters
 */
export interface PluginSearchFilters {
  categories?: string[];
  authors?: string[];
  verified?: boolean;
  minRating?: number;
  license?: string[];
  keywords?: string[];
  dateRange?: {
    from?: Date;
    to?: Date;
  };
}

/**
 * Plugin search result
 */
export interface PluginSearchResult {
  entries: PluginRegistryEntry[];
  total: number;
  hasMore: boolean;
  nextOffset?: number;
}

/**
 * Plugin installation status
 */
export enum PluginInstallationStatus {
  NOT_INSTALLED = 'not_installed',
  INSTALLING = 'installing',
  INSTALLED = 'installed',
  UPDATING = 'updating',
  UNINSTALLING = 'uninstalling',
  FAILED = 'failed',
  CORRUPTED = 'corrupted',
}

/**
 * Plugin dependency resolution
 */
export interface PluginDependencyResolution {
  pluginId: string;
  dependencies: Array<{
    name: string;
    version: string;
    resolved: boolean;
    source?: string;
  }>;
  conflicts: Array<{
    name: string;
    conflictingVersions: string[];
    resolution?: string;
  }>;
  installOrder: string[];
}

/**
 * Plugin performance metrics
 */
export interface PluginPerformanceMetrics {
  pluginId: string;
  executionTime: {
    average: number;
    min: number;
    max: number;
    p95: number;
    p99: number;
  };
  memoryUsage: {
    current: number;
    peak: number;
    average: number;
  };
  cpuUsage: {
    current: number;
    average: number;
    peak: number;
  };
  errorRate: number;
  lastMeasurement: Date;
}

/**
 * Plugin security assessment
 */
export interface PluginSecurityAssessment {
  pluginId: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  score: number; // 0-100
  vulnerabilities: number;
  lastAssessment: Date;
  recommendations: string[];
}

/**
 * Plugin registry events
 */
export interface PluginRegistryEvents {
  'plugin:discovered': (entry: PluginRegistryEntry) => void;
  'plugin:installed': (pluginId: string) => void;
  'plugin:uninstalled': (pluginId: string) => void;
  'plugin:enabled': (pluginId: string) => void;
  'plugin:disabled': (pluginId: string) => void;
  'plugin:updated': (pluginId: string, oldVersion: string, newVersion: string) => void;
  'registry:refreshed': (count: number) => void;
  'registry:error': (error: Error) => void;
}

/**
 * Schema validators - placeholder implementations
 */
export const PluginMetadataSchema = {
  validate: (data: any): data is PluginMetadata => {
    return typeof data === 'object' && data !== null && typeof data.id === 'string';
  }
};

export const PluginRegistryEntrySchema = {
  validate: (data: any): data is PluginRegistryEntry => {
    return typeof data === 'object' && data !== null && typeof data.id === 'string';
  }
};

export const PluginDiscoveryConfigSchema = {
  validate: (data: any): data is PluginDiscoveryConfig => {
    return typeof data === 'object' && data !== null && Array.isArray(data.sources);
  }
};

export const PluginInstallationStatusSchema = {
  validate: (data: any): data is PluginInstallationStatus => {
    return Object.values(PluginInstallationStatus).includes(data);
  }
};