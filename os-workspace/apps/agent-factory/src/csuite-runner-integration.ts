/**
 * C-Suite Agent Runner Integration
 * 
 * This module integrates the legacy agent-factory with the new c-suite-agent-runner
 * application, fulfilling the Agent Factory plan by enabling the factory to build
 * and package instances of the c-suite-agent-runner application.
 */

import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execAsync = promisify(exec);

export interface CSuiteRunnerInstance {
  instanceId: string;
  port: number;
  host: string;
  status: 'starting' | 'running' | 'stopping' | 'stopped' | 'error';
  roles: string[];
  startTime: Date;
  processId?: number;
}

export interface RunnerBuildOptions {
  buildTarget?: 'development' | 'production';
  outputFormat?: 'executable' | 'container' | 'package';
  deploymentTarget?: 'local' | 'akash' | 'hybrid';
  nexeOptions?: {
    enabled: boolean;
    target?: string;
    outputPath?: string;
  };
}

export interface CSuiteRunnerPackage {
  packageId: string;
  format: 'executable' | 'container' | 'package';
  size: number;
  buildTime: number;
  outputPath: string;
  metadata: {
    version: string;
    built_at: string;
    build_target: string;
    includes_roles: string[];
  };
}

/**
 * C-Suite Agent Runner Factory Integration
 * 
 * This class transforms the agent-factory into a true "factory" that builds
 * and packages instances of the c-suite-agent-runner application.
 */
export class CSuiteRunnerFactory {
  private runningInstances = new Map<string, CSuiteRunnerInstance>();
  private builtPackages = new Map<string, CSuiteRunnerPackage>();
  private basePort = 4000;
  private workspaceRoot: string;

  constructor(workspaceRoot = process.cwd()) {
    this.workspaceRoot = workspaceRoot;
    console.log('[CSuiteRunnerFactory] Initialized - Ready to build c-suite-agent-runner instances');
  }

  /**
   * Build a c-suite-agent-runner package
   * 
   * This is the core "factory" functionality - building distributable
   * instances of the c-suite-agent-runner application.
   */
  async buildRunnerPackage(options: RunnerBuildOptions = {}): Promise<CSuiteRunnerPackage> {
    const buildStartTime = Date.now();
    const packageId = `csuite-runner-${Date.now()}`;
    
    console.log(`🏭 Building C-Suite Agent Runner package: ${packageId}`);
    
    try {
      // Build the c-suite-agent-runner application
      const buildTarget = options.buildTarget || 'production';
      const buildCommand = `bun nx build c-suite-agent-runner:${buildTarget}`;
      
      console.log(`⚡ Executing build: ${buildCommand}`);
      const { stdout, stderr } = await execAsync(buildCommand, {
        cwd: this.workspaceRoot
      });
      
      if (stderr && !stderr.includes('warning')) {
        throw new Error(`Build failed: ${stderr}`);
      }
      
      const outputPath = path.join(this.workspaceRoot, 'dist', 'apps', 'c-suite-agent-runner');
      
      // Get package information
      const packageStats = await this.getPackageStats(outputPath);
      const buildTime = Date.now() - buildStartTime;
      
      // Create package metadata
      const packageInfo: CSuiteRunnerPackage = {
        packageId,
        format: options.outputFormat || 'package',
        size: packageStats.size,
        buildTime,
        outputPath,
        metadata: {
          version: '1.0.0',
          built_at: new Date().toISOString(),
          build_target: buildTarget,
          includes_roles: ['CEO', 'CTO', 'CFO', 'CLO']
        }
      };
      
      // Handle different output formats
      if (options.outputFormat === 'executable' && options.nexeOptions?.enabled) {
        await this.createExecutable(packageInfo, options.nexeOptions);
      } else if (options.outputFormat === 'container') {
        await this.createContainerImage(packageInfo);
      }
      
      this.builtPackages.set(packageId, packageInfo);
      
      console.log(`✅ Package built successfully: ${packageId}`);
      console.log(`📦 Size: ${Math.round(packageInfo.size / 1024 / 1024 * 100) / 100}MB`);
      console.log(`⏱️ Build time: ${buildTime}ms`);
      
      return packageInfo;
      
    } catch (error) {
      console.error(`❌ Failed to build package ${packageId}:`, error);
      throw error;
    }
  }

