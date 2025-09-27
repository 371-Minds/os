import { EventEmitter } from 'eventemitter3';
import type { PluginRegistryEntry, PluginPerformanceMetrics } from './types.js';

/**
 * Plugin loader events
 */
export interface PluginLoaderEvents {
  'plugin:loading': (pluginId: string) => void;
  'plugin:loaded': (pluginId: string, plugin: any) => void;
  'plugin:unloaded': (pluginId: string) => void;
  'plugin:reloaded': (pluginId: string, plugin: any) => void;
  'plugin:error': (error: Error, pluginId: string) => void;
  'hotreload:enabled': () => void;
  'hotreload:disabled': () => void;
  'hotreload:detected': (pluginId: string, changeType: string) => void;
}

/**
 * Plugin sandbox configuration
 */
export interface PluginSandboxConfig {
  enabled: boolean;
  permissions: {
    filesystem: {
      read: string[];
      write: string[];
    };
    network: {
      allowedHosts: string[];
      allowedPorts: number[];
    };
    api: {
      allowedMethods: string[];
      rateLimits: Record<string, number>;
    };
    memory: {
      maxUsage: number; // in bytes
    };
    cpu: {
      maxUsage: number; // percentage
    };
  };
  timeout: number; // milliseconds
}

/**
 * Plugin instance wrapper
 */
export interface PluginInstance {
  id: string;
  plugin: any;
  metadata: PluginRegistryEntry['metadata'];
  sandbox?: PluginSandboxWrapper;
  loadTime: number;
  lastAccessed: Date;
  accessCount: number;
  performance: PluginPerformanceMetrics;
}

/**
 * Plugin sandbox wrapper for security isolation
 */
export class PluginSandboxWrapper {
  private config: PluginSandboxConfig;
  private startTime: number;
  private memoryUsage: number = 0;
  private cpuUsage: number = 0;

  constructor(config: PluginSandboxConfig) {
    this.config = config;
    this.startTime = Date.now();
  }

