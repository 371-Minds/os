/**
 * Ping Agent - Network Connectivity Testing Utility
 * 
 * A standardized Nexe-compatible agent that demonstrates the 371 OS
 * agent blueprint pattern. This agent tests network connectivity by
 * pinging specified hosts and reporting latency and availability.
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { createLogger, format, transports, Logger } from 'winston';
import type {
  AgentBlueprintConfig,
  AgentExecutionContext,
  AgentExecutionResult,
  NexeCompatibleAgent
} from './types.js';

const execAsync = promisify(exec);

interface PingParams {
  target: string;
  count: number;
  timeout: number;
  json: boolean;
  help?: boolean;
}

interface PingResult {
  target: string;
  success: boolean;
  packets_sent: number;
  packets_received: number;
  packet_loss_percent: number;
  min_latency_ms?: number;
  max_latency_ms?: number;
  avg_latency_ms?: number;
  error?: string;
  timestamp: Date;
}

/**
 * Ping Agent Configuration embedded in the binary
 */
const EMBEDDED_CONFIG: AgentBlueprintConfig = {
  agent_id: 'ping-agent-v1',
  agent_name: 'Network Ping Agent',
  agent_version: '1.0.0',
  agent_type: 'UTILITY',
  core_instructions: 'Test network connectivity by pinging specified hosts and report latency metrics',
  description: 'A utility agent that performs network ping operations and reports connectivity status',
  functionality: [
    'Network host reachability testing',
    'Latency measurement and reporting',
    'Connection status monitoring',
    'Multiple target support',
    'JSON and text output formats'
  ],
  execution_config: {
    entry_point: 'src/index.ts',
    binary_name: 'ping-agent.exe',
    supported_platforms: ['win-x64', 'linux-x64', 'mac-x64'],
    resource_requirements: {
      min_memory_mb: 32,
      max_cpu_percent: 10,
      disk_space_mb: 1
    }
  },
  dependencies: {
    elizaos_core_version: '^1.5.2',
    external_dependencies: [
      {
        name: 'winston',
        version: '^3.10.0',
        type: 'bundled',
        nexe_compatible: true
      }
    ],
    bundled_assets: []
  },
  configuration: {
    embedded_config: {
      'default_timeout': 5000,
      'default_count': 4,
      'max_targets': 10
    },
    environment_variables: ['PING_TIMEOUT', 'PING_COUNT', 'LOG_LEVEL'],
    runtime_parameters: [
      {
        name: 'target',
        type: 'string',
        required: true,
        description: 'Target host to ping (IP address or hostname)'
      },
      {
        name: 'count',
        type: 'number',
        required: false,
        default_value: 4,
        description: 'Number of ping packets to send',
        validation: '^[1-9]\\d*$'
      },
      {
        name: 'timeout',
        type: 'number',
        required: false,
        default_value: 5000,
        description: 'Timeout in milliseconds',
        validation: '^[1-9]\\d*$'
      },
      {
        name: 'json',
        type: 'boolean',
        required: false,
        default_value: false,
        description: 'Output results in JSON format'
      }
    ]
  }
};

/**
 * Network Ping Agent Implementation
 */
export class PingAgent implements NexeCompatibleAgent {
  private logger: Logger;
  private config!: AgentBlueprintConfig;
  private context!: AgentExecutionContext;
  private isInitialized = false;

