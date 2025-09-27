import { EventEmitter } from 'eventemitter3';
import type { PluginRegistryEntry } from './types.js';

/**
 * Plugin loader events
 */
export interface PluginLoaderEvents {
  'plugin:loading': (pluginId: string) => void;
  'plugin:loaded': (pluginId: string, instance: PluginInstance) => void;
  'plugin:unloaded': (pluginId: string) => void;
  'plugin:error': (pluginId: string, error: Error) => void;
  'sandbox:created': (pluginId: string) => void;
  'sandbox:destroyed': (pluginId: string) => void;
}

/**
 * Plugin sandbox configuration
 */
export interface PluginSandboxConfig {
  enabled: boolean;
  strictMode: boolean;
  memoryLimit: number; // MB
  cpuLimit: number; // percentage
  timeoutMs: number;
  permissions: {
    filesystem: {
      read: string[];
      write: string[];
    };
    network: {
      allowedHosts: string[];
      allowedPorts: number[];
      allowOutbound: boolean;
    };
    process: {
      allowSpawn: boolean;
      allowedCommands: string[];
    };
  };
}

/**
 * Plugin instance
 */
export interface PluginInstance {
  id: string;
  name: string;
  version: string;
  status: 'loading' | 'loaded' | 'error' | 'unloaded';
  sandbox?: PluginSandboxWrapper;
  exports: Record<string, any>;
  metadata: {
    loadTime: number;
    memoryUsage: number;
    lastActivity: Date;
  };
}

/**
 * Plugin sandbox wrapper
 */
export class PluginSandboxWrapper {
  private config: PluginSandboxConfig;
  private pluginId: string;
  private context: Record<string, any> = {};

  constructor(pluginId: string, config: PluginSandboxConfig) {
    this.pluginId = pluginId;
    this.config = config;
  }

  /**
   * Execute code in sandbox
   */
  async execute(code: string): Promise<any> {
    if (!this.config.enabled) {
      // Direct execution without sandbox
      return eval(code);
    }

    // Mock sandboxed execution
    try {
      // In a real implementation, this would use vm2 or similar
      const result = eval(code);
      return result;
    } catch (error) {
      throw new Error(`Sandbox execution failed: ${error}`);
    }
  }

  /**
   * Set context variable
   */
  setContext(key: string, value: any): void {
    this.context[key] = value;
  }

  /**
   * Get context variable
   */
  getContext(key: string): any {
    return this.context[key];
  }

  /**
   * Check if permission is allowed
   */
  hasPermission(type: string, resource: string): boolean {
    switch (type) {
      case 'filesystem:read':
        return this.config.permissions.filesystem.read.some(path => 
          resource.startsWith(path)
        );
      case 'filesystem:write':
        return this.config.permissions.filesystem.write.some(path => 
          resource.startsWith(path)
        );
      case 'network:connect':
        const [host, port] = resource.split(':');
        return this.config.permissions.network.allowedHosts.includes(host) &&
               this.config.permissions.network.allowedPorts.includes(parseInt(port));
      default:
        return false;
    }
  }

  /**
   * Destroy sandbox
   */
  destroy(): void {
    this.context = {};
  }
}

/**
 * Plugin Loader
 * 
 * Handles loading and unloading plugins with security sandboxing
 */
export class PluginLoader extends EventEmitter<PluginLoaderEvents> {
  private config: PluginSandboxConfig;
  private loadedPlugins = new Map<string, PluginInstance>();
  private sandboxes = new Map<string, PluginSandboxWrapper>();

  constructor(config?: Partial<PluginSandboxConfig>) {
    super();
    
    this.config = {
      enabled: true,
      strictMode: true,
      memoryLimit: 100, // 100MB
      cpuLimit: 80, // 80%
      timeoutMs: 30000, // 30 seconds
      permissions: {
        filesystem: {
          read: ['./plugins', './data'],
          write: ['./data/plugins']
        },
        network: {
          allowedHosts: ['localhost', '127.0.0.1'],
          allowedPorts: [3000, 8080],
          allowOutbound: false
        },
        process: {
          allowSpawn: false,
          allowedCommands: []
        }
      },
      ...config,
    };
  }

