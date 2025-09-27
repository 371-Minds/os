// Import types for function signatures
import type { PluginDiscoveryConfig } from './types.js';
import type { SecurityPolicy } from './security.js';
import type { PluginSandboxConfig } from './loader.js';
import type { PerformanceConfig } from './performance.js';

// Core plugin registry components
export { PluginRegistry } from './registry.js';
export { PluginLoader, PluginSandboxWrapper } from './loader.js';
export { PluginMarketplace } from './marketplace.js';
export { PluginSecurityFramework, SecurityViolationError } from './security.js';
export { PluginPerformanceMonitor } from './performance.js';

// Type definitions
export type {
  PluginMetadata,
  PluginRegistryEntry,
  PluginDiscoveryConfig,
  PluginSearchOptions,
  PluginSearchResult,
  PluginInstallationStatus,
  PluginDependencyResolution,
  PluginPerformanceMetrics,
  PluginSecurityAssessment,
  PluginRegistryEvents,
  PluginSearchFilters,
} from './types.js';

// Plugin loader types
export type {
  PluginLoaderEvents,
  PluginSandboxConfig,
  PluginInstance,
} from './loader.js';

// Marketplace types
export type {
  BlockchainPluginEntry,
  MarketplaceEvents,
  MarketplaceConfig,
  PublishOptions,
  PurchaseOptions,
  PluginRating,
} from './marketplace.js';

// Security types
export type {
  SecurityPolicy,
  SecurityViolationType,
  ISecurityViolation,
  CodeAnalysisResult,
  SecurityEvents,
  QuarantineStatus,
  SecurityAuditLog,
} from './security.js';

// Performance types
export type {
  PerformanceAlert,
  PerformanceRecommendation,
  PerformanceBenchmark,
  PerformanceEvents,
  PerformanceConfig,
  PerformanceTrend,
  PerformanceComparison,
} from './performance.js';

// Schema validators
export {
  PluginMetadataSchema,
  PluginRegistryEntrySchema,
  PluginDiscoveryConfigSchema,
  PluginInstallationStatusSchema,
} from './types.js';

/**
 * ElizaOS Plugin Registry System
 * 
 * A comprehensive plugin management system providing:
 * - Dynamic plugin discovery and loading
 * - Blockchain-based marketplace integration
 * - Advanced security framework with sandboxing
 * - Performance monitoring and optimization
 * - Hot-reload capabilities for development
 * 
 * @example
 * ```typescript
 * import { PluginRegistry, PluginLoader, PluginSecurityFramework } from '@elizaos/plugin-registry';
 * 
 * // Initialize the registry
 * const registry = new PluginRegistry({
 *   sources: [
 *     { type: 'local', uri: './plugins', enabled: true, priority: 1 },
 *     { type: 'marketplace', uri: 'https://marketplace.371minds.com/plugins', enabled: true, priority: 2 }
 *   ],
 *   enableAutoDiscovery: true,
 *   enableHotReload: true
 * });
 * 
 * // Initialize security framework
 * const security = new PluginSecurityFramework({
 *   allowUnsignedPlugins: false,
 *   enableSandbox: true,
 *   sandboxMode: 'strict'
 * });
 * 
 * // Initialize plugin loader
 * const loader = new PluginLoader({
 *   enabled: true,
 *   permissions: {
 *     filesystem: { read: ['./data'], write: ['./data/plugins'] },
 *     network: { allowedHosts: ['localhost'], allowedPorts: [3000, 8080] }
 *   }
 * });
 * 
 * // Search and install plugins
 * const searchResult = await registry.searchPlugins({
 *   filters: { verified: true, minRating: 4.0 },
 *   sortBy: 'rating',
 *   sortOrder: 'desc'
 * });
 * 
 * for (const plugin of searchResult.entries) {
 *   // Validate security
 *   const isSecure = await security.validatePlugin(plugin);
 *   if (isSecure) {
 *     // Install and load
 *     await registry.installPlugin(plugin.id);
 *     await loader.loadPlugin(plugin);
 *   }
 * }
 * ```
 */
export const PLUGIN_REGISTRY_VERSION = '0.1.0';

/**
 * Create a complete plugin management system with all components
 */
export function createPluginSystem(config?: {
  registry?: Partial<PluginDiscoveryConfig>;
  security?: Partial<SecurityPolicy>;
  loader?: Partial<PluginSandboxConfig>;
  performance?: Partial<PerformanceConfig>;
}) {
  const registry = new PluginRegistry(config?.registry);
  const security = new PluginSecurityFramework(config?.security);
  const loader = new PluginLoader(config?.loader);
  const performance = new PluginPerformanceMonitor(config?.performance);

  return {
    registry,
    security,
    loader,
    performance,
    
    /**
     * Safely discover, validate, and load a plugin
     */
    async safeLoadPlugin(pluginId: string) {
      try {
        // Get plugin from registry
        const plugin = registry.getPlugin(pluginId);
        if (!plugin) {
          throw new Error(`Plugin not found: ${pluginId}`);
        }

        // Validate security
        const isSecure = await security.validatePlugin(plugin);
        if (!isSecure) {
          throw new Error(`Plugin failed security validation: ${pluginId}`);
        }

        // Load plugin
        const instance = await loader.loadPlugin(plugin);
        
        // Start performance monitoring
        performance.startMonitoring(pluginId);

        return instance;
      } catch (error) {
        console.error(`Failed to safely load plugin ${pluginId}:`, error);
        throw error;
      }
    },

    /**
     * Cleanup all components
     */
    destroy() {
      registry.destroy();
      security.destroy();
      loader.destroy();
      performance.destroy();
    }
  };
}