  /**
   * Execute plugin method within sandbox
   */
  async executeMethod(method: string, args: any[]): Promise<any> {
    if (!this.config.enabled) {
      throw new Error('Sandbox is disabled');
    }

    // Check API permissions
    if (!this.config.permissions.api.allowedMethods.includes(method)) {
      throw new Error(`Method '${method}' is not allowed in sandbox`);
    }

    // Check rate limits
    const rateLimit = this.config.permissions.api.rateLimits[method];
    if (rateLimit && this.accessCount > rateLimit) {
      throw new Error(`Rate limit exceeded for method '${method}'`);
    }

    // Execute with timeout
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Method '${method}' execution timeout`));
      }, this.config.timeout);

      try {
        // Execute the method (this would be the actual plugin method call)
        const result = this.executeWithResourceLimits(method, args);
        clearTimeout(timeout);
        resolve(result);
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
  }

  private executeWithResourceLimits(method: string, args: any[]): any {
    // Monitor resource usage
    const beforeMemory = process.memoryUsage().heapUsed;
    const beforeCpu = process.cpuUsage();

    try {
      // This would call the actual plugin method
      // For now, return a mock result
      const result = { method, args, timestamp: new Date() };

      // Update resource usage metrics
      const afterMemory = process.memoryUsage().heapUsed;
      const afterCpu = process.cpuUsage(beforeCpu);

      this.memoryUsage = afterMemory - beforeMemory;
      this.cpuUsage = (afterCpu.user + afterCpu.system) / 1000; // Convert to ms

      // Check resource limits
      if (this.memoryUsage > this.config.permissions.memory.maxUsage) {
        throw new Error('Memory usage limit exceeded');
      }

      if (this.cpuUsage > this.config.permissions.cpu.maxUsage) {
        throw new Error('CPU usage limit exceeded');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get current resource usage
   */
  getResourceUsage(): { memory: number; cpu: number; uptime: number } {
    return {
      memory: this.memoryUsage,
      cpu: this.cpuUsage,
      uptime: Date.now() - this.startTime,
    };
  }
}

/**
 * Dynamic Plugin Loader with Hot-Reload Capabilities
 */
export class PluginLoader extends EventEmitter<PluginLoaderEvents> {
  private loadedPlugins = new Map<string, PluginInstance>();
  private watchers = new Map<string, any>(); // File watchers for hot reload
  private hotReloadEnabled = false;
  private sandboxConfig: PluginSandboxConfig;

  constructor(sandboxConfig?: Partial<PluginSandboxConfig>) {
    super();
    
    this.sandboxConfig = {
      enabled: true,
      permissions: {
        filesystem: {
          read: ['./plugins', './data'],
          write: ['./data/plugins'],
        },
        network: {
          allowedHosts: ['localhost', '127.0.0.1'],
          allowedPorts: [3000, 8080, 9000],
        },
        api: {
          allowedMethods: ['*'],
          rateLimits: {
            'default': 100, // 100 calls per minute
          },
        },
        memory: {
          maxUsage: 100 * 1024 * 1024, // 100MB
        },
        cpu: {
          maxUsage: 80, // 80% CPU
        },
      },
      timeout: 30000, // 30 seconds
      ...sandboxConfig,
    };
  }

  /**
   * Load a plugin from registry entry
   */
  async loadPlugin(entry: PluginRegistryEntry): Promise<PluginInstance> {
    const startTime = Date.now();
    
    try {
      this.emit('plugin:loading', entry.id);
      
      // Check if plugin is already loaded
      if (this.loadedPlugins.has(entry.id)) {
        const existing = this.loadedPlugins.get(entry.id)!;
        existing.lastAccessed = new Date();
        existing.accessCount++;
        return existing;
      }

      // Load the plugin module
      const plugin = await this.loadPluginModule(entry);
      
      // Create sandbox if enabled
      const sandbox = entry.metadata.sandboxed ? new PluginSandboxWrapper(this.sandboxConfig) : undefined;
      
      // Create plugin instance
      const instance: PluginInstance = {
        id: entry.id,
        plugin,
        metadata: entry.metadata,
        sandbox,
        loadTime: Date.now() - startTime,
        lastAccessed: new Date(),
        accessCount: 1,
        performance: {
          pluginId: entry.id,
          loadTime: Date.now() - startTime,
          memoryUsage: 0,
          cpuUsage: 0,
          apiCalls: 0,
          errors: 0,
          lastSeen: new Date(),
          uptime: 0,
        },
      };

      // Store instance
      this.loadedPlugins.set(entry.id, instance);
      
      // Set up hot reload if enabled
      if (this.hotReloadEnabled) {
        this.setupHotReload(entry);
      }
      
      this.emit('plugin:loaded', entry.id, plugin);
      
      return instance;
    } catch (error) {
      this.emit('plugin:error', error as Error, entry.id);
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
      // Stop watching for hot reload
      const watcher = this.watchers.get(pluginId);
      if (watcher) {
        watcher.close();
        this.watchers.delete(pluginId);
      }

      // Call plugin cleanup if available
      if (instance.plugin.cleanup && typeof instance.plugin.cleanup === 'function') {
        await instance.plugin.cleanup();
      }

      // Remove from loaded plugins
      this.loadedPlugins.delete(pluginId);
      
      this.emit('plugin:unloaded', pluginId);
    } catch (error) {
      this.emit('plugin:error', error as Error, pluginId);
      throw error;
    }
  }

  /**
   * Reload a plugin (hot reload)
   */
  async reloadPlugin(pluginId: string): Promise<PluginInstance> {
    const instance = this.loadedPlugins.get(pluginId);
    if (!instance) {
      throw new Error(`Plugin not loaded: ${pluginId}`);
    }

    try {
      // Unload current instance
      await this.unloadPlugin(pluginId);
      
      // Create a mock registry entry for reloading
      const entry: PluginRegistryEntry = {
        id: pluginId,
        metadata: instance.metadata,
        source: 'local',
        uri: `./plugins/${pluginId}`,
        lastUpdated: new Date(),
        status: 'active',
        tags: [],
      };
      
      // Load new instance
      const newInstance = await this.loadPlugin(entry);
      
      this.emit('plugin:reloaded', pluginId, newInstance.plugin);
      
      return newInstance;
    } catch (error) {
      this.emit('plugin:error', error as Error, pluginId);
      throw error;
    }
  }

  /**
   * Get loaded plugin instance
   */
  getPlugin(pluginId: string): PluginInstance | undefined {
    const instance = this.loadedPlugins.get(pluginId);
    if (instance) {
      instance.lastAccessed = new Date();
      instance.accessCount++;
    }
    return instance;
  }

  /**
   * List all loaded plugins
   */
  getLoadedPlugins(): PluginInstance[] {
    return Array.from(this.loadedPlugins.values());
  }

  /**
   * Execute plugin method safely
   */
  async executePluginMethod(pluginId: string, method: string, args: any[] = []): Promise<any> {
    const instance = this.getPlugin(pluginId);
    if (!instance) {
      throw new Error(`Plugin not loaded: ${pluginId}`);
    }

    try {
      instance.performance.apiCalls++;
      instance.performance.lastSeen = new Date();

      // Execute through sandbox if available
      if (instance.sandbox) {
        return await instance.sandbox.executeMethod(method, args);
      }

      // Direct execution
      if (!instance.plugin[method] || typeof instance.plugin[method] !== 'function') {
        throw new Error(`Method '${method}' not found in plugin ${pluginId}`);
      }

      return await instance.plugin[method](...args);
    } catch (error) {
      instance.performance.errors++;
      this.emit('plugin:error', error as Error, pluginId);
      throw error;
    }
  }

  /**
   * Enable hot reload
   */
  enableHotReload(): void {
    this.hotReloadEnabled = true;
    
    // Set up watchers for all loaded plugins
    for (const [pluginId, instance] of this.loadedPlugins) {
      this.setupHotReload({
        id: pluginId,
        metadata: instance.metadata,
        source: 'local',
        uri: `./plugins/${pluginId}`,
        lastUpdated: new Date(),
        status: 'active',
        tags: [],
      });
    }
    
    this.emit('hotreload:enabled');
  }

  /**
   * Disable hot reload
   */
  disableHotReload(): void {
    this.hotReloadEnabled = false;
    
    // Close all watchers
    for (const [pluginId, watcher] of this.watchers) {
      watcher.close();
    }
    this.watchers.clear();
    
    this.emit('hotreload:disabled');
  }

  /**
   * Get plugin performance metrics
   */
  getPluginPerformance(pluginId: string): PluginPerformanceMetrics | undefined {
    const instance = this.loadedPlugins.get(pluginId);
    if (!instance) return undefined;

    // Update uptime
    instance.performance.uptime = Date.now() - (instance.performance.lastSeen.getTime() - instance.performance.uptime);
    
    // Update resource usage from sandbox
    if (instance.sandbox) {
      const usage = instance.sandbox.getResourceUsage();
      instance.performance.memoryUsage = usage.memory;
      instance.performance.cpuUsage = usage.cpu;
    }

    return instance.performance;
  }

  /**
   * Cleanup and destroy loader
   */
  destroy(): void {
    // Unload all plugins
    for (const pluginId of this.loadedPlugins.keys()) {
      this.unloadPlugin(pluginId).catch(console.warn);
    }
    
    // Disable hot reload
    this.disableHotReload();
    
    // Remove all listeners
    this.removeAllListeners();
  }

  // Private methods

  private async loadPluginModule(entry: PluginRegistryEntry): Promise<any> {
    // This would implement the actual module loading based on entry.source and entry.uri
    // For now, return a mock plugin
    return {
      name: entry.metadata.name,
      version: entry.metadata.version,
      init: () => console.log(`Initializing plugin ${entry.metadata.name}`),
      execute: (action: string) => console.log(`Executing action: ${action}`),
      cleanup: () => console.log(`Cleaning up plugin ${entry.metadata.name}`),
    };
  }

  private setupHotReload(entry: PluginRegistryEntry): void {
    if (entry.source !== 'local') return; // Only support hot reload for local plugins

    try {
      // Mock file watcher - in a real implementation, this would use fs.watch or chokidar
      const watcher = {
        close: () => {
          console.log(`Stopped watching ${entry.id} for changes`);
        }
      };

      this.watchers.set(entry.id, watcher);
      
      // Simulate file change detection
      // In real implementation, this would detect actual file changes
      console.log(`Started watching ${entry.id} for hot reload`);
    } catch (error) {
      console.warn(`Failed to set up hot reload for ${entry.id}:`, error);
    }
  }

  private onFileChanged(pluginId: string, changeType: string): void {
    this.emit('hotreload:detected', pluginId, changeType);
    
    // Auto-reload if enabled
    if (this.hotReloadEnabled) {
      this.reloadPlugin(pluginId).catch(error => {
        console.warn(`Failed to hot reload plugin ${pluginId}:`, error);
      });
    }
  }
}