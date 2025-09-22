# Testing and Debugging

<cite>
**Referenced Files in This Document**   
- [jest.config.ts](file://jest.config.ts)
- [provider.spec.ts](file://packages/elizaos-plugins/nx-workspace/src/provider.spec.ts)
- [provider.ts](file://packages/elizaos-plugins/nx-workspace/src/provider.ts)
- [types.ts](file://packages/elizaos-plugins/nx-workspace/src/types.ts)
- [elizaOS CLI Overview.md](file://elizaos/CLI Reference/elizaOS CLI Overview.md)
- [Test Command.md](file://elizaos/CLI Reference/Commands/Test Command.md)
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md)
- [Get system logs.md](file://elizaos/API Reference/Logs/Get system logs.md)
- [Get system logs (POST).md](file://elizaos/API Reference/Logs/Get system logs (POST).md)
- [elizaos-plugin-typescript-build-issues.md](file://troubleshooting/solutions/elizaos-plugin-typescript-build-issues.md) - *Updated in recent commit*
- [bun-lockfile-conflicts-windows.md](file://troubleshooting/dependency-issues/bun-lockfile-conflicts-windows.md) - *Added in recent commit*
- [README.md](file://troubleshooting/README.md) - *Updated in recent commit*
</cite>

## Update Summary
**Changes Made**   
- Added comprehensive troubleshooting infrastructure section based on new documentation
- Updated common issues and troubleshooting section with new resolution strategies
- Enhanced debugging techniques with Windows-specific guidance
- Added new section on build system and TypeScript configuration best practices
- Updated CLI testing section with new validation workflows
- Incorporated new performance benchmarks and success metrics

## Table of Contents
1. [Introduction](#introduction)
2. [Unit Testing with Jest](#unit-testing-with-jest)
3. [Integration Testing Strategies](#integration-testing-strategies)
4. [Mocking Dependencies](#mocking-dependencies)
5. [ElizaOS CLI for Testing](#elizaos-cli-for-testing)
6. [Session-Based Execution Tracing](#session-based-execution-tracing)
7. [Log Analysis and Monitoring](#log-analysis-and-monitoring)
8. [Debugging Techniques](#debugging-techniques)
9. [Performance and Load Testing](#performance-and-load-testing)
10. [Common Issues and Troubleshooting](#common-issues-and-troubleshooting)
11. [Build System and TypeScript Configuration](#build-system-and-typescript-configuration)

## Introduction
This document provides comprehensive guidance on testing and debugging plugins within the 371OS environment. It covers unit testing strategies using the Jest framework, integration testing approaches for plugins interacting with external services, debugging techniques, and performance testing methodologies. The documentation is based on analysis of the Nx Workspace Provider implementation and associated test files, which serve as a representative example of plugin development and testing patterns in the ecosystem. Recent updates incorporate a comprehensive troubleshooting infrastructure with systematic guides for TypeScript, build system, and dependency issues.

## Unit Testing with Jest

The 371OS plugin system utilizes Jest as its primary unit testing framework, configured through `jest.config.ts`. This configuration establishes the testing environment for Node.js and includes specific transformations for TypeScript files using ts-jest. The coverage directory is set to collect metrics from all TypeScript source files while excluding test files themselves.

``mermaid
flowchart TD
A["Test Execution"] --> B["Jest Configuration"]
B --> C["Node.js Environment"]
C --> D["ts-jest Transformer"]
D --> E["Source Files (*.ts)"]
E --> F["Coverage Collection"]
F --> G["Coverage Directory: ../../../coverage/packages/elizaos-plugins/nx-workspace"]
```

**Diagram sources**
- [jest.config.ts](file://packages/elizaos-plugins/nx-workspace/jest.config.ts#L1-L14)

**Section sources**
- [jest.config.ts](file://packages/elizaos-plugins/nx-workspace/jest.config.ts#L1-L14)

### Test Structure and Patterns
Unit tests for plugins follow a structured pattern using Jest's describe and it blocks to organize test suites and individual test cases. The `provider.spec.ts` file demonstrates this approach with comprehensive test coverage for the NxWorkspaceProvider class. Each method in the provider has a corresponding describe block containing multiple test cases that validate different aspects of functionality.

The tests employ mocking to isolate the unit under test from external dependencies. The Nx Workspace Provider tests mock three key external modules:
- `child_process` for command execution
- `fs-extra` for file system operations
- `fs/promises` for asynchronous file operations

This mocking strategy allows tests to verify the correct invocation of external commands and file operations without actually executing them, ensuring test reliability and speed.

``mermaid
classDiagram
class NxWorkspaceProvider {
+getDependencyGraph(focus? : string) Promise~NxDependencyGraph~
+findAffectedProjects(base : string) Promise~NxAffectedProjects~
+runTestsForAffected(base : string) Promise~NxTestResults~
+buildProject(project? : string) Promise~NxBuildResults~
+generateScaffold(options : NxGenerateOptions) Promise~boolean~
+analyzeWorkspace() Promise~WorkspaceAnalysis~
}
class Jest {
+describe(name : string, fn : Function)
+it(name : string, fn : Function)
+beforeEach(fn : Function)
+jest.mock(moduleName : string, factory : Function)
}
class MockExecSync {
+mockImplementation(fn : Function)
+mockReturnValue(value : any)
}
class MockReadFile {
+mockResolvedValue(value : any)
}
NxWorkspaceProvider --> Jest : "tested with"
Jest --> MockExecSync : "uses"
Jest --> MockReadFile : "uses"
```

**Diagram sources**
- [provider.spec.ts](file://packages/elizaos-plugins/nx-workspace/src/provider.spec.ts#L1-L329)
- [provider.ts](file://packages/elizaos-plugins/nx-workspace/src/provider.ts#L1-L365)

**Section sources**
- [provider.spec.ts](file://packages/elizaos-plugins/nx-workspace/src/provider.spec.ts#L1-L329)
- [provider.ts](file://packages/elizaos-plugins/nx-workspace/src/provider.ts#L1-L365)

### Example Test Cases
The unit tests demonstrate several important testing patterns:

1. **Positive path testing**: Verifying that methods return expected results under normal conditions
2. **Parameter validation**: Testing that methods handle optional parameters correctly
3. **Error handling**: Ensuring that methods gracefully handle and propagate errors
4. **Command construction**: Validating that external commands are constructed with correct parameters

For example, the test for `getDependencyGraph` verifies that the correct nx command is executed with the appropriate file output parameter and focus parameter when specified:

```typescript
it('should handle focus parameter', async () => {
  const mockGraph: NxDependencyGraph = {
    nodes: { 'app1': { name: 'app1', type: 'app', data: { root: 'apps/app1', projectType: 'application' } } },
    dependencies: { 'app1': [] },
    version: '1.0.0'
  };

  mockReadFile.mockResolvedValue(JSON.stringify(mockGraph));

  await provider.getDependencyGraph('app1');

  expect(mockExecSync).toHaveBeenCalledWith(
    expect.stringContaining('--focus=app1'),
    expect.any(Object)
  );
});
```

## Integration Testing Strategies

Integration testing in the 371OS environment focuses on verifying the interaction between plugins and external systems or core platform components. The Nx Workspace Provider serves as an excellent example of integration testing, as it interfaces with the Nx CLI tool, file system, and potentially other workspace tools.

### Testing External Service Interactions
The provider's integration tests validate that it correctly orchestrates interactions with external tools through command-line interfaces. This includes:

- **Command execution**: Verifying that the correct commands are executed with appropriate parameters
- **File system operations**: Testing that temporary files are created and cleaned up properly
- **Data parsing**: Ensuring that output from external tools is correctly parsed and transformed

The `findAffectedProjects` method demonstrates integration testing by verifying that multiple nx commands are executed in sequence to determine affected projects and their associated tasks:

```typescript
it('should find affected projects', async () => {
  mockExecSync
    .mockReturnValueOnce('app1\napp2\n') // affected apps
    .mockReturnValueOnce('lib1\n')        // affected libs
    .mockReturnValueOnce('task output');  // dry-run output

  const result = await provider.findAffectedProjects('main');

  expect(result.projects).toEqual(['app1', 'app2', 'lib1']);
  expect(result.tasks).toHaveLength(3);
  expect(mockExecSync).toHaveBeenCalledTimes(3);
});
```

### Simulating Agent Contexts
Integration tests can simulate agent contexts by providing mock runtime environments and configuration data. The tests for the Nx Workspace Provider implicitly simulate an agent context by:

- Providing a test workspace root path
- Mocking file system operations that would occur in a real agent environment
- Simulating command execution that would interact with the host system

This approach allows tests to verify that the plugin behaves correctly within the constraints and expectations of the agent runtime environment.

``mermaid
sequenceDiagram
participant Test as "Test Suite"
participant Provider as "NxWorkspaceProvider"
participant Exec as "execSync"
participant FS as "File System"
Test->>Provider : findAffectedProjects('main')
Provider->>Exec : nx affected : apps --base=main --plain
Exec-->>Provider : "app1\napp2\n"
Provider->>Exec : nx affected : libs --base=main --plain
Exec-->>Provider : "lib1\n"
Provider->>Exec : nx affected --target=build --base=main --dry-run
Exec-->>Provider : "task output"
Provider->>Test : {projects : ['app1','app2','lib1'], tasks : [...]}
```

**Diagram sources**
- [provider.spec.ts](file://packages/elizaos-plugins/nx-workspace/src/provider.spec.ts#L1-L329)
- [provider.ts](file://packages/elizaos-plugins/nx-workspace/src/provider.ts#L1-L365)

**Section sources**
- [provider.spec.ts](file://packages/elizaos-plugins/nx-workspace/src/provider.spec.ts#L1-L329)
- [provider.ts](file://packages/elizaos-plugins/nx-workspace/src/provider.ts#L1-L365)

## Mocking Dependencies

Effective testing in the 371OS environment requires strategic mocking of dependencies to isolate the plugin under test and ensure reliable, fast test execution.

### Module Mocking Strategy
The Nx Workspace Provider tests demonstrate a comprehensive module mocking strategy using Jest's `jest.mock()` function. This approach allows complete control over the behavior of external dependencies:

```typescript
// Mock child_process for testing
jest.mock('child_process', () => ({
  execSync: jest.fn()
}));

// Mock fs-extra
jest.mock('fs-extra', () => ({
  ensureDir: jest.fn().mockResolvedValue(undefined),
  unlink: jest.fn().mockResolvedValue(undefined)
}));

// Mock fs/promises
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    unlink: jest.fn().mockResolvedValue(undefined)
  }
}));
```

This strategy provides several benefits:
- **Complete isolation**: The plugin is tested without relying on actual system commands or file operations
- **Deterministic behavior**: Mocks return predictable values, ensuring consistent test results
- **Error simulation**: Mocks can be configured to throw errors to test error handling paths
- **Performance**: Tests execute quickly without actual I/O operations

### Mock Implementation Patterns
The tests employ several mock implementation patterns to cover different scenarios:

1. **Return value mocking**: Using `mockReturnValue()` to specify what a mocked function should return
2. **Implementation mocking**: Using `mockImplementation()` to define custom behavior for mocked functions
3. **Promise resolution**: Using `mockResolvedValue()` for asynchronous functions to simulate successful promise resolution
4. **Spying on methods**: Using `jest.spyOn()` to monitor calls to specific methods while preserving their original implementation

The `runTestsForAffected` tests demonstrate the use of spies to monitor calls to other methods within the same class:

```typescript
it('should run tests successfully', async () => {
  // Mock findAffectedProjects
  jest.spyOn(provider, 'findAffectedProjects').mockResolvedValue({
    projects: ['app1', 'lib1'],
    tasks: []
  });

  mockExecSync.mockReturnValue('Tests passed');

  const result = await provider.runTestsForAffected('main');

  expect(result.success).toBe(true);
  expect(Object.keys(result.projects)).toHaveLength(2);
});
```

## ElizaOS CLI for Testing

The ElizaOS Command Line Interface (CLI) provides comprehensive tools for testing plugins and agents within the 371OS environment. The CLI offers a standardized interface for executing tests across different projects and plugins.

### Test Command Overview
The `elizaos test` command is the primary interface for executing tests. It supports various options to control test execution:

| Option | Description |
|--------|-------------|
| `-t, --type <type>` | Type of test to run (component, e2e, all) |
| `--port <port>` | Server port for e2e tests |
| `--name <n>` | Filter tests by name |
| `--skip-build` | Skip building before running tests |
| `--skip-type-check` | Skip TypeScript type checking for faster test runs |

The CLI supports two main categories of tests:
- **Component tests**: Unit and integration tests located in `__tests__/` directories, using Vitest framework
- **End-to-end tests**: Runtime behavior tests in `e2e/` directories, using a custom ElizaOS test runner

``mermaid
flowchart TD
A["elizaos test"] --> B{"Test Type"}
B --> C["--type component"]
B --> D["--type e2e"]
B --> E["--type all"]
C --> F["Run Vitest on __tests__/*"]
D --> G["Run E2E test runner on e2e/*"]
E --> F
E --> G
F --> H["Generate coverage reports"]
G --> H
```

**Diagram sources**
- [Test Command.md](file://elizaos/CLI Reference/Commands/Test Command.md#L1-L426)

**Section sources**
- [Test Command.md](file://elizaos/CLI Reference/Commands/Test Command.md#L1-L426)

### Test Execution Examples
The CLI provides flexible test execution options:

```bash
# Run all tests (default behavior)
elizaos test

# Run only component tests
elizaos test --type component

# Run only end-to-end tests
elizaos test --type e2e

# Test a specific plugin
elizaos test ./plugins/my-plugin

# Filter tests by name
elizaos test --name auth

# Run tests with custom port for e2e
elizaos test --type e2e --port 4000

# Skip building for faster feedback
elizaos test --skip-build

# Skip type checking
elizaos test --skip-type-check
```

### Development Workflow Integration
The CLI integrates with development workflows through commands like `dev` and `start`:

```bash
# Development mode with hot reloading
elizaos dev

# Start project in production mode
elizaos start

# Create a new project
elizaos create my-agent-project

# Manage environment variables
elizaos env edit-local
```

This integration allows developers to seamlessly move between development, testing, and production modes.

## Session-Based Execution Tracing

The Sessions API provides a powerful mechanism for tracing plugin execution and monitoring agent behavior over time. This approach offers persistent, stateful conversations with automatic timeout management and renewal capabilities.

### Session Lifecycle Management
Sessions follow a defined lifecycle that enables reliable execution tracing:

1. **Creation**: Initialize a session with configurable timeout policies
2. **Active**: Send and receive messages within the session context
3. **Near Expiration**: Receive warnings when sessions are about to expire
4. **Renewed**: Extend session lifetime automatically or manually
5. **Expired**: Sessions that have exceeded their timeout
6. **Deleted**: Explicitly terminated sessions

``mermaid
stateDiagram-v2
[*] --> Created
Created --> Active : createSession()
Active --> NearExpiration : approaching timeout
NearExpiration --> Renewed : renewSession() or heartbeat
Renewed --> Active : extended lifetime
Active --> Expired : timeout exceeded
Expired --> Deleted : deleteSession()
Active --> Deleted : deleteSession()
Deleted --> [*]
```

**Diagram sources**
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md#L1-L799)

**Section sources**
- [Sessions API Guide.md](file://elizaos/Guides/Sessions API Guide.md#L1-L799)

### Session Configuration
Sessions support sophisticated timeout management with configurable parameters:

```typescript
interface SessionTimeoutConfig {
  timeoutMinutes?: number;           // Inactivity timeout (5-1440 minutes)
  autoRenew?: boolean;               // Auto-renew on activity (default: true)
  maxDurationMinutes?: number;       // Maximum total session duration
  warningThresholdMinutes?: number;  // When to trigger expiration warning
}
```

Configuration follows a precedence hierarchy:
1. Session-specific config (highest priority)
2. Agent-specific config
3. Global defaults

### Execution Tracing Example
The Sessions API enables detailed execution tracing through message history and session status:

```javascript
// Create session with timeout configuration
const { sessionId, expiresAt } = await createSession({ 
  agentId, 
  userId,
  timeoutConfig: {
    timeoutMinutes: 30,
    autoRenew: true,
    maxDurationMinutes: 180,
    warningThresholdMinutes: 5
  }
});

// Send messages and track session status
const messageResponse = await sendSessionMessage(sessionId, { content: 'Hello' });
if (messageResponse.sessionStatus) {
  console.log(`Session renewed: ${messageResponse.sessionStatus.wasRenewed}`);
  console.log(`Expires at: ${messageResponse.sessionStatus.expiresAt}`);
  
  if (messageResponse.sessionStatus.isNearExpiration) {
    console.warn('Session is about to expire!');
  }
}

// Retrieve message history
const { messages, hasMore, cursors } = await getSessionMessages(sessionId, { limit: 20 });
```

## Log Analysis and Monitoring

The logging system in 371OS provides comprehensive monitoring capabilities for debugging and performance analysis. The system logs API enables retrieval of logs with detailed filtering options.

### Log Retrieval Endpoints
The system provides two endpoints for retrieving logs:

**GET /api/server/logs**
- Retrieves logs using query parameters
- Supports filtering by timestamp, log level, agent name, agent ID, and limit

**POST /api/server/logs**
- Retrieves logs using request body
- Supports the same filtering parameters in JSON format

``mermaid
flowchart TD
A["Log Retrieval"] --> B{"Method"}
B --> C["GET /api/server/logs"]
B --> D["POST /api/server/logs"]
C --> E["Query Parameters"]
D --> F["JSON Request Body"]
E --> G["since: timestamp"]
E --> H["level: log level"]
E --> I["agentName: string"]
E --> J["agentId: uuid"]
E --> K["limit: integer"]
F --> G
F --> H
F --> I
F --> J
F --> K
G --> L["Filtered Logs"]
H --> L
I --> L
J --> L
K --> L
```

**Diagram sources**
- [Get system logs.md](file://elizaos/API Reference/Logs/Get system logs.md#L1-L147)
- [Get system logs (POST).md](file://elizaos/API Reference/Logs/Get system logs (POST).md#L1-L159)

**Section sources**
- [Get system logs.md](file://elizaos/API Reference/Logs/Get system logs.md#L1-L147)
- [Get system logs (POST).md](file://elizaos/API Reference/Logs/Get system logs (POST).md#L1-L159)

### Log Entry Structure
Each log entry contains detailed information for analysis:

```typescript
interface LogEntry {
  level: number;                    // Log level (1-6)
  time: number;                     // Timestamp (ms)
  msg: string;                      // Log message
  agentId: string;                  // ID of related agent
  agentName: string;                // Name of related agent
}
```

Supported log levels:
- trace (1)
- debug (2)
- info (3)
- warn (4)
- error (5)
- fatal (6)

### Log Analysis Strategies
Effective log analysis involves several strategies:

1. **Filtering by agent**: Isolate logs for specific agents to trace their execution
2. **Time-based analysis**: Use the `since` parameter to retrieve logs from specific time periods
3. **Level filtering**: Focus on specific log levels (e.g., errors only)
4. **Correlation**: Use agent IDs and names to correlate events across multiple log entries

Example log retrieval:
```bash
# Get error logs for a specific agent since a timestamp
curl "http://localhost:3000/api/server/logs?since=1700000000000&level=error&agentId=3c90c3cc-0d44-4b50-8888-8dd25736052a"

# Get recent info logs with POST
curl -X POST http://localhost:3000/api/server/logs \
  -H "Content-Type: application/json" \
  -d '{"since": 1700000000000, "level": "info", "limit": 100}'
```

## Debugging Techniques

Effective debugging in the 371OS environment combines multiple techniques to identify and resolve issues efficiently.

### Breakpoint Debugging
The ElizaOS CLI supports integration with development tools for breakpoint debugging. Developers can configure their IDEs to debug tests directly:

```json
// .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Tests",
  "runtimeExecutable": "bun",
  "runtimeArgs": ["test"],
  "cwd": "${workspaceFolder}",
  "console": "integratedTerminal"
}
```

### Runtime Inspection
Runtime inspection can be performed through several mechanisms:

1. **Session status monitoring**: Track session expiration, renewal, and time remaining
2. **System health checks**: Monitor active sessions and service status
3. **Environment variable inspection**: Verify configuration settings

```javascript
// Check session status
const sessionInfo = await fetch(`/api/messaging/sessions/${sessionId}`);
const info = await sessionInfo.json();
console.log(`Time remaining: ${Math.floor(info.timeRemaining / 60000)} minutes`);
console.log(`Near expiration: ${info.isNearExpiration}`);
```

### Error Handling Analysis
The system provides specific error classes for better error handling:

| Status Code | Error Type | Description |
|-----------|-----------|-------------|
| 404 | Session not found | Session ID does not exist |
| 410 | Session expired | Session has exceeded its timeout |
| 400 | Validation error | Invalid request parameters |
| 422 | Cannot renew | Maximum duration reached |

```javascript
try {
  const response = await fetch(`/api/messaging/sessions/${sessionId}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content: message })
  });

  if (!response.ok) {
    const error = await response.json();
    
    switch (response.status) {
      case 404:
        console.error('Session not found:', error.details);
        break;
      case 410:
        console.error('Session expired at:', error.details.expiresAt);
        break;
      case 400:
        console.error('Validation error:', error.error);
        break;
      case 422:
        console.error('Max duration reached:', error.details);
        break;
    }
  }
} catch (error) {
  console.error('Network error:', error);
}
```

## Performance and Load Testing

Performance testing in the 371OS environment focuses on evaluating plugin behavior under various load conditions and identifying potential bottlenecks.

### Performance Testing Methodologies
The framework supports several performance testing approaches:

1. **Component performance testing**: Measuring execution time of individual methods
2. **Integration performance testing**: Evaluating end-to-end workflow performance
3. **Load simulation**: Testing system behavior under high concurrency

The Nx Workspace Provider includes performance considerations in its implementation, such as:
- Efficient command execution with proper error handling
- Temporary file management to prevent resource leaks
- Structured data parsing for dependency graphs

### Load Simulation Practices
Load simulation can be achieved through:

1. **Concurrent session testing**: Creating multiple sessions simultaneously
2. **High-frequency message sending**: Simulating rapid user interactions
3. **Large payload testing**: Sending messages with substantial content

Example load test pattern:
```javascript
// Simulate multiple concurrent users
const simulateLoad = async (userCount, messagesPerUser) => {
  const sessions = [];
  
  // Create sessions for each user
  for (let i = 0; i < userCount; i++) {
    const { sessionId } = await createSession({ 
      agentId, 
      userId: `user-${i}`,
      timeoutConfig: { timeoutMinutes: 60 }
    });
    sessions.push(sessionId);
  }
  
  // Send messages from each user
  const sendPromises = sessions.map(async (sessionId, index) => {
    for (let j = 0; j < messagesPerUser; j++) {
      await sendSessionMessage(sessionId, { 
        content: `Message ${j} from user ${index}` 
      });
      // Brief delay to simulate human interaction
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  });
  
  await Promise.all(sendPromises);
  
  // Clean up sessions
  await Promise.all(sessions.map(sessionId => 
    fetch(`/api/messaging/sessions/${sessionId}`, { method: 'DELETE' })
  ));
};
```

## Common Issues and Troubleshooting

This section addresses common issues encountered during testing and debugging in the 371OS environment and provides troubleshooting guidance.

### Race Conditions
Race conditions can occur when multiple operations access shared resources concurrently. Prevention strategies include:

- **Proper session management**: Ensure sessions are properly created and cleaned up
- **Atomic operations**: Design operations to be atomic where possible
- **Synchronization mechanisms**: Use appropriate locking or queuing patterns

### Memory Leaks
Memory leaks can occur due to improper resource management. Detection and prevention strategies:

- **Monitor session count**: Use the sessions health check endpoint to track active sessions
- **Proper cleanup**: Ensure temporary files and resources are cleaned up
- **Timeout configuration**: Set appropriate session timeouts to prevent indefinite resource holding

```javascript
// Monitor active sessions
const healthResponse = await fetch('/api/messaging/sessions/health');
const { activeSessions, expiringSoon } = await healthResponse.json();
console.log(`Active sessions: ${activeSessions}`);
console.log(`Sessions expiring soon: ${expiringSoon}`);
```

### Unexpected Error Propagation
Errors should be properly handled and propagated with meaningful messages. Best practices:

- **Specific error messages**: Provide clear, actionable error messages
- **Error categorization**: Classify errors by type and severity
- **Graceful degradation**: Design systems to continue functioning when possible

### Configuration Issues
Common configuration problems and solutions:

| Issue | Solution |
|------|---------|
| Missing environment variables | Use `elizaos env edit-local` to configure |
| Incorrect agent IDs | Verify agent IDs through list commands |
| Port conflicts | Use `--port` option to specify alternative ports |
| Build issues | Use `--skip-build` for faster test cycles |

### Troubleshooting Workflow
A systematic troubleshooting approach:

1. **Verify configuration**: Check environment variables and settings
2. **Check logs**: Retrieve relevant logs using filtering parameters
3. **Test connectivity**: Verify API endpoints are accessible
4. **Isolate components**: Test individual components separately
5. **Reproduce consistently**: Ensure the issue can be reliably reproduced

```bash
# Troubleshooting steps
elizaos env list                          # Check configuration
curl http://localhost:3000/api/server/logs?level=error  # Check for errors
elizaos test --skip-build --skip-type-check  # Fast test cycle
```

## Build System and TypeScript Configuration

Recent updates have established a comprehensive troubleshooting infrastructure with systematic guides for TypeScript, build system, and dependency issues. This section documents the best practices and resolution strategies for common development environment problems.

### Comprehensive Troubleshooting Infrastructure
The 371OS development environment now includes enterprise-grade troubleshooting documentation with 95%+ resolution rates. The infrastructure includes:

- **Systematic error resolution**: Standardized approaches for common issues
- **Success rate tracking**: Metrics for issue resolution effectiveness
- **Prevention strategies**: Proactive measures to avoid common problems
- **Escalation process**: Clear path for resolving complex issues

**Section sources**
- [README.md](file://troubleshooting/README.md#L1-L166) - *Updated in recent commit*

### TypeScript Configuration Standards
The following standards have been established for ElizaOS plugin development:

```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM"],
    "isolatedModules": true,
    "target": "ES2022",
    "module": "ESNext"
  },
  "exclude": ["../other-plugins/**/*"]
}
```

Key requirements:
- Use optional `state?: State` parameter in handler signatures
- Return `Promise<ActionResult | void | undefined>`
- Explicit imports from `@elizaos/core`
- Module isolation in multi-plugin workspaces

**Section sources**
- [elizaos-plugin-typescript-build-issues.md](file://troubleshooting/solutions/elizaos-plugin-typescript-build-issues.md#L1-L278) - *Updated in recent commit*

### Windows-Specific Development
For Windows development, the following practices are recommended:

1. **Package Manager**: Prefer Bun over npm
2. **Lockfile Strategy**: Use `--no-save` flag for development
3. **Script Execution**: Always use ExecutionPolicy Bypass
4. **Path Configuration**: Use forward slashes in JSON files

**Immediate Solutions for Bun Lockfile Conflicts**:
```bash
# Method 1: No-Save Installation (Recommended)
bun install --force --no-save

# Method 2: PowerShell Elevation
powershell -ExecutionPolicy Bypass -Command "cd 'path/to/plugin'; Remove-Item bun.lockb -Force -ErrorAction SilentlyContinue; bun install"

# Method 3: Manual Cleanup
rm -f bun.lockb package-lock.json yarn.lock
rm -rf node_modules
bun install
```

**Section sources**
- [bun-lockfile-conflicts-windows.md](file://troubleshooting/dependency-issues/bun-lockfile-conflicts-windows.md#L1-L108) - *Added in recent commit*

### Validation and Prevention
Pre-deployment validation checklist:

```bash
# TypeScript compilation check
bun run tsc --noEmit

# Build verification
bun run build

# Dependency validation
bun install --dry-run

# Plugin structure verification
ls dist/ # Should contain index.js, index.cjs, index.d.ts
```

Expected results:
- **TypeScript**: 0 compilation errors
- **Build**: ESM, CJS, and DTS outputs generated
- **Size**: ~38KB for main bundles, ~8KB for declarations
- **Performance**: Build completion in ~3-4 seconds

**Section sources**
- [elizaos-plugin-typescript-build-issues.md](file://troubleshooting/solutions/elizaos-plugin-typescript-build-issues.md#L1-L278) - *Updated in recent commit*