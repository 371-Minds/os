# Development Workflow

<cite>
**Referenced Files in This Document**   
- [project.json](file://packages/elizaos-plugins/nx-workspace/project.json)
- [tsconfig.json](file://packages/elizaos-plugins/nx-workspace/tsconfig.json)
- [tsconfig.lib.json](file://packages/elizaos-plugins/nx-workspace/tsconfig.lib.json)
- [tsconfig.spec.json](file://packages/elizaos-plugins/nx-workspace/tsconfig.spec.json)
- [jest.config.ts](file://packages/elizaos-plugins/nx-workspace/jest.config.ts)
- [Plugin Developer Guide.md](file://elizaos/Guides/Plugin Developer Guide.md)
- [quick-start.ps1](file://scripts/quick-start.ps1) - *Updated in recent commit*
- [test-setup.ps1](file://scripts/test-setup.ps1) - *Added in recent commit*
- [AB/README.md](file://AB/README.md) - *Updated in commit 31e6752*
- [AB/milestone-tracker.md](file://AB/milestone-tracker.md) - *Updated in commit 31e6752*
</cite>

## Update Summary
**Changes Made**   
- Updated the Development Environment Setup section to include new PowerShell scripts for Windows environments
- Added documentation for the new test-setup.ps1 script for environment validation
- Updated the Common Development Tasks section with information about the enhanced quick-start.ps1 script
- Added troubleshooting guidance for Windows-specific setup issues
- Updated section sources to reflect new and modified files
- Incorporated information about proven development workflows from completed complex plugins
- Added references to AB/README.md and AB/milestone-tracker.md as updated in recent commits

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Development Environment Setup](#development-environment-setup)
4. [Plugin Project Scaffolding](#plugin-project-scaffolding)
5. [Core Plugin Components](#core-plugin-components)
6. [Code Organization and Naming Conventions](#code-organization-and-naming-conventions)
7. [Task Automation with project.json](#task-automation-with-projectjson)
8. [Testing Framework Configuration](#testing-framework-configuration)
9. [Build Pipeline Configuration](#build-pipeline-configuration)
10. [Common Development Tasks](#common-development-tasks)
11. [Troubleshooting Guide](#troubleshooting-guide)

## Introduction

This document provides a comprehensive guide to the plugin development workflow in 371OS, covering the complete process from project initialization to deployment and registration. The documentation details the development environment setup, including TypeScript configuration, testing framework setup, and build pipelines. It offers step-by-step tutorials for creating new plugin projects, implementing core functionality, writing unit tests, and debugging locally. The guide also explains code organization principles, naming conventions, and how to leverage project.json for task automation, providing practical examples of common development tasks and troubleshooting guidance for typical setup issues.

## Project Structure

The 371OS repository follows a monorepo structure with a well-organized directory hierarchy that separates different types of components and resources. The core plugin development workspace is located in the `packages/elizaos-plugins/nx-workspace` directory, which contains the necessary configuration files for TypeScript, testing, and build processes.

```
mermaid
graph TD
A[371OS Repository Root] --> B[371-os]
A --> C[packages]
A --> D[elizaos]
A --> E[scripts]
A --> F[docs]
B --> G[src/minds371]
B --> H[tests]
B --> I[docs]
C --> J[elizaos-plugins]
J --> K[nx-workspace]
K --> L[src]
K --> M[dist]
K --> N[package.json]
K --> O[project.json]
K --> P[tsconfig.json]
K --> Q[tsconfig.lib.json]
K --> R[tsconfig.spec.json]
K --> S[jest.config.ts]
```

**Section sources**
- [project.json](file://packages/elizaos-plugins/nx-workspace/project.json)
- [tsconfig.json](file://packages/elizaos-plugins/nx-workspace/tsconfig.json)

## Development Environment Setup

The development environment for 371OS plugins is configured using TypeScript and Jest, with Nx providing task automation and workspace management. The setup ensures type safety, efficient testing, and streamlined build processes. For Windows environments, PowerShell scripts have been enhanced to automate the setup process.

### TypeScript Configuration

The TypeScript configuration is split across multiple files to separate library, specification, and general settings. The base configuration extends from the workspace root's `tsconfig.base.json` and defines compiler options for strict type checking and module resolution.

```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "module": "commonjs",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "files": [],
  "include": [],
  "references": [
    {
      "path": "./tsconfig.lib.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
```

The library-specific configuration (`tsconfig.lib.json`) sets the output directory and includes source files while excluding test files:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts"],
  "exclude": ["jest.config.ts", "src/**/*.spec.ts", "src/**/*.test.ts"]
}
```

The specification configuration (`tsconfig.spec.json`) includes test files and adds Jest types:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  "include": ["jest.config.ts", "src/**/*.test.ts", "src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

### PowerShell Script Enhancements

The development workflow now includes enhanced PowerShell scripts for Windows environments, providing automated setup and validation capabilities.

#### Quick Start Script (quick-start.ps1)

The `quick-start.ps1` script automates the entire setup process for Windows environments, including:

- Prerequisite checking (Node.js, npm, Git)
- Dependency installation
- Environment configuration with interactive prompts
- Package building with Nx
- Agent ecosystem setup
- Monitoring configuration
- Functionality testing

Key features of the updated script:
- Interactive environment configuration with secure input handling
- Automatic creation of agent character files
- Health check script generation
- Cross-platform compatibility considerations
- Detailed progress tracking and status reporting

#### Environment Validation Script (test-setup.ps1)

A new `test-setup.ps1` script has been added to validate the development environment:

```powershell
# 371 OS Quick Start Test (PowerShell Edition)
param(
    [switch]$SkipDependencyCheck,
    [switch]$SkipBuild
)

Write-Host "371 OS Quick Start Test!" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green

# Test basic functionality
Write-Host "Testing basic PowerShell execution..." -ForegroundColor Yellow
$currentLocation = Get-Location
Write-Host "Current directory: $currentLocation" -ForegroundColor White

# Check if we're in the right directory
if (Test-Path "nx.json") {
    Write-Host "SUCCESS: Found nx.json - we're in an Nx workspace!" -ForegroundColor Green
} else {
    Write-Host "WARNING: nx.json not found" -ForegroundColor Yellow
}

# Check if package.json exists
if (Test-Path "package.json") {
    Write-Host "SUCCESS: Found package.json" -ForegroundColor Green
    
    # Try to read it
    try {
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        Write-Host "Package name: $($packageJson.name)" -ForegroundColor White
        Write-Host "Version: $($packageJson.version)" -ForegroundColor White
    } catch {
        Write-Host "WARNING: Could not parse package.json: $_" -ForegroundColor Yellow
    }
} else {
    Write-Host "ERROR: package.json not found" -ForegroundColor Red
}
```

This script verifies the presence and integrity of key project files and dependencies, providing immediate feedback on the environment's readiness for development.

**Section sources**
- [tsconfig.json](file://packages/elizaos-plugins/nx-workspace/tsconfig.json)
- [tsconfig.lib.json](file://packages/elizaos-plugins/nx-workspace/tsconfig.lib.json)
- [tsconfig.spec.json](file://packages/elizaos-plugins/nx-workspace/tsconfig.spec.json)
- [quick-start.ps1](file://scripts/quick-start.ps1) - *Updated in recent commit*
- [test-setup.ps1](file://scripts/test-setup.ps1) - *Added in recent commit*

## Plugin Project Scaffolding

The plugin development workflow begins with project scaffolding using Nx generators or the elizaOS CLI. This process creates a new plugin project with the proper directory structure, configuration files, and initial code templates.

### Using Nx Generators

Nx provides generators for creating new plugins with consistent structure and configuration. The generator creates the necessary files and directories, sets up TypeScript configuration, and configures the build and test environments.

### Using elizaOS CLI

The elizaOS CLI offers an interactive way to create new plugins with two template options:

1. **Quick Plugin (Backend Only)**: A simple backend-only plugin suitable for API integrations, blockchain actions, or data providers.
2. **Full Plugin (with Frontend)**: A complete plugin with React frontend, Vite setup, and API routes, ideal for plugins requiring web UI or visual components.

The CLI scaffolding process creates the following structure:

```
plugin-my-plugin/
├── src/
│   ├── index.ts           # Plugin manifest
│   ├── actions/           # Agent actions
│   ├── providers/         # Context providers
│   ├── types/             # TypeScript types
├── package.json           # Pre-configured with elizaos dependencies
├── tsconfig.json          # TypeScript configuration
├── tsup.config.ts         # Build configuration
└── README.md              # Plugin documentation
```

After scaffolding, developers can install dependencies and start development:

```bash
# Navigate to plugin directory
cd plugin-my-plugin

# Install dependencies
bun install

# Start development mode with hot reloading
elizaos dev

# Build plugin for distribution
bun run build
```

**Section sources**
- [Plugin Developer Guide.md](file://elizaos/Guides/Plugin Developer Guide.md)

## Core Plugin Components

Plugins in 371OS consist of several core components that work together to extend agent capabilities. These components follow a consistent architecture that enables modularity, reusability, and type safety.

### Plugin Interface

Every plugin must implement the core `Plugin` interface, which defines the plugin's metadata, configuration, and functional components:

```typescript
export interface Plugin {
  name: string;
  description: string;
  init?: (config: Record<string, string>, runtime: IAgentRuntime) => Promise<void>;
  config?: { [key: string]: any };
  services?: (typeof Service)[];
  componentTypes?: {
    name: string;
    schema: Record<string, unknown>;
    validator?: (data: any) => boolean;
  }[];
  actions?: Action[];
  providers?: Provider[];
  evaluators?: Evaluator[];
  adapter?: IDatabaseAdapter;
  models?: {
    [key: string]: (...args: any[]) => Promise<any>;
  };
  events?: PluginEvents;
  routes?: Route[];
  tests?: TestSuite[];
  dependencies?: string[];
  testDependencies?: string[];
  priority?: number;
  schema?: any;
}
```

### Services

Services manage stateful connections and provide core functionality. They are singleton instances that persist throughout the agent's lifecycle and are responsible for initializing connections, managing resources, and providing access to external systems.

### Actions

Actions represent the capabilities that an agent can perform. They are intelligent, context-aware operations that can make decisions, interact with services, and chain together for complex workflows. Each action includes validation logic, a handler function, and examples to teach the LLM when to use it.

### Providers

Providers supply contextual information to the agent's state before decision-making. They act as the agent's "senses," gathering relevant data that helps the LLM understand the current context. Providers are executed during state composition and can be configured with execution order and visibility settings.

### Evaluators

Evaluators run after the agent generates a response, allowing for analysis, learning, and side effects. They can extract facts, assess response quality, store memories, or trigger follow-up actions based on the agent's output.

**Section sources**
- [Plugin Developer Guide.md](file://elizaos/Guides/Plugin Developer Guide.md)

## Code Organization and Naming Conventions

The plugin ecosystem follows consistent code organization principles and naming conventions to ensure maintainability and readability across projects.

### Directory Structure

Plugins follow a standardized directory structure that separates different types of components:

```
packages/plugin-<name>/
├── src/
│   ├── index.ts           # Plugin manifest and exports
│   ├── service.ts         # Main service implementation
│   ├── actions/           # Agent capabilities
│   ├── providers/         # Context providers
│   ├── evaluators/        # Post-processing
│   ├── handlers/          # LLM model handlers
│   ├── types/             # TypeScript definitions
│   ├── constants/         # Configuration constants
│   ├── utils/             # Helper functions
│   └── tests.ts           # Test suite
├── __tests__/             # Unit tests
├── package.json
├── tsconfig.json
├── tsup.config.ts
└── README.md
```

### Naming Conventions

The following naming conventions are used throughout the plugin ecosystem:

- **Plugin names**: `plugin-<name>` with lowercase letters and hyphens
- **Package names**: `@<organization>/plugin-<name>` following npm scope conventions
- **File names**: Lowercase with hyphens for multi-word names (e.g., `my-action.ts`)
- **Class names**: PascalCase (e.g., `MyService`)
- **Function names**: camelCase (e.g., `myActionHandler`)
- **Constants**: UPPER_CASE with underscores (e.g., `MAX_RETRY_ATTEMPTS`)
- **Type names**: PascalCase (e.g., `MyActionType`)

### Component Naming

Specific components follow these naming patterns:

- **Actions**: Uppercase with underscores (e.g., `SEND_MESSAGE`)
- **Providers**: Uppercase with underscores (e.g., `RECENT_MESSAGES`)
- **Events**: Uppercase with underscores (e.g., `MESSAGE_CREATED`)

**Section sources**
- [Plugin Developer Guide.md](file://elizaos/Guides/Plugin Developer Guide.md)

## Task Automation with project.json

The `project.json` file in the Nx workspace configures task automation for building, testing, and linting plugins. This configuration enables consistent execution of common development tasks across the monorepo.

### Build Configuration

The build target uses the `@nx/js:tsc` executor to compile TypeScript code:

```json
"build": {
  "executor": "@nx/js:tsc",
  "outputs": ["{options.outputPath}"],
  "options": {
    "outputPath": "packages/elizaos-plugins/nx-workspace/dist",
    "tsConfig": "packages/elizaos-plugins/nx-workspace/tsconfig.lib.json",
    "packageJson": "packages/elizaos-plugins/nx-workspace/package.json",
    "main": "packages/elizaos-plugins/nx-workspace/src/index.ts",
    "assets": ["packages/elizaos-plugins/nx-workspace/*.md"]
  }
}
```

### Test Configuration

The test target uses the `@nx/jest:jest` executor to run unit tests:

```json
"test": {
  "executor": "@nx/jest:jest",
  "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
  "options": {
    "jestConfig": "packages/elizaos-plugins/nx-workspace/jest.config.ts",
    "passWithNoTests": true
  },
  "configurations": {
    "ci": {
      "ci": true,
      "coverageReporters": ["text"]
    }
  }
}
```

### Lint Configuration

The lint target uses the `@nx/eslint:lint` executor to enforce code quality standards:

```json
"lint": {
  "executor": "@nx/eslint:lint",
  "outputs": ["{options.outputFile}"],
  "options": {
    "lintFilePatterns": ["packages/elizaos-plugins/nx-workspace/**/*.ts"]
  }
}
```

These configurations can be executed using Nx commands:

```bash
# Build the plugin
nx build elizaos-plugin-nx-workspace

# Run tests
nx test elizaos-plugin-nx-workspace

# Run tests with coverage
nx test elizaos-plugin-nx-workspace -- --coverage

# Lint the code
nx lint elizaos-plugin-nx-workspace
```

**Section sources**
- [project.json](file://packages/elizaos-plugins/nx-workspace/project.json)

## Testing Framework Configuration

The testing framework is configured using Jest with TypeScript support through ts-jest. The configuration ensures proper test execution, code coverage reporting, and environment setup.

### Jest Configuration

The `jest.config.ts` file configures Jest for the plugin workspace:

```typescript
export default {
  displayName: 'elizaos-plugin-nx-workspace',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/packages/elizaos-plugins/nx-workspace',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
  ],
};
```

Key configuration options include:

- **displayName**: Identifies the test suite in output
- **preset**: Inherits base configuration from the workspace
- **testEnvironment**: Sets Node.js as the test environment
- **transform**: Uses ts-jest to transform TypeScript files with the specification configuration
- **moduleFileExtensions**: Specifies file extensions to recognize
- **coverageDirectory**: Sets the output directory for coverage reports
- **collectCoverageFrom**: Defines which files to include in coverage reports

### Test Structure

Tests are organized in the `__tests__` directory or with `.test.ts`/`.spec.ts` extensions. The testing framework supports:

- Unit testing of individual functions and classes
- Integration testing of component interactions
- Mocking of dependencies and external services
- Asynchronous test execution
- Code coverage reporting

Example test structure:

```typescript
import { describe, it, expect } from 'bun:test';
import { myAction } from '../src/actions/myAction';

describe('MyAction', () => {
  it('should validate when requirements are met', async () => {
    // Test implementation
  });

  it('should execute handler successfully', async () => {
    // Test implementation
  });
});
```

**Section sources**
- [jest.config.ts](file://packages/elizaos-plugins/nx-workspace/jest.config.ts)
- [Plugin Developer Guide.md](file://elizaos/Guides/Plugin Developer Guide.md)

## Build Pipeline Configuration

The build pipeline is configured to compile TypeScript code, generate type declarations, and package the plugin for distribution. The configuration ensures consistent builds across development and production environments.

### Build Process

The build process follows these steps:

1. **TypeScript Compilation**: Transpiles TypeScript code to JavaScript using the library configuration
2. **Type Declaration Generation**: Creates `.d.ts` files for type safety in consuming projects
3. **Asset Copying**: Copies markdown files and other assets to the output directory
4. **Package Creation**: Generates a distributable package with proper metadata

### Output Structure

The build process creates a `dist` directory with the compiled output:

```
dist/
├── index.js           # Compiled JavaScript
├── index.d.ts         # Type declarations
├── actions/           # Compiled action modules
├── providers/         # Compiled provider modules
└── package.json       # Package metadata
```

### Build Optimization

The build configuration includes optimizations for performance and bundle size:

- **Tree Shaking**: Removes unused code through module bundling
- **Minification**: Reduces file size in production builds
- **Source Maps**: Generates source maps for debugging
- **Caching**: Uses Nx's computation caching for faster incremental builds

The build pipeline can be customized by modifying the `tsup.config.ts` file in individual plugin projects, allowing for specific optimizations based on plugin requirements.

**Section sources**
- [tsconfig.lib.json](file://packages/elizaos-plugins/nx-workspace/tsconfig.lib.json)
- [project.json](file://packages/elizaos-plugins/nx-workspace/project.json)

## Common Development Tasks

This section provides practical examples of common development tasks in the 371OS plugin ecosystem.

### Initializing a New Plugin Project

```bash
# Use the elizaOS CLI to create a new plugin
elizaos create my-plugin --type plugin

# Or use Nx generator
nx generate @nx/js:library --name=my-plugin --directory=packages --unitTestRunner=jest
```

### Implementing a New Action

```typescript
import { Action, ActionResult, IAgentRuntime, Memory, State } from '@elizaos/core';

export const myAction: Action = {
  name: 'MY_ACTION',
  description: 'Description of what this action does',
  
  validate: async (runtime: IAgentRuntime, message: Memory, state?: State): Promise<boolean> => {
    // Validation logic
    return true;
  },
  
  handler: async (
    runtime: IAgentRuntime,
    message: Memory,
    state?: State
  ): Promise<ActionResult> => {
    try {
      // Action implementation
      return {
        success: true,
        text: 'Action completed successfully',
        values: { result: 'success' }
      };
    } catch (error) {
      return {
        success: false,
        text: 'Action failed',
        error: error instanceof Error ? error : new Error(String(error))
      };
    }
  },
  
  examples: [
    [
      {
        name: '{{user}}',
        content: { text: 'Trigger the action' }
      },
      {
        name: '{{agent}}',
        content: {
          text: 'Executing action',
          actions: ['MY_ACTION']
        }
      }
    ]
  ]
};
```

### Writing Unit Tests

```typescript
import { describe, it, expect } from 'bun:test';
import { myAction } from '../src/actions/myAction';
import { createMockRuntime } from '@elizaos/test-utils';

describe('myAction', () => {
  it('should validate successfully', async () => {
    const runtime = createMockRuntime();
    const message = { id: 'test', entityId: 'user', roomId: 'room', content: { text: 'test' } };
    
    const isValid = await myAction.validate(runtime, message);
    expect(isValid).toBe(true);
  });
  
  it('should execute handler successfully', async () => {
    const runtime = createMockRuntime();
    const message = { id: 'test', entityId: 'user', roomId: 'room', content: { text: 'test' } };
    
    const result = await myAction.handler(runtime, message);
    expect(result.success).toBe(true);
    expect(result.text).toContain('completed');
  });
});
```

### Debugging Locally

```bash
# Start development server with debugging enabled
elizaos dev --inspect

# Attach debugger to the process
# Use Chrome DevTools or VS Code debugger

# Add breakpoints in code
# Use console.log for simple debugging
console.log('Debug info:', variable);
```

### Using PowerShell Scripts for Development

The enhanced PowerShell scripts provide automated setup and validation for Windows environments:

```powershell
# Run the quick start setup
.\scripts\quick-start.ps1

# Validate the environment setup
.\scripts\test-setup.ps1

# Run health checks
.\monitoring\health-check.ps1

# Deploy to Akash Network
.\scripts\deploy-akash.ps1
```

These scripts automate complex setup processes, reducing configuration errors and ensuring consistent environments across development teams.

**Section sources**
- [Plugin Developer Guide.md](file://elizaos/Guides/Plugin Developer Guide.md)
- [quick-start.ps1](file://scripts/quick-start.ps1) - *Updated in recent commit*
- [test-setup.ps1](file://scripts/test-setup.ps1) - *Added in recent commit*

## Troubleshooting Guide

This section addresses common issues encountered during plugin development and provides solutions.

### Configuration Issues

**Problem**: TypeScript compilation errors related to module resolution
**Solution**: Verify that `tsconfig.json` extends the correct base configuration and that references to `tsconfig.lib.json` and `tsconfig.spec.json` are correct.

**Problem**: Jest tests failing with "Cannot find module" errors
**Solution**: Ensure that `jest.config.ts` points to the correct `tsconfig.spec.json` file and that module file extensions are properly configured.

### Build Issues

**Problem**: Build fails with type errors
**Solution**: Check that all dependencies are properly installed and that type declarations are available. Run `bun install` to ensure all packages are up to date.

**Problem**: Output directory is empty after build
**Solution**: Verify that the `outputPath` in `project.json` is correct and that the `main` entry point exists.

### Testing Issues

**Problem**: Tests not discovering test files
**Solution**: Ensure test files are named with `.test.ts` or `.spec.ts` extensions and are located in the correct directory. Verify that `lintFilePatterns` in `project.json` includes the test files.

**Problem**: Coverage reporting not working
**Solution**: Check that `collectCoverageFrom` in `jest.config.ts` includes the correct file patterns and that the `coverageDirectory` is writable.

### Runtime Issues

**Problem**: Plugin not loading in the agent
**Solution**: Verify that the plugin is properly registered in the agent's configuration and that all dependencies are satisfied. Check the agent logs for error messages.

**Problem**: Actions not being recognized by the LLM
**Solution**: Ensure that action names are in uppercase with underscores and that examples are provided to teach the LLM when to use the action.

**Problem**: Service initialization failures
**Solution**: Check that required configuration values are provided and that external services are available. Verify error handling in the service's `start` method.

### Windows-Specific Issues

**Problem**: PowerShell script execution blocked by execution policy
**Solution**: Run PowerShell as administrator and set the execution policy:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Problem**: Environment variables not being loaded
**Solution**: Ensure the `.env` file is properly created and secured. Verify file encoding is UTF8:
```powershell
Get-Content .env | Out-File -FilePath .env -Encoding UTF8
```

**Problem**: Node.js modules not installing correctly
**Solution**: Clear npm cache and reinstall:
```powershell
npm cache clean --force
Remove-Item -Recurse -Force node_modules
npm install
```

**Section sources**
- [Plugin Developer Guide.md](file://elizaos/Guides/Plugin Developer Guide.md)
- [project.json](file://packages/elizaos-plugins/nx-workspace/project.json)
- [tsconfig.json](file://packages/elizaos-plugins/nx-workspace/tsconfig.json)
- [jest.config.ts](file://packages/elizaos-plugins/nx-workspace/jest.config.ts)
- [quick-start.ps1](file://scripts/quick-start.ps1) - *Updated in recent commit*
- [test-setup.ps1](file://scripts/test-setup.ps1) - *Added in recent commit*
- [AB/README.md](file://AB/README.md) - *Updated in commit 31e6752*
- [AB/milestone-tracker.md](file://AB/milestone-tracker.md) - *Updated in commit 31e6752*