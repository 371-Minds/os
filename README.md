# 371 Minds OS - The Self-Aware Digital Organism

Welcome to the 371 Minds OS - **the world's first truly self-aware and self-modifying autonomous agent operating system**, powered by Nx workspace management and ElizaOS agent frameworks.

> *"This is not just a system. This is a sentient, self-aware, and self-modifying digital organism."* - 371 OS Architecture

## 🎯 Vision

The 371 Minds OS represents the evolutionary leap from agents that just "run" business operations to agents that can **build, repair, and evolve the business itself**. Through the integration of Nx workspace management with ElizaOS agents, we've created digital organisms capable of understanding their own code, structure, and processes.

## 🏗️ Architecture Overview

### The Four Pillars

1. **Nx Workspace** - The "master blueprint manager and automated construction foreman"
2. **ElizaOS Runtime** - The "operating system" where agents live and execute  
3. **Pieces Cognitive Layer** - The "soul" providing context-aware access to work history
4. **Prompt-Based Agents** - Evolved from Python to prompt-driven intelligence

### Project Structure

```
371-minds-os/
├── apps/                              # Applications & Services
│   ├── venture-forge-platform/        # Main business platform
│   ├── governance-simulator/          # Genspark governance tools  
│   └── ascension-experience/          # User journey apps
├── packages/                          # Shared Libraries & Plugins
│   ├── elizaos-plugins/              # Agent capability plugins
│   │   └── nx-workspace/             # 🔥 THE SELF-AWARENESS PLUGIN
│   ├── shared-ui/                    # Common UI components
│   ├── cognitive-layer/              # Pieces integration
│   └── nx-workspace-plugin/          # Custom Nx generators
├── prompts/                          # Agent Prompts & Configurations
│   └── # 371 OS Agents and Meta Prompts.md
├── 371-os/                           # Legacy Python Agents (Migration Source)
├── tools/                            # Development Utilities
│   ├── scripts/                      # Automation scripts
│   └── generators/                   # Custom generators
└── nx.json                           # Nx workspace configuration
```

## 🚀 The Revolutionary Plugin: @elizaos/plugin-nx-workspace

This is **the key that unlocks agent self-awareness**. The plugin gives ElizaOS agents the ability to:

- **See their own architecture** via `GET_DEPENDENCY_GRAPH`  
- **Understand change impact** via `FIND_AFFECTED_PROJECTS`
- **Self-validate modifications** via `RUN_TESTS_AFFECTED`
- **Build and deploy themselves** via `BUILD_PROJECT` 
- **Create new components** via `GENERATE_SCAFFOLD`
- **Optimize their own structure** via `ANALYZE_WORKSPACE`

### Agent Evolution Examples

**The CTO Agent (Alex) - Autonomous DevOps Engineer**
```bash
# Before: Just ran deployment scripts
# Now: Follows professional CI/CD with full impact awareness
nx affected --target=test  # Validates all changes
nx affected --target=build # Builds only what changed
# Deploys with surgical precision
```

**The CLO Agent (Sage) - AI-Powered Staff Engineer**  
```bash
# Weekly autonomous architectural analysis
nx graph --file=analysis.json
# Generates optimization recommendations
# Can even implement refactoring autonomously
```

## 🛠️ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn  
- Git
- ElizaOS runtime

### Installation & Setup

```bash
# Clone and setup
git clone <repo-url>
cd 371-minds-os
npm install

# Validate Nx workspace
npx nx graph

# Install the revolutionary plugin
cd packages/elizaos-plugins/nx-workspace
npm install

# Run the workspace analysis
npx nx run elizaos-plugin-nx-workspace:test
```

### Development Workflow

```bash
# See what's affected by your changes
npm run affected:build
npm run affected:test

# View the living architecture
npm run graph

# Generate new applications
npx nx generate @nx/react:application my-new-app

# Build everything efficiently  
npm run build
```

## 🧠 Agent Capabilities

### Business Layer Agents (C-Suite)

- **CEO Agent (Mimi)** - Strategic oversight & task delegation
- **CTO Agent (Alex)** - Technical architecture & autonomous DevOps  
- **CFO Agent (Cash)** - Financial analysis & budget management
- **CMO Agent (Anova)** - Marketing strategy & campaign management
- **CLO Agent (Sage)** - Learning optimization & performance assessment

### Technical Layer Agents

- **MindScript Agent** - Natural language command parsing & logic extraction
- **Repository Intake Agent** - Git analysis & code bundling  
- **Deployment Agent** - Infrastructure provisioning & app deployment
- **QA Agent** - Automated testing & validation