  constructor() {
    // Initialize logger with console transport for standalone execution
    this.logger = createLogger({
      level: process.env['LOG_LEVEL'] || 'info',
      format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : '';
          return `${timestamp} [${level.toUpperCase()}] ${message} ${metaStr}`;
        })
      ),
      transports: [
        new transports.Console({
          format: format.simple()
        })
      ]
    });
  }

  async initialize(config: AgentBlueprintConfig, context: AgentExecutionContext): Promise<void> {
    try {
      this.config = config;
      this.context = context;
      
      this.logger.info(`🚀 Initializing ${config.agent_name} v${config.agent_version}`);
      this.logger.info(`📍 Agent ID: ${config.agent_id}`);
      this.logger.info(`⚡ Execution ID: ${context.execution_id}`);
      
      const validation = this.validateConfiguration();
      if (!validation.valid) {
        throw new Error(`Configuration validation failed: ${validation.errors.join(', ')}`);
      }
      
      this.isInitialized = true;
      this.logger.info('✅ Agent initialization completed successfully');
      
    } catch (error) {
      this.logger.error('❌ Agent initialization failed:', error);
      throw error;
    }
  }

  async execute(args: string[]): Promise<AgentExecutionResult> {
    const startTime = Date.now();
    
    try {
      if (!this.isInitialized) {
        throw new Error('Agent not initialized. Call initialize() first.');
      }

      this.logger.info(`🎯 Starting ping execution with args: ${args.join(' ')}`);
      
      const params = this.parseArguments(args);
      this.validateParameters(params);
      
      const pingParams: PingParams = {
        target: params.target!,
        count: params.count!,
        timeout: params.timeout!,
        json: params.json!
      };
      
      const result = await this.performPing(pingParams);
      const output = this.formatOutput(result, params.json || false);
      
      const executionTime = Date.now() - startTime;
      
      this.logger.info(`✅ Ping execution completed in ${executionTime}ms`);
      
      return {
        success: true,
        exit_code: 0,
        execution_time_ms: executionTime,
        output: output,
        metrics: {
          memory_used_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          cpu_time_ms: executionTime,
          network_calls: params.count || 4
        }
      };
      
    } catch (error) {
      const executionTime = Date.now() - startTime;
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      this.logger.error(`❌ Ping execution failed: ${errorMessage}`);
      
      return {
        success: false,
        exit_code: 1,
        execution_time_ms: executionTime,
        output: '',
        error: errorMessage,
        metrics: {
          memory_used_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          cpu_time_ms: executionTime,
          network_calls: 0
        }
      };
    }
  }

  private parseArguments(args: string[]): Partial<PingParams> & { help?: boolean } {
    const params: Partial<PingParams> & { help?: boolean } = {};
    
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      
      if (arg === '--target' || arg === '-t') {
        params.target = args[++i];
      } else if (arg === '--count' || arg === '-c') {
        params.count = parseInt(args[++i], 10);
      } else if (arg === '--timeout' || arg === '-w') {
        params.timeout = parseInt(args[++i], 10);
      } else if (arg === '--json' || arg === '-j') {
        params.json = true;
      } else if (arg === '--help' || arg === '-h') {
        params.help = true;
      } else if (!arg.startsWith('-') && !params.target) {
        params.target = arg;
      }
    }
    
    const embeddedConfig = this.config?.configuration?.embedded_config || {};
    params.count = params.count || embeddedConfig['default_count'] || 4;
    params.timeout = params.timeout || embeddedConfig['default_timeout'] || 5000;
    params.json = params.json || false;
    
    return params;
  }

  private validateParameters(params: Partial<PingParams> & { help?: boolean }): asserts params is PingParams & { help?: boolean } {
    if (params.help) {
      throw new Error(this.getUsageHelp());
    }
    
    if (!params.target) {
      throw new Error('Target host is required. Use --target <host> or provide host as first argument.');
    }
    
    if (params.count && (params.count < 1 || params.count > 100)) {
      throw new Error('Count must be between 1 and 100');
    }
    
    if (params.timeout && (params.timeout < 100 || params.timeout > 30000)) {
      throw new Error('Timeout must be between 100ms and 30000ms');
    }
  }

  private async performPing(params: PingParams): Promise<PingResult> {
    const { target, count, timeout } = params;
    
    this.logger.info(`🏓 Pinging ${target} with ${count} packets (timeout: ${timeout}ms)`);
    
    try {
      const isWindows = process.platform === 'win32';
      const pingCommand = isWindows 
        ? `ping -n ${count} -w ${timeout} ${target}`
        : `ping -c ${count} -W ${Math.floor(timeout / 1000)} ${target}`;
      
      this.logger.debug(`Executing command: ${pingCommand}`);
      
      const { stdout, stderr } = await execAsync(pingCommand);
      
      if (stderr && stderr.trim()) {
        this.logger.warn(`Ping command stderr: ${stderr}`);
      }
      
      return this.parsePingOutput(target, stdout, count);
      
    } catch (error) {
      this.logger.error(`Ping command failed for ${target}:`, error);
      
      return {
        target,
        success: false,
        packets_sent: count,
        packets_received: 0,
        packet_loss_percent: 100,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date()
      };
    }
  }

  private parsePingOutput(target: string, output: string, expectedCount: number): PingResult {
    const isWindows = process.platform === 'win32';
    let packetsReceived = 0;
    let minLatency: number | undefined;
    let maxLatency: number | undefined;
    let avgLatency: number | undefined;
    
    if (isWindows) {
      const lossMatch = output.match(/\((\d+)% loss\)/);
      const packetLoss = lossMatch ? parseInt(lossMatch[1], 10) : 100;
      packetsReceived = Math.round(expectedCount * (100 - packetLoss) / 100);
      
      const latencyMatches = output.match(/time[<=](\d+)ms/g) || [];
      if (latencyMatches.length > 0) {
        const latencies = latencyMatches.map(match => {
          const timeMatch = match.match(/(\d+)ms/);
          return timeMatch ? parseInt(timeMatch[1], 10) : 0;
        });
        
        minLatency = Math.min(...latencies);
        maxLatency = Math.max(...latencies);
        avgLatency = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
      }
    } else {
      const statsMatch = output.match(/(\d+) packets transmitted, (\d+) (?:packets )?received/);
      if (statsMatch) {
        packetsReceived = parseInt(statsMatch[2], 10);
      }
      
      const timeMatch = output.match(/min\/avg\/max\/[\w]+ = ([\d.]+)\/([\d.]+)\/([\d.]+)/);
      if (timeMatch) {
        minLatency = Math.round(parseFloat(timeMatch[1]));
        avgLatency = Math.round(parseFloat(timeMatch[2]));
        maxLatency = Math.round(parseFloat(timeMatch[3]));
      }
    }
    
    const packetLoss = Math.round(((expectedCount - packetsReceived) / expectedCount) * 100);
    const success = packetsReceived > 0;
    
    return {
      target,
      success,
      packets_sent: expectedCount,
      packets_received: packetsReceived,
      packet_loss_percent: packetLoss,
      min_latency_ms: minLatency,
      max_latency_ms: maxLatency,
      avg_latency_ms: avgLatency,
      timestamp: new Date()
    };
  }

  private formatOutput(result: PingResult, jsonOutput: boolean): string {
    if (jsonOutput) {
      return JSON.stringify(result, null, 2);
    }
    
    let output = `\n🏓 Ping Results for ${result.target}\n`;
    output += `==========================================\n`;
    output += `Status: ${result.success ? '✅ SUCCESS' : '❌ FAILED'}\n`;
    output += `Packets: ${result.packets_received}/${result.packets_sent} received`;
    output += ` (${result.packet_loss_percent}% loss)\n`;
    
    if (result.success && result.avg_latency_ms !== undefined) {
      output += `Latency: min=${result.min_latency_ms}ms`;
      output += `, avg=${result.avg_latency_ms}ms`;
      output += `, max=${result.max_latency_ms}ms\n`;
    }
    
    if (result.error) {
      output += `Error: ${result.error}\n`;
    }
    
    output += `Timestamp: ${result.timestamp.toISOString()}\n`;
    
    return output;
  }

  private getUsageHelp(): string {
    return `
🏓 ${this.config?.agent_name || 'Ping Agent'} v${this.config?.agent_version || '1.0.0'}

USAGE:
  ping-agent <target> [options]
  ping-agent --target <host> [options]

ARGUMENTS:
  <target>              Target host to ping (IP address or hostname)

OPTIONS:
  -t, --target <host>   Target host to ping
  -c, --count <n>       Number of ping packets to send (default: 4)
  -w, --timeout <ms>    Timeout in milliseconds (default: 5000)
  -j, --json            Output results in JSON format
  -h, --help            Show this help message

EXAMPLES:
  ping-agent google.com
  ping-agent --target 8.8.8.8 --count 10
  ping-agent --target github.com --json
  ping-agent 1.1.1.1 --timeout 3000 --count 5

EXIT CODES:
  0    Success
  1    Error or failure
    `;
  }

  private validateConfiguration(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!this.config) {
      errors.push('Configuration is required');
      return { valid: false, errors };
    }
    
    if (!this.config.agent_id) {
      errors.push('Agent ID is required');
    }
    
    if (!this.config.agent_name) {
      errors.push('Agent name is required');
    }
    
    if (!this.config.agent_version) {
      errors.push('Agent version is required');
    }
    
    return { valid: errors.length === 0, errors };
  }

  async shutdown(): Promise<void> {
    this.logger.info('🔄 Shutting down Ping Agent...');
    this.isInitialized = false;
    this.logger.info('✅ Ping Agent shutdown completed');
  }

  async healthCheck(): Promise<{ status: 'healthy' | 'degraded' | 'unhealthy'; details: string }> {
    try {
      if (!this.isInitialized) {
        return { status: 'unhealthy', details: 'Agent not initialized' };
      }
      
      const testResult = await this.performPing({ target: 'localhost', count: 1, timeout: 1000, json: false });
      
      if (testResult.success) {
        return { status: 'healthy', details: 'Agent is operational and can perform ping operations' };
      } else {
        return { status: 'degraded', details: 'Agent initialized but ping test failed' };
      }
    } catch (error) {
      return { 
        status: 'unhealthy', 
        details: `Health check failed: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
  }

  getStatus(): { agent_id: string; status: 'initializing' | 'ready' | 'executing' | 'error'; capabilities: string[]; version: string } {
    return {
      agent_id: this.config?.agent_id || 'ping-agent-v1',
      status: this.isInitialized ? 'ready' : 'initializing',
      capabilities: [
        'Network host reachability testing',
        'Latency measurement and reporting',
        'Connection status monitoring',
        'Multiple output formats (text/JSON)',
        'Cross-platform ping execution'
      ],
      version: this.config?.agent_version || '1.0.0'
    };
  }
}

async function main() {
  const agent = new PingAgent();
  
  try {
    const context: AgentExecutionContext = {
      agent_id: EMBEDDED_CONFIG.agent_id,
      execution_id: `exec-${Date.now()}`,
      start_time: new Date(),
      command_args: process.argv.slice(2),
      environment: process.env as Record<string, string>,
      working_directory: process.cwd()
    };
    
    await agent.initialize(EMBEDDED_CONFIG, context);
    const result = await agent.execute(process.argv.slice(2));
    
    if (result.output) {
      console.log(result.output);
    }
    
    if (result.error) {
      console.error(result.error);
    }
    
    await agent.shutdown();
    process.exit(result.exit_code);
    
  } catch (error) {
    console.error('❌ Agent execution failed:', error);
    await agent.shutdown();
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default PingAgent;
export { EMBEDDED_CONFIG as PingAgentConfig };
export type { PingResult };