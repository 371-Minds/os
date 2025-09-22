# Troubleshooting and FAQ

<cite>
**Referenced Files in This Document**   
- [Adaptive_Router_Logic.md](file://371-os/Adaptive_Router_Logic.md)
- [CCO_Agent_Logic.md](file://371-os/CCO_Agent_Logic.md)
- [CEO_Agent_Logic.md](file://371-os/CEO_Agent_Logic.md)
- [CFO_Agent_Logic.md](file://371-os/CFO_Agent_Logic.md)
- [CGO_Agent_Logic.md](file://371-os/CGO_Agent_Logic.md)
- [CLO_Agent_Logic.md](file://371-os/CLO_Agent_Logic.md)
- [CMO_Marketing_Agent_Logic.md](file://371-os/CMO_Marketing_Agent_Logic.md)
- [CMO_Monetization_Agent_Logic.md](file://371-os/CMO_Monetization_Agent_Logic.md)
- [CPO_Agent_Logic.md](file://371-os/CPO_Agent_Logic.md)
- [CTO_Agent_Logic.md](file://371-os/CTO_Agent_Logic.md)
- [_MASTER_ARCHITECTURE.md](file://371-os/_MASTER_ARCHITECTURE.md)
- [Warp-Config-Tips.md](file://371-os/src/minds371/371OS_launch/Warp-Config-Tips.md)
- [371-OS-Warp-Setup.md](file://371-os/src/minds371/371OS_launch/371-OS-Warp-Setup.md)
- [371-OS-Launch-Notebook.md](file://371-os/src/minds371/371OS_launch/371-OS-Launch-Notebook.md)
- [improved-base-agent.md](file://371-os/src/minds371/agents/base_agent/improved-base-agent.md)
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py)
- [adaptive_llm_router_example.py](file://371-os/src/minds371/adaptive_llm_router/adaptive_llm_router_example.py)
- [config.py](file://371-os/src/minds371/adaptive_llm_router/config.py)
- [intelligent_router_agent.py](file://371-os/src/minds371/adaptive_llm_router/intelligent_router_agent.py)
- [budget_guard.py](file://371-os/src/minds371/adaptive_llm_router/budget_guard.py)
- [policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py)
- [usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py)
- [providers.json](file://371-os/src/minds371/adaptive_llm_router/providers.json)
- [llm_usage.json](file://371-os/src/minds371/adaptive_llm_router/llm_usage.json)
- [qa_agent.py](file://371-os/src/minds371/agents/technical/qa_agent.py)
- [deployment_agent.py](file://371-os/src/minds371/agents/technical/deployment_agent.py)
- [router_agent.py](file://371-os/src/minds371/agents/utility/router_agent.py)
- [financial_agent.py](file://371-os/src/minds371/agents/utility/financial_agent.py)
- [ceo_mimi.py](file://371-os/src/minds371/agents/business/ceo_mimi.py)
- [cfo_cash.py](file://371-os/src/minds371/agents/business/cfo_cash.py)
- [clo_sage.py](file://371-os/src/minds371/agents/business/clo_sage.py)
- [cto_alex.py](file://371-os/src/minds371/agents/business/cto_alex.py)
- [cmo_anova.py](file://371-os/src/minds371/agents/business/cmo_anova.py)
- [cco_agent.py](file://371-os/src/minds371/agents/cco_agent/cco_agent.py)
- [cro_agent.py](file://371-os/src/minds371/agents/cro_agent/cro_agent.py)
- [content_generation_agent.py](file://371-os/src/minds371/agents/marketing/content_generation_agent.py)
- [marketing_automation_agent.py](file://371-os/src/minds371/agents/marketing/marketing_automation_agent.py)
- [credential_warehouse_agent.py](file://371-os/src/minds371/agents/utility/credential_warehouse_agent.py)
- [agent_utility_belt.py](file://371-os/src/minds371/agents/utility/agent_utility_belt.py)
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [GETTING_STARTED.md](file://GETTING_STARTED.md)
- [IMPLEMENTATION_GUIDE.md](file://IMPLEMENTATION_GUIDE.md)
- [COMMANDS.md](file://COMMANDS.md)
- [INTEGRATION_ROADMAP.md](file://INTEGRATION_ROADMAP.md)
- [MILESTONE_REPORT.md](file://MILESTONE_REPORT.md)
- [README.md](file://README.md)
- [troubleshooting/README.md](file://troubleshooting/README.md)
- [troubleshooting/solutions/elizaos-plugin-typescript-build-issues.md](file://troubleshooting/solutions/elizaos-plugin-typescript-build-issues.md)
- [troubleshooting/dependency-issues/bun-lockfile-conflicts-windows.md](file://troubleshooting/dependency-issues/bun-lockfile-conflicts-windows.md)
- [troubleshooting/dependency-issues/npm-install-hanging.md](file://troubleshooting/dependency-issues/npm-install-hanging.md)
- [AB/milestone-tracker.md](file://AB/milestone-tracker.md)
- [scripts/quick-start.sh](file://scripts/quick-start.sh)
- [AB/BUN-INTEGRATION-GUIDE.md](file://AB/BUN-INTEGRATION-GUIDE.md)
- [AB/scripts/bun-install.ps1](file://AB/scripts/bun-install.ps1)
- [BUN_WATCH_MIGRATION.md](file://BUN_WATCH_MIGRATION.md)
- [JEST_MIGRATION.md](file://JEST_MIGRATION.md)
- [BIOME_MIGRATION.md](file://BIOME_MIGRATION.md)
- [AB/README.md](file://AB/README.md) - *Updated in recent commit*
- [AB/milestone-tracker.md](file://AB/milestone-tracker.md) - *Updated in recent commit*
- [troubleshooting/integration-fixes/ADAPTIVE_LAYOUT_FIXES_SUMMARY.md](file://troubleshooting/integration-fixes/ADAPTIVE_LAYOUT_FIXES_SUMMARY.md) - *Updated in recent commit*
- [troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_BUILD_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_BUILD_FIXES.md) - *Updated in recent commit*
- [troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_EVALUATOR_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_EVALUATOR_FIXES.md) - *Updated in recent commit*
- [troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_INDEX_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_INDEX_FIXES.md) - *Updated in recent commit*
- [troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_PROVIDER_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_PROVIDER_FIXES.md) - *Updated in recent commit*
- [troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_TSCONFIG_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_TSCONFIG_FIXES.md) - *Updated in recent commit*
</cite>

## Update Summary
**Changes Made**   
- Added comprehensive troubleshooting section for TypeScript and build system issues in ElizaOS plugins
- Added detailed resolution guide for Bun lockfile conflicts on Windows
- Added solutions for npm installation hanging issues
- Updated dependency management recommendations based on performance data
- Enhanced pre-development checklist with environment validation steps
- Added new section on Windows-specific troubleshooting and PowerShell execution policies
- Integrated new quick-start script and Bun integration guide into setup instructions
- Updated performance benchmarks and validation procedures based on recent session logs
- Added reference to AB/README.md and AB/milestone-tracker.md as updated files
- Added documentation for Bun watch migration to replace nodemon and ts-node
- Added documentation for Jest to Bun test runner migration
- Added information about Biome migration from ESLint and Prettier
- Updated implementation guide with comprehensive setup instructions and troubleshooting guidance from IMPLEMENTATION_GUIDE.md
- Added new integration fixes for Business Intelligence plugin components including type safety, configuration, exports, and provider fixes
- Added troubleshooting guidance for AdaptiveLayout.tsx compilation issues and module isolation
- Updated section sources to include new integration fix documentation files

## Table of Contents
1. [Introduction](#introduction)
2. [Setup Issues](#setup-issues)
3. [Agent Failures](#agent-failures)
4. [Performance Problems](#performance-problems)
5. [Security Errors](#security-errors)
6. [LLM Routing and Budget Management](#llm-routing-and-budget-management)
7. [Frequently Asked Questions](#frequently-asked-questions)
8. [Known Limitations and Workarounds](#known-limitations-and-workarounds)
9. [Debugging and Diagnostic Tools](#debugging-and-diagnostic-tools)
10. [Support and Escalation](#support-and-escalation)

## Introduction

This document provides comprehensive troubleshooting guidance and frequently asked questions (FAQ) for 371OS, an advanced autonomous agent operating system. The system enables coordinated execution of specialized AI agents across business, technical, and marketing domains, with intelligent routing between multiple LLM providers. This guide addresses common issues encountered during installation, configuration, deployment, and operation, organized by category with detailed symptom descriptions, root cause analysis, and step-by-step solutions.

The 371OS architecture is built around a modular agent framework with a dynamic LLM routing system that optimizes cost, performance, and reliability. Key components include executive agents (CEO, CFO, CTO, etc.), technical execution agents, marketing automation agents, and utility agents that handle coordination, security, and financial tracking.

**Section sources**
- [_MASTER_ARCHITECTURE.md](file://371-os/_MASTER_ARCHITECTURE.md)
- [system_architecture.html](file://371-os/docs/architecture/system_architecture.html)
- [README.md](file://README.md)

## Setup Issues

### Installation Fails with Missing Dependencies

**Symptom**: Installation halts with "ModuleNotFoundError" or "Package not found" errors during setup.

**Root Cause**: The system requires specific Python packages and external tools that may not be pre-installed in the environment.

**Solution**:
1. Ensure Python 3.10+ is installed:
```bash
python --version
```

2. Install required system packages:
```bash
# For Ubuntu/Debian
sudo apt-get update && sudo apt-get install -y python3-pip python3-venv git

# For macOS
brew install python3 git
```

3. Create and activate virtual environment:
```bash
cd 371-os
python -m venv venv
source venv/bin/activate  # Linux/macOS
# or
venv\Scripts\activate     # Windows
```

4. Install Python dependencies:
```bash
pip install -r requirements.txt
pip install -r src/minds371/requirements.txt
```

5. Install additional tools from package managers:
```bash
npm install -g nx  # For workspace management
```

**Section sources**
- [requirements.txt](file://371-os/requirements.txt)
- [src/minds371/requirements.txt](file://371-os/src/minds371/requirements.txt)
- [GETTING_STARTED.md](file://GETTING_STARTED.md)

### Warp Configuration Fails

**Symptom**: Warp setup script fails to initialize the agent coordination environment.

**Root Cause**: Incorrect configuration parameters or missing environment variables in the Warp initialization process.

**Solution**:
1. Verify Warp configuration file exists:
```bash
ls src/minds371/371OS_launch/Warp-Config-Tips.md
```

2. Check required environment variables are set:
```bash
# Required variables
export WARP_API_KEY="your_api_key"
export WARP_ENV="development"
export AGENT_COORDINATION_PORT=8080
```

3. Run Warp setup with verbose logging:
```bash
python src/minds371/371OS_launch/warp_setup.py --verbose
```

4. Validate configuration against template:
```bash
diff src/minds371/371OS_launch/Warp-Config-Tips.md.example src/minds371/371OS_launch/Warp-Config-Tips.md
```

**Section sources**
- [Warp-Config-Tips.md](file://371-os/src/minds371/371OS_launch/Warp-Config-Tips.md)
- [371-OS-Warp-Setup.md](file://371-os/src/minds371/371OS_launch/371-OS-Warp-Setup.md)
- [371-OS-Launch-Notebook.md](file://371-os/src/minds371/371OS_launch/371-OS-Launch-Notebook.md)

### Agent Initialization Failure

**Symptom**: Agents fail to start with "Agent not found" or "Initialization timeout" errors.

**Root Cause**: Agent registration system not properly configured or agent files not correctly linked in the agent registry.

**Solution**:
1. Verify agent files exist in the correct directory:
```bash
ls src/minds371/agents/business/*.py
ls src/minds371/agents/technical/*.py
```

2. Check agent import paths in the launcher:
```python
# In agent launcher, ensure correct import
from src.minds371.agents.business.ceo_mimi import CEOAgent
from src.minds371.agents.business.cfo_cash import CFOAgent
```

3. Register agents in the agent registry:
```python
# Example agent registration
agent_registry = {
    "CEO": "src.minds371.agents.business.ceo_mimi.CEOAgent",
    "CFO": "src.minds371.agents.business.cfo_cash.CFOAgent",
    "CTO": "src.minds371.agents.business.cto_alex.CTOAgent"
}
```

4. Restart agent coordination service:
```bash
python src/minds371/371OS_launch/371_os_launcher.py --restart-agents
```

**Section sources**
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py)
- [improved-base-agent.md](file://371-os/src/minds371/agents/base_agent/improved-base-agent.md)

### TypeScript and Build System Issues

**Symptom**: TypeScript compilation errors, missing modules (e.g., 'tsup'), or build system failures when developing ElizaOS plugins.

**Root Cause**: Interface incompatibility with ElizaOS core types, incorrect TypeScript configuration, or dependency installation issues.

**Diagnosis**:
1. Check for TypeScript compilation errors:
```bash
bun run tsc --noEmit
```

2. Verify build system dependencies:
```bash
ls node_modules/tsup
```

3. Check TypeScript configuration:
```bash
cat packages/elizaos-plugins/business-intelligence/tsconfig.json
```

**Solution**:
1. Fix interface compatibility issues:
```typescript
// Correct handler signature with optional parameters
handler: (
  runtime: IAgentRuntime,
  message: Memory,
  state?: State,
  options?: any,
  callback?: any,
  responses?: Memory[]
) => Promise<ActionResult | void | undefined>

// Ensure proper imports
import { 
  Action, Provider, Evaluator, IAgentRuntime, Memory, State, 
  ActionResult, ProviderResult 
} from '@elizaos/core';
```

2. Correct TypeScript configuration:
```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "lib": ["ES2022", "DOM"],
    "isolatedModules": true,
    "target": "ES2022",
    "module": "ESNext"
  },
  "exclude": [
    "../nx-workspace/**/*",
    "../cognitive-engine/**/*", 
    "../universal-tool-server/**/*"
  ]
}
```

3. Resolve build system issues:
```bash
# Install dependencies with Bun (recommended)
bun install --force --no-save

# Build the project
bun run build
```

4. Create missing test configuration:
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.test.ts", 
    "src/**/*.d.ts"
  ]
}
```

**Section sources**
- [troubleshooting/solutions/elizaos-plugin-typescript-build-issues.md](file://troubleshooting/solutions/elizaos-plugin-typescript-build-issues.md)
- [packages/elizaos-plugins/business-intelligence/src/types.ts](file://packages/elizaos-plugins/business-intelligence/src/types.ts)
- [packages/elizaos-plugins/business-intelligence/tsconfig.json](file://packages/elizaos-plugins/business-intelligence/tsconfig.json)
- [packages/elizaos-plugins/business-intelligence/tsup.config.ts](file://packages/elizaos-plugins/business-intelligence/tsup.config.ts)
- [packages/elizaos-plugins/cognitive-engine/tsconfig.spec.json](file://packages/elizaos-plugins/cognitive-engine/tsconfig.spec.json)

### Bun Lockfile Conflicts on Windows

**Symptom**: Bun installation fails with "EINVAL: Failed to replace old lockfile with new lockfile on disk" error on Windows systems.

**Root Cause**: File system permissions and lockfile handling issues specific to Windows environments.

**Diagnosis**:
1. Check for existing lockfiles:
```bash
ls bun.lockb package-lock.json yarn.lock
```

2. Verify Bun version:
```bash
bun --version
```

**Solution**:
1. Use no-save installation (recommended):
```bash
bun install --force --no-save
```

2. Use PowerShell with bypass execution policy:
```powershell
powershell -ExecutionPolicy Bypass -Command "cd 'path/to/plugin'; Remove-Item bun.lockb -Force -ErrorAction SilentlyContinue; bun install"
```

3. Manual cleanup and reinstallation:
```bash
# Remove lock conflicts
rm -f bun.lockb package-lock.json yarn.lock
rm -rf node_modules

# Clean installation
bun install
```

4. Emergency fallback to npm:
```bash
npm install --legacy-peer-deps --no-audit
```

**Validation**:
```bash
# Verify installation
bun --version
ls node_modules/@elizaos/core

# Test build
bun run build

# Check package count
find node_modules -name "package.json" | wc -l
```

**Section sources**
- [troubleshooting/dependency-issues/bun-lockfile-conflicts-windows.md](file://troubleshooting/dependency-issues/bun-lockfile-conflicts-windows.md)
- [AB/milestone-tracker.md](file://AB/milestone-tracker.md)
- [troubleshooting/README.md](file://troubleshooting/README.md)
- [AB/BUN-INTEGRATION-GUIDE.md](file://AB/BUN-INTEGRATION-GUIDE.md)
- [AB/scripts/bun-install.ps1](file://AB/scripts/bun-install.ps1)

### npm Installation Hanging

**Symptom**: npm installation hangs indefinitely, particularly with peer dependency resolution.

**Root Cause**: Peer dependency resolution issues and network timeouts in npm.

**Diagnosis**:
1. Monitor installation process:
```bash
npm install --verbose
```

2. Check network connectivity:
```bash
ping registry.npmjs.org
```

**Solution**:
1. Use legacy peer dependencies flag:
```bash
npm install --legacy-peer-deps
```

2. Disable audit to speed up installation:
```bash
npm install --no-audit
```

3. Clear npm cache:
```bash
npm cache clean --force
npm install
```

4. Use alternative registry:
```bash
npm install --registry https://registry.npmmirror.com
```

**Performance Note**: Bun completes installation in ~60 seconds for ~538 packages, while npm takes 30+ minutes with frequent hangs.

**Section sources**
- [troubleshooting/dependency-issues/npm-install-hanging.md](file://troubleshooting/dependency-issues/npm-install-hanging.md)
- [troubleshooting/README.md](file://troubleshooting/README.md)
- [AB/BUN-INTEGRATION-GUIDE.md](file://AB/BUN-INTEGRATION-GUIDE.md)

### Quick Start Script Issues

**Symptom**: The automated quick-start script fails to complete the setup process.

**Root Cause**: Missing prerequisites or environment configuration issues.

**Diagnosis**:
1. Check prerequisites:
```bash
node --version
npm --version
git --version
```

2. Verify script permissions:
```bash
ls -la scripts/quick-start.sh
```

**Solution**:
1. Install missing prerequisites:
```bash
# Install Node.js, npm, and Git if not present
```

2. Make script executable:
```bash
chmod +x scripts/quick-start.sh
```

3. Run the quick-start script:
```bash
./scripts/quick-start.sh
```

4. Alternative PowerShell execution:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/quick-start.ps1
```

**Section sources**
- [scripts/quick-start.sh](file://scripts/quick-start.sh)
- [AB/scripts/bun-install.ps1](file://AB/scripts/bun-install.ps1)

### Bun Watch Migration for Development

**Symptom**: Development environment uses outdated tools like nodemon and ts-node, leading to slower hot reload performance and increased dependency count.

**Root Cause**: Legacy development tools that add unnecessary dependencies and reduce performance.

**Diagnosis**:
1. Check current development scripts:
```bash
cat package.json | grep "start:"
```

2. Verify existing dependencies:
```bash
grep -E "(nodemon|ts-node|@swc-node/register)" package.json
```

**Solution**:
1. Update package.json scripts to use Bun's built-in watcher:
```json
{
  "scripts": {
    "start:ceo": "bun --watch agents/ceo-mimi/start.js",
    "start:coordinator": "bun --watch agents/coordinator/start.js"
  }
}
```

2. Remove legacy development dependencies:
```bash
bun remove nodemon ts-node @swc-node/register
```

3. Verify the new watch functionality:
```bash
bun --watch path/to/script.js
```

4. Test hot reload performance:
```bash
# Make a change to a file and observe restart time
```

**Benefits**:
- **Reduced Dependency Count**: Eliminates 3 runtime dependencies
- **Faster Execution**: Bun's watcher restarts in 100-200ms vs 1-2s for nodemon
- **Simplified Configuration**: No need for nodemon.json or similar config files
- **Better Performance**: Written in Zig for optimal performance
- **TypeScript Support**: Can run TypeScript files directly without compilation

**Section sources**
- [BUN_WATCH_MIGRATION.md](file://BUN_WATCH_MIGRATION.md)
- [AB/milestone-tracker.md](file://AB/milestone-tracker.md)
- [AB/sessions/session-2025-09-07-bun-watch-migration.md](file://AB/sessions/session-2025-09-07-bun-watch-migration.md)

### Jest to Bun Test Runner Migration

**Symptom**: Testing environment uses Jest, leading to slower test execution and increased dependency count.

**Root Cause**: Jest and related packages add significant dependencies and slow down test execution.

**Diagnosis**:
1. Check current test scripts:
```bash
cat package.json | grep "test"
```

2. Identify Jest dependencies:
```bash
grep -E "(jest|ts-jest|@nx/jest|@types/jest)" package.json
```

**Solution**:
1. Update package.json test scripts to use Bun's test runner:
```json
{
  "scripts": {
    "test": "bun test",
    "affected:test": "bun test"
  }
}
```

2. Remove Jest dependencies:
```bash
bun remove jest ts-jest @nx/jest @types/jest jest-environment-node jest-util
```

3. Update test files for Bun compatibility:
```typescript
// Before (Jest)
import { jest } from '@jest/globals';
jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

// After (Bun)
import { spyOn, mock } from "bun:test";
mock.module("child_process", () => ({
  execSync: () => undefined,
}));
```

4. Verify test execution:
```bash
bun test
```

**Benefits**:
- **Reduced Dependency Count**: Eliminates 6+ Jest-related dependencies
- **Faster Execution**: Bun test runner executes tests in 100-200ms vs 5-10s for Jest
- **Simplified Configuration**: No need for jest.config.ts or similar config files
- **Better Performance**: Written in Zig for optimal performance
- **Jest Compatibility**: Works with existing Jest test files with minimal changes

**Section sources**
- [JEST_MIGRATION.md](file://JEST_MIGRATION.md)
- [AB/milestone-tracker.md](file://AB/milestone-tracker.md)
- [AB/sessions/session-2025-09-07-jest-migration.md](file://AB/sessions/session-2025-09-07-jest-migration.md)

### Biome Migration from ESLint and Prettier

**Symptom**: Code formatting and linting environment uses multiple tools (ESLint + Prettier), leading to configuration complexity and performance issues.

**Root Cause**: Multiple linting and formatting tools that require complex configuration and slow down development.

**Diagnosis**:
1. Check current linting configuration:
```bash
ls -la | grep -E "(eslint|prettier)"
```

2. Identify related dependencies:
```bash
grep -E "(eslint|prettier|@typescript-eslint)" package.json
```

**Solution**:
1. Install Biome:
```bash
bun add --dev @biomejs/biome
```

2. Initialize Biome configuration:
```bash
bun biome init
```

3. Remove legacy linting dependencies:
```bash
bun remove eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

4. Update package.json scripts:
```json
{
  "scripts": {
    "lint": "bun biome check .",
    "format": "bun biome format ."
  }
}
```

5. Verify Biome functionality:
```bash
bun biome check .
bun biome format .
```

**Benefits**:
- **Reduced Dependency Count**: Eliminates 20+ linting and formatting dependencies
- **Faster Execution**: Biome is significantly faster than ESLint + Prettier combination
- **Simplified Configuration**: Single configuration file instead of multiple config files
- **Better Performance**: Written in Rust for optimal performance
- **Unified Tooling**: Combines linting, formatting, and code analysis in one tool

**Section sources**
- [BIOME_MIGRATION.md](file://BIOME_MIGRATION.md)
- [AB/milestone-tracker.md](file://AB/milestone-tracker.md)

### Adaptive Layout Compilation Issues

**Symptom**: TypeScript compilation errors in AdaptiveLayout.tsx component blocking development.

**Root Cause**: Missing React dependencies, import path errors, and type safety issues in the cognitive interface component.

**Diagnosis**:
1. Check for missing dependencies:
```bash
grep -E "(react|@types/react)" package.json
```

2. Verify import paths:
```bash
find src -name "CognitiveModeSwither.tsx"
```

3. Check TypeScript compilation:
```bash
bun run tsc --noEmit
```

**Solution**:
1. Install required dependencies:
```bash
bun add react react-dom
bun add --dev @types/react @types/react-dom
```

2. Fix import path typos:
```typescript
// Correct the typo in import
import CognitiveModeSwither from './CognitiveModeSwither';
```

3. Add proper type annotations:
```typescript
// Add explicit typing for all parameters and variables
const handleModeChange = (mode: string): void => {
  setCurrentMode(mode);
};
```

4. Fix component interface compatibility:
```typescript
// Ensure commonProps uses compatible function signatures
const commonProps = {
  onModeChange: handleModeChange,
  currentMode,
  // other props with proper typing
};
```

**Validation**:
```bash
# Verify clean compilation
bun run tsc --noEmit

# Test component rendering
bun run build

# Check bundle output
ls dist/
```

**Section sources**
- [troubleshooting/integration-fixes/ADAPTIVE_LAYOUT_FIXES_SUMMARY.md](file://troubleshooting/integration-fixes/ADAPTIVE_LAYOUT_FIXES_SUMMARY.md)
- [os-workspace/apps/cognitive-interface/src/components/AdaptiveLayout.tsx](file://os-workspace/apps/cognitive-interface/src/components/AdaptiveLayout.tsx)
- [os-workspace/apps/cognitive-interface/src/components/CognitiveModeSwither.tsx](file://os-workspace/apps/cognitive-interface/src/components/CognitiveModeSwither.tsx)

### Business Intelligence Plugin Build Configuration

**Symptom**: TypeScript compilation error "Cannot find module 'tsup' or its corresponding type declarations" in tsup.config.ts.

**Root Cause**: Missing tsup dependency installation due to Bun lockfile conflicts on Windows systems.

**Diagnosis**:
1. Check for tsup installation:
```bash
ls node_modules/tsup
```

2. Verify package.json:
```bash
grep tsup package.json
```

3. Test build command:
```bash
bun run build
```

**Solution**:
1. Install dependencies using no-save flag:
```bash
bun install --force --no-save
```

2. Verify successful installation:
```bash
bun run build
# Expected output:
# CLI Building entry: src/index.ts
# CLI Using tsconfig: tsconfig.json
# CLI tsup v8.5.0
# ESM Build start
# CJS Build start  
# DTS Build start
# CJS ⚡️ Build success in 1360ms
# ESM ⚡️ Build success in 1364ms  
# DTS ⚡️ Build success in 3307ms
```

3. Validate build artifacts:
```bash
ls dist/
# Expected files:
# index.js (ESM)
# index.cjs (CommonJS)  
# index.d.ts (TypeScript declarations)
# index.d.cts
```

**Benefits**:
- **Dual Format Output**: ESM and CommonJS for maximum compatibility
- **Type Safety**: Complete TypeScript declaration generation
- **Source Maps**: Enhanced debugging capabilities
- **External Dependencies**: Proper externalization of @elizaos/core
- **Clean Build Process**: Automatic cleanup of previous builds

**Section sources**
- [troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_BUILD_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_BUILD_FIXES.md)
- [packages/elizaos-plugins/business-intelligence/tsup.config.ts](file://packages/elizaos-plugins/business-intelligence/tsup.config.ts)
- [packages/elizaos-plugins/business-intelligence/package.json](file://packages/elizaos-plugins/business-intelligence/package.json)

### Business Intelligence Plugin TypeScript Configuration

**Symptom**: Multiple TypeScript configuration errors in the Business Intelligence Plugin including invalid extends path, cross-plugin file inclusion, and missing ES2022 library support.

**Root Cause**: Incorrect relative paths, lack of module isolation, and missing modern JavaScript library support in tsconfig.json.

**Diagnosis**:
1. Check TypeScript configuration:
```bash
cat tsconfig.json
```

2. Test compilation:
```bash
bun run tsc --noEmit
```

3. Verify path resolution:
```bash
ls ../../../tsconfig.base.json
```

**Solution**:
1. Correct extends path:
```json
{
  "extends": "../../../tsconfig.base.json"
}
```

2. Add module isolation exclusions:
```json
{
  "exclude": [
    "node_modules", 
    "dist",
    "**/*.test.ts", 
    "**/*.spec.ts",
    "../nx-workspace/**/*",
    "../cognitive-engine/**/*", 
    "../universal-tool-server/**/*"
  ]
}
```

3. Add ES2022 library support:
```json
{
  "compilerOptions": {
    "lib": ["ES2022", "DOM"]
  }
}
```

**Validation**:
```bash
# Test clean compilation
bun run tsc --noEmit
# Expected: No compilation errors

# Verify build
bun run build
```

**Section sources**
- [troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_TSCONFIG_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_TSCONFIG_FIXES.md)
- [packages/elizaos-plugins/business-intelligence/tsconfig.json](file://packages/elizaos-plugins/business-intelligence/tsconfig.json)
- [tsconfig.base.json](file://tsconfig.base.json)

### Business Intelligence Provider Type Safety

**Symptom**: TypeScript compilation error "'error' is of type 'unknown'" in provider.ts catch block.

**Root Cause**: TypeScript strict mode treats caught errors as 'unknown' type for safety, preventing access to error.message property.

**Diagnosis**:
1. Locate error in code:
```bash
grep -n "catch (error)" packages/elizaos-plugins/business-intelligence/src/provider.ts
```

2. Check TypeScript strict mode:
```bash
grep "strict" tsconfig.json
```

**Solution**:
1. Add proper type assertion:
```typescript
} catch (error) {
  console.error('Failed to provide business context:', error);
  return {
    text: 'Business context temporarily unavailable',
    data: {
      error: (error as Error).message,
      lastUpdated: new Date()
    }
  };
}
```

2. Maintain error handling functionality:
```typescript
// Ensure all error handling paths are covered
try {
  // business logic
} catch (error) {
  // type-safe error handling
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  // return appropriate response
}
```

**Benefits**:
- **Type Safety**: Proper error type assertion ensures TypeScript compliance
- **Functionality Preserved**: All error handling behavior maintained
- **Best Practices**: Follows TypeScript strict mode requirements
- **Production Ready**: Robust error handling for enterprise deployment

**Section sources**
- [troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_PROVIDER_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_PROVIDER_FIXES.md)
- [packages/elizaos-plugins/business-intelligence/src/provider.ts](file://packages/elizaos-plugins/business-intelligence/src/provider.ts)
- [packages/elizaos-plugins/business-intelligence/src/types.ts](file://packages/elizaos-plugins/business-intelligence/src/types.ts)

### Business Intelligence Evaluator Type Safety

**Symptom**: Multiple TypeScript compilation errors in evaluator including undefined message content, handler parameter compatibility, and interface compliance issues.

**Root Cause**: Incomplete type safety checks, incompatible handler signatures, and incorrect interface usage in the evaluation system.

**Diagnosis**:
1. Check evaluator code:
```bash
cat packages/elizaos-plugins/business-intelligence/src/evaluator.ts
```

2. Test compilation:
```bash
bun run tsc --noEmit
```

**Solution**:
1. Add message content safety checks:
```typescript
const messageText = typeof message.content.text === 'string' ? message.content.text.toLowerCase() : '';
```

2. Fix handler function signature:
```typescript
handler: async (runtime: IAgentRuntime, message: Memory, state?: State, options?: any, callback?: any, responses?: Memory[])
```

3. Add ID field safety:
```typescript
messageId: message.id || 'unknown'
```

4. Fix interface compliance:
```typescript
// Use correct property names
{ name: 'user', content: { text: '...' } }
{ prompt: 'Agent provides revenue analysis', ... }
```

**Validation**:
```bash
# Verify clean compilation
bun run tsc --noEmit
# Expected: No compilation errors

# Test evaluator functionality
bun run build
```

**Section sources**
- [troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_EVALUATOR_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_EVALUATOR_FIXES.md)
- [packages/elizaos-plugins/business-intelligence/src/evaluator.ts](file://packages/elizaos-plugins/business-intelligence/src/evaluator.ts)
- [packages/elizaos-plugins/business-intelligence/src/types.ts](file://packages/elizaos-plugins/business-intelligence/src/types.ts)

### Business Intelligence Plugin Export Ambiguity

**Symptom**: TypeScript compilation errors due to export ambiguity conflicts between types and implementations.

**Root Cause**: Both interface definitions and actual implementations have identical export names across different files.

**Diagnosis**:
1. Identify conflicting exports:
```bash
grep -r "export \* from './types'" packages/elizaos-plugins/business-intelligence/
```

2. Check compilation errors:
```bash
bun run tsc --noEmit
```

**Solution**:
1. Use type-only exports for interfaces:
```typescript
export type {
  BusinessMetric,
  BusinessAlert,
  Department,
  BusinessSnapshot,
  AgentInsight,
} from './types';
```

2. Rename ambiguous constants:
```typescript
export { BusinessIntelligenceActions as BusinessIntelligenceActionNames } from './types';
```

3. Use explicit named exports for implementations:
```typescript
export { 
  collectBusinessDataAction,
  generateBusinessAlertAction,
  analyzeBusinessTrendsAction,
  analyzeDepartmentPerformanceAction,
  BusinessIntelligenceActions
} from './actions';

export { BusinessDataProvider } from './provider';
export { BusinessMetricsEvaluator } from './evaluator';
```

**Benefits**:
- **Clear Export Interface**: Unambiguous imports for consuming applications
- **Type Safety**: Full IntelliSense support for developers
- **Plugin Compatibility**: Seamless ElizaOS plugin integration
- **Tree Shaking**: Optimized bundle sizes with explicit exports

**Section sources**
- [troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_INDEX_FIXES.md](file://troubleshooting/integration-fixes/BUSINESS_INTELLIGENCE_INDEX_FIXES.md)
- [packages/elizaos-plugins/business-intelligence/src/index.ts](file://packages/elizaos-plugins/business-intelligence/src/index.ts)
- [packages/elizaos-plugins/business-intelligence/src/types.ts](file://packages/elizaos-plugins/business-intelligence/src/types.ts)

## Agent Failures

### Executive Agent Crashes

**Symptom**: CEO, CFO, CTO, or other executive agents terminate unexpectedly with segmentation faults or memory errors.

**Root Cause**: Memory leaks in long-running agent processes or infinite loops in decision-making logic.

**Diagnosis**:
1. Check agent logs:
```bash
tail -f logs/ceo_mimi.log
tail -f logs/cfo_cash.log
```

2. Monitor memory usage:
```bash
# Linux
top -p $(pgrep -f ceo_mimi)

# macOS
ps aux | grep ceo_mimi
```

**Solution**:
1. Implement memory monitoring in agent base class:
```python
# In base_agent.py
import psutil
import threading

def monitor_memory(self):
    process = psutil.Process()
    while self.running:
        memory_mb = process.memory_info().rss / 1024 / 1024
        if memory_mb > self.memory_limit_mb:
            self.logger.warning(f"Memory usage {memory_mb}MB exceeds limit {self.memory_limit_mb}MB")
            self.trigger_gc()
        time.sleep(30)
```

2. Add memory monitor thread to agent initialization:
```python
# In agent startup
self.memory_monitor = threading.Thread(target=self.monitor_memory, daemon=True)
self.memory_monitor.start()
```

3. Restart agent with memory profiling:
```bash
python -m memory_profiler src/minds371/agents/business/ceo_mimi.py
```

**Section sources**
- [ceo_mimi.py](file://371-os/src/minds371/agents/business/ceo_mimi.py)
- [cfo_cash.py](file://371-os/src/minds371/agents/business/cfo_cash.py)
- [cto_alex.py](file://371-os/src/minds371/agents/business/cto_alex.py)
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)

### Marketing Agent Execution Failures

**Symptom**: Content generation or marketing automation agents fail to produce output or hang during execution.

**Root Cause**: Rate limiting from external APIs, prompt formatting issues, or LLM provider connectivity problems.

**Diagnosis**:
1. Check marketing agent logs:
```bash
tail -f logs/marketing_agent.log
```

2. Test LLM connectivity:
```python
# Test script
from src.minds371.adaptive_llm_router.llm import LLMClient
client = LLMClient()
response = client.generate("Test prompt")
print(response)
```

**Solution**:
1. Implement retry logic with exponential backoff:
```python
# In marketing_automation_agent.py
import time
import random

def execute_with_retry(self, func, max_retries=3):
    for attempt in range(max_retries):
        try:
            return func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise e
            wait_time = (2 ** attempt) + random.uniform(0, 1)
            time.sleep(wait_time)
```

2. Configure fallback LLM providers:
```python
# In adaptive LLM router configuration
fallback_providers = ["openai", "anthropic", "cohere"]
```

3. Validate prompt templates:
```python
# Ensure prompt variables are properly formatted
def validate_prompt(self, prompt, required_vars):
    missing = [var for var in required_vars if f"{{{var}}}" not in prompt]
    if missing:
        raise ValueError(f"Missing variables in prompt: {missing}")
```

**Section sources**
- [content_generation_agent.py](file://371-os/src/minds371/agents/marketing/content_generation_agent.py)
- [marketing_automation_agent.py](file://371-os/src/minds371/agents/marketing/marketing_automation_agent.py)
- [adaptive_llm_router_example.py](file://371-os/src/minds371/adaptive_llm_router/adaptive_llm_router_example.py)

### Technical Agent Deployment Failures

**Symptom**: Deployment or QA agents fail to execute technical tasks like code deployment or testing.

**Root Cause**: Missing credentials, incorrect environment configuration, or dependency conflicts.

**Diagnosis**:
1. Check deployment agent logs:
```bash
tail -f logs/deployment_agent.log
```

2. Verify credential storage:
```bash
ls -la src/minds371/agents/utility/credentials/
```

**Solution**:
1. Configure credential warehouse agent:
```python
# In credential_warehouse_agent.py
def get_credentials(self, service_name):
    """Retrieve credentials for specified service"""
    if service_name in self.credentials:
        return self.credentials[service_name]
    else:
        raise CredentialNotFoundError(f"No credentials found for {service_name}")
```

2. Ensure proper credential loading:
```python
# In deployment agent initialization
self.credentials = self.agent_coordinator.get_agent("credential_warehouse").get_credentials("aws")
```

3. Test connection before execution:
```python
# In deployment_agent.py
def test_connection(self):
    try:
        # Test AWS connection
        import boto3
        client = boto3.client('ec2', 
                            aws_access_key_id=self.credentials['access_key'],
                            aws_secret_access_key=self.credentials['secret_key'])
        client.describe_regions()
        return True
    except Exception as e:
        self.logger.error(f"Connection test failed: {e}")
        return False
```

**Section sources**
- [deployment_agent.py](file://371-os/src/minds371/agents/technical/deployment_agent.py)
- [qa_agent.py](file://371-os/src/minds371/agents/technical/qa_agent.py)
- [credential_warehouse_agent.py](file://371-os/src/minds371/agents/utility/credential_warehouse_agent.py)

## Performance Problems

### High Latency in Agent Coordination

**Symptom**: Delays in agent-to-agent communication and task handoff, causing slow overall system response.

**Root Cause**: Network serialization overhead, inefficient message passing, or blocking I/O operations in the agent coordination layer.

**Diagnosis**:
1. Profile agent communication:
```bash
python -m cProfile -s cumulative src/minds371/371OS_launch/371_os_launcher.py
```

2. Monitor message queue:
```bash
# Check RabbitMQ or equivalent
rabbitmqctl list_queues
```

**Solution**:
1. Optimize message serialization:
```python
# Use efficient serialization (e.g., msgpack instead of JSON)
import msgpack

class OptimizedMessageBus:
    def serialize(self, message):
        return msgpack.dumps(message)
    
    def deserialize(self, data):
        return msgpack.loads(data)
```

2. Implement asynchronous message passing:
```python
# In agent base class
import asyncio

async def send_message_async(self, recipient, message):
    await self.message_bus.send(recipient, message)

async def process_messages_async(self):
    while self.running:
        message = await self.message_queue.get()
        await self.handle_message(message)
```

3. Tune message batch size:
```python
# In message bus configuration
MESSAGE_BATCH_SIZE = 10  # Process messages in batches
BATCH_TIMEOUT = 0.1      # Maximum wait time for batch
```

**Section sources**
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py)
- [router_agent.py](file://371-os/src/minds371/agents/utility/router_agent.py)

### LLM Response Time Degradation

**Symptom**: Increasing response times from LLM providers, affecting agent decision-making speed.

**Root Cause**: Provider rate limiting, suboptimal provider selection, or inefficient prompt engineering.

**Diagnosis**:
1. Monitor LLM response times:
```python
# In usage ledger
from src.minds371.adaptive_llm_router.usage_ledger import UsageLedger
ledger = UsageLedger()
stats = ledger.get_provider_performance()
print(stats)
```

2. Check rate limit status:
```python
# In LLM client
client = LLMClient()
rate_info = client.get_rate_limit_status()
```

**Solution**:
1. Implement adaptive provider selection:
```python
# In intelligent_router_agent.py
def select_provider(self, request):
    """Select optimal provider based on current performance and cost"""
    available_providers = self.get_available_providers()
    
    # Score providers by response time, cost, and reliability
    scores = {}
    for provider in available_providers:
        performance = self.usage_ledger.get_recent_response_time(provider)
        cost = self.pricing.get_cost(provider, request.tokens)
        reliability = self.monitor.get_success_rate(provider)
        
        # Weighted score (adjust weights as needed)
        score = (0.4 * (1/performance)) + (0.3 * (1/cost)) + (0.3 * reliability)
        scores[provider] = score
    
    return max(scores, key=scores.get)
```

2. Cache frequent responses:
```python
# In LLM client
from functools import lru_cache

@lru_cache(maxsize=1000)
def generate_cached(self, prompt, model=None):
    return self.generate(prompt, model)
```

3. Pre-warm provider connections:
```python
# Initialize connections during startup
def warmup_providers(self):
    for provider in self.providers:
        try:
            self.client.generate("Hello", provider=provider, max_tokens=5)
        except:
            continue
```

**Section sources**
- [intelligent_router_agent.py](file://371-os/src/minds371/adaptive_llm_router/intelligent_router_agent.py)
- [usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py)
- [config.py](file://371-os/src/minds371/adaptive_llm_router/config.py)

## Security Errors

### Authentication Failures in Agent Communication

**Symptom**: Agents cannot authenticate with each other, receiving "Unauthorized" or "Invalid token" errors.

**Root Cause**: Expired authentication tokens, misconfigured security policies, or certificate issues in the agent network.

**Diagnosis**:
1. Check security logs:
```bash
tail -f logs/security.log
```

2. Verify token validity:
```python
# Decode JWT token
import jwt
token = "your_token_here"
decoded = jwt.decode(token, options={"verify_signature": False})
print(decoded)
```

**Solution**:
1. Implement token refresh mechanism:
```python
# In security middleware
class TokenManager:
    def __init__(self, refresh_threshold=300):  # Refresh 5 minutes before expiry
        self.refresh_threshold = refresh_threshold
    
    def should_refresh(self, token):
        decoded = jwt.decode(token, options={"verify_signature": False})
        expires_at = decoded['exp']
        now = time.time()
        return (expires_at - now) < self.refresh_threshold
    
    def refresh_token(self, old_token):
        # Implement refresh logic
        pass
```

2. Configure proper certificate authority:
```python
# In agent configuration
SECURITY_CONFIG = {
    "ca_cert": "certs/ca.crt",
    "cert_validation": True,
    "allowed_ciphers": "HIGH:!aNULL:!MD5",
    "protocol": "TLSv1.2"
}
```

3. Rotate credentials regularly:
```python
# In credential warehouse
def rotate_credentials(self, service_name):
    """Rotate credentials for specified service"""
    new_creds = self.generate_new_credentials(service_name)
    self.store_credentials(service_name, new_creds)
    self.notify_dependent_agents(service_name)
    return new_creds
```

**Section sources**
- [credential_warehouse_agent.py](file://371-os/src/minds371/agents/utility/credential_warehouse_agent.py)
- [policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py)
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)

### Data Leakage in Agent Prompts

**Symptom**: Sensitive information appears in LLM requests or agent logs.

**Root Cause**: Inadequate data sanitization in prompt construction or logging mechanisms.

**Diagnosis**:
1. Audit prompt construction:
```python
# In agent code, check for sensitive data
def create_prompt(self, context):
    # Ensure no sensitive data is included
    safe_context = self.sanitize_context(context)
    return self.template.format(**safe_context)
```

2. Review log output:
```bash
grep -i "password\|key\|secret" logs/*.log
```

**Solution**:
1. Implement data sanitization:
```python
# In base agent
SENSITIVE_PATTERNS = [
    r'password\s*=\s*["\'][^"\']*["\']',
    r'api[_-]?key\s*=\s*["\'][^"\']*["\']',
    r'secret\s*=\s*["\'][^"\']*["\']',
]

def sanitize_context(self, context):
    """Remove sensitive information from context"""
    if isinstance(context, str):
        for pattern in SENSITIVE_PATTERNS:
            context = re.sub(pattern, r'\1="***REDACTED***"', context)
    elif isinstance(context, dict):
        sanitized = {}
        for k, v in context.items():
            if any(sensitive in k.lower() for sensitive in ['password', 'key', 'secret']):
                sanitized[k] = "***REDACTED***"
            else:
                sanitized[k] = self.sanitize_context(v)
        context = sanitized
    return context
```

2. Configure secure logging:
```python
# In logging configuration
LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "secure": {
            "format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            "filters": ["sensitive_data"]
        }
    },
    "filters": {
        "sensitive_data": {
            "()": "src.minds371.agents.utility.SensitiveDataFilter"
        }
    }
}
```

**Section sources**
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)
- [credential_warehouse_agent.py](file://371-os/src/minds371/agents/utility/credential_warehouse_agent.py)
- [router_agent.py](file://371-os/src/minds371/agents/utility/router_agent.py)

## LLM Routing and Budget Management

### Adaptive Router Not Selecting Optimal Providers

**Symptom**: The adaptive LLM router consistently selects suboptimal providers, leading to higher costs or slower responses.

**Root Cause**: Outdated performance metrics, incorrect cost calculations, or misconfigured routing policies.

**Diagnosis**:
1. Check router decision logs:
```bash
tail -f logs/intelligent_router.log
```

2. Review provider performance data:
```python
# In usage ledger
from src.minds371.adaptive_llm_router.usage_ledger import UsageLedger
ledger = UsageLedger()
provider_stats = ledger.get_all_provider_stats()
for provider, stats in provider_stats.items():
    print(f"{provider}: {stats['avg_response_time']:.2f}s, ${stats['cost_per_1k_tokens']:.4f}")
```

**Solution**:
1. Update performance metrics regularly:
```python
# In usage ledger
def update_provider_stats(self, provider, response_time, cost):
    """Update provider performance statistics"""
    if provider not in self.provider_stats:
        self.provider_stats[provider] = {
            "response_times": deque(maxlen=100),
            "success_rates": deque(maxlen=100),
            "costs": deque(maxlen=1000)
        }
    
    self.provider_stats[provider]["response_times"].append(response_time)
    self.provider_stats[provider]["costs"].append(cost)
    
    # Save to persistent storage
    self.save_stats()
```

2. Implement dynamic weighting:
```python
# In intelligent router
def calculate_provider_score(self, provider, request_type):
    """Calculate score for provider based on multiple factors"""
    stats = self.usage_ledger.get_provider_stats(provider)
    
    # Normalize metrics to 0-1 scale
    response_time_score = max(0, 1 - (stats['avg_response_time'] / 10))  # Assume 10s max
    cost_score = max(0, 1 - (stats['cost_per_1k_tokens'] / 0.1))  # Assume $0.10 max
    reliability_score = stats['success_rate']
    
    # Dynamic weights based on request type
    weights = self.get_weights_for_request_type(request_type)
    
    final_score = (
        weights['response_time'] * response_time_score +
        weights['cost'] * cost_score +
        weights['reliability'] * reliability_score
    )
    
    return final_score
```

3. Add manual override capability:
```python
# In router configuration
ROUTING_OVERRIDES = {
    "emergency": ["openai"],  # Always use OpenAI for critical tasks
    "creative": ["anthropic"],  # Prefer Anthropic for creative tasks
    "budget": ["cohere", "openrouter"]  # Use cheaper providers for routine tasks
}
```

**Section sources**
- [intelligent_router_agent.py](file://371-os/src/minds371/adaptive_llm_router/intelligent_router_agent.py)
- [usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py)
- [policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py)
- [budget_guard.py](file://371-os/src/minds371/adaptive_llm_router/budget_guard.py)

### Budget Exceedance Alerts Not Triggering

**Symptom**: The system exceeds configured budget limits without triggering alerts or mitigation actions.

**Root Cause**: Budget tracking not properly integrated with the LLM usage system or alert thresholds incorrectly configured.

**Diagnosis**:
1. Check budget guard logs:
```bash
tail -f logs/budget_guard.log
```

2. Verify usage tracking:
```python
# In usage ledger
from src.minds371.adaptive_llm_router.usage_ledger import UsageLedger
ledger = UsageLedger()
current_usage = ledger.get_monthly_cost()
print(f"Current monthly cost: ${current_usage:.4f}")
```

**Solution**:
1. Ensure proper usage tracking integration:
```python
# In LLM client
def generate(self, prompt, **kwargs):
    # Record request
    request_cost = self.estimate_cost(prompt, **kwargs)
    self.usage_ledger.record_request(
        provider=self.current_provider,
        tokens=len(prompt.split()),
        cost=request_cost
    )
    
    # Make request
    response = self._make_request(prompt, **kwargs)
    
    # Record response
    response_cost = self.estimate_cost(response, is_response=True)
    self.usage_ledger.record_response(
        provider=self.current_provider,
        tokens=len(response.split()),
        cost=response_cost
    )
    
    # Check budget
    self.budget_guard.check_limits()
    
    return response
```

2. Configure budget thresholds:
```python
# In budget guard
BUDGET_CONFIG = {
    "daily_limit": 10.00,      # $10 per day
    "monthly_limit": 250.00,   # $250 per month
    "warning_threshold": 0.8,  # Warn at 80% of limit
    "action_threshold": 0.95,  # Take action at 95% of limit
    "actions": {
        "95%": "switch_to_cheaper_providers",
        "100%": "pause_non_essential_requests"
    }
}
```

3. Implement budget enforcement:
```python
# In budget guard
def check_limits(self):
    """Check current usage against budget limits"""
    daily_usage = self.usage_ledger.get_daily_cost()
    monthly_usage = self.usage_ledger.get_monthly_cost()
    
    daily_limit = self.config["daily_limit"]
    monthly_limit = self.config["monthly_limit"]
    
    # Daily check
    if daily_usage > daily_limit:
        self.trigger_emergency_action("daily_limit_exceeded")
        return False
    
    # Monthly check
    if monthly_usage > monthly_limit:
        self.trigger_emergency_action("monthly_limit_exceeded")
        return False
    
    # Warning checks
    if daily_usage > daily_limit * self.config["warning_threshold"]:
        self.send_alert("daily_budget_warning", daily_usage, daily_limit)
    
    if monthly_usage > monthly_limit * self.config["warning_threshold"]:
        self.send_alert("monthly_budget_warning", monthly_usage, monthly_limit)
    
    return True
```

**Section sources**
- [budget_guard.py](file://371-os/src/minds371/adaptive_llm_router/budget_guard.py)
- [usage_ledger.py](file://371-os/src/minds371/adaptive_llm_router/usage_ledger.py)
- [financial_agent.py](file://371-os/src/minds371/agents/utility/financial_agent.py)

## Frequently Asked Questions

### What are the system requirements for running 371OS?

**Answer**: 371OS requires:
- Python 3.10 or higher
- At least 8GB of RAM (16GB recommended for production)
- 2+ CPU cores
- 1GB of free disk space
- Internet connectivity for LLM provider access
- Optional: Docker for containerized deployment

The system can run on desktops, servers, or cloud instances. For optimal performance with multiple agents, a machine with 16GB+ RAM and 4+ CPU cores is recommended.

**Section sources**
- [GETTING_STARTED.md](file://GETTING_STARTED.md)
- [README.md](file://README.md)

### How does the adaptive LLM router work?

**Answer**: The adaptive LLM router dynamically selects the optimal LLM provider based on multiple factors:
1. **Performance**: Historical response times for each provider
2. **Cost**: Current pricing and token usage
3. **Reliability**: Success rate and error frequency
4. **Task type**: Different providers excel at different tasks
5. **Budget constraints**: Current usage against configured limits

The router continuously monitors provider performance and adjusts its selection algorithm to optimize for the configured priorities (speed, cost, or reliability).

**Section sources**
- [Adaptive_Router_Logic.md](file://371-os/Adaptive_Router_Logic.md)
- [intelligent_router_agent.py](file://371-os/src/minds371/adaptive_llm_router/intelligent_router_agent.py)
- [policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py)

### Can I add custom agents to the system?

**Answer**: Yes, 371OS supports custom agent development. To create a custom agent:

1. Create a new Python file in the appropriate agents directory:
```bash
mkdir -p src/minds371/agents/custom
touch src/minds371/agents/custom/my_agent.py
```

2. Implement your agent class:
```python
from src.minds371.agents.base_agent.base_agent import BaseAgent

class MyCustomAgent(BaseAgent):
    def __init__(self, config=None):
        super().__init__("MyAgent", config)
    
    def execute_task(self, task):
        # Implement your custom logic
        result = self.perform_custom_operation(task.data)
        return {"status": "completed", "result": result}
```

3. Register your agent in the system configuration.

4. Add a prompt template in the prompts directory.

Custom agents inherit all the base functionality including LLM integration, security, and monitoring.

**Section sources**
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py)
- [improved-base-agent.md](file://371-os/src/minds371/agents/base_agent/improved-base-agent.md)

### How is data privacy handled in 371OS?

**Answer**: 371OS implements multiple layers of data privacy protection:

1. **Data minimization**: Only necessary data is sent to LLMs
2. **Content filtering**: Sensitive information is redacted before transmission
3. **Encryption**: Data is encrypted in transit and at rest
4. **Access controls**: Role-based access to agent data and functionality
5. **Audit logging**: All data access and modifications are logged
6. **Local processing**: Sensitive operations can be configured to use local LLMs

The system follows a zero-trust security model where all data access is explicitly authorized and monitored.

**Section sources**
- [policy_engine.py](file://371-os/src/minds371/adaptive_llm_router/policy_engine.py)
- [credential_warehouse_agent.py](file://371-os/src/minds371/agents/utility/credential_warehouse_agent.py)
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)

### What LLM providers are supported?

**Answer**: 371OS currently supports:
- OpenAI (GPT-3.5, GPT-4)
- Anthropic (Claude)
- Google (PaLM, Gemini)
- Cohere
- OpenRouter (aggregated access to multiple providers)
- Local LLMs via Ollama

New providers can be added by implementing the LLM provider interface and registering them in the provider registry.

**Section sources**
- [providers.json](file://371-os/src/minds371/adaptive_llm_router/providers.json)
- [llm.py](file://371-os/src/minds371/adaptive_llm_router/llm.py)
- [provider_registry.py](file://371-os/src/minds371/adaptive_llm_router/provider_registry.py)

## Known Limitations and Workarounds

### Limited Support for Stateful Agent Interactions

**Limitation**: The current agent coordination system has limited support for complex, stateful interactions between agents.

**Workaround**: Use the router agent as a coordination hub:
```python
# Instead of direct agent-to-agent calls
result = agent_a.execute(task)
final_result = agent_b.process(result)

# Use the router for state management
coordinator = self.agent_coordinator.get_agent("router")
workflow_id = coordinator.create_workflow("complex_task")
coordinator.add_step(workflow_id, agent_a, task_part1)
coordinator.add_step(workflow_id, agent_b, task_part2)
result = coordinator.execute_workflow(workflow_id)
```

**Section sources**
- [router_agent.py](file://371-os/src/minds371/agents/utility/router_agent.py)
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)

### Cold Start Latency for Adaptive Router

**Limitation**: The adaptive router requires historical data to make optimal decisions, leading to suboptimal choices during initial system operation.

**Workaround**: Implement default provider mappings:
```python
# In router configuration
DEFAULT_PROVIDER_MAP = {
    "creative_writing": "anthropic",
    "code_generation": "openai",
    "data_analysis": "google",
    "business_strategy": "openai",
    "technical_qa": "openrouter"
}

# Use defaults until sufficient data is collected
if self.usage_ledger.data_collection_period_complete():
    return self.intelligent_selection(request)
else:
    return self.get_default_provider(request.purpose)
```

**Section sources**
- [intelligent_router_agent.py](file://371-os/src/minds371/adaptive_llm_router/intelligent_router_agent.py)
- [config.py](file://371-os/src/minds371/adaptive_llm_router/config.py)

### Memory Usage Growth in Long-Running Agents

**Limitation**: Some agents exhibit gradual memory usage growth during extended operation.

**Workaround**: Implement periodic agent restarts:
```python
# In agent base class
def start_memory_monitoring(self):
    self.memory_monitor = threading.Thread(target=self._memory_monitor_loop, daemon=True)
    self.memory_monitor.start()

def _memory_monitor_loop(self):
    while self.running:
        current_memory = self.get_memory_usage()
        if current_memory > self.config.get("max_memory_mb", 1024):
            self.logger.warning(f"Memory limit exceeded: {current_memory}MB")
            self.restart()
        time.sleep(300)  # Check every 5 minutes
```

**Section sources**
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py)

## Debugging and Diagnostic Tools

### Log Analysis

371OS generates comprehensive logs for all system components. Key log files include:

- `logs/system.log`: Overall system operation
- `logs/agent_name.log`: Individual agent logs
- `logs/router.log`: LLM routing decisions
- `logs/security.log`: Security events and access attempts
- `logs/performance.log`: Performance metrics and bottlenecks

Use the following commands to analyze logs:
```bash
# Monitor logs in real-time
tail -f logs/*.log

# Search for errors
grep -i "error\|exception\|fail" logs/*.log

# Analyze router decisions
grep "selected provider" logs/router.log | tail -20
```

**Section sources**
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)
- [intelligent_router_agent.py](file://371-os/src/minds371/adaptive_llm_router/intelligent_router_agent.py)

### Performance Profiling

Use Python's cProfile to identify performance bottlenecks:
```bash
python -m cProfile -o profile_output.prof src/minds371/371OS_launch/371_os_launcher.py

# Analyze results
python -c "
import pstats
p = pstats.Stats('profile_output.prof')
p.sort_stats('cumulative').print_stats(20)
"
```

For line-by-line profiling, use line_profiler:
```bash
# Add @profile decorator to functions of interest
@profile
def function_to_profile(self):
    # function code

# Run with line profiler
kernprof -l -v src/minds371/371OS_launch/371_os_launcher.py
```

**Section sources**
- [base_agent.py](file://371-os/src/minds371/agents/base_agent/base_agent.py)
- [improved_base_agent.py](file://371-os/src/minds371/agents/base_agent/improved_base_agent.py)

### Diagnostic Scripts

The system includes diagnostic scripts to check various components:

1. **System health check**:
```bash
python scripts/diagnostic/system_health.py
```

2. **LLM connectivity test**:
```bash
python scripts/diagnostic/llm_connectivity.py
```

3. **Agent availability check**:
```bash
python scripts/diagnostic/agent_status.py
```

4. **Performance benchmark**:
```bash
python scripts/diagnostic/performance_benchmark.py
```

These scripts provide detailed output about system status and can be used to quickly identify issues.

**Section sources**
- [scripts/diagnostic/*.py](file://371-os/scripts/diagnostic/)
- [tests/performance/benchmark.py](file://371-os/tests/performance/benchmark.py)

## Support and Escalation

### Issue Reporting

When reporting issues, include the following information:
1. System configuration (OS, Python version, hardware)
2. 371OS version
3. Steps to reproduce the issue
4. Relevant log excerpts
5. Expected vs. actual behavior
6. Screenshots (if applicable)

Submit issues through the GitHub repository or contact support@371os.com.

### Escalation Path

For unresolved issues, follow this escalation path:

1. **Level 1 Support**: Community forums and documentation
2. **Level 2 Support**: Email support with detailed issue report
3. **Level 3 Support**: Direct engineering team consultation
4. **Emergency Support**: Critical issue hotline (for enterprise customers)

Enterprise customers have access to priority support with guaranteed response times.

### Monitoring and Alerting

Implement monitoring for production deployments:

1. **System metrics**: CPU, memory, disk usage
2. **Agent status**: Running agents, error rates
3. **LLM performance**: Response times, error rates by provider
4. **Budget usage**: Daily and monthly spending
5. **Security events**: Authentication failures, access attempts

Use tools like Prometheus/Grafana or Datadog for comprehensive monitoring.

**Section sources**
- [README.md](file://README.md)
- [GETTING_STARTED.md](file://GETTING_STARTED.md)
- [COMMANDS.md](file://COMMANDS.md)