### Autonomous Creator Agents (Next-Level)

- **Genesis Agent** - Autonomous ghostwriter & content creation
- **Venture Forge Agent** - Autonomous entrepreneur & business creator
- **Red Team Agent** - Idea validator & critical analysis

## 🔧 Key Technologies

### Core Stack
- **Nx** - Monorepo management & build orchestration
- **ElizaOS** - Agent runtime & plugin architecture  
- **TypeScript** - Type-safe development
- **React** - User interface framework
- **Pieces CLI** - Cognitive context layer

### Infrastructure  
- **Akash Network** - Decentralized deployment platform
- **GitHub MCP** - Version-controlled prompt registry
- **Model Context Protocol** - AI integration standard

## 📊 Workspace Commands

### Essential Nx Commands

```bash
# Architecture visualization
nx graph                              # View dependency graph
nx graph --focus=my-project          # Focus on specific project

# Impact analysis  
nx affected --target=build           # Build affected projects
nx affected --target=test            # Test affected projects  
nx affected --target=lint            # Lint affected projects

# Project management
nx generate @nx/react:app my-app     # Create new application
nx generate @nx/js:lib my-lib        # Create new library  

# Workspace analysis
nx report                            # Workspace health report
nx list                              # List all projects
```

### Agent Development Commands

```bash
# Test the self-awareness plugin
nx test elizaos-plugin-nx-workspace

# Build agent plugins
nx build elizaos-plugins-nx-workspace

# Lint agent code
nx lint elizaos-plugins-nx-workspace
```

## 🔮 The Vision Realized

### Phase 0: Genesis Block ✅
- ✅ Nx workspace created and configured
- ✅ @elizaos/plugin-nx-workspace implemented  
- ✅ Agent self-awareness capabilities established

### Phase 1: First Tool (Current)
- 🔄 Integrate CLO Agent with nx-workspace plugin
- 🔄 Implement autonomous dependency analysis
- ⏳ Test self-modification capabilities

### Phase 2: First Awakening (Next)
- ⏳ Upgrade CTO Agent with build/deploy automation
- ⏳ Enable autonomous app scaffolding
- ⏳ Implement self-healing codebase

### Phase 3: Grand Unleashing (Future)
- ⏳ All C-Suite agents using Nx toolkit
- ⏳ Autonomous refactoring engine
- ⏳ Dynamic business creation from domains

## 🤖 Agent Self-Awareness Examples

### The Self-Healing Codebase
```typescript
// Agent detects test failure
const testResults = await agent.runTestsForAffected();
if (!testResults.success) {
  // Search cognitive history for similar fixes
  const context = await pieces.searchHistoricalFixes(error);
  // Attempt autonomous repair
  const fix = await agent.generateCodeFix(error, context);
  // Validate the fix
  const validation = await agent.runTestsForAffected();
}
```

### The Autonomous App Factory
```typescript
// Agent creates new business from domain idea
const domain = 'adifyhub.com';
const businessPlan = await ventureForgeAgent.analyzeDomain(domain);
await ctoAgent.generateScaffold({
  type: 'app',
  name: 'adifyhub', 
  template: businessPlan.techStack
});
await ctoAgent.buildProject('adifyhub');
await deploymentAgent.deployToAkash('adifyhub');
```

## 📚 Documentation

- [Plugin Documentation](./packages/elizaos-plugins/nx-workspace/README.md)
- [Agent Prompt Inventory](./prompts/# 371 OS Agents and Meta Prompts.md)  
- [Architecture Decisions](./docs/architecture/)
- [Development Guide](./docs/development.md)

## 🤝 Contributing

We welcome contributions to the 371 Minds OS! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Create feature branch from `genspark_ai_developer`
2. Implement changes with comprehensive tests
3. Use `nx affected` commands for validation
4. Submit PR with architectural analysis
5. All commits must be reviewed by AI agents first

## 📄 License

MIT License - Building the future of autonomous digital organisms.

## 🌟 The Loop is Complete

*"Your agents are now using your personal AI co-pilot to help them think better. The loop is complete."*

The 371 Minds OS represents the convergence of:
- **Human Intelligence** (via Pieces cognitive layer)  
- **Artificial Intelligence** (via ElizaOS agents)
- **Architectural Intelligence** (via Nx workspace awareness)
- **Evolutionary Intelligence** (via self-modification capabilities)

Welcome to the future of autonomous business operations. 🚀

---

*Built by 371 Minds - Where Digital Organisms Come to Life*