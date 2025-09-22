# Development Environment Setup

<cite>
**Referenced Files in This Document**   
- [README.md](file://README.md)
- [scripts/quick-start.sh](file://scripts\quick-start.sh)
- [scripts/quick-start.ps1](file://scripts\quick-start.ps1)
- [scripts/test-setup.ps1](file://scripts\test-setup.ps1) - *Added in recent commit*
- [nx.json](file://nx.json)
- [371-os/src/minds371/pyproject.toml](file://371-os/src/minds371/pyproject.toml)
- [371-os/src/minds371/services/email_system/package.json](file://371-os/src/minds371/services/email_system/package.json)
- [371-os/src/minds371/adaptive_llm_router/config.py](file://371-os/src/minds371/adaptive_llm_router/config.py)
- [elizaos/CLI Reference/Commands/Environment Configuration.md](file://elizaos\CLI Reference\Commands\Environment Configuration.md)
- [packages/elizaos-plugins/nx-workspace/src/provider.ts](file://packages\elizaos-plugins\nx-workspace\src\provider.ts)
- [packages/elizaos-plugins/nx-workspace/src/actions.ts](file://packages\elizaos-plugins\nx-workspace\src\actions.ts)
- [package.json](file://package.json) - *Updated with new scripts and linting configuration*
- [.eslintrc.json](file://.eslintrc.json) - *Added in recent commit*
- [.eslintignore](file://.eslintignore) - *Added in recent commit*
- [.prettierrc](file://.prettierrc) - *Added in recent commit*
- [.prettierignore](file://.prettierignore) - *Added in recent commit*
- [AB/scripts/quick-status.js](file://AB\scripts\quick-status.js) - *Updated in recent commit*
- [AB/BUN-INTEGRATION-GUIDE.md](file://AB\BUN-INTEGRATION-GUIDE.md) - *Added in recent commit*
- [AB/scripts/bun-install.ps1](file://AB\scripts\bun-install.ps1) - *Added in recent commit*
- [.qoder/rules/qoderosrules.md](file://.qoder\rules\qoderosrules.md) - *Updated with Bun integration guidance*
- [371-os/src/minds371/comet/Create Dedicated Workspaces.js](file://371-os/src/minds371/comet/Create Dedicated Workspaces.js) - *Added in recent commit*
- [BUN_WATCH_MIGRATION.md](file://BUN_WATCH_MIGRATION.md) - *Added in recent commit*
- [AB/sessions/session-2025-09-07-bun-watch-migration.md](file://AB\sessions\session-2025-09-07-bun-watch-migration.md) - *Added in recent commit*
- [tools/development/bun-install.ps1](file://tools\development\bun-install.ps1) - *Renamed from AB/scripts/bun-install.ps1*
- [tools/development/fix-npm-install.ps1](file://tools\development\fix-npm-install.ps1) - *Renamed from AB/scripts/fix-npm-install.ps1*
- [tools/development/optimize-bun-windows.ps1](file://tools\development\optimize-bun-windows.ps1) - *Renamed from AB/scripts/optimize-bun-windows.ps1*
- [tools/development/quick-status.js](file://tools\development\quick-status.js) - *Renamed from AB/scripts/quick-status.js*
- [tools/development/simple-install.ps1](file://tools\development\simple-install.ps1) - *Renamed from AB/scripts/simple-install.ps1*
</cite>

## Update Summary
**Changes Made**   
- Updated Prerequisites section to emphasize Bun as the default package manager
- Enhanced Automated Setup section with new Bun installation scripts and workflows
- Added detailed information about workspace configuration for agent development
- Updated command examples throughout to reflect Bun usage
- Enhanced troubleshooting guidance with new Bun-specific solutions
- Improved integration between Bun Integration and System Health Check sections
- Added new section on development rules and conventions from qoderosrules.md
- **Updated Development Server Optimization section** to reflect migration from nodemon/ts-node to Bun's built-in watcher
- **Added new section on Bun Watch Migration** detailing the transition to Bun's native watcher
- **Updated Common Setup Commands** with new watch commands using `bun --watch`
- **Enhanced Performance Optimization** with updated hot reload performance metrics
- **Updated script paths** in all sections to reflect the migration of development tools from AB/scripts to tools/development
- **Updated references** to bun-install.ps1, fix-npm-install.ps1, optimize-bun-windows.ps1, quick-status.js, and simple-install.ps1 to their new locations
- **Enhanced Automated Setup section** with details about the new script organization and optimized Windows workflows

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Automated Setup](#automated-setup)
3. [Manual Setup](#manual-setup)
4. [Nx Monorepo Structure](#nx-monorepo-structure)
5. [Working with Affected Projects](#working-with-affected-projects)
6. [Configuration and Environment Variables](#configuration-and-environment-variables)
7. [Common Setup Commands](#common-setup-commands)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Performance Optimization](#performance-optimization)
10. [Environment Validation and Testing](#environment-validation-and-testing)
11. [Code Quality and Formatting Configuration](#code-quality-and-formatting-configuration)
12. [Bun Integration](#bun-integration)
13. [System Health Check](#system-health-check)
14. [Development Rules and Conventions](#development-rules-and-conventions)
15. [Bun Watch Migration](#bun-watch-migration)

## Prerequisites

Before setting up the 371OS development environment, ensure you have the following prerequisites installed:

- **Node.js 18+**: Required for running JavaScript/TypeScript applications and npm packages
- **Git**: For version control and repository cloning
- **Python 3.11+**: Required for Python-based components and agents
- **Docker**: For containerization and deployment
- **MetaMask or Ethereum wallet**: For blockchain interactions and smart contract deployment
- **Bun**: The default package manager for 371OS, providing lightning-fast dependency installation
- **Comet**: Workspace management tool for agent development environments

The repository uses a combination of Node.js and Python technologies, with Nx managing the monorepo structure. The development environment supports both Unix-like systems (via shell scripts) and Windows (via PowerShell scripts). The recent addition of Bun as the default package manager establishes a new standard for rapid development workflows. Additionally, Comet provides dedicated workspaces for different agent development phases.

**Section sources**
- [README.md](file://README.md)
- [scripts/quick-start.sh](file://scripts\quick-start.sh)
- [scripts/quick-start.ps1](file://scripts\quick-start.ps1)
- [AB/BUN-INTEGRATION-GUIDE.md](file://AB\BUN-INTEGRATION-GUIDE.md) - *Added in recent commit*
- [.qoder/rules/qoderosrules.md](file://.qoder\rules\qoderosrules.md) - *Updated with Bun integration guidance*

## Automated Setup

The 371OS repository provides automated setup scripts for both Unix-like systems and Windows, enabling a quick and consistent development environment configuration.

### Shell Script Setup (Linux/macOS)
For Unix-like systems, use the `quick-start.sh` script:

```bash
# Clone the repository
git clone https://github.com/371-Minds/os.git
cd os

# Make the script executable and run it
chmod +x scripts/quick-start.sh
./scripts/quick-start.sh
```

The shell script performs the following operations:
1. Checks for required prerequisites (Node.js, Git)
2. Installs dependencies via `bun install`
3. Creates environment configuration file (.env) with interactive prompts
4. Builds all packages using Nx with `bun nx run-many -t build`
5. Sets up agent configurations in the `agents` directory
6. Creates Docker configurations for deployment
7. Sets up monitoring scripts

### PowerShell Script Setup (Windows)
For Windows systems, use the `quick-start.ps1` script:

```powershell
# Clone the repository
git clone https://github.com/371-Minds/os.git
cd os

# Run the PowerShell script
.\scripts\quick-start.ps1
```

The PowerShell script performs equivalent operations to the shell script:
1. Validates prerequisites (Node.js, Git)
2. Installs dependencies with `bun install`
3. Creates and secures the `.env` configuration file
4. Builds packages using Nx
5. Configures agent ecosystem
6. Sets up monitoring capabilities

Both scripts provide progress tracking and success indicators, ensuring users can monitor the setup process. The PowerShell version includes additional security measures by setting file access controls on the `.env` file.

**Section sources**
- [scripts/quick-start.sh](file://scripts\quick-start.sh)
- [scripts/quick-start.ps1](file://scripts\quick-start.ps1)
- [tools/development/bun-install.ps1](file://tools\development\bun-install.ps1) - *Moved from AB/scripts/bun-install.ps1*

## Manual Setup

For users who prefer manual configuration or need to troubleshoot automated setup issues, follow these step-by-step instructions:

### Step 1: Clone Repository and Install Dependencies
```bash
git clone https://github.com/371-Minds/os.git
cd os
bun install
```

This installs all Node.js dependencies specified in the various `package.json` files throughout the repository using Bun, which is 50x faster than npm.

### Step 2: Configure Python Environment
The project requires Python 3.11+ and specific Python packages. Install dependencies using pip:

```bash
cd 371-os/src/minds371
pip install -e .
```

Alternatively, use pip directly with the pyproject.toml file:

```bash
pip install -r requirements.txt
```

### Step 3: Environment Configuration
Create a `.env` file based on the example configuration:

```bash
cp .env.example .env
```

Edit the `.env` file to include your specific configuration values for blockchain, IPFS, and Akash Network services. Key environment variables include:

- `ETHEREUM_RPC_URL`: Ethereum node connection string
- `PRIVATE_KEY`: Wallet private key for blockchain transactions
- `IPFS_API_KEY` and `IPFS_API_SECRET`: Credentials for IPFS services
- `AKASH_KEYRING_BACKEND`, `AKASH_CHAIN_ID`, `AKASH_NODE`: Akash Network configuration
- `PORT`: Local development server port (default: 3000)

### Step 4: Build the Workspace
Use Nx to build all packages in the monorepo:

```bash
bun nx run-many -t build
```

### Step 5: Start Development Environment
Launch the development server:

```bash
bun run start:dev
```

**Section sources**
- [README.md](file://README.md)
- [371-os/src/minds371/pyproject.toml](file://371-os/src/minds371/pyproject.toml)
- [package.json](file://package.json) - *Updated with Bun configuration*

## Nx Monorepo Structure

The 371OS repository utilizes Nx to manage a monorepo architecture, enabling efficient development across multiple interrelated projects.

### Workspace Layout
The `nx.json` configuration file defines the workspace structure:

```json
{
  "workspaceLayout": {
    "appsDir": "apps",
    "libsDir": "packages"
  }
}
```

This configuration organizes the repository with:
- **apps**: Application projects that can be built and deployed independently
- **packages**: Shared libraries and reusable components

### Target Defaults and Caching
Nx is configured with caching enabled for key operations:

```json
"targetDefaults": {
  "build": {
    "cache": true,
    "dependsOn": ["^build"],
    "inputs": ["production", "^production"]
  },
  "test": {
    "cache": true,
    "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"]
  },
  "lint": {
    "cache": true,
    "inputs": ["default", "{workspaceRoot}/.eslintrc.json", "{workspaceRoot}/.eslintignore"]
  }
}
```

This configuration ensures that:
- Build, test, and lint operations are cached for improved performance
- Build operations depend on upstream project builds
- Input hashing considers relevant files for cache invalidation

### Plugins and Generators
The workspace uses Nx plugins for enhanced functionality:

```json
"plugins": [
  {
    "plugin": "@nx/js",
    "options": {
      "analyzeSourceFiles": true
    }
  },
  {
    "plugin": "@nx/eslint/plugin",
    "options": {
      "targetName": "lint"
    }
  }
]
```

The `@nx/js` plugin provides JavaScript/TypeScript project support, while `@nx/eslint/plugin` integrates ESLint for code quality.

```
mermaid
graph TB
subgraph "Monorepo Structure"
A[apps/] --> |Contains| B[Application Projects]
C[packages/] --> |Contains| D[Shared Libraries]
E[nx.json] --> |Configures| F[Workspace Layout]
G[package.json] --> |Defines| H[Dependencies]
end
I[Nx CLI] --> |Executes| J[Build]
I --> |Executes| K[Test]
I --> |Executes| L[Lint]
J --> |Uses| M[Caching]
K --> |Uses| M
L --> |Uses| M
style A fill:#f9f,stroke:#333
style C fill:#f9f,stroke:#333
style E fill:#bbf,stroke:#333
style G fill:#bbf,stroke:#333
style I fill:#f96,stroke:#333
```

**Diagram sources**
- [nx.json](file://nx.json)

**Section sources**
- [nx.json](file://nx.json)

## Working with Affected Projects

Nx provides powerful "affected" analysis capabilities that identify which projects have changed since a specific baseline, enabling efficient development workflows.

### Affected Analysis Commands
The primary commands for working with affected projects are:

```bash
# Build only projects affected by changes since main branch
bun nx affected -t build --base=main

# Test only affected projects
bun nx affected -t test --base=main

# Visualize the dependency graph of affected projects
bun nx graph --affected --base=main
```

### Implementation in 371OS
The `NxWorkspaceProvider` class in the ElizaOS plugin system implements affected project analysis:

```typescript
async findAffectedProjects(base: string = 'main'): Promise<NxAffectedProjects> {
  try {
    // Get affected applications
    const projectsOutput = execSync(`bun nx affected:apps --base=${base} --plain`, {
      cwd: this.workspaceRoot,
      encoding: 'utf-8'
    });
    
    // Get affected libraries  
    const libsOutput = execSync(`bun nx affected:libs --base=${base} --plain`, {
      cwd: this.workspaceRoot,
      encoding: 'utf-8'
    });
    
    // Parse project names
    const apps = projectsOutput.trim().split('\n').filter(line => line.trim());
    const libs = libsOutput.trim().split('\n').filter(line => line.trim());
    const projects = [...apps, ...libs].filter(project => project !== '');
    
    return {
      projects,
      tasks: projects.map(project => ({
        id: `${project}:build`,
        target: {
          project,
          target: 'build'
        },
        overrides: {}
      }))
    };
  } catch (error) {
    console.error('Error finding affected projects:', error);
    throw new Error(`Failed to find affected projects: ${error.message}`);
  }
}
```

This implementation executes Nx commands to identify affected applications and libraries, then returns a structured response that can be used by agents for decision-making.

### Benefits of Affected Analysis
The affected analysis provides significant efficiency gains:
- **40x faster build times** by only rebuilding changed projects
- **25x faster testing** by only testing impacted components
- **Reduced resource consumption** during development
- **Faster iteration cycles** for developers

```
mermaid
flowchart TD
A[Developer makes changes] --> B{Run nx affected}
B --> C[Identify changed projects]
C --> D[Analyze dependencies]
D --> E[Calculate affected projects]
E --> F[Build only affected projects]
F --> G[Test only affected projects]
G --> H[Deploy only what changed]
H --> I[Faster development cycle]
style A fill:#f9f,stroke:#333
style C fill:#bbf,stroke:#333
style E fill:#bbf,stroke:#333
style F fill:#f96,stroke:#333
style G fill:#f96,stroke:#333
style H fill:#f96,stroke:#333
style I fill:#0f0,stroke:#333
```

**Diagram sources**
- [packages/elizaos-plugins/nx-workspace/src/provider.ts](file://packages\elizaos-plugins\nx-workspace\src\provider.ts)

**Section sources**
- [packages/elizaos-plugins/nx-workspace/src/provider.ts](file://packages\elizaos-plugins\nx-workspace\src\provider.ts)
- [packages/elizaos-plugins/nx-workspace/src/actions.ts](file://packages\elizaos-plugins\nx-workspace\src\actions.ts)

## Configuration and Environment Variables

Proper configuration is essential for the 371OS development environment to function correctly across different systems and deployment scenarios.

### Environment File Structure
The system uses a `.env` file for local environment configuration, following the pattern:

```
# Blockchain Configuration
ETHEREUM_RPC_URL=https://sepolia.infura.io/v3/$INFURA_ID
PRIVATE_KEY=$PRIVATE_KEY
REGISTRY_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890

# IPFS Configuration  
IPFS_API_URL=https://ipfs.infura.io:5001
IPFS_API_KEY=$IPFS_KEY
IPFS_API_SECRET=$IPFS_SECRET

# Akash Network Configuration
AKASH_KEYRING_BACKEND=os
AKASH_CHAIN_ID=akashnet-2
AKASH_NODE=https://rpc.akashnet.net

# ElizaOS Configuration
ELIZAOS_ENVIRONMENT=development
ELIZAOS_LOG_LEVEL=debug

# Development Configuration
PORT=3000
HOST=0.0.0.0
```

### Configuration Hierarchy
The elizaOS framework follows a specific configuration resolution hierarchy:

```typescript
// Configuration resolution order (first found wins):
// 1. Runtime settings (via runtime.getSetting())
// 2. Environment variables (process.env)
// 3. Plugin config defaults
// 4. Hardcoded defaults
```

This hierarchy ensures that more specific configurations override general defaults, allowing for flexible environment-specific settings.

### Security Considerations
The environment configuration includes security measures:
- The `.env` file is secured with restrictive permissions (chmod 600)
- Sensitive values are masked in output logs
- No global secrets are stored, preventing cross-project exposure
- Environment variables are stored locally in the project directory only

### Common Environment Variables
Key environment variables used in the system include:

| Variable | Description |
|--------|-----------|
| `OPENAI_API_KEY` | OpenAI API key for model access |
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude models |
| `POSTGRES_URL` | PostgreSQL database connection string |
| `PGLITE_DATA_DIR` | Directory for PGLite database files |
| `MODEL_PROVIDER` | Default model provider to use |
| `LOG_LEVEL` | Logging verbosity (debug, info, warn, error) |
| `PORT` | HTTP API port number |

**Section sources**
- [scripts/quick-start.sh](file://scripts\quick-start.sh)
- [scripts/quick-start.ps1](file://scripts\quick-start.ps1)
- [elizaos/CLI Reference/Commands/Environment Configuration.md](file://elizaos\CLI Reference\Commands\Environment Configuration.md)

## Common Setup Commands

The 371OS development environment includes several npm scripts and Nx commands for common setup and development tasks.

### Package.json Scripts
The root `package.json` file defines key scripts:

```json
{
  "scripts": {
    "start:dev": "node agents/startup.js",
    "build": "bun nx run-many -t build",
    "test": "bun nx run-many -t test",
    "lint": "bun nx run-many -t lint",
    "format": "prettier --write \"**/*.{js,ts,json,md}\"",
    "check-format": "prettier --check \"**/*.{js,ts,json,md}\"",
    "deploy:akash": "bun run build && ./scripts/deploy-akash.sh",
    "health-check": "./monitoring/health-check.sh",
    "cost-analysis": "bun run analyze-costs",
    "quick-start": "powershell -ExecutionPolicy Bypass -File ./scripts/quick-start.ps1",
    "quick-start:bash": "./scripts/quick-start.sh"
  }
}
```

### Nx Commands
Nx provides powerful commands for monorepo management:

```bash
# Build all projects
bun nx run-many -t build

# Test all projects
bun nx run-many -t test

# Visualize dependency graph
bun nx graph

# Generate new library
bun nx generate @nx/js:library my-library

# Check affected projects
bun nx affected --target=build --base=main
```

### Agent Management Commands
The system includes specialized commands for agent operations:

```bash
# Start development environment with agents
bun run start:dev

# Deploy to Akash Network
bun run deploy:akash

# Run health check
bun run health-check

# Analyze cost optimization
bun run cost-analysis
```

### ElizaOS CLI Commands
The ElizaOS CLI provides additional configuration capabilities:

```bash
# List environment variables
elizaos env list

# Edit local environment variables
elizaos env edit-local

# Reset environment configuration
elizaos env reset
```

These commands streamline the development workflow and enable efficient management of the complex agent ecosystem.

**Section sources**
- [README.md](file://README.md)
- [371-os/src/minds371/services/email_system/package.json](file://371-os/src/minds371/services/email_system/package.json)
- [package.json](file://package.json) - *Updated with new scripts*

## Troubleshooting Guide

This section addresses common setup issues and provides solutions for dependency conflicts, permission errors, and network connectivity problems.

### Prerequisite Installation Issues
If prerequisites are missing, the setup scripts will fail with specific error messages:

```bash
# Check Node.js installation
node --version

# Check Git installation
git --version
```

If any of these commands fail, install the missing components:
- Node.js: Download from [nodejs.org](https://nodejs.org/)
- Git: Download from [git-scm.com](https://git-scm.com/)

### Dependency Installation Problems
If `bun install` fails, try these solutions:

```bash
# Clear bun cache
bun install --force

# Remove node_modules and reinstall
rm -rf node_modules
bun install

# Use fallback npm installation if needed
npm install --legacy-peer-deps
```

For Python dependencies, ensure you're using Python 3.11+:

```bash
python --version
pip install -e .
```

### Permission Errors
Permission issues commonly occur with the `.env` file:

```bash
# Check file permissions
ls -la .env

# Fix permissions
chmod 600 .env
```

On Windows, ensure the PowerShell script is allowed to run:

```powershell
# Set execution policy
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Network Connectivity Issues
If the setup script cannot download dependencies:

```bash
# Check internet connection
ping github.com

# Configure bun registry if behind corporate firewall
bun config set registry https://registry.npmjs.org/

# Use proxy if required
bun config set proxy http://proxy.company.com:8080
bun config set https-proxy http://proxy.company.com:8080
```

### Environment Configuration Problems
If the application fails to start due to configuration issues:

```bash
# Verify .env file exists
ls -la .env

# Check for syntax errors
cat .env

# Recreate from example
cp .env.example .env
```

### Nx Workspace Issues
If Nx commands fail:

```bash
# Check Nx installation
bun nx --version

# Clear Nx cache
bun nx reset

# Regenerate lock files
rm package-lock.json
bun install
```

### Code Quality Tool Issues
If ESLint or Prettier commands fail:

```bash
# Check ESLint installation
npx eslint --version

# Check Prettier installation
npx prettier --version

# Run ESLint on specific file
npx eslint src/index.ts

# Format all files
npx prettier --write "**/*.{js,ts,json,md}"

# Check formatting without changing files
npx prettier --check "**/*.{js,ts,json,md}"
```

**Section sources**
- [scripts/quick-start.sh](file://scripts\quick-start.sh)
- [scripts/quick-start.ps1](file://scripts\quick-start.ps1)
- [elizaos/CLI Reference/Commands/Environment Configuration.md](file://elizaos\CLI Reference\Commands\Environment Configuration.md)
- [.eslintrc.json](file://.eslintrc.json) - *Added in recent commit*
- [.prettierrc](file://.prettierrc) - *Added in recent commit*

## Performance Optimization

Optimizing the development environment enhances iteration speed and overall productivity.

### Nx Caching Strategies
Nx provides built-in caching that significantly improves performance:

```json
"targetDefaults": {
  "build": {
    "cache": true,
    "dependsOn": ["^build"],
    "inputs": ["production", "^production"]
  }
}
```

To maximize cache effectiveness:
- Ensure consistent file hashing by maintaining stable input configurations
- Use the `bun nx reset` command to clear corrupted caches
- Share cache across team members when possible

### Incremental Builds with Affected Analysis
Leverage Nx affected analysis to build only what has changed:

```bash
# Instead of building everything
bun nx run-many -t build

# Build only affected projects
bun nx affected -t build --base=main
```

This approach can provide up to 40x faster build times in large monorepos.

### Development Server Optimization
Configure the development server for optimal performance:

```bash
# Use development mode with hot reloading
bun run start:dev

# Monitor system resources
./monitoring/health-check.sh
```

### Dependency Management
Optimize dependency installation:

```bash
# Use bun install for consistent, fast installations
bun install

# Audit dependencies for vulnerabilities
bun install --dry-run

# Update dependencies regularly
bun update
```

### Resource Monitoring
Monitor system performance during development:

```bash
# Check memory usage
ps aux | grep node

# Monitor disk space
df -h

# Check network usage
nethogs
```

By implementing these optimization strategies, developers can achieve faster iteration cycles and more efficient development workflows.

**Section sources**
- [nx.json](file://nx.json)
- [packages/elizaos-plugins/nx-workspace/src/provider.ts](file://packages\elizaos-plugins\nx-workspace\src\provider.ts)

## Environment Validation and Testing

The 371OS development environment now includes a dedicated test-setup script to validate the environment configuration and ensure all components are properly installed.

### PowerShell Test Setup Script
The `test-setup.ps1` script provides comprehensive environment validation:

```powershell
# Run the environment validation script
.\scripts\test-setup.ps1
```

This script performs the following checks:
1. Verifies the presence of essential files (nx.json, package.json)
2. Checks for node_modules directory
3. Validates PowerShell script availability
4. Tests Node.js and bun availability in PATH
5. Provides success/failure indicators for each component

### Purpose and Benefits
The test-setup script serves several important purposes:
- **Pre-installation validation**: Confirms the environment is ready before running the main setup
- **Troubleshooting aid**: Helps identify missing components before they cause setup failures
- **Consistency checking**: Ensures all required scripts and configuration files are present
- **Quick verification**: Provides a fast way to confirm the development environment is properly configured

### Integration with Development Workflow
The test-setup script should be used as follows:
1. After cloning the repository, run `test-setup.ps1` to verify the environment
2. Address any issues identified by the script
3. Proceed with the main `quick-start.ps1` setup script
4. Use `test-setup.ps1` periodically to verify environment integrity

The script is particularly useful in CI/CD pipelines and for new developers setting up their environment for the first time.

**Section sources**
- [scripts/test-setup.ps1](file://scripts\test-setup.ps1) - *Added in recent commit*
- [scripts/quick-start.ps1](file://scripts\quick-start.ps1) - *Updated to reference test script*
- [package.json](file://package.json) - *Updated with validation context*

## Code Quality and Formatting Configuration

The 371OS repository has recently added standardized code quality and formatting configuration to ensure consistent code style across the codebase.

### ESLint Configuration
The project uses ESLint for code linting with the following configuration in `.eslintrc.json`:

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
```

### Prettier Configuration
The project uses Prettier for code formatting with the following configuration in `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

### Ignore Files
The project includes ignore files to exclude specific files from linting and formatting:

**.eslintignore**
```
node_modules/
dist/
build/
*.min.js
```

**.prettierignore**
```
node_modules/
dist/
build/
*.min.js
*.md
```

### Integration with Nx
The Nx workspace is configured to use ESLint for linting operations:

```json
"targetDefaults": {
  "lint": {
    "cache": true,
    "inputs": ["default", "{workspaceRoot}/.eslintrc.json", "{workspaceRoot}/.eslintignore"]
  }
}
```

This configuration ensures that linting operations are cached and consider the ESLint configuration files when determining cache validity.

### Usage Commands
The following commands are available for code quality and formatting:

```bash
# Run ESLint on all files
bun run lint

# Run ESLint on specific file
npx eslint src/index.ts

# Format all files according to Prettier rules
bun run format

# Check if files are properly formatted without changing them
bun run check-format
```

These tools help maintain code quality and consistency across the 371OS codebase.

**Section sources**
- [.eslintrc.json](file://.eslintrc.json) - *Added in recent commit*
- [.eslintignore](file://.eslintignore) - *Added in recent commit*
- [.prettierrc](file://.prettierrc) - *Added in recent commit*
- [.prettierignore](file://.prettierignore) - *Added in recent commit*
- [package.json](file://package.json) - *Updated with linting and formatting scripts*
- [nx.json](file://nx.json) - *Updated with linting configuration*

## Bun Integration

371OS now uses **Bun as the default package manager** for lightning-fast development and zero friction workflows.

### Key Benefits
- **~50x faster** dependency installation vs npm
- **Zero hanging/timeout issues** that plagued npm
- **Instant iteration cycles** for rapid development
- **Real-time feedback** for cognitive engine development
- **Perfect compatibility** with existing workflows and tools

### Installation & Setup
#### Automatic Setup (Recommended)
```bash
# Run the comprehensive Bun setup script
cd 
powershell -ExecutionPolicy Bypass -File tools/development/bun-install.ps1
```

#### Manual Setup
```bash
# 1. Install Bun (if not already installed)
powershell -c "irm bun.sh/install.ps1 | iex"

# 2. Install dependencies with Bun
cd 
bun install

# 3. Verify installation
bun --version
bun nx --version
```

### Migration from npm
The migration to Bun includes:
- `package.json` updated with Bun configuration
- All scripts converted to use `bun` commands
- Added `"type": "module"` for ES module support
- Added `"packageManager": "bun@1.2.18"` specification

### Fallback Options
```bash
# If Bun issues occur (rare), fallback to npm
npm install --legacy-peer-deps
bun nx build cognitive-engine
node agents/test-agent/index.js
```

### Best Practices
- Always use `bun install` for dependency installation
- Use `bun run <script>` for script execution
- Use `bun nx <command>` for Nx operations
- Use `bun <file>.js` for direct file execution

**Section sources**
- [AB/BUN-INTEGRATION-GUIDE.md](file://AB\BUN-INTEGRATION-GUIDE.md) - *Added in recent commit*
- [tools/development/bun-install.ps1](file://tools\development\bun-install.ps1) - *Moved from AB/scripts/bun-install.ps1*
- [package.json](file://package.json) - *Updated with Bun configuration*

## System Health Check

The 371OS development environment includes a system health check script for quick validation of the development environment.

### Quick-Status.js Script
The `quick-status.js` script provides instant system health check:

```bash
# Run the health check script
bun tools/development/quick-status.js
```

This script performs the following checks:
1. Validates workspace root (checks for package.json and nx.json)
2. Checks package manager status (Bun, Node.js, Nx)
3. Verifies critical directories exist
4. Checks plugin build status including Business Intelligence Plugin
5. Validates documentation status
6. Confirms TypeScript configuration
7. Provides system health summary and next steps

The script specifically checks the build status of key plugins:
- Business Intelligence Plugin: Verifies dist directory and compiled files
- Cognitive Engine Plugin: Checks for successful build artifacts
- NX Workspace Plugin: Validates build completion

### Purpose and Benefits
The quick-status script serves several important purposes:
- **Instant validation**: Provides immediate feedback on system health
- **Troubleshooting aid**: Helps identify missing components or configuration issues
- **Onboarding tool**: Helps new developers quickly verify their setup
- **CI/CD integration**: Can be used in automated pipelines to validate environments
- **Build verification**: Confirms that essential plugins are properly built

### Integration with Development Workflow
The quick-status script should be used as follows:
1. After setting up the development environment, run `quick-status.js` to verify the setup
2. Use it when troubleshooting issues to quickly identify problems
3. Run it periodically to ensure the environment remains healthy
4. Use it in CI/CD pipelines to validate build environments
5. Execute with Bun for optimal performance: `bun tools/development/quick-status.js`

The script is particularly useful for quickly identifying issues with Bun installation, plugin builds, and overall system configuration. It provides specific recommendations for resolving common issues:

**Recommended Next Steps:**
1. Install dependencies: `bun install --force --no-save`
2. Build Business Intelligence Plugin: `cd packages/elizaos-plugins/business-intelligence && bun run build`
3. Review latest session: `cat AB/sessions/session-2025-09-01.md`
4. Check milestone progress: `cat AB/milestone-tracker.md`
5. Test plugin integration with ElizaOS runtime

**Section sources**
- [tools/development/quick-status.js](file://tools\development\quick-status.js) - *Moved from AB/scripts/quick-status.js*
- [AB/BUN-INTEGRATION-GUIDE.md](file://AB\BUN-INTEGRATION-GUIDE.md) - *Added in recent commit*

## Development Rules and Conventions

The 371OS project follows specific development rules and conventions to ensure consistency and productivity across the team.

### Workspace Configuration
The project uses Comet to create dedicated workspaces for different agent development phases:

```javascript
// Comet workspace configuration for different agent development phases
const cometWorkspaces = {
  csuite_agent_development: {
    shortcuts: [
      '/create-agent-spec',
      '/generate-dev-docs',
      '/prototype-workflow',
      '/validate-business-logic',
    ],
    ai_context: '371OS C-Suite agent development and community management',
  },
  community_platform_research: {
    shortcuts: [
      '/research-niche',
      '/analyze-persona',
      '/design-funnel',
      '/test-monetization',
    ],
    ai_context: 'Community-driven growth and Blue Ocean app development',
  },
};
```

### Development Rules
The following rules are enforced for all 371OS development:

1. **ALWAYS start with AB/README.md** when beginning any 371 OS work
2. **Use Bun for all operations** - 50x faster than npm with zero hanging issues
3. **Update milestone tracker** and session logs for all significant work
4. **Follow Windows PowerShell patterns** for all script development
5. **Test incrementally**: Nx → Plugins → Agents → Blockchain
6. **Use spatial development environments** for enhanced productivity
7. **Document all optimizations** in AB/sessions/ for future reference

### Session Continuity Workflow
```bash
# 1. ALWAYS start with AB folder when returning to project
cd 
cat AB/README.md                    # Read starting instructions

# 2. Check current status
bun tools/development/quick-status.js      # Instant system health check
cat AB/milestone-tracker.md         # Review current milestone

# 3. Review last session
cat AB/sessions/session-2025-09-07.md  # Latest session context
```

### Code Organization Conventions
- **TypeScript files**: `kebab-case.ts` (e.g., `blockchain-registry.ts`)
- **Actions/Handlers**: `{feature}.action.ts` or `actions.ts`
- **Types/Interfaces**: `types.ts` or `{feature}.types.ts`
- **Tests**: `{filename}.spec.ts` or `{filename}.test.ts`
- **Documentation**: `UPPERCASE.md` for root docs, `README.md` for packages

**Section sources**
- [371-os/src/minds371/comet/Create Dedicated Workspaces.js](file://371-os/src/minds371/comet/Create Dedicated Workspaces.js) - *Added in recent commit*
- [.qoder/rules/qoderosrules.md](file://.qoder\rules\qoderosrules.md) - *Updated with Bun integration guidance*

## Bun Watch Migration

The 371OS development environment has migrated from nodemon and ts-node to Bun's built-in watcher for development, significantly improving performance and reducing dependencies.

### Migration Overview
The migration involved:
- Replacing nodemon and ts-node with Bun's native `--watch` flag
- Updating package.json scripts to use `bun --watch`
- Removing runtime dependencies: nodemon, ts-node, @swc-node/register
- Simplifying the development toolchain

### Updated Development Scripts
The package.json scripts have been updated to use Bun's built-in watcher:

```json
{
  "scripts": {
    "start:ceo": "bun --watch agents/ceo-mimi/start.js",
    "start:coordinator": "bun --watch agents/coordinator/start.js"
  }
}
```

These changes eliminate the need for external watcher tools and leverage Bun's native hot reloading capabilities.

### Benefits of Bun Watch
- **Zero dependencies**: Built into Bun, requires no additional packages
- **Faster performance**: Written in Zig for optimal performance
- **Simpler configuration**: No complex configuration files needed
- **TypeScript support**: Can run TypeScript files directly without compilation
- **Hot reloading**: Automatically restarts the process on file changes

### Performance Comparison
The migration to Bun's built-in watcher has resulted in significant performance improvements:

- **nodemon**: ~1-2 seconds to restart after file changes
- **Bun --watch**: ~100-200 milliseconds to restart after file changes

This represents a 5-10x performance improvement in hot reload times, significantly enhancing developer productivity.

### Usage
To run any script with hot reloading using Bun:

```bash
# Basic watch command
bun --watch path/to/script.js

# Watch with screen clearing disabled
bun --watch --no-clear-screen path/to/script.js
```

### Migration Status
- ✅ Updated package.json scripts
- ✅ Removed runtime dependencies
- ✅ Verified Bun watch functionality
- ✅ Documented migration process

### Next Steps
1. Update any CI/CD pipelines to use the new start commands
2. Communicate the changes to the development team
3. Run performance benchmarks to quantify the improvement
4. Create missing agent files (agents/ceo-mimi/start.js and agents/coordinator/start.js) if needed

**Section sources**
- [BUN_WATCH_MIGRATION.md](file://BUN_WATCH_MIGRATION.md) - *Added in recent commit*
- [AB/sessions/session-2025-09-07-bun-watch-migration.md](file://AB\sessions\session-2025-09-07-bun-watch-migration.md) - *Added in recent commit*
- [package.json](file://package.json) - *Updated with watch commands*