  /**
   * Start a c-suite-agent-runner instance
   * 
   * Factory can now produce running instances of the c-suite-agent-runner
   */
  async startRunnerInstance(packageId?: string, roles: string[] = ['CEO', 'CTO', 'CFO', 'CLO']): Promise<CSuiteRunnerInstance> {
    const instanceId = `csuite-instance-${Date.now()}`; 
    const port = this.getNextAvailablePort();
    const host = 'localhost';
    
    console.log(`🚀 Starting C-Suite Agent Runner instance: ${instanceId}`);
    
    try {
      let executablePath: string;
      
      if (packageId && this.builtPackages.has(packageId)) {
        const packageInfo = this.builtPackages.get(packageId)!;
        executablePath = packageInfo.outputPath;
      } else {
        // Use development serve mode
        executablePath = 'bun nx serve c-suite-agent-runner';
      }
      
      const instance: CSuiteRunnerInstance = {
        instanceId,
        port,
        host,
        status: 'starting',
        roles,
        startTime: new Date()
      };
      
      // Start the process
      if (packageId) {
        // Run built package
        const process = spawn('node', [path.join(executablePath, 'main.js')], {
          env: { ...process.env, PORT: port.toString(), HOST: host },
          detached: false
        });
        
        instance.processId = process.pid;
        
        process.stdout?.on('data', (data) => {
          console.log(`[${instanceId}] ${data.toString().trim()}`);
        });
        
        process.stderr?.on('data', (data) => {
          console.error(`[${instanceId}] ERROR: ${data.toString().trim()}`);
          instance.status = 'error';
        });
        
        process.on('exit', (code) => {
          console.log(`[${instanceId}] Process exited with code ${code}`);
          instance.status = 'stopped';
        });
        
      } else {
        // Development mode - use Nx serve
        const { stdout } = await execAsync(`PORT=${port} HOST=${host} bun nx serve c-suite-agent-runner`, {
          cwd: this.workspaceRoot
        });
        console.log(`[${instanceId}] Started in development mode`);
      }
      
      // Wait for startup and health check
      await this.waitForInstanceReady(instance);
      
      instance.status = 'running';
      this.runningInstances.set(instanceId, instance);
      
      console.log(`✅ Instance started: ${instanceId} at http://${host}:${port}`);
      
      return instance;
      
    } catch (error) {
      console.error(`❌ Failed to start instance ${instanceId}:`, error);
      throw error;
    }
  }

  /**
   * Stop a running instance
   */
  async stopRunnerInstance(instanceId: string): Promise<boolean> {
    const instance = this.runningInstances.get(instanceId);
    if (!instance) {
      return false;
    }
    
    try {
      instance.status = 'stopping';
      
      if (instance.processId) {
        process.kill(instance.processId, 'SIGTERM');
      }
      
      instance.status = 'stopped';
      this.runningInstances.delete(instanceId);
      
      console.log(`🔄 Instance stopped: ${instanceId}`);
      return true;
      
    } catch (error) {
      console.error(`❌ Error stopping instance ${instanceId}:`, error);
      instance.status = 'error';
      return false;
    }
  }

  /**
   * Get all running instances
   */
  getRunningInstances(): CSuiteRunnerInstance[] {
    return Array.from(this.runningInstances.values());
  }

  /**
   * Get all built packages
   */
  getBuiltPackages(): CSuiteRunnerPackage[] {
    return Array.from(this.builtPackages.values());
  }

  /**
   * Get factory statistics
   */
  getFactoryStats() {
    const runningCount = this.runningInstances.size;
    const packageCount = this.builtPackages.size;
    const totalBuildTime = Array.from(this.builtPackages.values())
      .reduce((acc, pkg) => acc + pkg.buildTime, 0);
    
    return {
      running_instances: runningCount,
      built_packages: packageCount,
      total_build_time_ms: totalBuildTime,
      average_build_time_ms: packageCount > 0 ? totalBuildTime / packageCount : 0,
      factory_uptime_ms: Date.now() - this.getEarliestStartTime(),
      next_available_port: this.getNextAvailablePort()
    };
  }

  /**
   * Shutdown all instances and cleanup
   */
  async shutdown(): Promise<void> {
    console.log('🔄 Shutting down C-Suite Runner Factory...');
    
    const stopPromises = Array.from(this.runningInstances.keys()).map(
      instanceId => this.stopRunnerInstance(instanceId)
    );
    
    await Promise.all(stopPromises);
    
    this.runningInstances.clear();
    console.log('🎆 C-Suite Runner Factory shutdown complete');
  }

  /**
   * Private helper methods
   */
  private getNextAvailablePort(): number {
    let port = this.basePort;
    const usedPorts = Array.from(this.runningInstances.values()).map(i => i.port);
    
    while (usedPorts.includes(port)) {
      port++;
    }
    
    return port;
  }

  private async getPackageStats(outputPath: string): Promise<{ size: number; files: number }> {
    try {
      const stats = await fs.stat(outputPath);
      if (stats.isDirectory()) {
        const files = await fs.readdir(outputPath, { recursive: true });
        let totalSize = 0;
        
        for (const file of files) {
          const filePath = path.join(outputPath, file.toString());
          try {
            const fileStats = await fs.stat(filePath);
            if (fileStats.isFile()) {
              totalSize += fileStats.size;
            }
          } catch (error) {
            // Skip files that can't be read
          }
        }
        
        return { size: totalSize, files: files.length };
      } else {
        return { size: stats.size, files: 1 };
      }
    } catch (error) {
      return { size: 0, files: 0 };
    }
  }

  private async createExecutable(packageInfo: CSuiteRunnerPackage, nexeOptions: any): Promise<void> {
    console.log('📦 Creating standalone executable with Nexe...');
    // Implementation would use Nexe to create executable
    // This is a placeholder for the actual Nexe integration
  }

  private async createContainerImage(packageInfo: CSuiteRunnerPackage): Promise<void> {
    console.log('🐳 Creating container image...');
    // Implementation would create Docker container
    // This is a placeholder for the actual Docker integration
  }

  private async waitForInstanceReady(instance: CSuiteRunnerInstance): Promise<void> {
    // Simple delay for startup - in production would do proper health checks
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  private getEarliestStartTime(): number {
    const instances = Array.from(this.runningInstances.values());
    if (instances.length === 0) return Date.now();
    
    return Math.min(...instances.map(i => i.startTime.getTime()));
  }
}