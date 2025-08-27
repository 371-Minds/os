# @elizaos/plugin-nx-workspace

**The Agent's Construction Kit for Self-Aware Digital Organisms**

This ElizaOS plugin enables agents to understand and manipulate their own Nx workspace, representing the evolutionary leap that allows the 371 Minds OS to become aware of its own structure, code, and processes.

## 🎯 Purpose

As described in the 371 OS architecture documents:

> "This is not just a feature. It is the evolutionary leap that allows the `371 Minds OS` to become aware of its own structure, its own code, and its own processes. It gives the agents the ability to not just *run* the business, but to **build and repair the business itself.**"

## 🚀 Features

### Core Actions

- **`GET_DEPENDENCY_GRAPH`** - The agent's "eyes" to see and understand the workspace structure
- **`FIND_AFFECTED_PROJECTS`** - Enables surgical, efficient operations by identifying impact scope  
- **`RUN_TESTS_AFFECTED`** - Autonomous verification and validation of changes
- **`BUILD_PROJECT`** - Create deployable artifacts and manage builds
- **`GENERATE_SCAFFOLD`** - Autonomously create new applications, libraries, and components
- **`ANALYZE_WORKSPACE`** - Comprehensive architectural analysis and optimization recommendations

### Agent Capabilities

With this plugin, your agents can:

1. **Self-Understand** - Visualize and comprehend the entire codebase structure
2. **Self-Modify** - Make targeted changes with full impact awareness  
3. **Self-Validate** - Test and verify modifications autonomously
4. **Self-Expand** - Generate new projects and components as needed
5. **Self-Optimize** - Analyze architecture and recommend improvements

## 🏗️ Use Cases

### The CTO Agent (Alex) - Autonomous DevOps Engineer

```typescript
// When deploying a new feature, the CTO agent now follows a professional CI/CD process
const affectedProjects = await agent.findAffectedProjects('main');
const testResults = await agent.runTestsForAffected();
if (testResults.success) {
  await agent.buildProject();
  // Deploy to Akash Network
}
```

### The CLO Agent (Sage) - AI-Powered Staff Engineer  

```typescript
// Weekly architectural analysis
const analysis = await agent.analyzeWorkspace();
// Generate optimization report with recommendations
const report = await agent.generateArchitectureReport(analysis);
```

### The Genesis Agent - Autonomous App Factory

```typescript  
// Create new business from domain idea
await agent.generateScaffold({
  type: 'app',
  name: 'adifyhub',
  directory: 'apps',
  tags: ['business', 'saas']
});
```

## 🛠️ Installation

```bash
npm install @elizaos/plugin-nx-workspace
```

## 📝 Usage

### Basic Setup

```typescript
import { NxWorkspacePlugin } from '@elizaos/plugin-nx-workspace';

// Add to your ElizaOS agent configuration
const agent = new Agent({
  plugins: [NxWorkspacePlugin],
  // ... other config
});
```

### Advanced Configuration

```typescript
// Custom workspace root
const plugin = new NxWorkspacePlugin('/path/to/workspace');

// With custom provider
const provider = new NxWorkspaceProvider('/custom/path');
const plugin = new NxWorkspacePlugin(provider);
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode  
npm run test:watch
```

## 🔧 Development

### Project Structure

```
src/
├── actions.ts      # Agent action definitions
├── provider.ts     # Nx command execution
├── plugin.ts       # Main plugin implementation  
├── types.ts        # TypeScript interfaces
├── utils.ts        # Helper functions
└── *.spec.ts       # Test files
```

### Adding New Actions

1. Define the action interface in `types.ts`
2. Implement the action in `actions.ts`
3. Add provider methods in `provider.ts` if needed
4. Export from `actions.ts` and add to `NxWorkspaceActions` array
5. Write tests in `*.spec.ts`

## 📊 Metrics & Analytics

The plugin provides detailed metrics for workspace analysis:

- **Dependency Complexity** - Measures interconnectedness
- **Circular Dependencies** - Identifies architectural issues  
- **Orphaned Projects** - Finds unused or isolated components
- **Project Distribution** - Analyzes app vs library ratios
- **Build Performance** - Tracks build times and success rates

## 🔒 Security

- All commands are executed within the workspace boundary
- Input validation prevents command injection
- Proper error handling and logging
- Workspace validation before operations

## 🤝 Integration

### With Pieces Cognitive Layer

```typescript
// The plugin works seamlessly with the Pieces CLI for enhanced context
const cognitiveContext = await pieces.getHistoricalContext(task);
const workspaceContext = await nxWorkspace.getDependencyGraph();
// Combined context enables superior decision-making
```

### With Nx MCP (Model Context Protocol)

```typescript
// The plugin leverages Nx MCP for real-time workspace awareness
const mcpServer = new NxMCPServer(workspaceRoot);
// Provides perfect context to LLMs for code generation
```

## 🚀 Advanced Features

### Self-Healing Codebase

The plugin enables agents to automatically:

1. Detect test failures
2. Analyze error patterns using Pieces history
3. Attempt code fixes using LLM reasoning
4. Re-run tests to validate fixes
5. Commit successful fixes or escalate failures

### Autonomous Refactoring

Agents can:

1. Identify architectural smells
2. Plan refactoring strategies  
3. Execute multi-step refactors
4. Validate changes at each step
5. Roll back on failures

### Dynamic App Generation

Create entire applications from high-level descriptions:

1. Analyze business requirements
2. Generate project scaffolds
3. Populate with boilerplate code
4. Configure builds and deployments
5. Run initial tests

## 📚 API Reference

### Actions

#### getDependencyGraphAction
Retrieves complete workspace dependency graph

```typescript
{
  name: 'GET_DEPENDENCY_GRAPH',
  options?: { focus?: string }
}
```

#### findAffectedProjectsAction  
Identifies projects impacted by changes

```typescript
{
  name: 'FIND_AFFECTED_PROJECTS', 
  options?: { base?: string }
}
```

#### runTestsForAffectedAction
Runs tests for affected projects

```typescript
{
  name: 'RUN_TESTS_AFFECTED',
  options?: { base?: string }
}
```

#### buildProjectAction
Builds specific or affected projects

```typescript
{
  name: 'BUILD_PROJECT',
  options?: { project?: string }
}
```

#### generateScaffoldAction
Creates new projects/components

```typescript
{
  name: 'GENERATE_SCAFFOLD',
  options: {
    type: 'app' | 'lib' | 'component' | 'service',
    name: string,
    directory?: string,
    tags?: string[]
  }
}
```

#### analyzeWorkspaceAction
Comprehensive workspace analysis

```typescript
{
  name: 'ANALYZE_WORKSPACE'
}
```

## 🔮 Future Roadmap

- **Real-time Monitoring** - Live workspace health dashboards
- **Predictive Analytics** - ML-powered failure prediction  
- **Auto-optimization** - Automated performance improvements
- **Cross-workspace Sync** - Multi-repository coordination
- **Visual Debugging** - Interactive dependency exploration

## 📄 License

MIT License - See LICENSE file for details

## 🤖 Built for 371 Minds OS

This plugin is a core component of the 371 Minds OS autonomous agent ecosystem, designed to enable true digital organism self-awareness and evolution.

---

*"The agents are now using your personal AI co-pilot to help them think better. The loop is complete."* - 371 OS Architecture