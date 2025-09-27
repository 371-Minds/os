import { EventEmitter } from 'eventemitter3';
import type { PluginRegistryEntry, PluginDiscoveryConfig, PluginSearchOptions, PluginSearchResult, PluginDependencyResolution } from './types.js';
import { PluginInstallationStatus } from './types.js';

/**
 * Plugin Registry
 * 
 * Core registry for managing plugin discovery, installation, and lifecycle
 */
export class PluginRegistry extends EventEmitter {
  private config: PluginDiscoveryConfig;
  private entries = new Map<string, PluginRegistryEntry>();
  private dependencies = new Map<string, PluginDependencyResolution>();

  constructor(config?: Partial<PluginDiscoveryConfig>) {
    super();
    
    this.config = {
      sources: [],
      enableAutoDiscovery: true,
      discoveryInterval: 60000, // 1 minute
      enableHotReload: false,
      enableVersionCheck: true,
      ...config,
    };
  }

  /**
   * Search for plugins in the registry
   */
  async searchPlugins(options: PluginSearchOptions): Promise<PluginSearchResult> {
    const entries = Array.from(this.entries.values());
    
    // Apply filters and sorting
    let filtered = entries;
    
    if (options.query) {
      const query = options.query.toLowerCase();
      filtered = filtered.filter(entry => 
        entry.metadata.name.toLowerCase().includes(query) ||
        entry.metadata.description.toLowerCase().includes(query) ||
        entry.metadata.keywords.some(k => k.toLowerCase().includes(query))
      );
    }

    // Apply additional filters
    if (options.filters) {
      if (options.filters.categories) {
        filtered = filtered.filter(entry =>
          options.filters!.categories!.some(cat =>
            entry.metadata.categories.includes(cat)
          )
        );
      }
      
      if (options.filters.verified !== undefined) {
        filtered = filtered.filter(entry => entry.metadata.verified === options.filters!.verified);
      }
    }

    // Sort results
    filtered.sort((a, b) => {
      const aValue = this.getSortValue(a, options.sortBy);
      const bValue = this.getSortValue(b, options.sortBy);
      
      if (options.sortOrder === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    // Apply pagination
    const offset = options.offset || 0;
    const limit = options.limit || 50;
    const paginatedEntries = filtered.slice(offset, offset + limit);

    return {
      entries: paginatedEntries,
      total: filtered.length,
      hasMore: offset + limit < filtered.length,
      nextOffset: offset + limit < filtered.length ? offset + limit : undefined,
    };
  }

  /**
   * Get a specific plugin by ID
   */
  getPlugin(id: string): PluginRegistryEntry | undefined {
    return this.entries.get(id);
  }

  /**
   * Install a plugin
   */
  async installPlugin(id: string): Promise<void> {
    const entry = this.entries.get(id);
    if (!entry) {
      throw new Error(`Plugin not found: ${id}`);
    }

    // Mock installation process
    entry.installation.status = PluginInstallationStatus.INSTALLING;
    this.emit('plugin:installing', id);

    // Simulate installation delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    entry.installation.status = PluginInstallationStatus.INSTALLED;
    entry.installation.installedAt = new Date();
    entry.enabled = true;

    this.emit('plugin:installed', id);
  }

  /**
   * Uninstall a plugin
   */
  async uninstallPlugin(id: string): Promise<void> {
    const entry = this.entries.get(id);
    if (!entry) {
      throw new Error(`Plugin not found: ${id}`);
    }

    entry.installation.status = PluginInstallationStatus.UNINSTALLING;
    this.emit('plugin:uninstalling', id);

    // Simulate uninstallation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    entry.installation.status = PluginInstallationStatus.NOT_INSTALLED;
    entry.installation.installedAt = undefined;
    entry.enabled = false;

    this.emit('plugin:uninstalled', id);
  }

  /**
   * Refresh the registry from all sources
   */
  async refresh(): Promise<void> {
    // Mock refresh process
    this.emit('registry:refreshing');
    
    // Simulate discovery delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    this.emit('registry:refreshed', this.entries.size);
  }

  /**
   * Destroy the registry and cleanup
   */
  destroy(): void {
    this.entries.clear();
    this.dependencies.clear();
    this.removeAllListeners();
  }

  private getSortValue(entry: PluginRegistryEntry, sortBy: string): any {
    switch (sortBy) {
      case 'name':
        return entry.metadata.name;
      case 'updated':
        return entry.metadata.updatedAt;
      case 'created':
        return entry.metadata.createdAt;
      default:
        return entry.metadata.name;
    }
  }
}