# Ping Agent - Nexe-Compatible Network Utility

## Overview

The Ping Agent is a demonstration of the 371 OS standardized agent blueprint, designed to be compiled into a standalone executable using Nexe. This agent performs network connectivity testing by pinging specified hosts and reporting latency metrics.

## Features

🏓 **Network Connectivity Testing**
- Test reachability of any host (IP address or hostname)
- Measure network latency with min/avg/max statistics
- Cross-platform support (Windows, Linux, macOS)

📊 **Multiple Output Formats**
- Human-readable text output with emoji indicators
- JSON format for programmatic consumption
- Detailed packet loss and latency reporting

⚡ **Nexe-Compatible Architecture**
- Standalone binary compilation support
- Embedded configuration with no external dependencies
- Minimal resource usage (32MB RAM, <10% CPU)

🛠️ **Enterprise-Ready**
- Comprehensive error handling and logging
- Health check capabilities
- Performance metrics tracking
- Command-line argument validation

## Agent Blueprint Architecture

This agent follows the 371 OS standardized agent blueprint:

### 1. **Embedded Configuration**
- All configuration is embedded in the binary
- No external configuration files required
- Environment variable support for runtime customization

### 2. **NexeCompatibleAgent Interface**
- Implements standardized lifecycle methods
- Supports initialization, execution, health checks, and shutdown
- Type-safe parameter handling

### 3. **Resource Management**
- Minimal memory footprint
- Efficient execution with detailed performance metrics
- Graceful error handling and recovery

### 4. **Cross-Platform Compatibility**
- Works on Windows, Linux, and macOS
- Platform-specific ping command handling
- Consistent output format across platforms

## Usage

### Command Line Interface

```bash
# Basic ping test
ping-agent google.com

# Advanced options
ping-agent --target 8.8.8.8 --count 10 --timeout 3000

# JSON output for automation
ping-agent github.com --json

# Help information
ping-agent --help
```

### Available Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--target` | `-t` | Target host to ping | Required |
| `--count` | `-c` | Number of ping packets | 4 |
| `--timeout` | `-w` | Timeout in milliseconds | 5000 |
| `--json` | `-j` | Output in JSON format | false |
| `--help` | `-h` | Show help message | - |

### Exit Codes

- `0` - Success
- `1` - Error or failure

## Build Process

### Standard Build (TypeScript)

```bash
# Build the TypeScript application
bun nx build ping-agent

# Run the built application
node dist/apps/utility-agents/ping-agent/index.js google.com
```

### Nexe Packaging (Standalone Binary)

```bash
# Package into standalone executable
bun nx package ping-agent

# Run the standalone binary
./dist/bin/ping-agent.exe google.com
```

The Nexe packaging process:
1. Builds the TypeScript code with esbuild
2. Bundles all dependencies into a single JavaScript file
3. Compiles with Nexe into a platform-specific executable
4. Outputs to `dist/bin/ping-agent.exe` (Windows) or `dist/bin/ping-agent` (Unix)

## Development

### Project Structure

```
ping-agent/
├── src/
│   ├── index.ts          # Main agent implementation
│   └── types.ts          # TypeScript type definitions
├── package.json          # Package configuration
├── project.json          # Nx project configuration
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # Application-specific TypeScript config
├── tsconfig.spec.json    # Test-specific TypeScript config
└── README.md            # This file
```

### Local Development

```bash
# Install dependencies
bun install

# Run in development mode with hot reload
bun nx serve ping-agent

# Run tests
bun nx test ping-agent

# Lint and format
bun nx lint ping-agent
bunx @biomejs/biome format --write src/
```

## Technical Implementation

### Agent Blueprint Compliance

The Ping Agent implements the `NexeCompatibleAgent` interface:

```typescript
interface NexeCompatibleAgent {
  initialize(config: AgentBlueprintConfig, context: AgentExecutionContext): Promise<void>;
  execute(args: string[]): Promise<AgentExecutionResult>;
  shutdown(): Promise<void>;
  healthCheck(): Promise<{ status: 'healthy' | 'degraded' | 'unhealthy'; details: string }>;
  getStatus(): { agent_id: string; status: string; capabilities: string[]; version: string };
}
```

### Embedded Configuration

All configuration is embedded in the binary using the `EMBEDDED_CONFIG` constant:

```typescript
const EMBEDDED_CONFIG: AgentBlueprintConfig = {
  agent_id: 'ping-agent-v1',
  agent_name: 'Network Ping Agent',
  agent_version: '1.0.0',
  agent_type: 'UTILITY',
  // ... full configuration
};
```

### Platform-Specific Ping Commands

- **Windows**: `ping -n {count} -w {timeout} {target}`
- **Unix/Linux**: `ping -c {count} -W {timeout_seconds} {target}`

### Output Parsing

The agent intelligently parses ping command output across platforms:

- **Windows**: Parses `(X% loss)` pattern and `time<=Xms` latency
- **Unix/Linux**: Parses transmission statistics and `min/avg/max` timing

## Testing

### Manual Testing

```bash
# Test basic functionality
ping-agent localhost

# Test with invalid host
ping-agent invalid-host-name.local

# Test JSON output
ping-agent 8.8.8.8 --json

# Test with custom parameters
ping-agent github.com --count 2 --timeout 1000
```

### Health Check

The agent provides a built-in health check that tests basic ping functionality:

```bash
# Health check returns exit code 0 for healthy, 1 for unhealthy
ping-agent localhost --count 1
echo $?  # Should be 0 for success
```

## Integration with 371 OS

This agent serves as a blueprint for creating Nexe-compatible agents within the 371 OS ecosystem:

1. **Standardized Interface**: Implements the `NexeCompatibleAgent` interface
2. **Embedded Configuration**: No external dependencies for configuration
3. **Performance Metrics**: Tracks memory, CPU, and network usage
4. **Enterprise Logging**: Structured logging with Winston
5. **Error Handling**: Comprehensive error handling and reporting

## Future Enhancements

- [ ] Support for IPv6 ping operations
- [ ] Concurrent multi-host ping testing
- [ ] Historical latency tracking and trending
- [ ] Integration with monitoring systems
- [ ] Custom packet size configuration
- [ ] Traceroute functionality addition

## Related Documentation

- [371 OS Agent Blueprint Specification](../../../docs/agent-blueprint.md)
- [Nexe Packaging Guide](../../../docs/nexe-packaging.md)
- [Utility Agents Overview](../../../docs/utility-agents.md)
- [Testing Strategies](../../../docs/testing.md)

---

**Agent Type**: Utility  
**Packaging**: Nexe-Compatible  
**Status**: Production Ready  
**Version**: 1.0.0