  /**
   * Load a plugin
   */
  async loadPlugin(entry: PluginRegistryEntry): Promise<PluginInstance> {
    const pluginId = entry.id;
    
    if (this.loadedPlugins.has(pluginId)) {
      throw new Error(`Plugin already loaded: ${pluginId}`);
    }

    this.emit('plugin:loading', pluginId);

    try {
      const startTime = Date.now();

      // Create sandbox
      const sandbox = new PluginSandboxWrapper(pluginId, this.config);
      this.sandboxes.set(pluginId, sandbox);
      this.emit('sandbox:created', pluginId);

      // Mock plugin loading - in production, this would load actual plugin code
      const pluginExports = {
        // Mock plugin exports
        name: entry.metadata.name,
        version: entry.metadata.version,
        init: () => console.log(`Plugin ${pluginId} initialized`),
        execute: () => console.log(`Plugin ${pluginId} executed`),
        cleanup: () => console.log(`Plugin ${pluginId} cleaned up`)
      };

      const loadTime = Date.now() - startTime;

      const instance: PluginInstance = {
        id: pluginId,
        name: entry.metadata.name,
        version: entry.metadata.version,
        status: 'loaded',
        sandbox,
        exports: pluginExports,
        metadata: {
          loadTime,
          memoryUsage: Math.random() * 50 + 10, // Mock memory usage 10-60MB
          lastActivity: new Date()
        }
      };

      this.loadedPlugins.set(pluginId, instance);
      this.emit('plugin:loaded', pluginId, instance);

      return instance;

    } catch (error) {
      this.emit('plugin:error', pluginId, error as Error);
      throw error;
    }
  }

  /**
   * Unload a plugin
   */
  async unloadPlugin(pluginId: string): Promise<void> {
    const instance = this.loadedPlugins.get(pluginId);
    if (!instance) {
      throw new Error(`Plugin not loaded: ${pluginId}`);
    }

    try {
      // Call cleanup if available
      if (instance.exports.cleanup) {
        await instance.exports.cleanup();
      }

      // Destroy sandbox
      const sandbox = this.sandboxes.get(pluginId);
      if (sandbox) {
        sandbox.destroy();
        this.sandboxes.delete(pluginId);
        this.emit('sandbox:destroyed', pluginId);
      }

      // Update status and remove from loaded plugins
      instance.status = 'unloaded';
      this.loadedPlugins.delete(pluginId);

      this.emit('plugin:unloaded', pluginId);

    } catch (error) {
      this.emit('plugin:error', pluginId, error as Error);
      throw error;
    }
  }

  /**
   * Get loaded plugin instance
   */
  getPlugin(pluginId: string): PluginInstance | undefined {
    return this.loadedPlugins.get(pluginId);
  }

  /**
   * Get all loaded plugins
   */
  getLoadedPlugins(): PluginInstance[] {
    return Array.from(this.loadedPlugins.values());
  }

  /**
   * Check if plugin is loaded
   */
  isLoaded(pluginId: string): boolean {
    return this.loadedPlugins.has(pluginId);
  }

  /**
   * Update plugin configuration
   */
  updateConfig(newConfig: Partial<PluginSandboxConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get plugin statistics
   */
  getStatistics(): {
    totalLoaded: number;
    totalMemoryUsage: number;
    averageLoadTime: number;
  } {
    const plugins = Array.from(this.loadedPlugins.values());
    
    return {
      totalLoaded: plugins.length,
      totalMemoryUsage: plugins.reduce((sum, p) => sum + p.metadata.memoryUsage, 0),
      averageLoadTime: plugins.length > 0 
        ? plugins.reduce((sum, p) => sum + p.metadata.loadTime, 0) / plugins.length 
        : 0
    };
  }

  /**
   * Cleanup all loaded plugins
   */
  destroy(): void {
    // Unload all plugins
    const pluginIds = Array.from(this.loadedPlugins.keys());
    
    for (const pluginId of pluginIds) {
      try {
        this.unloadPlugin(pluginId);
      } catch (error) {
        console.error(`Failed to unload plugin ${pluginId}:`, error);
      }
    }

    // Clear all data
    this.loadedPlugins.clear();
    this.sandboxes.clear();
    
    this.removeAllListeners();
  }
}